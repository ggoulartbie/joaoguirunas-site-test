import type { CSSProperties } from 'react';
import Image from 'next/image';

type LogoVariant = 'icon' | 'alltype' | 'nav' | 'vertical';

interface LogoProps {
  variant?: LogoVariant;
  height?: number;
  className?: string;
  style?: CSSProperties;
  alt?: string;
}

// Triangle symbol paths from logo-symbol.svg (viewBox 0 0 450 390)
function TriangleSymbol({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * (390 / 450))}
      viewBox="0 0 450 390"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M424.151 357.5H96.7949L260.473 73.999L424.151 357.5Z"
        stroke="#FF4400"
        strokeWidth="9"
      />
      <path
        d="M394.945 344H52L223.473 47L394.945 344ZM135 302H311L223 149L135 302Z"
        fill="#FF4400"
      />
      <path
        d="M353.151 320.5H25.7949L189.473 36.999L353.151 320.5Z"
        stroke="#FF4400"
        strokeWidth="9"
      />
    </svg>
  );
}

export function Logo({
  variant = 'alltype',
  height = 32,
  className = '',
  style,
  alt = 'João Guirunas',
}: LogoProps) {
  // icon — símbolo triangular isolado
  if (variant === 'icon') {
    return (
      <span className={className} style={style}>
        <TriangleSymbol size={height} />
      </span>
    );
  }

  // alltype — wordmark tipográfico puro: João (branco) + Guirunas (ember), sem símbolo
  // aspect ratio Alltype.svg: 1452 × 367 ≈ 3.96 : 1
  if (variant === 'alltype') {
    const width = Math.round(height * (1452 / 367));
    return (
      <Image
        src="/images/brand/logo-alltype.svg"
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        priority
      />
    );
  }

  // nav — símbolo + alltype lado a lado (uso em header/nav)
  if (variant === 'nav') {
    const symbolSize = Math.round(height * 0.85);
    const wordmarkHeight = height;
    const wordmarkWidth = Math.round(wordmarkHeight * (1452 / 367));
    return (
      <span
        className={`flex items-center gap-2 ${className}`}
        style={style}
      >
        <TriangleSymbol size={symbolSize} />
        <Image
          src="/images/brand/logo-alltype.svg"
          alt={alt}
          width={wordmarkWidth}
          height={wordmarkHeight}
          priority
        />
      </span>
    );
  }

  // vertical — logo completo: símbolo em cima, wordmark abaixo (aspect ratio 1620 × 777 ≈ 2.08 : 1)
  const verticalWidth = Math.round(height * (1620 / 777));
  return (
    <Image
      src="/images/brand/logo-vertical.svg"
      alt={alt}
      width={verticalWidth}
      height={height}
      className={className}
      style={style}
    />
  );
}
