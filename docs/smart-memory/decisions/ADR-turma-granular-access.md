---
title: "ADR-003: Controle de acesso granular em turmas — aulas específicas por módulo"
type: adr
status: proposed
date: 2026-05-25
updated: 2026-05-25
author: sites-architect (Zaelion)
reviewed_by: sites-qa (Axilun)
tags: [adr, cohorts, access-control, lessons, schema, rls, supabase]
related:
  - "[[ADR-001-plataforma-cursos-stack]]"
  - "[[ADR-002-materiais-por-modulo-schema]]"
  - "[[../project/architecture]]"
  - "[[../stories/backlog/TGA-1.1-migration-included-lesson-ids]]"
  - "[[../stories/backlog/TGA-1.2-admin-ui-lesson-selector]]"
  - "[[../stories/backlog/TGA-1.3-student-enforcement-included-lesson-ids]]"
  - "[[../stories/backlog/TGA-1.4-qa-gate-granular-access]]"
---

# ADR-003: Controle de acesso granular em turmas — aulas específicas por módulo

## Status

**Proposed** — 2026-05-25. Aguarda aprovação do PO antes de promover stories de TGA-1.x para `active`.

## Contexto

Hoje o gating de acesso de uma turma a um curso usa **dois níveis**:

1. **`cohort_courses.course_id`** — vincula a turma a um curso.
2. **`cohort_courses.included_module_ids: uuid[] NOT NULL DEFAULT '{}'`** — restringe módulos. Lista vazia (`cardinality=0`) = todos os módulos do curso. Lista não-vazia = apenas os módulos listados.

A função `has_access(user_id, lesson_id)` em
`supabase/migrations/20260510030000_has_access_admin_override.sql:11-50` consulta o `lesson.module_id` e verifica se ele está em `included_module_ids` (ou se a lista está vazia → acesso total ao curso).

O CohortForm
(`src/app/(academy)/academy/(admin)/admin/turmas/CohortForm.tsx:764-913`)
já tem a seção "Cursos Liberados" com seleção checkbox de cursos + módulos.

Surge novo requisito de negócio: **vender subconjuntos do curso como turmas-produto**. Exemplos do PO:

- "Turma só Módulo 1" — usa `included_module_ids = [mod1.id]` (já funciona).
- "Turma Módulo 2 + aulas 1–3 do Módulo 3" — **não modelável hoje**. A granularidade máxima é o módulo.

Para suportar isso é preciso uma terceira dimensão de restrição: **aulas específicas dentro de um módulo**.

### Constraints conhecidos

- Banco de prod tem dados reais. Migrations destrutivas (drop NOT NULL, drop column) são proibidas sem janela formal.
- RLS é o **risco crítico documentado no ADR-001**. Função `has_access` é o coração da autorização — qualquer mudança nela requer regressão completa.
- 5 caminhos no código de aluno consomem `included_module_ids` hoje (dashboard, /meus-cursos, /curso/[slug], /curso/[slug]/aula/[lesson-slug] via RPC, /turmas/[slug]). Defesa em profundidade.
- A função `has_module_access(user_id, module_id)` (ADR-002, materiais de módulo) **também** consulta `cohort_courses.included_module_ids`. Não interage com `lesson_id`, mas precisa permanecer correta após a mudança.
- O CohortForm já tem o padrão visual "Curso > Módulo" (linhas 764-913). Adicionar "Módulo > Aula" como terceiro nível é uma evolução natural da UI.
- **Inconsistência atual entre student pages (concern formal Axilun, sites-qa):** `curso/[slug]/page.tsx:159-165` já expande `included_module_ids = []` para "todos os módulos do curso" explicitamente (`isFullAccess ? allCourseModuleIds : (r.included_module_ids ?? [])`). Já `aula/[lesson-slug]/page.tsx:119-129` usa um padrão diferente que funciona por acidente: monta `accessibleModuleIds = new Set(flatMap(included_module_ids))` e usa o guard `accessibleModuleIds.size > 0 && !accessibleModuleIds.has(m.id)` — quando a lista é `[]` o set fica vazio, o guard inverte e todos os módulos passam. **Comportamento correto, código frágil**: se alguém remover o `size > 0 &&` do guard, todos os alunos com acesso total perdem navegação. A Epic TGA é a oportunidade de nivelar isso: TGA-1.3 deve substituir o padrão acidental pela expansão explícita do helper compartilhado.

