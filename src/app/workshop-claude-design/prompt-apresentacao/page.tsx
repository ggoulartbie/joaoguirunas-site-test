import type { Metadata } from 'next';
import { WorkshopClaudeDesignLayout } from '../_components/WorkshopClaudeDesignLayout';

export const metadata: Metadata = {
  title: 'Prompt: Apresentação | Workshop Claude Design',
  alternates: {
    canonical: '/workshop-claude-design/prompt-apresentacao',
  },
  robots: { index: false, follow: false },
};

const TEXT    = '#EDE9FF';
const MUTED   = '#8B84A7';
const ACCENT  = '#9B6DFF';
const SURFACE = '#161322';
const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const SANS    = "'Inter', system-ui, sans-serif";
const DISPLAY = "'Fraunces', 'Space Grotesk', serif";

const PROMPT_TEMPLATE = `Com base no texto abaixo, crie uma apresentação de slides para pitch comercial.

Contexto:
- Público: [ex: potencial cliente, investidor, parceiro estratégico]
- Objetivo da conversa: [ex: fechar diagnóstico, apresentar proposta, fazer networking]
- Tom: [ex: direto e consultivo, inspirador e estratégico]

Estrutura sugerida:
1. Abertura — o problema que o cliente tem (não o que você faz)
2. Posicionamento — quem você é e o que você entrega (1 frase clara)
3. Prova — experiência ou resultado que comprova o ponto
4. Oferta — o próximo passo concreto
5. Fechamento — a frase que gera curiosidade ou ação

Texto de referência (seu pitch atual):
[COLE SEU PITCH AQUI]`;

export default function PromptApresentacaoPage() {
  return (
    <WorkshopClaudeDesignLayout slug="prompt-apresentacao">
      <h2
        style={{
          fontFamily: DISPLAY,
          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
          fontWeight: 600,
          color: TEXT,
          marginBottom: '32px',
        }}
      >
        Prompt: Apresentação / Slides
      </h2>

      {/* Section: O template */}
      <div style={{ marginBottom: '48px' }}>
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
          O template
        </p>

        <pre
          style={{
            fontFamily: MONO,
            fontSize: '0.8125rem',
            lineHeight: 1.7,
            color: TEXT,
            background: SURFACE,
            border: `1px solid rgba(155,109,255,0.30)`,
            borderRadius: 0,
            padding: '24px',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            margin: 0,
          }}
        >
          {PROMPT_TEMPLATE}
        </pre>
      </div>

      {/* Highlight quote */}
      <div
        style={{
          borderLeft: `3px solid ${ACCENT}`,
          paddingLeft: '20px',
          paddingTop: '4px',
          paddingBottom: '4px',
        }}
      >
        <p
          style={{
            fontFamily: SANS,
            fontSize: '1rem',
            lineHeight: 1.7,
            color: TEXT,
            margin: 0,
          }}
        >
          O melhor sinal de que seu pitch funcionou é quando a pessoa diz:{' '}
          <em style={{ color: ACCENT }}>&apos;interessante, me explica melhor&apos;</em>.
        </p>
      </div>
    </WorkshopClaudeDesignLayout>
  );
}
