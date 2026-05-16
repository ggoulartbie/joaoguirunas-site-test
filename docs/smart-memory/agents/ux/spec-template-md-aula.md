---
name: spec-template-md-aula
description: Spec UX — tipografia e espaçamento do template Markdown em LessonContent (Story 3.2)
metadata:
  type: ux-spec
  story: "3.2"
  status: ready
  component: LessonContent
tags: [typography, markdown, lesson, ux-spec]
---

# Spec: Template MD elegante — LessonContent

**Princípio:** menos é mais. Tipografia legível, espaçamento generoso, hierarquia visual humanizada. Sem cards pesados, sem fundos coloridos, sem emojis decorativos.

---

## Contexto de implementação

- Arquivo: `src/components/editor/LessonContent.tsx`
- Chamador: `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/LessonTabs.tsx:103`
- Classe atual passada pelo chamador: `"prose prose-sm prose-invert max-w-none"` — **substituir** por classe customizada `lesson-content` (sem `prose` do Tailwind, que traz bordas e fundos indesejados em alguns elementos)
- Tokens disponíveis: `--bone`, `--bone-dim`, `--bone-mute`, `--ember`, `--ink`, `--ink-2`, `--ink-3`, `--hairline`, `--type-display`, `--type-sans`, `--type-mono`

---

## Hierarquia tipográfica

### Headings

| Elemento | Tamanho | Peso | Cor | Margin-top |
|---|---|---|---|---|
| `### H3` | `text-base` (1rem) | `font-semibold` | `--bone` | `mt-8` |
| `#### H4` | `text-sm` (0.875rem) | `font-medium` | `--bone-dim` | `mt-6` |

- Fonte: `var(--type-sans)` — sem `font-display` (reservado para títulos de página)
- Nenhum heading recebe borda, fundo ou indicador lateral
- Heading precedido por parágrafo: `margin-top: 2.5rem` (espaço generoso para respirar)

### Parágrafo

- `text-sm` (0.875rem)
- `leading-relaxed` (1.625)
- Cor: `var(--bone-dim)`
- `max-w-prose` não forçado — respeita container pai
- `space-y-4` entre parágrafos consecutivos

### Texto forte / itálico

| Elemento | Estilo |
|---|---|
| `**bold**` | `font-semibold`, cor `--bone` (destaque sutil via peso, não cor) |
| `_italic_` | `italic`, cor `--bone-dim` |

---

## Listas

### Bullet list (`-` / `*`)

- Sem `list-disc` padrão do browser (círculo sólido pesado)
- Marcador customizado: `·` (U+00B7 MIDDLE DOT) via `::before` ou `list-style: none` + pseudo-elemento
- Cor do marcador: `var(--bone-mute)`
- Texto do item: `var(--bone-dim)`, `text-sm`, `leading-relaxed`
- Indentação: `pl-5`
- Espaço entre itens: `space-y-1.5`
- Sem borda lateral, sem fundo

### Ordered list (`1.`)

- Numeração com `var(--bone-mute)` via `::marker`
- Mesmas regras de texto da bullet list

### Lista aninhada

- Indentação adicional: `pl-5` (acumulado)
- Marcador do segundo nível: `–` (en dash), mesma cor `--bone-mute`

---

## Inline code e blocos de código

- Inline: já implementado — `bg-[--ink-3]`, texto `--ember`, `font-mono text-sm`, `rounded px-1 py-0.5`
- Bloco: delegado a `<CodeBlock>` já existente — não alterar

---

## Blockquote

- Sem fundo, sem borda-esquerda forte
- Borda esquerda fina: `2px solid var(--hairline-strong)` — discreta
- Padding: `pl-4 py-0.5`
- Texto: `italic`, `var(--bone-mute)`
- Uso: citação ou nota lateral, não destaque de aviso

---

## Callout / bloco de destaque (componente `<Callout>`)

- Apenas quando o autor escreve `<Callout>` explicitamente no MDX
- Não gerar callout automaticamente a partir de markdown puro
- Fundo: `var(--ink-2)`, borda esquerda `2px solid var(--ember)` apenas no tipo `warning`
- Tipos suportados: `info` (hairline), `warning` (ember), `tip` (bone-dim)
- Texto: `text-sm`, `var(--bone-dim)`

