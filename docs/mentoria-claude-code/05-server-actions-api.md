# Server Actions e API — Gestão do Curso Mentoria Claude Code

## Actions existentes para gestão de cursos

Arquivo canônico: `src/app/(academy)/academy/(admin)/admin/cursos/actions.ts`

### Courses
| Action | Assinatura | Notas |
|---|---|---|
| `createCourse` | `(data: { title, slug, description, cover_image_url })` | Cria com `published: false`, `sort_order: 0` |
| `updateCourse` | `(id, data: CourseUpdate)` | Aceita qualquer campo da tabela |
| `toggleCoursePublished` | `(id, published: boolean)` | Atalho para publicar/despublicar |
| `deleteCourse` | `(id)` | Soft delete — seta `deleted_at` |

### Modules
| Action | Assinatura | Notas |
|---|---|---|
| `createModule` | `(data: { course_id, title, slug, description })` | Auto-incrementa `sort_order` |
| `updateModule` | `(id, courseId, data: ModuleUpdate)` | |
| `deleteModule` | `(id, courseId)` | Soft delete |
| `reorderModules` | `(courseId, orderedIds: string[])` | Array de IDs na nova ordem |

### Lessons
| Action | Assinatura | Notas |
|---|---|---|
| `createLesson` | `(data: { module_id, title, slug, kind, courseId })` | Auto-incrementa `sort_order` |
| `updateLesson` | `(id, courseId, data: LessonUpdate)` | Aceita todos os campos da tabela `lessons` |
| `deleteLesson` | `(id, courseId)` | Soft delete |
| `reorderLessons` | `(moduleId, courseId, orderedIds: string[])` | |

### Materials (por aula)
| Action | Assinatura | Notas |
|---|---|---|
| `uploadMaterial` | `(lessonId, courseId, formData: FormData)` | Upload para storage bucket `materials`, path: `lessons/{lessonId}/{uuid}.ext` |
| `deleteMaterial` | `(materialId, storagePath, courseId, lessonId?)` | Remove storage + row |

### Module Materials (por módulo)
| Action | Assinatura | Notas |
|---|---|---|
| `uploadModuleMaterial` | `(moduleId, courseId, formData: FormData)` | Path: `modules/{moduleId}/{uuid}.ext` |
| `deleteModuleMaterial` | `(materialId, storagePath, courseId, moduleId?)` | Guard se path vazio |
| `addLinkModuleMaterial` | `(moduleId, courseId, title, externalUrl)` | Sem upload — insere `kind: 'LINK'` |

---

## Fluxo de criação de aula com conteúdo (content, summary, transcript)

O schema da tabela `lessons` tem os seguintes campos de conteúdo:

```
content          text | null   — corpo principal da aula (MDX/HTML/MARKDOWN)
content_format   text | null   — 'MDX' | 'HTML' | 'MARKDOWN'
summary          text | null   — resumo da aula
summary_format   text | null   — 'MDX' | 'HTML' | 'MARKDOWN'
transcript       text | null   — transcrição do vídeo
transcript_format text | null  — 'MDX' | 'HTML' | 'MARKDOWN'
video_id         text | null   — ID do vídeo (ex: número Vimeo, ID YouTube)
video_provider   text | null   — 'VIMEO' | 'YOUTUBE' | 'CLOUDFLARE_STREAM'
duration_seconds int  | null   — duração em segundos
kind             text          — 'VIDEO' | 'LIVE' | 'IN_PERSON' | 'CODE' | 'READING'
```

Fluxo para popular uma aula via `updateLesson`:
```typescript
await updateLesson(lessonId, courseId, {
  video_provider: 'VIMEO',
  video_id: '123456789',
  duration_seconds: 2700,
  content: '## Sobre a Aula\n\nTexto descritivo...',
  content_format: 'MARKDOWN',
  summary: '## Resumo\n\n- Ponto 1\n- Ponto 2',
  summary_format: 'MARKDOWN',
  transcript: 'Texto completo da transcrição...',
  transcript_format: 'MARKDOWN',
})
```

O pipeline de renderização (`src/lib/content/index.ts`) suporta MDX (com serialize), HTML (sanitizado via `sanitize-html`) e MARKDOWN (passado raw para o cliente com `react-markdown`).

---

## Upload e gestão de materiais

**Storage bucket:** `materials` (Supabase Storage)

**Path builder** (`src/lib/materials/storage.ts`):
- Por aula: `lessons/{lessonId}/{uuid}.{ext}`
- Por módulo: `modules/{moduleId}/{uuid}.{ext}`

