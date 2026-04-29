import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';

export const metadata: Metadata = {
  title: 'Fase 03 — Arquiteto | Workshop 2',
  description: 'O Arquiteto cria a smart-memory com wikilinks Obsidian e o design system completo — tokens, CSS vars e Tailwind config.',
  alternates: { canonical: '/workshop-2/arquiteto' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const ACCENT = 'var(--color-accent)';

function Callout({ label = 'Dica', children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="my-8 p-5 text-sm leading-relaxed text-white/80" style={{ borderLeft: `3px solid ${ACCENT}`, background: 'rgba(255,58,14,0.05)' }}>
      <span className="mb-2 block font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, color: ACCENT }}>{label}</span>
      {children}
    </div>
  );
}

const PROMPT = `/aiox-architect

Leia docs/brand-brief.md.

Crie a estrutura de smart-memory abaixo. Cada arquivo deve ter frontmatter YAML completo e usar wikilinks [[nome-do-arquivo]] para conectar os documentos. Os wikilinks criam as arestas visíveis no grafo do Obsidian.

═══════════════════════════════
ESTRUTURA DE ARQUIVOS A CRIAR:
═══════════════════════════════

docs/smart-memory/
├── INDEX.md
├── shared-context.md
├── project/
│   ├── overview.md
│   └── brand-tokens.md
└── stories/
    └── BACKLOG.md

═══════════════════════════════
CONTEÚDO DE CADA ARQUIVO:
═══════════════════════════════

** docs/smart-memory/INDEX.md **
---
title: Índice do Projeto
tipo: índice
atualizado: [data de hoje]
---

# Índice — [nome da pessoa] Design System

## Projeto
- [[project/overview]] — visão geral e objetivo do projeto
- [[project/brand-tokens]] — tokens de marca em linguagem natural

## Stories
- [[stories/BACKLOG]] — próximas histórias de desenvolvimento

---
*Este vault documenta o design system pessoal de [nome]. Navegue pelo grafo para ver as conexões.*

** docs/smart-memory/shared-context.md **
---
title: Contexto Compartilhado
tipo: contexto
---

# Estado Atual do Projeto

- **Pessoa:** [nome] — [área de atuação]
- **Fase atual:** briefing concluído, estrutura de memória inicializada
- **Próxima ação:** criar tokens de design → [[project/brand-tokens]]
- **Referência visual:** [referência citada no brief]
- **Cor principal:** [hex da marca]

→ Ver [[project/overview]] para contexto completo

** docs/smart-memory/project/overview.md **
---
title: Overview do Projeto
tipo: projeto
tags: [brand, design-system, pessoal]
---

# [nome] — Design System Pessoal

## Objetivo
[2-3 frases: o que está sendo construído e por quê]

## Quem é
[síntese da identidade profissional a partir do brief]

## Personalidade da marca
[os 3 adjetivos do brief com 1 frase expandindo cada um]

## Referências visuais
- [referência citada] — [o que atrai]

## Entregáveis deste projeto
- [ ] tokens.md com paleta, tipografia e espaçamentos
- [ ] design-system.css com CSS custom properties
- [ ] tailwind.tokens.js para integração com Tailwind
- [ ] KV no Claude Design

→ Tokens: [[brand-tokens]] · Stories: [[../stories/BACKLOG]]

** docs/smart-memory/project/brand-tokens.md **
---
title: Brand Tokens
tipo: tokens
tags: [cores, tipografia, marca]
---

# Brand Tokens — [nome]

## Cor principal
- **Hex:** [cor convertida para hex]
- **Nome/referência:** [como a pessoa descreveu]
- **Sensação:** [o que essa cor transmite para esta marca]

## Tipografia sugerida
- **Fonte primária:** [sugestão baseada na personalidade]
- **Por quê:** [justificativa em 1 linha]
- **Pesos:** 400 (regular), 600 (semibold), 700 (bold)

## Tom de voz
[adjetivo 1] · [adjetivo 2] · [adjetivo 3]

## Próximo passo
Estes tokens em linguagem natural serão convertidos em tokens técnicos na fase do Designer.
→ [[../stories/BACKLOG]]

** docs/smart-memory/stories/BACKLOG.md **
---
title: Backlog
tipo: stories
status: em construção
---

# Backlog — [nome] Design System

## Em progresso
- [ ] 1.1 — Criar tokens técnicos completos (cores, tipografia, espaçamentos)
- [ ] 1.2 — Gerar design-system.css com CSS custom properties
- [ ] 1.3 — Gerar tailwind.tokens.js para integração Tailwind

## Próximas
- [ ] 2.1 — Criar componentes no Claude Design (botão, card, input)
- [ ] 2.2 — Aplicar design system num projeto real

→ Contexto: [[../project/overview]] · Tokens: [[../project/brand-tokens]]`;

const PROMPT_DESIGN_SYSTEM = `/aiox-architect

Leia:
- docs/brand-brief.md
- docs/smart-memory/project/brand-tokens.md

Com base nesses arquivos, crie o design system técnico completo em 3 arquivos:

═══════════════════════════════
ARQUIVO 1: docs/design-system/tokens.md
═══════════════════════════════

---
title: Design Tokens
tipo: tokens-técnicos
tags: [cores, tipografia, espaçamentos]
---

# Design Tokens — [nome]

## Paleta de cores

### Primária
| Token | Hex | Uso |
|---|---|---|
| --color-primary | [hex da marca] | CTAs, destaques, links ativos |
| --color-primary-hover | [versão 10% mais escura] | Estado hover do CTA |
| --color-primary-subtle | [hex com 10% opacidade] | Fundos de destaque suaves |

### Neutra
| Token | Hex | Uso |
|---|---|---|
| --color-bg | #0a0a0a | Fundo principal |
| --color-surface | #141414 | Cards, painéis elevados |
| --color-border | rgba(255,255,255,0.08) | Bordas sutis |
| --color-text | #ffffff | Texto principal |
| --color-text-muted | rgba(255,255,255,0.55) | Texto secundário |

### Semântica
| Token | Hex | Uso |
|---|---|---|
| --color-success | #22c55e | Confirmações, status OK |
| --color-warning | #f59e0b | Alertas, pendências |
| --color-error | #ef4444 | Erros, destrutivo |

## Tipografia

### Fonte primária
- **Família:** [sugestão baseada na personalidade — ex: Inter, Plus Jakarta Sans]
- **Google Fonts:** [link de importação]
- **Pesos:** 400, 600, 700

### Escala
| Token | Valor | Uso |
|---|---|---|
| --text-xs | 0.75rem / 12px | Labels, badges, meta |
| --text-sm | 0.875rem / 14px | Body secundário, notas |
| --text-base | 1rem / 16px | Body principal |
| --text-lg | 1.125rem / 18px | Lead text, subtítulos |
| --text-xl | 1.25rem / 20px | H3, títulos de card |
| --text-2xl | 1.5rem / 24px | H2, seção |
| --text-3xl | 1.875rem / 30px | H1 mobile |
| --text-4xl | 2.25rem / 36px | H1 desktop |

## Espaçamentos
| Token | Valor |
|---|---|
| --space-1 | 0.25rem |
| --space-2 | 0.5rem |
| --space-3 | 0.75rem |
| --space-4 | 1rem |
| --space-6 | 1.5rem |
| --space-8 | 2rem |
| --space-12 | 3rem |
| --space-16 | 4rem |

## Border-radius
| Token | Valor | Uso |
|---|---|---|
| --radius-sm | 4px | Badges, inputs |
| --radius-md | 8px | Cards, botões |
| --radius-lg | 16px | Modais, painéis |
| --radius-full | 9999px | Pills, avatares |

## Sombras
| Token | Valor | Uso |
|---|---|---|
| --shadow-sm | 0 1px 3px rgba(0,0,0,0.3) | Elevação mínima |
| --shadow-md | 0 4px 16px rgba(0,0,0,0.4) | Cards elevados |
| --shadow-lg | 0 8px 32px rgba(0,0,0,0.5) | Modais, dropdowns |

→ Tokens técnicos derivados de: [[../smart-memory/project/brand-tokens]]

═══════════════════════════════
ARQUIVO 2: docs/design-system/design-system.css
═══════════════════════════════

/* Design System — [nome] */
/* Gerado a partir de docs/smart-memory/project/brand-tokens.md */

:root {
  /* Cores primárias */
  --color-primary: [hex da marca];
  --color-primary-hover: [10% mais escuro];
  --color-primary-subtle: [hex com 10% opacidade];

  /* Neutra */
  --color-bg: #0a0a0a;
  --color-surface: #141414;
  --color-border: rgba(255,255,255,0.08);
  --color-text: #ffffff;
  --color-text-muted: rgba(255,255,255,0.55);

  /* Semântica */
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* Tipografia */
  --font-primary: '[fonte escolhida]', system-ui, sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;

  /* Espaçamentos */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Border-radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Sombras */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.4);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.5);
}

═══════════════════════════════
ARQUIVO 3: docs/design-system/tailwind.tokens.js
═══════════════════════════════

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-subtle': 'var(--color-primary-subtle)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        'text-muted': 'var(--color-text-muted)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },
      fontFamily: {
        primary: 'var(--font-primary)',
      },
      fontSize: {
        xs:   'var(--text-xs)',
        sm:   'var(--text-sm)',
        base: 'var(--text-base)',
        lg:   'var(--text-lg)',
        xl:   'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
      },
      spacing: {
        1:  'var(--space-1)',
        2:  'var(--space-2)',
        3:  'var(--space-3)',
        4:  'var(--space-4)',
        6:  'var(--space-6)',
        8:  'var(--space-8)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
    },
  },
};

═══════════════════════════════
APÓS CRIAR OS 3 ARQUIVOS:
═══════════════════════════════
Registre em docs/smart-memory/shared-context.md:
- Design system técnico criado
- Arquivos: tokens.md, design-system.css, tailwind.tokens.js
- Pronto para handoff ao Claude Design`;

const FILES = [
  { file: 'docs/smart-memory/INDEX.md', desc: 'Índice do vault com links para todos os documentos' },
  { file: 'docs/smart-memory/shared-context.md', desc: 'Estado atual — o que foi feito e qual é a próxima ação' },
  { file: 'docs/smart-memory/project/overview.md', desc: 'Quem é a pessoa, o que está sendo construído e por quê' },
  { file: 'docs/smart-memory/project/brand-tokens.md', desc: 'Tokens de marca em linguagem natural (cor, tipografia, tom)' },
  { file: 'docs/smart-memory/stories/BACKLOG.md', desc: 'Stories de desenvolvimento com links para os tokens' },
];

export default function ArquitetoPage() {
  return (
    <WorkshopPhaseLayout slug="arquiteto">
      <FacilitatorNote duration="15 min">
        Esta é a fase mais densa — dois prompts em sequência. O primeiro cria a smart-memory e o grafo do Obsidian (momento visual). O segundo cria o design system completo. Abra o grafo após o primeiro prompt — mostre ao vivo antes de partir para o segundo.
      </FacilitatorNote>

      <p className="mb-8 text-base leading-relaxed text-white/70">
        O Arquiteto faz duas coisas nesta fase: cria a smart-memory com wikilinks Obsidian (grafo visual da marca) e gera o design system completo — tokens, CSS vars e config Tailwind. Tudo em sequência, lendo o mesmo <InlineCode>brand-brief.md</InlineCode>.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        15 min · Fase 03 de 10
      </div>

      <div className="my-6 p-4" style={{ border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.04)' }}>
        <span className="block font-mono text-[10px] tracking-[0.18em] uppercase mb-1" style={{ fontFamily: MONO, color: ACCENT }}>Agente</span>
        <strong className="text-base text-white">@aiox-architect</strong>
        <span className="ml-2 text-sm text-white/50">— estrutura, memória persistente, wikilinks, design system</span>
      </div>

      <h2 className="mb-1 mt-10 text-xl font-bold text-white">Passo 1 — Smart-memory + grafo Obsidian</h2>
      <p className="mb-3 text-sm text-white/55">Cole primeiro. Após rodar, abra o grafo no Obsidian antes de continuar.</p>
      <CodeBlock label="claude code — passo 1">{PROMPT}</CodeBlock>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">5 arquivos criados</h2>
      <div className="space-y-2">
        {FILES.map((item) => (
          <div key={item.file} className="p-4" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <InlineCode>{item.file}</InlineCode>
            <p className="mt-2 text-sm text-white/55">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-10 text-xl font-bold text-white">Após rodar — abra o grafo</h2>
      <ol className="ml-0 list-none space-y-3 text-sm text-white/70">
        {[
          'No Obsidian, pressione Ctrl/Cmd + G para abrir a visualização de grafo.',
          'Você verá os 5 nós conectados pelas arestas dos wikilinks.',
          'Clique num nó para navegar até o arquivo.',
          'O grafo vai crescer nas próximas fases conforme novos arquivos são criados.',
        ].map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center text-[10px] font-bold border" style={{ fontFamily: MONO, color: ACCENT, borderColor: 'rgba(255,58,14,0.35)', background: 'rgba(255,58,14,0.06)' }}>{i + 1}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>

      <FacilitatorNote>
        Pause aqui e pergunte: <em>&ldquo;Alguém aqui já usava Obsidian antes?&rdquo;</em> O vault funciona offline, é só arquivos de texto, pode ser sincronizado com Git ou iCloud. O Claude pode ler e escrever nele em qualquer sessão futura — a memória é persistente.
      </FacilitatorNote>

      <Callout label="Momento WOW — o grafo">
        Os wikilinks <InlineCode>{'[[assim]]'}</InlineCode> não são só links — são as arestas do grafo do Obsidian. O agente criou uma rede de conhecimento sobre a marca. Em qualquer sessão futura, você abre esse vault e o Claude tem contexto completo — sem reexplicar nada.
      </Callout>

      {/* ── PASSO 2 — DESIGN SYSTEM ── */}
      <h2 className="mb-1 mt-14 text-xl font-bold text-white">Passo 2 — Design system completo</h2>
      <p className="mb-3 text-sm text-white/55">Após ver o grafo no Obsidian, rode este segundo prompt no mesmo Claude Code.</p>

      <CodeBlock label="claude code — passo 2">{PROMPT_DESIGN_SYSTEM}</CodeBlock>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">Arquivos de design system gerados</h2>
      <div className="space-y-2">
        {[
          { file: 'docs/design-system/tokens.md', desc: 'Paleta completa (primária, secundária, neutros, semânticas), tipografia com link Google Fonts, escala xs→4xl, espaçamentos, border-radius, sombras — cada decisão justificada.' },
          { file: 'docs/design-system/design-system.css', desc: 'CSS custom properties semânticas no :root. Cole em qualquer projeto para ativar o sistema inteiro.' },
          { file: 'docs/design-system/tailwind.tokens.js', desc: 'Extensão do tailwind.config.js. Referencia as CSS vars — não duplica valores.' },
        ].map((item) => (
          <div key={item.file} className="p-4" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <InlineCode>{item.file}</InlineCode>
            <p className="mt-2 text-sm text-white/55">{item.desc}</p>
          </div>
        ))}
      </div>

      <Callout label="Por que semântico?">
        <InlineCode>--color-primary</InlineCode> em vez de <InlineCode>--color-orange-500</InlineCode>. Se você mudar a cor amanhã, só troca um valor e tudo propaga. Tokens semânticos descrevem o papel, não o valor literal.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
