---
title: "ADR-002: Schema de materiais por módulo"
type: adr
status: accepted
date: 2026-05-16
approved_date: 2026-05-17
approved_by: João Guirunas (PO)
author: sites-architect (Zaelion)
tags: [adr, materials, modules, schema, rls, supabase]
related:
  - "[[ADR-001-plataforma-cursos-stack]]"
  - "[[../project/architecture]]"
  - "[[../stories/backlog/2.2-admin-gerencia-materiais]]"
  - "[[../stories/backlog/2.4-cleanup-material-actions-duplicate]]"
---

# ADR-002: Schema de materiais por módulo

## Status

**Accepted** — proposta 2026-05-16, aprovada 2026-05-17 pelo PO João Guirunas.

## Contexto

Hoje a tabela `materials` está vinculada **estritamente à `lessons`** via
`materials.lesson_id NOT NULL references lessons(id)`
(`supabase/migrations/20260506021755_initial_schema_identidade_catalogo.sql:131-143`).

A decisão **D6 do ADR-001** registra explicitamente: _"Materiais vinculados à
lesson, herdam acesso. Sem regra de acesso própria; simplifica policy."_

Surge nova feature: o admin precisa anexar materiais (PDF, IMG, ZIP, LINK)
**diretamente ao módulo**, e o aluno precisa vê-los na página do curso (não
dentro de uma aula). Conceitualmente são "materiais de apoio do módulo" — ex.:
ementa, slides do módulo, planilha consolidada — que não pertencem a uma única
aula.

O fluxo de aula já existe e funciona (`LessonEditorClient.tsx`,
`uploadMaterial`/`deleteMaterial` em `actions.ts:183-223`, bucket privado
`materials` com path `lessons/{lessonId}/{uuid}.{ext}`). Esta ADR decide
**como modelar materiais de módulo no banco** antes de qualquer migration ou
linha de código de stories da Epic FM (Functional Materials by Module).

### Constraints conhecidos

- Banco de prod tem dados reais (~13 lessons + materials de discovery anterior).
- RLS é o **risco crítico documentado** no ADR-001 (severidade crítica).
- ADR-001 D6 está implícito: materiais herdam acesso via `has_access(user, lesson_id)`.
  Estender para módulo exige decidir como o aluno é autorizado a ver um material
  cuja unidade de gate é o módulo.
- Aluno autorizado num módulo já tem leitura na tabela `modules` via policy
  `"modules: leitura se course published"` E indiretamente via `has_access` em
  qualquer lesson do módulo. Não existe hoje função `has_module_access(user, module_id)`.

## Opções consideradas

### Opção A — Nova tabela `module_materials` espelhada

```sql
create table public.module_materials (
  id            uuid primary key default gen_random_uuid(),
  module_id     uuid not null references public.modules(id) on delete cascade,
  title         text not null,
  kind          text not null check (kind in ('PDF', 'ZIP', 'IMAGE', 'LINK', 'OTHER')),
  storage_path  text,
  external_url  text,
  size_bytes    bigint,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);
create index on public.module_materials (module_id, sort_order);
```

Storage path convention: `modules/{moduleId}/{uuid}.{ext}` no mesmo bucket
privado `materials`.

RLS dedicada: policy `module_materials: leitura se tem acesso ao módulo` usando
uma função nova `has_module_access(user_id, module_id)` (espelho de
`has_access` mas filtrando por `module_id` diretamente nas `cohort_courses`).

**Prós:**
- Risco zero sobre dados existentes — migration **aditiva pura** (apenas CREATE).
- RLS **isolada e auditável**: a policy nova vive em um único bloco da migration
  de RLS, sem tocar a policy existente de `materials` (que é defesa-em-profundidade
  do gap reportado no ADR-001 como risco crítico).
- Server actions paralelas (`uploadModuleMaterial`, `deleteModuleMaterial`)
  espelham 1:1 as de aula — fácil entender, fácil testar, fácil revisar.
- Cleanup de storage continua trivial: prefixo `modules/{id}/...` é
  determinístico e os paths nunca colidem com `lessons/{id}/...`.
- Listing por módulo no admin = `where module_id = X order by sort_order`
  (zero JOIN, zero UNION).
- Listing no curso público (aluno) = mesma query, gate via RLS.
- Reordenação, RLS de admin (insert/update/delete) e tipos TypeScript
  (`Database['public']['Tables']['module_materials']['Row']`) saem automaticamente.

**Contras:**
- **Duplicação de colunas e código**: tabela e actions repetem o mesmo
  vocabulário 7 colunas + 4 funções. Tech debt aceito, contável.
- Se algum dia surgir "materiais por cohort" ou "materiais do curso", triplica.
  Cobertura via [[follow-up: avaliar consolidação]] depois que o uso real
  estabilizar.
- Visão consolidada "todos os materiais do curso" (caso surja como requisito
  futuro) exigirá `UNION ALL` entre `materials` (via lessons → modules → course)
  e `module_materials` (via module → course). **Não é requisito da Epic FM**.

