---
title: Spec UX — Centro de Treinamento dos Agentes (slides faltantes)
type: ux-spec
status: ready-for-implementation
agent: sites-ux (Velani)
created: 2026-05-14
updated: 2026-05-14
tags: [ux, spec, treinamento, agentes, slideshow]
related: ["[[components]]", "[[../../../project/overview]]", "[[../../../project/tech-stack]]"]
---

# Spec UX — Slides Faltantes: Centro de Treinamento dos Agentes

## Contexto Crítico

**A página já existe:** `src/app/mentoria/presencial/centro-treinamento/page.tsx`
**Componente:** `ModuloSlideshow.tsx` com tipo `Slide[]` bem definido
**Padrão:** cada slide tem `label` + `title` + `body` + opcional `diagram | agents | belt | stats | video | screenshot | note`

O trabalho é **adicionar novos slides** (e os diagramas correspondentes no `ModuloSlideshow.tsx`) — não criar nova página.

---

## Estado Atual dos Slides

| # | Label | Diagrama/Tipo | Status |
|---|---|---|---|
| 1 | Centro de Treinamento · 4 Squads | `ct-overview` | EXISTE |
| 2 | Time vs Solo · Protocolo | `team-protocol` | EXISTE |
| 3 | /team-os · O Maestro | `team-os-commands` | EXISTE |
| 4 | Smart Memory · docs/smart-memory/ | `video` | EXISTE |
| 5 | /team-os-creator · Agent Factory | `creator-commands` | EXISTE |
| 6 | Por onde começar · 3 passos | `getting-started` | EXISTE |
| 7 | /team-os-creator · Referência | `creator-commands` | EXISTE |

---

## Design System — Padrão do Slideshow

Extraído diretamente de `ModuloSlideshow.tsx`:

```
ACCENT  = '#FF3A0E'
MONO    = 'var(--font-mono)'
SERIF   = 'var(--font-display-serif)'
DISPLAY = 'var(--font-display)'

Fundo: #050507
Card border: rgba(255,255,255,0.08–0.12)
Card bg: rgba(255,255,255,0.015–0.03)
Texto secundário: rgba(255,255,255,0.32–0.55)
Texto accent: #FF3A0E
Transição entrada: { opacity: 0, x: 24 } → { opacity: 1, x: 0 }, delay 0.25, duration 0.55, ease [0.22,1,0.36,1]
```

**Widths dos diagramas existentes:** 280–400px (variável por conteúdo)
**AgentCard interno:** 110×147px, imagem `/agentes/{slug}.png`, overlay gradiente, mono labels

---

## Slides a Adicionar

### Posicionamento no array `slides[]`

Inserir **após o slide 1** (`ct-overview`) para contar a história linear:
overview → agentes individuais → squads detalhadas → estrutura de pastas → comandos base

```
1. ct-overview     (EXISTE)
2. agents-belt     (NOVO — todos os 37)
3. squads-detail   (NOVO — squads com agentes e funções)
4. folder-structure (NOVO — .claude/ hierarquia)
5. comandos-base   (NOVO — /model /compact /clear)
6. team-protocol   (EXISTE — manter posição)
7. team-os-commands (EXISTE)
8. smart-memory    (EXISTE)
9. creator-factory (EXISTE)
10. creator-commands (EXISTE)
11. getting-started (EXISTE)
12. creator-ref    (EXISTE)
```

---

## Slide A — 37 Agentes (belt + grid filtrável)

### Posição: após slide 1

### Dados necessários (já disponíveis em `src/data/agentes/`)
```typescript
import { ALL_AGENTES, SQUADS } from '@/data/agentes';
// 37 agentes com: slug, codename, title, squad, color
// SQUADS com: id, label, accent
```

### Tipo de slide: `belt: true` + `agents` (todos os 37)

O `AgentBelt` interno já existe no `ModuloSlideshow.tsx` — faz loop infinito com framer-motion.
O `AgentGrid` já existe — grid 2–3 colunas para grupos menores.

### Abordagem para "filtrável por squad"

