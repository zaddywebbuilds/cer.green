# Client portal — build plan

Scope, hosting and commercial plan for building CER's client portal as a custom
WordPress plugin, replacing the paid plugins **WP User Frontend Pro** and
**Ultimate Dashboard Pro**.

Written 1 October 2026. Part 9 is the client-facing summary — everything before
it is internal.

---

## 1. Decisions already settled

| Question | Answer |
| --- | --- |
| Where does the marketing site live? | GitHub Pages — static export, free, already built |
| Where does the portal live? | `portal.cer.green` on **Hostinger** — confirmed |
| Do we buy the two plugins? | No. Custom plugin, `cer-portal` |
| Do we move the whole site to WordPress? | No. That would discard the rebuild |

### Why the portal cannot go on GitHub Pages

GitHub Pages serves static files only — no PHP, no database, no server-side
session. Nothing that checks *"is this person logged in, and may they see this
file"* can run there, and everything served is public by definition. A login
system needs a server.

### The hosting position

`cer.green` and `www.cer.green` both resolve to `46.202.182.239` — Hostinger,
confirmed by CER. That host is still serving **the old WordPress site**.

So the old install is not something to decommission at cutover. It becomes the
portal:

```
cer.green / www.cer.green   ->  GitHub Pages   (static site, free)
portal.cer.green            ->  Hostinger      (WordPress, portal only)
```

Both coexist on one domain via separate DNS records. `app/portal/page.tsx`
already expects exactly this — it is a signpost pointing at
`NEXT_PUBLIC_PORTAL_URL` and carries no client data.

**Marginal hosting cost is approximately zero.** Hostinger's Premium and
Business tiers host multiple sites and subdomains on one plan, so the portal
should fit inside the plan CER already pays for.

---

## 2. Verify on the Hostinger plan before quoting

If any of these are missing, a one-tier upgrade is the entire infrastructure
cost of the project. Quote the **renewal** price, not the promotional one.

- [ ] Subdomain can be added as a separate site
- [ ] PHP 8.2 or newer, selectable
- [ ] **Daily** backups, retained offsite (not weekly)
- [ ] Staging environment — plugin updates must never be tested on live
- [ ] Real system cron available (do not rely on `wp-cron`)
- [ ] LiteSpeed cache rules are editable (see §5 — this one is critical)
- [ ] Free SSL on the subdomain
- [ ] Object cache / Redis — nice to have, not required at this scale

---

## 3. Scope — what CER actually needs

The original brief was written as a feature-for-feature replacement of two
commercial plugins. That is far more than CER needs. Cut to this:

### The key scope correction

**Clients should never see `wp-admin` at all.** The portal is a front-end
experience; `wp-admin` is for CER staff only.

That matters commercially, because **Ultimate Dashboard Pro is mostly an
admin-UX plugin** — it customises the WordPress dashboard. Once clients live
entirely on the front end, most of what that plugin does only applies to
Raymond's own team, which is a much smaller job than the brief implies.

### Phase 1 — MVP

The portal is not useful below this line.

| Area | Included |
| --- | --- |
| Accounts | Register, log in, log out, password reset, change password |
| Profile | Edit details, upload avatar, update contact info |
| Roles | `cer_client` (front end only, `wp-admin` blocked), `cer_staff`, `administrator` |
| Pages | Styled front-end `/login/`, `/register/`, `/account/`, `/dashboard/` matching cer.green |
| Documents | Per-engagement document delivery — download, with access enforced server-side |
| Uploads | Client uploads a document to an engagement; staff notified |
| Staff side | Minimal `wp-admin`: create engagement, assign clients, upload documents |
| Email | Transactional mail over external SMTP (§5) |
| Audit | Log of who accessed which document, and when |

### Phase 2 — after Phase 1 is live and used

- Branded `wp-admin` dashboard for CER staff (the Ultimate Dashboard Pro part)
- Branded WP login page for staff
- Admin menu restriction per role
- Notification preferences
- Bulk document upload

### Phase 3 — only if asked for

- Client-to-staff messaging
- E-signature or document approval
- Engagement status / milestone tracking
- SSO

### Explicitly out of scope

Name these in the quote so they cannot arrive later as assumptions:

