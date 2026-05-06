---
title: Academy Design Spec
updated: 2026-05-06
tags: [design-system, academy, ux, refundacao]
---

# Academy Design Spec

Design language autoritativo para todas as telas do /academy. Dev agents devem seguir esta spec sem desvios — qualquer dúvida, escalar para UX antes de implementar.

---

## 1. Design Language

### Filosofia

Brutalismo empresarial com precisão tipográfica. Sem ornamentos gratuitos. Cada elemento justifica sua existência através de função. Escuridão como palco, ember como sinal.

### Tokens de Cor

Usar CSS custom properties do `:root` definido em `src/app/globals.css`. **Nunca hardcodar hex** — sempre referenciar token.

| Token | Valor | Uso |
|---|---|---|
| `--void` | `#050507` | Background base (html, body, fullscreen pages) |
| `--ink` | `#0e0e11` | Surface primária — cards, sidebar, painéis |
| `--ink-2` | `#16161a` | Surface elevada — inputs, hover states de card |
| `--ink-3` | `#1f1f24` | Surface mais elevada — hover states, dropdowns |
| `--hairline` | `rgba(255,255,255,0.07)` | Bordas internas e divisórias sutis |
| `--hairline-strong` | `rgba(255,255,255,0.16)` | Bordas de inputs e elementos interativos |
| `--bone` | `#f1f1f3` | Texto primário, labels |
| `--bone-dim` | `#c5c5ca` | Texto secundário |
| `--bone-mute` | `#84848c` | Texto terciário, placeholders, metadados |
| `--ember` | `#ff3a0e` | Acento primário — CTAs, active states, glow, erros |
| `--ember-glow` | `#ff5a1f` | Hover do acento |

**Proibido:** usar `--color-accent`, `--color-background` ou tokens legados GrowthSales fora de contextos explicitamente marcados como legado.

### Tipografia

Três papéis tipográficos, uso estrito:

| Papel | Token | Fonte de fallback | Uso |
|---|---|---|---|
| Display | `var(--type-display)` | Georgia, serif | Headings de página (H1), títulos heróicos. Sempre `font-weight: 300`, `font-style: italic` em contexto auth. |
| Sans | `var(--type-sans)` | system-ui, sans-serif | Corpo de texto, parágrafos, subtítulos |
| Mono | `var(--type-mono)` | ui-monospace, Menlo | Labels, botões, nav items, badges, metadados — TUDO em uppercase com letter-spacing |

**Regras de Mono:**
- Font-size: `10px–11px` para labels compactos, `12px–13px` para texto de ação
- `letter-spacing`: `0.18em–0.22em` em labels pequenos; `0.10em` em texto maior
- `font-weight: 500–600`
- Sempre `text-transform: uppercase`

### Border Radius

**Zero. Nunca usar border-radius no academy.**

O sistema é brutalista: `border-radius: 0` em todos os elementos — cards, inputs, botões, badges, modais, drawers. A única exceção são elementos herdados de bibliotecas externas onde sobrescrever causaria regressão visual.

### Sombras e Glow

- Glow de foco em ember: `box-shadow: 0 0 0 1px var(--ember)`
- Glow de hover em botão primário: `filter: brightness(1.1)` + `box-shadow: 0 0 20px rgba(255,58,14,0.25)`
- Text-glow de display: `text-shadow: 0 0 40px rgba(255,58,14,0.25)` (uso moderado)
- Sombra de elevação: proibido usar drop-shadow convencional — usar apenas glow ember quando necessário

### Texture Pattern

Dot grid global aplicado como pseudo-elemento `::before` fixo em tela. Já está em `body::before` no globals.css. **Não replicar** em componentes individuais — exceto em páginas fullscreen sem `<body>` visível (ex.: auth pages que usam `min-h-screen`).

```css
background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
background-size: 24px 24px;
opacity: 0.55;
```

---

## 2. Padrões por Tipo de Tela

### 2a. Auth — Tela Centralizada (padrão atual)

Layout: coluna única centralizada, max-width `md` (448px), fundo `--void`, dot texture.

```
┌────────────────────────────────────────┐
│         (dot texture background)       │
│                                        │
│         [symbol-official.svg]          │
│         ACADEMY  ← mono label 10px     │
│         ─────────────────────────      │
│                                        │
│         Entrar                         │
│         ← type-display, 56px, italic   │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ border-top: 2px ember            │  │
│  │ background: --ink                │  │
│  │ padding: 48px                    │  │
│  │                                  │  │
│  │  Email                           │  │
│  │  [input ──────────────────────]  │  │
│  │                                  │  │
│  │  Senha         Esqueci senha     │  │
│  │  [input ──────────────────────]  │  │
│  │                                  │  │
│  │  [ENTRAR ──────────────────────] │  │
│  └──────────────────────────────────┘  │
│                                        │
│        Não tem conta? Cadastre-se      │
└────────────────────────────────────────┘
```

