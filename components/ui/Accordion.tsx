/**
 * Accordion, built on native `<details>` / `<summary>`.
 *
 * Chosen deliberately over a JavaScript disclosure widget: it is keyboard
 * operable, exposed correctly to screen readers, works before hydration, and
 * lets the content be found by in-page search in browsers that support it.
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface AccordionItem {
  id?: string;
  title: string;
  content: ReactNode;
}

export function Accordion({
  items,
  className,
  defaultOpenFirst,
}: {
  items: AccordionItem[];
  className?: string;
  defaultOpenFirst?: boolean;
}) {
  if (!items.length) return null;

  return (
    <div className={cn('divide-y divide-line border-y border-line', className)}>
      {items.map((item, index) => (
        <details
          key={item.id ?? item.title}
          id={item.id}
          open={defaultOpenFirst && index === 0}
          className="group"
        >
          <summary
            className={cn(
              'flex cursor-pointer list-none items-start justify-between gap-6 py-5',
              'font-heading text-h4 font-semibold marker:hidden',
              '[&::-webkit-details-marker]:hidden',
            )}
          >
            <span>{item.title}</span>
            <span
              aria-hidden="true"
              className={cn(
                'mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line',
                'text-lime-ink transition-transform duration-200 group-open:rotate-45',
              )}
            >
              +
            </span>
          </summary>
          <div className="max-w-[68ch] pb-6 text-ink-700">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
