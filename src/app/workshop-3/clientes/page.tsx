import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';

export const metadata: Metadata = {
  title: '07 — Clientes | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO  = "'Geist Mono', 'Roboto Mono', monospace";
const SERIF = "var(--font-display-serif), 'Fraunces', serif";
const EMBER = '#FF3A0E';
const EMBER_GLOW = '#FF5A1F';
const HAIRLINE = 'rgba(255,255,255,0.07)';

const CLIENTS = ['Sisprime', 'Blue3', 'Viva América', 'Argoplan'];

export default function ClientesPage() {
  return (
    <Workshop3DeckLayout slug="clientes">
      {/* Background — vídeo mulher analytics, V-C, loop, muted, autoplay */}
      <video
        aria-hidden="true"
        playsInline
        muted
        loop
        autoPlay
        poster="/photos/joao/joao-corridor-notebook.png"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          zIndex: 0,
          display: 'block',
        }}
      >
        <source src="/video/joao/foco-03.mp4" type="video/mp4" />
      </video>

      {/* Overlay 78% */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(5,5,7,0.78)' }}
      />

      {/* Ember subtle gradient — bottom warmth */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(255,58,14,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="slide-content flex flex-col gap-12" style={{ position: 'relative', zIndex: 3 }}>
        {/* Kicker */}
        <header className="flex flex-col gap-5">
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
              className="font-mono text-[10px] tracking-[0.22em] uppercase"
              style={{ fontFamily: MONO, color: EMBER }}
            >
              Clientes · Operação Real
            </span>
          </div>

          {/* Headline editorial */}
          <h1
            className="font-light leading-none"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(42px, 6vw, 80px)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 0.92,
              color: '#f1f1f3',
            }}
          >
            Quem já opera
            <br />
            <em style={{ fontStyle: 'italic', color: EMBER }}>com o sistema.</em>
          </h1>
        </header>

        {/* Lista editorial — nomes gigantes, hairlines ember sutis */}
        <div
          style={{
            borderTop: `1px solid ${HAIRLINE}`,
            maxWidth: 640,
          }}
        >
          {CLIENTS.map((client, i) => (
            <div
              key={client}
              style={{
                borderBottom: `1px solid ${i === CLIENTS.length - 1 ? 'rgba(255,58,14,0.18)' : HAIRLINE}`,
                display: 'flex',
                alignItems: 'center',
                paddingTop: 20,
                paddingBottom: 20,
                gap: 20,
              }}
            >
              {/* Hairline ember lateral — índice */}
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  color: 'rgba(255,58,14,0.4)',
                  flexShrink: 0,
                  minWidth: 28,
                  userSelect: 'none',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Nome em tipografia editorial */}
              <span
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(36px, 4.5vw, 52px)',
                  fontWeight: 300,
                  letterSpacing: '-0.025em',
                  lineHeight: 1,
                  color: '#f1f1f3',
                }}
              >
                {client}
              </span>
            </div>
          ))}

          {/* "+ outros em operação" */}
          <div style={{ paddingTop: 16, paddingBottom: 4 }}>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              + outros em operação
            </span>
          </div>
        </div>

        {/* Caption de rodapé — citação âncora */}
        <div
          style={{
            maxWidth: 560,
            borderLeft: `2px solid ${EMBER}`,
            paddingLeft: 24,
            marginTop: 8,
          }}
        >
          <p
            className="font-light italic leading-snug"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(18px, 2vw, 24px)',
              color: 'rgba(255,255,255,0.72)',
              letterSpacing: '-0.01em',
            }}
          >
            Empresa grande não compra software.{' '}
            <span style={{ color: '#f1f1f3' }}>Compra resolução de dor.</span>
          </p>
        </div>
      </div>
    </Workshop3DeckLayout>
  );
}
