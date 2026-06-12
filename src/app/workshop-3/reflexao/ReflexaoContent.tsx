'use client';

import { useEffect, useRef } from 'react';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';
import { GrowthLogo } from '../_components/GrowthLogo';

const MONO       = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY    = "var(--font-display), 'Space Grotesk', sans-serif";
const SERIF      = "var(--font-display-serif), 'Fraunces', serif";
const EMBER      = '#FF3A0E';
const EMBER_GLOW = '#FF5A1F';

function FadeUp({
  children,
  delay = 0,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
    const t = setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 80 + delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

export function ReflexaoContent() {
  return (
    <Workshop3DeckLayout slug="reflexao">
      {/* Background — vídeo contemplativo, overlay leve para slide emocional de fechamento */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/photos/joao/joao-cityscape-reflection.png"
        >
          <source src="/video/joao/movimento-05.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(5,5,7,0.40) 0%, rgba(5,5,7,0.38) 40%, rgba(5,5,7,0.60) 100%)',
          }}
        />
        {/* Dot-grid opacity 0.4 — marca o encerramento conforme spec */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            opacity: 0.4,
          }}
        />
      </div>

      <div className="slide-content flex flex-col gap-10" style={{ position: 'relative', zIndex: 1 }}>
        {/* Kicker + headline */}
        <FadeUp delay={0}>
          <header>
            <span
              className="block font-mono text-[10px] tracking-[0.22em] uppercase mb-5"
              style={{ fontFamily: MONO, color: EMBER }}
            >
              A REFLEXÃO
            </span>
            <h1
              className="text-5xl font-bold leading-none md:text-7xl"
              style={{ fontFamily: DISPLAY }}
            >
              Dois recados.
            </h1>
          </header>
        </FadeUp>

        {/* 2 cards lado a lado */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Card 1 — Pra pessoa */}
          <FadeUp delay={160} style={{ height: '100%' }}>
            <div
              className="flex flex-col gap-5 p-7 md:p-8 h-full"
              style={{
                border: '1px solid rgba(255,255,255,0.10)',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <span
                className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.45)' }}
              >
                Pra pessoa
              </span>
              <p
                style={{
                  fontFamily: SERIF,
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(17px, 1.9vw, 21px)',
                  color: 'rgba(255,255,255,0.90)',
                  lineHeight: 1.55,
                }}
              >
                Médico. Advogado. Vendedor. Designer.{' '}
                <span style={{ color: 'rgba(255,255,255,0.62)' }}>
                  IA é eficiência operacional. Muito mais com muito menos. Independe da sua profissão.
                </span>
              </p>
            </div>
          </FadeUp>

          {/* Card 2 — Pra empresário */}
          <FadeUp delay={300} style={{ height: '100%' }}>
            <div
              className="flex flex-col gap-5 p-7 md:p-8 h-full"
              style={{
                border: '1px solid rgba(255,58,14,0.28)',
                background: 'rgba(255,58,14,0.055)',
              }}
            >
              <span
                className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ fontFamily: MONO, color: EMBER }}
              >
                Pra empresário
              </span>
              <p
                style={{
                  fontFamily: SERIF,
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(17px, 1.9vw, 21px)',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.55,
                }}
              >
                Eficiência também. Mas desenvolver negócio com IA exige{' '}
                <strong style={{ fontStyle: 'normal', fontWeight: 700, color: EMBER_GLOW }}>
                  REPERTÓRIO
                </strong>
                .{' '}
                <span style={{ color: 'rgba(255,255,255,0.65)' }}>
                  É o repertório que enxerga qual dor vale atacar.{' '}
                </span>
                A IA acelera; o repertório direciona.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* Frase final — solta no espaço, fora dos cards, peso visual máximo */}
        <FadeUp delay={520}>
          <p
            className="text-center"
            style={{
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(28px, 4vw, 56px)',
              lineHeight: 1.18,
              letterSpacing: '-0.015em',
              color: 'rgba(255,255,255,0.97)',
              marginTop: '1.5rem',
            }}
          >
            IA não cria o caminho.
            <br />
            <span style={{ color: 'rgba(255,255,255,0.68)' }}>Ela encurta o caminho</span>
            <br />
            <span style={{ color: EMBER }}>que você já sabia andar.</span>
          </p>
        </FadeUp>

        {/* Rodapé de encerramento — GrowthLogo lg + tagline */}
        <FadeUp delay={740}>
          <div
            className="flex flex-col items-center gap-3 pt-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: '0.5rem' }}
          >
            <GrowthLogo size="lg" />
            <span
              style={{
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '15px',
                color: 'rgba(255,255,255,0.38)',
                letterSpacing: '0.02em',
              }}
            >
              Service as a System.
            </span>
            <span
              style={{
                fontFamily: MONO,
                fontSize: '10px',
                letterSpacing: '0.18em',
                color: 'rgba(255,255,255,0.20)',
                textTransform: 'uppercase',
              }}
            >
              growthsales.ai
            </span>
          </div>
        </FadeUp>
      </div>
    </Workshop3DeckLayout>
  );
}
