export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Learn Your Way: Estudo Personalizado com IA do Google',
  description:
    'Ferramenta gratuita do Google que transforma PDFs e artigos em mapas mentais, áudios e quizzes personalizados — 11% mais retenção de conhecimento.',
  alternates: { canonical: `${siteConfig.url}/learn/learn-your-way` },
  openGraph: {
    title: 'Learn Your Way: Estudo Personalizado com IA do Google | João Guirunas',
    description:
      'Ferramenta gratuita do Google que transforma PDFs e artigos em mapas mentais, áudios e quizzes personalizados — 11% mais retenção de conhecimento.',
    url: `${siteConfig.url}/learn/learn-your-way`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Learn Your Way: Estudo Personalizado com IA do Google | João Guirunas',
    description:
      'Ferramenta gratuita do Google que transforma PDFs e artigos em mapas mentais, áudios e quizzes personalizados — 11% mais retenção de conhecimento.',
  },
};

const features = [
  {
    title: 'Personalização por Estilo de Aprendizado',
    description:
      'A IA identifica se você aprende melhor vendo, ouvindo ou fazendo — e gera os três formatos em paralelo.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>',
  },
  {
    title: 'Mapas Mentais Automáticos',
    description:
      'Qualquer conteúdo transformado em mapa mental visual estruturado para facilitar a memorização.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/>',
  },
  {
    title: 'Áudios Explicativos para Ouvir no Trajeto',
    description:
      'Transforme PDFs e artigos em áudios explicativos — aprenda enquanto se desloca ou faz outra atividade.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"/>',
  },
  {
    title: 'Quizzes com Feedback em Tempo Real',
    description:
      'Testes adaptativos que ajustam a dificuldade conforme seu desempenho e reforçam pontos de fraqueza.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/>',
  },
  {
    title: 'Upload de PDF, Vídeo ou Foto do Caderno',
    description:
      'Importe qualquer formato — PDF, transcrição de aula ou foto manuscrita — e receba conteúdo adaptado.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>',
  },
  {
    title: '11% Mais Retenção de Conhecimento',
    description:
      'Usuários reportam 11% mais retenção comparado ao estudo tradicional — aprendizado que efetivamente fica.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>',
  },
];

const longDescription = [
  'O Learn Your Way é uma ferramenta gratuita do Google que transforma qualquer conteúdo em múltiplos formatos de aprendizado — personalizados para como você aprende melhor. Você faz upload de um PDF, artigo, transcrição de aula ou foto de caderno e a ferramenta cria mapas mentais, áudios e quizzes adaptados ao seu nível.',
  'O diferencial não é só organizar conteúdo — isso muitas IAs fazem. O Learn Your Way entende se você aprende melhor vendo, ouvindo ou fazendo, e gera os três formatos em paralelo. Usuários reportam 11% mais retenção de conhecimento comparado ao estudo tradicional.',
  'Para empresas, o uso é direto: jogue o manual de um novo produto e transforme em treinamento personalizado para o time de vendas. Configure onboarding de novos funcionários com conteúdo adaptativo. Crie planos de estudo para certificações. Tudo gratuitamente, dentro do ecossistema Google.',
];

export default function LearnYourWayPage() {
  return (
    <SkillPage
      title="Learn Your Way — Google"
      description="IA que aprende como você aprende. Mapas mentais, áudios, quizzes personalizados para qualquer conteúdo."
      category="Aprendizado"
      categoryColor="aprendizado"
      longDescription={longDescription}
      features={features}
      primaryLink="https://learning.google.com"
      primaryLabel="Acessar Learn Your Way"
      isExternal
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/learn/learn-your-way"
    />
  );
}
