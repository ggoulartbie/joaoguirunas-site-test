import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Managed Agents — Anthropic Engineering',
  description:
    'Como a Anthropic desacoplou o "cérebro" das "mãos" em sistemas de agentes. Arquitetura Session/Harness/Sandbox com 60% de redução no tempo de resposta.',
  alternates: { canonical: `${siteConfig.url}/learn/managed-agents` },
  openGraph: {
    title: 'Managed Agents — Anthropic Engineering | GrowthSales Open Source',
    description:
      'Como a Anthropic desacoplou o "cérebro" das "mãos" em sistemas de agentes. Arquitetura Session/Harness/Sandbox com 60% de redução no tempo de resposta.',
    url: `${siteConfig.url}/learn/managed-agents`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Managed Agents — Anthropic Engineering | GrowthSales Open Source',
    description:
      'Como a Anthropic desacoplou o "cérebro" das "mãos" em sistemas de agentes. Arquitetura Session/Harness/Sandbox com 60% de redução no tempo de resposta.',
  },
};

const features = [
  {
    title: 'Desacoplamento Brain / Hands',
    description:
      'O "cérebro" (harness + modelo) é separado das "mãos" (sandbox de execução). Cada componente evolui de forma independente conforme os modelos melhoram — sem redesenho arquitetural.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>',
  },
  {
    title: 'Session — Event Log Durável',
    description:
      'A sessão é um log append-only de todos os eventos. Vive fora da janela de contexto do Claude — o harness seleciona, transforma e rebobina eventos conforme necessário para tarefas longas.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"/>',
  },
  {
    title: 'Harness Resiliente',
    description:
      'Se o harness falhar, um novo retoma de onde parou via wake(sessionId). Sem perda de progresso — a inferência começa imediatamente enquanto eventos pendentes são puxados do log.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>',
  },
  {
    title: 'Sandbox como Cattle',
    description:
      'Containers são tratados como cattle — descartáveis e substituíveis, não como pets gerenciados manualmente. Falha no container vira um erro de tool-call que o Claude trata naturalmente.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"/>',
  },
  {
    title: 'Segurança de Credenciais',
    description:
      'Credenciais nunca chegam ao sandbox onde o código do Claude roda. Tokens OAuth ficam em vaults — um proxy faz as chamadas externas. Tokens de repositório autenticam Git antes do código do Claude executar.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>',
  },
  {
    title: '60% Menos Tempo de Resposta',
    description:
      'Com o harness fora do container, a inferência começa imediatamente. Resultado: p50 time-to-first-token caiu ~60% e p95 caiu mais de 90% — sem nenhuma mudança no modelo.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  },
];

const longDescription = [
  'A Anthropic publicou no blog de engenharia como resolveu um problema fundamental: harnesses (o código que gerencia agentes) codificam suposições sobre limitações do modelo — e ficam obsoletos conforme os modelos melhoram. A solução foi desacoplar três componentes: Session (log de eventos), Harness (o cérebro) e Sandbox (as mãos de execução).',
  'Na arquitetura Managed Agents, cada componente evolui de forma independente via interfaces padronizadas: execute(name, input), provision({resources}), wake(sessionId) e getEvents(). O harness não sabe se o sandbox é um container, um celular ou outro dispositivo — só precisa que aceite execute() e retorne strings. Isso elimina acoplamento desnecessário e permite múltiplos "brains" coordenando múltiplos "hands".',
  'O resultado prático foi expressivo: ao tirar o harness de dentro dos containers, a inferência começa imediatamente enquanto eventos pendentes são carregados em paralelo. O p50 de time-to-first-token caiu ~60% e o p95 caiu mais de 90%. É um artigo essencial para quem está construindo sistemas de agentes em produção.',
];

export default function ManagedAgentsPage() {
  return (
    <SkillPage
      title="Managed Agents — Anthropic Engineering"
      description="Como a Anthropic desacoplou o 'cérebro' das 'mãos' em sistemas de agentes. Arquitetura Session/Harness/Sandbox com 60% de redução no tempo de resposta."
      category="Aprendizado"
      categoryColor="aprendizado"
      longDescription={longDescription}
      features={features}
      primaryLink="https://www.anthropic.com/engineering/managed-agents"
      primaryLabel="Ler Artigo Original"
      author="Anthropic Engineering"
      authorUrl="https://www.anthropic.com/engineering"
      canonicalPath="/learn/managed-agents"
    />
  );
}
