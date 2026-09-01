import type { Metadata } from 'next';
import Link from 'next/link';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import {
  ArrowLink,
  Button,
  Card,
  Eyebrow,
  Section,
  SectionHeader,
  TickList,
} from '@/components/ui/primitives';
import { CardGrid, CourseCard, ExpertCard } from '@/components/ui/cards';
import {
  getCourseCategories,
  getCourses,
  getCoursesByCategory,
  getExperts,
  getTestimonials,
  getUpcomingCourseDates,
} from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema, jsonLd } from '@/lib/schema';
import { cta } from '@/lib/site';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  path: '/academy/',
  seo: {
    title: 'CER Academy | ESG & Sustainability Training Singapore',
    description:
      'Professional ESG, carbon and sustainability training in Singapore. Courses, corporate programmes and executive sessions delivered by practising consultants.',
    primaryKeyword: 'sustainability training Singapore',
    secondaryKeywords: ['ESG training Singapore', 'ESG courses Singapore'],
  },
});

const crumbs = buildCrumbs({ label: 'Academy', href: '/academy/' });

const faqs = [
  {
    question: 'Who delivers CER Academy programmes?',
    answer:
      'Programmes are delivered by CER practitioners — the same people who run advisory engagements. That is deliberate: the material comes from work being done rather than from a curriculum written in isolation.',
  },
  {
    question: 'Can a course be delivered for our team only?',
    answer:
      'Yes. Every programme is available as private in-house delivery, which allows exercises to use your own data, risk taxonomy or supply base. This is usually the more useful format for a team of more than about six people.',
  },
  {
    question: 'Are programmes delivered online?',
    answer:
      'Most programmes are available in person in Singapore, as virtual live sessions, or in-house at your premises. The format is noted on each course page.',
  },
  {
    question: 'How do I find dates and pricing?',
    answer:
      'Submit an enquiry for the programme you are interested in and we will come back with scheduled dates, in-house options and pricing for your group size.',
  },
];

