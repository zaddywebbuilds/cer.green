import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import {
  ArrowLink,
  Button,
  Eyebrow,
  Paragraphs,
  Section,
  SectionHeader,
  TickList,
} from '@/components/ui/primitives';
import { CardGrid, CaseStudyCard, CourseCard, SolutionCard } from '@/components/ui/cards';
import {
  getCaseStudiesByIndustry,
  getCoursesBySlugs,
  getIndustries,
  getIndustry,
  getSolutionsBySlugs,
} from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import { cta } from '@/lib/site';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getIndustries().map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return buildMetadata({
    seo: industry.seo,
    path: `/industries/${slug}/`,
    fallbackTitle: industry.title,
  });
}

export default async function IndustryPage({ params }: Params) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const solutions = getSolutionsBySlugs(industry.solutionSlugs);
  const courses = getCoursesBySlugs(industry.courseSlugs);
  const caseStudies = getCaseStudiesByIndustry(slug);

  const crumbs = buildCrumbs(
    { label: 'Industries', href: '/industries/' },
    { label: industry.title, href: `/industries/${slug}/` },
  );

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs))} />

      <Section surface="dark" labelledBy="industry-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">Industries</Eyebrow>
        <h1 id="industry-h1" className="mt-5 max-w-[18ch] text-display">
          {industry.title}
        </h1>
        <p className="mt-7 max-w-[62ch] text-lead">{industry.summary}</p>
        <p className="mt-5 max-w-[68ch] text-muted-invert">{industry.challenge}</p>
        <div className="mt-9">
          <Button href={cta.discuss.href} variant="invert">
            {cta.discuss.label}
          </Button>
        </div>
      </Section>

      <Section surface="ivory" labelledBy="industry-context">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div>
            <Eyebrow className="mb-4">Context</Eyebrow>
            <h2 id="industry-context" className="text-h2">
              What makes this sector different
            </h2>
          </div>
          <Paragraphs items={industry.context} className="text-ink-700" />
        </div>
      </Section>

      <Section surface="white" labelledBy="industry-priorities">
        <SectionHeader
          eyebrow="Priorities"
          title="What organisations in this sector are working on"
          id="industry-priorities"
        />
        <TickList items={industry.priorities} columns className="mt-10 max-w-4xl" />
      </Section>

      <Section surface="sage" labelledBy="industry-solutions">
        <SectionHeader
          eyebrow="Solutions"
          title={`How CER helps ${industry.title.toLowerCase()} organisations`}
          id="industry-solutions"
        />
        <CardGrid columns={3} className="mt-12">
          {solutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </CardGrid>
      </Section>

      {caseStudies.length ? (
        <Section surface="white" labelledBy="industry-cases">
          <SectionHeader eyebrow="In practice" title="Sector work" id="industry-cases" />
          <CardGrid columns={3} className="mt-12">
            {caseStudies.slice(0, 3).map((caseStudy) => (
              <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
            ))}
          </CardGrid>
        </Section>
      ) : null}

      {courses.length ? (
        <Section surface="ivory" labelledBy="industry-courses">
          <SectionHeader
            eyebrow="CER Academy"
            title="Building capability in this sector"
            id="industry-courses"
            action={<ArrowLink href="/academy/courses/">View all courses</ArrowLink>}
          />
          <CardGrid columns={3} className="mt-12">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </CardGrid>
        </Section>
      ) : null}

      <CtaBanner
        heading={`Working through a ${industry.title.toLowerCase()} requirement?`}
        body="Tell us what is being asked of your organisation and by whom. We will tell you what answering it involves."
        primary={{ label: cta.discuss.label, href: cta.discuss.href }}
        secondary={{ label: 'View all industries', href: '/industries/' }}
      />
    </>
  );
}
