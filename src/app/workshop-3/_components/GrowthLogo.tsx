import Image from 'next/image';

type GrowthLogoSize = 'sm' | 'md' | 'lg' | 'hero';

const SIZES: Record<GrowthLogoSize, { symbol: number; wordmark: number }> = {
  sm:   { symbol: 14, wordmark: 13 },
  md:   { symbol: 20, wordmark: 18 },
  lg:   { symbol: 28, wordmark: 24 },
  hero: { symbol: 40, wordmark: 36 },
};

export function GrowthLogo({ size = 'md' }: { size?: GrowthLogoSize }) {
  const { symbol, wordmark } = SIZES[size];
  const gap = Math.round(symbol * 0.4);

  return (
    <span role="img" aria-label="Growth Sales.ai" style={{ display: 'inline-flex', alignItems: 'center', gap, flexShrink: 0 }}>
      <Image
        src="/brand/growth/symbol-official.svg"
        alt=""
        aria-hidden="true"
        width={symbol}
        height={symbol}
        style={{ flexShrink: 0, display: 'block' }}
      />
      <span style={{ display: 'inline-flex', alignItems: 'baseline', lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-display, 'Geist', system-ui, sans-serif)",
            fontWeight: 300,
            fontSize: wordmark,
            letterSpacing: '-0.035em',
            color: '#f1f1f3',
          }}
        >
          growthsales
        </span>
        <span
          style={{
            fontFamily: "var(--font-display-serif, 'Fraunces', serif)",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: wordmark,
            letterSpacing: '-0.04em',
            color: '#FF3A0E',
          }}
        >
          .ai
        </span>
      </span>
    </span>
  );
}
