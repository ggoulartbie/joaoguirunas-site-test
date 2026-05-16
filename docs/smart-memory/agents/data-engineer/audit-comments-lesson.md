# Auditoria: comments + lessons.description
> Contexto: fix aula-aluno-ux — sem mudança de schema

## Schema: tabela `comments`

| Campo | Tipo | Observações |
|---|---|---|
| `id` | uuid PK | gen_random_uuid() |
| `lesson_id` | uuid FK → lessons | on delete cascade |
| `author_id` | uuid FK → profiles | sem cascade |
| `parent_comment_id` | uuid FK → comments | on delete cascade; 1 nível apenas |
| `content` | text | sanitizado antes de inserir |
| `is_pinned` | boolean | default false |
| `deleted_at` | timestamptz | soft delete |
| `created_at` / `updated_at` | timestamptz | updated_at via trigger |

Index hot-path: `(lesson_id, created_at desc) WHERE deleted_at IS NULL`

---

## lessons.description vs content

- `description` = texto curto/sumário raw (não renderizado) — usado em listagens e SEO
- `content` = corpo da aula em texto bruto (formato indicado por `content_format`: `MDX | HTML | MARKDOWN`)
- `renderedContent` (tipo `RenderedContent`) **não existe no banco** — é gerado server-side via `renderContent(content_format, content)` em `page.tsx:261-267`
- O campo `descriptionContent` não existe; `description` é apenas `text` plain

---

## O que `addComment` precisa retornar

Tipo alvo: `CommentWithAuthor` (`src/types/student.ts:108-115`)

```ts
{
  id, lesson_id, content, created_at, updated_at,
  deleted_at, is_pinned, parent_comment_id,  // de Comment
  authorId: string,
  authorName: string,
  authorRole: UserRole,
}
```

**Mudança necessária na action:** após `INSERT`, fazer SELECT com JOIN em `profiles`:

```ts
const { data: created } = await supabaseAdmin
  .from('comments')
  .select('id, lesson_id, content, created_at, updated_at, deleted_at, is_pinned, parent_comment_id, profiles(id, name, role)')
  .eq('id', insertedId)
  .single()
```

Retornar `{ success: true, comment: CommentWithAuthor }` em vez de só `{ success: true }`.

---

## Risco de RLS

| Risco | Severidade | Detalhe |
|---|---|---|
| SELECT após INSERT | **Nenhum** | `addComment` usa `supabaseAdmin` (service_role) — RLS bypassed. INSERT e SELECT pós-insert são seguros. |
| Policy SELECT (user client) | Baixo | `deleted_at IS NULL AND has_access(uid, lesson_id)` — comment recém-criado satisfaz ambas. |
| Policy UPDATE | Nenhum | A action usa supabaseAdmin; RLS não se aplica. |

**Conclusão:** sem risco de RLS para a mudança. `supabaseAdmin` contorna todas as policies. O SELECT pós-INSERT na própria action não tem blocker.
