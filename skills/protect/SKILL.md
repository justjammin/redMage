---
name: protect
description: Use when a specification needs architecture decisions or a proposed design needs evidence-based review.
---

# 3. Protect

Save this phase's record to `.mage/<slug>/DESIGN.md` in the target project. Reuse the feature slug across phases, create directories as needed, and keep `/.mage/` ignored by Git. To resume legacy numbered records, require manual renaming and internal-link updates first; do not fall back, migrate automatically, or create duplicates.

Read the specification at `.mage/<slug>/SPEC.md`. If it is missing, report the prerequisite and stop; do not use legacy numbered records or invoke another skill. The phase record contains architecture and review findings. Describe the simplest design satisfying the spec before adding patterns. Include:

- Entities, state transitions/invariants, interfaces, storage and request/data flow as applicable.
- Proposed file tree with create/modify/existing markers and one responsibility per touched file. Follow existing conventions; group cohesive features and avoid unrelated restructuring.
- File shapes: public symbols/signatures, input/output/error types, dependency direction, ownership of state and side effects, and test seams. Use concrete typed skeletons when they clarify contracts; no speculative framework scaffolding.
- Requirement-to-design table: FR/NFR ID → implementing component/files → mechanism or pattern → acceptance/verification evidence.
- Pattern decisions: observed pressure, simplest alternative, Apply/Reject/Investigate, tradeoff, supporting evidence, and what would change the verdict. “No named pattern; direct function/module” is a valid choice.

When observed pressures raise an object-design question, read the local [OOP design guide](../../references/oop-design.md) to shortlist candidates, then the relevant [pattern deep dives](../../references/pattern-deep-dives.md). Map selected participants to actual files, contracts, acceptance tests and failure behavior using its hydration checklist. Consult [Refactoring.Guru's catalog](https://refactoring.guru/design-patterns/catalog), open the relevant pattern pages and cite them beside decisions. Skip this object-pattern research when no such question exists. The general judge protocol and relevant architecture sources remain required: queues, replication and deployment topology need appropriate primary sources and Protect catalogs. Never force one pattern per requirement or treat a catalog as evidence that a pattern is necessary.

Run Protect in REVIEW mode with solo judging against the saved spec and architecture fixed point. Use SELECT when comparing undecided candidates, then REVIEW the authored choice. Read the relevant Protect catalogs and judge protocol. Protect reports findings without editing its review target; the controller applies justified revisions. Unresolved blockers prevent dependent planning. Keep unsupported choices as Investigate with an evidence-gathering action, not as approved architecture. Reconcile requirement changes with the spec and user decisions before continuing.

## Local judging contract

Run solo; never auto-enable a tribunal. Read [judge protocol](references/judge-protocol.md), then [coverage index](references/coverage-index.md) and only the catalogs relevant to observed pressures. [Catalog IDs](references/catalog.json) are canonical. SELECT compares unbuilt candidates; REVIEW tests a saved artifact. Name the fixed point, blast radius and reversibility before judging.

Report each finding with severity, failure, target, proof and smallest fix. P0 means data loss/security exposure or unreachable acceptance; P1 means material failure-path weakness; P2 means consequential ambiguity. Apply requires grounded evidence, Reject names absent pressure or a simpler sufficient option, Investigate names missing evidence and how to obtain it. No manufactured findings.

The reviewer never edits its target. The controller revises it and resolves P0/P1 design blockers before marking the design ready for planning. Ask about unresolved consequential decisions and pause dependent work rather than invoking another skill. Save `DESIGN.md`, report the choice, costs, rejected alternatives and readiness or blockers, then stop. [Chain](../chain/SKILL.md) requires a separate invocation.
