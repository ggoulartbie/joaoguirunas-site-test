import type { Metadata } from 'next';
import { WorkshopClaudeDesignLayout } from '../_components/WorkshopClaudeDesignLayout';

export const metadata: Metadata = {
  title: 'KV Site | Workshop Claude Design',
  alternates: {
    canonical: '/workshop-claude-design/kv-site',
  },
};

const TEXT    = '#EDE9FF';
const MUTED   = '#8B84A7';
const ACCENT  = '#9B6DFF';
const WARM    = '#FF6B35';
const SURFACE = '#161322';
const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const SANS    = "'Inter', system-ui, sans-serif";

const OUTPUTS = [
  { label: 'Hero image',        note: '' },
  { label: 'OG Image',          note: '1200 × 630 px' },
  { label: 'Banners de seção',  note: '' },
  { label: 'Favicon',           note: '' },
];

export default function KvSitePage() {
  return (
    <WorkshopClaudeDesignLayout slug="kv-site">
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
          KV Site
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
        Key Visual para o site — hero section, OG image, banners e seções de
        destaque alinhados ao Design System.
      </p>

      {/* Outputs list */}
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
          Outputs
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {OUTPUTS.map((item) => (
            <li
              key={item.label}
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
              <span>{item.label}</span>
              {item.note && (
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: '11px',
                    color: MUTED,
                    letterSpacing: '0.04em',
                  }}
                >
                  {item.note}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Highlight note */}
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
          Se o seu site não reflete o que você fala no pitch,{' '}
          <strong style={{ color: WARM }}>o mercado percebe o ruído.</strong>
        </p>
      </div>
    </WorkshopClaudeDesignLayout>
  );
}