### Semântica desejada

A regra de acesso a uma aula deve respeitar **3 níveis hierárquicos**, do mais permissivo ao mais restritivo:

| Nível | Configuração | Significado |
|---|---|---|
| 1. Curso | `cohort_courses` existe | Aluno tem acesso ao curso (sujeito aos níveis 2 e 3) |
| 2. Módulo | `included_module_ids = []` ou contém `lesson.module_id` | Módulo da aula está liberado |
| 3. Aula | `included_lesson_ids = []` ou contém `lesson.id` | Aula específica está liberada |

**Default semântico: lista vazia = liberar tudo.** Backwards-compatible com cohorts existentes (que terão `included_lesson_ids = []` na coluna nova).

A regra de acesso final fica:

> Aluno tem acesso à aula se: pertence a uma cohort ACTIVE não-expirada com `cohort_courses` para o curso da aula, **E** o módulo da aula está em `included_module_ids` (ou a lista está vazia), **E** a aula está em `included_lesson_ids` (ou a lista está vazia).

### Tabela verdade semântica (autoritativa)

Confirmação explícita do lead — esta tabela trava a interpretação e é a referência canônica para implementação, QA e documentação operacional:

| `included_module_ids` | `included_lesson_ids` | Significado | Aulas acessíveis |
|---|---|---|---|
| `[]` (vazio) | `[]` (vazio) | **Acesso total ao curso** (legacy) | Todas as aulas de todos os módulos |
| `[]` (vazio) | `[uuid…]` | **Acesso total ao curso — `included_lesson_ids` NÃO se aplica** | Todas as aulas de todos os módulos (o campo de aulas é ignorado nesse cenário) |
| `[modA, modB]` | `[]` (vazio) | Acesso restrito a módulos, sem restrição de aula | Todas as aulas de modA + todas as aulas de modB |
| `[modA, modB]` | `[lessonA1, lessonA2]` | Acesso restrito a módulos + restrição adicional de aula | Apenas as aulas listadas que pertencem aos módulos listados |
| `[modA]` | `[lessonB1]` (aula de mod NÃO incluído) | Estado inconsistente — módulo bloqueia primeiro | **Nenhuma aula acessível** (Variant L-only do QA gate TGA-1.4 AC4) |

**Invariantes derivadas:**

1. **Módulo é o primeiro gate.** Se o módulo da aula NÃO está em `included_module_ids` (e a lista não está vazia), a aula é inacessível independente de `included_lesson_ids`.
2. **`included_lesson_ids` só faz sentido quando `included_module_ids` tem conteúdo.** Se `included_module_ids = []` (acesso total), `included_lesson_ids` é ignorado pelo enforcement — coerente com "lista vazia em qualquer nível = sem restrição neste nível". Mesmo que o admin grave UUIDs em `included_lesson_ids` por erro com `included_module_ids = []`, a função `has_access` **não filtra por aula** nesse cenário (a cláusula `OR cardinality=0` da branch de módulo já passou e o aluno tem acesso total).
3. **Default vazio em ambos os campos = comportamento atual preservado** para 100% das cohorts existentes após apply da migration.

**Consequência operacional na UI (TGA-1.2):** quando o admin marca um curso sem expandir nenhum módulo (estado "curso liberado, sem restrição"), `included_module_ids` e `included_lesson_ids` são ambos `[]`. A UI **não deve** permitir editar `included_lesson_ids` quando `included_module_ids = []` — é estado semanticamente sem efeito; AC explícito na TGA-1.2.

## Opções consideradas

### Opção A — Adicionar `included_lesson_ids: uuid[]` em `cohort_courses` (RECOMENDADA)

```sql
alter table public.cohort_courses
  add column included_lesson_ids uuid[] not null default '{}';
```

Estende a tupla `(cohort, course)` com mais um filtro. Mesmo padrão semântico de `included_module_ids`: lista vazia = "sem restrição neste nível".

A função `has_access` ganha um terceiro check:

```sql
and (
  cardinality(cc.included_lesson_ids) = 0
  or li.lesson_id = any(cc.included_lesson_ids)
)
```

