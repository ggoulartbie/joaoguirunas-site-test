'use client';

import dynamic from 'next/dynamic';
import type { SquadId } from '@/data/agentes';

const AgentPlanetScene = dynamic(
  () => import('./scene/AgentPlanetScene').then((m) => m.AgentPlanetScene),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 -z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, #0a0a18 0%, #02020a 70%)' }}
      />
    ),
  }
);

export function AgentPlanetBackground({ squadId }: { squadId: SquadId }) {
  return <AgentPlanetScene squadId={squadId} />;
}
