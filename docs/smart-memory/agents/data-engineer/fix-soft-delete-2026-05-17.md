# Fix: Slug Conflicts After Mass Soft-Delete — 2026-05-17

## Contexto

Mass soft-delete acidental em módulos e aulas ocorreu em 2026-05-16/17. O lead restaurou a maioria, mas restaram conflitos de slug.

## Estado Final do Banco (verificado 2026-05-17)

| Tabela | Total | Soft-deleted | Ativos |
|---|---|---|---|
| courses | 2 | 1 | 1 |
| modules | 15 | 13 | 2 |
| lessons | 81 | 18 | 63 |

## Módulos Ativos

- `fe6bcf96` — slug=`modulo-5-claude-design` (curso mentoria-claude-code-aiox)
- `3901d7a4` — slug=`modulo-3-fundamentos` (curso mentoria-claude-code-aiox) — **recriado após soft-delete**

## Conflito de Módulo Principal

| Atributo | Soft-deleted | Ativo |
|---|---|---|
| id | `4ecd19f9-57f7-41a4-838d-07f110ba15ac` | `3901d7a4-7373-4a22-8fcc-f5f6035d3c91` |
| slug | `modulo-3-fundamentos` | `modulo-3-fundamentos` |
| deleted_at | 2026-05-16T19:00:56 | NULL |

**ALERTA: módulo soft-deleted `4ecd19f9` contém 9 aulas ATIVAS (deleted_at=null):**
- `abertura` (id=c5f8a4e5)
- `desbloqueio-e-crencas` (id=595bce1f)
- `parte-0-o-que-e-claude-code` (id=b12c2542)
- `1-terminal` (id=3ee5ce5d)
- `fundamentos` (id=6bdd2c60)
- `setup` (id=3accd9b1)
- `setup-instalacao-mac` (id=96651e9f)
- `setup-e-instalacao-linux` (id=6cd3b209)
- `setup-e-instalacao-windows` (id=4bd9e50d)

**Decisão pendente:** Estas aulas têm conteúdo distinto do módulo novo. NÃO podem ser purgadas sem decisão do lead.
Opções: (A) restaurar módulo `4ecd19f9` e renomear slug; (B) migrar aulas para módulo ativo; (C) confirmar que são órfãs indesejadas e fazer hard-delete.

## Conflito de Lesson Resolvível

| Atributo | Soft-deleted (obsoleta) | Ativa (atual) |
|---|---|---|
| id | `476b1f2e-72a0-47d6-bda2-cbff0ebb8efa` | `d467883b-09ce-41a7-9d8e-69014f3e2e37` |
| slug | `parte-1-terminal-nao-e-coisa-de-hacker` | `parte-1-terminal-nao-e-coisa-de-hacker` |
| title | "Parte 0 | Claude Code não é Claude.ai" | "1 | Terminal não é coisa de hacker" |
| module | `3901d7a4` | `3901d7a4` |

**Resolução:** A lesson soft-deleted é versão antiga substituída. Pode ser purgada se desejado, mas manter soft-deleted não causa dano funcional.

## Aula `abertura` no curso mentoria-claude-code-aiox

**3 instâncias encontradas:**

| id | module_id | deleted_at | Status |
|---|---|---|---|
| `9828e194` | `3901d7a4` (módulo-3-fundamentos ATIVO) | NULL | **ATIVA** |
| `9bd1b784` | `fe6bcf96` (módulo-5-claude-design ATIVO) | NULL | **ATIVA** |
| `c5f8a4e5` | `4ecd19f9` (módulo-3-fundamentos SOFT-DELETED) | NULL | ativa mas módulo deletado |

A aula `abertura` está presente e ativa no módulo ativo `3901d7a4` (sort_order=0).

## Outros 12 Módulos Soft-deleted

Todos do curso `mentoria-claude-code-aiox`, deletados em 2026-05-17:
- `teste`, `teste-2`, `teste-3` — módulos de teste
- `modulo-1-centro-de-treinamento`, `modulo-4-centro-de-treinamento`, `modulo-2-claude-design` — conteúdo real?
- `semana-2`, `semana-3`, `semana-4`, `bonus-online`, `dia-presencial`, `encontros-on-line` — estrutura de curso

Estes foram deletados no mesmo evento (2026-05-17 17:02~17:04). Confirmar com lead se é intencional.

## Ação Tomada

Nenhuma ação de escrita realizada. Estado preservado para decisão do lead sobre as 9 aulas órfãs.
