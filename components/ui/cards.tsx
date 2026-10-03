/**
 * Content cards, editorial visual treatment.
 *
 * CapabilityCard and IndustryCard: full-bleed photography with dark gradient
 * overlay and white text, magazine / annual-report aesthetic.
 *
 * ArticleCard and CourseCard: photo header with structured body below.
 *
 * ExpertCard, SolutionCard, CaseStudyCard: refined white cards with
 * typographic accents.
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
import { ArrowLink } from '@/components/ui/primitives';
import { cn, formatDate, initials } from '@/lib/utils';
import { readingTime } from '@/lib/content';

// ── Curated Unsplash image maps ─────────────────────────────────────────────

/** Local assets need the base path; the remote ones below already resolve. */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const CAPABILITY_IMAGES: Record<string, string> = {
  'carbon-climate': `${BASE_PATH}/images/carbon-climate.webp`,
  'esg-sustainability': `${BASE_PATH}/images/esg-sustainability.webp`,
  'compliance-standards': `${BASE_PATH}/images/compliance-standards.webp`,
  'sustainable-finance': `${BASE_PATH}/images/sustainable-finance.webp`,
};

const INDUSTRY_IMAGES: Record<string, string> = {
  'financial-services': `${BASE_PATH}/images/industry-financial-services.webp`,
  'manufacturing-supply-chain': `${BASE_PATH}/images/industry-manufacturing-supply-chain.webp`,
  'energy-infrastructure': `${BASE_PATH}/images/industry-energy-infrastructure.webp`,
  technology: `${BASE_PATH}/images/industry-technology.webp`,
  healthcare: `${BASE_PATH}/images/industry-healthcare.webp`,
};

const ARTICLE_IMAGES: Record<string, string> = {
  'singapore-climate-reporting-what-applies-and-when':
    `${BASE_PATH}/images/article-singapore-climate-reporting.webp`,
  'scope-3-where-to-start':
    `${BASE_PATH}/images/article-scope-3-where-to-start.webp`,
  'cbam-what-asian-exporters-need':
    `${BASE_PATH}/images/article-cbam-asian-exporters.webp`,
  'what-assurance-providers-actually-test':
    `${BASE_PATH}/images/article-what-assurance-providers-test.webp`,
};

/**
 * Photography for a service, one image per slug. All nineteen services are
 * covered; a slug missing here renders a card with no media rather than a
 * broken image, so adding a service without its photograph degrades quietly.
 */
const SOLUTION_IMAGES: Record<string, string> = {
  'carbon-accounting': `${BASE_PATH}/images/solutions/carbon-accounting.webp`,
  'ghg-inventory': `${BASE_PATH}/images/solutions/ghg-inventory.webp`,
  'scope-1-2-3': `${BASE_PATH}/images/solutions/scope-1-2-3.webp`,
  'iso-14064': `${BASE_PATH}/images/solutions/iso-14064.webp`,
  'decarbonisation': `${BASE_PATH}/images/solutions/decarbonisation.webp`,
  'life-cycle-assessment': `${BASE_PATH}/images/solutions/life-cycle-assessment.webp`,
  'esg-strategy': `${BASE_PATH}/images/solutions/esg-strategy.webp`,
  'sustainability-reporting': `${BASE_PATH}/images/solutions/sustainability-reporting.webp`,
  'materiality-assessment': `${BASE_PATH}/images/solutions/materiality-assessment.webp`,
  'esg-data-kpis': `${BASE_PATH}/images/solutions/esg-data-kpis.webp`,
  'esg-risk-management': `${BASE_PATH}/images/solutions/esg-risk-management.webp`,
  'sustainable-procurement': `${BASE_PATH}/images/solutions/sustainable-procurement.webp`,
  'iso-advisory': `${BASE_PATH}/images/solutions/iso-advisory.webp`,
  'cbam-readiness': `${BASE_PATH}/images/solutions/cbam-readiness.webp`,
  'assurance-readiness': `${BASE_PATH}/images/solutions/assurance-readiness.webp`,
  'governance-controls': `${BASE_PATH}/images/solutions/governance-controls.webp`,
  'green-finance': `${BASE_PATH}/images/solutions/green-finance.webp`,
  'climate-risk': `${BASE_PATH}/images/solutions/climate-risk.webp`,
  'financed-emissions': `${BASE_PATH}/images/solutions/financed-emissions.webp`,
};

/** The photograph for a service, where one has been supplied. */
export function solutionImage(slug: string): string | undefined {
  return SOLUTION_IMAGES[slug];
}

