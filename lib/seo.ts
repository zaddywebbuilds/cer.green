/**
 * SEO helpers.
 *
 * Metadata is built here and nowhere else. No page constructs canonical URLs,
 * Open Graph objects or robots directives by hand -- that is how duplicate
 * titles and accidental noindex tags get shipped.
 */

import type { Metadata } from 'next';
import type { Seo } from '@/types/content';
import { site, siteUrl, isNoindexPath } from '@/lib/site';

/** Normalises to a trailing-slash absolute URL, which is this site's canonical form. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const clean = `/${path}`.replace(/\/+/g, '/');
  const withSlash =
    clean === '/' || clean.includes('.') || clean.endsWith('/') ? clean : `${clean}/`;
  return `${siteUrl}${withSlash}`;
}

/**
 * Appends the brand suffix, unless the title already names the brand.
 *
 * Matched on a word boundary so that a title such as "CER Academy | ESG
 * Training" is left alone, while "ISO 14064 Certification Singapore" -- which
 * merely contains the letters -- still gets the suffix.
 */
const BRAND = /\bCER\b/;

function formatTitle(title: string): string {
  if (title === site.name) return `${site.name} | ${site.descriptor}`;
  return BRAND.test(title) ? title : `${title} | ${site.name}`;
}

interface BuildMetadataArgs {
  seo: Seo;
  /** Site-relative path, e.g. `/solutions/carbon-accounting/`. */
  path: string;
  /** Used when `seo.title` is absent. */
  fallbackTitle?: string;
  /** Set for article pages so Open Graph emits `article` rather than `website`. */
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

export function buildMetadata({
  seo,
  path,
  fallbackTitle,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
}: BuildMetadataArgs): Metadata {
  const title = formatTitle(seo.title ?? fallbackTitle ?? site.name);
  const canonical = seo.canonical ? absoluteUrl(seo.canonical) : absoluteUrl(path);

  // A path under a protected prefix is noindex regardless of what the document
  // says, so a CMS field can never accidentally expose a private route.
  const noindex = seo.noindex || isNoindexPath(path);
  const nofollow = seo.nofollow || isNoindexPath(path);

  /*
   * Only set images when a page supplies its own. Leaving the field undefined
   * lets Next fall back to the generated `app/opengraph-image.tsx` and
   * `app/twitter-image.tsx`, which produce a real fingerprinted PNG. Setting a
   * default path here would override those with a file that does not exist.
   */
  const images = seo.ogImage
    ? [{ url: absoluteUrl(seo.ogImage), width: 1200, height: 630, alt: seo.ogTitle ?? title }]
    : undefined;

  return {
    title,
    description: seo.description,
    alternates: { canonical },
    keywords: seo.primaryKeyword
      ? [seo.primaryKeyword, ...(seo.secondaryKeywords ?? [])]
      : undefined,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type,
      url: canonical,
      siteName: site.name,
      locale: site.locale,
      title: seo.ogTitle ?? title,
      description: seo.ogDescription ?? seo.description,
      ...(images ? { images } : {}),
      ...(type === 'article'
        ? { publishedTime, modifiedTime, authors }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.ogTitle ?? title,
      description: seo.ogDescription ?? seo.description,
      ...(images ? { images: images.map((image) => image.url) } : {}),
    },
  };
}

/**
 * Metadata for authenticated and workflow routes. Always noindex, nofollow,
 * and excluded from the sitemap by `isNoindexPath`.
 */
export function buildPrivateMetadata(title: string, description: string): Metadata {
  return {
    title: formatTitle(title),
    description,
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  };
}

export interface Crumb {
  label: string;
  href: string;
}

/** Builds the breadcrumb trail. The final crumb is the current page. */
export function buildCrumbs(...crumbs: Crumb[]): Crumb[] {
  return [{ label: 'Home', href: '/' }, ...crumbs];
}
