import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { buildData, markdownToSections } from '../scripts/mage-render.mjs';

const cli = resolve('scripts/mage-render.mjs');
const discovery = `# Demo feature

Ticket https://acme.atlassian.net/browse/DEMO-1 is the intro.
See [Spec](SPEC.md) and [file](app/x.php).

## Requirements

| ID | Priority | Requirement |
|----|----------|-------------|
| FR-1 | Must | Split on \`a|b\` safely |

- first item
  continued here
- second item

\`\`\`sh
npm test
\`\`\`

> Note this.

### Sub

Danger </script><script>alert(1)</script> text.
`;

test('renders phase records into one page', () => {
  const temp = mkdtempSync(join(tmpdir(), 'redmage-render-'));
  try {
    const dir = join(temp, '.mage', 'demo');
    mkdirSync(dir, { recursive: true });
    mkdirSync(join(temp, '.mage', 'adr'));
    writeFileSync(join(dir, 'DISCOVERY.md'), discovery);
    writeFileSync(join(dir, 'SPEC.md'), '# Spec\n\n## Problem\n\nBack to [discovery](./DISCOVERY.md).\n');
    writeFileSync(join(dir, 'PRD.md'), '# PRD\n\nProduct notes.\n');
    writeFileSync(join(temp, '.mage', 'CONTEXT.md'), '# Demo\n\n## Language\n\n**Term**:\nA thing.\n');
    writeFileSync(join(temp, '.mage', 'adr', '0001-x.md'), '# Use X\n\n## Decision\n\nWe use X.\n');

    const data = buildData(dir);
    assert.deepEqual(data.docs.map(d => d.id), ['discovery', 'prd', 'spec', 'glossary', 'adrs', 'primitives']);
    assert.deepEqual(data.phases.map(p => p.state), ['done', 'done', 'next', 'todo', 'todo', 'todo']);
    assert.equal(data.projectUrl, 'https://acme.atlassian.net/browse/DEMO-1');
    assert.equal(data.title, 'Demo feature');
    assert.equal(data.docs[4].sections[0].title, 'Use X');

    const [overview, reqs] = data.docs[0].sections;
    assert.match(overview.blocks[0].text, /\[Spec\]\(#spec\) and file\.$/);
    assert.equal(data.lede, overview.blocks[0].text);
    const blocks = reqs.blocks;
    assert.deepEqual(blocks[0], { type: 'table', columns: ['ID', 'Priority', 'Requirement'], rows: [['FR-1', 'Must', 'Split on `a|b` safely']] });
    assert.deepEqual(blocks[1], { type: 'list', items: ['first item continued here', 'second item'] });
    assert.deepEqual(blocks[2], { type: 'code', lang: 'sh', text: 'npm test' });
    assert.deepEqual(blocks[3], { type: 'callout', tone: 'info', text: 'Note this.' });
    assert.deepEqual(blocks[4], { type: 'h', text: 'Sub' });
    assert.match(data.docs[2].sections[0].blocks[0].text, /\(#discovery\)/);

    const run = spawnSync(process.execPath, [cli, dir], { encoding: 'utf8' });
    assert.equal(run.status, 0, run.stderr);
    assert.equal(run.stdout.trim(), join(dir, 'index.html'));
    const html = readFileSync(join(dir, 'index.html'), 'utf8');
    assert.doesNotMatch(html, /__MAGE_/);
    assert.ok(!html.includes('</script><script>alert'));
    const json = html.match(/<script type="application\/json" id="data">\n([\s\S]*?)\n<\/script>/)[1];
    assert.deepEqual(JSON.parse(json), buildData(dir));

    const missing = spawnSync(process.execPath, [cli, join(temp, 'nope')], { encoding: 'utf8' });
    assert.equal(missing.status, 1);
    assert.match(missing.stderr, /not found/);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});

function mage(files, extra = {}) {
  const temp = mkdtempSync(join(tmpdir(), 'redmage-render-'));
  const dir = join(temp, '.mage', 'demo');
  mkdirSync(dir, { recursive: true });
  for (const f of files) writeFileSync(join(dir, f + '.md'), `# ${f}\n`);
  for (const [f, text] of Object.entries(extra)) writeFileSync(join(dir, f), text);
  return { dir, temp };
}

test('mermaid fence becomes a mermaid block', () => {
  const { sections } = markdownToSections('```mermaid\nflowchart LR\n  A-->B\n```\n```sh\nls\n```');
  assert.deepEqual(sections[0].blocks, [{ type: 'mermaid', text: 'flowchart LR\n  A-->B' }, { type: 'code', lang: 'sh', text: 'ls' }]);
});

test('tabs follow phase order with primitives last', () => {
  const { dir, temp } = mage(['DISCOVERY', 'PLAN', 'PRD', 'TRD', 'NOTES']);
  try {
    assert.deepEqual(buildData(dir).docs.map(d => d.id), ['discovery', 'prd', 'trd', 'plan', 'notes', 'primitives']);
  } finally { rmSync(temp, { recursive: true, force: true }); }
});

test('rail marks TRD-covered and skipped phases', () => {
  const a = mage(['DISCOVERY', 'TRD', 'PLAN']);
  const b = mage(['DISCOVERY', 'PLAN', 'REVIEW']);
  try {
    assert.deepEqual(buildData(a.dir).phases.map(p => [p.state, p.note]).slice(0, 4),
      [['done', 'DISCOVERY.md'], ['done', 'TRD.md'], ['skipped', 'Skipped'], ['done', 'PLAN.md']]);
    const rail = buildData(b.dir).phases;
    assert.deepEqual(rail.map(p => p.state), ['done', 'skipped', 'skipped', 'done', 'skipped', 'done']);
    assert.equal(rail[1].note, 'Skipped');
  } finally { for (const t of [a, b]) rmSync(t.temp, { recursive: true, force: true }); }
});

test('artifact.url adds a header link for any https URL only', () => {
  const urls = ['https://claude.ai/artifact/abc', 'https://cursor.com/canvas/abc'];
  const bads = ['http://example.com/x', 'javascript:alert(1)'];
  const ts = [...urls, ...bads].map(u => mage(['DISCOVERY'], { 'artifact.url': u + '\n' }));
  try {
    urls.forEach((u, i) => assert.deepEqual(buildData(ts[i].dir).meta[1], ['Published', `[link](${u})`]));
    bads.forEach((_, i) => assert.equal(buildData(ts[2 + i].dir).meta.length, 1));
  } finally { for (const t of ts) rmSync(t.temp, { recursive: true, force: true }); }
});
