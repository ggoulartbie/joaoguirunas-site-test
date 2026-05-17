---
title: Diagnóstico — 404 em aulas "Abertura"
type: diagnosis
status: pending-approval
agent: sites-dev-gamma (Seranol)
created: 2026-05-17
tags: [bug, routing, slug, lessons]
---

# Diagnóstico — 404 em aulas "Abertura"

## Causa raiz

**URL ambígua + lookup por slug puro sem contexto de módulo.**

### Schema (data layer)

A constraint de unicidade em `lessons` é `(module_id, slug)` — ou seja, o slug `abertura` é único **dentro de um módulo**, mas pode (e deve) existir em múltiplos módulos:

```sql
-- migration: initial_schema_identidade_catalogo.sql, linha 124
unique (module_id, slug)

-- migration: soft_delete_aware_slug_uniqueness.sql
-- Substituída por partial unique index (mesmo escopo):
CREATE UNIQUE INDEX lessons_module_id_slug_active_unique
  ON public.lessons (module_id, slug)
  WHERE deleted_at IS NULL;
```

Portanto, o banco **permite e espera** múltiplas lessons com slug `abertura` — uma por módulo. Isso é correto e intencional.

### Application layer (rota `/aula/[lesson-slug]`)

O server component em `page.tsx` faz o lookup **apenas por `(lesson-slug, course.slug)`**, sem discriminar o módulo:

```ts
// src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx — linha 45-85
const { data: lesson } = await supabase
  .from('lessons')
  .select(`...`)
  .eq('slug', lessonSlug)             // ← filtra por lesson slug puro
  .eq('modules.courses.slug', slug)   // ← filtra pelo curso (via join)
  .is('deleted_at', null)
  .single()                           // ← espera exatamente 1 linha
```

O filtro `.eq('modules.courses.slug', slug)` resolve para: *qualquer lesson com esse slug, em qualquer módulo desse curso*. Quando o curso tem 2+ módulos cada um com uma lesson "Abertura", a query retorna **múltiplas linhas** — e `.single()` do Supabase/PostgREST retorna `null` (ou erro) quando o resultado não é exatamente 1 linha.

### Onde o 404 dispara

`page.tsx` linha 87:
```ts
if (!lesson) notFound()
```

`lesson` é `null` porque `.single()` falhou (múltiplos resultados ou nenhum). O `notFound()` é chamado imediatamente.

### Geração dos hrefs (links na sidebar e navegação)

Todos os links gerados usam **slug puro**:

- `CourseSidebar.tsx` linha 146: `href={/academy/curso/${courseSlug}/aula/${lesson.slug}}`
- `page.tsx` (nav compacto) linha 509: `href={/academy/curso/${slug}/aula/${globalPrev.slug}}`
- `curso/[slug]/page.tsx` linha 483: `href={/academy/curso/${courseSlug}/aula/${lesson.slug}}`

O link gerado para "Abertura" do módulo 2 e "Abertura" do módulo 1 é **idêntico**: `/academy/curso/meu-curso/aula/abertura`. Nenhum lado (link nem lookup) inclui o módulo.

---

## Onde o bug se manifesta

1. Aluno acessa `/academy/curso/[slug]/aula/abertura`
2. Query busca `lessons WHERE slug = 'abertura' AND modules.courses.slug = '[slug]'`
3. Resultado: 2+ linhas (uma por módulo)
4. `.single()` → `null`
5. `notFound()` → 404

O mesmo acontece via "Retomar" CTA na página do curso, via sidebar e via navegação prev/next.

---

## Opções de fix

### Opção A — Mudar URL para incluir module slug

**Estrutura:** `/academy/curso/[course-slug]/modulo/[module-slug]/aula/[lesson-slug]`

**Prós:**
- Disambiguação completa — o triplo `(course_slug, module_slug, lesson_slug)` é único por schema
- URL semântica e hierárquica
- Alinha com a constraint do banco `(module_id, slug)`