export default function AcademyPage() {
  const categories = getCourseCategories();
  const courses = getCourses();
  const experts = getExperts();
  const upcoming = getUpcomingCourseDates(4);
  const testimonials = getTestimonials();

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs), faqSchema(faqs))} />

      <Section surface="dark" labelledBy="academy-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">Knowledge. Skills. Certification.</Eyebrow>
        <h1 id="academy-h1" className="mt-5 max-w-[20ch] text-display">
          Build the sustainability capability your organisation needs.
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">
          CER Academy develops technical ESG, carbon and risk capability across professionals,
          leadership teams and whole organisations — taught by the practitioners who deliver CER&rsquo;s
          advisory work.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href={cta.courses.href} variant="invert">
            {cta.courses.label}
          </Button>
          <Button
            href={cta.corporateTraining.href}
            variant="secondary"
            className="border-white/40 text-white hover:border-white hover:bg-white hover:text-forest"
          >
            {cta.corporateTraining.label}
          </Button>
        </div>
      </Section>

      {/* Course categories */}
      <Section surface="ivory" labelledBy="academy-categories">
        <SectionHeader
          eyebrow="Programmes"
          title="Course categories"
          id="academy-categories"
          lead="Four areas, from a half-day strategic grounding to a two-day practitioner masterclass."
        />
        <CardGrid columns={4} className="mt-14">
          {categories.map((category) => {
            const count = getCoursesByCategory(category.slug).length;
            if (!count) return null;
            return (
              <Card key={category.slug} surface="white" className="flex flex-col">
                <h3 className="text-h4">{category.title}</h3>
                <p className="mt-4 flex-1 text-ink-700">{category.summary}</p>
                <p className="mt-4 text-sm text-muted">
                  {count} {count === 1 ? 'programme' : 'programmes'}
                </p>
                <ArrowLink href={`/academy/courses/?category=${category.slug}`} className="mt-6">
                  View {category.title} courses
                </ArrowLink>
              </Card>
            );
          })}
        </CardGrid>
      </Section>

      {/* Upcoming programmes.
          Only real scheduled dates are shown. Where CER has not published a
          schedule, the section states that plainly rather than fabricating a
          calendar. */}
      <Section surface="white" labelledBy="academy-upcoming">
        <SectionHeader
          eyebrow="Schedule"
          title="Upcoming programmes"
          id="academy-upcoming"
          action={<ArrowLink href="/academy/courses/">View all courses</ArrowLink>}
        />
        {upcoming.length ? (
          <ul className="mt-12 divide-y divide-line border-y border-line">
            {upcoming.map(({ course, date }) => (
              <li
                key={`${course.slug}-${date.start}`}
                className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-heading text-h4 font-semibold">
                    <Link
                      href={`/academy/courses/${course.slug}/`}
                      className="hover:text-lime-ink"
                    >
                      {course.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {course.duration} · {date.location}
                  </p>
                </div>
                <p className="font-heading font-semibold text-forest">
                  <time dateTime={date.start}>{formatDate(date.start)}</time>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <Card surface="sage" className="mt-12">
            <h3 className="text-h4">Dates are confirmed on enquiry</h3>
            <p className="mt-4 max-w-[68ch] text-ink-700">
              CER Academy schedules public programmes according to demand, and runs private
              in-house sessions on dates that suit the organisation. Tell us which programme you
              are interested in and your preferred timeframe, and we will confirm available dates.
            </p>
            <Button href={cta.corporateTraining.href} className="mt-6">
              Enquire about dates
            </Button>
          </Card>
        )}
      </Section>

      {/* Why CER Academy */}
      <Section surface="sage" labelledBy="academy-why">
        <SectionHeader eyebrow="Why CER Academy" title="Training from practice" id="academy-why" />
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {[
            {
              title: 'Taught by practising consultants',
              body: 'Instructors are CER consultants delivering advisory engagements. The examples in the room come from work in progress, not from a textbook.',
            },
            {
              title: 'Technical where it needs to be',
              body: 'Programmes go into methodology — boundaries, emission factors, attribution, evidence — because that is where organisations actually get stuck.',
            },
            {
              title: 'Built for the region',
              body: 'Content reflects the requirements organisations in Singapore and across Asia are actually facing, including obligations arriving from overseas customers and regulators.',
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-heading text-h4 font-semibold">{item.title}</h3>
              <p className="mt-4 text-ink-700">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Featured courses */}
      <Section surface="ivory" labelledBy="academy-courses">
        <SectionHeader
          eyebrow="Courses"
          title="Professional programmes"
          id="academy-courses"
          action={<ArrowLink href="/academy/courses/">View all courses</ArrowLink>}
        />
        <CardGrid columns={3} className="mt-14">
          {courses.slice(0, 6).map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </CardGrid>
      </Section>

      {/* Instructors */}
      <Section surface="white" labelledBy="academy-instructors">
        <SectionHeader
          eyebrow="Instructors"
          title="Who teaches"
          id="academy-instructors"
          action={<ArrowLink href="/about/experts/">View all experts</ArrowLink>}
        />
        <CardGrid columns={3} className="mt-12">
          {experts.map((expert) => (
            <ExpertCard key={expert.slug} expert={expert} />
          ))}
        </CardGrid>
      </Section>

      {/* Corporate training */}
      <Section surface="ivory" labelledBy="academy-corporate">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <Eyebrow className="mb-4">Corporate training</Eyebrow>
            <h2 id="academy-corporate" className="text-h2">
              Deliver a programme for your own team
            </h2>
            <p className="mt-6 max-w-[62ch] text-ink-700">
              Every CER Academy programme can be delivered privately for a single organisation, and
              curricula can be built from scratch where an off-the-shelf programme does not fit.
              In-house delivery lets exercises use your own data, which is usually what makes the
              training stick.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/academy/corporate-training/">Corporate training</Button>
              <Button href="/academy/custom-training/" variant="secondary">
                Custom programmes
              </Button>
            </div>
          </div>
          <Card surface="white">
            <h3 className="eyebrow text-lime-ink">Available formats</h3>
            <TickList
              className="mt-5"
              items={[
                'Private in-house delivery of any scheduled programme',
                'Customised curricula built around your requirements',
                'Executive and board-level sessions',
                'Technical training for sustainability, risk and finance teams',
                'Multi-session capability programmes',
              ]}
            />
          </Card>
        </div>
      </Section>

      {/* Testimonials render only where CER holds written permission. */}
      {testimonials.length ? (
        <Section surface="white" labelledBy="academy-testimonials">
          <SectionHeader eyebrow="Feedback" title="What participants say" id="academy-testimonials" />
          <CardGrid columns={3} className="mt-12">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} surface="sage" as="article">
                <blockquote className="text-lead">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                <p className="mt-5 font-heading font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted">
                  {testimonial.role}, {testimonial.organisation}
                </p>
              </Card>
            ))}
          </CardGrid>
        </Section>
      ) : null}

      {/* FAQ */}
      <Section surface="white" labelledBy="academy-faq">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div>
            <Eyebrow className="mb-4">Questions</Eyebrow>
            <h2 id="academy-faq" className="text-h2">
              Frequently asked
            </h2>
          </div>
          <Accordion
            items={faqs.map((faq) => ({ title: faq.question, content: <p>{faq.answer}</p> }))}
          />
        </div>
      </Section>

      <CtaBanner
        heading="Which capability are you trying to build?"
        body="Tell us who needs to be trained, on what, and by when. We will recommend a programme — or tell you if a different one fits better."
        primary={{ label: cta.corporateTraining.label, href: cta.corporateTraining.href }}
        secondary={{ label: 'Browse courses', href: '/academy/courses/' }}
      />
    </>
  );
}