### Opção B — Estender `materials` com `module_id nullable` + XOR

```sql
-- DDL crítico em tabela com dados reais em prod
alter table public.materials
  alter column lesson_id drop not null,
  add column module_id uuid references public.modules(id) on delete cascade,
  add constraint materials_xor_parent check (
    (lesson_id is not null and module_id is null)
    or (lesson_id is null and module_id is not null)
  );
create index on public.materials (module_id, sort_order);
```

RLS existente (`"materials: leitura se tem acesso à lesson"` em
`20260506022037_has_access_rls_policies.sql:175-180`) precisa ser
**reescrita** para um OR com dois ramos:

```sql
using (
  (lesson_id is not null and public.has_access(auth.uid(), lesson_id))
  or (module_id is not null and public.has_module_access(auth.uid(), module_id))
  or public.is_admin()
)
```

**Prós:**
- Uma tabela única, um único set de tipos, uma única action de upload com
  parâmetro `parent: { lessonId | moduleId }`.
- Listing consolidado "tudo do módulo" é trivial:
  `where module_id = X or lesson_id in (select id from lessons where module_id = X)`.
- Cleanup de storage permanece um único bucket com 2 prefixos
  (`lessons/...`, `modules/...`).

**Contras:**
- **DDL destrutivo em tabela de prod com dados** — `drop not null` em FK
  existente. Requer downtime curto ou backfill cuidadoso. Risco real, mesmo
  que mitigável.
- **RLS reescrita** atinge o vetor crítico do ADR-001. Mudar policy existente
  carrega risco maior do que adicionar policy nova: uma falha numa branch do
  OR pode vazar dados.
- Check constraint XOR funciona mas é mais frágil em inserts via `supabaseAdmin`
  (que bypassa RLS mas **não** bypassa check constraints — bom para integridade,
  mas qualquer bug de orquestração no client gera 400 com mensagem genérica).
- Regenerar `database.types.ts` muda assinatura de `Materials['Row']` no projeto
  inteiro (`lesson_id` vira `string | null`). Diff cross-cutting com risco de
  regressão em `MaterialsList.tsx`, `MaterialsUpload.tsx`,
  `f4.2-signed-url-action`, etc.
- Não há ganho de developer experience no admin: as duas UIs continuam separadas
  (editor de aula vs editor de módulo) — a "tabela única" não elimina trabalho
  de UI.

### Opção C — Polimorfismo `parent_kind + parent_id`

```sql
alter table public.materials
  add column parent_kind text check (parent_kind in ('LESSON', 'MODULE')),
  add column parent_id uuid;
-- + backfill + drop lesson_id + check constraint + sem FK
```

**Rejeitada de plano.** Perde integridade referencial (Postgres não suporta FK
polimórficas), força branches em todas as policies e queries, e é
notoriamente um anti-pattern em modelagem relacional. Pior dos mundos para o
custo de complexidade.

## Decisão

**Opção A — nova tabela `module_materials` espelhada.**

Justificativa ranqueada por peso:

1. **Risco RLS minimizado** (peso máximo — ADR-001 lista RLS como risco crítico).
   Policy nova e isolada é mais auditável do que rewrite de policy existente.
2. **Migration aditiva pura** sobre prod com dados reais. Zero downtime, zero
   backfill, zero risco de regressão em `materials` existente.
3. **Requisitos atuais não pedem visão consolidada** "todos materiais do curso"
   — a Epic FM pede gestão por aula (existente) e por módulo (novo). UNION só
   seria necessário se o requisito surgir; pode ser adicionado via VIEW depois.
4. **Aderência ao padrão Luminari** "duplicar com pequenos ajustes" + paralelismo
   total com o fluxo de aula existente: leitura e revisão são triviais.
5. **Tech debt explícito e contido**: 7 colunas espelhadas + 4 functions
   paralelas. Custo conhecido, sem ramificações além do escopo da feature.

Trade-off aceito: **se** num horizonte de 12+ meses surgir "materiais do curso"
ou "materiais da cohort", uma ADR-003 reabrirá esta decisão e pode consolidar
em tabela única (com a vantagem de já ter histórico de uso real para decidir
melhor).

## Consequências

### Positivas
- RLS isolada e fácil de auditar. Cabe em uma única secção da migration de RLS.
- Migration aditiva — pode rodar em prod sem janela de manutenção.
- Stories da Epic FM (FM-3.2 a FM-3.5) ficam ortogonais ao código de materiais
  de aula existente: zero risco de regressão na Story 2.2 (que está em curso).
- `has_module_access(user_id, module_id)` é uma função reutilizável que
  pode servir a futuras features de gating por módulo (ex.: drip por módulo,
  badges por módulo).
- A Story 2.4 (cleanup de funções duplicadas de delete em `material-actions.ts`
  / `MaterialsUpload.tsx`) é absorvida como **FM-3.7** desta epic, evitando
  introduzir mais ramificações ao limpar.

### Negativas e mitigações