/**
 * Course photos are keyed by category, so every course in a category shares
 * one. This overrides that per course, for programmes CER has photographed
 * rather than represented by their subject area.
 */
const COURSE_IMAGES_BY_SLUG: Record<string, string> = {
  'esg-essentials': `${BASE_PATH}/images/course-esg-essentials.webp`,
  'carbon-literacy-for-professionals': `${BASE_PATH}/images/course-carbon-literacy.webp`,
  'iso-14064-ghg-emission-awareness': `${BASE_PATH}/images/courses/iso-14064-hero.webp`,
  'sustainable-export-practices-and-compliance': `${BASE_PATH}/images/course-cbam-export.webp`,
};

const DEFAULT_IMAGE = `${BASE_PATH}/images/cer-default.webp`;

// ── Shared helpers ───────────────────────────────────────────────────────────

const CARD_HOVER = 'transition-colors duration-200 hover:border-forest/40';

/** Pill badge overlaid on a photo, e.g. duration, category. */
function PhotoBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute bottom-3 left-3 rounded-[2px] bg-forest-900/85 px-2.5 py-1 font-heading text-xs font-semibold uppercase tracking-wider text-lime backdrop-blur-sm">
      {children}
    </span>
  );
}

// ── Cards ────────────────────────────────────────────────────────────────────

/** Split-layout editorial card: crisp photo surface on top, dark content below. */
export function CapabilityCard({
  category,
  count,
}: {
  category: SolutionCategory;
  count?: number;
}) {
  const img = CAPABILITY_IMAGES[category.slug] ?? DEFAULT_IMAGE;
  return (
    <article className="group flex flex-col overflow-hidden rounded-(--radius-card)">
      {/* Photo, full surface, clearly visible */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
        />
        {count ? (
          <span className="absolute right-3 top-3 rounded-[2px] bg-forest-900/80 px-2.5 py-1 font-heading text-xs font-semibold uppercase tracking-wider text-lime backdrop-blur-sm">
            {count} {count === 1 ? 'service' : 'services'}
          </span>
        ) : null}
      </div>
      {/* Content, solid dark forest, crisp edge against photo */}
      <div className="flex flex-1 flex-col bg-forest p-6">
        <h3 className="text-h4 font-semibold text-white">
          <Link
            href={`/solutions/${category.slug}/`}
            className="transition-colors duration-200 hover:text-lime"
          >
            {category.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-invert">
          {category.summary}
        </p>
        <ArrowLink href={`/solutions/${category.slug}/`} className="mt-5" onDark>
          View capability
        </ArrowLink>
      </div>
    </article>
  );
}

/**
 * Service card, led by a photograph of the work itself.
 *
 * The media slot is a fixed ratio box that its contents fill and crop to.
 * A photograph fills it today and a muted loop can fill it later without the
 * card changing shape, so motion is an added element rather than a rebuild.
 *
 * Whatever sits in the slot is decorative in the accessibility sense: it
 * carries nothing the text does not, so it stays hidden from assistive
 * technology and the title and summary remain the only source of meaning.
 */
export function SolutionCard({ solution }: { solution: Solution }) {
  const photo = SOLUTION_IMAGES[solution.slug];
  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-(--radius-card) border border-line bg-white',
        'transition-[border-color,box-shadow,transform] duration-300 ease-out',
        'hover:-translate-y-0.5 hover:border-forest/40 hover:shadow-[0_16px_34px_-20px_rgba(18,60,50,0.45)]',
      )}
    >
      {photo ? (
        <div className="relative aspect-[20/9] w-full overflow-hidden bg-forest-700">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="h-1.5 w-full bg-lime" />
      <div className="flex flex-1 flex-col p-7 md:p-8">
        <h3 className="text-h4">
          <Link
            href={`/solutions/${solution.slug}/`}
            className="transition-colors duration-200 hover:text-lime-ink"
          >
            {solution.title}
          </Link>
        </h3>
        <p className="mt-4 flex-1 text-ink-700">{solution.summary}</p>
        <ArrowLink href={`/solutions/${solution.slug}/`} className="mt-6">
          <span className="sr-only">{solution.title}: </span>Explore this service
        </ArrowLink>
      </div>
    </article>
  );
}

/** Course card with a category-matched photo header. */
export function CourseCard({ course }: { course: Course }) {
  const scheduled = course.upcoming.filter((d) => d.status === 'scheduled');
  const img = COURSE_IMAGES_BY_SLUG[course.slug] ?? DEFAULT_IMAGE;
  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-(--radius-card) border border-line bg-white',
        CARD_HOVER,
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <PhotoBadge>{course.duration}</PhotoBadge>
      </div>
      <div className="flex flex-1 flex-col p-7 md:p-8">
        <h3 className="text-h4">
          <Link
            href={`/academy/courses/${course.slug}/`}
            className="transition-colors duration-200 hover:text-lime-ink"
          >
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
      </div>
    </article>
  );
}

