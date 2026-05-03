'use client';

import dynamic from 'next/dynamic';

const SolarSystemScene = dynamic(
  () => import('./scene/SolarSystemScene').then((m) => m.SolarSystemScene),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 -z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, #0a0a18 0%, #02020a 70%)' }}
      />
    ),
  }
);

export function SolarSystemBackground() {
  return <SolarSystemScene />;
}
