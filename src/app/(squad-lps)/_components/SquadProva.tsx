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

export function SquadProva() {
  return (
    <section
      className="py-16 sm:py-24"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p
            className="mb-4 sm:mb-6"
            style={{ ...KV_MONO, color: 'rgba(255, 58, 14, 0.85)' }}
          >
            Prova social
          </p>
          <h2
            className="text-3xl sm:text-4xl text-white"
            style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
          >
            Quem já passou por aqui
          </h2>
          <div className="mx-auto mt-4 w-12 h-[1px] bg-[#FF3A0E]/40" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="px-6 py-8 flex flex-col items-center justify-center gap-3 min-h-[160px]"
              style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}
            >
              <span className="text-[#FF3A0E]/40 text-2xl" aria-hidden="true">◎</span>
              <p style={{ ...KV_MONO, color: 'rgba(255,255,255,0.2)' }}>Em breve</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
