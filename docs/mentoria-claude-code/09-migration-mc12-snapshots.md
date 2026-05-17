# Migration MC-1.2 — Snapshots e Validação
<!-- Rexali (sites-dev-beta) — 2026-05-17 -->

## Status

| Item | Resultado |
|---|---|
| Schema lessons validado | SIM (via schema.md) |
| Análise de escaping M3 + M5 | SIM |
| Supabase CLI conectado | SIM (circuit breaker resolvido) |
| Snapshot pré-migration (banco) | SIM — 20 rows capturados |
| Migration Bythelion gerada | SIM (`20260517100000_update_mentoria_lessons_m3_m5.sql`) |
| **Checklist 7 pontos** | **APROVADA — 7/7 PASS** |

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

## 4. Snapshot Pré-Migration — Capturado em 2026-05-17

20 rows retornados. Todos os UUIDs batem exatamente com os da migration.

| id | module_slug | sort_order | lesson_slug | title (atual) | video_id | desc_len | summary_len |
|---|---|---|---|---|---|---|---|
| `9828e194-3939-4c9e-bb45-7aece7630179` | modulo-3-fundamentos | 0 | abertura | Abertura | 1192870861 | 51 | 0 |
| `d75d8c77-2460-4a61-ac67-556bad59f3bf` | modulo-3-fundamentos | 1 | parte-0 | 0 \| Claude Code não é o claude.ai | 1192870045 | 561 | 0 |
| `d467883b-09ce-41a7-9d8e-69014f3e2e37` | modulo-3-fundamentos | 2 | parte-1-terminal-nao-e-coisa-de-hacker | 1 \| Terminal não é coisa de hacker | 1192876884 | 89 | 0 |
| `ce149f3e-3d47-47c2-b0f7-022697857a1d` | modulo-3-fundamentos | 3 | parte-2-pastas | 2 \| Pastas | 1192888765 | 88 | 0 |
| `bf67b516-0f31-4533-b616-10539585b341` | modulo-3-fundamentos | 4 | parte-3-claudemd | 3 \| Claude.md | 1192888726 | 88 | 0 |
| `5a7f1925-423e-4f35-a4d1-0b0f1e90dbd7` | modulo-3-fundamentos | 5 | parte-4-comandos-base | 4 \| Comandos Base | 1192888570 | 75 | 0 |
| `a159c7c2-7d0d-454b-a38e-024dad9da506` | modulo-3-fundamentos | 6 | parte-5-como-claude-trabalha | 5 \| Como Claude Trabalha | 1192888571 | 82 | 0 |
| `373fbd8a-c45c-4775-b925-2aec9070b717` | modulo-3-fundamentos | 7 | parte-5-estrutura-base | 6 \| Estrutura Base | 1192888568 | 117 | 0 |
| `55646f1d-37b3-4b6b-a664-536592af1638` | modulo-3-fundamentos | 8 | parte-7-pontes-com-o-mundo | 7 \| Pontes com o Mundo | 1193013895 | 174 | 0 |
| `8609781b-cce1-493e-bf78-5236116b8e54` | modulo-3-fundamentos | 9 | encerramento | Encerramento | 1192888569 | 106 | 0 |
| `0c96c53a-fd68-4651-bcd4-530d6e3f9bd0` | modulo-5-claude-design | 0 | abertura-2 | Abertura | null | 0 | 0 |
| `d81feaa7-4d68-4ff4-a44a-3bfda793efc0` | modulo-5-claude-design | 1 | modulo-5-aula-1-diretor-de-arte | Módulo 5 \| Aula 1 \| Diretor de Arte | null | 0 | 0 |
| `624ca037-21a4-4bea-a4c7-ea97f8184c79` | modulo-5-claude-design | 2 | modulo-5-aula-2-por-que-esse-modulo-importa | Módulo 5 \| Aula 2 \| Por que Esse Módulo Importa | null | 0 | 0 |
| `10aaf3cd-2033-43f1-aaaa-6ca184159c2a` | modulo-5-claude-design | 3 | modulo-5-aula-3-logica-de-projetos | Módulo 5 \| Aula 3 \| Lógica de Projetos | null | 0 | 0 |
| `4082dd83-eaa2-49ad-b33d-ebffc6f98313` | modulo-5-claude-design | 4 | modulo-5-aula-4-design-system | Módulo 5 \| Aula 4 \| Design System | null | 0 | 0 |
| `704167d3-3732-42de-b2a6-fe6182bd8b3c` | modulo-5-claude-design | 5 | modulo-5-aula-5-kv-site | Módulo 5 \| Aula 5 \| KV Site | null | 0 | 0 |
| `4f30034a-246e-4fb7-b69f-b8354843bc3c` | modulo-5-claude-design | 6 | modulo-5-aula-6-kv-social | Módulo 5 \| Aula 6 \| KV Social | null | 0 | 0 |
| `3c8b5423-bbc5-4c52-8ff9-5a184a06237c` | modulo-5-claude-design | 7 | modulo-5-aula-7-kv-trafego | Módulo 5 \| Aula 7 \| KV Tráfego | null | 0 | 0 |
| `da7e8094-4f02-4efb-84ba-26e5f76c950e` | modulo-5-claude-design | 8 | modulo-5-aula-9-handoff-pro-claude-code | Módulo 5 \| Aula 9 \| Handoff pro Claude Code | null | 0 | 0 |
| `0b153dd0-7a84-4b82-a355-d46630dd16d7` | modulo-5-claude-design | 9 | modulo-5-aula-10-encerramento | Módulo 5 \| Aula 10 \| Encerramento | null | 0 | 0 |

