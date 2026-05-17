---
title: Diagnóstico — Bug 404 aulas com slug "abertura"
type: diagnosis
agent: sites-data
created: 2026-05-17
status: fixed
tags: [bug, lessons, slug, uniqueness, 404]
---

# Diagnóstico: Bug 404 em aulas com slug duplicado

## 1. Estado atual do schema (uniqueness)

O constraint original `UNIQUE (module_id, slug)` foi substituído pela migration `20260516200000` (commit `6a44c6d`) por um **partial unique index**:

```sql
-- Aplicado em 2026-05-16
ALTER TABLE public.lessons DROP CONSTRAINT IF EXISTS lessons_module_id_slug_key;
CREATE UNIQUE INDEX IF NOT EXISTS lessons_module_id_slug_active_unique
  ON public.lessons (module_id, slug)
  WHERE deleted_at IS NULL;
```

**Escopo de uniqueness: `(module_id, slug)` — por módulo, não por curso.**

Isso significa que dois módulos diferentes, mesmo dentro do **mesmo curso**, podem ter lessons com o mesmo slug. O banco **permite e valida** esse estado hoje.

---

## 2. Lessons "abertura" existentes em produção

**Total de duplicatas: 2 lessons ativas com `slug = 'abertura'`:**

| id | title | slug | module_id | module_title | course_slug | deleted_at |
|---|---|---|---|---|---|---|
| `9828e194` | Abertura | abertura | `3901d7a4` | Módulo 3 \| Fundamentos | mentoria-claude-code-aiox | NULL |
| `9bd1b784` | Abertura | abertura | `fe6bcf96` | Módulo 5 \| Claude Design | mentoria-claude-code-aiox | NULL |

Ambas pertencem ao **mesmo curso** (`mentoria-claude-code-aiox`), em módulos distintos. Nenhuma está soft-deleted.

**Outros slugs duplicados no banco:** nenhum (única duplicata confirmada via varredura completa das 20 lessons).

---

## 3. Causa raiz — Query de lookup com escopo insuficiente

### Arquivo afetado
`src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx:45-85`

### Query problemática (linha 45)
```typescript
const { data: lesson } = await supabase
  .from('lessons')
  .select(`id, title, ..., modules!inner(id, ..., courses!inner(id, slug, ...))`)
  .eq('slug', lessonSlug)           // filtro 1: lesson slug
  .eq('modules.courses.slug', slug) // filtro 2: course slug
  .is('deleted_at', null)
  .single()                          // ← AQUI está o problema
```

**O filtro `WHERE lesson.slug = 'abertura' AND course.slug = 'mentoria-claude-code-aiox'` retorna 2 rows** (uma por módulo).

O Supabase PostgREST com `.single()` lança `PGRST116` quando mais de 1 row é retornado. O código faz destructuring `{ data: lesson }` sem checar o erro explicitamente — `lesson` fica `null`, e a linha `if (!lesson) notFound()` dispara o 404.

**Evidência empírica:** simulação via REST confirmou `content-range: 0-1/2` (2 rows retornados pela query com os filtros atuais do código).

### Mesmo problema em generateMetadata (linha 28)
```typescript
const { data: lesson } = await supabase
  .from('lessons')
  .select('title, modules!inner(courses!inner(slug))')
  .eq('slug', lessonSlug)
  .eq('modules.courses.slug', slug)
  .single()   // ← mesmo bug no metadata
```

---

## 4. Opções de fix (somente data layer)

### Opção A — Adicionar uniqueness composta por curso + migration de slugs existentes
**O quê:** Criar índice `UNIQUE (course_id via JOIN) + slug` — exige desnormalização (adicionar `course_id` na tabela `lessons`) ou usar índice funcional via subquery.

**Mais viável:** adicionar coluna `course_id` em `lessons` (redundante mas comum) e índice `UNIQUE (course_id, slug) WHERE deleted_at IS NULL`.

**Migration necessária:**
1. `ALTER TABLE lessons ADD COLUMN course_id uuid REFERENCES courses(id)` + backfill via UPDATE com JOIN
2. Renomear slug da lesson duplicada (ex: `abertura-m5` no Módulo 5)
3. `CREATE UNIQUE INDEX lessons_course_id_slug_active_unique ON lessons (course_id, slug) WHERE deleted_at IS NULL`

**Trade-offs:**
- (+) Resolve na origem — impede futuras duplicatas cross-módulo no mesmo curso
- (+) Constraint enforçado pelo banco
- (-) Requer renomear slug existente — URL `/aula/abertura` quebra para o Módulo 5 (alunos com link direto recebem 404)
- (-) Adiciona coluna redundante (denormalização)
- (-) Migration mais invasiva, risco maior

### Opção B — Ajustar query para incluir `module_id` no WHERE (fix na aplicação)
**O quê:** A URL do aluno é `/curso/[course-slug]/aula/[lesson-slug]`. Mas a URL não carrega o `module_id`. Para desambiguar com o contexto disponível na URL, não há discriminador suficiente sem alterar a estrutura da URL.

**Variante B1 — alterar URL para incluir module-slug:**
`/curso/[course-slug]/modulo/[module-slug]/aula/[lesson-slug]`
Adicionar `module_id` ao WHERE com base no `module-slug` resolveria o conflito, mas quebra todas as URLs existentes.

