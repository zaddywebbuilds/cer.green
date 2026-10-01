/**
 * JSON-LD structured data.
 *
 * Three rules govern everything here:
 *   1. Nothing unsupported is emitted. No aggregateRating, no review, no award,
 *      no employee count, no founding date -- none of which CER has published.
 *   2. Unverified values never reach the markup. `clean()` strips any field
 *      still carrying a verification placeholder, so incomplete data produces a
 *      smaller graph rather than a false one.
 *   3. Course offers and instances are emitted only where CER publishes a real
 *      price or a real date.
 */

import type { Article, CaseStudy, Course, Expert, Solution } from '@/types/content';
import { site, isPlaceholder } from '@/lib/site';
import { absoluteUrl, type Crumb } from '@/lib/seo';

type Json = Record<string, unknown>;

/** Removes undefined, empty and placeholder-bearing values, recursively. */
function clean<T extends Json>(obj: T): T {
  const out: Json = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null || value === '') continue;
    if (typeof value === 'string') {
      if (isPlaceholder(value)) continue;
      out[key] = value;
    } else if (Array.isArray(value)) {
      const arr = value
        .filter((v) => !(typeof v === 'string' && isPlaceholder(v)))
        .map((v) => (typeof v === 'object' && v !== null ? clean(v as Json) : v))
        .filter((v) => !(typeof v === 'object' && v !== null && Object.keys(v).length === 0));
      if (arr.length) out[key] = arr;
    } else if (typeof value === 'object') {
      const nested = clean(value as Json);
      if (Object.keys(nested).length) out[key] = nested;
    } else {
      out[key] = value;
    }
  }
  return out as T;
}

export const ORGANISATION_ID = `${site.url}/#organisation`;
const WEBSITE_ID = `${site.url}/#website`;

export function organisationSchema(): Json {
  return clean({
    '@type': 'Organization',
    '@id': ORGANISATION_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: site.legalName,
    url: site.url,
    description: site.positioning,
    logo: clean({
      '@type': 'ImageObject',
      url: absoluteUrl('/brand/cer-logo.jpg'),
      width: 500,
      height: 200,
    }),
    email: site.email,
    telephone: site.phone,
    address: clean({
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    }),
    areaServed: [
      { '@type': 'Country', name: 'Singapore' },
      { '@type': 'Place', name: 'Asia' },
    ],
    sameAs: [site.linkedin],
    // Only emitted once CER supplies a verified UEN.
    identifier: isPlaceholder(site.uen)
      ? undefined
      : clean({
          '@type': 'PropertyValue',
          name: 'UEN',
          value: site.uen,
        }),
    contactPoint: clean({
      '@type': 'ContactPoint',
      contactType: 'Enquiries',
      email: site.email,
      telephone: site.phone,
      areaServed: 'Asia',
      availableLanguage: ['English'],
    }),
  });
}

export function websiteSchema(): Json {
  return clean({
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.descriptor,
    inLanguage: 'en-SG',
    publisher: { '@id': ORGANISATION_ID },
  });
}

export function breadcrumbSchema(crumbs: Crumb[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href),
    })),
  };
}

export function serviceSchema(solution: Solution): Json {
  return clean({
    '@type': 'Service',
    '@id': `${absoluteUrl(`/solutions/${solution.slug}/`)}#service`,
    name: solution.title,
    description: solution.summary,
    url: absoluteUrl(`/solutions/${solution.slug}/`),
    provider: { '@id': ORGANISATION_ID },
    areaServed: [
      { '@type': 'Country', name: 'Singapore' },
      { '@type': 'Place', name: 'Asia' },
    ],
    audience: solution.audience.map((a) => ({ '@type': 'Audience', audienceType: a })),
    hasOfferCatalog: clean({
      '@type': 'OfferCatalog',
      name: `${solution.title} components`,
      itemListElement: solution.components.map((component) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: component },
      })),
    }),
  });
}

export function personSchema(expert: Expert): Json {
  return clean({
    '@type': 'Person',
    '@id': `${absoluteUrl(`/about/experts/${expert.slug}/`)}#person`,
    name: expert.name,
    jobTitle: expert.role,
    description: expert.shortBio,
    url: absoluteUrl(`/about/experts/${expert.slug}/`),
    image: expert.photo ? absoluteUrl(expert.photo.src) : undefined,
    worksFor: { '@id': ORGANISATION_ID },
    knowsAbout: expert.expertise,
    alumniOf: expert.qualifications.map((q) => ({
      '@type': 'EducationalOrganization',
      name: q,
    })),
    sameAs: expert.linkedin ? [expert.linkedin] : undefined,
  });
}

export function courseSchema(course: Course, instructors: Expert[]): Json {
  const url = absoluteUrl(`/academy/courses/${course.slug}/`);

  // Only advertise scheduled instances CER has actually published.
  const instances = course.upcoming
    .filter((d) => d.status === 'scheduled')
    .map((d) =>
      clean({
        '@type': 'CourseInstance',
        courseMode: course.formats.includes('Virtual live') ? 'Online' : 'Onsite',
        startDate: d.start,
        endDate: d.end,
        location: { '@type': 'Place', name: d.location },
      }),
    );

  return clean({
    '@type': 'Course',
    '@id': `${url}#course`,
    name: course.title,
    description: course.summary,
    url,
    provider: { '@id': ORGANISATION_ID },
    educationalCredentialAwarded: isPlaceholder(course.certification)
      ? undefined
      : course.certification,
    teaches: course.learningOutcomes,
    timeRequired: course.duration,
    inLanguage: 'en',
    instructor: instructors.map((i) => ({
      '@type': 'Person',
      name: i.name,
      jobTitle: i.role,
      url: absoluteUrl(`/about/experts/${i.slug}/`),
    })),
    hasCourseInstance: instances.length ? instances : undefined,
    offers: course.price
      ? clean({
          '@type': 'Offer',
          price: course.price.amount,
          priceCurrency: course.price.currency,
          availability: 'https://schema.org/InStock',
          url,
        })
      : undefined,
  });
}

export function articleSchema(article: Article, author: Expert | undefined, minutes: number): Json {
  const url = absoluteUrl(`/insights/${article.slug}/`);
  return clean({
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: 'en-SG',
    wordCount: minutes * 225,
    keywords: article.tags,
    image: article.image ? absoluteUrl(article.image.src) : undefined,
    author: author
      ? {
          '@type': 'Person',
          name: author.name,
          jobTitle: author.role,
          url: absoluteUrl(`/about/experts/${author.slug}/`),
        }
      : { '@id': ORGANISATION_ID },
    publisher: { '@id': ORGANISATION_ID },
  });
}

export function caseStudySchema(caseStudy: CaseStudy): Json {
  const url = absoluteUrl(`/case-studies/${caseStudy.slug}/`);
  return clean({
    '@type': 'Article',
    '@id': `${url}#case-study`,
    headline: caseStudy.title,
    description: caseStudy.outcomeSummary,
    url,
    mainEntityOfPage: url,
    inLanguage: 'en-SG',
    author: { '@id': ORGANISATION_ID },
    publisher: { '@id': ORGANISATION_ID },
  });
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>): Json | null {
  if (!faqs.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/** Wraps one or more schema objects into a single @graph document. */
export function jsonLd(...nodes: Array<Json | null | undefined>) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter((n): n is Json => Boolean(n)),
  };
}
