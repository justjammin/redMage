import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';

const cli = resolve('bin/redmage.mjs');
test('installs a standalone router with resolvable phase links and no Python prerequisite', () => {
  const temp = mkdtempSync(join(tmpdir(), 'redmage-test-'));
  try {
    const dest = join(temp, 'skill bundle');
    const result = spawnSync(process.execPath, [cli, 'install', '--dest', dest], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.doesNotMatch(result.stdout, /python|preflight/i);
    const router = readFileSync(join(dest, 'SKILL.md'), 'utf8');
    assert.match(router, /# redMage/);
    for (const phase of ['scan', 'analyze', 'protect', 'chain', 'weave', 'dispel']) {
      assert.match(router, new RegExp(`skills/${phase}/SKILL.md`));
      const path = join(dest, 'skills', phase, 'SKILL.md');
      const content = readFileSync(path, 'utf8');
      for (const [, link] of content.matchAll(/\]\(([^)]+)\)/g)) {
        if (!link.includes('://') && !link.startsWith('#')) {
          assert.ok(existsSync(resolve(dirname(path), link)), `${phase}: ${link}`);
        }
      }
    }
    assert.equal(existsSync(join(dest, 'scripts/dependencies.py')), false);
    const again = spawnSync(process.execPath, [cli, '--dest', dest], { encoding: 'utf8' });
    assert.equal(again.status, 1);
    assert.equal(readFileSync(join(dest, 'SKILL.md'), 'utf8'), router);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});
