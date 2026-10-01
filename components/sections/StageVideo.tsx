'use client';

import { useInView } from '@/lib/useInView';
import { useRichMotion } from '@/lib/useRichMotion';

/**
 * A methodology stage visual that is a video rather than a generated scene.
 *
 * The `video` is not rendered until the stage approaches the viewport, and
 * not at all on a narrow screen or under reduced motion. Withholding the
 * element rather than its `src` is what keeps the bytes unfetched, since an
 * autoplaying element downloads regardless of `preload`. The poster holds the
 * slot until then, so it is never empty and never shifts.
 *
 * AV1 first, H.264 second: the browser takes the first it can decode.
 *
 * The box is fixed to the clip's own aspect ratio and the fit is `contain`.
 * Both matter: the clips carry their own captions, some set close to the frame
 * edge, so nothing may be trimmed. `cover` would be a no-op at a matching ratio
 * in theory, but sub-pixel rounding can still shave an edge, and a shaved edge
 * here clips a letter. `contain` cannot crop at all. It can only letterbox, and
 * against this dark section that is invisible.
 */
export function StageVideo({
  stem,
  poster,
  width,
  height,
}: {
  stem: string;
  poster: string;
  width: number;
  height: number;
}) {
  const { ref, hasEntered } = useInView<HTMLDivElement>();
  const rich = useRichMotion();

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-(--radius-card) bg-forest-900"
      style={{ aspectRatio: `${width} / ${height}` }}
      aria-hidden="true"
    >
      {rich && hasEntered ? (
        <video
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-contain"
        >
          <source src={`${stem}.webm`} type='video/webm; codecs="av01.0.04M.08"' />
          <source src={`${stem}.mp4`} type='video/mp4; codecs="avc1.640020"' />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" loading="lazy" className="h-full w-full object-contain" />
      )}
    </div>
  );
}
