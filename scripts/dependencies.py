#!/usr/bin/env python3
"""Validate bundled redMage skills and their local Markdown references."""
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
NAMES = ('rdm', 'scan', 'analyze', 'protect', 'chain', 'weave', 'dispel')

def check(root):
    errors = []
    for name in NAMES:
        path = root / 'skills' / name / 'SKILL.md'
        if not path.is_file():
            errors.append(f'Missing skill: {path.relative_to(root)}')
        elif not re.search(rf'^name: {name}$', path.read_text(), re.M):
            errors.append(f'Wrong skill name: {path.relative_to(root)}')
    for path in root.rglob('*.md'):
        text = re.sub(r'```.*?```', '', path.read_text(), flags=re.S)
        for target in re.findall(r'\]\(([^)]+)\)', text):
            if '://' in target or target.startswith('#'):
                continue
            target = target.split('#')[0]
            if not (path.parent / target).exists():
                errors.append(f'Broken reference: {path.relative_to(root)} -> {target}')
    return errors

if __name__ == '__main__':
    errors = check(ROOT)
    print(json.dumps({'skills': len(NAMES), 'errors': errors}, indent=2))
    sys.exit(bool(errors))
