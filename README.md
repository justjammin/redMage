# redMage

![redMage tactical command menu: Scan, Analyze, Protect, Chain, Weave and Dispel](assets/command-menu.svg)

**A little creation magic. A little protection magic. One complete spellbook.**

redMage balances the craft of building with the discipline of guarding what matters. Reveal the requirements, shape the plan, summon a coordinated party of agents, and dispel complexity before the final cast. An FFVII-inspired command menu of independently invoked skills, each producing a focused artifact and stopping for your next instruction.

## Install as a plugin

### Codex

```sh
codex plugin marketplace add justjammin/redMage
codex plugin add redMage@justjammin
```

Start a new task and select `redMage:rdm`. The six phase skills are also available through the skill picker.

### Claude Code

Run inside Claude Code:

```text
/plugin marketplace add justjammin/redMage
/plugin install redMage@justjammin
```

Invoke `/redMage:rdm`, or a phase such as `/redMage:scan`. For a local development session:

```sh
claude --plugin-dir /absolute/path/to/redMage
```

Both plugins share the same bundled skills and references. If the repository is still private, installation requires GitHub access; once public, the same commands work without private-repository credentials.

## Install as a local skill bundle

The package now includes `package.json` and a `redmage` executable. From this checkout:

```sh
npx . --help
npx . install
```

Or from another directory:

```sh
npm install /absolute/path/to/redMage
npx redmage install
```

The executable copies the complete bundle into the current project's `.agents/skills/rdm`. Use `--global` for your personal skills directory, or `--dest /exact/skill/folder` for a custom destination. Existing destinations are preserved; use a fresh destination for testing. No npm lifecycle scripts run, and the executable downloads no dependencies.

This package is available from the checkout/GitHub, not published to the npm registry. Use this installer or the plugin marketplace to retain all sibling skills and shared references; copying `skills/rdm` alone is incomplete. The installer generates its entry from `skills/rdm/SKILL.md`, the single canonical router.

## The spellbook

| Ability | The magic | The work |
|---|---|---|
| **1. Scan** | Reveal what hides in the mist. | Clarify users, functional and non-functional requirements, domain terms, and testing seams. |
| **2. Analyze** | Give intent a true name. | Turn settled decisions into a specification with observable acceptance criteria. |
| **3. Protect** | Raise a ward against fragile design. | Choose file shapes and patterns, then challenge them with evidence. |
| **4. Chain** | Link each spell to the next. | Plan independently testable vertical slices, an agent DAG, assignments and verification. |
| **5. Weave** | Cast through a coordinated party. | Dispatch scoped subagents, implement, test, and review the result. |
| **6. Dispel** | Strip away needless enchantments. | Review through YAGNI, KISS, DRY, and SOLID; name what can be simplified. |

You steer the important decisions. Invoke one skill, review its output, then choose when to continue. `/rdm` selects one skill; when none is specified, it asks which to run. Missing prerequisites or unresolved decisions pause dependent work instead of automatically starting another skill.

The plugin manifest exposes the phase skills when loaded as a plugin. The npx installer installs the single `rdm` bundle; the selector loads its skills through relative paths rather than requiring separately registered commands.

## Local skill artifacts

Each phase saves its working documents under `.mage/` in the target project:

| Phase | Output |
|---|---|
| Scan | `.mage/<slug>/DISCOVERY.md`, `.mage/CONTEXT.md`, `.mage/adr/` |
| Analyze | `.mage/<slug>/SPEC.md` |
| Protect | `.mage/<slug>/DESIGN.md` |
| Chain | `.mage/<slug>/PLAN.md` |
| Weave | `.mage/<slug>/RESULTS.md` |
| Dispel | `.mage/<slug>/REVIEW.md` |

Keep all feature documents in the same folder and use the exact filenames above in references. Scan records discovery and decisions; Analyze turns those into the formal specification. The selector writes no separate document. Keep `/.mage/` ignored by Git so decisions, plans and review evidence remain local. Product source, tests and explicitly requested shipped documentation stay in their normal project locations. Existing project knowledge remains readable without being moved or rewritten.

Only the new artifact names are supported. Before resuming an existing feature, manually rename its numbered phase records and update their internal links. Skills do not fall back to legacy names, automatically migrate records, or create duplicate outputs.

`PLAN.md` includes a Mermaid DAG of each slice's worker and independent reviewer, controller integration/verification, and independent whole-change review. Its assignment table names responsibilities, owned files, prerequisites and completion evidence, with assignment counts and planned peak concurrency. Dependency acceptance gates control dispatch; parallel branches require disjoint ownership and settled interfaces. Chain only plans these agents. Weave executes them when separately invoked, adapting concurrency to the host and recording actual execution in `RESULTS.md`.

After initial slice review, Weave allows at most two correction/re-review rounds, each with covering tests and independent re-review. Acceptance ends the loop early; required failures after round two remain blocked without an automatic third round. Weave can report implementation complete while complexity review is pending. A separate Dispel invocation produces `REVIEW.md` and is required before the change is fully reviewed; unresolved required findings still block completion. No skill starts the next one automatically, and Dispel's `stop: no` never authorizes fixes or continuation.

Start with the selected skill; no setup script or Python prerequisite is required. Beads and lean-ctx are not required or assumed installed. Ordinary host file, search and shell tools plus `.mage/` records are the default; existing project-configured trackers and code indexes are optional integrations. Weave requires host subagent support for independent implementation and review.

## Development checks

Run `npm test` to verify bundle installation, relative phase references and preservation of existing destinations. These are maintainer tests, not a user startup step.
