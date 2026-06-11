'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type ItemType = 'Presencial' | 'Video' | 'QA' | 'Bonus';

interface TimelineItem {
  num?: number;
  type: ItemType;
  title: string;
  description: string;
  tags: string[];
  duration?: string;
  date?: string;
}

interface Phase {
  label: string;
  items: TimelineItem[];
}

const PHASES: Phase[] = [
  {
    label: 'Pré-Mentoria',
    items: [
      {
        type: 'QA',
        title: 'Design Thinking — Planejamento de Projeto',
        description: 'Sessão individual de 1h com Claudia Guirunas, CEO da GrowthSales.ai, antes do dia presencial. Juntos vocês mapeiam o seu projeto, definem o problema a resolver e estruturam o escopo do que será construído durante a mentoria. Você chega no dia presencial com clareza de onde quer chegar.',
        tags: ['Individual', '1:1', 'Claudia Guirunas', 'Planejamento'],
        duration: '1h',
      },
    ],
  },
  {
    label: 'Módulo 0 — Abertura',
    items: [
      {
        type: 'Presencial',
        date: '05/08/2026 · quarta-feira · Florianópolis',
        title: 'Abertura — Desbloqueio e Crenças Limitantes',
        description: 'A maioria das pessoas chega travada por uma crença simples: "isso não é pra mim". Aqui quebramos isso. Trabalho de desbloqueio com a Claudia — respiração, ancoragem e identificação das crenças que sabotam o avanço antes mesmo de começar.',
        tags: ['Presencial', 'Desbloqueio', 'Mindset', 'Claudia'],
      },
    ],
  },
  {
    label: 'Módulo 1 — O que é Possível',
    items: [
      {
        type: 'Presencial',
        date: '05/08/2026 · quarta-feira · Florianópolis',
        title: 'Demos ao Vivo — O que é possível com agentes hoje',
        description: 'Você vai ver, ao vivo, o que é possível construir com agentes de IA hoje. Sites, squads de conteúdo, automações de vendas, sistemas de atendimento. Não teoria — demonstrações reais rodando na frente de você.',
        tags: ['Presencial', 'Demos', 'Cases Reais', 'IA Agêntica'],
      },
      {
        type: 'Video',
        title: 'O que é Possível',
        description: 'Cases e demos para você rever a qualquer momento.',
        tags: ['Gravado', 'Cases', 'Demos'],
      },
    ],
  },
  {
    label: 'Módulo 2 — Setup',
    items: [
      {
        type: 'Presencial',
        date: '05/08/2026 · quarta-feira · Florianópolis',
        title: 'Setup e Instalação ao Vivo',
        description: 'Ninguém sai sem ambiente funcionando. Instalamos tudo junto: Claude Code, extensões, chaves de API, MCP servers. Você sai do dia presencial com o ambiente 100% pronto para trabalhar.',
        tags: ['Presencial', 'Setup', 'Instalação', 'Ambiente'],
      },
      {
        type: 'Video',
        title: 'Setup e Instalação',
        description: 'Passo-a-passo de instalação para você consultar quando precisar.',
        tags: ['Gravado', 'Setup', 'Instalação'],
      },
    ],
  },
  {
    label: 'Módulo 3 — Fundamentos',
    items: [
      {
        type: 'Video',
        title: 'Fundamentos do Claude Code (10 aulas)',
        description: 'Conteúdo em vídeo cobrindo Claude Code, agentes, MCP, contexto, pastas, comandos base, hooks e skills. Base conceitual para tudo que vem a seguir. Assista no seu ritmo.',
        tags: ['Gravado', 'Claude Code', 'MCP', 'Fundamentos'],
      },
    ],
  },
  {
    label: 'Módulo 4 — Centro de Treinamento de Agentes',
    items: [
      {
        type: 'Video',
        title: 'Centro de Treinamento (12 aulas)',
        description: 'Conteúdo em vídeo cobrindo arquitetura mental de agentes, instalação do Centro, smart-memory, anatomia de squads e o Team-OS. Você assiste no seu ritmo durante a semana — chega no ao vivo com dúvidas claras.',
        tags: ['Gravado', 'Centro de Treinamento', 'Team-OS', 'Smart-Memory'],
      },
      {
        type: 'QA',
        date: '12/08/2026 · quarta-feira · Ao Vivo',
        title: 'Tira-dúvidas Centro de Treinamento de Agentes',
        description: 'Sessão ao vivo com o time de suporte. Você traz o que travou na semana e resolvemos juntos. Cada pergunta é respondida em grupo — porque a dúvida de um quase sempre é a dúvida de vários.',
        tags: ['Ao Vivo', 'Suporte', 'Grupo'],
        duration: '1h30',
      },
    ],
  },
  {
    label: 'Módulo 5 — Claude Design',
    items: [
      {
        type: 'Video',
        title: 'Claude Design (11 aulas)',
        description: 'Diretor de arte por agentes, lógica de projetos, design system, KV para Site/Social/Tráfego/Dev, handoff pro Claude Code. Tudo em vídeo pra você assistir no seu ritmo.',
        tags: ['Gravado', 'Design System', 'KV', 'Claude Design'],
      },
      {
        type: 'QA',
        date: '19/08/2026 · quarta-feira · Ao Vivo',
        title: 'Encontro ao Vivo — Claude Design',
        description: 'Sessão ao vivo de tira-dúvidas e prática guiada do módulo Claude Design. Você traz o que aplicou na semana, ajustamos juntos.',
        tags: ['Ao Vivo', 'Design System', 'Claude Design'],
        duration: '1h30',
      },
    ],
  },
  {
    label: 'Módulo 6 — Squad de Sites',
    items: [
      {
        type: 'Video',
        title: 'Squad de Sites (13 aulas)',
        description: 'Do zero ao site no ar com agentes: Squad Sites Luminari em ação, stack escolhida, criação de repositório, deploy Vercel, configuração de domínio e DNS, publicação automática via GitHub.',
        tags: ['Gravado', 'Sites', 'Github', 'Vercel'],
      },
      {
        type: 'QA',
        date: '26/08/2026 · quarta-feira · Ao Vivo',
        title: 'Encontro ao Vivo — Squad de Sites',
        description: 'Sessão ao vivo do módulo Squad de Sites. Você sobe seu primeiro site com agentes e tira dúvidas em grupo.',
        tags: ['Ao Vivo', 'Sites', 'Deploy'],
        duration: '1h30',
      },
    ],
  },
  {
    label: 'Módulo 7 — Squad de Social Media',
    items: [
      {
        type: 'Video',
        title: 'Squad Social Media',
        description: 'Cobertura: Freepik, Eleven Labs, Heygen e publicação automática via Meta API. Disponível antes do encontro ao vivo.',
        tags: ['Gravado', 'Squad Social', 'Conteúdo'],
      },
      {
        type: 'QA',
        date: '02/09/2026 · quarta-feira · Ao Vivo',
        title: 'Encontro ao Vivo — Squad de Social Media',
        description: 'Sessão ao vivo do módulo Squad de Social Media. Configuração, dúvidas e prática guiada.',
        tags: ['Ao Vivo', 'Social Media', 'Meta API'],
        duration: '1h30',
      },
    ],
  },
  {
    label: 'Módulo 8 — Squad de DEV',
    items: [
      {
        type: 'Video',
        title: 'Squad de Dev',
        description: 'Cobertura: Supabase, autenticação, queries, APIs. Disponível antes do encontro ao vivo.',
        tags: ['Gravado', 'Squad Dev', 'Supabase'],
      },
      {
        type: 'QA',
        date: '09/09/2026 · quarta-feira · Ao Vivo',
        title: 'Encontro ao Vivo — Squad de Dev',
        description: 'Sessão ao vivo do módulo Squad de Dev. Banco de dados, queries com agentes e prática guiada.',
        tags: ['Ao Vivo', 'Dev', 'Supabase'],
        duration: '1h30',
      },
    ],
  },
  {
    label: 'Bônus Online',
    items: [
      {
        type: 'Bonus',
        title: 'Orquestrador Comercial — Aula + Código Pronto',
        description: 'Você recebe a aula explicando a lógica e o código completo pronto para implantar. O mesmo orquestrador comercial que a GrowthSales usa com clientes de alto padrão: prospecção, qualificação e fechamento orquestrados por agentes IA. Um ativo real que você leva e coloca para rodar no seu negócio.',
        tags: ['Código Pronto', 'GrowthSales', 'Comercial', 'Deploy'],
      },
      {
        type: 'Bonus',
        title: 'Gestão de Projetos — Aula + Código Pronto',
        description: 'O framework de gestão de projetos que roda internamente na GrowthSales, agora nas suas mãos. Aula completa sobre a lógica + código pronto para implantar: times de agentes organizados por sprints, delegação, acompanhamento e entrega automatizada. Software acelerador funcionando no seu negócio no dia seguinte.',
        tags: ['Código Pronto', 'GrowthSales', 'Gestão', 'Deploy'],
      },
    ],
  },
  {
    label: 'Encerramento Presencial',
    items: [
      {
        type: 'Presencial',
        date: '16/09/2026 · quarta-feira · Florianópolis',
        title: 'Apresentação de Projetos + Encerramento',
        description: '3 projetos selecionados pela turma, 30 minutos cada para apresentar o que foi construído. Networking, feedback ao vivo e celebração do que você conseguiu em 7 semanas. Você sai com certificação e com uma rede de pessoas que fizeram o mesmo percurso.',
        tags: ['Presencial', 'Apresentações', 'Projetos', 'Certificação'],
        duration: '3h',
      },
    ],
  },
];

