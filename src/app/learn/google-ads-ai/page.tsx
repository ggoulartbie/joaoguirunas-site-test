export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Google Ads com IA',
  description:
    'Otimização de Google Ads com IA. Performance Max, Search e Display gerenciados por agentes.',
  alternates: { canonical: `${siteConfig.url}/learn/google-ads-ai` },
  openGraph: {
    title: 'Google Ads com IA | João Guirunas',
    description:
      'Otimização de Google Ads com IA. Performance Max, Search e Display gerenciados por agentes.',
    url: `${siteConfig.url}/learn/google-ads-ai`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Google Ads com IA | João Guirunas',
    description:
      'Otimização de Google Ads com IA. Performance Max, Search e Display gerenciados por agentes.',
  },
};

const features = [
  {
    title: 'Performance Max',
    description:
      'Otimização de campanhas PMax com IA para maximizar conversões em todos os canais Google.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"/>',
  },
  {
    title: 'Search Campaigns',
    description:
      'Geração e otimização de keywords, anúncios responsivos e extensões com IA.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>',
  },
  {
    title: 'Display & Video',
    description:
      'Criação de assets visuais e estratégias de remarketing otimizadas por agentes.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"/>',
  },
  {
    title: 'Análise de Quality Score',
    description:
      'Diagnóstico e melhoria de Quality Score com recomendações baseadas em dados.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>',
  },
  {
    title: 'Bidding Strategies',
    description:
      'Seleção e configuração de estratégias de lance baseadas em objetivos de negócio.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
  {
    title: 'Scripts & Automação',
    description:
      'Google Ads Scripts gerados por IA para automação de tarefas e relatórios.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/>',
  },
];

const longDescription = [
  'Domine Google Ads com inteligência artificial. Este guia ensina como usar agentes para otimizar campanhas Search, Display, Video e Performance Max.',
  'Aprenda técnicas avançadas de geração de keywords, criação de anúncios responsivos, análise de Quality Score, e automação via Google Ads Scripts.',
  'O conteúdo inclui estratégias de bidding, estruturação de contas, e integração com ferramentas de IA para análise de dados e tomada de decisão.',
];

export default function GoogleAdsAiPage() {
  return (
    <SkillPage
      title="Google Ads com IA"
      description="Otimização de Google Ads com IA. Performance Max, Search e Display gerenciados por agentes."
      category="Integrações"
      categoryColor="integracoes"
      longDescription={longDescription}
      features={features}
      primaryLink="https://developers.google.com/google-ads/api/docs/start"
      primaryLabel="Google Ads API"
      isExternal
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      bgImage="/images/bg-google.png"
      canonicalPath="/learn/google-ads-ai"
    />
  );
}
