---
title: Schema do Banco — Sistema de Cursos
type: reference
agent: sites-data
updated: 2026-05-17
tags: [schema, supabase, mentoria-claude-code]
---

# Schema do Banco — Sistema de Cursos

Mapeamento completo das tabelas relevantes para popular o curso "Mentoria Claude Code" no Supabase. Todas as tabelas têm RLS habilitado. Fonte canônica: `src/types/database.ts`.

---

## Tabelas do sistema de cursos

### `courses`

| Coluna | Tipo | Obrigatório no INSERT | Notas |
|---|---|---|---|
| `id` | uuid | não (gerado) | `gen_random_uuid()` |
| `title` | text | **sim** | ex: "Mentoria Claude Code" |
| `slug` | text | **sim** | ex: `mentoria-claude-code` — unique entre ativos |
| `description` | text | não | texto livre |
| `cover_image_url` | text | não | URL pública |
| `published` | boolean | não | default `false` |
| `sort_order` | int | não | default `0` |
| `deleted_at` | timestamptz | não | soft delete |
| `created_at` | timestamptz | não | default `now()` |
| `updated_at` | timestamptz | não | default `now()` |

**Constraint de unicidade:** `courses_slug_active_unique` — slug único somente onde `deleted_at IS NULL` (partial index, migration 20260516200000).

---

### `modules`

| Coluna | Tipo | Obrigatório no INSERT | Notas |
|---|---|---|---|
| `id` | uuid | não (gerado) | |
| `course_id` | uuid FK → courses | **sim** | |
| `title` | text | **sim** | ex: "Módulo 1 — Fundamentos" |
| `slug` | text | **sim** | ex: `fundamentos` — unique por course entre ativos |
| `description` | text | não | |
| `cover_image_url` | text | não | |
| `sort_order` | int | **sim** | ordem exibida ao aluno |
| `deleted_at` | timestamptz | não | soft delete |
| `created_at` | timestamptz | não | default `now()` |
| `updated_at` | timestamptz | não | default `now()` |

**Constraint de unicidade:** `modules_course_id_slug_active_unique` — `(course_id, slug)` únicos onde `deleted_at IS NULL`.

---

### `lessons`

| Coluna | Tipo | Obrigatório no INSERT | Notas |
|---|---|---|---|
| `id` | uuid | não (gerado) | |
| `module_id` | uuid FK → modules | **sim** | |
| `title` | text | **sim** | |
| `slug` | text | **sim** | unique por module entre ativos |
| `kind` | text | **sim** | `VIDEO` \| `LIVE` \| `IN_PERSON` \| `CODE` \| `READING` |
| `sort_order` | int | **sim** | |
| `description` | text | não | template padrão injetado pela migration 20260516100000 |
| `video_provider` | text | não | `VIMEO` \| `YOUTUBE` \| `CLOUDFLARE_STREAM` |
| `video_id` | text | não | ID no provedor (ex: Vimeo ID numérico) |
| `duration_seconds` | int | não | duração em segundos |
| `content` | text | não | corpo MDX/HTML/Markdown da aula |
| `content_format` | text | não | `MDX` \| `HTML` \| `MARKDOWN` |
| `summary` | text | não | resumo da aula (adicionado em 20260516100000) |
| `summary_format` | text | não | `MDX` \| `HTML` \| `MARKDOWN` |
| `transcript` | text | não | transcrição completa (adicionado em 20260516100000) |
| `transcript_format` | text | não | `MDX` \| `HTML` \| `MARKDOWN` |
| `deleted_at` | timestamptz | não | soft delete |
| `created_at` | timestamptz | não | default `now()` |
| `updated_at` | timestamptz | não | default `now()` |

**Constraint de unicidade:** `lessons_module_id_slug_active_unique` — `(module_id, slug)` únicos onde `deleted_at IS NULL`.

**Nota sobre video_id e Vimeo:** para aulas com `video_provider = 'VIMEO'`, `video_id` é o ID numérico do vídeo no Vimeo (ex: `"123456789"`).

