/**
 * Content access layer.
 *
 * Every page reads content through these functions rather than importing from
 * `/content` directly. That indirection is the point: when CER moves to a
 * hosted CMS, the Sanity queries replace the bodies of these functions and no
 * page or component changes.
 *
 * Two rules are enforced here rather than in components, so they cannot be
 * forgotten on a new page:
 *   1. Draft documents never reach a public page, a sitemap or a static path.
 *   2. Cross-references to draft or missing documents are dropped rather than
 *      rendering a broken link.
 */

import type {
  Article,
  CaseStudy,
  Course,
  Expert,
  Industry,
  Solution,
} from '@/types/content';

import { solutions as allSolutions } from '@/content/solutions';
import { solutionCategories } from '@/content/solution-categories';
import { courses as allCourses, courseCategories } from '@/content/courses';
import { experts as allExperts } from '@/content/experts';
import { industries as allIndustries } from '@/content/industries';
import { caseStudies as allCaseStudies, testimonials } from '@/content/case-studies';
import { articles as allArticles, articleCategories } from '@/content/articles';
import { partners } from '@/content/partners';

const isPublished = <T extends { status: 'published' | 'draft' }>(doc: T) =>
  doc.status === 'published';

/** Drops slugs that do not resolve to a published document. */
function resolveMany<T extends { slug: string }>(
  slugs: string[] | undefined,
  pool: T[],
): T[] {
  if (!slugs?.length) return [];
  const bySlug = new Map(pool.map((d) => [d.slug, d]));
  return slugs.map((s) => bySlug.get(s)).filter((d): d is T => Boolean(d));
}

/* -------------------------------------------------------------------------- */
/* Solutions                                                                  */
/* -------------------------------------------------------------------------- */

export function getSolutions(): Solution[] {
  return allSolutions.filter(isPublished);
}

export function getSolution(slug: string): Solution | undefined {
  return getSolutions().find((s) => s.slug === slug);
}

export function getSolutionCategories() {
  return solutionCategories;
}

export function getSolutionCategory(slug: string) {
  return solutionCategories.find((c) => c.slug === slug);
}

export function getSolutionsByCategory(categorySlug: string): Solution[] {
  return getSolutions().filter((s) => s.category === categorySlug);
}

/** Every published solution grouped under its category, in category order. */
export function getSolutionsGrouped() {
  return solutionCategories.map((category) => ({
    category,
    solutions: getSolutionsByCategory(category.slug),
  }));
}

/* -------------------------------------------------------------------------- */
/* Academy                                                                    */
/* -------------------------------------------------------------------------- */

export function getCourses(): Course[] {
  return allCourses.filter(isPublished);
}

export function getCourse(slug: string): Course | undefined {
  return getCourses().find((c) => c.slug === slug);
}

export function getCourseCategories() {
  return courseCategories;
}

export function getCoursesByCategory(categorySlug: string): Course[] {
  return getCourses().filter((c) => c.category === categorySlug);
}

/**
 * Scheduled course dates in the future, soonest first. Returns an empty array
 * when CER has not published a schedule -- the UI shows an enquiry route rather
 * than inventing dates.
 */
export function getUpcomingCourseDates(limit?: number) {
  const now = Date.now();
  const dates = getCourses().flatMap((course) =>
    course.upcoming
      .filter((d) => d.status === 'scheduled' && new Date(d.start).getTime() >= now)
      .map((date) => ({ course, date })),
  );
  dates.sort((a, b) => new Date(a.date.start).getTime() - new Date(b.date.start).getTime());
  return limit ? dates.slice(0, limit) : dates;
}

/* -------------------------------------------------------------------------- */
/* Experts                                                                    */
/* -------------------------------------------------------------------------- */

export function getExperts(): Expert[] {
  return allExperts.filter(isPublished);
}

export function getExpert(slug: string): Expert | undefined {
  return getExperts().find((e) => e.slug === slug);
}

export function getExpertsBySlugs(slugs: string[] | undefined): Expert[] {
  return resolveMany(slugs, getExperts());
}

/* -------------------------------------------------------------------------- */
/* Industries                                                                 */
/* -------------------------------------------------------------------------- */

export function getIndustries(): Industry[] {
  return allIndustries.filter(isPublished);
}

export function getIndustry(slug: string): Industry | undefined {
  return getIndustries().find((i) => i.slug === slug);
}

export function getIndustriesBySlugs(slugs: string[] | undefined): Industry[] {
  return resolveMany(slugs, getIndustries());
}

/* -------------------------------------------------------------------------- */
/* Case studies                                                               */
/* -------------------------------------------------------------------------- */

export function getCaseStudies(): CaseStudy[] {
  return allCaseStudies.filter(isPublished);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((c) => c.slug === slug);
}

export function getCaseStudiesBySolution(solutionSlug: string): CaseStudy[] {
  return getCaseStudies().filter((c) => c.solutionSlugs.includes(solutionSlug));
}

export function getCaseStudiesByIndustry(industrySlug: string): CaseStudy[] {
  return getCaseStudies().filter((c) => c.industrySlug === industrySlug);
}

/* -------------------------------------------------------------------------- */
/* Insights                                                                   */
/* -------------------------------------------------------------------------- */

/** Published articles, newest first. */
export function getArticles(): Article[] {
  return allArticles
    .filter(isPublished)
    .slice()
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}

export function getArticleCategories() {
  // Only categories that actually have published articles behind them, so the
  // filter bar never offers a route to an empty result.
  const used = new Set(getArticles().map((a) => a.categorySlug));
  return articleCategories.filter((c) => used.has(c.slug));
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return getArticles().filter((a) => a.categorySlug === categorySlug);
}

export function getArticlesBySolution(solutionSlug: string): Article[] {
  return getArticles().filter((a) => a.relatedSolutions?.includes(solutionSlug));
}

export function getArticlesByAuthor(authorSlug: string): Article[] {
  return getArticles().filter((a) => a.authorSlug === authorSlug);
}

/** Words per minute used for the reading-time estimate shown on articles. */
const WPM = 225;

export function readingTime(article: Article): number {
  if (article.readingTime) return article.readingTime;
  const words = [
    article.title,
    article.excerpt,
    ...article.intro,
    ...article.sections.flatMap((s) => [s.heading, ...s.body, ...(s.list ?? [])]),
  ]
    .join(' ')
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / WPM));
}

/* -------------------------------------------------------------------------- */
/* Cross-references                                                           */
/* -------------------------------------------------------------------------- */

export function getSolutionsBySlugs(slugs: string[] | undefined): Solution[] {
  return resolveMany(slugs, getSolutions());
}

export function getCoursesBySlugs(slugs: string[] | undefined): Course[] {
  return resolveMany(slugs, getCourses());
}

export function getArticlesBySlugs(slugs: string[] | undefined): Article[] {
  return resolveMany(slugs, getArticles());
}

export function getCaseStudiesBySlugs(slugs: string[] | undefined): CaseStudy[] {
  return resolveMany(slugs, getCaseStudies());
}

/* -------------------------------------------------------------------------- */
/* Other                                                                      */
/* -------------------------------------------------------------------------- */

export function getPartners() {
  return partners;
}

/** Only testimonials CER holds written permission for are ever returned. */
export function getTestimonials() {
  return testimonials.filter((t) => t.approved);
}
