'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckoutForm } from './checkout-form';

type ItemType = 'Video' | 'Bonus';

interface TimelineItem {
  num: number;
  type: ItemType;
  title: string;
  description: string;
  tags: string[];
}

interface Phase {
  label: string;
  items: TimelineItem[];
}

const COHORT_SLUG = 'curso-online-padrao';

const PHASES: Phase[] = [
  {
    label: 'Fundamentos',
    items: [
      {
        num: 0,
        type: 'Video',
        title: 'Abertura — Desbloqueio e Crenças Limitantes',
        description: 'A maioria das pessoas chega travada por uma crença simples: "isso não é pra mim". Aqui quebramos isso. Trabalho de desbloqueio com a Claudia — respiração, ancoragem e identificação das crenças que sabotam o avanço antes mesmo de começar.',
        tags: ['Desbloqueio', 'Mindset', 'Claudia'],
      },
      {
        num: 1,
        type: 'Video',
        title: 'O que é possível',
        description: 'Você vai ver o que é possível construir com agentes de IA hoje. Sites, squads de conteúdo, automações de vendas, sistemas de atendimento. Não teoria — demonstrações reais rodando na frente de você.',
        tags: ['Demos', 'Cases Reais', 'IA Agêntica'],
      },
      {
        num: 2,
        type: 'Video',
        title: 'Fundamentos do Claude Code',
        description: 'O que é Claude Code, como ele pensa, o que diferencia ele de um ChatGPT. Você entende a lógica por trás: agentes, ferramentas, MCP, contexto. Com essa base, tudo o que vem depois faz sentido — e você para de tratar a IA como uma caixa-preta.',
        tags: ['Claude Code', 'MCP', 'Agentes'],
      },
      {
        num: 3,
        type: 'Video',
        title: 'Setup e Instalação',
        description: 'Instalamos tudo junto: Claude Code, extensões, chaves de API, MCP servers. Você sai desta aula com o ambiente 100% pronto para trabalhar — sem depender de suporte técnico.',
        tags: ['Setup', 'Instalação', 'Ambiente'],
      },
      {
        num: 4,
        type: 'Video',
        title: 'Centro de Treinamento de Agentes',
        description: 'Você cria seu primeiro agente. Aprende a dar personalidade, especialidade e instruções para ele. No final deste módulo, você já tem um agente personalizado funcionando — não um exemplo, o seu mesmo.',
        tags: ['Primeiro Agente', 'Personalização', 'CTA'],
      },
    ],
  },
  {
    label: 'Semana 1',
    items: [
      {
        num: 5,
        type: 'Video',
        title: 'Claude Design — Design System',
        description: 'Você aprende a montar um design system completo usando agentes: paleta de cores, tipografia, componentes, tokens. O agente Claude Design cuida da consistência visual enquanto você foca no que importa. Assista no seu ritmo — as aulas ficam disponíveis durante todo o acesso.',
        tags: ['Design System', 'Claude Design', 'Componentes'],
      },
    ],
  },
  {
    label: 'Semana 2',
    items: [
      {
        num: 6,
        type: 'Video',
        title: 'Squad de Sites — Github e Vercel',
        description: 'Você monta um squad completo para criar e publicar sites profissionais: agente de frontend, agente de QA, agente de deploy. O squad faz commit no Github e publica no Vercel automaticamente. Do zero ao site no ar — sem escrever uma linha de código manualmente.',
        tags: ['Sites', 'Github', 'Vercel', 'Deploy'],
      },
    ],
  },
  {
    label: 'Semana 3',
    items: [
      {
        num: 7,
        type: 'Video',
        title: 'Squad de Social Media',
        description: 'Um squad inteiro para produção de conteúdo: imagens via Freepik, narração em voz com Eleven Labs, vídeos com avatar via Heygen, e publicação automática via Meta API. Você configura uma vez — o squad produz e publica por você.',
        tags: ['Freepik', 'Eleven Labs', 'Heygen', 'Meta API'],
      },
    ],
  },
  {
    label: 'Semana 4',
    items: [
      {
        num: 10,
        type: 'Video',
        title: 'Squad de Dev — Supabase',
        description: 'O squad de desenvolvimento com banco de dados real. Você monta agentes que criam tabelas, escrevem queries, configuram autenticação e expõem APIs — tudo via Supabase. Projetos com usuários, dados e lógica de negócio, sem precisar de um dev contratado.',
        tags: ['Dev', 'Supabase', 'Banco de Dados', 'APIs'],
      },
    ],
  },
];

const TYPE_BADGE: Record<ItemType, { label: string; cls: string }> = {
  Video: {
    label: 'Vídeo',
    cls: 'text-white/60 border-white/[0.12] bg-white/[0.04]',
  },
  Bonus: {
    label: 'Aula + Código',
    cls: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
  },
};

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
            {item.num}
          </span>
        </motion.div>
        {showConnector && (
          <div className="w-px flex-1 bg-gradient-to-b from-[var(--color-accent)]/40 to-[var(--color-accent)]/5" />
        )}
      </div>

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
              <span
                className="text-[var(--color-accent)]/70 text-xs font-semibold uppercase tracking-widest"
                style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
              >
                Módulo {item.num}
              </span>
              <span
                className={`border px-2 py-1 text-xs font-semibold uppercase tracking-wider ${badge.cls}`}
                style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
              >
                {badge.label}
              </span>
            </div>
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

export function CursoOnlineTimeline() {
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
              5 Módulos + 4 Semanas de Aulas
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight"
            style={{ fontFamily: "'TASAOrbiter', var(--font-bb-display), sans-serif" }}
          >
            Do Zero ao Time Completo{' '}
            <span className="text-[var(--color-accent)]">no Seu Ritmo</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
            Aulas em vídeo para assistir quando e onde quiser. Todo o conteúdo da mentoria presencial, disponível por 6 meses com acesso à plataforma e ao fórum da comunidade.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { icon: '▶', label: 'Aulas em Vídeo' },
              { icon: '◷', label: 'Acesso por 6 Meses' },
              { icon: '◈', label: 'Fórum da Comunidade' },
              { icon: '⬡', label: 'Certificado de Conclusão' },
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

        <div className="relative">
          {(() => {
            let lastPhaseLabel = '';
            return RENDER_LIST.map(({ phase, item, isFirstInPhase, isLastOverall, globalIndex }) => {
              const showSeparator = isFirstInPhase && phase.label !== lastPhaseLabel;
              if (showSeparator) lastPhaseLabel = phase.label;
              return (
                <div key={`${phase.label}-${globalIndex}`}>
                  {showSeparator && <PhaseSeparator label={phase.label} animIndex={globalIndex} />}
                  <TimelineCard item={item} globalIndex={globalIndex} showConnector={!isLastOverall} />
                </div>
              );
            });
          })()}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-10 sm:mt-14 text-center"
        >
          <CheckoutForm cohortSlug={COHORT_SLUG} label="Comprar — R$ 797" />
        </motion.div>
      </div>
    </section>
  );
}