Onde `li.lesson_id` vem do CTE `lesson_info` (que já existe na função).

A UI do admin expande a hierarquia atual `Curso → Módulo` para `Curso → Módulo → Aula` no mesmo componente (3º nível de tree-select).

**Prós:**
- **Extensão natural do padrão existente**: `included_module_ids` já funciona assim; replicar com `included_lesson_ids` é cognitivamente trivial. Code review e onboarding ficam diretos.
- **Migration aditiva pura**: `ADD COLUMN ... NOT NULL DEFAULT '{}'`. Zero risco para dados existentes; cohorts atuais ficam com lista vazia (= comportamento atual preservado).
- **RLS minimamente invasivo**: a função `has_access` ganha **1 cláusula `AND`** na branch que já existe — sem reescrita estrutural, sem novas funções, sem novas policies. O caminho de auditoria é o mesmo do ADR-001.
- **`has_module_access` não muda**: materiais de módulo (ADR-002) continuam funcionando exatamente como hoje. Granularidade aula não se aplica a materiais de módulo — coerente: material de módulo é "do módulo inteiro", não "da aula X".
- **UI cresce em paralelo, não em ramificação**: o componente atual já é uma árvore `Curso > [checkbox de módulos]`. Adicionar `Módulo > [checkbox de aulas]` é um terceiro nível dentro da mesma estrutura.
- **Server action simétrica**: `cohortCourseSchema` ganha `includedLessonIds: uuid[]`, simétrica a `includedModuleIds`.
- **Defesa em profundidade preservada**: os 5 caminhos do aluno que filtram por `included_module_ids` ganham um filtro paralelo por `included_lesson_ids`. Cada caminho continua sendo um "early gate" em camada de aplicação (além do RLS).

**Contras:**
- A coluna `included_lesson_ids` semanticamente só faz sentido se interseccionar com `included_module_ids` (ou se ambas estão vazias). Validar essa coerência fica como **responsabilidade da UI** (não pode liberar aulas de módulos não-liberados) e como **invariante implícita do `has_access`** (que faz `AND` das duas listas — uma aula só passa se o módulo passar).
- Crescimento de payload de UI: o tree-select fica mais profundo. Mitigação: lazy-expand de aulas só ao expandir o módulo (padrão já adotado para módulos hoje).
- Sem semântica de "incluir todas as aulas exceto X" (lista de exclusão). Pode ser adicionado depois via coluna `excluded_lesson_ids` se o requisito surgir; **não pedido hoje**.

### Opção B — Nova tabela `cohort_lessons` normalizada

```sql
create table public.cohort_lessons (
  cohort_id  uuid not null references public.cohorts(id) on delete cascade,
  lesson_id  uuid not null references public.lessons(id) on delete cascade,
  primary key (cohort_id, lesson_id)
);
```

Linha = "lesson explicitamente liberada para a cohort". Ausência de linhas para um par cohort/lesson = aula não liberada.

A função `has_access` precisaria:

- Verificar se existe **algum** registro em `cohort_lessons` para a cohort (modo "lista explícita ativa").
- Se sim, exigir que `lesson_id` esteja na lista.
- Se não, cair no fallback antigo de módulo.

**Prós:**
- Modelagem mais "normalizada" (3FN), sem arrays Postgres.
- Permite metadados por aula no futuro (ex.: `granted_at`, `expires_at` por aula) sem refactor.
- Visão "todas aulas que esta cohort libera" é um simples `select` (sem `unnest`).

