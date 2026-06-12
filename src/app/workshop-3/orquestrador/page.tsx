import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';

export const metadata: Metadata = {
  title: '05 — Rev OS | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Fraunces', Georgia, serif";
const EMBER   = '#FF3A0E';
const EMBER_GLOW = '#FF5A1F';

const BLOCKS = [
  {
    label: 'Dor',
    color: 'rgba(255,255,255,0.45)',
    borderColor: 'rgba(255,255,255,0.10)',
    glowBg: 'rgba(5,5,7,0.80)',
    text: 'Ferramentas que não se falam. CRM virou arquivo morto. Time de vendas sem ritmo. Lead entra, some. Ninguém sabe onde trava o funil — e o dinheiro vaza todo mês.',
  },
  {
    label: 'Solução',
    color: EMBER_GLOW,
    borderColor: 'rgba(255,90,31,0.5)',
    glowBg: 'rgba(255,58,14,0.07)',
    text: 'Rev OS™ é a operação de receita inteira rodando dentro da sua empresa — marketing, vendas, dados e IA num fluxo único. Implementada e operada pelo time Growth Sales.ai.',
  },
  {
    label: 'Resultado',
    color: 'rgba(241,241,243,0.95)',
    borderColor: 'rgba(255,255,255,0.18)',
    glowBg: 'rgba(5,5,7,0.80)',
    text: 'Do diagnóstico ao fechamento automático. Pipeline ativo, agentes rodando, Advisory™ afinando semana a semana. Você acompanha o resultado.',
  },
];

export default function OrquestradorPage() {
  return (
    <Workshop3DeckLayout slug="orquestrador">
      {/* Background — foco-03.mp4 com foto como poster fallback */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/photos/editorial/editorial-ai-workflow-woman.png"
        >
          <source src="/video/joao/foco-03.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(5,5,7,0.82) 0%, rgba(5,5,7,0.70) 50%, rgba(5,5,7,0.92) 100%)',
          }}
        />
        {/* ember glow — canto superior direito, sutil */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 55% 40% at 85% 0%, rgba(255,58,14,0.07) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header do slide */}
        <header style={{ marginBottom: '2.5rem' }}>
          {/* Eyebrow — kicker label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.25rem' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: EMBER,
                boxShadow: `0 0 10px ${EMBER}`,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: MONO,
                fontSize: '10px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: EMBER,
              }}
            >
              Slide 05 · Produto
            </span>
            <span
              style={{
                flex: 1,
                height: '1px',
                background: 'rgba(255,255,255,0.07)',
              }}
            />
            {/* Tag Service as a System — destaque em Geist Mono */}
            <span
              style={{
                fontFamily: MONO,
                fontSize: '10px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: EMBER_GLOW,
                padding: '6px 12px',
                border: `1px solid rgba(255,90,31,0.45)`,
                background: 'rgba(255,58,14,0.10)',
                whiteSpace: 'nowrap',
              }}
            >
              Service as a System
            </span>
          </div>

          {/* Título principal — Rev OS em Fraunces gigante */}
          <h1
            style={{
              fontFamily: DISPLAY,
              fontWeight: 300,
              fontSize: 'clamp(56px, 8vw, 104px)',
              lineHeight: 0.92,
              letterSpacing: '-0.032em',
              color: '#f1f1f3',
              marginBottom: '1rem',
            }}
          >
            Rev{' '}
            <em style={{ fontStyle: 'italic', color: EMBER, fontWeight: 300 }}>OS</em>
            <sup
              style={{
                fontFamily: MONO,
                fontSize: '0.22em',
                letterSpacing: '0.05em',
                color: 'rgba(255,90,31,0.65)',
                verticalAlign: 'top',
                marginLeft: '4px',
                fontStyle: 'normal',
              }}
            >
              ™
            </sup>
          </h1>

          {/* Subtítulo editorial */}
          <p
            style={{
              fontFamily: DISPLAY,
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(16px, 1.8vw, 22px)',
              color: '#c5c5ca',
              lineHeight: 1.4,
              letterSpacing: '-0.01em',
              maxWidth: '640px',
            }}
          >
            O sistema operacional do{' '}
            <span style={{ color: '#f1f1f3', fontStyle: 'normal', fontWeight: 400 }}>crescimento.</span>
          </p>
        </header>

        {/* 3 blocos editoriais Dor / Solução / Resultado */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {BLOCKS.map((block, i) => (
            <div
              key={block.label}
              style={{
                background: block.glowBg,
                padding: 'clamp(20px, 3vw, 32px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                position: 'relative',
                ...(block.label === 'Solução' && {
                  borderLeft: `2px solid ${EMBER_GLOW}`,
                  boxShadow: `inset 0 0 32px rgba(255,90,31,0.05)`,
                }),
              }}
            >
              {/* Linha ember no topo do bloco Solução */}
              {block.label === 'Solução' && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, ${EMBER} 0%, ${EMBER_GLOW} 100%)`,
                    boxShadow: `0 0 12px rgba(255,90,31,0.6)`,
                  }}
                />
              )}

              {/* Label Dor / Solução / Resultado */}
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: '10px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: block.color,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '1px',
                    background: block.label === 'Solução' ? EMBER_GLOW : 'rgba(255,255,255,0.25)',
                  }}
                />
                {String(i + 1).padStart(2, '0')} · {block.label}
              </span>

              {/* Corpo do bloco */}
              <p
                style={{
                  fontFamily: DISPLAY,
                  fontWeight: block.label === 'Solução' ? 400 : 300,
                  fontSize: 'clamp(14px, 1.4vw, 17px)',
                  lineHeight: 1.55,
                  color: block.label === 'Solução' ? '#f1f1f3' : 'rgba(197,197,202,0.85)',
                  letterSpacing: '-0.008em',
                }}
              >
                {block.text}
              </p>
            </div>
          ))}
        </div>

        {/* Rodapé — orquestrador comercial + tagline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '1.75rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            gap: '24px',
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(132,132,140,0.8)',
            }}
          >
            Orquestrador Comercial · Rev OS™
          </span>
          <span
            style={{
              fontFamily: DISPLAY,
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(13px, 1.2vw, 16px)',
              color: 'rgba(197,197,202,0.6)',
              letterSpacing: '-0.01em',
            }}
          >
            Service as a System.
          </span>
        </div>
      </div>
    </Workshop3DeckLayout>
  );
}
