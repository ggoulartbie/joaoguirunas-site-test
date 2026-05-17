---
title: "FM-3.4: UI admin — nova rota `/cursos/[courseId]/modulos/[moduleId]/` com `ModuleEditorClient.tsx`"
type: story
status: done
epic: FM
complexity: M
agent: sites-dev-alpha
created: 2026-05-17
tags: [story, ui, admin, materials, modules, next-app-router]
checklist: GO
related:
  - "[[../../decisions/ADR-002-materiais-por-modulo-schema]]"
  - "[[FM-3.2-migration-module-materials]]"
  - "[[FM-3.3-server-actions-module-materials]]"
  - "[[2.2-admin-gerencia-materiais]]"
---

# FM-3.4: UI admin — nova rota `/cursos/[courseId]/modulos/[moduleId]/` com `ModuleEditorClient.tsx`

## Objetivo

Criar nova rota admin **inexistente hoje** para edição de módulo, espelhando o fluxo de aula. O foco da rota nesta story é **gestão de materiais por módulo** (anexar arquivo, anexar link, listar todos os kinds, excluir individualmente) — campos textuais do módulo (title/description) podem ser incluídos como bônus se vier sem custo, mas **não são obrigatórios** nesta story.

Toda a UI nasce já incorporando as **lições da Story 2.2** (que ainda está aberta no curso de aula): botão delete visível para LINK, optimistic com await + try/catch + rollback, loading state por item, feedback de erro. **Não pode regredir os bugs já conhecidos.**

## Acceptance Criteria

- [ ] **AC1 (Nova rota existe)**: criar `src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/modulos/[moduleId]/page.tsx` como server component com `export const dynamic = 'force-dynamic'` (memory `project_supabase_admin_proxy_build`). Page:
  - extrai `courseId` e `moduleId` de `params`
  - fetch do `module` (notFound se não existir ou `deleted_at != null`)
  - fetch dos `module_materials` ordenados por `sort_order`
  - renderiza `<ModuleEditorClient module={...} initialMaterials={...} courseId={...} />`
- [ ] **AC2 (`ModuleEditorClient.tsx` espelhado)**: criar `ModuleEditorClient.tsx` na mesma pasta. Espelha estrutura visual e padrões do `LessonEditorClient.tsx`:
  - header com breadcrumb "Admin / Cursos / Módulo" + título + slug
  - seção "Materiais" idêntica em layout à de aula (`LessonEditorClient.tsx:313-366`)
  - footer com botão "Voltar" + (opcional) "Salvar" se incluir edição de title/description
- [ ] **AC3 (Listing de materiais — TODOS os kinds, anti-recorrência 2.2)**: a lista exibe 100% dos `module_materials` independente do `kind`. Materiais `LINK` (com `storage_path = null`) aparecem com:
  - indicador visual de tipo `"LINK"`
  - `external_url` truncado abaixo do título (substituindo `formatBytes` quando aplicável)
- [ ] **AC4 (Botão delete visível para LINK — anti-recorrência 2.2)**: cada item da lista tem botão de delete visível **independente de `storage_path`**. **NÃO repetir o bug de `LessonEditorClient.tsx:335`** (guard `mat.storage_path && handleDelete(...)` que torna o botão inerte para LINK). Padrão correto:
  ```tsx
  onClick={() => handleDeleteMaterial(mat.id, mat.storage_path)}
  ```
- [ ] **AC5 (Optimistic com await + rollback — anti-recorrência 2.2)**: `handleDeleteMaterial(id, storagePath: string | null)`:
  - `confirm('Remover material?')` antes
  - snapshot do item, optimistic remove do state
  - **await** `deleteModuleMaterial(id, storagePath, courseId, moduleId)` dentro de `try/catch`
  - **catch:** re-inserir snapshot no state + `setError(err.message)`
  - **finally:** `setDeleting(null)`
  - **success:** `router.refresh()` para sincronizar com server
- [ ] **AC6 (Loading state por item)**: estado `deleting: string | null` com `id` do material sendo removido. CSS `opacity-50` no item + `disabled` no botão durante a operação. Espelha `LessonEditorClient.tsx:321,334`.
- [ ] **AC7 (Upload de arquivo)**: input file + handler `handleFileUpload` espelhando `LessonEditorClient.tsx:107-122`:
  - `setUploading(true)` antes
  - `await uploadModuleMaterial(moduleId, courseId, formData)` em try/catch
  - on success: prepend ao state via `setMaterials((prev) => [...prev, created])`
  - on error: `setError(err.message)`
  - finally: reset input + `setUploading(false)`