**Contras:**
- **Quebra o padrão arquitetural existente**. `included_module_ids: uuid[]` já é a convenção do projeto; introduzir `cohort_lessons` cria dois paradigmas conflitantes ("turmas restringem módulos via array, mas restringem aulas via tabela?"). Custo cognitivo permanente.
- **RLS dobra de tamanho**: nova tabela = novas policies (4 mínimo: select admin/membro, insert/update/delete admin). Vetor de ataque maior, mais coisa para auditar — contraria o risco crítico do ADR-001.
- **`has_access` precisa de uma reescrita estrutural**: branch novo "se há registros em cohort_lessons, modo explícito" muda a lógica da função. Migration de função crítica → regressão de todos os 5 caminhos do aluno.
- **Modo "todas aulas liberadas" exige sentinel**: a ausência de linhas na tabela tem que ser interpretada como "todas". É menos óbvio que `cardinality=0` em array.
- **Backwards-compatibility frágil**: cohorts existentes não têm linhas em `cohort_lessons`. A nova `has_access` precisa interpretar isso corretamente. Bug de interpretação = vazamento ou bloqueio massivo.
- **Maior superfície de bug em transações**: salvar uma cohort agora envolve 3 tabelas (`cohorts`, `cohort_courses`, `cohort_lessons`) em vez de 2. `saveCohortCourses` em `actions.ts:62-77` precisa coordenar deletes + inserts em duas tabelas.
- **UI ganha pouco**: o admin ainda precisa renderizar o mesmo tree-select. A normalização é um ganho de banco, não de UX.
- **JOIN extra em todas as queries do aluno**: dashboard, /meus-cursos, /curso/[slug], etc., ganham uma query a mais (ou um left join) para filtrar aulas. Performance N+1 mitigável, mas é trabalho extra.

### Opção C — Polimorfismo `cohort_content` (parent_kind: 'MODULE' | 'LESSON')

```sql
create table public.cohort_content (
  cohort_id    uuid not null,
  course_id    uuid not null,
  parent_kind  text not null check (parent_kind in ('MODULE', 'LESSON')),
  parent_id    uuid not null,
  primary key (cohort_id, course_id, parent_kind, parent_id)
);
```

**Rejeitada de plano.** Mesmos motivos da Opção C da ADR-002: perde integridade referencial (Postgres não suporta FK polimórfica), força branches em todas as policies, é anti-pattern reconhecido. Custo de complexidade insustentável.

## Decisão

**Opção A — adicionar `included_lesson_ids: uuid[] NOT NULL DEFAULT '{}'` em `cohort_courses`.**

Justificativa ranqueada por peso:

1. **Aderência ao padrão existente** (peso máximo): `included_module_ids` é o padrão arquitetural canônico para "lista de restrições por nível". Replicar para aulas mantém o sistema cognitivamente coerente.
2. **Risco RLS minimizado** (ADR-001 lista RLS como crítico): a função `has_access` ganha **uma única cláusula** dentro de uma branch existente. Mudança auditável em uma linha de revisão, sem nova função.
3. **Migration aditiva pura** sobre prod com dados reais. Zero downtime, zero backfill, zero risco de regressão em cohorts existentes — o default `'{}'` preserva o comportamento atual exatamente.
4. **Defesa em profundidade preservada nos 5 caminhos do aluno**: cada caminho que hoje filtra por `included_module_ids` adiciona um filtro paralelo por `included_lesson_ids`. Camada de aplicação continua sendo o segundo gate (além do RLS).
5. **UI cresce em paralelo, não em ramificação**: o tree-select atual `Curso > Módulo` aceita um terceiro nível `Módulo > Aula` sem reescrita.
6. **`has_module_access` (materiais de módulo) não muda**: a granularidade aula não se aplica a materiais de módulo. Semântica permanece "material do módulo inteiro" — coerente.

Trade-off aceito: **se** num horizonte futuro surgirem metadados por aula (expira em data X, libera em data Y) que justifiquem normalização, uma ADR-004 reabrirá a decisão e pode migrar para `cohort_lessons` com dados reais para guiar o redesign.

## Consequências

### Positivas

- RLS muda em **uma linha** dentro da função `has_access`. Auditoria minimalista.
- Migration aditiva, zero downtime, zero backfill.
- Cohorts atuais permanecem com `included_lesson_ids = '{}'` automaticamente (default) = comportamento idêntico ao de hoje.
- UI cresce no mesmo componente sem refactor.
- Server action `cohortCourseSchema` ganha um campo simétrico ao existente — diff trivial de revisar.
- Documentação operacional clara: "lista vazia = sem restrição neste nível" (mesma regra em 3 níveis).

### Negativas e mitigações

