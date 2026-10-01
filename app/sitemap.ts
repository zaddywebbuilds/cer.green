import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
import {
  getArticles,
  getCaseStudies,
  getCourses,
  getExperts,
  getIndustries,
  getSolutionCategories,
  getSolutions,
} from '@/lib/content';
import { absoluteUrl } from '@/lib/seo';
import { isNoindexPath } from '@/lib/site';

/**
 * XML sitemap.
 *
 * Built from published content, so a draft document cannot leak into it and a
 * new service appears without anyone remembering to add it.
 *
 * Three things are deliberately excluded:
 *   - Anything under a protected prefix (account, API), filtered
 *     through `isNoindexPath` rather than by remembering to leave it out.
 *   - Filtered listing views such as `/insights/?category=esg`. They are
 *     canonicalised to the unfiltered page and would otherwise create an
 *     expanding set of near-duplicate URLs.
 *   - The 404 and error pages.
 */

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: Array<{ path: string; priority: number; changeFrequency: Entry['changeFrequency'] }> = [
    { path: '/', priority: 1, changeFrequency: 'monthly' },
    { path: '/solutions/', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/academy/', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/academy/courses/', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/academy/corporate-training/', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/academy/executive-programmes/', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/academy/custom-training/', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/industries/', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/case-studies/', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/insights/', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/about/', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/about/who-we-are/', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/about/experts/', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/about/partners/', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact/', priority: 0.8, changeFrequency: 'yearly' },
    { path: '/privacy-policy/', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/terms/', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/cookie-policy/', priority: 0.2, changeFrequency: 'yearly' },
  ];

  const entries: Entry[] = [
    ...staticPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),

    ...getSolutionCategories().map((category) => ({
      url: absoluteUrl(`/solutions/${category.slug}/`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),

    ...getSolutions().map((solution) => ({
      url: absoluteUrl(`/solutions/${solution.slug}/`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    ...getCourses().map((course) => ({
      url: absoluteUrl(`/academy/courses/${course.slug}/`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    ...getIndustries().map((industry) => ({
      url: absoluteUrl(`/industries/${industry.slug}/`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    ...getExperts().map((expert) => ({
      url: absoluteUrl(`/about/experts/${expert.slug}/`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),

    ...getCaseStudies().map((caseStudy) => ({
      url: absoluteUrl(`/case-studies/${caseStudy.slug}/`),
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),

    ...getArticles().map((article) => ({
      url: absoluteUrl(`/insights/${article.slug}/`),
      lastModified: new Date(article.updatedAt ?? article.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];

  // Belt and braces: nothing under a protected prefix reaches the sitemap even
  // if a future page is added without thinking about it.
  return entries.filter((entry) => {
    const path = new URL(entry.url).pathname;
    return !isNoindexPath(path);
  });
}
