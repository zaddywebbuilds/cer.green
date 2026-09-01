import { Button, Section } from '@/components/ui/primitives';

/**
 * Closing call to action.
 *
 * Every substantial page ends with one of these, so no page is a dead end.
 * The label is passed in rather than defaulted, because a consulting page and a
 * course page should not both say "Learn more".
 */
export function CtaBanner({
  heading,
  body,
  primary,
  secondary,
}: {
  heading: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Section surface="dark" size="sm" labelledBy="cta-heading">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-center">
        <div>
          <h2 id="cta-heading" className="text-h2">
            {heading}
          </h2>
          <p className="mt-5 max-w-[62ch] text-lead text-muted-invert">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
          <Button href={primary.href} variant="invert">
            {primary.label}
          </Button>
          {secondary ? (
            <Button
              href={secondary.href}
              variant="secondary"
              className="border-white/40 text-white hover:border-white hover:bg-white hover:text-forest"
            >
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
