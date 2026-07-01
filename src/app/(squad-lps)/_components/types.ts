export interface CurriculumItem {
  titulo: string;
  resultado: string;
}

export interface FaqItem {
  pergunta: string;
  resposta: string;
}

import type { SquadId } from '@/data/agentes';

export interface SquadConfig {
  headline: string;
  sub: string;
  ctaLabel: string;
  price: string;
  priceInstallments: string;
  curriculum: CurriculumItem[];
  faq: FaqItem[];
  bonus: string;
  problema: string;
  virada: string;
  instrutor: {
    nome: string;
    bio: string;
    cargo: string;
  };
  accent?: string;
  squadId?: SquadId;
  race?: string;
}
