import { Section, SectionHeader } from '@/components/ui/primitives';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * Crystalise → Economise → Revitalise.
 *
 * Rendered as a numbered process with a connecting rule rather than an
 * illustrated infographic: it reads as a consulting deliverable, degrades
 * cleanly to a stacked list on mobile, and carries no image weight.
 */
export function Methodology({
  surface = 'sage',
  compact,
}: {
  surface?: 'sage' | 'ivory' | 'white';
  compact?: boolean;
}) {
  const { stages } = site.methodology;

  return (
    <Section surface={surface} labelledBy="methodology-heading">
      <SectionHeader
        eyebrow="How we work"
        title="From requirement to implementation"
        id="methodology-heading"
        lead={
          compact
            ? undefined
            : 'CER is named for the way it works. Each stage produces something the next one depends on, so a programme is not started before its foundation exists.'
        }
      />

      <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {stages.map((stage, index) => (
          <li key={stage.name} className="relative">
            {/* Connecting rule between stages, desktop only. */}
            {index < stages.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute top-4 left-[calc(3.5rem+1rem)] hidden h-px w-[calc(100%-3.5rem)] bg-forest/20 md:block"
              />
            ) : null}

            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className={cn(
                  'grid h-8 w-14 shrink-0 place-items-center rounded-[3px]',
                  'bg-forest font-heading text-sm font-bold tracking-widest text-lime',
                )}
              >
                {stage.number}
              </span>
              <h3 className="font-heading text-h3">{stage.name}</h3>
            </div>

            <p className="mt-5 text-ink-700">{stage.summary}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {stage.activities.map((activity) => (
                <li
                  key={activity}
                  className="rounded-full border border-forest/15 bg-white/60 px-3 py-1 text-sm text-muted"
                >
                  {activity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
