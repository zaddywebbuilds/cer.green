'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CardGrid, CourseCard } from '@/components/ui/cards';
import { cn } from '@/lib/utils';
import type { Course, CourseCategory } from '@/types/content';

export function CoursesFilter({
  courses,
  categories,
}: {
  courses: Course[];
  categories: CourseCategory[];
}) {
  const params = useSearchParams();
  const selected = params.get('category') ?? '';
  const active = categories.find((c) => c.slug === selected);
  const filtered = active ? courses.filter((c) => c.category === active.slug) : courses;

  return (
    <>
      <nav aria-label="Filter courses by category">
        <ul className="flex flex-wrap gap-2">
          <li>
            <FilterLink href="/academy/courses/" active={!active}>All courses</FilterLink>
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <FilterLink
                href={`/academy/courses/?category=${cat.slug}`}
                active={active?.slug === cat.slug}
              >
                {cat.title}
              </FilterLink>
            </li>
          ))}
        </ul>
      </nav>

      <p aria-live="polite" className="mt-6 text-sm text-muted">
        Showing {filtered.length} {filtered.length === 1 ? 'programme' : 'programmes'}
        {active ? ` in ${active.title}` : ''}.
      </p>

      <CardGrid columns={3} className="mt-8">
        {filtered.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </CardGrid>
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
