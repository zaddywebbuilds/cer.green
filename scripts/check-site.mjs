#!/usr/bin/env node
/**
 * Crawls a running build and checks the things that quietly break a launch:
 * broken internal links, duplicate or missing metadata, heading structure,
 * canonicals, and accidental noindex on pages that should be indexed.
 *
 * Start the server first, then:
 *   node scripts/check-site.mjs                 (defaults to http://localhost:3000)
 *   node scripts/check-site.mjs https://staging.example.com
 *
 * This is a fast structural check, not a replacement for Lighthouse or an
 * accessibility audit. See docs/QA-CHECKLIST.md for the full pre-launch list.
 */

const BASE = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '');

const visited = new Set();
const queue = ['/'];
const pages = [];
const problems = [];

const isInternal = (href) =>
  href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/api/');

function attr(html, tag, name) {
  const re = new RegExp(`<${tag}[^>]*\\b${name}=["']([^"']*)["'][^>]*>`, 'i');
  return html.match(re)?.[1];
}

function metaContent(html, key, attrName = 'name') {
  const re = new RegExp(
    `<meta[^>]*\\b${attrName}=["']${key}["'][^>]*\\bcontent=["']([^"']*)["']`,
    'i',
  );
  const alt = new RegExp(
    `<meta[^>]*\\bcontent=["']([^"']*)["'][^>]*\\b${attrName}=["']${key}["']`,
    'i',
  );
  return html.match(re)?.[1] ?? html.match(alt)?.[1];
}

async function crawl(path) {
  if (visited.has(path)) return;
  visited.add(path);

  let response;
  try {
    response = await fetch(`${BASE}${path}`, { redirect: 'manual' });
  } catch (error) {
    problems.push({ path, issue: `request failed: ${error.message}` });
    return;
  }

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('location');
    problems.push({ path, issue: `redirects (${response.status}) to ${location}` });
    return;
  }

  if (!response.ok) {
    problems.push({ path, issue: `HTTP ${response.status}` });
    return;
  }

  const html = await response.text();

  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim(),
  );
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const description = metaContent(html, 'description');
  const robots = metaContent(html, 'robots');
  const canonical = attr(html, 'link[^>]*rel=["\']canonical["\']', 'href') ??
    html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)?.[1];
  const jsonLdBlocks = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)];

  pages.push({ path, title, description, robots, canonical, h1s, jsonLd: jsonLdBlocks.length });

  const noindex = Boolean(robots?.includes('noindex'));

  // Structural checks. Heading structure and titles matter everywhere; search
  // metadata is only checked on pages that are actually meant to be indexed --
  // a canonical on a noindex portal page would be a mistake, not a fix.
  if (h1s.length === 0) problems.push({ path, issue: 'no H1' });
  if (h1s.length > 1) problems.push({ path, issue: `${h1s.length} H1 elements` });
  if (!title) problems.push({ path, issue: 'no <title>' });

  if (!noindex) {
    if (!description) problems.push({ path, issue: 'no meta description' });
    else if (description.length < 70 || description.length > 200) {
      problems.push({ path, issue: `meta description is ${description.length} chars` });
    }
    if (!canonical) problems.push({ path, issue: 'no canonical' });
  }

  for (const block of jsonLdBlocks) {
    try {
      JSON.parse(block[1]);
    } catch {
      problems.push({ path, issue: 'invalid JSON-LD' });
    }
  }

  // Images must carry an alt attribute (empty is valid, missing is not).
  for (const img of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt=/i.test(img[0])) {
      problems.push({ path, issue: `img without alt: ${img[0].slice(0, 80)}` });
    }
  }

  for (const link of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const href = link[1];
    const text = link[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().toLowerCase();

    if (['click here', 'read more', 'learn more', 'here', 'more'].includes(text)) {
      problems.push({ path, issue: `non-descriptive link text: "${text}" -> ${href}` });
    }

    if (!isInternal(href)) continue;
    const clean = href.split('#')[0];
    if (!clean || clean.includes('?')) continue;
    if (!visited.has(clean)) queue.push(clean);
  }
}

while (queue.length) {
  const next = queue.shift();
  await crawl(next);
}

// Duplicate title and description detection across the whole site.
const seenTitles = new Map();
const seenDescriptions = new Map();
for (const page of pages) {
  if (page.robots?.includes('noindex')) continue;
  if (page.title) {
    if (!seenTitles.has(page.title)) seenTitles.set(page.title, []);
    seenTitles.get(page.title).push(page.path);
  }
  if (page.description) {
    if (!seenDescriptions.has(page.description)) seenDescriptions.set(page.description, []);
    seenDescriptions.get(page.description).push(page.path);
  }
}

for (const [title, paths] of seenTitles) {
  if (paths.length > 1) {
    problems.push({ path: paths.join(', '), issue: `duplicate title: "${title}"` });
  }
}
for (const [, paths] of seenDescriptions) {
  if (paths.length > 1) {
    problems.push({ path: paths.join(', '), issue: 'duplicate meta description' });
  }
}

console.log(`\nCrawled ${pages.length} pages from ${BASE}\n`);

const indexable = pages.filter((p) => !p.robots?.includes('noindex'));
const noindexed = pages.filter((p) => p.robots?.includes('noindex'));
console.log(`  indexable: ${indexable.length}`);
console.log(`  noindex:   ${noindexed.length}${noindexed.length ? ` (${noindexed.map((p) => p.path).join(', ')})` : ''}`);
console.log(`  with JSON-LD: ${pages.filter((p) => p.jsonLd > 0).length}`);

if (problems.length === 0) {
  console.log('\nNo problems found.\n');
  process.exit(0);
}

console.log(`\n${problems.length} problem${problems.length === 1 ? '' : 's'}:\n`);
for (const problem of problems) {
  console.log(`  ${problem.path}\n    ${problem.issue}`);
}
console.log('');
process.exit(1);
