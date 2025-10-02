#!/bin/bash
cd ~/Desktop/ColibriOS_Notion_Backup/opendemos/templates
node backup_notion.js
cd ~/Desktop/ColibriOS_Notion_Backup
git add .
git commit -m "Nightly Notion backup $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main
chmod +x ~/Desktop/ColibriOS_Notion_Backup/nightly_backup.sh

