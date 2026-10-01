'use client';

import { useEffect, useState } from 'react';

/**
 * Whether this visitor should be served a playing video rather than a still.
 *
 * Two conditions, both of which have to hold:
 *
 *   The screen is wide enough to be worth it. The decorative clips are a
 *   megabyte or more each, and a phone on mobile data pays that to animate a
 *   panel a few hundred pixels wide. The poster frame carries the same image.
 *
 *   The visitor has not asked for reduced motion. These loops run
 *   indefinitely and carry no pause control, so under WCAG 2.2.2 the honest
 *   answer for someone who has asked for less movement is a still frame.
 *
 * Returns false on the server and on first paint, so the poster is what gets
 * rendered and the clip can only ever be an upgrade. Nothing shifts when it
 * takes over, because both fill the same box.
 */
export function useRichMotion(minWidth = 1024) {
  const [rich, setRich] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia(`(min-width: ${minWidth}px)`);
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const decide = () => setRich(wide.matches && !still.matches);

    decide();
    wide.addEventListener('change', decide);
    still.addEventListener('change', decide);
    return () => {
      wide.removeEventListener('change', decide);
      still.removeEventListener('change', decide);
    };
  }, [minWidth]);

  return rich;
}
