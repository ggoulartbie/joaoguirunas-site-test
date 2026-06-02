---
title: "Story LS-1.3: Botão copiar nos blocos de código das aulas"
type: story
status: done
epic: LS
complexity: S
assignee: sites-dev-alpha
created: 2026-05-21
updated: 2026-05-21
implementado: 2026-05-21
agente: sites-dev-alpha (Novael)
branch: main
commit: 8fc6bad
tags: [story, aulas, ui, ux]
related: []
---

# Story LS-1.3: Botão copiar nos blocos de código das aulas

## Objetivo
Adicionar botão "Copiar" estilizado no canto superior direito de todos os blocos de código das aulas, com toast "Copiado com sucesso" ao clicar.

## Contexto técnico

**Arquivo principal:** `src/components/editor/CodeBlock.tsx`
- Componente já tem lógica de cópia (`navigator.clipboard.writeText`) com estado `copied`
- Feedback atual: troca de texto inline `copiar` → `copiado!`
- Problema 1: botão é apenas texto sem estilo visível, pouco perceptível
- Problema 2: feedback é inline no botão, não destaca o sucesso
- Problema 3 (markdown): blocos sem linguagem especificada caem no renderer inline de `<code>`, nunca passam pelo `CodeBlock`

**Arquivo de renderização:** `src/components/editor/LessonContent.tsx`
- Markdown: blocos com `language-*` → `CodeBlock`; blocos sem linguagem → `<code>` inline (BUG)
- MDX: todos os `pre` → `CodeBlock` (OK)
- HTML: `dangerouslySetInnerHTML` → sem botão (fora do escopo desta story)

**Libs disponíveis:**
- `lucide-react ^1.7.0` — usar ícones `Copy` e `Check`
- Sem biblioteca de toast instalada — implementar in-component

## Acceptance Criteria

- [x] AC1: `CodeBlock` exibe botão "Copiar" com ícone `Copy` (lucide-react) no canto superior direito, visível mesmo sem `language`/`filename`
- [x] AC2: Ao clicar, aparece uma notificação flutuante "Copiado com sucesso" (overlay absoluto/fixed animado) que some após ~2s
- [x] AC3: Durante o estado copiado, o ícone muda para `Check` e o texto muda para "Copiado!" dentro do botão
- [x] AC4: Blocos Markdown sem `language-*` também renderizam como `CodeBlock` (fix no handler `pre` de `LessonContent.tsx`)
- [x] AC5: Não quebra blocos de código inline (`` `code` ``) — apenas blocos fenced afetados

## Escopo

**IN:**
- `src/components/editor/CodeBlock.tsx` — redesign do botão + toast
- `src/components/editor/LessonContent.tsx` — fix do handler markdown para blocos sem linguagem

**OUT:**
- Conteúdo de aulas no formato HTML (usa `dangerouslySetInnerHTML`)
- Demais páginas fora da área de aulas

## Design de referência

Screenshot mostra bloco escuro (`bg-zinc-900`) com texto de prompt. O botão deve aparecer no canto superior direito do bloco, sutil mas visível, estilo `text-zinc-400 hover:text-white` com ícone pequeno (14-16px).

Toast: pequena notificação flutuante no canto, pode ser `absolute` dentro do wrapper do CodeBlock ou um estado visível de overlay.

## QA Results — 2026-05-21 — ✅ PASS

**QA:** sites-qa (Axilun) | **Commit auditado:** `8fc6bad` | **Branch:** main

**Verificação:**
- AC1–AC5: 5/5 atendidos. CodeBlock.tsx exibe botão com ícone `Copy`/`Check` em ambas variantes (com/sem header); toast overlay `absolute` com transição CSS 300ms e auto-dismiss 2s; LessonContent.tsx handler `pre` agora aceita blocos sem `language-*`; inline code preservado.
- 10-point checklist: 10/10 verificados.
- `pnpm tsc --noEmit` → exit 0.
- Sem regressões em consumidores (MDX via `lib/content/mdx.ts:9` e handlers do `LessonContent`; CodeBlocks locais em `workshop-2/*`, `learn/*` e `skills/*` são componentes próprios não afetados).

**Observação menor (não-bloqueante):** toast usa `top-10` fixo — funcional em ambas variantes, mas posicionamento poderia ser dinâmico em iteração futura. Botão também não tem `aria-label` explícito (texto "Copiar"/"Copiado!" cobre screen readers).

**Veredicto:** PASS — liberado para push.
**Próximo passo:** @sites-devops push para main.

Detalhes completos em `docs/smart-memory/agents/qa/results.md` (entrada 2026-05-21).
