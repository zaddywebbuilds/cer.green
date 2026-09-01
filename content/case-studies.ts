import type { CaseStudy, Testimonial } from '@/types/content';

/**
 * Case studies.
 *
 * CER has no approved, publishable case studies at the time of this build. The
 * previous website carried none, and no client results are verifiable from
 * CER's published material.
 *
 * Rather than invent projects or metrics, the case study system is built in
 * full -- listing page, detail template, schema, filters, related content and
 * card component -- and ships with a single DRAFT entry below. That draft is
 * never rendered publicly, never enters the sitemap and never reaches search
 * engines. It exists so CER can see exactly which fields to complete.
 *
 * TO PUBLISH A CASE STUDY: copy the draft, replace every field with verified
 * detail, obtain written client approval for the display name and any quote,
 * and change `status` to 'published'. Where a client will not be named, set
 * `confidential: true` and use a descriptive display name such as
 * "Regional financial institution". Never publish a metric that has not been
 * measured. See docs/CONTENT-GUIDE.md.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'template-case-study',
    title: 'Case study title describing the outcome, not the client',
    clientDisplayName: 'Client name, or an anonymised descriptor where an NDA applies',
    confidential: true,
    industrySlug: 'financial-services',
    projectType: 'Project type, for example Financed emissions baseline',
    outcomeSummary:
      'One sentence stating what changed for the client. Verified only.',
    context: [
      'Who the client is, at the level of detail they have approved: sector, scale, operating footprint, and anything relevant to why the engagement was needed.',
    ],
    challenge: [
      'The specific problem, stated concretely. What was being asked of the client, by whom, and why their existing position was insufficient.',
    ],
    approach: [
      'How CER framed the work. Which methodology or framework applied and why that was the right choice for this client.',
    ],
    implementation: [
      'What was actually done, in sequence. This is the section that demonstrates capability, so it should be specific about activities rather than describing outputs.',
    ],
    outcome: [
      'What the client ended up with, and what it enabled. Only outcomes the client has confirmed.',
    ],
    metrics: [],
    frameworks: [],
    solutionSlugs: ['financed-emissions'],
    expertSlugs: ['raymond-cheung'],
    seo: {
      title: 'Case study template',
      description:
        'Template case study. Not for publication. Complete every field with verified detail before changing status to published.',
      noindex: true,
      nofollow: true,
    },
    status: 'draft',
  },
];

/**
 * Testimonials.
 *
 * Empty by design. A testimonial may only be added where CER holds written
 * permission from the named individual and their organisation. The component
 * renders nothing when this list is empty, and the homepage and Academy pages
 * omit the section entirely rather than showing a placeholder.
 */
export const testimonials: Testimonial[] = [];

export const caseStudyBySlug = Object.fromEntries(caseStudies.map((c) => [c.slug, c]));
