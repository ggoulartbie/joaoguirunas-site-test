'use client'

import { motion } from 'framer-motion'
import { AgentCard } from '@/app/agentes/_components/AgentCard'
import type { Agente, Squad } from '@/data/agentes'

const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
  letterSpacing: '0.14em', textTransform: 'uppercase' as const,
}
const DISPLAY: React.CSSProperties = {
  fontFamily: 'var(--font-display-serif)', fontWeight: 400,
  letterSpacing: '-0.03em', lineHeight: 0.92,
}

export function SquadAgentes({ agentes, squad }: { agentes: Agente[]; squad: Squad }) {
  return (
    <section id="equipe" className="relative py-20 sm:py-28 border-t border-white/[0.07]">
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] opacity-30"
        style={{ background: `linear-gradient(to bottom, transparent, ${squad.accent}, transparent)` }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-16">
        <div className="mb-10 sm:mb-14">
          <p className="mb-4 inline-flex items-center gap-2" style={{ ...MONO, color: squad.accent }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: squad.accent }} />
            {squad.label} Squad · {squad.count} agentes
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4" style={DISPLAY}>
            Sua equipe{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: squad.accent }}>
              já está pronta
            </span>
          </h2>
          <p className="text-white/55 text-sm sm:text-base max-w-xl leading-relaxed">
            Cada agente tem persona definida, autoridades exclusivas e skills especializadas. Você orquestra — eles executam.
          </p>
        </div>
        <div className={`grid gap-2.5 sm:gap-3 ${
          agentes.length >= 10
            ? 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-5'
            : 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-4'
        }`}>
          {agentes.map((agente, i) => (
            <motion.div
              key={agente.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <AgentCard agente={agente} squad={squad} />
            </motion.div>
          ))}
        </div>
        <div className="mt-10 sm:mt-12 text-center">
          <a
            href={`/agentes#squad-${squad.id}`}
            className="inline-flex items-center gap-2 transition-all hover:text-white"
            style={{
              ...MONO, color: 'rgba(255,255,255,0.45)',
              border: '1px solid rgba(255,255,255,0.12)', padding: '0.6rem 1.2rem',
            }}
          >
            Ver perfis detalhados
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
