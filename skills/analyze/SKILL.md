---
name: analyze
description: Use when agreed requirements need a specification with observable acceptance criteria.
---

# 2. Analyze

Save this phase's record to `.mage/<slug>/SPEC.md` in the target project. Reuse the feature slug across phases, create directories as needed, and keep `/.mage/` ignored by Git. To resume legacy numbered records, require manual renaming and internal-link updates first; do not fall back, migrate automatically, or create duplicates.

Read `.mage/<slug>/DISCOVERY.md` and synthesize it with the conversation and codebase understanding. If it is missing, report the prerequisite and stop; do not use legacy numbered records or invoke another skill. Use the glossary and respect ADRs. If a material decision is missing, ask the specific question and pause dependent work; do not invent an answer or restart [Scan](../scan/SKILL.md). Use already agreed behavior seams; confirm genuinely new seams before planning tests.

The phase record is the specification. Include:

1. Problem Statement: the user's problem.
2. Solution: the resulting user experience.
3. User Stories: numbered “As an actor, I want behavior, so that benefit” statements covering agreed scope, with FR IDs and observable acceptance scenarios.
4. Non-functional Requirements: NFR IDs, operation, target, conditions, verification and rationale. Preserve confirmed values exactly.
5. Implementation Decisions: module responsibilities, contracts, architecture/schema choices. Keep exact file paths and implementation code in the architecture/plan, except decision-rich prototype snippets with attribution.
6. Testing Decisions: agreed public seams, external behavior, prior tests and meaningful failure cases.
7. Out of Scope: explicit exclusions.
8. Further Notes: constraints, dependencies, assumptions and unresolved gaps.

Publish to the configured project tracker within existing authorization; use its actual labels, including ready-for-agent only if defined. Without a configured tracker, the local spec is the output. Never run unrelated setup or guess a project. Record the spec revision, show `SPEC.md` and readiness or blockers, then stop. [Protect](../protect/SKILL.md) requires a separate invocation; do not start a second interview or advance automatically.
