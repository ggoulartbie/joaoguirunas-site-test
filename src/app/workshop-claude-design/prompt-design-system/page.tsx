import type { Metadata } from 'next';
import { WorkshopClaudeDesignLayout } from '../_components/WorkshopClaudeDesignLayout';

export const metadata: Metadata = {
  title: 'Prompt: Design System | Workshop Claude Design',
  alternates: {
    canonical: '/workshop-claude-design/prompt-design-system',
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

const PROMPT_TEMPLATE = `Crie um design system completo para a empresa [NOME DA EMPRESA].

Contexto:
- Setor: [ex: consultoria de gestão, tecnologia, saúde]
- Valores da marca: [ex: clareza, autoridade, proximidade]
- Público-alvo: [ex: donos de PMEs, CFOs de empresas médias]
- Tom de voz: [ex: direto, sem jargão, confiante mas acessível]
- Estética desejada: [ex: minimalista, sofisticada, contemporânea]

Entregue:
1. Paleta de cores (primária, secundária, neutros, acento) com HEX e uso de cada
2. Escala tipográfica (display, heading, body, mono) com fontes e tamanhos
3. Regras de espaçamento e grid
4. Tom de voz: 3 DOs e 3 DON'Ts com exemplos de frase
5. Guia de aplicação: como usar em slides, redes sociais e site`;

const PROMPT_EXAMPLE = `Crie um design system completo para a empresa Consultoria Vox.

Contexto:
- Setor: consultoria de comunicação e posicionamento estratégico
- Valores da marca: clareza, autoridade, proximidade
- Público-alvo: donos de PMEs e diretores de marketing
- Tom de voz: direto, sem jargão, confiante mas acessível
- Estética desejada: minimalista, sofisticada, contemporânea

Entregue:
1. Paleta de cores (primária, secundária, neutros, acento) com HEX e uso de cada
2. Escala tipográfica (display, heading, body, mono) com fontes e tamanhos
3. Regras de espaçamento e grid
4. Tom de voz: 3 DOs e 3 DON'Ts com exemplos de frase
5. Guia de aplicação: como usar em slides, redes sociais e site`;

export default function PromptDesignSystemPage() {
  return (
    <WorkshopClaudeDesignLayout slug="prompt-design-system">
      <h2
        style={{
          fontFamily: DISPLAY,
          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
          fontWeight: 600,
          color: TEXT,
          marginBottom: '32px',
        }}
      >
        Prompt: Design System
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

        <p
          style={{
            fontFamily: SANS,
            fontSize: '0.875rem',
            color: MUTED,
            marginTop: '12px',
            lineHeight: 1.6,
          }}
        >
          Preencha os colchetes com seus dados. Quanto mais específico, melhor o resultado.
        </p>
      </div>

      {/* Section: Exemplo real */}
      <div>
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
          Exemplo real — Consultoria Vox
        </p>

        <pre
          style={{
            fontFamily: MONO,
            fontSize: '0.8125rem',
            lineHeight: 1.7,
            color: TEXT,
            background: SURFACE,
            border: `1px solid ${ACCENT}`,
            borderRadius: 0,
            padding: '24px',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            margin: 0,
          }}
        >
          {PROMPT_EXAMPLE}
        </pre>
      </div>
    </WorkshopClaudeDesignLayout>
  );
}
