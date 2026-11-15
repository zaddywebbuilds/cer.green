#!/usr/bin/env node
/**
 * Generates one new Insights article per run using DeepSeek.
 *
 * What it does:
 *   1. Fetches recent article titles from the top ESG consultancy competitor
 *      sites to understand what topics are being covered.
 *   2. Fetches Google Trends-adjacent signals by checking search-related pages.
 *   3. Passes all research context to DeepSeek to write a full article on a
 *      topic CER has not covered yet.
 *   4. Prepends the article to content/articles.ts.
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

// ── Competitor sites to monitor ───────────────────────────────────────────────
// These are the top-ranked ESG advisory and consultancy sites for Singapore
// and Asia. The script fetches their insights/blog index pages and extracts
// recent article titles to understand what topics competitors are covering.

const COMPETITOR_PAGES = [
  { name: 'ERM', url: 'https://www.erm.com/insights/' },
  { name: 'Deloitte Sustainability', url: 'https://www.deloitte.com/global/en/services/risk-advisory/research/sustainability-climate-insights.html' },
  { name: 'PwC Singapore ESG', url: 'https://www.pwc.com/sg/en/services/esg.html' },
  { name: 'KPMG ESG', url: 'https://kpmg.com/sg/en/home/insights/topics/environmental-social-governance.html' },
  { name: 'Sustainalytics', url: 'https://www.sustainalytics.com/esg-research/esg-insights' },
];

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

// ── Scrape competitor pages ───────────────────────────────────────────────────

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CER-ContentBot/1.0)',
        'Accept': 'text/html',
      },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function extractTitles(html) {
  if (!html) return [];
  // Pull text from h1–h3, <title>, and <a> that look like article links
  const matches = [
    ...html.matchAll(/<(?:h[123]|title)[^>]*>([^<]{20,120})<\/(?:h[123]|title)>/gi),
    ...html.matchAll(/<a[^>]+href="[^"]*(?:insight|blog|article|news|report)[^"]*"[^>]*>([^<]{20,100})<\/a>/gi),
  ];
  return [...new Set(matches.map(m => m[1].replace(/\s+/g, ' ').trim()))].slice(0, 10);
}

async function researchCompetitors() {
  const results = [];
  for (const site of COMPETITOR_PAGES) {
    const html = await fetchPage(site.url);
    const titles = extractTitles(html);
    if (titles.length > 0) {
      results.push(`${site.name}:\n${titles.map(t => `  - ${t}`).join('\n')}`);
    } else {
      results.push(`${site.name}: (could not fetch page)`);
    }
  }
  return results.join('\n\n');
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

function significantWords(text) {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w)),
  );
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
    if (taken.size >= 3 && shared / taken.size >= 0.75) return existing;
  }
  return null;
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

async function generate(competitorResearch, category, rejection) {
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

WHAT COMPETITORS ARE COVERING (recent topics from top-ranked ESG advisory sites):
${competitorResearch}

ALREADY PUBLISHED BY CER. Your article must not overlap with any of these. Not a
different angle on the same subject: genuinely different ground. A proposal is
rejected automatically if its title reuses much of the vocabulary below.

Titles:
${existingTitles.map((t) => `- ${t}`).join('\n')}

Target keywords already claimed:
${existingKeywords.map((k) => `- ${k}`).join('\n')}
${rejection ? `\nYOUR PREVIOUS ATTEMPT WAS REJECTED: ${rejection}\nChoose a clearly different subject within the assigned category.\n` : ''}
---

Your task: choose the best topic for a new CER Insights article. It must be:
1. Something people are actively searching for right now
2. Something competitors are writing about (so there is proven demand) OR a gap they have missed
3. NOT already covered by CER
4. Directly relevant to CER's services
5. Actionable and specific, not generic

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

console.log('Researching competitors...');
const competitorResearch = await researchCompetitors();
console.log('Competitor research done.');

const category = assignedCategory();
console.log(`Today's category: ${category}`);
console.log(`Guarding against ${existingTitles.length} published titles.`);

// A rejection is a near-duplicate, not a broken run: hand the reason back and
// let the model pick different ground rather than losing the day's article.
const MAX_ATTEMPTS = 3;
let article;
let rejection = '';

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
  console.log(`Generating with DeepSeek (attempt ${attempt} of ${MAX_ATTEMPTS})...`);
  const raw = await generate(competitorResearch, category, rejection);

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
