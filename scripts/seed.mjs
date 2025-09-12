
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import notion from "../src/lib/notion.mjs";

const DB_IDS_FILE_PATH = path.join(process.cwd(), "notion-ids.json");
const SPEC_FILE_PATH = path.join(process.cwd(), "digital_office_schema_spec.yaml");


// Helper functions to format Notion properties based on type
function formatProperty(type, value, propName, entityName, relationMap) {
  if (value === undefined || value === null) return undefined;
  switch (type) {
    case "title":
      return { title: [{ type: "text", text: { content: String(value) } }] };
    case "rich_text":
      return { rich_text: [{ type: "text", text: { content: String(value) } }] };
    case "select":
      return { select: { name: String(value) } };
    case "multi_select":
      return { multi_select: Array.isArray(value) ? value.map(v => ({ name: String(v) })) : [] };
    case "date":
      return { date: { start: String(value) } };
    case "people":
      console.warn(`⚠️  People property '${propName}' in entity '${entityName}' is skipped (requires Notion user IDs).`);
      return {};
    case "files":
      return {};
    case "email":
      return { email: String(value) };
    case "phone":
      return { phone_number: String(value) };
    case "url":
      return { url: String(value) };
    case "checkbox":
      return { checkbox: Boolean(value) };
    case "number":
      return { number: Number(value) };
    case "status":
      return { status: { name: String(value) } };
    case "relation":
      // Look up related page ID(s) by name from relationMap
      if (!relationMap || !relationMap[propName] || !relationMap[propName][value]) {
        console.warn(`⚠️  Relation property '${propName}' in entity '${entityName}' could not resolve value '${value}' to a Notion page ID.`);
        return {};
      }
      return { relation: Array.isArray(relationMap[propName][value]) ? relationMap[propName][value].map(id => ({ id })) : [{ id: relationMap[propName][value] }] };
    case "formula":
      return {};
    case "last_edited_time":
      return {};
    default:
      return { rich_text: [{ type: "text", text: { content: String(value) } }] };
  }
};

// Parse YAML spec and extract sample data
// Returns { sampleData, entityOrder }
async function getSampleDataFromSpec() {
  const spec = yaml.load(fs.readFileSync(SPEC_FILE_PATH, "utf8"));
  const entities = spec.entities || {};
  const sampleData = {};
  // Determine seeding order: referenced entities first
  const entityOrder = Object.keys(entities);
  return { sampleData, entityOrder, entities };
}


/**
 * Main function to seed the databases.
 */