- [ ] **AC8 (Adicionar link — não repetir o gap do editor de aula)**: incluir UI para **adicionar material LINK** (não existe hoje no editor de aula — Story 2.2 OUT). Form mínimo: input `title` + input `url`, botão "Adicionar Link". Handler `handleAddLink`:
  - validação client: `title` não-vazio, `url` parseable
  - `await addLinkModuleMaterial(moduleId, courseId, title, url)` em try/catch
  - on success: append ao state + reset inputs
  - on error: `setError`
- [ ] **AC9 (revalidatePath — anti-recorrência 2.2)**: como FM-3.3 já cobre revalidatePath duplo nas actions, esta story só precisa **confirmar** via smoke manual que após delete/upload/addLink o material aparece/some sem F5 manual. Se necessário, `router.refresh()` complementar.
- [ ] **AC10 (Sem regressão no editor de aula)**: `LessonEditorClient.tsx` **não deve ser tocado** por esta story. Story 2.2 trabalha esses bugs separadamente. Sem cross-contamination.
- [ ] **AC11 (Tipografia e tokens KV)**: reuso dos mesmos tokens (`var(--ink)`, `var(--ink-2)`, `var(--bone)`, `var(--bone-mute)`, `var(--ember)`, `var(--void)`), classes utilitárias `inputClass`/`sectionClass` extraídas/duplicadas de `LessonEditorClient.tsx:36-43`. Identidade visual idêntica.
- [ ] **AC12 (Smoke manual end-to-end)**: documentar no PR:
  - (a) acessar `/academy/admin/cursos/[real-id]/modulos/[real-id]` como admin → renderiza
  - (b) upload PDF → aparece na lista sem F5
  - (c) add link `https://exemplo.com` com título "Slides" → aparece na lista com `LINK` + URL truncada
  - (d) delete do PDF → some + arquivo removido do bucket
  - (e) delete do LINK → some sem erro
  - (f) simular erro do server (ex.: revogar permissão temporariamente, ou injetar throw via dev tools) → confirmar rollback do item + mensagem de erro
- [ ] **AC13 (a11y mínima)**: `aria-label` em botão delete (`Remover ${mat.title}`), foco visível em todos os botões (`focus-visible:ring`), `<input type="file">` escondido mas associado ao `<label>` (padrão `LessonEditorClient.tsx:357-364`).

## Escopo

**IN:**
- Nova rota `src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/modulos/[moduleId]/page.tsx`
- Novo cliente `ModuleEditorClient.tsx` na mesma pasta
- Seção "Materiais" completa (list + upload arquivo + add link + delete + loading + rollback)
- Reuso da identidade visual do `LessonEditorClient`

**OUT:**
- Edição de title/description/sort_order do `module` (módulo já é editado na `CourseEditorClient.tsx` — fora do escopo desta story, salvo se vier sem custo adicional)
- Reordenação de materiais (drag-and-drop)
- Edição de título de material existente
- Bulk delete
- Audit log / quem deletou
- Modal de confirmação custom (use `confirm()` nativo — mesmo padrão da Story 2.2)
- Touch em `LessonEditorClient.tsx`

## Contexto Técnico

**Estrutura de rotas admin atual:**
```
src/app/(academy)/academy/(admin)/admin/cursos/
├── page.tsx                          (lista de cursos)
├── [courseId]/
│   ├── page.tsx                      (editor de curso — onde os módulos vivem hoje)
│   ├── CourseEditorClient.tsx
│   └── aulas/[lessonId]/
│       ├── page.tsx                  (editor de aula)
│       ├── LessonEditorClient.tsx    ← ESPELHO PRINCIPAL
│       └── ...
```

**Nova rota a criar:**
```
src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/modulos/[moduleId]/
├── page.tsx                          (server component, force-dynamic)
└── ModuleEditorClient.tsx            (espelho de LessonEditorClient)
```

**Imports esperados no `page.tsx` (referência de `aulas/[lessonId]/page.tsx`):**

