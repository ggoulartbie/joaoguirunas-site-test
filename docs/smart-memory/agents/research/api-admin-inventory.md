---
title: Inventário de APIs Admin
updated: 2026-05-08
author: Sera-S (sites-dev-gamma) / Rex-S (sites-dev-beta)
---

# Inventário: `src/app/api/admin/`

## Rotas encontradas

| Rota | Método | Arquivo |
|---|---|---|
| `/api/admin/turmas/[id]/resync-stripe` | POST | `turmas/[id]/resync-stripe/route.ts` |

Apenas uma rota exists hoje.

---

## Análise: `POST /api/admin/turmas/[id]/resync-stripe`

### 1. Auth gate — CORRIGIDO

**Bug encontrado:** A rota usava `requireAdmin()` envolto em `try/catch`. Em Next.js App Router, `redirect()` (usado internamente por `requireAdmin`) lança um erro especial `NEXT_REDIRECT` que **escapa** de try/catch — causando redirect 307 em vez de resposta JSON em contexto de Route Handler.

**Fix aplicado:** Substituído por `getCurrentUser()` com verificações explícitas de role retornando JSON:
```ts
const profile = await getCurrentUser()
if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
if (profile.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
```

### 2. Validação de inputs

- `[id]` é extraído diretamente do path sem validação UUID. O Supabase ignora UUIDs inválidos (retorna `data: null`), então o `.single()` resulta em 404 corretamente.
- Sem body — é um POST sem payload, nada a validar.
- **Status: OK** (UUID inválido resulta em 404, não erro 500)

### 3. Status codes

| Caso | Antes | Depois |
|---|---|---|
| Não autenticado | 401 (via redirect que escapava) | **401 JSON** |
| Autenticado, não ADMIN | 401 (via redirect que escapava) | **403 JSON** |
| Cohort não encontrada | 404 | 404 (sem mudança) |
| Cohort não purchasable | 422 | 422 (sem mudança) |
| Erro no sync | 500 | 500 (sem mudança) |

### 4. Stack trace vazando para cliente

**Bug encontrado (F9.5 — Rex-S):** `err.message` era exposto diretamente na response 500. Stripe SDK errors e outros errors internos poderiam vazar detalhes de infraestrutura.

**Fix aplicado:**
- Response 500 agora retorna sempre `{ error: 'Sync failed' }` (mensagem genérica)
- Erro real é logado server-side via `console.error('[resync-stripe] sync failed:', err)`
- Stack trace nunca chega ao cliente. **CORRIGIDO.**

### 5. Idempotência

`syncCohortWithStripe` é explicitamente idempotente:
- Produto: busca por `metadata['cohort_id']` antes de criar — reutiliza se existe, atualiza nome/imagem.
- Prices: verifica `existingPriceId` + `unit_amount` — retorna o mesmo ID se inalterado; arquiva e recria apenas se o preço mudou.
- Chamadas repetidas são seguras. **OK.**

---

## Padrão a adotar em futuras APIs admin

```ts
// Em Route Handlers: NÃO usar requireAdmin() — usa redirect() internamente
// CORRETO:
const profile = await getCurrentUser()
if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
if (profile.role !== 'ADMIN') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
```
