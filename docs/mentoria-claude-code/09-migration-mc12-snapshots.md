# Migration MC-1.2 — Snapshots e Validação
<!-- Rexali (sites-dev-beta) — 2026-05-17 -->

## Status

| Item | Resultado |
|---|---|
| Schema lessons validado | SIM (via schema.md) |
| Análise de escaping M3 + M5 | SIM |
| Supabase CLI conectado | **BLOQUEADO** — auth failure |
| Snapshot pré-migration (banco) | **PENDENTE** — requer CLI funcional |
| Migration Bythelion gerada | SIM (`20260517100000_update_mentoria_lessons_m3_m5.sql`) |
| **Checklist 7 pontos** | **APROVADA — 6/7 PASS, 1 observação documentada** |

---

## 3b. Resultado do Checklist — Migration `20260517100000_update_mentoria_lessons_m3_m5.sql`

Validação executada por Rexali em 2026-05-17.

| # | Critério | Resultado | Detalhe |
|---|---|---|---|
| 1 | Cada UPDATE filtra por `id = '<uuid>'` explícito | PASS | 20 UUIDs únicos, nunca `module_id` |
| 2 | Cada UPDATE tem `AND deleted_at IS NULL` | PASS | 20 guards na seção ativa (40 total = 20 ativos + 20 no rollback comentado) |
| 3 | Nenhum UPDATE toca `video_id` ou `video_provider` | PASS | Zero ocorrências fora de comentários |
| 4 | Nenhum UPDATE toca `summary` ou `transcript` | PASS | Zero ocorrências fora de comentários |
| 5 | `updated_at = now()` presente em todos | PASS | 20/20 |
| 6 | String literals sem `$$` quoting (crítico por R$) | PASS | Usa strings nativas delimitadas por `'...'` multi-line. `$$` ausente. Nenhuma colisão com cifrão. |
| 7 | Nenhuma aspa simples não-escapada dentro dos valores | PASS | Verificado via Python parse multi-line — nenhum `'` não-escapado dentro dos valores |

**Checklist header/footer:**
- Header: comentado com objetivo, escopo M3+M5, data, anti-recorrência soft-delete, campos NÃO alterados (`video_id`, `video_provider`, `summary`, `transcript`) — PASS
- Rollback documentado no rodapé (20 UPDATEs comentados com valores originais) — PASS

**Observação sobre contagem (20 vs 21 esperados):**

A migration contém 20 UPDATEs. A story MC-1.1 mencionava 11 arquivos M5, mas o arquivo `Módulo 5 | Aula 8 | KV Dev.txt` **não tem correspondência de aula ativa no banco** (sort_order=8 no banco aponta para Aula 9 — gap documentado na migration na linha 401: `"a Aula 8 KV Dev está faltante — ver gap report MC-1.1"`). Portanto 20 UPDATEs é o número correto para as aulas existentes. A criação da Aula 8 KV Dev é escopo de MC-2.1 (INSERT).

**VEREDICTO: APROVADA para apply.** Aguarda autorização do João.

---

---

## 1. Schema da tabela `lessons` — Validado via schema.md

Campos confirmados presentes e relevantes para MC-1.2:

| Coluna | Tipo | Nullable | Observação |
|---|---|---|---|
| `id` | uuid | NOT NULL | PK — base dos UPDATEs |
| `module_id` | uuid FK | NOT NULL | |
| `title` | text | NOT NULL | campo a atualizar |
| `slug` | text | NOT NULL | não tocar |
| `kind` | text | NOT NULL | não tocar |
| `sort_order` | int | NOT NULL | não tocar |
| `description` | text | null ok | campo a atualizar |
| `video_provider` | text | null ok | **NÃO TOCAR** (MC-1.3) |
| `video_id` | text | null ok | **NÃO TOCAR** (MC-1.3) |
| `duration_seconds` | int | null ok | não tocar |
| `summary` | text | null ok | **NÃO TOCAR** (AC5) |
| `summary_format` | text | null ok | não tocar |
| `transcript` | text | null ok | não tocar nesta sprint |
| `transcript_format` | text | null ok | não tocar |
| `deleted_at` | timestamptz | null ok | guard em todo UPDATE |
| `updated_at` | timestamptz | null ok | definir `now()` em todo UPDATE |

**Todos os campos AC3/AC4/AC5 confirmados existem.** Nenhuma alteração de schema necessária para MC-1.2.

---

## 2. Análise de Escaping — Arquivos M3 e M5

### 2.1 Sumário de caracteres problemáticos

