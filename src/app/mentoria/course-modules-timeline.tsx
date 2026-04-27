'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const MODULES = [
  {
    num: 1,
    type: 'Presencial' as const,
    date: '12 de maio · Terça-feira · 13h–18h',
    title: 'Desbloqueio Mental + Setup Inicial',
    description:
      'Sessão presencial com Claudia para desbloqueio mental, respiração e controle de ansiedade. Setup do ambiente Claude Code e AIOX completo.',
    tags: ['Presencial', 'Desbloqueio Mental', 'Setup'],
  },
  {
    num: 2,
    type: 'Online' as const,
    date: '14 de maio · Quinta-feira · 19h–21h',
    title: 'Fundamentos do Claude Code',
    description:
      'Primeiro contato com Claude Code, comandos básicos, entendendo o MCP e ferramentas. Você sai dominando a base.',
    tags: ['Claude Code', 'MCP', 'Fundamentos'],
  },
  {
    num: 3,
    type: 'Online' as const,
    date: '19 de maio · Terça-feira · 19h–21h',
    title: 'Criando Seus Primeiros Agentes',
    description:
      'Configuração de agentes especializados, personas, workflows básicos. Seus primeiros agentes funcionando.',
    tags: ['Agentes IA', 'Personas', 'Workflows'],
  },
  {
    num: 4,
    type: 'Online' as const,
    date: '21 de maio · Quinta-feira · 19h–21h',
    title: 'Squad de Software Engineering',
    description:
      'Montagem de squad de desenvolvimento: dev, qa, architect, devops. Um time completo de engenharia operando para você.',
    tags: ['Software Engineering', 'Squad', 'Dev'],
  },
  {
    num: 5,
    type: 'Online' as const,
    date: '26 de maio · Terça-feira · 19h–21h',
    title: 'Squad de Marketing e Growth',
    description:
      'Montagem de squad de marketing: copywriter, seo, social media, analytics. Escale sua produção de conteúdo.',
    tags: ['Growth Marketing', 'Copywriter', 'SEO'],
  },
  {
    num: 6,
    type: 'Online' as const,
    date: '28 de maio · Quinta-feira · 19h–21h',
    title: 'Automação e Integração',
    description:
      'Integração com ferramentas externas, automação de processos, MCP servers. Conecte seus agentes ao mundo.',
    tags: ['Automação', 'Integrações', 'MCP Servers'],
  },
  {
    num: 7,
    type: 'Online' as const,
    date: '02 de junho · Terça-feira · 19h–21h',
    title: 'Squad Personalizada Para Seu Negócio',
    description:
      'Criação de agentes específicos para o caso de uso de cada participante. Algo feito sob medida para você.',
    tags: ['Personalizado', 'Seu Negócio', 'Deploy'],
  },
  {
    num: 8,
    type: 'Online' as const,
    date: '04 de junho · Quinta-feira · 19h–21h',
    title: 'Escalando e Otimizando Seus Agentes',
    description:
      'Monitoramento, performance, custo e iteração contínua dos agentes em produção.',
    tags: ['Otimização', 'Monitoramento', 'Produção'],
  },
  {
    num: 9,
    type: 'Online' as const,
    date: '09 de junho · Terça-feira · 19h–21h',
    title: 'Automação Avançada e Casos de Uso Reais',
    description:
      'Casos de uso reais de participantes, troubleshooting ao vivo, melhores práticas consolidadas.',
    tags: ['Casos Reais', 'Troubleshooting', 'Avançado'],
  },
  {
    num: 10,
    type: 'Presencial' as const,
    date: 'A definir',
    title: 'Apresentação Final + Networking',
    description:
      'Apresentação dos projetos, feedback, certificação e networking com a turma. Celebre o que você construiu.',
    tags: ['Presencial', 'Certificação', 'Networking'],
  },
];

const INSCRICAO_ANCHOR = '#inscricao';

function TimelineCard({
  module,
  index,
}: {
  module: (typeof MODULES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} className="relative flex gap-6 sm:gap-10">
      {/* Linha vertical + indicador */}
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 }}
          className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--color-accent)]/60 bg-[#08080C]"
          style={{
            boxShadow: '0 0 20px rgba(255,68,0,0.2)',
          }}
        >
          <span
            className="text-[var(--color-accent)] text-xs sm:text-sm font-bold"
            style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
          >
            {module.num}
          </span>
        </motion.div>
        {/* Linha conectora */}
        {index < MODULES.length - 1 && (
          <div className="w-px flex-1 bg-gradient-to-b from-[var(--color-accent)]/40 to-[var(--color-accent)]/5" />
        )}
      </div>

      {/* Card de conteudo */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
        className="group relative flex-1 pb-10 sm:pb-14"
      >
        <div className="relative border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 transition-all duration-300 hover:border-[var(--color-accent)]/20 hover:bg-white/[0.04]">
          {/* Glow sutil no hover */}
          <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(400px at 50% 0%, rgba(255,68,0,0.06), transparent)' }} />

          <div className="relative">
            <div className="flex items-center gap-2">
              <span
                className="text-[var(--color-accent)]/70 text-xs font-semibold uppercase tracking-widest"
                style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
              >
                Encontro {module.num}
              </span>
              <span
                className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 ${
                  module.type === 'Presencial'
                    ? 'text-[var(--color-accent)] border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10'
                    : 'text-white/60 border border-white/[0.12] bg-white/[0.04]'
                }`}
                style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
              >
                {module.type}
              </span>
            </div>
            <p
              className="mt-2 text-xs text-white/40"
              style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
            >
              {module.date}
            </p>
            <h3 className="mt-2 text-lg sm:text-xl font-bold text-white leading-snug">
              {module.title}
            </h3>
            <p className="mt-3 text-sm sm:text-[0.9rem] text-white/60 leading-relaxed">
              {module.description}
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {module.tags.map((tag) => (
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
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
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
              10 Encontros
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight" style={{ fontFamily: "'TASAOrbiter', var(--font-bb-display), sans-serif" }}>
            Do Zero ao Time Completo em{' '}
            <span className="text-[var(--color-accent)]">4 Semanas</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
            Uma jornada intensiva e prática. Cada encontro constrói sobre o anterior para você sair com um time de agentes de IA operando no seu negócio.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {MODULES.map((mod, i) => (
            <TimelineCard key={mod.num} module={mod} index={i} />
          ))}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