const TYPE_BADGE: Record<ItemType, { label: string; cls: string }> = {
  Presencial: {
    label: 'Presencial',
    cls: 'text-[var(--color-accent)] border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10',
  },
  Video: {
    label: 'Aulas Gravadas',
    cls: 'text-white/60 border-white/[0.12] bg-white/[0.04]',
  },
  QA: {
    label: 'Ao Vivo',
    cls: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10',
  },
  Bonus: {
    label: 'Aula + Código',
    cls: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
  },
};

const INSCRICAO_ANCHOR = '#inscricao';

// Pre-compute flat list with global indices for animation stagger
interface RenderItem {
  phase: Phase;
  item: TimelineItem;
  isFirstInPhase: boolean;
  isLastOverall: boolean;
  globalIndex: number;
}

function buildRenderList(): RenderItem[] {
  const list: RenderItem[] = [];
  let gi = 0;
  PHASES.forEach((phase, pi) => {
    phase.items.forEach((item, ii) => {
      list.push({
        phase,
        item,
        isFirstInPhase: ii === 0,
        isLastOverall: pi === PHASES.length - 1 && ii === phase.items.length - 1,
        globalIndex: gi++,
      });
    });
  });
  return list;
}

const RENDER_LIST = buildRenderList();

function PhaseSeparator({ label, animIndex }: { label: string; animIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35, delay: animIndex * 0.04 }}
      className="flex items-center gap-4 mb-8 mt-2"
    >
      <span
        className="text-[var(--color-accent)]/70 text-[0.6rem] font-bold uppercase tracking-[0.18em] whitespace-nowrap"
        style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
      >
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-accent)]/25 to-transparent" />
    </motion.div>
  );
}

