import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';

export const metadata: Metadata = {
  title: '08 — 49 agentes | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO  = "'Geist Mono', 'Roboto Mono', monospace";
const SERIF = "var(--font-display-serif), 'Fraunces', serif";
const EMBER = '#FF3A0E';
const EMBER_GLOW = '#FF5A1F';
const HAIRLINE = 'rgba(255,255,255,0.07)';

const SQUADS = [
  {
    name: 'Arcturianos',
    domain: 'DEV',
    count: 12,
    accent: '#A78BFA',
    fn: 'Arquitetura · código · dados · design · devops · QA · UX',
  },
  {
    name: 'Kaelthari',
    domain: 'PM',
    count: 10,
    accent: '#F59E0B',
    fn: 'Intake · planning · ops · sprints · QA de entregas · meeting intelligence',
  },
  {
    name: 'Luminari',
    domain: 'SITES',
    count: 10,
    accent: '#FF3A0E',
    fn: 'Websites · SEO · CRO · frontend · backend · deployment · acessibilidade',
  },
  {
    name: 'Xelvari',
    domain: 'SOCIAL',
    count: 7,
    accent: '#EC4899',
    fn: 'Copywriting · design · fotos · vídeo · publishing · estratégia',
  },
  {
    name: 'Reptilianos',
    domain: 'TRAFFIC',
    count: 10,
    accent: '#06B6D4',
    fn: 'Google · Meta · TikTok Ads · criativos · BI · automação · QA',
  },
] as const;

export default function ProcessoInternoPage() {
  return (
    <Workshop3DeckLayout slug="processo-interno">
      {/* Background — movimento-04.mp4, poster dual-monitors, overlay 82% */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/photos/joao/joao-dual-monitors.png"
        >
          <source src="/video/joao/movimento-04.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,7,0.82)' }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 60% 40% at 0% 100%, rgba(255,58,14,0.06) 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="slide-content flex flex-col gap-10" style={{ position: 'relative', zIndex: 1 }}>
        {/* Kicker */}
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span
              style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: EMBER,
                boxShadow: `0 0 8px ${EMBER_GLOW}`,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: EMBER,
              }}
            >
              Operação Interna · IA em Todo Processo
            </span>
          </div>

          {/* Hero headline — número gigante */}
          <div className="flex items-baseline gap-4 flex-wrap">
            <h1
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(64px, 10vw, 120px)',
                fontWeight: 300,
                letterSpacing: '-0.04em',
                lineHeight: 0.88,
                color: '#f1f1f3',
              }}
            >
              49{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  color: EMBER,
                  textShadow: `0 0 60px rgba(255,58,14,0.35)`,
                }}
              >
                agentes.
              </em>
            </h1>
          </div>

          {/* Sub */}
          <p
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            5 squads · 1 operação · cada colaborador se multiplica
          </p>
        </header>

        {/* Grid 5 squads */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 1,
            background: HAIRLINE,
            maxWidth: 900,
          }}
        >
          {SQUADS.map((squad) => (
            <div
              key={squad.name}
              style={{
                background: '#0e0e11',
                padding: '20px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                borderTop: `2px solid ${squad.accent}`,
              }}
            >
              {/* Domínio kicker */}
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: squad.accent,
                }}
              >
                {squad.domain}
              </span>

              {/* Número grande */}
              <span
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(32px, 3.5vw, 48px)',
                  fontWeight: 300,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.9,
                  color: '#f1f1f3',
                  textShadow: `0 0 30px ${squad.accent}44`,
                }}
              >
                {squad.count}
              </span>

              {/* Nome da squad */}
              <span
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(13px, 1.2vw, 16px)',
                  fontWeight: 300,
                  letterSpacing: '-0.01em',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.1,
                }}
              >
                {squad.name}
              </span>

              {/* Função resumo */}
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: 8,
                  letterSpacing: '0.08em',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.3)',
                  textTransform: 'none',
                }}
              >
                {squad.fn}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(14px, 1.6vw, 20px)',
            fontWeight: 300,
            fontStyle: 'italic',
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          Operação multiplicada.{' '}
          <span style={{ color: '#f1f1f3' }}>Sem aumentar headcount.</span>
        </p>
      </div>
    </Workshop3DeckLayout>
  );
}
