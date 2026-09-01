/** Joins class names, dropping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Formats an ISO date as `12 August 2026`. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Formats a date range for a course instance. */
export function formatDateRange(start: string, end?: string): string {
  if (!end || start === end) return formatDate(start);
  const from = new Date(start);
  const to = new Date(end);
  const sameMonth = from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear();
  if (sameMonth) {
    return `${from.getDate()}-${to.getDate()} ${to.toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
    })}`;
  }
  return `${formatDate(start)} - ${formatDate(end)}`;
}

/** Initials used for the expert monogram where no photograph is available. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/** URL-safe id for a heading, used by in-page anchors and tables of contents. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
