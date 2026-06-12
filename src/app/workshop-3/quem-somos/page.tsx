import type { Metadata } from 'next';
import Image from 'next/image';
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
const BONEMUTE = 'rgba(132,132,140,0.9)';

// Claudia esquerda, João direita — conforme João
const FOUNDERS = [
  {
    name: 'Claudia Guirunas',
    role: 'Co-CEO · Co-Founder',
    handle: '@claudia.guirunas',
    photoSrc: '/photos/founders/claudia-official.png',
    photoAlt: 'Claudia Guirunas — Co-CEO & Co-Founder da Growth Sales',
    bioLead: 'Transforma dados, comportamento e experiência em sistemas inteligentes que geram clareza, fluidez e resultados reais.',
    bioTrail: 'Sua trajetória une estratégia corporativa e gestão ao estudo do comportamento humano. Atua na interseção entre experiência do cliente, cultura organizacional e IA aplicada a processos — tornando operações mais leves e experiências mais consistentes.',
  },
  {
    name: 'João Guirunas',
    role: 'CEO · Co-Founder',
    handle: '@joaoguirunas',
    photoSrc: '/photos/founders/joao-official.png',
    photoAlt: 'João Guirunas — CEO & Co-Founder da Growth Sales',
    bioLead: 'Lidera a frente de estratégia e inovação na Growth Sales, transformando inteligência artificial em eficiência real e evolução dos negócios.',
    bioTrail: 'Sua trajetória une experiência em crescimento e liderança a uma formação sólida em negócio e tecnologia. É publicitário pela FACHA, Web Developer pelo INFNET e possui MBAs em Gestão Empresarial, Inteligência Competitiva, Data Science & Big Data, Inteligência Artificial e Neurociência.',
  },
] as const;

const SLIDE_TAGLINE = '18 meses. 2 produtos no mercado.';

export default function QuemSomosPage() {
  return (
    <Workshop3DeckLayout slug="quem-somos">
      {/* BG — vídeo cinemático fullbleed */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/photos/editorial/hero-editorial-writing.png"
        >
          <source src="/video/joao/cinematic-01.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,5,7,0.52) 0%, rgba(5,5,7,0.68) 100%)',
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

        {/* Founders grid — 2 colunas */}
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
        >
          {FOUNDERS.map((f) => (
            <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

              {/* Foto — proporção 3:4 com foto oficial */}
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  maxHeight: 220,
                  border: '1px solid rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                }}
              >
                {/* Corner accents ember */}
                <span style={{
                  position: 'absolute', top: 12, left: 12, width: 14, height: 14,
                  borderTop: `1.5px solid ${EMBER}`, borderLeft: `1.5px solid ${EMBER}`,
                  opacity: 0.5, zIndex: 1,
                }} />
                <span style={{
                  position: 'absolute', bottom: 12, right: 12, width: 14, height: 14,
                  borderBottom: `1.5px solid ${EMBER}`, borderRight: `1.5px solid ${EMBER}`,
                  opacity: 0.5, zIndex: 1,
                }} />

                <Image
                  src={f.photoSrc}
                  alt={f.photoAlt}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>

              {/* Identity block */}
              <div style={{
                paddingTop: 14,
                paddingBottom: 16,
                paddingLeft: 14,
                paddingRight: 14,
                display: 'flex', flexDirection: 'column', gap: 4,
                background: 'rgba(5,5,7,0.72)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderTop: 'none',
              }}>
                {/* Cargo */}
                <span style={{
                  fontFamily: MONO, fontSize: 10,
                  letterSpacing: '0.18em', textTransform: 'uppercase' as const,
                  color: EMBER,
                }}>
                  {f.role}
                </span>

                {/* Handle Instagram */}
                <span style={{
                  fontFamily: MONO, fontSize: 11,
                  letterSpacing: '0.18em', textTransform: 'uppercase' as const,
                  color: EMBER,
                }}>
                  {f.handle}
                </span>

                {/* Nome */}
                <span style={{
                  fontFamily: SERIF, fontWeight: 400,
                  fontSize: 'clamp(22px, 2.8vw, 32px)',
                  letterSpacing: '-0.02em', lineHeight: 1.05,
                  color: BONE,
                }}>
                  {f.name}
                </span>

                {/* Hairline */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '8px 0 4px' }} />

                {/* Bio — função (destaque) */}
                <p style={{
                  fontFamily: "'Geist', system-ui, sans-serif",
                  fontWeight: 300, fontSize: 14,
                  lineHeight: 1.65, color: BONEDIM,
                }}>
                  {f.bioLead}
                </p>

                {/* Bio — trajetória/formação (discreto) */}
                <p style={{
                  fontFamily: "'Geist', system-ui, sans-serif",
                  fontWeight: 300, fontSize: 12,
                  lineHeight: 1.6, color: BONEMUTE,
                  marginTop: 6,
                }}>
                  {f.bioTrail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tagline rodapé */}
        <div style={{ marginTop: 20 }}>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 14 }} />
          <p style={{
            fontFamily: SERIF, fontStyle: 'italic',
            fontWeight: 300, fontSize: 18,
            color: 'rgba(241,241,243,0.5)', letterSpacing: '-0.01em',
          }}>
            {SLIDE_TAGLINE}
          </p>
        </div>
      </div>
    </Workshop3DeckLayout>
  );
}
