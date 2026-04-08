import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Remotion + Claude Code',
  description:
    'Edite e crie vídeos com Claude Code. Cortes, legendas, split screen — tudo via prompt no terminal.',
  alternates: { canonical: `${siteConfig.url}/skills/remotion` },
  openGraph: {
    title: 'Remotion + Claude Code | GrowthSales Open Source',
    description:
      'Edite e crie vídeos com Claude Code. Cortes, legendas, split screen — tudo via prompt no terminal.',
    url: `${siteConfig.url}/skills/remotion`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Remotion + Claude Code | GrowthSales Open Source',
    description:
      'Edite e crie vídeos com Claude Code. Cortes, legendas, split screen — tudo via prompt no terminal.',
  },
};

const features = [
  {
    title: 'Video Editing via Prompt',
    description:
      'Descreva o que quer em português e o Claude Code aplica cortes, efeitos e transições no vídeo.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"/>',
  },
  {
    title: 'Auto Subtitles',
    description:
      'Geração automática de legendas sincronizadas com o áudio, sem precisar de ferramenta externa.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>',
  },
  {
    title: 'Split Screen',
    description:
      'Divida a tela em múltiplos quadros com conteúdos diferentes — ideal para comparações e tutoriais.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>',
  },
  {
    title: 'Render MP4',
    description:
      'Exportação em MP4 de alta qualidade direto pelo terminal, sem instalar editor de vídeo.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>',
  },
  {
    title: 'Animations & Transitions',
    description:
      'Adicione animações de entrada, saída e transições entre cenas com um único comando.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>',
  },
  {
    title: 'Create from Scratch',
    description:
      'Crie vídeos completos do zero a partir de um briefing em texto — sem gravar nada.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
];

const longDescription = [
  'Remotion é a skill que transforma o Claude Code em editor de vídeo. Com dois comandos no terminal você instala a skill e passa a editar vídeos via prompt — cortes, legendas automáticas, split screen, animações e exportação em MP4.',
  'A integração funciona assim: você filma seu vídeo, volta ao terminal, roda o comando /remotion e descreve o que quer. O Claude Code lê o arquivo, aplica os efeitos e renderiza. O que levaria horas num editor tradicional leva segundos.',
  'Casos de uso reais: edição de reels, criação de vídeos de produto, tutoriais técnicos com narração e legendas automáticas, intros animadas para YouTube — tudo sem abrir um editor de vídeo.',
];

export default function RemotionPage() {
  return (
    <SkillPage
      title="Remotion + Claude Code"
      description="Edite e crie vídeos com Claude Code. Cortes, legendas, split screen — tudo via prompt no terminal."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://github.com/claudecodeofficial/remotion-skill"
      primaryLabel="Ver no GitHub"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/skills/remotion"
    />
  );
}
