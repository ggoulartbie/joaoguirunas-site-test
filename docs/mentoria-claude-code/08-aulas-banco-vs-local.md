---
title: "MC-1.1: Mapeamento banco vs local — M3 e M5"
created: 2026-05-17
status: done
---

# MC-1.1: Audit banco vs conteúdo local

## Resumo Executivo
<!-- Zaelion (sites-architect) — 2026-05-17 -->

**Status:** Audit concluído. 20 aulas mapeadas com confiança total para UPDATE em MC-1.2. 1 gap local→banco identificado (será tratado em MC-2.x).

### Contagens

| Métrica | Módulo 3 | Módulo 5 | Total |
|---|---|---|---|
| Aulas ativas no banco | 10 | 10 | **20** |
| Arquivos locais (.txt) | 10 | 11 | **21** |
| Matches confirmados (UPDATE-ready) | 10 | 10 | **20** |
| Gaps banco → local (aula sem arquivo) | 0 | 0 | **0** |
| Gaps local → banco (arquivo sem aula) | 0 | 1 | **1** |
| Títulos divergentes (a corrigir em MC-1.2) | 9 | 1 | **10** |

### Recomendação Final

- **MC-1.2 (próxima):** aplicar UPDATE de `title` + `description` nos 20 lesson_ids listados abaixo. Fonte canônica do conteúdo: arquivos `.txt` locais. Em M5, todos os `description` estão vazios; o UPDATE preenche-os pela primeira vez. Em M3, descriptions curtas serão sobrescritas por versões mais ricas.
- **MC-1.3:** preencher `video_id` Vimeo nos 10 registros do M5 (atualmente `null`). M3 já tem todos os `video_id` preenchidos e **não devem ser tocados** em MC-1.2.
- **MC-2.1 (fora do sprint atual):** INSERT da aula "Módulo 5 | Aula 8 | KV Dev" (~12 min, conteúdo de alto valor) + reordenação do `sort_order` das duas últimas aulas do M5 (handoff e encerramento passam de 8→9 e 9→10). Slug atual `modulo-5-aula-9-handoff-pro-claude-code` em sort_order=8 evidencia que o INSERT original foi feito com erro de numeração.

### IDs confirmados para MC-1.2 (20 UUIDs)

**Módulo 3:**
- `9828e194-3939-4c9e-bb45-7aece7630179` sort=0 Abertura
- `d75d8c77-2460-4a61-ac67-556bad59f3bf` sort=1 Parte 0
- `d467883b-09ce-41a7-9d8e-69014f3e2e37` sort=2 Parte 1
- `ce149f3e-3d47-47c2-b0f7-022697857a1d` sort=3 Parte 2 Pastas
- `bf67b516-0f31-4533-b616-10539585b341` sort=4 Parte 3 Claude.md
- `5a7f1925-423e-4f35-a4d1-0b0f1e90dbd7` sort=5 Parte 4
- `a159c7c2-7d0d-454b-a38e-024dad9da506` sort=6 Parte 5
- `373fbd8a-c45c-4775-b925-2aec9070b717` sort=7 Parte 6
- `55646f1d-37b3-4b6b-a664-536592af1638` sort=8 Parte 7
- `8609781b-cce1-493e-bf78-5236116b8e54` sort=9 Encerramento

**Módulo 5:**
- `0c96c53a-fd68-4651-bcd4-530d6e3f9bd0` sort=0 Abertura
- `d81feaa7-4d68-4ff4-a44a-3bfda793efc0` sort=1 Aula 1 Diretor de Arte
- `624ca037-21a4-4bea-a4c7-ea97f8184c79` sort=2 Aula 2 Por que Esse Módulo Importa
- `10aaf3cd-2033-43f1-aaaa-6ca184159c2a` sort=3 Aula 3 Lógica de Projetos
- `4082dd83-eaa2-49ad-b33d-ebffc6f98313` sort=4 Aula 4 Design System
- `704167d3-3732-42de-b2a6-fe6182bd8b3c` sort=5 Aula 5 KV Site
- `4f30034a-246e-4fb7-b69f-b8354843bc3c` sort=6 Aula 6 KV Social
- `3c8b5423-bbc5-4c52-8ff9-5a184a06237c` sort=7 Aula 7 KV Tráfego
- `da7e8094-4f02-4efb-84ba-26e5f76c950e` sort=8 Aula 9 Handoff pro Claude Code
- `0b153dd0-7a84-4b82-a355-d46630dd16d7` sort=9 Aula 10 Encerramento

