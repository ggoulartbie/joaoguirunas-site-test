import type { Metadata } from 'next';
import { WorkshopClaudeDesignLayout } from '../_components/WorkshopClaudeDesignLayout';

export const metadata: Metadata = {
  title: 'KV Social | Workshop Claude Design',
  alternates: {
    canonical: '/workshop-claude-design/kv-social',
  },
};

const TEXT    = '#EDE9FF';
const MUTED   = '#8B84A7';
const ACCENT  = '#9B6DFF';
const SURFACE = '#161322';
const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const SANS    = "'Inter', system-ui, sans-serif";

const FORMATS = [
  { label: 'Feed',            ratio: '1:1',    dims: '1080 × 1080 px' },
  { label: 'Stories',         ratio: '9:16',   dims: '1080 × 1920 px' },
  { label: 'Carrossel',       ratio: '1:1',    dims: '1080 × 1080 px' },
  { label: 'Banner LinkedIn', ratio: '16:9',   dims: '1128 × 191 px'  },
  { label: 'Capa de perfil',  ratio: '16:9',   dims: '820 × 312 px'   },
];

export default function KvSocialPage() {
  return (
    <WorkshopClaudeDesignLayout slug="kv-social">
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
          KV Social
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
        Key Visual Social — a identidade visual derivada do Design System,
        aplicada às redes sociais (Instagram, LinkedIn, X).
      </p>

      {/* Formats grid */}
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
          Formatos
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
          }}
        >
          {FORMATS.map((fmt) => (
            <div
              key={fmt.label}
              style={{
                background: SURFACE,
                border: '1px solid rgba(155,109,255,0.18)',
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <p
                style={{
                  fontFamily: SANS,
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: TEXT,
                  margin: '0 0 6px',
                }}
              >
                {fmt.label}
              </p>
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: '11px',
                  color: ACCENT,
                  margin: '0 0 2px',
                  letterSpacing: '0.05em',
                }}
              >
                {fmt.ratio}
              </p>
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: '10px',
                  color: MUTED,
                  margin: 0,
                  letterSpacing: '0.03em',
                }}
              >
                {fmt.dims}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <p
        style={{
          fontFamily: SANS,
          fontSize: '0.9375rem',
          lineHeight: 1.65,
          color: MUTED,
          fontStyle: 'italic',
          borderLeft: `3px solid ${ACCENT}`,
          paddingLeft: '16px',
          margin: 0,
        }}
      >
        O KV não recria a identidade — ela deriva. O Design System é a lei; o KV é a aplicação.
      </p>
    </WorkshopClaudeDesignLayout>
  );
}
