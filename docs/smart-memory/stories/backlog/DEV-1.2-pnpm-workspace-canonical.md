---
title: "Story DEV-1.2: Corrigir pnpm-workspace.yaml — chave onlyBuiltDependencies"
type: story
status: backlog
epic: DEV-1
complexity: S
agent: sites-devops
created: 2026-05-16
updated: 2026-05-16
tags: [story, devops, pnpm, build]
related: [DEV-1.1]
---

# Story DEV-1.2: Corrigir pnpm-workspace.yaml — chave onlyBuiltDependencies

## Objetivo
Substituir a chave inválida `allowBuilds` por `onlyBuiltDependencies` (lista) no `pnpm-workspace.yaml` para que scripts de build de pacotes nativos (sharp, esbuild, sentry-cli, tsparticles) sejam executados no pnpm v10.

## Acceptance Criteria
- [ ] AC1: `pnpm-workspace.yaml` usa `onlyBuiltDependencies` em formato lista
- [ ] AC2: `pnpm install` gera `node_modules/sharp/build/Release/sharp-linux-x64.node` (ou equivalente da plataforma)
- [ ] AC3: Build Vercel não falha por sharp ausente
- [ ] AC4: Chave `allowBuilds` removida completamente

## Escopo

**IN:**
- `pnpm-workspace.yaml`

**OUT:**
- `package.json`
- Qualquer lockfile (não regenerar sem necessidade)

## Contexto Técnico
sites-qa identificou (C-002) que `allowBuilds: true` não é chave canônica do pnpm v10/11 — `sharp.node` ausente após install. A chave correta é `onlyBuiltDependencies` como lista de pacotes permitidos. Pré-existente ao sprint de server-restart. Documentado em memory `project_vercel_pnpm_v10`. Verificar lista atual de pacotes que precisam build: sharp, esbuild, sentry-cli, tsparticles.

Formato correto:
```yaml
onlyBuiltDependencies:
  - sharp
  - esbuild
  - "@sentry/cli"
  - tsparticles
```

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