**Tipos suportados:** PDF, ZIP, IMAGE (mime-based), LINK (sem arquivo), OTHER

**Tabelas:**
- `materials` — materiais de aula (`lesson_id` FK)
- `module_materials` — materiais de módulo (`module_id` FK)

Para popular materiais via script direto no Supabase, o path precisa ser inserido na coluna `storage_path` e o arquivo precisa existir no bucket. Sem o arquivo real no storage, o link de download não funciona para PDF/ZIP/IMAGE.

---

## Gaps: o que falta para um population script funcionar

### 1. Não há action para criar aula com conteúdo em um único passo
`createLesson` só aceita `{ module_id, title, slug, kind }` — sem campos de conteúdo. É preciso chamar `createLesson` seguido de `updateLesson`. Alternativa: INSERT direto no Supabase via migration SQL.

### 2. Não há script de population em TypeScript
Nenhum `scripts/populate*.ts` ou `scripts/seed*.ts` existe. O único mecanismo de batch insert é via migration SQL (`supabase/migrations/20260506090000_seed_mentoria_curso.sql`), que já estruturou curso/módulos/aulas mas sem conteúdo (content, video_id, summary, transcript são NULL).

### 3. Não há action para bulk update de aulas
Cada aula precisa de uma chamada individual a `updateLesson`. Para 12 aulas, isso é viável mas manual.

### 4. `duration_seconds` não tem campo no LessonEditorClient
O editor admin não expõe `duration_seconds` para edição. Para popular duração das aulas, é necessário ou (a) edição direta no Supabase Table Editor ou (b) migration SQL.

### 5. Sem mecanismo de import de transcrição por arquivo
Não há upload de `.txt` ou `.srt` que popule o campo `transcript`. Todo conteúdo textual precisa ser inserido via editor ou SQL.

---

## Recomendações: como popular o curso

### Opção A — Admin UI (para vídeo_id, content, summary, transcript)

**Quando usar:** Aulas individuais, iteração incremental, nenhum acesso ao Supabase dashboard.

**Fluxo:**
1. Acesse `/academy/admin/cursos/10000000-0000-0000-0000-000000000001`
2. Para cada aula: clique na aula → editor completo com todos os campos
3. O `LessonEditorClient` já expõe: title, description, kind, video_provider, video_id, content (Sobre a Aula), summary (Resumo), transcript (Transcrição)
4. Salvar chama `updateLesson` que persiste todos os campos

**Limitação:** Um a um, sem batch.

### Opção B — Migration SQL no Supabase (recomendada para batch inicial)

**Quando usar:** Popular 12+ aulas de uma vez com video_id, content, summary, transcript conhecidos.

**Fluxo:**
1. Criar arquivo em `supabase/migrations/YYYYMMDDHHMMSS_populate_lesson_content.sql`
2. Usar `UPDATE public.lessons SET video_id = '...', video_provider = 'VIMEO', ... WHERE id = '...'`
3. Aplicar via `supabase db push` ou no SQL Editor do Supabase dashboard

Os IDs das aulas já estão fixos na migration de seed:
- `30000000-0000-0000-0000-000000000001` até `30000000-0000-0000-0000-000000000012`

**Exemplo de migration para popular uma aula:**
```sql
UPDATE public.lessons
SET
  video_provider = 'VIMEO',
  video_id = 'SEU_ID_VIMEO',
  duration_seconds = 3600,
  content = '## Sobre a Aula\n\nConteúdo descritivo aqui.',
  content_format = 'MARKDOWN',
  summary = '## Resumo\n\n- Ponto chave 1\n- Ponto chave 2',
  summary_format = 'MARKDOWN'
WHERE id = '30000000-0000-0000-0000-000000000001';
```

### Opção C — Script Node.js com supabase-js (para automação futura)

Se o conteúdo vier de arquivos locais (ex: `.md` ou `.txt` por aula), um script pode usar o `supabase-js` com `service_role` key para fazer bulk upsert. Não existe ainda no projeto — precisaria ser criado em `scripts/populate-lessons.ts`.

### Recomendação final

**Para a Turma 1 (conteúdo disponível agora):** Opção B (migration SQL) para os campos que já são conhecidos (video_id Vimeo, duration_seconds), combinada com Opção A para conteúdo textual (summary, transcript) conforme os vídeos forem gravados.

**Para ciclos futuros:** Criar `scripts/populate-lessons.ts` com Zod + supabase-js que lê um JSON/YAML de conteúdo por aula e faz upsert em batch.
