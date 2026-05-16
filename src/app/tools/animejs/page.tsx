export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Anime.js — Componentes Animados',
  description:
    'Biblioteca de componentes animados profissionais. Botões, temporizadores, transições — código pronto para usar.',
  alternates: { canonical: `${siteConfig.url}/tools/animejs` },
  openGraph: {
    title: 'Anime.js — Componentes Animados | João Guirunas',
    description:
      'Biblioteca de componentes animados profissionais. Botões, temporizadores, transições — código pronto para usar.',
    url: `${siteConfig.url}/tools/animejs`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Anime.js — Componentes Animados | João Guirunas',
    description:
      'Biblioteca de componentes animados profissionais. Botões, temporizadores, transições — código pronto para usar.',
  },
};

const features = [
  {
    title: 'Componentes Prontos para Produção',
    description:
      'Biblioteca com componentes animados de nível profissional — testados e prontos para integrar em qualquer projeto.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
  {
    title: 'Sem Login ou Cadastro',
    description:
      'Acesse, navegue e copie qualquer componente sem criar conta — zero fricção para começar a usar.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>',
  },
  {
    title: 'Código Disponível Direto no Browser',
    description:
      'Clique em qualquer componente para ver o código — copie e cole no seu projeto imediatamente.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>',
  },
  {
    title: 'Botões com Animações Profissionais',
    description:
      'Coleção de botões animados com hover effects, loading states e transições de alta qualidade visual.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"/>',
  },
  {
    title: 'Temporizadores e Contadores',
    description:
      'Componentes de countdown, progress bars animados e contadores — prontos para landing pages e dashboards.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
  {
    title: 'Transições e Efeitos de Scroll',
    description:
      'Animações de entrada, parallax e scroll-triggered effects para criar experiências visuais memoráveis.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/>',
  },
];

const longDescription = [
  'O animejs.com é uma biblioteca de referência com componentes animados de nível profissional. Você acessa o site, navega pelos componentes — botões, temporizadores, animações de entrada, transições — e clica para ver o código. Sem login, sem cadastro, sem paywall.',
  'A integração com projetos é direta: você copia o código do componente que quer usar e cola no seu projeto. Se estiver usando Claude Code, você mostra o código ao agente e pede para adaptar ao seu design system. O Claude replica o estilo ou cria variações mantendo a consistência visual.',
  'Para quem usa IA para construir interfaces, o animejs.com funciona como um vocabulário visual de referência. Em vez de descrever em palavras como quer uma animação, você mostra o código exato e pede adaptações — o que resulta em implementações muito mais precisas e consistentes.',
];

export default function AnimejsPage() {
  return (
    <SkillPage
      title="Anime.js — Componentes Animados"
      description="Biblioteca de componentes animados profissionais. Botões, temporizadores, transições — código pronto para usar."
      category="Apps"
      categoryColor="apps"
      longDescription={longDescription}
      features={features}
      primaryLink="https://animejs.com"
      primaryLabel="Ver animejs.com"
      isExternal
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/tools/animejs"
    />
  );
}
