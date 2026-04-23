import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'n8n Killers Squad | Tutorial de Instalação e Uso — AIOX',
  description:
    '10 agentes AI especializados para migrar workflows n8n e criar automações via API. Tutorial passo a passo: instalação, Claude Code, AIOX e ativação da squad.',
  alternates: { canonical: `${siteConfig.url}/skills/n8n-killers` },
  openGraph: {
    title: 'n8n Killers Squad | Tutorial de Instalação e Uso — AIOX',
    description:
      '10 agentes AI especializados para migrar workflows n8n e criar automações via API. Tutorial passo a passo: instalação, Claude Code, AIOX e ativação da squad.',
    url: `${siteConfig.url}/skills/n8n-killers`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'n8n Killers Squad | Tutorial de Instalação e Uso — AIOX',
    description:
      '10 agentes AI especializados para migrar workflows n8n e criar automações via API. Tutorial passo a passo: instalação, Claude Code, AIOX e ativação da squad.',
  },
};

const longDescription = [
  'A squad n8n Killers reúne 10 agentes AI especializados em dois fluxos críticos: migrar workflows n8n para qualquer outra plataforma com fidelidade total, e construir automações via API do zero sem depender de nenhuma ferramenta visual.',
  'Cada agente tem escopo definido — do orquestrador @dexter ao especialista em QA @anton — cobrindo análise de flows, estratégia de migração, transformação de dados, credenciais, webhooks, custom nodes e error handling. O trabalho é dividido, sequenciado e validado em ciclos estruturados.',
  'O resultado: automações robustas, rastreáveis e sem lock-in de plataforma. Você não precisa reescrever tudo do zero nem confiar em um único agente generalista para decisões que exigem especialização real.',
];

const features = [
  {
    title: '10 Agentes Especializados',
    description:
      'Cada agente tem escopo preciso: orquestração, análise de flow, migração, dados, segurança, webhooks, API, error handling e QA.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>',
  },
  {
    title: 'Migration Cycle',
    description:
      '6 fases para migrar workflows n8n para Make, Zapier, Pipedream ou código customizado — com gate de qualidade após cada fase.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>',
  },
  {
    title: 'API Automation Cycle',
    description:
      '6 fases para criar automações via API do zero: design, setup, implementação, reliability, validação e entrega final.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  },
  {
    title: 'Task-Driven, Zero Improviso',
    description:
      'Cada agente executa tasks pré-definidas. Nenhum agente inventa — o que não foi especificado não é implementado.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>',
  },
  {
    title: 'QA por Anton Chigurh',
    description:
      'Validação E2E, edge cases, regression check e verdict final (PASS/FAIL/WAIVED) antes de qualquer entrega para produção.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>',
  },
  {
    title: 'Error Handling por Amy Dunne',
    description:
      'Retry automático, circuit breaker, monitoramento e incident playbook para manter as automações rodando em produção.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>',
  },
];

// ─── Helper: CodeBlock ────────────────────────────────────────────────────────

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="mt-4">
      <div
        className="px-4 py-2 bg-[#0D0D14] border border-white/10 border-b-0 inline-block"
        style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.4)',
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      <pre className="bg-[#0D0D14] border border-white/10 p-5 overflow-x-auto">
        <code
          className="text-sm text-white/80 leading-relaxed"
          style={{ fontFamily: "'Geist Mono', monospace" }}
        >
          {code}
        </code>
      </pre>
    </div>
  );
}

// ─── Helper: SectionLabel ─────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[#FF4400] mb-3"
      style={{
        fontFamily: "'Geist Mono', monospace",
        fontSize: '0.65rem',
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        fontWeight: 600,
      }}
    >
      {children}
    </p>
  );
}

// ─── Helper: StepNumber ───────────────────────────────────────────────────────

function StepNumber({ n }: { n: number }) {
  return (
    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#FF4400] flex items-center justify-center text-white text-xs font-bold">
      {n}
    </span>
  );
}

// ─── Helper: CheckItem ────────────────────────────────────────────────────────

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <svg
        className="h-5 w-5 text-[#FF4400] flex-shrink-0 mt-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-white/70 text-sm leading-relaxed">{children}</span>
    </li>
  );
}

