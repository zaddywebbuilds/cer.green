import type { Metadata } from 'next';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { Methodology } from '@/components/sections/Methodology';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArrowLink, Card, Eyebrow, Section, SectionHeader } from '@/components/ui/primitives';
import { CardGrid, ExpertCard } from '@/components/ui/cards';
import { getExperts, getPartners } from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import { cta, site } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  path: '/about/',
  seo: {
    title: 'About CER | Sustainability Advisory Singapore',
    description:
      'CER is a Singapore-based sustainability advisory and capability-building organisation working with businesses, financial institutions and public bodies across Asia.',
    primaryKeyword: 'about CER Consultancy',
  },
});

const crumbs = buildCrumbs({ label: 'About', href: '/about/' });

export default function AboutPage() {
  const experts = getExperts();
  const partners = getPartners();

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs))} />

      <Section surface="dark" labelledBy="about-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">About CER</Eyebrow>
        <h1 id="about-h1" className="mt-5 max-w-[22ch] text-display">
          A sustainability advisory and capability partner.
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">{site.positioning}</p>
        <p className="mt-5 max-w-[68ch] text-muted-invert">{site.descriptor}</p>
      </Section>

      <Section surface="ivory" labelledBy="about-structure">
        <SectionHeader
          eyebrow="Structure"
          title="Two pillars, one organisation"
          id="about-structure"
          lead="CER Solutions helps you solve the problem. CER Academy helps your people build the capability to keep solving it."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Card surface="white" className="p-8 md:p-10">
            <Eyebrow>Advisory. Strategy. Implementation.</Eyebrow>
            <h3 className="mt-4 text-h3">CER Solutions</h3>
            <p className="mt-5 text-ink-700">
              Advisory across carbon and climate, ESG and sustainability, compliance and standards,
              and sustainable and green finance, from measurement through to implementation.
            </p>
            <ArrowLink href="/solutions/" className="mt-6">
              Explore CER Solutions
            </ArrowLink>
          </Card>
          <Card surface="white" className="p-8 md:p-10">
            <Eyebrow>Knowledge. Skills. Certification.</Eyebrow>
            <h3 className="mt-4 text-h3">CER Academy</h3>
            <p className="mt-5 text-ink-700">
              Professional courses, corporate training, executive programmes and custom curricula,
              delivered by the same practitioners who run the advisory engagements.
            </p>
            <ArrowLink href="/academy/" className="mt-6">
              Explore CER Academy
            </ArrowLink>
          </Card>
        </div>
      </Section>

      <Methodology surface="white" />

      <Section surface="ivory" labelledBy="about-more">
        <SectionHeader eyebrow="More about CER" title="Go deeper" id="about-more" />
        <CardGrid columns={3} className="mt-14">
          {[
            {
              title: 'Who we are',
              body: 'What CER does, how it is structured, and the principles the organisation works to.',
              href: '/about/who-we-are/',
              label: 'Read who we are',
            },
            {
              title: 'Experts',
              body: `The ${experts.length} senior practitioners who deliver CER's advisory engagements and teach its programmes.`,
              href: '/about/experts/',
              label: 'Meet the experts',
            },
            {
              title: 'Partners',
              body: `The ${partners.length} organisations CER collaborates with on training delivery, projects and technology.`,
              href: '/about/partners/',
              label: 'View partners',
            },
          ].map((item) => (
            <Card key={item.href} surface="white" as="article" className="flex flex-col">
              <h3 className="text-h4">{item.title}</h3>
              <p className="mt-4 flex-1 text-ink-700">{item.body}</p>
              <ArrowLink href={item.href} className="mt-6">
                {item.label}
              </ArrowLink>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section surface="white" labelledBy="about-experts">
        <SectionHeader
          eyebrow="Our people"
          title="Expertise behind the advice"
          id="about-experts"
          action={<ArrowLink href="/about/experts/">View all experts</ArrowLink>}
        />
        <CardGrid columns={3} className="mt-12">
          {experts.map((expert) => (
            <ExpertCard key={expert.slug} expert={expert} />
          ))}
        </CardGrid>
      </Section>

      <CtaBanner
        heading="Want to know whether CER is the right fit?"
        body="The quickest way to find out is to describe what you are working through. We will tell you if it is something we do well."
        primary={{ label: cta.consulting.label, href: cta.consulting.href }}
        secondary={{ label: 'Contact CER', href: '/contact/' }}
      />
    </>
  );
}
