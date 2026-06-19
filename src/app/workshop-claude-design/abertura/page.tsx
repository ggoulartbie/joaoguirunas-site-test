import type { Metadata } from 'next';
import { WorkshopClaudeDesignLayout } from '../_components/WorkshopClaudeDesignLayout';

export const metadata: Metadata = {
  title: 'Abertura | Workshop Claude Design',
  alternates: { canonical: '/workshop-claude-design/abertura' },
  robots: { index: false, follow: false },
};

const ACCENT  = '#9B6DFF';
const TEXT    = '#EDE9FF';
const MUTED   = '#8B84A7';
const SURFACE = '#161322';
const WARM    = '#FF6B35';
const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "'Fraunces', 'Space Grotesk', serif";

const QUOTES = [
  'Antes de alguém entender tecnicamente o que você entrega, essa pessoa já está formando uma percepção sobre você. O mercado lê sinais o tempo todo.',
  'Uma boa solução mal apresentada pode parecer fraca. Uma solução simples, bem posicionada, pode parecer muito mais valiosa.',
  'O mercado não compra apenas o que você faz. Ele compra o que consegue entender, confiar e lembrar sobre você.',
];

const MOMENTS = ['Interface', 'Design System', 'KV', 'Prompts'];

export default function AberturaPage() {
  return (
    <WorkshopClaudeDesignLayout slug="abertura">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

        {/* Intro paragraph */}
        <p style={{
          fontFamily: DISPLAY,
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: MUTED,
          lineHeight: 1.65,
          maxWidth: '42rem',
        }}>
          Design não é decoração. É o primeiro argumento. Antes de qualquer palavra técnica,
          a percepção já está sendo construída — e ela determina se a conversa continua.
        </p>

        {/* Pull quotes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {QUOTES.map((quote, i) => (
            <blockquote
              key={i}
              style={{
                margin: 0,
                paddingLeft: '1.25rem',
                borderLeft: `3px solid ${ACCENT}`,
              }}
            >
              <p style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                fontStyle: 'italic',
                color: TEXT,
                lineHeight: 1.6,
                margin: 0,
              }}>
                &ldquo;{quote}&rdquo;
              </p>
            </blockquote>
          ))}
        </div>

        {/* O que vamos construir hoje */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{
            fontFamily: MONO,
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: MUTED,
          }}>
            O que vamos construir hoje
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            {MOMENTS.map((moment, i) => (
              <span
                key={moment}
                style={{
                  fontFamily: MONO,
                  fontSize: '11px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: i === 0 ? ACCENT : TEXT,
                  padding: '6px 14px',
                  border: `1px solid ${i === 0 ? ACCENT : 'rgba(237,233,255,0.15)'}`,
                  background: i === 0 ? 'rgba(155,109,255,0.10)' : 'rgba(237,233,255,0.03)',
                }}
              >
                {String(i + 1).padStart(2, '0')} {moment}
              </span>
            ))}
          </div>
        </div>

        {/* Footer call-to-action */}
        <div style={{
          borderTop: '1px solid rgba(237,233,255,0.08)',
          paddingTop: '1.5rem',
        }}>
          <p style={{
            fontFamily: DISPLAY,
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            color: WARM,
            lineHeight: 1.5,
            margin: 0,
          }}>
            Pitch não é decorar uma fala bonita. É traduzir posicionamento em percepção.
          </p>
        </div>

      </div>
    </WorkshopClaudeDesignLayout>
  );
}
