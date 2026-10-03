import type { Metadata } from 'next';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { Methodology } from '@/components/sections/Methodology';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card, Eyebrow, Section, SectionHeader } from '@/components/ui/primitives';
import { CardGrid, CaseStudyCard, ExpertCard } from '@/components/ui/cards';
import { getCaseStudies, getExperts } from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import { cta } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  path: '/case-studies/',
  seo: {
    title: 'Case Studies | Sustainability in Practice',
    description:
      'Project work by CER across ESG, carbon, climate and sustainable finance engagements for organisations in Singapore and Asia, published with client consent.',
    primaryKeyword: 'ESG case studies Singapore',
  },
});

const crumbs = buildCrumbs({ label: 'Case studies', href: '/case-studies/' });

export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies();
  const experts = getExperts();

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs))} />

      <Section surface="dark" labelledBy="cases-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">Case studies</Eyebrow>
        <h1 id="cases-h1" className="mt-5 max-w-[20ch] text-display">
          Sustainability in practice
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">
          Project work across measurement, reporting, risk and finance engagements.
        </p>
      </Section>

      {caseStudies.length ? (
        <Section surface="ivory" labelledBy="cases-list">
          <h2 id="cases-list" className="sr-only">
            Published case studies
          </h2>
          <CardGrid columns={3}>
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
            ))}
          </CardGrid>
        </Section>
      ) : (
        /*
          No case studies are published, because none have been verified and
          approved by a client. Rather than publish invented projects or leave a
          blank page, this states the position plainly and routes the visitor to
          the evidence that does exist: the methodology and the people.
        */
        <Section surface="ivory" labelledBy="cases-pending">
          <Card surface="white" className="max-w-3xl p-9 md:p-11">
            <h2 id="cases-pending" className="text-h3">
              Client work is published here once it is approved
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-ink-700">
              <p>
                CER works under confidentiality on most engagements. A case study is published only
                where the client has approved what is said about them and where any figure quoted
                has actually been measured, not estimated, and not rounded up.
              </p>
              <p>
                We would rather show nothing here than publish results we cannot stand behind. If
                you would like to understand how CER approaches an engagement in the meantime, the
                methodology below sets out the sequence, and each service page describes the
                specific deliverables that come out of it.
              </p>
              <p>
                For references relevant to your sector, ask during an initial conversation and we
                will tell you what we can share.
              </p>
            </div>
          </Card>
        </Section>
      )}

      <Methodology surface="white" compact />

      <Section surface="ivory" labelledBy="cases-experts">
        <SectionHeader eyebrow="Our people" title="Who delivers the work" id="cases-experts" />
        <CardGrid columns={3} className="mt-12">
          {experts.map((expert) => (
            <ExpertCard key={expert.slug} expert={expert} />
          ))}
        </CardGrid>
      </Section>

      <CtaBanner
        heading="Want to talk about work relevant to your sector?"
        body="Tell us what you are working through and we will tell you what we have done that is comparable."
        primary={{ label: cta.discuss.label, href: cta.discuss.href }}
        secondary={{ label: 'View all solutions', href: '/solutions/' }}
      />
    </>
  );
}
