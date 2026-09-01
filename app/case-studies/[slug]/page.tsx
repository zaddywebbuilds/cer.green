import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import {
  Card,
  Eyebrow,
  MetricBlock,
  Paragraphs,
  Section,
  SectionHeader,
} from '@/components/ui/primitives';
import { CardGrid, ExpertCard, SolutionCard } from '@/components/ui/cards';
import {
  getCaseStudies,
  getCaseStudy,
  getExpertsBySlugs,
  getIndustry,
  getSolutionsBySlugs,
} from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, caseStudySchema, jsonLd } from '@/lib/schema';
import { cta } from '@/lib/site';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = getCaseStudies().map((c) => ({ slug: c.slug }));
  // Static export requires at least one path. Return a placeholder when there
  // are no published case studies; the page calls notFound() for unknown slugs.
  return slugs.length > 0 ? slugs : [{ slug: '_' }];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};
  return buildMetadata({
    seo: caseStudy.seo,
    path: `/case-studies/${slug}/`,
    fallbackTitle: caseStudy.title,
  });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  const industry = getIndustry(caseStudy.industrySlug);
  const solutions = getSolutionsBySlugs(caseStudy.solutionSlugs);
  const experts = getExpertsBySlugs(caseStudy.expertSlugs);

  const crumbs = buildCrumbs(
    { label: 'Case studies', href: '/case-studies/' },
    { label: caseStudy.title, href: `/case-studies/${slug}/` },
  );

  const sections = [
    { id: 'context', heading: 'Context', body: caseStudy.context },
    { id: 'challenge', heading: 'Challenge', body: caseStudy.challenge },
    { id: 'approach', heading: 'Approach', body: caseStudy.approach },
    { id: 'implementation', heading: 'Implementation', body: caseStudy.implementation },
    { id: 'outcome', heading: 'Outcome', body: caseStudy.outcome },
  ];

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs), caseStudySchema(caseStudy))} />

      <Section surface="dark" labelledBy="case-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-invert">
          {industry ? <span>{industry.title}</span> : null}
          <span>{caseStudy.projectType}</span>
          {caseStudy.confidential ? <span>Client anonymised</span> : null}
        </div>
        <h1 id="case-h1" className="mt-5 max-w-[20ch] text-display">
          {caseStudy.title}
        </h1>
        <p className="mt-7 max-w-[62ch] text-lead">{caseStudy.outcomeSummary}</p>
        <p className="mt-5 text-muted-invert">{caseStudy.clientDisplayName}</p>
      </Section>

      {/* Metrics render only where a figure has actually been measured. Any
          illustrative figure is labelled as such by MetricBlock. */}
      {caseStudy.metrics?.length ? (
        <Section surface="sage" size="sm" labelledBy="case-metrics">
          <h2 id="case-metrics" className="sr-only">
            Results
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {caseStudy.metrics.map((metric) => (
              <MetricBlock
                key={metric.label}
                value={metric.value}
                label={metric.label}
                illustrative={metric.illustrative}
              />
            ))}
          </div>
        </Section>
      ) : null}

      <Section surface="ivory" labelledBy="case-detail">
        <h2 id="case-detail" className="sr-only">
          Project detail
        </h2>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-20">
          <div className="flex flex-col gap-12">
            {sections.map((section) => (
              <div key={section.id} id={section.id}>
                <Eyebrow className="mb-4">{section.heading}</Eyebrow>
                <h3 className="text-h3">{section.heading}</h3>
                <Paragraphs items={section.body} className="mt-5 text-ink-700" />
              </div>
            ))}
          </div>

          <aside className="flex flex-col gap-8">
            {caseStudy.frameworks?.length ? (
              <Card surface="white">
                <h3 className="eyebrow text-lime-ink">Frameworks used</h3>
                <ul className="mt-4 flex flex-col gap-2 text-ink-700">
                  {caseStudy.frameworks.map((framework) => (
                    <li key={framework}>{framework}</li>
                  ))}
                </ul>
              </Card>
            ) : null}

            {solutions.length ? (
              <Card surface="white">
                <h3 className="eyebrow text-lime-ink">Services involved</h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {solutions.map((solution) => (
                    <li key={solution.slug}>
                      <a
                        href={`/solutions/${solution.slug}/`}
                        className="text-forest underline underline-offset-4 hover:text-lime-ink"
                      >
                        {solution.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            ) : null}
          </aside>
        </div>
      </Section>

      {caseStudy.quote ? (
        <Section surface="white" size="sm" labelledBy="case-quote">
          <h2 id="case-quote" className="sr-only">
            Client comment
          </h2>
          <figure className="max-w-3xl">
            <blockquote className="text-h3">&ldquo;{caseStudy.quote.text}&rdquo;</blockquote>
            <figcaption className="mt-6 text-muted">
              {caseStudy.quote.name}, {caseStudy.quote.role}, {caseStudy.quote.organisation}
            </figcaption>
          </figure>
        </Section>
      ) : null}

      {experts.length ? (
        <Section surface="ivory" labelledBy="case-team">
          <SectionHeader eyebrow="Team" title="Who delivered this" id="case-team" />
          <CardGrid columns={3} className="mt-12">
            {experts.map((expert) => (
              <ExpertCard key={expert.slug} expert={expert} />
            ))}
          </CardGrid>
        </Section>
      ) : null}

      {solutions.length ? (
        <Section surface="white" labelledBy="case-services">
          <SectionHeader eyebrow="Solutions" title="Services used on this project" id="case-services" />
          <CardGrid columns={3} className="mt-12">
            {solutions.map((solution) => (
              <SolutionCard key={solution.slug} solution={solution} />
            ))}
          </CardGrid>
        </Section>
      ) : null}

      <CtaBanner
        heading="Working through something similar?"
        body="Tell us where you are now and what you are being asked for."
        primary={{ label: cta.discuss.label, href: cta.discuss.href }}
        secondary={{ label: 'View all case studies', href: '/case-studies/' }}
      />
    </>
  );
}
