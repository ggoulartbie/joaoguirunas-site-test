'use client';

import { useEffect, useState } from 'react';
import type { Squad } from '@/data/agentes';

const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em' };

interface SquadSideNavProps {
  squads: Squad[];
}

export function SquadSideNav({ squads }: SquadSideNavProps) {
  const [activeId, setActiveId] = useState<string>('hero');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Watch which squad section is in view (uses bounding boxes — same window scroll as canvas)
    const ids = ['hero', ...squads.map((s) => `squad-${s.id}`)];
    const update = () => {
      const viewportCenter = window.scrollY + window.innerHeight * 0.4;
      let current = ids[0]!;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (top <= viewportCenter) current = id;
      }
      setActiveId(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [squads]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* DESKTOP — fixed right vertical nav */}
      <nav
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-stretch"
        aria-label="Navegação por squad"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        style={{ pointerEvents: 'auto' }}
      >
        <div
          className="flex flex-col gap-1 p-2 backdrop-blur-md transition-all"
          style={{
            background: expanded ? 'rgba(2,2,10,0.85)' : 'rgba(2,2,10,0.55)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {squads.map((s) => {
            const id = `squad-${s.id}`;
            const isActive = activeId === id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleClick(id)}
                className="group flex items-center gap-3 px-2.5 py-2.5 transition-all hover:bg-white/[0.06]"
                aria-current={isActive ? 'true' : undefined}
                aria-label={`${s.label} squad — ${s.count} agentes`}
              >
                <span
                  className="relative w-2 h-2 rounded-full shrink-0 transition-all"
                  style={{
                    background: isActive ? s.accent : 'rgba(255,255,255,0.25)',
                    boxShadow: isActive ? `0 0 12px ${s.accent}` : 'none',
                  }}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ background: s.accent, opacity: 0.5 }}
                    />
                  )}
                </span>
                <span
                  className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    expanded ? 'max-w-[140px] opacity-100' : 'max-w-0 opacity-0'
                  }`}
                  style={{ ...MONO, textTransform: 'uppercase', color: isActive ? s.accent : 'rgba(255,255,255,0.7)' }}
                >
                  {s.label}{' '}
                  <span className="opacity-50">({s.count})</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Hint */}
        <p
          className={`mt-3 text-center transition-opacity duration-300 ${expanded ? 'opacity-60' : 'opacity-30'}`}
          style={{ ...MONO, fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}
        >
          Squads
        </p>
      </nav>

      {/* MOBILE — bottom bar */}
      <nav
        className="lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 px-2 py-2 backdrop-blur-md"
        aria-label="Navegação por squad"
        style={{
          background: 'rgba(2,2,10,0.85)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 999,
          pointerEvents: 'auto',
        }}
      >
        {squads.map((s) => {
          const id = `squad-${s.id}`;
          const isActive = activeId === id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => handleClick(id)}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-full transition-all"
              style={{
                background: isActive ? `${s.accent}14` : 'transparent',
              }}
              aria-current={isActive ? 'true' : undefined}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: isActive ? s.accent : 'rgba(255,255,255,0.25)',
                  boxShadow: isActive ? `0 0 8px ${s.accent}` : 'none',
                }}
              />
              <span
                style={{
                  ...MONO,
                  fontSize: '0.55rem',
                  textTransform: 'uppercase',
                  color: isActive ? s.accent : 'rgba(255,255,255,0.6)',
                }}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
