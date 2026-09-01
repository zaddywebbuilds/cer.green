/**
 * Content cards.
 *
 * One file, because these share layout, spacing and hover treatment and would
 * otherwise drift apart. Each card links to exactly one destination, and the
 * whole card is not a link -- the heading link is, so that link text read out
 * of context still describes the destination.
 */

import Link from 'next/link';
import type {
  Article,
  CaseStudy,
  Course,
  Expert,
  Industry,
  Solution,
  SolutionCategory,
} from '@/types/content';
import { ArrowLink, Card } from '@/components/ui/primitives';
import { cn, formatDate, initials } from '@/lib/utils';
import { readingTime } from '@/lib/content';

const HOVER = 'transition-colors duration-200 hover:border-forest/40';

/** Category-level capability block used on the homepage and solutions hub. */
export function CapabilityCard({
  category,
  count,
}: {
  category: SolutionCategory;
  count?: number;
}) {
  return (
    <Card as="article" surface="white" className={cn('flex flex-col', HOVER)}>
      <h3 className="text-h4">
        <Link href={`/solutions/${category.slug}/`} className="hover:text-lime-ink">
          {category.title}
        </Link>
      </h3>
      <p className="mt-4 flex-1 text-ink-700">{category.summary}</p>
      {count ? (
        <p className="mt-4 text-sm text-muted">
          {count} {count === 1 ? 'service' : 'services'}
        </p>
      ) : null}
      <ArrowLink href={`/solutions/${category.slug}/`} className="mt-6">
        View capability
      </ArrowLink>
    </Card>
  );
}

export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <Card as="article" surface="white" className={cn('flex flex-col', HOVER)}>
      <h3 className="text-h4">
        <Link href={`/solutions/${solution.slug}/`} className="hover:text-lime-ink">
          {solution.title}
        </Link>
      </h3>
      <p className="mt-4 flex-1 text-ink-700">{solution.summary}</p>
      <ArrowLink href={`/solutions/${solution.slug}/`} className="mt-6">
        <span className="sr-only">{solution.title}: </span>Explore this service
      </ArrowLink>
    </Card>
  );
}

export function CourseCard({ course }: { course: Course }) {
  const scheduled = course.upcoming.filter((d) => d.status === 'scheduled');
  return (
    <Card as="article" surface="white" className={cn('flex flex-col', HOVER)}>
      <p className="eyebrow text-lime-ink">{course.duration}</p>
      <h3 className="mt-3 text-h4">
        <Link href={`/academy/courses/${course.slug}/`} className="hover:text-lime-ink">
          {course.title}
        </Link>
      </h3>
      <p className="mt-4 flex-1 text-ink-700">{course.outcome}</p>
      <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
        <div className="flex gap-2">
          <dt className="sr-only">Delivery formats</dt>
          <dd>{course.formats.join(' · ')}</dd>
        </div>
      </dl>
      <p className="mt-2 text-sm text-muted">
        {scheduled.length
          ? `Next date ${formatDate(scheduled[0]!.start)}`
          : 'Dates confirmed on enquiry'}
      </p>
      <ArrowLink href={`/academy/courses/${course.slug}/`} className="mt-6">
        <span className="sr-only">{course.title}: </span>View course
      </ArrowLink>
    </Card>
  );
}

export function ArticleCard({ article, category }: { article: Article; category?: string }) {
  return (
    <Card as="article" surface="white" className={cn('flex flex-col', HOVER)}>
      <p className="eyebrow text-lime-ink">
        {category ?? article.type}
      </p>
      <h3 className="mt-3 text-h4">
        <Link href={`/insights/${article.slug}/`} className="hover:text-lime-ink">
          {article.title}
        </Link>
      </h3>
      <p className="mt-4 flex-1 text-ink-700">{article.excerpt}</p>
      <p className="mt-6 text-sm text-muted">
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        <span aria-hidden="true"> &middot; </span>
        {readingTime(article)} min read
      </p>
      <ArrowLink href={`/insights/${article.slug}/`} className="mt-4">
        <span className="sr-only">{article.title}: </span>Read article
      </ArrowLink>
    </Card>
  );
}

export function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <Card as="article" surface="white" className={cn('flex flex-col', HOVER)}>
      <div className="flex items-center gap-4">
        {expert.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={expert.photo.src}
            alt={expert.photo.alt}
            width={72}
            height={72}
            className="h-18 w-18 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          /* Monogram stands in until CER supplies real photographs. No
             AI-generated headshot is ever used. */
          <span
            aria-hidden="true"
            className="grid h-18 w-18 shrink-0 place-items-center rounded-full bg-sage font-heading text-h4 font-semibold text-forest"
          >
            {initials(expert.name)}
          </span>
        )}
        <div>
          <h3 className="text-h4">
            <Link href={`/about/experts/${expert.slug}/`} className="hover:text-lime-ink">
              {expert.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted">{expert.role}</p>
        </div>
      </div>
      <p className="mt-5 flex-1 text-ink-700">{expert.shortBio}</p>
      <p className="mt-4 text-sm text-muted">{expert.expertise.slice(0, 3).join(' · ')}</p>
      <ArrowLink href={`/about/experts/${expert.slug}/`} className="mt-6">
        View {expert.name}&rsquo;s profile
      </ArrowLink>
    </Card>
  );
}

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <Card as="article" surface="white" className={cn('flex flex-col', HOVER)}>
      <h3 className="text-h4">
        <Link href={`/industries/${industry.slug}/`} className="hover:text-lime-ink">
          {industry.title}
        </Link>
      </h3>
      {/* The sector's actual problem, not a decorative icon. */}
      <p className="mt-4 flex-1 text-ink-700">{industry.challenge}</p>
      <ArrowLink href={`/industries/${industry.slug}/`} className="mt-6">
        <span className="sr-only">{industry.title}: </span>View sector expertise
      </ArrowLink>
    </Card>
  );
}

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Card as="article" surface="white" className={cn('flex flex-col', HOVER)}>
      <p className="eyebrow text-lime-ink">{caseStudy.projectType}</p>
      <h3 className="mt-3 text-h4">
        <Link href={`/case-studies/${caseStudy.slug}/`} className="hover:text-lime-ink">
          {caseStudy.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-muted">{caseStudy.clientDisplayName}</p>
      <p className="mt-4 flex-1 text-ink-700">{caseStudy.outcomeSummary}</p>
      <ArrowLink href={`/case-studies/${caseStudy.slug}/`} className="mt-6">
        <span className="sr-only">{caseStudy.title}: </span>Read case study
      </ArrowLink>
    </Card>
  );
}

/** Grid wrapper used by every card collection so gutters stay consistent. */
export function CardGrid({
  children,
  columns = 3,
  className,
}: {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const cols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  };
  return <div className={cn('grid gap-6', cols[columns], className)}>{children}</div>;
}
