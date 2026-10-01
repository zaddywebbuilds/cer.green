/**
 * Content model for the CER website.
 *
 * These types are the contract between the content source and the UI. They
 * mirror the Sanity schemas in `/cms/schemas` one-for-one, so moving from the
 * bundled content in `/content` to a hosted CMS is a change to
 * `lib/content.ts` alone -- no component needs to be touched.
 */

/** Per-page search and social metadata. Every indexable document carries one. */
export interface Seo {
  /** Falls back to the document title. */
  title?: string;
  /** 140-160 characters. Unique per page. */
  description: string;
  /** Absolute path; only set when a page must point at a different canonical. */
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  /** Path under /public or an absolute URL. Falls back to the branded default. */
  ogImage?: string;
  noindex?: boolean;
  nofollow?: boolean;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
}

export interface ImageAsset {
  src: string;
  /** Empty string marks the image as decorative. Never a filename. */
  alt: string;
  width: number;
  height: number;
  caption?: string;
  credit?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface CtaConfig {
  label: string;
  href: string;
  /** Analytics event name fired on click. */
  event?: string;
}

/* -------------------------------------------------------------------------- */
/* Solutions                                                                  */
/* -------------------------------------------------------------------------- */

export type SolutionCategorySlug =
  | 'carbon-climate'
  | 'esg-sustainability'
  | 'compliance-standards'
  | 'sustainable-finance';

export interface SolutionCategory {
  slug: SolutionCategorySlug;
  title: string;
  /** Short label used in navigation. */
  navTitle: string;
  /** One-line positioning used on cards and in the mega menu. */
  summary: string;
  /** The business problem this category answers. */
  problem: string;
  /** What CER does about it. */
  capability: string;
  /** What the client ends up with. */
  outcome: string;
  seo: Seo;
}

export interface Solution {
  slug: string;
  title: string;
  /** Menu label, where it differs from the full title. */
  navTitle?: string;
  category: SolutionCategorySlug;
  /** Outcome-oriented hero statement. One sentence. */
  heroStatement: string;
  summary: string;
  /** Why this matters, who it affects, regulatory and market context. */
  businessContext: string[];
  /** The specific components of the engagement. */
  components: string[];
  /** Concrete deliverables. Only what CER genuinely provides. */
  deliverables: string[];
  /** Named frameworks -- only where genuinely relevant to this service. */
  frameworks?: string[];
  /** Organisation types this service is built for. */
  audience: string[];
  faqs: Faq[];
  relatedSolutions?: string[];
  relatedIndustries?: string[];
  expertSlugs?: string[];
  seo: Seo;
  /** Draft services are excluded from the sitemap, nav and static generation. */
  status: 'published' | 'draft';
}

/* -------------------------------------------------------------------------- */
/* Academy                                                                    */
/* -------------------------------------------------------------------------- */

export type CourseCategorySlug =
  | 'esg-sustainability'
  | 'carbon-climate'
  | 'risk-governance'
  | 'sustainable-finance';

export interface CourseCategory {
  slug: CourseCategorySlug;
  title: string;
  summary: string;
}

export interface CourseDate {
  /** ISO 8601 date. */
  start: string;
  end?: string;
  location: string;
  /** Scheduled dates are advertised; on-request shows an enquiry route. */
  status: 'scheduled' | 'on-request';
}

export interface Course {
  slug: string;
  title: string;
  category: CourseCategorySlug;
  /** One sentence describing what the participant can do afterwards. */
  outcome: string;
  summary: string;
  description: string[];
  /** For example Half day, 1 day, 2 days -- as confirmed by CER. */
  duration: string;
  formats: Array<'In person' | 'Virtual live' | 'In-house'>;
  location: string;
  upcoming: CourseDate[];
  /** Public pricing. Omitted where CER prices on enquiry. */
  price?: { amount: number; currency: string; note?: string };
  whoShouldAttend: string[];
  learningOutcomes: string[];
  modules: Array<{ title: string; points: string[] }>;
  instructorSlugs: string[];
  /**
   * Certification statement. Must describe exactly what a participant
   * receives. Never implies external accreditation that does not exist.
   *
   * Optional, and left unset for now. CER issues either a Certificate of
   * Participation or a Certificate of Completion, but which applies depends on
   * the delivery partner, and TÜV SÜD is only one of several. Until a course's
   * award is settled, the page says that certification is confirmed on enquiry
   * rather than naming one.
   */
  certification?: string;
  /** Available as a private in-house programme. */
  corporateAvailable: boolean;
  relatedCourses?: string[];
  relatedSolutions?: string[];
  faqs?: Faq[];
  seo: Seo;
  status: 'published' | 'draft';
  /** Controls whether the enquiry form is presented as open. */
  registration: 'open' | 'enquire' | 'closed';
}

/* -------------------------------------------------------------------------- */
/* People, partners, industries                                               */
/* -------------------------------------------------------------------------- */

export interface Expert {
  slug: string;
  name: string;
  role: string;
  photo?: ImageAsset;
  shortBio: string;
  longBio: string[];
  expertise: string[];
  industries?: string[];
  qualifications: string[];
  credentials?: string[];
  linkedin?: string;
  courseSlugs?: string[];
  solutionSlugs?: string[];
  articleSlugs?: string[];
  caseStudySlugs?: string[];
  seo: Seo;
  status: 'published' | 'draft';
}

export type PartnerRelationship =
  | 'Strategic Partner'
  | 'Training Partner'
  | 'Technology Partner'
  | 'Project Partner'
  | 'Academic Partner';

export interface Partner {
  name: string;
  relationship: PartnerRelationship;
  /** Describes the nature of the collaboration. Never implies a client. */
  description: string;
  logo?: ImageAsset;
  url?: string;
}

export interface Industry {
  slug: string;
  title: string;
  navTitle?: string;
  /** The real operating problem in this sector -- not a generic line. */
  challenge: string;
  summary: string;
  context: string[];
  /** Sector-specific requirements CER helps organisations meet. */
  priorities: string[];
  solutionSlugs: string[];
  courseSlugs?: string[];
  seo: Seo;
  status: 'published' | 'draft';
}

/* -------------------------------------------------------------------------- */
/* Case studies                                                               */
/* -------------------------------------------------------------------------- */

export interface CaseStudyMetric {
  value: string;
  label: string;
  /** Set when the figure is illustrative rather than a measured result. */
  illustrative?: boolean;
}

export interface CaseStudy {
  slug: string;
  title: string;
  /** Display name, or an anonymised descriptor where an NDA applies. */
  clientDisplayName: string;
  confidential: boolean;
  industrySlug: string;
  projectType: string;
  outcomeSummary: string;
  challenge: string[];
  context: string[];
  approach: string[];
  implementation: string[];
  outcome: string[];
  metrics?: CaseStudyMetric[];
  frameworks?: string[];
  solutionSlugs: string[];
  expertSlugs?: string[];
  quote?: { text: string; name: string; role: string; organisation: string };
  image?: ImageAsset;
  seo: Seo;
  status: 'published' | 'draft';
}

/* -------------------------------------------------------------------------- */
/* Insights                                                                   */
/* -------------------------------------------------------------------------- */

export type ArticleType =
  | 'Article'
  | 'Guide'
  | 'Regulatory Update'
  | 'White Paper'
  | 'Report';

export interface ArticleCategory {
  slug: string;
  title: string;
  description: string;
}

export interface ArticleSection {
  /** Rendered as an h2 and registered in the table of contents. */
  heading: string;
  id: string;
  body: string[];
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  type: ArticleType;
  categorySlug: string;
  authorSlug: string;
  publishedAt: string;
  updatedAt?: string;
  /** Minutes. Derived at build time when omitted. */
  readingTime?: number;
  intro: string[];
  sections: ArticleSection[];
  image?: ImageAsset;
  relatedSolutions?: string[];
  relatedArticles?: string[];
  tags?: string[];
  seo: Seo;
  status: 'published' | 'draft';
}

/* -------------------------------------------------------------------------- */
/* Testimonials                                                               */
/* -------------------------------------------------------------------------- */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  organisation: string;
  /** Written permission on file. Only approved testimonials are rendered. */
  approved: boolean;
}
