'use client';

import { motion, type MotionValue } from 'framer-motion';
import { AgentCard, AgentCardCompact } from './AgentCard';
import type { Agente, Squad } from '@/data/agentes';

export const BELT_CARD_W = 220;
export const BELT_GAP = 12;
export const BELT_CARD_W_COMPACT = 120;
export const BELT_GAP_COMPACT = 8;

interface AgentBeltProps {
  agentes: Agente[];
  squad: Squad;
  x: MotionValue<number>;
  opacity?: MotionValue<number>;
}

export function AgentBelt({ agentes, squad, x, opacity }: AgentBeltProps) {
  const totalWidth = agentes.length * (BELT_CARD_W + BELT_GAP);

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex"
        style={{ gap: BELT_GAP, width: totalWidth, x, opacity }}
      >
        {agentes.map((a) => (
          <div key={a.id} className="flex-shrink-0" style={{ width: BELT_CARD_W }}>
            <AgentCard agente={a} squad={squad} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function AgentBeltCompact({ agentes, squad, x, opacity }: AgentBeltProps) {
  const totalWidth = agentes.length * (BELT_CARD_W_COMPACT + BELT_GAP_COMPACT);

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex"
        style={{ gap: BELT_GAP_COMPACT, width: totalWidth, x, opacity }}
      >
        {agentes.map((a) => (
          <div key={a.id} className="flex-shrink-0" style={{ width: BELT_CARD_W_COMPACT }}>
            <AgentCardCompact agente={a} squad={squad} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
