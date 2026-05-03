'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { SplineScene } from '@/shared/components/ui/SplineScene';
import type { Squad } from '@/data/agentes';

const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em' };

// Hero is transparent — solar system canvas (z-0) shows through.
// Vignette only on the right side so Spline robot has contrast.
const HERO_VIGNETTE = {
  background: `
    linear-gradient(105deg, rgba(2,2,10,0.85) 0%, rgba(2,2,10,0.35) 55%, transparent 100%)
  `,
} as React.CSSProperties;

interface AgentesHeroProps {
  total: number;
  squads: Squad[];
}

export function AgentesHero({ total, squads }: AgentesHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.6, y: 0.4 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    setMouse({ x: (e.clientX - left) / width, y: (e.clientY - top) / height });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section id="hero" className="relative w-full -mt-16">
      <div ref={containerRef} className="relative min-h-[560px] sm:min-h-[92vh] overflow-hidden" style={HERO_VIGNETTE}>
        {/* Mouse-following ember glow — subtle accent over the 3D scene */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] transition-[background] duration-300"
          style={{
            background: `
              radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(255,90,31,0.10) 0%, transparent 35%)
            `,
          }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row h-full min-h-[560px] sm:min-h-[92vh]">
          {/* LEFT — content */}
          <div className="flex-1 flex items-end sm:items-center px-6 sm:px-10 lg:px-16 pb-8 sm:pb-0 pt-28 sm:pt-0">
            <div className="sm:max-w-xl lg:max-w-2xl w-full">
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
                    style={{
                      borderColor: `${s.accent}55`,
                      background: `${s.accent}0d`,
                      ...MONO,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.accent }} />
                    <span className="text-white/90 uppercase">{s.label}</span>
                    <span className="text-white/50">{s.count}</span>
                  </a>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="#squads"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold uppercase transition-all hover:brightness-110 active:scale-[0.98]"
                  style={{ ...MONO, background: '#FF3A0E', color: '#050507' }}
                >
                  <span>Conhecer os agentes</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <a
                  href="/skills/claude-agent-teams"
                  className="inline-flex items-center justify-center gap-2 text-white/70 px-6 py-3 text-sm font-semibold uppercase transition-all hover:bg-white/[0.05] hover:text-white"
                  style={{ ...MONO, border: '1px solid rgba(255,255,255,0.16)' }}
                >
                  Como instalar
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — Spline robot (reuse from mentoria) */}
          <div className="hidden sm:flex flex-1 relative items-center justify-center min-h-[400px]">
            <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full absolute inset-0" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 sm:hidden pointer-events-none z-[2]" style={{ background: 'linear-gradient(to bottom, transparent, #050507)' }} />
      </div>
    </section>
  );
}
