---
name: rdm
description: Use when choosing or resuming a redMage skill for discovery, specification, design, planning, implementation or review.
---

# redMage

Use `/rdm` to select one skill or `redMage:<phase>` to invoke it directly. If the user has not selected a skill, present the menu below and ask which to run. Resolve bundled skills through the relative links below; invoke only the selected skill.

## Working context

Read the target project's instructions and existing knowledge. Assume Beads and lean-ctx are absent. Use ordinary host file, search and shell tools; resume decisions and status from `.mage/` phase records. Integrate a tracker or indexed code tools only when the target project explicitly configures them. Do not install or initialize either for this workflow. Start directly with the needed phase.

## Artifact contract

All generated phase records live together in the target project's `.mage/<slug>/`, using one feature slug. Link other phase records by their artifact filenames, such as `SPEC.md` and `DESIGN.md`. Create directories when first writing; keep `/.mage/` ignored by Git. Read existing project docs as inputs. Product source, tests and requested shipped documentation use normal project paths. The selector has no separate output file.

Use only the filenames below. Existing numbered records require manual renaming and internal-link updates before resuming; do not fall back to them, migrate them automatically, or create duplicate records. Report missing prerequisites and stop without invoking another skill.

| Phase | Record |
|---|---|
| Scan | `.mage/<slug>/DISCOVERY.md`, `.mage/CONTEXT.md`, `.mage/adr/` |
| Analyze | `.mage/<slug>/SPEC.md` |
| Protect | `.mage/<slug>/DESIGN.md` |
| Chain | `.mage/<slug>/PLAN.md` |
| Weave | `.mage/<slug>/RESULTS.md` |
| Dispel | `.mage/<slug>/REVIEW.md` |

## Skill menu

1. [Scan](../scan/SKILL.md): requirements interview, glossary, ADRs and agreed test seams.
2. [Analyze](../analyze/SKILL.md): synthesize the settled spec.
3. [Protect](../protect/SKILL.md): architecture/file shapes and solo evidence-based judging.
4. [Chain](../chain/SKILL.md): concrete vertical-slice plan with an agent DAG and assignments.
5. [Weave](../weave/SKILL.md): subagent implementation, independent reviews and integrated verification.
6. [Dispel](../dispel/SKILL.md): main-session YAGNI → KISS → DRY → SOLID review of the complete task diff.

Read the selected skill and its prerequisites. Reuse settled decisions and existing authorization; ask only for unresolved decisions needed by the current work. Report its artifact, verification evidence, readiness or blockers, and then stop. Starting another skill requires a separate user instruction; do not automatically advance or route blockers to another skill.

Dispel reviews complexity; retain correctness and security checks. Weave may report implementation complete while complexity review is pending. A separate Dispel invocation is required before calling the whole change fully reviewed; an unresolved required finding still blocks completion.

## Common mistakes

- Installing only the router loses sibling references; install the plugin or complete bundle.
- Restarting interviews loses settled decisions; resume from existing phase records.
- Treating local records as deliverables adds repository noise; keep `.mage/` ignored.
