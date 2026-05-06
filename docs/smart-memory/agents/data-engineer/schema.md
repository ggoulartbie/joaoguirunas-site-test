---
title: Schema — Plataforma de Cursos
type: reference
agent: sites-data
updated: 2026-05-05
tags: [schema, supabase, plataforma-cursos]
---

# Schema — Plataforma de Cursos

21 tabelas no schema `public`. Todas com RLS habilitado.

## Convenções

- IDs: `uuid` via `gen_random_uuid()` (exceto `profiles.id` = `auth.users.id`)
- Timestamps: `created_at` + `updated_at` (trigger `set_updated_at`) em todas exceto `materials`, `live_sessions`, `lesson_progress` (só `updated_at`), e imutáveis
- Soft delete (`deleted_at`): `courses`, `modules`, `lessons`, `comments`, `forum_threads`, `forum_replies`
- Inglês: tabelas, colunas, enums, funções, índices

---

## Identidade

### `profiles`
Espelho de `auth.users`. Criado automaticamente pelo trigger `handle_new_user`.

| Coluna | Tipo | Notas |
|---|---|---|
| `id` | uuid PK | = `auth.users.id` |
| `name` | text NOT NULL | |
| `avatar_url` | text | |
| `bio` | text | |
| `role` | text NOT NULL | `STUDENT` \| `MENTOR` \| `SUPPORT` \| `ADMIN` |
| `stripe_customer_id` | text | preenchido na primeira compra |

---

## Catálogo

### `courses`
| Coluna | Tipo | Notas |
|---|---|---|
| `slug` | text UNIQUE | |
| `published` | boolean | false por padrão |
| `deleted_at` | timestamptz | soft delete |

### `modules`
| Coluna | Tipo | Notas |
|---|---|---|
| `course_id` | uuid FK → courses | CASCADE |
| `sort_order` | int NOT NULL | |
| UNIQUE | `(course_id, slug)` | |

### `lessons`
| Coluna | Tipo | Notas |
|---|---|---|
| `module_id` | uuid FK → modules | CASCADE |
| `kind` | text | `VIDEO` \| `LIVE` \| `IN_PERSON` \| `CODE` \| `READING` |
| `video_provider` | text | `VIMEO` \| `YOUTUBE` \| `CLOUDFLARE_STREAM` |
| `video_id` | text | ID no provedor |
| `content_format` | text | `MDX` \| `HTML` \| `MARKDOWN` |
| `content` | text | corpo da aula |
| UNIQUE | `(module_id, slug)` | |

### `materials`
| Coluna | Tipo | Notas |
|---|---|---|
| `lesson_id` | uuid FK → lessons | CASCADE |
| `kind` | text | `PDF` \| `ZIP` \| `IMAGE` \| `LINK` \| `OTHER` |
| `storage_path` | text | path no bucket `materials` |
| `external_url` | text | para kind = LINK |

---

## Cohorts (unidade central)

### `cohorts`
| Coluna | Tipo | Notas |
|---|---|---|
| `slug` | text UNIQUE | |
| `status` | text | `DRAFT` \| `OPEN` \| `IN_PROGRESS` \| `CLOSED` \| `ARCHIVED` |
| `total_seats` | int | null = ilimitado |
| `access_duration_days` | int | null = vitalício |
| `is_purchasable` | boolean | gera Stripe Price quando true |
| `has_public_page` | boolean | habilita LP em `/turmas/[slug]` |
| `entry_price_cents` | int | em centavos |
| `extension_price_cents` | int | em centavos |
| `extension_duration_days` | int | dias adicionados por extensão |
| `stripe_price_entry_id` | text | |
| `stripe_price_extension_id` | text | |

### `cohort_courses`
PK composta: `(cohort_id, course_id)`.

| Coluna | Tipo | Notas |
|---|---|---|
| `included_module_ids` | uuid[] | `{}` = todos os módulos |

### `cohort_cross_extensions`
| Coluna | Tipo | Notas |
|---|---|---|
| `source_cohort_id` | uuid FK → cohorts | |
| `target_cohort_id` | uuid FK → cohorts | |
| `days_granted` | int NOT NULL | |
| UNIQUE | `(source_cohort_id, target_cohort_id)` | |

### `cohort_members`
| Coluna | Tipo | Notas |
|---|---|---|
| `member_role` | text | `STUDENT` \| `MONITOR` \| `MENTOR` |
| `status` | text | `ACTIVE` \| `EXPIRED` \| `REMOVED` \| `PAST_DUE` |
| `expires_at` | timestamptz | null = vitalício |
| `auto_renew_enabled` | boolean | |
| UNIQUE | `(cohort_id, user_id)` | |

### `live_sessions`
| Coluna | Tipo | Notas |
|---|---|---|
| `meeting_url` | text | liberado server-side 30min antes |
| `lesson_id` | uuid FK → lessons | null; preenchido quando virar aula gravada |

---

## Pagamentos

### `coupons`
| Coluna | Tipo | Notas |
|---|---|---|
| `discount_kind` | text | `PERCENT` \| `FIXED` |
| `applies_to` | text | `ENTRY` \| `EXTENSION` \| `BOTH` |
| UNIQUE | `(cohort_id, code)` | |

### `payments`
| Coluna | Tipo | Notas |
|---|---|---|
| `purchase_kind` | text | `ENTRY` \| `EXTENSION` \| `AUTO_RENEWAL` |
| `status` | text | `PENDING` \| `APPROVED` \| `DECLINED` \| `REFUNDED` |
| `stripe_checkout_session_id` | text UNIQUE | |
| `amount_cents` | int NOT NULL | |

### `webhook_events`
| Coluna | Tipo | Notas |
|---|---|---|
| `stripe_event_id` | text UNIQUE NOT NULL | **load-bearing para idempotência** |
| `payload` | jsonb | |
| `success` | boolean | |

---

## Progresso e Comunidade

### `lesson_progress`
UNIQUE: `(user_id, lesson_id)`.

### `certificates`
| Coluna | Tipo | Notas |
|---|---|---|
| `verification_code` | text UNIQUE | ex: `AIOX-2026-X7K9P2` |
| `pdf_storage_path` | text | path no bucket `certificates` |

### `comments`
Self-reference `parent_comment_id` (profundidade máxima: 1, enforçado na aplicação).

### `forum_categories`, `forum_threads`, `forum_replies`, `votes`
Fórum geral único. `votes` tem constraint: `thread_id XOR reply_id NOT NULL`.

### `notifications`
| Coluna | Tipo | Notas |
|---|---|---|
| `notification_type` | text NOT NULL | |
| `read_at` | timestamptz | null = não lida |

---

## Funções SQL

| Função | Retorno | Notas |
|---|---|---|
| `public.set_updated_at()` | trigger | atualiza `updated_at` antes de cada UPDATE |
| `public.handle_new_user()` | trigger | cria `profiles` após INSERT em `auth.users` |
| `public.is_admin()` | boolean | `security definer`, `stable` |
| `public.has_access(user_id, lesson_id)` | boolean | `security definer`, `stable` — coração da autorização |

---

## Índices de performance críticos

- `cohort_members(user_id)` — consultado em cada `has_access()`
- `cohort_members(user_id, status)` — filtro composto em `has_access()`
- `cohort_members(status, expires_at)` — cron de expiração
- `payments(user_id, status)` — histórico do aluno
- `lesson_progress(user_id, completed)` — progresso do aluno
- `notifications(user_id, read_at) WHERE read_at IS NULL` — badge de não lidas
