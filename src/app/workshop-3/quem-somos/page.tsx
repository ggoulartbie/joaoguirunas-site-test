import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';
import { GrowthLogo } from '../_components/GrowthLogo';

export const metadata: Metadata = {
  title: '01 — Quem Somos | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const SERIF   = "var(--font-display-serif), 'Fraunces', serif";
const EMBER   = '#FF3A0E';
const BONE    = '#f1f1f3';
const BONEDIM = '#c5c5ca';

const FOUNDERS = [
  {
    name: 'João Guirunas',
    role: 'CEO · Co-Founder',
    photoSrc: '/photos/joao/portrait-realistic.png',
    photoAlt: 'João Guirunas — CEO & Co-Founder da Growth Sales',
    isPlaceholder: false,
    bio: 'Lidera a frente de estratégia e inovação na Growth Sales, transformando inteligência artificial em eficiência real e evolução dos negócios.',
  },
  {
    name: 'Claudia Guirunas',
    role: 'Co-CEO · Co-Founder',
    photoSrc: null,
    photoAlt: 'Claudia Guirunas — Co-CEO & Co-Founder da Growth Sales',
    isPlaceholder: true,
    bio: 'Transforma dados, comportamento e experiência em sistemas inteligentes que geram clareza, fluidez e resultados reais.',
  },
] as const;

const SLIDE_TAGLINE = '18 meses. 2 produtos no mercado.';

export default function QuemSomosPage() {
  return (
    <Workshop3DeckLayout slug="quem-somos">
      {/* BG — rooftop night, gradient direita mais denso para legibilidade dos cards */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photos/joao/joao-rooftop-night.png"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(5,5,7,0.92) 0%, rgba(5,5,7,0.75) 50%, rgba(5,5,7,0.30) 100%)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
        {/* Kicker */}
        <span
          className="block font-mono text-[10px] tracking-[0.22em] uppercase mb-6"
          style={{ fontFamily: MONO, color: EMBER }}
        >
          Growth Sales.ai · Apresentação
        </span>

        {/* Logo hero lockup horizontal */}
        <GrowthLogo size="hero" />

        {/* Hairline separador logo/cards */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '28px 0 24px' }} />

        {/* Founders grid — 2 colunas desktop, 1 coluna mobile */}
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}
        >
          {FOUNDERS.map((f) => (
            <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

              {/* Foto — proporção 3:4, max-height 220px desktop */}
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  maxHeight: 220,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                }}
              >
                {f.isPlaceholder ? (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase' as const,
                      color: 'rgba(255,255,255,0.2)',
                    }}>
                      FOTO · {f.name.split(' ').at(0)?.toUpperCase()}
                    </span>
                  </div>
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={f.photoSrc ?? ''}
                    alt={f.photoAlt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      display: 'block',
                    }}
                  />
                )}
              </div>

              {/* Identity block */}
              <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 5 }}>
                {/* Cargo */}
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase' as const,
                    color: EMBER,
                  }}
                >
                  {f.role}
                </span>

                {/* Nome */}
                <span
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 400,
                    fontSize: 'clamp(22px, 2.8vw, 32px)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.05,
                    color: BONE,
                  }}
                >
                  {f.name}
                </span>

                {/* Hairline */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '8px 0' }} />

                {/* Bio curta */}
                <p
                  style={{
                    fontFamily: "'Geist', system-ui, sans-serif",
                    fontWeight: 300,
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: BONEDIM,
                  }}
                >
                  {f.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hairline + Tagline rodapé */}
        <div style={{ marginTop: 24 }}>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 16 }} />
          <p
            style={{
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 18,
              color: 'rgba(241,241,243,0.5)',
              letterSpacing: '-0.01em',
            }}
          >
            {SLIDE_TAGLINE}
          </p>
        </div>
      </div>
    </Workshop3DeckLayout>
  );
}
