# Content guide

For the CER team. How to add and change content on the website.

Content currently lives in `/content` as TypeScript files. They are plain lists
of information — you do not need to know TypeScript to edit them, but you do
need to keep the punctuation as you found it. If Sanity is adopted later, the
same fields appear as form fields in a visual editor and this guide still
applies.

---

## The rules that matter most

These are not style preferences. They are the difference between a site a
sustainability director trusts and one they close.

**1. Never publish a number that has not been measured.**
No client results, no emissions reduced, no years in business, no headcount, no
countries served — unless someone can produce the evidence. A site with fewer
claims and no wrong ones outperforms the alternative every time.

**2. Never imply a certification or accreditation that does not exist.**
This applies especially to course pages. Say exactly what a participant
receives. If you are not certain, leave it empty — the page omits the section
rather than guessing.

**3. Never call a partner a client.**
Partners collaborate with CER. Clients buy from CER. Conflating them
misrepresents both organisations.

**4. Never publish a case study without written client approval.**
Including the display name and any quote. If they will not be named, use an
anonymised descriptor.

**5. Never use an AI-generated headshot.**
A real photograph or the typographic monogram. There is no third option.

**6. If you do not have the information, mark it.**
Write `[VERIFY WITH CER: what is needed]`. It shows as a highlighted badge
while editing, is hidden from visitors, and blocks the production build until
resolved. That is better than a guess reaching a live page.

---

## Language

CER copy should read as though written by someone who has done the work.

**Avoid:** unlock your potential · embark on a journey · navigate today's
ever-changing landscape · game-changing · revolutionary · transformative
solutions · unparalleled · world-class · seamless · greener tomorrow ·
sustainable future for generations to come · empowering · cutting-edge

**Instead, be specific:**

> We help organisations measure Scope 1, 2 and 3 emissions and establish a
> reliable GHG inventory.

not

> We empower businesses to embark on transformative carbon journeys toward a
> greener future.

Other habits worth keeping:

- Short paragraphs. Bullets where they genuinely help.
- Explain technical terms the first time they appear.
- British English (organisation, programme, materiality).
- Never write "Learn more" or "Click here" as a link. Say where it goes:
  "View carbon accounting", "Read case study".
- It is fine — good, in fact — to say what CER does *not* do, or when a client
  does not need help yet. It reads as confidence.

---

## How to publish an article

Open `content/articles.ts` and copy an existing entry.

| Field | What to put |
| --- | --- |
| `slug` | Lowercase, hyphens, no dates. Becomes `/insights/your-slug/`. |
| `title` | Say what the reader gets. |
| `excerpt` | Two sentences for the card and social preview. |
| `type` | Article, Guide, Regulatory Update, White Paper or Report. |
| `categorySlug` | Must match a category in the same file. |
| `authorSlug` | Must match an expert. Named authors matter for search credibility. |
| `publishedAt` | `YYYY-MM-DD`. |
| `updatedAt` | Add whenever the content changes materially. |
| `intro` | Paragraphs before the first heading. |
| `sections` | Each has `heading`, `id` (the anchor), `body`, optional `list`. |
| `relatedSolutions` | At least one. This is how articles feed the commercial pages. |
| `seo` | Unique description, 140–160 characters. |
| `status` | `'draft'` while writing, `'published'` when ready. |

The table of contents, reading time, breadcrumbs, schema and sitemap entry are
all generated. You do not maintain them.

### Regulatory articles

Requirements change, and CER's credibility depends on not being wrong. When
writing about reporting timelines, thresholds or regulations:

- Say the reader should confirm the current position with the regulator.
- Keep `updatedAt` accurate.
- Review these pieces at least annually.

The Singapore reporting timelines have already been revised more than once.
Treat any published date as provisional.

---

## How to add a course

Open `content/courses.ts`.

**Certification.** The single highest-risk field. Describe precisely what a
participant receives. Do not imply accreditation, endorsement or a
partner-issued certificate unless it is confirmed in writing. Every course
currently carries a verification marker here because CER's arrangement with
TÜV SÜD Academy Singapore is not documented publicly — that must be resolved
before launch.

