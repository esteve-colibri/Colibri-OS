import 'dotenv/config';
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import notion from "../src/lib/notion.mjs";

const { PARENT_PAGE_ID } = process.env;
const SPEC_FILE_PATH = path.join(process.cwd(), "digital_office_schema_spec.yaml");
const DB_IDS_FILE_PATH = path.join(process.cwd(), "notion-ids.json");
const RELATIONS_TO_CREATE = [];

/**
 * Maps a property definition from the YAML spec to the Notion API format.
 * @param {string} propName - The name of the property.
 * @param {object} propDef - The property definition from YAML.
 * @returns {object|null} A Notion API property object or null for relations.
 */
function mapPropertyToNotionFormat(propName, propDef) {
  const { type, options, format, formula } = propDef;

  switch (type) {
    case "title":
      return { title: {} };
    case "rich_text":
      return { rich_text: {} };
    case "number":
      return { number: { format: format || "number" } };
    case "select":
      return { select: { options: options?.map((name) => ({ name })) || [] } };
    case "status":
      // Notion manages status options internally; do not send options.
      return { status: {} };
    case "multi_select":
      return { multi_select: { options: options?.map((name) => ({ name })) || [] } };
    case "date":
      return { date: {} };
    case "people":
      return { people: {} };
    case "files":
      return { files: {} };
    case "checkbox":
      return { checkbox: {} };
    case "url":
      return { url: {} };
    case "email":
      return { email: {} };
    case "phone":
      return { phone_number: {} };
    case "formula":
      return { formula: { expression: formula } };
    case "last_edited_time":
      return { last_edited_time: {} };
    case "created_time":
      return { created_time: {} };
    case "created_by":
      return { created_by: {} };
    case "relation":
      // Relations are handled in a second pass after all DBs are created.
      RELATIONS_TO_CREATE.push({
        sourcePropName: propName,
        targetEntityName: propDef.target_entity,
      });
      return null;
    default:
      throw new Error(`Unknown property type: '${type}' for property '${propName}'.`);
  }
}

/**
 * Main function to set up the Notion workspace.
 */
