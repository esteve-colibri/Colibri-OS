# 🦜 Colibri-OS Notion Template & View Setup Guide

This guide helps you manually set up Notion database templates and views to match your Blueprint Explorer UI. Use the YAML spec for API sync, and this guide for Notion UI/UX. Copy-paste the emojis for status, team, and tags as needed!

---

## 1️⃣ Workstreams
- **Default View:** Table/List showing all properties.
- **Kanban Board:** Group by **Status**
  - Status options: 🟢 Green, 🟡 Yellow, 🔵 Blue, 🔴 Red, ⚫ Black, ⚪ White
- **Calendar View:** Use **Date**, **StartDate**, or **EndDate**
- **Key Properties:**
  - Name (Title)
  - Status 🟢🟡🔵🔴⚫⚪
  - Team: Admin, Tools, Culture, Council, Products, Media, Research
  - ContentType: SaaS Platform, Consultancy, Courses, Website, Podcast, Video Shorts, Literature Review, Competitor Analysis, AIX Research

## 2️⃣ Value_Rules
- **Default View:** Table/List
- **Key Properties:**
  - Name (Title)
  - Exact_Wording
  - Anti_examples
  - Description

## 3️⃣ AI_Systems
- **Default View:** Table/List
- **Gallery View:** Group by **Risk_Level**
  - Risk_Level options: ❌ Unacceptable, 🟧 High, 🟨 Limited, 🟩 Minimal
- **Key Properties:**
  - Name (Title)
  - Risk_Level ❌🟧🟨🟩
  - Generative_AI_Risks: Hallucination, Data Poisoning, Malicious Use, Copyright Infringement

## 4️⃣ Signals
- **Default View:** Table/List
- **Key Properties:**
  - Signal_Input (Title)
  - Data_Type: Think, Say, Do, Feel
  - Source_View: Internal, External
  - Impact_Level: Micro, Meso, Macro, Mundo
  - Domain_Anchor: Human, Organizational, Operational, Environmental

## 5️⃣ Rules_SRME
- **Default View:** Table/List
- **Key Properties:**
  - Trigger (Title)
  - Value (Relation to Value_Rules)
  - Impact_Level: Micro, Meso, Macro, Mundo

## 6️⃣ Micro_Habits
- **Default View:** Table/List
- **Key Properties:**
  - Micro_habit (Title)
  - Related_Rule (Relation)
  - Related_Value (Relation)

## 7️⃣ Open_Roles
- **Default View:** Table/List
- **Kanban Board:** Group by **Status**
  - Status options: 🟢🟡🔵🔴⚫⚪
- **Key Properties:**
  - Role_Name (Title)
  - Team: Admin, Tools, Culture, Council, Products, Media, Research

## 8️⃣ Candidates
- **Default View:** Table/List
- **Kanban Board:** Group by **Status**
  - Status options: 🟢🟡🔵🔴⚫⚪
- **Key Properties:**
  - Full_Name (Title)
  - Open_Role (Relation)
  - Company (Relation)

## 9️⃣ Companies
- **Default View:** Table/List
- **Key Properties:**
  - Name (Title)
  - Folk_Company_ID

## 🔟 Contacts
- **Default View:** Table/List
- **Key Properties:**
  - Name (Title)

## 1️⃣1️⃣ Onboarding_ToDos
- **Default View:** Table/List
- **Kanban Board:** Group by **Status**
  - Status options: 🟢🟡🔵🔴⚫⚪
- **Key Properties:**
  - Goal_Task_Name (Title)
  - Assigned_Person

## 1️⃣2️⃣ Knowledge_Items
- **Default View:** Table/List
- **Form View:** For quick entry
- **Key Properties:**
  - Name (Title)
  - Type: Link, File, Insight
  - Tags: [Insight], [DataPoint], [Quote], [CaseStudy], [ActionItem], [Contact]

## 1️⃣3️⃣ Tech_Stack
- **Default View:** Table/List
- **Key Properties:**
  - Tool_Name (Title)
  - Tool_Category: Core Productivity & AI, Knowledge Management, Rapid Prototyping, Workflow Automation, Structured Data Intake, Security & Access, Platform Database & Workflows, Interaction Design (Asynchronous Tools), Sales, Research, Recruiting & Investor Networking, Paygates & Domains

## 1️⃣4️⃣ Benchmarks
- **Default View:** Table/List
- **Gallery View:** Group by **Category**
  - Category options: Direct Competitor, Inspirational Benchmark
- **Key Properties:**
  - Company_Service_Name (Title)
  - Category
  - Sub_Category

---

## 📝 Tips for Notion Setup
- Use the emoji options above for easy copy-paste into Notion select/multi-select/status fields.
- For each database, add a "New" template with the most important properties pre-filled or explained.
- Use Gallery, Board, Calendar, and Table views as shown above for best UX.
- For relations, use Notion's relation property to link databases as described.

---

**Keep this file handy as you build your Notion workspace!**
