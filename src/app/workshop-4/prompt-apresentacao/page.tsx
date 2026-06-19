'use client';

import { useState } from 'react';
import { WorkshopClaudeDesignLayout } from '../_components/WorkshopClaudeDesignLayout';

const MONO      = "'JetBrains Mono', 'Roboto Mono', ui-monospace, monospace";
const DISPLAY   = "'Fraunces', 'Instrument Serif', Georgia, serif";
const EMBER     = '#FF3A0E';
const INK       = '#0e0e11';
const BONE      = '#f1f1f3';
const BONE_DIM  = '#c5c5ca';
const BONE_MUTE = '#84848c';
const HAIRLINE  = 'rgba(255,255,255,0.07)';
const INPUT_BG  = 'rgba(255,255,255,0.04)';
const INPUT_BORDER = 'rgba(255,255,255,0.10)';

const TOM_OPTIONS = [
  'direto e consultivo',
  'inspirador e estratégico',
  'provocador e desafiador',
  'acolhedor e próximo',
  'formal e técnico',
];

const PITCH_PALESTRANTE = `Antes de alguém entender tecnicamente o que você entrega, essa pessoa já está formando uma percepção sobre você. O mercado lê sinais o tempo todo.

Uma boa solução mal apresentada pode parecer fraca. Uma solução simples, bem posicionada, pode parecer muito mais valiosa.

Pitch não é decorar uma fala bonita. Pitch é traduzir posicionamento em uma mensagem clara.

Eu ajudo empresas a transformarem comunicação confusa em posicionamento claro, visualmente forte e comercialmente mais estratégico.

O melhor sinal de que seu pitch funcionou é quando a pessoa diz: 'interessante, me explica melhor'.

Não fale tudo o que você sabe. Fale o que aquela pessoa precisa entender para avançar.

Se você só apresenta dados, pode ser muito frio e racional. Se você só conta história, pode parecer frágil. O jogo está em unir os dois com maestria.

O mercado não compra apenas o que você faz. Ele compra o que consegue entender, confiar e lembrar sobre você.`;

function inputStyle(focused: boolean): React.CSSProperties {
  return {
    width: '100%',
    background: INPUT_BG,
    border: `1px solid ${focused ? EMBER : INPUT_BORDER}`,
    color: BONE,
    fontFamily: MONO,
    fontSize: '12px',
    padding: '9px 12px',
    outline: 'none',
    letterSpacing: '0.01em',
    lineHeight: 1.5,
    transition: 'border-color 0.15s',
  };
}

function labelStyle(): React.CSSProperties {
  return {
    fontFamily: MONO,
    fontSize: '9px',
    letterSpacing: '0.20em',
    textTransform: 'uppercase' as const,
    color: BONE_MUTE,
    display: 'block',
    marginBottom: '5px',
  };
}

