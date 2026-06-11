export const dynamic = 'force-dynamic'

import Link from 'next/link';
import type { Metadata } from 'next';
import { WORKSHOP_2_PHASES } from './_components/WorkshopPhaseLayout';

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const SERIF = "var(--font-display-serif), 'Fraunces', serif";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const ACCENT = 'var(--color-accent)';

const STACK = [
  {
    name: 'AIOX',
    cmd: 'npx aiox-core',
    desc: 'Framework de orquestração de agentes — instala constituição, agentes base, tasks e workflows.',
  },
  {
    name: 'Claude Code',
    cmd: 'claude',
    desc: 'CLI da Anthropic. Onde os agentes vivem e operam — terminal, IDE ou desktop.',
  },
  {
    name: 'Obsidian',
    cmd: 'MCP server',
    desc: 'Memória persistente. Cada decisão, story e ADR vira nota no vault — Claude lê e escreve.',
  },
  {
    name: 'Claude Design',
    cmd: '/design',
    desc: 'Skill de design system: tokens, componentes e geração de UI consistente com a marca.',
  },
];

export const metadata: Metadata = {
  title: 'Workshop 2: AIOX × Claude Code × Design System',
  description:
    'Do briefing ao deploy de uma landing page com squad completo de agentes — AIOX, Claude Code, Obsidian e Claude Design.',
  alternates: { canonical: '/workshop-2' },
};

export default function Workshop2IndexPage() {
  const totalMinutes = WORKSHOP_2_PHASES.reduce(
    (acc, p) => acc + parseInt(p.duration, 10),
    0,
  );

  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20 md:px-8 md:py-28">
        <header className="mb-16">
          <span
            className="inline-block font-mono text-[10px] tracking-[0.22em] uppercase"
            style={{ fontFamily: MONO, color: ACCENT }}
          >
            Workshop · {totalMinutes} min · 7 fases
          </span>
          <h1
            className="mt-4 text-4xl font-light italic leading-[1.05] md:text-7xl"
            style={{ fontFamily: SERIF }}
          >
            Workshop 2:{' '}
            <span className="not-italic font-bold" style={{ fontFamily: DISPLAY }}>
              AIOX × Claude Code
            </span>
            <br />
            <span style={{ color: ACCENT }}>× Design System</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70">
            Vamos construir, ao vivo, uma landing page completa — do briefing ao deploy — usando um
            squad de agentes especializados. Cada fase do workshop tem URL própria para você
            consultar, compartilhar e seguir no seu ritmo.
          </p>
        </header>

        <section className="mb-20">
          <h2
            className="mb-6 font-mono text-[10px] tracking-[0.22em] uppercase text-white/50"
            style={{ fontFamily: MONO }}
          >
            Fases · siga em ordem
          </h2>
          <ol className="grid gap-3 sm:grid-cols-2">
            {WORKSHOP_2_PHASES.map((phase) => (
              <li key={phase.slug}>
                <Link
                  href={phase.href}
                  className="group block border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-[var(--color-accent)]/40 hover:bg-white/[0.04]"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/40 transition-colors group-hover:text-[var(--color-accent)]"
                      style={{ fontFamily: MONO }}
                    >
                      Fase {String(phase.number).padStart(2, '0')}
                    </span>
                    <span
                      className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/40"
                      style={{ fontFamily: MONO }}
                    >
                      {phase.duration}
                    </span>
                  </div>
                  <h3
                    className="mt-3 text-2xl font-bold leading-tight transition-colors group-hover:text-[var(--color-accent)]"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {phase.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2
            className="mb-6 font-mono text-[10px] tracking-[0.22em] uppercase text-white/50"
            style={{ fontFamily: MONO }}
          >
            Stack do workshop
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {STACK.map((item) => (
              <div
                key={item.name}
                className="border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {item.name}
                  </h3>
                  <code
                    className="font-mono text-xs"
                    style={{ fontFamily: MONO, color: ACCENT }}
                  >
                    {item.cmd}
                  </code>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
