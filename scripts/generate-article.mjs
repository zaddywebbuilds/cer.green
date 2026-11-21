#!/usr/bin/env node
/**
 * Generates one new Insights article per run using DeepSeek.
 *
 * What it does:
 *   1. Harvests real search queries from Google and Bing autocomplete, seeded
 *      with the day's assigned category.
 *   2. Passes those queries to DeepSeek, so the topic is chosen from language
 *      searchers actually type rather than from invented keywords.
 *   3. Validates the result for keyword overlap and SEO field limits.
 *   4. Prepends the article to content/articles.ts.
 *
 * Autocomplete is used rather than search results because neither engine serves
 * usable results to a script: Google renders them in JavaScript, and Bing
 * degrades the query for non-browser clients, returning generic results for the
 * wrong subject. The suggest endpoints are plain JSON, need no key, and return
 * the exact phrasing people search with.
 *
 * Required env variable:
 *   DEEPSEEK_API_KEY
 *
 * Run:
 *   node scripts/generate-article.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_PATH = join(__dirname, '../content/articles.ts');

const API_KEY = process.env.DEEPSEEK_API_KEY;
if (!API_KEY) throw new Error('DEEPSEEK_API_KEY is not set.');

// ── Query harvesting ──────────────────────────────────────────────────────────
// Stems for the autocomplete lookup, not topic descriptions. The value is in
// what the engines complete them to, so they are deliberately short and
// unfinished: a complete sentence returns nothing useful.

const QUERY_SEEDS = {
  singapore: [
    'singapore climate reporting',
    'sgx sustainability reporting',
    'acra sustainability reporting',
    'singapore carbon tax',
  ],
  'carbon-climate': [
    'scope 3 emissions',
    'ghg inventory',
    'internal carbon price',
    'product carbon footprint',
  ],
  'sustainable-finance': [
    'sustainability linked loan',
    'financed emissions',
    'green bond framework',
    'climate transition plan',
  ],
  standards: [
    'iso 14064',
    'iso 14001',
    'iso 50001',
    'limited assurance sustainability',
  ],
  esg: [
    'double materiality',
    'esg data governance',
    'sustainable procurement',
    'board esg oversight',
  ],
  asean: [
    'asean taxonomy',
    'malaysia sustainability reporting',
    'indonesia esg regulation',
    'thailand sustainability disclosure',
  ],
  regulation: [
    'cbam requirements',
    'eu csddd',
    'ifrs s2',
    'carbon credit rules',
  ],
  training: [
    'carbon accounting course',
    'esg training',
    'sustainability certification',
    'ghg protocol training',
  ],
};

/** Pulls question-shaped queries out of the same stem. */
const QUERY_PREFIXES = ['', 'what is ', 'do i need ', 'when does '];

// ── Topic rotation ────────────────────────────────────────────────────────────
// Asking the model to "avoid what we have already covered" is not enough on its
// own: left to choose freely it returns to whatever is most prominent, which in
// this field is Singapore reporting, and the blog ends up arguing with itself
// for the same search terms. The category is therefore assigned by the date and
// the model writes to it, so consecutive days cannot land in the same area.

const CATEGORY_ROTATION = [
  'singapore',
  'carbon-climate',
  'sustainable-finance',
  'standards',
  'esg',
  'asean',
  'regulation',
  'training',
];

/** Seeds per category, so the suggested ground matches the day's assignment. */
const TOPIC_POOL = {
  singapore: [
    'SGX and ACRA reporting phasing by listing status and size',
    'Singapore Green Plan 2030 obligations for business',
    'MAS sustainability guidelines for financial institutions',
    'Singapore plastic and packaging reporting',
  ],
  'carbon-climate': [
    'Scope 3 screening and supplier engagement',
    'Internal carbon pricing as a decision tool',
    'Decarbonisation roadmaps and abatement sequencing',
    'Product carbon footprints and life cycle assessment',
  ],
  'sustainable-finance': [
    'Green and sustainability-linked loan structuring',
    'Financed emissions and PCAF methodology',
    'Transition finance and credibility of transition plans',
    'Climate risk in lending and investment decisions',
  ],
  standards: [
    'ISO 14001 implementation beyond certification',
    'ISO 50001 and energy management in practice',
    'ISO 14064 and greenhouse gas quantification',
    'Assurance readiness and evidence retention',
  ],
  esg: [
    'Double materiality assessment in practice',
    'ESG data governance and traceable KPIs',
    'Sustainable procurement and supplier standards',
    'Board oversight of sustainability performance',
  ],
  asean: [
    'ASEAN taxonomy adoption across member states',
    'Cross-border reporting for regional groups',
    'Indonesia, Malaysia and Thailand disclosure developments',
    'Regional supply chain due diligence exposure',
  ],
  regulation: [
    'CBAM obligations for Asian exporters',
    'EU CSDDD supply chain due diligence reach into Asia',
    'IFRS S1 and S2 adoption across Asian jurisdictions',
    'Voluntary carbon market integrity rules',
  ],
  training: [
    'Building an internal sustainability capability',
    'What a competent carbon accounting team needs to know',
    'Training boards and executives on climate risk',
    'Closing the skills gap for assurance readiness',
  ],
};