async function seed() {
  console.log("🌱 Starting to seed Notion databases with sample data...");


  // 1. Load database IDs
  let dbIds;
  try {
    dbIds = JSON.parse(fs.readFileSync(DB_IDS_FILE_PATH, "utf8"));
  } catch (error) {
    console.error(`❌ Error reading notion-ids.json: ${error.message}`);
    console.error("Please run 'npm run setup' first to create the databases.");
    process.exit(1);
  }

  // 2. Load sample data and entity order from YAML spec
  const { sampleData: seedData, entityOrder, entities } = await getSampleDataFromSpec();

  // 3. Seed referenced entities first (no relations)
  // SAFETY: This script never deletes or overwrites Notion pages or databases. Only creates and updates properties.
  const createdPages = {};
  for (const entityName of entityOrder) {
    const entityDef = entities[entityName];
    if (!entityDef.sample_data || !Array.isArray(entityDef.sample_data)) continue;
    const dbId = dbIds[entityName];
    if (!dbId) continue;
    createdPages[entityName] = [];
    for (const row of entityDef.sample_data) {
      // Set title property as string
      const titlePropName = Object.entries(entityDef.properties).find(([k, v]) => v.type === "title")?.[0];
      if (titlePropName && typeof row[titlePropName] === "object" && row[titlePropName] !== null) {
        row[titlePropName] = String(row[titlePropName]);
      }
      // Only seed non-relation properties in first pass
      const properties = {};
      for (const [prop, propDef] of Object.entries(entityDef.properties)) {
        if (propDef.type === "relation" || propDef.type === "people") continue;
        if (row[prop] !== undefined) {
          const type = typeof propDef === "string" ? propDef : propDef.type;
          properties[prop] = formatProperty(type, row[prop], prop, entityName, {});
        }
      }
      try {
        // SAFETY: Only create new pages, never delete or overwrite existing ones.
        const page = await notion.pages.create({
          parent: { database_id: dbId },
          properties,
        });
        createdPages[entityName].push({ id: page.id, row });
        const nameProp = properties[titlePropName]?.title?.[0]?.text?.content;
        console.log(`    ✅ Created page: '${nameProp || "(no title)"}' in '${entityName}'`);
      } catch (error) {
        console.error(`❌ Failed to create page in '${entityName}':`, error.body || error.message);
      }
    }
  }

  // 4. Build relationMap after referenced entities are seeded
  const relationMap = {};
  for (const [entityName, entityDef] of Object.entries(entities)) {
    for (const [propName, propDef] of Object.entries(entityDef.properties || {})) {
      if (propDef.type === "relation" && propDef.target_entity) {
        if (!relationMap[propName]) relationMap[propName] = {};
        const targetEntity = propDef.target_entity;
        for (const page of createdPages[targetEntity] || []) {
          const titlePropName = Object.entries(entities[targetEntity].properties).find(([k, v]) => v.type === "title")?.[0];
          const title = page.row[titlePropName];
          if (title) {
            relationMap[propName][title] = page.id;
          }
        }
      }
    }
  }

  // 5. Second pass: update pages with relation and people properties
  for (const entityName of entityOrder) {
    const entityDef = entities[entityName];
    if (!entityDef.sample_data || !Array.isArray(entityDef.sample_data)) continue;
    const dbId = dbIds[entityName];
    if (!dbId) continue;
    for (let i = 0; i < entityDef.sample_data.length; i++) {
      const row = entityDef.sample_data[i];
      const page = createdPages[entityName][i];
      const updateProps = {};
      for (const [prop, propDef] of Object.entries(entityDef.properties)) {
        if (propDef.type === "relation" && row[prop]) {
          const type = propDef.type;
          updateProps[prop] = formatProperty(type, row[prop], prop, entityName, relationMap);
        }
        // Optionally handle people properties here if you want
      }
      if (Object.keys(updateProps).length > 0) {
        try {
          // SAFETY: Only update properties, never delete or overwrite page content.
          await notion.pages.update({
            page_id: page.id,
            properties: updateProps,
          });
          console.log(`    🔗 Updated relations for page in '${entityName}'`);
        } catch (error) {
          console.error(`❌ Failed to update relations for page in '${entityName}':`, error.body || error.message);
        }
      }
    }
  }

  // 3. Iterate over sample data and create pages
  for (const [entityName, pages] of Object.entries(seedData)) {
    const dbId = dbIds[entityName];
    if (!dbId) {
      console.warn(`⚠️  Skipping '${entityName}': Database ID not found in notion-ids.json.`);
      continue;
    }

    console.log(`  - Seeding '${entityName}'...`);
    for (const pageProperties of pages) {
      try {
        // Re-format properties with relationMap for each page
        const entityDef = (yaml.load(fs.readFileSync(SPEC_FILE_PATH, "utf8")).entities || {})[entityName];
        const properties = entityDef?.properties || {};
        const formattedProps = {};
        for (const [prop, value] of Object.entries(pageProperties)) {
          const propDef = properties[prop];
          if (!propDef) continue;
          const type = typeof propDef === "string" ? propDef : propDef.type;
          formattedProps[prop] = formatProperty(type, value, prop, entityName, {}); // Pass empty relationMap for now
        }
        await notion.pages.create({
          parent: { database_id: dbId },
          properties: formattedProps,
        });
        const nameProp = formattedProps.Name?.title?.[0]?.text?.content || formattedProps.Role_Name?.title?.[0]?.text?.content || formattedProps.Full_Name?.title?.[0]?.text?.content || formattedProps.Tool_Name?.title?.[0]?.text?.content || formattedProps.Company_Service_Name?.title?.[0]?.text?.content;
        console.log(`    ✅ Created page: '${nameProp || "(no title)"}'`);
      } catch (error) {
        console.error(`❌ Failed to create page in '${entityName}':`, error.body || error.message);
      }
    }
  }

  console.log("\n🌿 Seeding complete!");
}

seed();