---

### `materials`

Materiais vinculados a uma **aula** específica.

| Coluna | Tipo | Obrigatório no INSERT | Notas |
|---|---|---|---|
| `id` | uuid | não (gerado) | |
| `lesson_id` | uuid FK → lessons | **sim** | |
| `title` | text | **sim** | nome do arquivo/link |
| `kind` | text | **sim** | `PDF` \| `ZIP` \| `IMAGE` \| `LINK` \| `OTHER` |
| `storage_path` | text | não | path no bucket `materials` — null para LINK |
| `external_url` | text | não | usado quando `kind = LINK` |
| `size_bytes` | bigint | não | |
| `sort_order` | int | não | default `0` |
| `created_at` | timestamptz | não | default `now()` |

**Storage path format:** `lessons/{lesson_id}/{uuid}.{ext}` (ver `src/lib/materials/storage.ts:buildMaterialPath`).

---

### `module_materials`

Materiais vinculados a um **módulo** inteiro (espelho de `materials`, migration 20260516210000).

| Coluna | Tipo | Obrigatório no INSERT | Notas |
|---|---|---|---|
| `id` | uuid | não (gerado) | |
| `module_id` | uuid FK → modules | **sim** | |
| `title` | text | **sim** | |
| `kind` | text | **sim** | `PDF` \| `ZIP` \| `IMAGE` \| `LINK` \| `OTHER` |
| `storage_path` | text | não | path no bucket `materials` — null para LINK |
| `external_url` | text | não | |
| `size_bytes` | bigint | não | |
| `sort_order` | int | não | default `0` |
| `created_at` | timestamptz | não | default `now()` |

**Sem `updated_at`/`deleted_at`:** imutável após upload (hard delete se necessário).

**Storage path format:** `modules/{module_id}/{uuid}.{ext}`.

---

### `lesson_reactions`

Reações por usuário por aula (migration 20260516100000).

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | uuid | |
| `lesson_id` | uuid FK → lessons | CASCADE |
| `user_id` | uuid FK → profiles | CASCADE |
| `reaction` | text | `LIKE` \| `DISLIKE` |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | trigger `set_updated_at` |

**Constraint:** UNIQUE `(lesson_id, user_id)` — um usuário, uma reação por aula.

---

### `cohorts`

Turmas que dão acesso a cursos.

| Coluna | Tipo | Obrigatório no INSERT | Notas |
|---|---|---|---|
| `id` | uuid | não | |
| `name` | text | **sim** | ex: "Mentoria Claude Code — Turma 1" |
| `slug` | text | **sim** | ex: `mentoria-claude-code-t1` |
| `status` | text | não | `DRAFT` \| `OPEN` \| `IN_PROGRESS` \| `CLOSED` \| `ARCHIVED` |
| `has_public_page` | boolean | não | habilita LP pública |
| `is_purchasable` | boolean | não | habilita compra online |
| `entry_price_cents` | int | não | preço em centavos |
| `access_duration_days` | int | não | null = vitalício |
| `total_seats` | int | não | null = ilimitado |
| `payment_provider` | text | não | `STRIPE` \| `INFINITEPAY` |
| `infinitepay_handle` | text | não | handle para checkout InfinitePay |
| `has_live_sessions` | boolean | não | default `false` |
| `has_support` | boolean | não | default `false` |

---

### `cohort_courses`

Liga uma cohort a um ou mais cursos, com controle granular de módulos visíveis.

| Coluna | Tipo | Notas |
|---|---|---|
| `cohort_id` | uuid FK → cohorts | PK composta |
| `course_id` | uuid FK → courses | PK composta |
| `included_module_ids` | uuid[] | `{}` = todos os módulos do curso liberados |
| `sort_order` | int | default `0` |

---

### `cohort_members`

