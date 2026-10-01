'use client';

import { useInView } from '@/lib/useInView';

/**
 * A methodology stage visual that is a video rather than a generated scene.
 *
 * The source is withheld until the stage approaches the viewport, for the same
 * reason the 3D scenes gate their import: these sit far below the fold, and an
 * autoplaying video attaches its download to first paint otherwise. The poster
 * stands in until then, so the slot is never empty and never shifts.
 *
 * The box is fixed to the clip's own aspect ratio and the fit is `contain`.
 * Both matter: the clips carry their own captions, some set close to the frame
 * edge, so nothing may be trimmed. `cover` would be a no-op at a matching ratio
 * in theory, but sub-pixel rounding can still shave an edge, and a shaved edge
 * here clips a letter. `contain` cannot crop at all. It can only letterbox, and
 * against this dark section that is invisible.
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
      className="overflow-hidden rounded-(--radius-card) bg-forest-900"
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
        className="h-full w-full object-contain"
      />
    </div>
  );
}
