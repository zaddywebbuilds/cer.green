import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { CtaBanner } from '@/components/sections/CtaBanner';
import { JsonLd } from '@/components/layout/JsonLd';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ArticleProgress } from '@/components/sections/ArticleProgress';
import {
  ArrowLink,
  Card,
  Section,
  SectionHeader,
} from '@/components/ui/primitives';
import { ArticleCard, CardGrid, SolutionCard } from '@/components/ui/cards';
import {
  getArticle,
  getArticleCategories,
  getArticles,
  getArticlesBySlugs,
  getExpert,
  getSolutionsBySlugs,
  readingTime,
} from '@/lib/content';
import { buildCrumbs, buildMetadata } from '@/lib/seo';
import { articleSchema, breadcrumbSchema, jsonLd } from '@/lib/schema';
import { cta, site } from '@/lib/site';
import { formatDate, initials } from '@/lib/utils';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const author = getExpert(article.authorSlug);
  return buildMetadata({
    seo: article.seo,
    path: `/insights/${slug}/`,
    fallbackTitle: article.title,
    type: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
    authors: author ? [author.name] : undefined,
  });
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const author = getExpert(article.authorSlug);
  const minutes = readingTime(article);
  const category = getArticleCategories().find((c) => c.slug === article.categorySlug);
  const relatedSolutions = getSolutionsBySlugs(article.relatedSolutions);
  const relatedArticles = getArticlesBySlugs(article.relatedArticles);

  const crumbs = buildCrumbs(
    { label: 'Insights', href: '/insights/' },
    { label: article.title, href: `/insights/${slug}/` },
  );

  const shareUrl = `${site.url}/insights/${slug}/`;

  return (
    <>
      <JsonLd
        data={jsonLd(breadcrumbSchema(crumbs), articleSchema(article, author, minutes))}
      />
      <ArticleProgress slug={slug} />

      <Section surface="dark" labelledBy="article-h1">
        <Breadcrumbs crumbs={crumbs} onDark />
        <p className="eyebrow text-lime">
          {article.type}
          {category ? ` · ${category.title}` : ''}
        </p>
        <h1 id="article-h1" className="mt-5 max-w-[24ch] text-display">
          {article.title}
        </h1>
        <p className="mt-7 max-w-[68ch] text-lead text-muted-invert">{article.excerpt}</p>

        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-invert">
          {author ? (
            <span className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid h-9 w-9 place-items-center rounded-full bg-forest-500 font-heading text-xs font-semibold text-lime"
              >
                {initials(author.name)}
              </span>
              <Link
                href={`/about/experts/${author.slug}/`}
                className="text-white underline underline-offset-4 hover:text-lime"
              >
                {author.name}
              </Link>
            </span>
          ) : null}
          <span>
            Published{' '}
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          </span>
          {article.updatedAt ? (
            <span>
              Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
            </span>
          ) : null}
          <span>{minutes} min read</span>
        </div>
      </Section>

      <Section surface="ivory" labelledBy="article-body">
        <h2 id="article-body" className="sr-only">
          Article
        </h2>

        <div className="grid gap-14 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-20">
          {/* Sticky table of contents. Subtle, and never overlaps the content. */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-labelledby="toc-heading">
              <h3 id="toc-heading" className="eyebrow text-lime-ink">
                On this page
              </h3>
              <ol className="mt-4 flex flex-col gap-2 border-l border-line pl-4 text-sm">
                {article.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-muted underline-offset-4 hover:text-forest hover:underline"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-8 border-t border-line pt-6">
              <h3 className="eyebrow text-lime-ink">Share</h3>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest underline underline-offset-4 hover:text-lime-ink"
                  >
                    Share on LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(shareUrl)}`}
                    className="text-forest underline underline-offset-4 hover:text-lime-ink"
                  >
                    Share by email
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          <article className="prose-cer">
            {article.intro.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? 'text-lead' : undefined}>
                {paragraph}
              </p>
            ))}

            {article.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 id={section.id}>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list?.length ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {article.tags?.length ? (
              <div className="not-prose mt-12 border-t border-line pt-6">
                <h2 className="eyebrow text-lime-ink">Topics</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 text-sm text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>
        </div>
      </Section>

      {author ? (
        <Section surface="white" size="sm" labelledBy="article-author">
          <h2 id="article-author" className="sr-only">
            About the author
          </h2>
          <Card surface="sage" className="flex max-w-3xl gap-6">
            <span
              aria-hidden="true"
              className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white font-heading text-h4 font-semibold text-forest"
            >
              {initials(author.name)}
            </span>
            <div>
              <p className="eyebrow text-lime-ink">Written by</p>
              <h3 className="mt-2 text-h4">{author.name}</h3>
              <p className="mt-1 text-sm text-muted">{author.role}</p>
              <p className="mt-4 text-ink-700">{author.shortBio}</p>
              <ArrowLink href={`/about/experts/${author.slug}/`} className="mt-5">
                View {author.name}&rsquo;s profile
              </ArrowLink>
            </div>
          </Card>
        </Section>
      ) : null}

      {relatedSolutions.length ? (
        <Section surface="ivory" labelledBy="article-services">
          <SectionHeader
            eyebrow="Related services"
            title="Where CER can help with this"
            id="article-services"
          />
          <CardGrid columns={3} className="mt-12">
            {relatedSolutions.map((solution) => (
              <SolutionCard key={solution.slug} solution={solution} />
            ))}
          </CardGrid>
        </Section>
      ) : null}

      {relatedArticles.length ? (
        <Section surface="white" labelledBy="article-related">
          <SectionHeader
            eyebrow="Related reading"
            title="More on this subject"
            id="article-related"
            action={<ArrowLink href="/insights/">View all insights</ArrowLink>}
          />
          <CardGrid columns={3} className="mt-12">
            {relatedArticles.map((related) => (
              <ArticleCard key={related.slug} article={related} />
            ))}
          </CardGrid>
        </Section>
      ) : null}

      <CtaBanner
        heading="Does this apply to your organisation?"
        body="If you are working through a requirement this article touches on, tell us where you are and we will tell you what it takes to close the gap."
        primary={{ label: cta.consulting.label, href: cta.consulting.href }}
        secondary={{ label: 'Explore our solutions', href: '/solutions/' }}
      />

      {/* A short, honest note on currency — this matters on regulatory content. */}
      <Section surface="white" size="sm">
        <p className="max-w-[80ch] text-sm text-muted">
          This article is general information, not advice for a specific organisation. Regulatory
          timelines and thresholds change; confirm the current position against the relevant
          regulator&rsquo;s guidance before acting on it.
        </p>
      </Section>
    </>
  );
}
