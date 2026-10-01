import type { Metadata } from 'next';

import { Methodology } from '@/components/sections/Methodology';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import {
  ArrowLink,
  Eyebrow,
  Section,
  SectionHeader,
} from '@/components/ui/primitives';
import {
  ArticleCard,
  CardGrid,
  ExpertCard,
  IndustryCard,
  SolutionCard,
} from '@/components/ui/cards';
import {
  getArticles,
  getExperts,
  getIndustries,
  getSolutionsGrouped,
} from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import { cta } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  path: '/solutions/',
  seo: {
    title: 'Sustainability & ESG Solutions Singapore',
    description:
      'ESG, carbon, climate, compliance and sustainable finance advisory for organisations in Singapore and across Asia. Strategy through implementation.',
    primaryKeyword: 'sustainability consultancy Singapore',
    secondaryKeywords: ['ESG consultancy Singapore', 'carbon consultant Asia'],
  },
});

const crumbs = buildCrumbs({ label: 'Solutions', href: '/solutions/' });

export default function SolutionsPage() {
  const grouped = getSolutionsGrouped();
  const industries = getIndustries().slice(0, 3);
  const experts = getExperts();
  const articles = getArticles().slice(0, 3);

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs))} />

      <Section surface="dark" labelledBy="solutions-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">CER Solutions</Eyebrow>
        <h1 id="solutions-h1" className="mt-5 max-w-[20ch] text-display">
          Sustainability expertise built around business action.
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">
          CER works across four capability areas. Each addresses a distinct set of obligations, and
          most engagements draw on more than one, because measurement, reporting, risk and
          financing are rarely separable in practice.
        </p>
      </Section>

      {grouped.map((group, index) => (
        <Section
          key={group.category.slug}
          id={group.category.slug}
          surface={index % 2 === 0 ? 'ivory' : 'white'}
          labelledBy={`${group.category.slug}-heading`}
        >
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div>
              <Eyebrow className="mb-4">{`0${index + 1}`}</Eyebrow>
              <h2 id={`${group.category.slug}-heading`} className="text-h2">
                {group.category.title}
              </h2>
              <p className="mt-5 max-w-[62ch] text-lead">{group.category.summary}</p>
              <ArrowLink href={`/solutions/${group.category.slug}/`} className="mt-7">
                View {group.category.title} capability
              </ArrowLink>
            </div>

            <div className="flex flex-col gap-7">
              <div>
                <h3 className="eyebrow text-lime-ink">The business problem</h3>
                <p className="mt-3 text-ink-700">{group.category.problem}</p>
              </div>
              <div>
                <h3 className="eyebrow text-lime-ink">What CER does</h3>
                <p className="mt-3 text-ink-700">{group.category.capability}</p>
              </div>
              <div>
                <h3 className="eyebrow text-lime-ink">Likely outcome</h3>
                <p className="mt-3 text-ink-700">{group.category.outcome}</p>
              </div>
            </div>
          </div>

          <CardGrid columns={3} className="mt-14">
            {group.solutions.map((solution) => (
              <SolutionCard key={solution.slug} solution={solution} />
            ))}
          </CardGrid>
        </Section>
      ))}

      <Methodology surface="sage" compact />

      <Section surface="white" labelledBy="solutions-industries">
        <SectionHeader
          eyebrow="Industries"
          title="Applied to your operating environment"
          id="solutions-industries"
          action={<ArrowLink href="/industries/">View all industries</ArrowLink>}
        />
        <CardGrid columns={3} className="mt-12">
          {industries.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </CardGrid>
      </Section>

      <Section surface="ivory" labelledBy="solutions-experts">
        <SectionHeader
          eyebrow="Our people"
          title="Who you will be working with"
          id="solutions-experts"
          action={<ArrowLink href="/about/experts/">View all experts</ArrowLink>}
        />
        <CardGrid columns={3} className="mt-12">
          {experts.map((expert) => (
            <ExpertCard key={expert.slug} expert={expert} />
          ))}
        </CardGrid>
      </Section>

      <Section surface="white" labelledBy="solutions-insights">
        <SectionHeader
          eyebrow="Insights"
          title="Related thinking"
          id="solutions-insights"
          action={<ArrowLink href="/insights/">View all insights</ArrowLink>}
        />
        <CardGrid columns={3} className="mt-12">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </CardGrid>
      </Section>

      <CtaBanner
        heading="Which of these applies to you?"
        body="Tell us what you are working through and we will tell you which capability fits, including where the answer is that you do not need us yet."
        primary={{ label: cta.discuss.label, href: cta.discuss.href }}
        secondary={{ label: 'Explore CER Academy', href: '/academy/' }}
      />
    </>
  );
}
