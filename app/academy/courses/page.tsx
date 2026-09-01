import type { Metadata } from 'next';
import { Suspense } from 'react';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { CoursesFilter } from '@/components/sections/CoursesFilter';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Eyebrow, Section, SectionHeader } from '@/components/ui/primitives';
import { getCourseCategories, getCourses, getCoursesByCategory } from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import { cta } from '@/lib/site';

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

export default function CoursesPage() {
  const courses = getCourses();
  const categories = getCourseCategories().filter(
    (c) => getCoursesByCategory(c.slug).length > 0,
  );

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
          Courses
        </h2>
        <Suspense>
          <CoursesFilter courses={courses} categories={categories} />
        </Suspense>
      </Section>

      <Section surface="white" size="sm">
        <div className="max-w-[70ch]">
          <SectionHeader eyebrow="Dates and pricing" title="How scheduling works" level={3} />
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
