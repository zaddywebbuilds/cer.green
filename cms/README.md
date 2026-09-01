# CMS

The site currently reads content from typed modules in `/content`, through the
access layer in `lib/content.ts`. This directory holds the Sanity schemas that
mirror those modules one-for-one, ready to deploy when CER wants editing to move
out of the repository.

## Why it is set up this way

Two decisions, both deliberate:

1. **Content is never hard-coded into components.** Every page reads through
   `lib/content.ts`. No component imports from `/content` directly, and no
   component contains a service description, a course outline or a partner name.

2. **The swap is one file.** Moving to Sanity means replacing the bodies of the
   functions in `lib/content.ts` with GROQ queries. The function signatures, the
   types in `types/content.ts` and every page and component stay exactly as they
   are.

Shipping with content in the repository means the site launches without a CMS
dependency, a hosting account or a migration, and CER can adopt Sanity when it
suits them rather than as a launch blocker.

## Deploying Sanity

```bash
npm create sanity@latest -- --project <projectId> --dataset production
```

Copy `cms/schemas` into the Studio's `schemaTypes` directory and register them in
`sanity.config.ts`:

```ts
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  // ...
  schema: { types: schemaTypes },
});
```

Then set the environment variables from `.env.example`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
```

## Switching `lib/content.ts` over

Each function becomes a GROQ query. For example:

```ts
export async function getSolutions(): Promise<Solution[]> {
  return sanityClient.fetch(
    `*[_type == "solution" && status == "published"] | order(title asc)`,
  );
}
```

Two rules must be preserved when you do this, because pages rely on them:

- **Draft documents must never be returned.** Every query filters on
  `status == "published"`. This is what keeps drafts out of pages, the sitemap
  and `generateStaticParams`.
- **Unresolved references must be dropped, not rendered.** `resolveMany` in
  `lib/content.ts` filters out slugs that do not resolve to a published
  document, which is what prevents broken links when a referenced service is
  unpublished.

The functions are currently synchronous. Making them `async` requires adding
`await` at the call sites in `app/**/page.tsx` — the pages are already server
components, so nothing else changes.

## Content models

| Schema | File | Notes |
| --- | --- | --- |
| Site settings | `siteSettings.ts` | Singleton. Contact details, address, UEN. |
| Solution | `solution.ts` | Service pages. |
| Solution category | `solutionCategory.ts` | The four pillars. |
| Course | `course.ts` | Academy programmes. |
| Course category | `courseCategory.ts` | |
| Expert | `expert.ts` | Drives Person schema and E-E-A-T. |
| Industry | `industry.ts` | |
| Partner | `partner.ts` | Relationship type is required. |
| Case study | `caseStudy.ts` | Confidential toggle, metrics. |
| Article | `article.ts` | Insights. |
| Article category | `articleCategory.ts` | |
| Testimonial | `testimonial.ts` | Approval flag gates publication. |
| SEO | `objects/seo.ts` | Shared object on every indexable type. |
| FAQ | `objects/faq.ts` | Shared object. |

See `docs/CONTENT-GUIDE.md` for how CER staff use these day to day.
