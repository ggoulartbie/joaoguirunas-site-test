'use client';

import { useEffect, useRef, useState } from 'react';

const REVEAL_CDN = 'https://cdn.jsdelivr.net/npm/reveal.js@5.0.4';

const LIME = '#D1FF00';
const ORANGE = '#FF4400';
const DARK = '#08080C';
const SURFACE = '#0C0C14';
const DIM = 'rgba(255,255,255,0.45)';
const BORDER = 'rgba(255,255,255,0.08)';
const MONO = "'Roboto Mono', 'Geist Mono', ui-monospace, monospace";
const DISPLAY = "var(--font-bb-display), 'Inter', system-ui, sans-serif";

const BG_GRID = `
  radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)
`;

export function WorkshopClient() {
  const deckRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const linkReveal = document.createElement('link');
    linkReveal.rel = 'stylesheet';
    linkReveal.href = `${REVEAL_CDN}/dist/reveal.css`;
    document.head.appendChild(linkReveal);

    const linkTheme = document.createElement('link');
    linkTheme.rel = 'stylesheet';
    linkTheme.href = `${REVEAL_CDN}/dist/theme/black.css`;
    document.head.appendChild(linkTheme);

    const script = document.createElement('script');
    script.src = `${REVEAL_CDN}/dist/reveal.js`;
    script.onload = () => setReady(true);
    document.head.appendChild(script);

    return () => { linkReveal.remove(); linkTheme.remove(); script.remove(); };
  }, []);

  useEffect(() => {
    if (!ready || !deckRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Reveal = (window as any).Reveal;
    if (!Reveal) return;
    const deck = new Reveal(deckRef.current, {
      hash: true, controls: true, progress: true,
      center: true, transition: 'fade', width: 1200, height: 700,
      margin: 0.04,
    });
    deck.initialize();
    return () => { try { deck.destroy(); } catch { /* noop */ } };
  }, [ready]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .reveal-presentation { width: 100vw; height: 100vh; }

        /* ── RESET ── */
        .reveal .slides section {
          text-align: left;
          padding: 0;
          height: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }
        .reveal .slides section h1,
        .reveal .slides section h2,
        .reveal .slides section h3 {
          text-transform: uppercase;
          letter-spacing: -0.02em;
          font-weight: 800;
          line-height: 1.0;
          font-family: ${DISPLAY};
          color: #fff;
          margin: 0 0 0.5em;
        }
        .reveal .slides section h1 { font-size: 3.2em; }
        .reveal .slides section h2 { font-size: 1.9em; }
        .reveal .slides section h3 { font-size: 1.1em; color: ${LIME}; }
        .reveal .slides section p,
        .reveal .slides section li { font-size: 0.62em; line-height: 1.55; color: ${DIM}; margin: 0; }
        .reveal .slides section strong { color: #fff; font-weight: 600; }
        .reveal .controls { color: ${LIME}; }
        .reveal .progress span { background: ${LIME}; }

        /* ── LAYOUT HELPERS ── */
        .slide-inner {
          display: flex; flex-direction: column;
          height: 700px; padding: 44px 56px;
          box-sizing: border-box; position: relative; overflow: hidden;
        }
        .slide-inner.center-all {
          align-items: center; justify-content: center; text-align: center;
        }
        .bg-grid {
          position: absolute; inset: 0;
          background-image: ${BG_GRID};
          background-size: 28px 28px;
          pointer-events: none;
        }
        .bg-glow-tl {
          position: absolute; top: -120px; left: -80px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(209,255,0,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .bg-glow-br {
          position: absolute; bottom: -120px; right: -80px;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(255,68,0,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .slide-content { position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column; }

        /* ── LABELS / BADGES ── */
        .hud-label {
          font-family: ${MONO};
          font-size: 0.48em; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: ${LIME}; margin-bottom: 12px; display: block;
        }
        .hud-label.orange { color: ${ORANGE}; }
        .hud-label.dim { color: ${DIM}; }
        .badge-pill {
          display: inline-flex; align-items: center; gap: 6px;
          border: 1px solid rgba(209,255,0,0.35);
          background: rgba(209,255,0,0.07);
          color: ${LIME};
          padding: 5px 14px; margin-bottom: 16px;
          font-family: ${MONO};
          font-size: 0.5em; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
        }
        .badge-pill.orange {
          border-color: rgba(255,68,0,0.4);
          background: rgba(255,68,0,0.08);
          color: ${ORANGE};
        }
        .badge-pill.alert {
          border-color: rgba(255,68,0,0.6);
          background: rgba(255,68,0,0.14);
          color: #fff; font-weight: 700;
        }

        /* ── DIVIDER ── */
        .hud-line {
          width: 40px; height: 2px;
          background: ${LIME};
          margin-bottom: 16px;
        }

        /* ── GRID LAYOUTS ── */
        .col-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .col-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        .col-2-3 { display: grid; grid-template-columns: 2fr 3fr; gap: 24px; }

        /* ── CARDS ── */
        .card {
          border: 1px solid ${BORDER};
          background: rgba(255,255,255,0.02);
          padding: 18px 20px;
        }
        .card.lime { border-color: rgba(209,255,0,0.25); background: rgba(209,255,0,0.03); }
        .card.orange { border-color: rgba(255,68,0,0.25); background: rgba(255,68,0,0.03); }
        .card.surface { background: ${SURFACE}; border-color: rgba(255,255,255,0.06); }
        .card-label {
          font-family: ${MONO};
          font-size: 0.46em; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: ${LIME}; margin-bottom: 10px; display: block;
        }
        .card-label.orange { color: ${ORANGE}; }
        .card-label.dim { color: ${DIM}; }

        /* ── CODE BLOCKS ── */
        .code-block {
          background: #070709;
          border: 1px solid rgba(209,255,0,0.12);
          border-left: 3px solid ${LIME};
          padding: 14px 18px;
          font-family: ${MONO};
          font-size: 0.5em; line-height: 1.9;
          color: rgba(255,255,255,0.55);
        }
        .code-block .k { color: ${LIME}; }
        .code-block .c { color: rgba(255,255,255,0.2); }
        .code-block .s { color: rgba(255,200,100,0.8); }
        .code-block.orange { border-left-color: ${ORANGE}; border-color: rgba(255,68,0,0.12); }

        /* ── TAGS ── */
        .tag-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
        .tag {
          font-family: ${MONO};
          font-size: 0.44em; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 4px 10px;
          border: 1px solid rgba(209,255,0,0.2);
          background: rgba(209,255,0,0.05);
          color: ${LIME};
        }
        .tag.orange {
          border-color: rgba(255,68,0,0.25);
          background: rgba(255,68,0,0.06);
          color: ${ORANGE};
        }
        .tag.dim {
          border-color: ${BORDER};
          background: rgba(255,255,255,0.02);
          color: ${DIM};
        }
        .tag.green {
          border-color: rgba(34,197,94,0.25);
          background: rgba(34,197,94,0.05);
          color: #4ade80;
        }

        /* ── CHECKLIST ── */
        .check-item {
          display: flex; align-items: flex-start; gap: 10px;
          margin: 7px 0;
        }
        .check-item .dot {
          width: 5px; height: 5px;
          background: ${LIME}; flex-shrink: 0; margin-top: 6px;
        }
        .check-item .dot.orange { background: ${ORANGE}; }
        .check-item span { font-size: 0.6em; color: ${DIM}; line-height: 1.5; }
        .check-item span strong { color: #fff; }

        /* ── STATS ── */
        .stat-block { text-align: center; padding: 16px 12px; }
        .stat-block .num {
          font-family: ${DISPLAY};
          font-size: 2.4em; font-weight: 800;
          color: ${LIME}; line-height: 1; display: block;
        }
        .stat-block .num.orange { color: ${ORANGE}; }
        .stat-block .lbl {
          font-family: ${MONO};
          font-size: 0.44em; letter-spacing: 0.1em;
          text-transform: uppercase; color: ${DIM};
          display: block; margin-top: 4px;
        }

        /* ── HUD DIVIDER ── */
        .h-rule {
          height: 1px; background: ${BORDER};
          margin: 14px 0;
        }

        /* ── TIMELINE ITEM ── */
        .t-item {
          display: flex; align-items: baseline; gap: 16px;
          padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .t-item:last-child { border-bottom: none; }
        .t-item .time {
          font-family: ${MONO}; font-size: 0.44em;
          color: ${LIME}; min-width: 46px; letter-spacing: 0.06em;
        }
        .t-item .text { font-size: 0.6em; color: ${DIM}; }
        .t-item .text strong { color: #fff; }

        /* ── HIGHLIGHT BOX ── */
        .hl-box {
          border-left: 3px solid ${LIME};
          background: rgba(209,255,0,0.04);
          padding: 12px 16px; margin-top: 14px;
        }
        .hl-box.orange { border-left-color: ${ORANGE}; background: rgba(255,68,0,0.04); }
        .hl-box p { font-size: 0.58em !important; color: rgba(255,255,255,0.75) !important; }

        /* ── SCAN LINE OVERLAY ── */
        .scan-lines {
          position: absolute; inset: 0; pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0,0,0,0.07) 3px,
            rgba(0,0,0,0.07) 4px
          );
          z-index: 0;
        }

        /* ── CORNER DECO ── */
        .corner-tl, .corner-br {
          position: absolute; width: 20px; height: 20px;
          pointer-events: none; z-index: 2;
        }
        .corner-tl {
          top: 16px; left: 16px;
          border-top: 1px solid rgba(209,255,0,0.3);
          border-left: 1px solid rgba(209,255,0,0.3);
        }
        .corner-br {
          bottom: 16px; right: 16px;
          border-bottom: 1px solid rgba(209,255,0,0.3);
          border-right: 1px solid rgba(209,255,0,0.3);
        }

        /* ── SLIDE NUMBER HUD ── */
        .slide-num {
          position: absolute; bottom: 20px; right: 24px;
          font-family: ${MONO}; font-size: 0.38em;
          color: rgba(255,255,255,0.2); letter-spacing: 0.1em;
          z-index: 2;
        }
      ` }} />

      <div className="reveal reveal-presentation" ref={deckRef}>
        <div className="slides">

          {/* ═══════════════════════════════════════
              SLIDE 1 — COVER
          ═══════════════════════════════════════ */}
          <section>
            <div className="slide-inner center-all" style={{ background: DARK }}>
              <div className="bg-grid" />
              <div className="bg-glow-tl" />
              <div className="bg-glow-br" />
              <div className="corner-tl" /><div className="corner-br" />
              <div className="slide-content" style={{ alignItems: 'center', justifyContent: 'center' }}>
                <span className="badge-pill">Workshop · 1 Hora</span>
                <h1 style={{ textAlign: 'center', fontSize: '3em', letterSpacing: '-0.03em' }}>
                  Claude Code<br />
                  <span style={{ color: LIME }}>na Prática</span>
                </h1>
                <div className="hud-line" style={{ margin: '16px auto' }} />
                <p style={{ textAlign: 'center', fontSize: '0.72em', color: DIM, maxWidth: '520px' }}>
                  Do setup ao squad completo — construindo seu time de agentes de IA
                </p>
                <div className="tag-row" style={{ justifyContent: 'center', marginTop: '24px' }}>
                  <span className="tag">Config Global</span>
                  <span className="tag dim">/init</span>
                  <span className="tag">AIOX</span>
                  <span className="tag dim">Agentes</span>
                  <span className="tag">Squad Creator</span>
                  <span className="tag dim">Obsidian</span>
                </div>
              </div>
              <span className="slide-num">01 / 12</span>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              SLIDE 2 — AGENDA
          ═══════════════════════════════════════ */}
          <section>
            <div className="slide-inner" style={{ background: DARK }}>
              <div className="bg-grid" /><div className="bg-glow-tl" />
              <div className="corner-tl" /><div className="corner-br" />
              <div className="slide-content">
                <span className="hud-label">Roteiro · 60 min</span>
                <h2>O que vamos ver hoje</h2>
                <div className="h-rule" />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="t-item"><span className="time">05 min</span><span className="text"><strong>Claude Raiz</strong> — config global vs config do projeto</span></div>
                  <div className="t-item"><span className="time">10 min</span><span className="text"><strong>A Pasta .claude</strong> — estrutura, CLAUDE.md e o <code style={{color:LIME,fontFamily:'monospace'}}>/init</code></span></div>
                  <div className="t-item"><span className="time">10 min</span><span className="text"><strong>AIOX — Agentes, Skills e Integrações</strong> — as 3 camadas</span></div>
                  <div className="t-item"><span className="time">05 min</span><span className="text"><strong>Estrutura do AIOX</strong> — como está organizado</span></div>
                  <div className="t-item"><span className="time">10 min</span><span className="text"><strong>Agente Base + Squad Creator</strong> — o libertador</span></div>
                  <div className="t-item"><span className="time">10 min</span><span className="text"><strong>Claude + Obsidian</strong> — superpoder de memória</span></div>
                  <div className="t-item"><span className="time">10 min</span><span className="text"><strong>4 Semanas de Resultados</strong> — o que foi construído</span></div>
                </div>
              </div>
              <span className="slide-num">02 / 12</span>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              SLIDE 3 — CLAUDE RAIZ VS PROJETO
          ═══════════════════════════════════════ */}
          <section>
            <div className="slide-inner" style={{ background: DARK }}>
              <div className="bg-grid" /><div className="bg-glow-tl" />
              <div className="corner-tl" /><div className="corner-br" />
              <div className="slide-content">
                <span className="hud-label">Fundamento</span>
                <h2>Claude Raiz vs Claude do Projeto</h2>
                <div className="h-rule" />
                <div className="col-2" style={{ flex: 1, alignContent: 'start', marginTop: '4px' }}>
                  <div className="card lime">
                    <span className="card-label">~/.claude/ — Global</span>
                    <p style={{ marginBottom: '10px' }}>Vai para <strong>todos os projetos</strong>. Sua identidade, preferências e memória pessoal.</p>
                    <div className="code-block">
                      <span className="k">~/.claude/</span><br/>
                      <span className="c">├─ </span>CLAUDE.md<br/>
                      <span className="c">├─ </span>settings.json<br/>
                      <span className="c">├─ </span>keybindings.json<br/>
                      <span className="c">└─ </span><span className="k">projects/memory/</span>
                    </div>
                  </div>
                  <div className="card">
                    <span className="card-label dim">.claude/ — Projeto</span>
                    <p style={{ marginBottom: '10px' }}>Específico do <strong>repositório atual</strong>. Regras, agentes e workflows do time.</p>
                    <div className="code-block" style={{ borderLeftColor: ORANGE }}>
                      <span className="k">.claude/</span><br/>
                      <span className="c">├─ </span>CLAUDE.md<br/>
                      <span className="c">├─ </span>settings.json<br/>
                      <span className="c">└─ </span>rules/<br/>
                      <span className="c">   ├─ </span>agent-authority.md<br/>
                      <span className="c">   └─ </span>workflow-execution.md
                    </div>
                  </div>
                </div>
                <div className="hl-box" style={{ marginTop: '14px' }}>
                  <p>O projeto <strong>herda</strong> o global — e pode <strong>sobrescrever</strong> qualquer regra. Do mais específico para o mais genérico.</p>
                </div>
              </div>
              <span className="slide-num">03 / 12</span>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              SLIDE 4 — .CLAUDE + /INIT
          ═══════════════════════════════════════ */}
          <section>
            <div className="slide-inner" style={{ background: DARK }}>
              <div className="bg-grid" /><div className="bg-glow-tl" />
              <div className="corner-tl" /><div className="corner-br" />
              <div className="slide-content">
                <span className="hud-label">Estrutura</span>
                <h2>A Pasta .claude/ e o <span style={{ color: LIME }}>/init</span></h2>
                <div className="h-rule" />
                <div className="col-2" style={{ flex: 1, alignContent: 'start', marginTop: '4px' }}>
                  <div>
                    <span className="card-label">O que fica aqui</span>
                    <div className="check-item"><div className="dot" /><span><strong>CLAUDE.md</strong> — instruções lidas a cada sessão</span></div>
                    <div className="check-item"><div className="dot" /><span><strong>settings.json</strong> — permissões, allow/deny de ferramentas</span></div>
                    <div className="check-item"><div className="dot" /><span><strong>rules/</strong> — regras carregadas por contexto de arquivo</span></div>
                    <div className="check-item"><div className="dot" /><span><strong>agents/</strong> — definições de agentes customizados do squad</span></div>
                    <div className="h-rule" />
                    <span className="card-label">Por que importa</span>
                    <p style={{ fontSize: '0.58em' }}>É a diferença entre um Claude <strong>genérico</strong> e um Claude que conhece <strong>seu projeto de cor</strong>.</p>
                  </div>
                  <div>
                    <span className="card-label">O comando /init</span>
                    <div className="code-block">
                      <span className="c"># execute dentro do projeto</span><br/>
                      <span className="k">/init</span>
                    </div>
                    <div style={{ marginTop: '12px' }}>
                      <div className="check-item"><div className="dot" /><span>Lê toda a estrutura do codebase</span></div>
                      <div className="check-item"><div className="dot" /><span>Entende stack, padrões e arquitetura</span></div>
                      <div className="check-item"><div className="dot" /><span>Gera um <strong>CLAUDE.md documentado</strong></span></div>
                      <div className="check-item"><div className="dot" /><span>Claude passa a conhecer o projeto profundamente</span></div>
                    </div>
                    <div className="hl-box" style={{ marginTop: '14px' }}>
                      <p><strong>Sempre o primeiro comando</strong> em um projeto novo.</p>
                    </div>
                  </div>
                </div>
              </div>
              <span className="slide-num">04 / 12</span>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              SLIDE 5 — O QUE É O AIOX
          ═══════════════════════════════════════ */}
          <section>
            <div className="slide-inner" style={{ background: DARK }}>
              <div className="bg-grid" /><div className="bg-glow-tl" />
              <div className="corner-tl" /><div className="corner-br" />
              <div className="slide-content">
                <span className="hud-label">AIOX Framework</span>
                <h2>O que é o AIOX?</h2>
                <div className="h-rule" />
                <p style={{ fontSize: '0.65em', marginBottom: '18px' }}>
                  Um <strong>meta-framework</strong> que orquestra agentes de IA para desenvolvimento full stack.
                  Não é um produto — é uma <span style={{ color: LIME, fontWeight: 600 }}>infraestrutura de inteligência</span> para seu time operar.
                </p>
                <div className="col-3" style={{ flex: 1, alignContent: 'start' }}>
                  <div className="card lime">
                    <span className="card-label">🤖 Agentes</span>
                    <p>Personas com escopo, autoridade e memória. Especialistas que assumem funções reais.</p>
                    <div className="tag-row" style={{ marginTop: '12px' }}>
                      <span className="tag">@dev</span>
                      <span className="tag">@qa</span>
                      <span className="tag">@pm</span>
                      <span className="tag">@devops</span>
                    </div>
                  </div>
                  <div className="card surface">
                    <span className="card-label dim">⚡ Skills</span>
                    <p>Comandos reutilizáveis acionados por slash. Capacidades plug-and-play.</p>
                    <div className="tag-row" style={{ marginTop: '12px' }}>
                      <span className="tag dim">/init</span>
                      <span className="tag dim">/review</span>
                      <span className="tag dim">/loop</span>
                    </div>
                  </div>
                  <div className="card surface">
                    <span className="card-label" style={{ color: '#4ade80' }}>🔌 Integrações</span>
                    <p>MCP Servers que expandem os sentidos do Claude para o mundo externo.</p>
                    <div className="tag-row" style={{ marginTop: '12px' }}>
                      <span className="tag green">Playwright</span>
                      <span className="tag green">Context7</span>
                      <span className="tag green">Obsidian</span>
                    </div>
                  </div>
                </div>
              </div>
              <span className="slide-num">05 / 12</span>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              SLIDE 6 — AS 3 CAMADAS
          ═══════════════════════════════════════ */}
          <section>
            <div className="slide-inner" style={{ background: DARK }}>
              <div className="bg-grid" /><div className="bg-glow-tl" />
              <div className="corner-tl" /><div className="corner-br" />
              <div className="slide-content">
                <span className="hud-label">As 3 Camadas</span>
                <h2>Agentes · Skills · Integrações</h2>
                <div className="h-rule" />
                <div className="col-3" style={{ flex: 1, alignContent: 'start', marginTop: '8px' }}>
                  <div className="card lime">
                    <span className="card-label">Agente = Quem faz</span>
                    <div className="code-block" style={{ marginBottom: '10px' }}>
                      <span className="k">@dev</span>, <span className="k">@qa</span>, <span className="k">@pm</span><br/>
                      <span className="c"># ativado com @nome</span>
                    </div>
                    <div className="check-item"><div className="dot" /><span>Persona + autoridade definidas</span></div>
                    <div className="check-item"><div className="dot" /><span>Escopo exclusivo de ações</span></div>
                    <div className="check-item"><div className="dot" /><span>Memória persistente no projeto</span></div>
                  </div>
                  <div className="card surface">
                    <span className="card-label dim">Skill = O que fazer</span>
                    <div className="code-block" style={{ marginBottom: '10px', borderLeftColor: ORANGE }}>
                      <span className="k">/init</span>, <span className="k">/review</span><br/>
                      <span className="c"># ativado com /comando</span>
                    </div>
                    <div className="check-item"><div className="dot orange" /><span>Workflow encapsulado</span></div>
                    <div className="check-item"><div className="dot orange" /><span>Funciona em qualquer projeto</span></div>
                    <div className="check-item"><div className="dot orange" /><span>Reutilizável e compartilhável</span></div>
                  </div>
                  <div className="card surface">
                    <span className="card-label" style={{ color: '#4ade80' }}>Integração = Como fazer</span>
                    <div className="code-block" style={{ marginBottom: '10px', borderLeftColor: '#4ade80' }}>
                      <span className="k">MCP Server</span><br/>
                      <span className="c"># nova ferramenta nativa</span>
                    </div>
                    <div className="check-item"><div className="dot" style={{ background: '#4ade80' }} /><span>Claude ganha novos "sentidos"</span></div>
                    <div className="check-item"><div className="dot" style={{ background: '#4ade80' }} /><span>Browser, DB, APIs, Obsidian</span></div>
                    <div className="check-item"><div className="dot" style={{ background: '#4ade80' }} /><span>Configurado uma vez, global</span></div>
                  </div>
                </div>
                <div className="hl-box" style={{ marginTop: '12px' }}>
                  <p>Agentes usam Skills. Skills usam Integrações. Tudo orquestrado pelo AIOX.</p>
                </div>
              </div>
              <span className="slide-num">06 / 12</span>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              SLIDE 7 — ESTRUTURA DO AIOX
          ═══════════════════════════════════════ */}
          <section>
            <div className="slide-inner" style={{ background: DARK }}>
              <div className="bg-grid" /><div className="bg-glow-tl" />
              <div className="corner-tl" /><div className="corner-br" />
              <div className="slide-content">
                <span className="hud-label">Arquitetura</span>
                <h2>Estrutura do AIOX</h2>
                <div className="h-rule" />
                <div className="col-2" style={{ flex: 1, alignContent: 'start', marginTop: '4px' }}>
                  <div>
                    <span className="card-label">Diretórios</span>
                    <div className="code-block">
                      <span className="k">.aiox-core/</span>  <span className="c">← framework</span><br/>
                      <span className="c">├─ </span>constitution.md<br/>
                      <span className="c">├─ </span>agents/<br/>
                      <span className="c">├─ </span>tasks/<br/>
                      <span className="c">└─ </span>templates/<br/>
                      <br/>
                      <span className="k">docs/stories/</span>  <span className="c">← seu trabalho</span><br/>
                      <span className="k">squads/</span>        <span className="c">← seus times</span><br/>
                      <span className="k">.claude/</span>       <span className="c">← config do projeto</span>
                    </div>
                  </div>
                  <div>
                    <span className="card-label">4 camadas de proteção</span>
                    <div className="check-item"><div className="dot" /><span><strong>L1 Core</strong> — nunca modificável (constitution)</span></div>
                    <div className="check-item"><div className="dot" /><span><strong>L2 Templates</strong> — só extensíveis (tasks, workflows)</span></div>
                    <div className="check-item"><div className="dot orange" /><span><strong>L3 Config</strong> — mutável (settings, memoria)</span></div>
                    <div className="check-item"><div className="dot orange" /><span><strong>L4 Runtime</strong> — seu território (stories, squads)</span></div>
                    <div className="hl-box" style={{ marginTop: '14px' }}>
                      <p><strong>Story-Driven Development:</strong> todo trabalho começa em <code style={{ fontFamily: 'monospace', color: LIME }}>docs/stories/</code></p>
                    </div>
                  </div>
                </div>
              </div>
              <span className="slide-num">07 / 12</span>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              SLIDE 8 — ANATOMIA DO AGENTE
          ═══════════════════════════════════════ */}
          <section>
            <div className="slide-inner" style={{ background: DARK }}>
              <div className="bg-grid" /><div className="bg-glow-tl" />
              <div className="corner-tl" /><div className="corner-br" />
              <div className="slide-content">
                <span className="hud-label">Agente Base</span>
                <h2>Anatomia de um Agente</h2>
                <div className="h-rule" />
                <div className="col-2" style={{ flex: 1, alignContent: 'start', marginTop: '4px' }}>
                  <div className="code-block" style={{ fontSize: '0.48em', lineHeight: '1.85' }}>
                    <span className="k">agent:</span><br/>
                    <span className="c">  name: </span><span className="s">Dex</span><br/>
                    <span className="c">  id: </span><span className="s">dev</span><br/>
                    <span className="c">  title: </span><span className="s">Lead Developer</span><br/>
                    <br/>
                    <span className="k">persona:</span><br/>
                    <span className="c">  role: </span>Implementação de código<br/>
                    <span className="c">  tone: </span>Técnico, direto<br/>
                    <br/>
                    <span className="k">commands:</span><br/>
                    <span className="c">  - *</span>develop<br/>
                    <span className="c">  - *</span>review<br/>
                    <span className="c">  - *</span>exit<br/>
                    <br/>
                    <span className="k">memory:</span><br/>
                    <span className="c">  file: </span>agents/dev/MEMORY.md
                  </div>
                  <div>
                    <span className="card-label">Os 5 elementos</span>
                    <div className="check-item"><div className="dot" /><span><strong>Identidade</strong> — nome, persona, tom de voz</span></div>
                    <div className="check-item"><div className="dot" /><span><strong>Autoridade</strong> — o que pode e não pode fazer</span></div>
                    <div className="check-item"><div className="dot" /><span><strong>Comandos</strong> — ações com prefixo <code style={{ color: LIME, fontFamily: 'monospace' }}>*</code></span></div>
                    <div className="check-item"><div className="dot" /><span><strong>Dependências</strong> — tasks, templates, tools</span></div>
                    <div className="check-item"><div className="dot" /><span><strong>Memória</strong> — aprende com o projeto</span></div>
                    <div className="hl-box" style={{ marginTop: '16px' }}>
                      <p>Ativação: <code style={{ fontFamily: 'monospace', color: LIME }}>@dev</code> ou <code style={{ fontFamily: 'monospace', color: LIME }}>/AIOX:agents:dev</code></p>
                    </div>
                  </div>
                </div>
              </div>
              <span className="slide-num">08 / 12</span>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              SLIDE 9 — SQUAD CREATOR
          ═══════════════════════════════════════ */}
          <section>
            <div className="slide-inner" style={{ background: DARK }}>
              <div className="bg-grid" />
              <div style={{ position: 'absolute', top: '-100px', right: '-60px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(209,255,0,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
              <div className="corner-tl" /><div className="corner-br" />
              <div className="slide-content">
                <span className="hud-label">O Libertador</span>
                <h2>Squad Creator</h2>
                <div className="h-rule" />
                <p style={{ fontSize: '0.65em', marginBottom: '16px' }}>
                  O agente que <span style={{ color: LIME, fontWeight: 700 }}>cria outros agentes</span>.
                  Com ele você sai do framework genérico e constrói <strong>seu time personalizado</strong> para qualquer contexto.
                </p>
                <div className="col-2" style={{ flex: 1, alignContent: 'start' }}>
                  <div className="card lime">
                    <span className="card-label">Como funciona</span>
                    <div className="check-item"><div className="dot" /><span>1. Você descreve o papel que precisa</span></div>
                    <div className="check-item"><div className="dot" /><span>2. Squad Creator gera a definição completa</span></div>
                    <div className="check-item"><div className="dot" /><span>3. Agente criado com persona, comandos e memória</span></div>
                    <div className="check-item"><div className="dot" /><span>4. Disponível imediatamente via <code style={{ color: LIME, fontFamily: 'monospace' }}>@nome</code></span></div>
                  </div>
                  <div className="card surface">
                    <span className="card-label dim">Exemplos de squads</span>
                    <div className="check-item"><div className="dot orange" /><span>Squad de Software Engineering</span></div>
                    <div className="check-item"><div className="dot orange" /><span>Squad de Marketing &amp; Growth</span></div>
                    <div className="check-item"><div className="dot orange" /><span>Squad de Sites &amp; Landing Pages</span></div>
                    <div className="check-item"><div className="dot orange" /><span>Squad de Conteúdo &amp; SEO</span></div>
                    <div className="check-item"><div className="dot orange" /><span><strong>Qualquer contexto do seu negócio</strong></span></div>
                  </div>
                </div>
                <div className="hl-box" style={{ marginTop: '12px' }}>
                  <p>Resultado: um time completo de IA especializado no seu negócio, operando 24h</p>
                </div>
              </div>
              <span className="slide-num">09 / 12</span>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              SLIDE 10 — CLAUDE + OBSIDIAN
          ═══════════════════════════════════════ */}
          <section>
            <div className="slide-inner" style={{ background: DARK }}>
              <div className="bg-grid" /><div className="bg-glow-tl" />
              <div className="corner-tl" /><div className="corner-br" />
              <div className="slide-content">
                <span className="hud-label">Superpoder</span>
                <h2>Claude + <span style={{ color: LIME }}>Obsidian</span></h2>
                <div className="h-rule" />
                <div className="col-2" style={{ flex: 1, alignContent: 'start', marginTop: '4px' }}>
                  <div>
                    <span className="card-label dim">Sem Obsidian</span>
                    <div className="check-item"><div className="dot" style={{ background: 'rgba(255,255,255,0.2)' }} /><span>Cada conversa começa do zero</span></div>
                    <div className="check-item"><div className="dot" style={{ background: 'rgba(255,255,255,0.2)' }} /><span>Decisões não são lembradas</span></div>
                    <div className="check-item"><div className="dot" style={{ background: 'rgba(255,255,255,0.2)' }} /><span>Contexto repassado manualmente</span></div>
                    <div className="check-item"><div className="dot" style={{ background: 'rgba(255,255,255,0.2)' }} /><span>Conhecimento acumulado se perde</span></div>
                    <div style={{ height: '16px' }} />
                    <span className="card-label">Com a Integração MCP</span>
                    <div className="check-item"><div className="dot" /><span>Claude lê e escreve no seu vault</span></div>
                    <div className="check-item"><div className="dot" /><span>Decisões ficam registradas automaticamente</span></div>
                    <div className="check-item"><div className="dot" /><span>Knowledge base cresce a cada sessão</span></div>
                    <div className="check-item"><div className="dot" /><span>Busca semântica no seu conhecimento</span></div>
                  </div>
                  <div>
                    <span className="card-label">Configuração</span>
                    <div className="code-block">
                      <span className="c"># ~/.claude/settings.json</span><br/>
                      <span className="k">"mcpServers"</span>: &#123;<br/>
                      <span className="c">  "</span><span className="k">obsidian</span><span className="c">"</span>: &#123;<br/>
                      <span className="c">    "command"</span>: <span className="s">"obsidian-mcp"</span>,<br/>
                      <span className="c">    "vault"</span>: <span className="s">"/seu/vault"</span><br/>
                      &nbsp;&nbsp;&#125;<br/>
                      &#125;
                    </div>
                    <div className="hl-box" style={{ marginTop: '14px' }}>
                      <p>Configurado uma vez no <code style={{ fontFamily: 'monospace', color: LIME }}>~/.claude/</code> → ativo em todos os projetos. Claude vira um <strong>segundo cérebro conectado ao seu</strong>.</p>
                    </div>
                  </div>
                </div>
              </div>
              <span className="slide-num">10 / 12</span>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              SLIDE 11 — 4 SEMANAS DE RESULTADOS
          ═══════════════════════════════════════ */}
          <section>
            <div className="slide-inner" style={{ background: DARK }}>
              <div className="bg-grid" /><div className="bg-glow-br" />
              <div className="corner-tl" /><div className="corner-br" />
              <div className="slide-content">
                <span className="hud-label">Prova de Conceito</span>
                <h2>O que fiz em <span style={{ color: LIME }}>4 semanas</span></h2>
                <div className="h-rule" />
                <div className="col-3" style={{ marginBottom: '16px' }}>
                  <div className="card lime stat-block">
                    <span className="num">3</span>
                    <span className="lbl">Squads criadas</span>
                  </div>
                  <div className="card surface stat-block">
                    <span className="num">20+</span>
                    <span className="lbl">Agentes ativos</span>
                  </div>
                  <div className="card surface stat-block">
                    <span className="num" style={{ fontSize: '1.8em' }}>24/7</span>
                    <span className="lbl">Time operando</span>
                  </div>
                </div>
                <div className="col-2" style={{ flex: 1, alignContent: 'start' }}>
                  <div>
                    <div className="check-item"><div className="dot" /><span>Site completo da mentoria Claude Code + AIOX</span></div>
                    <div className="check-item"><div className="dot" /><span>Squad <strong>themaestrisites</strong> — 8 agentes orquestrando sites e LPs</span></div>
                    <div className="check-item"><div className="dot" /><span><strong>n8n Killers Squad</strong> — guia interativo publicado</span></div>
                  </div>
                  <div>
                    <div className="check-item"><div className="dot orange" /><span>AIOX rodando como infra de desenvolvimento completa</span></div>
                    <div className="check-item"><div className="dot orange" /><span>Sistema de memória com Obsidian integrado</span></div>
                    <div className="check-item"><div className="dot orange" /><span>Este workshop — criado em minutos com o squad</span></div>
                  </div>
                </div>
              </div>
              <span className="slide-num">11 / 12</span>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              SLIDE 12 — PITCH MENTORIA
          ═══════════════════════════════════════ */}
          <section>
            <div className="slide-inner center-all" style={{ background: DARK }}>
              <div className="bg-grid" />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(209,255,0,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
              <div className="corner-tl" /><div className="corner-br" />
              <div className="slide-content" style={{ alignItems: 'center', justifyContent: 'center', gap: '0' }}>
                <span className="badge-pill alert">⚠ Apenas 3 Vagas Restantes</span>
                <h2 style={{ textAlign: 'center', fontSize: '2em', marginBottom: '6px' }}>
                  Mentoria Claude Code<br />
                  <span style={{ color: LIME }}>+ AIOX</span>
                </h2>
                <p style={{ textAlign: 'center', fontSize: '0.65em', color: DIM, maxWidth: '520px', margin: '8px auto 20px' }}>
                  Tudo que você viu hoje — do zero ao squad completo rodando no seu negócio —
                  em <strong style={{ color: '#fff' }}>4 semanas</strong>, com acompanhamento ao vivo.
                </p>
                <div className="col-3" style={{ width: '100%', maxWidth: '560px', marginBottom: '16px' }}>
                  <div className="card lime stat-block">
                    <span className="num" style={{ fontSize: '1.9em' }}>12/05</span>
                    <span className="lbl">Início · Terça</span>
                  </div>
                  <div className="card surface stat-block">
                    <span className="num" style={{ fontSize: '1.9em' }}>4</span>
                    <span className="lbl">Semanas</span>
                  </div>
                  <div className="card" style={{ borderColor: 'rgba(255,68,0,0.4)', background: 'rgba(255,68,0,0.06)' }}>
                    <span className="num orange" style={{ fontSize: '1.9em' }}>3</span>
                    <span className="lbl" style={{ color: ORANGE }}>Vagas restantes</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.52em', color: DIM, textAlign: 'center', marginBottom: '14px', fontFamily: MONO, letterSpacing: '0.06em' }}>
                  TURMA SUPER SELETA · MÁXIMO 15 PROJETOS · SUPORTE INDIVIDUAL
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ padding: '8px', background: '#fff' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=https://opensource.growthsales.ai/mentoria&color=08080C&bgcolor=ffffff"
                      alt="QR Code inscrição"
                      width={90} height={90}
                      style={{ display: 'block' }}
                    />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ color: LIME, fontFamily: MONO, fontSize: '0.65em', fontWeight: 700, letterSpacing: '0.04em', margin: 0 }}>
                      opensource.growthsales.ai/mentoria
                    </p>
                    <p style={{ color: DIM, fontFamily: MONO, fontSize: '0.46em', margin: '5px 0 0', letterSpacing: '0.06em' }}>
                      APONTE A CÂMERA · GARANTA SUA VAGA
                    </p>
                  </div>
                </div>
              </div>
              <span className="slide-num">12 / 12</span>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
