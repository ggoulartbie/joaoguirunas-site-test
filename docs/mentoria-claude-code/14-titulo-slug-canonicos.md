---
name: Títulos e Slugs Canônicos — M3, M4, M5
description: Mapeamento canônico de title/slug para todas as aulas dos módulos 3, 4 e 5 — pronto para UPDATE no Supabase
type: spec
status: ready-to-apply
created: 2026-05-17
author: sites-architect (Zaelion)
---

# Títulos e Slugs Canônicos — M3, M4, M5

## Padrão

- **Title:** `Módulo X | Aula N | Título da Aula`
- **Slug:** `modulo-X-aula-N-titulo-da-aula` (kebab-case, sem acentos, sem pipes/barras)
- **Abertura:** `Aula 0`
- **Encerramento:** última aula do módulo, numerada normalmente (M3=Aula 9, M4=Aula 11, M5=Aula 10)

## Regras de slug

- Remover acentos: á→a, ã→a, ç→c, é→e, í→i, ó→o, ú→u
- Pipes `|` e barras `/` → remover
- Espaços → hífen
- Tudo minúsculo
- Hífens duplicados → simples

---

## Módulo 3 | Fundamentos

| lesson_id | sort_order | title_atual | title_novo | slug_atual | slug_novo |
|---|---|---|---|---|---|
| `9828e194-3939-4c9e-bb45-7aece7630179` | 0 | Módulo 3 \| Abertura | **Módulo 3 \| Aula 0 \| Abertura** | abertura | **modulo-3-aula-0-abertura** |
| `d75d8c77-2460-4a61-ac67-556bad59f3bf` | 1 | Módulo 3 \| Parte 0 | **Módulo 3 \| Aula 1 \| Claude Code vs claude.ai** | parte-0 | **modulo-3-aula-1-claude-code-vs-claude-ai** |
| `d467883b-09ce-41a7-9d8e-69014f3e2e37` | 2 | Módulo 3 \| Parte 1 | **Módulo 3 \| Aula 2 \| Terminal não é coisa de hacker** | parte-1-terminal-nao-e-coisa-de-hacker | **modulo-3-aula-2-terminal-nao-e-coisa-de-hacker** |
| `ce149f3e-3d47-47c2-b0f7-022697857a1d` | 3 | Módulo 3 \| Parte 2 \| Pastas | **Módulo 3 \| Aula 3 \| Pastas** | parte-2-pastas | **modulo-3-aula-3-pastas** |
| `bf67b516-0f31-4533-b616-10539585b341` | 4 | Módulo 3 \| Parte 3 \| Claude | **Módulo 3 \| Aula 4 \| CLAUDE.md** | parte-3-claudemd | **modulo-3-aula-4-claude-md** |
| `5a7f1925-423e-4f35-a4d1-0b0f1e90dbd7` | 5 | Módulo 3 \| Parte 4 | **Módulo 3 \| Aula 5 \| Comandos Base** | parte-4-comandos-base | **modulo-3-aula-5-comandos-base** |
| `a159c7c2-7d0d-454b-a38e-024dad9da506` | 6 | Módulo 3 \| Parte 5 | **Módulo 3 \| Aula 6 \| Como Claude Trabalha** | parte-5-como-claude-trabalha | **modulo-3-aula-6-como-claude-trabalha** |
| `373fbd8a-c45c-4775-b925-2aec9070b717` | 7 | Módulo 3 \| Parte 6 | **Módulo 3 \| Aula 7 \| Skills, Hooks e Agents** | parte-5-estrutura-base | **modulo-3-aula-7-skills-hooks-e-agents** |
| `55646f1d-37b3-4b6b-a664-536592af1638` | 8 | Módulo 3 \| Parte 7 | **Módulo 3 \| Aula 8 \| Pontes com o Mundo** | parte-7-pontes-com-o-mundo | **modulo-3-aula-8-pontes-com-o-mundo** |
| `8609781b-cce1-493e-bf78-5236116b8e54` | 9 | Módulo 3 \| Parte 8 \| Encerramento | **Módulo 3 \| Aula 9 \| Encerramento** | encerramento | **modulo-3-aula-9-encerramento** |

