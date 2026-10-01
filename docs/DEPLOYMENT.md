# Deployment

## Hosts

This build is a standard Next.js App Router project. It deploys to any host that
supports Node.js server-side rendering. Recommended options:

| Host | Notes |
| --- | --- |
| **Vercel** | Zero-config for Next.js. Automatic preview deployments per branch. Recommended. |
| **Netlify** | Works with `@netlify/plugin-nextjs`. |
| **Railway / Render** | `npm run build && npm start`. Set `PORT` if required. |
| Self-hosted | Dockerise: `node .next/standalone/server.js` with `HOSTNAME=0.0.0.0`. |

---

## Pre-deployment checklist

Run this before every production deploy:

```bash
npm run prelaunch
```

This runs `typecheck`, `lint`, `check:content`, `build` and
`check:content:strict` in sequence. The build will fail while any unresolved
content markers remain.

---

## Environment variables

Set these in your host's dashboard — never in a file that is committed.

### Required for production

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.cer.green` (with `www`, no trailing slash) |
| `DEPLOY_ENV` | `production` |
| `RESEND_API_KEY` | From https://resend.com |
| `EMAIL_FROM` | `CER Website <website@cer.green>` (domain must be verified) |
| `ENQUIRY_RECIPIENT` | `enquiry@cer.green` |

### Optional

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID (prefer one over the other) |
| `NEXT_PUBLIC_PORTAL_URL` | Portal application URL |

`DEPLOY_ENV` is the most important variable. Any value other than `production`
forces a global noindex and disallows all crawlers in robots.txt. Getting this
wrong on the live site will de-index it within hours; getting it wrong on
staging is the correct and expected state.

---

## Vercel (recommended)

### First deploy

1. Push this repository to GitHub.
2. Go to https://vercel.com, import the repository.
3. Add environment variables under **Settings → Environment Variables**.
   - Production, Preview and Development can have different values. Only
     Production should have `DEPLOY_ENV=production`.
4. Click **Deploy**.

### Continuous deployment

Vercel automatically deploys every push to the default branch. Preview
deployments are generated for every pull request.

The preview deployments will have `DEPLOY_ENV` set to anything other than
`production`, which forces noindex. There is no additional step needed to keep
previews out of search.

### Custom domain

1. In Vercel: **Settings → Domains** → add `www.cer.green`.
2. Update DNS: point the www CNAME at `cname.vercel-dns.com`.
3. For the apex (`cer.green`): add an A record pointing at Vercel's IP, and a
   redirect from apex to www in Vercel's domain settings.
4. HTTPS is provisioned automatically.

### Vercel Edge Network and headers

The security headers in `next.config.ts` are applied at the Next.js layer and
propagate to Vercel's Edge Network. No additional header configuration is
required.

---

## Staging environment

Staging must be:

- Password-protected at the host level (Vercel: `vercel.json` with
  `"headers": [{"source": "/(.*)", "headers": [{"key": "WWW-Authenticate", ...}]}]`
  or Vercel's built-in password protection on Pro/Enterprise plans).
- `DEPLOY_ENV` **not** set to `production`.

Both controls are needed. `robots.txt` is a directive, not access control —
a crawl of an unprotected staging site can still read its content even with
noindex set.

---

## DNS switch (going live)

1. Confirm staging has passed the full QA checklist (`docs/QA-CHECKLIST.md`).
2. Complete the old-site audit in `docs/MIGRATION.md` section 2.
3. Update DNS:
   - `www` CNAME → your host.
   - Apex A record → your host.
4. Wait for propagation (up to 48 h, usually much less).
5. Verify HTTPS is active.
6. Verify `robots.txt` now shows `Allow: /` and references the sitemap.
7. Submit sitemap in Google Search Console.
8. Request indexing for the homepage, `/solutions/`, `/academy/` and the top
   service pages.

---

## Rolling back

On Vercel: go to **Deployments**, find the last known-good deployment, click
the overflow menu → **Redeploy**. DNS is unchanged; the rollback is instant.

On other hosts, redeploy from the previous commit:

```bash
git checkout <last-good-sha>
npm run build
# then deploy the build artifact
```

---

## Post-launch monitoring

- **Google Search Console** — Coverage, Core Web Vitals, any manual actions.
- **Vercel Analytics / your host's metrics** — Error rate, latency.
- **Alerts** — Set up an uptime monitor (e.g. Better Uptime, UptimeRobot) on
  the homepage and the two form endpoints.

Watch for unexpected 404 spikes in the first week: any spike means an old URL
was not in the redirect map. Add a redirect and redeploy; the fix is in
`lib/redirects.ts`.
