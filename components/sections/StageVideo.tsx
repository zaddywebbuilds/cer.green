'use client';

import { useInView } from '@/components/3d/useInView';

/**
 * A methodology stage visual that is a video rather than a generated scene.
 *
 * The source is withheld until the stage approaches the viewport, for the same
 * reason the 3D scenes gate their import: these sit far below the fold, and an
 * autoplaying video attaches its download to first paint otherwise. The poster
 * stands in until then, so the slot is never empty and never shifts.
 *
 * The box is fixed to the clip's own aspect ratio, which makes object-cover a
 * no-op: the frame is shown whole. That matters here because the motion carries
 * its own captions, and any crop would cut them.
 */
export function StageVideo({
  src,
  poster,
  width,
  height,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
}) {
  const { ref, hasEntered } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-(--radius-card)"
      style={{ aspectRatio: `${width} / ${height}` }}
      aria-hidden="true"
    >
      <video
        {...(hasEntered ? { src } : {})}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
