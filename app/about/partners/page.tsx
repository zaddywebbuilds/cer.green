import type { Metadata } from 'next';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Card, Eyebrow, Section, SectionHeader } from '@/components/ui/primitives';
import { getPartners } from '@/lib/content';
import { partnerGroups } from '@/content/partners';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import { cta } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  path: '/about/partners/',
  seo: {
    title: 'Partners | CER Singapore',
    description:
      'The organisations CER collaborates with on training delivery, project work, technology and academic programmes across Singapore and South-East Asia.',
    primaryKeyword: 'CER partners Singapore',
  },
});

const crumbs = buildCrumbs(
  { label: 'About', href: '/about/' },
  { label: 'Partners', href: '/about/partners/' },
);

export default function PartnersPage() {
  const partners = getPartners();

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs))} />

      <Section surface="dark" labelledBy="partners-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">About CER</Eyebrow>
        <h1 id="partners-h1" className="mt-5 max-w-[20ch] text-display">
          Partner organisations
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">
          CER collaborates with the organisations below on training delivery, project work,
          technology and academic programmes.
        </p>
        {/* The distinction matters commercially and reputationally, so it is
            stated rather than left to be inferred from a logo wall. */}
        <p className="mt-5 max-w-[68ch] text-muted-invert">
          These are collaborations. None of the organisations listed here is presented as a client
          of CER, and a partnership should not be read as an endorsement of, or by, either party
          beyond the work described.
        </p>
      </Section>

      {partnerGroups.map((group, index) => {
        const groupPartners = partners.filter((p) => p.relationship === group);
        if (!groupPartners.length) return null;

        return (
          <Section
            key={group}
            surface={index % 2 === 0 ? 'ivory' : 'white'}
            labelledBy={`group-${group.replace(/\s+/g, '-')}`}
          >
            <SectionHeader
              eyebrow={`${groupPartners.length} ${groupPartners.length === 1 ? 'organisation' : 'organisations'}`}
              title={`${group}s`}
              id={`group-${group.replace(/\s+/g, '-')}`}
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {groupPartners.map((partner) => (
                <Card
                  key={partner.name}
                  surface={index % 2 === 0 ? 'white' : 'outline'}
                  as="article"
                  className="flex flex-col"
                >
                  {/* Logos are not bundled: each requires the partner's written
                      approval and a correctly licensed asset. Names render as
                      accessible text in the meantime. */}
                  <h3 className="text-h4">{partner.name}</h3>
                  <p className="mt-2 text-sm text-lime-ink">{partner.relationship}</p>
                  <p className="mt-4 flex-1 text-ink-700">{partner.description}</p>
                  {partner.url ? (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 font-heading text-[0.95rem] font-semibold text-forest underline underline-offset-4 hover:text-lime-ink"
                    >
                      Visit {partner.name}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : null}
                </Card>
              ))}
            </div>
          </Section>
        );
      })}

      <CtaBanner
        heading="Interested in working with CER?"
        body="We work with training providers, technology businesses, academic institutions and project partners across the region."
        primary={{ label: 'Contact CER', href: '/contact/' }}
        secondary={{ label: cta.consulting.label, href: cta.consulting.href }}
      />
    </>
  );
}
