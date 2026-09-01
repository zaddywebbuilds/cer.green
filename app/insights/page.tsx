import type { Metadata } from 'next';
import Link from 'next/link';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Eyebrow, Section } from '@/components/ui/primitives';
import { ArticleCard, CardGrid } from '@/components/ui/cards';
import { getArticleCategories, getArticles, getArticlesByCategory } from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, jsonLd } from '@/lib/schema';
import { cta } from '@/lib/site';
import { cn, formatDate } from '@/lib/utils';
import { readingTime } from '@/lib/content';

export const metadata: Metadata = buildMetadata({
  path: '/insights/',
  seo: {
    title: 'Insights | ESG, Carbon & Sustainability Analysis',
    description:
      'Analysis on carbon accounting, ESG reporting, regulation and sustainable finance affecting organisations in Singapore and across Asia.',
    primaryKeyword: 'ESG insights Singapore',
    secondaryKeywords: ['sustainability regulation Asia', 'carbon accounting analysis'],
  },
});

const crumbs = buildCrumbs({ label: 'Insights', href: '/insights/' });

/**
 * Insights hub.
 *
 * Category filtering is done with links carrying a query parameter rather than
 * client-side state: server-rendered, linkable, back-button friendly and
 * usable without JavaScript. Filtered views are canonicalised to this page and
 * excluded from the sitemap, so the filter cannot spawn crawlable combinations.
 */
export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: selected } = await searchParams;
  const categories = getArticleCategories();
  const active = categories.find((c) => c.slug === selected);
  const articles = active ? getArticlesByCategory(active.slug) : getArticles();
  const [featured, ...rest] = articles;

  const categoryTitle = (slug: string) =>
    categories.find((c) => c.slug === slug)?.title ?? slug;

  return (
    <>
      <JsonLd data={jsonLd(breadcrumbSchema(crumbs))} />

      <Section surface="dark" labelledBy="insights-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <Eyebrow className="text-lime">Insights</Eyebrow>
        <h1 id="insights-h1" className="mt-5 max-w-[20ch] text-display">
          Analysis, not commentary.
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">
          Practical analysis of the carbon, ESG and sustainability requirements organisations in
          Asia are actually working through — written by the people delivering the engagements.
        </p>
      </Section>

      <Section surface="ivory" labelledBy="insights-list">
        <h2 id="insights-list" className="sr-only">
          {active ? `${active.title} insights` : 'All insights'}
        </h2>

        <nav aria-label="Filter insights by topic">
          <ul className="flex flex-wrap gap-2">
            <li>
              <FilterLink href="/insights/" active={!active}>
                All topics
              </FilterLink>
            </li>
            {categories.map((category) => (
              <li key={category.slug}>
                <FilterLink
                  href={`/insights/?category=${category.slug}`}
                  active={active?.slug === category.slug}
                >
                  {category.title}
                </FilterLink>
              </li>
            ))}
          </ul>
        </nav>

        <p aria-live="polite" className="mt-6 text-sm text-muted">
          Showing {articles.length} {articles.length === 1 ? 'article' : 'articles'}
          {active ? ` in ${active.title}` : ''}.
        </p>

        {/* Lead article, given editorial weight rather than sitting in the grid. */}
        {featured ? (
          <article className="mt-10 border-y border-line py-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end">
              <div>
                <p className="eyebrow text-lime-ink">
                  {featured.type} · {categoryTitle(featured.categorySlug)}
                </p>
                <h3 className="mt-4 text-h2">
                  <Link href={`/insights/${featured.slug}/`} className="hover:text-lime-ink">
                    {featured.title}
                  </Link>
                </h3>
                <p className="mt-5 max-w-[68ch] text-lead text-ink-700">{featured.excerpt}</p>
              </div>
              <p className="text-sm text-muted">
                <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time>
                <span aria-hidden="true"> · </span>
                {readingTime(featured)} min read
              </p>
            </div>
          </article>
        ) : (
          <p className="mt-10 text-ink-700">No articles in this topic yet.</p>
        )}

        {rest.length ? (
          <CardGrid columns={3} className="mt-12">
            {rest.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                category={categoryTitle(article.categorySlug)}
              />
            ))}
          </CardGrid>
        ) : null}
      </Section>

      <CtaBanner
        heading="Have a question this raises?"
        body="If something here is relevant to a requirement you are working through, tell us about it."
        primary={{ label: cta.consulting.label, href: cta.consulting.href }}
        secondary={{ label: 'Explore our solutions', href: '/solutions/' }}
      />
    </>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'inline-flex min-h-11 items-center rounded-full border px-4 font-heading text-sm font-medium transition-colors',
        active
          ? 'border-forest bg-forest text-white'
          : 'border-line bg-white text-ink-700 hover:border-forest/40',
      )}
    >
      {children}
    </Link>
  );
}
