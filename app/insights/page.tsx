import type { Metadata } from 'next';
import { Suspense } from 'react';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { InsightsFilter } from '@/components/sections/InsightsFilter';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Eyebrow, Section } from '@/components/ui/primitives';
import { getArticleCategories, getArticles } from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import { cta } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  path: '/insights/',
  seo: {
    title: 'Insights | ESG, Carbon & Sustainability Analysis',
    description:
      'Analysis on carbon accounting, ESG reporting, regulation and sustainable finance affecting organisations in Singapore and across Asia.',
    primaryKeyword: 'ESG insights Singapore',
    secondaryKeywords: ['sustainability regulation Asia', 'carbon accounting analysis'],
  },
});

const crumbs = buildCrumbs({ label: 'Insights', href: '/insights/' });

export default function InsightsPage() {
  const articles = getArticles();
  const categories = getArticleCategories();

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs))} />

      <Section surface="dark" labelledBy="insights-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">Insights</Eyebrow>
        <h1 id="insights-h1" className="mt-5 max-w-[20ch] text-display">
          Analysis, not commentary.
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">
          Practical analysis of the carbon, ESG and sustainability requirements organisations in
          Asia are actually working through — written by the people delivering the engagements.
        </p>
      </Section>

      <Section surface="ivory" labelledBy="insights-list">
        <h2 id="insights-list" className="sr-only">
          Insights
        </h2>
        <Suspense>
          <InsightsFilter articles={articles} categories={categories} />
        </Suspense>
      </Section>

      <CtaBanner
        heading="Have a question this raises?"
        body="If something here is relevant to a requirement you are working through, tell us about it."
        primary={{ label: cta.consulting.label, href: cta.consulting.href }}
        secondary={{ label: 'Explore our solutions', href: '/solutions/' }}
      />
    </>
  );
}
