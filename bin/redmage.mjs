#!/usr/bin/env node
import { cpSync, mkdirSync, lstatSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const help = `redMage — install the complete skill bundle

Usage: redmage [install] [--global | --dest <skill-folder>]
Default: .agents/skills/rdm in the current project
--global: ~/.agents/skills/rdm
--dest: exact destination folder
Existing destinations are preserved. No dependencies are downloaded.
`;
try {
  if (args.includes('--help') || args.includes('-h')) {
    console.log(help);
  } else {
    if (args[0] === 'install') args.shift();
    let dest = resolve('.agents/skills/rdm');
    if (args.length === 1 && args[0] === '--global') {
      dest = join(homedir(), '.agents/skills/rdm');
    } else if (args.length === 2 && args[0] === '--dest' && !args[1].startsWith('--')) {
      dest = resolve(args[1]);
    } else if (args.length) {
      throw new Error(`Unknown arguments.\n${help}`);
    }
    let exists = false;
    try { lstatSync(dest); exists = true; } catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (exists) throw new Error(`Destination already exists: ${dest}. No files changed.`);
    const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
    mkdirSync(dest, { recursive: true });
    for (const entry of manifest.files.filter(name => name !== 'bin')) {
      cpSync(join(root, entry), join(dest, entry), { recursive: true, errorOnExist: true, force: false });
    }
    const router = readFileSync(join(root, 'skills/rdm/SKILL.md'), 'utf8');
    writeFileSync(join(dest, 'SKILL.md'), router.replaceAll('](../', '](skills/'));
    console.log(`Installed redMage to ${dest}\nInvoke /rdm in your agent.`);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
