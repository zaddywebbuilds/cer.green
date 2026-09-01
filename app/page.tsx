import type { Metadata } from 'next';
import Link from 'next/link';

import { Hero } from '@/components/sections/Hero';
import { Methodology } from '@/components/sections/Methodology';
import { CtaBanner } from '@/components/sections/CtaBanner';
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
      <Section surface="ivory" labelledBy="pillars-heading">
        <h2 id="pillars-heading" className="sr-only">
          CER Solutions and CER Academy
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card surface="white" className="flex flex-col p-8 md:p-10">
            <Eyebrow>Advisory. Strategy. Implementation.</Eyebrow>
            <h3 className="mt-4 text-h3">CER Solutions</h3>
            <p className="mt-5 text-ink-700">
              We help organisations measure, plan and act on ESG, carbon, climate, regulatory and
              sustainability requirements.
            </p>
            <ul className="mt-7 grid flex-1 gap-2.5">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/solutions/${category.slug}/`}
                    className="flex items-center justify-between gap-4 border-b border-line py-3 font-heading font-medium text-ink hover:text-lime-ink"
                  >
                    {category.title}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Button href="/solutions/" className="mt-8 self-start">
              Explore CER Solutions
            </Button>
          </Card>

          <Card surface="dark" className="flex flex-col p-8 md:p-10">
            <Eyebrow className="text-muted-invert">Knowledge. Skills. Certification.</Eyebrow>
            <h3 className="mt-4 text-h3">CER Academy</h3>
            <p className="mt-5 text-muted-invert">
              We build sustainability capability across professionals, leadership teams and whole
              organisations.
            </p>
            <ul className="mt-7 grid flex-1 gap-2.5">
              {[
                { label: 'Professional courses', href: '/academy/courses/' },
                { label: 'Corporate training', href: '/academy/corporate-training/' },
                { label: 'Executive programmes', href: '/academy/executive-programmes/' },
                { label: 'Custom programmes', href: '/academy/custom-training/' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-4 border-b border-line-invert py-3 font-heading font-medium text-white hover:text-lime"
                  >
                    {item.label}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Button href="/academy/" variant="invert" className="mt-8 self-start">
              Explore CER Academy
            </Button>
          </Card>
        </div>
      </Section>

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
      <Section surface="ivory" labelledBy="why-heading">
        <SectionHeader eyebrow="Why CER" title="Evidence, not adjectives" id="why-heading" />

        <div className="mt-8 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Singapore-based, regionally relevant',
              body: 'CER operates from Singapore and works with organisations across Asia. Requirements arriving from Europe and from local regulators land differently in this region, and the advice reflects that.',
            },
            {
              title: 'Multidisciplinary expertise',
              body: 'Carbon, ESG, risk, standards and finance in one team. The experts behind the advice come from actuarial science, risk management, wealth management and business consultancy.',
            },
            {
              title: 'Strategy through implementation',
              body: 'CER does not stop at a report. Engagements run through to data collection processes, controls, documentation and internal handover.',
            },
            {
              title: 'Capability building',
              body: 'Consulting and Academy operate together, so an organisation can build the internal capability to run a programme rather than depending on an adviser indefinitely.',
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-heading text-h4 font-semibold">{item.title}</h3>
              <p className="mt-4 text-ink-700">{item.body}</p>
            </div>
          ))}
        </div>

        {/*
          No headline metrics are shown here. CER has not published verified
          figures for years in operation, client numbers, countries served or
          emissions reduced, and inventing them would be the fastest way to lose
          a sustainability director's trust. Add a MetricBlock row here once CER
          confirms figures it can evidence. See docs/CONTENT-GUIDE.md.
        */}
      </Section>

      {/* ---- Methodology ------------------------------------------------- */}
      <Methodology surface="sage" />

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

      {/* ---- Insights ----------------------------------------------------- */}
      <Section surface="ivory" labelledBy="insights-heading">
        <SectionHeader
          eyebrow="Insights"
          title="Latest thinking"
          id="insights-heading"
          action={<ArrowLink href="/insights/">View all insights</ArrowLink>}
        />
        <CardGrid columns={3} className="mt-8">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </CardGrid>
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
