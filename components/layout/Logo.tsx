import Link from 'next/link';
import { cn } from '@/lib/utils';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

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
      className={cn('inline-flex items-center rounded-[2px]', className)}
      aria-label="CER home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE_PATH}/images/cer-logo.webp`}
        alt="CER – Climate Environmental Resources"
        width={52}
        height={52}
        className={cn(
          'h-[52px] w-[52px] shrink-0 object-contain',
          onDark && 'rounded-full bg-white p-0.5',
        )}
      />
    </Link>
  );
}
