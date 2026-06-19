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

const TOM_OPTIONS = ['direto e objetivo', 'casual e próximo', 'formal e técnico', 'acolhedor e empático', 'provocador e disruptivo'];
const ESTETICA_OPTIONS = ['minimalista e limpa', 'sofisticada e premium', 'disruptiva e ousada', 'elegante e clássica', 'contemporânea e moderna'];

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

export default function PromptDesignSystemPage() {
  const [empresa, setEmpresa]           = useState('');
  const [cargo, setCargo]               = useState('');
  const [descricao, setDescricao]       = useState('');
  const [publico, setPublico]           = useState('');
  const [tom, setTom]                   = useState(TOM_OPTIONS[0]!);
  const [estetica, setEstetica]         = useState(ESTETICA_OPTIONS[0]!);
  const [referencias, setReferencias]   = useState('');
  const [evitar, setEvitar]             = useState('');
  const [siteAtual, setSiteAtual]       = useState('');

  const [focus, setFocus] = useState<string | null>(null);
  const [copied1, setCopied1] = useState(false);
  const [copied6, setCopied6] = useState(false);

  const empresaLabel = [empresa, cargo].filter(Boolean).join(' — ');

  const campo1 = empresaLabel
    ? `${empresaLabel}. ${descricao ? descricao + ' ' : ''}${publico ? `Audiência principal: ${publico}. ` : ''}Tom: ${tom}. Estética: ${estetica}.`
    : '← Preencha os campos ao lado';

  const campo6Lines = [
    `Mood: ${estetica}.`,
    referencias ? `Referências visuais que admiro: ${referencias}.` : '',
    evitar ? `EVITAR: ${evitar}.` : '',
    `Tom de voz da marca: ${tom}.`,
    siteAtual ? `Site atual para referência: ${siteAtual} — capture para entender o estado visual que precisa evoluir.` : '',
    '',
    '⚠️ IMPORTANTE: PEÇO QUE O CLAUDE DESIGN ME PERGUNTE sobre paleta de cores e tipografia ANTES de gerar qualquer coisa. Quero validar essas escolhas com base nas referências e no mood, não receber surpresa. Quando você for propor paleta e fonte, me apresenta 2-3 opções pra eu escolher.',
  ].filter(l => l !== undefined && (l !== '' || l === '')).join('\n').replace(/\n{3,}/g, '\n\n');

  const isReady = empresa.trim().length > 0;

  const handleCopy = (text: string, which: '1' | '6') => {
    navigator.clipboard.writeText(text).catch(() => {});
    if (which === '1') {
      setCopied1(true);
      setTimeout(() => setCopied1(false), 2200);
    } else {
      setCopied6(true);
      setTimeout(() => setCopied6(false), 2200);
    }
  };

  return (
    <WorkshopClaudeDesignLayout slug="prompt-design-system">
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

          {/* Campo 1 fields */}
          <div style={{ borderLeft: `2px solid ${EMBER}`, paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,58,14,0.7)' }}>
              Campo 1 — Company Name and Blurb
            </span>
            <div>
              <label style={labelStyle()}>Empresa *</label>
              <input
                type="text"
                value={empresa}
                onChange={e => setEmpresa(e.target.value)}
                onFocus={() => setFocus('empresa')}
                onBlur={() => setFocus(null)}
                placeholder="ex: Growth Sales"
                style={inputStyle(focus === 'empresa')}
              />
            </div>
            <div>
              <label style={labelStyle()}>Cargo / Posição (opcional)</label>
              <input
                type="text"
                value={cargo}
                onChange={e => setCargo(e.target.value)}
                onFocus={() => setFocus('cargo')}
                onBlur={() => setFocus(null)}
                placeholder="ex: Consultora de Marca e Posicionamento"
                style={inputStyle(focus === 'cargo')}
              />
            </div>
            <div>
              <label style={labelStyle()}>O que a empresa faz</label>
              <textarea
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                onFocus={() => setFocus('desc')}
                onBlur={() => setFocus(null)}
                placeholder="ex: Ajudo fundadores a transformar comunicação confusa em posicionamento claro e comercialmente estratégico."
                rows={2}
                style={{ ...inputStyle(focus === 'desc'), resize: 'none' }}
              />
            </div>
            <div>
              <label style={labelStyle()}>Público-alvo</label>
              <input
                type="text"
                value={publico}
                onChange={e => setPublico(e.target.value)}
                onFocus={() => setFocus('pub')}
                onBlur={() => setFocus(null)}
                placeholder="ex: fundadores e líderes de PMEs com operação consolidada"
                style={inputStyle(focus === 'pub')}
              />
            </div>
          </div>

          {/* Campo 6 fields */}
          <div style={{ borderLeft: `2px solid ${HAIRLINE}`, paddingLeft: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase', color: BONE_MUTE }}>
              Campo 6 — Any other notes
            </span>
            <div>
              <label style={labelStyle()}>Tom de voz</label>
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
              <label style={labelStyle()}>Estética desejada</label>
              <select
                value={estetica}
                onChange={e => setEstetica(e.target.value)}
                style={{ ...inputStyle(focus === 'est'), cursor: 'pointer' }}
                onFocus={() => setFocus('est')}
                onBlur={() => setFocus(null)}
              >
                {ESTETICA_OPTIONS.map(o => <option key={o} value={o} style={{ background: '#0e0e11' }}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle()}>Referências visuais (opcional)</label>
              <input
                type="text"
                value={referencias}
                onChange={e => setReferencias(e.target.value)}
                onFocus={() => setFocus('ref')}
                onBlur={() => setFocus(null)}
                placeholder="ex: Stripe, Linear, Notion"
                style={inputStyle(focus === 'ref')}
              />
            </div>
            <div>
              <label style={labelStyle()}>Site atual (opcional)</label>
              <input
                type="text"
                value={siteAtual}
                onChange={e => setSiteAtual(e.target.value)}
                onFocus={() => setFocus('site')}
                onBlur={() => setFocus(null)}
                placeholder="ex: https://minhaempresa.com.br"
                style={inputStyle(focus === 'site')}
              />
            </div>
            <div>
              <label style={labelStyle()}>O que EVITAR (opcional)</label>
              <input
                type="text"
                value={evitar}
                onChange={e => setEvitar(e.target.value)}
                onFocus={() => setFocus('ev')}
                onBlur={() => setFocus(null)}
                placeholder="ex: cores saturadas, gradientes pesados, ilustrações infantis"
                style={inputStyle(focus === 'ev')}
              />
            </div>
          </div>
        </div>

        {/* ── Coluna direita — Prompts gerados ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BONE_MUTE }}>
            Prompts gerados · copie e cole no Claude Design
          </span>

          {/* Campo 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: EMBER }}>
                Campo 1 — Company name and blurb
              </span>
              <button
                onClick={() => isReady && handleCopy(campo1, '1')}
                disabled={!isReady}
                style={{
                  fontFamily: MONO,
                  fontSize: '9px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '6px 14px',
                  border: `1px solid ${copied1 ? EMBER : INPUT_BORDER}`,
                  background: copied1 ? 'rgba(255,58,14,0.12)' : 'transparent',
                  color: copied1 ? EMBER : (isReady ? BONE_DIM : 'rgba(255,255,255,0.2)'),
                  cursor: isReady ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {copied1 ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>
            <div style={{
              background: INK,
              borderTop: `2px solid ${EMBER}`,
              padding: '16px 16px',
              minHeight: '64px',
              opacity: isReady ? 1 : 0.45,
            }}>
              <pre style={{
                fontFamily: MONO,
                fontSize: '11px',
                lineHeight: 1.65,
                color: BONE_DIM,
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
                {campo1}
              </pre>
            </div>
          </div>

          {/* Campo 6 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: BONE_MUTE }}>
                Campo 6 — Any other notes
              </span>
              <button
                onClick={() => isReady && handleCopy(campo6Lines, '6')}
                disabled={!isReady}
                style={{
                  fontFamily: MONO,
                  fontSize: '9px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  padding: '6px 14px',
                  border: `1px solid ${copied6 ? EMBER : INPUT_BORDER}`,
                  background: copied6 ? 'rgba(255,58,14,0.12)' : 'transparent',
                  color: copied6 ? EMBER : (isReady ? BONE_DIM : 'rgba(255,255,255,0.2)'),
                  cursor: isReady ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {copied6 ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>
            <div style={{
              background: INK,
              borderTop: `2px solid ${HAIRLINE}`,
              padding: '16px 16px',
              minHeight: '120px',
              maxHeight: '28vh',
              overflowY: 'auto',
              opacity: isReady ? 1 : 0.45,
            }}>
              <pre style={{
                fontFamily: MONO,
                fontSize: '11px',
                lineHeight: 1.65,
                color: BONE_DIM,
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
                {isReady ? campo6Lines : '← Preencha os campos ao lado'}
              </pre>
            </div>
          </div>

          {/* Dica */}
          <p style={{
            fontFamily: DISPLAY,
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(12px, 1.1vw, 14px)',
            color: BONE_MUTE,
            letterSpacing: '-0.005em',
          }}>
            Cole o Campo 1 na tela de setup. O Campo 6 vai em &ldquo;Any other notes&rdquo;.
          </p>

        </div>
      </div>
    </WorkshopClaudeDesignLayout>
  );
}
