import Link from 'next/link';
import type { Crumb } from '@/lib/seo';
import { cn } from '@/lib/utils';

/**
 * Breadcrumb trail. The current page is the last crumb, rendered as text with
 * `aria-current` rather than as a link to itself.
 */
export function Breadcrumbs({ crumbs, onDark }: { crumbs: Crumb[]; onDark?: boolean }) {
  if (crumbs.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {isLast ? (
                <span
                  aria-current="page"
                  className={onDark ? 'text-muted-invert' : 'text-muted'}
                >
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.href}
                    className={cn(
                      'underline-offset-4 hover:underline',
                      onDark ? 'text-lime' : 'text-forest',
                    )}
                  >
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true" className={onDark ? 'text-muted-invert' : 'text-muted'}>
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
