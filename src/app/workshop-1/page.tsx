export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { WorkshopClient } from './WorkshopClient';

export const metadata: Metadata = {
  title: 'Workshop: Claude Code na Prática',
  description:
    'Workshop prático de 1 hora: do setup ao squad completo de agentes de IA com Claude Code, AIOX, Squad Creator e Obsidian — do zero ao seu time operando.',
  alternates: { canonical: '/workshop-1' },
};

export default function Workshop1Page() {
  return <WorkshopClient />;
}
