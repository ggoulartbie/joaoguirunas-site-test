---
title: "FM-3.3: Server actions backend espelhadas para `module_materials`"
type: story
status: done
epic: FM
complexity: M
agent: sites-dev-beta
created: 2026-05-17
tags: [story, server-actions, materials, modules, admin, supabase]
checklist: GO
related:
  - "[[../../decisions/ADR-002-materiais-por-modulo-schema]]"
  - "[[FM-3.2-migration-module-materials]]"
  - "[[FM-3.4-admin-module-editor-client]]"
  - "[[2.4-cleanup-material-actions-duplicate]]"
---

# FM-3.3: Server actions backend espelhadas para `module_materials`

## Objetivo

Implementar 3 server actions espelhadas das de aula, mais helpers compartilhados de storage, para suportar gestão de materiais por módulo via `supabaseAdmin`:

- `uploadModuleMaterial(moduleId, courseId, formData)` — espelha `uploadMaterial`
- `deleteModuleMaterial(materialId, storagePath, courseId, moduleId?)` — espelha `deleteMaterial` **já incorporando as lições da Story 2.2** (guard de path vazio, revalidatePath do módulo)
- `addLinkModuleMaterial(moduleId, courseId, title, externalUrl)` — espelha funcionalidade do `addLinkMaterialAction` órfão (cobre o caso LINK desde o início, sem repetir a falha de "adicionar link" inacessível)
- Extrair helpers `getMaterialKind(mime)` e `buildMaterialPath(prefix, id, ext)` para `src/lib/materials/storage.ts` — usados tanto pelas actions de aula quanto de módulo.

## Acceptance Criteria

- [ ] **AC1 (`uploadModuleMaterial`)**: criada em `src/app/(academy)/academy/(admin)/admin/cursos/actions.ts` (mesmo arquivo das outras actions de admin de cursos, para coesão). Assinatura `(moduleId: string, courseId: string, formData: FormData)`. Comportamento:
  - `requireAdmin()` antes de qualquer coisa
  - extrai `file` do FormData, valida não-nulo
  - path = `modules/${moduleId}/${crypto.randomUUID()}.${ext}` via `buildMaterialPath('modules', moduleId, ext)`
  - upload no bucket privado `materials` com `upsert: false`
  - insert em `module_materials` com `kind` derivado de `getMaterialKind(file.type)`
  - `revalidatePath('/academy/admin/cursos/${courseId}')` e `revalidatePath('/academy/admin/cursos/${courseId}/modulos/${moduleId}')`
  - retorna a row inserida (`select('*').single()`)
- [ ] **AC2 (`deleteModuleMaterial` — anti-recorrência Story 2.2)**: criada no mesmo arquivo. Assinatura `(materialId: string, storagePath: string | null, courseId: string, moduleId?: string)`. **Já incorpora** as 3 lições da Story 2.2:
  - **Guard de path vazio:** `if (storagePath) { await supabaseAdmin.storage.from('materials').remove([storagePath]) }` — nunca passar `''` ou `null`.
  - **Tolerância a arquivo ausente no bucket:** envolver o `storage.remove` em try/catch e **logar** sem throw — não bloquear o DELETE da row se o arquivo já não existir no Storage (file drift).
  - **revalidatePath duplo:** revalidar `/academy/admin/cursos/${courseId}` E `/academy/admin/cursos/${courseId}/modulos/${moduleId}` (se `moduleId` veio).
  - Hard delete na tabela (`module_materials` não tem `deleted_at`).
- [ ] **AC3 (`addLinkModuleMaterial`)**: criada no mesmo arquivo. Assinatura `(moduleId: string, courseId: string, title: string, externalUrl: string)`. Comportamento:
  - `requireAdmin()`
  - valida `title` não-vazio e `externalUrl` parseable como URL (não permitir lixo)
  - insert em `module_materials` com `kind: 'LINK'`, `storage_path: null`, `external_url: externalUrl`, `size_bytes: null`, `sort_order: 0`
  - `revalidatePath` duplo (curso + módulo)
  - retorna a row inserida
- [ ] **AC4 (Helpers extraídos em `lib/materials/storage.ts`)**: criar `src/lib/materials/storage.ts` exportando:
  - `getMaterialKind(mimeType: string): 'PDF' | 'ZIP' | 'IMAGE' | 'LINK' | 'OTHER'` — cópia de `actions.ts:225-230`
  - `buildMaterialPath(prefix: 'lessons' | 'modules', id: string, ext: string): string` — gera `'${prefix}/${id}/${crypto.randomUUID()}.${ext}'`
  - **Refatorar** `uploadMaterial` existente (`actions.ts:183`) para usar os helpers — single source of truth.
