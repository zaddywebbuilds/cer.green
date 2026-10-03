# Deployment

## How this site deploys

This is a Next.js static export (`output: 'export'`). There is no server. The build produces a `out/` folder of static HTML, CSS and JS files that GitHub Actions pushes to GitHub Pages.

Two targets exist, controlled by the `DEPLOY_TARGET` repository variable:

| Target | URL | `DEPLOY_TARGET` value |
| --- | --- | --- |
| Staging | `https://zaddywebbuilds.github.io/cer.green/` | `staging` (default) |
| Production | `https://www.cer.green` | `production` |

The workflow is at `.github/workflows/deploy.yml`. Every push to `master` triggers it.

---

## Pre-deployment checklist

Run this before every production deploy:

```bash
npm run prelaunch
```

This runs `typecheck`, `lint`, `check:content`, `build` and `check:content:strict` in sequence. The build will fail while any unresolved content markers remain.

---

## GitHub repository variables

Set these under **Settings > Secrets and variables > Actions > Variables** in the repository. These are plain variables, not secrets.

| Variable | Value |
| --- | --- |
| `DEPLOY_TARGET` | `staging` or `production` |
| `NEXT_PUBLIC_SITE_URL` | `https://www.cer.green` (production) |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 measurement ID (optional) |

## GitHub repository secrets

Set these under **Settings > Secrets and variables > Actions > Secrets**.

| Secret | Value |
| --- | --- |
| `WEB3FORMS_KEY` | Access key from web3forms.com |

`DEPLOY_TARGET` is the most important variable. Any value other than `production` forces a global noindex and disallows all crawlers in `robots.txt`. Getting this wrong on the live site will de-index it within hours. Getting it wrong on staging is the correct and expected state.

---

## Going to production

1. Confirm staging has passed the full QA checklist (`docs/QA-CHECKLIST.md`).
2. Complete the old-site audit in `docs/MIGRATION.md` section 2.
3. In GitHub: **Settings > Secrets and variables > Actions > Variables**, change `DEPLOY_TARGET` to `production`.
4. Re-run the workflow (or push a commit to trigger it).
5. Update DNS:
   - `www` CNAME to `zaddywebbuilds.github.io`
   - Remove or redirect any apex A record to `www`
6. Wait for propagation (up to 48 h, usually much less).
7. Verify HTTPS is active (GitHub Pages provisions it automatically via Let's Encrypt).
8. Verify `robots.txt` at `www.cer.green/robots.txt` now shows `Allow: /` and references the sitemap.
9. Submit sitemap in Google Search Console.
10. Request indexing for the homepage, `/solutions/`, `/academy/` and the top service pages.

---

## Rolling back

Re-run an earlier workflow run from **Actions** in the repository. GitHub Pages is updated on every successful deploy; clicking Re-run on a previous run redeploys that build.

Alternatively, revert the commit and push to master:

```bash
git revert <bad-sha>
git push origin master
```

---

## Form submissions

Contact and enquiry forms submit to Web3Forms (`https://api.web3forms.com/submit`). The access key is stored in the `WEB3FORMS_KEY` repository secret and injected at build time as `NEXT_PUBLIC_WEB3FORMS_KEY`. No server is involved. Web3Forms emails submissions to the configured address.

To change the recipient address, log in at web3forms.com and update the access key's settings there.

---

## Post-launch monitoring

- **Google Search Console**: Coverage, Core Web Vitals, any manual actions.
- **Uptime monitor**: Set up UptimeRobot or Better Uptime on the homepage and the contact form page.

Watch for unexpected 404 spikes in the first week: any spike means an old URL was not in the redirect map. Since this is a static export, `next.config.ts` redirects never run. The map lives in `lib/redirects.ts`, and `app/[...legacy]/page.tsx` turns each entry into a real HTML file carrying a zero-delay meta refresh plus a canonical pointing at the destination. Add the old path to `lib/redirects.ts` and redeploy.

Note that this serves `200` with a meta refresh, not a `301`. Google treats the refresh and canonical pairing as a permanent redirect, but the QA checklist asks for a literal `301`. To satisfy that, configure the redirects on the host or CDN as well.
