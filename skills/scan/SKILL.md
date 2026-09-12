---
name: scan
description: Use when feature requirements, domain terms, quality targets or consequential tradeoffs are unclear.
---

# 1. Scan

Save this phase's record to `.mage/<slug>/DISCOVERY.md` in the target project. Reuse the feature slug across phases, create directories as needed, and keep `/.mage/` ignored by Git. To resume legacy numbered records, require manual renaming and internal-link updates first; do not fall back, migrate automatically, or create duplicates.

Identify the target repository and existing work. Read applicable AGENTS.md, persistent project knowledge, glossary, ADRs, relevant code and tests. Use ordinary file reads and text search to trace definitions, imports and callers. Resume from the phase record; use specialized code tools or a tracker only when explicitly configured by the target project.

Use the interview and domain-documentation method below, working a decision tree in rounds. Research repository facts while waiting for decisions; delegate bounded independent fact-finding when useful. Ask the human only questions the code cannot answer and whose prerequisites are settled, give a recommendation and its tradeoff, and wait for answers that dependent work requires. Capture resolved terminology immediately; create ADRs only for consequential tradeoffs.

Build a prioritized requirements table:

- `FR-N`: actor, “user/client can…” behavior, benefit, priority, observable acceptance scenarios, and scope exclusions. Include relevant authorization, invalid input, empty state, failure and retry behavior.
- `NFR-N`: quality, affected operation, measurable target, operating conditions/load, verification method, and why the target matters. Label proposed targets as unconfirmed; never silently invent numbers.
- Record constraints, dependencies, assumptions, unresolved decisions and explicit non-goals separately.

Consider latency, capacity, consistency, availability, durability, recovery, security/privacy, accessibility, compatibility, operability and cost only where relevant. Resolve tradeoffs per operation; do not treat every system as distributed or every quality as mandatory. Estimate capacity only when it changes a design choice.

Discuss entities and invariants, external interfaces, the simplest end-to-end flow, then quality-driven refinements. The interview ends when in-scope requirements, important constraints and testing seams are settled and remaining unknowns are either nonblocking documented assumptions or explicit blockers. Present the concrete summary and test seams for confirmation, honoring confirmation already given. This is Scan's shared-understanding checkpoint; its discovery record supplies decisions for a separately requested specification.

Ground this phase in [Hello Interview's delivery framework](https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery). Adapt the prioritization and progression to real project work, not interview time limits or fixed requirement counts.

## Interview and domain documents

Challenge terms against the glossary and verify claims against code. Resolve overloaded terms using concrete business scenarios. Capture definitions immediately in `.mage/CONTEXT.md` using [the local format](references/CONTEXT-FORMAT.md). Read `.mage/CONTEXT-MAP.md` first if multiple contexts exist. Keep implementation details out of the glossary.

Write ADRs in `.mage/adr/` only for hard-to-reverse, surprising decisions with real alternatives; use [the ADR format](references/ADR-FORMAT.md). Start numbering at 1. Stop interviewing when the in-scope frontier is settled, not when every imaginable feature has been discussed.

Record settled FR/NFR IDs, glossary/ADR links, scope, assumptions, open questions and approved seams in `DISCOVERY.md`. Report the artifact, settled decisions and readiness or blockers, then stop. [Analyze](../analyze/SKILL.md) writes the formal specification only when separately requested; do not invoke it automatically.
