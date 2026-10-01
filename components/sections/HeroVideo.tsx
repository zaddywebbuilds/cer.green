'use client';

import { useRichMotion } from '@/lib/useRichMotion';

/**
 * The hero loop, on the screens where it is worth its weight.
 *
 * The element is mounted rather than hidden, because hiding it does not stop
 * the download: `autoplay` makes the browser fetch the clip even behind
 * `display: none` and `preload="none"`. Not rendering the `video` at all is
 * the only thing that actually prevents it, so a phone pays nothing.
 *
 * AV1 first and H.264 second: a browser takes the first source it can decode,
 * so most visitors get the smaller file and the rest still get a clip.
 *
 * The poster is what the server renders, so it is the first paint on every
 * device and nothing shifts when the clip takes over on a wide screen.
 */
export function HeroVideo({ stem, poster }: { stem: string; poster: string }) {
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
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="h-full w-full object-cover"
      aria-hidden="true"
    >
      <source src={`${stem}.webm`} type='video/webm; codecs="av01.0.04M.08"' />
      <source src={`${stem}.mp4`} type='video/mp4; codecs="avc1.640020"' />
    </video>
  );
}