/** Rotates by date, so the lane advances once per day regardless of run time. */
function assignedCategory() {
  const epochDay = Math.floor(Date.now() / 86_400_000);
  return CATEGORY_ROTATION[epochDay % CATEGORY_ROTATION.length];
}

// ── Autocomplete lookup ───────────────────────────────────────────────────────
// Both endpoints answer with the same shape, [query, [suggestions], ...], so one
// parser serves both. Failures are swallowed per request: a missing engine
// should cost some suggestions, never the day's article.

async function suggest(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CER-ContentBot/1.0)' },
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) return [];
    const parsed = JSON.parse(await res.text());
    return Array.isArray(parsed?.[1]) ? parsed[1] : [];
  } catch {
    return [];
  }
}

async function harvestQueries(category) {
  const seeds = QUERY_SEEDS[category] ?? [];
  const found = new Set();

  for (const seed of seeds) {
    for (const prefix of QUERY_PREFIXES) {
      const q = encodeURIComponent(`${prefix}${seed}`);
      const [google, bing] = await Promise.all([
        suggest(`https://suggestqueries.google.com/complete/search?client=firefox&q=${q}`),
        suggest(`https://api.bing.com/osjson.aspx?query=${q}`),
      ]);
      for (const s of [...google, ...bing]) {
        const clean = String(s).toLowerCase().trim();
        if (clean.length > 8) found.add(clean);
      }
    }
  }

  return [...found];
}

// ── Read existing state ───────────────────────────────────────────────────────

const articlesSource = readFileSync(ARTICLES_PATH, 'utf-8');
const existingSlugs = [...articlesSource.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
const today = new Date().toISOString().split('T')[0];

const unescape = (s) => s.replace(/\\'/g, "'");

/**
 * Article titles only. `articleCategories` above uses the same key at the same
 * indent, and its entries are one or two words, which would otherwise dominate
 * the overlap check and reject anything mentioning, say, climate.
 */
const articlesBlock = articlesSource.slice(articlesSource.indexOf('export const articles:'));
const existingTitles = [...articlesBlock.matchAll(/\n {4}title:\s*\n?\s*'((?:[^'\\]|\\.)*)'/g)].map(
  (m) => unescape(m[1]),
);

const existingKeywords = [
  ...articlesSource.matchAll(/primaryKeyword:\s*'((?:[^'\\]|\\.)*)'/g),
].map((m) => unescape(m[1]));

// ── Overlap guard ─────────────────────────────────────────────────────────────
// A slug check only catches an exact repeat. These articles compete with each
// other when they chase the same terms, which happens well before the slugs
// match, so the real test is how much significant vocabulary a proposed title
// shares with one already published.

const STOPWORDS = new Set(
  ('the a an and or for to of in on at as by be is are it its with from that this what how why ' +
    'when where your you we our not but they their there here into over under more most can').split(
    ' ',
  ),
);

// Different words, one search intent. Folding these together before comparing is
// what separates genuinely new ground from a rewrite: "Singapore mandatory
// climate reporting" and "Singapore climate reporting requirements" answer the
// same question, but share only three literal terms and so passed the guard.
const SYNONYMS = new Map(
  Object.entries({
    mandatory: 'requirement',
    required: 'requirement',
    requires: 'requirement',
    requirements: 'requirement',
    obligation: 'requirement',
    obligations: 'requirement',
    rule: 'requirement',
    rules: 'requirement',
    readiness: 'prepare',
    ready: 'prepare',
    preparing: 'prepare',
    preparation: 'prepare',
    primer: 'guide',
    explained: 'guide',
    handbook: 'guide',
    disclosure: 'reporting',
    disclosures: 'reporting',
    report: 'reporting',
    reports: 'reporting',
    emission: 'emissions',
    company: 'companies',
    firm: 'companies',
    firms: 'companies',
    organisation: 'companies',
    organisations: 'companies',
  }),
);

