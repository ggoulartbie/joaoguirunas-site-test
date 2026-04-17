"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────
   DOT GRID (canvas)
───────────────────────────────────────── */
const DotGrid: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const draw = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillStyle = "rgba(255,255,255,0.07)";
      for (let x = 0; x < c.width; x += 26)
        for (let y = 0; y < c.height; y += 26) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);
  return <canvas ref={ref} className="absolute inset-0 z-0 pointer-events-none opacity-50" />;
};

/* ─────────────────────────────────────────
   CORNER BRACKET
───────────────────────────────────────── */
const Corner: React.FC<{ pos: "tl" | "br" }> = ({ pos }) => (
  <div className={cn("absolute z-20 pointer-events-none", pos === "tl" ? "top-6 left-6" : "bottom-6 right-6")}>
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" className={pos === "br" ? "rotate-180" : ""}>
      <path d="M0 18V0H18" stroke="#FF4400" strokeWidth="1.5" />
    </svg>
  </div>
);

/* ─────────────────────────────────────────
   COCKPIT SLIDE WRAPPER
───────────────────────────────────────── */
interface SlideProps {
  n: number;
  total: number;
  label?: string;
  children: React.ReactNode;
  center?: boolean;
}
const Slide: React.FC<SlideProps> = ({ n, total, label = "CLAUDE CODE WORKSHOP", children, center }) => (
  <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: "#08080C" }}>
    <DotGrid />
    {/* radial glow — subtle, top-left only */}
    <div className="absolute inset-0 z-0 pointer-events-none"
      style={{ background: "radial-gradient(ellipse 40% 35% at 15% 15%, rgba(255,68,0,0.04) 0%, transparent 65%)" }} />
    <Corner pos="tl" /><Corner pos="br" />
    {/* hud label */}
    <div className="absolute top-7 left-20 z-20 font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: "#FF4400", fontFamily: "'Roboto Mono',monospace" }}>
      {label}
    </div>
    {/* accent line top */}
    <div className="absolute top-[54px] left-20 w-28 h-[1.5px] z-20" style={{ background: "#FF4400" }} />
    {/* content */}
    <div className={cn("relative z-10 h-full px-20 pt-20 pb-16 flex flex-col", center && "items-center justify-center text-center")}>
      {children}
    </div>
    {/* slide number */}
    <div className="absolute bottom-7 right-20 z-20 font-mono text-[11px] tracking-[0.15em]" style={{ color: "rgba(255,68,0,0.55)", fontFamily: "'Roboto Mono',monospace" }}>
      {String(n).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </div>
    {/* accent line bottom */}
    <div className="absolute bottom-[54px] right-20 w-20 h-[1.5px] z-20" style={{ background: "rgba(255,68,0,0.35)" }} />
  </div>
);

/* ─────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────── */
const AC = "#FF4400";
const DIM = "rgba(255,255,255,0.48)";
const BORDER = "rgba(255,255,255,0.07)";
const MONO = "'Roboto Mono',monospace";
const SURFACE = "rgba(255,255,255,0.025)";
const DARK_CARD = "#0C0C10";

