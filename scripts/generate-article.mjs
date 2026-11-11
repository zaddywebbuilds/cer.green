#!/usr/bin/env node
/**
 * Generates one new Insights article per run.
 *
 * What it does:
 *   1. Searches for what people are currently searching in ESG/sustainability
 *      for Singapore and Asia.
 *   2. Finds the top competitor sites for "ESG consultancy Singapore" and
 *      reads what topics they are covering recently.
 *   3. Picks a topic CER has not covered yet and writes a full article.
 *   4. Prepends the article to content/articles.ts.
 *
 * Required env variable:
 *   ANTHROPIC_API_KEY
 *
 * Run:
 *   node scripts/generate-article.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_PATH = join(__dirname, '../content/articles.ts');

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) throw new Error('ANTHROPIC_API_KEY is not set.');

// ── Read existing state ───────────────────────────────────────────────────────

const articlesSource = readFileSync(ARTICLES_PATH, 'utf-8');
const existingSlugs = [...articlesSource.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
const today = new Date().toISOString().split('T')[0];

// ── Claude call with web search ───────────────────────────────────────────────

async function callAPI(messages) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'web-search-2025-03-05',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-5-5',
      max_tokens: 8000,
      tools: [
        {
          type: 'web_search_20250305',
          name: 'web_search',
        },
      ],
      system: `You are a content strategist and writer for CER, a Singapore-based sustainability advisory and professional training firm.

CER's services cover:
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

Voice: authoritative, precise, Singapore-focused, practical. Never use em dashes or en dashes. Use commas, colons, or full stops between clauses instead.`,
      messages,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API error ${res.status}: ${body}`);
  }

  return res.json();
}

// Agentic loop: runs until stop_reason is end_turn
async function generate() {
  const prompt = `Research and write one new Insights article for cer.green. Follow these steps.

STEP 1: Search for what professionals in Singapore and Asia are actively searching for right now. Use searches like:
- "ESG reporting requirements Singapore 2026"
- "carbon accounting Singapore"
- "sustainability disclosure ASEAN"
- "TCFD reporting requirements Asia"
- "green finance Singapore"

STEP 2: Search "ESG consultancy Singapore" to find the top 3 competitor advisory firms. Visit their insights or blog sections and note what topics they have published recently.

STEP 3: Choose a topic that:
- People are actively searching for now
- Aligns with CER's services listed in your instructions
- Has NOT been covered already. Existing article slugs: ${existingSlugs.join(', ')}
- Is practical and actionable for Singapore or ASEAN businesses

STEP 4: Output a JSON object (and nothing else, no markdown, no explanation) with this exact shape:

{
  "slug": "kebab-case-slug",
  "title": "Article title",
  "excerpt": "One or two sentence summary for the listing card.",
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
      "id": "section-id",
      "body": [
        "Paragraph text.",
        "Another paragraph."
      ]
    },
    {
      "heading": "Section with bullets",
      "id": "section-bullets",
      "body": ["Intro sentence."],
      "list": ["Bullet one", "Bullet two", "Bullet three"]
    }
  ],
  "relatedSolutions": ["carbon-accounting"],
  "relatedArticles": ["${existingSlugs[0] ?? ''}"],
  "tags": ["Tag1", "Tag2", "Tag3"],
  "seo": {
    "title": "SEO title under 65 characters",
    "description": "Meta description under 160 characters.",
    "primaryKeyword": "primary keyword phrase",
    "secondaryKeywords": ["secondary keyword 1", "secondary keyword 2"]
  },
  "status": "published"
}

Rules:
- type must be one of: Article, Guide, Regulatory Update
- categorySlug must be one of: carbon-climate, esg, regulation, sustainable-finance, standards, training, singapore, asean
- authorSlug must be one of: raymond-cheung, chan-ee-chong
- relatedSolutions slugs must come from this list only: esg-strategy, sustainability-reporting, materiality-assessment, esg-risk-management, esg-data-kpis, sustainable-procurement, carbon-accounting, ghg-inventory, scope-1-2-3, iso-14064, decarbonisation, life-cycle-assessment, green-finance, climate-risk, financed-emissions, iso-advisory, cbam-readiness, assurance-readiness, governance-controls
- relatedArticles slugs must come from: ${existingSlugs.join(', ')}
- Never use em dashes or en dashes in any text. Use commas, colons, or full stops instead.
- Write 4 to 6 sections, each with 2 to 4 body paragraphs.
- Base all regulatory claims on real published requirements. Do not invent timelines or thresholds.
- Output ONLY the JSON object. Start with { and end with }. No markdown code fences.`;

  let messages = [{ role: 'user', content: prompt }];

  while (true) {
    const response = await callAPI(messages);

    if (response.stop_reason === 'end_turn') {
      const text = response.content.find(b => b.type === 'text')?.text?.trim();
      if (!text) throw new Error('Model returned no text content.');
      return text;
    }

    if (response.stop_reason === 'tool_use') {
      // Web search is server-executed: add assistant message and send empty tool results
      messages.push({ role: 'assistant', content: response.content });

      const toolResults = response.content
        .filter(b => b.type === 'tool_use')
        .map(b => ({
          type: 'tool_result',
          tool_use_id: b.id,
          content: '',
        }));

      messages.push({ role: 'user', content: toolResults });
      continue;
    }

    throw new Error(`Unexpected stop_reason: ${response.stop_reason}`);
  }
}

// ── Parse and validate ────────────────────────────────────────────────────────

function parseArticle(raw) {
  // Strip markdown code fences if Claude wrapped the output anyway
  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();

  let obj;
  try {
    obj = JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`Model output is not valid JSON.\n---\n${cleaned}\n---\n${err.message}`);
  }

  if (!obj.slug || typeof obj.slug !== 'string') throw new Error('Missing or invalid slug');
  if (existingSlugs.includes(obj.slug)) throw new Error(`Duplicate slug: ${obj.slug}`);
  if (!obj.title) throw new Error('Missing title');
  if (!Array.isArray(obj.intro) || obj.intro.length === 0) throw new Error('Missing intro');
  if (!Array.isArray(obj.sections) || obj.sections.length === 0) throw new Error('Missing sections');

  // Remove any stale relatedArticles entries that do not exist
  if (Array.isArray(obj.relatedArticles)) {
    obj.relatedArticles = obj.relatedArticles.filter(s => existingSlugs.includes(s));
  }

  return obj;
}

// ── Serialise JSON object to TypeScript object literal ────────────────────────

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
  const tsObj = `  ${toTs(article, 2).slice(0, -0)},`;

  const updated =
    articlesSource.slice(0, insertAt) +
    tsObj +
    '\n' +
    articlesSource.slice(insertAt);

  writeFileSync(ARTICLES_PATH, updated, 'utf-8');
  console.log(`Added article: ${article.slug}`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

const raw = await generate();
const article = parseArticle(raw);
inject(article);
