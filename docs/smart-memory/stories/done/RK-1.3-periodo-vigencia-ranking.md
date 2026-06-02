---
title: "Story RK-1.3: Exibir período de vigência no pódio do ranking"
type: story
status: done
epic: RK
complexity: S
agent: sites-dev-alpha
created: 2026-05-22
updated: 2026-05-22
tags: [story, ranking, ui, período]
related: [[RK-1.1-server-action-ranking-by-period]], [[RK-1.2-pagina-ranking-podio]]
---

# Story RK-1.3: Exibir período de vigência no pódio do ranking

## Objetivo
Mostrar ao aluno o intervalo de datas (de/até) do período ativo logo abaixo das tabs do ranking, para que saiba exatamente qual janela de tempo está sendo analisada.

## Acceptance Criteria

- [ ] **AC1 (intervalo visível):** Logo abaixo da linha de tabs (acima do pódio), exibir texto no formato `De DD/MM/YYYY até DD/MM/YYYY` (ambas as datas, sem "hoje"). Data final = data atual (hoje); data inicial = hoje − N dias (7/15/30 conforme tab ativa).
- [ ] **AC2 (reativo à tab):** Ao trocar de tab, o intervalo atualiza instantaneamente (sem nova requisição — é computado client-side a partir da data atual).
- [ ] **AC3 (localização pt-BR):** Datas formatadas em pt-BR com `Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })`. Resultado esperado para hoje (2026-05-22) com period=week: `"De 15/05/2026 até 22/05/2026"`.
- [ ] **AC4 (estilo discreto):** Texto em `text-xs` / `text-muted-foreground` (ou equivalente no design system), centralizado ou alinhado à esquerda, consistente com o visual minimalista já existente no componente.
- [ ] **AC5 (implementação local):** A lógica de cálculo vive em `RankingTabs.tsx`. Não alterar `ranking.ts` (server action) nem `Podium.tsx`. Criar constante local `DAYS_BY_PERIOD` (pode duplicar a da action — são 3 linhas).
- [ ] **AC6 (build):** `pnpm build` passa sem erros novos.

## Escopo

**IN:**
- Modificação de `src/components/student/RankingTabs.tsx` — adicionar cálculo de intervalo e renderizá-lo entre `tablist` e `tabpanel`.

**OUT:**
- Alterações em `ranking.ts`, `Podium.tsx`, ou qualquer outro arquivo.
- Internacionalização além de pt-BR.
- Lógica de calendário (semana iso, início de mês) — usar rolling `now - N dias` igual à action.

## Contexto Técnico

**Arquivo alvo:** `src/components/student/RankingTabs.tsx`
- É Client Component (`'use client'`).
- Já possui `const [active, setActive] = useState<Period>('week')`.
- A troca de tab é `setActive(TABS[next].id)` — o intervalo precisa derivar de `active`.

**Cálculo do intervalo (não normativo):**
```ts
const DAYS_BY_PERIOD: Record<Period, number> = { week: 7, biweek: 15, month: 30 }

function formatRange(period: Period): string {
  const fmt = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const now = new Date()
  const since = new Date(now.getTime() - DAYS_BY_PERIOD[period] * 24 * 60 * 60 * 1000)
  return `De ${fmt.format(since)} até ${fmt.format(now)}`
}
```

**Posição no JSX:** entre o `<div role="tablist">` e o bloco de `{TABS.map(({ id }) => (<div role="tabpanel" ...>))}`.

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | — |
| Iniciado   | — |
| Concluído  | — |
| Branch     | feat/rk-ranking-progresso |

## File List
- `src/components/student/RankingTabs.tsx`

## QA Results
<!-- QA preenche ao revisar -->
