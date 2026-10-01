import Image from 'next/image';
import { cn } from '@/lib/utils';
import { site } from '@/lib/site';
import { StageVideo } from '@/components/sections/StageVideo';

/**
 * Filmed visuals for the stages that have one, keyed by stage name. Both clips
 * share these dimensions, so the two stages in the lower row line up and
 * neither is cropped.
 */
const STAGE_VIDEOS: Record<string, { slug: string; width: number; height: number }> = {
  Economise: { slug: 'economise', width: 752, height: 416 },
  Revitalise: { slug: 'revitalise', width: 752, height: 416 },
};

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
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
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
                  src={`${base}/images/crystalise.webp`}
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
                  src={`${base}/images/crystalise.webp`}
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
                // Padded symmetrically so both columns are the same width. The
                // visuals share one aspect ratio, so equal width is what makes
                // the two stages line up rather than one sitting lower.
                index > 0 ? 'md:pl-10 lg:pl-16' : 'md:pr-10 lg:pr-16',
              )}
            >
              {/* Each of these stages carries its own filmed visual */}
              {(() => {
                const video = STAGE_VIDEOS[stage.name];
                if (!video) return null;
                return (
                  <StageVideo
                    stem={`${base}/video/${video.slug}`}
                    poster={`${base}/video/${video.slug}-poster.jpg`}
                    width={video.width}
                    height={video.height}
                  />
                );
              })()}

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