function QACard({
  item,
  globalIndex,
  showConnector,
}: {
  item: TimelineItem;
  globalIndex: number;
  showConnector: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="relative flex gap-6 sm:gap-10">
      {/* Left column: small dot aligned with main timeline */}
      <div className="relative flex flex-col items-center" style={{ width: '3rem' }}>
        <div className="w-px bg-[var(--color-accent)]/15" style={{ height: '20px' }} />
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.25, delay: globalIndex * 0.06 }}
          className="z-10 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-[#08080C]"
          style={{ boxShadow: '0 0 10px rgba(52,211,153,0.12)' }}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
        </motion.div>
        {showConnector && (
          <div className="w-px flex-1 bg-gradient-to-b from-[var(--color-accent)]/15 to-[var(--color-accent)]/5" />
        )}
      </div>

      {/* QA card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: globalIndex * 0.06 + 0.05 }}
        className="flex-1 pb-6"
      >
        <div className="border border-emerald-400/[0.07] bg-emerald-400/[0.02] p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span
                className="text-emerald-400/80 text-[0.6rem] font-bold uppercase tracking-widest"
                style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
              >
                Ao Vivo
              </span>
              <span className="text-white/20 text-xs" aria-hidden>·</span>
              <h4 className="text-sm font-semibold text-white/80">{item.title}</h4>
            </div>
            {item.duration && (
              <span
                className="text-[0.6rem] text-emerald-400/60 border border-emerald-400/20 px-2 py-0.5"
                style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
              >
                {item.duration}
              </span>
            )}
          </div>
          {item.date && (
            <p
              className="mt-1 text-[0.6rem] text-emerald-400/50"
              style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
            >
              {item.date}
            </p>
          )}
          <p className="mt-1.5 text-xs text-white/40 leading-relaxed">{item.description}</p>
        </div>
      </motion.div>
    </div>
  );
}

function TimelineCard({
  item,
  globalIndex,
  showConnector,
}: {
  item: TimelineItem;
  globalIndex: number;
  showConnector: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const badge = TYPE_BADGE[item.type];

  return (
    <div ref={ref} className="relative flex gap-6 sm:gap-10">
      {/* Circle + connector */}
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: globalIndex * 0.06 }}
          className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-accent)]/60 bg-[#08080C]"
          style={{ boxShadow: '0 0 20px rgba(255,68,0,0.2)' }}
        >
          <span
            className="text-[var(--color-accent)] text-xs sm:text-sm font-bold"
            style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
          >
            {item.num ?? '·'}
          </span>
        </motion.div>
        {showConnector && (
          <div className="w-px flex-1 bg-gradient-to-b from-[var(--color-accent)]/40 to-[var(--color-accent)]/5" />
        )}
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: globalIndex * 0.06 + 0.1 }}
        className="group relative flex-1 pb-8 sm:pb-12"
      >
        <div className="relative border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 transition-all duration-300 hover:border-[var(--color-accent)]/20 hover:bg-white/[0.04]">
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: 'radial-gradient(400px at 50% 0%, rgba(255,68,0,0.06), transparent)' }}
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              {item.num !== undefined && (
                <span
                  className="text-[var(--color-accent)]/70 text-xs font-semibold uppercase tracking-widest"
                  style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
                >
                  Módulo {item.num}
                </span>
              )}
              <span
                className={`border px-2 py-1 text-xs font-semibold uppercase tracking-wider ${badge.cls}`}
                style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
              >
                {badge.label}
              </span>
            </div>
            {item.date && (
              <p
                className="mt-1.5 text-xs text-white/35"
                style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
              >
                {item.date}
              </p>
            )}
            <h3 className="mt-2 text-lg sm:text-xl font-bold text-white leading-snug">{item.title}</h3>
            <p className="mt-3 text-sm sm:text-[0.9rem] text-white/60 leading-relaxed">{item.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/60 transition-colors hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)]/70"
                  style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function CourseModulesTimeline() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-40px' });

  return (
    <section id="modulos" className="relative py-16 sm:py-24 bg-[#08080C] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 sm:px-4 py-1.5 mb-4 sm:mb-6">
            <span
              className="text-[var(--color-accent)] text-xs sm:text-[0.65rem]"
              style={{
                fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace",
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 600,
              }}
            >
              9 Módulos · 2 Presenciais + 5 Online · 46+ Aulas Gravadas · 7 Semanas
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight"
            style={{ fontFamily: "'TASAOrbiter', var(--font-bb-display), sans-serif" }}
          >
            Do Zero ao Time Completo em{' '}
            <span className="text-[var(--color-accent)]">7 Semanas</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
            Aulas em vídeo para assistir no seu ritmo + encontros ao vivo semanais para tirar dúvidas em grupo com o time de suporte. A dúvida de um beneficia toda a turma.
          </p>

          {/* Incluso */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { icon: '▶', label: 'Plataforma de Aulas' },
              { icon: '◷', label: 'Acesso por 6 Meses' },
              { icon: '◈', label: 'Comunidade Online' },
              { icon: '⬡', label: 'Suporte Técnico ao Vivo' },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.03] px-4 py-2"
              >
                <span className="text-[var(--color-accent)]/70 text-xs" aria-hidden>{icon}</span>
                <span
                  className="text-xs font-medium text-white/60"
                  style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace", letterSpacing: '0.04em' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {(() => {
            let lastPhaseLabel = '';
            return RENDER_LIST.map(({ phase, item, isFirstInPhase, isLastOverall, globalIndex }) => {
              const showSeparator = isFirstInPhase && phase.label !== lastPhaseLabel;
              if (showSeparator) lastPhaseLabel = phase.label;

              const showConnector = !isLastOverall;

              return (
                <div key={`${phase.label}-${globalIndex}`}>
                  {showSeparator && (
                    <PhaseSeparator label={phase.label} animIndex={globalIndex} />
                  )}
                  {item.type === 'QA' && item.num === undefined ? (
                    <QACard item={item} globalIndex={globalIndex} showConnector={showConnector} />
                  ) : (
                    <TimelineCard item={item} globalIndex={globalIndex} showConnector={showConnector} />
                  )}
                </div>
              );
            });
          })()}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-10 sm:mt-14 text-center"
        >
          <a
            href={INSCRICAO_ANCHOR}
            className="btn-primary inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white px-8 py-4 text-sm sm:text-base font-bold shadow-2xl shadow-[var(--color-accent)]/30 hover:bg-[#FF5722] transition-all hover:scale-105 uppercase tracking-wider"
            style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
          >
            <span>Fale com um Especialista</span>
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
