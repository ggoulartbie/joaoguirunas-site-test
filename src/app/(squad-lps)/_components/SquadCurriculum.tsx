'use client'

import { motion } from 'framer-motion'

const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase' as const,
  fontWeight: 500,
}

const DISPLAY: React.CSSProperties = {
  fontFamily: 'var(--font-display-serif)',
  fontWeight: 400,
  letterSpacing: '-0.03em',
}

interface SquadModuleData {
  num: number
  title: string
  count: number
  description: string
  tags: string[]
}

export interface SquadCurriculumProps {
  accent: string
  ctaLabel: string
  squadModule: SquadModuleData
}

const STATIC_MODULES: SquadModuleData[] = [
  {
    num: 3,
    title: 'Fundamentos do Claude Code',
    count: 9,
    description:
      'A base operacional para deixar de ser usuário de chat e começar a delegar tarefas reais ao Claude com acesso ao seu computador.',
    tags: ['Claude Code', 'CLAUDE.md', 'Skills & Hooks', 'Terminal'],
  },
  {
    num: 4,
    title: 'Centro de Treinamento de Agentes',
    count: 12,
    description:
      'Você cria seu primeiro agente — personalidade, especialidade, instruções. Arquitetura mental, smart-memory, anatomia de squads e Team-OS.',
    tags: ['Agentes', 'Team-OS', 'Smart-Memory', 'Squads'],
  },
  {
    num: 5,
    title: 'Claude Design',
    count: 12,
    description:
      'Seu novo diretor de arte. Design System, KVs de Site, Social, Tráfego e App — todos com identidade visual coerente, em uma manhã.',
    tags: ['Design System', 'KV Site', 'KV Social', 'Handoff'],
  },
]

export function SquadCurriculum({ accent, ctaLabel, squadModule }: SquadCurriculumProps) {
  const allModules = [...STATIC_MODULES, squadModule]

  return (
    <section
      id="modulos"
      className="py-16 sm:py-24 bg-[#08080C]"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-16">
        <div className="mb-10 sm:mb-14">
          <p
            className="mb-4 inline-flex items-center gap-2"
            style={{ ...MONO, color: accent }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: accent }}
              aria-hidden="true"
            />
            O que você recebe
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-white"
            style={{ ...DISPLAY, lineHeight: 0.95 }}
          >
            <span style={{ color: accent }}>4 módulos</span> do curso —{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>acesso imediato</span>
          </h2>
          <p className="mt-4 text-white/55 text-sm sm:text-base max-w-xl leading-relaxed">
            Você não compra só o módulo do squad. Recebe a base completa: do Claude Code aos agentes especializados.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {allModules.map((mod, i) => {
            const isSquad = mod.num === squadModule.num
            return (
              <motion.div
                key={mod.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative p-5 sm:p-6"
                style={{
                  border: `1px solid ${isSquad ? `${accent}40` : 'rgba(255,255,255,0.06)'}`,
                  background: isSquad ? `${accent}0D` : 'rgba(255,255,255,0.015)',
                }}
              >
                {isSquad && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[2px]"
                    style={{ background: `linear-gradient(to bottom, transparent, ${accent}, transparent)` }}
                    aria-hidden="true"
                  />
                )}

                <div className="flex items-start justify-between mb-4">
                  <span style={{ ...MONO, fontSize: '10px', color: isSquad ? accent : 'rgba(255,255,255,0.3)' }}>
                    Módulo {String(mod.num).padStart(2, '0')}
                  </span>
                  <span
                    className="flex items-center gap-1.5 px-2 py-0.5"
                    style={{
                      ...MONO,
                      fontSize: '9px',
                      color: isSquad ? accent : 'rgba(255,255,255,0.35)',
                      border: `1px solid ${isSquad ? `${accent}59` : 'rgba(255,255,255,0.09)'}`,
                    }}
                  >
                    <span
                      className="inline-block w-1 h-1 rounded-full"
                      style={{ background: isSquad ? accent : 'rgba(255,255,255,0.35)' }}
                      aria-hidden="true"
                    />
                    Aulas Gravadas
                  </span>
                </div>

                <h3
                  className="text-white text-lg sm:text-xl mb-2 leading-tight"
                  style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.02em' }}
                >
                  {mod.title}
                </h3>

                <p className="text-white/55 text-sm leading-relaxed mb-4">
                  {mod.description}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span style={{ ...MONO, fontSize: '10px', color: isSquad ? accent : 'rgba(255,255,255,0.4)' }}>
                    {mod.count} aulas
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5"
                        style={{
                          ...MONO,
                          fontSize: '9px',
                          color: 'rgba(255,255,255,0.35)',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="mt-10 sm:mt-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <a
            href="#inscricao"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold transition-all hover:brightness-110 active:scale-[0.98]"
            style={{
              background: accent,
              color: '#050507',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            {ctaLabel}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
