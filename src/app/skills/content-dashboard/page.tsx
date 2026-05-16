export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Dashboard de Conteúdo com MCP',
  description:
    'Claude Code constrói e opera seu dashboard de conteúdo. Publica, agenda, analisa — tudo dentro do software que ele mesmo criou.',
  alternates: { canonical: `${siteConfig.url}/skills/content-dashboard` },
  openGraph: {
    title: 'Dashboard de Conteúdo com MCP | João Guirunas',
    description:
      'Claude Code constrói e opera seu dashboard de conteúdo. Publica, agenda, analisa — tudo dentro do software que ele mesmo criou.',
    url: `${siteConfig.url}/skills/content-dashboard`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Dashboard de Conteúdo com MCP | João Guirunas',
    description:
      'Claude Code constrói e opera seu dashboard de conteúdo. Publica, agenda, analisa — tudo dentro do software que ele mesmo criou.',
  },
};

const features = [
  {
    title: 'Dashboard Construído pelo Próprio Claude',
    description:
      'O Claude Code cria o software de dashboard conforme suas especificações e depois opera dentro dele.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"/>',
  },
  {
    title: 'MCP Server Customizado',
    description:
      'Um MCP server conecta o Claude ao dashboard, dando a ele acesso completo para publicar e gerenciar conteúdo.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/>',
  },
  {
    title: 'Publicação Multi-plataforma',
    description:
      'Posts criados e publicados em todas as plataformas a partir de uma única conversa com o Claude.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"/>',
  },
  {
    title: 'Agendamento de Posts',
    description:
      'O Claude seleciona o melhor horário com base nos seus analytics e agenda automaticamente.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>',
  },
  {
    title: 'Analytics e Métricas Integradas',
    description:
      'Visualize performance de conteúdo e receba recomendações do Claude baseadas nos dados reais.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>',
  },
  {
    title: 'AI News em Tempo Real',
    description:
      'O Claude monitora novidades em IA e sugere conteúdo relevante baseado nas tendências do momento.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"/>',
  },
];

const longDescription = [
  'O Content Dashboard é um caso de uso onde o Claude Code constrói o software e depois opera dentro dele. Primeiro, você pede ao Claude para criar um dashboard de conteúdo com as funcionalidades que você precisa. Ele constrói. Depois, você cria um MCP server que conecta o Claude ao dashboard.',
  'Com o MCP server ativo, o Claude não só cria conteúdo — ele publica, agenda, analisa métricas, verifica novidades em IA e gerencia sua lista de tarefas, tudo dentro da ferramenta que ele mesmo construiu.',
  'O fluxo na prática: você diz ao Claude que precisa de conteúdo sobre um tema. Em minutos, você tem posts prontos para cada plataforma onde publica. O Claude seleciona o melhor horário baseado nos seus analytics e agenda automaticamente.',
];

export default function ContentDashboardPage() {
  return (
    <SkillPage
      title="Dashboard de Conteúdo com MCP"
      description="Claude Code constrói e opera seu dashboard de conteúdo. Publica, agenda, analisa — tudo dentro do software que ele mesmo criou."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://github.com/anthropics/claude-code"
      primaryLabel="Ver Documentação"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/skills/content-dashboard"
    />
  );
}
