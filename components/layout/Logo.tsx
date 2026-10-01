import Link from 'next/link';
import { cn } from '@/lib/utils';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * CER logo lockup.
 *
 * Two artworks rather than one recoloured file: the roundel and wordmark are
 * two tone, so a dark surface needs the supplied white version instead of a
 * filter. Both are trimmed to the artwork and carry an alpha channel, so they
 * sit on any surface without a visible panel behind them.
 */
const ART = {
  light: { src: 'cer-logo.webp', width: 640, height: 257 },
  dark: { src: 'cer-logo-white.webp', width: 640, height: 254 },
} as const;

export function Logo({
  onDark,
  className,
  href = '/',
}: {
  onDark?: boolean;
  className?: string;
  href?: string;
}) {
  const art = onDark ? ART.dark : ART.light;
  return (
    <Link
      href={href}
      className={cn('inline-flex items-center rounded-[2px]', className)}
      aria-label="CER home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE_PATH}/brand/${art.src}`}
        alt=""
        width={art.width}
        height={art.height}
        className="h-9 w-auto md:h-10"
      />
    </Link>
  );
}
