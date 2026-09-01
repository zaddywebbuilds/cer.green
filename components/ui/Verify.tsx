/**
 * Renders content CER has not yet verified.
 *
 * In development the placeholder is shown in a conspicuous badge so it cannot
 * be missed during content review. In production it renders nothing at all --
 * a `[VERIFY WITH CER]` marker must never reach a visitor.
 *
 * `scripts/check-content.mjs` fails the production build when a marker is still
 * present on a page intended to launch, so this is a safety net rather than the
 * primary control.
 */

import { isPlaceholder } from '@/lib/site';

export function Verify({ value, children }: { value: string; children?: never }) {
  if (!isPlaceholder(value)) return <>{value}</>;
  if (process.env.NODE_ENV === 'production') return null;
  return (
    <mark className="bg-[#ffe08a] px-1.5 py-0.5 text-[0.8em] font-semibold text-[#5a4200]">
      {value}
    </mark>
  );
}

/** True when the value is safe to render publicly. */
export function isPublishable(value: string | undefined | null): value is string {
  return Boolean(value) && !isPlaceholder(value);
}

/**
 * Wraps a block that should disappear entirely in production when its content
 * is unverified -- a contact row with no phone number, for example.
 */
export function IfVerified({
  value,
  children,
}: {
  value: string | undefined | null;
  children: (value: string) => React.ReactNode;
}) {
  if (isPublishable(value)) return <>{children(value)}</>;
  if (process.env.NODE_ENV === 'production') return null;
  return <Verify value={value ?? ''} />;
}
