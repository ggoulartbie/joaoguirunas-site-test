---
name: ranking-query
description: Query SQL para ranking top 5 alunos por aulas concluídas em período (7/15/30 dias) com análise de migration necessária
metadata:
  type: project
tags: [ranking, lesson_progress, profiles, performance, index]
---

# Ranking de Progresso — Query Design

## Schema relevante

**`lesson_progress`**
- `user_id uuid` — FK → `profiles.id`
- `lesson_id uuid`
- `completed boolean` — não nulo, default false
- `completed_at timestamptz` — nulo quando não concluída
- Índices existentes: `(user_id, completed)`, `(lesson_id, completed)`

**`profiles`**
- `id uuid`
- `name text` — nome completo (único campo de nome disponível)
- `avatar_url text | null`
- Sem coluna de e-mail — e-mail fica somente em `auth.users`

---

## Query SQL final

```sql
SELECT
  lp.user_id,
  split_part(p.name, ' ', 1) AS first_name,
  p.avatar_url,
  COUNT(lp.id)                AS lessons_completed,
  MAX(lp.completed_at)        AS last_completed_at
FROM public.lesson_progress lp
INNER JOIN public.profiles p ON p.id = lp.user_id
WHERE lp.completed = true
  AND lp.completed_at >= now() - ('{N} days'::interval)
GROUP BY lp.user_id, p.name, p.avatar_url
ORDER BY lessons_completed DESC, last_completed_at ASC
LIMIT 5;
```

> Substituir `{N}` por `7`, `15` ou `30` conforme o período selecionado.

**Lógica de desempate:** `last_completed_at ASC` — quem completou a última aula *mais cedo* fica à frente (chegou ao mesmo patamar antes).

**Privacidade:** expõe apenas `first_name` (via `split_part`) e `avatar_url`. E-mail jamais referenciado.

---

## Versão Supabase JS Client (server action)

```typescript
const { data, error } = await supabase
  .from('lesson_progress')
  .select(`
    user_id,
    completed_at,
    profiles!inner (
      name,
      avatar_url
    )
  `)
  .eq('completed', true)
  .gte('completed_at', new Date(Date.now() - days * 86_400_000).toISOString())
  .order('completed_at', { ascending: true })

// Agrupa em memória ou usa rpc() com a query raw acima
```

**Recomendação:** usar `supabase.rpc('get_ranking_by_period', { p_days: days })` com a query SQL encapsulada em uma função Postgres. Evita agregação no cliente e permite cache com `{ count: 'exact' }` se necessário.

---

## Migration necessária

### Necessária: índice em `(completed, completed_at)`

Os índices atuais `(user_id, completed)` e `(lesson_id, completed)` **não** cobrem o filtro
`WHERE completed = true AND completed_at >= ...` de forma eficiente quando a query varre todos os usuários (sem filtrar por `user_id` específico).

```sql
-- migration: 20260521100000_lesson_progress_ranking_index.sql
CREATE INDEX idx_lesson_progress_completed_at
  ON public.lesson_progress (completed_at)
  WHERE completed = true;
```

Índice parcial (`WHERE completed = true`) é ideal: ignora as linhas `completed = false`,
reduz o tamanho do índice e acelera exatamente o padrão de acesso do ranking.

### Não necessária: função RPC (opcional)

Não há nenhuma coluna, tabela ou constraint faltando. A função `get_ranking_by_period` é
conveniente mas opcional — a server action pode emitir a query raw diretamente via `supabase.rpc`.
Caso o dev queira encapsular em RPC, a migration seria:

```sql
CREATE OR REPLACE FUNCTION public.get_ranking_by_period(p_days int)
RETURNS TABLE (
  user_id      uuid,
  first_name   text,
  avatar_url   text,
  lessons_completed bigint,
  last_completed_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY INVOKER
AS $$
  SELECT
    lp.user_id,
    split_part(p.name, ' ', 1) AS first_name,
    p.avatar_url,
    COUNT(lp.id)                AS lessons_completed,
    MAX(lp.completed_at)        AS last_completed_at
  FROM public.lesson_progress lp
  INNER JOIN public.profiles p ON p.id = lp.user_id
  WHERE lp.completed = true
    AND lp.completed_at >= now() - (p_days || ' days')::interval
  GROUP BY lp.user_id, p.name, p.avatar_url
  ORDER BY lessons_completed DESC, last_completed_at ASC
  LIMIT 5;
$$;
```

---

## Resumo de decisões

| Ponto | Decisão | Motivo |
|---|---|---|
| Campo de nome | `split_part(p.name, ' ', 1)` | Único campo de nome em `profiles`; extrai primeiro nome |
| Desempate | `MAX(completed_at) ASC` | Quem chegou ao mesmo número primeiro fica à frente |
| E-mail | Não exposto | `profiles` não tem coluna email — só `auth.users` |
| Migration obrigatória | Índice parcial `completed_at WHERE completed` | Sem ele, a query faz full scan em todos os registros concluídos |
| Migration opcional | Função RPC `get_ranking_by_period` | Encapsula lógica, mas não é bloqueante para a story |
