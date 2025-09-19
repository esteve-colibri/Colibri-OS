# GitHub Copilot: Repository Custom Instructions (Colibri Style)

Project scope
- Repository: esteve-colibri/Colibri-OS
- Purpose: Schemas, taxonomies, and canonical data structures and setup for Colibri OS in Notion + Google Workspace
- Primary languages: HTML, JavaScript

Colibri style principles
- Clarity first: explicit naming for schemas and taxonomy terms; short, precise documentation.
- Minimal dependencies: rely on standard Web APIs and simple tooling; introduce no new frameworks unless already present.
- Reproducible artifacts: examples should be runnable in a basic browser or via simple scripts.
- Consistent formatting: respect existing configs (.editorconfig, Prettier, ESLint). Keep line lengths reasonable and formatting consistent.
- Security and privacy: do not include private data, credentials, or proprietary content; use placeholders and synthetic examples.
- Documentation-first: include short inline docs and example records to illustrate structures.

Authoring guidance for Copilot
- Prefer simple, well-documented schema examples over complex abstractions.
- When modifying structures, include a short rationale and example before/after if relevant.
- Keep browser assets minimal (vanilla HTML/CSS/JS).

JavaScript guidance
- Prefer small, pure functions and standard Web APIs. Avoid adding dependencies unless already used.
- If proposing automation scripts, include prerequisites and a dry-run mode when modifying data.

Pull requests and code review
- Keep PRs small and focused with imperative commit messages.
- Update README or relevant docs when schemas/taxonomies change.

Non-goals / guardrails
- Do not introduce new front-end frameworks, build pipelines, analytics, or external services unless already part of the repo.
- Avoid tight coupling to third-party platforms; document assumptions clearly when necessary.