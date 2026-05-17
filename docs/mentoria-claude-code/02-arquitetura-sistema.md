---
title: Arquitetura do sistema academy — curso "Mentoria Claude Code"
type: architecture
agent: sites-architect (Zaelion)
created: 2026-05-17
updated: 2026-05-17
tags: [architecture, academy, mentoria-claude-code]
related:
  - "[[../../smart-memory/project/architecture]]"
  - "[[../../smart-memory/decisions/ADR-001-plataforma-cursos-stack]]"
  - "[[../../smart-memory/decisions/ADR-002-materiais-por-modulo-schema]]"
---

# Arquitetura do sistema academy — curso "Mentoria Claude Code"

> Documento de referência para popular o curso **"Mentoria Claude Code"** no Supabase. Mapeia o fluxo admin → aluno do sistema academy existente. **Não toca em código** — só descreve o estado atual.

---

## 1. Contexto e escopo

**Objetivo do time:** estruturar e popular o curso "Mentoria Claude Code" no Supabase, com eventuais adaptações pontuais do sistema academy.

**Fonte do conteúdo:** pasta `docs/mentoria-claude-code/Curso On-line/` no repo. Contém **10 módulos** (Módulo 0 a Módulo 9), cada um com:
- `manual-m{N}.pdf` — manual do módulo (material PDF para o aluno).
- `roteiro-modulo-{N}-*.md` — roteiro completo da aula (texto-fonte do conteúdo).
- `Módulo {N} | Escopo.rtf` — escopo do módulo (alguns módulos).
- `Aulas/` — pasta com vídeos `.mp4` + transcripts `.txt` por aula.

Conteúdo já disponível (com aulas): **M3, M4, M5, M6, M9 (2 bônus)**.
Conteúdo pendente (pasta vazia): **M0, M1, M2, M7, M8** — não fazem parte desta primeira leva.

**Convenção do JSON-fonte (decisão arquitetural):** o time produzirá um arquivo único `src/data/treinamento/curso.json` (ou equivalente) compatível com o schema das tabelas `courses` / `modules` / `lessons` / `module_materials`, gerado a partir da inspeção da pasta `docs/mentoria-claude-code/Curso On-line/`. Esse JSON alimenta o script de população.

> O nome `treinamento.json` em `src/data/treinamento/treinamento.json` refere-se ao **Centro de Treinamento dos Agentes** (slides de feature de marketing) — **não é a fonte deste curso**. Não confundir.

---

## 2. Fluxo admin → criar curso → módulos → aulas

### 2.1 Rotas envolvidas

```
/academy/admin/cursos                           → CourseListClient.tsx        (list + delete + toggle published)
/academy/admin/cursos/novo                      → NewCourseForm.tsx           (create)
/academy/admin/cursos/[courseId]                → CourseEditorClient.tsx      (edit course + módulos + aulas inline)
/academy/admin/cursos/[courseId]/modulos/[moduleId]  → ModuleEditorClient.tsx (edit módulo + materiais do módulo)
/academy/admin/cursos/[courseId]/aulas/[lessonId]    → LessonEditorClient.tsx (edit aula completa: vídeo, content, materiais)
```

### 2.2 Server actions (todas em `src/app/(academy)/academy/(admin)/admin/cursos/actions.ts`)

| Action | Tabela | Notas |
|---|---|---|
| `createCourse({ title, slug, description, cover_image_url })` | `courses` | published=false, sort_order=0 |
| `updateCourse(id, data)` | `courses` | revalidatePath cursos + cursos/[id] |
| `toggleCoursePublished(id, published)` | `courses` | — |
| `deleteCourse(id)` | `courses` | soft delete (`deleted_at`) |
| `createModule({ course_id, title, slug, description })` | `modules` | `sort_order` autoincremental no módulo |
| `updateModule(id, courseId, data)` | `modules` | revalida courseId |
| `deleteModule(id, courseId)` | `modules` | soft delete |
| `reorderModules(courseId, orderedIds)` | `modules` | Promise.all de updates |
| `createLesson({ module_id, title, slug, kind, courseId })` | `lessons` | `kind` ∈ `VIDEO \| LIVE \| IN_PERSON \| CODE \| READING` |
| `updateLesson(id, courseId, data)` | `lessons` | suporta vídeo + content + summary + transcript (3 campos textuais) |
| `deleteLesson(id, courseId)` | `lessons` | soft delete |
| `reorderLessons(moduleId, courseId, orderedIds)` | `lessons` | Promise.all |
| `uploadMaterial(lessonId, courseId, formData)` | `materials` | upload no bucket `materials/lessons/{lessonId}/{uuid}.{ext}` |
| `deleteMaterial(materialId, storagePath, courseId, lessonId)` | `materials` | hard delete (cleanup storage) |
| `uploadModuleMaterial(moduleId, courseId, formData)` | `module_materials` | bucket `materials/modules/{moduleId}/{uuid}.{ext}` |
| `deleteModuleMaterial(materialId, storagePath, courseId, moduleId)` | `module_materials` | tolerância a arquivo ausente |
| `addLinkModuleMaterial(moduleId, courseId, title, externalUrl)` | `module_materials` | kind=LINK, valida `new URL()` |