Filtro client-side via `useState` dentro de um novo componente de diagrama `AllAgentsDiagram`. O slide type `diagram` recebe `'all-agents'` (novo valor a adicionar ao union type).

### Estrutura visual do diagrama

```
LABEL: TODOS OS 37 AGENTES

[TODOS] [DEV 10] [SITES 10] [SOCIAL 7] [TRAFFIC 10]
  chips: border squad.accent, bg squad.accent/08
  chip ativo: bg squad.accent/20, border squad.accent

─── Belt (sem filtro ativo) ─────────────────────────
[ card ] [ card ] [ card ] [ card ] [ card ] [ card ]
         ← scroll contínuo automático →

─── Grid (filtro ativo) ──────────────────────────────
[ card ] [ card ] [ card ]
[ card ] [ card ] [ card ]
[ card ] [ card ] [ card ]
   ... até N cards do squad selecionado
```

Belt usa `AgentBelt` existente. Grid usa `AgentGrid` existente. Switch entre os dois baseado em filtro ativo.

### Slide object

```typescript
{
  label: '37 Agentes · 4 Squads',
  title: 'Cada agente tem um papel. Nenhum faz tudo.',
  body: 'Dev, Sites, Social e Traffic — 37 especialistas com persona, autoridades e skills definidos. Você escolhe o squad certo para cada projeto.',
  diagram: 'all-agents',
}
```

### Acessibilidade
- Chips: `role="group"` + `aria-label="Filtrar por squad"`
- Cada chip: `aria-pressed={isActive}` + `aria-label="{label} Squad, {count} agentes"`
- Belt: `aria-label="Todos os 37 agentes em belt contínuo"` no container
- Grid: lista de cards com `alt="{codename} — {title}"`

---

## Slide B — Squads Detalhadas

### Posição: após slide A

### Tipo de slide: `diagram: 'squads-detail'` (novo valor)

### Estrutura visual

Quatro blocos empilhados verticalmente, cada squad em card próprio com lista de agentes:

```
LABEL: SQUADS · DEV / SITES / SOCIAL / TRAFFIC

┌──────────────────────────────────────────────┐
│ ● DEV                              10 agentes │
│ Backend · frontend · infra · QA               │
│ ────────────────────────────────────────────  │
│ Lyrak        Research Analyst                 │
│ Zaelor       Architect                        │
│ Bythak       Data Engineer                    │
│ Novik        Frontend Developer               │
│ Rexar        Backend Developer                │
│ Kronix       Hardening & Resilience           │
│ Serak        Fullstack/Integration            │
│ Gravok       DevOps Guardian                  │
│ Axikar       QA Master                        │
│ Velax        UX Specialist                    │
└──────────────────────────────────────────────┘
┌──────────────────────────────────────────────┐
│ ● SITES                            10 agentes │
│  ...mesmo padrão...                           │
└──────────────────────────────────────────────┘
```

Cores por squad (já usadas no `CtOverviewDiagram`):
- dev: `#A78BFA`
- sites: `#FF3A0E`
- social: `#EC4899`
- traffic: `#06B6D4`

### Animações

Stagger por squad card: `delay: 0.3 + index * 0.12`
Stagger por linha de agente dentro do card: `delay: cardDelay + agentIndex * 0.04`

### Largura

480px — mais largo que os diagramas existentes por ter mais conteúdo vertical.
Usar `overflow-y: auto` com `max-height: 70vh` para não vazar do slide.

### Slide object

```typescript
{
  label: 'Squads · Papéis e Funções',
  title: 'Quatro squads. Cada agente com função explícita.',
  body: 'Dev constrói o produto. Sites cuida do canal digital. Social cria e publica conteúdo. Traffic opera campanhas pagas. Cada squad tem analyst, architect, qa e devops — o mesmo protocolo, domínios diferentes.',
  diagram: 'squads-detail',
}
```

### Acessibilidade
- Cada squad: `role="region"` + `aria-label="{label} Squad"`
- Lista de agentes: `<ul>` semântica
- Nome do squad em texto sempre presente (não só cor)

---

## Slide C — Estrutura de Pastas

### Posição: após slide B