---

## Separador horizontal (`---`)

- `<hr>` renderizado como: `border-t border-[var(--hairline)] my-8`
- Sem cor, sem espessura extra

---

## Imagem inline

- `rounded-sm`, `w-full max-w-lg`, `my-6`
- Caption via `alt`: `font-mono text-[11px] text-center`, `var(--bone-mute)`, `mt-1.5`

---

## Implementação em `LessonContent.tsx`

### Estratégia

Substituir `className` genérico `prose prose-sm prose-invert max-w-none` por mapeamento explícito de componentes React no `ReactMarkdown` e no `MDXRemote`.

### Componentes a mapear em `ReactMarkdown`

```tsx
h3: ({ children }) => (
  <h3 className="mt-8 text-base font-semibold" style={{ color: 'var(--bone)', fontFamily: 'var(--type-sans)' }}>
    {children}
  </h3>
),
h4: ({ children }) => (
  <h4 className="mt-6 text-sm font-medium" style={{ color: 'var(--bone-dim)', fontFamily: 'var(--type-sans)' }}>
    {children}
  </h4>
),
p: ({ children }) => (
  <p className="text-sm leading-relaxed" style={{ color: 'var(--bone-dim)' }}>
    {children}
  </p>
),
ul: ({ children }) => (
  <ul className="space-y-1.5 pl-5 list-none" style={{ color: 'var(--bone-dim)' }}>
    {children}
  </ul>
),
ol: ({ children }) => (
  <ol className="space-y-1.5 pl-5" style={{ color: 'var(--bone-dim)' }}>
    {children}
  </ol>
),
li: ({ children }) => (
  <li className="relative text-sm leading-relaxed pl-3 before:content-['·'] before:absolute before:left-0 before:top-0"
      style={{ color: 'var(--bone-dim)' }}
      // before cor: --bone-mute via inline style não funciona — usar classe CSS
  >
    {children}
  </li>
),
strong: ({ children }) => (
  <strong className="font-semibold" style={{ color: 'var(--bone)' }}>{children}</strong>
),
em: ({ children }) => (
  <em className="italic" style={{ color: 'var(--bone-dim)' }}>{children}</em>
),
blockquote: ({ children }) => (
  <blockquote className="pl-4 py-0.5 italic border-l-2 my-4"
              style={{ borderColor: 'var(--hairline-strong)', color: 'var(--bone-mute)' }}>
    {children}
  </blockquote>
),
hr: () => (
  <hr className="my-8 border-t" style={{ borderColor: 'var(--hairline)' }} />
),
```

### Wrapper externo

O `<div>` que envolve o conteúdo deve ter `space-y-4` para espaçamento entre blocos de nível raiz.

```tsx
<div className={`space-y-4 ${className ?? ''}`}>
  {/* conteúdo */}
</div>
```

O chamador (`LessonTabs`) deve passar `className=""` (vazio) ou apenas classes de layout — não mais `prose prose-sm prose-invert max-w-none`.

---

## Acessibilidade

- Contraste `--bone-dim` sobre `--ink` (#c5c5ca / #0e0e11): ratio ~9.2:1 — passa WCAG AA e AAA
- Contraste `--bone-mute` sobre `--ink` (#84848c / #0e0e11): ratio ~4.7:1 — passa AA
- Heading hierarchy mantém H3 > H4 (nunca pula nível na spec)
- Links inline: herdam estilo do `<a>` global; não são estilizados aqui adicionalmente

---

## Estados

| Estado | Comportamento |
|---|---|
| Sem conteúdo | Mensagem placeholder já em `LessonTabs` — não altera |
| Conteúdo só texto plano | Renderiza como `<p>` com estilo padrão |
| Conteúdo com `###` e listas | Hierarquia tipográfica aplicada conforme spec |
| Conteúdo MDX com `<Callout>` | Delegado ao componente `Callout` existente |

---

## O que NÃO fazer

- Não adicionar fundos coloridos em heading
- Não usar `text-ember` em texto corrido (reservado para links ativos e marcadores do editor)
- Não adicionar emoji como bullet ou decoração
- Não usar `prose` do Tailwind (carrega bordas e fundos não desejados)
- Não colocar `max-w-prose` forçado — o container pai já controla largura
