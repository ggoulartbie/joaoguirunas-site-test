---
title: "QA Verdict — Fase de Diagnóstico — Epic Estabilização do Servidor"
type: qa-verdict
status: issued
agent: sites-qa
created: 2026-05-16
updated: 2026-05-16
tags: [qa, verdict, performance, diagnosis, server-stability]
related:
  - "[[server-perf-qa-criteria]]"
  - "[[../research/server-perf-analysis]]"
  - "[[../research/frontend-bundle-audit]]"
  - "[[../hardening/server-perf-hardening]]"
  - "[[../research/backend-perf-audit]]"
  - "[[results]]"
---

# QA Verdict — Fase de Diagnóstico — Epic Estabilização do Servidor

**Emitido por:** Axilun (sites-qa)
**Data:** 2026-05-16
**Branch:** `feat-aulas-v2`
**Escopo:** Diagnóstico (não correções). Avaliar qualidade dos 4 relatórios e classificar achados em bloqueantes vs. paralelos para iniciar a fase de fixes.

---

## VEREDICTO

```
VEREDICTO: ⚠️ CONCERNS

Fase de diagnóstico aceita com observações.

Cobertura dos relatórios: 4/4 agentes entregaram (analyst, dev-alpha, dev-delta, dev-beta).
Mapeamento dos achados contra os ACs do meu documento de critérios: completo.
Bloqueio identificado para iniciar fixes: nenhum — diagnóstico é suficiente.

Observações (não bloqueiam início dos fixes, mas precisam ser conhecidas pelo time):
- [CONCERN-1] Relatório do sites-dev-alpha afirma que `@splinetool` NÃO está em uso
  no código (linha 16 e 44 do frontend-bundle-audit.md). Verificação direta no repo
  contradiz: `src/shared/components/ui/SplineScene.tsx` e
  `src/app/mentoria/_components/MentoriaHeroSpline.tsx` existem e usam a lib via
  React.lazy. Os relatórios do analyst (CRÍTICO-2) e do dev-delta (C3) cobrem esse
  caso corretamente. Não há perda de cobertura, mas o relatório do alpha precisa
  ser corrigido antes que vire fonte de decisão sobre remover `@splinetool` do
  package.json (Fix #3 dele — se executado cego, quebraria /mentoria).
- [CONCERN-2] Achado "Middleware query de profiles em TODA request /academy/**"
  (dev-beta) é real, mas a memória `project_supabase_admin_proxy_build` e a inspeção
  do matcher mostram que o middleware **não** roda em rotas institucionais
  (/, /mentoria, /agentes). O escopo do AC-BE-3 fica atendido por construção (matcher
  positivo, não negativo). O problema real está em a query rodar mesmo em rotas
  internas de baixo valor (API webhooks, assets dentro de /academy) — fix proposto
  do dev-beta (cookie assinado / JWT claim) continua válido, mas o framing
  "TODA request" subestima o matcher.
- [CONCERN-3] Issue "Three.js sem dispose()" (dev-delta A5) é real para a área
  /agentes, mas o impacto descrito ("crash de tab em sessões longas") só ocorre se
  o aluno navegar entre múltiplas páginas de agentes sem hard-reload. Hoje a área
  /agentes é institucional, baixo volume — fix é boa prática mas não é P0 da fase
  de estabilização do servidor (é P1 client-side).

Próximo passo: @lead aprovar plano de fixes priorizado abaixo e atribuir
sites-dev-alpha (frontend) + sites-dev-beta (backend) para execução em paralelo.
sites-qa volta ao ciclo após os diffs estarem prontos para emitir veredicto final
de fixes (esse será PASS/CONCERNS/FAIL contra `server-perf-qa-criteria.md`).

Sem push para origin/main, sem deploy, sem nada autorizado sem confirmação
explícita do João.
```

---

## 1. Qualidade dos Relatórios — Avaliação Individual