| Consequência | Mitigação |
|---|---|
| Validação de coerência (não liberar aula de módulo não-liberado) fica como responsabilidade da UI | AC explícito na story TGA-1.2: ao desmarcar um módulo, remover automaticamente todas as aulas daquele módulo de `included_lesson_ids`. AC adicional na TGA-1.3: aulas de módulos não-liberados são ignoradas no enforcement (defense in depth). |
| Tree-select fica com 3 níveis — risco de UX confusa | TGA-1.2: módulo expande para mostrar aulas com checkboxes; copy explícita "Deixar todas desmarcadas equivale a liberar todas as aulas do módulo" (espelhando o texto atual sobre módulos no `CohortForm.tsx:774-777`). |
| 5 caminhos no aluno precisam adicionar o filtro paralelo de `included_lesson_ids` | TGA-1.3 lista cada caminho explicitamente nos ACs com line ranges. QA gate (TGA-1.4) valida cada um end-to-end. |
| Função `has_access` é crítica — qualquer alteração tem risco | TGA-1.1 inclui migration nova com `create or replace function`, mantendo a assinatura. TGA-1.4 (QA) é gate adversarial obrigatório: testa aluno com aula liberada, aula bloqueada por módulo, aula bloqueada por aula, módulo+aula vazios (legacy), admin override. |
| Possível confusão "aula em `included_lesson_ids` mas módulo bloqueado" | Documentado como invariante: aula só passa se módulo também passar. UI impede configurar esse estado; função RLS faz `AND` das duas listas, então mesmo que estado inconsistente exista no banco, o aluno não passa. |
| `has_module_access` não usa `included_lesson_ids` — materiais de módulo seguem por módulo | Semântica intencional documentada na ADR: "material de módulo = do módulo inteiro". Se requisito futuro pedir material por aula, já existe `materials` ligado a `lessons`. |

### RPC `has_access` é o gate primário — atualização obrigatória na mesma migration

Concern formal Axilun (sites-qa) capturado aqui: a função `has_access(p_user_id, p_lesson_id)` em `supabase/migrations/20260510030000_has_access_admin_override.sql:11-50` **é o único gate que protege acesso direto por URL**. A rota `/curso/[slug]/aula/[lesson-slug]` chama `supabase.rpc('has_access', …)` em `page.tsx:99-102` e retorna `<LockedContent />` se `false`, sem vazar `video_id` no DOM.

**Implicação crítica:** se a migration TGA-1.1 adicionar `included_lesson_ids` na tabela **sem** atualizar a função `has_access`, qualquer aluno com a URL direta da aula **bypassa** a restrição — o RPC continua autorizando baseado só em `included_module_ids`, sem consultar a coluna nova. Esse é exatamente o vetor de ataque que ADR-001 lista como risco RLS crítico.

**Por isso a migration TGA-1.1 contém dois statements DDL no mesmo arquivo, na ordem:**

1. `alter table public.cohort_courses add column included_lesson_ids uuid[] not null default '{}';`
2. `create or replace function public.has_access(...) ...` (com a nova cláusula `AND ( cardinality(cc.included_lesson_ids) = 0 OR li.lesson_id = ANY(cc.included_lesson_ids) )`).

A migration deve falhar atomicamente se o passo 2 não for incluído. **Não dividir em duas migrations.** Sem o passo 2, o passo 1 cria janela de inconsistência (coluna existe, função ignora). AC dedicado na TGA-1.1 para travar isso.

### Definição operacional da função RLS atualizada

```sql
create or replace function public.has_access(p_user_id uuid, p_lesson_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select
    -- AC4 ADR-001: role override (admin/mentor) permanece
    exists (
      select 1 from public.profiles
      where id = p_user_id
        and role in ('ADMIN', 'MENTOR')
    )
    or
    exists (
      with lesson_info as (
        select l.id as lesson_id, l.module_id, m.course_id
        from public.lessons l
        join public.modules m on m.id = l.module_id
        where l.id = p_lesson_id
          and l.deleted_at is null
      )
      select 1
      from public.cohort_members cm
      join public.cohort_courses cc on cc.cohort_id = cm.cohort_id
      join lesson_info li on li.course_id = cc.course_id
      where cm.user_id = p_user_id
        and cm.status = 'ACTIVE'
        and (cm.expires_at is null or cm.expires_at > now())
        and (
          cardinality(cc.included_module_ids) = 0
          or li.module_id = any(cc.included_module_ids)
        )
        and (
          -- NOVO: terceiro nível de restrição
          cardinality(cc.included_lesson_ids) = 0
          or li.lesson_id = any(cc.included_lesson_ids)
        )
    );
$$;
```

