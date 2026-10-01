'use client';

import dynamic from 'next/dynamic';

import type { StageType } from './StageScene';
import { useInView } from './useInView';

const StageSceneDynamic = dynamic(
  () => import('./StageScene').then((m) => ({ default: m.StageScene })),
  { ssr: false },
);

/**
 * The three methodology scenes sit far below the fold. Gating the dynamic
 * component on `hasEntered` keeps the three.js chunk out of the initial load
 * entirely -- it is only fetched once a scene approaches the viewport.
 *
 * The wrapper reserves the scene's height up front so nothing shifts when the
 * canvas mounts.
 */
export function StageSceneLoader({ stage }: { stage: StageType }) {
  const { ref, isVisible, hasEntered } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} style={{ height: '180px' }} aria-hidden="true">
      {hasEntered && <StageSceneDynamic stage={stage} active={isVisible} />}
    </div>
  );
}
