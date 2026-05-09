---
title: Auditoria de Banco de Dados — /academy
date: 2026-05-08
updated: 2026-05-08
auditor: Bythelion (sites-data)
scope: fluxo de compra /curso-online — schema, RLS, triggers, included_module_ids
---

## Tabelas Relevantes

| Tabela | Propósito | Colunas-chave |
|---|---|---|
| `profiles` | Espelho de auth.users; guarda role e stripe_customer_id | `id` (FK auth.users), `role`, `stripe_customer_id` |
| `courses` | Catálogo de cursos | `id`, `slug`, `published`, `deleted_at` |
| `modules` | Agrupadores dentro de course | `id`, `course_id`, `slug`, `sort_order`, `deleted_at` |
| `lessons` | Unidade de conteúdo | `id`, `module_id`, `slug`, `kind`, `deleted_at` |
| `cohorts` | Unidade comercial + de acesso (= "turma") | `id`, `slug`, `status`, `is_purchasable`, `stripe_price_entry_id`, `access_duration_days`, `filled_seats` |
| `cohort_courses` | Mapeia quais cursos/módulos cada cohort libera | `cohort_id`, `course_id`, `included_module_ids` |
| `cohort_members` | **Tabela de matrícula**: aluno X tem acesso ao cohort Y | `id`, `cohort_id`, `user_id`, `status`, `expires_at`, `member_role` |
| `payments` | Registro de transações | `id`, `user_id`, `cohort_id`, `membership_id`, `stripe_checkout_session_id`, `status` |
| `webhook_events` | Idempotência Stripe (UNIQUE stripe_event_id) | `stripe_event_id`, `success`, `error_message` |
| `lesson_progress` | Rastreia progresso por aula | `user_id`, `lesson_id`, `completed` |
| `coupons` | Cupons de desconto com FK para cohorts | `id`, `cohort_id`, `code`, `stripe_coupon_id` |
| `certificates` | Emitidos após 100% conclusão | `user_id`, `course_id`, `cohort_id`, `membership_id`, `verification_code` |

**Tabela que registra "aluno X tem acesso ao curso Y":** `cohort_members` — o acesso é indireto: membership ativa em cohort → `cohort_courses` mapeia course_id → `has_access()` valida modulo_id.

---

## RLS Policies

### `cohort_members` (tabela crítica de matrícula)

| Operação | Policy | Resultado |
|---|---|---|
| SELECT | `user_id = auth.uid() OR is_admin()` | Correto |
| INSERT | **Nenhuma policy criada** | service_role bypassa RLS — intencional |
| UPDATE | **Nenhuma policy criada** | service_role bypassa RLS — intencional |

Comentário no migration confirma: *"INSERT/UPDATE via service_role apenas (webhooks e admin manual) — service_role bypassa RLS"*.

O webhook usa `supabaseAdmin` (service_role), portanto RLS não bloqueia INSERT em `cohort_members`.

### `payments`

| Operação | Policy | Resultado |
|---|---|---|
| SELECT | `user_id = auth.uid() OR is_admin()` | Correto |
| INSERT | **Nenhuma policy** | service_role apenas — correto |

### `webhook_events`

Sem policies para authenticated/anon. Apenas service_role acessa. Correto.

### `profiles`

INSERT via `handle_new_user()` trigger (security definer) — não requer policy de INSERT. Correto.

UPDATE tem `with check` bloqueando escalada de role (fix crítico aplicado em `20260506023754`).

### Tabelas de conteúdo (courses, modules, lessons)

Leitura pública condicional para usuários com `has_access()`. Sem falhas.

---

## Triggers e Funções

| Função | Tipo | Status |
|---|---|---|
| `set_updated_at()` | trigger function | OK — aplicada em profiles, courses, modules, lessons, lesson_progress, comments, forum_replies, onboarding |
| `handle_new_user()` | trigger AFTER INSERT on auth.users | OK — cria profile automaticamente, security definer |
| `has_access(user_id, lesson_id)` | função SQL, security definer, stable | OK — coração da autorização RLS e Server Components |
| `is_admin()` | função SQL, security definer, stable | OK — helper para policies |
| `increment_filled_seats(p_cohort_id)` | função SQL, security definer | OK — chamada via `supabaseAdmin.rpc()` no webhook após criar membro |

**Sem triggers quebrados identificados.** Não há triggers que deveriam criar `user_progress` após matrícula — isso não existe no schema (apenas `lesson_progress` preenchido pelo próprio aluno).