```tsx
export const dynamic = 'force-dynamic'
import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { ModuleEditorClient } from './ModuleEditorClient'

export default async function EditModulePage({
  params,
}: {
  params: Promise<{ courseId: string; moduleId: string }>
}) {
  const { courseId, moduleId } = await params

  const { data: module } = await supabaseAdmin
    .from('modules')
    .select('*')
    .eq('id', moduleId)
    .is('deleted_at', null)
    .single()

  if (!module) notFound()

  const { data: materials } = await supabaseAdmin
    .from('module_materials')
    .select('*')
    .eq('module_id', moduleId)
    .order('sort_order', { ascending: true })

  return (
    <ModuleEditorClient
      module={module}
      initialMaterials={materials ?? []}
      courseId={courseId}
    />
  )
}
```

**Imports esperados no `ModuleEditorClient.tsx`:**

```tsx
import {
  uploadModuleMaterial,
  deleteModuleMaterial,
  addLinkModuleMaterial,
} from '../../../actions'
```

**Lições da Story 2.2 que NÃO podem regredir aqui** (memory crítico para esta story):

1. Botão delete visível para LINK (sem guard `storage_path && ...`)
2. Optimistic com `await` + `try/catch` + rollback do snapshot
3. `setError` em catch para feedback visual
4. `router.refresh()` em success
5. Loading state por item (`deleting: string | null`)
6. `storage_path: string | null` na assinatura do handler (tipo correto)

## Coordenação

- **Bloqueado por:** FM-3.3 (imports das 3 server actions). Pode começar codificação local em paralelo, mas merge só após FM-3.3 PASS.
- **Bloqueia:** FM-3.5 (aluno) — não estritamente, mas a UX foi pensada em conjunto
- **Não afeta** Story 2.2 (editor de aula) — sem cross-contamination
- **Link cruzado:** quando a Story 2.2 fechar com PR, esta story pode opcionalmente importar o **mesmo padrão visual de listing** se sites-dev-alpha extrair um componente `MaterialItem` compartilhado. **Não obrigatório** — duplicar é aceito.

## Dev Agent Record

| Campo | Valor |
|---|---|
| Agente | sites-dev-alpha (Novael) |
| Iniciado | 2026-05-17 |
| Concluído | 2026-05-17 |
| Branch | feat-aulas-v2 |

## File List

- `src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/modulos/[moduleId]/page.tsx` — server component (force-dynamic, fetch module + materials)
- `src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/modulos/[moduleId]/ModuleEditorClient.tsx` — client (upload, delete com optimistic+rollback, add link, loading state por item)
- `src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/CourseEditorClient.tsx` — link "Materiais" adicionado no header de cada módulo (SortableModule)

## QA Results

**Veredicto:** ✅ PASS — 2026-05-17 (Axilun)

**Resumo:** UI admin sólida; espelha `LessonEditorClient` sem reproduzir os 2 bugs conhecidos da Story 2.2.

**Auditoria adversarial — pontos críticos validados (anti-recorrência Story 2.2):**

1. **Botão delete VISÍVEL para LINK** — `ModuleEditorClient.tsx:160` `onClick={() => handleDeleteMaterial(mat.id, mat.storage_path)}` sem guard `mat.storage_path && ...`. Padrão correto, NÃO regrediu o bug de `LessonEditorClient.tsx:335`.
2. **Optimistic com await + try/catch + rollback** — `handleDeleteMaterial` (linhas 71-86): snapshot antes do remove otimista, `await deleteModuleMaterial(...)` dentro de try, `setMaterials(prev => [...prev, snapshot])` no catch + `setError`, `setDeleting(null)` no finally, `router.refresh()` em success.
3. **Storage path null seguro** — assinatura `handleDeleteMaterial(id, storagePath: string | null)` tipa corretamente; passa direto para a action server que tem o guard `if (storagePath)`.
4. **Loading state por item** — `deleting: string | null`, `opacity-50` + `disabled` no botão.
5. **Add link UI** — não existia no editor de aula (lacuna confirmada); aqui foi implementado com validação client (`title.trim() não-vazio`, `new URL(url)`), feedback de erro via setError.

**ACs:**
- AC1–AC13: ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅ ✅
- AC9: confirma via revalidatePath duplo nas server actions + `router.refresh()` client-side complementar.
- AC10: `LessonEditorClient.tsx` intocado (grep confirmou ausência de mudanças cross-rota).

**Build & typecheck:** `pnpm build` exit 0 (todas as 48+ páginas geradas); `pnpm typecheck` exit 0.

**Concerns:** nenhum.

**Próximo passo:** mover para `done/`. Liberado para integrar com release **APÓS** FAIL da FM-3.5 ser corrigido (essa story sozinha não trava o release; a UI admin funciona, mas não há valor sem a UI student funcional).