/* small helpers */
const Label = ({ children, dim }: { children: React.ReactNode; dim?: boolean }) => (
  <span className="block mb-2 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: dim ? DIM : AC, fontFamily: MONO }}>{children}</span>
);
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[2.1rem] font-black uppercase leading-none tracking-tight text-white mb-0" style={{ fontFamily: "var(--font-bb-display),'Inter',sans-serif", letterSpacing: "-0.02em" }}>
    {children}
  </h2>
);
const HR = () => <div className="my-3 h-px" style={{ background: BORDER }} />;
const HRac = () => <div className="mt-2 mb-4 h-[2px] w-10" style={{ background: AC }} />;
const Card = ({ children, accent, surface, className }: { children: React.ReactNode; accent?: boolean; surface?: boolean; className?: string }) => (
  <div className={cn("p-4", className)} style={{ background: DARK_CARD, borderLeft: accent ? `2px solid ${AC}` : `1px solid ${BORDER}`, borderTop: accent ? `1px solid rgba(255,68,0,0.15)` : `1px solid ${BORDER}`, borderRight: accent ? `1px solid rgba(255,68,0,0.08)` : `1px solid ${BORDER}`, borderBottom: accent ? `1px solid rgba(255,68,0,0.08)` : `1px solid ${BORDER}` }}>
    {children}
  </div>
);
const Dot = ({ dim }: { dim?: boolean }) => (
  <div className="mt-[7px] flex-shrink-0 w-[4px] h-[4px]" style={{ background: dim ? "rgba(255,255,255,0.22)" : AC }} />
);
const Li = ({ children, dim }: { children: React.ReactNode; dim?: boolean }) => (
  <div className="flex items-start gap-2 my-[5px]">
    <Dot dim={dim} />
    <span className="text-[13px] leading-snug" style={{ color: DIM }}>{children}</span>
  </div>
);
const Code = ({ children, dim, className, style }: { children: React.ReactNode; dim?: boolean; className?: string; style?: React.CSSProperties }) => (
  <div className={cn("p-3 font-mono text-[11px] leading-[1.95]", className)} style={{ background: "#070709", borderLeft: `2px solid ${dim ? "rgba(255,255,255,0.15)" : AC}`, border: `1px solid ${dim ? BORDER : "rgba(255,68,0,0.1)"}`, borderLeftWidth: "2px", color: "rgba(255,255,255,0.42)", fontFamily: MONO, ...style }}>
    {children}
  </div>
);
const K = ({ children }: { children: React.ReactNode }) => <span style={{ color: AC }}>{children}</span>;
const C = ({ children }: { children: React.ReactNode }) => <span style={{ color: "rgba(255,255,255,0.2)" }}>{children}</span>;
const Tag = ({ children, dim, green }: { children: React.ReactNode; dim?: boolean; green?: boolean }) => (
  <span className="inline-block font-mono text-[10px] tracking-[0.07em] uppercase px-[9px] py-[3px]" style={{ fontFamily: MONO, border: `1px solid ${green ? "rgba(34,197,94,0.25)" : dim ? BORDER : "rgba(255,68,0,0.25)"}`, background: green ? "rgba(34,197,94,0.05)" : dim ? "rgba(255,255,255,0.02)" : "rgba(255,68,0,0.05)", color: green ? "#4ade80" : dim ? DIM : AC }}>
    {children}
  </span>
);
const Stat = ({ n, l, accent }: { n: string; l: string; accent?: boolean }) => (
  <div className={cn("p-4 border text-center", accent ? "border-[rgba(255,68,0,0.35)] bg-[rgba(255,68,0,0.07)]" : "border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.025)]")}>
    <div className="font-black leading-none mb-1 text-[2.2rem]" style={{ fontFamily: "var(--font-bb-display),'Inter',sans-serif", color: AC }}>{n}</div>
    <div className="font-mono text-[10px] tracking-[0.1em] uppercase" style={{ color: DIM, fontFamily: MONO }}>{l}</div>
  </div>
);
const TItem = ({ time, children }: { time: string; children: React.ReactNode }) => (
  <div className="flex items-baseline gap-4 py-[7px] border-b" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
    <span className="font-mono text-[10px] tracking-wide min-w-[44px]" style={{ color: AC, fontFamily: MONO }}>{time}</span>
    <span className="text-[13px]" style={{ color: DIM }}>{children}</span>
  </div>
);

/* ─────────────────────────────────────────
   SLIDES CONTENT
───────────────────────────────────────── */
const TOTAL = 12;