| Agente | Relatório | Cobertura | Profundidade | Acurácia | Score |
|---|---|---|---|---|---|
| sites-analyst (Lyrel) | `agents/research/server-perf-analysis.md` | 7 findings (3 críticos, 2 altos, 3 médios) com tabela de impacto e quick wins | Mede tamanhos em disco + estima gzip + identifica rotas afetadas | Validada em todos os arquivos citados | ✅ Excelente |
| sites-dev-alpha (Novael) | `agents/research/frontend-bundle-audit.md` | 5 libs auditadas, 3 fixes propostos com diffs prontos | Tabela de impacto + cadeia de imports + diffs concretos | ❌ **Erro factual em Spline**: diz "NÃO ENCONTRADO" mas a lib é usada em 2 arquivos. Restante OK | ⚠️ Bom com correção necessária |
| sites-dev-delta (Kronilux) | `agents/hardening/server-perf-hardening.md` | 12 findings (3C/5A/4M) cobrindo resiliência, leaks e error boundaries | Mindset adversarial, fixes com código pronto para C1-C3 | Validada — todos os arquivos citados existem e padrões confirmados | ✅ Excelente |
| sites-dev-beta (Rexali) | `agents/research/backend-perf-audit.md` | 14 problemas com severidade, top 3 quick wins, seção "o que está bem" | Tabela cobre revalidatePath, N+1 cron, listUsers, Sentry, Select * | ⚠️ Framing "TODA request" do middleware é impreciso (matcher é positivo) | ✅ Bom |

**Consolidado:** Diagnóstico é **suficientemente robusto** para iniciar fase de fixes. Cobertura cruzada entre os 4 relatórios elimina pontos cegos (ex: Spline é citado por 3 agentes, o que reforça o sinal mesmo com o erro do alpha).

---

## 2. Mapeamento Achados → ACs do `server-perf-qa-criteria.md`

### Achados que disparam ACs **CRÍTICOS** (qualquer fix incompleto = FAIL automático)

| Achado | Fonte | AC violado | Severidade reportada | Ação requerida no fix |
|---|---|---|---|---|
| tsParticles particleDensity=1200, fpsLimit=120, import estático em `/` | analyst CRÍTICO-1 + delta C1 + alpha #1 | **AC-DI-1, AC-DI-2, AC-UX-1, AC-UX-2** | CRÍTICO | Wrap `AnimatedHero` com `dynamic({ssr:false, loading: ...})` em `src/app/page.tsx`. Reduzir densidade e fpsLimit em `sparkles.tsx`. Respeitar `prefers-reduced-motion`. |
| `renderToBuffer` (api/certificado) sem try/catch nem timeout | delta C2 | **AC-RES-5, AC-RES-4 (server)** | CRÍTICO | Adicionar Promise.race com timeout 10s + try/catch retornando 500. |
| `SplineScene` usa `React.lazy` (sem ssr:false) — Spline runtime no bundle SSR de /mentoria | analyst CRÍTICO-2 + delta C3 | **AC-DI-1, AC-DI-6, AC-RES-1** | CRÍTICO | Trocar `React.lazy` por `next/dynamic({ssr:false, loading})`. Adicionar ErrorBoundary cobrindo Spline (fallback silencioso). Wrapping `MentoriaHeroSpline` com `dynamic({ssr:false})` em `mentoria/page.tsx`. |

### Achados que disparam ACs **ALTOS**

| Achado | Fonte | AC violado | Ação requerida |
|---|---|---|---|
| Middleware query de profiles em request authed | beta middleware | **AC-BE-3 (parcial)** | Cachear role+has_set_password em JWT claim (Supabase hook) ou cookie assinado. |
| `revalidatePath('/', 'layout')` em reactions/comments/notifications | beta linhas 22-24 | **AC-BE-5** | Revalidar path específico da aula ou remover (optimistic já cobre). |
| `auth.admin.listUsers({ perPage: 1000 })` em SSR admin | beta linhas 19-21 | **AC-BE-1, AC-BE-2** | Carregar lazily no cliente via endpoint dedicado, paginação real. |
| Zero `error.tsx` em toda árvore `/academy` | delta A3 | **AC-RES-3** | Criar `error.tsx` em segmentos críticos: `(student)`, `(student)/dashboard`, `(student)/curso/[slug]`, `(student)/curso/[slug]/aula/[lesson-slug]`, `(admin)`. |
| Dashboard + curso pages: 7 e 6 queries Supabase sem try/catch | delta A1, A2 | **AC-RES-4** | Try/catch nos Server Components ou confiar no `error.tsx` da rota (mais idiomático no Next.js — combina com fix anterior). |
| `@splinetool` listado no package.json — **mas SIM está em uso** | conflito alpha vs. realidade | (não-AC) | **NÃO REMOVER** — manter. Apenas confirmar com cross-check. |

### Achados que disparam ACs **MÉDIOS**