export default function PromptApresentacaoPage() {
  const [empresa, setEmpresa]       = useState('');
  const [publico, setPublico]       = useState('');
  const [objetivo, setObjetivo]     = useState('');
  const [tom, setTom]               = useState(TOM_OPTIONS[0]!);
  const [pitch, setPitch]           = useState('');

  const [focus, setFocus] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isReady = empresa.trim().length > 0 && publico.trim().length > 0;

  const pitchTexto = pitch.trim() || PITCH_PALESTRANTE;

  const promptGerado = isReady
    ? `Com base no pitch e contexto abaixo, crie uma apresentação de slides profissional no Claude Design.

Contexto:
- Empresa / Negócio: ${empresa}
- Público da apresentação: ${publico}
${objetivo ? `- Objetivo da conversa: ${objetivo}\n` : ''}- Tom: ${tom}

Estrutura dos slides (siga essa ordem exata):

Slide 1 — O sinal de mercado
A percepção que se forma ANTES de qualquer palavra. Qual o custo invisível de uma comunicação confusa para este público? Comece pelo que eles já sentem, não pelo que você oferece.

Slide 2 — O problema palpável
Traduza a dor em situação concreta que o público reconhece imediatamente. Sem termos corporativos vagos. Use o que eles já vivem mas não conseguem nomear.

Slide 3 — Posicionamento em 1 frase
O que ${empresa} entrega — foco no benefício que o cliente recebe no final da jornada, não no processo ou na metodologia. Se a frase promete estratégia, o slide precisa parecer estratégico.

Slide 4 — Prova que valida o ponto
Um resultado concreto ou experiência que comprova o argumento do Slide 3. Não biografia, não currículo. A experiência deve servir ao ponto que está sendo defendido, não ocupar espaço por vaidade.

Slide 5 — O próximo passo
A frase que gera "interessante, me explica melhor" — não pressão, não urgência artificial. Curiosidade genuína que abre a conversa.

Princípios de copy (aplique em cada slide):
- 1 ideia central por slide — se tem duas ideias, são dois slides
- Una dados + história: só dado é frio e racional; só história parece frágil sem prova
- Termos palpáveis, não corporativos — o cliente entende o benefício imediatamente
- Tom consistente: ${tom}

Meu pitch (use como fonte de linguagem e copy):
${pitchTexto}

Instruções de design:
- Hierarquia visual forte: frase de impacto no topo (máx 12 palavras), contexto ou prova abaixo
- Máximo 30 palavras visíveis por slide
- Paleta sóbria com 1 acento de cor — sem gradientes pesados
- Espaço em branco generoso — slides que respiram comunicam confiança
- Estilo consultivo e premium — não pode parecer template genérico`
    : '← Preencha os campos ao lado';

  const handleCopy = () => {
    if (!isReady) return;
    navigator.clipboard.writeText(promptGerado).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <WorkshopClaudeDesignLayout slug="prompt-apresentacao">
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '32px',
          alignItems: 'start',
        }}
      >

        {/* ── Coluna esquerda — Formulário ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: EMBER }}>
            Preencha os dados
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={labelStyle()}>Empresa / Negócio *</label>
              <input
                type="text"
                value={empresa}
                onChange={e => setEmpresa(e.target.value)}
                onFocus={() => setFocus('empresa')}
                onBlur={() => setFocus(null)}
                placeholder="ex: Growth Sales A.I."
                style={inputStyle(focus === 'empresa')}
              />
            </div>
            <div>
              <label style={labelStyle()}>Para quem vou apresentar *</label>
              <input
                type="text"
                value={publico}
                onChange={e => setPublico(e.target.value)}
                onFocus={() => setFocus('pub')}
                onBlur={() => setFocus(null)}
                placeholder="ex: potencial cliente, investidor, parceiro estratégico"
                style={inputStyle(focus === 'pub')}
              />
            </div>
            <div>
              <label style={labelStyle()}>Objetivo da conversa (opcional)</label>
              <input
                type="text"
                value={objetivo}
                onChange={e => setObjetivo(e.target.value)}
                onFocus={() => setFocus('obj')}
                onBlur={() => setFocus(null)}
                placeholder="ex: fechar diagnóstico, apresentar proposta"
                style={inputStyle(focus === 'obj')}
              />
            </div>
            <div>
              <label style={labelStyle()}>Tom da apresentação</label>
              <select
                value={tom}
                onChange={e => setTom(e.target.value)}
                style={{ ...inputStyle(focus === 'tom'), cursor: 'pointer' }}
                onFocus={() => setFocus('tom')}
                onBlur={() => setFocus(null)}
              >
                {TOM_OPTIONS.map(o => <option key={o} value={o} style={{ background: '#0e0e11' }}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle()}>
                Meu pitch{' '}
                <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '8px' }}>
                  (deixe em branco para usar o pitch da palestrante)
                </span>
              </label>
              <textarea
                value={pitch}
                onChange={e => setPitch(e.target.value)}
                onFocus={() => setFocus('pitch')}
                onBlur={() => setFocus(null)}
                placeholder="Cole seu pitch aqui, ou deixe em branco…"
                rows={5}
                style={{ ...inputStyle(focus === 'pitch'), resize: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* ── Coluna direita — Prompt gerado ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BONE_MUTE }}>
              Prompt gerado · cole no Claude Design
            </span>
            <button
              onClick={handleCopy}
              disabled={!isReady}
              style={{
                fontFamily: MONO,
                fontSize: '9px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '8px 20px',
                border: `1px solid ${copied ? EMBER : (isReady ? EMBER : INPUT_BORDER)}`,
                background: copied ? 'rgba(255,58,14,0.12)' : (isReady ? EMBER : 'transparent'),
                color: copied ? EMBER : (isReady ? BONE : 'rgba(255,255,255,0.2)'),
                cursor: isReady ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                fontWeight: 700,
              }}
            >
              {copied ? '✓ Copiado!' : 'Copiar Prompt'}
            </button>
          </div>

          <div style={{
            background: INK,
            borderTop: `2px solid ${EMBER}`,
            padding: '18px 18px',
            maxHeight: '56vh',
            overflowY: 'auto',
            opacity: isReady ? 1 : 0.45,
          }}>
            <pre style={{
              fontFamily: MONO,
              fontSize: '11px',
              lineHeight: 1.7,
              color: BONE_DIM,
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {promptGerado}
            </pre>
          </div>

          <p style={{
            fontFamily: DISPLAY,
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(12px, 1.1vw, 14px)',
            color: BONE_MUTE,
            letterSpacing: '-0.005em',
          }}>
            claude.ai → New conversation → Slides
          </p>

        </div>
      </div>
    </WorkshopClaudeDesignLayout>
  );
}
