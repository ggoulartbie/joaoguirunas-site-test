'use client';

import { useState } from 'react';
import type { FaqItem } from './types';

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

interface SquadFaqProps {
  faq: FaqItem[];
}

export function SquadFaq({ faq }: SquadFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-16 sm:py-24"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p
            className="mb-4 sm:mb-6"
            style={{ ...KV_MONO, color: 'rgba(255, 58, 14, 0.85)' }}
          >
            FAQ
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-white"
            style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
          >
            Dúvidas Comuns
          </h2>
          <div className="mx-auto mt-4 sm:mt-6 w-12 sm:w-16 h-[1px] bg-[#FF3A0E]/40" />
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faq.map((item, i) => (
            <div
              key={i}
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
              className="overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex items-center justify-between w-full cursor-pointer p-4 sm:p-6 text-left gap-3"
                id={`faq-squad-trigger-${i}`}
                aria-expanded={openIndex === i}
                aria-controls={`faq-squad-panel-${i}`}
              >
                <h3
                  className={`text-sm sm:text-base font-semibold transition-colors leading-tight ${openIndex === i ? 'text-[#FF3A0E]' : 'text-white'}`}
                >
                  {item.pergunta}
                </h3>
                <svg
                  className={`h-4 w-4 text-[#FF3A0E] transition-transform flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div
                  id={`faq-squad-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-squad-trigger-${i}`}
                  className="px-4 sm:px-6 pb-4 sm:pb-6 text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  {item.resposta}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