### Tipo de slide: `diagram: 'folder-structure'` (novo valor)

### Estrutura visual

Dois blocos lado a lado (desktop) / empilhados (mobile do slideshow — o slideshow já trata isso via scroll):

```
LABEL: ESTRUTURA DE PASTAS · .claude/

┌─────────────────────┐    ┌──────────────────────┐
│ ~/.claude/          │    │ ~/projeto/            │
│ ├── CLAUDE.md       │    │ ├── .claude/          │
│ │                   │    │ │   ├── CLAUDE.md     │
│ ├── agents/         │    │ │   ├── settings.json │
│ │   ├── dev/        │    │ │   └── agents/       │
│ │   │   ├── ...md   │    │ │       └── *.md      │
│ │   ├── sites/      │    │ └── docs/             │
│ │   ├── social/     │    │     └── smart-memory/ │
│ │   └── traffic/    │    │                       │
│ └── skills/         │    │  centro de treinamento│
│     └── team-os/    │    │  não editar aqui      │
│                     │    │                       │
│  centro de          │    │  seu projeto          │
│  treinamento        │    └──────────────────────┘
└─────────────────────┘
```

Bloco esquerdo (`~/.claude/`): border `rgba(255,58,14,0.3)`, bg `rgba(255,58,14,0.05)` — é especial/global
Bloco direito (`~/projeto/`): border `rgba(255,255,255,0.08)`, bg `rgba(255,255,255,0.02)` — padrão

Cada linha da árvore: `fontFamily: MONO, fontSize: '9px'` com prefixo `├─` em muted e nome em branco/accent.
Nota de alerta embaixo: border-left accent, fundo `rgba(255,58,14,0.06)`.

### Animações

Árvore linha a linha com stagger `delay: 0.3 + i * 0.04`. Os dois blocos entram simultaneamente com `x: ±24`.

### Slide object

```typescript
{
  label: 'Estrutura de Pastas · .claude/',
  title: 'Centro de treinamento separado dos projetos.',
  body: '~/.claude/ é global — agentes e skills ficam aqui, disponíveis em qualquer projeto. Cada projeto tem seu .claude/ próprio com CLAUDE.md, settings e agentes instalados. Nunca edite o centro de treinamento dentro de um projeto.',
  note: 'team-os-creator *install copia o que precisa para o projeto. O CT fica intacto.',
  diagram: 'folder-structure',
}
```

### Acessibilidade
- Cada bloco: `role="img"` + `aria-label="Estrutura de pastas de {contexto}"`
- Nota de alerta: ícone + texto (nunca só cor)

---

## Slide D — Comandos Base

### Posição: antes dos slides de team-os (inserir entre folder-structure e team-protocol)

### Tipo de slide: `diagram: 'base-commands'` (novo valor)

### Estrutura visual

Três cards em coluna (stacked), cada um com comando, descrição e "quando usar":

```
LABEL: COMANDOS BASE · /model /compact /clear

┌──────────────────────────────────────────────┐
│  /model                                      │
│  ──────────────────────────────────────────  │
│  Troca o modelo do agente ativo na sessão    │
│                                              │
│  QUANDO: antes de task que exige raciocínio  │
│  complexo — trocar para Opus                 │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│  /compact                                    │
│  ──────────────────────────────────────────  │
│  Comprime o histórico de contexto            │
│                                              │
│  QUANDO: contexto > 50% — agente começa a   │
│  repetir ou perder o fio                     │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│  /clear                                      │
│  ──────────────────────────────────────────  │
│  Limpa o contexto inteiro, começa do zero    │
│                                              │
│  QUANDO: agente em loop, erro irrecuperável  │
│  ou troca de task radicalmente diferente     │
└──────────────────────────────────────────────┘
```

Cada card: borda `rgba(255,255,255,0.08)`, bg `rgba(255,255,255,0.02)`
Nome do comando: `fontFamily: MONO, fontSize: '14px', color: ACCENT`
Separador: linha `rgba(255,58,14,0.2)` abaixo do nome
"Quando": label `rgba(255,255,255,0.25)` uppercase + texto `rgba(255,255,255,0.55)`

### Slide object

