---
id: LS-1.1
title: "Fix: Invalid UUID ao cadastrar encontro"
type: bugfix
status: active
priority: P0
assignee: sites-dev-beta
created: 2026-05-18
---

# LS-1.1 — Fix: Invalid UUID ao cadastrar encontro

## Contexto

Ao tentar cadastrar um encontro na seção "Sessões ao Vivo" da página de edição de turma (`/academy/admin/turmas/[id]`), o admin recebe o erro **"Invalid UUID"**.

O error surge na Server Action `createLiveSession` em `src/app/(academy)/academy/(admin)/admin/turmas/actions.ts` (linha ~426):

```ts
const schema = z.object({
  cohortId: z.string().uuid(),  // ← potencial source do erro
  ...
})
const parsed = schema.safeParse(data)
if (!parsed.success) throw new Error(parsed.error.issues.map((i) => i.message).join(', '))
```

O projeto usa **Zod v4** (`"zod": "^4.4.3"`). Em Zod v4, a mensagem padrão de falha para `.uuid()` é exatamente **"Invalid UUID"**.

O mesmo padrão problemático existe em `createCoupon` (linha ~300).

O arquivo já define um helper consistente: `const uuidField = () => z.string().regex(UUID_RE, 'ID inválido')` que usa regex explícita com mensagem traduzida.

## Acceptance Criteria

- [ ] AC1: Ao preencher título e data e salvar, o encontro é criado sem erro
- [ ] AC2: A validação de `cohortId` em `createLiveSession` usa `uuidField()` ou `z.string().regex(UUID_RE)` (padrão do arquivo)
- [ ] AC3: A mesma correção é aplicada em `createCoupon` (cohortId) se o mesmo padrão existir
- [ ] AC4: Sem regressões em `updateLiveSession` e `deleteLiveSession`
- [ ] AC5: `pnpm tsc --noEmit` passa sem erros

## Arquivos afetados

- `src/app/(academy)/academy/(admin)/admin/turmas/actions.ts`

## Notas técnicas

O `UUID_RE` já definido no topo do arquivo:
```ts
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const uuidField = () => z.string().regex(UUID_RE, 'ID inválido')
```

Substituir `z.string().uuid()` por `uuidField()` resolve o problema e mantém consistência com o padrão já em uso no arquivo.
