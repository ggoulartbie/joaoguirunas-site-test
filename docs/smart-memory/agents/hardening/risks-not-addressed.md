---
name: risks-not-addressed-fixes-1.1-1.2-1.3
description: Riscos identificados no hardening que não foram corrigidos agora
metadata:
  type: project
  sprint: fix-aula-aluno-ux
  date: 2026-05-16
---

# Riscos não endereçados

## MEDIUM — Shiki não é mais usado para MARKDOWN no student view

**Contexto:** A solução do Fix 3 usa `react-markdown` + `CodeBlock` para renderizar código em aulas com formato MARKDOWN. O `CodeBlock` exibe o código mas sem syntax highlighting (não usa Shiki).

**Impacto:** Code blocks em aulas MARKDOWN aparecem sem coloração de sintaxe. Aulas MDX continuam com Shiki (via `pre` override nos `mdxComponents`).

**Risco:** Experiência degradada para alunos que estudam conteúdo com código em formato MARKDOWN.

**Alternativa futura:** Adicionar `rehype-shiki` como dependência direta e usar no pipeline `react-markdown` via `rehypePlugins`. Ou migrar conteúdo MARKDOWN para MDX no admin.

---

## LOW — Comentário sem `id` no fallback de server sem `comment`

**Contexto:** Quando `addComment` retorna `{ success: true }` sem o campo `comment` (bug futuro no server), o `CommentsSection` não adiciona à lista local (guarda `if (comment.id)`). O usuário precisa recarregar a página para ver o comentário.

**Impacto:** UX degradada em cenário improvável (falha de select após insert bem-sucedido).

**Mitigação atual:** `revalidatePath('/', 'layout')` no server garante que o RSC vai revalidar e o comentário aparecerá no próximo request.

---

## LOW — `react-markdown` renderiza HTML inline em MARKDOWN format

**Contexto:** `react-markdown` sem `rehype-raw` não executa HTML inline (`<script>`, `<iframe>`). Porém, se no futuro for adicionado `rehype-raw` para suportar HTML inline legítimo, o XSS voltaria a ser possível para conteúdo MARKDOWN que vem do CMS (admin-trusted, não user-input).

**Status:** Não é risco atual. Registrado para prevenção futura — qualquer adição de `rehype-raw` deve vir acompanhada de `rehype-sanitize`.

---

## LOW — Vimeo portrait (9:16) não tem aspectRatio explícito no container

**Contexto:** O container do VideoPlayer usa `aspectRatio: '16/9'` hardcoded. O SDK Vimeo com `responsive: true` adapta o iframe internamente, mas o container pai mantém 16/9. Para vídeos portrait, haverá barras laterais (pillarbox) dentro de um container 16/9.

**Impacto:** Visual aceitável (não quebra layout), mas não otimizado para conteúdo portrait.

**Ação futura:** Detectar aspectRatio via Vimeo API (`player.getVideoWidth()`/`getVideoHeight()`) e ajustar o container dinamicamente.