```typescript
{
  label: 'Comandos Base · /model /compact /clear',
  title: 'Três comandos que você vai usar toda sessão.',
  body: '/model para calibrar poder de processamento. /compact para conservar contexto. /clear para resetar quando o agente se perde. Simples — mas a diferença entre uma sessão produtiva e uma perdida.',
  diagram: 'base-commands',
}
```

### Acessibilidade
- Cada card: `role="article"` + `aria-label="Comando {nome}"`
- Nome do comando com `aria-label` descritivo no container

---

## Resumo: Alterações Necessárias

### 1. `ModuloSlideshow.tsx` — union type `diagram`

```typescript
diagram?: '...' | 'all-agents' | 'squads-detail' | 'folder-structure' | 'base-commands'
```

### 2. `ModuloSlideshow.tsx` — novos componentes de diagrama

| Função | Largura | Complexidade | Depende de |
|---|---|---|---|
| `AllAgentsDiagram()` | 460px | Média | AgentBelt + AgentGrid já existem no arquivo |
| `SquadsDetailDiagram()` | 480px | Média | Dados de ALL_AGENTES + padrão CtOverviewDiagram |
| `FolderStructureDiagram()` | 520px (dois blocos) | Baixa | Padrão SmartMemoryTreeDiagram |
| `BaseCommandsDiagram()` | 340px | Baixa | Dados estáticos, padrão TeamOsCommandsDiagram |

### 3. `ModuloSlideshow.tsx` — switch de render

Adicionar cases no bloco que mapeia `slide.diagram` para o componente JSX.

### 4. `page.tsx` — inserir os 4 slides novos no array

Posicionamento exato no array `slides[]`:
- Índice 1 → `all-agents` (após ct-overview)
- Índice 2 → `squads-detail`
- Índice 3 → `folder-structure`
- Índice 4 → `base-commands`
- Índices 5–11 → slides existentes mantidos sem alteração

---

## O que NÃO mudar

- `ModuloLayout.tsx` — sem alterações
- Slides existentes (`ct-overview`, `team-protocol`, `team-os-commands`, `smart-memory`, `creator-commands`, `getting-started`) — sem alterações no conteúdo
- Padrão visual do slideshow — todos novos diagramas seguem exatamente os padrões existentes (ACCENT, MONO, SERIF, delay pattern, border/bg pattern)
- Nenhuma nova dependência externa

---

## Dados dos Agentes por Squad (referência para implementação)

```
DEV (10) — cor: #A78BFA
  Lyrak/Research Analyst, Zaelor/Architect, Bythak/Data Engineer,
  Novik/Frontend Developer, Rexar/Backend Developer,
  Kronix/Hardening & Resilience, Serak/Fullstack/Integration,
  Gravok/DevOps Guardian, Axikar/QA Master, Velax/UX Specialist

SITES (10) — cor: #FF3A0E
  Lyrel/Research Analyst, Zaelion/Architect, Bythelion/Data Engineer,
  Novael/Frontend Developer, Rexali/Backend Developer,
  Kronilux/Hardening & Resilience, Seranol/Fullstack/Integration,
  Graveli/DevOps Guardian, Axilun/QA Master, Velani/UX Specialist

SOCIAL (7) — cor: #EC4899
  Soph/Social Analyst, Lyrix/Content Creator, Aevon/Graphic Designer,
  Irix/Photo Creator, Zenav/Publisher & Analytics,
  Verak/Strategist & Validadora, Fluxx/Video Editor

TRAFFIC (10) — cor: #06B6D4
  Lyrath/Performance Analyst, Florix/Traffic Automation Specialist,
  Bytax/BI & Analytics Specialist, Koprath/Ad Copywriter,
  Pixrek/Ad Creative Designer, Gorix/Google Ads Specialist,
  Zukar/Meta Ads Specialist, Gathar/Campaign QA Specialist,
  Axar/Traffic Strategist, Tokris/TikTok Ads Specialist
```

Fonte autoritativa: `src/data/agentes/agentes.json` — implementação deve ler de `ALL_AGENTES`/`SQUADS`, não hardcodar.
