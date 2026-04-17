'use client';

import { useEffect, useRef, useState } from 'react';

const REVEAL_CDN = 'https://cdn.jsdelivr.net/npm/reveal.js@5.0.4';

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

    return () => {
      linkReveal.remove();
      linkTheme.remove();
      script.remove();
    };
  }, []);

  useEffect(() => {
    if (!ready || !deckRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Reveal = (window as any).Reveal;
    if (!Reveal) return;

    const deck = new Reveal(deckRef.current, {
      hash: true,
      controls: true,
      progress: true,
      center: true,
      transition: 'slide',
    });

    deck.initialize();

    return () => {
      try { deck.destroy(); } catch { /* already destroyed */ }
    };
  }, [ready]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .reveal-presentation { width: 100vw; height: 100vh; }
            .reveal .slides section {
              text-align: left;
              padding: 40px 60px;
            }
            .reveal .slides section h1,
            .reveal .slides section h2 {
              text-transform: none;
              font-family: var(--font-sans), system-ui, sans-serif;
              font-weight: 700;
              color: #fff;
            }
            .reveal .slides section h1 { font-size: 2.4em; line-height: 1.15; }
            .reveal .slides section h2 { font-size: 1.8em; margin-bottom: 0.6em; }
            .reveal .slides section p,
            .reveal .slides section li {
              font-size: 0.7em;
              line-height: 1.6;
              color: #d4d4d8;
            }
            .badge {
              display: inline-block;
              border: 1px solid rgba(255,68,0,0.3);
              background: rgba(255,68,0,0.1);
              color: #FF4400;
              padding: 4px 16px;
              border-radius: 9999px;
              font-family: var(--font-mono), ui-monospace, monospace;
              font-size: 0.55em;
              font-weight: 500;
              letter-spacing: 0.02em;
              margin-bottom: 16px;
            }
            .check { color: #FF4400; margin-right: 8px; font-weight: 700; }
            .subtitle {
              font-size: 0.75em !important;
              color: #a1a1aa !important;
              margin-top: -8px;
              margin-bottom: 24px;
            }
            .two-col {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 24px;
              margin: 16px 0;
            }
            .three-col {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 16px;
              margin: 16px 0;
            }
            .col-title {
              font-size: 0.6em;
              color: #FF4400;
              font-weight: 600;
              font-family: var(--font-mono), ui-monospace, monospace;
              margin-bottom: 8px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            .code-box {
              background: rgba(255,255,255,0.04);
              border: 1px solid rgba(255,255,255,0.10);
              border-radius: 8px;
              padding: 14px 20px;
              font-family: var(--font-mono), ui-monospace, monospace;
              font-size: 0.55em;
              color: #a1a1aa;
              margin: 8px 0;
              line-height: 1.8;
            }
            .code-box .hl { color: #FF4400; }
            .code-box .dim { color: #52525b; }
            .card {
              border: 1px solid rgba(255,255,255,0.08);
              border-radius: 10px;
              padding: 16px 20px;
              background: rgba(255,255,255,0.02);
            }
            .card .card-title {
              font-size: 0.65em;
              font-weight: 700;
              color: #fff;
              margin-bottom: 8px;
            }
            .card p { font-size: 0.58em !important; color: #a1a1aa; margin: 4px 0; }
            .card.orange { border-color: rgba(255,68,0,0.35); background: rgba(255,68,0,0.05); }
            .card.orange .card-title { color: #FF4400; }
            .tag {
              font-family: var(--font-mono), ui-monospace, monospace;
              font-size: 0.48em;
              background: rgba(255,68,0,0.1);
              border: 1px solid rgba(255,68,0,0.2);
              color: #FF4400;
              padding: 3px 10px;
              border-radius: 6px;
              margin: 3px 2px;
              display: inline-block;
            }
            .tag.neutral {
              background: rgba(255,255,255,0.04);
              border-color: rgba(255,255,255,0.12);
              color: #a1a1aa;
            }
            .tag.green {
              background: rgba(34,197,94,0.08);
              border-color: rgba(34,197,94,0.25);
              color: #4ade80;
            }
            .deliverable {
              margin-top: 20px;
              padding: 14px 18px;
              border-left: 3px solid #FF4400;
              background: rgba(255,68,0,0.05);
              border-radius: 0 8px 8px 0;
            }
            .deliverable .label {
              font-size: 0.48em;
              color: #FF4400;
              font-family: var(--font-mono), ui-monospace, monospace;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            .deliverable .value { font-size: 0.62em; color: #fff; margin-top: 4px; }
            .timeline-item {
              display: flex;
              align-items: baseline;
              gap: 12px;
              margin: 7px 0;
            }
            .timeline-item .time {
              font-family: var(--font-mono), ui-monospace, monospace;
              font-size: 0.48em;
              color: #FF4400;
              min-width: 48px;
            }
            .timeline-item .text { font-size: 0.65em; color: #d4d4d8; }
            .big-number {
              font-size: 2.2em;
              font-weight: 800;
              color: #FF4400;
              display: block;
              line-height: 1;
            }
            .stat-box {
              border: 1px solid rgba(255,255,255,0.12);
              border-radius: 8px;
              padding: 16px;
              text-align: center;
            }
            .stat-box .label { font-size: 0.5em; color: #a1a1aa; font-family: var(--font-mono), ui-monospace, monospace; display: block; margin-top: 4px; }
            .highlight-line {
              background: rgba(255,68,0,0.08);
              border: 1px solid rgba(255,68,0,0.2);
              border-radius: 6px;
              padding: 10px 16px;
              font-size: 0.65em;
              color: #FF4400;
              font-weight: 600;
              margin: 10px 0;
            }
          `,
        }}
      />

      <div className="reveal reveal-presentation" ref={deckRef}>
        <div className="slides">

          {/* ── SLIDE 1: COVER ── */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <div style={{ textAlign: 'center' }}>
              <span className="badge">WORKSHOP · 1 HORA</span>
              <h1 style={{ textAlign: 'center', fontSize: '2.2em' }}>
                Claude Code<br />
                <span style={{ color: '#FF4400' }}>na Prática</span>
              </h1>
              <p style={{ textAlign: 'center', color: '#a1a1aa', fontSize: '0.75em', marginTop: '8px' }}>
                Do setup ao squad creator — construindo seu time de agentes de IA
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
                <span className="tag">Config Global</span>
                <span className="tag">AIOX Framework</span>
                <span className="tag">Agentes</span>
                <span className="tag">Skills</span>
                <span className="tag">Squad Creator</span>
                <span className="tag">Obsidian</span>
              </div>
            </div>
          </section>

          {/* ── SLIDE 2: AGENDA ── */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">ROTEIRO · 60 MIN</span>
            <h2>O que vamos ver hoje</h2>
            <div className="timeline-item"><span className="time">5 min</span><span className="text"><strong>Claude raiz</strong> — config global vs config do projeto</span></div>
            <div className="timeline-item"><span className="time">10 min</span><span className="text"><strong>A pasta .claude</strong> — estrutura, CLAUDE.md e o <code style={{color:'#FF4400',fontFamily:'monospace'}}>/init</code></span></div>
            <div className="timeline-item"><span className="time">10 min</span><span className="text"><strong>AIOX — Agentes, Skills e Integrações</strong> — as 3 camadas</span></div>
            <div className="timeline-item"><span className="time">5 min</span><span className="text"><strong>Estrutura do AIOX</strong> — como está organizado</span></div>
            <div className="timeline-item"><span className="time">10 min</span><span className="text"><strong>Agente base + Squad Creator</strong> — o libertador</span></div>
            <div className="timeline-item"><span className="time">10 min</span><span className="text"><strong>Claude + Obsidian</strong> — superpoder de memória</span></div>
            <div className="timeline-item"><span className="time">10 min</span><span className="text"><strong>4 semanas de resultados</strong> — o que foi construído</span></div>
          </section>

          {/* ── SLIDE 3: CLAUDE RAIZ VS PROJETO ── */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">FUNDAMENTO</span>
            <h2>Claude Raiz vs Claude do Projeto</h2>
            <p className="subtitle">Dois níveis de configuração que se somam</p>
            <div className="two-col">
              <div className="card orange">
                <div className="card-title">~/.claude/ — Global</div>
                <p>Vai para <strong>todos os projetos</strong></p>
                <p>Sua identidade, preferências, memória</p>
                <div className="code-box" style={{marginTop:'10px'}}>
                  <span className="hl">~/.claude/</span><br/>
                  <span className="dim">├─ </span>CLAUDE.md<br/>
                  <span className="dim">├─ </span>settings.json<br/>
                  <span className="dim">├─ </span>keybindings.json<br/>
                  <span className="dim">└─ </span>projects/<br/>
                  <span className="dim">   └─ </span>memory/
                </div>
              </div>
              <div className="card">
                <div className="card-title">.claude/ — Projeto</div>
                <p>Específico do <strong>repositório atual</strong></p>
                <p>Regras, agentes, workflows do time</p>
                <div className="code-box" style={{marginTop:'10px'}}>
                  <span className="hl">.claude/</span><br/>
                  <span className="dim">├─ </span>CLAUDE.md<br/>
                  <span className="dim">├─ </span>settings.json<br/>
                  <span className="dim">└─ </span>rules/<br/>
                  <span className="dim">   ├─ </span>agent-authority.md<br/>
                  <span className="dim">   └─ </span>workflow.md
                </div>
              </div>
            </div>
            <div className="highlight-line">
              O projeto herda o global — e pode sobrescrever qualquer regra
            </div>
          </section>

          {/* ── SLIDE 4: A PASTA .CLAUDE + /INIT ── */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">ESTRUTURA</span>
            <h2>A Pasta <code style={{color:'#FF4400',fontFamily:'monospace'}}>.claude/</code></h2>
            <p className="subtitle">O cérebro do Claude no seu projeto</p>
            <div className="two-col">
              <div>
                <div className="col-title">O que fica aqui</div>
                <p><span className="check">&#10003;</span> <strong>CLAUDE.md</strong> — instruções que o Claude lê a cada sessão</p>
                <p><span className="check">&#10003;</span> <strong>settings.json</strong> — permissões, allow/deny de ferramentas</p>
                <p><span className="check">&#10003;</span> <strong>rules/</strong> — regras contextuais carregadas por arquivo</p>
                <p><span className="check">&#10003;</span> <strong>agents/</strong> — definições de agentes customizados</p>
              </div>
              <div>
                <div className="col-title">O comando /init</div>
                <div className="code-box">
                  <span className="hl">/init</span>
                </div>
                <p>Lê todo o codebase atual</p>
                <p>Entende a estrutura, stack, padrões</p>
                <p>Gera um <strong>CLAUDE.md documentado</strong></p>
                <p>Claude passa a conhecer o projeto profundamente</p>
              </div>
            </div>
            <div className="deliverable">
              <div className="label">Por que é importante</div>
              <div className="value">É a diferença entre um Claude genérico e um Claude que conhece seu projeto de cor</div>
            </div>
          </section>

          {/* ── SLIDE 5: AIOX CONTEXTO GERAL ── */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">AIOX FRAMEWORK</span>
            <h2>O que é o AIOX?</h2>
            <p style={{marginBottom:'20px'}}>
              Um <strong>meta-framework</strong> que orquestra agentes de IA para desenvolvimento full stack.
              Não é um produto — é uma <span style={{color:'#FF4400'}}>infraestrutura de inteligência</span> para seu time.
            </p>
            <div className="three-col">
              <div className="card orange">
                <div className="card-title">🤖 Agentes</div>
                <p>Personas com escopo, comandos e memória</p>
                <p>Especialistas que assumem funções específicas</p>
                <div style={{marginTop:'10px'}}>
                  <span className="tag">@dev</span>
                  <span className="tag">@qa</span>
                  <span className="tag">@pm</span>
                  <span className="tag">@devops</span>
                </div>
              </div>
              <div className="card">
                <div className="card-title">⚡ Skills</div>
                <p>Comandos reutilizáveis acionados por slash</p>
                <p>Capacidades plug-and-play</p>
                <div style={{marginTop:'10px'}}>
                  <span className="tag neutral">/init</span>
                  <span className="tag neutral">/review</span>
                  <span className="tag neutral">/pdf</span>
                  <span className="tag neutral">/loop</span>
                </div>
              </div>
              <div className="card">
                <div className="card-title">🔌 Integrações</div>
                <p>MCP Servers que expandem os sentidos do Claude</p>
                <p>Ferramentas externas nativas</p>
                <div style={{marginTop:'10px'}}>
                  <span className="tag green">Playwright</span>
                  <span className="tag green">Context7</span>
                  <span className="tag green">Obsidian</span>
                </div>
              </div>
            </div>
          </section>

          {/* ── SLIDE 6: DIFERENÇA AGENTES VS SKILLS VS INTEGRACOES ── */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">AS 3 CAMADAS</span>
            <h2>Agentes · Skills · Integrações</h2>
            <p className="subtitle">Cada camada tem um papel diferente</p>
            <div style={{marginTop:'8px'}}>
              <div className="two-col" style={{gap:'16px'}}>
                <div>
                  <div className="code-box">
                    <span className="hl">AGENTE</span> = quem faz<br/>
                    <span className="dim">Persona + autoridade + memória</span><br/>
                    <span className="dim">Ativado com </span><span className="hl">@nome</span><br/>
                    <span className="dim">Tem escopo exclusivo de ações</span>
                  </div>
                  <div className="code-box">
                    <span className="hl">SKILL</span> = o que fazer<br/>
                    <span className="dim">Workflow encapsulado + reutilizável</span><br/>
                    <span className="dim">Ativado com </span><span className="hl">/comando</span><br/>
                    <span className="dim">Funciona em qualquer projeto</span>
                  </div>
                </div>
                <div>
                  <div className="code-box">
                    <span className="hl">INTEGRAÇÃO</span> = como fazer<br/>
                    <span className="dim">MCP Server = nova ferramenta nativa</span><br/>
                    <span className="dim">Claude ganha novos "sentidos"</span><br/>
                    <span className="dim">Browser, DB, APIs, Obsidian...</span>
                  </div>
                  <div className="highlight-line" style={{marginTop:'12px'}}>
                    Agentes usam Skills.<br/>
                    Skills usam Integrações.<br/>
                    Tudo orquestrado pelo AIOX.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── SLIDE 7: ESTRUTURA DO AIOX ── */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">ARQUITETURA</span>
            <h2>Estrutura do AIOX</h2>
            <p className="subtitle">4 camadas — do framework ao seu projeto</p>
            <div className="two-col">
              <div>
                <div className="code-box">
                  <span className="hl">.aiox-core/</span>  <span className="dim">← framework</span><br/>
                  <span className="dim">├─ </span>constitution.md<br/>
                  <span className="dim">├─ </span>agents/    <span className="dim">← personas</span><br/>
                  <span className="dim">├─ </span>tasks/     <span className="dim">← workflows</span><br/>
                  <span className="dim">├─ </span>templates/ <span className="dim">← modelos</span><br/>
                  <span className="dim">└─ </span>rules/     <span className="dim">← padrões</span><br/><br/>
                  <span className="hl">docs/stories/</span>  <span className="dim">← seu trabalho</span><br/>
                  <span className="hl">squads/</span>        <span className="dim">← seus times</span>
                </div>
              </div>
              <div>
                <div className="col-title">Camadas de proteção</div>
                <p><span className="check">&#10003;</span> <strong>L1</strong> — Core nunca modificável</p>
                <p><span className="check">&#10003;</span> <strong>L2</strong> — Templates só extensíveis</p>
                <p><span className="check">&#10003;</span> <strong>L3</strong> — Config do projeto mutável</p>
                <p><span className="check">&#10003;</span> <strong>L4</strong> — Runtime é o seu território</p>
                <div className="highlight-line" style={{marginTop:'16px'}}>
                  Story-Driven Development:<br/>
                  todo trabalho começa em <code style={{fontFamily:'monospace'}}>docs/stories/</code>
                </div>
              </div>
            </div>
          </section>

          {/* ── SLIDE 8: ANATOMIA DO AGENTE ── */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">AGENTE BASE</span>
            <h2>Anatomia de um Agente</h2>
            <p className="subtitle">O que faz um agente ser inteligente</p>
            <div className="two-col">
              <div>
                <div className="code-box">
                  <span className="hl">agent:</span><br/>
                  <span className="dim">  name: </span>Dex<br/>
                  <span className="dim">  id: </span>dev<br/>
                  <span className="dim">  title: </span>Lead Developer<br/><br/>
                  <span className="hl">persona:</span><br/>
                  <span className="dim">  role: </span>Implementação de código<br/>
                  <span className="dim">  tone: </span>Técnico, direto<br/><br/>
                  <span className="hl">commands:</span><br/>
                  <span className="dim">  - </span>*develop<br/>
                  <span className="dim">  - </span>*review<br/>
                  <span className="dim">  - </span>*exit<br/><br/>
                  <span className="hl">memory:</span><br/>
                  <span className="dim">  file: </span>agents/dev/MEMORY.md
                </div>
              </div>
              <div>
                <div className="col-title">Os 5 elementos</div>
                <p><span className="check">&#10003;</span> <strong>Identidade</strong> — nome, persona, tom</p>
                <p><span className="check">&#10003;</span> <strong>Autoridade</strong> — o que pode e não pode fazer</p>
                <p><span className="check">&#10003;</span> <strong>Comandos</strong> — ações com prefixo <code style={{color:'#FF4400',fontFamily:'monospace'}}>*</code></p>
                <p><span className="check">&#10003;</span> <strong>Dependências</strong> — tasks, templates, tools</p>
                <p><span className="check">&#10003;</span> <strong>Memória</strong> — aprende com o projeto</p>
                <div className="highlight-line" style={{marginTop:'16px'}}>
                  Ativação: <code style={{fontFamily:'monospace',color:'#FF4400'}}>@dev</code> ou <code style={{fontFamily:'monospace',color:'#FF4400'}}>/AIOX:agents:dev</code>
                </div>
              </div>
            </div>
          </section>

          {/* ── SLIDE 9: SQUAD CREATOR ── */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">O LIBERTADOR</span>
            <h2>Squad Creator</h2>
            <p style={{marginBottom:'16px'}}>
              O agente que <span style={{color:'#FF4400', fontWeight:700}}>cria outros agentes</span>.
              Com ele você sai do framework genérico e constrói <strong>seu time personalizado</strong>.
            </p>
            <div className="two-col">
              <div className="card orange">
                <div className="card-title">Como funciona</div>
                <p>1. Você descreve o papel que precisa</p>
                <p>2. Squad Creator gera a definição completa</p>
                <p>3. Agente criado já vem com persona, comandos e memória</p>
                <p>4. Disponível imediatamente via <code style={{color:'#FF4400',fontFamily:'monospace'}}>@nome</code></p>
              </div>
              <div className="card">
                <div className="card-title">Exemplos de squads</div>
                <p><span className="check">&#10003;</span> Squad de Software Engineering</p>
                <p><span className="check">&#10003;</span> Squad de Marketing &amp; Growth</p>
                <p><span className="check">&#10003;</span> Squad de Sites &amp; Landing Pages</p>
                <p><span className="check">&#10003;</span> Squad de Conteúdo &amp; SEO</p>
                <p><span className="check">&#10003;</span> <strong>Qualquer contexto do seu negócio</strong></p>
              </div>
            </div>
            <div className="deliverable">
              <div className="label">Resultado</div>
              <div className="value">Um time completo de IA especializado no seu negócio, operando 24h</div>
            </div>
          </section>

          {/* ── SLIDE 10: CLAUDE + OBSIDIAN ── */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">SUPERPODER</span>
            <h2>Claude + Obsidian</h2>
            <p className="subtitle">Memória inteligente que cresce com você</p>
            <div className="two-col">
              <div>
                <div className="col-title">O problema sem Obsidian</div>
                <p>Cada conversa começa do zero</p>
                <p>Claude não lembra de decisões anteriores</p>
                <p>Contexto precisa ser repassado manualmente</p>
                <p>Conhecimento acumulado se perde</p>
              </div>
              <div>
                <div className="col-title">Com a integração MCP</div>
                <p><span className="check">&#10003;</span> Claude lê e escreve no seu vault</p>
                <p><span className="check">&#10003;</span> Decisões ficam registradas automaticamente</p>
                <p><span className="check">&#10003;</span> Knowledge base cresce a cada sessão</p>
                <p><span className="check">&#10003;</span> Busca semântica no seu conhecimento</p>
              </div>
            </div>
            <div className="code-box" style={{marginTop:'16px'}}>
              <span className="dim"># MCP configurado uma vez → ativo em todos os projetos</span><br/>
              <span className="hl">obsidian-mcp</span> <span className="dim">→ lê/escreve notas · cria links · busca no vault</span><br/>
              <span className="dim">Claude se torna um </span><span className="hl">segundo cérebro conectado ao seu</span>
            </div>
          </section>

          {/* ── SLIDE 11: 4 SEMANAS DE RESULTADOS ── */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <span className="badge">PROVA DE CONCEITO</span>
            <h2>O que fiz em 4 semanas</h2>
            <p className="subtitle">Usando exatamente essa base que você acabou de ver</p>
            <div className="three-col">
              <div className="stat-box">
                <span className="big-number">3</span>
                <span className="label">Squads criadas</span>
              </div>
              <div className="stat-box">
                <span className="big-number">20+</span>
                <span className="label">Agentes ativos</span>
              </div>
              <div className="stat-box">
                <span className="big-number">∞</span>
                <span className="label">Leverage</span>
              </div>
            </div>
            <div style={{marginTop:'20px'}}>
              <p><span className="check">&#10003;</span> Site completo da mentoria Claude Code + AIOX</p>
              <p><span className="check">&#10003;</span> Squad themaestrisites — 8 agentes orquestrando sites e LPs</p>
              <p><span className="check">&#10003;</span> n8n Killers Squad — guia interativo publicado</p>
              <p><span className="check">&#10003;</span> AIOX rodando como infra de desenvolvimento do zero</p>
              <p><span className="check">&#10003;</span> Este workshop — criado em minutos com o squad</p>
            </div>
          </section>

          {/* ── SLIDE 12: ENCERRAMENTO ── */}
          <section data-background-gradient="linear-gradient(135deg, #08080C 0%, #0D0D14 50%, #1a0a00 100%)">
            <div style={{ textAlign: 'center' }}>
              <span className="badge">PRÓXIMOS PASSOS</span>
              <h2 style={{ textAlign: 'center' }}>Você está a um <span style={{ color: '#FF4400' }}>/init</span> de distância</h2>
              <p style={{ textAlign: 'center', color: '#a1a1aa', fontSize: '0.7em', maxWidth: '560px', margin: '12px auto 28px' }}>
                Tudo que você viu hoje leva menos de uma tarde para configurar.
                A mentoria te leva do setup ao squad completo em 4 semanas.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div className="card" style={{ minWidth: '180px', textAlign: 'center' }}>
                  <div className="card-title" style={{ color: '#FF4400', textAlign: 'center', fontSize: '0.7em' }}>Instalar Claude Code</div>
                  <div className="code-box" style={{ textAlign: 'left', marginTop: '8px' }}>
                    <span className="hl">npm i -g @anthropic-ai/claude-code</span>
                  </div>
                </div>
                <div className="card" style={{ minWidth: '180px', textAlign: 'center' }}>
                  <div className="card-title" style={{ color: '#FF4400', textAlign: 'center', fontSize: '0.7em' }}>Iniciar no projeto</div>
                  <div className="code-box" style={{ textAlign: 'left', marginTop: '8px' }}>
                    <span className="hl">cd meu-projeto<br/>claude<br/>/init</span>
                  </div>
                </div>
              </div>
              <p style={{ textAlign: 'center', color: '#52525b', fontSize: '0.5em', marginTop: '24px', fontFamily: 'monospace' }}>
                joaoguirunas.com/mentoria
              </p>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