### Notas de derivação (M3)
- **Aula 1 (sort_order 1):** o .txt diz apenas "Parte 0" mas a descrição é sobre a distinção Claude Code vs claude.ai — adotado como subtítulo derivado.
- **Aula 2 (sort_order 2):** .txt diz "Parte 1" no campo TÍTULO; o slug atual já contém "terminal-nao-e-coisa-de-hacker" — mantido como subtítulo canônico (frase consistente com o conteúdo).
- **Aula 4 (sort_order 4):** .txt diz "Parte 3 | Claude" mas o tema é o arquivo CLAUDE.md (slug atual `claudemd` confirma) — subtítulo canônico `CLAUDE.md`.
- **Aula 7 (sort_order 7):** .txt diz só "Parte 6", mas o .mp4 se chama "Parte 6 | Skills - Hooks - Agents" e a descrição lista os 3 conceitos — subtítulo derivado `Skills, Hooks e Agents`. Slug atual `parte-5-estrutura-base` está claramente quebrado (duplicado/errado) e será corrigido.

---

## Módulo 4 | Centro de Treinamento

| lesson_id | sort_order | title_atual | title_novo | slug_atual | slug_novo |
|---|---|---|---|---|---|
| `fe22e201-e7b6-4a72-9e75-a5071150eb20` | 0 | Arquitetura Mental | **Módulo 4 \| Aula 1 \| Arquitetura Mental** | modulo-4-aula-1-arquitetura-mental | modulo-4-aula-1-arquitetura-mental |
| `c35898b3-8915-4e53-8cdc-03dbefc9f82e` | 1 | Instalação do Centro | **Módulo 4 \| Aula 2 \| Instalação do Centro** | modulo-4-aula-2-instalacao-do-centro | modulo-4-aula-2-instalacao-do-centro |
| `b8eabefe-1998-4347-8e39-6546ce33c569` | 2 | Centro de Comando | **Módulo 4 \| Aula 3 \| Centro de Comando** | modulo-4-aula-3-centro-de-comando | modulo-4-aula-3-centro-de-comando |
| `e401db92-a179-4c6b-8bd8-6c6379bbea03` | 3 | Smart-Memory | **Módulo 4 \| Aula 4 \| Smart-Memory** | modulo-4-aula-4-smart-memory | modulo-4-aula-4-smart-memory |
| `bd64e989-25b4-48a6-8329-ee35a60397db` | 4 | Anatomia de um Squad | **Módulo 4 \| Aula 5 \| Anatomia de um Squad** | modulo-4-aula-5-anatomia-de-um-squad | modulo-4-aula-5-anatomia-de-um-squad |
| `20d09fcc-90c8-4bf0-818f-714e722cb585` | 5 | Os 4 Squads Prontos | **Módulo 4 \| Aula 6 \| Os 4 Squads Prontos** | modulo-4-aula-6-os-4-squads-prontos | modulo-4-aula-6-os-4-squads-prontos |
| `cee27b30-c567-4f86-a8e6-a3b348d68cc8` | 6 | Team-OS | **Módulo 4 \| Aula 7 \| Team-OS** | modulo-4-aula-7-team-os | modulo-4-aula-7-team-os |
| `61b0ed53-be0f-44bf-af2a-c5e17394cf5d` | 7 | Bootstrap Mágico | **Módulo 4 \| Aula 8 \| Bootstrap Mágico** | modulo-4-aula-8-bootstrap-magico | modulo-4-aula-8-bootstrap-magico |
| `e24d6414-8cb8-44a1-819c-94204af9e298` | 8 | Team-OS-Creator | **Módulo 4 \| Aula 9 \| Team-OS-Creator** | modulo-4-aula-9-team-os-creator | modulo-4-aula-9-team-os-creator |
| `cc79a7b7-09e3-4053-8dc5-6d1d779b6026` | 9 | Operação do Zero | **Módulo 4 \| Aula 10 \| Operação do Zero** | modulo-4-aula-10-operacao-do-zero | modulo-4-aula-10-operacao-do-zero |
| `19c872a7-7870-498e-9f73-76ecfd8adbce` | 10 | Regras Invisíveis | **Módulo 4 \| Aula 11 \| Regras Invisíveis** | modulo-4-aula-11-regras-invisiveis | modulo-4-aula-11-regras-invisiveis |
| `014a6ca4-4448-4425-9776-bf7d63914cfe` | 11 | Encerramento | **Módulo 4 \| Aula 12 \| Encerramento** | modulo-4-encerramento | **modulo-4-aula-12-encerramento** |

### Notas de derivação (M4)
- Apenas **título** muda em 11 das 12 aulas (slugs já estão corretos no padrão `modulo-4-aula-N-...`).
- Aula de Encerramento (sort_order 11) é renumerada como **Aula 12** para manter consistência (nenhuma aula sem número). Slug também atualizado.

---

## Módulo 5 | Claude Design

