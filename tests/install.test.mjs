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
    const version = JSON.parse(readFileSync('package.json', 'utf8')).version;
    for (const manifest of ['.codex-plugin/plugin.json', '.claude-plugin/plugin.json']) {
      assert.equal(JSON.parse(readFileSync(join(dest, manifest), 'utf8')).version, version, manifest);
    }
    const marketplace = JSON.parse(readFileSync(join(dest, '.claude-plugin/marketplace.json'), 'utf8'));
    assert.equal(marketplace.plugins.find(plugin => plugin.name === 'redMage').version, version);
    const router = readFileSync(join(dest, 'SKILL.md'), 'utf8');
    assert.match(router, /# redMage/);
    const artifacts = {
      scan: ['DISCOVERY.md'],
      analyze: ['SPEC.md', 'DISCOVERY.md'],
      protect: ['DESIGN.md', 'SPEC.md'],
      chain: ['PLAN.md', 'SPEC.md', 'DESIGN.md'],
      weave: ['RESULTS.md', 'SPEC.md', 'DESIGN.md', 'PLAN.md'],
      dispel: ['REVIEW.md'],
    };
    for (const [phase, expectedArtifacts] of Object.entries(artifacts)) {
      assert.match(router, new RegExp(`skills/${phase}/SKILL.md`));
      const path = join(dest, 'skills', phase, 'SKILL.md');
      const content = readFileSync(path, 'utf8');
      const referencedArtifacts = [...content.matchAll(/\.mage\/<slug>\/([\w.-]+)/g)].map(match => match[1]);
      assert.deepEqual([...new Set(referencedArtifacts)], expectedArtifacts, `${phase}: output and prerequisite filenames`);
      assert.ok(router.includes(`.mage/<slug>/${expectedArtifacts[0]}`), `${phase}: router artifact`);
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
