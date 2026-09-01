/**
 * Layout and typography primitives.
 *
 * `Section` owns vertical rhythm and background alternation so pages never set
 * their own padding, and `data-surface` tells nested components which palette
 * they are sitting on.
 */

import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type Surface = 'ivory' | 'white' | 'dark' | 'sage';

const SURFACE_CLASS: Record<Surface, string> = {
  ivory: 'bg-ivory text-ink',
  white: 'bg-white text-ink',
  dark: 'bg-forest text-white on-dark',
  sage: 'bg-sage text-ink',
};

export function Section({
  children,
  surface = 'ivory',
  className,
  id,
  size = 'default',
  as: Tag = 'section',
  labelledBy,
}: {
  children: ReactNode;
  surface?: Surface;
  className?: string;
  id?: string;
  size?: 'default' | 'sm';
  as?: 'section' | 'div' | 'article' | 'aside';
  labelledBy?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      data-surface={surface === 'dark' ? 'dark' : 'light'}
      className={cn(
        SURFACE_CLASS[surface],
        size === 'sm' ? 'py-(--spacing-section-sm)' : 'py-(--spacing-section)',
        className,
      )}
    >
      <div className="shell">{children}</div>
    </Tag>
  );
}

export function Eyebrow({
  children,
  className,
  as: Tag = 'p',
}: {
  children: ReactNode;
  className?: string;
  as?: 'p' | 'span' | 'div';
}) {
  return (
    <Tag className={cn('eyebrow text-muted', className)}>
      <span className="text-lime-ink">&#47;&#47;</span> {children}
    </Tag>
  );
}

/**
 * Section header. `id` is set on the heading so the parent `Section` can
 * reference it with aria-labelledby.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  id,
  level = 2,
  align = 'left',
  className,
  action,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  id?: string;
  level?: 2 | 3;
  align?: 'left' | 'center';
  className?: string;
  action?: ReactNode;
}) {
  const Heading = level === 2 ? 'h2' : 'h3';
  return (
    <div
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
        {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
        <Heading id={id} className={level === 2 ? 'text-h2' : 'text-h3'}>
          {title}
        </Heading>
        {lead ? <p className="mt-5 max-w-[68ch] text-lead opacity-90">{lead}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'invert';

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-[3px] font-heading font-semibold ' +
  'transition-colors duration-200 min-h-11 px-6 py-3 text-[0.95rem] tracking-[-0.01em] text-center';

const BUTTON_VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-forest text-white hover:bg-forest-500',
  secondary: 'border border-forest/25 text-forest hover:border-forest hover:bg-forest hover:text-white',
  ghost: 'text-forest underline underline-offset-4 hover:text-lime-ink px-0 min-h-0 py-1',
  invert: 'bg-lime text-forest-900 hover:bg-white',
};

export function Button({
  href,
  children,
  variant = 'primary',
  className,
  external,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
} & Omit<React.ComponentProps<typeof Link>, 'href' | 'className'>) {
  const classes = cn(BUTTON_BASE, BUTTON_VARIANT[variant], className);

  if (external) {
    return (
      <a href={href} className={classes} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/** Text link with a trailing arrow. Label must describe the destination. */
export function ArrowLink({
  href,
  children,
  className,
  onDark,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 font-heading text-[0.95rem] font-semibold',
        onDark ? 'text-lime hover:text-white' : 'text-forest hover:text-lime-ink',
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
}

export function Card({
  children,
  className,
  surface = 'white',
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  surface?: 'white' | 'sage' | 'outline' | 'dark';
  as?: 'div' | 'article' | 'li';
}) {
  const surfaces = {
    white: 'bg-white border border-line',
    sage: 'bg-sage border border-sage-dark',
    outline: 'border border-line',
    dark: 'bg-forest-700 border border-line-invert text-white',
  };
  return (
    <Tag className={cn('rounded-(--radius-card) p-7 md:p-8', surfaces[surface], className)}>
      {children}
    </Tag>
  );
}

/** Numbered or labelled statistic. Illustrative figures must be marked. */
export function MetricBlock({
  value,
  label,
  illustrative,
  onDark,
}: {
  value: string;
  label: string;
  illustrative?: boolean;
  onDark?: boolean;
}) {
  return (
    <div>
      <p
        className={cn(
          'font-heading text-h2 leading-none font-semibold',
          onDark ? 'text-lime' : 'text-forest',
        )}
      >
        {value}
      </p>
      <p className={cn('mt-3 text-sm', onDark ? 'text-muted-invert' : 'text-muted')}>{label}</p>
      {illustrative ? (
        <p className={cn('mt-1 text-xs italic', onDark ? 'text-muted-invert' : 'text-muted')}>
          Illustrative figure
        </p>
      ) : null}
    </div>
  );
}

/** Renders an array of paragraphs at a consistent measure. */
export function Paragraphs({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <div className={cn('flex max-w-[68ch] flex-col gap-4', className)}>
      {items.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </div>
  );
}

/** Bulleted list with the CER tick marker. */
export function TickList({
  items,
  className,
  onDark,
  columns,
}: {
  items: readonly string[];
  className?: string;
  onDark?: boolean;
  columns?: boolean;
}) {
  return (
    <ul className={cn('grid gap-3', columns && 'sm:grid-cols-2 sm:gap-x-8', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className={cn(
              'mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full',
              onDark ? 'bg-lime' : 'bg-lime-ink',
            )}
          />
          <span className={onDark ? 'text-muted-invert' : 'text-ink-700'}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