- A form builder — the public site already handles forms via Web3Forms
- Payments, subscriptions, memberships, invoicing
- A course or learning platform — see §7, this belongs to CER Academy
- Public user profiles or social features
- Multi-language

### The engagement model

This is the part no off-the-shelf plugin does well, and the strongest
justification for building custom:

> A **client** belongs to one or more **engagements**. Documents attach to an
> engagement. Access is derived from engagement membership — never from a URL,
> a shared link, or a plugin's generic "private content" flag.

Custom post type `cer_engagement`, with client users assigned to it. Document
access checks membership on every request.

---

## 4. Build it on WordPress core

No paid plugins, and no free plugin where core already suffices.

| Need | Use |
| --- | --- |
| Users | `wp_users` / `wp_usermeta` — never a second user table |
| Roles | `add_role()`, custom capabilities |
| Auth | Core `wp_signon`, `wp_set_auth_cookie`, core password reset |
| Engagements | Custom post type + relationship meta |
| Forms | Custom PHP + nonces + `wp_mail` over SMTP |
| Front end | Page templates in a small child theme or plugin templates |
| JS/CSS | Vanilla, enqueued properly. No build step needed |

---

## 5. Security — non-negotiable

The portal holds confidential client ESG documentation and personal data. Each
item below is a requirement, not a preference.

### Document storage

Uploads must **not** be publicly reachable. Store outside the webroot, or
inside it with hard deny rules, and serve every file through an authenticated
PHP handler that:

1. Confirms the user is logged in
2. Confirms the user belongs to the engagement the document is attached to
3. Streams the file with `Content-Disposition`, never a redirect to a real path

This is the specific failure the website rebuild was closing. Per the comment in
`app/portal/page.tsx`, **the previous site had its portal workflow pages indexed
by Google.** Meta tags and `robots.txt` are not access control.

### Cache

**The single biggest risk in the build.** Full-page caching on a logged-in
portal can serve one client's documents to another client. On Hostinger that
means LiteSpeed:

- Exclude the whole portal from full-page cache
- Exclude logged-in cookies
- Send `Cache-Control: private, no-store` on every authenticated response
- Verify by logging in as two clients in separate browsers and confirming
  neither sees the other's data

### The rest

| Item | Requirement |
| --- | --- |
| Indexing | `noindex` the entire portal install, plus `Disallow: /` in its own `robots.txt` |
| Old pages | Unpublish the old marketing pages on that install — see §6 step 3 |
| 2FA | Required for `administrator` and `cer_staff` |
| Login | Rate limiting and lockout on failed attempts |
| Every action | Capability check **and** nonce. `is_user_logged_in()` alone is not authorisation |
| Uploads | File-type allowlist, size cap, MIME sniffing — not extension trust |
| Email | External SMTP (Postmark, SES, Brevo, Resend). Shared-host `mail()` will land password resets in spam |
| PDPA | Data minimisation, stated retention period, consent record, export and delete path |
| Secrets | Outside the webroot, never committed |

---

## 6. Cutover sequence

Order matters. Done wrong, two sites compete in Google or the portal dies.

1. **Build `cer-portal`** against a staging copy of the existing WordPress.
2. **Create `portal.cer.green`** pointing at that Hostinger install.
3. **Strip the install to portal-only** — unpublish the old marketing pages,
   gate everything behind login, `noindex` the whole install. *The commonly
   skipped step.* If it keeps serving the old public pages it will compete with
   the new site for rankings.
4. **Cut the marketing site over**: point `www` → `zaddywebbuilds.github.io`,
   set repository variable `DEPLOY_TARGET=production`, re-run the workflow. That
   flips canonicals to `www.cer.green`, clears `basePath`, and writes `CNAME`.
   It is also what lifts `Disallow: /` — staging is deliberately uncrawlable
   while `www.cer.green` still serves WordPress.
5. **Verify redirects** — `lib/redirects.ts` already carries the legacy
   WordPress paths.
6. **Set `NEXT_PUBLIC_PORTAL_URL`** to `https://portal.cer.green` so the portal
   page links to the real thing.

---

## 7. Risks

