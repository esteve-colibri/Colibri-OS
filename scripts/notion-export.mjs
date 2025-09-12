// Notion backup/export script for Colibri-OS
// Exports all databases as Markdown and CSV for backup
import fs from "fs";
import path from "path";
import notion from "../src/lib/notion.mjs";
const DB_IDS_FILE_PATH = path.join(process.cwd(), "notion-ids.json");
const EXPORT_DIR = path.join(process.cwd(), "notion-backup");

async function exportDatabase(dbId, dbName) {
    const pages = await notion.databases.query({ database_id: dbId });
    if (!fs.existsSync(EXPORT_DIR)) fs.mkdirSync(EXPORT_DIR);
    // Markdown export
    const mdFile = path.join(EXPORT_DIR, `${dbName}.md`);
    let md = `# ${dbName}\n\n`;
    for (const page of pages.results) {
        md += `## Page: ${page.id}\n`;
        for (const [prop, val] of Object.entries(page.properties)) {
            md += `- **${prop}**: ${JSON.stringify(val)}\n`;
        }
        md += `\n`;
    }
    fs.writeFileSync(mdFile, md);
    // CSV export
    const csvFile = path.join(EXPORT_DIR, `${dbName}.csv`);
    const headers = Object.keys(pages.results[0]?.properties || {});
    let csv = headers.join(",") + "\n";
    for (const page of pages.results) {
        csv += headers.map(h => JSON.stringify(page.properties[h] || "")).join(",") + "\n";
    }
    fs.writeFileSync(csvFile, csv);
    console.log(`Exported ${dbName} to Markdown and CSV.`);
}

async function main() {
    let dbIds;
    try {
        dbIds = JSON.parse(fs.readFileSync(DB_IDS_FILE_PATH, "utf8"));
    } catch (e) {
        console.error("Could not read notion-ids.json");
        process.exit(1);
    }
    for (const [dbName, dbId] of Object.entries(dbIds)) {
        await exportDatabase(dbId, dbName);
    }
    console.log("\nBackup/export complete! Files are in ./notion-backup");
}

main();
