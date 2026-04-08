import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Instagram CLI — Terminal sem Feed',
  description:
    'Use o Instagram pelo terminal. Sem doom-scrolling, sem feed. Integra com LLMs para automatizar respostas e moderação.',
  alternates: { canonical: `${siteConfig.url}/tools/instagram-cli` },
  openGraph: {
    title: 'Instagram CLI — Terminal sem Feed | GrowthSales Open Source',
    description:
      'Use o Instagram pelo terminal. Sem doom-scrolling, sem feed. Integra com LLMs para automatizar respostas e moderação.',
    url: `${siteConfig.url}/tools/instagram-cli`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Instagram CLI — Terminal sem Feed | GrowthSales Open Source',
    description:
      'Use o Instagram pelo terminal. Sem doom-scrolling, sem feed. Integra com LLMs para automatizar respostas e moderação.',
  },
};

const features = [
  {
    title: 'Instagram Completo no Terminal',
    description:
      'Execute todas as operações do Instagram via linha de comando — sem abrir o app ou o browser.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/>',
  },
  {
    title: 'Zero Feed Doom-scrolling',
    description:
      'Sem algoritmo, sem feed infinito — você opera o Instagram como ferramenta de negócio, não como consumidor.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>',
  },
  {
    title: 'Integração com LLMs e Automação',
    description:
      'Use o CLI como base para conectar um modelo de IA e automatizar respostas, moderação e engajamento.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>',
  },
  {
    title: 'Respostas Scriptáveis via Código',
    description:
      'Automatize respostas para DMs e comentários com scripts — controle total sobre o que o agente faz.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>',
  },
  {
    title: 'Moderação Automática de Comentários',
    description:
      'Configure regras de moderação programáticas — filtre, responda ou sinalize comentários automaticamente.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>',
  },
  {
    title: 'Operações via Teclado Puro',
    description:
      'Interface CLI sem mouse — rápida, eficiente e integrável em pipelines de automação e scripts bash.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"/>',
  },
];

const longDescription = [
  'O Instagram CLI é um repositório que permite usar o Instagram inteiramente pelo terminal — sem abrir o app ou o site. Sem feed para consumir, sem algoritmo te prendendo. Você executa as operações que precisa via linha de comando e segue em frente.',
  'O potencial real está na integração com LLMs. Com o Instagram CLI como base, você conecta um modelo de IA para automatizar respostas, moderar comentários, fazer pesquisa competitiva ou operar campanhas de engajamento de forma programática e escalável.',
  'Para criadores e equipes de conteúdo, é uma forma de separar operação de consumo: você opera o Instagram como ferramenta de negócio, sem as distrações do feed. Para desenvolvedores, é uma base para construir automações de redes sociais com controle total sobre o que o agente faz.',
];

export default function InstagramCliPage() {
  return (
    <SkillPage
      title="Instagram CLI — Terminal sem Feed"
      description="Use o Instagram pelo terminal. Sem doom-scrolling, sem feed. Integra com LLMs para automatizar respostas e moderação."
      category="Apps"
      categoryColor="apps"
      longDescription={longDescription}
      features={features}
      primaryLink="https://docs.anthropic.com/en/docs/claude-code/overview"
      primaryLabel="Ver Claude Code Docs"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/tools/instagram-cli"
    />
  );
}
