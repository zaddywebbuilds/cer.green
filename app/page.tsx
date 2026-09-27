import type { Metadata } from 'next';
import Link from 'next/link';

import { Hero } from '@/components/sections/Hero';
import { Methodology } from '@/components/sections/Methodology';
import { CtaBanner } from '@/components/sections/CtaBanner';
import {
  ArrowLink,
  Button,
  Eyebrow,
  Paragraphs,
  Section,
  SectionHeader,
  TickList,
} from '@/components/ui/primitives';
import {
  ArticleCard,
  CapabilityCard,
  CardGrid,
  CaseStudyCard,
  CourseCard,
  ExpertCard,
  IndustryCard,
} from '@/components/ui/cards';
import {
  getArticles,
  getCaseStudies,
  getCourses,
  getExperts,
  getIndustries,
  getPartners,
  getSolutionCategories,
  getSolutionsByCategory,
} from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { cta, site } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  path: '/',
  seo: {
    title: `${site.name} | ESG, Carbon & Sustainability Consultancy Singapore`,
    description:
      'CER turns sustainability, ESG and carbon requirements into measurable business action. Singapore-based advisory and professional training for organisations across Asia.',
    primaryKeyword: 'ESG consultancy Singapore',
    secondaryKeywords: [
      'sustainability consultant Singapore',
      'carbon accounting Singapore',
      'ESG training Singapore',
    ],
  },
});

