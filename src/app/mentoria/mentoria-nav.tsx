'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'diferenciais', label: 'Diferenciais' },
  { id: 'modulos', label: 'Módulos' },
  { id: 'facilitadores', label: 'Facilitadores' },
  { id: 'investimento', label: 'Investimento' },
  { id: 'faq', label: 'FAQ' },
  { id: 'inscricao', label: 'Inscrição' },
] as const;

export function MentoriaNav() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string>('hero');
  const scrollRef = useRef<HTMLDivElement>(null);

  /* ---------- show/hide based on scroll ---------- */
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 100);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---------- track active section ---------- */
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: '-40% 0px -55% 0px' },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ---------- smooth scroll ---------- */
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80; // account for sticky nav height
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  /* ---------- keep active item scrolled into view on mobile ---------- */
  useEffect(() => {
    if (!scrollRef.current) return;
    const activeBtn = scrollRef.current.querySelector(
      `[data-nav-id="${activeId}"]`,
    );
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeId]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 z-40 bg-[#08080C]/95 backdrop-blur-md border-b border-white/[0.06]"
        >
          <div
            ref={scrollRef}
            className="mx-auto max-w-6xl px-4 flex items-center gap-1 overflow-x-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-nav-id={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative flex-shrink-0 px-3 sm:px-4 py-4 text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[var(--color-accent)]'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-accent)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
