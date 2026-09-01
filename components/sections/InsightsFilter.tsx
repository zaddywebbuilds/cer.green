'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArticleCard, CardGrid } from '@/components/ui/cards';
import { cn, formatDate } from '@/lib/utils';
import type { Article, ArticleCategory } from '@/types/content';
import { readingTime } from '@/lib/content';

export function InsightsFilter({
  articles,
  categories,
}: {
  articles: Article[];
  categories: ArticleCategory[];
}) {
  const params = useSearchParams();
  const selected = params.get('category') ?? '';
  const active = categories.find((c) => c.slug === selected);
  const filtered = active ? articles.filter((a) => a.categorySlug === active.slug) : articles;
  const [featured, ...rest] = filtered;

  const categoryTitle = (slug: string) =>
    categories.find((c) => c.slug === slug)?.title ?? slug;

  return (
    <>
      <nav aria-label="Filter insights by topic">
        <ul className="flex flex-wrap gap-2">
          <li>
            <FilterLink href="/insights/" active={!active}>All topics</FilterLink>
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
        Showing {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
        {active ? ` in ${active.title}` : ''}.
      </p>

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