| Achado | Fonte | AC violado | Ação requerida |
|---|---|---|---|
| Sentry `replaysOnErrorSampleRate: 1.0` | analyst ALTO-1 | **AC-DI-5** (peso de bundle) | Reduzir para 0.2 em `sentry.client.config.ts`. |
| `pnpm-workspace.yaml` com valores inválidos ("set this to true or false") | analyst MÉDIO-3 | **AC-BT-1** (build instável) | Trocar strings por `true`. Reativa memória `project_vercel_pnpm_v10`. |
| Three.js sem `dispose()` — memory leak WebGL | delta A5 | **AC-RES-2** (parcial) | useEffect cleanup com `.dispose()` em Planet, Starfield, Solar. Não-bloqueante. |
| SolarSystemScene: 4 texturas 4-8K em um único Suspense | delta A4 | **AC-RES-2, AC-UX-1** | Splittar em Suspense por textura ou usar formato compactado. |
| TipTap sem dynamic (admin) | analyst MÉDIO-1 | **AC-DI-5** | Wrap com `dynamic({ssr:false, loading})` em `LessonEditorClient.tsx`. Baixo tráfego, baixa prioridade. |
| N+1 nos crons (`getUserProfile` em loop) | beta linhas 16-18 | **AC-BE-1, AC-BE-4** | Batch profiles via `.in('id', ids)`. Crons hoje desabilitados (`CRON_FALLBACK_ENABLED !== 'true'`), pode ficar P1. |
| `Font.register` morto em CertificatePDF (request externo desnecessário) | delta M2 | **AC-RES-4 (parcial)** | Remover Font.register não utilizado. |
| Sentry edge `tracesSampleRate: 0.2` (alto para middleware) | beta linha 30 | **AC-BE-7** (relacionado) | Reduzir para 0.05. |
| `profiles.select('*')` em `helpers.ts:18` | beta linha 27 | **AC-BE-2** | Listar colunas explícitas. |

---

## 3. Plano Priorizado de Fixes — Bloqueantes vs. Paralelos

### Tier 1 — BLOQUEANTES (devem ser corrigidos PRIMEIRO, em ordem)

São os fixes cuja ausência mantém o servidor instável OU bloqueia a validação dos demais. Sem esses, qualquer outro fix corre risco de ser invalidado por crash recorrente.

| # | Fix | Arquivo | Responsável sugerido | Justificativa |
|---|---|---|---|---|
| 1 | Wrap `AnimatedHero` com `dynamic({ssr:false})` em `app/page.tsx` + reduzir `particleDensity` (mobile 60, desktop 200), `fpsLimit: 30`, respeitar reduced-motion | `src/app/page.tsx`, `src/shared/components/ui/animated-hero.tsx`, `src/shared/components/ui/sparkles.tsx` | sites-dev-alpha | Maior tráfego (home), maior impacto observável. Sem isso, qualquer benchmark fica poluído. |
| 2 | Trocar `React.lazy` por `next/dynamic({ssr:false, loading})` no `SplineScene` + wrap `MentoriaHeroSpline` com dynamic no `mentoria/page.tsx` + ErrorBoundary cobrindo Spline | `src/shared/components/ui/SplineScene.tsx`, `src/app/mentoria/_components/MentoriaHeroSpline.tsx`, `src/app/mentoria/page.tsx` | sites-dev-alpha | Elimina maior risco de OOM em SSR. Página de conversão crítica. |
| 3 | `renderToBuffer` com try/catch + Promise.race timeout 10s | `src/app/api/certificado/[code]/route.ts` | sites-dev-beta | Único endpoint capaz de segurar instância Node por 25s. Sem isso, picos de tráfego derrubam função. |
| 4 | Substituir `revalidatePath('/', 'layout')` por path específico nos 3 actions (reactions, comments, notifications) | `src/app/actions/lesson-reactions.ts`, `src/lib/actions/comments.ts`, `src/app/actions/notifications.ts` | sites-dev-beta | Cada interação de aluno invalidando cache global é multiplicador de carga. |
| 5 | Corrigir `pnpm-workspace.yaml` (strings → `true`) | `pnpm-workspace.yaml` | sites-dev-alpha ou devops (trivial) | Build no Vercel pode estar com comportamento undefined. |

### Tier 2 — PARALELOS (podem rodar simultaneamente ao Tier 1)

Independentes entre si e em relação ao Tier 1. Podem ser distribuídos.