function significantWords(text) {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w))
      .map((w) => SYNONYMS.get(w) ?? w),
  );
}

/** Share of a keyword's significant words that survive into the title. */
function keywordCoverage(title, keyword) {
  const wanted = significantWords(keyword);
  if (wanted.size === 0) return 1;
  const present = significantWords(title);
  let hit = 0;
  for (const word of wanted) if (present.has(word)) hit += 1;
  return hit / wanted.size;
}

/** Returns the clashing title when a proposal covers ground already taken. */
function findOverlap(title, keyword) {
  const proposed = significantWords(`${title} ${keyword ?? ''}`);
  if (proposed.size === 0) return null;

  for (const existing of [...existingTitles, ...existingKeywords]) {
    const taken = significantWords(existing);
    if (taken.size === 0) continue;

    let shared = 0;
    for (const word of proposed) if (taken.has(word)) shared += 1;

    // Four shared terms is a duplicate however long the titles are.
    if (shared >= 4) return existing;

    // Otherwise the question is how much of the existing entry the proposal
    // swallows. Measuring against the existing side keeps short target keywords
    // enforceable without letting a two-word category name veto everything that
    // happens to mention one of its words.
    if (taken.size >= 3 && shared / taken.size >= 0.6) return existing;
  }
  return null;
}

/**
 * What to do about a rejection depends on what was wrong with it. Only an
 * overlap means the subject itself is taken. Telling the model to change
 * subject after a field failure throws away a topic that was fine and sends it
 * hunting for a new one, so a run can burn every attempt on headline length
 * while the topic was never the problem.
 */
function rejectionGuidance(reason) {
  if (reason.includes('covers ground already taken')) {
    return 'Choose a clearly different subject within the assigned category.';
  }
  return 'Keep the same subject. Change only what the rejection names, and count the characters before returning.';
}

// ── DeepSeek API call ─────────────────────────────────────────────────────────

