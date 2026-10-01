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
import { CardGrid, CourseCard } from '@/components/ui/cards';
import { getCourses } from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  path: '/academy/executive-programmes/',
  seo: {
    title: 'Executive & Board Sustainability Programmes Singapore',
    description:
      'Short executive and board-level sessions on climate and ESG oversight, risk and disclosure responsibilities, for leadership teams in Singapore and Asia.',
    primaryKeyword: 'board ESG training Singapore',
    secondaryKeywords: ['executive sustainability programme Singapore', 'board climate oversight Asia'],
  },
});

const crumbs = buildCrumbs(
  { label: 'Academy', href: '/academy/' },
  { label: 'Executive programmes', href: '/academy/executive-programmes/' },
);

export default function ExecutiveProgrammesPage() {
  const relevant = getCourses().filter((c) =>
    ['risk-intelligence-for-decision-makers', 'esg-essentials', 'esg-risk-management'].includes(
      c.slug,
    ),
  );

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs))} />

      <Section surface="dark" labelledBy="exec-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">CER Academy</Eyebrow>
        <h1 id="exec-h1" className="mt-5 max-w-[22ch] text-display">
          Executive and board programmes
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">
          Short, senior sessions on what climate and ESG requirements mean for oversight,
          accountability and decision-making, pitched at the level a board actually operates at
          rather than at technical method.
        </p>
        <div className="mt-9">
          <Button href="#enquire" variant="invert">
            Discuss an executive session
          </Button>
        </div>
      </Section>

      <Section surface="ivory" labelledBy="exec-why">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div>
            <Eyebrow className="mb-4">The requirement</Eyebrow>
            <h2 id="exec-why" className="text-h2">
              Oversight you can evidence
            </h2>
          </div>
          <div className="flex max-w-[68ch] flex-col gap-4 text-ink-700">
            <p>
              Climate disclosure asks organisations to describe how the board oversees these
              matters. Answering that credibly requires directors who can interrogate what
              management brings them, not simply receive it.
            </p>
            <p>
              That is a different capability from technical carbon accounting. It is about knowing
              which questions expose a weak position: how a figure was derived, what the assurance
              exposure is, whether a target has a costed pathway behind it, and where the
              organisation has published a commitment nobody owns.
            </p>
            <p>
              These sessions are built around those questions, and are usually delivered privately
              so that the discussion can use the organisation&rsquo;s own disclosures.
            </p>
          </div>
        </div>
      </Section>

      <Section surface="white" labelledBy="exec-covers">
        <SectionHeader eyebrow="Content" title="What a session covers" id="exec-covers" />
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="eyebrow text-lime-ink">Typical scope</h3>
            <TickList
              className="mt-5"
              items={[
                'What the applicable reporting obligations require, and from when',
                'Where the board sits in the accountability structure',
                'Reading a climate disclosure critically',
                'Climate and transition risk in the risk framework',
                'What assurance will test, and the exposure that creates',
                'Targets, pathways and the credibility of public commitments',
                'Greenwashing and substantiation exposure',
              ]}
            />
          </div>
          <Card surface="sage">
            <h3 className="eyebrow text-lime-ink">Format</h3>
            <TickList
              className="mt-5"
              items={[
                'Half-day or shorter, sized to a board or executive agenda',
                'Delivered privately, in person or virtually',
                'Built around your own disclosures where you wish',
                'Discussion-led rather than lecture-led',
                'Optional follow-up briefing note for the board pack',
              ]}
            />
          </Card>
        </div>
      </Section>

      <Section surface="ivory" labelledBy="exec-related">
        <SectionHeader
          eyebrow="Related programmes"
          title="Deeper programmes for the teams below the board"
          id="exec-related"
        />
        <CardGrid columns={3} className="mt-12">
          {relevant.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </CardGrid>
      </Section>

      <Section surface="white" id="enquire" labelledBy="exec-enquire">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div>
            <Eyebrow className="mb-4">Enquire</Eyebrow>
            <h2 id="exec-enquire" className="text-h2">
              Discuss an executive session
            </h2>
            <p className="mt-6 max-w-[52ch] text-ink-700">
              Tell us who will be in the room and what the session needs to achieve. We will
              propose a scope and a format.
            </p>
          </div>
          <AcademyForm
            courseOptions={['Executive or board session', ...getCourses().map((c) => c.title)]}
            defaultParticipantType="Corporate / group"
          />
        </div>
      </Section>

      <CtaBanner
        heading="Building capability further down the organisation too?"
        body="Executive sessions work best alongside technical training for the teams producing the underlying work."
        primary={{ label: 'Corporate training', href: '/academy/corporate-training/' }}
        secondary={{ label: 'Browse courses', href: '/academy/courses/' }}
      />
    </>
  );
}
