'use client';

import { useEffect, useRef, useState } from 'react';

const REVEAL_CDN = 'https://cdn.jsdelivr.net/npm/reveal.js@5.0.4';

const AC  = '#FF4400';           // accent — laranja GrowthSales
const ACL = 'rgba(255,68,0,0.5)'; // accent light
const ACX = 'rgba(255,68,0,0.08)'; // accent faint
const DARK    = '#08080C';
const SURFACE = '#0D0D12';
const WHITE   = '#FFFFFF';
const DIM     = 'rgba(255,255,255,0.50)';
const DIMX    = 'rgba(255,255,255,0.28)';
const BORDER  = 'rgba(255,255,255,0.07)';
const MONO    = "'Roboto Mono','Geist Mono',ui-monospace,monospace";
const SANS    = "var(--font-bb-display),'Inter',system-ui,sans-serif";

export function WorkshopClient() {
  const deckRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const lr = document.createElement('link');
    lr.rel = 'stylesheet'; lr.href = `${REVEAL_CDN}/dist/reveal.css`;
    const lt = document.createElement('link');
    lt.rel = 'stylesheet'; lt.href = `${REVEAL_CDN}/dist/theme/black.css`;
    const sc = document.createElement('script');
    sc.src = `${REVEAL_CDN}/dist/reveal.js`;
    sc.onload = () => setReady(true);
    document.head.append(lr, lt, sc);
    return () => { lr.remove(); lt.remove(); sc.remove(); };
  }, []);

  useEffect(() => {
    if (!ready || !deckRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const R = (window as any).Reveal;
    if (!R) return;
    const d = new R(deckRef.current, {
      hash: true, controls: true, progress: true,
      center: false, transition: 'fade',
      width: 1280, height: 720, margin: 0.06,
      minScale: 0.2, maxScale: 2.0,
    });
    d.initialize();
    return () => { try { d.destroy(); } catch { /**/ } };
  }, [ready]);

  const css = `
    /* ─ base ─ */
    .rp { width:100vw; height:100vh; }
    .reveal .slides section {
      padding:0; text-align:left;
      box-sizing:border-box; overflow:hidden;
    }
    .reveal .slides section h1,
    .reveal .slides section h2 {
      text-transform:uppercase; font-weight:800;
      font-family:${SANS}; color:${WHITE};
      letter-spacing:-0.025em; line-height:1.0;
      margin:0 0 12px; padding:0;
      text-shadow: 0 0 40px rgba(255,68,0,0.15);
    }
    .reveal .slides section h1 { font-size:2.8em; }
    .reveal .slides section h2 { font-size:1.55em; }
    .reveal .slides section p,
    .reveal .slides section li { font-size:0.62em; line-height:1.55; color:${DIM}; margin:0; }
    .reveal .slides section strong { color:${WHITE}; font-weight:700; }
    .reveal .controls { color:${AC}; }
    .reveal .progress span { background:${AC}; }

    /* ─ slide wrapper ─ */
    .si {
      position:relative; overflow:hidden;
      width:100%; height:100%;
      padding:40px 52px 36px;
      box-sizing:border-box;
      display:flex; flex-direction:column;
      background:${DARK};
    }

    /* ─ backgrounds ─ */
    .bg-dots {
      position:absolute; inset:0; pointer-events:none;
      background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0);
      background-size:30px 30px;
    }
    .bg-glow {
      position:absolute; pointer-events:none;
      border-radius:50%;
    }
    .bg-glow-tl {
      top:-160px; left:-120px; width:560px; height:560px;
      background:radial-gradient(circle, rgba(255,68,0,0.07) 0%, transparent 65%);
    }
    .bg-glow-br {
      bottom:-160px; right:-120px; width:480px; height:480px;
      background:radial-gradient(circle, rgba(255,68,0,0.05) 0%, transparent 65%);
    }
    .bg-glow-c {
      top:50%; left:50%; transform:translate(-50%,-50%);
      width:700px; height:700px;
      background:radial-gradient(circle, rgba(255,68,0,0.06) 0%, transparent 60%);
    }

    /* ─ corners ─ */
    .co-tl,.co-br { position:absolute; width:18px; height:18px; pointer-events:none; z-index:3; }
    .co-tl { top:14px; left:14px; border-top:1px solid ${ACL}; border-left:1px solid ${ACL}; }
    .co-br { bottom:14px; right:14px; border-bottom:1px solid ${ACL}; border-right:1px solid ${ACL}; }

    /* ─ slide number ─ */
    .snum {
      position:absolute; bottom:18px; right:20px; z-index:3;
      font-family:${MONO}; font-size:0.38em;
      color:rgba(255,255,255,0.18); letter-spacing:0.08em;
    }

    /* ─ content layer ─ */
    .sc { position:relative; z-index:1; flex:1; display:flex; flex-direction:column; }
    .sc.center { align-items:center; justify-content:center; text-align:center; }

    /* ─ hud label ─ */
    .hl {
      display:block; margin-bottom:8px;
      font-family:${MONO}; font-size:0.45em; font-weight:500;
      letter-spacing:0.14em; text-transform:uppercase; color:${AC};
    }
    .hl.dim { color:${DIMX}; }

    /* ─ divider ─ */
    .hr { height:1px; background:${BORDER}; margin:10px 0 14px; }
    .hr-ac { height:2px; width:36px; background:${AC}; margin:10px 0 14px; }

    /* ─ badge ─ */
    .bdg {
      display:inline-flex; align-items:center;
      border:1px solid rgba(255,68,0,0.40);
      background:${ACX}; color:${AC};
      padding:5px 14px; margin-bottom:14px;
      font-family:${MONO}; font-size:0.46em; font-weight:500;
      letter-spacing:0.1em; text-transform:uppercase;
    }
    .bdg.alert {
      border-color:rgba(255,68,0,0.65);
      background:rgba(255,68,0,0.14); color:${WHITE}; font-weight:700;
    }

    /* ─ grid ─ */
    .g2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .g3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }

    /* ─ card ─ */
    .cd {
      border:1px solid ${BORDER};
      background:rgba(255,255,255,0.02);
      padding:16px 18px;
    }
    .cd.ac { border-color:rgba(255,68,0,0.28); background:${ACX}; }
    .cd.sf { background:${SURFACE}; border-color:rgba(255,255,255,0.05); }
    .cd.green { border-color:rgba(34,197,94,0.22); background:rgba(34,197,94,0.03); }
    .cdl {
      display:block; margin-bottom:9px;
      font-family:${MONO}; font-size:0.44em; font-weight:600;
      letter-spacing:0.11em; text-transform:uppercase; color:${AC};
    }
    .cdl.dim { color:${DIMX}; }
    .cdl.green { color:#4ade80; }

    /* ─ code block ─ */
    .cb {
      background:#070709; border:1px solid rgba(255,68,0,0.1);
      border-left:2px solid ${AC};
      padding:12px 16px; margin:8px 0;
      font-family:${MONO}; font-size:0.47em; line-height:1.85;
      color:rgba(255,255,255,0.45);
    }
    .cb .k { color:${AC}; }
    .cb .c { color:rgba(255,255,255,0.18); }
    .cb .s { color:rgba(255,200,100,0.75); }
    .cb.dim { border-left-color:rgba(255,255,255,0.2); border-color:${BORDER}; }
    .cb.green { border-left-color:#4ade80; border-color:rgba(34,197,94,0.12); }

    /* ─ tag ─ */
    .tr { display:flex; flex-wrap:wrap; gap:5px; margin-top:9px; }
    .tg {
      font-family:${MONO}; font-size:0.42em; font-weight:500;
      letter-spacing:0.07em; text-transform:uppercase;
      padding:3px 10px;
      border:1px solid rgba(255,68,0,0.22);
      background:rgba(255,68,0,0.05); color:${AC};
    }
    .tg.dm { border-color:${BORDER}; background:rgba(255,255,255,0.02); color:${DIM}; }
    .tg.gn { border-color:rgba(34,197,94,0.22); background:rgba(34,197,94,0.04); color:#4ade80; }

    /* ─ check item ─ */
    .ci { display:flex; align-items:flex-start; gap:9px; margin:6px 0; }
    .ci .dot { width:4px; height:4px; background:${AC}; flex-shrink:0; margin-top:7px; }
    .ci .dot.dm { background:rgba(255,255,255,0.22); }
    .ci .dot.gn { background:#4ade80; }
    .ci span { font-size:0.59em; color:${DIM}; line-height:1.5; }
    .ci span strong { color:${WHITE}; }

    /* ─ stat ─ */
    .st { text-align:center; padding:14px 10px; }
    .st .n {
      display:block; font-family:${SANS};
      font-size:2.2em; font-weight:800; color:${AC}; line-height:1;
    }
    .st .l {
      display:block; margin-top:4px;
      font-family:${MONO}; font-size:0.42em;
      letter-spacing:0.1em; text-transform:uppercase; color:${DIM};
    }

    /* ─ timeline item ─ */
    .ti {
      display:flex; align-items:baseline; gap:14px;
      padding:7px 0; border-bottom:1px solid rgba(255,255,255,0.04);
    }
    .ti:last-child { border-bottom:none; }
    .ti .t { font-family:${MONO}; font-size:0.42em; color:${AC}; min-width:44px; }
    .ti .x { font-size:0.59em; color:${DIM}; }
    .ti .x strong { color:${WHITE}; }

    /* ─ highlight box ─ */
    .hb {
      border-left:2px solid ${AC};
      background:${ACX}; padding:11px 15px; margin-top:12px;
    }
    .hb p { font-size:0.57em !important; color:rgba(255,255,255,0.78) !important; }
    .hb.sm p { font-size:0.52em !important; }
  `;

  // ── shorthand slide wrapper ──
  const S = ({ n, children, center, glowBr }: {
    n: string; children: React.ReactNode; center?: boolean; glowBr?: boolean;
  }) => (
    <section>
      <div className="si">
        <div className="bg-dots" />
        <div className={`bg-glow ${center ? 'bg-glow-c' : 'bg-glow-tl'}`} />
        {glowBr && <div className="bg-glow bg-glow-br" />}
        <div className="co-tl" /><div className="co-br" />
        <div className={`sc${center ? ' center' : ''}`}>{children}</div>
        <span className="snum">{n} / 12</span>
      </div>
    </section>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="reveal rp" ref={deckRef}>
        <div className="slides">

          {/* 01 COVER */}
          <S n="01" center>
            <span className="bdg">Workshop · 1 Hora</span>
            <h1 style={{ fontSize:'2.6em', marginBottom:'8px' }}>
              Claude Code<br />
              <span style={{ color:AC }}>na Prática</span>
            </h1>
            <div className="hr-ac" style={{ margin:'12px auto' }} />
            <p style={{ fontSize:'0.68em', color:DIM, maxWidth:'500px', textAlign:'center' }}>
              Do setup ao squad completo — construindo seu time de agentes de IA
            </p>
            <div className="tr" style={{ justifyContent:'center', marginTop:'22px' }}>
              <span className="tg">Config Global</span>
              <span className="tg dm">/init</span>
              <span className="tg">AIOX</span>
              <span className="tg dm">Agentes</span>
              <span className="tg">Squad Creator</span>
              <span className="tg dm">Obsidian</span>
            </div>
          </S>

          {/* 02 AGENDA */}
          <S n="02">
            <span className="hl">Roteiro · 60 min</span>
            <h2>O que vamos ver hoje</h2>
            <div className="hr" />
            <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', gap:'0' }}>
              <div className="ti"><span className="t">05 min</span><span className="x"><strong>Claude Raiz</strong> — config global vs config do projeto</span></div>
              <div className="ti"><span className="t">10 min</span><span className="x"><strong>A Pasta .claude</strong> — estrutura, CLAUDE.md e o /init</span></div>
              <div className="ti"><span className="t">10 min</span><span className="x"><strong>AIOX</strong> — Agentes, Skills e Integrações (as 3 camadas)</span></div>
              <div className="ti"><span className="t">05 min</span><span className="x"><strong>Estrutura do AIOX</strong> — como está organizado</span></div>
              <div className="ti"><span className="t">10 min</span><span className="x"><strong>Agente Base + Squad Creator</strong> — o libertador</span></div>
              <div className="ti"><span className="t">10 min</span><span className="x"><strong>Claude + Obsidian</strong> — superpoder de memória</span></div>
              <div className="ti"><span className="t">10 min</span><span className="x"><strong>4 Semanas de Resultados</strong> — o que foi construído</span></div>
            </div>
          </S>

          {/* 03 CLAUDE RAIZ */}
          <S n="03">
            <span className="hl">Fundamento</span>
            <h2>Claude Raiz vs Claude do Projeto</h2>
            <div className="hr" />
            <div className="g2" style={{ flex:1, alignContent:'start' }}>
              <div className="cd ac">
                <span className="cdl">~/.claude/ — Global</span>
                <p style={{ marginBottom:'10px' }}>Vai para <strong>todos os projetos</strong>. Sua identidade, preferências e memória pessoal.</p>
                <div className="cb">
                  <span className="k">~/.claude/</span><br/>
                  <span className="c">├─ </span>CLAUDE.md<br/>
                  <span className="c">├─ </span>settings.json<br/>
                  <span className="c">├─ </span>keybindings.json<br/>
                  <span className="c">└─ </span><span className="k">projects/memory/</span>
                </div>
              </div>
              <div className="cd sf">
                <span className="cdl dim">.claude/ — Projeto</span>
                <p style={{ marginBottom:'10px' }}>Específico do <strong>repositório atual</strong>. Regras, agentes e workflows do time.</p>
                <div className="cb dim">
                  <span className="k">.claude/</span><br/>
                  <span className="c">├─ </span>CLAUDE.md<br/>
                  <span className="c">├─ </span>settings.json<br/>
                  <span className="c">└─ </span>rules/<br/>
                  <span className="c">   ├─ </span>agent-authority.md<br/>
                  <span className="c">   └─ </span>workflow-execution.md
                </div>
              </div>
            </div>
            <div className="hb">
              <p>O projeto <strong>herda</strong> o global — e pode <strong>sobrescrever</strong> qualquer regra. Do mais específico para o mais genérico.</p>
            </div>
          </S>

          {/* 04 .CLAUDE + /INIT */}
          <S n="04">
            <span className="hl">Estrutura</span>
            <h2>A Pasta .claude/ e o /init</h2>
            <div className="hr" />
            <div className="g2" style={{ flex:1, alignContent:'start' }}>
              <div>
                <span className="cdl">O que fica aqui</span>
                <div className="ci"><div className="dot" /><span><strong>CLAUDE.md</strong> — instruções lidas a cada sessão</span></div>
                <div className="ci"><div className="dot" /><span><strong>settings.json</strong> — permissões e allow/deny de ferramentas</span></div>
                <div className="ci"><div className="dot" /><span><strong>rules/</strong> — regras contextuais carregadas por arquivo</span></div>
                <div className="ci"><div className="dot" /><span><strong>agents/</strong> — definições de agentes do squad</span></div>
                <div className="hr" style={{ margin:'12px 0' }} />
                <span className="cdl">Por que importa</span>
                <p>É a diferença entre um Claude <strong>genérico</strong> e um que conhece <strong>seu projeto de cor</strong>.</p>
              </div>
              <div>
                <span className="cdl">O comando /init</span>
                <div className="cb">
                  <span className="c"># execute dentro do projeto</span><br/>
                  <span className="k">/init</span>
                </div>
                <div style={{ marginTop:'10px' }}>
                  <div className="ci"><div className="dot" /><span>Lê toda a estrutura do codebase</span></div>
                  <div className="ci"><div className="dot" /><span>Entende stack, padrões e arquitetura</span></div>
                  <div className="ci"><div className="dot" /><span>Gera um <strong>CLAUDE.md documentado</strong></span></div>
                  <div className="ci"><div className="dot" /><span>Claude passa a conhecer o projeto profundamente</span></div>
                </div>
                <div className="hb" style={{ marginTop:'12px' }}>
                  <p><strong>Sempre o primeiro comando</strong> em qualquer projeto novo.</p>
                </div>
              </div>
            </div>
          </S>

          {/* 05 O QUE É O AIOX */}
          <S n="05">
            <span className="hl">AIOX Framework</span>
            <h2>O que é o AIOX?</h2>
            <div className="hr" />
            <p style={{ fontSize:'0.63em', marginBottom:'16px' }}>
              Um <strong>meta-framework</strong> que orquestra agentes de IA para desenvolvimento full stack.
              Não é um produto — é uma <span style={{ color:AC, fontWeight:600 }}>infraestrutura de inteligência</span> para seu time operar.
            </p>
            <div className="g3" style={{ flex:1, alignContent:'start' }}>
              <div className="cd ac">
                <span className="cdl">🤖 Agentes</span>
                <p>Personas com escopo, autoridade e memória. Especialistas que assumem funções reais.</p>
                <div className="tr" style={{ marginTop:'10px' }}>
                  <span className="tg">@dev</span>
                  <span className="tg">@qa</span>
                  <span className="tg">@pm</span>
                  <span className="tg">@devops</span>
                </div>
              </div>
              <div className="cd sf">
                <span className="cdl dim">⚡ Skills</span>
                <p>Comandos reutilizáveis acionados por slash. Capacidades plug-and-play em qualquer projeto.</p>
                <div className="tr" style={{ marginTop:'10px' }}>
                  <span className="tg dm">/init</span>
                  <span className="tg dm">/review</span>
                  <span className="tg dm">/loop</span>
                </div>
              </div>
              <div className="cd green">
                <span className="cdl green">🔌 Integrações</span>
                <p>MCP Servers que expandem os sentidos do Claude para o mundo externo.</p>
                <div className="tr" style={{ marginTop:'10px' }}>
                  <span className="tg gn">Playwright</span>
                  <span className="tg gn">Context7</span>
                  <span className="tg gn">Obsidian</span>
                </div>
              </div>
            </div>
          </S>

          {/* 06 AS 3 CAMADAS */}
          <S n="06">
            <span className="hl">As 3 Camadas</span>
            <h2>Agentes · Skills · Integrações</h2>
            <div className="hr" />
            <div className="g3" style={{ flex:1, alignContent:'start' }}>
              <div className="cd ac">
                <span className="cdl">Agente = Quem faz</span>
                <div className="cb" style={{ marginBottom:'10px' }}>
                  <span className="k">@dev</span>, <span className="k">@qa</span>, <span className="k">@pm</span><br/>
                  <span className="c"># ativado com @nome</span>
                </div>
                <div className="ci"><div className="dot" /><span>Persona + autoridade definidas</span></div>
                <div className="ci"><div className="dot" /><span>Escopo exclusivo de ações</span></div>
                <div className="ci"><div className="dot" /><span>Memória persistente no projeto</span></div>
              </div>
              <div className="cd sf">
                <span className="cdl dim">Skill = O que fazer</span>
                <div className="cb dim" style={{ marginBottom:'10px' }}>
                  <span className="k">/init</span>, <span className="k">/review</span><br/>
                  <span className="c"># ativado com /slash</span>
                </div>
                <div className="ci"><div className="dot dm" /><span>Workflow encapsulado e reutilizável</span></div>
                <div className="ci"><div className="dot dm" /><span>Funciona em qualquer projeto</span></div>
                <div className="ci"><div className="dot dm" /><span>Compartilhável com o time</span></div>
              </div>
              <div className="cd green">
                <span className="cdl green">Integração = Como fazer</span>
                <div className="cb green" style={{ marginBottom:'10px' }}>
                  <span className="k">MCP Server</span><br/>
                  <span className="c"># nova ferramenta nativa</span>
                </div>
                <div className="ci"><div className="dot gn" /><span>Claude ganha novos "sentidos"</span></div>
                <div className="ci"><div className="dot gn" /><span>Browser, DB, APIs, Obsidian</span></div>
                <div className="ci"><div className="dot gn" /><span>Configurado uma vez, global</span></div>
              </div>
            </div>
            <div className="hb" style={{ marginTop:'10px' }}>
              <p>Agentes usam Skills. Skills usam Integrações. Tudo orquestrado pelo AIOX.</p>
            </div>
          </S>

          {/* 07 ESTRUTURA DO AIOX */}
          <S n="07">
            <span className="hl">Arquitetura</span>
            <h2>Estrutura do AIOX</h2>
            <div className="hr" />
            <div className="g2" style={{ flex:1, alignContent:'start' }}>
              <div>
                <span className="cdl">Diretórios</span>
                <div className="cb">
                  <span className="k">.aiox-core/</span>  <span className="c">← framework</span><br/>
                  <span className="c">├─ </span>constitution.md<br/>
                  <span className="c">├─ </span>agents/ &nbsp;<span className="c">templates/ &nbsp;tasks/</span><br/>
                  <br/>
                  <span className="k">docs/stories/</span>  <span className="c">← seu trabalho</span><br/>
                  <span className="k">squads/</span>        <span className="c">← seus times</span><br/>
                  <span className="k">.claude/</span>       <span className="c">← config do projeto</span>
                </div>
              </div>
              <div>
                <span className="cdl">4 Camadas de Proteção</span>
                <div className="ci"><div className="dot" /><span><strong>L1 Core</strong> — nunca modificável (constitution, binários)</span></div>
                <div className="ci"><div className="dot" /><span><strong>L2 Templates</strong> — só extensíveis (tasks, workflows)</span></div>
                <div className="ci"><div className="dot dm" /><span><strong>L3 Config</strong> — mutável (settings, memória de agentes)</span></div>
                <div className="ci"><div className="dot dm" /><span><strong>L4 Runtime</strong> — seu território (stories, squads, code)</span></div>
                <div className="hb" style={{ marginTop:'14px' }}>
                  <p><strong>Story-Driven Development:</strong> todo trabalho começa em <code style={{ fontFamily:'monospace', color:AC }}>docs/stories/</code></p>
                </div>
              </div>
            </div>
          </S>

          {/* 08 ANATOMIA DO AGENTE */}
          <S n="08">
            <span className="hl">Agente Base</span>
            <h2>Anatomia de um Agente</h2>
            <div className="hr" />
            <div className="g2" style={{ flex:1, alignContent:'start' }}>
              <div className="cb" style={{ fontSize:'0.46em', lineHeight:'1.9', margin:0, height:'fit-content' }}>
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
                <span className="c">  - *</span>develop &nbsp;<span className="c">- *</span>review &nbsp;<span className="c">- *</span>exit<br/>
                <br/>
                <span className="k">memory:</span><br/>
                <span className="c">  file: </span>agents/dev/MEMORY.md
              </div>
              <div>
                <span className="cdl">Os 5 Elementos</span>
                <div className="ci"><div className="dot" /><span><strong>Identidade</strong> — nome, persona, tom de voz</span></div>
                <div className="ci"><div className="dot" /><span><strong>Autoridade</strong> — o que pode e não pode fazer</span></div>
                <div className="ci"><div className="dot" /><span><strong>Comandos</strong> — ações com prefixo <code style={{ color:AC, fontFamily:'monospace' }}>*</code></span></div>
                <div className="ci"><div className="dot" /><span><strong>Dependências</strong> — tasks, templates, tools</span></div>
                <div className="ci"><div className="dot" /><span><strong>Memória</strong> — aprende com o projeto</span></div>
                <div className="hb" style={{ marginTop:'16px' }}>
                  <p>Ativação: <code style={{ fontFamily:'monospace', color:AC }}>@dev</code> ou <code style={{ fontFamily:'monospace', color:AC }}>/AIOX:agents:dev</code></p>
                </div>
              </div>
            </div>
          </S>

          {/* 09 SQUAD CREATOR */}
          <S n="09" glowBr>
            <span className="hl">O Libertador</span>
            <h2>Squad Creator</h2>
            <div className="hr" />
            <p style={{ fontSize:'0.63em', marginBottom:'14px' }}>
              O agente que <span style={{ color:AC, fontWeight:700 }}>cria outros agentes</span>.
              Com ele você sai do genérico e constrói <strong>seu time personalizado</strong> para qualquer contexto.
            </p>
            <div className="g2" style={{ flex:1, alignContent:'start' }}>
              <div className="cd ac">
                <span className="cdl">Como funciona</span>
                <div className="ci"><div className="dot" /><span>1. Você descreve o papel que precisa</span></div>
                <div className="ci"><div className="dot" /><span>2. Squad Creator gera a definição completa</span></div>
                <div className="ci"><div className="dot" /><span>3. Agente criado com persona, comandos e memória</span></div>
                <div className="ci"><div className="dot" /><span>4. Disponível imediatamente via <code style={{ color:AC, fontFamily:'monospace' }}>@nome</code></span></div>
              </div>
              <div className="cd sf">
                <span className="cdl dim">Exemplos de squads</span>
                <div className="ci"><div className="dot dm" /><span>Squad de Software Engineering</span></div>
                <div className="ci"><div className="dot dm" /><span>Squad de Marketing &amp; Growth</span></div>
                <div className="ci"><div className="dot dm" /><span>Squad de Sites &amp; Landing Pages</span></div>
                <div className="ci"><div className="dot dm" /><span>Squad de Conteúdo &amp; SEO</span></div>
                <div className="ci"><div className="dot dm" /><span><strong>Qualquer contexto do seu negócio</strong></span></div>
              </div>
            </div>
            <div className="hb" style={{ marginTop:'10px' }}>
              <p>Resultado: um time completo de IA especializado no seu negócio, operando 24/7</p>
            </div>
          </S>

          {/* 10 CLAUDE + OBSIDIAN */}
          <S n="10">
            <span className="hl">Superpoder</span>
            <h2>Claude + Obsidian</h2>
            <div className="hr" />
            <div className="g2" style={{ flex:1, alignContent:'start' }}>
              <div>
                <span className="cdl dim">Sem Obsidian</span>
                <div className="ci"><div className="dot dm" /><span>Cada conversa começa do zero</span></div>
                <div className="ci"><div className="dot dm" /><span>Decisões não são lembradas</span></div>
                <div className="ci"><div className="dot dm" /><span>Contexto repassado manualmente</span></div>
                <div className="ci"><div className="dot dm" /><span>Conhecimento acumulado se perde</span></div>
                <div className="hr" style={{ margin:'12px 0' }} />
                <span className="cdl">Com a Integração MCP</span>
                <div className="ci"><div className="dot" /><span>Claude lê e escreve no seu vault</span></div>
                <div className="ci"><div className="dot" /><span>Decisões ficam registradas automaticamente</span></div>
                <div className="ci"><div className="dot" /><span>Knowledge base cresce a cada sessão</span></div>
                <div className="ci"><div className="dot" /><span>Busca semântica no seu conhecimento</span></div>
              </div>
              <div>
                <span className="cdl">Configuração</span>
                <div className="cb">
                  <span className="c"># ~/.claude/settings.json</span><br/>
                  <span className="k">"mcpServers"</span>: &#123;<br/>
                  <span className="c">  "</span><span className="k">obsidian</span><span className="c">"</span>: &#123;<br/>
                  <span className="c">    "command"</span>: <span className="s">"obsidian-mcp"</span>,<br/>
                  <span className="c">    "vault"</span>: <span className="s">"/seu/vault"</span><br/>
                  &nbsp;&nbsp;&#125;<br/>
                  &#125;
                </div>
                <div className="hb" style={{ marginTop:'12px' }}>
                  <p>Configurado uma vez no <code style={{ fontFamily:'monospace', color:AC }}>~/.claude/</code> → ativo em todos os projetos. Claude vira um <strong>segundo cérebro conectado ao seu</strong>.</p>
                </div>
              </div>
            </div>
          </S>

          {/* 11 4 SEMANAS */}
          <S n="11" glowBr>
            <span className="hl">Prova de Conceito</span>
            <h2>O que fiz em <span style={{ color:AC }}>4 semanas</span></h2>
            <div className="hr" />
            <div className="g3" style={{ marginBottom:'14px' }}>
              <div className="cd ac st"><span className="n">3</span><span className="l">Squads criadas</span></div>
              <div className="cd sf st"><span className="n">20+</span><span className="l">Agentes ativos</span></div>
              <div className="cd sf st"><span className="n" style={{ fontSize:'1.8em' }}>24/7</span><span className="l">Time operando</span></div>
            </div>
            <div className="g2" style={{ flex:1, alignContent:'start' }}>
              <div>
                <div className="ci"><div className="dot" /><span>Site completo da mentoria Claude Code + AIOX</span></div>
                <div className="ci"><div className="dot" /><span>Squad <strong>themaestrisites</strong> — 8 agentes, sites e LPs</span></div>
                <div className="ci"><div className="dot" /><span><strong>n8n Killers Squad</strong> — guia interativo publicado</span></div>
              </div>
              <div>
                <div className="ci"><div className="dot dm" /><span>AIOX rodando como infra de desenvolvimento completa</span></div>
                <div className="ci"><div className="dot dm" /><span>Sistema de memória com Obsidian integrado</span></div>
                <div className="ci"><div className="dot dm" /><span>Este workshop — criado em minutos com o squad</span></div>
              </div>
            </div>
          </S>

          {/* 12 PITCH MENTORIA */}
          <S n="12" center>
            <span className="bdg alert">⚠ Apenas 3 Vagas Restantes</span>
            <h2 style={{ textAlign:'center', fontSize:'1.7em', marginBottom:'6px' }}>
              Mentoria Claude Code <span style={{ color:AC }}>+ AIOX</span>
            </h2>
            <p style={{ textAlign:'center', fontSize:'0.62em', color:DIM, maxWidth:'500px', margin:'8px auto 18px' }}>
              Tudo que você viu hoje — do zero ao squad completo rodando no seu negócio —
              em <strong>4 semanas</strong>, com acompanhamento ao vivo.
            </p>
            <div className="g3" style={{ width:'100%', maxWidth:'540px', marginBottom:'16px' }}>
              <div className="cd ac st"><span className="n" style={{ fontSize:'1.7em' }}>12/05</span><span className="l">Início · Terça</span></div>
              <div className="cd sf st"><span className="n" style={{ fontSize:'1.7em' }}>4</span><span className="l">Semanas</span></div>
              <div className="cd" style={{ borderColor:'rgba(255,68,0,0.4)', background:'rgba(255,68,0,0.08)' }}>
                <span className="n" style={{ fontSize:'1.7em', display:'block', textAlign:'center', lineHeight:1, fontFamily:SANS, fontWeight:800, color:AC }}>3</span>
                <span className="l" style={{ color:AC }}>Vagas restantes</span>
              </div>
            </div>
            <p style={{ fontSize:'0.46em', color:DIMX, fontFamily:MONO, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'14px' }}>
              Turma super seleta · máximo 15 projetos · suporte individual
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:'18px' }}>
              <div style={{ padding:'7px', background:WHITE }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=88x88&data=https://opensource.growthsales.ai/mentoria&color=08080C&bgcolor=ffffff" alt="QR" width={88} height={88} style={{ display:'block' }} />
              </div>
              <div style={{ textAlign:'left' }}>
                <p style={{ color:AC, fontFamily:MONO, fontSize:'0.62em', fontWeight:700, letterSpacing:'0.04em', margin:0 }}>
                  opensource.growthsales.ai/mentoria
                </p>
                <p style={{ color:DIMX, fontFamily:MONO, fontSize:'0.44em', margin:'5px 0 0', letterSpacing:'0.07em', textTransform:'uppercase' }}>
                  Aponte a câmera · Garanta sua vaga
                </p>
              </div>
            </div>
          </S>

        </div>
      </div>
    </>
  );
}