Todas as actions chamam `requireAdmin()` (RBAC via `auth.helpers.ts`).

### 2.3 Schema relevante das tabelas

**`courses`** — `id, slug (UNIQUE), title, description, cover_image_url, published, sort_order, deleted_at`.

**`modules`** — `id, course_id (FK), slug, title, description, cover_image_url, sort_order, deleted_at`.

**`lessons`** — `id, module_id (FK), slug, title, kind, sort_order, deleted_at` +
- **Vídeo:** `video_id, video_provider, duration_seconds`
- **Conteúdo principal:** `content, content_format` (`MDX | HTML | MARKDOWN`)
- **Resumo (aulas v2):** `summary, summary_format`
- **Transcript (aulas v2):** `transcript, transcript_format`
- **Compatibilidade legado:** `description` (fallback markdown quando `content` é null)

**`materials`** — `id, lesson_id (FK), kind, title, storage_path, external_url, size_bytes, sort_order`.

**`module_materials`** — `id, module_id (FK), kind, title, storage_path, external_url, size_bytes, sort_order`.

`kind` ∈ `PDF | IMAGE | ZIP | LINK | OTHER` (resolvido por `lib/materials/storage.ts:getMaterialKind`).

### 2.4 Storage convention

```
materials/                       ← bucket privado (signed URLs)
├── lessons/{lesson_id}/{uuid}.{ext}
└── modules/{module_id}/{uuid}.{ext}
```

Helper canônico: `src/lib/materials/storage.ts` (`buildMaterialPath`, `extractExt`, `getMaterialKind`).

### 2.5 Cohort wiring (acesso)

Curso por si só não dá acesso — acesso vem de **cohort_courses**:
- Uma `cohort` (turma) lista quais `courses` libera (`cohort_courses`).
- `cohort_courses.included_module_ids` (array de UUIDs) controla **quais módulos** da cohort estão liberados (parcial é possível).
- `cohort_members` matricula alunos com `status = ACTIVE`.
- Função `has_access(p_user_id, p_lesson_id) RETURNS boolean` resolve isso server-side. Admin tem override (`has_access_admin_override`).

**Implicação para "Mentoria Claude Code":**
1. Criar o `course` com slug `mentoria-claude-code`.
2. Decidir: criar nova `cohort` específica? OU reaproveitar `curso-online-padrao` (slug `40000000-…-0002`) adicionando o course ao `cohort_courses`? Decisão fora do escopo desta arquitetura — fica para a story MC-1.2.

---

## 3. Fluxo aluno → acessar curso → ver aula → materiais/vimeo

### 3.1 Rotas envolvidas

```
/academy/curso/[slug]                                    → curso/[slug]/page.tsx          (índice de módulos + aulas)
/academy/curso/[slug]/aula/[lesson-slug]                 → aula/[lesson-slug]/page.tsx    (player + content + abas)
```

### 3.2 Resolução de acesso

A página `aula/[lesson-slug]/page.tsx` faz:

1. `requireUser()` — força login (middleware redirect).
2. Fetch `lessons` join `modules!inner.courses!inner` por `slug` + `lesson-slug`. `notFound()` se não existir.
3. `supabase.rpc('has_access', { p_user_id, p_lesson_id })` — gate de segurança server-side. `video_id` só vaza para o cliente quando `hasAccess === true`.
4. Resolve módulos acessíveis via `cohort_members(ACTIVE)` → `cohort_courses(included_module_ids)`. Filtra navegação prev/next pelo `accessibleModuleIds`.
5. Sem acesso → renderiza `<LockedContent>` com CTA para a `cohort` que libera a aula.

### 3.3 Renderização de conteúdo

`renderContent(format, content)` em `src/lib/content/index.ts` decide:

- **`MDX`** → `serializeMDX()` (server) → render no cliente.
- **`HTML`** → `sanitizeHtml()` (DOMPurify server-side).
- **`MARKDOWN`** → passa raw, cliente renderiza com `react-markdown` + `CodeBlock`.

Fallback: se `content` for null, usa `description` como `MARKDOWN`.

### 3.4 Abas do aluno (`LessonTabs.tsx`, Epic AV-3.4)

5 abas em linha — abas sem conteúdo somem:

1. **Sobre** — renderiza `content` (ou fallback `description`).
2. **Resumo** — renderiza `summary` (ex.: bullets curtos).
3. **Transcrição** — renderiza `transcript`.
4. **Materiais** — `MaterialsList` (`materials` da aula, signed URLs, `target="_blank"`).
5. **Comentários** — `CommentsSection` (com `useOptimistic`, server actions em `progress.ts`).

### 3.5 Video, progresso, reactions

- `VideoPlayer.tsx` (Vimeo SDK + provider Vimeo) — emite `timeupdate` → `saveProgress(lessonId, seconds_watched)`.
- 95% watched → trigger `markComplete(lessonId)` (cria `lesson_progress { completed: true }`).
- `LessonReactions` (Epic AV-3.5) — like/dislike via `setReaction` server action.
- `MarkCompleteButton` — fallback manual quando `kind != VIDEO`.

### 3.6 Materiais (aula + módulo)

- **Aula:** `materials.lesson_id` → renderiza dentro da aba "Materiais" da aula.
- **Módulo:** `module_materials.module_id` → renderiza na **página do curso** (`/academy/curso/[slug]`), sob cada módulo, com signed URL gerada server-side (RLS-gated, bucket privado).

---

## 4. Componentes principais envolvidos

### Admin
| Componente | Rota | Função |
|---|---|---|
| `CourseListClient.tsx` | `/admin/cursos` | listagem + delete + toggle published |
| `NewCourseForm.tsx` | `/admin/cursos/novo` | form de criação |
| `CourseEditorClient.tsx` | `/admin/cursos/[id]` | edit course; CRUD inline de módulos e aulas com drag-and-drop (`@dnd-kit`) |
| `ModuleEditorClient.tsx` | `/admin/cursos/[id]/modulos/[mId]` | edit módulo + materiais do módulo |
| `LessonEditorClient.tsx` | `/admin/cursos/[id]/aulas/[lId]` | edit aula (vídeo, content/summary/transcript, materiais) |
| `ContentFieldSection.tsx` | dentro do LessonEditor | toggle Editar/Visualizar (3 campos textuais — Epic AV-3.3) |
| `preview-actions.ts` | colocado por aula | `previewContentAction` — server preview de MDX/HTML/MARKDOWN |

### Student
| Componente | Função |
|---|---|
| `curso/[slug]/page.tsx` | índice do curso — módulos + aulas + materiais de módulo (signed URLs) |
| `aula/[lesson-slug]/page.tsx` | página da aula (server) — fetch + has_access + renderContent |
| `LessonTabs.tsx` | 5 abas (Sobre, Resumo, Transcrição, Materiais, Comentários) |
| `CourseSidebar.tsx` + `MobileLessonDrawer` | sidebar com progresso por módulo (completedCount/totalCount) |
| `VideoPlayer.tsx` | Vimeo SDK + saveProgress |
| `MarkCompleteButton.tsx` | trigger manual de markComplete |
| `LessonReactions.tsx` | like/dislike |
| `LockedContent.tsx` | CTA para cohort quando `!hasAccess` |
| `MaterialsList.tsx` | lista materiais (PDF/IMAGE/ZIP/LINK), todos com `target="_blank"` |
| `CommentsSection.tsx` | comentários com `useOptimistic` |

### Server-only
| Lib | Função |
|---|---|
| `src/lib/content/index.ts` | pipeline `renderContent(format, content)` |
| `src/lib/content/mdx.ts` | `serializeMDX` (next-mdx-remote/serialize) |
| `src/lib/content/html.ts` | `sanitizeHtml` (DOMPurify) |
| `src/lib/content/markdown.ts` | `highlightCode` |
| `src/lib/materials/storage.ts` | helpers de path + kind (canônico, compartilhado por actions) |
| `src/lib/auth/helpers.ts` | `requireUser`, `requireAdmin` |
| `src/lib/supabase/server.ts` | client RLS-aware |
| `src/lib/supabase/admin.ts` | service-role (bypassa RLS — uso restrito) |

---