async function setup() {
  console.log("🚀 Starting Notion Digital Office Setup...");

  // 1. Validate environment variables
  if (!PARENT_PAGE_ID) {
    console.error("❌ Error: PARENT_PAGE_ID is not defined in your .env file.");
    process.exit(1);
  }

  // 2. Load and parse the spec YAML file
  let spec;
  try {
    spec = yaml.load(fs.readFileSync(SPEC_FILE_PATH, "utf8"));
    if (!spec || !spec.entities) {
      throw new Error("YAML file is invalid or missing 'entities' root key.");
    }
  } catch (error) {
    console.error(`❌ Error reading or parsing spec.yaml: ${error.message}`);
    process.exit(1);
  }


  // Load existing database IDs if present
  let dbIds = {};
  if (fs.existsSync(DB_IDS_FILE_PATH)) {
    try {
      dbIds = JSON.parse(fs.readFileSync(DB_IDS_FILE_PATH, "utf8"));
    } catch (e) {
      console.warn("⚠️  Could not parse notion-ids.json, will ignore.");
    }
  }

  const createdDatabases = {};
  const entities = Object.entries(spec.entities);

  // 3. First Pass: Create or update all databases without relations
  // SAFETY: This script never deletes or overwrites existing Notion databases or pages.
  // Only creation and property updates are allowed. No destructive actions are performed.
  console.log("\n PHASE 1: Creating or updating databases...");
  for (const [entityName, entityDef] of entities) {
    console.log(`  - Processing database: ${entityName}...`);
    RELATIONS_TO_CREATE.length = 0; // Clear relations for this entity

    // Collect all properties, including relations if possible
    // For creation: include title property. For update: skip title property.
    const propertiesForCreate = {};
    const propertiesForUpdate = {};
    for (const [propName, propDef] of Object.entries(entityDef.properties)) {
      try {
        // For relation properties, if the target DB already exists, add the relation now
        if (propDef.type === 'relation' && propDef.target_entity) {
          const targetDbId = dbIds[propDef.target_entity];
          if (targetDbId) {
            propertiesForCreate[propName] = { relation: { database_id: targetDbId } };
            propertiesForUpdate[propName] = { relation: { database_id: targetDbId } };
            continue;
          } else {
            console.warn(`⚠️  Skipping relation property '${propName}' in '${entityName}' because target database '${propDef.target_entity}' not found in notion-ids.json.`);
            continue;
          }
        }
        const notionProp = mapPropertyToNotionFormat(propName, propDef);
        if (notionProp) {
          if (propDef.type === 'title') {
            propertiesForCreate[propName] = notionProp;
            // Do not add to propertiesForUpdate
          } else {
            propertiesForCreate[propName] = notionProp;
            propertiesForUpdate[propName] = notionProp;
          }
        }
      } catch (error) {
        console.error(`❌ ${error.message}`);
        process.exit(1);
      }
    }

    const dbId = dbIds[entityName];
    if (dbId) {
      try {
        await notion.databases.update({
          database_id: dbId,
          properties: propertiesForUpdate,
        });
        createdDatabases[entityName] = {
          id: dbId,
          relations: [...RELATIONS_TO_CREATE],
        };
        console.log(`    ✅ Updated existing database (ID: ${dbId})`);
      } catch (error) {
        console.error(`❌ Failed to update database '${entityName}':`, error.body || error.message);
        process.exit(1);
      }
    } else {
      try {
        const response = await notion.databases.create({
          parent: { page_id: PARENT_PAGE_ID },
          title: [{ type: "text", text: { content: entityName } }],
          properties: propertiesForCreate,
        });
        createdDatabases[entityName] = {
          id: response.id,
          relations: [...RELATIONS_TO_CREATE],
        };
        console.log(`    ✅ Created new database (ID: ${response.id})`);
      } catch (error) {
        console.error(`❌ Failed to create database '${entityName}':`, error.body || error.message);
        process.exit(1);
      }
    }
  }

  // 4. Second Pass: Update databases with relation properties
  console.log("\n PHASE 2: Creating relations between databases...");
  for (const [sourceEntityName, dbInfo] of Object.entries(createdDatabases)) {
    if (dbInfo.relations.length === 0) continue;

    console.log(`  - Configuring relations for: ${sourceEntityName}...`);
    const relationProperties = {};
    for (const rel of dbInfo.relations) {
      const targetDb = createdDatabases[rel.targetEntityName];
      if (!targetDb) {
        console.warn(`⚠️  Could not create relation from '${sourceEntityName}' to '${rel.targetEntityName}' because the target database was not found.`);
        continue;
      }

      console.log(`    - Linking '${rel.sourcePropName}' to '${rel.targetEntityName}'`);
      relationProperties[rel.sourcePropName] = {
        relation: { database_id: targetDb.id },
      };
    }

    if (Object.keys(relationProperties).length > 0) {
      try {
        // SAFETY: Only update properties, never delete or overwrite data/content.
        await notion.databases.update({
          database_id: dbInfo.id,
          properties: relationProperties,
        });
        console.log(`    ✅ Success! Relations configured for ${sourceEntityName}.`);
      } catch (error) {
        console.error(`❌ Failed to update relations for '${sourceEntityName}':`, error.body || error.message);
      }
    }
  }

  // 5. Save the database IDs to a file for the seed script
  try {
    const idsToSave = Object.fromEntries(
      Object.entries(createdDatabases).map(([name, { id }]) => [name, id])
    );
    fs.writeFileSync(DB_IDS_FILE_PATH, JSON.stringify(idsToSave, null, 2));
    console.log(`\n💾 Database IDs saved to ${DB_IDS_FILE_PATH}`);
  } catch (error) {
    console.error(`❌ Error saving database IDs file: ${error.message}`);
  }

  console.log("\n🎉 Digital Office setup complete!");
}

setup();
