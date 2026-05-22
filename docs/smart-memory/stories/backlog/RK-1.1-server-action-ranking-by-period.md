---
title: "Story RK-1.1: Server action getRankingByPeriod (top 5 por período)"
type: story
status: review
epic: RK
complexity: M
agent: sites-dev-beta
created: 2026-05-21
updated: 2026-05-21
tags: [story, ranking, server-action, supabase-admin]
related: [[RK-1.2-pagina-ranking-podio]]
---

# Story RK-1.1: Server action `getRankingByPeriod` — top 5 alunos por período

## Objetivo
Expor uma server action que devolve o top 5 alunos por número de aulas concluídas em um período (`week` | `biweek` | `month`), pronta para alimentar o pódio público de `/academy/ranking`.

## Acceptance Criteria

- [ ] **AC1 (contrato):** Função exportada em `src/app/actions/ranking.ts` com `'use server'`:
  ```ts
  export type RankingPeriod = 'week' | 'biweek' | 'month'
  export type RankingEntry = {
    rank: number              // 1..5
    userId: string
    displayName: string       // primeiro nome de profiles.name; fallback "Aluno"
    avatarUrl: string | null
    lessonsCompleted: number  // >= 1
    lastCompletedAt: string   // ISO — usado para desempate
  }
  export async function getRankingByPeriod(period: RankingPeriod): Promise<RankingEntry[]>
  ```
- [ ] **AC2 (autorização):** A action chama `await requireUser()` no topo (qualquer aluno autenticado pode ler; redirect a `/academy/login` se anônimo). NÃO usa `requireAdmin`.
- [ ] **AC3 (janelas):** O `since` é calculado server-side a partir de `new Date()`:
  - `week` → `now - 7 dias`
  - `biweek` → `now - 15 dias`
  - `month` → `now - 30 dias`
  - Filtra `lesson_progress` por `completed = true` AND `completed_at >= since.toISOString()`.
- [ ] **AC4 (agregação + ordenação):** Conta `lessonsCompleted` por `user_id` no período. Ordena DESC por `lessonsCompleted` e, em empate, DESC por `lastCompletedAt` (mais recente vence). Retorna no máximo 5 entradas com `rank` 1..N (N ≤ 5).
- [ ] **AC5 (privacidade):** Nunca retorna `email`. `displayName` é o **primeiro token** de `profiles.name` (split por espaço); se `name` vazio/nulo retorna a string `'Aluno'`. O `userId` continua sendo retornado (necessário para `key` no React; não há rota pública que vaze dados a partir dele).
- [ ] **AC6 (sem N+1):** Implementação usa no máximo 2 queries: (1) `lesson_progress` filtrado por janela + completed; (2) `profiles` em batch via `.in('id', userIds)` para os ≤5 vencedores **após** a agregação. Agregação em memória, sem subqueries por usuário.
- [ ] **AC7 (acesso a dados):** Usa `supabaseAdmin` (bypass RLS intencional para permitir ler `lesson_progress` de terceiros). A barreira de segurança é o `requireUser()` do AC2 + o limite de 5 + a restrição de payload (sem email).
- [ ] **AC8 (vazio):** Quando não há nenhum `lesson_progress` no período, retorna `[]` (não lança).
- [ ] **AC9 (resiliência a perfis órfãos):** Se um `user_id` agregado não tiver linha em `profiles`, mantém ele no resultado com `displayName: 'Aluno'` e `avatarUrl: null` (não filtra fora — preserva o `rank` legítimo).
- [ ] **AC10 (build):** `pnpm build` passa sem erros novos. Tipos exportados são consumíveis pela UI da RK-1.2.

## Escopo

**IN:**
- Novo arquivo `src/app/actions/ranking.ts` com a action `getRankingByPeriod` e os types `RankingPeriod` / `RankingEntry`.
- Janelas calculadas server-side (sem parâmetro `since` no client).
- Uso de `supabaseAdmin` com `requireUser()` como gate.

**OUT:**
- UI / componentes / página (responsabilidade da [[RK-1.2-pagina-ranking-podio]]).
- Paginação além do top 5 ou ranking histórico.
- Filtros por curso / módulo / cohort (toda a base é agregada).
- Caching/ISR/realtime — página será `force-dynamic`.
- Notificações de mudança de posição, badges, gamificação.

## Contexto Técnico

**Tabelas:**
- `lesson_progress(user_id, lesson_id, completed, completed_at)` — fonte da agregação.
- `profiles(id, name, avatar_url)` — `name` é NOT NULL no schema; mesmo assim trate fallback por defesa.

