import Image from 'next/image';
import { cn } from '@/lib/utils';
import { site } from '@/lib/site';
import { StageSceneLoader } from '@/components/3d/StageSceneLoader';
import type { StageType } from '@/components/3d/StageScene';

const STAGE_3D: StageType[] = ['crystalise', 'economise', 'revitalise'];

/**
 * Crystalise -> Economise -> Revitalise, the signature CER experience.
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
  const [crystalise, ...laterStages] = stages;

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

        {/* Stage 01: Crystalise — full-width with image */}
        <div className="border-b border-line-invert py-12 md:py-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">

            {/* Text column */}
            <div>
              <p
                aria-hidden="true"
                className="font-heading font-bold leading-none text-white/[0.06]"
                style={{ fontSize: 'clamp(5rem, 8vw, 8rem)' }}
              >
                {crystalise.number}
              </p>

              <h3
                className="font-heading font-semibold text-lime"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginTop: '-0.3em', lineHeight: 1.1 }}
              >
                {crystalise.name}
              </h3>

              <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-muted-invert">
                {crystalise.summary}
              </p>

              {/* Mobile image: between summary and activity pills */}
              <div className="mt-8 overflow-hidden rounded-(--radius-card) lg:hidden">
                <Image
                  src="/images/crystalise.webp"
                  alt="Crystalise stage: five assessment panels covering Baseline Assessment, Data and Evidence Review, Stakeholder Analysis, Gap Assessment and Regulatory Mapping, with a central display showing the clear baseline output."
                  width={1200}
                  height={800}
                  className="w-full object-cover"
                  unoptimized
                />
              </div>

              {/* Activity pills */}
              <ul className="mt-8 flex flex-wrap gap-2">
                {crystalise.activities.map((activity) => (
                  <li
                    key={activity}
                    className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/60"
                  >
                    {activity}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image column, desktop only */}
            <div className="hidden lg:block">
              <div className="overflow-hidden rounded-(--radius-card)">
                <Image
                  src="/images/crystalise.webp"
                  alt="Crystalise stage: five assessment panels covering Baseline Assessment, Data and Evidence Review, Stakeholder Analysis, Gap Assessment and Regulatory Mapping, with a central display showing the clear baseline output."
                  width={1200}
                  height={800}
                  className="w-full object-cover"
                  unoptimized
                />
              </div>
            </div>

          </div>
        </div>

        {/* Stages 02 and 03 */}
        <ol className="grid pb-(--spacing-section) md:grid-cols-2">
          {laterStages.map((stage, index) => (
            <li
              key={stage.name}
              className={cn(
                'py-12 md:py-14',
                index < laterStages.length - 1
                  ? 'border-b border-line-invert md:border-b-0 md:border-r md:border-line-invert'
                  : '',
                index > 0 ? 'md:pl-10 lg:pl-16' : '',
              )}
            >
              {/* 3D stage illustration */}
              <StageSceneLoader stage={STAGE_3D[index + 1]!} />

              {/* Ghost number */}
              <p
                aria-hidden="true"
                className="font-heading font-bold leading-none text-white/[0.06]"
                style={{ fontSize: 'clamp(5rem, 8vw, 8rem)' }}
              >
                {stage.number}
              </p>

              <h3
                className="font-heading font-semibold text-lime"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginTop: '-0.3em', lineHeight: 1.1 }}
              >
                {stage.name}
              </h3>

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