---

## Snapshot do Banco
<!-- Bythelion (sites-data) — 2026-05-17 -->

### Módulo 3 | Fundamentos (UUID: `3901d7a4-7373-4a22-8fcc-f5f6035d3c91`)

| lesson_id | module_slug | sort_order | slug | title | video_id | description_len | summary_len |
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

### Módulo 5 | Claude Design (UUID: `fe6bcf96-96a5-477a-bc40-95188f22b21d`)

| lesson_id | module_slug | sort_order | slug | title | video_id | description_len | summary_len |
|---|---|---|---|---|---|---|---|
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

**Nota:** M5 tem `video_id = null` em todas as aulas — aguarda MC-1.3.

---

## Inventário Local
<!-- Lyrel (sites-analyst) — 2026-05-17 -->

### Módulo 3 | Fundamentos (10 arquivos)

| # | Arquivo | Título extraído | Duração | Descrição (200 chars) |
|---|---|---|---|---|
| 0 | Módulo 3 \| Abertura.txt | Módulo 3 \| Abertura | ~1 min | Bem-vindo ao Módulo 3 da mentoria de Claude Code. Nessa abertura, posicionamos este módulo como o chão de tudo que vem pela frente. |
| 1 | Módulo 3 \| Parte 0.txt | Módulo 3 \| Parte 0 | ~4 min | A primeira distinção que muda tudo: Claude Code não é o claude.ai. Nesta aula você entende a diferença fundamental entre o claude.ai |
| 2 | Módulo 3 \| Parte 1.txt | Módulo 3 \| Parte 1 | ~5 min | Terminal não é coisa de hacker. É só uma forma diferente de conversar com o computador. Nesta aula desmistificamos o terminal para q |
| 3 | Módulo 3 \| Parte 2 \| Pastas.txt | Módulo 3 \| Parte 2 \| Pastas | ~4 min | Quando você abre o Claude Code dentro de uma pasta, aquela pasta vira o universo dele. Esse conceito muda a forma como você organiza |
| 4 | Módulo 3 \| Parte 3 \| Claude.txt | Módulo 3 \| Parte 3 \| Claude | ~8 min | O CLAUDE.md é a coisa mais importante desta aula. É um arquivo de texto que você coloca dentro da pasta do projeto. Toda vez que o C |
| 5 | Módulo 3 \| Parte 4.txt | Módulo 3 \| Parte 4 | ~7 min | Com esses 5 comandos você resolve 95% do que vai precisar no Claude Code. Diferente dos comandos do terminal, esses começam com barr |
| 6 | Módulo 3 \| Parte 5.txt | Módulo 3 \| Parte 5 | ~5 min | Entender como o Claude pensa quando está trabalhando economiza muita frustração. Quando você pede algo ao Claude Code, ele entra em u |
| 7 | Módulo 3 \| Parte 6.txt | Módulo 3 \| Parte 6 | ~7 min | Três conceitos que aparecem em todo o restante da mentoria — vale conhecer agora para reconhecer quando aparecerem. Esta aula aprese |
| 8 | Módulo 3 \| Parte 7.txt | Módulo 3 \| Parte 7 | ~7 min | O Claude sozinho é poderoso. O Claude conectado às ferramentas que você já usa — CRM, Gmail, Google Drive, Notion, Slack, Stripe — v |
| 9 | Módulo 3 \| Parte 8 \| Encerramento.txt | Módulo 3 \| Parte 8 \| Encerramento | ~3 min | Chegamos ao fim do Módulo 3. Para fechar, três hábitos práticos que valem incorporar a partir de amanhã: Hábito 1: uma pasta por pr |

