'use client';

import type { Squad } from '@/data/agentes';

const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em' };

interface AgentesHeroProps {
  total: number;
  squads: Squad[];
}

export function AgentesHero({ total, squads }: AgentesHeroProps) {
  return (
    <section id="hero" className="relative w-full -mt-16">
      <div className="relative min-h-[560px] sm:min-h-[92vh] overflow-hidden">
        <div className="relative z-10 flex flex-col h-full min-h-[560px] sm:min-h-[92vh] items-start justify-center px-6 sm:px-10 lg:px-16">
          <div className="sm:max-w-xl lg:max-w-2xl w-full pt-28 sm:pt-0 pb-8 sm:pb-0">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <span
                className="inline-flex items-center gap-2 border border-[#FF3A0E]/60 px-3 py-1.5"
                style={{ background: 'rgba(255,58,14,0.08)', ...MONO }}
              >
                <span className="relative inline-flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3A0E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3A0E]" />
                </span>
                <span className="text-[#FF3A0E] uppercase">{total} Agentes Online</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-4 sm:mb-6" style={{ lineHeight: 0.95, letterSpacing: '-0.03em' }}>
              <span style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400 }}>{total} agentes Claude que </span>
              <span style={{ fontFamily: 'var(--font-display-serif)', fontStyle: 'italic', fontWeight: 300, color: '#FF3A0E' }}>
                trabalham por você
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 sm:max-w-lg leading-relaxed mb-6 sm:mb-8">
              Quatro squads completas — Dev, Sites, Social e Traffic. Cada agente com persona, autoridades e skills definidos.
              Drop-in pra qualquer projeto Claude Code.
            </p>

            {/* Squad chips */}
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {squads.map((s) => (
                <a
                  key={s.id}
                  href={`#squad-${s.id}`}
                  className="inline-flex items-center gap-2 px-3 py-2 border transition-all hover:bg-white/[0.06]"
                  style={{ borderColor: `${s.accent}55`, background: `${s.accent}0d`, ...MONO }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.accent }} />
                  <span className="text-white/90 uppercase">{s.label}</span>
                  <span className="text-white/50">{s.count}</span>
                </a>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Primary — scroll to squads */}
              <a
                href="#squads"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 uppercase transition-all hover:brightness-110 active:scale-[0.98]"
                style={{ ...MONO, background: '#FF3A0E', color: '#050507' }}
              >
                <span>Conhecer os agentes</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </a>

              {/* Secondary — mentoria */}
              <a
                href="/mentoria"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 uppercase transition-all hover:brightness-110"
                style={{ ...MONO, border: '1px solid rgba(255,58,14,0.45)', color: 'rgba(255,58,14,0.9)', background: 'rgba(255,58,14,0.06)' }}
              >
                Mentoria
              </a>

              {/* Tertiary — install, discreto. Oculto no mobile (baixo contraste + hierarquia clara) */}
              <a
                href="/skills/claude-agent-teams"
                className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-3 uppercase transition-all hover:text-white/60"
                style={{ ...MONO, color: 'rgba(255,255,255,0.28)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                Como instalar
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 sm:hidden pointer-events-none z-[2]" style={{ background: 'linear-gradient(to bottom, transparent, #050507)' }} />
      </div>
    </section>
  );
}
