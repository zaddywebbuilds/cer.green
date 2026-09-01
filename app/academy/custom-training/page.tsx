import type { Metadata } from 'next';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AcademyForm } from '@/components/forms/AcademyForm';
import {
  Button,
  Card,
  Eyebrow,
  Section,
  SectionHeader,
  TickList,
} from '@/components/ui/primitives';
import { getCourses } from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  path: '/academy/custom-training/',
  seo: {
    title: 'Custom Sustainability Training Programmes Singapore',
    description:
      'Bespoke ESG, carbon and sustainability curricula designed around your organisation, sector and capability gap. Delivered in Singapore and across Asia.',
    primaryKeyword: 'custom ESG training Singapore',
    secondaryKeywords: ['bespoke sustainability training Asia', 'tailored ESG programme Singapore'],
  },
});

const crumbs = buildCrumbs(
  { label: 'Academy', href: '/academy/' },
  { label: 'Custom programmes', href: '/academy/custom-training/' },
);

export default function CustomTrainingPage() {
  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs))} />

      <Section surface="dark" labelledBy="custom-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">CER Academy</Eyebrow>
        <h1 id="custom-h1" className="mt-5 max-w-[22ch] text-display">
          Custom programmes
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">
          Where no existing programme fits the requirement, CER Academy builds one — from a single
          targeted session to a multi-module capability programme delivered over months.
        </p>
        <div className="mt-9">
          <Button href="#enquire" variant="invert">
            Discuss a custom programme
          </Button>
        </div>
      </Section>

      <Section surface="ivory" labelledBy="custom-when">
        <SectionHeader
          eyebrow="When this applies"
          title="Situations that call for a custom programme"
          id="custom-when"
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {[
            {
              title: 'The requirement spans several programmes',
              body: 'A team needs the carbon measurement content, part of the reporting material and the supplier data section — but not three full courses. We build the combination.',
            },
            {
              title: 'The audience is mixed',
              body: 'Finance, procurement and operations in the same room, starting from different baselines. A single standard course pitches wrong for at least two of them.',
            },
            {
              title: 'The content does not exist yet',
              body: 'A sector-specific requirement, an internal methodology, or a newly applicable regulation that no off-the-shelf programme covers.',
            },
            {
              title: 'Training follows an engagement',
              body: 'CER has built a process — an inventory, a risk framework, a procurement approach — and the organisation now needs to be able to run it without us.',
            },
          ].map((item) => (
            <Card key={item.title} surface="white" as="article">
              <h3 className="text-h4">{item.title}</h3>
              <p className="mt-4 text-ink-700">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section surface="white" labelledBy="custom-how">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <Eyebrow className="mb-4">Approach</Eyebrow>
            <h2 id="custom-how" className="text-h3">
              How a custom programme is built
            </h2>
            <TickList
              className="mt-7"
              items={[
                'Capability gap assessment — what people can do now against what they need to do',
                'Learning objective definition, written as demonstrable outcomes',
                'Module design, reusing existing CER material where it fits',
                'Development of new content where it does not',
                'Exercise design using your own data where confidentiality allows',
                'Delivery, in person, virtually or blended across sessions',
                'Outcome review against the original objectives',
              ]}
            />
          </div>
          <div>
            <Eyebrow className="mb-4">Scope</Eyebrow>
            <h2 className="text-h3">What can be built on</h2>
            <Card surface="sage" className="mt-7">
              <p className="text-ink-700">
                Custom programmes draw on the same technical base as CER&rsquo;s scheduled
                courses and advisory work:
              </p>
              <TickList
                className="mt-5"
                items={[
                  'Carbon measurement and greenhouse gas standards',
                  'ESG strategy, materiality and reporting',
                  'ESG and climate risk management',
                  'Green finance and financed emissions',
                  'Sustainable procurement and supply chain',
                  'Life cycle assessment',
                  'Governance, controls and assurance readiness',
                ]}
              />
            </Card>
          </div>
        </div>
      </Section>

      <Section surface="ivory" id="enquire" labelledBy="custom-enquire">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div>
            <Eyebrow className="mb-4">Enquire</Eyebrow>
            <h2 id="custom-enquire" className="text-h2">
              Discuss a custom programme
            </h2>
            <p className="mt-6 max-w-[52ch] text-ink-700">
              Describe the capability gap rather than the course you think you need. We will
              propose a programme, and will say so if an existing course already covers it.
            </p>
          </div>
          <AcademyForm
            courseOptions={['A customised programme', ...getCourses().map((c) => c.title)]}
            defaultParticipantType="Corporate / group"
          />
        </div>
      </Section>

      <CtaBanner
        heading="Or start from an existing programme"
        body="Most custom programmes begin as an adaptation of a scheduled course rather than a blank page."
        primary={{ label: 'Browse courses', href: '/academy/courses/' }}
        secondary={{ label: 'Corporate training', href: '/academy/corporate-training/' }}
      />
    </>
  );
}
