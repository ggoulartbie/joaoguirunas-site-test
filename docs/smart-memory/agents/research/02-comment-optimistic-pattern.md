---
title: "Research: Live Update de Comentário com useOptimistic + Server Action"
type: research
agent: sites-analyst
created: 2026-05-16
tags: [research, comments, nextjs, useOptimistic, server-actions]
---

# Research: Live Update de Comentário com useOptimistic + Server Action

**Decisão que informa:** Como mostrar comentário na UI imediatamente após submit sem aguardar RSC revalidation
**Solicitado por:** sites-architect

## Resumo executivo

O projeto já usa `useState` + `onSubmitted` callback para injetar o comentário na lista localmente (`CommentsSection.tsx:344`). O padrão está funcional mas **`addComment` ainda retorna `{ success: bool, error?: string }` sem a entidade criada** — o `CommentForm` monta um objeto fake quando não recebe `comment` de volta. A correção exige que `addComment` retorne o comentário com dados reais do banco.

## Estado atual do projeto

- `CommentsSection.tsx:292`: usa `useState(initialComments)` — lista local, sem RSC sync imediato
- `CommentForm.tsx:219-226`: chama `addComment`, se `result.comment` existe injeta; senão monta objeto fake com `id: ''`
- `comments.ts:addComment`: retorna apenas `{ success: boolean; error?: string }` — **não retorna a entidade**
- Consequence: comentário novo aparece sem ID real, sem dados do autor autenticado (authorId vazio)

## Padrão recomendado: addComment retorna CommentWithAuthor

### Server Action modificado

```ts
// src/lib/actions/comments.ts
export async function addComment(
  lessonId: string,
  content: string,
  parentCommentId?: string
): Promise<{ success: boolean; comment?: CommentWithAuthor; error?: string }> {
  // ... validação existente ...

  const { data, error } = await supabaseAdmin
    .from('comments')
    .insert({ lesson_id, author_id: user.id, content: sanitized, parent_comment_id })
    .select(`id, lesson_id, content, created_at, updated_at, deleted_at, is_pinned,
             parent_comment_id, profiles(id, name, role)`)
    .single()

  if (error || !data) return { success: false, error: 'Erro ao publicar comentário' }

  revalidatePath('/', 'layout')
  return { success: true, comment: mapToCommentWithAuthor(data) }
}
```

### Client-side (já funciona, apenas depende da action corrigida)

```tsx
// CommentsSection já trata:
onSubmitted={(comment) => {
  if (comment.id) setComments((prev) => [...prev, comment])
}}
// CommentForm já trata result.comment — só precisa que a action retorne
```

## Edge cases

| Caso | Comportamento atual | Com fix |
|---|---|---|
| Falha de rede | `startTransition` rejeita, `setError` exibe mensagem | Igual — action lança, form captura |
| Validação rejeitada (zod) | `{ success: false, error }` — form exibe erro | Igual |
| Insert OK mas select falha | Não existe — insert e select separados | Com `.insert().select().single()`, falha retorna `{ success: false }` |
| Comentário aparece sem ID real | Acontece quando `result.comment` é undefined | Eliminado com a action retornando entidade |

## Sobre useOptimistic

`useOptimistic` é útil quando a latência é alta e se quer feedback imediato. Para este projeto, o padrão `useState` + `onSubmitted` é equivalente e mais simples — **não há necessidade de migrar para `useOptimistic`** enquanto o `addComment` retornar a entidade real. Se futuramente houver requisito de feedback sub-100ms, a migração é direta: substituir `useState` por `useOptimistic(initialComments, (state, item) => [...state, item])`.

## Fontes

- [Next.js Server Actions docs](https://nextjs.org/docs/13/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Optimistic Updates Next.js 14 - DEV Community](https://dev.to/whoffagents/optimistic-updates-in-nextjs-14-useoptimistic-server-actions-and-automatic-rollback-5hbl)
