import Image from 'next/image';

type GrowthLogoSize = 'sm' | 'md' | 'lg' | 'hero';

// Sizes mirror .rs-brand-sym (22px) at sm, scaled proportionally
const SIZES: Record<GrowthLogoSize, { symbol: number; wordmark: number; gap: number }> = {
  sm:   { symbol: 16, wordmark: 14, gap: 8  },
  md:   { symbol: 22, wordmark: 18, gap: 12 },
  lg:   { symbol: 30, wordmark: 24, gap: 14 },
  hero: { symbol: 44, wordmark: 36, gap: 18 },
};

// Lockup from real site: "Growth Sales" Fraunces 400 normal bone + ".ai" Fraunces italic 300 ember
// Source: .rs-brand-name { font-family: var(--type-display); font-weight: 400; letter-spacing: -0.01em; }
//         .rs-brand-name em { font-style: italic; font-weight: 300; color: var(--ember); }
export function GrowthLogo({ size = 'md' }: { size?: GrowthLogoSize }) {
  const { symbol, wordmark, gap } = SIZES[size];

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
            fontFamily: "var(--font-display-serif, 'Fraunces', Georgia, serif)",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: wordmark,
            letterSpacing: '-0.01em',
            color: '#f1f1f3',
          }}
        >
          Growth Sales
        </span>
        <span
          style={{
            fontFamily: "var(--font-display-serif, 'Fraunces', Georgia, serif)",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: wordmark,
            letterSpacing: '-0.01em',
            color: '#FF3A0E',
          }}
        >
          .ai
        </span>
      </span>
    </span>
  );
}
