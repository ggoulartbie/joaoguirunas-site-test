import type { SquadConfig } from './types';

const DEFAULT_ACCENT = '#FF3A0E';

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

function hexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* Parses a headline that may contain an em-dash (—) and renders it
   as a billboard layout: benefit above / divider / contrast below. */
function HeadlineContent({
  headline,
  accent,
  compact,
}: {
  headline: string;
  accent: string;
  compact: boolean;
}) {
  const dashIdx = headline.indexOf('—');
  if (dashIdx === -1) {
    return <>{headline}</>;
  }

  const before = headline.slice(0, dashIdx).trim();
  const after = headline.slice(dashIdx + 1).trim();

  // Detect if after-dash starts directly with "sem " (e.g. squad-dev)
  const startsWithSem = /^sem\s+/i.test(after);
  const afterWithoutSem = startsWithSem ? after.replace(/^sem\s+/i, '') : after;

  return (
    <>
      {/* Main benefit line */}
      <span className="block">{before}</span>

      {/* Divider: SEM badge (squad-dev) or accent dot */}
      <span
        aria-hidden="true"
        className="flex items-center gap-3"
        style={{ margin: compact ? '0.75rem 0' : '1rem 0' }}
      >
        <span style={{ display: 'block', height: 1, flex: 1, background: 'rgba(255,255,255,0.10)' }} />
        {startsWithSem ? (
          <span
            className="flex-none inline-flex items-center px-3 py-0.5"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: compact ? '9px' : '10px',
              letterSpacing: '0.22em',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: '#050507',
              background: accent,
            }}
          >
            SEM
          </span>
        ) : (
          <span
            className="flex-none w-1.5 h-1.5 rounded-full"
            style={{ background: accent }}
          />
        )}
        <span style={{ display: 'block', height: 1, flex: 1, background: 'rgba(255,255,255,0.10)' }} />
      </span>

      {/* After-dash contrast line */}
      <span
        className="block"
        style={{
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.45)',
          fontSize: compact ? '0.88em' : '0.82em',
        }}
      >
        {startsWithSem ? afterWithoutSem : after}
      </span>
    </>
  );
}

interface SquadHeroProps {
  headline: SquadConfig['headline'];
  sub: SquadConfig['sub'];
  ctaLabel: SquadConfig['ctaLabel'];
  price: SquadConfig['price'];
  priceInstallments: SquadConfig['priceInstallments'];
  accent?: string;
  badgeLabel?: string;
  vslAccent?: string;
  vslVideoId?: string;
}

export function SquadHero({
  headline,
  sub,
  ctaLabel,
  price,
  priceInstallments,
  accent = DEFAULT_ACCENT,
  badgeLabel = 'Squad · Módulo Avulso',
  vslAccent,
  vslVideoId,
}: SquadHeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center"
      style={{ background: `radial-gradient(ellipse at 60% 40%, ${hexAlpha(accent, 0.06)} 0%, transparent 60%)` }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-10 lg:px-16 w-full py-16 sm:py-20">
        <div className={`grid grid-cols-1 ${vslAccent ? 'lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16' : ''} items-center`}>

          {/* Copy column */}
          <div className={vslAccent ? '' : 'sm:max-w-2xl lg:max-w-3xl'}>
            <div className="flex items-center gap-2 mb-6">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5"
                style={{ background: hexAlpha(accent, 0.08), border: `1px solid ${hexAlpha(accent, 0.6)}`, ...KV_MONO }}
              >
                <span className="relative inline-flex h-2 w-2" aria-hidden="true">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: accent }}
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accent }} />
                </span>
                <span style={{ color: accent }}>{badgeLabel}</span>
              </span>
            </div>

            <h1
              className={`${vslAccent ? 'text-[1.75rem] sm:text-[2rem] lg:text-[2rem] xl:text-[2.375rem]' : 'text-4xl sm:text-5xl lg:text-6xl'} text-white mb-5`}
              style={{ ...KV_DISPLAY, lineHeight: vslAccent ? 1.08 : 0.95, textWrap: 'pretty' } as React.CSSProperties}
            >
              <HeadlineContent headline={headline} accent={accent} compact={!!vslAccent} />
            </h1>

            <p className={`text-base ${vslAccent ? 'text-white/65 max-w-full' : 'sm:text-lg text-white/70 max-w-xl'} leading-relaxed mb-6`}>
              {sub}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <a
                href="#inscricao"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold uppercase transition-all hover:brightness-110 active:scale-[0.98]"
                style={{ background: accent, color: '#050507', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.16em' }}
              >
                {ctaLabel}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl" style={{ ...KV_DISPLAY, color: accent }}>
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

          {/* VSL column — only rendered when vslAccent is provided */}
          {vslAccent && (
            <div className="w-full">
              {vslVideoId ? (
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: '16/9', border: `1px solid ${vslAccent}30` }}
                >
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://player.vimeo.com/video/${vslVideoId}?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&dnt=1`}
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    allowFullScreen
                    title="VSL Squad de Sites"
                  />
                </div>
              ) : (
                <div
                  role="img"
                  aria-label="Vídeo de apresentação do squad — em breve"
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: '16/9',
                    background: 'rgba(255,255,255,0.02)',
                    border: `1px solid ${vslAccent}30`,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-transform hover:scale-105"
                      style={{ background: vslAccent, boxShadow: `0 0 28px ${vslAccent}50` }}
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#050507' }}>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.14em',
                      background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.10)',
                      color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', padding: '0.2rem 0.45rem',
                      display: 'inline-flex',
                    }}>VSL · Em breve</span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.20)', letterSpacing: '0.1em' }}>
                      0:00 — xx:xx
                    </span>
                  </div>
                </div>
              )}
              <p className="mt-2 text-center" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)' }}>
                Assista antes de decidir
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
