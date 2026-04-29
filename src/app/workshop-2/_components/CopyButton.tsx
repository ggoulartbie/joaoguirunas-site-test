'use client';

import { useState } from 'react';

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const ACCENT = 'var(--color-accent)';

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex-shrink-0 px-3 py-1 text-[10px] font-bold tracking-[0.15em] uppercase transition-colors"
      style={{
        fontFamily: MONO,
        border: `1px solid ${copied ? ACCENT : 'rgba(255,255,255,0.15)'}`,
        background: copied ? 'rgba(255,58,14,0.12)' : 'rgba(255,255,255,0.04)',
        color: copied ? ACCENT : 'rgba(255,255,255,0.4)',
      }}
      aria-label="Copiar código"
    >
      {copied ? 'Copiado ✓' : 'Copiar'}
    </button>
  );
}
