
# Project Overview: 🏔️The Colibri-OS Digital Office

Welcome to the Colibri Digital Office—a comprehensive, interconnected "Digital Office" built primarily within Notion. This project aims to create a central nervous system for the organization: not just a passive repository, but an active, intelligent environment that supports work, reinforces culture, and streamlines operations.

## Purpose & Core Principles
- **Clarity & Transparency:** Structured data and clear processes (like RACI) ensure everyone knows their responsibilities.
- **Value-Driven Work:** Projects, tasks, and even AI systems are directly linked to our core Value-Rules.
- **Intelligent Culture-Building:** The Culture Homeostasis Index (CHI) uses Signals to measure and nurture organizational culture, providing feedback and suggesting Micro-Habits.
- **Robust AI Governance:** A rigorous framework for developing and deploying AI systems, compliant with regulations (e.g., EU AI Act) and guided by ethical principles.
- **Seamless Operations:** Key business functions—recruiting, onboarding, knowledge management, CRM—are integrated into a single, cohesive workspace.

## System Overview & Setup
The Digital Office is built on a collection of interconnected Notion databases, each representing a core entity of the organization. The `digital_office_schema_spec.yaml` file contains the detailed technical schema for each database, its properties, and their relationships.

### Setup Steps
1. **Create the Databases:** Manually create each database in Notion as defined in the entities section of the schema file.
2. **Define Properties:** For each database, add properties (columns) exactly as specified, paying close attention to property types (e.g., Select, Relation, Status).
3. **Establish Relations:** Link databases using the Relation property type, as defined in the relationships section. For example, relate Workstreams to Value_Rules.
4. **Build the Views:** For each core database, create recommended views (Kanban boards, Calendars, filtered Lists) to support workflows like project tracking, recruiting, and onboarding.

### Key Workflows
- **Project Management:** Workstreams are tracked on Kanban boards, with every task assigned a Responsible, Accountable, Consulted, and Informed (RACI) team member.
- **Recruiting:** Open Roles and Candidates are managed through a pipeline, all linked to their respective roles and hiring teams.
- **Knowledge Management:** The "Watering the Tree" workflow allows anyone to quickly add new Knowledge Items (links, files, ideas) into a central library using a simple form.
- **AI Governance:** Every new AI System is logged and assessed for risk, with comprehensive documentation on its capabilities, guardrails, and compliance measures.
- **Culture Monitoring (CHI):** Signals (e.g., meeting sentiment, dissent rates) are collected and analyzed to generate a live "health score" for culture, triggering alerts and suggesting improvements.

## Context & Core Concepts
- **Chaordic Taxonomy:** A color-coded status system (Green, Yellow, Blue, Red, Black, White) provides instant, consistent visual cues about the state of any item.
- **Semantic Rule Matching Engine (SRME):** Connects cultural tensions (Triggers) to Value-Rules and suggests concrete Rules and Micro-Habits to improve alignment.
- **ADHD-Friendly Naming:** Consistent naming conventions make files and projects easy to find and understand at a glance.
- **Integration:** While Notion is the core, the system is designed to integrate with external tools like Google Calendar and CRM (Folk or HubSpot) via automation services (Zapier, Make.com). See open_questions.md for integration challenges.

---
Colibri-OS is more than a template—it's a living system for purposeful, adaptive, and human-centered work. Welcome to your new digital office!