const slides = [
  /* 01 — COVER */
  <Slide key={1} n={1} total={TOTAL} center>
    <div className="flex flex-col items-center gap-4 max-w-3xl">
      <span className="inline-block font-mono text-[10px] tracking-[0.18em] uppercase px-4 py-2" style={{ fontFamily: MONO, border: "1px solid rgba(255,68,0,0.4)", background: "rgba(255,68,0,0.08)", color: AC }}>Workshop · 1 Hora</span>
      <h1 className="text-[5.5rem] font-black uppercase leading-none text-white text-center" style={{ fontFamily: "var(--font-bb-display),'Inter',sans-serif", letterSpacing: "-0.03em" }}>
        Claude<br /><span style={{ color: AC }}>Code</span>
      </h1>
      <p className="text-[1rem] font-light" style={{ color: DIM }}>Do setup ao squad completo — construindo seu time de agentes de IA</p>
      <div className="flex flex-wrap gap-2 justify-center mt-2">
        <Tag>Config Global</Tag><Tag dim>/init</Tag><Tag>AIOX</Tag><Tag dim>Agentes</Tag><Tag>Squad Creator</Tag><Tag dim>Obsidian</Tag>
      </div>
    </div>
  </Slide>,

  /* 02 — AGENDA */
  <Slide key={2} n={2} total={TOTAL}>
    <Label>Roteiro · 60 min</Label>
    <H2>O que vamos ver hoje</H2>
    <HRac />
    <div className="flex-1 flex flex-col justify-center">
      <TItem time="05 min"><strong className="text-white">Claude Raiz</strong> — config global vs config do projeto</TItem>
      <TItem time="10 min"><strong className="text-white">A Pasta .claude</strong> — estrutura, CLAUDE.md e o /init</TItem>
      <TItem time="10 min"><strong className="text-white">AIOX</strong> — Agentes, Skills e Integrações</TItem>
      <TItem time="05 min"><strong className="text-white">Estrutura do AIOX</strong> — como está organizado</TItem>
      <TItem time="10 min"><strong className="text-white">Agente Base + Squad Creator</strong> — o libertador</TItem>
      <TItem time="10 min"><strong className="text-white">Claude + Obsidian</strong> — superpoder de memória</TItem>
      <TItem time="10 min"><strong className="text-white">4 Semanas de Resultados</strong> — o que foi construído</TItem>
    </div>
  </Slide>,

  /* 03 — CLAUDE RAIZ */
  <Slide key={3} n={3} total={TOTAL}>
    <Label>Fundamento</Label>
    <H2>Claude Raiz vs Claude do Projeto</H2>
    <HRac />
    <div className="grid grid-cols-2 gap-4 flex-1 content-start">
      <Card accent>
        <Label>~/.claude/ — Global</Label>
        <p className="text-[13px] mb-3" style={{ color: DIM }}>Vai para <strong className="text-white">todos os projetos</strong>. Sua identidade, preferências e memória pessoal.</p>
        <Code><K>~/.claude/</K><br/><C>├─ </C>CLAUDE.md<br/><C>├─ </C>settings.json<br/><C>├─ </C>keybindings.json<br/><C>└─ </C><K>projects/memory/</K></Code>
      </Card>
      <Card surface>
        <Label dim>.claude/ — Projeto</Label>
        <p className="text-[13px] mb-3" style={{ color: DIM }}>Específico do <strong className="text-white">repositório atual</strong>. Regras, agentes e workflows do time.</p>
        <Code dim><K>.claude/</K><br/><C>├─ </C>CLAUDE.md<br/><C>├─ </C>settings.json<br/><C>└─ </C>rules/<br/><C>   ├─ </C>agent-authority.md<br/><C>   └─ </C>workflow-execution.md</Code>
      </Card>
    </div>
    <Card accent className="mt-4">
      <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.78)" }}>O projeto <strong className="text-white">herda</strong> o global — e pode <strong className="text-white">sobrescrever</strong> qualquer regra.</p>
    </Card>
  </Slide>,

  /* 04 — .CLAUDE + /INIT */
  <Slide key={4} n={4} total={TOTAL}>
    <Label>Estrutura</Label>
    <H2>A Pasta .claude/ e o /init</H2>
    <HRac />
    <div className="grid grid-cols-2 gap-4 flex-1 content-start">
      <div>
        <Label>O que fica aqui</Label>
        <Li><strong className="text-white">CLAUDE.md</strong> — instruções lidas a cada sessão</Li>
        <Li><strong className="text-white">settings.json</strong> — permissões e allow/deny de ferramentas</Li>
        <Li><strong className="text-white">rules/</strong> — regras contextuais carregadas por arquivo</Li>
        <Li><strong className="text-white">agents/</strong> — definições de agentes do squad</Li>
        <HR />
        <Label>Por que importa</Label>
        <p className="text-[13px]" style={{ color: DIM }}>É a diferença entre um Claude <strong className="text-white">genérico</strong> e um que conhece <strong className="text-white">seu projeto de cor</strong>.</p>
      </div>
      <div>
        <Label>O comando /init</Label>
        <Code><C># execute dentro do projeto</C><br/><K>/init</K></Code>
        <div className="mt-3">
          <Li><strong className="text-white">Lê</strong> toda a estrutura do codebase</Li>
          <Li><strong className="text-white">Entende</strong> stack, padrões e arquitetura</Li>
          <Li>Gera um <strong className="text-white">CLAUDE.md documentado</strong></Li>
          <Li>Claude passa a conhecer o projeto profundamente</Li>
        </div>
        <Card accent className="mt-3">
          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.78)" }}><strong className="text-white">Sempre o primeiro comando</strong> em qualquer projeto novo.</p>
        </Card>
      </div>
    </div>
  </Slide>,

  /* 05 — O QUE É O AIOX */
  <Slide key={5} n={5} total={TOTAL}>
    <Label>AIOX Framework</Label>
    <H2>O que é o AIOX?</H2>
    <HRac />
    <p className="text-[14px] mb-4 max-w-2xl" style={{ color: DIM }}>Um <strong className="text-white">meta-framework</strong> que orquestra agentes de IA para desenvolvimento full stack. Não é um produto — é uma <span style={{ color: AC, fontWeight: 600 }}>infraestrutura de inteligência</span> para seu time operar.</p>
    <div className="grid grid-cols-3 gap-4 flex-1 content-start">
      <Card accent>
        <Label>🤖 Agentes</Label>
        <p className="text-[12px] mb-3" style={{ color: DIM }}>Personas com escopo, autoridade e memória. Especialistas que assumem funções reais.</p>
        <div className="flex flex-wrap gap-1"><Tag>@dev</Tag><Tag>@qa</Tag><Tag>@pm</Tag><Tag>@devops</Tag></div>
      </Card>
      <Card surface>
        <Label dim>⚡ Skills</Label>
        <p className="text-[12px] mb-3" style={{ color: DIM }}>Comandos reutilizáveis acionados por slash. Capacidades plug-and-play em qualquer projeto.</p>
        <div className="flex flex-wrap gap-1"><Tag dim>/init</Tag><Tag dim>/review</Tag><Tag dim>/loop</Tag></div>
      </Card>
      <Card>
        <Label><span style={{ color: "#4ade80" }}>🔌 Integrações</span></Label>
        <p className="text-[12px] mb-3" style={{ color: DIM }}>MCP Servers que expandem os sentidos do Claude para o mundo externo.</p>
        <div className="flex flex-wrap gap-1"><Tag green>Playwright</Tag><Tag green>Context7</Tag><Tag green>Obsidian</Tag></div>
      </Card>
    </div>
  </Slide>,

  /* 06 — AS 3 CAMADAS */
  <Slide key={6} n={6} total={TOTAL}>
    <Label>As 3 Camadas</Label>
    <H2>Agentes · Skills · Integrações</H2>
    <HRac />
    <div className="grid grid-cols-3 gap-4 flex-1 content-start">
      <Card accent>
        <Label>Agente = Quem faz</Label>
        <Code className="mb-3"><K>@dev</K>, <K>@qa</K>, <K>@pm</K><br/><C># ativado com @nome</C></Code>
        <Li>Persona + autoridade definidas</Li>
        <Li>Escopo exclusivo de ações</Li>
        <Li>Memória persistente no projeto</Li>
      </Card>
      <Card surface>
        <Label dim>Skill = O que fazer</Label>
        <Code dim className="mb-3"><K>/init</K>, <K>/review</K><br/><C># ativado com /slash</C></Code>
        <Li dim>Workflow encapsulado e reutilizável</Li>
        <Li dim>Funciona em qualquer projeto</Li>
        <Li dim>Compartilhável com o time</Li>
      </Card>
      <Card>
        <Label><span style={{ color: "#4ade80" }}>Integração = Como fazer</span></Label>
        <Code dim className="mb-3" style={{ borderLeftColor: "#4ade80" }}><K>MCP Server</K><br/><C># nova ferramenta nativa</C></Code>
        <Li>Claude ganha novos "sentidos"</Li>
        <Li>Browser, DB, APIs, Obsidian</Li>
        <Li>Configurado uma vez, global</Li>
      </Card>
    </div>
    <Card accent className="mt-3">
      <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.78)" }}>Agentes usam Skills. Skills usam Integrações. Tudo orquestrado pelo AIOX.</p>
    </Card>
  </Slide>,

  /* 07 — ESTRUTURA DO AIOX */
  <Slide key={7} n={7} total={TOTAL}>
    <Label>Arquitetura</Label>
    <H2>Estrutura do AIOX</H2>
    <HRac />
    <div className="grid grid-cols-2 gap-4 flex-1 content-start">
      <div>
        <Label>Diretórios</Label>
        <Code><K>.aiox-core/</K>  <C>← framework</C><br/><C>├─ </C>constitution.md<br/><C>├─ </C>agents/ &nbsp;tasks/ &nbsp;templates/<br/><br/><K>docs/stories/</K>  <C>← seu trabalho</C><br/><K>squads/</K>        <C>← seus times</C><br/><K>.claude/</K>       <C>← config do projeto</C></Code>
      </div>
      <div>
        <Label>4 Camadas de Proteção</Label>
        <Li><strong className="text-white">L1 Core</strong> — nunca modificável (constitution)</Li>
        <Li><strong className="text-white">L2 Templates</strong> — só extensíveis (tasks, workflows)</Li>
        <Li dim><strong className="text-white">L3 Config</strong> — mutável (settings, memória)</Li>
        <Li dim><strong className="text-white">L4 Runtime</strong> — seu território (stories, squads)</Li>
        <Card accent className="mt-3">
          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.78)" }}><strong className="text-white">Story-Driven Development:</strong> todo trabalho começa em <code style={{ color: AC, fontFamily: MONO }}>docs/stories/</code></p>
        </Card>
      </div>
    </div>
  </Slide>,

  /* 08 — ANATOMIA DO AGENTE */
  <Slide key={8} n={8} total={TOTAL}>
    <Label>Agente Base</Label>
    <H2>Anatomia de um Agente</H2>
    <HRac />
    <div className="grid grid-cols-2 gap-4 flex-1 content-start">
      <Code><K>agent:</K><br/><C>  name: </C><span style={{ color: "rgba(255,200,100,0.8)" }}>Dex</span><br/><C>  id: </C><span style={{ color: "rgba(255,200,100,0.8)" }}>dev</span><br/><C>  title: </C><span style={{ color: "rgba(255,200,100,0.8)" }}>Lead Developer</span><br/><br/><K>persona:</K><br/><C>  role: </C>Implementação de código<br/><C>  tone: </C>Técnico, direto<br/><br/><K>commands:</K><br/><C>  - *</C>develop<C>  - *</C>review<C>  - *</C>exit<br/><br/><K>memory:</K><br/><C>  file: </C>agents/dev/MEMORY.md</Code>
      <div>
        <Label>Os 5 Elementos</Label>
        <Li><strong className="text-white">Identidade</strong> — nome, persona, tom de voz</Li>
        <Li><strong className="text-white">Autoridade</strong> — o que pode e não pode fazer</Li>
        <Li><strong className="text-white">Comandos</strong> — ações com prefixo <code style={{ color: AC, fontFamily: MONO }}>*</code></Li>
        <Li><strong className="text-white">Dependências</strong> — tasks, templates, tools</Li>
        <Li><strong className="text-white">Memória</strong> — aprende com o projeto</Li>
        <Card accent className="mt-3">
          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.78)" }}>Ativação: <code style={{ color: AC, fontFamily: MONO }}>@dev</code> ou <code style={{ color: AC, fontFamily: MONO }}>/AIOX:agents:dev</code></p>
        </Card>
      </div>
    </div>
  </Slide>,

  /* 09 — SQUAD CREATOR */
  <Slide key={9} n={9} total={TOTAL}>
    <Label>O Libertador</Label>
    <H2>Squad Creator</H2>
    <HRac />
    <p className="text-[14px] mb-4 max-w-2xl" style={{ color: DIM }}>O agente que <span style={{ color: AC, fontWeight: 700 }}>cria outros agentes</span>. Com ele você sai do genérico e constrói <strong className="text-white">seu time personalizado</strong> para qualquer contexto.</p>
    <div className="grid grid-cols-2 gap-4 flex-1 content-start">
      <Card accent>
        <Label>Como funciona</Label>
        <Li>1. Você descreve o papel que precisa</Li>
        <Li>2. Squad Creator gera a definição completa</Li>
        <Li>3. Agente criado com persona, comandos e memória</Li>
        <Li>4. Disponível imediatamente via <code style={{ color: AC, fontFamily: MONO }}>@nome</code></Li>
      </Card>
      <Card surface>
        <Label dim>Exemplos de squads</Label>
        <Li dim>Squad de <strong className="text-white">Software Engineering</strong></Li>
        <Li dim>Squad de <strong className="text-white">Marketing &amp; Growth</strong></Li>
        <Li dim>Squad de <strong className="text-white">Sites &amp; Landing Pages</strong></Li>
        <Li dim>Squad de <strong className="text-white">Conteúdo &amp; SEO</strong></Li>
        <Li dim><strong className="text-white">Qualquer contexto do seu negócio</strong></Li>
      </Card>
    </div>
    <Card accent className="mt-3">
      <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.78)" }}>Resultado: um time completo de IA especializado no seu negócio, operando 24/7</p>
    </Card>
  </Slide>,

  /* 10 — CLAUDE + OBSIDIAN */
  <Slide key={10} n={10} total={TOTAL}>
    <Label>Superpoder</Label>
    <H2>Claude + Obsidian</H2>
    <HRac />
    <div className="grid grid-cols-2 gap-4 flex-1 content-start">
      <div>
        <Label dim>Sem Obsidian</Label>
        <Li dim>Cada conversa começa do zero</Li>
        <Li dim>Decisões não são lembradas</Li>
        <Li dim>Contexto repassado manualmente</Li>
        <Li dim>Conhecimento acumulado se perde</Li>
        <HR />
        <Label>Com a Integração MCP</Label>
        <Li>Claude lê e escreve no seu vault</Li>
        <Li>Decisões ficam registradas automaticamente</Li>
        <Li>Knowledge base cresce a cada sessão</Li>
        <Li>Busca semântica no seu conhecimento</Li>
      </div>
      <div>
        <Label>Configuração</Label>
        <Code><C># ~/.claude/settings.json</C><br/><K>"mcpServers"</K>: {"{"}<br/><C>  "</C><K>obsidian</K><C>"</C>: {"{"}<br/><C>    "command"</C>: <span style={{ color: "rgba(255,200,100,0.8)" }}>"obsidian-mcp"</span>,<br/><C>    "vault"</C>: <span style={{ color: "rgba(255,200,100,0.8)" }}>"/seu/vault"</span><br/>  {"}"}<br/>{"}"}</Code>
        <Card accent className="mt-3">
          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.78)" }}>Configurado uma vez no <code style={{ color: AC, fontFamily: MONO }}>~/.claude/</code> → ativo em todos os projetos. Claude vira um <strong className="text-white">segundo cérebro conectado ao seu</strong>.</p>
        </Card>
      </div>
    </div>
  </Slide>,

  /* 11 — 4 SEMANAS */
  <Slide key={11} n={11} total={TOTAL}>
    <Label>Prova de Conceito</Label>
    <H2>O que fiz em <span style={{ color: AC }}>4 semanas</span></H2>
    <HRac />
    <div className="grid grid-cols-3 gap-3 mb-4">
      <Stat n="3" l="Squads criadas" accent />
      <Stat n="20+" l="Agentes ativos" />
      <Stat n="24/7" l="Time operando" />
    </div>
    <div className="grid grid-cols-2 gap-4 flex-1 content-start">
      <div>
        <Li>Site completo da mentoria Claude Code + AIOX</Li>
        <Li>Squad <strong className="text-white">themaestrisites</strong> — 8 agentes, sites e LPs</Li>
        <Li>Squad <strong className="text-white">n8n Killers</strong> — guia interativo publicado</Li>
      </div>
      <div>
        <Li dim>AIOX rodando como infra de desenvolvimento completa</Li>
        <Li dim>Sistema de memória com Obsidian integrado</Li>
        <Li dim>Este workshop — criado em minutos com o squad</Li>
      </div>
    </div>
  </Slide>,

  /* 12 — PITCH MENTORIA */
  <Slide key={12} n={12} total={TOTAL} center>
    <div className="flex flex-col items-center gap-3 max-w-2xl w-full">
      <span className="inline-block font-mono text-[10px] tracking-[0.16em] uppercase px-4 py-2 font-bold" style={{ fontFamily: MONO, border: "1px solid rgba(255,68,0,0.65)", background: "rgba(255,68,0,0.15)", color: "#fff" }}>⚠ Apenas 3 Vagas Restantes</span>
      <h2 className="text-[2.8rem] font-black uppercase leading-none text-white text-center" style={{ fontFamily: "var(--font-bb-display),'Inter',sans-serif", letterSpacing: "-0.025em" }}>
        Mentoria Claude Code<br /><span style={{ color: AC }}>+ AIOX</span>
      </h2>
      <p className="text-[14px] text-center max-w-lg" style={{ color: DIM }}>
        Tudo que você viu hoje — do zero ao squad completo rodando no seu negócio — em <strong className="text-white">4 semanas</strong>, com acompanhamento ao vivo.
      </p>
      <div className="grid grid-cols-3 gap-3 w-full mt-1">
        <Stat n="12/05" l="Início · Terça" accent />
        <Stat n="4" l="Semanas" />
        <div className="p-4 border border-[rgba(255,68,0,0.4)] bg-[rgba(255,68,0,0.08)] text-center">
          <div className="font-black leading-none mb-1 text-[2.2rem]" style={{ fontFamily: "var(--font-bb-display),'Inter',sans-serif", color: AC }}>3</div>
          <div className="font-mono text-[10px] tracking-[0.1em] uppercase" style={{ color: AC, fontFamily: MONO }}>Vagas restantes</div>
        </div>
      </div>
      <p className="font-mono text-[10px] tracking-[0.1em] uppercase" style={{ fontFamily: MONO, color: "rgba(255,255,255,0.25)" }}>Turma super seleta · máximo 15 projetos · suporte individual</p>
      <div className="flex items-center gap-4 mt-1">
        <div style={{ padding: "6px", background: "#fff" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://opensource.growthsales.ai/mentoria&color=08080C&bgcolor=ffffff" alt="QR" width={80} height={80} style={{ display: "block" }} />
        </div>
        <div className="text-left">
          <p className="font-mono text-[13px] font-bold" style={{ color: AC, fontFamily: MONO }}>opensource.growthsales.ai/mentoria</p>
          <p className="font-mono text-[10px] tracking-[0.08em] uppercase mt-1" style={{ color: "rgba(255,255,255,0.28)", fontFamily: MONO }}>Aponte a câmera · Garanta sua vaga</p>
        </div>
      </div>
    </div>
  </Slide>,
];

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export function WorkshopClient() {
  const [cur, setCur] = useState(0);

  const prev = () => setCur(c => Math.max(0, c - 1));
  const next = () => setCur(c => Math.min(TOTAL - 1, c + 1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative select-none">
      {slides[cur]}
      {/* nav arrows */}
      {cur > 0 && (
        <button onClick={prev} aria-label="Anterior"
          className="fixed left-5 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center border transition-colors"
          style={{ borderColor: "rgba(255,68,0,0.4)", color: AC, background: "rgba(8,8,12,0.8)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = AC; (e.currentTarget as HTMLButtonElement).style.color = "#000"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(8,8,12,0.8)"; (e.currentTarget as HTMLButtonElement).style.color = AC; }}>
          ←
        </button>
      )}
      {cur < TOTAL - 1 && (
        <button onClick={next} aria-label="Próximo"
          className="fixed right-5 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center border transition-colors"
          style={{ borderColor: "rgba(255,68,0,0.4)", color: AC, background: "rgba(8,8,12,0.8)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = AC; (e.currentTarget as HTMLButtonElement).style.color = "#000"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(8,8,12,0.8)"; (e.currentTarget as HTMLButtonElement).style.color = AC; }}>
          →
        </button>
      )}
      {/* dot indicators */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCur(i)} aria-label={`Slide ${i + 1}`}
            className="w-[6px] h-[6px] transition-all"
            style={{ background: i === cur ? AC : "rgba(255,255,255,0.18)", transform: i === cur ? "scale(1.4)" : "scale(1)" }} />
        ))}
      </div>
    </div>
  );
}
