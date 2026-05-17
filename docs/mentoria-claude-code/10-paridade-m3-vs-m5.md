---
title: "MC: Relatório de Paridade M3 vs M5"
created: 2026-05-17
agent: sites-analyst
---

# Relatório de Paridade M3 vs M5

**Objetivo:** Verificar se M5 espelha corretamente M3 em estrutura, slugs, sort_order, titles e campos obrigatórios.

---

## Resumo Executivo

M5 tem **4 problemas estruturais** além do gap da Aula 8 KV Dev (já documentado em 08-aulas-banco-vs-local.md). Nenhum bloqueia MC-1.2 (UPDATE title+description), mas dois devem ser corrigidos antes de MC-1.4 (validação visual pelo aluno): o slug `abertura-2` e o slug `modulo-5-aula-9-handoff-pro-claude-code` em sort_order=8.

---

## Estrutura comparada

### Sort_order e cobertura de aulas

| sort_order | M3 (banco) | M5 (banco) | Paridade |
|---|---|---|---|
| 0 | `abertura` | `abertura-2` | DIVERGE — sufixo `-2` em M5 |
| 1 | `parte-0` | `modulo-5-aula-1-diretor-de-arte` | Padrão diferente |
| 2 | `parte-1-terminal-nao-e-coisa-de-hacker` | `modulo-5-aula-2-por-que-esse-modulo-importa` | Padrão diferente |
| 3 | `parte-2-pastas` | `modulo-5-aula-3-logica-de-projetos` | Padrão diferente |
| 4 | `parte-3-claudemd` | `modulo-5-aula-4-design-system` | Padrão diferente |
| 5 | `parte-4-comandos-base` | `modulo-5-aula-5-kv-site` | Padrão diferente |
| 6 | `parte-5-como-claude-trabalha` | `modulo-5-aula-6-kv-social` | Padrão diferente |
| 7 | `parte-5-estrutura-base` | `modulo-5-aula-7-kv-trafego` | Padrão diferente |
| 8 | `parte-7-pontes-com-o-mundo` | `modulo-5-aula-9-handoff-pro-claude-code` | DIVERGE — número de aula errado no slug |
| 9 | `encerramento` | `modulo-5-aula-10-encerramento` | Padrão diferente |
| — | — | *(ausente)* Aula 8 KV Dev | GAP — nunca inserida |

**Conclusão sort_order:** Sequência 0-9 está contínua em ambos os módulos. Nenhum buraco no sort_order do que existe. O gap da Aula 8 KV Dev não cria buraco nos índices existentes — M5 simplesmente tem 10 aulas em vez de 11.

---

## Diferenças identificadas

### D1 — Slug `abertura-2` (crítico para URL)

| Campo | M3 | M5 |
|---|---|---|
| Slug da abertura | `abertura` | `abertura-2` |
| URL gerada | `/curso/.../aula/abertura` | `/curso/.../aula/abertura-2` |

**Problema:** O sufixo `-2` indica que o INSERT do M5 foi gerado por uma rotina que detectou colisão com o `abertura` do M3 e adicionou `-2` automaticamente. Slugs são escopados por módulo (não por curso), então a colisão não deveria existir — mas o INSERT foi provavelmente feito sem `module_id` correto como escopo.

**Impacto:** URL feia e inconsistente. Não bloqueia MC-1.2, mas bloqueia uma eventual URL canônica limpa. Deve ser corrigido antes de MC-1.4.

**Ação recomendada:** `UPDATE lessons SET slug = 'abertura' WHERE id = '0c96c53a-fd68-4651-bcd4-530d6e3f9bd0'`. Verificar se há constraint UNIQUE em `(module_id, slug)` — se sim, o UPDATE é safe.

---

### D2 — Slug `modulo-5-aula-9` em sort_order=8 (descritivo errado)

| Campo | Valor no banco | Deveria ser |
|---|---|---|
| lesson_id | `da7e8094-4f02-4efb-84ba-26e5f76c950e` | — |
| sort_order | 8 | 9 (após inserção da Aula 8 KV Dev) |
| slug atual | `modulo-5-aula-9-handoff-pro-claude-code` | `modulo-5-aula-9-handoff-pro-claude-code` (correto após reordenação) |
| title atual | `Módulo 5 | Aula 9 | Handoff pro Claude Code` | correto |

**Problema:** O número "9" no slug está correto para o título, mas o sort_order=8 é consequência da Aula 8 KV Dev nunca ter sido inserida. Quando MC-2.1 inserir a Aula 8 KV Dev, este registro precisará de sort_order atualizado para 9, e `modulo-5-aula-10-encerramento` para 10.

**Impacto atual:** Nenhum — sort_order=8 funciona. O impacto virá em MC-2.1.

**Ação recomendada:** Documentar em MC-2.1 que a inserção da Aula 8 KV Dev exige reordenação dos dois registros seguintes.

---

### D3 — Padrão de slug inconsistente entre M3 e M5

| Módulo | Padrão de slug | Exemplo |
|---|---|---|
| M3 | Semântico curto sem prefixo | `parte-0`, `parte-2-pastas`, `encerramento` |
| M5 | Com prefixo `modulo-5-` + número | `modulo-5-aula-1-diretor-de-arte` |

**Problema:** M5 usa prefixo `modulo-5-` em todos os slugs de aulas. M3 não usa prefixo de módulo. A inconsistência não quebra nada — slugs são escopados por `module_id` no banco — mas gera URLs mais longas e padrão diferente entre módulos.

