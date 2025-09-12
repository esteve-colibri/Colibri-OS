# Open Questions for Humans in the Loop

This document lists unresolved items and strategic ambiguities identified during the system design phase. These require discussion and decisions from stakeholders to finalize the implementation.

## 1. Technology & Integration
- **Notion's Role as CRM/PM Hub:** There is conflicting analysis on Notion's suitability as a primary CRM/PM hub. We need to decide on the scope of Notion's capabilities vs. a dedicated tool like HubSpot or Folk.
- **Folk's Role in Tech Stack:** Should Folk be integrated for multi-channel recruiting, or should we use another tool like HubSpot? We need to define its precise function.
- **AI Agent Integration:** A decision is pending on which specific AI agent tools (e.g., Salesforce's AI Agent) to investigate or adopt.
- **Paygates & Domains:** The status for "PAYGATES & DOMAINS" is "Unknown." We need to clarify requirements and make decisions for these elements.
- **Flexible No-Code Database:** The idea for a "Flexible no-code database for tracking prompts, coaching data, scripts" needs a decision on whether to implement it.
- **Additional Asynchronous/AI Tools:** Decisions are needed on the adoption and integration of several tools listed as "To Investigate" or "Idea" (e.g., Loom, Airtime, 11Labs, ChatGPT Pro, Perplexity, Claude).
- **Figma Design System Integration:** How should design components from the Figma Design System be documented and linked within Notion?
- **Notion Calendar Sync Limitations:** Notion Calendar is a "viewer" and lacks true bi-directional sync from Google Calendar to Notion databases. Do we accept this limitation or invest in a third-party sync service (e.g., 2sync)?
- **Zapier/Make.com Sync Complexity:** Achieving robust two-way sync is complex and creates "maintenance debt." Do we accept this complexity or seek dedicated sync services/custom API development?
- **Notion Relation Property Workaround:** Zapier's Notion connector cannot update Relation properties directly, requiring a technical workaround ("Code by Zapier" or "Webhooks"). Is this level of technical complexity acceptable?

## 2. Strategy & Definitions
- **Homeostasis Coefficient Definition:** The coefficient needs a clear, structured definition and format for tabulation.
- **Capital Efficiency Target Discrepancy:** The projected first-year TCO of the tech stack ($22,118.04) yields a capital efficiency of ~6.8x, far below the 40x target. Do we adjust the target, the feature set, or the budget?