**Dates.** Only real, confirmed dates in `upcoming`, with
`status: 'scheduled'`. Leave the list empty otherwise — the page then shows an
enquiry route, which is much better than a date that turns out not to exist.

**Price.** Omit the field entirely to price on enquiry.

**Learning outcomes.** Start each with a verb the participant can demonstrate:
"Explain…", "Distinguish…", "Describe…". Not "Understand…".

### Updating course dates

Find the course, edit `upcoming`:

```ts
upcoming: [
  { start: '2027-03-12', location: 'Singapore', status: 'scheduled' },
],
```

The Academy homepage "Upcoming programmes" section, the course card and the
Course schema all update automatically.

---

## How to add an expert

Open `content/experts.ts`.

Every qualification and credential must be verifiable — these profiles carry
most of the site's search credibility and are published as structured data.

Leave `photo` unset until you have a real professional photograph supplied by
the individual. The site renders a typographic monogram in the meantime, which
looks deliberate. An AI-generated headshot does not.

Linking an expert to solutions, courses and articles builds the internal linking
that makes both the expert and the services easier to find.

---

## How to add a partner

Open `content/partners.ts`. Set `relationship` to one of: Strategic, Training,
Technology, Project or Academic Partner. There is deliberately no "client"
option.

The description should say what the collaboration actually involves.

Logos are not currently used — names render as text, which is accessible and
cannot be stretched. Before adding a logo you need the partner's written
approval and a properly licensed asset. Do not take one from their website.

---

## How to create a case study

Open `content/case-studies.ts`. There is a template entry with every field
explained. Copy it.

Before publishing, confirm:

- [ ] The client has approved the content in writing.
- [ ] The display name is exactly what they approved, or properly anonymised
      with `confidential: true`.
- [ ] Every figure in `metrics` was measured, not estimated. Anything
      directional is marked `illustrative: true`, which labels it on the page.
- [ ] Any quote has written permission from the named individual.
- [ ] `solutionSlugs` lists the services actually used.

Then set `status: 'published'`. The listing page, the homepage section, the
related service pages and the sitemap all pick it up automatically.

---

## How to add a service

Open the relevant file in `content/solutions/`.

A service only gets its own page when it can carry one: business context,
engagement components, concrete deliverables, defined audience, and at least
three genuine FAQs. Anything thinner stays on the category page.

That is a deliberate constraint. Thin service pages do not rank, and they read
as padding to the kind of buyer this site is built for.

`deliverables` should list only what CER genuinely and reliably produces.

---

## How to edit SEO metadata

Every content item has an `seo` block.

- **description** — must be unique across the entire site, 140–160 characters.
  Say what the page covers, who for, and where CER operates.
- **title** — `| CER` is appended automatically unless the title already names
  CER. Keep it under about 60 characters.
- **primaryKeyword** — one page, one search intent. Used for internal tracking;
  it is not injected into the page. Do not keyword-stuff.
- **noindex** — hides the page from search and the sitemap.

Run `npm run check:site` against a running build to catch duplicate titles or
descriptions before they ship.

---

## How to update navigation

You usually do not need to. The Solutions mega menu is built from published
services, so adding one puts it in the menu and removing one takes it out.

Top-level items and the Academy menu are in `lib/navigation.ts`. Footer columns
are in the same file.

---

## How to update homepage content

Section order is fixed in `app/page.tsx` and should not be changed without a
strong reason — it follows a deliberate sequence from positioning through proof
to conversion.

Most of what the homepage shows comes from content files: solution categories,
industries, experts, courses and articles all pull through automatically.

The "Why CER" copy is in `app/page.tsx`. There is a commented note there about
adding headline metrics once CER has figures it can evidence.

---

## How to preview and publish

```bash
npm run dev          # preview at http://localhost:3000
npm run check        # types, lint and content markers
```

Verification markers show as yellow badges in development and are hidden in
production, so you can see at a glance what is outstanding.

To publish, commit the change and push. The deployment pipeline runs the checks
and blocks the release if an unresolved marker remains.
