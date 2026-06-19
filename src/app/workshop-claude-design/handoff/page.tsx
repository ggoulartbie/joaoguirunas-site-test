import type { Metadata } from 'next';
import { WorkshopClaudeDesignLayout } from '../_components/WorkshopClaudeDesignLayout';

export const metadata: Metadata = {
  title: 'Handoff | Workshop Claude Design',
  alternates: {
    canonical: '/workshop-claude-design/handoff',
  },
};

const SURFACE = '#161322';
const TEXT    = '#EDE9FF';
const MUTED   = '#8B84A7';
const ACCENT  = '#9B6DFF';
const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "'Fraunces', 'Space Grotesk', serif";
const SANS    = "'Inter', system-ui, sans-serif";

const HANDOFF_ITEMS = [
  'Tokens de cor (HEX + RGB)',
  'Escala tipográfica',
  'Exemplos de aplicação correta',
  'DOs & DON\'Ts com exemplos visuais',
  'Links para assets (PNG, SVG, PDF)',
];

export default function HandoffPage() {
  return (
    <WorkshopClaudeDesignLayout slug="handoff">
      {/* Definition */}
      <p
        style={{
          fontFamily: SANS,
          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
          lineHeight: 1.7,
          color: TEXT,
          maxWidth: '640px',
          marginBottom: '3rem',
        }}
      >
        O handoff é o documento que garante que o que foi criado no Claude seja
        usado corretamente — pela sua equipe, pelos fornecedores ou pelo cliente.
      </p>

      {/* What's included */}
      <div style={{ marginBottom: '3rem' }}>
        <p
          style={{
            fontFamily: MONO,
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: MUTED,
            marginBottom: '1.25rem',
          }}
        >
          O que inclui
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {HANDOFF_ITEMS.map((item, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: SURFACE,
                borderRadius: '8px',
                padding: '1rem 1.25rem',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: '10px',
                  color: ACCENT,
                  minWidth: '20px',
                  opacity: 0.7,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontFamily: SANS, fontSize: '0.9375rem', color: TEXT }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Prompt example */}
      <div style={{ marginBottom: '3rem' }}>
        <p
          style={{
            fontFamily: MONO,
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: MUTED,
            marginBottom: '1.25rem',
          }}
        >
          Como gerar via Claude
        </p>
        <div
          style={{
            background: SURFACE,
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '0.625rem 1.25rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', color: ACCENT, textTransform: 'uppercase' }}>
              Prompt
            </span>
          </div>
          <pre
            style={{
              fontFamily: MONO,
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
              lineHeight: 1.65,
              color: TEXT,
              padding: '1.5rem 1.75rem',
              margin: 0,
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
{`Gere um documento de handoff do design system acima,
formatado para Notion/Google Docs, incluindo todos os
tokens, exemplos de uso e guia de aplicação.`}
          </pre>
        </div>
      </div>

      {/* Closing statement */}
      <blockquote
        style={{
          borderLeft: `3px solid ${ACCENT}`,
          paddingLeft: '1.5rem',
          margin: 0,
        }}
      >
        <p
          style={{
            fontFamily: DISPLAY,
            fontSize: 'clamp(1rem, 2.5vw, 1.1875rem)',
            fontWeight: 600,
            color: TEXT,
            lineHeight: 1.55,
            margin: 0,
          }}
        >
          "Se o cliente não consegue reproduzir o design sem você, o design
          system não foi entregue — foi apresentado."
        </p>
      </blockquote>
    </WorkshopClaudeDesignLayout>
  );
}
