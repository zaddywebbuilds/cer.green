'use client';

import { useRichMotion } from '@/lib/useRichMotion';

/**
 * The hero loop, on the screens where it is worth its weight.
 *
 * The element is mounted rather than hidden, because hiding it does not stop
 * the download: `autoplay` makes the browser fetch the clip even behind
 * `display: none` and `preload="none"`, which was costing a phone 1.9 MB to
 * play a decorative loop at 375px wide. Not rendering the `video` at all is
 * the only thing that actually prevents it.
 *
 * The poster is what the server renders, so it is the first paint on every
 * device and nothing shifts when the clip takes over on a wide screen.
 */
export function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const rich = useRichMotion();

  if (!rich) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      className="h-full w-full object-cover"
      aria-hidden="true"
    />
  );
}
