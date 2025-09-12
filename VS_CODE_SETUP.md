# Visual Studio Code Development Setup Guide

This guide will help you set up your local development environment for the Colibri Digital Office project using Visual Studio Code and sync it with the GitHub repository.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Git:** Download from [git-scm.com](https://git-scm.com/)
- **Node.js:** Version 18.0.0 or higher from [nodejs.org](https://nodejs.org/)
- **Visual Studio Code:** Download from [code.visualstudio.com](https://code.visualstudio.com/)

## Step 1: Clone the Repository to Your Desktop

1. **Open Command Prompt or Terminal**
   - Windows: Press `Win + R`, type `cmd`, and press Enter
   - Mac: Press `Cmd + Space`, type `Terminal`, and press Enter
   - Linux: Press `Ctrl + Alt + T`

2. **Navigate to Your Desktop**
   ```bash
   cd Desktop
   ```

3. **Clone the Repository**
   ```bash
   git clone https://github.com/esteve-colibri/Colibri-OS.git
   ```

4. **Navigate to the Project Folder**
   ```bash
   cd Colibri-OS
   ```

## Step 2: Open the Project in Visual Studio Code

1. **Open VS Code from the Project Directory**
   ```bash
   code .
   ```
   
   Or alternatively:
   - Open Visual Studio Code
   - Go to `File > Open Folder`
   - Navigate to your Desktop and select the `Colibri-OS` folder

2. **Install Recommended Extensions**
   VS Code may prompt you to install recommended extensions. Click "Install" for:
   - **Node.js Extension Pack** (for JavaScript/Node.js development)
   - **GitLens** (for enhanced Git integration)
   - **YAML** (for YAML file support)
   - **Prettier** (for code formatting)

## Step 3: Set Up the Development Environment

1. **Install Project Dependencies**
   - Open the integrated terminal in VS Code: `Terminal > New Terminal`
   - Run the following command:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   - Open the `.env` file and configure your Notion API credentials (see main README.md for details)

## Step 4: VS Code Configuration Features

The project now includes pre-configured VS Code settings that provide:

### Debugging Support
- **Launch Configurations:** Debug the setup and seed scripts directly from VS Code
- **Breakpoint Support:** Set breakpoints in JavaScript/Node.js files
- **Environment Variable Loading:** Automatically loads your `.env` file during debugging

### Task Runner Integration
Access pre-configured tasks via `Terminal > Run Task`:
- **npm: install** - Install dependencies
- **npm: setup** - Run the Notion setup script
- **npm: seed** - Run the seed script
- **Git: Pull** - Pull latest changes from GitHub
- **Git: Push** - Push your changes to GitHub

### Editor Settings
- **Automatic formatting** on save
- **Consistent indentation** (2 spaces)
- **YAML syntax highlighting** for configuration files
- **JavaScript/Node.js** enhanced support

## Step 5: Git Integration and Syncing

### Using VS Code's Built-in Git Features

1. **View Changes**
   - Click the Source Control icon in the left sidebar (or press `Ctrl+Shift+G`)
   - See all modified files and their changes

2. **Commit Changes**
   - Stage files by clicking the `+` icon next to each file
   - Enter a commit message in the text box
   - Click the checkmark icon or press `Ctrl+Enter`

3. **Sync with GitHub**
   - Click the sync icon in the status bar (bottom of VS Code)
   - Or use `View > Command Palette` and search for "Git: Push" or "Git: Pull"

### Command Line Git Operations

You can also use the integrated terminal for Git operations:

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push

# Pull latest changes
git pull
```

## Step 6: Running the Application

### Using VS Code Tasks
1. Open Command Palette: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. Type "Tasks: Run Task"
3. Select from available tasks:
   - `npm: setup` - Set up your Notion workspace
   - `npm: seed` - Add sample data

### Using the Integrated Terminal
```bash
# Set up Notion workspace
npm run setup

# Add sample data
npm run seed
```

### Using the Debugger
1. Go to the Run and Debug view: `Ctrl+Shift+D`
2. Select a launch configuration:
   - "Launch Setup Script" - Debug the setup process
   - "Launch Seed Script" - Debug the seeding process
3. Press F5 to start debugging

## Step 7: Keeping Your Local Repository in Sync

### Daily Workflow
1. **Before starting work:** Pull latest changes
   ```bash
   git pull
   ```

2. **After making changes:** Commit and push
   ```bash
   git add .
   git commit -m "Describe your changes"
   git push
   ```

### Handling Conflicts
If you encounter merge conflicts:
1. VS Code will highlight conflicted files in the Source Control panel
2. Open the conflicted files and resolve conflicts using VS Code's merge editor
3. Mark conflicts as resolved by staging the files
4. Commit the resolution

## Troubleshooting

### Common Issues

1. **"git not found" error**
   - Ensure Git is installed and added to your system PATH
   - Restart VS Code after installing Git

2. **"node not found" error**
   - Ensure Node.js is installed and added to your system PATH
   - Restart VS Code after installing Node.js

3. **Permission denied when pushing to GitHub**
   - Set up SSH keys or configure Git credentials
   - See [GitHub's authentication guide](https://docs.github.com/en/authentication)

4. **VS Code not recognizing the workspace**
   - Make sure you opened the root folder of the repository, not a subfolder
   - Check that `.vscode` folder exists in the project root

### Getting Help

- **VS Code Documentation:** [code.visualstudio.com/docs](https://code.visualstudio.com/docs)
- **Git Documentation:** [git-scm.com/doc](https://git-scm.com/doc)
- **Node.js Documentation:** [nodejs.org/en/docs](https://nodejs.org/en/docs/)

## Next Steps

Once your environment is set up:
1. Review the main [README.md](README.md) for project-specific setup instructions
2. Check out [Project_ReadMe.md](Project_ReadMe.md) to understand the Colibri Digital Office schema
3. Explore the `scripts/` directory to understand the codebase
4. Start contributing to the project!

---

*This setup guide ensures you have a fully functional development environment that stays in sync with the GitHub repository.*