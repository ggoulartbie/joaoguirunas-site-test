---
title: Runbook — Certificados
type: runbook
updated: 2026-05-08
tags: [runbook, certificates, pdf, academy]
---

# Runbook: Certificados

## Variáveis de ambiente

| Variável | Uso | Obrigatória |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | URL base inscrita no PDF (ex.: `https://joaoguirunas.com`) | Sim — fallback hardcoded para `https://joaoguirunas.com` mas deve estar setada |
| `SUPABASE_SERVICE_ROLE_KEY` | `supabaseAdmin` para leitura de `certificates`, `profiles`, `courses`, `cohorts` | Sim |

---

## Como verificar emissões em produção

1. Aceder ao **Supabase Table Editor** → tabela `certificates`.
2. Filtrar por `user_id` ou `course_id` do aluno/curso desejado.
3. Colunas relevantes: `verification_code`, `issued_at`, `pdf_storage_path`, `revoked_at`.
4. Verificar no browser: `https://joaoguirunas.com/academy/certificado/v/{verification_code}`.

---

## Como reemitir manualmente um certificado

A reemissão é tratada como upsert idempotente. Se o certificado já existe, não cria duplicata.

**Opção A — via servidor (preferida):**
Acionar a action `checkAndIssueCertificate` chamando-a com o `userId`, `courseId`, `cohortId` corretos. Em produção, isso ocorre automaticamente quando `triggerCertificateCheck` detecta 100% de aulas concluídas.

**Opção B — via SQL direto no Supabase (emergência):**
```sql
INSERT INTO certificates (user_id, course_id, cohort_id, verification_code, issued_at)
VALUES (
  '<uuid-do-aluno>',
  '<uuid-do-curso>',
  '<uuid-da-turma>',
  upper(replace(gen_random_uuid()::text, '-', '')),  -- code alfanumérico único
  now()
)
ON CONFLICT (user_id, course_id, cohort_id) DO NOTHING;
```

---

## Como revogar um certificado

```sql
UPDATE certificates
SET revoked_at = now()
WHERE verification_code = '<CODE>';
```

Efeito imediato: a página pública `/academy/certificado/v/[code]` exibe "Certificado Revogado" e a rota `/api/certificado/[code]` retorna HTTP 410.

Para desfazer a revogação:
```sql
UPDATE certificates
SET revoked_at = NULL
WHERE verification_code = '<CODE>';
```

---

## Fluxo de geração de PDF

- PDF gerado **on-demand** pela rota `GET /api/certificado/[code]` usando `@react-pdf/renderer`.
- Não há PDF pré-gerado em Storage — `pdf_storage_path` pode ser `null` sem impacto funcional.
- A rota é pública (sem autenticação). O código é a prova de posse.

---

## Rate Limiting — decisão e recomendação (P-02)

**Status atual:** não implementado.

**Contexto:** `renderToBuffer` é CPU-intensivo (~100–300ms por chamada). A rota é pública sem auth, tornando-a um vetor de DoS por volume.

**Recomendação para produção com tráfego relevante:**
- Integrar `@upstash/ratelimit` com Upstash Redis (disponível no Vercel Marketplace).
- Limite sugerido: **30 req/min por IP**.
- Exemplo de implementação:
  ```ts
  import { Ratelimit } from '@upstash/ratelimit'
  import { Redis } from '@upstash/redis'
  
  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(30, '1 m'),
  })
  
  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)
  if (!success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  ```
- Variáveis necessárias: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.

**Decisão MVP:** deferido. O volume atual de alunos não justifica a complexidade operacional. Reavaliar quando a plataforma tiver >500 alunos ativos ou if detectado abuso em logs Vercel.
