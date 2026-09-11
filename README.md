# redMage

![redMage tactical command menu: Scan, Analyze, Protect, Chain, Weave and Dispel](assets/command-menu.svg)

**A little creation magic. A little protection magic. One complete spellbook.**

redMage balances the craft of building with the discipline of guarding what matters. Reveal the requirements, shape the plan, summon a coordinated party of agents, and dispel complexity before the final cast. An FFVII-inspired command menu for a workflow that takes an idea through verified implementation.

## Install with npx skills

```sh
npx skills add justjammin/redMage --skill rdm --agent codex
```

Add `--global` for installation across projects. Omit `--agent codex` to choose another supported agent. This repository is private: the installing account needs repository access and working GitHub/Git authentication. A recipient such as Ninjamin needs access before using this source.

Then invoke `/rdm` (or `$rdm` in the host's skill selector). The root skill installs the complete bundle, including the six phases, pattern references and preflight script. Do not install `skills/rdm` alone: it is the plugin's internal router and requires sibling files.

### Where is package.json?

This installation format does not need one. In `npx skills add justjammin/redMage`, npm supplies the **skills** CLI; that CLI downloads **redMage** from GitHub and reads its root `SKILL.md`. The `.codex-plugin/plugin.json` file is the separate Codex plugin manifest.

redMage is not published on the npm registry. A standalone command such as `npx @justjammin/redmage` would require a separate executable npm package and publication; it is not the command provided here.

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
