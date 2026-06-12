import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';

export const metadata: Metadata = {
  title: '08 — A gente come o que cozinha | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Inter Tight', system-ui, sans-serif";
const SERIF   = "var(--font-display-serif), 'Fraunces', serif";
const EMBER   = '#FF3A0E';
const EMBER_GLOW = '#FF5A1F';
const HAIRLINE = 'rgba(255,255,255,0.07)';

type Area =
  | { label: string; headline: string; text: string; stat: null; isAccent?: false }
  | { label: string; headline: null; text: null; stat: string; isAccent: true };

const AREAS: Area[] = [
  {
    label: 'PMO',
    headline: 'Gestão sem caos.',
    text: 'Projetos internos operados por agentes. Zero perda de contexto. Zero update manual.',
    stat: null,
  },
  {
    label: 'Comercial',
    headline: 'Funil em sistema.',
    text: 'Prospecção e follow-up automatizados. Time fecha. Sistema serve.',
    stat: null,
  },
  {
    label: 'Entrega',
    headline: 'Menos gente. Mais ritmo.',
    text: 'Processos padronizados. Operacional em sistema. Time foca no estratégico.',
    stat: null,
  },
  {
    label: 'Resultado',
    headline: null,
    text: null,
    stat: 'Menos recurso. Mais entrega.',
    isAccent: true,
  },
];

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
          <source src="/video/joao/movimento-05.mp4" type="video/mp4" />
        </video>
        {/* Overlay denso 82% */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,7,0.82)' }} />
        {/* Ember warmth subtle */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 40% at 0% 100%, rgba(255,58,14,0.06) 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="slide-content flex flex-col gap-12" style={{ position: 'relative', zIndex: 1 }}>
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
              Operação Interna · IA em Todo Processo
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-light leading-tight"
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(36px, 5.5vw, 72px)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 0.94,
              color: '#f1f1f3',
              maxWidth: 640,
            }}
          >
            A gente come
            <br />
            <em style={{ fontStyle: 'italic', color: '#f1f1f3' }}>o que cozinha.</em>
          </h1>

          {/* Sub */}
          <p
            style={{
              fontFamily: DISPLAY,
              fontSize: 'clamp(15px, 1.6vw, 20px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.55)',
              maxWidth: 500,
              lineHeight: 1.55,
            }}
          >
            IA em todo processo interno — PMO, comercial, entrega.
          </p>
        </header>

        {/* Cards grid — 3 áreas + 1 resultado */}
        <div
          className="grid gap-px"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            background: HAIRLINE,
            maxWidth: 860,
          }}
        >
          {AREAS.map((area) => {
            if (area.isAccent) {
              return (
                <div
                  key={area.label}
                  style={{
                    background: 'rgba(255,58,14,0.06)',
                    padding: '28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    borderLeft: `2px solid ${EMBER}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 9,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,90,31,0.7)',
                    }}
                  >
                    {area.label}
                  </span>
                  <p
                    style={{
                      fontFamily: SERIF,
                      fontSize: 'clamp(22px, 2.4vw, 32px)',
                      fontWeight: 300,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.05,
                      color: '#f1f1f3',
                      textShadow: `0 0 40px rgba(255,90,31,0.25)`,
                    }}
                  >
                    {area.stat}
                  </p>
                </div>
              );
            }
            return (
              <div
                key={area.label}
                style={{
                  background: '#0e0e11',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 9,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: EMBER,
                  }}
                >
                  {area.label}
                </span>
                {area.headline && (
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontSize: 'clamp(16px, 1.8vw, 22px)',
                      fontWeight: 300,
                      letterSpacing: '-0.02em',
                      color: '#f1f1f3',
                      lineHeight: 1.1,
                    }}
                  >
                    {area.headline}
                  </span>
                )}
                {area.text && (
                  <p
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: 'rgba(255,255,255,0.5)',
                      fontWeight: 300,
                    }}
                  >
                    {area.text}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Rodapé copy */}
        <p
          className="font-light italic"
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(14px, 1.4vw, 18px)',
            color: 'rgba(255,255,255,0.38)',
            maxWidth: 560,
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
          }}
        >
          Não vendemos o que não aplicamos. Cada produto que entregamos ao cliente, rodou primeiro em nós.
        </p>
      </div>
    </Workshop3DeckLayout>
  );
}
