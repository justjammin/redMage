---
name: scan
description: "redMage:scan \u2014 clarify functional and measurable non-functional requirements, glossary and consequential decisions."
---

# 1. Scan

Identify the target repository and existing work. Read applicable AGENTS.md, persistent project knowledge, glossary, ADRs, relevant code and tests. Prefer available ctx tools: compose first, then architecture/callgraph for exact symbols and affected boundaries. If unavailable, use direct tools and state the limitation. Create or resume tracking using the repository's workflow.

Use the interview and domain-documentation method below. Research repository facts yourself; delegate bounded independent fact-finding when useful. Ask only decisions whose prerequisites are settled, give a recommendation and its tradeoff, and wait for answers that dependent work requires. Capture resolved terminology immediately; create ADRs only for consequential tradeoffs.

Build a prioritized requirements table:

- `FR-N`: actor, “user/client can…” behavior, benefit, priority, observable acceptance scenarios, and scope exclusions. Include relevant authorization, invalid input, empty state, failure and retry behavior.
- `NFR-N`: quality, affected operation, measurable target, operating conditions/load, verification method, and why the target matters. Label proposed targets as unconfirmed; never silently invent numbers.
- Record constraints, dependencies, assumptions, unresolved decisions and explicit non-goals separately.

Consider latency, capacity, consistency, availability, durability, recovery, security/privacy, accessibility, compatibility, operability and cost only where relevant. Resolve tradeoffs per operation; do not treat every system as distributed or every quality as mandatory. Estimate capacity only when it changes a design choice.

Discuss entities and invariants, external interfaces, the simplest end-to-end flow, then quality-driven refinements. The interview ends when in-scope requirements, important constraints and testing seams are settled and remaining unknowns are either nonblocking documented assumptions or explicit blockers. Present the concrete summary and test seams for confirmation, honoring confirmation already given. Explain that this is the shared-understanding checkpoint of Scan and the test-seam handoff to Analyze.

Ground this phase in [Hello Interview's delivery framework](https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery). The originally requested [course URL](https://www.hellointerview.com/learn/courses/system-design/lesson/orientation/delivery) may be unavailable; use the public framework and disclose that fallback. Adapt the prioritization and progression to real project work, not interview time limits or fixed requirement counts.

## Interview and domain documents

Work a decision tree in rounds. Ask only the frontier whose prerequisites are settled; provide a recommended answer and tradeoff for each question. Discover repository facts yourself, using bounded research subagents when useful. Do not ask the human questions the code can answer. Keep independent research moving while waiting on decisions.

Challenge terms against the glossary and verify claims against code. Resolve overloaded terms using concrete business scenarios. Capture definitions immediately in CONTEXT.md using [the local format](references/CONTEXT-FORMAT.md). Read CONTEXT-MAP.md first if multiple contexts exist. Keep implementation details out of the glossary.

Write ADRs only for hard-to-reverse, surprising decisions with real alternatives; use [the ADR format](references/ADR-FORMAT.md). Start numbering at 1. Stop interviewing when the in-scope frontier is settled, not when every imaginable feature has been discussed. Present requirements and testing seams together for confirmation; honor answers and authorization already given.

Handoff: settled FR/NFR IDs, glossary/ADRs, scope, assumptions and approved seams to [Analyze](../analyze/SKILL.md). Report what is settled, artifact links, next phase and any decision needed.

