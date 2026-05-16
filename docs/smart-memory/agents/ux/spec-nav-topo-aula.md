---
name: spec-nav-topo-aula
description: Spec UX — reposicionamento da navegação prev/next para o topo da página de aula (Story 3.6)
metadata:
  type: ux-spec
  story: "3.6"
  status: ready
  component: NavBar / AulaPage
tags: [navigation, lesson, ux-spec, mobile]
---

# Spec: Nav prev/next no topo da página de aula

**Princípio:** a navegação entre aulas deve estar disponível sem rolar a página. Nav compacta, não cards grandes — o foco é o conteúdo, não a navegação.

---

## Contexto atual

- Componente existente: `NavCards` em `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx:460`
- Posição atual: após as tabs (final da página) — requer scroll para acessar
- Formato atual: dois cards grandes com título da aula anterior/próxima, módulo e bordas
- **Problema:** usuário que termina o vídeo e quer avançar precisa rolar até o fim

---

## Novo posicionamento

A navegação prev/next vai para a barra que contém `MarkCompleteButton` (linha 388 do page.tsx), integrando-se horizontalmente.

### Estrutura da barra atual (linha 349–406)

```
┌────────────────────────────────────────────────────────┐
│  [breadcrumb: Curso / Módulo]                          │
│  Título da aula                                        │
│  ─────────────────────────────────────────────────────  │
│  [✓ Marcar como concluída]      [≡ Lista mobile]       │
└────────────────────────────────────────────────────────┘
```

### Nova estrutura (desktop ≥ lg)

```
┌────────────────────────────────────────────────────────┐
│  [breadcrumb: Curso / Módulo]                          │
│  Título da aula                                        │
│  ─────────────────────────────────────────────────────  │
│  [✓ Marcar como concluída]    [← Anterior] [Próxima →] │
└────────────────────────────────────────────────────────┘
```

### Nova estrutura (mobile < lg)

```
┌────────────────────────────────────┐
│  [breadcrumb: Curso / Módulo]      │
│  Título da aula                    │
│  ──────────────────────────────── │
│  [✓ Marcar como concluída]  [≡]   │
│  ──────────────────────────────── │
│  [← Anterior]        [Próxima →]  │
└────────────────────────────────────┘
```

No mobile, prev/next ficam em linha separada abaixo do MarkComplete, empilhados logo após — sem scroll adicional.

---

## Design do componente nav compacto

### Anatomy

```
[← Anterior]     [Próxima →]
```

Cada botão/link tem:
- Seta (`←` / `→`) como ícone visual primário
- Texto curto: `"Anterior"` / `"Próxima"` — label fixo, não o título da aula
- O título da aula aparece em tooltip ou linha secundária ao hover (desktop) / sempre visível em uma linha abaixo (mobile)

### Visual — botão compacto

```
┌─────────────────┐
│ ← Anterior      │
│  Nome da aula   │  ← text-[11px] bone-mute, truncate, max-w-[120px]
└─────────────────┘
```

- Borda: `1px solid var(--hairline)` com `rounded-sm`
- Fundo: transparente; hover: `var(--ink-2)`
- Padding: `px-3 py-2`
- Seta: `ArrowLeft` / `ArrowRight` Lucide, `h-3.5 w-3.5`, cor `var(--bone-mute)`
- Label fixo ("Anterior"/"Próxima"): `font-mono text-[10px] uppercase tracking-wide`, `var(--bone-mute)`
- Título da aula: `text-[11px] leading-tight`, `var(--bone-dim)`, `truncate max-w-[120px]` — linha separada abaixo do label
- Hover no título: `var(--bone)`
- Quando não há aula anterior ou próxima: botão com `opacity-30 pointer-events-none` (não renderiza vazio, mantém layout estável)

### Tamanho total do bloco nav

```
flex gap-2 items-center
```

Dois botões em linha. No desktop encaixam ao lado direito do MarkComplete via `justify-between`.

---

## Integração no JSX

### Substituição em `page.tsx`

Remover `<NavCards>` do final da página (após LessonTabs).

Adicionar `<NavBar>` (novo componente compacto) dentro da div que contém `MarkCompleteButton`:

```tsx
{/* Barra: MarkComplete + Nav */}
<div className="mt-4 flex items-start justify-between gap-4 flex-wrap">
  {/* Esquerda */}
  <MarkCompleteButton ... />

  {/* Direita: nav compacto + mobile toggle */}
  <div className="flex items-center gap-2">
    <LessonNavCompact slug={slug} globalPrev={globalPrev} globalNext={globalNext} />
    <div className="flex lg:hidden">
      <MobileLessonDrawer ... />
    </div>
  </div>
</div>
```

No mobile (`< lg`): a barra usa `flex-wrap` — o nav cai para linha abaixo se não couber. Garantir `w-full` no nav quando em mobile.

---

## Componente `LessonNavCompact`

Novo componente extraído de `NavCards`, sem a estrutura de card grande.

**Props:** mesmas do `NavCards` atual — `slug`, `globalPrev`, `globalNext`.

**Responsivo:**
- Desktop: `flex-row gap-2`
- Mobile: `flex-row gap-2 w-full` — ambos botões crescem para preencher linha (`flex-1` cada)

**Estados:**

| Estado | Comportamento |
|---|---|
| Tem prev e next | Ambos botões visíveis e clicáveis |
| Sem prev (primeira aula) | Botão ← com `opacity-30 pointer-events-none` |
| Sem next (última aula) | Botão → com `opacity-30 pointer-events-none` |
| Aula locked | Nav não é afetado — usuário pode navegar entre aulas |

---

## O que remover

- Componente `NavCards` completo (linhas 460–570 do page.tsx) — substituído por `LessonNavCompact`
- A renderização de `<NavCards>` no JSX final da página (após `<LessonTabs>`)

---

## Acessibilidade

- `<Link>` com `aria-label="Aula anterior: {título}"` e `aria-label="Próxima aula: {título}"`
- Botão desabilitado (sem aula): renderizar como `<div>` com `aria-hidden="true"` — não ocupa tab order
- Foco visível: herda `outline` global do projeto
- Contraste label `--bone-mute` sobre `--ink`: 4.7:1 — passa AA

---

## O que NÃO fazer

- Não mostrar título completo da aula no botão — truncar ou ocultar em telas pequenas
- Não manter os cards grandes na parte inferior da página
- Não adicionar animação no clique — transição de cor no hover é suficiente
- Não usar `toast` ou feedback visual além da navegação direta