**Regras:**
- Brand mark: `symbol-official.svg` (28×24px) + label mono "Academy"
- Separador: `<hr>` com `border-top: 1px solid var(--hairline)`
- H1: `type-display`, `font-weight: 300`, `font-style: italic`, `56px`, `line-height: 0.9`
- Card de formulário: `border-top: 2px solid var(--ember)` é a assinatura visual — **nunca omitir**
- Subtexto: `font-size: 16px`, `color: rgba(241,241,243,0.45)`

### 2b. Auth — Split Screen (para upgrade futuro)

Para quando a tela de auth precisar de impacto visual maior. Layout 50/50.

```
┌─────────────────────┬──────────────────────┐
│                     │                      │
│  [A1-portrait       │  [symbol-official]   │
│   founder.png]      │  ACADEMY             │
│                     │  ─────────────────   │
│  [B1-wireframe-     │                      │
│   mesh overlay]     │  Entrar              │
│                     │  ← type-display      │
│  Quoted text        │                      │
│  sobre o método     │  [form card]         │
│                     │                      │
└─────────────────────┴──────────────────────┘
```

**Regras split-screen:**
- Painel esquerdo: `background: --ink`, imagem founder em `object-cover`, overlay de `--void` com opacity 40%
- Painel direito: `background: --void`, formulário centralizado
- Quote no painel esquerdo: `type-display`, italic, tamanho 24–32px, cor `--bone-dim`
- B1-wireframe-mesh como overlay decorativo: opacity 15–20%, `mix-blend-mode: overlay`

### 2c. Shell com Sidebar

Layout: sidebar fixa 256px (desktop) + `main` com `padding-left: 256px`.

```
┌──────────────┬────────────────────────────────┐
│  [logo 28px] │                                │
│  ACADEMY     │   Page content area            │
│  ──────────  │                                │
│              │                                │
│  ◉ Dashboard │                                │
│  ○ Cursos    │                                │
│  ○ Fórum     │                                │
│  ○ Agenda    │                                │
│  ○ Certs     │                                │
│  ○ Perfil    │                                │
│              │                                │
│  ──────────  │                                │
│  ← Sair      │                                │
└──────────────┴────────────────────────────────┘
```

**Regras de sidebar:**
- Background: `--ink`
- Border-right: `1px solid var(--hairline)`
- Logo area height: `h-16` (64px), border-bottom: `1px solid var(--hairline)`
- Nav items: `type-mono`, `10px`, uppercase, `letter-spacing: tracking-wider`
- Item inativo: `rgba(241,241,243,0.4)`
- Item ativo: `background: rgba(255,58,14,0.1)`, `color: var(--ember)`
- Item hover: `background: rgba(255,255,255,0.05)`
- Logout e ações secundárias: `rgba(241,241,243,0.25)`, sem ênfase
- **Admin sidebar divergência:** usa `bg-[#0C0C12]` e `border-white/10` — migrar para tokens em próximo refactor

### 2d. Cards de Conteúdo

```
┌──────────────────────────────────────┐
│  background: --ink                   │
│  border: 1px solid --hairline        │
│  border-radius: 0                    │
│  padding: 24–32px                    │
│                                      │
│  [mono-label tag]                    │
│  Título do Card                      │
│  Subtexto em --bone-dim              │
│                                      │
│  [ação secundária]   [AÇÃO PRIMÁRIA] │
└──────────────────────────────────────┘
```

**Hover state:** `background: --ink-2` (nunca sombra convencional)

### 2e. Tabelas Admin

```
┌──────────────────────────────────────────────────┐
│  HEADER ROW                                      │
│  background: --ink-2, border-bottom: --hairline  │
│  mono labels uppercase                           │
├──────────────────────────────────────────────────┤
│  Row 1 — background: transparent                 │
│  border-bottom: 1px solid --hairline             │
├──────────────────────────────────────────────────┤
│  Row 2 — hover: background --ink-2               │
└──────────────────────────────────────────────────┘
```

**Regras:**
- Nenhuma sombra
- Header: mono uppercase, `--bone-mute`, `font-size: 11px`, `letter-spacing: 0.12em`
- Células: `--bone-dim`, `font-size: 14px`, `type-sans`
- Status badges: inline, mono, uppercase, `font-size: 10px`, `padding: 2px 8px`
- Cores de status: usar category colors do globals (verde, roxo, cyan) — nunca hardcodar

