'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckoutForm } from './checkout-form';

interface TimelineItem {
  num: number;
  title: string;
  description: string;
  tags: string[];
}

interface Phase {
  label: string;
  items: TimelineItem[];
}

const PHASES: Phase[] = [
  {
    label: 'Módulo 1',
    items: [
      {
        num: 1,
        title: 'Claude Design — Design System',
        description: 'Monte um design system completo usando agentes: paleta de cores, tipografia, componentes, tokens. O agente Claude Design cuida da consistência visual enquanto você foca no que importa. Assista no seu ritmo — as aulas ficam disponíveis durante todo o período de acesso.',
        tags: ['Design System', 'Claude Design', 'Componentes'],
      },
    ],
  },
  {
    label: 'Módulo 2',
    items: [
      {
        num: 2,
        title: 'Squad de Sites — Github e Vercel',
        description: 'Monte um squad completo para criar e publicar sites profissionais: agente de frontend, agente de QA, agente de deploy. O squad faz commit no Github e publica no Vercel automaticamente. Do zero ao site no ar — sem escrever uma linha de código manualmente.',
        tags: ['Sites', 'Github', 'Vercel', 'Deploy'],
      },
    ],
  },
  {
    label: 'Módulo 3',
    items: [
      {
        num: 3,
        title: 'Squad de Social Media',
        description: 'Um squad inteiro para produção de conteúdo: imagens via Freepik, narração em voz com Eleven Labs, vídeos com avatar via Heygen, e publicação automática via Meta API. Configure uma vez — o squad produz e publica por você.',
        tags: ['Freepik', 'Eleven Labs', 'Heygen', 'Meta API'],
      },
    ],
  },
  {
    label: 'Módulo 4',
    items: [
      {
        num: 4,
        title: 'Squad de Dev — Supabase',
        description: 'O squad de desenvolvimento com banco de dados real. Monte agentes que criam tabelas, escrevem queries, configuram autenticação e expõem APIs — tudo via Supabase. Projetos com usuários, dados e lógica de negócio, sem precisar de um dev contratado.',
        tags: ['Dev', 'Supabase', 'Banco de Dados', 'APIs'],
      },
    ],
  },
]

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
        className="text-[#FF3A0E]/70 text-[0.6rem] font-bold uppercase tracking-[0.18em] whitespace-nowrap"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-[#FF3A0E]/25 to-transparent" />
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

  return (
    <div ref={ref} className="relative flex gap-6 sm:gap-10">
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: globalIndex * 0.06 }}
          className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#FF3A0E]/60 bg-[#050507]"
          style={{ boxShadow: '0 0 20px rgba(255,58,14,0.2)' }}
        >
          <span
            className="text-[#FF3A0E] text-xs sm:text-sm font-bold"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {item.num}
          </span>
        </motion.div>
        {showConnector && (
          <div className="w-px flex-1 bg-gradient-to-b from-[#FF3A0E]/40 to-[#FF3A0E]/5" />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: globalIndex * 0.06 + 0.1 }}
        className="group relative flex-1 pb-8 sm:pb-12"
      >
        <div className="relative border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 transition-all duration-300 hover:border-[#FF3A0E]/20 hover:bg-white/[0.04]">
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: 'radial-gradient(400px at 50% 0%, rgba(255,58,14,0.06), transparent)' }}
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className="text-[#FF3A0E]/70 text-xs font-semibold uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Aulas Gravadas
              </span>
            </div>
            <h3 className="mt-1 text-lg sm:text-xl font-bold text-white leading-snug">{item.title}</h3>
            <p className="mt-3 text-sm sm:text-[0.9rem] text-white/60 leading-relaxed">{item.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/60 transition-colors hover:border-[#FF3A0E]/30 hover:text-[#FF3A0E]/70"
                  style={{ fontFamily: 'var(--font-mono)' }}
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

const COHORT_SLUG = 'curso-online-padrao'

export function CursoModulesTimeline() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-40px' });

  return (
    <section id="modulos" className="relative z-10 py-16 sm:py-24 overflow-hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: '#050507' }}>
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
          <div className="inline-flex items-center gap-2 border border-[#FF3A0E]/30 bg-[#FF3A0E]/10 px-3 sm:px-4 py-1.5 mb-4 sm:mb-6">
            <span
              className="text-[#FF3A0E] text-xs sm:text-[0.65rem]"
              style={{
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontWeight: 600,
              }}
            >
              4 Módulos · Aulas Gravadas
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.03em' }}
          >
            Do Zero ao Time Completo de{' '}
            <span style={{ color: '#FF3A0E' }}>Agentes IA</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
            Quatro módulos de aulas gravadas. Assista no seu ritmo, pause quando precisar e retorne quando quiser. Todo o conteúdo fica disponível pelo período completo de acesso.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { icon: '▶', label: 'Aulas Gravadas' },
              { icon: '◷', label: 'Acesso por 12 Meses' },
              { icon: '◈', label: 'Fórum da Comunidade' },
              { icon: '⬡', label: 'Certificado de Conclusão' },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.03] px-4 py-2"
              >
                <span className="text-[#FF3A0E]/70 text-xs" aria-hidden>{icon}</span>
                <span
                  className="text-xs font-medium text-white/60"
                  style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}
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
              const showConnector = !isLastOverall;

              return (
                <div key={`${phase.label}-${globalIndex}`}>
                  {showSeparator && (
                    <PhaseSeparator label={phase.label} animIndex={globalIndex} />
                  )}
                  <TimelineCard item={item} globalIndex={globalIndex} showConnector={showConnector} />
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
          <CheckoutForm cohortSlug={COHORT_SLUG} />
        </motion.div>
      </div>
    </section>
  );
}
