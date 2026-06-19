import type { Metadata } from 'next';
import { WorkshopClaudeDesignLayout } from '../_components/WorkshopClaudeDesignLayout';

export const metadata: Metadata = {
  title: 'Divisão | Workshop Claude Design',
  alternates: {
    canonical: '/workshop-claude-design/divisao',
  },
};

const SURFACE = '#161322';
const TEXT    = '#EDE9FF';
const MUTED   = '#8B84A7';
const ACCENT  = '#9B6DFF';
const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "'Fraunces', 'Space Grotesk', serif";
const SANS    = "'Inter', system-ui, sans-serif";

export default function DivisaoPage() {
  return (
    <WorkshopClaudeDesignLayout slug="divisao">
      {/* Comparison cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        {/* Design System card */}
        <div
          style={{
            background: SURFACE,
            borderRadius: '12px',
            border: '1px solid rgba(155,109,255,0.18)',
            padding: '2rem',
          }}
        >
          <p
            style={{
              fontFamily: MONO,
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: ACCENT,
              marginBottom: '0.75rem',
            }}
          >
            Design System
          </p>
          <p
            style={{
              fontFamily: DISPLAY,
              fontSize: '1.25rem',
              fontWeight: 600,
              color: TEXT,
              marginBottom: '1.5rem',
              lineHeight: 1.3,
            }}
          >
            Base permanente da marca
          </p>
          <dl style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <dt style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTED, marginBottom: '0.25rem' }}>
                Quando usar
              </dt>
              <dd style={{ fontFamily: SANS, fontSize: '0.9375rem', color: TEXT, margin: 0 }}>
                Criando ou renovando identidade
              </dd>
            </div>
            <div>
              <dt style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTED, marginBottom: '0.25rem' }}>
                Frequência
              </dt>
              <dd style={{ fontFamily: SANS, fontSize: '0.9375rem', color: TEXT, margin: 0 }}>
                1× por marca
              </dd>
            </div>
          </dl>
        </div>

        {/* KV card */}
        <div
          style={{
            background: SURFACE,
            borderRadius: '12px',
            border: '1px solid rgba(255,107,53,0.18)',
            padding: '2rem',
          }}
        >
          <p
            style={{
              fontFamily: MONO,
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#FF6B35',
              marginBottom: '0.75rem',
            }}
          >
            KV — Key Visual
          </p>
          <p
            style={{
              fontFamily: DISPLAY,
              fontSize: '1.25rem',
              fontWeight: 600,
              color: TEXT,
              marginBottom: '1.5rem',
              lineHeight: 1.3,
            }}
          >
            Derivação para canal/campanha
          </p>
          <dl style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <dt style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTED, marginBottom: '0.25rem' }}>
                Quando usar
              </dt>
              <dd style={{ fontFamily: SANS, fontSize: '0.9375rem', color: TEXT, margin: 0 }}>
                Evento, workshop, campanha
              </dd>
            </div>
            <div>
              <dt style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: MUTED, marginBottom: '0.25rem' }}>
                Frequência
              </dt>
              <dd style={{ fontFamily: SANS, fontSize: '0.9375rem', color: TEXT, margin: 0 }}>
                Por demanda
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Hierarchy diagram */}
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
          Hierarquia
        </p>
        <pre
          style={{
            fontFamily: MONO,
            fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
            lineHeight: 1.7,
            color: TEXT,
            background: SURFACE,
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '10px',
            padding: '1.75rem 2rem',
            overflowX: 'auto',
            margin: 0,
          }}
        >
{`┌─────────────────────────┐
│      Design System      │
└────────────┬────────────┘
             │
     ┌───────┼───────┐
     ▼       ▼       ▼
┌─────────┐ ┌─────────┐ ┌──────────┐
│KV Social│ │ KV Site │ │KV Evento │
└─────────┘ └─────────┘ └──────────┘`}
        </pre>
      </div>

      {/* Rule highlight box */}
      <blockquote
        style={{
          background: 'rgba(155,109,255,0.08)',
          border: `2px solid ${ACCENT}`,
          borderRadius: '10px',
          padding: '1.75rem 2rem',
          margin: 0,
        }}
      >
        <p
          style={{
            fontFamily: DISPLAY,
            fontSize: 'clamp(1.0625rem, 2.5vw, 1.25rem)',
            fontWeight: 600,
            color: TEXT,
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          "KV sem DS é improviso. DS sem KV é teoria. Os dois juntos são sistema."
        </p>
      </blockquote>
    </WorkshopClaudeDesignLayout>
  );
}