**Variante B2 — query retorna primeiro resultado (`.limit(1)` ao invés de `.single()`):**
Usar `.limit(1).maybeSingle()` — retorna o primeiro resultado sem lançar erro. Não resolve o problema de mostrar a aula errada, mas pelo menos elimina o 404.

**Trade-offs B1:**
- (+) Fix correto na raiz, sem denormalização no banco
- (-) Quebra URLs existentes — breaking change de SEO e links de alunos
- (-) Requer redirect permanente de todas as URLs antigas

**Trade-offs B2:**
- (+) Fix rápido, zero breaking change, elimina 404 imediato
- (-) Mostra sempre a mesma aula "Abertura" (a primeira encontrada) — comportamento silenciosamente incorreto

### Opção C — Renomear slugs existentes para torná-los únicos por curso (fix de dados + constraint)
**O quê:** Renomear os slugs das aulas duplicadas para incluir identificador do módulo (ex: `abertura-modulo-3`, `abertura-modulo-5`) e manter o constraint `(module_id, slug)` atual.

**Migration necessária:**
1. UPDATE da lesson duplicada com novo slug
2. (Opcional) criar redirect de `/aula/abertura` para `/aula/abertura-modulo-5` no Next.js

**Trade-offs:**
- (+) Fix cirúrgico — só afeta os 2 rows problemáticos
- (+) Sem mudança de schema ou constraint
- (-) Paliativo — não previne futuras duplicatas cross-módulo
- (-) Requer atenção manual a cada novo módulo com "Abertura"

---

## 5. Recomendação

**Curto prazo (imediato, sem quebrar URLs):** Opção C — renomear slug da lesson duplicada no Módulo 5 para `abertura-modulo-5` (ou similar), eliminando o conflito. Risco zero de breaking change. Pode ser combinada com fix no código (`.limit(1)` como safety net).

**Médio prazo (prevenção estrutural):** Opção A — adicionar `course_id` em `lessons` com índice `UNIQUE (course_id, slug) WHERE deleted_at IS NULL`. Resolve na origem, impede reincidência. Requer planejamento de migration + rollback cuidadoso.

**Opção B2 deve ser evitada** — comportamento silenciosamente errado (aluno vê aula do módulo errado sem saber) é pior do que o 404 visível.

---

## 6. URLs afetadas confirmadas

- `/academy/curso/mentoria-claude-code-aiox/aula/abertura` → 404 hoje
- Ambas as lessons são do mesmo curso, módulos distintos

## 7. Próximos passos recomendados

1. Equipe de dev aplica fix de dados (Opção C) via migration urgente ✅ Concluído — ver seção 8
2. Equipe de dev aplica safety net no código (guard no gerador de slug no admin)
3. (Backlog) ADR para decidir entre Opção A vs manter Opção C + monitoramento

---

## 8. Fix aplicado — 2026-05-17

### Snapshot pre-fix

| id | slug | title | module_id | created_at |
|---|---|---|---|---|
| `9828e194-3939-4c9e-bb45-7aece7630179` | abertura | Abertura | `3901d7a4` (Módulo 3 \| Fundamentos) | 2026-05-17T16:05:05+00:00 |
| `0c96c53a-fd68-4651-bcd4-530d6e3f9bd0` | abertura | Abertura | `fe6bcf96` (Módulo 5 \| Claude Design) | 2026-05-17T17:19:38+00:00 |

### Decisão de qual renomear

Lesson mais antiga: `9828e194` (Módulo 3, criada 16:05) — **mantém `slug = 'abertura'`**

Lesson mais nova: `0c96c53a` (Módulo 5, criada 17:19) — **renomeada para `slug = 'abertura-2'`**

### UPDATE aplicado

```sql
-- Equivalente ao PATCH via PostgREST:
UPDATE public.lessons
SET slug = 'abertura-2', updated_at = now()
WHERE id = '0c96c53a-fd68-4651-bcd4-530d6e3f9bd0';
-- 1 row affected
```

Row retornada: `id=0c96c53a, slug=abertura-2, updated_at=2026-05-17T17:27:36+00:00`

### Smoke-tests pós-fix

**ST-1 — Query de lookup retorna exatamente 1 row:**
`GET /lessons?slug=eq.abertura&modules.courses.slug=eq.mentoria-claude-code-aiox`
→ `content-range: 0-0/1` ✅ — 1 row, id=`9828e194`, Módulo 3 | Fundamentos

**ST-2 — `abertura-2` existe no módulo correto:**
`GET /lessons?id=eq.0c96c53a-fd68-4651-bcd4-530d6e3f9bd0`
→ `slug=abertura-2, module_id=fe6bcf96, deleted_at=null` ✅

**ST-3 — Varredura global de duplicatas:**
→ `20 lessons ativas — zero slugs duplicados` ✅

### URLs pós-fix

- `/academy/curso/mentoria-claude-code-aiox/aula/abertura` → Módulo 3 | Fundamentos ✅ (funcionando)
- `/academy/curso/mentoria-claude-code-aiox/aula/abertura-2` → Módulo 5 | Claude Design (nova URL)
