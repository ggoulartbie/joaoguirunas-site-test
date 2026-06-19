import type { Metadata } from 'next';
import { WorkshopClaudeDesignLayout } from '../_components/WorkshopClaudeDesignLayout';

export const metadata: Metadata = {
  title: 'Interface | Workshop Claude Design',
  alternates: { canonical: '/workshop-claude-design/interface' },
  robots: { index: false, follow: false },
};

const ACCENT  = '#9B6DFF';
const TEXT    = '#EDE9FF';
const MUTED   = '#8B84A7';
const SURFACE = '#161322';
const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "'Fraunces', 'Space Grotesk', serif";

const OUTPUTS = [
  { icon: '🎨', title: 'Design System', desc: 'Paleta, tipografia e tokens visuais da marca' },
  { icon: '📱', title: 'KV Social', desc: 'Artes para Instagram, LinkedIn e Stories' },
  { icon: '🌐', title: 'KV Site', desc: 'Identidade visual aplicada ao site e landing pages' },
  { icon: '📊', title: 'Apresentação', desc: 'Slides de pitch com design consistente e profissional' },
];

export default function InterfacePage() {
  return (
    <WorkshopClaudeDesignLayout slug="interface">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

        {/* Intro */}
        <p style={{
          fontFamily: DISPLAY,
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: TEXT,
          lineHeight: 1.65,
          maxWidth: '42rem',
        }}>
          Claude Design é um projeto dentro do Claude.ai que funciona como seu diretor de arte pessoal.
          Para acessar: <span style={{ fontFamily: MONO, fontSize: '0.9em', color: ACCENT }}>claude.ai</span>
          {' → '}
          <span style={{ fontFamily: MONO, fontSize: '0.9em', color: ACCENT }}>Projects</span>
          {' → '}
          <span style={{ fontFamily: MONO, fontSize: '0.9em', color: ACCENT }}>Design</span>.
          A partir daí, você descreve o que quer comunicar e ele gera os ativos visuais.
        </p>

        {/* 2x2 Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1px',
          background: 'rgba(237,233,255,0.08)',
          border: '1px solid rgba(237,233,255,0.08)',
        }}>
          {OUTPUTS.map((item) => (
            <div
              key={item.title}
              style={{
                background: SURFACE,
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{item.icon}</span>
              <p style={{
                fontFamily: MONO,
                fontSize: '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: TEXT,
                fontWeight: 700,
                margin: 0,
              }}>
                {item.title}
              </p>
              <p style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(0.85rem, 1.4vw, 0.95rem)',
                color: MUTED,
                lineHeight: 1.5,
                margin: 0,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight box */}
        <div style={{
          background: SURFACE,
          border: `1px solid ${ACCENT}`,
          padding: '1.25rem 1.5rem',
        }}>
          <p style={{
            fontFamily: DISPLAY,
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            color: TEXT,
            lineHeight: 1.6,
            margin: 0,
          }}>
            &ldquo;Você não precisa saber design. Você precisa saber o que quer comunicar.&rdquo;
          </p>
        </div>

      </div>
    </WorkshopClaudeDesignLayout>
  );
}
