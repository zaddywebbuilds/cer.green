import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * CER wordmark.
 *
 * Set as inline SVG so it paints with the first HTML response rather than
 * costing a request in the critical path. The three dots read as Crystalise,
 * Economise, Revitalise -- a quiet reference rather than a stated one.
 */
export function Logo({
  onDark,
  className,
  href = '/',
}: {
  onDark?: boolean;
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn('inline-flex items-center gap-2.5 rounded-[2px]', className)}
      aria-label="CER home"
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="shrink-0"
      >
        <rect
          width="34"
          height="34"
          rx="3"
          fill={onDark ? '#C4DE6B' : '#123C32'}
        />
        <circle cx="10" cy="17" r="2.6" fill={onDark ? '#123C32' : '#C4DE6B'} />
        <circle cx="17" cy="17" r="2.6" fill={onDark ? '#123C32' : '#F6F4EE'} opacity="0.85" />
        <circle cx="24" cy="17" r="2.6" fill={onDark ? '#123C32' : '#F6F4EE'} opacity="0.55" />
      </svg>
      <span
        className={cn(
          'font-heading text-[1.35rem] leading-none font-bold tracking-[-0.03em]',
          onDark ? 'text-white' : 'text-forest',
        )}
      >
        CER
      </span>
    </Link>
  );
}
