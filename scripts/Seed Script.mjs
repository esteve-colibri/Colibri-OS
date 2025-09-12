import fs from "fs";
import path from "path";
import notion from "./notionClient.mjs";

const DB_IDS_FILE_PATH = path.join(process.cwd(), "notion-ids.json");

/**
 * Helper to create a Notion rich_text property value.
 * @param {string} content
 * @returns {object}
 */
const richText = (content) => ({
  rich_text: [{ type: "text", text: { content: content || "" } }],
});

/**
 * Helper to create a Notion title property value.
 * @param {string} content
 * @returns {object}
 */
const title = (content) => ({
  title: [{ type: "text", text: { content: content || "" } }],
});

/**
 * Helper to create a Notion select property value.
 * @param {string} name
 * @returns {object}
 */
const select = (name) => ({
  select: { name },
});

/**
 * Sample data to seed the databases.
 */
const seedData = {
  Value_Rules: [
    {
      Name: title("Clarity and Transparency"),
      Exact_Wording: richText("Ensure processes and responsibilities (like RACI) are clear to everyone."),
      Description: richText("This rule underpins our commitment to open communication and shared understanding. It helps eliminate confusion and empowers team members."),
    },
    {
      Name: title("Value-Driven Work"),
      Exact_Wording: richText("Directly link all projects, tasks, and systems back to our core values."),
      Description: richText("Every action should have a clear purpose that aligns with our organizational mission and values. This ensures we are always working on what matters most."),
    },
  ],
  Workstreams: [
    {
      Name: title("Deploy Q4 Marketing Website"),
      Status: { status: { name: "🟡 Yellow" } },
      Team: select("Media"),
      ContentType: select("Website"),
      Description: richText("Launch the new marketing website with updated branding and product information."),
    },
    {
      Name: title("Analyze Competitor X's New Feature"),
      Status: { status: { name: "🟢 Green" } },
      Team: select("Research"),
      ContentType: select("Competitor Analysis"),
      Description: richText("Conduct a thorough analysis of the latest feature release from our main competitor."),
    },
  ],
  Open_Roles: [
    {
      Role_Name: title("Senior Frontend Engineer"),
      Status: { status: { name: "🟢 Green" } },
      Team: select("Products"),
      Focus: richText("Building and maintaining our customer-facing SaaS platform."),
      Key_Activities: richText("Develop new user-facing features, ensure the technical feasibility of UI/UX designs, and optimize applications for maximum speed and scalability."),
    },
  ],
};


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

  // 2. Iterate over seed data and create pages
  for (const [entityName, pages] of Object.entries(seedData)) {
    const dbId = dbIds[entityName];
    if (!dbId) {
      console.warn(`⚠️  Skipping '${entityName}': Database ID not found in notion-ids.json.`);
      continue;
    }

    console.log(`  - Seeding '${entityName}'...`);
    for (const pageProperties of pages) {
      try {
        await notion.pages.create({
          parent: { database_id: dbId },
          properties: pageProperties,
        });
        console.log(`    ✅ Created page: '${pageProperties.Name?.title[0]?.text?.content || pageProperties.Role_Name?.title[0]?.text?.content}'`);
      } catch (error) {
        console.error(`❌ Failed to create page in '${entityName}':`, error.body || error.message);
      }
    }
  }

  console.log("\n🌿 Seeding complete!");
}

seed();
