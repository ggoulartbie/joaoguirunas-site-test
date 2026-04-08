import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Claude Code vs N8N',
  description:
    'Migre suas automações do N8N para o Claude Code. Webhooks, APIs, lógica condicional — tudo no terminal.',
  alternates: { canonical: `${siteConfig.url}/skills/n8n` },
  openGraph: {
    title: 'Claude Code vs N8N | GrowthSales Open Source',
    description:
      'Migre suas automações do N8N para o Claude Code. Webhooks, APIs, lógica condicional — tudo no terminal.',
    url: `${siteConfig.url}/skills/n8n`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Claude Code vs N8N | GrowthSales Open Source',
    description:
      'Migre suas automações do N8N para o Claude Code. Webhooks, APIs, lógica condicional — tudo no terminal.',
  },
};

const features = [
  {
    title: 'Automações via Terminal',
    description:
      'Descreva o fluxo em português e o Claude Code gera o código completo — sem arrastar blocos.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/>',
  },
  {
    title: 'Webhook e API Integration',
    description:
      'Cria e expõe webhooks, conecta APIs externas e trata autenticação sem configuração manual.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>',
  },
  {
    title: 'Sem Limite de Complexidade',
    description:
      'Lógica condicional aninhada, loops, tratamento de erro — sem os limites dos nós visuais do N8N.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  },
  {
    title: 'Rodar em VPS sem Custo por Task',
    description:
      'Hospede no seu próprio servidor — sem pagar por execução, sem limite de tarefas mensais.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"/>',
  },
  {
    title: 'Lógica Condicional e Tratamento de Erros',
    description:
      'Fluxos com condições complexas, retentativas automáticas e notificação de falhas.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>',
  },
  {
    title: 'Relatórios Automáticos via Telegram',
    description:
      'Envie relatórios diários para a equipe via Telegram — programados e executados sem intervenção.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>',
  },
];

const longDescription = [
  'O N8N popularizou automações visuais sem código — arrastar blocos, conectar APIs, montar fluxos. O Claude Code faz a mesma coisa, mas sem os limites. Você escreve o que quer em português e o agente gera webhook, conecta APIs, trata erros e roda o fluxo.',
  'A vantagem prática: sem nós que quebram a cada atualização, sem limite de execuções e sem pagar por task. Você roda no seu ambiente ou num VPS e o Claude Code mantém o fluxo funcionando indefinidamente.',
  'Casos de uso: conectar três ferramentas de forma automática, enviar relatórios diários para a equipe via Telegram, processar dados e atualizar planilhas — tudo que o N8N faz, com mais flexibilidade e sem interface gráfica.',
];

export default function N8nPage() {
  return (
    <SkillPage
      title="Claude Code vs N8N"
      description="Migre suas automações do N8N para o Claude Code. Webhooks, APIs, lógica condicional — tudo no terminal."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://github.com/czlonkowski/n8n-mcp"
      primaryLabel="Ver N8N MCP no GitHub"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/skills/n8n"
    />
  );
}
