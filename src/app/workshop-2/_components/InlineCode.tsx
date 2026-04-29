'use client';

import { useState } from 'react';

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const ACCENT = 'var(--color-accent)';

export function InlineCode({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      title={copied ? 'Copiado!' : 'Clique para copiar'}
      className="relative inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs transition-all cursor-copy"
      style={{
        fontFamily: MONO,
        background: copied ? 'rgba(255,58,14,0.15)' : 'rgba(255,255,255,0.08)',
        color: copied ? ACCENT : 'rgba(255,255,255,0.85)',
        border: `1px solid ${copied ? 'rgba(255,58,14,0.4)' : 'rgba(255,255,255,0.12)'}`,
      }}
    >
      {children}
      <span
        className="text-[9px] tracking-wide uppercase"
        style={{ color: copied ? ACCENT : 'rgba(255,255,255,0.25)', fontFamily: MONO }}
      >
        {copied ? '✓' : '⎘'}
      </span>
    </button>
  );
}
