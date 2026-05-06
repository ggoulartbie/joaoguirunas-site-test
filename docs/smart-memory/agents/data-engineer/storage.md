---
title: Storage Buckets — Plataforma de Cursos
type: reference
agent: sites-data
updated: 2026-05-05
tags: [storage, supabase, plataforma-cursos]
---

# Storage Buckets

Configurados na migration `20260506022229_storage_buckets_policies.sql`.

## Buckets

| Bucket | Visibilidade | Limite | Mime Types |
|---|---|---|---|
| `avatars` | Público | 5 MB | jpeg, png, webp, gif |
| `covers` | Público | 10 MB | jpeg, png, webp |
| `materials` | Privado | 100 MB | qualquer |
| `certificates` | Privado | 5 MB | application/pdf |

## Convenção de paths

| Bucket | Path | Notas |
|---|---|---|
| `avatars` | `{user_id}/avatar.{ext}` | `user_id` = UUID do `profiles.id` |
| `covers` | `{entity_id}/{filename}` | `entity_id` = UUID do course ou cohort |
| `materials` | `{lesson_id}/{material_id}.{ext}` | `lesson_id` na primeira pasta — usado pela RLS policy |
| `certificates` | `{user_id}/{certificate_id}.pdf` | `user_id` na primeira pasta — usado pela RLS policy |

**Path é load-bearing:** as policies de RLS no Storage extraem IDs via `(storage.foldername(name))[1]`. Alterar a convenção quebra as policies.

## Acesso

### Buckets públicos (avatars, covers)
- URL direta: `{SUPABASE_URL}/storage/v1/object/public/{bucket}/{path}`
- Sem autenticação necessária para leitura

### Buckets privados (materials, certificates)
- Acesso via **signed URL** gerada server-side
- `materials`: expiração de **5 minutos** (`expiresIn: 300`)
- `certificates`: expiração de **1 hora** (`expiresIn: 3600`)

```typescript
// Exemplo de geração de signed URL (server-side com adminClient)
const { data } = await adminClient.storage
  .from('materials')
  .createSignedUrl(`${lessonId}/${materialId}.pdf`, 300);

const { data: certUrl } = await adminClient.storage
  .from('certificates')
  .createSignedUrl(`${userId}/${certificateId}.pdf`, 3600);
```

## Policies resumidas

### avatars
- SELECT: público
- INSERT/UPDATE/DELETE: `auth.uid()` deve ser a primeira pasta do path

### covers
- SELECT: público
- INSERT/UPDATE/DELETE: `is_admin()`

### materials
- SELECT: `has_access(auth.uid(), lesson_id)` onde `lesson_id` = primeira pasta do path
- INSERT/UPDATE/DELETE: `is_admin()`

### certificates
- SELECT: `auth.uid()::text = user_id` onde `user_id` = primeira pasta do path
- INSERT: `is_admin()` (na prática, service_role via Server Action)
- DELETE: `is_admin()`
