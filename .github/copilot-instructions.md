# Colibri-OS Digital Office Setup

Colibri-OS is a Node.js application that automatically provisions a comprehensive, interconnected "Digital Office" in Notion based on a YAML schema definition. The system creates databases, relationships, and sample data for managing AI systems, workstreams, recruiting, knowledge management, and organizational culture measurement.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Prerequisites and Environment Setup
- Node.js version 18.0.0 or higher is required (current system has v20.19.5)
- Notion account with workspace access
- Empty parent page in Notion where databases will be created
- Notion integration with API access permissions

### Bootstrap and Dependencies
- `npm install` -- takes under 1 second, installs 32 packages including @notionhq/client, dotenv, js-yaml
- Dependencies are already satisfied in the repository (package-lock.json exists)
- No additional build step required (uses ES modules directly)

### Environment Configuration
- Copy `.env.example` to `.env`
- Set `NOTION_TOKEN` from your Notion integration (https://www.notion.so/my-integrations)
- Set `PARENT_PAGE_ID` from the URL of your target Notion page (32-character ID)
- Share the parent page with your Notion integration before running scripts

### Core Operations
- `npm run setup` -- creates all Notion databases based on digital_office_schema_spec.yaml. Takes 10-30 seconds depending on network and Notion API response time. NEVER CANCEL: Set timeout to 2+ minutes.
- `npm run seed` -- populates databases with sample data from the YAML schema. Takes 15-45 seconds. NEVER CANCEL: Set timeout to 2+ minutes.
- `node scripts/notion-export.mjs` -- exports existing databases to notion-backup/ directory as Markdown and CSV files. Takes 10-60 seconds depending on data volume.

### Testing and Validation
- `npm test` -- returns "Error: no test specified" (no formal test suite exists)
- Scripts include comprehensive error handling for API failures and missing environment variables
- Without proper Notion credentials, scripts fail gracefully with clear error messages

## Validation

### Manual Validation Requirements
Always validate functionality after making changes by running a complete setup workflow:

1. **Environment Test**: Run `npm run setup` without .env file - should display clear error message about missing NOTION_TOKEN
2. **Setup Validation**: With proper credentials, `npm run setup` should create 15 databases in Notion and generate `notion-ids.json`
3. **Seed Validation**: `npm run seed` should populate databases with sample records for testing relationships
4. **Export Validation**: `node scripts/notion-export.mjs` should create backup files in `notion-backup/` directory

### Critical Success Criteria
- All 15 databases created successfully (AI_Notebook_Knowledge_Hub, Workstreams, Value_Rules, AI_Systems, Signals, Rules_SRME, Micro_Habits, Open_Roles, Candidates, Companies, Contacts, Onboarding_ToDos, Knowledge_Items, Tech_Stack, Benchmarks)
- Relations between databases properly established (many-to-many and one-to-many links)
- Sample data populated correctly with RACI roles and status tracking
- Generated `notion-ids.json` contains valid database IDs

### Network Dependencies
- Scripts require internet access to api.notion.com
- Without network access, scripts fail with "ENOTFOUND api.notion.com" errors
- All API operations include error handling and clear failure messages

## Common Tasks

The following are outputs from frequently run commands. Reference them instead of viewing, searching, or running bash commands to save time.

### Repository Structure
```
/home/runner/work/Colibri-OS/Colibri-OS/
├── .env.example                              # Environment variables template
├── .gitignore                               # Git ignore rules
├── README.md                                # Notion Digital Office setup guide
├── Project_ReadMe.md                        # Colibri Digital Office overview
├── Colibri-OS_Project_Overview.md          # System overview and core principles
├── Open_Questions_for_Humans_in_the_Loop.md # Unresolved strategic decisions
├── digital_office_schema_spec.yaml         # Core schema definition (20KB)
├── notion-ids.json                          # Generated database IDs after setup
├── notebooklm_canvas_schema_prompt.txt     # Plain text schema for AI workflows
├── colibri-os-mockup.html                  # HTML mockup of the system
├── package.json                            # Node.js dependencies and scripts
├── package-lock.json                       # Locked dependency versions
├── docs/
│   ├── index.html                          # Documentation index
│   └── office_structure_summary.md         # Complete schema documentation
├── public-mockup/
│   └── index.html                          # Public-facing mockup
├── scripts/
│   ├── setup.mjs                           # Main database creation script
│   ├── seed.mjs                           # Sample data population script
│   ├── notion-export.mjs                  # Database backup/export script
│   └── notion.mjs                         # Notion API client wrapper
└── src/
    └── lib/
        └── notion.mjs                      # Notion API client configuration
```

### Key Schema Components
The `digital_office_schema_spec.yaml` defines 15 interconnected entities:
- **Workstreams**: Tasks, content pieces, products with RACI roles
- **Value_Rules**: Core organizational principles and behaviors
- **AI_Systems**: AI project inventory with EU AI Act compliance tracking
- **Signals**: Measurable inputs for Culture Homeostasis Index (CHI)
- **Knowledge_Items**: Central repository for documentation and learning
- **Tech_Stack**: Software and platform inventory with cost tracking
- **Open_Roles & Candidates**: Recruiting pipeline management
- **Companies & Contacts**: CRM functionality

### Sample package.json scripts
```json
{
  "scripts": {
    "setup": "node scripts/setup.mjs",
    "seed": "node scripts/seed.mjs", 
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

### Sample .env.example
```
# Notion API Integration Token
# 1. Go to https://www.notion.so/my-integrations
# 2. Click "+ New integration"
# 3. Give it a name, select the associated workspace, and submit.
# 4. Copy the "Internal Integration Secret" and paste it here.
NOTION_TOKEN=""

# ID of the parent page under which all new databases will be created.
# 1. Create a new, empty page in Notion.
# 2. Open the page and copy the 32-character ID from the URL.
#    e.g., if URL is https://www.notion.so/My-Office-Page-a1b2c3d4e5f67890a1b2c3d4e5f67890
#    The ID is a1b2c3d4e5f67890a1b2c3d4e5f67890
PARENT_PAGE_ID=""
```

## File Modification Guidelines

### Critical Files - Modify with Extreme Care
- `digital_office_schema_spec.yaml` -- Core schema definition. Changes affect database structure and relationships
- `src/lib/notion.mjs` -- Notion API client. Contains API version lock and authentication logic
- `package.json` -- Dependency management. Node.js version requirement and script definitions

### Safe to Modify
- Documentation files (README.md, Project_ReadMe.md, docs/)
- HTML mockups (colibri-os-mockup.html, public-mockup/)
- `.env` file (user-specific configuration)

### Generated/Dynamic Files - Do Not Modify Manually
- `notion-ids.json` -- Generated by setup script with database IDs
- `package-lock.json` -- Managed by npm install
- `notion-backup/` -- Generated by export script

## Troubleshooting

### Common Issues
- **"NOTION_TOKEN is not defined"**: Copy `.env.example` to `.env` and configure tokens
- **"ENOTFOUND api.notion.com"**: Network connectivity issue or firewall blocking API access  
- **"request to https://api.notion.com failed"**: Invalid Notion token or insufficient permissions
- **Relation property resolution failures**: Normal during seeding when referenced entities don't exist yet

### Network Requirements
- Outbound HTTPS access to api.notion.com required
- No additional ports or protocols needed
- Scripts handle API rate limiting and temporary failures gracefully

### Typical Execution Times
- `npm install`: <1 second (dependencies already satisfied)
- `npm run setup`: 10-30 seconds (creates 15 databases)
- `npm run seed`: 15-45 seconds (creates sample data with relationships) 
- `node scripts/notion-export.mjs`: 10-60 seconds (depends on data volume)

NEVER CANCEL these operations. Always set timeouts to at least 2+ minutes to account for Notion API response variability.