async function callDeepSeek(systemPrompt, userPrompt) {
  const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      max_tokens: 8000,
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`DeepSeek API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? '';
}

// ── Main generation ───────────────────────────────────────────────────────────

async function generate(harvestedQueries, category, rejection) {
  const system = `You are a content strategist and writer for CER, a Singapore-based sustainability advisory and professional training firm.

CER's services:
- ESG strategy and materiality assessment
- Carbon accounting (Scope 1, 2, 3), GHG inventory and ISO 14064
- CBAM readiness for Asian exporters to the EU
- Life cycle assessment
- Assurance readiness for sustainability reporting
- Climate risk, TCFD and TNFD disclosure
- Transition planning and decarbonisation roadmaps
- Sustainable finance (green bonds, sustainability-linked loans, green taxonomy)
- ISO 14001 (environmental management) and ISO 50001 (energy management)
- Professional ESG and sustainability training and certification

Target audience: SGX-listed companies, large corporates, financial institutions and organisations in Singapore and ASEAN.

Voice: authoritative, precise, Singapore-focused, practical. Never use em dashes or en dashes. Use commas, colons, or full stops between clauses instead. No hype or vague statements. Ground everything in specific regulatory requirements or technical standards.`;

  const user = `You have done market research. Here is what you found.

TODAY'S ASSIGNED CATEGORY: ${category}
You MUST set categorySlug to exactly "${category}". This rotates daily so the blog
covers CER's full range instead of returning to the same subject. Do not pick a
different category even if another feels more newsworthy.

GROUND TO CONSIDER WITHIN THIS CATEGORY (pick one, or a better one in the same area):
${(TOPIC_POOL[category] ?? []).map((t) => `- ${t}`).join('\n')}

REAL SEARCHES PEOPLE MADE IN THIS AREA. Harvested today from Google and Bing
autocomplete, so this is the exact wording searchers type, not a guess at it:
${harvestedQueries.map((q) => `- ${q}`).join('\n')}

Your primary keyword must come from that list, or be a close variant of one
entry. Do not invent a keyword that is absent from it. The list exists because
these phrasings have proven demand and invented ones do not.

Prefer an entry that is specific and question-shaped over a broad one. A broad
head term is contested by firms with far more authority than CER, while a
specific query is winnable and brings a reader who already knows what they
need.

ALREADY PUBLISHED BY CER. Your article must not overlap with any of these. Not a
different angle on the same subject: genuinely different ground. A proposal is
rejected automatically if its title reuses much of the vocabulary below.

Titles:
${existingTitles.map((t) => `- ${t}`).join('\n')}

Target keywords already claimed:
${existingKeywords.map((k) => `- ${k}`).join('\n')}
${rejection ? `\nYOUR PREVIOUS ATTEMPT WAS REJECTED: ${rejection}\n${rejectionGuidance(rejection)}\n` : ''}
---

Your task: choose the best topic for a new CER Insights article. It must be:
1. Built on one query from the harvested list above
2. NOT already covered by CER
3. Directly relevant to CER's services
4. Actionable and specific, not generic
5. Answered directly in the opening paragraph, before any context or preamble.
   Someone who searched that query should have their answer without scrolling.

Write the article and return ONLY a JSON object (no markdown, no explanation, no code fences) with this exact shape:

{
  "slug": "kebab-case-slug",
  "title": "Article title",
  "excerpt": "One or two sentences summarising the article for the listing card.",
  "type": "Article",
  "categorySlug": "singapore",
  "authorSlug": "raymond-cheung",
  "publishedAt": "${today}",
  "intro": [
    "First paragraph.",
    "Second paragraph.",
    "Third paragraph."
  ],
  "sections": [
    {
      "heading": "Section heading",
      "id": "section-slug-id",
      "body": [
        "First paragraph of this section.",
        "Second paragraph."
      ]
    },
    {
      "heading": "Section with bullet points",
      "id": "section-bullets",
      "body": ["Introductory sentence."],
      "list": ["Bullet one", "Bullet two", "Bullet three"]
    }
  ],
  "relatedSolutions": ["carbon-accounting"],
  "relatedArticles": ["${existingSlugs[0] ?? ''}"],
  "tags": ["Tag1", "Tag2", "Tag3"],
  "seo": {
    "title": "SEO title (under 65 characters)",
    "description": "Meta description under 160 characters.",
    "primaryKeyword": "primary search keyword",
    "secondaryKeywords": ["secondary keyword 1", "secondary keyword 2"]
  },
  "status": "published"
}

CONSTRAINTS:
- title: becomes the page H1. Maximum 70 characters. Lead with the primary
  keyword, do not open with a hook and bury it after a colon. Most of the
  keyword's words must appear in it.
- seo.title: 45 to 65 characters, and must contain the primary keyword
- seo.description: 120 to 160 characters, and must contain the primary keyword
- seo.primaryKeyword: taken from the harvested query list above
- type: one of Article, Guide, Regulatory Update
- categorySlug: one of carbon-climate, esg, regulation, sustainable-finance, standards, training, singapore, asean
- authorSlug: one of raymond-cheung, chan-ee-chong
- relatedSolutions: slugs from this list only: esg-strategy, sustainability-reporting, materiality-assessment, esg-risk-management, esg-data-kpis, sustainable-procurement, carbon-accounting, ghg-inventory, scope-1-2-3, iso-14064, decarbonisation, life-cycle-assessment, green-finance, climate-risk, financed-emissions, iso-advisory, cbam-readiness, assurance-readiness, governance-controls
- relatedArticles: slugs from this list only: ${existingSlugs.join(', ')}
- Write 4 to 6 sections, each with 2 to 4 paragraphs
- Never use em dashes or en dashes. Use commas, colons, or full stops instead.
- Base all regulatory claims on real published requirements. Do not invent timelines or thresholds.
- Output ONLY valid JSON. Start with { and end with }.`;

  return callDeepSeek(system, user);
}

// ── Parse and validate ────────────────────────────────────────────────────────

function parseArticle(raw, category) {
  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();

  let obj;
  try {
    obj = JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`DeepSeek output is not valid JSON.\n---\n${cleaned}\n---\n${err.message}`);
  }

  if (!obj.slug || typeof obj.slug !== 'string') throw new Error('Missing or invalid slug');
  if (existingSlugs.includes(obj.slug)) throw new Error(`Duplicate slug: ${obj.slug}`);
  if (!obj.title) throw new Error('Missing title');
  if (!Array.isArray(obj.intro) || obj.intro.length === 0) throw new Error('Missing intro');
  if (!Array.isArray(obj.sections) || obj.sections.length === 0) throw new Error('Missing sections');

  if (obj.categorySlug !== category) {
    throw new Error(
      `categorySlug was "${obj.categorySlug}" but today's assigned category is "${category}"`,
    );
  }

  // SEO fields are the whole point of the exercise, so they are checked rather
  // than trusted. The model counts characters badly and will cheerfully return
  // a 190 character meta description that Google truncates.
  const seo = obj.seo ?? {};
  const keyword = seo.primaryKeyword;
  if (!keyword) throw new Error('Missing seo.primaryKeyword');

  // Only a guard against a bloated headline. Unlike seo.title this is never
  // truncated anywhere, so a tight cap here rejects good headlines over a
  // character or two while the coverage check below does the real work.
  if (obj.title.length > 90) {
    throw new Error(`Title is ${obj.title.length} characters, maximum is 90: "${obj.title}"`);
  }

  if (keywordCoverage(obj.title, keyword) < 0.6) {
    throw new Error(
      `Title "${obj.title}" carries too little of the primary keyword "${keyword}".`,
    );
  }

  const seoTitleLength = (seo.title ?? '').length;
  if (seoTitleLength < 45 || seoTitleLength > 65) {
    throw new Error(`seo.title is ${seoTitleLength} characters, must be 45 to 65.`);
  }

  const descriptionLength = (seo.description ?? '').length;
  if (descriptionLength < 120 || descriptionLength > 160) {
    throw new Error(`seo.description is ${descriptionLength} characters, must be 120 to 160.`);
  }

  const clash = findOverlap(obj.title, obj.seo?.primaryKeyword);
  if (clash) {
    throw new Error(
      `"${obj.title}" covers ground already taken by "${clash}". Pick a different subject.`,
    );
  }

  // Drop any relatedArticles entries that don't exist
  if (Array.isArray(obj.relatedArticles)) {
    obj.relatedArticles = obj.relatedArticles.filter(s => existingSlugs.includes(s));
  }

  return obj;
}

