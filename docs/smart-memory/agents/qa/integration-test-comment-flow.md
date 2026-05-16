# Integration Test — Comment Flow (Story 1.2)

**Agente:** Seranol (sites-dev-gamma)
**Data:** 2026-05-16
**Status:** AGUARDANDO sites-dev-beta (task #8) e sites-dev-alpha (task #9)

## Contrato esperado server→client

```ts
// addComment deve retornar:
{ success: true;  comment: CommentWithAuthor }
{ success: false; error: string }

// CommentWithAuthor campos obrigatórios:
id, lesson_id, content, created_at, updated_at, deleted_at,
is_pinned, parent_comment_id,   // colunas DB
authorId, authorName, authorRole // join profiles (camelCase)
```

## Estado pré-mudança

- `addComment` retorna `{ success, error? }` — sem `comment`
- `CommentsSection` usa `useState` sem `useOptimistic`
- Comentário aparece só após round-trip + revalidatePath (não imediato)

## Checklist de validação pós-mudança

- [ ] Top-level: aparece imediato (<100ms perceptível)
- [ ] Reply: aparece imediato sob comentário pai
- [ ] Slow 3G: optimistic visível → reconcilia com ID real do server
- [ ] Offline: erro aparece + comentário optimistic some

## Resultado final

*A preencher após testes manuais.*
