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
  { slug: 'configuracao',    number: 1,  title: 'Configuração',    duration: '10 min', href: '/workshop-2/configuracao' },
  { slug: 'analista',        number: 2,  title: 'Analista',        duration: '10 min', href: '/workshop-2/analista' },
  { slug: 'arquiteto',       number: 3,  title: 'Arquiteto',       duration: '15 min', href: '/workshop-2/arquiteto' },
  { slug: 'ux-v1',           number: 4,  title: 'Designer UX',     duration: '10 min', href: '/workshop-2/ux-v1' },
  { slug: 'devops-local',    number: 5,  title: 'Ver local',       duration: '5 min',  href: '/workshop-2/devops-local' },
  { slug: 'handoff-design',  number: 6,  title: 'Claude Design',   duration: '10 min', href: '/workshop-2/handoff-design' },
  { slug: 'handoff-code',    number: 7,  title: 'Handoff → Code',  duration: '5 min',  href: '/workshop-2/handoff-code' },
  { slug: 'ux-v2',           number: 8,  title: 'UX Redesign',     duration: '10 min', href: '/workshop-2/ux-v2' },
  { slug: 'devops-url',      number: 9,  title: 'Publicar URL',    duration: '10 min', href: '/workshop-2/devops-url' },
  { slug: 'encerramento',    number: 10, title: 'Encerramento',    duration: '15 min', href: '/workshop-2/encerramento' },
];

const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const SERIF   = "var(--font-display-serif), 'Fraunces', serif";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const ACCENT  = 'var(--color-accent)';

interface WorkshopPhaseLayoutProps {
  slug: WorkshopPhase['slug'];
  children: ReactNode;
  className?: string;
}

export function WorkshopPhaseLayout({ slug, children, className }: WorkshopPhaseLayoutProps) {
  const phase = WORKSHOP_2_PHASES.find((p) => p.slug === slug);
  if (!phase) throw new Error(`Workshop-2 phase not found for slug: ${slug}`);

  const idx  = WORKSHOP_2_PHASES.indexOf(phase);
  const prev = idx > 0 ? WORKSHOP_2_PHASES[idx - 1] : null;
  const next = idx < WORKSHOP_2_PHASES.length - 1 ? WORKSHOP_2_PHASES[idx + 1] : null;
  const total = WORKSHOP_2_PHASES.length;

  return (
    <article className={cn('relative min-h-screen bg-black text-white', className)}>
      <div className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">

        {/* ── Top bar ── */}
        <div className="mb-10 flex items-center justify-between gap-4">
          <Link
            href="/workshop-2"
            className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/40 transition-colors hover:text-[var(--color-accent)]"
            style={{ fontFamily: MONO }}
          >
            ← Workshop 2
          </Link>
          <span
            className="font-mono text-[10px] tracking-[0.22em] uppercase"
            style={{ fontFamily: MONO, color: ACCENT }}
          >
            {phase.duration}
          </span>
        </div>

        {/* ── Progress dots ── */}
        <div className="mb-10 flex items-center gap-2">
          {WORKSHOP_2_PHASES.map((p) => {
            const isCurrent = p.slug === slug;
            const isDone    = p.number < phase.number;
            return (
              <Link
                key={p.slug}
                href={p.href}
                title={`Fase ${p.number} — ${p.title}`}
                className="flex-1 h-0.5 transition-all hover:opacity-80"
                style={{
                  background: isCurrent
                    ? ACCENT
                    : isDone
                    ? 'rgba(255,58,14,0.35)'
                    : 'rgba(255,255,255,0.1)',
                }}
              />
            );
          })}
          <span
            className="flex-shrink-0 font-mono text-[10px] tracking-[0.15em] ml-2"
            style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.3)' }}
          >
            {phase.number}/{total}
          </span>
        </div>

        {/* ── Header ── */}
        <header className="mb-12 border-b border-white/10 pb-8">
          <span
            className="block font-mono text-[10px] tracking-[0.22em] uppercase mb-3"
            style={{ fontFamily: MONO, color: ACCENT }}
          >
            Fase {String(phase.number).padStart(2, '0')} de {String(total).padStart(2, '0')}
          </span>
          <h1
            className="text-4xl font-light italic leading-tight md:text-5xl"
            style={{ fontFamily: SERIF }}
          >
            {phase.title}
          </h1>
        </header>

        {/* ── Content ── */}
        <div>{children}</div>

        {/* ── Nav ── */}
        <nav className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {prev ? (
              <Link href={prev.href} className="group flex flex-col gap-1">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/35" style={{ fontFamily: MONO }}>
                  ← Anterior
                </span>
                <span className="text-base text-white/70 transition-colors group-hover:text-[var(--color-accent)]" style={{ fontFamily: DISPLAY }}>
                  {String(prev.number).padStart(2, '0')} · {prev.title}
                </span>
              </Link>
            ) : (
              <Link href="/workshop-2" className="group flex flex-col gap-1">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/35" style={{ fontFamily: MONO }}>
                  ← Início
                </span>
                <span className="text-base text-white/70 transition-colors group-hover:text-[var(--color-accent)]" style={{ fontFamily: DISPLAY }}>
                  Índice do workshop
                </span>
              </Link>
            )}
            {next ? (
              <Link href={next.href} className="group flex flex-col gap-1 sm:items-end">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/35" style={{ fontFamily: MONO }}>
                  Próxima →
                </span>
                <span className="text-base text-white/70 transition-colors group-hover:text-[var(--color-accent)]" style={{ fontFamily: DISPLAY }}>
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
              className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/30 transition-colors hover:text-[var(--color-accent)]"
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
