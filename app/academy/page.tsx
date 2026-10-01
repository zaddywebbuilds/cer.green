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
    title: 'CER Academy | Compliance Training & Learning Platform Singapore',
    description:
      'CER Academy delivers AI-powered compliance training for Singapore SMEs and NGOs — AML, PDPA, ESG, workplace safety and more. PSG grant-eligible LMS platform and professional programmes taught by practising consultants.',
    primaryKeyword: 'compliance training Singapore',
    secondaryKeywords: ['ESG training Singapore', 'sustainability training Singapore', 'PSG grant training Singapore'],
  },
});

const crumbs = buildCrumbs({ label: 'Academy', href: '/academy/' });

const faqs = [
  {
    question: 'What is the CER Academy learning platform?',
    answer:
      'CER Academy operates an AI-powered learning management system (LMS) for compliance training. It is designed for Singapore SMEs and NGOs, and comes pre-loaded with core compliance modules covering AML, PDPA, ESG, workplace safety and more. Organisations can deploy it as a standalone platform or access it through co-branded partnerships such as ASME.',
  },
  {
    question: 'Is the CER Academy platform PSG grant-eligible?',
    answer:
      'CER Academy is pursuing Productivity Solutions Grant (PSG) pre-approval, which allows qualifying Singapore SMEs to claim government subsidy on software adoption. Speak with us about current grant eligibility and how to structure your adoption accordingly.',
  },
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
    question: "How do CER Academy’s ATO partnerships work?",
    answer:
      'CER Academy partners with established Approved Training Organisations (ATOs), ASME, and institutional bodies including the Civil Service College to deliver accredited programmes from day one. This means clients access recognised, grant-eligible training without waiting for standalone accreditation approvals.',
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
        <Eyebrow className="text-lime">Training · Platform · Partnerships</Eyebrow>
        <h1 id="academy-h1" className="mt-5 max-w-[22ch] text-display">
          Compliance training built for Singapore organisations.
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">
          CER Academy combines an AI-powered compliance learning platform with professional
          programmes taught by practising consultants — serving Singapore SMEs, NGOs and
          institutions through established ATO and institutional partnerships.
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

      {/* ── Platform overview ─────────────────────────────────────────────── */}
      <section className="bg-forest-700 text-white on-dark" data-surface="dark">
        <div className="shell py-(--spacing-section)">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20 lg:items-start">
            {/* Left: mission */}
            <div>
              <p className="eyebrow text-lime">The CER Academy Platform</p>
              <h2
                className="mt-6 font-heading font-semibold text-white"
                style={{ fontSize: 'clamp(1.875rem, 1.3rem + 2.3vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
              >
                Why we built this — and who it&rsquo;s for.
              </h2>
              <p className="mt-6 max-w-[48ch] text-muted-invert">
                Singapore SMEs and NGOs face expanding mandatory compliance requirements —
                AML obligations, PDPA accountability, workplace safety standards, ESG
                reporting. Meeting them demands more than an occasional workshop.
              </p>
              <p className="mt-4 max-w-[48ch] text-muted-invert">
                CER Academy addresses this with an AI-powered learning management system,
                pre-loaded compliance content, and the institutional partnerships to deliver
                accredited training from day one — without the 6 to 12&ndash;month wait for
                standalone ATO accreditation.
              </p>
            </div>

            {/* Right: three audience/feature tiles */}
            <div className="grid gap-px bg-line-invert sm:grid-cols-1">
              {[
                {
                  label: 'For SMEs',
                  body: 'Co-branded with ASME and built for Singapore mid-tier enterprises. PSG grant-eligible, so qualifying organisations can offset a significant share of software adoption costs against government subsidy.',
                },
                {
                  label: 'For NGOs & Charities',
                  body: 'Governance, fundraising and financial stewardship programmes aligned with MCCY requirements. Designed for charity board members, executive directors and compliance officers.',
                },
                {
                  label: 'AI-Powered Learning',
                  body: 'Role-based compliance path recommendations, a 24/7 compliance co-pilot for policy questions, and automated monitoring of ACRA, MAS and Commissioner of Charities regulatory updates.',
                },
              ].map((tile) => (
                <div key={tile.label} className="bg-forest-700 px-6 py-7 border-b border-line-invert last:border-b-0">
                  <p className="font-heading text-sm font-semibold uppercase tracking-[0.1em] text-lime">{tile.label}</p>
                  <p className="mt-3 text-muted-invert">{tile.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Compliance modules ────────────────────────────────────────────── */}
      <Section surface="white" labelledBy="academy-modules">
        <SectionHeader
          eyebrow="Coverage"
          title="Core compliance modules"
          id="academy-modules"
          lead="Pre-loaded modules covering the obligations most Singapore organisations already face. Additional domain packs available for NGO governance, ISO standards and ESG reporting."
        />
        <div className="mt-12 grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-4">
          {[
            { title: 'AML & Counter-Terrorism Financing', tag: 'MAS · FATF' },
            { title: 'Anti-Bribery & Corruption', tag: 'CPIB · ISO 37001' },
            { title: 'PDPA & Data Privacy', tag: 'PDPC' },
            { title: 'Workplace Safety & Health', tag: 'MOM · WSH Act' },
            { title: 'Workplace Harassment', tag: 'TAFEP' },
            { title: 'ESG & Sustainability Reporting', tag: 'SGX · ISSB' },
            { title: 'NGO Governance & Stewardship', tag: 'MCCY · Charities Act' },
            { title: 'ISO Standards & Frameworks', tag: 'ISO 14001 · ISO 37001' },
          ].map((mod) => (
            <div key={mod.title} className="bg-white px-6 py-7">
              <p className="font-heading text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-lime-ink">
                {mod.tag}
              </p>
              <p className="mt-2 font-heading text-sm font-semibold text-ink leading-snug">
                {mod.title}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Additional modules and AI-driven role recommendations configured per organisation.
        </p>
      </Section>

      {/* ── Institutional partnerships ────────────────────────────────────── */}
      <section className="bg-forest text-white on-dark" data-surface="dark">
        <div className="shell py-(--spacing-section)">
          <p className="eyebrow text-lime" id="academy-partners">Our approach</p>
          <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20 lg:items-start">
            <h2
              className="font-heading font-semibold text-white"
              style={{ fontSize: 'clamp(1.875rem, 1.3rem + 2.3vw, 2.75rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
            >
              Partner-first. Accredited from day one.
            </h2>
            <div>
              <p className="text-muted-invert">
                Rather than waiting 6 to 12 months for standalone Approved Training Organisation
                accreditation, CER Academy enters the market through established institutional
                partnerships — delivering WSQ, MCCY-backed and CSC-aligned programmes immediately
                while those channels are being built.
              </p>
              <ul className="mt-10 flex flex-col gap-px border-t border-line-invert">
                {[
                  {
                    partner: 'ASME',
                    desc: 'Co-branded LMS and SME capability modules reaching 6,000+ member companies across Singapore.',
                  },
                  {
                    partner: 'Civil Service College',
                    desc: 'Collaboration on public-sector-focused domains including environment, governance, risk and controls.',
                  },
                  {
                    partner: 'MCCY-Backed Providers',
                    desc: 'NGO governance and management programmes unlocking MCCY grants for Singapore charities and IPC organisations.',
                  },
                  {
                    partner: 'Established ATOs',
                    desc: 'WSQ-accredited business capability modules co-marketed and delivered through approved training partners.',
                  },
                ].map((item) => (
                  <li key={item.partner} className="border-b border-line-invert py-6">
                    <p className="font-heading font-semibold text-lime">{item.partner}</p>
                    <p className="mt-2 text-sm text-muted-invert">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

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
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
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
            {
              title: 'Accredited from day one',
              body: 'Delivered through established ATO, ASME and CSC partnerships, so clients access recognised training pathways immediately — without waiting on standalone accreditation timelines.',
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