/** Article card with an editorial photo header. */
export function ArticleCard({ article, category }: { article: Article; category?: string }) {
  const img = ARTICLE_IMAGES[article.slug] ?? DEFAULT_IMAGE;
  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-(--radius-card) border border-line bg-white',
        CARD_HOVER,
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <PhotoBadge>{category ?? article.type}</PhotoBadge>
      </div>
      <div className="flex flex-1 flex-col p-7 md:p-8">
        <h3 className="text-h4">
          <Link
            href={`/insights/${article.slug}/`}
            className="transition-colors duration-200 hover:text-lime-ink"
          >
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
      </div>
    </article>
  );
}

/** Expert card with monogram avatar and expertise tags. */
export function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-(--radius-card) border border-line bg-white p-7 md:p-8',
        CARD_HOVER,
      )}
    >
      <div className="flex items-center gap-5">
        {expert.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${BASE_PATH}${expert.photo.src}`}
            alt={expert.photo.alt}
            width={80}
            height={80}
            className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-sage-dark"
            loading="lazy"
          />
        ) : (
          /* Monogram stands in until CER supplies real photographs.
             No AI-generated headshot is ever used. */
          <span
            aria-hidden="true"
            className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-sage font-heading text-h4 font-semibold text-forest ring-2 ring-sage-dark"
          >
            {initials(expert.name)}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="text-h4">
            <Link
              href={`/about/experts/${expert.slug}/`}
              className="transition-colors duration-200 hover:text-lime-ink"
            >
              {expert.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted">{expert.role}</p>
        </div>
      </div>
      <div className="mt-5 h-px w-full bg-sage-dark" />
      <p className="mt-5 flex-1 text-ink-700">{expert.shortBio}</p>
      <p className="mt-4 text-sm font-semibold text-forest">
        {expert.expertise.slice(0, 3).join(' · ')}
      </p>
      <ArrowLink href={`/about/experts/${expert.slug}/`} className="mt-6">
        View {expert.name}&rsquo;s profile
      </ArrowLink>
    </article>
  );
}

/** Split-layout editorial card for industry sectors. */
export function IndustryCard({ industry }: { industry: Industry }) {
  const img = INDUSTRY_IMAGES[industry.slug] ?? DEFAULT_IMAGE;
  return (
    <article className="group flex flex-col overflow-hidden rounded-(--radius-card)">
      {/* Photo, full surface, clearly visible */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
        />
      </div>
      {/* Content, solid dark forest */}
      <div className="flex flex-1 flex-col bg-forest p-6">
        <h3 className="text-h4 font-semibold text-white">
          <Link
            href={`/industries/${industry.slug}/`}
            className="transition-colors duration-200 hover:text-lime"
          >
            {industry.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-invert">
          {industry.challenge}
        </p>
        <ArrowLink href={`/industries/${industry.slug}/`} className="mt-5" onDark>
          <span className="sr-only">{industry.title}: </span>View sector expertise
        </ArrowLink>
      </div>
    </article>
  );
}

/** Case study card with lime top strip and structured project detail. */
export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-(--radius-card) border border-line bg-white',
        CARD_HOVER,
      )}
    >
      <div className="h-1.5 w-full bg-lime" />
      <div className="flex flex-1 flex-col p-7 md:p-8">
        <p className="eyebrow text-lime-ink">{caseStudy.projectType}</p>
        <h3 className="mt-3 text-h4">
          <Link
            href={`/case-studies/${caseStudy.slug}/`}
            className="transition-colors duration-200 hover:text-lime-ink"
          >
            {caseStudy.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-muted">{caseStudy.clientDisplayName}</p>
        <p className="mt-4 flex-1 text-ink-700">{caseStudy.outcomeSummary}</p>
        <ArrowLink href={`/case-studies/${caseStudy.slug}/`} className="mt-6">
          <span className="sr-only">{caseStudy.title}: </span>Read case study
        </ArrowLink>
      </div>
    </article>
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
