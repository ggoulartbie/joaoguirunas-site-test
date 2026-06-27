import type { Metadata } from 'next';
import { WorkshopClaudeDesignLayout } from '../_components/WorkshopClaudeDesignLayout';

export const metadata: Metadata = {
  title: 'Design System | Workshop Claude Design',
  alternates: {
    canonical: '/workshop-claude-design/design-system',
  },
  robots: { index: false, follow: false },
};

const TEXT   = '#EDE9FF';
const MUTED  = '#8B84A7';
const ACCENT = '#9B6DFF';
const WARM   = '#FF6B35';
const SURFACE = '#161322';
const MONO   = "'Geist Mono', 'Roboto Mono', monospace";
const SANS   = "'Inter', system-ui, sans-serif";

const OUTPUTS = [
  'Paleta de cores',
  'Escala tipográfica',
  'Componentes visuais',
  'Tom de voz',
  'Guia de uso (DOs & DON’Ts)',
];

export default function DesignSystemPage() {
  return (
    <WorkshopClaudeDesignLayout slug="design-system">
      {/* Title + badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <h2
          style={{
            fontFamily: "'Fraunces', 'Space Grotesk', serif",
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: 600,
            color: TEXT,
            margin: 0,
          }}
        >
          Design System
        </h2>
        <span
          style={{
            background: ACCENT,
            color: '#FFFFFF',
            fontFamily: MONO,
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '2px 8px',
            borderRadius: '4px',
          }}
        >
          DEMO
        </span>
      </div>

      {/* Definition */}
      <p
        style={{
          fontFamily: SANS,
          fontSize: '1.0625rem',
          lineHeight: 1.7,
          color: MUTED,
          maxWidth: '42rem',
          marginBottom: '40px',
        }}
      >
        O Design System é a linguagem visual permanente da sua marca — paleta,
        tipografia, componentes e tom de voz em um único artefato.
      </p>

      {/* What Claude produces */}
      <div style={{ marginBottom: '40px' }}>
        <p
          style={{
            fontFamily: MONO,
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: MUTED,
            marginBottom: '16px',
          }}
        >
          O que o Claude produz
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {OUTPUTS.map((item) => (
            <li
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontFamily: SANS,
                fontSize: '1rem',
                color: TEXT,
                lineHeight: 1.5,
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: ACCENT,
                  flexShrink: 0,
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Highlight box */}
      <div
        style={{
          background: SURFACE,
          border: `1px solid ${WARM}`,
          borderRadius: '8px',
          padding: '20px 24px',
        }}
      >
        <p
          style={{
            fontFamily: SANS,
            fontSize: '1rem',
            lineHeight: 1.65,
            color: TEXT,
            margin: 0,
          }}
        >
          Antes de criar qualquer peça, você precisa ter o Design System.{' '}
          <strong style={{ color: WARM }}>É a base de tudo.</strong>
        </p>
      </div>
    </WorkshopClaudeDesignLayout>
  );
}