| Risk | Mitigation |
| --- | --- |
| **Academy LMS overlap** | CER Academy is planned as a multi-tenant LMS with its own accounts and dashboards. Building portal auth now risks building it twice. Keep `cer-portal` scoped to *consulting engagements* and confirm the Academy boundary with Raymond before Phase 2 |
| Cache leak between clients | §5. Test with two real accounts before launch |
| Scope creep from the original brief | §3 "out of scope", written into the quote |
| Email deliverability | External SMTP from day one |
| Shared-hosting limits | Verify §2 before quoting |
| Bus factor | Documentation and handover are a priced deliverable, not a favour |
| Maintenance drift | Retainer, or an explicit written handover of responsibility |

The Academy risk is the significant one. Raymond's own plan has the Academy
becoming a separate company with a separate partner, and its LMS covers user
accounts, role-based paths and dashboards. Confirm that boundary before
building anything in Phase 2.

---

## 8. Commercial

### What to charge for

Quote these as line items, not one number:

1. Discovery and scope sign-off
2. Phase 1 build
3. Security hardening and cache configuration — name it separately; it is real
   work and it is what protects him
4. Migration and cutover
5. Documentation and handover
6. Staff training
7. **Maintenance retainer** — quote alongside the build, never after

### Why the retainer is not optional

A custom plugin means WordPress core and PHP move underneath it. A paid licence
bundles that maintenance; custom code does not. Quoting the build alone sells
an asset with nobody maintaining it — which ends up being done for free.

### The honest framing

Not *"stop paying yearly."* Instead:

> Stop renting generic software from a vendor. Own something that fits — and pay
> a maintenance retainer that is less than the licences, for software that is
> actually CER's.

That is true, it is better for CER, and it converts a one-off build into
recurring revenue.

### Payback

The licences are individually modest, so the case is not "cheaper next year."
Payback typically lands in **year 2–3**, and the stronger arguments are not
about price at all — they are ownership, fit, and vendor risk.

---

## 9. For Raymond

> **The portal, in plain terms**
>
> CER's new website is fast and secure because it is a static site — it has no
> database and no login system to attack. That is also why the client portal
> cannot live inside it: a login system needs a server.
>
> CER already has one. The old WordPress site is still running on Hostinger.
> Rather than switching it off when the new site goes live, we convert it into
> the client portal at `portal.cer.green`. **The hosting bill does not change.**
>
> The portal is built custom for CER rather than assembled from paid plugins:
>
> 1. **CER owns it.** It is an asset, not a subscription. No licence can lapse
>    or be re-priced.
> 2. **No vendor risk.** Commercial plugins get abandoned, acquired, or moved to
>    a higher tier. Owned code cannot be.
> 3. **It is more secure, not less.** A commercial plugin ships hundreds of
>    features CER will never use, and every one is attack surface. This has only
>    what CER needs.
> 4. **It fits CER's actual work.** Documents are released per engagement, to
>    the clients on that engagement. Generic plugins cannot do this properly.
> 5. **It matches the website.** Clients move from site to portal without
>    noticing a seam.
> 6. **The data stays CER's** — standard WordPress user records, fully portable.
>
> **Said plainly:** the build costs more upfront than one year of plugin
> licences, and pays back around year two. Maintenance does not disappear — it
> moves from the plugin vendor to us, which is what the retainer covers.
> WordPress and PHP keep moving underneath any custom system, and client data
> deserves someone actually responsible for it.
>
> CER also gets documentation and a full handover, so it is never dependent on
> one person.

---

## 10. Open questions

For Raymond:

1. Who are the portal's users — existing clients only, or prospects too?
2. Roughly how many, and how many CER staff need admin access?
3. What documents actually move through it, and in which direction?
4. Any retention or confidentiality obligation in client contracts?
5. **Where does CER Academy's LMS end and the portal begin?** (§7)

For the Hostinger account:

6. Which plan, and does it satisfy §2?
7. Is the WordPress install clean enough to build on, or is a fresh install on
   the subdomain safer?

---

## Related

- `app/portal/page.tsx` — the public signpost, and why it holds no client data
- `docs/MIGRATION.md` — old WordPress URL inventory
- `.github/workflows/deploy.yml` — staging/production targets and the cutover
- `lib/redirects.ts` — legacy path redirects
