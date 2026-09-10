#!/usr/bin/env python3
"""Check redMage dependencies or install a missing skill from a local source folder."""
import argparse
import json
import os
from pathlib import Path
import shutil
import sys

MANIFEST = Path(__file__).resolve().parents[1] / 'references/dependencies.json'

def matches(path, name):
    try:
        text = path.read_text()
        header = text.split('---', 2)[1] if text.startswith('---') else ''
        return any(line.strip() in (f'name: {name}', f'name: "{name}"', f"name: '{name}'") for line in header.splitlines())
    except (OSError, UnicodeError):
        return False

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', action='append', type=Path, help='Search only these skill roots; repeatable')
    parser.add_argument('--install', help='Manifest skill name to install from --from-dir')
    parser.add_argument('--from-dir', type=Path)
    parser.add_argument('--dest', type=Path, help='Destination skill root')
    args = parser.parse_args()
    rows = json.loads(MANIFEST.read_text())
    codex = Path(os.environ.get('CODEX_HOME', str(Path.home()/'.codex')))
    roots = args.root if args.root is not None else [codex/'skills', Path.home()/'.agents/skills', codex/'plugins/cache']
    candidates = [p for root in roots if root.exists() for p in root.rglob('SKILL.md')]
    if args.install:
        if args.install not in {r['name'] for r in rows} or not args.from_dir:
            parser.error('--install requires a manifest name and --from-dir')
        if any(matches(p, args.install) for p in candidates):
            print('Already available; no files changed.')
        else:
            source = args.from_dir.resolve()
            if not matches(source/'SKILL.md', args.install):
                parser.error('Source SKILL.md missing or name does not match')
            destination = (args.dest or codex/'skills')/args.install
            if destination.exists() or destination.is_symlink():
                parser.error('Destination exists; refusing to overwrite')
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copytree(source, destination)
            candidates.append(destination/'SKILL.md')
            print(f'Installed {args.install}: {destination}', file=sys.stderr)
    result = []
    for row in rows:
        paths = sorted({str(p) for p in candidates if matches(p, row['name'])})
        result.append({**row, 'status': 'available' if paths else 'missing', 'paths': paths})
    print(json.dumps(result, indent=2))
    return 1 if any(r['status']=='missing' for r in result) else 0

if __name__ == '__main__':
    sys.exit(main())
