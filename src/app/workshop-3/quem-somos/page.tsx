import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';
import { GrowthLogo } from '../_components/GrowthLogo';

export const metadata: Metadata = {
  title: '01 — Quem Somos | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const SERIF   = "var(--font-display-serif), 'Fraunces', serif";
const EMBER   = '#FF3A0E';

const FOUNDERS = [
  {
    name: 'Claudia Guirunas',
    role: 'Co-CEO · Co-Founder',
    handle: '@claudia.guirunas',
    photoSrc: '/photos/claudia/claudia-profile.jpg',
    photoAlt: 'Claudia Guirunas — Co-CEO & Co-Founder da Growth Sales',
    photoLabel: 'FOTO · CLAUDIA',
    isPlaceholder: true,
    bio: 'Transforma dados, comportamento e experiência em sistemas inteligentes que geram clareza, fluidez e resultados reais.',
  },
  {
    name: 'João Guirunas',
    role: 'CEO · Co-Founder',
    handle: '@joaoguirunas',
    photoSrc: '/photos/joao/portrait-realistic.png',
    photoAlt: 'João Guirunas — CEO & Co-Founder da Growth Sales',
    photoLabel: '',
    isPlaceholder: false,
    bio: 'Lidera a frente de estratégia e inovação na Growth Sales, transformando inteligência artificial em eficiência real e evolução dos negócios.',
  },
] as const;

export default function QuemSomosPage() {
  return (
    <Workshop3DeckLayout slug="quem-somos">
      {/* ── Hero logo ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
        <span
          className="block font-mono text-[10px] tracking-[0.22em] uppercase mb-6"
          style={{ fontFamily: MONO, color: EMBER }}
        >
          Growth Sales.ai · Quem Somos
        </span>

        <GrowthLogo size="hero" showSymbol />

        {/* Tagline */}
        <p
          className="mt-8 text-[13px] tracking-[0.18em] uppercase font-mono"
          style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.3)' }}
        >
          18 meses · 2 produtos · IA por dentro
        </p>
      </div>

      {/* ── Founders grid ── */}
      <div
        className="grid gap-8 mt-14"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
      >
        {FOUNDERS.map((f) => (
          <div key={f.handle} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

            {/* Photo — 3:4 aspect ratio */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '3/4',
                background: 'rgba(14,14,17,0.9)',
                border: '1px solid rgba(255,255,255,0.07)',
                overflow: 'hidden',
              }}
            >
              {f.isPlaceholder ? (
                /* Placeholder elegante até a foto chegar */
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                    background: 'linear-gradient(160deg, rgba(22,22,26,1) 0%, rgba(14,14,17,1) 100%)',
                  }}
                >
                  {/* Corner accents — estética do brandbook */}
                  <span style={{
                    position: 'absolute', top: 12, left: 12, width: 16, height: 16,
                    borderTop: `1.5px solid ${EMBER}`, borderLeft: `1.5px solid ${EMBER}`, opacity: 0.5,
                  }} />
                  <span style={{
                    position: 'absolute', bottom: 12, right: 12, width: 16, height: 16,
                    borderBottom: `1.5px solid ${EMBER}`, borderRight: `1.5px solid ${EMBER}`, opacity: 0.5,
                  }} />

                  <span style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase' as const,
                    color: 'rgba(255,255,255,0.18)',
                  }}>
                    {f.photoLabel}
                  </span>

                  <span style={{
                    display: 'block',
                    width: 32,
                    height: 1,
                    background: `rgba(255,58,14,0.3)`,
                  }} />

                  <span style={{
                    fontFamily: MONO,
                    fontSize: 9,
                    letterSpacing: '0.15em',
                    color: 'rgba(255,255,255,0.1)',
                  }}>
                    {f.photoSrc}
                  </span>
                </div>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={f.photoSrc}
                  alt={f.photoAlt}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: '50% 18%',
                    display: 'block',
                  }}
                />
              )}
            </div>

            {/* Identity block */}
            <div style={{ paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {/* Role */}
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

              {/* Name */}
              <span
                style={{
                  fontFamily: SERIF,
                  fontWeight: 300,
                  fontSize: 'clamp(22px, 2.5vw, 30px)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.05,
                  color: '#f1f1f3',
                }}
              >
                {f.name}
              </span>

              {/* Instagram handle */}
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase' as const,
                  color: EMBER,
                }}
              >
                {f.handle}
              </span>

              {/* Hairline */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '10px 0' }} />

              {/* Bio */}
              <p
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: 300,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: 'rgba(197,197,202,0.85)',
                }}
              >
                {f.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Workshop3DeckLayout>
  );
}
