---
title: "QA Verdict — soft-delete fix + academy smoke check"
agent: sites-qa (Axilun)
date: 2026-05-17
story: "fix/academy-soft-delete-restoration"
verdict: FAIL
related: [["agents/qa/results"]]
tags: [qa, verdict, academy, soft-delete, 404, fail]
---

# VEREDICTO: FAIL

**Story:** fix/academy-soft-delete-restoration
**URL alvo:** `https://joaoguirunas.com/academy/curso/mentoria-claude-code-aiox/aula/abertura`
**Data:** 2026-05-17
**Checklist:** 7/10 (3 critérios bloqueados pela falha funcional)

---

## Causa raiz do 404 (persiste)

A restauração via Supabase CLI deixou **3 lessons ativas com slug `abertura`** no mesmo curso `mentoria-claude-code-aiox`. A query da página (`src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx:45-85`) usa `.single()`, que falha com `PGRST116` quando há mais de uma linha — fazendo `lesson` ser `null` e disparando `notFound()` em `page.tsx:87`.

### Evidência (Supabase, 2026-05-17)

| lesson_id | module_id | module_slug | module_title | module_deleted_at | lesson_deleted_at | video_id |
|---|---|---|---|---|---|---|
| `c5f8a4e5-…3c91` | `4ecd19f9-…15ac` | `modulo-3-fundamentos` | Módulo 3 \| Fundamentos | **2026-05-16 19:00:56** | NULL | 1192870861 |
| `9bd1b784-…377b` | `fe6bcf96-…1d` | `modulo-5-claude-design` | Módulo 5 \| Claude Design | NULL | NULL | **NULL** |
| `9828e194-…0179` | `3901d7a4-…3c91` | `modulo-3-fundamentos` | Módulo 3 \| Fundamentos | NULL | NULL | 1192870861 |

A query **não filtra por `modules.deleted_at IS NULL`**, então as 3 linhas casam o filtro `(slug = 'abertura' AND modules.courses.slug = 'mentoria-claude-code-aiox' AND lessons.deleted_at IS NULL)` → `.single()` quebra.

### Issues bloqueantes

- [CRITICAL] Slug `abertura` duplicado em 3 lessons ativas no mesmo curso. Decidir qual é a canônica e soft-deletar as outras 2 (ou renomear slugs). Caminho recomendado:
  - Manter `9828e194-…0179` (módulo `modulo-3-fundamentos` ativo, video_id preservado, ordem 0)
  - Soft-delete `c5f8a4e5-…3c91` (vive em módulo deletado — fica órfão de qualquer forma)
  - Soft-delete `9bd1b784-…377b` (sem video_id — é a duplicata-lixo do módulo-5)
- [CRITICAL] Slug `modulo-3-fundamentos` duplicado em 2 módulos (1 deletado, 1 ativo) — não bloqueia hoje, mas se o módulo restaurado for re-soft-deletado o ativo será o errado.

### Issues secundários (CONCERNS, não bloqueiam o 404)

- [CONCERN] A query da página não filtra `modules.deleted_at IS NULL` no embed `modules!inner`. Mesmo com slugs limpos, uma aula órfã num módulo deletado ainda apareceria. Recomendar adicionar `.is('modules.deleted_at', null)`.
- [CONCERN] Módulos de teste em produção: `teste-2`, `teste-3` (ativos), `teste` (deletado). Provavelmente lixo de QA — pedir confirmação ao lead antes de remover.
- [CONCERN] Module `modulo-3-fundamentos` ativo está com `sort_order = 0` (mesmo do deletado) — coexiste com `modulo-1-centro-de-treinamento` (sort_order = 1) e `modulo-2-claude-design` (sort_order = 2). Ordenação visual da sidebar pode quebrar.

---

## Checklist 10-Point

| # | Critério | Status |
|---|---|---|
| 1 | Code review | ✅ Filtro `.is('deleted_at', null)` linha 84 está correto; o problema é dado, não código |
| 2 | Acceptance criteria | ❌ AC "404 resolvido" NÃO atendido — 404 persiste por motivo diferente do soft-delete |
| 3 | Sem regressões | ⚠️ Bloqueado — não dá pra testar enquanto a página dá 404 |
| 4 | Performance | ⚠️ N/A enquanto 404 |
| 5 | Acessibilidade | ⚠️ N/A enquanto 404 |
| 6 | SEO | ✅ `robots: { index: false, follow: false }` correto para área logada |
| 7 | Responsivo | ⚠️ N/A enquanto 404 |
| 8 | Copy | ✅ Sem issues |
| 9 | Cross-browser | ⚠️ N/A enquanto 404 |
| 10 | Security | ✅ `has_access` RPC mantida antes de tocar `video_id`; padrão correto preservado |

---

## Próximo passo

`@team-lead` → atribuir ao agente responsável (parece ser **Bythelion**, task #1 já `in_progress`) para resolver os slug conflicts via Supabase CLI. Após a correção, **resubmeter para nova auditoria**.

Sugestão de SQL de fix (sob revisão do lead, não executado por QA):

```sql
-- Soft-delete duplicatas de slug 'abertura' (preserva a canônica em modulo-3 ativo)
UPDATE public.lessons
SET deleted_at = now()
WHERE id IN (
  'c5f8a4e5-4c9e-450a-90b6-2cb1838db223', -- órfã (módulo pai deletado)
  '9bd1b784-6def-4a0b-82ea-fe8798dd377b'  -- duplicata sem video_id em modulo-5
);
```

Não executei a query agregada de duplicatas globais (rate-limit do pooler bateu em ECIRCUITBREAKER). Recomendado o Bythelion rodar a varredura completa antes do fix:

```sql
SELECT l.slug, count(*) as count, array_agg(l.id) as ids
FROM public.lessons l
JOIN public.modules m ON m.id = l.module_id
JOIN public.courses c ON c.id = m.course_id
WHERE c.slug = 'mentoria-claude-code-aiox' AND l.deleted_at IS NULL
GROUP BY l.slug HAVING count(*) > 1;
```

Pode haver outras aulas duplicadas além de `abertura` causando 404s silenciosos em outras URLs.
