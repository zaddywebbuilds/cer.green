'use client';

import dynamic from 'next/dynamic';
import type { StageType } from './StageScene';

const StageSceneDynamic = dynamic(
  () => import('./StageScene').then((m) => ({ default: m.StageScene })),
  { ssr: false },
);

export function StageSceneLoader({ stage }: { stage: StageType }) {
  return <StageSceneDynamic stage={stage} />;
}
