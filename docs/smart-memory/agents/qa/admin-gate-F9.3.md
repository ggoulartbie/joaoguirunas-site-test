# F9.3 — Smoke Test: Gate ADMIN `/academy/admin/*`

**Data:** 2026-05-07  
**Autor:** Kronilux  
**Status:** PASS (AC1 validado em CI sem credenciais; AC2/AC3 requerem env vars)

---

## Middleware analisado

`src/middleware.ts:82-91`

```ts
if (pathname.startsWith('/academy/admin')) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/academy/403', request.url))
  }
}
```

O middleware executa na ordem:
1. Se path é público → passa (sem auth)
2. Se não há `user` → redirect `/academy/login?next=<pathname>`
3. Se path começa com `/academy/admin` → busca `profiles.role`
4. Se `role !== 'ADMIN'` → redirect `/academy/403`

---

## Fluxo por cenário

### AC1 — Usuário anônimo → `/academy/admin`

```
GET /academy/admin
  → middleware: isPublic? NÃO
  → supabase.auth.getUser() → null
  → redirect /academy/login?next=/academy/admin
```

**Resultado esperado:** redirect 307 para `/academy/login?next=/academy/admin`

### AC2 — Usuário STUDENT → `/academy/admin`

```
GET /academy/admin  (cookie de sessão de STUDENT)
  → middleware: isPublic? NÃO
  → supabase.auth.getUser() → user (STUDENT)
  → pathname.startsWith('/academy/admin')? SIM
  → supabase profiles.select('role') → 'STUDENT'
  → 'STUDENT' !== 'ADMIN'
  → redirect /academy/403
```

**Resultado esperado:** redirect 307 para `/academy/403`  
**Página 403:** exibe "403", "Acesso restrito", link "Ir para o Dashboard" → `/academy/dashboard`

### AC3 — Usuário ADMIN → `/academy/admin`

```
GET /academy/admin  (cookie de sessão de ADMIN)
  → middleware: isPublic? NÃO
  → supabase.auth.getUser() → user (ADMIN)
  → pathname.startsWith('/academy/admin')? SIM
  → supabase profiles.select('role') → 'ADMIN'
  → 'ADMIN' === 'ADMIN'
  → NextResponse.next() — renderiza normalmente
```

**Resultado esperado:** página `/academy/admin` renderiza com HTTP 200

---

## Spec Playwright

`e2e/academy-admin-gate.spec.ts`

| Teste | Env requerida | Status |
|---|---|---|
| AC1: anônimo redireciona para /academy/login | nenhuma | PASS (3/3) |
| AC1: URL contém ?next=/academy/admin | nenhuma | PASS |
| AC1: sub-rota /academy/admin/turmas também redireciona | nenhuma | PASS |
| AC2: STUDENT → /academy/403 | E2E_STUDENT_EMAIL + E2E_STUDENT_PASSWORD | skip (sem env) |
| AC2: página 403 exibe "403" e "Acesso restrito" | E2E_STUDENT_EMAIL + E2E_STUDENT_PASSWORD | skip (sem env) |
| AC2: link 403 → /academy/dashboard | E2E_STUDENT_EMAIL + E2E_STUDENT_PASSWORD | skip (sem env) |
| AC2: sub-rota /usuarios bloqueia STUDENT | E2E_STUDENT_EMAIL + E2E_STUDENT_PASSWORD | skip (sem env) |
| AC3: ADMIN acessa sem redirect | E2E_ADMIN_EMAIL + E2E_ADMIN_PASSWORD | skip (sem env) |
| AC3: HTTP não-500 | E2E_ADMIN_EMAIL + E2E_ADMIN_PASSWORD | skip (sem env) |

Para habilitar AC2/AC3, adicionar ao `.env.test`:
```
E2E_STUDENT_EMAIL=aluno@exemplo.com
E2E_STUDENT_PASSWORD=senha_aluno
E2E_ADMIN_EMAIL=admin@exemplo.com
E2E_ADMIN_PASSWORD=senha_admin
```

---

## Observações de hardening

- O middleware usa `supabase.auth.getUser()` (verifica JWT com Supabase) — correto, não confia apenas em cookie local
- A query de role usa o cliente anon com RLS; se RLS bloquear a query, `profile` será null → redireciona para 403 (comportamento seguro por padrão)
- O matcher do middleware inclui `/academy/admin/:path*` — sub-rotas cobertas
- A página `/academy/403` é listada em `PUBLIC_PATHS` no middleware — acessível sem autenticação (correto)
