export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { ApresentacaoClient } from './ApresentacaoClient';

export const metadata: Metadata = {
  title: 'Apresentação: Mentoria Claude Code + AIOX',
  description:
    'Programa completo da Mentoria Claude Code + AIOX - Tenha uma equipe de agentes de IA trabalhando para você',
  alternates: { canonical: '/mentoria/apresentacao' },
};

export default function ApresentacaoPage() {
  return <ApresentacaoClient />;
}
