---
name: analyze
description: "redMage:analyze \u2014 synthesize settled requirements into an actionable spec without restarting the interview."
---

# 2. Analyze

Synthesize the conversation and codebase understanding. Use the glossary and respect ADRs. If a material decision is missing, return it to [Scan](../scan/SKILL.md); do not invent an answer. Use already agreed behavior seams; confirm genuinely new seams before planning tests.

Save `docs/specs/<slug>.md` unless project conventions differ. Include:

1. Problem Statement: the user's problem.
2. Solution: the resulting user experience.
3. User Stories: numbered “As an actor, I want behavior, so that benefit” statements covering agreed scope, with FR IDs and observable acceptance scenarios.
4. Non-functional Requirements: NFR IDs, operation, target, conditions, verification and rationale. Preserve confirmed values exactly.
5. Implementation Decisions: module responsibilities, contracts, architecture/schema choices. Keep exact file paths and implementation code in the architecture/plan, except decision-rich prototype snippets with attribution.
6. Testing Decisions: agreed public seams, external behavior, prior tests and meaningful failure cases.
7. Out of Scope: explicit exclusions.
8. Further Notes: constraints, dependencies, assumptions and unresolved gaps.

Publish to the configured project tracker within existing authorization; use its actual labels, including ready-for-agent only if defined. Otherwise keep the complete local spec and report publication pending. Never run unrelated setup or guess a project. Record the spec revision and hand off to [Protect](../protect/SKILL.md). Show the artifact and new gaps, not a second interview.