**Contras:**
- **Breaking change**: todos os links existentes (`/aula/abertura`) quebram — bookmarks, links compartilhados, histórico do aluno
- Requer atualizar CourseSidebar, nav compacto, página do curso, `generateMetadata`, e qualquer outro lugar que gera hrefs de aula
- Segmento de rota mais longo para digitar/memorizar

**SEO/bookmarks:** impacto alto — robots: noindex já está setado nessas páginas (linha 35 do `page.tsx`), então Google não indexa. Bookmarks de alunos quebrariam.

---

### Opção B — Mudar lookup para usar query params (module_id ou module_slug)

**Estrutura:** `/academy/curso/[slug]/aula/abertura?m=[module-slug]`

**Prós:**
- URL base permanece igual — sem breaking change para links simples
- Sem nova segment de rota, sem refactor de Next.js routing

**Contras:**
- URLs com query params são menos canônicas para bookmarks
- Requer fallback para o caso sem `?m=` (retornar o primeiro resultado, ou 404 — decisão ambígua)
- Precisa propagar `?m=` em todos os hrefs gerados

---

### Opção C — Lookup por (course_id, sort_order_no_módulo) — hash determinístico

Não recomendado: adiciona complexidade sem resolver a ambiguidade de forma limpa.

---

### Opção D — Enforcer slug único por curso (não por módulo)

Alterar constraint de `unique(module_id, slug)` para `unique(course_id, slug)` via join/trigger.

**Prós:**
- Resolve o problema na raiz — impossibilita a colisão
- Sem mudança na URL nem no lookup

**Contras:**
- **Breaking change no schema** — precisa renomear lessons existentes com slug duplicado em prod
- Restringe flexibilidade: dois módulos jamais podem ter aula "Introdução" ou "Abertura"
- Migration com possível conflito em dados existentes

---

## Recomendação

**Opção A** — mudar a URL para incluir o module slug.

**Justificativa:**
1. Alinha com o schema (`unique(module_id, slug)`) — a URL reflete a chave natural dos dados
2. Elimina o bug de forma definitiva sem lógica de fallback ou ambiguidade
3. As páginas de aula já têm `robots: { index: false }` — o impacto SEO externo é zero
4. O único impacto real são bookmarks de alunos — mitigável com um redirect 301 de `/aula/[lslug]` → `/modulo/[mslug]/aula/[lslug]` usando a primeira lesson encontrada (para slugs não-ambíguos) ou redirect para a página do curso (para ambíguos)
5. É a solução mais idiomática em Next.js App Router (segmentos hierárquicos)

**Estrutura da nova rota:**
```
src/app/(academy)/academy/(student)/curso/[slug]/modulo/[module-slug]/aula/[lesson-slug]/page.tsx
```

**Lookup na nova rota:**
```ts
.eq('slug', lessonSlug)
.eq('modules.slug', moduleSlug)        // ← discriminador de módulo
.eq('modules.courses.slug', courseSlug)
.single()  // agora retorna exatamente 1
```

**Impacto de implementação estimado:**
- Mover/renomear a pasta de rota
- Atualizar todos os `href` em CourseSidebar, LessonNavCompact, CursoPage (retomar CTA + lista)
- Propagar `moduleSlug` nos tipos `NavLesson` e `SidebarModule`
- Adicionar redirect em `next.config.ts` para URLs antigas

---

## Arquivos afetados (Opção A)

| Arquivo | Mudança |
|---|---|
| `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx` | Mover para `modulo/[module-slug]/aula/[lesson-slug]/` + adicionar filtro por module slug no lookup |
| `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/CourseSidebar.tsx` | Mover + atualizar hrefs para incluir `moduleSlug` |
| `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/LessonTabs.tsx` | Mover |
| `src/app/(academy)/academy/(student)/curso/[slug]/page.tsx` | Atualizar hrefs (retomar CTA + lista de aulas) para incluir `module.slug` |
| `next.config.ts` | Adicionar redirect `/aula/:lslug` → `/modulo/:mslug/aula/:lslug` |
