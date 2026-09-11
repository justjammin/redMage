# redMage

A bundled agent skill for requirements, architecture, implementation and review.

## Install with npx skills

```sh
npx skills add justjammin/redMage --skill rdm --agent codex
```

Add `--global` for installation across projects. Omit `--agent codex` to choose another supported agent. This repository is private: the installing account needs repository access and working GitHub/Git authentication. A recipient such as Ninjamin needs access before using this source.

Then invoke `/rdm` (or `$rdm` in the host's skill selector). The root skill installs the complete bundle, including the six phases, pattern references and preflight script. Do not install `skills/rdm` alone: it is the plugin's internal router and requires sibling files.

No npm package, lifecycle hook or external skill download is required. The `skills` CLI is the npm-delivered installer; redMage is its GitHub skill source.

## Workflow

1. **Scan** — functional/non-functional requirements, glossary and agreed testing seams.
2. **Analyze** — synthesize the specification.
3. **Protect** — architecture, file shapes and evidence-based pattern decisions.
4. **Chain** — concrete vertical-slice implementation plan.
5. **Weave** — scoped subagents, tests and independent correctness review.
6. **Dispel** — main-session YAGNI, KISS, DRY and SOLID review.

The plugin manifest exposes the phase skills when loaded as a plugin. The npx installer installs the single `rdm` bundle; the workflow loads its phases through relative paths rather than requiring separately registered commands.

## Verify an installation

From the installed `rdm` folder:

```sh
python3 scripts/dependencies.py
```

Expected: seven bundled skills and no missing references. Python 3 is needed for preflight; execution also needs Git and host subagent tools. Node/npm is needed to run the installer.

The bundle was tested with an actual `npx skills add` copy installation in an isolated project, followed by the installed dependency check. Domain formats, pattern catalogs and examples travel with the bundle. See [provenance](PROVENANCE.md) for source adaptations.
