interface SquadVSLProps {
  vslTitle?: string
  accent: string
}

export function SquadVSL({ vslTitle, accent }: SquadVSLProps) {
  return (
    <section className="w-full py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-5 sm:px-10 lg:px-16">
        <div
          role="img"
          aria-label="Vídeo de apresentação do squad — em breve"
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: '16/9',
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid ${accent}30`,
            backdropFilter: 'blur(4px)',
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
            aria-hidden="true"
          />
          {/* Play icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-transform hover:scale-105"
              style={{ background: accent, boxShadow: `0 0 32px ${accent}50` }}
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#050507' }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          {/* Badge top-left */}
          <div className="absolute top-3 left-3">
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em',
              background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.10)',
              color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', padding: '0.25rem 0.5rem',
              display: 'inline-flex', alignItems: 'center',
            }}>
              VSL · Em breve
            </span>
          </div>
          {/* Duration bottom-right */}
          <div className="absolute bottom-3 right-3">
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em',
            }}>
              0:00 — xx:xx
            </span>
          </div>
        </div>
        <p
          className="mt-3 text-center text-white/40"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
        >
          {vslTitle ?? 'Assista antes de decidir'}
        </p>
      </div>
    </section>
  )
}
