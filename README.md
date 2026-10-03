# CER — cer.green

A complete rebuild of the CER website: a Singapore-based sustainability
advisory (**CER Solutions**) and professional training (**CER Academy**)
organisation working with organisations across Asia.

Built with Next.js 16, TypeScript, React 19 and Tailwind CSS v4.

---

## Contents

- [What this is](#what-this-is)
- [Before you launch](#before-you-launch)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [How content works](#how-content-works)
- [Adding content](#adding-content)
- [SEO](#seo)
- [Forms](#forms)
- [Analytics and consent](#analytics-and-consent)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Security](#security)
- [Checks and QA](#checks-and-qa)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## What this is

The previous site was a WordPress and Elementor build whose public sitemap
included member login pages, account screens, checkout steps and — most
seriously — course workflow pages including document upload steps. This rebuild
addresses that alongside the design and positioning work.

What is here:

| Area | Detail |
| --- | --- |
| Pages | 62 routes; 61 indexable, 1 deliberately noindex |
| Solutions | 4 category pages, 19 service pages |
| Academy | Hub, course listing, 9 course pages, corporate/executive/custom pages |
| Industries | 5 published sectors (a 6th held as draft — see below) |
| Insights | Hub plus 4 articles with table of contents and author attribution |
| Case studies | Full system built; **zero published**, by design — see below |
| Experts | 2 profiles, driving Person schema |
| Forms | Consulting, Academy/corporate, newsletter |
| Legal | Privacy, terms, cookie policy |
| Redirects | 42 mapped from the old site, plus 410s for retired workflow URLs |

### Two deliberate absences

**No case studies are published.** CER has no client-approved case studies, and
none are verifiable from published material. The whole system exists — listing
page, detail template, schema, cards, cross-linking, filters — and ships with a
single draft template entry that never renders publicly. Publishing invented
projects or fabricated metrics would have been the fastest way to lose the
credibility this rebuild is meant to build. The homepage section appears
automatically once a real case study is published.

**No testimonials are published.** Same reason: none are approved. The
components render nothing when the list is empty rather than showing
placeholders.

`/industries/public-sector/` is held as a draft for the same reason — CER's
published material does not evidence public sector delivery.

---

## Before you launch

This build cannot go live as-is. Thirteen items need CER to supply or confirm
information. Run:

```bash
npm run check:content
```

That prints the current list. As of this build:

| Where | What is needed |
| --- | --- |
| `lib/site.ts` | Business telephone, street address, postal code, UEN |
| `content/courses.ts` | Certificate wording per course, and whether TÜV SÜD Academy co-certification applies |
| `content/experts.ts` | LinkedIn profile URLs for both experts |
| `app/privacy-policy/page.tsx` | Hosting provider, email provider, retention periods |
| `app/terms/page.tsx` | Registered address, UEN, liability clause review |

Also required before launch:

- **Legal review** of the privacy policy, terms and cookie policy. They
  accurately describe what the site does, but they are not a substitute for
  counsel.
- **Expert photographs.** Profiles currently render a typographic monogram. No
  AI-generated headshots are used anywhere on this site, and none should be
  added.
- **Course curriculum sign-off.** Learning outcomes and modules are drafted to
  match each published course title and duration. A trainer must confirm they
  match what is actually delivered.
- **Partner logo approval** if logos are to replace the current text treatment.

The production deploy runs `npm run check:content:strict`, which **fails the
build** while any of these remain. That is intentional.

---

## Getting started

Requires Node 20 or later.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

Forms work in development without an email provider — messages are logged to
the console rather than sent, so the full submission flow can be exercised.

---

## Environment variables

See `.env.example`, which documents every variable. The ones that matter most:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical origin. Must match production exactly, including `www`. |
| `DEPLOY_ENV` | Yes | Set to `production` **only** on the live site. Anything else forces noindex site-wide. |
| `RESEND_API_KEY` | Production | Sends enquiry emails. |
| `EMAIL_FROM` | Production | Verified sender address. |
| `ENQUIRY_RECIPIENT` | Production | Where enquiries go. Server-only. |
| `NEXT_PUBLIC_GA4_ID` / `NEXT_PUBLIC_GTM_ID` | Optional | Analytics. Loads only after consent. |

`DEPLOY_ENV` is the single most important one. Getting it wrong on staging is
how a staging site ends up in Google.

---

## Project structure

```
app/                    Routes (App Router)
  api/                  Form handlers — server-only
  solutions/[slug]/     Serves both categories and services (flat URLs)
  academy/              Hub, courses, corporate, executive, custom
  insights/[slug]/      Articles with TOC and schema
  about/experts/[slug]/ Expert profiles
  opengraph-image.tsx   Generated social image (real PNG, built at build time)
  robots.ts sitemap.ts  Generated from published content
components/
  layout/               Header, mega menu, mobile drawer, footer, consent
  ui/                   Primitives, cards, accordion, breadcrumbs
  sections/             Hero, methodology, CTA banner, legal page shell
  forms/                Form components and shared submission hook
content/                Content as typed modules — the current source of truth
cms/                    Sanity schemas, ready to deploy (see cms/README.md)
lib/
  content.ts            Data access layer — the only thing pages read from
  seo.ts schema.ts      Metadata and JSON-LD helpers
  forms/                Validation, rate limiting, email
  redirects.ts          Old-site URL map and 410 list
docs/                   Content guide, QA checklist, migration, deployment
scripts/                Pre-launch checks
types/content.ts        The content contract
middleware.ts           410s for retired URLs; staging noindex
```

---

## How content works

Content lives in `/content` as typed TypeScript modules. Pages never import
from `/content` directly — they read through `lib/content.ts`, which enforces
two rules that would otherwise have to be remembered on every new page:

1. **Draft documents never reach a page, the sitemap or `generateStaticParams`.**
2. **Cross-references to draft or missing documents are dropped**, not rendered
   as broken links.

`cms/` holds Sanity schemas mirroring these types one-for-one. Moving to Sanity
means replacing the function bodies in `lib/content.ts` with GROQ queries —
nothing else changes. See `cms/README.md`.

Shipping with content in the repository means the site launches without a CMS
dependency, hosting account or migration, and CER can adopt Sanity when it
suits them rather than as a launch blocker.

---

## Adding content

Full editorial guidance is in **`docs/CONTENT-GUIDE.md`**. In short:

| To add | Edit | Notes |
| --- | --- | --- |
| A service | `content/solutions/<category>.ts` | Needs business context, components, deliverables, audience, 3+ FAQs. Anything thinner belongs on the category page. |
| A course | `content/courses.ts` | Never invent certification or dates. |
| An expert | `content/experts.ts` | Real photograph or none. |
| A case study | `content/case-studies.ts` | Copy the template. Client approval required. |
| An article | `content/articles.ts` | Structured sections drive the TOC and anchors. |
| An industry | `content/industries.ts` | Must be genuinely sector-specific. |
| A partner | `content/partners.ts` | Never described as a client. |

Everything is `status: 'draft'` until you say otherwise. Navigation, sitemap and
internal links update automatically.

---

## SEO

Metadata is built in `lib/seo.ts` and nowhere else. No page constructs canonical
URLs, Open Graph objects or robots directives by hand.

- One H1 per page, no skipped heading levels (verified — see below).
- Unique title and meta description on every indexable page.
- Canonical URLs with consistent trailing slashes.
- JSON-LD on every page: Organization, WebSite, BreadcrumbList, plus Service,
  Course, Person, BlogPosting and FAQPage where they apply.
- `lib/schema.ts` strips any field carrying an unresolved verification marker,
  so incomplete data produces a smaller graph rather than a false one. No
  ratings, reviews or awards are emitted — CER has none to publish.
- Sitemap generated from published content; filtered listing views excluded.
- Filter views (`?category=`) are canonicalised to their parent page and
  disallowed in robots.txt, so filtering cannot spawn crawlable combinations.

### Indexation control

Account routes are blocked in `robots.txt`, in page metadata and by exclusion
from the sitemap. No such routes exist on this site: CER has confirmed the
consultancy site carries no client login, so client material is never served
from here at all. The rules stay in place because the old site exposed these
paths and they must not become indexable again.

---

## Forms

Three endpoints under `app/api/`, all server-only. Every request passes through:

1. **Attempt rate limit** — generous, so a person correcting genuine validation
   mistakes is not locked out.
2. **Schema validation** (Zod, `lib/forms/schemas.ts`) — the same schema used on
   the client, but the server parse is the one that counts.
3. **Honeypot and timing check** — both return success, so an automated sender
   learns nothing about why its submission went nowhere. No CAPTCHA: it costs
   every genuine visitor time and creates an accessibility barrier.
4. **Send rate limit** — tighter, applied only to submissions that would result
   in an email.

The recipient address is server-side only and never reaches the browser. Lead
source, UTM parameters and landing page are captured and included in the
notification, so the forms are CRM-ready.

Rate limiting is in-memory and therefore per-instance. That is adequate for a
marketing site; if a hard guarantee is needed, swap the Map in
`lib/forms/rate-limit.ts` for Redis. The interface does not change.

---

## Analytics and consent

No analytics tag is loaded until the visitor consents. Consent mode alone is not
relied on — the simplest guarantee that nothing fires early is not to load the
script.

Accept and reject carry equal weight. Preferences can be reopened from the
cookie policy page. Consent is read through `useSyncExternalStore`
(`lib/consent.ts`) so the banner and the analytics loader cannot disagree.

Event names are typed in `lib/analytics.ts`. Form field values are never sent.

---

## Accessibility

Target: WCAG 2.2 AA.

- Colour pairings checked and documented in `app/globals.css`. Accent lime is
  never used for text on light backgrounds; `lime-ink` is the accessible
  equivalent.
- Skip link, visible focus, semantic HTML, correct heading order.
- Mega menu uses buttons with `aria-expanded`; Escape closes and returns focus.
- Mobile menu is a modal: scroll locked, focus trapped, Escape closes, focus
  restored.
- Accordions use native `<details>` — keyboard operable and works before
  hydration.
- Every form control has a real label; errors are linked via `aria-describedby`
  with `aria-invalid`.
- Minimum 44px touch targets.
- Zoom is not disabled.
- `prefers-reduced-motion` fully respected.

---

## Performance

- Fonts self-hosted via `next/font` — no third-party request, no layout shift.
- No image library, carousel or animation dependency. Production dependencies:
  Next, React, React DOM, Zod.
- The hero visual is inline SVG, so it costs no request and cannot become an LCP
  bottleneck.
- Almost every page is statically prerendered.
- Social images generated at build time as real PNGs.

---

## Security

- CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and
  `Permissions-Policy` are **not** set by this repository. The site builds with
  `output: export`, so `next.config.ts` `headers()` would never run: there is no
  server to run it. They must be configured on the host or CDN that serves
  `out/`, and the QA checklist verifies them with `curl` against the live site.
- Server-side validation on every endpoint; nothing downstream sees an unparsed
  body.
- Error pages never render a stack trace.
- No secrets in client code. `npm audit` clean on production dependencies.

---

## Checks and QA

```bash
npm run typecheck        # TypeScript, strict
npm run lint             # ESLint
npm run check:content    # Unresolved content markers
npm run check            # All three
npm run build

npm start                # then, in another terminal:
npm run check:site       # crawls the running site
```

`check:site` crawls every internal link and reports broken links, redirect
chains, missing or duplicate titles and descriptions, heading problems, images
without alt text, non-descriptive link text and invalid JSON-LD.

Current result: **62 pages, no problems.**

The full pre-launch list is in `docs/QA-CHECKLIST.md`.

---

## Deployment

See **`docs/DEPLOYMENT.md`**. Summary:

```bash
npm run prelaunch    # check + build + strict content gate
```

Set `DEPLOY_ENV=production` on production only. Staging must be password
protected and left at any other value, which forces noindex.

Migration and the redirect map are documented in **`docs/MIGRATION.md`**,
including the confidential-document audit that must be completed on the old
site before DNS is switched.

---

## Troubleshooting

**Build fails on `check:content:strict`** — that is the gate working. Run
`npm run check:content` to see what is outstanding.

**Staging appears in Google** — `DEPLOY_ENV` is set to `production` somewhere it
should not be.

**Forms return 502 in production** — `RESEND_API_KEY` or `EMAIL_FROM` is not
set. In development, messages are logged instead.

**A page 404s that should exist** — check `status` is `'published'`. Draft
documents are excluded from `generateStaticParams`, and `dynamicParams` is
`false`, so unknown slugs 404 by design.

**An old URL 410s instead of redirecting** — check `gonePaths` in
`lib/redirects.ts`. Those URLs were retired deliberately.

**`npm install` fails with `ENOTEMPTY`** — OneDrive sync interfering with
`node_modules`. Delete `node_modules` and reinstall; consider excluding it from
sync.
