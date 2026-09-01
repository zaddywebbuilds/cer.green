#!/usr/bin/env node
/**
 * Pre-launch content gate.
 *
 * Fails when unresolved content markers remain in the content layer. The brief
 * this site was built to is explicit that `[VERIFY WITH CER]` and
 * `[CONTENT REQUIRED]` must never reach production, so this makes that a build
 * failure rather than a matter of remembering.
 *
 *   node scripts/check-content.mjs           report only, exit 0
 *   node scripts/check-content.mjs --strict  exit 1 if any marker is found
 *
 * Run with --strict in the production deploy pipeline. See docs/DEPLOYMENT.md.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SCAN_DIRS = ['content', 'lib', 'app', 'components'];
const MARKER = /\[(VERIFY WITH CER|CONTENT REQUIRED)[^\]]*\]/g;
/** `needsVerification('...')` produces a marker at runtime, so catch it too. */
const NEEDS_VERIFICATION = /needsVerification\(\s*['"`]([^'"`]+)['"`]/g;
const LOREM = /\blorem ipsum\b/gi;
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'out']);

/**
 * Files that implement the marker mechanism itself rather than carrying
 * unresolved content.
 *
 * `lib/site.ts` is deliberately NOT listed: the missing address, telephone and
 * UEN there are genuine launch blockers and must be reported. Individual lines
 * that construct or match a marker opt out with a trailing
 * `check-content-ignore` comment instead.
 */
const ALLOWED = new Set(['components/ui/Verify.tsx', 'scripts/check-content.mjs']);

const IGNORE_LINE = /check-content-ignore/;

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (/\.(ts|tsx|md)$/.test(entry.name)) yield path;
  }
}

const strict = process.argv.includes('--strict');
const findings = [];

for (const dir of SCAN_DIRS) {
  for await (const file of walk(join(ROOT, dir))) {
    const rel = relative(ROOT, file).replace(/\\/g, '/');
    if (ALLOWED.has(rel)) continue;

    const source = await readFile(file, 'utf8');
    const lines = source.split('\n');

    lines.forEach((line, index) => {
      if (IGNORE_LINE.test(line)) return;
      for (const match of line.matchAll(MARKER)) {
        findings.push({ file: rel, line: index + 1, text: match[0], kind: 'placeholder' });
      }
      for (const match of line.matchAll(LOREM)) {
        findings.push({ file: rel, line: index + 1, text: match[0], kind: 'lorem' });
      }
    });

    // `needsVerification(...)` is frequently formatted across several lines, so
    // it is matched against the whole file and the line number derived.
    for (const match of source.matchAll(NEEDS_VERIFICATION)) {
      const line = source.slice(0, match.index).split('\n').length;
      if (IGNORE_LINE.test(lines[line - 1] ?? '')) continue;
      findings.push({
        file: rel,
        line,
        text: `needsVerification: ${match[1]}`,
        kind: 'placeholder',
      });
    }
  }
}

if (findings.length === 0) {
  console.log('Content check: no unresolved markers found.');
  process.exit(0);
}

const byFile = new Map();
for (const finding of findings) {
  if (!byFile.has(finding.file)) byFile.set(finding.file, []);
  byFile.get(finding.file).push(finding);
}

console.log(
  `\nContent check: ${findings.length} unresolved item${findings.length === 1 ? '' : 's'} in ${byFile.size} file${byFile.size === 1 ? '' : 's'}.\n`,
);

for (const [file, items] of byFile) {
  console.log(`  ${file}`);
  for (const item of items) {
    console.log(`    ${String(item.line).padStart(5)}  ${item.text}`);
  }
  console.log('');
}

console.log(
  strict
    ? 'These must be resolved before this build can go to production.\n'
    : 'Resolve these before launch. Run with --strict in the production pipeline.\n',
);

process.exit(strict ? 1 : 0);