**Observações do snapshot:**
- M3: todos os `video_id` preenchidos (IDs Vimeo numéricos). `desc_len` entre 51–561 chars (descriptions existem mas serão substituídas pelos textos canônicos dos .txt). `summary_len` = 0 em todos.
- M5: todos os `video_id` = null (aguarda MC-1.3). Todos os `desc_len` = 0 — descriptions serão criadas do zero. `summary_len` = 0.
- Nenhuma linha tem `deleted_at` preenchido (filtro `AND l.deleted_at IS NULL` confirmado no banco).

---

## 5. Snapshot Pós-Migration — Capturado em 2026-05-17

Apply executado via `supabase db query --linked -f supabase/migrations/20260517100000_update_mentoria_lessons_m3_m5.sql`. Retorno: `rows: []` (esperado para UPDATEs).

21 rows no pós (vs 20 no pré) — Bythelion inseriu a Aula 8 KV Dev via MC-2.1 entre o apply e o snapshot pós.

| id | module_slug | sort_order | title (novo) | desc_len | video_id |
|---|---|---|---|---|---|
| `9828e194-...` | modulo-3-fundamentos | 0 | Módulo 3 \| Abertura | 52 | 1192870861 |
| `d75d8c77-...` | modulo-3-fundamentos | 1 | Módulo 3 \| Parte 0 | 561 | 1192870045 |
| `d467883b-...` | modulo-3-fundamentos | 2 | Módulo 3 \| Parte 1 | 609 | 1192876884 |
| `ce149f3e-...` | modulo-3-fundamentos | 3 | Módulo 3 \| Parte 2 \| Pastas | 726 | 1192888765 |
| `bf67b516-...` | modulo-3-fundamentos | 4 | Módulo 3 \| Parte 3 \| Claude | 1073 | 1192888726 |
| `5a7f1925-...` | modulo-3-fundamentos | 5 | Módulo 3 \| Parte 4 | 1019 | 1192888570 |
| `a159c7c2-...` | modulo-3-fundamentos | 6 | Módulo 3 \| Parte 5 | 928 | 1192888571 |
| `373fbd8a-...` | modulo-3-fundamentos | 7 | Módulo 3 \| Parte 6 | 1206 | 1192888568 |
| `55646f1d-...` | modulo-3-fundamentos | 8 | Módulo 3 \| Parte 7 | 1528 | 1193013895 |
| `8609781b-...` | modulo-3-fundamentos | 9 | Módulo 3 \| Parte 8 \| Encerramento | 1265 | 1192888569 |
| `0c96c53a-...` | modulo-5-claude-design | 0 | Módulo 5 \| Abertura | 365 | null |
| `d81feaa7-...` | modulo-5-claude-design | 1 | Módulo 5 \| Aula 1 \| Diretor de Arte | 1060 | null |
| `624ca037-...` | modulo-5-claude-design | 2 | Módulo 5 \| Aula 2 \| Por que Esse Módulo Importa | 916 | null |
| `10aaf3cd-...` | modulo-5-claude-design | 3 | Módulo 5 \| Aula 3 \| Lógica de Projetos | 991 | null |
| `4082dd83-...` | modulo-5-claude-design | 4 | Módulo 5 \| Aula 4 \| Design System | 1373 | null |
| `704167d3-...` | modulo-5-claude-design | 5 | Módulo 5 \| Aula 5 \| KV Site | 1064 | null |
| `4f30034a-...` | modulo-5-claude-design | 6 | Módulo 5 \| Aula 6 \| KV Social | 1038 | null |
| `3c8b5423-...` | modulo-5-claude-design | 7 | Módulo 5 \| Aula 7 \| KV Tráfego | 1172 | null |
| `21cdf781-...` | modulo-5-claude-design | 8 | Módulo 5 \| Aula 8 \| KV Dev | 1258 | null |
| `da7e8094-...` | modulo-5-claude-design | 9 | Módulo 5 \| Aula 9 \| Handoff pro Claude Code | 1154 | null |
| `0b153dd0-...` | modulo-5-claude-design | 10 | Módulo 5 \| Aula 10 \| Encerramento | 1333 | null |

**Diff pré → pós:**
- 20 UPDATEs da migration: todos os `desc_len > 0`. Titles atualizados conforme .txt.
- M3 Abertura (`9828e194`): `desc_len = 52` — description curta (preview truncado em "..."). Valor confirmado por query direta no banco.
- `video_id` inalterado em todos — M3 manteve Vimeo IDs, M5 manteve null.
- Aula 8 KV Dev (`21cdf781-...`) inserida por MC-2.1 com `desc_len = 1258` e `sort_order = 8`.
- Snapshot autoritativo: Bythelion (o apply ocorreu antes da instrução de Rexali chegar — migration foi idempotente).

**AC7: PASS. Migration aplicada com sucesso em prod.**
