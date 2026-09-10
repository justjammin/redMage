# Dependency preflight and installation

Run before interviewing, using the absolute directory of this installed skill:

```sh
python3 <rdm-directory>/scripts/dependencies.py
```

The placeholders in these setup commands are resolved paths, not literal shell arguments. The checker uses only Python's standard library. It searches CODEX_HOME/skills (default ~/.codex/skills), ~/.agents/skills and Codex's plugin cache. `--root /path/to/skills` is repeatable and replaces default roots for other hosts or tests. Exit 0 means every manifest name was found; exit 1 means dependencies remain missing. Invalid arguments exit 2.

Show a compact available/missing summary before proceeding. Resolve duplicate plugin versions against the current session catalog or enabled plugin configuration, never an arbitrary directory sort. The script reports candidates, not enabled-plugin status or semantic compatibility. Read selected skills and check their referenced files/subskills; the manifest covers known direct and workflow dependencies, not every future upstream dependency. Resolve newly required dependencies by the same process.

## Install only missing skills

1. Read `dependencies.json`. Source entries come from the author's installed skill registry; verify the repository, current skill path and desired revision before downloading. They are provenance, not a guarantee that an upstream path still exists.
2. For a GitHub source, use the installed **skill-installer** skill and its `install-skill-from-github.py` helper. Supply `--repo` from `source`, `--path` from `skillPath` with `/SKILL.md` removed, and `--ref` with the resolved revision. Install the full skill directory so references and assets travel with it. Respect existing authorization and host network/filesystem permissions. Do not overwrite installed skills or run fetched project scripts.
3. For Superpowers and Ponytail, prefer their existing plugin installation/update mechanism. If absent, resolve their publisher through the host's plugin catalog or a user-provided repository. Do not invent an npm package or assume a same-named community package is official. Installing an entire plugin retains sibling skills and supporting files.
4. For custom skills such as grunt with no recorded public source, use a user-provided repository or complete local skill folder. Never silently substitute sideeye for grunt. The local installer is executable today:

```sh
python3 <rdm-directory>/scripts/dependencies.py --install grunt --from-dir /path/to/grunt
```

`--dest /path/to/skills` selects another destination root. Include that destination with `--root` on subsequent checks if it is outside default roots. Copy the full folder, including catalogs and judge protocol. Use local folders only from a source authorized for this installation. Existing destinations are preserved. The command still exits 1 if other dependencies remain missing; inspect its report rather than assuming installation failed.

5. Rerun preflight, read the selected skill files and check their referenced resources. Report installed names, resolved locations and unresolved dependencies. New skills may require the next turn or session refresh for discovery. Stop before the interview if required skills remain unavailable; give the exact missing source/input needed. Never claim installation when only instructions were generated.

## npx distribution boundary

redMage is currently a skill folder, not a published npm package. An external `npx` skill downloader does not automatically execute this preflight. Run it after download; redMage also runs it on invocation. No npm lifecycle hooks are installed. A future package should expose an explicit check/setup command rather than running arbitrary dependency installs during download.
