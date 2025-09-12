# Notion Digital Office Setup

This project contains a set of scripts to automatically provision a comprehensive, interconnected "Digital Office" in Notion, based on the schema defined in spec.yaml.

It's designed for developers and operations personnel who want a repeatable, code-driven way to build and manage their Notion workspace structure.

## Features
- **Schema-Driven:** All databases and properties are generated directly from the spec.yaml file. No manual creation needed.
- **Automated Setup:** A single command creates all specified databases.
- **Relation Mapping:** Automatically handles setting up relations between the newly created databases.
- **Beginner-Friendly:** Clear, step-by-step instructions to get you up and running quickly.
- **Optional Seeding:** An optional script can populate your new databases with sample data to demonstrate functionality.

## Prerequisites
Before you begin, ensure you have the following:
- **Node.js:** Version 18.0.0 or higher.
- **Notion Account:** A Notion account with a workspace you can add integrations to.
- **A Parent Page:** An empty page in your Notion workspace where the new databases will be created.

## Development Setup
For detailed instructions on setting up your local development environment with Visual Studio Code and GitHub synchronization, see our comprehensive [Visual Studio Code Setup Guide](VS_CODE_SETUP.md).

## 🚀 Quick Start Guide

### Step 1: Clone the Repository
First, clone this repository to your local machine.
```bash
git clone <repository-url>
cd notion-digital-office-setup
```

### Step 2: Install Dependencies
Install the necessary Node.js packages using npm.
```bash
npm install
```

### Step 3: Configure Your Notion Integration
You need to create a Notion integration to allow the scripts to interact with your workspace via the API.
1. Go to [My Integrations](https://www.notion.so/my-integrations).
2. Click **+ New integration**.
3. Give it a name (e.g., "Digital Office Setup").
4. Select the **Associated workspace** where you want to create the office.
5. Under **Capabilities**, ensure it can Read, Update, and Insert content.
6. Click **Submit**.
7. On the next screen, copy the **Internal Integration Secret**. This is your `NOTION_TOKEN`.

### Step 4: Set Up Your Environment Variables
1. Make a copy of the example environment file:
	```bash
	cp .env.example .env
	```
2. Open the new `.env` file in your editor.
3. Paste your Notion Integration Secret into the `NOTION_TOKEN` field.
4. Navigate to the empty Notion page you created as a parent. The URL will look something like this: `https://www.notion.so/Your-Page-Title-a1b2c3d4e5f61234a1b2c3d4e5f61234`.
5. Copy the 32-character string at the end of the URL and paste it into the `PARENT_PAGE_ID` field.
6. Save and close the `.env` file.

### Step 5: Share the Parent Page with Your Integration
You must "share" the parent page with your new integration so that it has permission to create databases inside it.
1. Go to your parent page in Notion.
2. Click the **•••** menu in the top-right corner.
3. Click **+ Add connections**.
4. Find and select the integration you created (e.g., "Digital Office Setup").
5. Click **Confirm**.

### Step 6: Run the Setup Script
Now you're ready to create the databases. Run the following command from your terminal:
```bash
npm run setup
```
The script will connect to the Notion API and begin creating the databases defined in `spec.yaml`. It will log its progress. Upon completion, it will create a `notion-ids.json` file containing the IDs of the newly created databases.

### Step 7: (Optional) Seed with Sample Data
To add some sample records to your new digital office, run the seed script:
```bash
npm run seed
```
This will populate databases like Value_Rules and Workstreams with a few example entries.

---
That's it! Your Notion-based Digital Office is now set up and ready to use.
