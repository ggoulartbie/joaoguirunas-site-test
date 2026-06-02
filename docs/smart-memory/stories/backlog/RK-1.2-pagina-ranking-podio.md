---
title: "Story RK-1.2: Página /academy/ranking — pódio com tabs (semanal/quinzenal/mensal)"
type: story
status: review
epic: RK
complexity: M
agent: sites-dev-alpha
created: 2026-05-21
updated: 2026-05-21
tags: [story, ranking, ui, pódio, student]
related: [[RK-1.1-server-action-ranking-by-period]]
---

# Story RK-1.2: Página `/academy/ranking` — pódio com tabs

## Objetivo
Entregar a tela pública (para alunos autenticados) `/academy/ranking` exibindo o pódio dos top 5 alunos por aulas concluídas em três janelas (semanal, quinzenal, mensal), consumindo `getRankingByPeriod` da RK-1.1.

## Acceptance Criteria

- [ ] **AC1 (rota + dinâmica):** Existe `src/app/(academy)/academy/(student)/ranking/page.tsx` com `export const dynamic = 'force-dynamic'` no topo. Página acessível em `/academy/ranking` para qualquer aluno autenticado; anônimo é redirecionado a `/academy/login` (via `requireUser()` indireto pela action).
- [ ] **AC2 (server fetch inicial):** A page é Server Component e pré-carrega o período padrão `week` chamando `getRankingByPeriod('week')`. Os três períodos podem ser pré-carregados em paralelo via `Promise.all` para evitar flash nas trocas de tab.
- [ ] **AC3 (tabs):** Existe um Client Component (ex. `src/components/student/RankingTabs.tsx`) que recebe as três listas pré-carregadas como prop e renderiza tabs `Semanal | Quinzenal | Mensal`. Tab ativa por padrão: `Semanal`. Troca de tab acontece sem nova requisição (já vem pré-carregada).
- [ ] **AC4 (pódio top 5):** Para a tab ativa, renderiza componente `Podium` (`src/components/student/Podium.tsx`) com:
  - 1º lugar destacado (maior, ícone/coroa, badge "1º");
  - 2º e 3º lugares ao lado (médios);
  - 4º e 5º lugares como linhas/cards menores abaixo do trio.
  - Cada entrada mostra `displayName`, avatar (`avatarUrl` ou placeholder com inicial), `lessonsCompleted` (com sufixo "aulas") e `rank`.
