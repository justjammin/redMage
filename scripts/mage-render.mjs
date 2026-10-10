#!/usr/bin/env node
// Render .mage/<slug>/*.md phase records into one self-contained HTML page.
// Usage: node scripts/mage-render.mjs <path-to-.mage/<slug>> [--out <file>]
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, realpathSync } from 'node:fs';
import { join, basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const TEMPLATE = resolve(dirname(fileURLToPath(import.meta.url)), '../assets/mage-doc.html');
const PRIMITIVES = resolve(dirname(fileURLToPath(import.meta.url)), '../assets/mage-primitives.json');
const RECORDS = [['DISCOVERY', 'Discovery'], ['SPEC', 'Spec'], ['DESIGN', 'Design'], ['PLAN', 'Plan'], ['RESULTS', 'Results'], ['REVIEW', 'Review']];
const ORDER = ['DISCOVERY', 'PRD', 'SPEC', 'TRD', 'DESIGN', 'PLAN', 'RESULTS', 'REVIEW'];
const LABELS = Object.fromEntries(RECORDS.map(([n, l]) => [n, l]));
const PHASES = ['Scan', 'Analyze', 'Protect', 'Chain', 'Weave', 'Dispel'];

// Point record links at page tabs; drop other relative links (broken once the page is moved or shared).
function rewriteLinks(text, ids) {
  return text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label, href) => {
    if (/^(https?:|mailto:|#)/.test(href)) return m;
    if (/(^|\/)CONTEXT\.md(#.*)?$/.test(href)) return `[${label}](#glossary)`;
    if (/(^|\/)adr\/[^/]+\.md(#.*)?$/.test(href)) return `[${label}](#adrs)`;
    const sibling = href.match(/^(?:\.\/)?([\w.-]+)\.md(?:#.*)?$/);
    if (sibling && (!ids || ids.has(sibling[1].toLowerCase()))) return `[${label}](#${sibling[1].toLowerCase()})`;
    return label;
  });
}

function splitRow(row) {
  const s = row.trim().replace(/^\|/, '').replace(/(?<!\\)\|$/, '');
  const out = [];
  let cur = '';
  let tick = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '\\' && s[i + 1] === '|') { cur += '|'; i++; continue; }
    if (s[i] === '`') tick = !tick;
    if (s[i] === '|' && !tick) { out.push(cur.trim()); cur = ''; continue; }
    cur += s[i];
  }
  out.push(cur.trim());
  return out;
}

const SEPARATOR = /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/;

export function markdownToSections(md, ids) {
  const lines = md.replace(/\r\n?/g, '\n').split('\n');
  const sections = [];
  let title = null;
  let sec = null;
  let para = [];
  let list = null;
  const add = block => {
    if (!sec) sections.push(sec = { title: 'Overview', blocks: [] });
    sec.blocks.push(block);
    return block;
  };
  const flushPara = () => { if (para.length) add({ type: 'p', text: para.join(' ') }); para = []; };
  const flush = () => { flushPara(); list = null; };

  for (let i = 0; i < lines.length; i++) {
    const fence = lines[i].match(/^\s*```\s*([\w+-]*)/);
    if (fence) {
      flush();
      const body = [];
      while (++i < lines.length && !/^\s*```/.test(lines[i])) body.push(lines[i]);
      add(fence[1] === 'mermaid' ? { type: 'mermaid', text: body.join('\n') } : { type: 'code', lang: fence[1], text: body.join('\n') });
      continue;
    }
    const line = rewriteLinks(lines[i], ids);
    let m;
    if (!line.trim()) { flushPara(); continue; }
    if ((m = line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/))) {
      flush();
      if (m[1].length === 1 && title === null) title = m[2];
      else if (m[1].length === 2) sections.push(sec = { title: m[2], blocks: [] });
      else add({ type: 'h', text: m[2] });
      continue;
    }
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) { flush(); continue; }
    if (/^\s*\|/.test(line) && SEPARATOR.test(lines[i + 1] || '')) {
      flush();
      const columns = splitRow(line);
      const rows = [];
      for (i += 2; i < lines.length && /^\s*\|/.test(lines[i]); i++) rows.push(splitRow(rewriteLinks(lines[i], ids)));
      i--;
      add({ type: 'table', columns, rows });
      continue;
    }
    if ((m = line.match(/^\s*<summary>(.*)<\/summary>\s*$/))) { flush(); add({ type: 'h', text: m[1] }); continue; }
    if (/^\s*<\/?[a-zA-Z][^>]*>\s*$/.test(line)) { flush(); continue; }
    if (/^\s*>/.test(line)) {
      flush();
      const quote = [line];
      while (i + 1 < lines.length && /^\s*>/.test(lines[i + 1])) quote.push(rewriteLinks(lines[++i], ids));
      const text = quote.map(q => q.replace(/^\s*>\s?/, '').trim()).filter(Boolean).join(' ');
      add({ type: 'callout', tone: /^\*\*Warning/i.test(text) ? 'warn' : 'info', text });
      continue;
    }
    if ((m = line.match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/))) {
      flushPara();
      const type = /\d/.test(m[2]) ? 'steps' : 'list';
      // ponytail: nested items are flattened into the parent list; render real nesting if records start relying on it.
      if (!list || (!m[1] && list.type !== type)) list = add({ type, items: [] });
      list.items.push(m[3]);
      continue;
    }
    if (list && /^\s/.test(line)) { list.items[list.items.length - 1] += ' ' + line.trim(); continue; }
    list = null;
    para.push(line.trim());
  }
  flush();
  return { title, sections };
}

export function buildData(dir) {
  dir = resolve(dir);
  const files = readdirSync(dir).filter(f => f.endsWith('.md'));
  const known = ORDER.map(name => name + '.md');
  const sources = [
    ...ORDER.filter(name => files.includes(name + '.md')).map(name => ({ id: name.toLowerCase(), label: LABELS[name] || name, path: join(dir, name + '.md') })),
    ...files.filter(f => !known.includes(f)).sort().map(f => ({ id: f.slice(0, -3).toLowerCase(), label: f.slice(0, -3), path: join(dir, f) })),
  ];
  const context = join(dir, '..', 'CONTEXT.md');
  if (existsSync(context)) sources.push({ id: 'glossary', label: 'Glossary', path: context });
  const adrDir = join(dir, '..', 'adr');
  const adrs = existsSync(adrDir) ? readdirSync(adrDir).filter(f => f.endsWith('.md')).sort().map(f => join(adrDir, f)) : [];
  const ids = new Set(sources.map(s => s.id));

  const docs = sources.map(({ id, label, path }) => {
    const { title, sections } = markdownToSections(readFileSync(path, 'utf8'), ids);
    return { id, label, title: title || label, sections };
  });
  if (adrs.length) {
    docs.push({
      id: 'adrs', label: 'ADRs', title: 'Architecture decisions',
      sections: adrs.map(path => {
        const { title, sections } = markdownToSections(readFileSync(path, 'utf8'), ids);
        return {
          title: title || basename(path, '.md'),
          blocks: sections.flatMap((s, i) => (i === 0 && s.title === 'Overview' ? s.blocks : [{ type: 'h', text: s.title }, ...s.blocks])),
        };
      }),
    });
  }

  const slug = basename(dir);
  const discovery = docs.find(d => d.id === 'discovery');
  const discoveryMd = files.includes('DISCOVERY.md') ? readFileSync(join(dir, 'DISCOVERY.md'), 'utf8') : '';
  const projectUrl = (discoveryMd.match(/https:\/\/[^\s)>\]]*atlassian\.net\/browse\/[^\s)>\]]+|https:\/\/github\.com\/[^\s)>\]]+\/(?:issues|pull)\/\d+/) || [])[0];
  const lede = discovery?.sections[0]?.blocks.find(b => b.type === 'p')?.text;
  docs.push(JSON.parse(readFileSync(PRIMITIVES, 'utf8')));
  const mtime = Math.max(...[...sources.map(s => s.path), ...adrs].map(p => statSync(p).mtimeMs));
  const has = n => files.includes(n + '.md');
  const present = RECORDS.map(([name]) => has(name));
  const last = present.lastIndexOf(true);
  const alt = { Analyze: has('SPEC') ? null : has('TRD') ? 'TRD.md' : has('PRD') ? 'PRD.md' : null };
  const urlFile = join(dir, 'artifact.url');
  const artifact = existsSync(urlFile) ? readFileSync(urlFile, 'utf8').trim().split('\n')[0].trim() : '';

  return {
    project: slug,
    ...(projectUrl && { projectUrl }),
    title: discovery?.title && discovery.title !== discovery.label ? discovery.title : slug,
    ...(lede && { lede }),
    meta: [['Updated', new Date(mtime).toLocaleDateString('en-CA')], ...(/^https:\/\/\S+$/.test(artifact) ? [['Published', `[link](${artifact})`]] : [])],
    phases: PHASES.map((name, i) => present[i]
      ? { name, state: 'done', note: RECORDS[i][0] + '.md' }
      : alt[name] ? { name, state: 'done', note: alt[name] }
      : i < last ? { name, state: 'skipped', note: 'Skipped' }
      : i === last + 1 ? { name, state: 'next', note: 'Next' } : { name, state: 'todo', note: 'Not started' }),
    docs,
  };
}

const escapeHtml = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function render(dir) {
  const data = buildData(dir);
  return readFileSync(TEMPLATE, 'utf8')
    .replace('__MAGE_TITLE__', () => escapeHtml(data.title))
    .replace('__MAGE_DATA__', () => JSON.stringify(data, null, 1).replace(/</g, '\\u003c'));
}

function main(args) {
  const outAt = args.indexOf('--out');
  const out = outAt >= 0 ? args.splice(outAt, 2)[1] : null;
  if (args.length !== 1 || (outAt >= 0 && !out)) throw new Error('Usage: node scripts/mage-render.mjs <path-to-.mage/<slug>> [--out <file>]');
  const dir = resolve(args[0]);
  if (!existsSync(dir) || !statSync(dir).isDirectory()) throw new Error(`Record directory not found: ${dir}`);
  if (!readdirSync(dir).some(f => f.endsWith('.md'))) throw new Error(`No .md records in ${dir}`);
  const target = resolve(out || join(dir, 'index.html'));
  writeFileSync(target, render(dir));
  console.log(target);
}

if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  try { main(process.argv.slice(2)); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
