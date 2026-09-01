import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { IfVerified } from '@/components/ui/Verify';
import {
  ArrowLink,
  Card,
  Eyebrow,
  Paragraphs,
  Section,
  SectionHeader,
  TickList,
} from '@/components/ui/primitives';
import { ArticleCard, CardGrid, CourseCard, SolutionCard } from '@/components/ui/cards';
import {
  getArticlesByAuthor,
  getCoursesBySlugs,
  getExpert,
  getExperts,
  getSolutionsBySlugs,
} from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, jsonLd, personSchema } from '@/lib/schema';
import { cta } from '@/lib/site';
import { initials } from '@/lib/utils';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getExperts().map((expert) => ({ slug: expert.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const expert = getExpert(slug);
  if (!expert) return {};
  return buildMetadata({
    seo: expert.seo,
    path: `/about/experts/${slug}/`,
    fallbackTitle: `${expert.name}, ${expert.role}`,
  });
}

export default async function ExpertPage({ params }: Params) {
  const { slug } = await params;
  const expert = getExpert(slug);
  if (!expert) notFound();

  const courses = getCoursesBySlugs(expert.courseSlugs);
  const solutions = getSolutionsBySlugs(expert.solutionSlugs);
  const articles = getArticlesByAuthor(slug);

  const crumbs = buildCrumbs(
    { label: 'About', href: '/about/' },
    { label: 'Experts', href: '/about/experts/' },
    { label: expert.name, href: `/about/experts/${slug}/` },
  );

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs), personSchema(expert))} />

      <Section surface="dark" labelledBy="expert-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
          {/* No photograph is published until CER supplies a real professional
              image. A monogram is used rather than an AI-generated headshot. */}
          <span
            aria-hidden="true"
            className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-forest-500 font-heading text-h3 font-semibold text-lime"
          >
            {initials(expert.name)}
          </span>
          <div>
            <Eyebrow className="text-lime">{expert.role}</Eyebrow>
            <h1 id="expert-h1" className="mt-4 text-display">
              {expert.name}
            </h1>
          </div>
        </div>
        <p className="mt-8 max-w-[62ch] text-lead">{expert.shortBio}</p>
      </Section>

      <Section surface="ivory" labelledBy="expert-bio">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Eyebrow className="mb-4">Biography</Eyebrow>
            <h2 id="expert-bio" className="text-h2">
              Background
            </h2>
            <Paragraphs items={expert.longBio} className="mt-6 text-ink-700" />
          </div>

          <aside className="flex flex-col gap-8">
            <Card surface="white">
              <h3 className="eyebrow text-lime-ink">Areas of expertise</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {expert.expertise.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-3 py-1 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <Card surface="white">
              <h3 className="eyebrow text-lime-ink">Qualifications</h3>
              <TickList className="mt-4" items={expert.qualifications} />
              {expert.credentials?.length ? (
                <>
                  <h3 className="eyebrow mt-6 text-lime-ink">Experience</h3>
                  <TickList className="mt-4" items={expert.credentials} />
                </>
              ) : null}
            </Card>

            <Card surface="white">
              <h3 className="eyebrow text-lime-ink">Connect</h3>
              <div className="mt-4 text-ink-700">
                <IfVerified value={expert.linkedin}>
                  {(url) => (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest underline underline-offset-4 hover:text-lime-ink"
                    >
                      LinkedIn profile
                    </a>
                  )}
                </IfVerified>
              </div>
              <ArrowLink href={cta.consulting.href} className="mt-5">
                Speak with CER
              </ArrowLink>
            </Card>
          </aside>
        </div>
      </Section>

      {solutions.length ? (
        <Section surface="white" labelledBy="expert-solutions">
          <SectionHeader
            eyebrow="Advisory"
            title={`Services ${expert.name.split(' ')[0]} works on`}
            id="expert-solutions"
          />
          <CardGrid columns={3} className="mt-12">
            {solutions.map((solution) => (
              <SolutionCard key={solution.slug} solution={solution} />
            ))}
          </CardGrid>
        </Section>
      ) : null}

      {courses.length ? (
        <Section surface="ivory" labelledBy="expert-courses">
          <SectionHeader
            eyebrow="CER Academy"
            title="Programmes taught"
            id="expert-courses"
            action={<ArrowLink href="/academy/courses/">View all courses</ArrowLink>}
          />
          <CardGrid columns={3} className="mt-12">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </CardGrid>
        </Section>
      ) : null}

      {articles.length ? (
        <Section surface="white" labelledBy="expert-articles">
          <SectionHeader
            eyebrow="Insights"
            title="Articles written"
            id="expert-articles"
            action={<ArrowLink href="/insights/">View all insights</ArrowLink>}
          />
          <CardGrid columns={3} className="mt-12">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </CardGrid>
        </Section>
      ) : null}

      <CtaBanner
        heading={`Speak with ${expert.name.split(' ')[0]}`}
        body="Tell us what you are working through and we will arrange a conversation with the right person."
        primary={{ label: cta.consulting.label, href: cta.consulting.href }}
        secondary={{ label: 'View all experts', href: '/about/experts/' }}
      />
    </>
  );
}
