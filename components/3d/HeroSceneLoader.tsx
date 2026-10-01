'use client';

import dynamic from 'next/dynamic';

import { useInView } from './useInView';

const HeroSceneDynamic = dynamic(
  () => import('./HeroScene').then((m) => ({ default: m.HeroScene })),
  { ssr: false },
);

/**
 * The hero scene is above the fold, so `hasEntered` is true almost immediately.
 * Gating on it anyway costs a tick and buys two things: the three.js chunk no
 * longer competes with the hero text for bandwidth during the LCP window, and
 * scrolling past the hero stops it rendering.
 */
export function HeroSceneLoader() {
  const { ref, isVisible, hasEntered } = useInView<HTMLDivElement>('100px');

  return (
    <div ref={ref} className="h-full w-full">
      {hasEntered && <HeroSceneDynamic active={isVisible} />}
    </div>
  );
}