---

## Migrations Pendentes

Todas as migrations têm timestamp e arquivo SQL. Não há indícios de migrations pendentes de aplicação apenas pelo estado dos arquivos.

**Atenção:** Migration `20260508000000_seed_curso_online_padrao.sql` deixou `stripe_price_entry_id = null` com `ON CONFLICT (id) DO NOTHING` — se o row já existia com ID diferente (conflito pelo slug), o campo continuaria nulo. A migration `20260508010000_fix_curso_online_purchasable.sql` corrige o `is_purchasable` e `status` via conflito de slug, mas **não atualiza `stripe_price_entry_id`** — ele permanece `null` se não foi configurado manualmente.

---

## Bugs Encontrados

### BUG-1 (CRÍTICO) — `stripe_price_entry_id` é nulo no banco de produção

**Arquivo:** `supabase/migrations/20260508000000_seed_curso_online_padrao.sql` + `20260508010000_fix_curso_online_purchasable.sql`

**Tabela:** `cohorts` (cohort `curso-online-padrao`)

**Problema:** Ambas as migrations inserem/atualizam o cohort `curso-online-padrao` com `stripe_price_entry_id = null`. O campo é obrigatório para o checkout funcionar. O comentário na migration diz explicitamente:

```
ATENÇÃO: stripe_price_entry_id deve ser preenchido com o
Price ID real do Stripe Dashboard antes de ir para produção.
```

**Efeito no fluxo:** `createPublicCheckoutSession` em `checkoutPublic.ts:34` faz:
```ts
if (!cohort.stripe_price_entry_id) {
  return { error: 'Preço não configurado para esta turma.' }
}
```

O checkout retorna erro imediatamente. **Nenhuma sessão Stripe é criada. Nenhum webhook é disparado. Nenhuma matrícula é criada.**

**Fix:** Executar no banco de produção:
```sql
UPDATE public.cohorts
SET stripe_price_entry_id = 'price_XXXXXXXXXXXXXXXXXXXXXXXX'
WHERE slug = 'curso-online-padrao';
```

---

### BUG-1b (CRÍTICO) — Schema: `stripe_price_entry_id` é nullable sem constraint protetora

**Arquivo:** `supabase/migrations/20260506021851_schema_cohorts.sql:41`

**Definição atual:**
```sql
stripe_price_entry_id  text,  -- nullable, sem CHECK
```

**Problema de design:** A coluna é `text` nullable sem nenhuma constraint que impeça `is_purchasable = true` com `stripe_price_entry_id = null`. O banco aceita silenciosamente uma cohort marcada como vendável mas sem Price ID — state inválido que o código de checkout detecta tarde (em runtime).

**Constraint ausente que deveria existir:**
```sql
CONSTRAINT cohorts_purchasable_needs_price CHECK (
  NOT is_purchasable OR stripe_price_entry_id IS NOT NULL
)
```

**Fix de schema:** Migration adicionando essa CHECK constraint. Enquanto a constraint não existe, o único guard é o check em runtime no `checkoutPublic.ts`.

---

### BUG-2 (CRÍTICO) — `included_module_ids = '{}'` não é tratado como "acesso total" nas páginas

**Semântica documentada no schema** (`migrations/20260506021851_schema_cohorts.sql:61`):
```sql
included_module_ids uuid[] not null default '{}',  -- vazio = todos os módulos
```

**Onde o bug ocorre — `/academy/curso/[slug]/page.tsx:138-143`:**
```ts
const accessibleModuleIds = new Set(
  (cohortCourseRows ?? []).flatMap((r) => r.included_module_ids ?? [])
)
// Se included_module_ids = '{}' → flatMap retorna [] → Set vazio

const hasGlobalAccess = (cohortCourseRows ?? []).length === 0
// cohortCourseRows TEM uma row (com array vazio) → length = 1 → hasGlobalAccess = false
```

**Resultado:** `hasGlobalAccess = false` e `accessibleModuleIds = Set{}` vazio. Na linha 154:
```ts
.filter((m) => hasGlobalAccess || accessibleModuleIds.has(m.id))
// false || false → todos os módulos filtrados → zero módulos visíveis
```

O aluno matriculado com acesso total vê **todos os módulos bloqueados**.

