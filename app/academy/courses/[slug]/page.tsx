import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { AcademyForm } from '@/components/forms/AcademyForm';
import { Verify } from '@/components/ui/Verify';
import {
  ArrowLink,
  Button,
  Card,
  Eyebrow,
  Paragraphs,
  Section,
  SectionHeader,
  TickList,
} from '@/components/ui/primitives';
import { CardGrid, CourseCard, SolutionCard } from '@/components/ui/cards';
import {
  getCourse,
  getCourseCategories,
  getCourses,
  getCoursesBySlugs,
  getExpertsBySlugs,
  getSolutionsBySlugs,
} from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, courseSchema, faqSchema, jsonLd } from '@/lib/schema';
import { cta } from '@/lib/site';
import { formatDateRange, initials } from '@/lib/utils';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getCourses().map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return buildMetadata({
    seo: course.seo,
    path: `/academy/courses/${slug}/`,
    fallbackTitle: course.title,
  });
}

export default async function CoursePage({ params }: Params) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const category = getCourseCategories().find((c) => c.slug === course.category);
  const instructors = getExpertsBySlugs(course.instructorSlugs);
  const relatedCourses = getCoursesBySlugs(course.relatedCourses);
  const relatedSolutions = getSolutionsBySlugs(course.relatedSolutions);
  const scheduled = course.upcoming.filter((d) => d.status === 'scheduled');

  const crumbs = buildCrumbs(
    { label: 'Academy', href: '/academy/' },
    { label: 'Courses', href: '/academy/courses/' },
    { label: course.title, href: `/academy/courses/${slug}/` },
  );

  return (
    <>
      <JsonLd
        data={jsonLd(
          breadcrumbSchema(crumbs),
          courseSchema(course, instructors),
          faqSchema(course.faqs ?? []),
        )}
      />

      {/* Hero */}
      <Section surface="dark" labelledBy="course-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <Eyebrow className="text-lime">{category?.title ?? 'CER Academy'}</Eyebrow>
            <h1 id="course-h1" className="mt-5 text-display">
              {course.title}
            </h1>
            <p className="mt-7 max-w-[62ch] text-lead">{course.outcome}</p>
            <div className="mt-9">
              <Button href="#enquire" variant="invert">
                Enquire about this course
              </Button>
            </div>
          </div>

          {/* Key facts. Only what CER has confirmed, no invented price or date. */}
          <Card surface="dark" className="border-line-invert">
            <h2 className="eyebrow text-lime">Course details</h2>
            <dl className="mt-5 flex flex-col divide-y divide-line-invert">
              <Fact term="Duration" value={course.duration} />
              <Fact term="Format" value={course.formats.join(', ')} />
              <Fact term="Location" value={course.location} />
              <Fact
                term="Next date"
                value={
                  scheduled.length
                    ? formatDateRange(scheduled[0]!.start, scheduled[0]!.end)
                    : 'Confirmed on enquiry'
                }
              />
              <Fact
                term="Price"
                value={
                  course.price
                    ? `${course.price.currency} ${course.price.amount.toLocaleString()}`
                    : 'On enquiry'
                }
              />
              <Fact
                term="In-house delivery"
                value={course.corporateAvailable ? 'Available' : 'Not available'}
              />
            </dl>
          </Card>
        </div>
      </Section>

      {/* Overview */}
      <Section surface="ivory" labelledBy="course-overview">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <div>
            <Eyebrow className="mb-4">Overview</Eyebrow>
            <h2 id="course-overview" className="text-h2">
              About this programme
            </h2>
          </div>
          <Paragraphs items={course.description} className="text-ink-700" />
        </div>
      </Section>

      {/* Who should attend + outcomes */}
      <Section surface="white" labelledBy="course-audience">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <Eyebrow className="mb-4">Audience</Eyebrow>
            <h2 id="course-audience" className="text-h3">
              Who should attend
            </h2>
            <TickList items={course.whoShouldAttend} className="mt-7" />
          </div>
          <div>
            <Eyebrow className="mb-4">Outcomes</Eyebrow>
            <h2 className="text-h3">What you will be able to do</h2>
            <Card surface="sage" className="mt-7">
              <TickList items={course.learningOutcomes} />
            </Card>
          </div>
        </div>
      </Section>

      {/* Modules */}
      <Section surface="ivory" labelledBy="course-modules">
        <SectionHeader eyebrow="Curriculum" title="Course contents" id="course-modules" />
        <div className="mt-12 max-w-4xl">
          <Accordion
            defaultOpenFirst
            items={course.modules.map((module) => ({
              title: module.title,
              content: <TickList items={module.points} />,
            }))}
          />
        </div>
      </Section>

      {/* Delivery and certification */}
      <Section surface="white" labelledBy="course-delivery">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <Eyebrow className="mb-4">Delivery</Eyebrow>
            <h2 id="course-delivery" className="text-h3">
              How it runs
            </h2>
            <dl className="mt-7 divide-y divide-line border-y border-line">
              <FactRow term="Duration" value={course.duration} />
              <FactRow term="Formats" value={course.formats.join(', ')} />
              <FactRow term="Location" value={course.location} />
              <FactRow
                term="Materials"
                value="Course materials are provided to every participant."
              />
              {scheduled.length ? (
                <FactRow
                  term="Scheduled dates"
                  value={scheduled
                    .map((d) => formatDateRange(d.start, d.end))
                    .join(' · ')}
                />
              ) : (
                <FactRow
                  term="Scheduled dates"
                  value="Public dates are set according to demand. In-house dates are arranged to suit your organisation."
                />
              )}
            </dl>
          </div>

          <div>
            <Eyebrow className="mb-4">Certification</Eyebrow>
            <h2 className="text-h3">What participants receive</h2>
            {/*
              CER issues either a Certificate of Participation or a Certificate
              of Completion, but which one applies depends on the delivery
              partner, and TÜV SÜD Academy Singapore is only one of several. So
              a course states its award only once CER has settled it. Where it
              has not, the card points the reader at the enquiry rather than
              naming a certificate the partner may not issue.
            */}
            <Card surface="outline" className="mt-7">
              {course.certification ? (
                <p className="text-ink-700">
                  <Verify value={course.certification} />
                </p>
              ) : null}
              <p className={course.certification ? 'mt-4 text-sm text-muted' : 'text-ink-700'}>
                For confirmation of what this programme awards, please ask when you enquire.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Instructors */}
      {instructors.length ? (
        <Section surface="sage" labelledBy="course-instructor">
          <SectionHeader eyebrow="Instructor" title="Who teaches this" id="course-instructor" />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {instructors.map((instructor) => (
              <Card key={instructor.slug} surface="white" as="article" className="flex gap-6">
                <span
                  aria-hidden="true"
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-sage font-heading text-h4 font-semibold text-forest"
                >
                  {initials(instructor.name)}
                </span>
                <div>
                  <h3 className="text-h4">{instructor.name}</h3>
                  <p className="mt-1 text-sm text-muted">{instructor.role}</p>
                  <p className="mt-4 text-ink-700">{instructor.shortBio}</p>
                  <ul className="mt-4 flex flex-col gap-1 text-sm text-muted">
                    {instructor.qualifications.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                  <ArrowLink href={`/about/experts/${instructor.slug}/`} className="mt-5">
                    View full profile
                  </ArrowLink>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Corporate delivery */}
      {course.corporateAvailable ? (
        <Section surface="white" labelledBy="course-corporate">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
            <div>
              <Eyebrow className="mb-4">In-house delivery</Eyebrow>
              <h2 id="course-corporate" className="text-h2">
                Run this programme for your team
              </h2>
              <p className="mt-6 max-w-[62ch] text-ink-700">
                This programme can be delivered privately for a single organisation. In-house
                delivery allows the exercises to use your own data, register or supply base, which
                is generally what makes training translate into changed practice.
              </p>
              <Button href={cta.corporateTraining.href} className="mt-8">
                {cta.corporateTraining.label}
              </Button>
            </div>
            <Card surface="sage">
              <h3 className="eyebrow text-lime-ink">In-house delivery includes</h3>
              <TickList
                className="mt-5"
                items={[
                  'Delivery at your premises or virtually',
                  'Content adjusted to your sector and maturity',
                  'Exercises using your own data where appropriate',
                  'Scheduling around your team availability',
                  'A single invoice rather than per-seat pricing',
                ]}
              />
            </Card>
          </div>
        </Section>
      ) : null}

      {/* FAQ */}
      {course.faqs?.length ? (
        <Section surface="ivory" labelledBy="course-faq">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
            <div>
              <Eyebrow className="mb-4">Questions</Eyebrow>
              <h2 id="course-faq" className="text-h2">
                Frequently asked
              </h2>
            </div>
            <Accordion
              items={course.faqs.map((faq) => ({
                title: faq.question,
                content: <p>{faq.answer}</p>,
              }))}
            />
          </div>
        </Section>
      ) : null}

      {/* Enquiry form */}
      <Section surface="white" id="enquire" labelledBy="course-enquire">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div>
            <Eyebrow className="mb-4">Enquire</Eyebrow>
            <h2 id="course-enquire" className="text-h2">
              Enquire about this course
            </h2>
            <p className="mt-6 max-w-[52ch] text-ink-700">
              Tell us whether this is for you individually or for a group, and your preferred
              timeframe. We will come back with available dates, delivery options and pricing.
            </p>
          </div>
          <AcademyForm courseOptions={[course.title]} defaultCourse={course.slug} />
        </div>
      </Section>

      {/* Related */}
      {relatedCourses.length || relatedSolutions.length ? (
        <Section surface="ivory" labelledBy="course-related">
          <h2 id="course-related" className="sr-only">
            Related programmes and services
          </h2>

          {relatedCourses.length ? (
            <>
              <SectionHeader eyebrow="Related" title="Other programmes" level={3} />
              <CardGrid columns={3} className="mt-10">
                {relatedCourses.map((related) => (
                  <CourseCard key={related.slug} course={related} />
                ))}
              </CardGrid>
            </>
          ) : null}

          {relatedSolutions.length ? (
            <div className="mt-16">
              <SectionHeader
                eyebrow="Advisory"
                title="Rather have CER do the work?"
                level={3}
              />
              <CardGrid columns={3} className="mt-10">
                {relatedSolutions.map((solution) => (
                  <SolutionCard key={solution.slug} solution={solution} />
                ))}
              </CardGrid>
            </div>
          ) : null}
        </Section>
      ) : null}

      <CtaBanner
        heading="Training a team rather than an individual?"
        body="Private in-house delivery is usually more effective and more economical above roughly six participants."
        primary={{ label: cta.corporateTraining.label, href: cta.corporateTraining.href }}
        secondary={{ label: 'Browse all courses', href: '/academy/courses/' }}
      />
    </>
  );
}

function Fact({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-sm text-muted-invert">{term}</dt>
      <dd className="text-right font-heading text-sm font-semibold text-white">{value}</dd>
    </div>
  );
}

function FactRow({ term, value }: { term: string; value: string }) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
      <dt className="font-heading text-sm font-semibold text-ink">{term}</dt>
      <dd className="text-ink-700">{value}</dd>
    </div>
  );
}