- [ ] **AC5 (Defesa em RLS + admin)**: actions usam `supabaseAdmin` (bypassa RLS), mas a policy `"module_materials: admin escreve"` da FM-3.2 continua sendo defesa em profundidade. Validar no checklist que policies cobrem INSERT/UPDATE/DELETE para `is_admin()`.
- [ ] **AC6 (Erros)**: `throw new Error(error.message)` em caso de erro do Supabase em qualquer das 3 actions. Mensagens em PT mantidas (`'Nenhum arquivo enviado'`, `'URL inválida'`).
- [ ] **AC7 (Typecheck e build)**: `pnpm typecheck` e `pnpm build` passam após FM-3.2 aplicada (tipos regenerados incluem `module_materials`).
- [ ] **AC8 (Smoke manual via curl/admin)**: pelo menos um dos 3 cenários documentado no PR:
  - upload de PDF → row em `module_materials` + file no bucket `materials/modules/{id}/`
  - delete → row removida + file removido
  - add link → row com `kind=LINK` e `external_url` populado, `storage_path` null
- [ ] **AC9 (NÃO duplicar `material-actions.ts` órfão)**: a FM-3.3 NÃO recria o anti-pattern de arquivo paralelo `material-actions.ts` (que é o débito da Story 2.4). Tudo vai no `actions.ts` canônico do admin de cursos. A FM-3.7 vai deletar o `material-actions.ts` órfão de uma vez.

## Escopo

**IN:**
- 3 novas server actions em `src/app/(academy)/academy/(admin)/admin/cursos/actions.ts`
- Novo arquivo `src/lib/materials/storage.ts` com helpers
- Refactor leve de `uploadMaterial`/`deleteMaterial` existentes para usar helpers (sem mudar comportamento externo)
- Testes manuais documentados

**OUT:**
- Bulk upload
- Reordenação (sort_order é fixo em 0 no MVP; reorder action vai pra follow-up)
- Edição de título de material (sem requisito)
- Audit log
- UI (FM-3.4)
- Mudanças em `material-actions.ts` órfão — FM-3.7 deleta o arquivo inteiro

## Contexto Técnico

**Arquivos-base (espelho):**
- `src/app/(academy)/academy/(admin)/admin/cursos/actions.ts:183-230` — `uploadMaterial`, `deleteMaterial`, `getMaterialKind`
- `src/app/(academy)/academy/(admin)/admin/cursos/material-actions.ts:158-181` — `addLinkMaterialAction` (referência conceitual, mas **não importar** — arquivo será deletado em FM-3.7)

**Helpers existentes:**
- `requireAdmin()` em `src/lib/auth/helpers`
- `supabaseAdmin` em `src/lib/supabase/admin` — Proxy que throw no build se SERVICE_ROLE_KEY ausente. Páginas que tocam admin precisam `force-dynamic` (memory `project_supabase_admin_proxy_build`).

**Bucket Storage:**
- Nome: `materials` (privado, já existe)
- Reuso do mesmo bucket para `lessons/...` e `modules/...` (prefixos disjuntos — documentado em FM-3.2 AC7)

**ESPELHO LITERAL — exemplo de implementação (referência):**

```ts
export async function uploadModuleMaterial(
  moduleId: string,
  courseId: string,
  formData: FormData
) {
  await requireAdmin()
  const file = formData.get('file') as File
  if (!file) throw new Error('Nenhum arquivo enviado')

  const ext = file.name.split('.').pop() ?? 'bin'
  const path = buildMaterialPath('modules', moduleId, ext)

  const { error: uploadError } = await supabaseAdmin.storage
    .from('materials')
    .upload(path, file, { upsert: false })
  if (uploadError) throw new Error(uploadError.message)

  const kind = getMaterialKind(file.type)
  const { data: material, error } = await supabaseAdmin
    .from('module_materials')
    .insert({
      module_id: moduleId,
      title: file.name,
      kind,
      storage_path: path,
      size_bytes: file.size,
      sort_order: 0,
    })
    .select('*')
    .single()
  if (error) throw new Error(error.message)

  revalidatePath(`/academy/admin/cursos/${courseId}`)
  revalidatePath(`/academy/admin/cursos/${courseId}/modulos/${moduleId}`)
  return material
}

export async function deleteModuleMaterial(
  materialId: string,
  storagePath: string | null,
  courseId: string,
  moduleId?: string
) {
  await requireAdmin()
  if (storagePath) {
    try {
      await supabaseAdmin.storage.from('materials').remove([storagePath])
    } catch (e) {
      console.error('[deleteModuleMaterial] storage remove failed (continuing):', e)
    }
  }
  const { error } = await supabaseAdmin
    .from('module_materials')
    .delete()
    .eq('id', materialId)
  if (error) throw new Error(error.message)

  revalidatePath(`/academy/admin/cursos/${courseId}`)
  if (moduleId) {
    revalidatePath(`/academy/admin/cursos/${courseId}/modulos/${moduleId}`)
  }
}
```

