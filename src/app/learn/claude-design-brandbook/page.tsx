import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { RelatedPages } from '@/shared/components/ui/RelatedPages';
import { siteConfig } from '@/config/site';
import { CodeBlock } from './_components/CodeBlock';

export const metadata: Metadata = {
  title: 'Como Criar um Brandbook com Claude Design',
  description:
    'Fluxo completo em 5 fases — entrevista de marca, design system técnico, KV visual, handoff automático e app React interativo. Os prompts exatos.',
  alternates: { canonical: `${siteConfig.url}/learn/claude-design-brandbook` },
  openGraph: {
    title: 'Como Criar um Brandbook com Claude Design | João Guirunas',
    description:
      'Fluxo completo em 5 fases — entrevista de marca, design system técnico, KV visual, handoff automático e app React interativo. Os prompts exatos.',
    url: `${siteConfig.url}/learn/claude-design-brandbook`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Como Criar um Brandbook com Claude Design | João Guirunas',
    description:
      'Fluxo completo em 5 fases — entrevista de marca, design system técnico, KV visual, handoff automático e app React interativo. Os prompts exatos.',
  },
};

const features = [
  {
    title: 'Fase 1 — Brief por entrevista',
    description:
      '8 perguntas em sequência — personalidade, público, diferencial, cor, referências. O Analista escreve brand-brief.md ao final.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>',
  },
  {
    title: 'Fase 2 — Design system técnico',
    description:
      'O Arquiteto lê o brief e gera tokens.md, design-system.css e tailwind.tokens.js. Smart-memory com grafo Obsidian.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>',
  },
  {
    title: 'Fase 3 — KV visual no Claude Design',
    description:
      'Abre a pasta no Claude Design. Um prompt gera logo, tipografia, componentes com estados, motion tokens e hero mock.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/>',
  },
  {
    title: 'Handoff automático Design → Code',
    description:
      'Um clique no botão Share gera uma URL. O Claude Code busca o arquivo e implementa os componentes sem instrução manual.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>',
  },
  {
    title: 'Fase 4 — LP antes e depois',
    description:
      'UX agent cria a LP V1 com tokens livres, depois reconstrói com os componentes reais do handoff. A comparação é o argumento.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>',
  },
  {
    title: 'Fase 5 — Brandbook React interativo',
    description:
      'Claude Code monta o app final com tipografia trocando ao vivo, paleta com copy de hex, motion demos e do/don\'t.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  },
];

const longDescription = [
  'O fluxo tem 5 fases: brief por entrevista, design system técnico, KV visual no Claude Design, handoff automático Design→Code e brandbook React interativo. Claude Code e Claude Design trabalham em sequência — o output de um alimenta o outro.',
  'O momento decisivo é o handoff: o Claude Design gera uma URL com todo o KV empacotado. O Claude Code recebe essa URL e implementa os componentes automaticamente — sem copiar CSS, sem reexplicar nada. É aí que o sistema fecha.',
  'Usei esse processo para refundar a identidade visual da GrowthSales.ai. Em 1 dia: brand-brief estruturado, design system completo, KV com logo + tipografia + motion, handoff implementado e brandbook React rodando no browser.',
];

// ── Prompts ──────────────────────────────────────────────────────────────────

const PROMPT_ANALISTA = `/aiox-analyst

Você é um especialista em branding e estratégia de posicionamento. Conduza uma entrevista de marca pessoal com profundidade e gere um brand-brief.md completo.

Faça exatamente 8 perguntas, uma de cada vez, aguardando minha resposta antes de prosseguir.

1. Qual é o seu nome completo e como prefere ser chamado profissionalmente?

2. Qual é sua área de atuação e o que exatamente você entrega? Seja específico — não "designer", mas "designer de produto que transforma fluxos complexos em interfaces simples para startups B2B".

3. Quem é o seu público-alvo ideal? Setor, tamanho da empresa, momento, dores principais.

4. Qual é o seu principal diferencial? O que te faz diferente de outras pessoas na mesma área?

5. Escolha 3 adjetivos que descrevem a sensação que sua marca deve transmitir.

6. Como você quer soar? Escolha um ponto: muito formal ←→ muito informal / muito técnico ←→ muito acessível.

7. Qual é a sua cor favorita ou a cor que mais te representa? Hex, nome ou descrição.

8. Cite uma marca, designer ou site cujo estilo visual te inspira — e diga o que especificamente te atrai.

═══════════════════════════════
APÓS AS 8 RESPOSTAS — CRIE: docs/brand-brief.md
═══════════════════════════════

Estruture com frontmatter YAML e seções:
- Identidade (nome, área, entrega)
- Público-alvo
- Diferencial
- Personalidade da marca (3 adjetivos expandidos)
- Tom de voz (posição no espectro + como se manifesta)
- Cor principal (hex + nome evocativo + sensação)
- Referência visual (o que atrai + como aplicar)
- Posicionamento (parágrafo síntese)
- Copy de base:
  · Headline do hero (até 8 palavras)
  · Subtítulo (até 15 palavras)
  · Tagline (3-5 palavras)
  · CTA principal (2-4 palavras)`;

const PROMPT_ARQUITETO_1 = `/aiox-architect

Leia docs/brand-brief.md.

Crie a smart-memory com wikilinks Obsidian. Cada arquivo precisa de frontmatter YAML e usar [[wikilinks]] para conectar os documentos — essas são as arestas visíveis no grafo.

Crie a seguinte estrutura:

docs/smart-memory/
├── INDEX.md            — índice com links para todos os documentos
├── shared-context.md   — estado atual do projeto e próxima ação
└── project/
    ├── overview.md     — quem é, o que está sendo construído e por quê
    ├── brand-tokens.md — tokens em linguagem natural (cor, tipografia, tom)
    └── stories/
        └── BACKLOG.md  — stories iniciais com links para os tokens

Regras:
- Todos os links internos como [[nome-do-arquivo]]
- shared-context.md sempre termina com "→ Próxima ação: [o que vem a seguir]"
- brand-tokens.md em linguagem natural — não técnico ainda
- BACKLOG.md com as 3 primeiras stories numeradas (1.1, 1.2, 1.3)`;

const PROMPT_ARQUITETO_2 = `/aiox-architect

Leia:
- docs/brand-brief.md
- docs/smart-memory/project/brand-tokens.md

Crie o design system técnico completo em 3 arquivos:

═══════════════════════════
1. docs/design-system/tokens.md
═══════════════════════════
Tabelas com todos os tokens:
- Paleta (primária em 5 tons, neutras, semânticas success/warning/error)
- Tipografia (fonte sugerida + link Google Fonts, escala xs→4xl, pesos)
- Espaçamentos --space-1 até --space-16
- Border-radius: sm · md · lg · full
- Sombras: sm · md · lg
Cada token com coluna Hex/Valor e coluna Uso — justificado pelos adjetivos do brief.

═══════════════════════════
2. docs/design-system/design-system.css
═══════════════════════════
CSS custom properties semânticas no :root.
Nomenclatura: --color-primary, --color-surface, --color-border, etc.
Zero valores hardcoded no HTML — só vars.

═══════════════════════════
3. docs/design-system/tailwind.tokens.js
═══════════════════════════
Extensão do tailwind.config.js referenciando as CSS vars.
Não duplica valores — mapeia token → var().

Após criar os 3 arquivos, registre em docs/smart-memory/shared-context.md:
- Design system técnico criado
- Próxima ação: handoff ao Claude Design → [[project/kv-design]]`;

const PROMPT_KV = `Tenho os arquivos do meu design system nesta pasta. Leia com atenção:
- docs/design-system/tokens.md
- docs/design-system/design-system.css
- docs/brand-brief.md

Com base nesses arquivos, crie um KV (key visual) com caráter — não um style guide genérico.

═══════════════════════════
01 — FUNDAÇÃO VISUAL
═══════════════════════════

PALETA
- Swatches da cor primária em 5 luminosidades (100 → 900)
- Gradiente de assinatura: linear 135° entre a primária e versão mais quente/fria
- Neutros completos: fundo, superfície, borda, texto muted, branco

TEXTURA DE FUNDO
- SVG de ruído sutil (feTurbulence baseFrequency="0.65" numOctaves="3")
- Overlay no fundo escuro com opacidade 3-5%

TIPOGRAFIA COM CARÁTER
- Fonte primária em tamanhos xs → 4xl com preview de texto real
- Fonte de display derivada dos adjetivos do brief:
  Marca ousada → peso 800-900, tracking tight
  Marca sofisticada → 300 light italic, tracking wide
- Pair tipográfico: heading + body juntos em bloco real
- Número/stat em 4xl na cor primária (ex: "12+", "100%")

═══════════════════════════
02 — COMPONENTES COM VIDA
═══════════════════════════

BOTÃO PRIMÁRIO — 3 estados + variações
- Default: background gradiente de assinatura (não cor sólida)
- Hover: shift de 8° no gradiente + translateY(-2px) + shadow elevada
- Disabled: 40% opacidade, cursor not-allowed
- Variação ghost: border 1.5px solid primária, background transparente

CARD — sistema de elevação
- Nível 0 (flat): border sutil, sem shadow
- Nível 1 (raised): shadow-sm, hover → shadow-md + translateY(-4px)
- Nível 2 (floating): shadow-lg, glow com box-shadow duplo
- Micro-animação de entrada: fade-in + slide-up 0.3s ease-out

INPUT — estados completos
- Default · Focus (glow ring primária) · Error · Success

BADGE — com dot animado
- Default · Success · Warning · Error
- Variação "live": dot verde pulsante (animation: pulse 2s infinite)

═══════════════════════════
03 — EFEITOS DE IDENTIDADE
═══════════════════════════

HERO MOCK
- Heading grande + subtítulo muted + botão primário
- Gradiente de assinatura como overlay sutil no fundo
- Prova que tipografia + cor + espaçamento funcionam juntos

MOTION TOKENS
- --ease-out: cubic-bezier(0.16, 1, 0.3, 1)
- --ease-in-out: cubic-bezier(0.45, 0, 0.55, 1)
- --duration-fast: 150ms · --duration-base: 250ms · --duration-slow: 400ms
- Demo de cada easing com elemento se movendo

DO / DON'T
- 2 exemplos corretos com ✓ em verde
- 2 exemplos incorretos com ✗ em vermelho

O KV deve sentir-se como a marca — não como template.`;

const PROMPT_REFINAR_KV = `Com base nos adjetivos de personalidade do brief (docs/brand-brief.md), refine o sistema visual:

1. TIPOGRAFIA: heading com peso e tracking corretos para a personalidade?
   Ousada → weight 800+, tracking tight
   Sofisticada → weight 300 light italic, tracking wide
   Técnica → monospace para labels e badges

2. BOTÃO: o gradiente captura a energia da marca?
   Ajuste o ângulo (90°, 135°, 180°) e a segunda cor.

3. CARD: nível de elevação alinhado com a seriedade da marca?
   Minimalista → só border, sem glow
   Expressiva → glow na primária + shadow dupla

4. NOISE TEXTURE: o ruído está em 2-4% de opacidade?

5. HERO MOCK: já parece um site real desta marca?

Mostre versões antes/depois dos componentes modificados.`;

const PROMPT_HANDOFF = `Fetch this design file, read its readme, and implement the relevant aspects of the design.
https://api.anthropic.com/v1/design/h/[COLE-A-URL-DO-CLAUDE-DESIGN-AQUI]

Implement: the designs in this project

═══════════════════════════════
AO FINAL — REGISTRE NA SMART-MEMORY:
═══════════════════════════════

1. Atualize docs/smart-memory/shared-context.md:
   - Handoff implementado — componentes do Claude Design no projeto
   - Próxima ação: UX agent reconstrói LP com componentes reais → [[project/lp-v2]]

2. Crie docs/smart-memory/project/components.md:

---
title: Componentes do Design System
tipo: referência
status: implementado
origem: Claude Design handoff
---

# Componentes — [nome da marca]

## Implementados via handoff
- Botão primário: default · hover · disabled · ghost
- Card: flat · raised · floating
- Input: default · focus · error · success
- Badge: default · success · warning · error · live

## Como usar
Usam exclusivamente as CSS vars do design-system.css.
Não duplique valores — altere só as vars.

→ Tokens: [[brand-tokens]] · CSS: [[design-system]] · LP V2: [[lp-v2]]`;

const PROMPT_UX_V1 = `Assuma o papel de especialista sênior em UX e desenvolvimento frontend.

TAREFA: Criar a Versão 1 da landing page de apresentação da marca.
Você ainda não viu o output do Claude Design. Trabalhe apenas com o que existe na pasta.

LEIA ANTES DE COMEÇAR:
- docs/brand-brief.md → use o copy de base já escrito (headline, subtítulo, tagline, CTA)
- docs/design-system/tokens.md → paleta, tipografia, espaçamentos
- docs/design-system/design-system.css → use APENAS essas CSS vars, zero hardcode

ESTRUTURA DA PÁGINA:
NAV fixo (64px) · HERO (100vh) · PROPOSTA DE VALOR (3 cards) · SOBRE (2 colunas) · CTA FINAL · FOOTER

Regras técnicas:
- Zero valores hardcoded — APENAS CSS vars
- HTML semântico: nav, header, main, section, footer
- Google Font do tokens.md: importe via <link>
- Responsivo: breakpoints 768px e 1024px
- Sem frameworks, sem CDN externo além da fonte

SALVE EM: docs/pages/lp-v1.html

Ao final, atualize docs/smart-memory/shared-context.md:
- LP V1 concluída — construída com tokens livres, sem componentes do Claude Design
- Próxima ação: handoff Claude Design → implementar componentes → reconstruir LP V2`;

const PROMPT_UX_V2 = `Você criou a LP V1 com os tokens livres. Agora chegou o handoff do Claude Design.

TAREFA: Criar a Versão 2 — mesma jornada, vocabulário visual do handoff.

LEIA:
- docs/brand-brief.md → mesmo copy da V1
- docs/pages/lp-v1.html → referência de estrutura e jornada (não de estilo)
- docs/design-system/design-system.css → CSS vars disponíveis

REGRA CENTRAL: mesma estrutura NAV → HERO → PROPOSTA → SOBRE → CTA → FOOTER.
O que muda é o vocabulário visual — use os componentes do handoff:

- NAV: aplique tipografia do KV
- HERO: use o BOTÃO do handoff — não recrie
- PROPOSTA DE VALOR: use o CARD do handoff para os 3 blocos
- CTA: use o BOTÃO do handoff
- Demais seções: aplique tipografia e espaçamentos do KV

Regras técnicas:
- CSS do handoff vem primeiro no <style>, depois design-system.css
- Não duplique variáveis do handoff
- Mesmos breakpoints da V1 (768px, 1024px)

SALVE EM: docs/pages/lp-v2.html

Ao final, crie docs/smart-memory/project/lp-comparison.md com:
- Decisões que mudaram entre V1 e V2
- O que os componentes do Claude Design resolveram
- Screenshot mental: a diferença visual mais marcante`;

const PROMPT_BRANDBOOK = `Leia todos os arquivos do projeto:
- docs/brand-brief.md
- docs/design-system/tokens.md
- docs/design-system/design-system.css
- docs/smart-memory/project/components.md (se existir)

Crie o brandbook completo como app React interativo — não um PDF, um sistema vivo.

ESTRUTURA DO APP (8 seções):
1. HERO: nome da marca + adjetivos + fundo na cor de superfície da marca
2. LOGO: variações com tabs (horizontal · vertical · ícone · invertido)
3. PALETA: swatches clicáveis — onClick copia o hex para clipboard com feedback
4. TIPOGRAFIA: escala interativa — botões trocam entre os pares tipográficos ao vivo
5. COMPONENTES: botão · card · input · badge com estados em tabs
6. MOTION: demos de easing, scroll patterns e micro-interações com botão "replay"
7. DIREÇÃO VISUAL: cada princípio com toggle antes/depois
8. DO / DON'T: 4 exemplos com explicação

REQUISITOS TÉCNICOS:
- CSS custom properties para todos os tokens
- React state para troca de tipografia e estados de componente
- IntersectionObserver para animações de entrada nas seções
- Web Clipboard API para copy de hex
- Responsivo: 375px e 1440px
- Sem build step — HTML + React CDN ou arquivo único

SALVE EM: docs/brandbook/index.html`;

// ── Componentes internos ─────────────────────────────────────────────────────

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const ACCENT = 'var(--color-accent)';
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";

function Phase({
  n,
  label,
  tool,
  duration,
  children,
}: {
  n: number;
  label: string;
  tool: string;
  duration?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="mb-12 pb-12"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <span
          className="inline-flex items-center justify-center w-7 h-7 text-[11px] font-bold border flex-shrink-0"
          style={{ fontFamily: MONO, color: ACCENT, borderColor: 'rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.06)' }}
        >
          {n}
        </span>
        <h3
          className="text-lg font-bold text-white"
          style={{ fontFamily: DISPLAY, letterSpacing: '-0.02em' }}
        >
          {label}
        </h3>
        <span
          className="px-2 py-0.5 text-[10px] font-bold tracking-[0.14em] uppercase"
          style={{ fontFamily: MONO, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
        >
          {tool}
        </span>
        {duration && (
          <span className="text-[10px]" style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.25)' }}>
            {duration}
          </span>
        )}
      </div>
      <div className="ml-10">{children}</div>
    </div>
  );
}

function Step({ n, label, children }: { n: number; label?: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 mb-4">
      <span
        className="flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center text-[10px] font-bold border"
        style={{ fontFamily: MONO, color: ACCENT, borderColor: 'rgba(255,58,14,0.35)', background: 'rgba(255,58,14,0.06)' }}
      >
        {n}
      </span>
      <div className="text-sm leading-relaxed text-white/65">
        {label && <strong className="text-white/90">{label} — </strong>}
        {children}
      </div>
    </div>
  );
}

function Callout({ label = 'Nota', children }: { label?: string; children: React.ReactNode }) {
  return (
    <div
      className="my-6 p-4 text-sm leading-relaxed text-white/75"
      style={{ borderLeft: `3px solid ${ACCENT}`, background: 'rgba(255,58,14,0.05)' }}
    >
      <span className="mb-2 block font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, color: ACCENT }}>
        {label}
      </span>
      {children}
    </div>
  );
}

function Output({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-xs text-white/45 mb-1.5">
      <span style={{ color: ACCENT, flexShrink: 0 }}>→</span>
      <span>{children}</span>
    </div>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-sm leading-relaxed text-white/55">{children}</p>
  );
}

// ── Flow diagram ─────────────────────────────────────────────────────────────

function FlowDiagram() {
  const steps = [
    { label: 'Claude Code', sub: 'Brief + Tokens' },
    { label: 'Claude Design', sub: 'KV Visual' },
    { label: 'Handoff URL', sub: 'automático' },
    { label: 'Claude Code', sub: 'Implementa' },
    { label: 'Brandbook', sub: 'React App' },
  ];

  return (
    <div className="mb-12 overflow-x-auto">
      <div className="flex items-center gap-0 min-w-max">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div
              className="flex flex-col items-center px-4 py-3"
              style={{ background: i === 2 ? 'rgba(255,58,14,0.1)' : '#0e0e11', border: `1px solid ${i === 2 ? 'rgba(255,58,14,0.4)' : 'rgba(255,255,255,0.08)'}` }}
            >
              <span
                className="text-[10px] font-bold tracking-[0.1em] uppercase text-white"
                style={{ fontFamily: MONO }}
              >
                {step.label}
              </span>
              <span className="text-[9px] mt-0.5" style={{ fontFamily: MONO, color: i === 2 ? ACCENT : 'rgba(255,255,255,0.3)' }}>
                {step.sub}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center px-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path d="M9 1l6 5-6 5M1 6h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tutorial Section ─────────────────────────────────────────────────────────

function TutorialSection() {
  return (
    <section
      className="py-20 sm:py-24"
      style={{ background: '#050507', borderTop: '1px solid rgba(255,255,255,0.07)' }}
      aria-labelledby="tutorial-heading"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-[140px]">

        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 font-mono text-[11px] tracking-[0.16em] uppercase" style={{ fontFamily: MONO, color: 'rgba(255,58,14,0.8)' }}>
            Tutorial completo
          </p>
          <h2
            id="tutorial-heading"
            className="text-2xl sm:text-3xl font-semibold text-white mb-4"
            style={{ letterSpacing: '-0.02em', fontFamily: DISPLAY }}
          >
            5 fases, 1 dia, prompts exatos
          </h2>
          <p className="max-w-2xl text-base leading-relaxed mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Claude Code e Claude Design trabalham em sequência. O output de cada fase alimenta a próxima.
            Substitua os campos entre colchetes pela sua marca.
          </p>
        </div>

        {/* Flow */}
        <FlowDiagram />

        {/* Pré-requisitos */}
        <div className="mb-12 p-5" style={{ border: '1px solid rgba(255,255,255,0.07)', background: '#0e0e11' }}>
          <p className="mb-3 font-mono text-[10px] tracking-[0.16em] uppercase" style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.25)' }}>
            Pré-requisitos
          </p>
          <div className="grid sm:grid-cols-2 gap-x-8">
            {[
              'Claude Code instalado (npm install -g @anthropic-ai/claude-code)',
              'Claude Pro ou acesso à API Anthropic',
              'Claude Design habilitado em claude.ai/design',
              'Pasta local para o projeto (ex: ~/Desktop/meu-brandbook)',
              'Obsidian instalado para visualizar a smart-memory (opcional)',
            ].map((item) => (
              <Output key={item}>{item}</Output>
            ))}
          </div>
        </div>

        {/* ── FASE 1 ── */}
        <Phase n={1} label="Brief estruturado — entrevista de marca" tool="Claude Code" duration="~10 min">
          <SubLabel>
            Cole o prompt abaixo no Claude Code. O agente Analista faz 8 perguntas em sequência — uma por vez — e escreve o brand-brief.md ao final. Responda com suas palavras reais: quanto mais específico, mais preciso o resultado.
          </SubLabel>
          <CodeBlock label="claude code — analista">{PROMPT_ANALISTA}</CodeBlock>
          <div className="mt-4 space-y-1">
            <Output>docs/brand-brief.md com identidade, personalidade, tom de voz e copy de base</Output>
            <Output>Headline, subtítulo, tagline e CTA já escritos — usados em todas as fases seguintes</Output>
          </div>
          <Callout label="Por que entrevista e não formulário">
            Cada resposta informa a próxima pergunta. Uma resposta como "quero parecer confiável mas não corporativo" produz adjetivos muito mais acionáveis do que um formulário de 10 campos.
          </Callout>
        </Phase>

        {/* ── FASE 2 ── */}
        <Phase n={2} label="Design system técnico + smart-memory" tool="Claude Code" duration="~15 min">
          <SubLabel>
            O Arquiteto faz duas coisas em sequência: cria a smart-memory com wikilinks Obsidian (grafo visual da marca) e gera o design system completo. Rode os dois prompts em ordem.
          </SubLabel>

          <p className="text-xs font-bold tracking-[0.12em] uppercase mb-2 mt-4" style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.35)' }}>
            Passo 2A — Smart-memory + grafo Obsidian
          </p>
          <CodeBlock label="claude code — arquiteto, passo 1">{PROMPT_ARQUITETO_1}</CodeBlock>
          <div className="mt-3 mb-5 space-y-1">
            <Output>docs/smart-memory/ com 5 arquivos conectados por wikilinks</Output>
            <Output>Abra o Obsidian agora (Cmd+G) — o grafo já tem 5 nós com arestas visíveis</Output>
          </div>

          <p className="text-xs font-bold tracking-[0.12em] uppercase mb-2 mt-6" style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.35)' }}>
            Passo 2B — Design system técnico
          </p>
          <CodeBlock label="claude code — arquiteto, passo 2">{PROMPT_ARQUITETO_2}</CodeBlock>
          <div className="mt-4 space-y-1">
            <Output>docs/design-system/tokens.md — paleta completa, tipografia, espaçamentos, radius, sombras</Output>
            <Output>docs/design-system/design-system.css — CSS custom properties no :root</Output>
            <Output>docs/design-system/tailwind.tokens.js — extensão do tailwind.config.js com as vars</Output>
          </div>
          <Callout label="Tokens semânticos">
            --color-primary em vez de --color-orange-500. Se a cor mudar amanhã, troca um valor e propaga em tudo. O Claude Design e o Claude Code leem as mesmas vars — é aí que o sistema fecha.
          </Callout>
        </Phase>

        {/* ── FASE 3 ── */}
        <Phase n={3} label="KV visual — logo, tipografia, componentes, motion" tool="Claude Design" duration="~10 min">
          <SubLabel>
            Abra o Claude Design em <strong className="text-white/80">claude.ai/design</strong>. Clique em <strong className="text-white/80">Open Folder</strong> e selecione a pasta do projeto — ele lê brand-brief.md, tokens.md e design-system.css automaticamente.
          </SubLabel>

          <div className="mb-5 space-y-3">
            <Step n={1} label="Abrir pasta">Clique em Open Folder → selecione a pasta do projeto.</Step>
            <Step n={2} label="Criar o KV">Cole o prompt abaixo. Ele pede o máximo — gradiente de assinatura, noise texture, componentes com estados, motion tokens, hero mock.</Step>
          </div>

          <CodeBlock label="claude design — KV visual">{PROMPT_KV}</CodeBlock>

          <div className="mt-4 mb-6 space-y-1">
            {[
              'Paleta em 5 luminosidades + gradiente de assinatura da marca',
              'Textura noise SVG como overlay de fundo (3-5% opacidade)',
              'Tipografia com peso/tracking derivados dos adjetivos — não template',
              'Botão com gradiente + hover state + variação ghost e disabled',
              'Cards em 3 níveis de elevação com micro-animação de entrada',
              'Input com estados focus/error/success + glow ring',
              'Badges com dot pulsante, hero mock, motion tokens, do/don\'t',
            ].map((item) => (
              <Output key={item}>{item}</Output>
            ))}
          </div>

          <Step n={3} label="Refinar">
            Após o KV gerado, rode o prompt de refinamento para calibrar ao caráter da marca:
          </Step>
          <CodeBlock label="claude design — refinamento">{PROMPT_REFINAR_KV}</CodeBlock>

          <Callout label="Por que o prompt do KV é longo">
            Um prompt vago entrega swatches + botão genérico. Este prompt especifica o que diferencia uma marca: gradiente de assinatura (não cor sólida), noise de fundo (profundidade sem peso), motion tokens (o sistema sabe como se mover), hero mock (prova que funciona em contexto real).
          </Callout>
        </Phase>

        {/* ── HANDOFF ── */}
        <div className="mb-12 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <div
              className="px-3 py-1 text-[10px] font-bold tracking-[0.14em] uppercase"
              style={{ fontFamily: MONO, background: 'rgba(255,58,14,0.1)', border: '1px solid rgba(255,58,14,0.4)', color: ACCENT }}
            >
              Handoff — WOW
            </div>
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: DISPLAY, letterSpacing: '-0.02em' }}>
              Claude Design → Claude Code
            </h3>
          </div>

          <div className="ml-0 sm:ml-10">
            <SubLabel>
              No Claude Design, clique no botão <strong className="text-white/80">Share / Handoff to Claude Code</strong>. Ele gera uma URL no formato <code className="text-xs px-1.5 py-0.5" style={{ background: '#111', color: ACCENT, fontFamily: MONO }}>api.anthropic.com/v1/design/h/[ID]</code>. Copie essa URL — ela empacota o KV completo com um README de implementação.
            </SubLabel>

            <div className="mb-5 space-y-3">
              <Step n={1} label="Gerar URL">No Claude Design → Share → Handoff to Claude Code. URL copiada para o clipboard.</Step>
              <Step n={2} label="Implementar">Volte ao Claude Code. Substitua a URL no prompt abaixo e cole.</Step>
            </div>

            <CodeBlock label="claude code — handoff">{PROMPT_HANDOFF}</CodeBlock>

            <div className="mt-4 space-y-1">
              <Output>CSS dos componentes implementado no projeto usando as CSS vars existentes</Output>
              <Output>HTML semântico de referência para cada componente</Output>
              <Output>docs/smart-memory/project/components.md registrado</Output>
            </div>

            <Callout label="Por que funciona sem instruções manuais">
              A URL não é só um link — aponta para um arquivo com o KV completo, specs dos componentes e um README com instruções de implementação. O Claude Code lê esse arquivo como leria qualquer outro contexto e sabe exatamente o que criar, onde salvar e quais CSS vars usar.
            </Callout>
          </div>
        </div>

        {/* ── FASE 4 ── */}
        <Phase n={4} label="LP antes e depois do handoff" tool="Claude Code" duration="~20 min">
          <SubLabel>
            Esta fase é opcional no brandbook — mas é o argumento visual mais forte. O UX agent cria a LP V1 com os tokens livres (sem componentes definidos) e depois reconstrói a V2 com os componentes reais do handoff. A comparação é imediata.
          </SubLabel>

          <p className="text-xs font-bold tracking-[0.12em] uppercase mb-2 mt-4" style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.35)' }}>
            LP V1 — antes do Claude Design
          </p>
          <CodeBlock label="claude code — LP V1">{PROMPT_UX_V1}</CodeBlock>
          <div className="mt-3 mb-6 space-y-1">
            <Output>docs/pages/lp-v1.html — LP completa: nav, hero, proposta, sobre, CTA, footer</Output>
            <Output>Interpretação livre do UX agent com as CSS vars disponíveis — sem componentes definidos</Output>
          </div>

          <p className="text-xs font-bold tracking-[0.12em] uppercase mb-2 mt-6" style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.35)' }}>
            LP V2 — mesma jornada, vocabulário visual do handoff
          </p>
          <CodeBlock label="claude code — LP V2">{PROMPT_UX_V2}</CodeBlock>
          <div className="mt-4 space-y-1">
            <Output>docs/pages/lp-v2.html — mesma estrutura, componentes reais do Claude Design</Output>
            <Output>docs/smart-memory/project/lp-comparison.md com a análise da diferença</Output>
          </div>
        </Phase>

        {/* ── FASE 5 ── */}
        <Phase n={5} label="Brandbook React interativo" tool="Claude Code" duration="~10 min">
          <SubLabel>
            Com os componentes implementados e a smart-memory populada, Claude Code gera o app final. 8 seções interativas — tipografia trocando ao vivo, paleta com copy de hex, motion demos com replay.
          </SubLabel>
          <CodeBlock label="claude code — brandbook React">{PROMPT_BRANDBOOK}</CodeBlock>
          <div className="mt-4 space-y-1">
            {[
              'docs/brandbook/index.html — app completo rodando no browser, sem build step',
              'Tipografia interativa: troca entre pares com um clique',
              'Paleta: onClick copia o hex com feedback visual',
              'Componentes com todos os estados em tabs',
              'Motion demos com botão replay',
              'Direção visual: toggle antes/depois em cada princípio',
              'Do / Don\'t: 4 exemplos com explicação',
            ].map((item) => (
              <Output key={item}>{item}</Output>
            ))}
          </div>
          <Callout label="Não é PDF">
            Agência entrega isso em PowerPoint. O Claude entrega um app que roda no browser — você abre, troca a tipografia em tempo real, vê as animações funcionando, copia o hex de qualquer cor. É um sistema vivo, não uma apresentação.
          </Callout>
        </Phase>

        {/* Resultado real */}
        <div className="mt-4 p-6" style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e11' }}>
          <p className="mb-4 font-mono text-[10px] tracking-[0.16em] uppercase" style={{ fontFamily: MONO, color: 'rgba(255,58,14,0.8)' }}>
            Resultado real — GrowthSales.ai
          </p>
          <p className="text-sm text-white/55 leading-relaxed mb-4">
            Usando exatamente esse processo, em 1 dia:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-8">
            {[
              'brand-brief.md com personalidade e copy de base',
              'Design system: tokens + CSS vars + Tailwind config',
              'Logo redesenhado: diamante gradient #FF4400→#FF1A00',
              'Wordmark: Geist 300 + ".ai" em Fraunces itálico',
              '6 princípios de direção visual documentados',
              '6 scroll patterns cinematográficos com vídeo',
              'LP V1 e V2 — antes/depois do handoff',
              'Brandbook React interativo no browser',
            ].map((item) => (
              <Output key={item}>{item}</Output>
            ))}
          </div>
          <p className="mt-5 text-xs" style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.2)' }}>
            Custo fixo: a assinatura do Claude. Agência: R$ 100 mil · 4 meses.
          </p>
        </div>

      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ClaudeDesignBrandbookPage() {
  return (
    <SkillPage
      title="Brandbook com Claude Design"
      description="Fluxo completo em 5 fases — entrevista de marca, design system, KV visual, handoff automático e app React interativo. Os prompts exatos."
      category="Aprendizado"
      categoryColor="aprendizado"
      longDescription={longDescription}
      features={features}
      primaryLink="https://claude.ai/design"
      primaryLabel="Abrir Claude Design"
      isExternal
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/learn/claude-design-brandbook"
    >
      <TutorialSection />
      <RelatedPages
        heading="Ver também"
        pages={[
          { href: '/setup/claude-code',        title: 'Setup Claude Code',         description: 'Instale o Claude Code — ele roda as fases 1, 2, 4 e 5 do tutorial.', tag: 'Setup', isPrereq: true },
          { href: '/framework/aiox-framework', title: 'AIOX Framework',            description: 'Instale o AIOX para usar os agentes Analista e Arquiteto do tutorial.', tag: 'AIOX', isPrereq: true },
          { href: '/workshop-2',               title: 'Workshop 2 completo',       description: 'Veja esse fluxo ao vivo — do briefing ao deploy de uma landing page.', tag: 'Workshop' },
          { href: '/learn/ai-layouts',         title: 'Layouts Profissionais com IA', description: 'Criação de interfaces de nível profissional com prompts exatos e variações.', tag: 'Learn' },
        ]}
      />
    </SkillPage>
  );
}
