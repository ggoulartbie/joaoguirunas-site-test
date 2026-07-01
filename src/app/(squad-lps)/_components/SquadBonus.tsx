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

interface SquadBonusProps {
  bonus: SquadConfig['bonus'];
}

export function SquadBonus({ bonus }: SquadBonusProps) {
  return (
    <section
      className="py-16 sm:py-24"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <div
          className="relative px-6 sm:px-10 py-8 sm:py-12"
          style={{
            border: '1px solid rgba(255,58,14,0.25)',
            background: 'rgba(255,58,14,0.04)',
          }}
        >
          <div
            className="absolute -top-px left-8 right-8 h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(255,58,14,0.5), transparent)' }}
            aria-hidden="true"
          />
          <p
            className="mb-4"
            style={{ ...KV_MONO, color: 'rgba(255, 58, 14, 0.85)' }}
          >
            Bônus incluso
          </p>
          <h3
            className="text-2xl sm:text-3xl lg:text-4xl text-white mb-4"
            style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
          >
            O que vem junto
          </h3>
          <div className="w-12 h-[1px] bg-[#FF3A0E]/40 mb-6" />
          <p className="text-base sm:text-lg text-white/65 leading-relaxed">
            {bonus}
          </p>
        </div>
      </div>
    </section>
  );
}
