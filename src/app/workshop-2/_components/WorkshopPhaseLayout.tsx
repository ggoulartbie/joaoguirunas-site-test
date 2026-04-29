import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type WorkshopPhase = {
  slug: string;
  number: number;
  title: string;
  duration: string;
  href: string;
};

export const WORKSHOP_2_PHASES: WorkshopPhase[] = [
  { slug: 'setup', number: 1, title: 'Setup', duration: '10 min', href: '/workshop-2/setup' },
  { slug: 'analista', number: 2, title: 'Analista', duration: '10 min', href: '/workshop-2/analista' },
  { slug: 'arquiteto', number: 3, title: 'Arquiteto', duration: '10 min', href: '/workshop-2/arquiteto' },
  { slug: 'designer', number: 4, title: 'Designer', duration: '10 min', href: '/workshop-2/designer' },
  { slug: 'dev', number: 5, title: 'Dev', duration: '5 min', href: '/workshop-2/dev' },
  { slug: 'handoff', number: 6, title: 'Handoff', duration: '15 min', href: '/workshop-2/handoff' },
  { slug: 'encerramento', number: 7, title: 'Encerramento', duration: '15 min', href: '/workshop-2/encerramento' },
];

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const SERIF = "var(--font-display-serif), 'Fraunces', serif";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const ACCENT = 'var(--color-accent)';

interface WorkshopPhaseLayoutProps {
  slug: WorkshopPhase['slug'];
  children: ReactNode;
  className?: string;
}

export function WorkshopPhaseLayout({ slug, children, className }: WorkshopPhaseLayoutProps) {
  const phase = WORKSHOP_2_PHASES.find((p) => p.slug === slug);
  if (!phase) {
    throw new Error(`Workshop-2 phase not found for slug: ${slug}`);
  }
  const idx = WORKSHOP_2_PHASES.indexOf(phase);
  const prev = idx > 0 ? WORKSHOP_2_PHASES[idx - 1] : null;
  const next = idx < WORKSHOP_2_PHASES.length - 1 ? WORKSHOP_2_PHASES[idx + 1] : null;

  return (
    <article className={cn('relative min-h-screen bg-black text-white', className)}>
      <div className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">
        <header className="mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/workshop-2"
              className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/50 transition-colors hover:text-[var(--color-accent)]"
              style={{ fontFamily: MONO }}
            >
              ← Workshop 2
            </Link>
            <span
              className="font-mono text-[10px] tracking-[0.22em] uppercase"
              style={{ fontFamily: MONO, color: ACCENT }}
            >
              Fase {String(phase.number).padStart(2, '0')} / 07 · {phase.duration}
            </span>
          </div>
          <h1
            className="mt-6 text-4xl font-light italic leading-tight md:text-5xl"
            style={{ fontFamily: SERIF }}
          >
            {phase.title}
          </h1>
        </header>

        <div className="prose prose-invert max-w-none">{children}</div>

        <nav className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {prev ? (
              <Link
                href={prev.href}
                className="group flex flex-col gap-1"
                style={{ fontFamily: DISPLAY }}
              >
                <span
                  className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/40"
                  style={{ fontFamily: MONO }}
                >
                  ← Anterior
                </span>
                <span className="text-base text-white/80 transition-colors group-hover:text-[var(--color-accent)]">
                  {String(prev.number).padStart(2, '0')} · {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={next.href}
                className="group flex flex-col gap-1 sm:items-end"
                style={{ fontFamily: DISPLAY }}
              >
                <span
                  className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/40"
                  style={{ fontFamily: MONO }}
                >
                  Próxima →
                </span>
                <span className="text-base text-white/80 transition-colors group-hover:text-[var(--color-accent)]">
                  {String(next.number).padStart(2, '0')} · {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/workshop-2"
              className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/40 transition-colors hover:text-[var(--color-accent)]"
              style={{ fontFamily: MONO }}
            >
              Voltar ao índice
            </Link>
          </div>
        </nav>
      </div>
    </article>
  );
}