export default function HomePage() {
  const categories = getSolutionCategories();
  const industries = getIndustries().slice(0, 6);
  const experts = getExperts();
  const articles = getArticles().slice(0, 3);
  const courses = getCourses().slice(0, 3);
  const caseStudies = getCaseStudies().slice(0, 3);
  const partners = getPartners();

  return (
    <>
      <Hero />

      {/* ---- Trust bar -------------------------------------------------- */}
      <Section surface="ivory" size="sm" labelledBy="trust-heading">
        <h2 id="trust-heading" className="font-heading text-h4 font-semibold">
          Trusted expertise. Practical implementation.
        </h2>
        <p className="mt-3 max-w-[70ch] text-muted">
          CER collaborates with the organisations below on training delivery, project work and
          technology. These are collaborations rather than client relationships.
        </p>

        {/* Names are rendered as text until CER supplies approved, licensed logo
            assets. Text is accessible by default and cannot be stretched. */}
        <ul className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
          {partners.map((partner) => (
            <li key={partner.name} className="font-heading text-[0.95rem] font-medium text-muted">
              {partner.name}
            </li>
          ))}
        </ul>

        <ArrowLink href="/about/partners/" className="mt-8">
          View partner organisations
        </ArrowLink>
      </Section>

      {/* ---- Business problem ------------------------------------------- */}
      <Section surface="white" labelledBy="problem-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Eyebrow className="mb-4">The context</Eyebrow>
            <h2 id="problem-heading" className="text-h2">
              Sustainability is no longer a side initiative.
            </h2>
            <Paragraphs
              className="mt-6 text-ink-700"
              items={[
                'Reporting obligations now sit in listing rules. Customers pass emissions requirements down their supply chains. Lenders ask borrowers for the data they need for their own disclosures. Each request arrives separately, and each assumes the organisation already has the underlying measurement.',
                'CER helps organisations understand what matters, determine what action is required, and implement practical solutions.',
              ]}
            />
          </div>

          <div className="lg:pt-14">
            <TickList
              columns
              items={[
                'Mandatory climate reporting',
                'Carbon measurement and Scope 3',
                'Climate and transition risk',
                'Regulatory obligations',
                'Supply-chain requirements',
                'Investor and lender scrutiny',
                'ESG data that cannot be traced',
                'Assurance readiness',
              ]}
            />
          </div>
        </div>
      </Section>

      {/* ---- Two business pillars --------------------------------------- */}
      <section className="bg-forest-700 text-white on-dark" data-surface="dark">
        <h2 className="sr-only" id="pillars-heading">CER Solutions and CER Academy</h2>
        <div className="shell grid py-(--spacing-section) lg:grid-cols-2">
          {/* Solutions */}
          <div className="py-10 lg:border-r lg:border-line-invert lg:pr-12 lg:py-0">
            <p className="eyebrow text-lime">Advisory · Strategy · Implementation</p>
            <h3 className="mt-5 text-h2 text-white">CER Solutions</h3>
            <p className="mt-5 max-w-[44ch] text-muted-invert">
              We help organisations measure, plan and act on ESG, carbon, climate, regulatory and
              sustainability requirements.
            </p>
            <ul className="mt-8 flex flex-col">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/solutions/${category.slug}/`}
                    className="flex items-center justify-between gap-4 border-b border-line-invert py-3.5 font-heading font-medium text-white/90 transition-colors hover:text-lime"
                  >
                    {category.title}
                    <span aria-hidden="true" className="text-lime/60">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Button href="/solutions/" variant="invert" className="mt-8">
              Explore CER Solutions
            </Button>
          </div>

          {/* Academy */}
          <div className="border-t border-line-invert pt-10 lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="eyebrow text-lime">Knowledge · Skills · Certification</p>
            <h3 className="mt-5 text-h2 text-white">CER Academy</h3>
            <p className="mt-5 max-w-[44ch] text-muted-invert">
              We build sustainability capability across professionals, leadership teams and whole
              organisations.
            </p>
            <ul className="mt-8 flex flex-col">
              {[
                { label: 'Professional courses', href: '/academy/courses/' },
                { label: 'Corporate training', href: '/academy/corporate-training/' },
                { label: 'Executive programmes', href: '/academy/executive-programmes/' },
                { label: 'Custom programmes', href: '/academy/custom-training/' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-4 border-b border-line-invert py-3.5 font-heading font-medium text-white/90 transition-colors hover:text-lime"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-lime/60">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Button href="/academy/" variant="invert" className="mt-8">
              Explore CER Academy
            </Button>
          </div>
        </div>
      </section>

      {/* ---- Four core capabilities -------------------------------------- */}
      <Section surface="white" labelledBy="capabilities-heading">
        <SectionHeader
          eyebrow="CER Solutions"
          title="Where CER can help"
          id="capabilities-heading"
          lead="Four capability areas, each addressing a distinct set of business obligations."
        />
        <CardGrid columns={4} className="mt-8">
          {categories.map((category) => (
            <CapabilityCard
              key={category.slug}
              category={category}
              count={getSolutionsByCategory(category.slug).length}
            />
          ))}
        </CardGrid>
      </Section>

      {/* ---- Why CER ---------------------------------------------------- */}
      <section className="bg-forest text-white on-dark" data-surface="dark">
        <div className="shell grid gap-14 py-(--spacing-section) lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-20">
          {/* Left: big statement */}
          <div>
            <p className="eyebrow text-lime" id="why-heading">Why CER</p>
            <h2
              aria-labelledby="why-heading"
              className="mt-6 font-heading font-semibold text-white"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', lineHeight: 1.12, letterSpacing: '-0.02em' }}
            >
              Different disciplines.<br />One sustainability strategy.
            </h2>
            <p className="mt-6 max-w-[42ch] text-muted-invert">
              Carbon, ESG, risk, standards and finance don&rsquo;t arrive as separate problems. CER&rsquo;s
              team spans all of them — so the strategy connects, rather than leaving gaps between advisers.
            </p>
            <ArrowLink href="/about/" className="mt-8" onDark>About CER</ArrowLink>
          </div>

          {/* Right: discipline grid converging to action */}
          <div>
            <div className="grid grid-cols-2 gap-px bg-line-invert sm:grid-cols-3">
              {[
                'ESG Strategy',
                'Carbon Accounting',
                'Climate Risk',
                'Sustainable Finance',
                'ISO Standards',
                'Professional Training',
              ].map((discipline) => (
                <div key={discipline} className="bg-forest-700 px-5 py-4">
                  <p className="font-heading text-sm font-semibold text-white/80">{discipline}</p>
                </div>
              ))}
            </div>
            <div className="mt-px bg-lime px-5 py-4">
              <p className="font-heading text-sm font-semibold text-forest">→ Measurable business action</p>
            </div>

            {/*
              No headline metrics shown. CER has not published verified figures
              for years, client count or emissions reduced. Add MetricBlock here
              once CER confirms figures it can evidence. (docs/CONTENT-GUIDE.md)
            */}
          </div>
        </div>
      </section>

      {/* ---- Methodology ------------------------------------------------- */}
      <Methodology />

      {/* ---- Industries -------------------------------------------------- */}
      <Section surface="white" labelledBy="industries-heading">
        <SectionHeader
          eyebrow="Industries"
          title="Experience shaped around your operating environment"
          id="industries-heading"
          lead="Sustainability requirements land differently depending on what an organisation does. These are the sectors CER works in."
          action={<ArrowLink href="/industries/">View all industries</ArrowLink>}
        />
        <CardGrid columns={3} className="mt-8">
          {industries.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </CardGrid>
      </Section>

      {/* ---- Case studies ------------------------------------------------
          Rendered only when CER has approved case studies. Until then the
          section is omitted rather than filled with invented projects. In
          development an editor note appears in its place. ------------------ */}
      {caseStudies.length > 0 ? (
        <Section surface="ivory" labelledBy="cases-heading">
          <SectionHeader
            eyebrow="Case studies"
            title="Sustainability in practice"
            id="cases-heading"
            action={<ArrowLink href="/case-studies/">View case studies</ArrowLink>}
          />
          <CardGrid columns={3} className="mt-8">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
            ))}
          </CardGrid>
        </Section>
      ) : process.env.NODE_ENV !== 'production' ? (
        <Section surface="ivory" size="sm">
          <div className="rounded-(--radius-card) border-2 border-dashed border-[#c9a227] bg-[#fdf8e8] p-8">
            <p className="eyebrow text-[#7a5c00]">Editor note — not shown in production</p>
            <h2 className="mt-3 text-h3">Case studies section is ready and empty</h2>
            <p className="mt-4 max-w-[70ch] text-ink-700">
              The case study system is fully built: listing page, detail template, schema, cards
              and cross-linking. No case studies are published because none have been verified and
              approved. Add one in <code>content/case-studies.ts</code> using the template entry,
              set its status to published, and this section appears automatically.
            </p>
          </div>
        </Section>
      ) : null}

      {/* ---- Experts ----------------------------------------------------- */}
      <Section surface="ivory" labelledBy="experts-heading">
        <SectionHeader
          eyebrow="Our people"
          title="Expertise behind the advice"
          id="experts-heading"
          action={<ArrowLink href="/about/experts/">View all experts</ArrowLink>}
        />
        <CardGrid columns={3} className="mt-8">
          {experts.map((expert) => (
            <ExpertCard key={expert.slug} expert={expert} />
          ))}
        </CardGrid>
      </Section>

      {/* ---- Academy feature --------------------------------------------- */}
      <Section surface="white" labelledBy="academy-heading">
        <SectionHeader
          eyebrow="CER Academy"
          title="Build sustainability capability inside your organisation"
          id="academy-heading"
          lead="Professional courses, corporate training, executive programmes and custom workshops — delivered by the same practitioners who run CER's advisory engagements."
          action={
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={cta.academy.href}>{cta.academy.label}</Button>
              <Button href={cta.corporateTraining.href} variant="secondary">
                {cta.corporateTraining.label}
              </Button>
            </div>
          }
        />
        <CardGrid columns={3} className="mt-8">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </CardGrid>
      </Section>

      {/* ---- Insights — magazine layout --------------------------------- */}
      <Section surface="ivory" labelledBy="insights-heading">
        <div className="flex items-baseline justify-between gap-8">
          <div>
            <p className="eyebrow text-muted">
              <span className="text-lime-ink">//</span> Insights
            </p>
            <h2 id="insights-heading" className="mt-3 text-h2">Latest thinking</h2>
          </div>
          <ArrowLink href="/insights/" className="hidden shrink-0 sm:flex">View all insights</ArrowLink>
        </div>

        {articles.length > 0 && (
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            {/* Featured article */}
            <ArticleCard article={articles[0]!} />

            {/* Supporting articles */}
            {articles.length > 1 && (
              <div className="flex flex-col gap-6">
                {articles.slice(1).map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            )}
          </div>
        )}

        <ArrowLink href="/insights/" className="mt-8 sm:hidden">View all insights</ArrowLink>
      </Section>

      {/* ---- Final CTA ---------------------------------------------------- */}
      <CtaBanner
        heading="What sustainability challenge are you working through?"
        body="Speak with CER about your ESG, carbon, climate, sustainability or training requirements."
        primary={{ label: 'Start a conversation', href: cta.consulting.href }}
        secondary={{ label: 'Contact CER', href: '/contact/' }}
      />
    </>
  );
}