Matrículas dos alunos.

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | uuid | |
| `cohort_id` | uuid FK → cohorts | |
| `user_id` | uuid FK → profiles | |
| `status` | text | `ACTIVE` \| `EXPIRED` \| `REMOVED` \| `PAST_DUE` |
| `member_role` | text | `STUDENT` \| `MONITOR` \| `MENTOR` |
| `joined_at` | timestamptz | |
| `expires_at` | timestamptz | null = vitalício |
| `auto_renew_enabled` | boolean | |

**UNIQUE:** `(cohort_id, user_id)`.

---

### `profiles`

Espelho de `auth.users`. Criado automaticamente pelo trigger `handle_new_user`.

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | uuid PK | = `auth.users.id` |
| `name` | text NOT NULL | |
| `role` | text | `STUDENT` \| `MENTOR` \| `SUPPORT` \| `ADMIN` |
| `avatar_url` | text | |
| `bio` | text | |
| `stripe_customer_id` | text | |
| `has_set_password` | boolean | default `false` |

---

## Relacionamentos (ERD em texto)

```
profiles (1) ─── (N) cohort_members
cohorts  (1) ─── (N) cohort_members
cohorts  (1) ─── (N) cohort_courses
courses  (1) ─── (N) cohort_courses
courses  (1) ─── (N) modules
modules  (1) ─── (N) lessons
modules  (1) ─── (N) module_materials
lessons  (1) ─── (N) materials
lessons  (1) ─── (N) lesson_reactions
lessons  (1) ─── (N) lesson_progress
lessons  (1) ─── (N) comments
profiles (1) ─── (N) lesson_reactions
profiles (1) ─── (N) lesson_progress
```

**Cadeia de autorização de acesso:**

```
profiles → cohort_members → cohort_courses → courses → modules → lessons
                                          └── included_module_ids (filtro granular)
```

A função `has_access(user_id, lesson_id)` percorre essa cadeia: verifica se existe `cohort_members` ACTIVE com `cohort_courses` que inclua o `module_id` da lesson.

---

## RLS policies relevantes

### Leitura de conteúdo (courses, modules, lessons)

| Tabela | Política SELECT | Resumo |
|---|---|---|
| `courses` | `published = true AND deleted_at IS NULL` ou admin | Leitura pública de cursos publicados |
| `modules` | course publicado AND `deleted_at IS NULL` ou admin | Leitura pública se curso publicado |
| `lessons` | `has_access(auth.uid(), id)` ou admin | Restrita a alunos com acesso ativo |
| `materials` | `has_access(auth.uid(), lesson_id)` ou admin | Restrita a alunos com acesso ativo |
| `module_materials` | `has_module_access(auth.uid(), module_id)` ou admin | Restrita a alunos com acesso ativo |

### Escrita (INSERT/UPDATE/DELETE)

Toda escrita em tabelas de catálogo (`courses`, `modules`, `lessons`, `materials`, `module_materials`) exige `is_admin() = true`. Não há policy de INSERT para usuários autenticados comuns nessas tabelas.

### `lesson_reactions` — exceção

Leitura exige `has_access()`; INSERT/UPDATE/DELETE: usuário gerencia apenas a própria reação, com check de `has_access()`.

### `cohort_members`

INSERT/UPDATE via `service_role` apenas (webhooks de pagamento). Sem policy de escrita para `authenticated`.

---

## Funções SQL de autorização

| Função | Assinatura | Descrição |
|---|---|---|
| `is_admin()` | `() → boolean` | true se `profiles.role = 'ADMIN'` para o usuário atual |
| `has_access()` | `(user_id uuid, lesson_id uuid) → boolean` | true se existe cohort_member ACTIVE com acesso ao módulo da lesson |
| `has_module_access()` | `(user_id uuid, module_id uuid) → boolean` | espelho de `has_access` para módulos (para module_materials) |

---

## Campos obrigatórios para inserção

### Criar um curso
```sql
INSERT INTO courses (title, slug) VALUES ('Mentoria Claude Code', 'mentoria-claude-code');
```

