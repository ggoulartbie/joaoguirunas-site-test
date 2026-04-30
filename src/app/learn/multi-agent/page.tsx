import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { RelatedPages } from '@/shared/components/ui/RelatedPages';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Time de Agentes com IA',
  description:
    'Monte uma empresa de agentes de IA trabalhando 24/7. Do zero a uma operação completa delegada para IA.',
  alternates: { canonical: `${siteConfig.url}/learn/multi-agent` },
  openGraph: {
    title: 'Time de Agentes com IA | João Guirunas',
    description:
      'Monte uma empresa de agentes de IA trabalhando 24/7. Do zero a uma operação completa delegada para IA.',
    url: `${siteConfig.url}/learn/multi-agent`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Time de Agentes com IA | João Guirunas',
    description:
      'Monte uma empresa de agentes de IA trabalhando 24/7. Do zero a uma operação completa delegada para IA.',
  },
};

const features = [
  {
    title: 'Arquitetura Multi-Agent',
    description:
      'Múltiplos agentes especializados trabalhando em paralelo, cada um com sua sessão e conjunto de tarefas.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  },
  {
    title: 'Memória Compartilhada entre Agentes',
    description:
      'Agentes compartilham contexto e histórico — decisões de um ficam disponíveis para todos os outros.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>',
  },
  {
    title: 'Agentes Especializados por Função',
    description:
      'Um agente para conteúdo, outro para suporte, outro para análise — cada um expert na sua área.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>',
  },
  {
    title: 'Integração WhatsApp e Telegram',
    description:
      'Gateway que recebe mensagens do WhatsApp ou Telegram e direciona para o agente correto automaticamente.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3.75h3M6.75 20.25v.008h.008v-.008H6.75z"/>',
  },
  {
    title: 'Coordenação Automática a cada 15min',
    description:
      'Cada agente verifica suas tarefas pendentes a cada 15 minutos sem intervenção humana.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  },
  {
    title: 'Custo a partir de R$ 39/mês em APIs',
    description:
      'Operação completa com 6 agentes rodando dezenas de tarefas diárias por menos de R$ 40/mês.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>',
  },
];

const longDescription = [
  'Um time de agentes de IA é uma arquitetura onde múltiplos agentes especializados trabalham em paralelo, cada um com sua própria sessão, personalidade e conjunto de tarefas. Um agente pode ser responsável por conteúdo, outro por customer support, outro por análise de dados — todos coordenados automaticamente.',
  'A comunicação funciona via Gateway que recebe mensagens do WhatsApp ou Telegram, carrega o histórico da sessão correta e direciona para o agente certo. Cada agente acorda a cada 15 minutos para verificar suas tarefas pendentes.',
  'Casos reais: empresas que saíram de zero agentes para uma operação completa em 13 dias, com 6 agentes rodando dezenas de tarefas diárias — relatórios, métricas, conteúdo e suporte — por menos de R$ 40/mês em custos de API.',
];

export default function MultiAgentPage() {
  return (
    <SkillPage
      title="Time de Agentes com IA"
      description="Monte uma empresa de agentes de IA trabalhando 24/7. Do zero a uma operação completa delegada para IA."
      category="Aprendizado"
      categoryColor="aprendizado"
      longDescription={longDescription}
      features={features}
      primaryLink="https://github.com/anthropics/claude-code"
      primaryLabel="Ver no GitHub"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/learn/multi-agent"
    >
      <RelatedPages
        heading="Ver também"
        pages={[
          { href: '/setup/claude-code',        title: 'Setup Claude Code',         description: 'Configure o Claude Code antes de montar o time de agentes.', tag: 'Setup', isPrereq: true },
          { href: '/framework/aiox-framework', title: 'AIOX Framework',            description: 'O framework que estrutura e orquestra os agentes com squads, personas e QA loop.', tag: 'AIOX' },
          { href: '/skills/claude-agent-teams', title: 'Claude Agent Teams',       description: '27 agentes em 3 squads especializadas — prontos para ativar no Claude Code.', tag: 'Skills' },
          { href: '/learn/managed-agents',      title: 'Managed Agents',           description: 'Como a Anthropic projetou a arquitetura brain/hands dos agentes autônomos.', tag: 'Learn' },
        ]}
      />
    </SkillPage>
  );
}
