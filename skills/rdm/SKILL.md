---
name: rdm
description: Use when a feature needs requirements, architecture, a plan, implementation and review, or an existing redMage workflow needs resuming.
---

# redMage

Use `/rdm` for the whole workflow or `redMage:<phase>` for one phase. Resolve bundled skills through the relative links below.

## Working context

Read the target project's instructions and existing knowledge. Use the host's available tools and the project's configured tracker. If no tracker is configured, resume from the phase artifacts. Start directly with the needed phase.

## Artifact contract

All generated workflow records live in the target project's `.mage/`, including when a phase runs alone. Reuse one feature slug across phases. Create directories when first writing; keep `/.mage/` ignored by Git. Read existing project docs as inputs. Product source, tests and requested shipped documentation use normal project paths.

| Phase | Record |
|---|---|
| Scan | `.mage/scan/<slug>.md`, `.mage/CONTEXT.md`, `.mage/adr/` |
| Analyze | `.mage/analyze/<slug>.md` |
| Protect | `.mage/protect/<slug>.md` |
| Chain | `.mage/chain/<slug>.md` |
| Weave | `.mage/weave/<slug>.md` |
| Dispel | `.mage/dispel/<slug>.md` |

## Workflow

1. [Scan](../scan/SKILL.md): requirements interview, glossary, ADRs and agreed test seams.
2. [Analyze](../analyze/SKILL.md): synthesize the settled spec.
3. [Protect](../protect/SKILL.md): architecture/file shapes and solo evidence-based judging.
4. [Chain](../chain/SKILL.md): concrete vertical-slice plan.
5. [Weave](../weave/SKILL.md): subagent implementation, independent reviews and integrated verification.
6. [Dispel](../dispel/SKILL.md): main-session YAGNI → KISS → DRY → SOLID review of the complete task diff.

Read each skill when its phase begins. Reuse settled decisions and existing authorization. Report transitions with artifact links, verification evidence, next work and any required decision. Keep the human informed during execution.

Dispel reviews complexity; retain correctness and security checks. Finish with delivered requirements, verification, unresolved gaps and branch state.

## Common mistakes

- Installing only the router loses sibling references; install the plugin or complete bundle.
- Restarting interviews loses settled decisions; resume from existing phase records.
- Treating local records as deliverables adds repository noise; keep `.mage/` ignored.
