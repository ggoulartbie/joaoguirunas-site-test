---
title: "Research: Pipeline de Renderização de Markdown no Projeto"
type: research
agent: sites-analyst
created: 2026-05-16
tags: [research, markdown, mdx, content, shiki]
---

# Research: Pipeline de Renderização de Markdown no Projeto

**Decisão que informa:** Por que `descriptionContent` é null em algumas aulas e como debugar
**Solicitado por:** sites-architect

## Resumo executivo

A pipeline usa 3 formatos distintos (`MDX`, `HTML`, `MARKDOWN`) despachos pela função `renderContent`. A causa mais provável de `descriptionContent === null` é que `lesson.content` ou `lesson.content_format` é nulo no banco — não há fallback de format.

## Fluxo completo

```
page.tsx (Server Component)
  └─ lesson.content + lesson.content_format (do Supabase)
       ├─ null/undefined → renderedContent = null → descriptionContent = null
       └─ renderContent(format, content)
            ├─ 'MDX'      → serializeMDX() via next-mdx-remote/serialize
            ├─ 'HTML'     → sanitizeHtml() (DOMPurify server-side)
            └─ 'MARKDOWN' → processMarkdownCodeBlocks() via Shiki → string HTML
                            (react-markdown NÃO é usado no server — apenas Shiki para code blocks)
```

## Arquivos relevantes

| Arquivo | Papel |
|---|---|
| `src/lib/content/index.ts` | Dispatcher principal: `renderContent()` |
| `src/lib/content/mdx.ts` | Serializa MDX com `next-mdx-remote/serialize` |
| `src/lib/content/html.ts` | Sanitiza HTML com `sanitizeHtml` |
| `src/lib/content/markdown.ts` | Shiki highlighter para code blocks; `react-markdown` mencionado mas não usado aqui |
| `page.tsx:261-267` | Guard: `lesson.content && lesson.content_format` antes de chamar `renderContent` |
| `LessonTabs.tsx:102-104` | Renderiza `descriptionContent` se não null |

## Causa raiz de `descriptionContent === null`

Guard em `page.tsx:261`: `lesson.content && lesson.content_format` — **qualquer um nulo resulta em `renderedContent = null`**.

Cenários possíveis:
1. **`content_format` não definido no banco** para aulas antigas — campo criado depois do conteúdo
2. **`content` é string vazia `""`** — falsy, guard bloqueia
3. **`content` é `null` no banco** — aulas sem descrição cadastrada

## Como investigar no banco

```sql
-- Aulas com content mas sem content_format (causa mais comum)
SELECT id, title, content_format, length(content) as content_len
FROM lessons
WHERE content IS NOT NULL AND content_format IS NULL;

-- Aulas com content vazio
SELECT id, title FROM lessons WHERE content = '' OR content IS NULL;
```

## Nota sobre react-markdown

`react-markdown` (v10.1.0) está instalado mas **não aparece na pipeline server-side atual**. Pode estar disponível para uso client-side em componentes ainda não auditados, ou planejado para uso futuro. Shiki cuida apenas dos blocos de código; o restante do markdown (no formato `MARKDOWN`) é entregue como string HTML com os code blocks já substituídos.
