import type { Metadata } from 'next';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { Methodology } from '@/components/sections/Methodology';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import {
  ArrowLink,
  Card,
  Eyebrow,
  Paragraphs,
  Section,
  SectionHeader,
  TickList,
} from '@/components/ui/primitives';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import { cta } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  path: '/about/who-we-are/',
  seo: {
    title: 'Who We Are | CER Singapore',
    description:
      'CER is a Singapore-based sustainability advisory and training organisation. What we do, how we work, and the principles we hold to.',
    primaryKeyword: 'CER Consultancy Singapore',
  },
});

const crumbs = buildCrumbs(
  { label: 'About', href: '/about/' },
  { label: 'Who we are', href: '/about/who-we-are/' },
);

export default function WhoWeArePage() {
  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs))} />

      <Section surface="dark" labelledBy="who-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">About CER</Eyebrow>
        <h1 id="who-h1" className="mt-5 max-w-[22ch] text-display">
          Who we are
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">
          CER is a Singapore-based sustainability advisory and capability-building organisation
          working with businesses, financial institutions and public bodies across Asia.
        </p>
      </Section>

      <Section surface="ivory" labelledBy="who-what">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div>
            <Eyebrow className="mb-4">What we do</Eyebrow>
            <h2 id="who-what" className="text-h2">
              Requirements into action
            </h2>
          </div>
          <Paragraphs
            className="text-ink-700"
            items={[
              'Organisations across Asia are being asked for things they were not previously asked for: emissions figures with an audit trail, climate risk assessed inside the risk framework, supplier data that can be passed on to a customer, financing structures whose sustainability terms will withstand challenge.',
              'These requests arrive separately, from different parties, on different timetables. Each assumes measurement and governance that frequently does not exist yet.',
              'CER exists to close that gap. We work on what an organisation is actually being asked for, establish what it would genuinely take to answer it, and then build that: the measurement, the process, the documentation and the internal ownership.',
              'Where an organisation would be better served building the capability internally, CER Academy delivers the same technical material as training rather than as a retainer.',
            ]}
          />
        </div>
      </Section>

      <Section surface="white" labelledBy="who-name">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div>
            <Eyebrow className="mb-4">The name</Eyebrow>
            <h2 id="who-name" className="text-h2">
              Crystalise. Economise. Revitalise.
            </h2>
          </div>
          <Paragraphs
            className="text-ink-700"
            items={[
              'CER stands for Crystalise, Economise and Revitalise. It is a description of method rather than a slogan: understand the position clearly, decide where effort should go, then implement and embed.',
              'It also connects to the carbon emissions reduction work that runs through much of what CER does.',
              'The sequence matters. Organisations that begin with implementation before establishing what is material tend to build the wrong thing carefully.',
            ]}
          />
        </div>
      </Section>

      <Methodology surface="sage" compact />

      <Section surface="white" labelledBy="who-principles">
        <SectionHeader
          eyebrow="How we work"
          title="Principles we hold to"
          id="who-principles"
          lead="These are commitments about conduct rather than claims about quality. They are testable, which is the point."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {[
            {
              title: 'We will tell you when you do not need us',
              body: 'Some requirements are met with a straightforward internal fix. Where that is the case we say so, because the alternative is selling work that does not need doing.',
            },
            {
              title: 'We do not verify our own work',
              body: 'Preparing an inventory and independently verifying it are separate roles, and no adviser should hold both. We prepare organisations for verification and assurance, and support them through it, the assurance provider is separately appointed.',
            },
            {
              title: 'We do not publish figures we cannot evidence',
              body: 'That applies to our own site as much as to client reporting. Where a number is not verified, it is not published.',
            },
            {
              title: 'We build for the second cycle',
              body: 'A reporting process that only one person can run is a liability. Engagements include documentation and handover so the work can be repeated without us.',
            },
            {
              title: 'We are specific about what is delivered',
              body: 'Every service page lists the actual deliverables. If something is not on that list, it is not in scope until it is agreed.',
            },
            {
              title: 'We keep client material confidential',
              body: 'Case studies are published only with approval. Client documents are held under access control, never on a public URL.',
            },
          ].map((item) => (
            <Card key={item.title} surface="outline" as="article">
              <h3 className="text-h4">{item.title}</h3>
              <p className="mt-4 text-ink-700">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section surface="ivory" labelledBy="who-where">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow className="mb-4">Where we work</Eyebrow>
            <h2 id="who-where" className="text-h2">
              Singapore-based, Asia-focused
            </h2>
            <Paragraphs
              className="mt-6 text-ink-700"
              items={[
                'CER operates from Singapore and works with organisations across Asia. That matters practically rather than decoratively: requirements arriving from European regulators, from regional supervisors and from local listing rules do not align, and an organisation in this region is usually managing all three.',
                'CER does not maintain offices in every country where it works, and does not claim to. Where an engagement requires local presence, that is arranged through the project and stated plainly.',
              ]}
            />
          </div>
          <Card surface="white">
            <h3 className="eyebrow text-lime-ink">Who we work with</h3>
            <TickList
              className="mt-5"
              items={[
                'Listed companies subject to climate reporting requirements',
                'Banks, insurers and asset managers',
                'Manufacturers and their supply chains',
                'Energy and infrastructure organisations',
                'Technology and healthcare businesses',
                'Small and medium enterprises responding to customer requirements',
                'Learning and development functions building internal capability',
              ]}
            />
            <ArrowLink href="/industries/" className="mt-6">
              View sector expertise
            </ArrowLink>
          </Card>
        </div>
      </Section>

      <CtaBanner
        heading="Start with the requirement, not the service"
        body="Tell us what is being asked of your organisation. We will tell you what answering it involves, including where the answer is simpler than you expect."
        primary={{ label: cta.consulting.label, href: cta.consulting.href }}
        secondary={{ label: 'Meet the experts', href: '/about/experts/' }}
      />
    </>
  );
}