| Tipo | Ocorrências | Risco SQL | Ação |
|---|---|---|---|
| Aspas simples ASCII (`'`) | **ZERO** | — | Nenhuma |
| Barras invertidas (`\`) | **ZERO** | — | Nenhuma |
| Aspas tipográficas unicode (`'`, `'`, `"`, `"`) | **ZERO** | — | Nenhuma |
| Aspas duplas ASCII (`"`) | SIM (até 10/arquivo) | Baixo em `$$` quoting | Usar `$$` dollar quoting |
| `$` (cifrão) | SIM (valores em R$) | **CRÍTICO com `$$` quoting** | Usar `E'...'` ou escapar `$` |
| `%` | SIM (valores percentuais) | Baixo | Sem risco em SQL direto |
| `→` (seta unicode U+2192) | SIM (muito frequente) | Nenhum — é UTF-8 válido | Nenhuma |
| `•` (bullet unicode) | SIM (em M3 Parte 5) | Nenhum — é UTF-8 válido | Nenhuma |

### 2.2 Caso crítico: cifrão `$` nos arquivos M5

Os arquivos do Módulo 5 contêm valores monetários com `R$`:

```
Módulo 5 | Aula 1 | Diretor de Arte.txt:
  → Design System completo: R$20k–R$50k, 3 a 6 semanas
  → KV de site: R$30k–R$80k, 6 a 12 semanas
  Total: entre R$80k e R$280k de investimento único, mais R$3k–R$10k/mês

Módulo 5 | Aula 7 | KV Tráfego.txt:
  Valor de mercado: R$3k–R$10k/mês internalizados.

Módulo 5 | Aula 5 | KV Site.txt:
  Valor de mercado: R$30k–R$80k entregues em uma sessão.
```

**Decisão:** A migration DEVE usar `E'...'` string literals (não `$$` dollar quoting), pois `$$` teria `$` como delimitador e colidiria com o `R$` do conteúdo.

**Exemplo correto:**
```sql
UPDATE public.lessons
SET description = E'Antes de falar o que é Claude Design, vamos olhar o que você teria que pagar para ter isso feito numa agência séria.\n\nOs preços de mercado:\n→ Design System completo: R$20k–R$50k, 3 a 6 semanas',
    title = 'Módulo 5 | Aula 1 | Diretor de Arte',
    updated_at = now()
WHERE id = '<uuid>'
  AND deleted_at IS NULL;
```

### 2.3 Os 3 arquivos com mais caracteres que exigem atenção

| Rank | Arquivo | Problema | Impacto |
|---|---|---|---|
| 1 | `Módulo 5 | Aula 1 | Diretor de Arte.txt` | 8+ ocorrências de `R$` | `$$` quoting proibido |
| 2 | `Módulo 3 | Parte 6.txt` | 10 aspas duplas (`"`) | Sem risco, mas confirmar encoding |
| 3 | `Módulo 5 | Aula 7 | KV Tráfego.txt` | `R$` + aspas duplas + `≠` (unicode) | `$$` proibido; `≠` é UTF-8 válido |

---

## 3. Checklist de Validação da Migration

Ver seção 3b acima para resultado executado.

---

## 4. Snapshot Pré-Migration (PENDENTE — CLI com auth failure)

### Blocker atual

```
FATAL: password authentication failed for user "cli_login_postgres"
```

O Supabase CLI (`/opt/homebrew/bin/supabase db query --linked`) está falhando com erro de autenticação persistente. Não é circuit breaker transitório — a senha do papel CLI está inválida ou expirada.

### Query preparada (executar quando CLI estiver funcional)

UUID do M5 confirmado na migration: `fe6bcf96-96a5-477a-bc40-95188f22b21d`.

```sql
SELECT
  l.id,
  m.slug AS module_slug,
  l.sort_order,
  l.slug AS lesson_slug,
  l.title,
  l.video_id,
  COALESCE(LENGTH(l.description), 0) AS desc_len,
  COALESCE(LENGTH(l.summary), 0) AS summary_len
FROM public.lessons l
JOIN public.modules m ON m.id = l.module_id
WHERE m.id IN (
  '3901d7a4-7373-4a22-8fcc-f5f6035d3c91',
  'fe6bcf96-96a5-477a-bc40-95188f22b21d'
)
  AND l.deleted_at IS NULL
  AND m.deleted_at IS NULL
ORDER BY m.sort_order, l.sort_order;
```

### Snapshot pré (a preencher após CLI funcional)

| id | module_slug | sort_order | lesson_slug | title | video_id | desc_len | summary_len |
|---|---|---|---|---|---|---|---|
| *pendente* | | | | | | | |

---

## 5. Snapshot Pós-Migration (a preencher após apply autorizado pelo João)

| id | module_slug | sort_order | title | desc_len | diff_desc |
|---|---|---|---|---|---|
| *pendente após apply* | | | | | |

---

## 6. Ação necessária

Para desbloquear:

1. **João re-autenticar CLI:** `supabase login` ou `supabase link --project-ref mksmmpfyqowuzjcchhkl` para renovar credenciais
2. **UUID completo do M5** deve ser confirmado (parcial `fe6bcf96-...` na story)
3. Depois do CLI funcional: rodar o snapshot pré e atualizar este documento
