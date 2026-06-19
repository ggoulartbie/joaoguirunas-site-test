import type { Metadata } from 'next';
import { WorkshopClaudeDesignLayout } from '../_components/WorkshopClaudeDesignLayout';

export const metadata: Metadata = {
  title: 'Demo Final | Workshop Claude Design',
  alternates: {
    canonical: '/workshop-claude-design/demo-slides',
  },
};

const TEXT    = '#EDE9FF';
const MUTED   = '#8B84A7';
const ACCENT  = '#9B6DFF';
const WARM    = '#FF6B35';
const SURFACE = '#161322';
const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const SANS    = "'Inter', system-ui, sans-serif";
const DISPLAY = "'Fraunces', 'Space Grotesk', serif";

const PITCH = `Antes de alguém entender tecnicamente o que você entrega, essa pessoa já está formando uma percepção sobre você. O mercado lê sinais o tempo todo.

Uma boa solução mal apresentada pode parecer fraca. Uma solução simples, bem posicionada, pode parecer muito mais valiosa.

Pitch não é decorar uma fala bonita. Pitch é traduzir posicionamento em uma mensagem clara.

Eu ajudo empresas a transformarem comunicação confusa em posicionamento claro, visualmente forte e comercialmente mais estratégico.

O melhor sinal de que seu pitch funcionou é quando a pessoa diz: 'interessante, me explica melhor'.

Desconecte-se de termos corporativos vagos, traga palpabilidade e foco imediato no benefício que o cliente recebe no final da jornada.

Não fale tudo o que você sabe. Fale o que aquela pessoa precisa entender para avançar.

Se você só apresenta dados, pode ser muito frio e racional. Se você só conta história, pode parecer frágil. O jogo está em unir os dois com maestria.

A sua experiência deve provar o ponto que você está defendendo, não ocupar espaço por mera vaidade pessoal.

Se a sua fala promete estratégia, mas seus slides parecem improvisados, a percepção de valor quebra instantaneamente na mente do cliente.

Um pitch confuso não gera profundidade. Gera dúvida imediata, e cliente com dúvida simplesmente diz 'não'.

O mercado não compra apenas o que você faz. Ele compra o que consegue entender, confiar e lembrar sobre você.`;

const STEPS = [
  <>Abra <strong style={{ color: TEXT }}>claude.ai</strong> · clique em <strong style={{ color: TEXT }}>New conversation</strong> · selecione <strong style={{ color: TEXT }}>Slides</strong></>,
  <>Cole o prompt da página anterior com o pitch acima preenchido</>,
  <>Personalize com os seus dados e exporte</>,
];

export default function DemoSlidesPage() {
  return (
    <WorkshopClaudeDesignLayout slug="demo-slides">
      <h2
        style={{
          fontFamily: DISPLAY,
          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
          fontWeight: 600,
          color: TEXT,
          marginBottom: '32px',
        }}
      >
        Demo Final — Criando slides do pitch ao vivo
      </h2>

      {/* Section: O pitch que vamos usar */}
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
          O pitch que vamos usar
        </p>

        <pre
          style={{
            fontFamily: MONO,
            fontSize: '0.8125rem',
            lineHeight: 1.75,
            color: TEXT,
            background: SURFACE,
            borderLeft: `3px solid ${WARM}`,
            padding: '24px',
            overflowY: 'auto',
            maxHeight: '40vh',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            margin: 0,
          }}
        >
          {PITCH}
        </pre>
      </div>

      {/* Section: O que fazer agora */}
      <div style={{ marginBottom: '48px' }}>
        <p
          style={{
            fontFamily: MONO,
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: MUTED,
            marginBottom: '20px',
          }}
        >
          O que fazer agora
        </p>

        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {STEPS.map((step, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: '0.75rem',
                  color: ACCENT,
                  fontWeight: 700,
                  flexShrink: 0,
                  paddingTop: '2px',
                  minWidth: '20px',
                }}
              >
                {i + 1}.
              </span>
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: '1rem',
                  lineHeight: 1.65,
                  color: MUTED,
                }}
              >
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Closing box */}
      <div
        style={{
          background: ACCENT,
          padding: '32px 40px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: DISPLAY,
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            fontWeight: 600,
            color: '#FFFFFF',
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          Você saiu hoje com um sistema. Não com um slide.
        </p>
      </div>
    </WorkshopClaudeDesignLayout>
  );
}