- [ ] **AC5 (sem PII):** A UI **nunca** exibe email. Mostra somente `displayName` (primeiro nome) e avatar. Quando `displayName === 'Aluno'`, renderiza assim (não tenta fallback de email).
- [ ] **AC6 (estado vazio):** Quando uma tab retorna `[]`, exibe estado vazio amigável (ex.: "Ainda não há ranking neste período — comece a concluir aulas para aparecer aqui."). Não quebra o layout das outras tabs.
- [ ] **AC7 (menos de 5 alunos):** Quando a lista tem 1–4 entradas, o pódio se adapta (não renderiza slots vazios). Mínimo: 1 entrada renderiza só o 1º.
- [ ] **AC8 (navegação):** `RankingTabs` é o ÚNICO Client Component novo necessário. `Podium` pode ser Server Component (recebe array como prop).
- [ ] **AC9 (entrada no menu):** Adicionar item de navegação `{ href: '/academy/ranking', label: 'Ranking', icon: Trophy }` em `src/components/student/StudentSidebar.tsx` (lista `navItems`) e em `src/components/student/StudentTopBar.tsx` (mapa de labels por path). Inserir entre "Meus Cursos" e "Fórum".
- [ ] **AC10 (metadata):** `export const metadata: Metadata = { title: 'Ranking' }`. Resultado final no `<title>` deve ser `Ranking | Área do Aluno` (template do layout).
- [ ] **AC11 (a11y):** Tabs implementam padrão ARIA (`role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, navegação por setas). Avatares têm `alt` (`displayName` ou "Avatar do aluno"). Lista do pódio é semântica (`<ol>` ou cards com `aria-label`).
- [ ] **AC12 (responsivo):** Layout funciona em mobile (≤640px) — pódio empilha verticalmente. Em desktop (≥768px) o pódio é horizontal (2º | 1º | 3º) e 4º/5º ficam abaixo.
- [ ] **AC13 (build):** `pnpm build` passa sem erros novos.

## Escopo

**IN:**
- `src/app/(academy)/academy/(student)/ranking/page.tsx` (Server Component, `force-dynamic`).
- `src/components/student/RankingTabs.tsx` (Client Component — `'use client'`).
- `src/components/student/Podium.tsx` (Server Component aceitando `entries: RankingEntry[]`).
- Entrada de navegação em `StudentSidebar.tsx` e label em `StudentTopBar.tsx`.
- Avatar fallback (inicial em círculo com cor de marca) quando `avatarUrl` é null.

**OUT:**
- Atalhos de ranking no Dashboard (out — pode virar story futura).
- Filtros por curso/módulo (out — toda base agregada, conforme RK-1.1).
- Notificações de mudança de posição.
- Animações de transição entre tabs (CSS transform básico ok; sem libs novas).
- Histórico de rankings passados / persistência semanal.
- Mostrar a própria posição do usuário fora do top 5 ("você está em #42").

## Contexto Técnico

**Dependências:**
- [[RK-1.1-server-action-ranking-by-period]] precisa estar em `done` (action `getRankingByPeriod` exportada com types `RankingPeriod` e `RankingEntry`).

**Padrões do projeto:**
- Páginas que tocam `supabaseAdmin` precisam `force-dynamic` (memory `supabase_admin_proxy_build`).
- Layout de student já em `src/app/(academy)/academy/(student)/layout.tsx` envolve a página com `StudentShell` (sidebar + topbar). Não precisa duplicar.
- Navegação adicionada centralmente em `StudentSidebar.navItems` e `StudentTopBar` page-title map.
- Ícones via `lucide-react` (já usado em todo lado). `Trophy` é o ícone natural para Ranking.
- Não há `Tabs` no `src/shared/components/ui/` — implementação de tabs manual com `useState` + ARIA, sem instalar deps novas.

**Sketch da page (não normativo):**
```tsx
export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { getRankingByPeriod } from '@/app/actions/ranking'
import { RankingTabs } from '@/components/student/RankingTabs'

export const metadata: Metadata = { title: 'Ranking' }

export default async function RankingPage() {
  const [week, biweek, month] = await Promise.all([
    getRankingByPeriod('week'),
    getRankingByPeriod('biweek'),
    getRankingByPeriod('month'),
  ])

  return (
    <main id="main-content" className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Ranking</h1>
        <p className="text-sm text-muted-foreground">
          Os alunos com mais aulas concluídas em cada período.
        </p>
      </header>
      <RankingTabs week={week} biweek={biweek} month={month} />
    </main>
  )
}
```

**Decisões arquiteturais:**
- Pré-carregar as três listas no server elimina o flash entre tabs e mantém a página 100% server-driven do ponto de vista de dados. Custo: 3 queries por render (≤ 50ms cada — agregação leve).
- Tabs como Client Component focado APENAS em UI state. `Podium` permanece Server Component — não precisa de hooks.
- Adicionar o link na sidebar coloca o ranking no fluxo natural do aluno (logo após "Meus Cursos") sem exigir descoberta.
- Avatar fallback: inicial em círculo (`displayName[0]?.toUpperCase()`) — padrão já usado em `StudentLayout` (`userInitials`).

**Anti-recorrência:**
- AC1 reforça `force-dynamic` explicitamente (project memory: build quebra em rotas que tocam `supabaseAdmin` sem essa diretiva).
- AC5 reforça "nunca email" no payload da UI — defesa em profundidade. Se a RK-1.1 regredir, a UI ainda não exibe email porque consome apenas `displayName`.
- AC11 (a11y) embute padrão ARIA para tabs — evita débito futuro.

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
