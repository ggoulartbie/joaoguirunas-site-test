'use client';

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

import React from 'react';

export function CursoOnlineHero() {
  return (
    <section
      id="hero"
      className="relative w-full -mt-16 min-h-[92vh] flex items-center"
      style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(255,58,14,0.06) 0%, transparent 60%)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-10 lg:px-16 w-full pt-28 sm:pt-0">
        <div className="sm:max-w-2xl lg:max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <span
              className="inline-flex items-center gap-2 border border-[#FF3A0E]/60 px-3 py-1.5"
              style={{ background: 'rgba(255,58,14,0.08)', ...KV_MONO }}
            >
              <span className="relative inline-flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3A0E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3A0E]" />
              </span>
              <span className="text-[#FF3A0E]">Claude Agent Teams · Escolha sua Squad</span>
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-7xl text-white mb-6"
            style={{ ...KV_DISPLAY, lineHeight: 0.92 }}
          >
            Qual squad de agentes{' '}
            <span style={{ ...KV_DISPLAY, fontStyle: 'italic', fontWeight: 300, color: '#FF3A0E' }}>
              você vai montar primeiro?
            </span>
          </h1>

          <p className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
            Três módulos especializados. Cada squad é um time de IA pronto para trabalhar no seu negócio.
          </p>
        </div>
      </div>
    </section>
  );
}
