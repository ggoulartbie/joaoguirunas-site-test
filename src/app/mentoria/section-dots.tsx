'use client';

import { useState, useEffect, useCallback } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'diferenciais', label: 'Diferenciais' },
  { id: 'modulos', label: 'Módulos' },
  { id: 'facilitadores', label: 'Facilitadores' },
  { id: 'investimento', label: 'Investimento' },
  { id: 'inscricao', label: 'Inscrição' },
  { id: 'faq', label: 'FAQ' },
] as const;

export function SectionDots() {
  const [activeId, setActiveId] = useState<string>('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { threshold: [0.15, 0.3, 0.5], rootMargin: '-10% 0px -10% 0px' },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-0"
      aria-label="Navegação por seções"
    >
      {SECTIONS.map(({ id, label }, i) => {
        const isActive = activeId === id;

        return (
          <div key={id} className="flex flex-col items-end">
            <button
              onClick={() => scrollTo(id)}
              className="group flex items-center gap-2 py-2 cursor-pointer"
              aria-label={`Ir para ${label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              {/* Label — always visible */}
              <span
                className={`uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? 'text-[0.6rem] text-white/70 font-medium'
                    : 'text-[0.5rem] text-white/20 group-hover:text-white/40'
                }`}
                style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
              >
                {label}
              </span>

              {/* Dot */}
              <span
                className={`rounded-full transition-all duration-300 flex-shrink-0 ${
                  isActive
                    ? 'w-2 h-2 bg-[#FF4400]'
                    : 'w-1.5 h-1.5 bg-white/15 group-hover:bg-white/30'
                }`}
                style={{
                  boxShadow: isActive
                    ? '0 0 6px rgba(255,68,0,0.3)'
                    : 'none',
                }}
              />
            </button>

            {/* Connector line */}
            {i < SECTIONS.length - 1 && (
              <div className="w-px h-2 bg-white/10 mr-[4px] self-end" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
