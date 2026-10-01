# Migration

Moving from the existing WordPress site to this build.

The old site inventory below comes from a crawl of its Yoast sitemaps on
**1 September 2026**. Re-crawl before launch in case anything has changed.

---

## 1. The problem being fixed

The old site's public sitemap indexed content that should never have been
crawlable. This is the most important part of the migration, and it is a
security and confidentiality issue before it is an SEO one.

Exposed in `course-step-sitemap.xml`:

```
/course-step/upload-site-floor-plan/
/course-step/upload-fuel-consumption/
/course-step/upload-electrical-evidence/
/course-step/upload-other-energy/
/course-step/upload-ghg-spreadsheet/
/course-step/ghg-emission-quantification/
/course-step/ghg-initiatives-report/
/course-step/ghg-inventory-confirmed/
…plus completion steps
```

These are client-facing workflow screens for uploading energy bills, floor plans
and GHG spreadsheets. Their presence in a public sitemap is a strong indication
that client-uploaded documents may also be publicly reachable.

Also indexed: `/members/`, `/my-account/`, `/login/`, `/register/`,
`/password-reset/`, `/checkout-page/`, `/payment/`, `/order-received/`,
`/student-registration/`, `/instructor-registration/`, `/edit-profile/`,
`/subscription-plan/`, `/design-sample/`, `/under-maintenance/`,
`/default-redirect-page/`, `/user-username/`, `/new-document/`, `/try-again/`,
plus author archives and Elementor template routes.

### What this build does about it

| Control | Where |
| --- | --- |
| Workflow, upload and WordPress URLs return **410 Gone** | `middleware.ts` + `lib/redirects.ts` |
| Account routes are noindex in page metadata | `lib/seo.ts` |
| Disallowed in robots.txt | `app/robots.ts` |
| Excluded from the sitemap | `app/sitemap.ts` |
| Staging noindex site-wide | `middleware.ts` via `DEPLOY_ENV` |

410 is used rather than 404 or a redirect: it tells Google the resource is
permanently gone and is actioned faster, and redirecting a workflow URL would
keep it alive as a ranking signal.

---

## 2. Required actions on the old site

**These must be completed on the existing WordPress installation. This
repository cannot do them.**

Meta tags and robots.txt are crawl directives, not access control. A file with a
guessable URL remains downloadable regardless of what robots.txt says.

- [ ] **Audit `/wp-content/uploads/` in full.** List every file. Identify client
      documents (energy bills, floor plans, GHG spreadsheets), internal
      development or revamp documents, proposals, and draft material.
- [ ] **Confirm which are publicly reachable** by opening each URL in a private
      browser window with no session.
- [ ] **Remove or restrict every confidential file.** Removing the link is not
      enough — the file must stop being served.
- [ ] **Check whether any are indexed.** Search `site:cer.green filetype:pdf`
      and `site:cer.green/wp-content/`.
- [ ] **Submit removal requests** in Google Search Console for anything
      confidential that is indexed, and request removal from Bing Webmaster
      Tools as well.
- [ ] **Confirm the URL 404s or 410s** afterwards, in a session with no cookies.
- [ ] **Do not migrate any confidential file** into the new build. This
      repository contains no uploads directory by design.
- [ ] **Notify CER if client data was exposed.** Depending on what was
      reachable and for how long, there may be a notification obligation under
      the PDPA. That is a decision for CER, but it must be raised.

---

## 3. Redirect map

Implemented in `lib/redirects.ts` as 301s. Old URLs carry trailing slashes, as
they appear in the old sitemap, and resolve in a single hop.

### Company

| Old | New |
| --- | --- |
| `/who-we-are/` | `/about/who-we-are/` |
| `/our-experts/` | `/about/experts/` |
| `/partners/` | `/about/partners/` |
| `/cer-group/` | `/about/` |
| `/contact-us/` | `/contact/` |
| `/testimonials/` | `/about/` |

### Solutions

| Old | New |
| --- | --- |
| `/cer-solutions/` | `/solutions/` |
| `/services/` | `/solutions/` |

Both old pages described the same advisory offering in general terms, so both
point at the hub rather than an arbitrary single service.

### Academy

| Old | New |
| --- | --- |
| `/cer-academy/` | `/academy/` |
| `/cer-courses/` | `/academy/courses/` |

### Editorial

| Old | New |
| --- | --- |
| `/news/` | `/insights/` |
| `/category/blog/` | `/insights/` |
| `/bpr-sentral-mandiri-launches-esg-awareness-initiative…/` | `/insights/` |
| `/a-deep-dive-into…-copy-2/` | `/insights/` |