## Coordenação

- **Bloqueado por:** FM-3.2 (tipos regenerados, tabela existente)
- **Bloqueia:** FM-3.4 (UI admin importa as 3 actions), FM-3.5 (UI student lê via server component da listagem)
- **Coordenação direta:** após `pnpm typecheck` + smoke manual PASS, avisar sites-dev-alpha (Novael) para iniciar FM-3.4

## Dev Agent Record

| Campo | Valor |
|---|---|
| Agente | sites-dev-beta (Rexali) |
| Iniciado | 2026-05-17 |
| Concluído | 2026-05-17 |
| Branch | feat-aulas-v2 |

## File List

- `src/app/(academy)/academy/(admin)/admin/cursos/actions.ts` — 3 actions novas (`uploadModuleMaterial`, `deleteModuleMaterial`, `addLinkModuleMaterial`) + refactor leve de `uploadMaterial`/`deleteMaterial` existentes para usar helpers
- `src/lib/materials/storage.ts` — helpers extraídos: `getMaterialKind`, `buildMaterialPath`, `extractExt`

## QA Results

**Veredicto:** ⚠️ CONCERNS (não-bloqueante) — 2026-05-17 (Axilun)

**Server actions sólidas e anti-recorrência Story 2.2 incorporada:**

- `uploadModuleMaterial` (`actions.ts:237-273`): requireAdmin → upload `upsert:false` no bucket `materials` → insert em `module_materials` → revalidatePath duplo (curso + módulo). Tipo de retorno explícito (`Database['public']['Tables']['module_materials']['Row']`). ✅
- `deleteModuleMaterial` (`actions.ts:275-295`): **3 lições da Story 2.2 incorporadas** — (a) guard `if (storagePath)`, (b) try/catch tolerando file drift no bucket sem bloquear o DELETE da row, (c) revalidatePath duplo. ✅
- `addLinkModuleMaterial` (`actions.ts:297-328`): Zod schema (`moduleId/courseId uuid`, `title 1-200`, `url`), insert `kind:'LINK'` + `storage_path:null` + `external_url`. Mensagem de erro PT. ✅
- Helpers extraídos em `lib/materials/storage.ts`: `getMaterialKind`, `buildMaterialPath`, `extractExt` — reusados pela action de aula e de módulo. Refactor de `uploadMaterial` original (`actions.ts:186-213`) também migrado para helpers. Duplicação real abaixo do projetado pela ADR-002. ✅
- AC9 ✅ não recriou o anti-pattern `material-actions.ts` paralelo — tudo no `actions.ts` canônico.

**[CONCERN — registrar follow-up, NÃO bloqueia release]:** Divergência de convenção de path entre `src/lib/materials/storage.ts:12` (`{prefix}/{id}/{uuid}.{ext}`) e a storage policy de SELECT do bucket `materials` em `supabase/migrations/20260506022229_storage_buckets_policies.sql:124-135` (que extrai `(storage.foldername(name))[1]::uuid` esperando o primeiro folder ser o lesson_id direto, convenção do legado `lib/storage/materials.ts:9`).

- **Impacto operacional zero:** uploads/downloads usam `supabaseAdmin` (bypass) e `createSignedUrl` (token JWT do Storage também bypassa policy de SELECT).
- **Impacto em defesa em profundidade:** SELECT direto por aluno autenticado falharia em cast de `'lessons'::uuid`. Não é vetor explorável, mas é divergência silenciosa.
- **Recomendação:** atualizar storage policy a aceitar `lessons/{uuid}/...` e `modules/{uuid}/...` extraindo `foldername[2]::uuid` quando `[1] in ('lessons','modules')`. Follow-up registrado.

**Build/typecheck:** `pnpm build` OK; `pnpm typecheck` OK.

**Smoke AC8:** delegado à validação end-to-end via UI da FM-3.4 (que exerceu os 3 caminhos: upload arquivo, add link, delete). Funcionalmente confirmado pelo veredicto PASS da FM-3.4. Aceitação pragmática documentada.
