---
name: protect
description: "redMage:protect \u2014 choose and challenge architecture, file shapes and patterns using one evidence-grounded skeptic."
---

# 3. Protect



Write `docs/specs/<slug>-architecture.md` unless project conventions specify another location. Describe the simplest design satisfying the spec before adding patterns. Include:

- Entities, state transitions/invariants, interfaces, storage and request/data flow as applicable.
- Proposed file tree with create/modify/existing markers and one responsibility per touched file. Follow existing conventions; group cohesive features and avoid unrelated restructuring.
- File shapes: public symbols/signatures, input/output/error types, dependency direction, ownership of state and side effects, and test seams. Use concrete typed skeletons when they clarify contracts; no speculative framework scaffolding.
- Requirement-to-design table: FR/NFR ID → implementing component/files → mechanism or pattern → acceptance/verification evidence.
- Pattern decisions: observed pressure, simplest alternative, Apply/Reject/Investigate, tradeoff, supporting evidence, and what would change the verdict. “No named pattern; direct function/module” is a valid choice.

Read the local [OOP design guide](../../references/oop-design.md) first for selection tables, tradeoffs and original examples. Use it to shortlist candidates, not to mandate patterns. Consult [Refactoring.Guru's catalog](https://refactoring.guru/design-patterns/catalog) and open the specific pattern pages relevant to actual pressures. Cite those pages beside decisions. Distinguish object-design patterns from architectural/operational mechanisms; queues, replication and deployment topology need appropriate primary sources and Protect catalogs. Never force one pattern per requirement or treat a catalog as evidence that a pattern is necessary.

Run Protect in REVIEW mode with solo judging against the saved spec and architecture fixed point. Use SELECT when comparing undecided candidates, then REVIEW the authored choice. Read the relevant Protect catalogs and judge protocol. Protect reports findings without editing its review target; the controller applies justified revisions. Unresolved blockers prevent dependent planning. Keep unsupported choices as Investigate with an evidence-gathering action, not as approved architecture. Reconcile requirement changes with the spec and user decisions before continuing.

## Local judging contract

Run solo; never auto-enable a tribunal. Read [judge protocol](references/judge-protocol.md), then [coverage index](references/coverage-index.md) and only the catalogs relevant to observed pressures. [Catalog IDs](references/catalog.json) are canonical. SELECT compares unbuilt candidates; REVIEW tests a saved artifact. Name the fixed point, blast radius and reversibility before judging.

Report each finding with severity, failure, target, proof and smallest fix. P0 means data loss/security exposure or unreachable acceptance; P1 means material failure-path weakness; P2 means consequential ambiguity. Apply requires grounded evidence, Reject names absent pressure or a simpler sufficient option, Investigate names missing evidence and how to obtain it. No manufactured findings.

The reviewer never edits its target. The controller revises it and resolves P0/P1 design blockers before [Chain](../chain/SKILL.md). Report the choice, costs, rejected alternatives and unresolved decisions to the human.

