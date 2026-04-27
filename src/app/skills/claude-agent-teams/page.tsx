import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui';

export const metadata: Metadata = {
  title: 'Claude Agent Teams — Squads de Agentes IA com Claude',
  description:
    'Coordene times de agentes Claude Code para tarefas complexas. Skill open source para orquestração multi-agente com comunicação e delegação automáticas.',
  openGraph: {
    title: 'Claude Agent Teams — Squads de Agentes IA com Claude | João Guirunas',
    description:
      'Coordene times de agentes Claude Code para tarefas complexas. Skill open source para orquestração multi-agente com comunicação e delegação automáticas.',
    images: [{ url: '/images/hero-ultrawide.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Agent Teams — Squads de Agentes IA com Claude | João Guirunas',
    description:
      'Coordene times de agentes Claude Code para tarefas complexas. Skill open source para orquestração multi-agente com comunicação e delegação automáticas.',
  },
  alternates: {
    canonical: '/skills/claude-agent-teams',
  },
};

const features = [
  {
    title: '27 Agentes Pré-configurados',
    description:
      'Dev Squad (10), Sites Squad (10) e Social Squad (7) prontos para usar. Cada agente tem papel, ferramentas e contratos de comunicação definidos.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>',
  },
  {
    title: '/team-os Orchestration',
    description:
      'Skill de orquestração inteligente que detecta o estado do projeto automaticamente: bootstrap, discover, plan, dispatch e status em um único comando.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"/>',
  },
  {
    title: 'Smart Memory Compartilhada',
    description:
      'Sistema de memória persistente em formato Obsidian. Módulos, arquitetura, stories e histórico de delegações acessíveis por todos os agentes da squad.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/>',
  },
  {
    title: 'Execução em Paralelo',
    description:
      'Agentes trabalham simultaneamente via Agent Teams nativo do Claude Code. Comunicação via SendMessage, coordenação via TaskList compartilhada.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  },
  {
    title: '40+ Skills Integradas',
    description:
      'SEO, copywriting, acessibilidade, deploy, design system, UX research e muito mais. Cada skill é injetada automaticamente no agente certo.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"/>',
  },
  {
    title: 'Drop-in Setup',
    description:
      'Copie a pasta .claude/ para qualquer projeto e a squad está pronta. Sem configuração extra. Requer CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/>',
  },
];

const longDescription = [
  'Claude Agent Teams é um pacote de configuração drop-in para Claude Code com 27 agentes pré-configurados organizados em três squads especializadas: Dev Squad para desenvolvimento de software, Sites Squad para projetos web e Social Squad para conteúdo e marketing.',
  'O sistema inclui o /team-os — skill de orquestração que detecta automaticamente o estado do projeto, propõe a composição ideal do time e coordena execução em paralelo via Agent Teams nativo. Novos projetos ganham descoberta automática de arquitetura; projetos existentes retomam work-in-progress sem configuração manual.',
  'A smart-memory compartilhada em formato Obsidian garante que todos os agentes partam do mesmo contexto — arquitetura, módulos, conventions e histórico de decisões — sem repetir descoberta a cada sessão. Mais de 40 skills especializadas são injetadas automaticamente nos agentes certos.',
];

export default function ClaudeAgentTeamsPage() {
  return (
    <SkillPage
      title="Claude Agent Teams"
      description="27 agentes pré-configurados em 3 squads com smart-memory e orquestração via /team-os. Drop-in para qualquer projeto Claude Code."
      category="Squads"
      categoryColor="squads"
      longDescription={longDescription}
      features={features}
      primaryLink="https://github.com/joaoguirunas/claude-agent-teams"
      primaryLabel="Ver no GitHub"
      isExternal
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      bgImage="/images/bg-aiox.png"
      canonicalPath="/skills/claude-agent-teams"
    >
      {/* Tutorial */}
      <section className="py-20 bg-[#0e0e11]">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-[140px]">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#FF3A0E] mb-3">
              Tutorial completo
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white sm:text-3xl mb-3">
              Do zero ao time de agentes
            </h2>
            <p className="text-white/60 mb-10 text-base leading-relaxed">
              Instalação, configuração e primeiro uso do{' '}
              <span className="text-[#FF3A0E] font-mono">/team-os</span> — a skill que orquestra tudo.
            </p>

            <div className="space-y-6">

              {/* Step 1 — Pré-requisitos */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-[#FF3A0E] text-white text-xs font-bold font-mono flex-shrink-0">1</span>
                  <h3 className="text-lg font-semibold text-white">Pré-requisitos</h3>
                </div>
                <ul className="space-y-2 text-sm text-white/70 mb-4">
                  <li className="flex items-start gap-2">
                    <svg className="h-4 w-4 text-[#FF3A0E] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>Claude Code instalado (<span className="font-mono text-white/90">npm i -g @anthropic-ai/claude-code</span>)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="h-4 w-4 text-[#FF3A0E] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>Plano Claude Pro ou Team (Agent Teams requer API com suporte a sub-agentes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="h-4 w-4 text-[#FF3A0E] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>macOS, Linux ou WSL2 (Windows nativo não suportado)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="h-4 w-4 text-[#FF3A0E] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span>Git instalado</span>
                  </li>
                </ul>
              </div>

              {/* Step 2 — Instalação */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-[#FF3A0E] text-white text-xs font-bold font-mono flex-shrink-0">2</span>
                  <h3 className="text-lg font-semibold text-white">Instalação</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">Clone o repositório e copie a pasta <span className="font-mono text-white/90">.claude/</span> para o seu projeto:</p>
                <pre className="bg-[#050507] p-4 text-sm text-[#FF3A0E] overflow-x-auto rounded mb-4">
                  <code>{`# Clonar o repositório
git clone https://github.com/joaoguirunas/claude-agent-teams.git

# Copiar pasta .claude para o seu projeto
cp -r claude-agent-teams/.claude/ /caminho/do/seu-projeto/

# Entrar no seu projeto
cd /caminho/do/seu-projeto`}</code>
                </pre>
                <p className="text-sm text-white/50">Alternativa — symlink para atualizar automaticamente:</p>
                <pre className="bg-[#050507] p-4 text-sm text-[#FF3A0E] overflow-x-auto rounded mt-2">
                  <code>{`ln -s /caminho/para/claude-agent-teams/.claude /caminho/do/seu-projeto/.claude`}</code>
                </pre>
              </div>

              {/* Step 3 — Ativar Agent Teams */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-[#FF3A0E] text-white text-xs font-bold font-mono flex-shrink-0">3</span>
                  <h3 className="text-lg font-semibold text-white">Ativar Agent Teams</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">Agent Teams ainda é experimental. Ative via variável de ambiente <span className="font-mono text-white/90">antes</span> de abrir o Claude Code:</p>
                <pre className="bg-[#050507] p-4 text-sm text-[#FF3A0E] overflow-x-auto rounded mb-4">
                  <code>{`# Adicionar ao ~/.zshrc ou ~/.bashrc
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1

# Recarregar o shell
source ~/.zshrc`}</code>
                </pre>
                <p className="text-sm text-white/60 mb-3">Confirme que a variável está ativa antes de abrir o Claude Code:</p>
                <pre className="bg-[#050507] p-4 text-sm text-[#FF3A0E] overflow-x-auto rounded">
                  <code>{`echo $CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS
# Deve retornar: 1`}</code>
                </pre>
              </div>

              {/* Step 4 — Abrir Claude Code */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-[#FF3A0E] text-white text-xs font-bold font-mono flex-shrink-0">4</span>
                  <h3 className="text-lg font-semibold text-white">Abrir o Claude Code no projeto</h3>
                </div>
                <pre className="bg-[#050507] p-4 text-sm text-[#FF3A0E] overflow-x-auto rounded mb-4">
                  <code>{`cd /caminho/do/seu-projeto
claude`}</code>
                </pre>
                <p className="text-sm text-white/60">O Claude Code abre no diretório do projeto com todos os agentes disponíveis via <span className="font-mono text-white/90">.claude/agents/</span>.</p>
              </div>

              {/* Step 5 — /team-os */}
              <div className="glass-card p-6 border border-[#FF3A0E]/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-[#FF3A0E] text-white text-xs font-bold font-mono flex-shrink-0">5</span>
                  <h3 className="text-lg font-semibold text-white">
                    Invocar o <span className="text-[#FF3A0E]">/team-os</span>
                  </h3>
                </div>
                <p className="text-sm text-white/60 mb-4">
                  O <span className="font-mono text-white/90">/team-os</span> é a skill central que orquestra tudo. Ele detecta automaticamente o estado do projeto e roteia para a ação certa:
                </p>
                <pre className="bg-[#050507] p-4 text-sm text-[#FF3A0E] overflow-x-auto rounded mb-5">
                  <code>{`/team-os`}</code>
                </pre>

                <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">O que acontece por baixo:</p>
                <div className="space-y-3">
                  {[
                    { state: 'NEW', color: 'text-yellow-400', desc: 'Projeto sem smart-memory → propõe bootstrap automático com time de descoberta' },
                    { state: 'NO_DISCOVERY', color: 'text-blue-400', desc: 'Estrutura existe mas sem mapeamento → oferece *discover (audita código, mapeia módulos)' },
                    { state: 'IN_PROGRESS', color: 'text-[#FF3A0E]', desc: 'Stories ativas detectadas → retoma trabalho automaticamente (*resume)' },
                    { state: 'READY', color: 'text-[#FF3A0E]', desc: 'Smart-memory OK, sem stories → pede objetivo para formar novo time' },
                  ].map(({ state, color, desc }) => (
                    <div key={state} className="flex items-start gap-3 bg-[#050507]/80 p-3">
                      <span className={`font-mono text-xs font-bold ${color} flex-shrink-0 mt-0.5 w-24`}>{state}</span>
                      <span className="text-sm text-white/60">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 6 — Bootstrap */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-[#FF3A0E] text-white text-xs font-bold font-mono flex-shrink-0">6</span>
                  <h3 className="text-lg font-semibold text-white">Bootstrap — primeira vez num projeto</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">
                  Em projetos novos, o <span className="font-mono text-white/90">/team-os</span> forma um time de descoberta que audita o código em paralelo e popula a smart-memory automaticamente:
                </p>
                <pre className="bg-[#050507] p-4 text-sm text-[#FF3A0E] overflow-x-auto rounded mb-4">
                  <code>{`/team-os *bootstrap`}</code>
                </pre>
                <p className="text-sm text-white/50 mb-3">O que o bootstrap produz em <span className="font-mono">docs/smart-memory/</span>:</p>
                <pre className="bg-[#050507] p-4 text-sm text-white/70 overflow-x-auto rounded">
                  <code>{`docs/smart-memory/
├── project/
│   ├── overview.md       ← síntese do projeto
│   ├── modules.md        ← mapa de rotas/módulos
│   ├── architecture.md   ← padrão arquitetural + ADRs
│   ├── tech-stack.md     ← dependências e versões
│   └── conventions.md    ← naming, imports, padrões
├── agents/ux/
│   └── components.md     ← catálogo de componentes UI
└── ops/
    └── teams-log.md      ← registro dos times formados`}</code>
                </pre>
              </div>

              {/* Step 7 — *plan */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-[#FF3A0E] text-white text-xs font-bold font-mono flex-shrink-0">7</span>
                  <h3 className="text-lg font-semibold text-white">Planejar um ciclo de trabalho</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">
                  Com a smart-memory populada, use <span className="font-mono text-white/90">*plan</span> para quebrar um objetivo em stories acionáveis:
                </p>
                <pre className="bg-[#050507] p-4 text-sm text-[#FF3A0E] overflow-x-auto rounded mb-3">
                  <code>{`/team-os *plan "implementar página de preços com 3 planos e integração Stripe"`}</code>
                </pre>
                <p className="text-sm text-white/50">
                  O <span className="font-mono">sites-architect</span> (ou <span className="font-mono">dev-architect</span> no Dev Squad) quebra em stories numeradas e salva em <span className="font-mono">docs/smart-memory/stories/backlog/</span>.
                </p>
              </div>

              {/* Step 8 — *dispatch */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-[#FF3A0E] text-white text-xs font-bold font-mono flex-shrink-0">8</span>
                  <h3 className="text-lg font-semibold text-white">Despachar o time para execução</h3>
                </div>
                <p className="text-sm text-white/60 mb-4">
                  Com as stories validadas no backlog, forme o time e inicie a execução em paralelo:
                </p>
                <pre className="bg-[#050507] p-4 text-sm text-[#FF3A0E] overflow-x-auto rounded mb-3">
                  <code>{`/team-os *dispatch`}</code>
                </pre>
                <p className="text-sm text-white/50 mb-3">
                  O <span className="font-mono">/team-os</span> seleciona os agentes certos para o objetivo, forma o Agent Team e cada teammate recebe as tasks automaticamente. Acompanhe com <span className="font-mono text-[#FF3A0E]">Shift+Tab</span> para ver todos os agentes ativos em paralelo.
                </p>
              </div>

              {/* Step 9 — Outros comandos */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-[#FF3A0E] text-white text-xs font-bold font-mono flex-shrink-0">9</span>
                  <h3 className="text-lg font-semibold text-white">Referência de comandos /team-os</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { cmd: '/team-os', desc: 'Fluxo inteligente — detecta estado e roteia automaticamente' },
                    { cmd: '/team-os *bootstrap', desc: 'Init + descoberta em paralelo — popula toda a smart-memory' },
                    { cmd: '/team-os *discover', desc: 'Só auditoria — pressupõe smart-memory já inicializada' },
                    { cmd: '/team-os *plan "objetivo"', desc: 'Quebra objetivo em stories e popula backlog' },
                    { cmd: '/team-os *dispatch', desc: 'Forma time e inicia trabalho nas stories ativas' },
                    { cmd: '/team-os *status', desc: 'Estado atual: tasks, stories, agentes, blockers' },
                    { cmd: '/team-os *resume', desc: 'Lê smart-memory e retoma trabalho em progresso' },
                    { cmd: '/team-os *audit', desc: 'Auditoria de smart-memory + conformidade dos teammates' },
                    { cmd: '/team-os *unblock <agente>', desc: 'Resolve blocker específico de um agente' },
                    { cmd: '/team-os *close', desc: 'Arquiva smart-memory e encerra o team' },
                  ].map(({ cmd, desc }) => (
                    <div key={cmd} className="flex items-start gap-3 bg-[#050507]/80 p-3">
                      <span className="font-mono text-xs text-[#FF3A0E] flex-shrink-0 mt-0.5 min-w-[220px]">{cmd}</span>
                      <span className="text-sm text-white/60">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Squads */}
      <section className="py-20 bg-[#0e0e11]">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-[140px]">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#FF3A0E] mb-3">
            As squads
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white sm:text-3xl mb-3">
            27 agentes em 3 squads especializadas
          </h2>
          <p className="text-white/60 mb-10 max-w-2xl text-base leading-relaxed">
            Cada squad tem agentes com papéis, ferramentas e autoridades distintas. O <span className="text-[#FF3A0E] font-mono">/team-os</span> monta o subconjunto mínimo necessário para cada objetivo.
          </p>

          <div className="grid gap-6 lg:grid-cols-3">

            {/* Dev Squad */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center bg-[#FF3A0E]/10 p-2.5 text-[#FF3A0E]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Dev Squad</h3>
                  <span className="text-xs text-white/40 font-mono">10 agentes</span>
                </div>
              </div>
              <ul className="space-y-1.5 text-sm text-white/60">
                {[
                  'dev-analyst — pesquisa e análise técnica',
                  'dev-architect — ADRs e criação de stories',
                  'dev-dev-alpha — frontend React/TypeScript',
                  'dev-dev-beta — backend e APIs',
                  'dev-dev-gamma — fullstack e integrações',
                  'dev-dev-delta — hardening e edge cases',
                  'dev-devops — git push, PRs, CI/CD',
                  'dev-qa — quality gates e veredictos',
                  'dev-data — schema, migrations, RLS',
                  'dev-ux — UX research e componentes',
                ].map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <span className="text-[#FF3A0E] mt-1 flex-shrink-0">›</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sites Squad */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center bg-[#FF3A0E]/10 p-2.5 text-[#FF3A0E]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Sites Squad</h3>
                  <span className="text-xs text-white/40 font-mono">10 agentes</span>
                </div>
              </div>
              <ul className="space-y-1.5 text-sm text-white/60">
                {[
                  'sites-analyst — SEO e pesquisa de mercado',
                  'sites-architect — arquitetura e stories',
                  'sites-dev-alpha — UI React/Tailwind/shadcn',
                  'sites-dev-beta — backend e integrações',
                  'sites-dev-gamma — fullstack e CRO',
                  'sites-dev-delta — hardening e performance',
                  'sites-devops — deploy Vercel/Netlify',
                  'sites-qa — acessibilidade e SEO audit',
                  'sites-data — banco e migrações',
                  'sites-ux — UX research e design',
                ].map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <span className="text-[#FF3A0E] mt-1 flex-shrink-0">›</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Squad */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center bg-[#FF3A0E]/10 p-2.5 text-[#FF3A0E]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Social Squad</h3>
                  <span className="text-xs text-white/40 font-mono">7 agentes</span>
                </div>
              </div>
              <ul className="space-y-1.5 text-sm text-white/60">
                {[
                  'social-strategist — estratégia e calendário',
                  'social-copywriter — copy para posts e DMs',
                  'social-designer — visual e carrosséis',
                  'social-video — roteiro e edição com IA',
                  'social-analyst — métricas e relatórios',
                  'social-ads — Meta/Google Ads',
                  'social-community — DMs e engajamento',
                ].map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <span className="text-[#FF3A0E] mt-1 flex-shrink-0">›</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>
    </SkillPage>
  );
}
