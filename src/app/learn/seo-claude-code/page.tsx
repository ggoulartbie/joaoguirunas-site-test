export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'SEO com Claude Code',
  description:
    'Agentes de SEO que auditam, planejam e implementam melhorias no seu site. Do relatório à execução automática.',
  alternates: { canonical: `${siteConfig.url}/learn/seo-claude-code` },
  openGraph: {
    title: 'SEO com Claude Code | João Guirunas',
    description:
      'Agentes de SEO que auditam, planejam e implementam melhorias no seu site. Do relatório à execução automática.',
    url: `${siteConfig.url}/learn/seo-claude-code`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'SEO com Claude Code | João Guirunas',
    description:
      'Agentes de SEO que auditam, planejam e implementam melhorias no seu site. Do relatório à execução automática.',
  },
};

const features = [
  {
    title: 'Auditoria Automática com 5 Agentes',
    description:
      'Cinco agentes entram na sua página e analisam estrutura, títulos, meta tags, velocidade e keywords simultaneamente.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>',
  },
  {
    title: 'Relatório Completo de SEO',
    description:
      'Problemas identificados e melhorias priorizadas por impacto — sem precisar contratar uma agência.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>',
  },
  {
    title: 'Identificação de Keywords de Conversão',
    description:
      'Análise de relevância e intenção de busca para encontrar as keywords que trazem visitantes que convertem.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>',
  },
  {
    title: 'Implementação das Melhorias pelo Próprio Claude',
    description:
      'Após o relatório, o Claude Code implementa todas as melhorias diretamente no código do seu site.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>',
  },
  {
    title: 'Compatível com Respostas de IA (ChatGPT, Perplexity)',
    description:
      'Otimizações para que seu site apareça em respostas de IAs como ChatGPT e Perplexity, não só no Google.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>',
  },
  {
    title: 'Sem Agência de SEO Necessária',
    description:
      'Do diagnóstico à implementação, tudo feito pelo Claude Code — sem contratar especialistas externos.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>',
  },
];

const longDescription = [
  'Com o repositório de SEO para Claude Code, você executa /seo seguido do link do seu site e cinco agentes entram na página, leem todas as palavras, analisam estrutura, títulos, meta tags, velocidade e relevância de keywords. O resultado é um relatório completo com problemas identificados e melhorias priorizadas.',
  'O diferencial dessa abordagem é que, após o relatório, você pode pedir para o próprio Claude Code implementar todas as melhorias — sem precisar de um desenvolvedor ou agência. O agente faz as alterações diretamente no código do seu site.',
  'As otimizações não são só para o Google. O relatório inclui melhorias para que seu site apareça bem em respostas de ferramentas de IA como ChatGPT e Perplexity — que estão se tornando fontes primárias de descoberta para muitos públicos.',
];

export default function SeoClaudeCodePage() {
  return (
    <SkillPage
      title="SEO com Claude Code"
      description="Agentes de SEO que auditam, planejam e implementam melhorias no seu site. Do relatório à execução automática."
      category="Aprendizado"
      categoryColor="aprendizado"
      longDescription={longDescription}
      features={features}
      primaryLink="https://github.com/anthropics/claude-code"
      primaryLabel="Ver Documentação"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/learn/seo-claude-code"
    />
  );
}
