import type { Metadata } from 'next';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Eyebrow, Section } from '@/components/ui/primitives';
import { CardGrid, ExpertCard } from '@/components/ui/cards';
import { getExperts } from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, jsonLd, personSchema } from '@/lib/schema';
import { cta } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  path: '/about/experts/',
  seo: {
    title: 'Our Experts | CER Singapore',
    description:
      'The senior practitioners behind CER: actuarial science, risk management, ESG, sustainable finance and business consultancy across Singapore and South-East Asia.',
    primaryKeyword: 'ESG experts Singapore',
  },
});

const crumbs = buildCrumbs(
  { label: 'About', href: '/about/' },
  { label: 'Experts', href: '/about/experts/' },
);

export default function ExpertsPage() {
  const experts = getExperts();

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs), ...experts.map(personSchema))} />

      <Section surface="dark" labelledBy="experts-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">About CER</Eyebrow>
        <h1 id="experts-h1" className="mt-5 max-w-[20ch] text-display">
          Expertise behind the advice
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">
          CER&rsquo;s work is delivered by senior practitioners rather than by a research function.
          The people below run the advisory engagements and teach the Academy programmes.
        </p>
      </Section>

      <Section surface="ivory" labelledBy="experts-list">
        <h2 id="experts-list" className="sr-only">
          CER experts
        </h2>
        <CardGrid columns={3}>
          {experts.map((expert) => (
            <ExpertCard key={expert.slug} expert={expert} />
          ))}
        </CardGrid>
      </Section>

      <CtaBanner
        heading="Want to speak to one of them directly?"
        body="Tell us what you are working through and we will put you with the person best placed to help."
        primary={{ label: cta.consulting.label, href: cta.consulting.href }}
        secondary={{ label: 'View all solutions', href: '/solutions/' }}
      />
    </>
  );
}
