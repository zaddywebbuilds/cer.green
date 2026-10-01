/**
 * Global site configuration.
 *
 * Everything in here is either verified from CER's own published material or
 * explicitly marked for verification. Nothing is invented.
 *
 * Anything wrapped in `needsVerification()` is a genuine content gap. It
 * renders visibly in development, is omitted from the public page in
 * production, and `scripts/check-content.mjs` fails the production build if a
 * marker reaches a page that is meant to launch. See docs/CONTENT-GUIDE.md.
 */

/** Marks a value CER must confirm before launch. */
export function needsVerification(note: string): string {
  return `[VERIFY WITH CER: ${note}]`; // check-content-ignore
}

/** True when a string is an unresolved content placeholder. */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return false;
  return /\[(VERIFY WITH CER|CONTENT REQUIRED)/.test(value);
}

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.cer.green'
).replace(/\/$/, '');

export const site = {
  name: 'CER',
  /** Registered entity name. Confirmed from CER's published material. */
  legalName: 'CER Consultancy',
  url: siteUrl,
  locale: 'en_SG',
  lang: 'en',

  /** The five-second answer. Used in metadata and the organisation schema. */
  positioning:
    'CER helps organisations turn sustainability, ESG and carbon requirements into measurable business action.',
  descriptor:
    'Singapore-based sustainability advisory, carbon expertise and professional training for organisations operating across Asia.',

  /** Verified from cer.green. */
  email: 'enquiry@cer.green',
  linkedin: 'https://www.linkedin.com/company/cer-consultancy',

  /**
   * Not published on the current CER website. These must be supplied before
   * launch -- a B2B advisory site needs a verifiable business address, and
   * organisation schema is stronger with one.
   */
  phone: needsVerification('business telephone number'),
  address: {
    street: needsVerification('street address'),
    locality: 'Singapore',
    region: '',
    postalCode: needsVerification('postal code'),
    country: 'SG',
    countryName: 'Singapore',
  },
  /** Unique Entity Number. Required on the legal pages once confirmed. */
  uen: needsVerification('UEN / company registration number'),

  /** The CER methodology. Verified from CER's published material. */
  methodology: {
    name: 'Crystalise. Economise. Revitalise.',
    stages: [
      {
        number: '01',
        name: 'Crystalise',
        summary:
          'Establish where the organisation actually stands: current position, obligations, exposure and the gaps between them.',
        activities: [
          'Baseline assessment',
          'Data and evidence review',
          'Stakeholder analysis',
          'Gap assessment',
          'Regulatory mapping',
        ],
      },
      {
        number: '02',
        name: 'Economise',
        summary:
          'Decide where effort and investment should go, so the programme addresses what is material rather than everything at once.',
        activities: [
          'Materiality assessment',
          'Prioritisation',
          'Roadmap development',
          'Financial assessment',
          'Target setting',
        ],
      },
      {
        number: '03',
        name: 'Revitalise',
        summary:
          'Put the programme into operation, measure it, and build the internal capability to keep it running.',
        activities: [
          'Implementation support',
          'Reporting',
          'Training',
          'Performance tracking',
          'Continuous improvement',
        ],
      },
    ],
  },
} as const;

/** Primary calls to action, kept in one place so labels stay consistent. */
export const cta = {
  consulting: { label: 'Talk to CER', href: '/contact/?enquiry=consulting', event: 'consultation_cta_click' },
  solutions: { label: 'Explore our solutions', href: '/solutions/', event: 'solutions_cta_click' },
  discuss: { label: 'Discuss your requirements', href: '/contact/?enquiry=consulting', event: 'consultation_cta_click' },
  academy: { label: 'Explore CER Academy', href: '/academy/', event: 'academy_cta_click' },
  courses: { label: 'Browse courses', href: '/academy/courses/', event: 'academy_cta_click' },
  corporateTraining: {
    label: 'Request corporate training',
    href: '/contact/?enquiry=academy&type=corporate',
    event: 'corporate_training_cta_click',
  },
  contact: { label: 'Contact CER', href: '/contact/', event: 'contact_cta_click' },
} as const;

/**
 * Route prefixes that must never be indexed: authenticated areas, workflow
 * screens and transactional confirmations. Enforced in three places --
 * `app/robots.ts`, the sitemap builder, and per-route metadata.
 */
export const noindexPrefixes = [
  '/login',
  '/account',
  '/dashboard',
  '/api',
  '/thank-you',
  '/search',
] as const;

export function isNoindexPath(path: string): boolean {
  return noindexPrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}