### Criar um módulo
```sql
INSERT INTO modules (course_id, title, slug, sort_order)
VALUES ('{course_id}', 'Módulo 1 — Fundamentos', 'modulo-1-fundamentos', 1);
```

### Criar uma aula
```sql
INSERT INTO lessons (module_id, title, slug, kind, sort_order)
VALUES ('{module_id}', 'Aula 1 — Introdução', 'aula-1-introducao', 'VIDEO', 1);
```

Para aula com Vimeo:
```sql
INSERT INTO lessons (module_id, title, slug, kind, sort_order, video_provider, video_id, duration_seconds)
VALUES ('{module_id}', 'Aula 1', 'aula-1', 'VIDEO', 1, 'VIMEO', '123456789', 1800);
```

### Criar material de aula
```sql
INSERT INTO materials (lesson_id, title, kind, external_url)
VALUES ('{lesson_id}', 'Material de apoio', 'LINK', 'https://...');
```

### Criar material de módulo
```sql
INSERT INTO module_materials (module_id, title, kind, external_url)
VALUES ('{module_id}', 'Manual do Módulo', 'PDF', NULL);
-- storage_path preenchido após upload no bucket `materials`
```

### Vincular curso a uma cohort
```sql
INSERT INTO cohort_courses (cohort_id, course_id, included_module_ids)
VALUES ('{cohort_id}', '{course_id}', '{}');
-- included_module_ids = '{}' libera TODOS os módulos do curso para a cohort
```

---

## Sequência de inserção recomendada

```
1. courses          — criar o curso (published = false inicialmente)
2. cohorts          — criar a turma (status = DRAFT)
3. cohort_courses   — vincular curso à turma (included_module_ids = '{}')
4. modules          — criar módulos em ordem (sort_order 1, 2, 3...)
5. lessons          — criar aulas por módulo (sort_order por módulo)
6. materials        — adicionar materiais por aula (opcional)
7. module_materials — adicionar materiais por módulo (opcional)
8. courses UPDATE   — published = true quando pronto
9. cohorts UPDATE   — status = OPEN quando abrir vendas
```

**Restrição de FK:** módulos só podem ser criados após o curso existir. Aulas só após o módulo. Materiais só após a aula/módulo. Não há FK de `cohort_courses` para `modules` — o filtro é feito em runtime via `included_module_ids`.

---

## Gaps identificados

### 1. `database.types.ts` desatualizado (não-bloqueante)

`src/lib/supabase/database.types.ts` (gerado pelo Supabase CLI) está desatualizado: não contém `lesson_reactions` nem `module_materials`. O arquivo canônico para types é `src/types/database.ts` (editado manualmente), que já tem as duas tabelas.

Impacto: `pnpm db:types` aponta para path errado (documentado no shared-context 2026-05-17). Usar `src/types/database.ts` como referência.

### 2. Sem campo `vimeo_id` separado

O schema usa `video_id` (text genérico) + `video_provider` (enum-like string). Não há coluna dedicada `vimeo_id`. Para Vimeo, o `video_id` é o ID numérico do vídeo (string).

### 3. `summary` e `transcript` existem no schema

Ambos os campos foram adicionados na migration 20260516100000. Estão presentes em `src/types/database.ts`. Formatos aceitos: `MDX` | `HTML` | `MARKDOWN`.

### 4. Sem tabela de `enrollments`

Não existe tabela `enrollments` separada. A matrícula é gerenciada por `cohort_members` (status `ACTIVE`). O acesso a conteúdo é determinado pela função `has_access()` que verifica `cohort_members.status = 'ACTIVE'`.

### 5. Slug de aula — escopo por módulo

O slug de lesson é único **por módulo**, não globalmente. URL completa da aula: `/academy/curso/{course_slug}/aula/{lesson_slug}`. Não há coluna que armazene `course_slug` diretamente na lesson — é resolvido via JOIN `lessons → modules → courses`.
