import { cn } from '@/lib/utils';
import { site } from '@/lib/site';
import { StageSceneLoader } from '@/components/3d/StageSceneLoader';
import type { StageType } from '@/components/3d/StageScene';

const STAGE_3D: StageType[] = ['crystalise', 'economise', 'revitalise'];

/**
 * Crystalise → Economise → Revitalise, the signature CER experience.
 *
 * Always dark (forest-900) regardless of the surface prop, so it creates
 * a deliberate rhythm break on any page it appears on. Ghost numbers at
 * very large scale give editorial depth without obscuring content.
 */
export function Methodology({
  compact,
}: {
  surface?: string;
  compact?: boolean;
}) {
  const { stages } = site.methodology;

  return (
    <section className="bg-forest-900 text-white on-dark" data-surface="dark">
      <div className="shell pt-(--spacing-section)">

        {/* Section header */}
        <div className="flex flex-col gap-4 border-b border-line-invert pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-lime">How we work</p>
            <h2 className="mt-4 text-h2 text-white">The CER framework</h2>
          </div>
          {!compact && (
            <p className="max-w-[44ch] text-sm text-muted-invert sm:text-right">
              Each stage produces something the next one depends on.
              No stage begins before its foundation exists.
            </p>
          )}
        </div>

        {/* Three stages */}
        <ol className="grid pb-(--spacing-section) md:grid-cols-3">
          {stages.map((stage, index) => (
            <li
              key={stage.name}
              className={cn(
                'py-12 md:py-14',
                index < stages.length - 1
                  ? 'border-b border-line-invert md:border-b-0 md:border-r md:border-line-invert'
                  : '',
                index > 0 ? 'md:pl-10 lg:pl-16' : '',
              )}
            >
              {/* 3D stage illustration */}
              <StageSceneLoader stage={STAGE_3D[index]!} />

              {/* Ghost number, design element, not readable content */}
              <p
                aria-hidden="true"
                className="font-heading font-bold leading-none text-white/[0.06]"
                style={{ fontSize: 'clamp(5rem, 8vw, 8rem)' }}
              >
                {stage.number}
              </p>

              {/* Stage name, dominant, in emerald */}
              <h3
                className="font-heading font-semibold text-lime"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginTop: '-0.3em', lineHeight: 1.1 }}
              >
                {stage.name}
              </h3>

              {/* Summary */}
              <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-muted-invert">
                {stage.summary}
              </p>

              {/* Activity pills */}
              <ul className="mt-8 flex flex-wrap gap-2">
                {stage.activities.map((activity) => (
                  <li
                    key={activity}
                    className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/60"
                  >
                    {activity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
