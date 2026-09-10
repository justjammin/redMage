---
name: rdm
description: "redMage workflow \u2014 Scan, Analyze, Protect, Chain, Weave and Dispel with bundled local skills."
---

# redMage

Use `/rdm` for the whole workflow. The plugin phase names are redMage:scan, redMage:analyze, redMage:protect, redMage:chain, redMage:weave and redMage:dispel. Hosts may normalize namespace casing; resolve skills by this bundle's relative paths. Never substitute an unrelated same-named skill.

## Preflight

Run `python3 <plugin-root>/scripts/dependencies.py` before interviewing. This validates the bundled skills/resources; it never searches a user's plugin cache or installs external skills. If a file is missing, report the exact path and restore/reinstall this plugin from its trusted source. Do not fetch unrelated skills as a fallback. Python 3, Git and host subagent capabilities are execution prerequisites, not bundled programs.

Read target AGENTS.md and project knowledge. Use available ctx tools first; if unavailable use direct tools and disclose the limitation. Follow repository tracking requirements. Resume tracker state before dispatching work. Skill phases, task numbers and numbered files begin at 1.

## Workflow

1. [Scan](../scan/SKILL.md): requirements interview, glossary, ADRs and agreed test seams.
2. [Analyze](../analyze/SKILL.md): synthesize the settled spec.
3. [Protect](../protect/SKILL.md): architecture/file shapes and solo evidence-based judging.
4. [Chain](../chain/SKILL.md): concrete vertical-slice plan.
5. [Weave](../weave/SKILL.md): subagent implementation, independent reviews and integrated verification.
6. [Dispel](../dispel/SKILL.md): main-session YAGNI → KISS → DRY → SOLID review of the complete task diff.

Read each local skill at its phase. Scan asks for shared understanding and seam confirmation; reuse confirmations already given. Later phases proceed within settled scope and existing authorization. Do not repeat the execution-mode question. Report each transition with what is settled, artifact links, next work and whether a human decision is needed. Keep the human informed during longer execution, not only at phase boundaries.

Dispel is review-only and does not replace correctness/security checks. Finish with delivered requirements, verification evidence, unresolved gaps and branch state. Creation/editing of this plugin does not invoke its pipeline on an unrelated project.

