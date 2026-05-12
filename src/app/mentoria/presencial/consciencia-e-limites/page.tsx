import type { Metadata } from 'next';
import { ModuloSlideshow } from '../_components/ModuloSlideshow';
import type { Slide } from '../_components/ModuloSlideshow';

export const metadata: Metadata = {
  title: 'Módulo 0: IA, Consciência e Limites Internos | Mentoria Claude Code',
  alternates: { canonical: '/mentoria/presencial/consciencia-e-limites' },
};

const slides: Slide[] = [
  {
    label: 'Abertura · Módulo 0',
    title: 'IA, Consciência e Limites Internos.',
    body: 'O verdadeiro desafio da era da potência humana.',
    note: 'Antes de falar de tecnologia, precisamos falar de você.',
  },
  {
    label: 'A Contradição',
    title: 'Nunca tivemos tanto. E ao mesmo tempo.',
    body: 'Tanta tecnologia, tanto acesso, tanta liberdade de criação. E ao mesmo tempo: burnout cresce, ansiedade cresce, vazio cresce. O problema não é falta de ferramenta.',
    diagram: 'limites-contraste',
  },
  {
    label: 'Os Disfarces',
    title: 'Limites internos se disfarçam de virtude.',
    body: 'Perfeccionismo parece capricho. Procrastinação parece cautela. Excesso de preparo parece responsabilidade. Medo de exposição parece humildade. Não são.',
    diagram: 'limites-disfarces',
  },
  {
    label: 'O que Exige',
    title: 'Superar limites internos não é sobre mais esforço.',
    body: 'É sobre consciência do que está acontecendo, presença para sentir sem fugir, direção para não agir no random, disciplina interior e coragem para começar imperfeito.',
    diagram: 'limites-exige',
  },
  {
    label: 'IA + Consciência',
    title: 'A IA amplifica aquilo que já existe.',
    body: 'Ela não cria direção — amplifica a que você já tem. Não cria clareza — expande a que você construiu. Não cria coragem — potencializa a que você desenvolveu.',
    diagram: 'limites-flow',
  },
];

export default function ConscienciaELimitesPage() {
  return <ModuloSlideshow slug="consciencia-e-limites" slides={slides} />;
}
