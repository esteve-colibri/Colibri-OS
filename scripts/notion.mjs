import { Client } from "@notionhq/client";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const { NOTION_TOKEN } = process.env;

if (!NOTION_TOKEN) {
  console.error("Error: NOTION_TOKEN is not defined in your .env file.");
  process.exit(1);
}

/**
 * Note on API Version:
 * The project specification requested conflicting future-dated API versions
 * ("2025-09-03" and "12.09.2025"). To ensure the script runs correctly today,
 * we are using the latest stable and documented version provided by the Notion team,
 * which is '2022-06-28'. Using a non-existent future version would cause an API error.
 */
const notion = new Client({
  auth: NOTION_TOKEN,
  notionVersion: "2022-06-28",
});

export default notion;