## 5. Diagrama de dependências

```
                         ┌─────────────────────────┐
                         │  docs/mentoria-claude-  │
                         │  code/Curso On-line/    │ (fonte: pastas + roteiros + manuais + vídeos Vimeo)
                         └────────────┬────────────┘
                                      │ (mapeamento manual)
                                      ▼
                         ┌─────────────────────────┐
                         │  src/data/treinamento/  │
                         │  curso.json (a criar)   │ (JSON estruturado: course + modules + lessons + materials)
                         └────────────┬────────────┘
                                      │
                                      ▼ (script de população — scripts/seed-mentoria-claude-code.mjs)
                         ┌─────────────────────────┐
                         │  Supabase migration ou  │
                         │  script idempotente     │
                         └────────────┬────────────┘
                                      │
                ┌─────────────────────┼─────────────────────────┐
                ▼                     ▼                         ▼
         ┌──────────┐          ┌──────────┐              ┌────────────────┐
         │ courses  │◄─────────│ modules  │◄─────────────│    lessons     │
         │ (1 row)  │          │ (10 rows)│              │  (N rows com   │
         └────┬─────┘          └────┬─────┘              │   video_id +   │
              │                     │                    │   content)     │
              ▼                     ▼                    └────┬───────────┘
       ┌──────────────┐      ┌─────────────────┐              │
       │cohort_courses│      │module_materials │              ▼
       │  (acesso)    │      │ (manuais PDF +  │      ┌───────────────┐
       └──────┬───────┘      │  links Vimeo?)  │      │   materials   │
              │              └─────────────────┘      │ (transcripts? │
              ▼                                       │  fallback?)   │
       ┌──────────────┐                               └───────────────┘
       │   cohorts    │ (curso-online-padrao OU nova cohort)
       │              │
       └──────┬───────┘
              ▼
       ┌──────────────┐    has_access(user, lesson)
       │cohort_members│◄──────────────────────────────┐
       │ (ACTIVE)     │                               │
       └──────┬───────┘                               │
              │                                       │
              │  requireUser()                        │ RPC
              ▼                                       │
       ┌──────────────────────────────────────────────┴───┐
       │   /academy/curso/[slug]/aula/[lesson-slug]       │
       │                                                  │
       │   VideoPlayer (Vimeo SDK) ─► saveProgress         │
       │   LessonTabs ─► renderContent(MDX/HTML/MD)       │
       │   LessonReactions ─► setReaction                  │
       └──────────────────────────────────────────────────┘
```

---

## 6. Decisões abertas (para discutir na MC-1.1)

1. **JSON-fonte** mora em `src/data/treinamento/curso-mentoria-claude-code.json` ou `docs/mentoria-claude-code/curso.json`? Recomendação: `docs/` (não é runtime — é input de seed).
2. **Cohort:** criar `mentoria-presencial` nova OU adicionar `mentoria-claude-code` ao `cohort_courses` da `curso-online-padrao`? Decisão de MC-1.2.
3. **Roteiros .md como `content`?** Os roteiros em `docs/mentoria-claude-code/Curso On-line/Módulo X/roteiro-*.md` podem virar `content_format = MARKDOWN`. Alternativa: usar transcripts `.txt` por aula como `transcript` e deixar `content` curto/manual. Decisão de MC-1.1 (mapeamento).
4. **Vídeos Vimeo:** os `.mp4` em `Aulas/` são fontes locais. Os `video_id` precisam vir de uploads reais para o Vimeo (não fazem parte do JSON-fonte automaticamente). Story MC-1.3 trata da injeção dos IDs.
5. **Módulos M0/M1/M2/M7/M8:** sem aulas hoje. Popular como módulo vazio (placeholder) OU pular? Recomendação: popular **somente os 5 módulos com conteúdo** (M3, M4, M5, M6, M9-bonus-tarefas, M9-bonus-comercial) na primeira leva.

---

## 7. Backwards-compatibility e não-objetivos

**IN:** popular conteúdo do curso "Mentoria Claude Code" via JSON-fonte + script idempotente.

**OUT:**
- Mudanças no schema do academy (a menos que MC-2.1 demonstre necessidade).
- Mudanças nos componentes admin ou student do academy.
- Reescrita do pipeline `lib/content/`.
- Geração automática de roteiro/conteúdo via IA.
- Upload de vídeos para o Vimeo (manual via admin).

**Restrição operacional:** nenhuma migration ou push para `main` sem aprovação explícita do João — política do projeto (ver `shared-context.md`).