| Consequência | Mitigação |
|---|---|
| Duplicação de 7 colunas entre `materials` e `module_materials` | Aceito e contável; cobertura via [[follow-up: avaliar consolidação após 12 meses de uso]] |
| Duas server actions paralelas (`uploadMaterial`, `uploadModuleMaterial`) | Helper compartilhado `getMaterialKind(mime)` e path builder `buildMaterialPath(prefix, id, ext)` extraídos para `lib/materials/storage.ts` |
| Tipo TypeScript `MaterialRow` vs `ModuleMaterialRow` separados | Aceitável — UIs são separadas; reduzir via tipo `BaseMaterial` ergonômico só se a UI realmente compartilhar componente (não é o caso hoje) |
| Possível necessidade futura de UNION "tudo do curso" | Solução prevista: VIEW SQL `course_materials_all` que faz o UNION quando surgir. Custo baixo, adicionado quando o requisito existir |
| Aluno consumindo materiais do módulo precisa de `has_module_access` em RLS, função nova | Implementada como espelho enxuto de `has_access`, sem mexer em `has_access` — defesa em profundidade preservada |

### Definição operacional da função RLS nova

```sql
create or replace function public.has_module_access(p_user_id uuid, p_module_id uuid)
returns boolean
language sql
security definer
stable
as $$
  with module_info as (
    select m.course_id
    from public.modules m
    where m.id = p_module_id
      and m.deleted_at is null
  )
  select exists (
    select 1
    from public.cohort_members cm
    join public.cohort_courses cc on cc.cohort_id = cm.cohort_id
    join module_info mi on mi.course_id = cc.course_id
    where cm.user_id = p_user_id
      and cm.status = 'ACTIVE'
      and (cm.expires_at is null or cm.expires_at > now())
      and (
        cardinality(cc.included_module_ids) = 0
        or p_module_id = any(cc.included_module_ids)
      )
  );
$$;
```

Idêntica em filosofia a `has_access(user, lesson_id)`: ramifica em
`cohort_members ACTIVE` + `cohort_courses.included_module_ids` (lista vazia =
todos os módulos do curso liberados).

### Storage layout consolidado

| Tipo | Bucket | Path |
|---|---|---|
| Material de aula | `materials` (privado) | `lessons/{lessonId}/{uuid}.{ext}` |
| Material de módulo | `materials` (privado) | `modules/{moduleId}/{uuid}.{ext}` |

Mesmo bucket, prefixos disjuntos. Signed URL flow é idêntico ao de aula.

## Impacto nas stories

A Epic FM (Materials by Module) é quebrada em 6 stories:

- **FM-3.2** Migration `module_materials` + função `has_module_access` + RLS
  policies (sites-data).
- **FM-3.3** Server actions `uploadModuleMaterial`, `deleteModuleMaterial`,
  `addLinkModuleMaterial` (sites-dev-beta).
- **FM-3.4** UI admin — nova rota `/cursos/[courseId]/modulos/[moduleId]/` com
  `ModuleEditorClient.tsx` espelhando `LessonEditorClient` (sites-dev-alpha).
- **FM-3.5** UI student — exibir materiais do módulo na página pública do curso
  (sites-dev-alpha).
- **FM-3.6** QA gate end-to-end com veredicto GO/NO-GO (sites-qa).
- **FM-3.7** Cleanup tech debt — consolidar/remover funções duplicadas de
  delete que estavam previstas para Story 2.4
  ([[../stories/backlog/2.4-cleanup-material-actions-duplicate]]).

A Story 2.2 (gestão de materiais por aula) **não é tocada** por esta ADR — segue
seu fluxo independente em `feat-aulas-v2`.

## Não-objetivos desta ADR

- Bulk upload de materiais.
- Reordenação por drag-and-drop (pode entrar em follow-up).
- Audit log de quem subiu/deletou material (sem requisito).
- Materiais com escopo "curso" ou "cohort" — não pedidos hoje. Reabrir via
  ADR-003 quando/se surgirem.
- VIEW consolidada `course_materials_all` (UNION) — entra só quando houver
  consumidor real.

## Referências

- [[ADR-001-plataforma-cursos-stack]] — D6: materiais herdam acesso via lesson
- `supabase/migrations/20260506021755_initial_schema_identidade_catalogo.sql:131-143` — schema atual de `materials`
- `supabase/migrations/20260506022037_has_access_rls_policies.sql:27-53,175-192` — `has_access` + policies de `materials`
- `src/app/(academy)/academy/(admin)/admin/cursos/actions.ts:183-223` — `uploadMaterial`/`deleteMaterial` (espelho)
- `src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/aulas/[lessonId]/LessonEditorClient.tsx:124-138,313-344` — UI de materiais por aula (espelho)
- [[../stories/backlog/2.4-cleanup-material-actions-duplicate]] — absorvida como FM-3.7

## Revisão

Esta ADR é o contrato para todas as stories da Epic FM (FM-3.2 a FM-3.7).
Mudança de escopo (ex.: aparecer requisito de "materiais do curso") requer
**ADR-003** que a substitua ou complemente.
