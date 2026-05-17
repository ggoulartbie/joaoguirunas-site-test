---
title: spec-curso-mentoria-claude-code
type: ux-spec
updated: 2026-05-17
tags: [academy, curso, mentoria, ux, structure]
---

# Spec: Curso "Mentoria Claude Code" — Estrutura e UX

## Visão geral

Curso principal da academy de joaoguirunas.com. 10 módulos temáticos + 2 bônus. Conteúdo em vídeo (Vimeo) com manuais PDF por módulo. Destina-se a empreendedores e profissionais que querem dominar o Claude Code e montar squads de IA.

---

## Estrutura de módulos e aulas

| Módulo | Título | Aulas | Status do conteúdo |
|---|---|---|---|
| 0 | Abertura | ~1 | A produzir |
| 1 | O que é Possível | ~3 | A produzir |
| 2 | Setup | ~4 | A produzir |
| 3 | Fundamentos | 10 | MP4 gravados, .txt prontos |
| 4 | Centro de Treinamento | 12 | .txt prontos (MP4 a gravar/uplodar) |
| 5 | Claude Design | 11 | MP4 gravados, .txt prontos |
| 6 | Squad de Sites | TBD | Roteiro pronto, sem aulas individuais |
| 7 | Squad de Social Media | TBD | A produzir |
| 8 | Squad de DEV | TBD | A produzir |
| 9B | Bônus: Gerenciador de Tarefas | TBD | A produzir |
| 9B | Bônus: Orquestrador Comercial | TBD | A produzir |

Fonte: `docs/mentoria-claude-code/Curso On-line/` (diretórios Módulo X + arquivos .txt de aula)

---

## Módulo 3 — Fundamentos (10 aulas)

| # | Slug | Título |
|---|---|---|
| 1 | m3-abertura | Abertura |
| 2 | m3-parte-0 | Parte 0 |
| 3 | m3-parte-1 | Parte 1 |
| 4 | m3-parte-2-pastas | Pastas |
| 5 | m3-parte-3-claude | Claude |
| 6 | m3-parte-4-comandos-base | Comandos Base |
| 7 | m3-parte-5-como-claude-trabalha | Como Claude Trabalha |
| 8 | m3-parte-6-skills-hooks-agents | Skills, Hooks e Agents |
| 9 | m3-parte-7-pontes-com-o-mundo | Pontes com o Mundo |
| 10 | m3-parte-8-encerramento | Encerramento |

Material de módulo: `manual-m3.pdf`

---

## Módulo 4 — Centro de Treinamento (12 aulas)

| # | Slug | Título |
|---|---|---|
| 1 | m4-arquitetura-mental | Arquitetura Mental |
| 2 | m4-instalacao-do-centro | Instalação do Centro |
| 3 | m4-centro-de-comando | Centro de Comando |
| 4 | m4-smart-memory | Smart-Memory |
| 5 | m4-anatomia-de-um-squad | Anatomia de um Squad |
| 6 | m4-os-4-squads-prontos | Os 4 Squads Prontos |
| 7 | m4-team-os | Team-OS |
| 8 | m4-bootstrap-magico | Bootstrap Mágico |
| 9 | m4-team-os-creator | Team-OS-Creator |
| 10 | m4-operacao-do-zero | Operação do Zero |
| 11 | m4-regras-invisiveis | Regras Invisíveis |
| 12 | m4-encerramento | Encerramento |

Material de módulo: `manual-m4.pdf`

---

## Módulo 5 — Claude Design (11 aulas)

| # | Slug | Título |
|---|---|---|
| 1 | m5-abertura | Abertura |
| 2 | m5-diretor-de-arte | Diretor de Arte |
| 3 | m5-por-que-esse-modulo-importa | Por que Esse Módulo Importa |
| 4 | m5-logica-de-projetos | Lógica de Projetos |
| 5 | m5-design-system | Design System |
| 6 | m5-kv-site | KV Site |
| 7 | m5-kv-social | KV Social |
| 8 | m5-kv-trafego | KV Tráfego |
| 9 | m5-kv-dev | KV Dev |
| 10 | m5-handoff-pro-claude-code | Handoff pro Claude Code |
| 11 | m5-encerramento | Encerramento |

Material de módulo: `manual-m5.pdf`

---

## Integração Vimeo

Campos no banco:
- `lessons.video_id`: ID numérico do vídeo Vimeo (só o número, sem URL)
- `lessons.video_provider`: `"VIMEO"`
- `lessons.kind`: `"VIDEO"`

Env var necessária: `VIMEO_DOMAIN_WHITELIST` com domínio de produção + `localhost`.

---

## Estratégia de release incremental

O sistema suporta `cohort_courses.included_module_ids` para controle granular de acesso. Fluxo sugerido:
1. Lançamento: módulos 0–5 liberados.
2. Expansão semanal/quinzenal: módulos 6, 7, 8 conforme produção.
3. Bônus liberados no final do ciclo.

Alunos veem módulos bloqueados com ícone de cadeado — transparência sem frustração.

---

## Convenções de slug

Padrão: `m{número}-{topico-kebab-case}`

- Estável após publicação — não renomear.
- Sem caracteres especiais ou acentos.
- Usar número do módulo como prefixo para evitar colisões.

---

## Materiais: module_materials vs. materials

| Tabela | Uso | Exemplo |
|---|---|---|
| `module_materials` | Recurso compartilhado por todo o módulo | `manual-m3.pdf` |
| `materials` | Recurso específico de uma aula | template de prompt da aula X |

PDFs dos manuais → `module_materials` (kind: `FILE`, storage bucket `materials`).
Links externos (GitHub, ferramentas) → `module_materials` (kind: `LINK`, campo `external_url`).