// ── Serialise JSON to TypeScript object literal ───────────────────────────────

function toTs(val, depth = 1) {
  const pad = '  '.repeat(depth);
  const padOuter = '  '.repeat(depth - 1);

  if (val === null) return 'null';
  if (typeof val === 'boolean') return String(val);
  if (typeof val === 'number') return String(val);
  if (typeof val === 'string') {
    const escaped = val.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `'${escaped}'`;
  }
  if (Array.isArray(val)) {
    if (val.length === 0) return '[]';
    const items = val.map(v => `${pad}${toTs(v, depth + 1)}`).join(',\n');
    return `[\n${items},\n${padOuter}]`;
  }
  if (typeof val === 'object') {
    const entries = Object.entries(val)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${pad}${k}: ${toTs(v, depth + 1)}`);
    return `{\n${entries.join(',\n')},\n${padOuter}}`;
  }
  return String(val);
}

// ── Inject into articles.ts ───────────────────────────────────────────────────

function inject(article) {
  const marker = 'export const articles: Article[] = [\n';
  const idx = articlesSource.indexOf(marker);
  if (idx === -1) throw new Error('Could not find articles array in articles.ts');

  const insertAt = idx + marker.length;
  const tsBlock = `  ${toTs(article, 2)},`;

  const updated =
    articlesSource.slice(0, insertAt) +
    tsBlock +
    '\n' +
    articlesSource.slice(insertAt);

  writeFileSync(ARTICLES_PATH, updated, 'utf-8');
  console.log(`Added article: ${article.slug}`);
}

// ── Run ───────────────────────────────────────────────────────────────────────

const category = assignedCategory();
console.log(`Today's category: ${category}`);

console.log('Harvesting search queries from Google and Bing autocomplete...');
const harvestedQueries = await harvestQueries(category);
console.log(`Harvested ${harvestedQueries.length} queries.`);

// Both suggest endpoints are unauthenticated and independent, so an empty
// result means something broader is wrong. Failing here is better than asking
// the model to pick a keyword from an empty list.
if (harvestedQueries.length === 0) {
  throw new Error('No queries harvested: both Google and Bing returned nothing.');
}

console.log(`Guarding against ${existingTitles.length} published titles.`);

// A rejection is a near-duplicate, not a broken run: hand the reason back and
// let the model pick different ground rather than losing the day's article.
const MAX_ATTEMPTS = 3;
let article;
let rejection = '';

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
  console.log(`Generating with DeepSeek (attempt ${attempt} of ${MAX_ATTEMPTS})...`);
  const raw = await generate(harvestedQueries, category, rejection);

  try {
    article = parseArticle(raw, category);
    break;
  } catch (err) {
    rejection = err.message;
    console.log(`Rejected: ${rejection}`);
    if (attempt === MAX_ATTEMPTS) {
      throw new Error(`No usable article after ${MAX_ATTEMPTS} attempts. Last: ${rejection}`);
    }
  }
}

inject(article);