---

## 3. Brand Asset Guide

| Asset | Arquivo | Dimensões recomendadas | Uso |
|---|---|---|---|
| Logo horizontal | `logo-header.png` | Altura 32px | Header de marketing, emails |
| Logo horizontal SVG | `logo-horizontal.svg` | Altura 32px | Preferir SVG ao PNG quando disponível |
| Símbolo (marca) | `symbol-official.svg` | 28×24px | Sidebar header, auth brand mark, favicon context |
| Símbolo legado | `logo-symbol.svg` | 28×24px | Atualmente em uso — migrar para `symbol-official.svg` |
| Logo all-type | `logo-alltype.svg` | Variável | Contextos onde nome completo é necessário sem símbolo |
| Logo vertical | `logo-vertical.svg` | Variável | Raro — rodapés verticais |
| Foto founder | `A1-portrait-founder.png` | Painel 50% da tela | Auth split-screen painel esquerdo, seções de credibilidade |
| Wireframe mesh | `B1-wireframe-mesh.png` | Full bleed com overlay | Overlay decorativo em painéis escuros (opacity 15–20%) |
| Icosaedro 3D | `B5-icosahedron.png` | 120–200px | Elemento decorativo isolado em seções de destaque |

**Regras de uso:**

1. **symbol-official.svg** é o brand mark canônico para a plataforma Academy. Substituir `logo-symbol.svg` por `symbol-official.svg` em todos os componentes de sidebar e auth.
2. **A1-portrait-founder** só aparece em contexto de autoridade/confiança — auth split-screen e páginas de sobre/credenciais. Nunca em contexto funcional (dashboards, tabelas).
3. **B1-wireframe-mesh** é sempre overlay, nunca background direto. Combine com `mix-blend-mode: overlay` e opacity baixa.
4. **B5-icosahedron** é elemento decorativo esporádico — máximo 1 por viewport. Evitar em telas funcionais (admin, form pages).
5. Todos os assets são `priority` em Auth pages (above-the-fold). Em shells, apenas o logo da sidebar.

---

## 4. Component Patterns

### 4a. Input

```
Estado padrão:
  background: --ink-2
  border: 1px solid --hairline-strong
  border-radius: 0
  padding: 14px 18px
  color: --bone
  font-size: 14px (0.875rem)

Placeholder:
  color: rgba(241,241,243,0.25)

Focus:
  border-color: --ember
  box-shadow: 0 0 0 1px --ember
  (NUNCA usar outline padrão do browser em inputs — override com box-shadow)

Error state:
  border-color: --ember (mantém foco visual)
  Mensagem de erro abaixo: font-size 12px, color --ember
```

**Label de input:**
- `font-size: 14px` (0.875rem)
- `color: rgba(241,241,243,0.6)`
- `type-sans` (não mono)
- Sem uppercase em labels de formulário

### 4b. Botão Primário

```
background: --ember
color: --void  (não white — contraste WCAG AA aprovado)
font-family: --type-mono
font-size: 11px
font-weight: 600
letter-spacing: 0.22em
text-transform: uppercase
border-radius: 0
border: none
min-height: 44px  (touch target mínimo)
width: 100% (dentro de formulários)

Hover: filter: brightness(1.1)
Disabled: opacity: 0.45, cursor: not-allowed
Focus-visible: outline: 2px solid rgba(255,58,14,0.5), outline-offset: 2px
```

### 4c. Botão Secundário / Ghost

```
background: transparent
color: --bone-dim
border: 1px solid --hairline-strong
font-family: --type-mono
font-size: 11px
letter-spacing: 0.18em
text-transform: uppercase
border-radius: 0
min-height: 44px

Hover: border-color: --hairline, color: --bone
```

### 4d. Labels e Badges

```
Padrão .mono-label:
  font-family: --type-mono
  font-size: 11px
  letter-spacing: 0.18em
  text-transform: uppercase
  color: --bone-mute
  font-weight: 500

Badge de status (ex.: "Ativo", "Pendente"):
  + padding: 2px 8px
  + background: rgba(cor-categoria, 0.1)
  + color: cor-categoria
  + border: 1px solid rgba(cor-categoria, 0.2)
```

### 4e. Card

```
background: --ink
border: 1px solid --hairline
border-radius: 0
padding: 24px (default) | 32px (featured) | 16px (compact)

Hover:
  background: --ink-2
  (sem transform, sem shadow)

Variante featured (card principal de seção):
  border-top: 2px solid --ember  ← assinatura Refundacao
```