Diff funcional: `lesson_info` ganha `l.id as lesson_id`, e a função ganha 4 linhas (`and ( cardinality=0 or any )`). Estrutura idêntica à branch de módulo, posicionada **depois** dela — invariante "módulo bloqueia primeiro" preservado em ordem de avaliação curto-circuito.

### Esquema atualizado de `cohort_courses`

```sql
-- Esquema final (após migration TGA-1.1)
public.cohort_courses (
  cohort_id            uuid not null references public.cohorts(id) on delete cascade,
  course_id            uuid not null references public.courses(id) on delete cascade,
  included_module_ids  uuid[] not null default '{}',  -- vazio = todos os módulos
  included_lesson_ids  uuid[] not null default '{}',  -- vazio = todas as aulas (dentro dos módulos liberados)
  sort_order           int not null default 0,
  primary key (cohort_id, course_id)
)
```

## Impacto nas stories

A Epic TGA (Turma Granular Access) é quebrada em 4 stories:

- **TGA-1.1** Migration `included_lesson_ids` + atualização de `has_access` + regerar types TS (sites-data).
- **TGA-1.2** Admin UI — expandir tree-select em `CohortForm.tsx` para 3 níveis `Curso > Módulo > Aula` (sites-dev-alpha + sites-dev-beta).
- **TGA-1.3** Student enforcement — propagar filtro `included_lesson_ids` nos 5 caminhos do aluno (sites-dev-alpha).
- **TGA-1.4** QA gate adversarial — RLS, admin escape, legacy data, granularidade, regressão dos caminhos student existentes (sites-qa).

**Sequência:** TGA-1.1 bloqueia TGA-1.2 e TGA-1.3 (sem coluna + tipos, TypeScript impede o build). TGA-1.2 e TGA-1.3 podem rodar em paralelo após TGA-1.1. TGA-1.4 é último, end-to-end.

## Não-objetivos desta ADR

- Listas de exclusão (`excluded_lesson_ids`). Não pedido hoje.
- Drip por aula (data de liberação por aula). Use `lessons.is_available` ou flag futura.
- Drag-and-drop para reorganizar aulas no seletor.
- Audit log de quem mudou o que em `included_lesson_ids`.
- Sincronização Stripe por aula (preço por subconjunto). A turma como produto continua sendo a unidade comercial — granularidade interna é decisão do admin.
- Migrar `included_module_ids` para `cohort_lessons` normalizado. ADR-004 reabriria se houver justificativa.
- Materiais por aula respeitando `included_lesson_ids` — materiais de aula já são gated por `has_access(user, lesson_id)` que **já** vai consultar o terceiro nível após esta ADR. Coerente, sem trabalho extra.

## Referências

- [[ADR-001-plataforma-cursos-stack]] — D1/D6: cohort como unidade central; materiais herdam acesso via lesson
- [[ADR-002-materiais-por-modulo-schema]] — `has_module_access` (não muda com esta ADR)
- `supabase/migrations/20260506021851_schema_cohorts.sql:56-67` — schema atual de `cohort_courses`
- `supabase/migrations/20260510030000_has_access_admin_override.sql:11-50` — função `has_access` atual
- `src/app/(academy)/academy/(admin)/admin/turmas/CohortForm.tsx:764-913` — seção "Cursos Liberados" (espelho para 3º nível)
- `src/app/(academy)/academy/(admin)/admin/turmas/actions.ts:18-22,62-77` — `cohortCourseSchema` e `saveCohortCourses`
- `src/app/(academy)/academy/(student)/dashboard/page.tsx:42-79` — caminho 1 do aluno
- `src/app/(academy)/academy/(student)/meus-cursos/page.tsx:27-72` — caminho 2 do aluno
- `src/app/(academy)/academy/(student)/curso/[slug]/page.tsx:120-180` — caminho 3 do aluno
- `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx:98-100` — caminho 4 (RPC `has_access`)
- `src/app/(academy)/academy/turmas/[slug]/page.tsx` — caminho 5 (LP pública da turma)

## Revisão

Esta ADR é o contrato para todas as stories da Epic TGA (TGA-1.1 a TGA-1.4). Mudança de escopo (ex.: surgir requisito de listas de exclusão ou drip por aula) requer **ADR-004** que a substitua ou complemente.
