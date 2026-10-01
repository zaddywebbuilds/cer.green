# CER Academy plan

Source: Ee Chong's strategic proposal, 30 September 2026, plus the client call
of 1 October. This supersedes `docs/PORTAL-PLAN.md`.

Raymond's instruction for the website is explicit: **no financial projections.
Carry the relevant information about CER Academy and why CER is doing this.**

---

## 1. The split

| | CER Consultancy | CER Academy |
| --- | --- | --- |
| What the site does | Information only | Information now, LMS later |
| Login | None, ever | Yes, in the LMS |
| Direction | Stays as built | The expansion area |

Consultancy stays an information provider: it explains what CER offers,
prospects contact CER directly, and the work then runs through an engagement
letter and the project. Academy is where the build-out happens.

The LMS is being brought in rather than written from scratch, so it is a
product selection exercise, not an application we develop. Learners sign in
there, not on this website. Where the website needs to point at it, it links
out.

---

## 2. What the website may say today

Safe to publish. None of it depends on an agreement that is not yet signed.

- CER Academy is an AI-powered learning platform for compliance and capability
  training.
- It serves two audiences: SMEs, and non-profits (charities, IPCs, NGOs).
- Core compliance coverage: AML, anti-bribery, PDPA, workplace safety and
  health, workplace harassment, ESG.
- Further modules: fundraising, charity accounting, ISO standards.
- Planned AI capabilities, described as what the platform is being built to do:
  role-based learning paths mapped to a job profile, a conversational
  assistant for policy questions, and regulatory monitoring that flags gaps
  when rules change.
- The reasoning, which is the strongest public material in the proposal:
  compliance obligations keep growing, SME owners and charity administrators
  are time-poor, and training records and certifications are hard to track.
  That is the problem the Academy exists to solve.

Write capabilities that do not exist yet in the future tense. "The platform is
being built to" is honest. "The platform does" is not, until it does.

---

## 3. What must never go on the website

Internal strategy. Publishing any of it would damage CER.

- Every revenue figure: the Year 1 to Year 3 projections, the ARR milestone,
  account volume targets, margin commentary.
- The "Trojan Horse" framing for the SaaS play.
- "Ecosystem arbitrage", "bypassing the accreditation bottleneck",
  "circumvents accreditation delays". This language is fine in a board paper
  and corrosive in public, because it tells a buyer that CER is routing around
  accreditation rather than holding it.
- The execution risk register and its mitigations.
- Partner dependency analysis.

---

## 4. Claims that need verification before they are published

This is the part that carries real exposure. In the proposal these are stated
as intentions, in the future or exploratory tense. On a website they would read
as current fact, and several of them are regulated claims.

| Claim | Status in the proposal | Why it cannot be published yet |
| --- | --- | --- |
| ATO partnership | "will partner" | Not signed. CER does not hold ATO status itself; the proposal says standalone status is about 6 months away. |
| WSQ-accredited modules | "leverage ASME to launch" | WSQ accreditation would sit with the partner ATO, not with CER. Claiming it directly misrepresents who holds it. |
| ASME co-branding, 6,000+ members | "roll out", "co-market" | No agreement confirmed. Naming another organisation as a partner before it is agreed is their reputation, not CER's, to spend. |
| MCCY grant eligibility | "unlocking MCCY grants" | Flows from the partner ATO's accreditation. Not CER's to assert. |
| Civil Service College collaboration | "Explore training partnerships" | Explicitly exploratory. A public claim here would be plainly untrue. |
| PSG grant eligibility, up to 50% | "Actively apply within Months 1 to 2" | The application has not been made. Telling an SME they can claim PSG before pre-approval exists invites them to budget for a subsidy they cannot get. |
| Pricing: S$388 setup, S$499 to S$1,800/yr | Proposed | Commercially sensitive and still moving, with early-bird waivers in play. Raymond should decide whether pricing is public at all. |

Singapore specifics worth stating plainly: SkillsFuture Singapore governs who
may present as WSQ-accredited or as an Approved Training Organisation, and
Enterprise Singapore governs PSG vendor listing. Advertising either before it
is granted is not a marketing risk, it is a regulatory one, and it is the kind
of thing a competitor reports.

The safe construction once an agreement is signed is "delivered in partnership
with [named ATO]", naming who holds the accreditation. Until signed, say
nothing.

Each of these goes behind `needsVerification()` in `lib/site.ts` or the Academy
content files, so `scripts/check-content.mjs` fails the production build while
any of them is unresolved. That is the existing convention and it is exactly
what it was built for.

---

## 5. Open decisions for Raymond

1. Does Academy stay a section of this site, or move to its own subdomain
   (`academy.cer.green`)? He said "on the same site" on the call, but the LMS
   will need a home either way.
2. Which LMS product is being brought in? The answer sets what the website
   links to and how sign-in is presented.
3. Is pricing public, or quote-on-request?
4. Which partnership, if any, is far enough along to name?