### 4f. Modais e Drawers

```
Overlay (backdrop):
  background: rgba(0,0,0,0.6)
  backdrop-filter: blur(4px)  (opcional — verificar performance)

Container:
  background: --ink
  border: 1px solid --hairline-strong
  border-radius: 0
  max-width: 480px (modal padrão)

Header do modal:
  border-bottom: 1px solid --hairline
  padding: 20px 24px
  font-family: --type-mono, uppercase

Footer do modal:
  border-top: 1px solid --hairline
  padding: 16px 24px
  display: flex, gap: 12px, justify-content: flex-end
```

### 4g. Divisórias e Accent Lines

```
Divisória padrão:
  border: none
  border-top: 1px solid --hairline

Accent line (highlight visual):
  height: 2px
  background: linear-gradient(90deg, transparent, --ember 30%, --ember 70%, transparent)
  border-radius: 0
```

### 4h. Error e Alert Boxes

```
Error:
  background: rgba(255,58,14,0.1)
  border: 1px solid rgba(255,58,14,0.2)
  padding: 10px 16px
  font-size: 13px
  color: --ember
  border-radius: 0

Success (quando necessário):
  background: rgba(34,197,94,0.1)
  border: 1px solid rgba(34,197,94,0.2)
  color: #22c55e
```

---

## 5. Checklist de Conformidade

Dev agents devem verificar estes pontos antes de marcar qualquer componente como pronto.

### Tokens

- [ ] Nenhum hex hardcoded — todos os valores referenciam tokens CSS var()
- [ ] Tokens Refundacao usados (`--void`, `--ink`, `--ember`, etc.), não aliases GrowthSales legados
- [ ] `background-color` de body/page usa `--void`

### Border Radius

- [ ] Todos os elementos interativos têm `border-radius: 0`
- [ ] Nenhum `rounded-*` class do Tailwind sem justificativa documentada

### Tipografia

- [ ] H1 de página usa `--type-display`, italic, weight 300
- [ ] Botões, nav items, labels usam `--type-mono`, uppercase, letter-spacing
- [ ] Corpo de texto usa `--type-sans`
- [ ] Placeholders e metadados usam opacidade de `--bone` (não cores diferentes)

### Interatividade

- [ ] Todos os elementos focusáveis têm `focus-visible` visível (2px ember outline ou box-shadow)
- [ ] Inputs têm `focus` com ember border + box-shadow (não outline nativo)
- [ ] Botão primário tem `min-height: 44px`
- [ ] Estados disabled têm `opacity: 0.45` e `cursor: not-allowed`

### Acessibilidade

- [ ] Inputs têm `<label htmlFor>` associado ou `aria-label`
- [ ] Imagens decorativas têm `alt=""` ou `aria-hidden="true"`
- [ ] Imagens informativas têm `alt` descritivo
- [ ] Erros identificados por texto, não só por cor ember
- [ ] Mobile drawer usa `role="dialog"`, `aria-modal="true"`, foco gerenciado
- [ ] Contraste mínimo 4.5:1 para texto em backgrounds (ember sobre void: verificar)

### Brand Assets

- [ ] Auth pages usam `symbol-official.svg` (não `logo-symbol.svg`)
- [ ] `A1-portrait-founder` aparece apenas em contextos de autoridade
- [ ] Assets acima-do-fold têm `priority` no `<Image>`
- [ ] Nenhum asset de brand redimensionado proporcionalmente incorreto

### Estrutura de Sidebar

- [ ] Desktop: `fixed`, `w-64`, `inset-y-0`, `left-0`, `z-40`
- [ ] Mobile: drawer com `role="dialog"`, `aria-modal`, backdrop clicável
- [ ] Escape fecha o drawer mobile
- [ ] Item ativo com `aria-current="page"`
- [ ] Logout no rodapé, separado por `border-top: 1px solid --hairline`

### Admin vs Student

- [ ] Admin sidebar: identificador visual diferenciado (shield icon + label "Admin")
- [ ] Admin sidebar: MIGRAR de `bg-[#0C0C12]` para `background: var(--ink)` no próximo refactor
- [ ] Admin sidebar: MIGRAR de `border-white/10` para `border: 1px solid var(--hairline)`
- [ ] Rotas admin nunca acessíveis por roles student (verificação server-side)

---

## Referências de Implementação

- Globals: `src/app/globals.css`
- Auth login (padrão de formulário): `src/app/(academy)/academy/login/`
- Student sidebar (padrão de shell): `src/components/student/StudentSidebar.tsx`
- Admin sidebar (pendente migração de tokens): `src/components/admin/AdminSidebar.tsx`
