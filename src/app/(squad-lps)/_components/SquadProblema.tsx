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

interface SquadProblemaProps {
  problema: SquadConfig['problema'];
}

export function SquadProblema({ problema }: SquadProblemaProps) {
  return (
    <section className="py-16 sm:py-24" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <p
          className="mb-4 sm:mb-6"
          style={{ ...KV_MONO, color: 'rgba(255, 58, 14, 0.85)' }}
        >
          O problema
        </p>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6"
          style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
        >
          Por que as pessoas{' '}
          <span className="text-[#FF3A0E] italic" style={{ fontWeight: 300 }}>ficam presas</span>
        </h2>
        <div className="mx-auto w-12 sm:w-16 h-[1px] bg-[#FF3A0E]/40 mb-8" />
        <p className="text-base sm:text-lg text-white/65 leading-relaxed max-w-2xl">
          {problema}
        </p>
      </div>
    </section>
  );
}
