import type { SquadConfig } from './types';

const KV_DISPLAY: React.CSSProperties = {
  fontFamily: 'var(--font-display-serif)',
  fontWeight: 400,
  letterSpacing: '-0.03em',
};

const KV_MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
};

interface SquadHeroProps {
  headline: SquadConfig['headline'];
  sub: SquadConfig['sub'];
  ctaLabel: SquadConfig['ctaLabel'];
  price: SquadConfig['price'];
  priceInstallments: SquadConfig['priceInstallments'];
}

export function SquadHero({ headline, sub, ctaLabel, price, priceInstallments }: SquadHeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[92vh] flex items-center"
      style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(255,58,14,0.06) 0%, transparent 60%)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-10 lg:px-16 w-full pt-20 pb-16">
        <div className="sm:max-w-2xl lg:max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <span
              className="inline-flex items-center gap-2 border border-[#FF3A0E]/60 px-3 py-1.5"
              style={{ background: 'rgba(255,58,14,0.08)', ...KV_MONO }}
            >
              <span className="relative inline-flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3A0E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3A0E]" />
              </span>
              <span className="text-[#FF3A0E]">Squad · Módulo Avulso</span>
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-7xl text-white mb-6"
            style={{ ...KV_DISPLAY, lineHeight: 0.92 }}
          >
            {headline}
          </h1>

          <p className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed mb-8">
            {sub}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <a
              href="#inscricao"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold uppercase transition-all hover:brightness-110 active:scale-[0.98]"
              style={{ background: '#FF3A0E', color: '#050507', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.16em' }}
            >
              {ctaLabel}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-6">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl" style={{ ...KV_DISPLAY, color: '#FF3A0E' }}>
                {price}
              </span>
              <span style={{ ...KV_MONO, color: 'rgba(255,255,255,0.35)' }}>À vista</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl" style={{ ...KV_DISPLAY, color: 'rgba(255,255,255,0.6)' }}>
                {priceInstallments}
              </span>
              <span style={{ ...KV_MONO, color: 'rgba(255,255,255,0.35)' }}>No cartão</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
