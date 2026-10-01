import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { Methodology } from '@/components/sections/Methodology';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
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
import {
  ArticleCard,
  CardGrid,
  CaseStudyCard,
  ExpertCard,
  IndustryCard,
  SolutionCard,
} from '@/components/ui/cards';
import {
  getArticlesBySolution,
  getCaseStudiesBySolution,
  getExpertsBySlugs,
  getIndustriesBySlugs,
  getSolution,
  getSolutionCategories,
  getSolutionCategory,
  getSolutions,
  getSolutionsByCategory,
  getSolutionsBySlugs,
} from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema, jsonLd, serviceSchema } from '@/lib/schema';
import { cta } from '@/lib/site';

/**
 * One dynamic route serves both solution categories and individual services.
 *
 * That keeps the URL structure flat -- `/solutions/carbon-climate/` and
 * `/solutions/carbon-accounting/` sit at the same depth -- which is what the
 * information architecture calls for and avoids a needless nesting level.
 */

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...getSolutionCategories().map((c) => ({ slug: c.slug })),
    ...getSolutions().map((s) => ({ slug: s.slug })),
  ];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;

  const category = getSolutionCategory(slug);
  if (category) {
    return buildMetadata({
      seo: category.seo,
      path: `/solutions/${slug}/`,
      fallbackTitle: category.title,
    });
  }

  const solution = getSolution(slug);
  if (solution) {
    return buildMetadata({
      seo: solution.seo,
      path: `/solutions/${slug}/`,
      fallbackTitle: solution.title,
    });
  }

  return {};
}

export default async function SolutionPage({ params }: Params) {
  const { slug } = await params;

  const category = getSolutionCategory(slug);
  if (category) return <CategoryView slug={slug} />;

  const solution = getSolution(slug);
  if (!solution) notFound();

  return <ServiceView slug={slug} />;
}

/* -------------------------------------------------------------------------- */
/* Category view                                                              */
/* -------------------------------------------------------------------------- */

