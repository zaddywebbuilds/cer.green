import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
import { siteUrl } from '@/lib/site';
import { gonePaths } from '@/lib/redirects';

/**
 * robots.txt
 *
 * Staging and preview environments disallow everything, so a preview URL cannot
 * be crawled even if it is linked. Production allows crawling but excludes
 * authenticated areas, workflow routes and filtered listing views.
 *
 * Note that robots.txt is a crawl directive, not access control, and it is
 * public. Confidential material must be behind authentication -- which is why
 * client documents live in the portal application and never on this site.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.DEPLOY_ENV === 'production';

  if (!isProduction) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Account areas. No such routes exist on this site, but the old one
          // exposed them, so they stay disallowed defensively.
          '/login/',
          '/account/',
          '/dashboard/',
          // Internal endpoints.
          '/api/',
          // Transactional and workflow pages.
          '/thank-you/',
          // Filtered listing views. Canonicalised to their parent page, so
          // there is nothing to gain by crawling every combination.
          '/insights/?*',
          '/academy/courses/?*',
          // Legacy WordPress paths retired with the old site.
          ...gonePaths.prefixes,
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
