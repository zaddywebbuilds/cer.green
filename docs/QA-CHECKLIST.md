# Pre-launch QA checklist

Run before every production release. `npm run check:site` automates the
structural items. This list covers the things a crawler cannot see.

---

## Automated checks

```bash
npm run typecheck
npm run lint
npm run check:content    # no unresolved markers
npm run build
npm start                # then in a second terminal:
npm run check:site       # must return zero problems
```

Expected: `npm run check:site` reports 62 pages, 0 problems.

---

## Content integrity

- [ ] `npm run check:content:strict` exits 0 (all markers resolved).
- [ ] No `[VERIFY WITH CER]` text appears on any live page — test a few by
      searching Google for `site:cer.green "VERIFY"`.
- [ ] No placeholder metrics on the homepage (`XX%`, `X organisations`, etc.).
- [ ] Every case study is client-approved. Zero published if not.
- [ ] No testimonials are published unless approved.
- [ ] Expert photographs are real, not AI-generated.
- [ ] Course certifications describe exactly what is awarded. No invented
      accreditations.
- [ ] Regulatory dates and thresholds have been checked against the current
      regulator position within the last 30 days.

---

## Forms

Test from a real browser with no developer tools, using a work email address
for the consulting form:

- [ ] **Consulting form** — submit a valid enquiry. Receive a 200 response.
      CER receives the notification. Sender receives the acknowledgement.
- [ ] **Academy form** — submit for a specific course. Notification names the
      course title, not the slug.
- [ ] **Newsletter form** — submit. CER receives a notification.
- [ ] **Free email** on consulting form — submit with a gmail address.
      Rejected with a clear field error.
- [ ] **Consent unchecked** — submission blocked with a clear error.
- [ ] **Honeypot visible to screen readers?** Inspect with a screen reader or
      `aria-hidden` audit: the field must be completely hidden.
- [ ] **Fast submission** — open devtools, set network to slow 3G, submit
      within one second. The server should silently accept. No bot indicator
      in the notification.
- [ ] **Rate limit on repeated submissions** — five rapid identical submissions
      from the same IP return 429 on the fifth.
- [ ] **Form works without JavaScript** — open with JS disabled in browser
      settings. The form must fail gracefully (the submit button does nothing
      or the fallback email link is visible).

---

## SEO

- [ ] `<title>` on homepage does not repeat "CER": must be
      `CER | Singapore-based sustainability advisory...` not `CER | ... | CER`.
- [ ] Every page has a unique `<title>`.
- [ ] Every indexable page has a unique meta description, 140–160 chars.
- [ ] Canonical URLs use https and consistent trailing slashes.
- [ ] `/sitemap.xml` loads. Count the URLs — should match the 61 indexable
      routes.
- [ ] `/robots.txt` loads. `Allow: /` is present. `Disallow: /portal/` is
      present. `Sitemap:` line references the correct domain.
- [ ] Google Search Console — submit sitemap, request indexing of homepage,
      `/solutions/`, `/academy/`, top service pages.
- [ ] No indexable page returns a noindex meta tag (inspect source on a few).
- [ ] `/portal/` has `<meta name="robots" content="noindex, nofollow">` in
      source.
- [ ] JSON-LD is valid on homepage, a service page, a course page and an
      article. Paste source into https://validator.schema.org.
- [ ] Breadcrumbs render correctly on a service, course and article page.

---

## Redirects

Run with the slashed form of the old URLs (as they appeared in the old sitemap):

```bash
curl -sI -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://www.cer.green/who-we-are/
curl -sI -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://www.cer.green/cer-courses/
curl -sI -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://www.cer.green/dashboard/
```

Each must return `301` and a new URL in one hop.

```bash
curl -sI -o /dev/null -w "%{http_code}\n" https://www.cer.green/course-step/upload-fuel-consumption/
```

Must return `410`.

- [ ] No redirect chains (two 301s in sequence). `curl -L -sI` to check.
- [ ] All old sitemap URLs redirect to live pages (not to 404s).
- [ ] 410s are returned for all retired workflow paths.

---

## Accessibility

- [ ] Tab through the full homepage without a mouse. Focus is visible on every
      interactive element.
- [ ] Skip-to-main-content link appears on first Tab.
- [ ] Mega menu opens on Enter/Space, closes on Escape.
- [ ] Mobile menu traps focus: Tab cycles within the menu, Shift+Tab reverses,
      Escape closes and returns focus to the trigger.
- [ ] Accordion items open and close with keyboard.
- [ ] All form errors are read aloud by a screen reader (VoiceOver or NVDA).
- [ ] Zoom to 400% — no horizontal scroll, no content hidden.
- [ ] Dark mode — all text readable, no invisible elements.
- [ ] Reduced motion — hero animation and any transitions stop.
- [ ] Run Lighthouse Accessibility audit: target 95+.

---

## Security headers

```bash
curl -sI https://www.cer.green/ | grep -iE "content-security|strict-transport|x-content-type|x-frame|referrer-policy|permissions-policy"
```

All six headers must be present. Confirm CSP does not contain `unsafe-eval`
except on Next.js routes that require it (check the Next.js changelog for the
current v16 requirement).

- [ ] `npm audit --omit=dev` shows 0 vulnerabilities.
- [ ] No secrets are visible in page source or network requests. Open devtools,
      inspect all requests — no API keys, no email addresses beyond
      `enquiry@cer.green`.

---

## Performance

Lighthouse scores on a cold Chrome profile (no extensions, no cache):

- [ ] Performance ≥ 90 on mobile
- [ ] LCP < 2.5 s on mobile
- [ ] CLS < 0.1
- [ ] No layout shift from fonts (they are self-hosted)
- [ ] Hero SVG loads with the HTML — no separate request

---

## Cookie consent

- [ ] Consent banner appears on first visit with no cookies set.
- [ ] Accept All → analytics tag loads (visible in network tab).
- [ ] Reject Non-Essential → no analytics tag loads.
- [ ] Choice is remembered on next page load.
- [ ] Cookie policy page → Manage preferences → panel opens, reflects current
      state, save works.
- [ ] Consent banner does not reappear on subsequent pages within the same
      session.

---

## 404 and error pages

- [ ] `/this-does-not-exist/` returns the branded 404 page.
- [ ] 404 page offers useful destinations, not just an apology.
- [ ] HTTP status is actually 404 (check via `curl -o /dev/null -w "%{http_code}"
      https://www.cer.green/this-does-not-exist/`).

---

## Legal pages

- [ ] Privacy policy, terms and cookie policy are live and linked from the
      footer.
- [ ] Legal pages have been reviewed by CER's counsel.
- [ ] Privacy policy accurately names the hosting and email providers (no
      `[VERIFY WITH CER]` remaining).
- [ ] Registered address and UEN are present on the terms page.

---

## Staging sign-off

Do this on the staging environment before DNS switch:

- [ ] `robots.txt` on staging returns `Disallow: /` (forces noindex site-wide).
- [ ] Staging is password-protected at the host level so Google cannot crawl it
      even if `robots.txt` is misconfigured.
- [ ] Full checklist above passes on staging.
- [ ] CER has reviewed and approved the content.

---

## Launch day

- [ ] DNS switched.
- [ ] HTTPS active and HSTS header present.
- [ ] www redirects to www (or vice versa, consistently).
- [ ] Sitemap submitted to Google Search Console.
- [ ] Old site taken offline or locked, not left reachable at an alternate URL
      where it might compete with the new site.
- [ ] First live form submission received.
- [ ] No 404 or 500 spike in the first hour.