// ─── Helper: Note ─────────────────────────────────────────────────────────────

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 flex items-start gap-3 border border-white/10 bg-white/[0.03] px-4 py-3">
      <svg
        className="h-4 w-4 text-[#FF4400] flex-shrink-0 mt-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p
        className="text-white/50 text-xs leading-relaxed"
        style={{ fontFamily: "'Geist Mono', monospace" }}
      >
        {children}
      </p>
    </div>
  );
}

// ─── Helper: AgentCard ────────────────────────────────────────────────────────

function AgentCard({
  name,
  agentId,
  role,
  description,
}: {
  name: string;
  agentId: string;
  role: string;
  description: string;
}) {
  return (
    <div className="glass-card p-5 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <span className="text-base font-bold text-white leading-tight">{name}</span>
        <span
          className="text-[#FF4400] text-xs flex-shrink-0"
          style={{ fontFamily: "'Geist Mono', monospace" }}
        >
          {agentId}
        </span>
      </div>
      <span
        className="text-white/40 text-xs uppercase tracking-wide"
        style={{ fontFamily: "'Geist Mono', monospace" }}
      >
        {role}
      </span>
      <p className="text-white/60 text-sm leading-relaxed mt-1">{description}</p>
    </div>
  );
}

// ─── Helper: WorkflowCard ─────────────────────────────────────────────────────

