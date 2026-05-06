'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Tipos ────────────────────────────────────────────────────────────────────

type SlideType = 'welcome' | 'overview' | 'phase' | 'questions' | 'project';

interface PhaseModule {
  num?: number;
  title: string;
  tags: string[];
  date?: string;
  live?: boolean;
}

interface Slide {
  id: string;
  type: SlideType;
  label?: string;
  date?: string;
  accent?: boolean;
  modules?: PhaseModule[];
  title?: string;
  questions?: string[];
}

// ─── Dados dos slides ─────────────────────────────────────────────────────────

const SLIDES: Slide[] = [
  {
    id: 'welcome',
    type: 'welcome',
  },
  {
    id: 'overview',
    type: 'overview',
  },
  {
    id: 'presencial',
    type: 'phase',
    label: 'Dia Presencial',
    date: '12 de maio · Terça-feira · 13h–18h',
    accent: true,
    modules: [
      { num: 0, title: 'Abertura — Desbloqueio e Crenças Limitantes', tags: ['Claudia', 'Mindset'] },
      { num: 1, title: 'O que é possível com IA Agêntica', tags: ['Cases', 'Demos ao vivo'] },
      { num: 2, title: 'Fundamentos do Claude Code', tags: ['Claude Code', 'MCP', 'Agentes'] },
      { num: 3, title: 'Setup e Instalação completos', tags: ['Ambiente', 'API Keys', 'Ferramentas'] },
      { num: 4, title: 'Centro de Treinamento de Agentes', tags: ['Primeiro Agente', 'CTA'] },
    ],
  },
  {
    id: 'semana-1',
    type: 'phase',
    label: 'Semana 1',
    modules: [
      { num: 5, title: 'Claude Design — Design System', tags: ['Design System', 'Tokens', 'Componentes'] },
      { live: true, title: 'Encontro de Dúvidas', date: '14 de maio · Quinta · 19h–20:30h', tags: ['Suporte', 'Ao Vivo'] },
    ],
  },
  {
    id: 'semana-2',
    type: 'phase',
    label: 'Semana 2',
    modules: [
      { num: 6, title: 'Squad de Sites — Github e Vercel', tags: ['Sites', 'Github', 'Vercel', 'Deploy'] },
      { live: true, title: 'Encontro de Dúvidas 1', date: '19 de maio · Terça · 19h–20:30h', tags: ['Suporte', 'Ao Vivo'] },
      { live: true, title: 'Encontro de Dúvidas 2', date: '21 de maio · Quinta · 19h–20:30h', tags: ['Suporte', 'Ao Vivo'] },
    ],
  },
  {
    id: 'semana-3',
    type: 'phase',
    label: 'Semana 3',
    modules: [
      { num: 7, title: 'Squad de Social Media', tags: ['Freepik', 'Eleven Labs', 'Heygen', 'Meta API'] },
      { live: true, title: 'Encontro de Dúvidas', date: '26 de maio · Terça · 19h–20:30h', tags: ['Suporte', 'Ao Vivo'] },
    ],
  },
  {
    id: 'semana-4',
    type: 'phase',
    label: 'Semana 4',
    modules: [
      { num: 10, title: 'Squad de Dev — Supabase', tags: ['Dev', 'Supabase', 'Banco de Dados', 'APIs'] },
      { live: true, title: 'Encontro de Dúvidas 1', date: '02 de junho · Terça · 19h–20:30h', tags: ['Suporte', 'Ao Vivo'] },
      { live: true, title: 'Encontro de Dúvidas 2', date: '04 de junho · Quinta · 19h–20:30h', tags: ['Suporte', 'Ao Vivo'] },
    ],
  },
  {
    id: 'bonus',
    type: 'phase',
    label: 'Bônus Online',
    modules: [
      { num: 12, title: 'Orquestrador Comercial', tags: ['Aula + Código Pronto', 'GrowthSales', 'Comercial'] },
      { num: 13, title: 'Gestão de Projetos com IA', tags: ['Aula + Código Pronto', 'GrowthSales', 'Gestão'] },
    ],
  },
  {
    id: 'encerramento',
    type: 'phase',
    label: 'Encerramento',
    accent: true,
    modules: [
      {
        num: 14,
        title: 'Apresentação de Projetos',
        date: '09 de junho · Terça · 19h–20:30h',
        tags: ['3 projetos × 30 min', 'Ao Vivo', 'Certificação'],
        live: true,
      },
    ],
  },
  {
    id: 'questions-1',
    type: 'questions',
    title: 'Objetivos',
    questions: [
      'Qual é o principal objetivo com IA no seu negócio?',
      'O que você faz hoje que consome mais tempo ou energia?',
      'Qual é a maior dor no seu processo atual?',
      'Você já usou alguma ferramenta de IA? O que funcionou ou não?',
    ],
  },
  {
    id: 'questions-2',
    type: 'questions',
    title: 'Contexto',
    questions: [
      'Qual é o seu nível com tecnologia hoje?',
      'Você tem algum produto ou serviço digital rodando?',
      'Quais ferramentas usa no dia a dia do negócio?',
      'Qual resultado seria um sucesso claro ao final da mentoria?',
    ],
  },
  {
    id: 'project',
    type: 'project',
  },
];

