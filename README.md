# redMage

![redMage tactical command menu: Scan, Analyze, Protect, Chain, Weave and Dispel](assets/command-menu.svg)

**A little creation magic. A little protection magic. One complete spellbook.**

redMage balances the craft of building with the discipline of guarding what matters. Reveal the requirements, shape the plan, summon a coordinated party of agents, and dispel complexity before the final cast. An FFVII-inspired command menu for a workflow that takes an idea through verified implementation.

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

## Install with npx skills

```sh
npx skills add justjammin/redMage --skill rdm --agent codex
```

Add `--global` for installation across projects. Omit `--agent codex` to choose another supported agent. Private-repository installation requires working GitHub/Git authentication.

Then invoke `/rdm` (or `$rdm` in the host's skill selector). The root skill installs the complete bundle, including the six phases, pattern references and preflight script. Do not install `skills/rdm` alone: it is the plugin's internal router and requires sibling files.

### Direct local npm installation

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

This package is available from the checkout/GitHub, not published to the npm registry. The `npx skills add` installation above remains supported.

## The spellbook

| Ability | The magic | The work |
|---|---|---|
| **1. Scan** | Reveal what hides in the mist. | Clarify users, functional and non-functional requirements, domain terms, and testing seams. |
| **2. Analyze** | Give intent a true name. | Turn settled decisions into a specification with observable acceptance criteria. |
| **3. Protect** | Raise a ward against fragile design. | Choose file shapes and patterns, then challenge them with evidence. |
| **4. Chain** | Link each spell to the next. | Plan independently testable vertical slices and their dependencies. |
| **5. Weave** | Cast through a coordinated party. | Dispatch scoped subagents, implement, test, and review the result. |
| **6. Dispel** | Strip away needless enchantments. | Review through YAGNI, KISS, DRY, and SOLID; name what can be simplified. |

You steer the important decisions. redMage keeps the spellbook, coordinates the party, and reports what passed verification.

The plugin manifest exposes the phase skills when loaded as a plugin. The npx installer installs the single `rdm` bundle; the workflow loads its phases through relative paths rather than requiring separately registered commands.

## Verify an installation

From the installed `rdm` folder:

```sh
python3 scripts/dependencies.py
```

Expected: seven bundled skills and no missing references. Python 3 is needed for preflight; execution also needs Git and host subagent tools. Node/npm is needed to run the installer.

The bundle was tested with an actual `npx skills add` copy installation in an isolated project, followed by the installed dependency check. Domain formats, pattern catalogs and examples travel with the bundle.
