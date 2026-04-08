import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Ads Dashboard com Claude Code',
  description:
    'Meta Ads, Google Ads e Analytics em um painel centralizado. Relatórios, alertas e recomendações automáticas.',
  alternates: { canonical: `${siteConfig.url}/skills/ads-dashboard` },
  openGraph: {
    title: 'Ads Dashboard com Claude Code | GrowthSales Open Source',
    description:
      'Meta Ads, Google Ads e Analytics em um painel centralizado. Relatórios, alertas e recomendações automáticas.',
    url: `${siteConfig.url}/skills/ads-dashboard`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Ads Dashboard com Claude Code | GrowthSales Open Source',
    description:
      'Meta Ads, Google Ads e Analytics em um painel centralizado. Relatórios, alertas e recomendações automáticas.',
  },
};

const features = [
  {
    title: 'Dashboard Unificado Multi-plataforma',
    description:
      'Meta Ads, Google Ads e Google Analytics em um único painel — sem navegar entre plataformas.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>',
  },
  {
    title: 'Performance Meta Ads e Google Ads',
    description:
      'CPA, CTR, ROAS e termos de busca de todas as campanhas em uma única visualização comparativa.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>',
  },
  {
    title: 'Google Analytics Integrado',
    description:
      'Dados de tráfego, conversões e comportamento do GA4 conectados diretamente ao dashboard.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/>',
  },
  {
    title: 'Análise e Recomendações Automáticas',
    description:
      'O Claude analisa performance por campanha e sugere otimizações baseadas em dados reais.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>',
  },
  {
    title: 'Alertas quando Métricas Mudam',
    description:
      'Notificações automáticas quando CPA sobe, CTR cai ou qualquer métrica passa do threshold definido.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>',
  },
  {
    title: 'Relatórios Comparativos de Campanha',
    description:
      'Compare períodos, campanhas e canais automaticamente — relatórios gerados sem trabalho manual.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>',
  },
];

const longDescription = [
  'O Ads Dashboard unifica Meta Ads, Google Ads e Google Analytics em um único painel construído e operado pelo Claude Code. Você vê performance de todas as campanhas, análise comparativa e recomendações de otimização — em um local simplificado, sem navegar entre plataformas.',
  'O Claude Code raspa os dados, analisa performance por campanha (CPA, CTR, termos, oportunidades) e sugere decisões baseadas em números reais. Quando métricas caem ou sobem além de um threshold, o agente emite alertas automáticos.',
  'Esse é o modelo de vibe marketing: você define a estratégia, o agente opera a análise e as otimizações. Gestores de tráfego que adotaram essa abordagem reportam redução de horas de trabalho manual por semana sem perder controle sobre as decisões finais.',
];

export default function AdsDashboardPage() {
  return (
    <SkillPage
      title="Ads Dashboard com Claude Code"
      description="Meta Ads, Google Ads e Analytics em um painel centralizado. Relatórios, alertas e recomendações automáticas."
      category="Integrações"
      categoryColor="integracoes"
      longDescription={longDescription}
      features={features}
      primaryLink="https://github.com/anthropics/claude-code"
      primaryLabel="Ver Documentação"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/skills/ads-dashboard"
    />
  );
}
