import type { Metadata } from 'next';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
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
import { breadcrumbSchema, faqSchema, jsonLd } from '@/lib/schema';

export const metadata: Metadata = buildMetadata({
  path: '/academy/corporate-training/',
  seo: {
    title: 'Corporate Sustainability Training Singapore',
    description:
      'Private in-house ESG, carbon and sustainability training for organisations in Singapore and across Asia. Programmes built around your team, data and requirements.',
    primaryKeyword: 'corporate sustainability training Singapore',
    secondaryKeywords: ['in-house ESG training Singapore', 'corporate ESG training Asia'],
  },
});

const crumbs = buildCrumbs(
  { label: 'Academy', href: '/academy/' },
  { label: 'Corporate training', href: '/academy/corporate-training/' },
);

const process = [
  {
    number: '01',
    title: 'Understand requirements',
    body: 'We establish who needs to be trained, what they need to be able to do afterwards, and what is driving the requirement: a reporting deadline, a customer request, a capability gap identified in an engagement.',
  },
  {
    number: '02',
    title: 'Design the programme',
    body: 'We propose a programme: existing modules where they fit, new material where they do not, with content pitched to the actual starting point of the group rather than an assumed one.',
  },
  {
    number: '03',
    title: 'Deliver',
    body: 'Delivered at your premises, virtually, or in a combination. Exercises use your own data, register or supply base wherever confidentiality allows, because generic exercises produce generic retention.',
  },
  {
    number: '04',
    title: 'Evaluate outcomes',
    body: 'We review what participants can now do against what the programme set out to achieve, and identify what remains, which sometimes points to advisory support rather than more training.',
  },
];

const faqs = [
  {
    question: 'What group size makes in-house delivery worthwhile?',
    answer:
      'Usually around six participants and above, at which point private delivery is generally more economical than individual places as well as more useful, because the content can be pitched at your organisation specifically.',
  },
  {
    question: 'Can you combine material from different programmes?',
    answer:
      'Yes. Many organisations need part of one programme and part of another: a carbon measurement grounding for a finance team, for example, with the procurement material for their category managers. We build the combination rather than running both in full.',
  },
  {
    question: 'Can training use our own data?',
    answer:
      'Where confidentiality allows, yes, and it is the single biggest factor in whether training changes practice. Working through your own risk register or emissions data is materially more effective than a worked example.',
  },
  {
    question: 'Do you deliver across the region?',
    answer:
      'Programmes are delivered in Singapore and virtually across the region. For delivery at a location outside Singapore, tell us where and we will confirm what is practical.',
  },
  {
    question: 'How far ahead do we need to book?',
    answer:
      'It depends on how much customisation is required. A standard programme delivered in-house needs less lead time than a bespoke curriculum. Tell us your target date when you enquire.',
  },
];

export default function CorporateTrainingPage() {
  const courses = getCourses().slice(0, 3);

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs), faqSchema(faqs))} />

      <Section surface="dark" labelledBy="corporate-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">CER Academy</Eyebrow>
        <h1 id="corporate-h1" className="mt-5 max-w-[22ch] text-display">
          Corporate training built around your organisation.
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">
          Private programmes for teams that need to be able to do something specific: produce a
          greenhouse gas inventory, run an ESG risk process, respond to a customer requirement, or
          brief a board.
        </p>
        <div className="mt-9">
          <Button href="#enquire" variant="invert">
            Discuss corporate training
          </Button>
        </div>
      </Section>

      <Section surface="ivory" labelledBy="corporate-what">
        <SectionHeader
          eyebrow="What we deliver"
          title="Four ways organisations use CER Academy"
          id="corporate-what"
        />
        <CardGrid columns={4} className="mt-14">
          {[
            {
              title: 'Private group training',
              body: 'Any scheduled programme delivered for your organisation alone, with content pitched to your sector and maturity.',
            },
            {
              title: 'Customised curricula',
              body: 'Programmes built from scratch where no existing course covers the requirement, or where several partly do.',
            },
            {
              title: 'Executive workshops',
              body: 'Short, senior sessions focused on decisions and oversight rather than technical method.',
            },
            {
              title: 'Technical team programmes',
              body: 'Deeper multi-session capability building for sustainability, risk, finance and procurement teams.',
            },
          ].map((item) => (
            <Card key={item.title} surface="white" as="article">
              <h3 className="text-h4">{item.title}</h3>
              <p className="mt-4 text-ink-700">{item.body}</p>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section surface="white" labelledBy="corporate-process">
        <SectionHeader eyebrow="Process" title="How a programme comes together" id="corporate-process" />
        <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {process.map((step) => (
            <li key={step.number}>
              <span
                aria-hidden="true"
                className="grid h-8 w-14 place-items-center rounded-[3px] bg-forest font-heading text-sm font-bold tracking-widest text-lime"
              >
                {step.number}
              </span>
              <h3 className="mt-5 font-heading text-h4 font-semibold">{step.title}</h3>
              <p className="mt-3 text-ink-700">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section surface="sage" labelledBy="corporate-fit">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow className="mb-4">Fit</Eyebrow>
            <h2 id="corporate-fit" className="text-h2">
              Who this is for
            </h2>
            <TickList
              className="mt-7"
              items={[
                'Learning and development teams commissioning sustainability capability',
                'Sustainability leads building competence across other functions',
                'Risk and compliance functions taking on ESG and climate scope',
                'Finance teams becoming responsible for sustainability data',
                'Procurement teams implementing supplier requirements',
                'Boards and executive teams with oversight responsibilities',
              ]}
            />
          </div>
          <Card surface="white">
            <h3 className="eyebrow text-lime-ink">What you receive</h3>
            <TickList
              className="mt-5"
              items={[
                'A programme proposal with objectives and module outline',
                'Delivery at your premises, virtually, or a combination',
                'Participant materials',
                'Exercises using your own data where confidentiality allows',
                'A post-programme summary of what was covered and what remains',
              ]}
            />
          </Card>
        </div>
      </Section>

      <Section surface="white" labelledBy="corporate-courses">
        <SectionHeader
          eyebrow="Starting points"
          title="Programmes commonly delivered in-house"
          id="corporate-courses"
        />
        <CardGrid columns={3} className="mt-12">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </CardGrid>
      </Section>

      <Section surface="ivory" labelledBy="corporate-faq">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div>
            <Eyebrow className="mb-4">Questions</Eyebrow>
            <h2 id="corporate-faq" className="text-h2">
              Frequently asked
            </h2>
          </div>
          <Accordion
            items={faqs.map((faq) => ({ title: faq.question, content: <p>{faq.answer}</p> }))}
          />
        </div>
      </Section>

      <Section surface="white" id="enquire" labelledBy="corporate-enquire">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div>
            <Eyebrow className="mb-4">Enquire</Eyebrow>
            <h2 id="corporate-enquire" className="text-h2">
              Discuss corporate training
            </h2>
            <p className="mt-6 max-w-[52ch] text-ink-700">
              Tell us who needs training, roughly how many people, and what is driving the
              requirement. We will come back with a recommended programme and a proposal.
            </p>
          </div>
          <AcademyForm
            courseOptions={[...getCourses().map((c) => c.title), 'A customised programme']}
            defaultParticipantType="Corporate / group"
          />
        </div>
      </Section>

      <CtaBanner
        heading="Need something no existing programme covers?"
        body="CER Academy builds curricula from scratch where the requirement warrants it."
        primary={{ label: 'Explore custom programmes', href: '/academy/custom-training/' }}
        secondary={{ label: 'Browse courses', href: '/academy/courses/' }}
      />
    </>
  );
}