The second is a WordPress duplicate (`copy-2`). If CER wants either post
preserved, republish it as an insight and repoint the redirect at it.

### Legal

| Old | New |
| --- | --- |
| `/terms-and-conditions/` | `/terms/` |
| `/privacy-notice/` | `/privacy-policy/` |
| `/modern-slavery-act-statement/` | `/terms/` — **decision needed** |
| `/member-tos-page/` | `/terms/` |

**Action:** if the modern slavery statement is still current, republish it as
its own page and repoint that redirect. It currently goes to the terms page,
which is a placeholder decision.

### Old membership and account routes

The consultancy site carries no client login, so there is no gateway to send
these to. The learner-facing ones redirect to `/academy/`, the rest to
`/contact/`:

`/my-decarbonization-journey/` · `/dashboard/` · `/members/` · `/members-2/` ·
`/my-account/` · `/account/` · `/login/` · `/member-login/` · `/register/` ·
`/sign-up/` · `/registration/` · `/student-registration/` ·
`/instructor-registration/` · `/edit-profile/` · `/welcome/` ·
`/password-reset/` · `/lost-password/` · `/logout/` · `/member-logout/`

### Commerce

`/subscription/` and `/subscription-plan/` → `/academy/`
`/checkout-page/` and `/payment/` → `/academy/courses/`
`/order-received/` → `/academy/`

### Returning 410 Gone

Prefixes: `/course-step/` · `/elementor-hf/` · `/elementskit-content/` ·
`/author/` · `/wp-content/` · `/wp-admin/` · `/wp-includes/` · `/wp-json/`

Exact: `/category/fuel_consumption/` · `/category/purchased_energy/` ·
`/under-maintenance/` · `/design-sample/` · `/default-redirect-page/` ·
`/public-individual-page/` · `/user-username/` · `/thank-you/` ·
`/thank-you-page/` · `/try-again/` · `/new-document/` · `/esg-report/` ·
`/wp-login.php` · `/xmlrpc.php`

---

## 4. Content preserved

| From the old site | Where it is now |
| --- | --- |
| Crystalise / Economise / Revitalise | Methodology, sitewide |
| Raymond Cheung, Chan Ee Chong profiles | `/about/experts/` — verbatim credentials |
| 9 course titles and durations | `/academy/courses/` — unchanged |
| Partner organisations | `/about/partners/`, categorised by relationship |
| `enquiry@cer.green` | Contact page and footer |
| LinkedIn | Footer and Organization schema |

Everything factual was preserved. Structure and wording were rebuilt.

### Not carried over, and why

- **Spelling errors** on the old site ("CONTATCT US", "FIN OUT MORE").
- **Industry pages with no content** — the old site had seven sector pages
  consisting of a title and a "FIND OUT MORE" link. Five are rebuilt with real
  sector content; the rest are not published until CER can evidence the
  capability.
- **Testimonials** — none approved.
- **Course workflow and upload screens** — belong in the Academy LMS.

---

## 5. Pre-launch sequence

- [ ] Re-crawl the old site and diff against the map above.
- [ ] Export current Search Console data: top pages, top queries, backlinks.
- [ ] Complete the `/wp-content/uploads/` audit in section 2.
- [ ] Verify every redirect resolves in one hop to a 200.
- [ ] Verify 410s return 410.
- [ ] Confirm no redirect chains or loops.
- [ ] Check inbound backlinks land on a redirect, not a 404.
- [ ] Deploy to staging with `DEPLOY_ENV` **not** set to production; confirm
      robots.txt disallows everything.
- [ ] Run `npm run check:site` against staging.
- [ ] Resolve every item from `npm run check:content`.

## 6. Launch day

- [ ] Set `DEPLOY_ENV=production`.
- [ ] Confirm `NEXT_PUBLIC_SITE_URL` matches the live domain exactly, including
      `www`.
- [ ] Confirm HTTPS and the www/non-www canonical choice at DNS or host level.
- [ ] Verify robots.txt now allows crawling and references the sitemap.
- [ ] Submit `sitemap.xml` in Search Console.
- [ ] Inspect and request indexing for the homepage, `/solutions/`, `/academy/`
      and the top service pages.
- [ ] Submit removal requests for any confidential URL still indexed.
- [ ] Confirm a live form submission is received.

## 7. First month

- Watch Coverage for the old workflow URLs dropping out.
- Watch for 404 spikes — anything unexpected needs a redirect adding.
- Monitor Core Web Vitals as field data accumulates.
- Confirm no `/course-step/`, `/wp-content/` or old account URL remains indexed.
- Track branded versus non-branded query mix as the new service pages mature.