**Impacto:** Cosmético. URLs ficam `/aula/modulo-5-aula-1-diretor-de-arte` vs `/aula/parte-0`. Não bloqueia nenhuma story.

**Ação recomendada:** Nenhuma ação urgente. Se João quiser padronizar futuramente, reescrever os slugs do M5 para o padrão curto (ex: `abertura`, `aula-1-diretor-de-arte`). Registrar como débito técnico cosmético.

---

### D4 — Descriptions zeradas em todo o M5 vs M3 parcialmente preenchido

| Módulo | Estado das descriptions no banco |
|---|---|
| M3 | Parcialmente preenchidas (51-561 chars) — serão sobrescritas em MC-1.2 |
| M5 | Todas vazias (`description_len = 0`) — serão preenchidas em MC-1.2 |

**Problema:** Não é um bug — é o estado esperado pré-MC-1.2. Documentado aqui apenas para clareza.

**Impacto:** Alunos vendo M5 agora veem descrições vazias. Resolvido por MC-1.2.

**Ação recomendada:** Executar MC-1.2 (já em andamento por sites-data).

---

### D5 — video_id: M3 completo, M5 zerado

| Módulo | video_id |
|---|---|
| M3 | Todos preenchidos (Vimeo IDs válidos) |
| M5 | Todos `null` |

**Problema:** Não é bug estrutural — é estado pré-MC-1.3. M5 aguarda upload dos vídeos no Vimeo.

**Impacto:** Player M5 renderiza fallback "Vídeo não disponível" para todos os alunos.

**Ação recomendada:** Executar MC-1.3 após João subir vídeos no Vimeo.

---

### D6 — Arquivos MP4 locais ausentes para Aulas 7-10 do M5

| Arquivo | MP4 local existe? |
|---|---|
| Módulo 5 \| Aula 7 \| KV Tráfego.txt | Não |
| Módulo 5 \| Aula 8 \| KV Dev.txt | Não |
| Módulo 5 \| Aula 9 \| Handoff pro Claude Code.txt | Não |
| Módulo 5 \| Aula 10 \| Encerramento.txt | Não |

**Contexto:** Aulas 1-6 têm `.mp4` local. Aulas 7-10 têm só `.txt`. Em M3, todas as aulas têm `.mp4` local.

**Impacto para este projeto:** Nenhum — o projeto usa Vimeo ID para streaming, não o arquivo local. Os `.mp4` locais são apenas o arquivo de origem para upload manual no Vimeo.

**Impacto para MC-1.3:** João precisará subir os vídeos das Aulas 7-10 do M5 diretamente do arquivo original (não da pasta local do projeto). Verificar onde estão os originais antes de iniciar MC-1.3.

**Ação recomendada:** João confirma onde estão os MP4s das Aulas 7-10 antes de MC-1.3 começar.

---

## Cobertura dos 11 arquivos locais pelo mapeamento

| # | Arquivo local | No banco? | sort_order |
|---|---|---|---|
| 0 | Módulo 5 \| Abertura.txt | Sim | 0 |
| 1 | Módulo 5 \| Aula 1 \| Diretor de Arte.txt | Sim | 1 |
| 2 | Módulo 5 \| Aula 2 \| Por que Esse Módulo Importa.txt | Sim | 2 |
| 3 | Módulo 5 \| Aula 3 \| Lógica de Projetos.txt | Sim | 3 |
| 4 | Módulo 5 \| Aula 4 \| Design System.txt | Sim | 4 |
| 5 | Módulo 5 \| Aula 5 \| KV Site.txt | Sim | 5 |
| 6 | Módulo 5 \| Aula 6 \| KV Social.txt | Sim | 6 |
| 7 | Módulo 5 \| Aula 7 \| KV Tráfego.txt | Sim | 7 |
| 8 | Módulo 5 \| Aula 8 \| KV Dev.txt | **NÃO** | ausente |
| 9 | Módulo 5 \| Aula 9 \| Handoff pro Claude Code.txt | Sim | 8 |
| 10 | Módulo 5 \| Aula 10 \| Encerramento.txt | Sim | 9 |

**Resultado:** 10 de 11 arquivos cobertos. Gap confirmado: apenas Aula 8 KV Dev.

---

## Ações recomendadas por prioridade

| Prioridade | Diferença | Ação | Story |
|---|---|---|---|
| P1 — Antes de MC-1.4 | D1: slug `abertura-2` | `UPDATE lessons SET slug = 'abertura' WHERE id = '0c96c53a-...'` | MC-1.2 ou hotfix separado |
| P1 — Agora | D4: descriptions M5 vazias | Executar MC-1.2 (já planejado) | MC-1.2 |
| P1 — Após uploads Vimeo | D5: video_id M5 null | Executar MC-1.3 | MC-1.3 |
| P2 — Em MC-2.1 | D2: sort_order descasado após inserção Aula 8 | Reordenar sort_order 8→9, 9→10 após INSERT da Aula 8 | MC-2.1 |
| P2 — Em MC-2.1 | Gap Aula 8 KV Dev | INSERT + sort_order reorder | MC-2.1 |
| P3 — Débito técnico | D3: padrão slug M5 com prefixo | Reescrever slugs para padrão curto (opcional) | Backlog sem prioridade |
| P3 — Antes de MC-1.3 | D6: MP4s Aulas 7-10 ausentes localmente | João confirma localização dos arquivos originais | Bloqueia MC-1.3 parcialmente |