### Módulo 5 | Claude Design (11 arquivos)

| # | Arquivo | Título extraído | Duração | Descrição (200 chars) |
|---|---|---|---|---|
| 0 | Módulo 5 \| Abertura.txt | Módulo 5 \| Abertura | ~30 seg | Bem-vindo ao Módulo 5 — onde a operação que você montou nos módulos anteriores ganha cara. Ganha identidade visual. Ganha o que o cl |
| 1 | Módulo 5 \| Aula 1 \| Diretor de Arte.txt | Módulo 5 \| Aula 1 \| Diretor de Arte | ~7 min | Antes de falar o que é Claude Design, vamos olhar o que você teria que pagar para ter isso feito numa agência séria. Os preços de me |
| 2 | Módulo 5 \| Aula 2 \| Por que Esse Módulo Importa.txt | Módulo 5 \| Aula 2 \| Por que Esse Módulo Importa | ~3 min | Recap rápido do Módulo 4: você saiu de lá com a operação inteira da empresa estruturada em squads de IA. Cada área tem sua pasta, eq |
| 3 | Módulo 5 \| Aula 3 \| Lógica de Projetos.txt | Módulo 5 \| Aula 3 \| Lógica de Projetos | ~4 min | A lógica que sustenta todo o módulo: cada saída visual da empresa vira um projeto separado no Claude Design — mas existe um projeto q |
| 4 | Módulo 5 \| Aula 4 \| Design System.txt | Módulo 5 \| Aula 4 \| Design System | ~8 min | A parte prática começa aqui. O Design System tem tela nativa de setup no Claude Design — não é prompt corrido, é formulário estrutur |
| 5 | Módulo 5 \| Aula 5 \| KV Site.txt | Módulo 5 \| Aula 5 \| KV Site | ~10 min | Primeiro KV: o do site. Projeto novo no Claude Design, referenciando o Design System base. O que é específico de web (além do Design |
| 6 | Módulo 5 \| Aula 6 \| KV Social.txt | Módulo 5 \| Aula 6 \| KV Social | ~10 min | Segundo KV: social media. Regras próprias que web não tem. O que é específico de social: Decisão visual em 3 segundos — o scroll do |
| 7 | Módulo 5 \| Aula 7 \| KV Tráfego.txt | Módulo 5 \| Aula 7 \| KV Tráfego | ~10 min | Terceiro KV: criativos de anúncios pagos. As regras mais distintas de todos os canais. O que é específico de tráfego pago: Os prime |
| 8 | Módulo 5 \| Aula 8 \| KV Dev.txt | Módulo 5 \| Aula 8 \| KV Dev | ~12 min | Quarto KV: design system de aplicativo. O conjunto de regras mais distinto de todos. O que é específico de app: A tela é pequena, o |
| 9 | Módulo 5 \| Aula 9 \| Handoff pro Claude Code.txt | Módulo 5 \| Aula 9 \| Handoff pro Claude Code | ~6 min | A parte que diferencia Claude Design de Figma, Canva ou qualquer outra ferramenta de design. O handoff direto para o Claude Code. C |
| 10 | Módulo 5 \| Aula 10 \| Encerramento.txt | Módulo 5 \| Aula 10 \| Encerramento | ~4 min | Fechamento do Módulo 5 com a conta final, os hábitos e o gancho para os próximos módulos. A conta do que foi internalizado nesse mód |

---

## Mapeamento banco → arquivo local
<!-- Bythelion (sites-data) — 2026-05-17 -->

### Módulo 3

| lesson_id (banco) | sort_order | title (banco) | arquivo local | title (local) | acao |
|---|---|---|---|---|---|
| `9828e194-3939-4c9e-bb45-7aece7630179` | 0 | Abertura | Módulo 3 \| Abertura.txt | Módulo 3 \| Abertura | UPDATE |
| `d75d8c77-2460-4a61-ac67-556bad59f3bf` | 1 | 0 \| Claude Code não é o claude.ai | Módulo 3 \| Parte 0.txt | Módulo 3 \| Parte 0 | UPDATE (title diverge — usar arquivo) |
| `d467883b-09ce-41a7-9d8e-69014f3e2e37` | 2 | 1 \| Terminal não é coisa de hacker | Módulo 3 \| Parte 1.txt | Módulo 3 \| Parte 1 | UPDATE (title diverge — usar arquivo) |
| `ce149f3e-3d47-47c2-b0f7-022697857a1d` | 3 | 2 \| Pastas | Módulo 3 \| Parte 2 \| Pastas.txt | Módulo 3 \| Parte 2 \| Pastas | UPDATE (title diverge — usar arquivo) |
| `bf67b516-0f31-4533-b616-10539585b341` | 4 | 3 \| Claude.md | Módulo 3 \| Parte 3 \| Claude.txt | Módulo 3 \| Parte 3 \| Claude | UPDATE (title diverge — usar arquivo) |
| `5a7f1925-423e-4f35-a4d1-0b0f1e90dbd7` | 5 | 4 \| Comandos Base | Módulo 3 \| Parte 4.txt | Módulo 3 \| Parte 4 | UPDATE (title diverge — usar arquivo) |
| `a159c7c2-7d0d-454b-a38e-024dad9da506` | 6 | 5 \| Como Claude Trabalha | Módulo 3 \| Parte 5.txt | Módulo 3 \| Parte 5 | UPDATE (title diverge — usar arquivo) |
| `373fbd8a-c45c-4775-b925-2aec9070b717` | 7 | 6 \| Estrutura Base | Módulo 3 \| Parte 6.txt | Módulo 3 \| Parte 6 | UPDATE (title diverge — usar arquivo) |
| `55646f1d-37b3-4b6b-a664-536592af1638` | 8 | 7 \| Pontes com o Mundo | Módulo 3 \| Parte 7.txt | Módulo 3 \| Parte 7 | UPDATE (title diverge — usar arquivo) |
| `8609781b-cce1-493e-bf78-5236116b8e54` | 9 | Encerramento | Módulo 3 \| Parte 8 \| Encerramento.txt | Módulo 3 \| Parte 8 \| Encerramento | UPDATE (title diverge — usar arquivo) |

**Observação M3:** Todos os titles do banco usam formato curto (ex: "0 | Claude Code não é o claude.ai"), enquanto o arquivo local usa "Módulo 3 | Parte 0". A fonte canônica é o arquivo local — a migration atualizará todos os títulos para o formato do arquivo.

### Módulo 5

| lesson_id (banco) | sort_order | title (banco) | arquivo local | title (local) | acao |
|---|---|---|---|---|---|
| `0c96c53a-fd68-4651-bcd4-530d6e3f9bd0` | 0 | Abertura | Módulo 5 \| Abertura.txt | Módulo 5 \| Abertura | UPDATE |
| `d81feaa7-4d68-4ff4-a44a-3bfda793efc0` | 1 | Módulo 5 \| Aula 1 \| Diretor de Arte | Módulo 5 \| Aula 1 \| Diretor de Arte.txt | Módulo 5 \| Aula 1 \| Diretor de Arte | UPDATE (description vazio no banco) |
| `624ca037-21a4-4bea-a4c7-ea97f8184c79` | 2 | Módulo 5 \| Aula 2 \| Por que Esse Módulo Importa | Módulo 5 \| Aula 2 \| Por que Esse Módulo Importa.txt | Módulo 5 \| Aula 2 \| Por que Esse Módulo Importa | UPDATE (description vazio no banco) |
| `10aaf3cd-2033-43f1-aaaa-6ca184159c2a` | 3 | Módulo 5 \| Aula 3 \| Lógica de Projetos | Módulo 5 \| Aula 3 \| Lógica de Projetos.txt | Módulo 5 \| Aula 3 \| Lógica de Projetos | UPDATE (description vazio no banco) |
| `4082dd83-eaa2-49ad-b33d-ebffc6f98313` | 4 | Módulo 5 \| Aula 4 \| Design System | Módulo 5 \| Aula 4 \| Design System.txt | Módulo 5 \| Aula 4 \| Design System | UPDATE (description vazio no banco) |
| `704167d3-3732-42de-b2a6-fe6182bd8b3c` | 5 | Módulo 5 \| Aula 5 \| KV Site | Módulo 5 \| Aula 5 \| KV Site.txt | Módulo 5 \| Aula 5 \| KV Site | UPDATE (description vazio no banco) |
| `4f30034a-246e-4fb7-b69f-b8354843bc3c` | 6 | Módulo 5 \| Aula 6 \| KV Social | Módulo 5 \| Aula 6 \| KV Social.txt | Módulo 5 \| Aula 6 \| KV Social | UPDATE (description vazio no banco) |
| `3c8b5423-bbc5-4c52-8ff9-5a184a06237c` | 7 | Módulo 5 \| Aula 7 \| KV Tráfego | Módulo 5 \| Aula 7 \| KV Tráfego.txt | Módulo 5 \| Aula 7 \| KV Tráfego | UPDATE (description vazio no banco) |
| `da7e8094-4f02-4efb-84ba-26e5f76c950e` | 8 | Módulo 5 \| Aula 9 \| Handoff pro Claude Code | Módulo 5 \| Aula 9 \| Handoff pro Claude Code.txt | Módulo 5 \| Aula 9 \| Handoff pro Claude Code | UPDATE (description vazio, title diverge de sort_order) |
| `0b153dd0-7a84-4b82-a355-d46630dd16d7` | 9 | Módulo 5 \| Aula 10 \| Encerramento | Módulo 5 \| Aula 10 \| Encerramento.txt | Módulo 5 \| Aula 10 \| Encerramento | UPDATE (description vazio no banco) |

---

## Gap Report
<!-- Bythelion (sites-data) — 2026-05-17 -->

### Aulas no banco SEM arquivo local

**Módulo 3:** Nenhum gap.

**Módulo 5:** Nenhum gap (todos os 10 registros do banco têm arquivo correspondente).

### Arquivos locais SEM aula no banco

| Módulo | Arquivo | Título | Recomendação |
|---|---|---|---|
| M5 | Módulo 5 \| Aula 8 \| KV Dev.txt | Módulo 5 \| Aula 8 \| KV Dev | INSERT em MC-2.x — aula completa (12 min), conteúdo de valor alto. Não descartar. |

**Contexto:** O banco M5 pula do sort_order 7 (KV Tráfego) diretamente para sort_order 8 com slug `modulo-5-aula-9-handoff-pro-claude-code`. A "Aula 8 | KV Dev" nunca foi inserida. O slug incorreto (aula-9 em sort_order=8) indica que o INSERT foi feito manualmente com erro de numeração. A correção é: criar a aula KV Dev com sort_order=8, e atualizar o sort_order das duas últimas aulas.

**Decisão recomendada:** Abrir MC-2.1 para o INSERT + reordenação do sort_order M5. Fora do escopo desta sprint.

### Títulos divergentes banco → arquivo (decisão)

**Módulo 3 — todos os 8 registros com sort_order 1-8 têm título divergente:**
- Banco usa formato curto: `"0 | Claude Code não é o claude.ai"`
- Arquivo usa formato canônico: `"Módulo 3 | Parte 0"`
- **Decisão:** usar título do arquivo (fonte canônica). A migration atualizará todos.

**Módulo 5 sort_order=0 (Abertura):**
- Banco: `"Abertura"` | Arquivo: `"Módulo 5 | Abertura"`
- **Decisão:** UPDATE para `"Módulo 5 | Abertura"` (consistente com o padrão do módulo).

---

## Notas técnicas

- **M3 `video_id`:** todos preenchidos (Vimeo IDs). Não alterar em MC-1.2.
- **M5 `video_id`:** todos `null`. Será preenchido em MC-1.3.
- **M3 `description_len` > 0:** M3 já tem descriptions curtas no banco (51-561 chars). A migration irá sobrescrever com o conteúdo completo do arquivo local, que é mais rico.
- **Anti-recorrência:** todas as queries filtradas com `deleted_at IS NULL` em módulo e lição.
