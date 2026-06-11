'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { SplineScene } from '@/shared/components/ui/SplineScene';
import { Icon } from '@/shared/components/ui';
import { GrowthWatermark } from '@/shared/components/ui/growth-watermark';

const INSCRICAO_ANCHOR = '#inscricao';
const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em' };

// ── Background pattern do brandbook (Cover cinematográfico) ─────────────────
const BG_STRIPES = {
  background: `
    linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.55) 100%),
    repeating-linear-gradient(115deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 2px, transparent 2px, transparent 8px),
    radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 35%, transparent 60%),
    radial-gradient(ellipse at 10% 100%, rgba(255,255,255,0.03) 0%, transparent 50%),
    linear-gradient(to bottom, #050507, #0e0e11)
  `,
} as React.CSSProperties;

function CtaButton({
  label,
  variant = 'primary',
  className = '',
}: {
  label: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}) {
  if (variant === 'secondary') {
    return (
      <a
        href="#modulos"
        className={`inline-flex items-center justify-center gap-2 text-white/70 px-6 py-3 text-sm font-semibold uppercase transition-all hover:bg-white/[0.05] hover:text-white ${className}`}
        style={{ ...MONO, border: '1px solid rgba(255,255,255,0.16)' }}
      >
        {label}
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    );
  }
  return (
    <a
      href={INSCRICAO_ANCHOR}
      className={`inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold uppercase transition-all hover:brightness-110 active:scale-[0.98] ${className}`}
      style={{ ...MONO, background: '#FF3A0E', color: '#050507' }}
    >
      <span>{label}</span>
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
}

export function MentoriaHeroSpline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.6, y: 0.4 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    setMouse({
      x: (e.clientX - left) / width,
      y: (e.clientY - top) / height,
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section id="hero" className="relative w-full bg-[#050507] -mt-16">
      <div
        ref={containerRef}
        className="relative min-h-[520px] sm:min-h-[90vh] overflow-hidden"
        style={BG_STRIPES}
      >
        {/* Watermark */}
        <GrowthWatermark size={600} className="bottom-0 right-0 translate-x-1/4 hidden sm:block opacity-30" />

        {/* Mouse-following ember glow — padrão do brandbook Cover */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] transition-[background] duration-300"
          style={{
            background: `
              radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(255,90,31,0.16) 0%, rgba(255,90,31,0.07) 20%, transparent 44%),
              radial-gradient(circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(255,255,255,0.08) 0%, transparent 20%)
            `,
          }}
        />

        {/* Dot grid texture — brandbook */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.5,
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, transparent 30%, rgba(0,0,0,0.5) 100%)',
            mixBlendMode: 'overlay',
          }}
        />

        {/* ── Layout split: content left / Spline right ── */}
        <div className="relative z-10 flex flex-col sm:flex-row h-full min-h-[520px] sm:min-h-[90vh]">

          {/* ── SPLINE 3D — top mobile (em fluxo), right desktop (absolute) ── */}
          <div className="relative w-full h-[300px] flex-shrink-0 sm:absolute sm:right-0 sm:top-0 sm:bottom-0 sm:w-[58%] sm:h-auto pointer-events-none sm:pointer-events-auto">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>

          {/* ── CONTENT — bottom mobile, left desktop ── */}
          <div className="flex-1 flex items-end sm:items-center px-6 sm:px-10 lg:px-16 pb-8 sm:pb-0 pt-6 sm:pt-0">
            <div className="sm:max-w-xl lg:max-w-2xl w-full">
              {/* H1 */}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl text-white mb-3 sm:mb-5"
                style={{ lineHeight: 0.95, letterSpacing: '-0.03em' }}
              >
                <span style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400 }}>
                  Tenha uma Equipe de Agentes de IA{' '}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display-serif)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: '#FF3A0E',
                  }}
                >
                  Trabalhando Para Você 24/7
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-white/80 sm:max-w-lg leading-relaxed mb-5 sm:mb-8">
                Aprenda a criar, configurar e orquestrar agentes autônomos que executam tarefas complexas para você.{' '}
                <strong className="text-white font-medium">Mentoria intensiva e prática.</strong>
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <CtaButton label="Cadastre-se para a próxima edição" />
                <CtaButton label="Como Funciona" variant="secondary" />
              </div>

              {/* Trust strip desktop */}
              <p
                className="hidden sm:flex text-white/60 text-xs uppercase tracking-widest items-center gap-2 mt-6"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <Icon name="clock" size="16" className="text-[#FF3A0E]" /> Max. 12 pessoas{' '}
                <span className="opacity-40">|</span>{' '}
                <Icon name="check" size="16" className="text-[#FF3A0E]" /> Garantia 7 dias
              </p>
              <p
                className="hidden sm:flex text-white/40 text-xs uppercase tracking-widest items-center gap-2 mt-2"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <Icon name="clock" size="16" className="text-[#FF3A0E]" /> Início:{' '}
                <span className="text-white font-semibold">05/08/2026</span>{' '}
              </p>
            </div>
          </div>

        </div>

        {/* Mobile overlay bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 sm:hidden pointer-events-none z-[2]"
          style={{ background: 'linear-gradient(to bottom, transparent, #050507)' }}
        />
      </div>

      {/* Mobile trust strip */}
      <div className="px-6 py-4 bg-[#050507] sm:hidden">
        <p
          className="text-white/60 text-xs uppercase tracking-widest flex items-center gap-2 flex-wrap"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <Icon name="clock" size="16" className="text-[#FF3A0E]" /> Max. 12 pessoas{' '}
          <span className="opacity-40">|</span>{' '}
          <Icon name="check" size="16" className="text-[#FF3A0E]" /> Garantia 7 dias
        </p>
        <p
          className="text-white/40 text-xs uppercase tracking-widest flex items-center gap-2 flex-wrap mt-2"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <Icon name="clock" size="16" className="text-[#FF3A0E]" /> Início:{' '}
          <span className="text-white font-semibold">05/08/2026</span>
        </p>
      </div>
    </section>
  );
}
