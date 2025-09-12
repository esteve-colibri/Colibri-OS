# Quick Start: VS Code + GitHub Setup

This is a condensed guide for developers who want to quickly set up the Colibri Digital Office project with Visual Studio Code and GitHub synchronization.

## 5-Minute Setup

### 1. Prerequisites (Install if needed)
- [Git](https://git-scm.com/)
- [Node.js 18+](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)

### 2. Clone & Open
```bash
# Navigate to your desktop
cd Desktop

# Clone the repository
git clone https://github.com/esteve-colibri/Colibri-OS.git

# Open in VS Code
cd Colibri-OS
code .
```

### 3. Setup Environment
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 4. Configure Notion (Required for functionality)
1. Edit `.env` file with your Notion API token and parent page ID
2. See [main README](README.md) for detailed Notion setup instructions

### 5. VS Code Features Ready to Use

#### Debugging
- Press `F5` to debug setup or seed scripts
- Breakpoints work in all `.mjs` files

#### Tasks (Ctrl+Shift+P → "Tasks: Run Task")
- `npm: setup` - Create Notion workspace
- `npm: seed` - Add sample data
- `Git: Pull/Push` - Sync with GitHub

#### Git Integration
- Source Control panel shows all changes
- Built-in merge conflict resolution
- One-click commit and sync

## Daily Workflow
```bash
git pull        # Get latest changes
# Make your changes
git add .
git commit -m "Your changes"
git push        # Sync to GitHub
```

## Need More Details?
See the complete [VS Code Setup Guide](VS_CODE_SETUP.md) for troubleshooting and advanced features.

---
*You're now ready to develop and sync with the Colibri Digital Office repository!*