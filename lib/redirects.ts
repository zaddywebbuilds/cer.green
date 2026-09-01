/**
 * Redirect map: old cer.green URLs to their closest equivalent on the new site.
 *
 * Built from a crawl of the previous site's Yoast sitemaps (page, post,
 * course-step, category, author and Elementor sitemaps) on 1 September 2026.
 * The full inventory and the reasoning behind each decision is in
 * docs/MIGRATION.md.
 *
 * Two principles:
 *   1. Every old page goes to the closest relevant new page. Nothing is
 *      redirected to the homepage as a catch-all -- that destroys the ranking
 *      signal the redirect exists to preserve.
 *   2. Pages that should never have been public are not redirected at all.
 *      They return 410 Gone from `middleware.ts`, which removes them from the
 *      index faster than a 404 and far faster than a redirect.
 */

import type { Redirect } from 'next/dist/lib/load-custom-routes';

export const redirects: Redirect[] = [
  /* ---- Company ---------------------------------------------------------- */
  { source: '/who-we-are', destination: '/about/who-we-are/', statusCode: 301 },
  { source: '/our-experts', destination: '/about/experts/', statusCode: 301 },
  { source: '/partners', destination: '/about/partners/', statusCode: 301 },
  { source: '/cer-group', destination: '/about/', statusCode: 301 },
  { source: '/contact-us', destination: '/contact/', statusCode: 301 },

  /* ---- Solutions --------------------------------------------------------
     Both old service pages described the same advisory offering, so both point
     at the solutions hub rather than at a single arbitrary service. ------- */
  { source: '/cer-solutions', destination: '/solutions/', statusCode: 301 },
  { source: '/services', destination: '/solutions/', statusCode: 301 },

  /* ---- Academy ---------------------------------------------------------- */
  { source: '/cer-academy', destination: '/academy/', statusCode: 301 },
  { source: '/cer-courses', destination: '/academy/courses/', statusCode: 301 },

  /* ---- Editorial -------------------------------------------------------- */
  { source: '/news', destination: '/insights/', statusCode: 301 },
  { source: '/category/blog', destination: '/insights/', statusCode: 301 },
  {
    source: '/bpr-sentral-mandiri-launches-esg-awareness-initiative-sustainability-efforts-begin-with-me',
    destination: '/insights/',
    statusCode: 301,
  },
  {
    // Duplicate of an earlier post -- the "copy-2" suffix is a WordPress
    // artefact. Sent to the hub rather than recreated as a thin page.
    source: '/a-deep-dive-into-environmental-social-and-governance-practices-copy-2',
    destination: '/insights/',
    statusCode: 301,
  },

  /* ---- Legal ------------------------------------------------------------ */
  { source: '/terms-and-conditions', destination: '/terms/', statusCode: 301 },
  { source: '/privacy-notice', destination: '/privacy-policy/', statusCode: 301 },
  {
    // ACTION FOR CER: if the modern slavery statement is still current it should
    // be republished as its own page and this redirect repointed at it.
    source: '/modern-slavery-act-statement',
    destination: '/terms/',
    statusCode: 301,
  },

  /* ---- Testimonials -----------------------------------------------------
     The new site publishes no testimonials, because none are approved. The old
     URL points at About rather than at an empty page. -------------------- */
  { source: '/testimonials', destination: '/about/', statusCode: 301 },

  /* ---- Portal and account routes ----------------------------------------
     These were indexable on the old site, which is the exposure this rebuild
     closes. They now resolve to the portal gateway, which is noindex and
     excluded from the sitemap. ------------------------------------------- */
  { source: '/my-decarbonization-journey', destination: '/portal/', statusCode: 301 },
  { source: '/dashboard', destination: '/portal/', statusCode: 301 },
  { source: '/members', destination: '/portal/', statusCode: 301 },
  { source: '/members-2', destination: '/portal/', statusCode: 301 },
  { source: '/my-account', destination: '/portal/', statusCode: 301 },
  { source: '/account', destination: '/portal/', statusCode: 301 },
  { source: '/login', destination: '/portal/', statusCode: 301 },
  { source: '/member-login', destination: '/portal/', statusCode: 301 },
  { source: '/register', destination: '/portal/', statusCode: 301 },
  { source: '/sign-up', destination: '/portal/', statusCode: 301 },
  { source: '/registration', destination: '/portal/', statusCode: 301 },
  { source: '/student-registration', destination: '/portal/', statusCode: 301 },
  { source: '/instructor-registration', destination: '/portal/', statusCode: 301 },
  { source: '/edit-profile', destination: '/portal/', statusCode: 301 },
  { source: '/welcome', destination: '/portal/', statusCode: 301 },
  { source: '/password-reset', destination: '/portal/', statusCode: 301 },
  { source: '/lost-password', destination: '/portal/', statusCode: 301 },
  { source: '/logout', destination: '/portal/', statusCode: 301 },
  { source: '/member-logout', destination: '/portal/', statusCode: 301 },
  { source: '/member-tos-page', destination: '/terms/', statusCode: 301 },

  /* ---- Commerce routes --------------------------------------------------
     The new public site does not transact. These point at the Academy, which
     is where a purchase intent should now land. -------------------------- */
  { source: '/subscription', destination: '/academy/', statusCode: 301 },
  { source: '/subscription-plan', destination: '/academy/', statusCode: 301 },
  { source: '/checkout-page', destination: '/academy/courses/', statusCode: 301 },
  { source: '/payment', destination: '/academy/courses/', statusCode: 301 },
  { source: '/order-received', destination: '/academy/', statusCode: 301 },
];

/**
 * Paths that return 410 Gone rather than redirecting.
 *
 * These are workflow screens, upload steps, WordPress plumbing and internal
 * artefacts that were indexed on the old site and should be removed from search
 * results. A 410 tells Google the resource is permanently gone and is processed
 * more decisively than a 404.
 *
 * Prefix entries end with `/`; exact entries do not.
 */
export const gonePaths = {
  prefixes: [
    '/course-step/',
    '/elementor-hf/',
    '/elementskit-content/',
    '/author/',
    '/wp-content/',
    '/wp-admin/',
    '/wp-includes/',
    '/wp-json/',
  ],
  exact: [
    '/course-step',
    '/category/fuel_consumption',
    '/category/purchased_energy',
    '/under-maintenance',
    '/design-sample',
    '/default-redirect-page',
    '/public-individual-page',
    '/user-username',
    '/thank-you',
    '/thank-you-page',
    '/try-again',
    '/new-document',
    '/esg-report',
    '/wp-login.php',
    '/xmlrpc.php',
  ],
} as const;

export function isGone(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (gonePaths.exact.includes(path as (typeof gonePaths.exact)[number])) return true;
  return gonePaths.prefixes.some((prefix) => pathname.startsWith(prefix));
}