function WorkflowCard({
  title,
  subtitle,
  phases,
}: {
  title: string;
  subtitle: string;
  phases: string[];
}) {
  return (
    <div className="glass-card p-6 flex flex-col gap-4">
      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-white/50 text-sm mt-1" style={{ fontFamily: "'Geist Mono', monospace" }}>
          {subtitle}
        </p>
      </div>
      <ol className="flex flex-col gap-3">
        {phases.map((phase, i) => (
          <li key={i} className="flex items-start gap-3">
            <StepNumber n={i + 1} />
            <span className="text-white/70 text-sm leading-relaxed pt-0.5">{phase}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ─── Tutorial Section ─────────────────────────────────────────────────────────

function TutorialSection() {
  const agents = [
    {
      name: 'Dexter Morgan',
      agentId: '@dexter',
      role: 'Chief Orchestrator',
      description:
        'Recebe o briefing, avalia a complexidade e distribui o trabalho para os agentes certos na sequência correta. Não implementa nada — orquestra tudo. Consolida os outputs e fecha a operação com um handoff documentado.',
    },
    {
      name: 'Hannibal Lecter',
      agentId: '@hannibal',
      role: 'Flow Architect & n8n Analyst',
      description:
        'Disseca workflows n8n com precisão cirúrgica. Lê o JSON, mapeia cada nó, identifica triggers e dependências, e produz um relatório completo de análise antes de qualquer migração começar.',
    },
    {
      name: 'Jason Bourne',
      agentId: '@bourne',
      role: 'Migration Strategist',
      description:
        'Avalia a viabilidade da migração, mapeia equivalentes no sistema-alvo (Make, Zapier, Pipedream ou código custom) e define a estratégia de execução. Valida também o resultado final após a implementação.',
    },
    {
      name: 'Drácula',
      agentId: '@dracula',
      role: 'Data Transformation Specialist',
      description:
        'Mapeia schemas de dados entre sistemas, implementa transformações e pipelines ETL. Garante que os dados saiam de um formato e cheguem no outro sem perda, usando jsonpath-plus, luxon e validação AJV.',
    },
    {
      name: 'Villanelle',
      agentId: '@villanelle',
      role: 'Credential & Security Specialist',
      description:
        'Configura OAuth2, JWT, HMAC e variáveis de ambiente. Faz auditoria de segurança em credenciais e integrações, garantindo que nenhum token ou secret vaze em logs ou código.',
    },
    {
      name: 'Ghostface',
      agentId: '@ghostface',
      role: 'Webhook & Event Engineer',
      description:
        'Implementa e migra triggers baseados em eventos — webhooks, schedules e event listeners. Garante idempotência, valida payloads e assina requisições com HMAC para prevenir chamadas não autorizadas.',
    },
    {
      name: 'Lisbeth Salander',
      agentId: '@lisbeth',
      role: 'API Integration & Code Engineer',
      description:
        'Constrói as integrações HTTP, descobre endpoints via documentação ou exploração, implementa custom nodes em TypeScript e cria as automações do zero quando nenhum nó nativo cobre o caso.',
    },
    {
      name: 'Amy Dunne',
      agentId: '@amy',
      role: 'Error Handling & Reliability Engineer',
      description:
        'Implementa retry automático, circuit breaker e dead letter queues. Configura monitoramento, alertas e escreve o incident playbook para que a equipe saiba exatamente o que fazer quando algo falha em produção.',
    },
    {
      name: 'Anton Chigurh',
      agentId: '@anton',
      role: 'QA Validator',
      description:
        'Valida tudo antes da entrega: testes E2E, edge cases, regression check e análise de performance. Emite um verdict final — PASS, CONCERNS, FAIL ou WAIVED — sem o qual nenhuma operação é considerada concluída.',
    },
    {
      name: 'V',
      agentId: '@v',
      role: 'Workflow Designer & Orchestration Architect',
      description:
        'Desenha a arquitetura do workflow do zero: define a estrutura de nodes, sub-workflows, condicionais e loops antes de qualquer linha de código. Garante que o design seja escalável e sem dependências circulares.',
    },
  ];

  const migrationPhases = [
    'Analysis — Hannibal disseca e mapeia o workflow',
    'Strategy — Bourne avalia e planeja a migração',
    'Setup — Drácula + Villanelle configuram dados e credenciais (paralelo)',
    'Implementation — Ghostface + Lisbeth + Amy implementam',
    'Validation — Ghostface + Villanelle + Bourne + Anton validam',
    'Finalization — Dexter consolida e entrega handoff',
  ];

  const apiPhases = [
    'Design — V desenha o workflow e sub-workflows',
    'Setup — Villanelle + Lisbeth configuram credenciais e APIs (paralelo)',
    'Implementation — Drácula + Ghostface + Lisbeth implementam',
    'Reliability — Amy configura error handling e monitoring (paralelo)',
    'Validation — Ghostface + Villanelle + Anton validam',
    'Finalization — Dexter consolida e entrega',
  ];

  return (
    <>
      {/* ── Agentes ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#08080C]" aria-labelledby="agents-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>Os Agentes</SectionLabel>
          <h2 id="agents-heading" className="text-3xl font-bold text-white sm:text-4xl mb-3">
            Conheça os Especialistas
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mb-10">
            10 agentes com escopo e responsabilidades distintas. Cada um é ativado na fase certa da operação.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {agents.slice(0, 8).map((agent) => (
              <AgentCard key={agent.agentId} {...agent} />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
            {agents.slice(8).map((agent) => (
              <AgentCard key={agent.agentId} {...agent} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Pré-requisitos ─────────────────────────────────────────────── */}
      <section className="py-20 bg-[#08080C]" aria-labelledby="prereqs-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>Antes de Começar</SectionLabel>
          <h2 id="prereqs-heading" className="text-3xl font-bold text-white sm:text-4xl mb-8">
            Pré-requisitos
          </h2>
          <ul className="space-y-3 max-w-lg">
            <CheckItem>Node.js &gt;= 18 instalado</CheckItem>
            <CheckItem>Claude Code instalado e autenticado</CheckItem>
            <CheckItem>Conta Anthropic com acesso à API</CheckItem>
            <CheckItem>Git instalado</CheckItem>
          </ul>
        </div>
      </section>

      {/* ── Passo 1 ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0A0A0F]" aria-labelledby="step1-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>Passo 01</SectionLabel>
          <h2 id="step1-heading" className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Instalar Claude Code
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mb-2">
            O Claude Code é o CLI oficial da Anthropic. Instale via npm e autentique com sua conta.
          </p>
          <CodeBlock label="Terminal" code="npm install -g @anthropic-ai/claude-code" />
          <CodeBlock label="Autenticar" code="claude" />
          <Note>
            Na primeira execução, o Claude Code abrirá o browser para autenticação com sua conta
            Anthropic.
          </Note>
        </div>
      </section>

      {/* ── Passo 2 ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#08080C]" aria-labelledby="step2-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>Passo 02</SectionLabel>
          <h2 id="step2-heading" className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Instalar o AIOX Framework
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mb-2">
            O AIOX é o meta-framework que orquestra os agentes. Clone o repositório e configure no
            seu projeto.
          </p>
          <CodeBlock
            label="Terminal"
            code={`# Clonar o AIOX
git clone https://github.com/SynkraAI/aiox.git meu-projeto
cd meu-projeto

# Instalar dependências
npm install

# Inicializar o AIOX
npx aiox init`}
          />
          <Note>
            O comando aiox init configura o .aiox-core/, cria a estrutura de diretórios e registra
            os agentes base no Claude Code.
          </Note>
        </div>
      </section>

      {/* ── Passo 3 ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0A0A0F]" aria-labelledby="step3-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>Passo 03</SectionLabel>
          <h2 id="step3-heading" className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Instalar a Squad n8n Killers
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mb-2">
            Baixe o pacote da squad e instale no diretório squads/ do seu projeto AIOX.
          </p>
          <CodeBlock
            label="Terminal"
            code={`# Criar diretório de squads (se não existir)
mkdir -p squads

# Baixar e extrair a squad
# Opção A: via AIOX CLI (recomendado)
npx aiox squad install n8n-killers

# Opção B: manual (extrair o zip baixado)
unzip n8n-killers.zip -d squads/`}
          />
          <Note>
            A squad ficará em squads/n8n-killers/ com todos os agentes, tasks e workflows
            configurados.
          </Note>
        </div>
      </section>

      {/* ── Passo 4 ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#08080C]" aria-labelledby="step4-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>Passo 04</SectionLabel>
          <h2 id="step4-heading" className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Ativar os Slash Commands
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mb-2">
            Registre os agentes da squad no Claude Code para poder ativá-los via
            /n8n-killers:agents:dexter.
          </p>
          <CodeBlock
            label=".claude/settings.json — adicionar"
            code={`{
  "permissions": {
    "allow": [
      "Bash(npx aiox *)",
      "Read(squads/**)",
      "Write(squads/n8n-killers/agents/*/MEMORY.md)"
    ]
  }
}`}
          />
          <CodeBlock label="Sincronizar agentes" code="npx aiox sync:skills" />
          <Note>
            Após o sync, os agentes estarão disponíveis como /n8n-killers:agents:dexter,
            /n8n-killers:agents:hannibal, etc.
          </Note>
        </div>
      </section>

      {/* ── Passo 5 ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0A0A0F]" aria-labelledby="step5-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>Passo 05</SectionLabel>
          <h2 id="step5-heading" className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Rodar a Primeira Operação
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mb-6">
            Com a squad instalada, ative o Dexter e inicie uma operação de migração ou criação de
            automação.
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Sub-seção A */}
            <div>
              <p
                className="text-white/40 text-xs uppercase tracking-widest mb-3"
                style={{ fontFamily: "'Geist Mono', monospace" }}
              >
                A — Migração de workflow n8n
              </p>
              <CodeBlock
                label="No Claude Code — ativar Dexter"
                code="/n8n-killers:agents:dexter"
              />
              <CodeBlock
                label="Iniciar migração"
                code="*assign-operation --type migration --source ./meu-workflow.json --target make"
              />
            </div>

            {/* Sub-seção B */}
            <div>
              <p
                className="text-white/40 text-xs uppercase tracking-widest mb-3"
                style={{ fontFamily: "'Geist Mono', monospace" }}
              >
                B — Nova automação via API
              </p>
              <CodeBlock
                label="Criar automação do zero"
                code='*assign-operation --type new-automation --description "Sincronizar leads do HubSpot com Notion a cada hora"'
              />
            </div>
          </div>

          <Note>
            O Dexter orquestra automaticamente os agentes necessários em sequência. Cada agente
            reporta seu output antes de passar para o próximo.
          </Note>
        </div>
      </section>

      {/* ── Workflows ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0A0A0F]" aria-labelledby="workflows-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionLabel>Workflows</SectionLabel>
          <h2 id="workflows-heading" className="text-3xl font-bold text-white sm:text-4xl mb-10">
            Dois Ciclos de Operação
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <WorkflowCard
              title="Migration Cycle"
              subtitle="Para migrar workflows n8n existentes"
              phases={migrationPhases}
            />
            <WorkflowCard
              title="API Automation Cycle"
              subtitle="Para criar automações do zero"
              phases={apiPhases}
            />
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function N8nKillersPage() {
  return (
    <SkillPage
      title="n8n Killers Squad"
      description="10 agentes AI para migrar workflows n8n e criar automações via API. Sem lock-in, sem achismo."
      category="Squads AIOX"
      categoryColor="squads-aiox"
      longDescription={longDescription}
      features={features}
      primaryLink="/n8n-killers.zip"
      primaryLabel="Download Squad"
      isExternal={true}
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/skills/n8n-killers"
    >
      <TutorialSection />
    </SkillPage>
  );
}