**Padrões do projeto:**
- Server actions em `src/app/actions/` com `'use server'` no topo.
- `supabaseAdmin` é Proxy que lança no build se `SUPABASE_SERVICE_ROLE_KEY` ausente — ver memory `supabase_admin_proxy_build`. A RK-1.2 deve marcar `force-dynamic` justamente por isso.
- `requireUser()` lê o profile do usuário autenticado e redireciona se anônimo (ver `src/lib/auth/helpers.ts`).

**Sketch de implementação (não normativo):**
```ts
'use server'
import { requireUser } from '@/lib/auth/helpers'
import { supabaseAdmin } from '@/lib/supabase/admin'

export type RankingPeriod = 'week' | 'biweek' | 'month'
export type RankingEntry = {
  rank: number
  userId: string
  displayName: string
  avatarUrl: string | null
  lessonsCompleted: number
  lastCompletedAt: string
}

const DAYS_BY_PERIOD: Record<RankingPeriod, number> = { week: 7, biweek: 15, month: 30 }

export async function getRankingByPeriod(period: RankingPeriod): Promise<RankingEntry[]> {
  await requireUser()
  const since = new Date(Date.now() - DAYS_BY_PERIOD[period] * 24 * 60 * 60 * 1000).toISOString()

  const { data: rows, error } = await supabaseAdmin
    .from('lesson_progress')
    .select('user_id, completed_at')
    .eq('completed', true)
    .gte('completed_at', since)
  if (error) throw new Error(error.message)
  if (!rows || rows.length === 0) return []

  // Agrega em memória
  const agg = new Map<string, { count: number; last: string }>()
  for (const r of rows) {
    if (!r.completed_at) continue
    const cur = agg.get(r.user_id) ?? { count: 0, last: r.completed_at }
    cur.count += 1
    if (r.completed_at > cur.last) cur.last = r.completed_at
    agg.set(r.user_id, cur)
  }

  const top = [...agg.entries()]
    .map(([userId, v]) => ({ userId, lessonsCompleted: v.count, lastCompletedAt: v.last }))
    .sort((a, b) =>
      b.lessonsCompleted - a.lessonsCompleted ||
      (b.lastCompletedAt > a.lastCompletedAt ? 1 : b.lastCompletedAt < a.lastCompletedAt ? -1 : 0)
    )
    .slice(0, 5)

  if (top.length === 0) return []

  const { data: profiles, error: pErr } = await supabaseAdmin
    .from('profiles')
    .select('id, name, avatar_url')
    .in('id', top.map((t) => t.userId))
  if (pErr) throw new Error(pErr.message)

  const profMap = new Map(profiles?.map((p) => [p.id, p]) ?? [])

  return top.map((t, idx) => {
    const p = profMap.get(t.userId)
    const firstName = (p?.name ?? '').trim().split(/\s+/)[0] || 'Aluno'
    return {
      rank: idx + 1,
      userId: t.userId,
      displayName: firstName,
      avatarUrl: p?.avatar_url ?? null,
      lessonsCompleted: t.lessonsCompleted,
      lastCompletedAt: t.lastCompletedAt,
    }
  })
}
```

**Decisões arquiteturais:**
- `supabaseAdmin` + `requireUser` (não `requireAdmin`) — é a primeira action do projeto que faz **leitura agregada cross-user para aluno**. A diretriz é igual ao padrão usado em `admin-progress.ts`, exceto pelo gate (aluno em vez de admin) e pelo payload mínimo (sem email).
- Janela em **dias corridos** (`now - N dias`), não calendário (não usa "início da semana"). Mais simples e consistente com o que o lead descreveu como "semanal/quinzenal/mensal" (period rolling).
- Agregação em memória após uma query única — anti-N+1.
- Desempate por `completed_at` mais recente cumpre o requisito do lead.

**Anti-recorrência:**
- `displayName` derivado de `profiles.name`, **nunca de email** — evita vazamento de PII e mantém consistência com o restante da plataforma.
- Sem caching/cache tags — ranking precisa refletir progresso recente.
- `userId` retornado é o ID interno; não há rota pública `/perfil/[id]` que aceite isso, então não vaza nada usável externamente.

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | — |
| Iniciado   | — |
| Concluído  | — |
| Branch     | — |

## File List
<!-- Dev preenche ao concluir -->

## QA Results
<!-- QA preenche ao revisar -->