| # | Fix | Arquivo | Responsável | Notas |
|---|---|---|---|---|
| 6 | Criar `error.tsx` em segmentos críticos `/academy/(student)/dashboard`, `/academy/(student)/curso/[slug]`, `/academy/(student)/curso/[slug]/aula/[lesson-slug]`, `/academy/(admin)` | `src/app/(academy)/.../error.tsx` (5 arquivos novos) | sites-dev-delta ou alpha | Mata "tela branca" como classe de bug. Requisito do AC-RES-3. |
| 7 | Cache de role+has_set_password (JWT claim ou cookie assinado) — remover query de profiles do middleware | `src/middleware.ts` + Supabase auth hook | sites-dev-beta | Reduz 30-80ms por request authed. |
| 8 | Sentry `replaysOnErrorSampleRate: 1.0 → 0.2` + edge `tracesSampleRate: 0.2 → 0.05` | `sentry.client.config.ts`, `sentry.edge.config.ts` | sites-dev-alpha (1 linha cada) | Reduz peso do replay SDK e overhead em edge. |
| 9 | Remover `Font.register` morto em `CertificatePDF.tsx` | `src/components/student/CertificatePDF.tsx` | sites-dev-beta | Elimina request externo durante geração de PDF. |
| 10 | Specificar colunas em `helpers.ts:18` (profiles.select) | `src/lib/auth/helpers.ts` | sites-dev-beta | Quick win do AC-BE-2. |

### Tier 3 — DEPOIS dos fixes do Tier 1+2 (não-bloqueantes para o sprint)

| # | Fix | Notas |
|---|---|---|
| 11 | Wrap TipTap com `dynamic({ssr:false, loading})` em `LessonEditorClient.tsx` | Admin, baixo tráfego. P1. |
| 12 | Batch profiles nos crons (`.in('id', ids)`) | Crons hoje desabilitados. P1 se reativar. |
| 13 | useEffect cleanup com `.dispose()` em Planet/Starfield/SolarSystem | Memory leak client-side, área institucional. P1. |
| 14 | Splittar Suspense por textura na SolarSystemScene OU usar formatos compactos | INP/LCP /agentes. P1. |
| 15 | `auth.admin.listUsers` lazy no cliente via endpoint dedicado | Admin, baixo tráfego. P1. |
| 16 | Cache do PDF de certificado (Cache-Control public, s-maxage) | Quick win adicional do analyst. P1. |
| 17 | Avaliar substituir tsParticles por CSS puro / Spline por vídeo/WebP | Mudança maior. Backlog. |

---

## 4. Itens NÃO acionar (descartados)

- **"Remover `@splinetool` do package.json"** (Fix #3 do alpha) — **NÃO FAZER**. Spline está em uso real em `SplineScene.tsx` e `MentoriaHeroSpline.tsx`. Remover quebraria `/mentoria`. Manter dependência.
- **"Middleware matcher excluindo `_next/static`/imagens"** (AC-BE-3 framing original) — **NÃO ACIONAR**. Matcher do `src/middleware.ts:124-149` é positivo (lista explícita), não roda em rotas institucionais nem em `_next`. Issue real do middleware é a query de `profiles`, coberta pelo Tier 2 #7.

---

## 5. Critérios para Emissão do Próximo Veredicto (fase de fixes)

Quando dev-alpha e dev-beta concluírem os fixes do Tier 1 (e idealmente Tier 2), eu executo o smoke checklist completo de `server-perf-qa-criteria.md` (seção 6) e emito veredicto contra os ACs.

**Pré-condições para iniciar a próxima rodada de QA:**

- [ ] `pnpm typecheck` verde
- [ ] `pnpm build` verde sem warning novo crítico
- [ ] PRs/diffs apontando para `feat-aulas-v2` (ou nova branch dedicada)
- [ ] Lista de arquivos tocados (para focar revisão)
- [ ] Comparativo de bundle size antes/depois (`next build` output das rotas `/` e `/mentoria`)

**Matriz aplicada (de `server-perf-qa-criteria.md` §7):**

- PASS: todos os 5 fixes do Tier 1 verdes + smoke 100%
- CONCERNS: Tier 1 verde + smoke 100%, com 1-3 itens do Tier 2 incompletos
- FAIL: qualquer AC crítico (DI-1, RES-1, BE-1, BT-1, BT-2, UX-2, UX-4) reprovado, ou smoke com regressão funcional

---

## 6. Notas de Coordenação

- **Branch:** sugerir nova branch `fix-server-perf-stabilization` a partir de `feat-aulas-v2`, para isolar o sprint dos commits funcionais Aulas v2.
- **Smoke parcial após Tier 1:** após Tier 1, vale uma rodada rápida de smoke (apenas home + /mentoria + /api/certificado + admin editor) para confirmar que não introduziu regressão antes de partir para Tier 2.
- **Comunicação:** todo veredicto formal por SendMessage ao lead. Nenhum push para `origin/main` sem João confirmar explicitamente.

---

A luz está correta.