**Onde o mesmo bug ocorre — `/academy/meus-cursos/page.tsx:65-73`:**
```ts
const accessibleModuleIds = [...new Set(cohortCourses.flatMap((cc) => cc.included_module_ids ?? []))]
// array vazio → nenhum lesson_id buscado

const { data: lessonRows } = accessibleModuleIds.length > 0
  ? await supabaseAdmin.from('lessons')...
  : { data: [] }
// Sem lessons → totalLessons = 0 → curso vai para a lista "locked" (linha 153: if (totalLessons > 0))
```

O curso aparece como **bloqueado** mesmo com matrícula ativa.

**Fix correto — interpretar array vazio como "todos os módulos":**

Em `/academy/curso/[slug]/page.tsx`:
```ts
// Substituir as linhas 138-143 por:
const allRowsHaveEmptyIds = (cohortCourseRows ?? []).length > 0 &&
  (cohortCourseRows ?? []).every((r) => (r.included_module_ids ?? []).length === 0)
const hasGlobalAccess = (cohortCourseRows ?? []).length === 0 || allRowsHaveEmptyIds

const accessibleModuleIds = new Set(
  hasGlobalAccess ? [] : (cohortCourseRows ?? []).flatMap((r) => r.included_module_ids ?? [])
)
```

Em `/academy/meus-cursos/page.tsx`:
```ts
// Linha 125: substituir por:
const accessibleModIds = (cc.included_module_ids ?? []).length === 0
  ? totalModIds   // array vazio = acesso a todos os módulos
  : (cc.included_module_ids ?? [])
```

**Impacto:** Todo aluno do `curso-online-padrao` (e futuros alunos) com `included_module_ids = '{}'` verá zero conteúdo acessível na área do aluno, mesmo após matrícula bem-sucedida.

---

### BUG-3 (MÉDIO) — `findOrCreateUser` itera `listUsers` sem paginação

**Arquivo:** `src/app/api/webhooks/stripe/route.ts:116`

**Problema:** `supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })` busca apenas os primeiros 1000 usuários para encontrar por email. Com mais de 1000 usuários, pode falhar em encontrar um usuário existente e criar uma conta duplicada.

**Efeito:** Conta duplicada para compradores existentes após 1000 usuários cadastrados. Baixo impacto agora, alto risco de crescimento.

---

### BUG-4 (BAIXO) — Página de sucesso não valida session_id no Stripe

**Arquivo:** `src/app/(academy)/academy/checkout/sucesso/page.tsx:17`

**Problema:** A página considera `isPublicCheckout = !user && !!session_id`, mas não consulta o Stripe para verificar se a sessão é válida/paga. Um `session_id` forjado na URL exibiria a tela de confirmação mesmo sem pagamento real.

**Efeito:** UX enganosa (tela de sucesso sem pagamento). Sem impacto real no acesso — o acesso real depende do webhook, que só processa eventos autênticos do Stripe.

---

### BUG-5 (BAIXO) — `increment_filled_seats` não tem tratamento de erro no webhook

**Arquivo:** `src/app/api/webhooks/stripe/route.ts:246`

**Problema:**
```ts
await (supabaseAdmin.rpc as any)('increment_filled_seats', { p_cohort_id: cohort_id })
```
Usa `as any` para contornar tipagem. Erros silenciosos se a função RPC falhar. O `filled_seats` pode ficar defasado.

**Efeito:** Contador de vagas impreciso. Não impede matrícula (constraint de vagas não está implementada no schema).

---

## Resumo Executivo

O schema e as RLS policies estão corretos e bem estruturados. O service_role bypassa RLS como esperado — sem bloqueio de INSERT em `cohort_members` pelo banco.

Há **dois bugs críticos independentes** que juntos tornam o fluxo completamente inoperante:

1. **BUG-1 (stripe_price_entry_id null):** O checkout aborta antes de criar qualquer sessão Stripe. Nenhum webhook é disparado, nenhuma matrícula é criada. Fix: `UPDATE cohorts SET stripe_price_entry_id = 'price_...' WHERE slug = 'curso-online-padrao'`.

2. **BUG-2 (included_module_ids semântica):** Mesmo após matrícula bem-sucedida (se BUG-1 for corrigido), o aluno veria zero conteúdo. `'{}'` é interpretado como "nenhum módulo" pelo código, mas o schema documenta que deveria ser "todos os módulos". Fix: tratamento do array vazio como fallback de acesso total nas páginas `/academy/curso/[slug]/page.tsx` e `/academy/meus-cursos/page.tsx`.

**BUG-1b (constraint ausente):** Design gap no schema — `is_purchasable = true` com `stripe_price_entry_id = null` é um state inválido que o banco deveria rejeitar via CHECK constraint.
