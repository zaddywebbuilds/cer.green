import type { Metadata } from 'next';
import Link from 'next/link';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Eyebrow, Section, SectionHeader } from '@/components/ui/primitives';
import { CardGrid, CourseCard } from '@/components/ui/cards';
import { getCourseCategories, getCourses, getCoursesByCategory } from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import { cta } from '@/lib/site';
import { cn } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  path: '/academy/courses/',
  seo: {
    title: 'ESG & Sustainability Courses Singapore',
    description:
      'Professional ESG, carbon, risk and sustainable finance courses in Singapore. Half-day to two-day programmes, available in person, virtual live or in-house.',
    primaryKeyword: 'ESG courses Singapore',
    secondaryKeywords: ['sustainability courses Singapore', 'carbon training Singapore'],
  },
});

const crumbs = buildCrumbs(
  { label: 'Academy', href: '/academy/' },
  { label: 'Courses', href: '/academy/courses/' },
);

/**
 * Course listing with category filtering.
 *
 * The filter is a set of links carrying a `category` query parameter, not a
 * client-side toggle. That keeps it server-rendered, keeps the browser back
 * button working, makes each filtered view linkable, and means it works
 * without JavaScript.
 *
 * Filtered views are canonicalised to this page and left out of the sitemap, so
 * the filter cannot generate an expanding set of crawlable URLs.
 */
export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: selected } = await searchParams;
  const categories = getCourseCategories().filter((c) => getCoursesByCategory(c.slug).length > 0);
  const active = categories.find((c) => c.slug === selected);
  const courses = active ? getCoursesByCategory(active.slug) : getCourses();

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs))} />

      <Section surface="dark" labelledBy="courses-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">CER Academy</Eyebrow>
        <h1 id="courses-h1" className="mt-5 max-w-[20ch] text-display">
          Professional courses
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">
          Technical programmes in ESG, carbon, risk and sustainable finance, from a half-day
          strategic grounding to a two-day practitioner masterclass. Every programme is available
          for private in-house delivery.
        </p>
      </Section>

      <Section surface="ivory" labelledBy="courses-list">
        <h2 id="courses-list" className="sr-only">
          {active ? `${active.title} courses` : 'All courses'}
        </h2>

        <nav aria-label="Filter courses by category">
          <ul className="flex flex-wrap gap-2">
            <li>
              <FilterLink href="/academy/courses/" active={!active}>
                All courses
              </FilterLink>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <FilterLink
                  href={`/academy/courses/?category=${cat.slug}`}
                  active={active?.slug === cat.slug}
                >
                  {cat.title}
                </FilterLink>
              </li>
            ))}
          </ul>
        </nav>

        <p aria-live="polite" className="mt-6 text-sm text-muted">
          Showing {courses.length} {courses.length === 1 ? 'programme' : 'programmes'}
          {active ? ` in ${active.title}` : ''}.
        </p>

        <CardGrid columns={3} className="mt-8">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </CardGrid>
      </Section>

      <Section surface="white" size="sm">
        <div className="max-w-[70ch]">
          <SectionHeader
            eyebrow="Dates and pricing"
            title="How scheduling works"
            level={3}
          />
          <p className="mt-5 text-ink-700">
            CER Academy schedules public programmes according to demand and runs private in-house
            sessions on dates that suit the organisation. Rather than publishing a calendar that
            goes stale, we confirm current dates, formats and pricing when you enquire about a
            specific programme.
          </p>
        </div>
      </Section>

      <CtaBanner
        heading="Not sure which programme fits?"
        body="Tell us who needs training and what they need to be able to do afterwards. We will recommend the right programme, or design one."
        primary={{ label: cta.corporateTraining.label, href: cta.corporateTraining.href }}
        secondary={{ label: 'Explore CER Academy', href: '/academy/' }}
      />
    </>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'inline-flex min-h-11 items-center rounded-full border px-4 font-heading text-sm font-medium transition-colors',
        active
          ? 'border-forest bg-forest text-white'
          : 'border-line bg-white text-ink-700 hover:border-forest/40',
      )}
    >
      {children}
    </Link>
  );
}
