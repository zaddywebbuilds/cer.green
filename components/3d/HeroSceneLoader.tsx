'use client';

import dynamic from 'next/dynamic';

const HeroSceneDynamic = dynamic(
  () => import('./HeroScene').then((m) => ({ default: m.HeroScene })),
  { ssr: false },
);

export function HeroSceneLoader() {
  return <HeroSceneDynamic />;
}
