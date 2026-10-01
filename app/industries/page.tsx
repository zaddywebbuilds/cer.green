import type { Metadata } from 'next';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Eyebrow, Section } from '@/components/ui/primitives';
import { CardGrid, IndustryCard } from '@/components/ui/cards';
import { getIndustries } from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import { cta } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  path: '/industries/',
  seo: {
    title: 'Industries | Sustainability Advisory by Sector',
    description:
      'Sector-specific ESG, carbon and climate advisory for financial services, manufacturing, energy, technology and healthcare organisations across Asia.',
    primaryKeyword: 'ESG consultant by industry Singapore',
  },
});

const crumbs = buildCrumbs({ label: 'Industries', href: '/industries/' });

export default function IndustriesPage() {
  const industries = getIndustries();

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs))} />

      <Section surface="dark" labelledBy="industries-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">Industries</Eyebrow>
        <h1 id="industries-h1" className="mt-5 max-w-[20ch] text-display">
          Experience shaped around your operating environment.
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">
          Sustainability requirements land differently depending on what an organisation does. A
          bank&rsquo;s material exposure sits in its portfolio; a manufacturer&rsquo;s sits in its supply
          chain; a hospital&rsquo;s sits in sources most sectors do not have at all.
        </p>
        <p className="mt-5 max-w-[68ch] text-muted-invert">
          {/* Honest scoping, rather than a page per sector for search purposes. */}
          The sectors below are those where CER has demonstrable capability. We do not publish a
          page for every industry — a page that says nothing specific about a sector is not
          evidence of experience in it.
        </p>
      </Section>

      <Section surface="ivory" labelledBy="industries-list">
        <h2 id="industries-list" className="sr-only">
          Sectors CER works in
        </h2>
        <CardGrid columns={3}>
          {industries.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </CardGrid>
      </Section>

      <CtaBanner
        heading="Not listed here?"
        body="The methodology travels across sectors even where the material issues differ. Tell us what you do and what is being asked of you."
        primary={{ label: cta.discuss.label, href: cta.discuss.href }}
        secondary={{ label: 'View all solutions', href: '/solutions/' }}
      />
    </>
  );
}