function CategoryView({ slug }: { slug: string }) {
  const category = getSolutionCategory(slug)!;
  const solutions = getSolutionsByCategory(slug);
  const crumbs = buildCrumbs(
    { label: 'Solutions', href: '/solutions/' },
    { label: category.title, href: `/solutions/${slug}/` },
  );

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs))} />

      <Section surface="dark" labelledBy="category-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">CER Solutions</Eyebrow>
        <h1 id="category-h1" className="mt-5 max-w-[18ch] text-display">
          {category.title}
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">{category.summary}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href={cta.discuss.href} variant="invert">
            {cta.discuss.label}
          </Button>
        </div>
      </Section>

      <Section surface="ivory" labelledBy="category-context">
        <h2 id="category-context" className="sr-only">
          Context and capability
        </h2>
        <div className="grid gap-10 lg:grid-cols-3">
          {[
            { heading: 'The business problem', body: category.problem },
            { heading: 'What CER does', body: category.capability },
            { heading: 'Likely outcome', body: category.outcome },
          ].map((block) => (
            <div key={block.heading}>
              <h3 className="font-heading text-h4 font-semibold">{block.heading}</h3>
              <p className="mt-4 text-ink-700">{block.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section surface="white" labelledBy="category-services">
        <SectionHeader
          eyebrow="Services"
          title={`${category.title} services`}
          id="category-services"
          lead="Most engagements combine several of these. If you are not sure which applies, describe the requirement and we will map it."
        />
        <CardGrid columns={3} className="mt-14">
          {solutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </CardGrid>
      </Section>

      <Methodology surface="sage" compact />

      <CtaBanner
        heading={`Discuss your ${category.title.toLowerCase()} requirements`}
        body="Tell us what is being asked of your organisation, by whom, and when. We will tell you what it actually takes to answer it."
        primary={{ label: cta.discuss.label, href: cta.discuss.href }}
        secondary={{ label: 'View all solutions', href: '/solutions/' }}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Service view                                                               */
/* -------------------------------------------------------------------------- */

function ServiceView({ slug }: { slug: string }) {
  const solution = getSolution(slug)!;
  const category = getSolutionCategory(solution.category)!;
  const related = getSolutionsBySlugs(solution.relatedSolutions);
  const industries = getIndustriesBySlugs(solution.relatedIndustries);
  const experts = getExpertsBySlugs(solution.expertSlugs);
  const caseStudies = getCaseStudiesBySolution(slug);
  const articles = getArticlesBySolution(slug).slice(0, 3);

  const crumbs = buildCrumbs(
    { label: 'Solutions', href: '/solutions/' },
    { label: category.title, href: `/solutions/${category.slug}/` },
    { label: solution.title, href: `/solutions/${slug}/` },
  );

  return (
    <>
      <JsonLd
        data={jsonLd(
          breadcrumbSchema(crumbs),
          serviceSchema(solution),
          faqSchema(solution.faqs),
        )}
      />

      <Section surface="dark" labelledBy="service-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">{category.title}</Eyebrow>
        <h1 id="service-h1" className="mt-5 max-w-[18ch] text-display">
          {solution.title}
        </h1>
        <p className="mt-7 max-w-[62ch] text-lead">{solution.heroStatement}</p>
        <p className="mt-5 max-w-[68ch] text-muted-invert">{solution.summary}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href={cta.discuss.href} variant="invert">
            {cta.discuss.label}
          </Button>
          {experts.length ? (
            <Button
              href={`/about/experts/${experts[0]!.slug}/`}
              variant="secondary"
              className="border-white/40 text-white hover:border-white hover:bg-white hover:text-forest"
            >
              Speak with an expert
            </Button>
          ) : null}
        </div>
      </Section>

      {/* Business context */}
      <Section surface="ivory" labelledBy="service-context">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div>
            <Eyebrow className="mb-4">Context</Eyebrow>
            <h2 id="service-context" className="text-h2">
              Why this matters
            </h2>
          </div>
          <Paragraphs items={solution.businessContext} className="text-ink-700" />
        </div>
      </Section>

      {/* How CER helps + deliverables */}
      <Section surface="white" labelledBy="service-help">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <Eyebrow className="mb-4">The engagement</Eyebrow>
            <h2 id="service-help" className="text-h3">
              How CER helps
            </h2>
            <TickList items={solution.components} className="mt-7" />
          </div>

          <div>
            <Eyebrow className="mb-4">Deliverables</Eyebrow>
            <h2 className="text-h3">What you receive</h2>
            <Card surface="sage" className="mt-7">
              <TickList items={solution.deliverables} />
            </Card>

            {solution.frameworks?.length ? (
              <div className="mt-8">
                <h3 className="eyebrow text-lime-ink">Frameworks and standards</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {solution.frameworks.map((framework) => (
                    <li
                      key={framework}
                      className="rounded-full border border-line px-3 py-1 text-sm text-muted"
                    >
                      {framework}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </Section>

      {/* Who it is for */}
      <Section surface="sage" labelledBy="service-audience">
        <SectionHeader eyebrow="Fit" title="Who this is for" id="service-audience" />
        <TickList items={solution.audience} columns className="mt-10 max-w-4xl" />
      </Section>

      {/* Why CER */}
      <Section surface="white" labelledBy="service-why">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <Eyebrow className="mb-4">Why CER</Eyebrow>
            <h2 id="service-why" className="text-h3">
              Practitioners, not report writers
            </h2>
          </div>
          <div className="flex flex-col gap-5 text-ink-700">
            <p>
              CER works from Singapore with organisations across Asia, which matters for this
              service because requirements arriving from European regulators, regional supervisors
              and local listing rules do not align neatly.
            </p>
            <p>
              Engagements run through to implementation: the data collection process, the
              documentation, the controls and the internal handover, so that the second cycle is
              cheaper than the first and can be run without us.
            </p>
            <p>
              Where an organisation would be better served by building the capability internally,
              CER Academy delivers the same technical material as training.
            </p>
            {experts.length ? (
              <ArrowLink href="/about/experts/">Meet the people behind the work</ArrowLink>
            ) : null}
          </div>
        </div>
      </Section>

      {/* Experts */}
      {experts.length ? (
        <Section surface="ivory" labelledBy="service-experts">
          <SectionHeader eyebrow="Our people" title="Expertise on this service" id="service-experts" />
          <CardGrid columns={3} className="mt-12">
            {experts.map((expert) => (
              <ExpertCard key={expert.slug} expert={expert} />
            ))}
          </CardGrid>
        </Section>
      ) : null}

      {/* Case study, only when one has been approved for publication. */}
      {caseStudies.length ? (
        <Section surface="white" labelledBy="service-cases">
          <SectionHeader eyebrow="In practice" title="Related work" id="service-cases" />
          <CardGrid columns={3} className="mt-12">
            {caseStudies.slice(0, 3).map((caseStudy) => (
              <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
            ))}
          </CardGrid>
        </Section>
      ) : null}

      {/* FAQ */}
      <Section surface="ivory" labelledBy="service-faq">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <div>
            <Eyebrow className="mb-4">Questions</Eyebrow>
            <h2 id="service-faq" className="text-h2">
              Frequently asked
            </h2>
          </div>
          <Accordion
            items={solution.faqs.map((faq) => ({
              title: faq.question,
              content: <p>{faq.answer}</p>,
            }))}
          />
        </div>
      </Section>

      {/* Related services and industries */}
      <Section surface="white" labelledBy="service-related">
        <h2 id="service-related" className="sr-only">
          Related services and industries
        </h2>

        {related.length ? (
          <>
            <SectionHeader eyebrow="Related" title="Services that connect to this" level={3} />
            <CardGrid columns={4} className="mt-10">
              {related.map((item) => (
                <SolutionCard key={item.slug} solution={item} />
              ))}
            </CardGrid>
          </>
        ) : null}

        {industries.length ? (
          <div className="mt-16">
            <SectionHeader eyebrow="Sectors" title="Where this applies" level={3} />
            <CardGrid columns={3} className="mt-10">
              {industries.map((industry) => (
                <IndustryCard key={industry.slug} industry={industry} />
              ))}
            </CardGrid>
          </div>
        ) : null}
      </Section>

      {/* Related insights */}
      {articles.length ? (
        <Section surface="ivory" labelledBy="service-insights">
          <SectionHeader
            eyebrow="Insights"
            title="Related reading"
            id="service-insights"
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
        heading={`Discuss your ${solution.title.toLowerCase()} requirements`}
        body="Tell us where you are now and what you are being asked for. We will tell you what closing that gap actually involves."
        primary={{ label: cta.discuss.label, href: cta.discuss.href }}
        secondary={{
          label: `View ${category.title}`,
          href: `/solutions/${category.slug}/`,
        }}
      />

      {/* A quiet route onward, so the page never dead-ends for a researcher. */}
      <Section surface="white" size="sm">
        <p className="text-sm text-muted">
          Building this capability internally instead?{' '}
          <Link href="/academy/" className="text-forest underline underline-offset-4">
            CER Academy delivers the same technical material as training
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