// ─── Animação dos slides ───────────────────────────────────────────────────────

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? '60%' : '-60%', opacity: 0 }),
};

// ─── Sub-componentes dos slides ───────────────────────────────────────────────

function SlideWelcome() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center px-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 inline-flex items-center gap-2 border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-4 py-1.5"
      >
        <span className="text-[var(--color-accent)] text-[0.65rem] font-bold uppercase tracking-[0.18em]"
          style={{ fontFamily: "'Roboto Mono', monospace" }}>
          Entrevista de Onboarding
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl"
        style={{ fontFamily: "'TASAOrbiter', sans-serif" }}
      >
        Bem-vindo à{' '}
        <span className="text-[var(--color-accent)]">Mentoria</span>
        <br />Claude Code + IA
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-6 text-base sm:text-lg text-white/50 max-w-xl leading-relaxed"
        style={{ fontFamily: "'Roboto Mono', monospace" }}
      >
        Vamos conversar sobre seus objetivos, conhecer o programa e definir o projeto que você vai construir nas próximas semanas.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-xs text-white/20 uppercase tracking-widest"
        style={{ fontFamily: "'Roboto Mono', monospace" }}
      >
        Pressione → para começar
      </motion.p>
    </div>
  );
}

function SlideOverview() {
  const phases = [
    { label: 'Dia Presencial', date: '12/05', color: 'accent' },
    { label: 'Semana 1', date: '13–17/05', color: 'default' },
    { label: 'Semana 2', date: '18–22/05', color: 'default' },
    { label: 'Semana 3', date: '25–29/05', color: 'default' },
    { label: 'Semana 4', date: '01–05/06', color: 'default' },
    { label: 'Bônus Online', date: 'Sempre disponível', color: 'amber' },
    { label: 'Encerramento', date: '09/06', color: 'accent' },
  ];

  const inclusions = ['Plataforma de Aulas', 'Acesso por 6 Meses', 'Comunidade Online', 'Suporte Técnico ao Vivo'];

  return (
    <div className="flex h-full flex-col justify-center px-8 sm:px-16 max-w-5xl mx-auto w-full">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="text-[var(--color-accent)]/70 text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-3"
        style={{ fontFamily: "'Roboto Mono', monospace" }}
      >
        Visão Geral do Programa
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl font-bold text-white mb-8"
        style={{ fontFamily: "'TASAOrbiter', sans-serif" }}
      >
        1 Dia Presencial +{' '}
        <span className="text-[var(--color-accent)]">4 Semanas</span>
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
        {phases.map((phase, i) => (
          <motion.div
            key={phase.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.06 }}
            className={`border p-3 ${
              phase.color === 'accent'
                ? 'border-[var(--color-accent)]/40 bg-[var(--color-accent)]/8'
                : phase.color === 'amber'
                ? 'border-amber-400/30 bg-amber-400/5'
                : 'border-white/[0.08] bg-white/[0.02]'
            }`}
          >
            <p className={`text-[0.55rem] font-bold uppercase tracking-wider mb-1 ${
              phase.color === 'accent' ? 'text-[var(--color-accent)]' :
              phase.color === 'amber' ? 'text-amber-400' : 'text-white/40'
            }`} style={{ fontFamily: "'Roboto Mono', monospace" }}>
              {phase.label}
            </p>
            <p className="text-[0.6rem] text-white/30" style={{ fontFamily: "'Roboto Mono', monospace" }}>
              {phase.date}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="flex flex-wrap gap-2"
      >
        {inclusions.map((inc) => (
          <div key={inc} className="inline-flex items-center gap-2 border border-white/[0.08] bg-white/[0.02] px-3 py-1.5">
            <span className="text-[var(--color-accent)]/60 text-xs">▶</span>
            <span className="text-xs text-white/50" style={{ fontFamily: "'Roboto Mono', monospace" }}>{inc}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function SlidePhase({ slide }: { slide: Slide }) {
  return (
    <div className="flex h-full flex-col justify-center px-8 sm:px-16 max-w-4xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.05 }}
        className="flex items-center gap-4 mb-6"
      >
        <span
          className={`text-[0.6rem] font-bold uppercase tracking-[0.2em] ${slide.accent ? 'text-[var(--color-accent)]' : 'text-white/40'}`}
          style={{ fontFamily: "'Roboto Mono', monospace" }}
        >
          {slide.label}
        </span>
        <div className={`flex-1 h-px ${slide.accent ? 'bg-[var(--color-accent)]/25' : 'bg-white/[0.06]'}`} />
        {slide.date && (
          <span className="text-[0.55rem] text-white/25" style={{ fontFamily: "'Roboto Mono', monospace" }}>
            {slide.date}
          </span>
        )}
      </motion.div>

      <div className="space-y-3">
        {slide.modules?.map((mod, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className={`flex items-start gap-4 border p-4 sm:p-5 ${
              mod.live
                ? 'border-emerald-400/[0.12] bg-emerald-400/[0.03]'
                : 'border-white/[0.06] bg-white/[0.02]'
            }`}
          >
            <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border-2 ${
              mod.live
                ? 'border-emerald-400/50 bg-transparent'
                : slide.accent
                ? 'border-[var(--color-accent)]/60 bg-transparent'
                : 'border-white/20 bg-transparent'
            }`}>
              {mod.num !== undefined ? (
                <span className={`text-xs font-bold ${slide.accent ? 'text-[var(--color-accent)]' : 'text-white/60'}`}
                  style={{ fontFamily: "'Roboto Mono', monospace" }}>
                  {mod.num}
                </span>
              ) : (
                <span className="text-emerald-400 text-[0.55rem] font-bold">AO VIVO</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-sm sm:text-base font-semibold text-white">{mod.title}</h3>
                {mod.date && (
                  <span className={`text-[0.55rem] ${mod.live ? 'text-emerald-400/60' : 'text-white/30'}`}
                    style={{ fontFamily: "'Roboto Mono', monospace" }}>
                    {mod.date}
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {mod.tags.map((tag) => (
                  <span key={tag}
                    className={`text-[0.55rem] px-2 py-0.5 border ${
                      mod.live
                        ? 'border-emerald-400/20 text-emerald-400/60'
                        : 'border-white/[0.08] text-white/40'
                    }`}
                    style={{ fontFamily: "'Roboto Mono', monospace" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideQuestions({ slide }: { slide: Slide }) {
  return (
    <div className="flex h-full flex-col justify-center px-8 sm:px-16 max-w-4xl mx-auto w-full">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="text-[var(--color-accent)]/70 text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-3"
        style={{ fontFamily: "'Roboto Mono', monospace" }}
      >
        Perguntas
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl font-bold text-white mb-8"
        style={{ fontFamily: "'TASAOrbiter', sans-serif" }}
      >
        {slide.title}
      </motion.h2>

      <div className="space-y-4">
        {slide.questions?.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="flex items-start gap-4 border border-white/[0.06] bg-white/[0.02] p-5"
          >
            <span
              className="text-[var(--color-accent)] text-sm font-bold flex-shrink-0 mt-0.5"
              style={{ fontFamily: "'Roboto Mono', monospace" }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">{q}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideProject() {
  const fields = [
    { label: 'Nome do projeto', hint: 'Como você quer chamar?' },
    { label: 'Problema que resolve', hint: 'Qual dor elimina?' },
    { label: 'Para quem', hint: 'Público-alvo ou uso interno?' },
    { label: 'Ferramentas que vai usar', hint: 'Sites, Social Media, Dev…' },
    { label: 'Resultado esperado', hint: 'Como vai saber que deu certo?' },
  ];

  return (
    <div className="flex h-full flex-col justify-center px-8 sm:px-16 max-w-4xl mx-auto w-full">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="text-[var(--color-accent)]/70 text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-3"
        style={{ fontFamily: "'Roboto Mono', monospace" }}
      >
        Definição
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl font-bold text-white mb-8"
        style={{ fontFamily: "'TASAOrbiter', sans-serif" }}
      >
        Projeto da{' '}
        <span className="text-[var(--color-accent)]">Mentoria</span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map((field, i) => (
          <motion.div
            key={field.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
            className={`border border-white/[0.06] bg-white/[0.02] p-4 ${i === fields.length - 1 && fields.length % 2 !== 0 ? 'sm:col-span-2' : ''}`}
          >
            <p
              className="text-[0.6rem] text-[var(--color-accent)]/60 font-bold uppercase tracking-widest mb-2"
              style={{ fontFamily: "'Roboto Mono', monospace" }}
            >
              {field.label}
            </p>
            <div className="h-px w-full bg-white/[0.06] mb-2" />
            <p className="text-xs text-white/20 italic" style={{ fontFamily: "'Roboto Mono', monospace" }}>
              {field.hint}
            </p>
            <div className="mt-3 h-6 border-b border-dashed border-white/[0.08]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function OnboardingClient() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (next: number) => {
      if (next < 0 || next >= SLIDES.length) return;
      setDirection(next > current ? 1 : -1);
      setCurrent(next);
    },
    [current]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') go(current + 1);
      if (e.key === 'ArrowLeft') go(current - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, go]);

  const slide = SLIDES[current]!;
  const progress = ((current + 1) / SLIDES.length) * 100;

  return (
    <div className="relative h-svh w-full overflow-hidden bg-[#08080C] select-none">
      {/* Background dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Glow sutil */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,68,0,0.04), transparent)' }}
      />

      {/* Slide counter */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        <span
          className="text-[0.6rem] text-white/20 tabular-nums"
          style={{ fontFamily: "'Roboto Mono', monospace" }}
        >
          {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </span>
      </div>

      {/* Logo discreto */}
      <div className="absolute top-6 left-6 z-20">
        <span
          className="text-[0.6rem] text-white/15 font-bold uppercase tracking-widest"
          style={{ fontFamily: "'Roboto Mono', monospace" }}
        >
          João Guirunas · Mentoria
        </span>
      </div>

      {/* Área dos slides */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.32, 0, 0.67, 0] }}
          className="absolute inset-0 flex items-center"
        >
          {slide.type === 'welcome' && <SlideWelcome />}
          {slide.type === 'overview' && <SlideOverview />}
          {slide.type === 'phase' && <SlidePhase slide={slide} />}
          {slide.type === 'questions' && <SlideQuestions slide={slide} />}
          {slide.type === 'project' && <SlideProject />}
        </motion.div>
      </AnimatePresence>

      {/* Navegação: prev */}
      {current > 0 && (
        <button
          onClick={() => go(current - 1)}
          aria-label="Slide anterior"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center border border-white/[0.08] bg-white/[0.03] text-white/30 transition-all hover:border-white/20 hover:text-white/60"
        >
          ←
        </button>
      )}

      {/* Navegação: next */}
      {current < SLIDES.length - 1 && (
        <button
          onClick={() => go(current + 1)}
          aria-label="Próximo slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/8 text-[var(--color-accent)]/60 transition-all hover:border-[var(--color-accent)]/60 hover:text-[var(--color-accent)]"
        >
          →
        </button>
      )}

      {/* Barra de progresso */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-white/[0.04]">
        <motion.div
          className="h-full bg-[var(--color-accent)]/50"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Dots de navegação */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className={`transition-all duration-200 rounded-full ${
              i === current
                ? 'w-5 h-1.5 bg-[var(--color-accent)]'
                : 'w-1.5 h-1.5 bg-white/[0.15] hover:bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