| lesson_id | sort_order | title_atual | title_novo | slug_atual | slug_novo |
|---|---|---|---|---|---|
| `0c96c53a-fd68-4651-bcd4-530d6e3f9bd0` | 0 | Módulo 5 \| Abertura | **Módulo 5 \| Aula 0 \| Abertura** | abertura | **modulo-5-aula-0-abertura** |
| `d81feaa7-4d68-4ff4-a44a-3bfda793efc0` | 1 | Módulo 5 \| Aula 1 \| Diretor de Arte | Módulo 5 \| Aula 1 \| Diretor de Arte | modulo-5-aula-1-diretor-de-arte | modulo-5-aula-1-diretor-de-arte |
| `624ca037-21a4-4bea-a4c7-ea97f8184c79` | 2 | Módulo 5 \| Aula 2 \| Por que Esse Módulo Importa | Módulo 5 \| Aula 2 \| Por que Esse Módulo Importa | modulo-5-aula-2-por-que-esse-modulo-importa | modulo-5-aula-2-por-que-esse-modulo-importa |
| `10aaf3cd-2033-43f1-aaaa-6ca184159c2a` | 3 | Módulo 5 \| Aula 3 \| Lógica de Projetos | Módulo 5 \| Aula 3 \| Lógica de Projetos | modulo-5-aula-3-logica-de-projetos | modulo-5-aula-3-logica-de-projetos |
| `4082dd83-eaa2-49ad-b33d-ebffc6f98313` | 4 | Módulo 5 \| Aula 4 \| Design System | Módulo 5 \| Aula 4 \| Design System | modulo-5-aula-4-design-system | modulo-5-aula-4-design-system |
| `704167d3-3732-42de-b2a6-fe6182bd8b3c` | 5 | Módulo 5 \| Aula 5 \| KV Site | Módulo 5 \| Aula 5 \| KV Site | modulo-5-aula-5-kv-site | modulo-5-aula-5-kv-site |
| `4f30034a-246e-4fb7-b69f-b8354843bc3c` | 6 | Módulo 5 \| Aula 6 \| KV Social | Módulo 5 \| Aula 6 \| KV Social | modulo-5-aula-6-kv-social | modulo-5-aula-6-kv-social |
| `3c8b5423-bbc5-4c52-8ff9-5a184a06237c` | 7 | Módulo 5 \| Aula 7 \| KV Tráfego | Módulo 5 \| Aula 7 \| KV Tráfego | modulo-5-aula-7-kv-trafego | modulo-5-aula-7-kv-trafego |
| `21cdf781-311e-4269-9c8b-1261e0b4532d` | 8 | Módulo 5 \| Aula 8 \| KV Dev | Módulo 5 \| Aula 8 \| KV Dev | modulo-5-aula-8-kv-dev | modulo-5-aula-8-kv-dev |
| `da7e8094-4f02-4efb-84ba-26e5f76c950e` | 9 | Módulo 5 \| Aula 9 \| Handoff pro Claude Code | Módulo 5 \| Aula 9 \| Handoff pro Claude Code | modulo-5-aula-9-handoff-pro-claude-code | modulo-5-aula-9-handoff-pro-claude-code |
| `0b153dd0-7a84-4b82-a355-d46630dd16d7` | 10 | Módulo 5 \| Aula 10 \| Encerramento | Módulo 5 \| Aula 10 \| Encerramento | modulo-5-aula-10-encerramento | modulo-5-aula-10-encerramento |

### Notas de derivação (M5)
- M5 já está praticamente no padrão. Única mudança: **Aula 0 | Abertura** (antes era só "Módulo 5 | Abertura") e slug ajustado de `abertura` → `modulo-5-aula-0-abertura`.

---

## Resumo de mudanças

| Módulo | Total aulas | Títulos a atualizar | Slugs a atualizar |
|---|---|---|---|
| M3 | 10 | 10 (todas) | 10 (todas) |
| M4 | 12 | 12 (todas) | 1 (apenas Encerramento) |
| M5 | 11 | 1 (apenas Abertura) | 1 (apenas Abertura) |
| **TOTAL** | **33** | **23** | **12** |

---

## Conflitos de slug a observar

Em M3 e M5 há slugs simples como `abertura` e `encerramento` que aparecem em múltiplos módulos. A unique constraint do schema deve ser `(module_id, slug)` — verificar antes do UPDATE. Caso o constraint seja global, os novos slugs já resolvem (todos prefixados com `modulo-X-aula-N`).

---

## Próximo passo

sites-data aplica os UPDATEs com base nos `lesson_id` desta tabela. Recomendação: usar transaction única por módulo, com SELECT pós-UPDATE pra confirmar o estado final.
