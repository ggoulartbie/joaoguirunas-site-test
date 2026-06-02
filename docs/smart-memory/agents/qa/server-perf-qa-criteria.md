---
title: "QA Criteria — Estabilização do Servidor e Performance (Libs Pesadas)"
type: qa-criteria
status: active
agent: sites-qa
created: 2026-05-16
updated: 2026-05-16
tags: [qa, performance, dynamic-import, resilience, ssr, bundle, middleware]
related:
  - "[[../../project/architecture]]"
  - "[[../../project/tech-stack]]"
  - "[[results]]"
  - "[[verdict-epic-aulas-v2]]"
---

# QA Criteria — Estabilização do Servidor e Performance

## Contexto

Time investigando crashes recorrentes do servidor web. Suspeita central: libs pesadas (Three.js + drei + fiber, Spline, tsParticles) entram no bundle do servidor e/ou no first load do cliente, causando timeouts no SSR, OOM em build e travas de hidratação no browser. Três agentes investigam em paralelo:

- **sites-analyst** — diagnóstico geral
- **sites-dev-delta** — resiliência (Error Boundaries, Suspense, error.tsx)
- **sites-dev-alpha** — frontend bundle (dynamic imports, lazy loading)
- **sites-dev-beta** — backend (queries Supabase, cache, middleware)

Eu (sites-qa, Axilun) sou o **único** que emite o veredicto formal antes de qualquer push para `main` ou deploy. Branch atual: `feat-aulas-v2`. **Não há push sem confirmação explícita do João.**

Este documento define **critérios objetivos e verificáveis** para aceitar (ou rejeitar) cada classe de fix. Sem critério atendido = sem PASS. Sem exceções por prazo.

---

## 1. Critérios — Dynamic Imports (lazy loading de libs pesadas)

Aplica-se a Three.js (`three`, `@react-three/fiber`, `@react-three/drei`), Spline (`@splinetool/react-spline`, `@splinetool/runtime`), tsParticles (`@tsparticles/*`), Recharts, Tiptap, e qualquer lib com bundle > 50 KB gzip que entre no first load.

### AC-DI-1 — `ssr: false` quando obrigatório
- Libs que tocam `window`, `document`, WebGL, `canvas`, ou que crashei no SSR (Three.js, Spline, tsParticles): import dinâmico **deve** ter `{ ssr: false }`.
- Verificação: `grep -rn "dynamic(" src/ | grep -E "(three|spline|tsparticles)"` — cada match deve ter `ssr: false` na mesma chamada.
- Reprovar se: import dinâmico sem `ssr: false` que toca browser-only API → crash no build ou no first request.

### AC-DI-2 — `loading:` fallback definido e informativo
- Todo `dynamic(() => import(...))` para componente visível **deve** ter `loading:` retornando um placeholder visual com dimensões equivalentes ao componente final (evita CLS).
- O fallback **não pode** ser `null`, `undefined`, ou apenas um `<div />` vazio sem altura.
- Aceitável: skeleton com `aria-busy="true"`, spinner identificado, ou placeholder com altura/aspect-ratio igual ao componente real.
- Reprovar se: usuário vê área branca/quebrada > 200ms sem indicação visual.

### AC-DI-3 — Funcionalidade 100% preservada
- Componente lazy-loaded entrega o mesmo comportamento observável que antes do refactor.
- Validar via smoke específico do componente (Three.js renderiza modelo, Spline renderiza cena, tsParticles emite partículas).
- Reprovar se: regressão visual ou funcional detectada vs. comportamento pré-fix.

### AC-DI-4 — TypeScript verde
- `pnpm typecheck` (`tsc --noEmit`) deve passar **sem erros** após o refactor.
- Tipos da prop `ComponentType` do dynamic devem casar com o componente importado.
- Reprovar se: erro novo de tipo introduzido pelo refactor.

### AC-DI-5 — First Load JS reduzido (mensurável)
- Comparar `next build` antes/depois: o **First Load JS** das rotas afetadas deve **cair**.
- Threshold mínimo aceitável: rotas que importavam Three.js/Spline diretamente devem cair pelo menos 30% no First Load JS dessa rota específica.
- Reprovar se: First Load JS não caiu (lazy não funcionou — provavelmente import estático ainda em algum lugar).

### AC-DI-6 — Lib pesada não vaza para chunk compartilhado
- Inspecionar saída de `next build` (`.next/analyze` ou tabela do build): chunks de `three`, `@splinetool/*`, `@tsparticles/*` devem ser **chunks separados** carregados sob demanda — não em `framework`, `main`, ou `pages/_app`.
- Reprovar se: lib pesada aparece no chunk principal.

---

## 2. Critérios — Resiliência (Error Boundaries, Suspense, error.tsx)

Aplica-se a: páginas que tocam libs pesadas, páginas que fazem fetch de dados externos (Supabase, Stripe, Resend), e qualquer Server Component que pode lançar.

### AC-RES-1 — Cobertura de Error Boundary
- Todo componente client que importa lib pesada (Three.js, Spline, tsParticles, recharts, Vimeo player) **deve** estar envolto por um Error Boundary (custom ou `error.tsx` da rota pai).
- Boundary deve renderizar fallback **acionável** (mensagem clara + CTA de retry ou link de saída), não apenas `null` ou `"Algo deu errado"` genérico.
- Reprovar se: crash dentro de Three.js/Spline derruba a página inteira ao invés de mostrar fallback.

### AC-RES-2 — Loading states informativos
- Todo `<Suspense>` novo deve ter `fallback` que comunica o que está carregando ("Carregando vídeo…", "Preparando cena 3D…"), não apenas spinner branco.
- Skeletons com dimensões realistas são preferíveis a spinners centrados.
- Reprovar se: fallback genérico em contexto onde usuário precisa saber o que esperar (ex: video player vs. lista).

### AC-RES-3 — `error.tsx` por segmento crítico
- Cada segmento de rota que faz fetch (Supabase, API externa) **deve** ter um `error.tsx` cobrindo falha de fetch.
- Segmentos críticos identificados: `/academy/(student)/curso/[slug]`, `/academy/(student)/curso/[slug]/aula/[lesson-slug]`, `/academy/(admin)/admin/cursos/*`.
- `error.tsx` deve oferecer `reset()` (retry) e/ou link de fallback.
- Reprovar se: falha de fetch em rota crítica resulta em página inteiramente quebrada (sem `error.tsx`).

### AC-RES-4 — Server Components com try/catch onde fetch pode falhar
- Server Components que chamam Supabase devem tratar `data === null` ou `error !== null` **sem** explodir o render.
- Aceitável: early return com fallback UI, redirect para `/academy/403` quando `has_access` falha, mensagem de "não encontrado".
- Reprovar se: server component faz `data!.foo` (non-null assertion) sem ter validado `data` antes.

### AC-RES-5 — Sem `throw` silencioso em event handlers
- Handlers client (`onClick`, `onSubmit`) que chamam server actions devem capturar erro e exibir feedback ao usuário via state.
- Reprovar se: handler com `await action(...)` sem try/catch e sem error state, que silencia falha (ver pattern combatido na Story 2.2 AC4).

---

## 3. Critérios — Backend (Queries Supabase, Cache, Middleware)

### AC-BE-1 — Queries com `LIMIT` adequado
- Toda query `.from('...').select(...)` que pode retornar lista **deve** ter `.limit(n)` explícito ou paginação.
- Listas administrativas: limite default ≤ 100 sem paginação; com paginação, page size ≤ 50.
- Listas de aluno (comentários, materiais): limite ≤ 50 por aba.
- Reprovar se: query sem `.limit()` em tabela que pode crescer (comments, lesson_reactions, materials, has_access).

### AC-BE-2 — `.select()` específico, sem `*`
- Queries devem listar colunas explícitas no `.select('id, title, created_at, ...')`, **não** `.select('*')` quando só poucos campos são usados.
- Exceções: queries admin que genuinamente precisam de todas as colunas (editor de aula carregando lesson completa).
- Reprovar se: `.select('*')` em hot path (página do aluno, listagem pública) onde só 3-5 campos são lidos.

### AC-BE-3 — Middleware matcher exclui assets estáticos
- `src/middleware.ts` matcher **deve** excluir `_next/static`, `_next/image`, `favicon.ico`, `monitoring` (Sentry tunnel), e extensões de imagem comuns (`.svg`, `.png`, `.jpg`, `.webp`, `.avif`).
- Validar via: `grep -A 20 "export const config" src/middleware.ts` — matcher deve usar pattern negativo com lookahead que cobre os casos acima.
- Reprovar se: middleware roda em request de imagem ou asset estático (gera latência desnecessária e pode causar timeout em alta carga).

### AC-BE-4 — Sem fetch redundante
- Page server component **não** deve refazer o mesmo fetch que já foi feito em layout pai (Next 16 dedup automático só funciona se exatamente a mesma chamada).
- Reprovar se: profile/user/has_access é buscado 2+ vezes na mesma navegação por componentes diferentes sem usar `cache()` ou `React.cache`.

### AC-BE-5 — Server Actions com revalidatePath correto
- Actions que mudam dados devem revalidar **todos** os paths que mostram esses dados (não só o admin).
- Padrão observável já documentado em Story 2.2 AC3c.
- Reprovar se: mutation no admin não reflete imediatamente na rota do aluno (falta de revalidate ou revalidate em path errado).

### AC-BE-6 — `force-dynamic` somente onde necessário
- Rotas que tocam `supabaseAdmin` ou cookies de auth precisam `export const dynamic = 'force-dynamic'` ou equivalente — caso contrário, build quebra (ver memória `project_supabase_admin_proxy_build`).
- Rotas estáticas (landing pages, /mentoria) **não** devem ter `force-dynamic` — perde-se SSG.
- Reprovar se: `force-dynamic` adicionado a página estática "por segurança" (regressão de performance) ou ausente em rota admin que toca `supabaseAdmin`.

### AC-BE-7 — Sentry tunnel não bloqueado
- `tunnelRoute: '/monitoring'` em `next.config.ts` exige que o middleware **não** intercepte `/monitoring`.
- Reprovar se: middleware aplica auth check em `/monitoring` (Sentry para de receber eventos).

---

## 4. Critérios — Build & Tipos (gate transversal)

### AC-BT-1 — `pnpm build` passa sem erros nem warnings críticos
- Build de produção completo deve concluir.
- Warnings novos introduzidos pelos fixes devem ser justificados ou eliminados.
- Reprovar se: build quebra, ou novo warning aparece sem explicação.

### AC-BT-2 — `pnpm typecheck` passa
- `tsc --noEmit` verde antes de qualquer veredicto PASS.
- Reprovar se: erro de tipo, mesmo que pré-existente, em arquivos tocados pelo fix.

### AC-BT-3 — `pnpm lint` sem novos erros
- ESLint não pode introduzir erros novos.
- Warnings pré-existentes não bloqueiam; **novos** warnings exigem justificativa.

### AC-BT-4 — Sem aumento inesperado do bundle
- Comparar tamanho total de `.next/static/chunks/` antes/depois.
- Crescimento > 5% sem feature nova justifica investigação. Crescimento > 15% reprova.

---

## 5. Critérios — UX no browser (validação humana)

### AC-UX-1 — Página principal do aluno carrega em < 2.5s (LCP)
- Medido em Chrome DevTools → Performance → LCP em conexão "Fast 3G" simulada.
- Reprovar se: LCP > 4s em rota crítica do aluno após fixes (ou > 25% pior que baseline).

### AC-UX-2 — Console limpo
- Console do browser sem erros críticos (`error`, `uncaught`) nas rotas: `/`, `/academy/login`, `/academy/dashboard`, `/academy/curso/[slug]`, `/academy/curso/[slug]/aula/[lesson-slug]`, `/academy/admin/cursos`, `/academy/admin/cursos/[id]/aulas/[lid]`.
- Warnings de hidratação React **reprovam** (geram crash em prod intermitente).
- Reprovar se: erro novo no console que não existia antes do fix.

### AC-UX-3 — Network sem requests pendentes em loop
- Aba Network: sem requests em retry infinito, sem mesma URL chamada > 3× por navegação.
- Reprovar se: comportamento de retry indica falha de cache ou loop de re-render.

### AC-UX-4 — Sem tela branca de morte
- Nenhum fluxo (login → dashboard → curso → aula → admin) resulta em página totalmente em branco.
- Erros devem cair em `error.tsx`, não em white screen.
- Reprovar se: white screen reproduzível em qualquer fluxo principal.

---

## 6. Smoke Test Checklist — Pós-Correções

Executar **manualmente** após todos os agentes entregarem. Cada item deve passar antes do veredicto PASS.

### 6.1 Fluxo do Aluno
- [ ] `/academy/login` carrega em < 2s, formulário interativo
- [ ] Login bem-sucedido redireciona para `/academy/dashboard` sem white screen
- [ ] `/academy/dashboard` lista cursos do aluno sem erro no console
- [ ] Abrir um curso → `/academy/curso/[slug]` carrega lista de aulas
- [ ] Abrir uma aula → vídeo (Vimeo/YouTube) renderiza com aspect-ratio correto
- [ ] 5 abas da aula (Sobre, Resumo, Transcrição, Materiais, Comentários) clicáveis sem crash
- [ ] Like/Dislike na aula responde com optimistic update
- [ ] Marcar como concluída persiste após reload
- [ ] Nav prev/next funciona (quando AV-3.6 estiver merged)

### 6.2 Fluxo do Admin
- [ ] `/academy/admin/cursos` lista cursos sem timeout
- [ ] Abrir editor de aula `/academy/admin/cursos/[id]/aulas/[lid]` **sem crash** (caso histórico de quebra)
- [ ] LessonEditorClient renderiza inputs/textareas
- [ ] Upload de material funciona
- [ ] Delete de material (PDF e LINK) funciona com optimistic + rollback (Story 2.2)
- [ ] Toggle preview de markdown funciona (Story 2.3)

### 6.3 Componentes Pesados
- [ ] Three.js (`@react-three/fiber`): cena renderiza, sem tela branca, sem console error
- [ ] Spline: cena 3D aparece, fallback visível durante carregamento
- [ ] tsParticles (`animated-hero`): partículas emitem, sem travar main thread
- [ ] Recharts (dashboards admin, se houver): gráfico renderiza
- [ ] Tiptap (editor rich-text, se houver): editor abre, comandos funcionam
- [ ] Vimeo player: aspect-ratio correto (16/9), controles respondem

### 6.4 Console e Network
- [ ] Console do browser limpo em todas as rotas acima (sem `error` novo)
- [ ] Sem warnings de hidratação React
- [ ] Network sem requests em loop
- [ ] Sentry recebendo eventos (testar `/monitoring` via Network)

### 6.5 Build e Tipos
- [ ] `pnpm typecheck` → 0 erros
- [ ] `pnpm build` → sucesso, sem warnings críticos
- [ ] `pnpm lint` → sem novos erros
- [ ] Build size comparado: sem regressão > 5%, ganho esperado nas rotas com Three.js/Spline
- [ ] First Load JS por rota: queda mensurável nas rotas com libs pesadas

### 6.6 Servidor (estabilidade)
- [ ] `pnpm dev` por 10 min sem crash do servidor Next
- [ ] Memória do processo `next` estável (sem leak observável)
- [ ] Hot reload funciona após editar arquivo tocado pelos fixes

---

## 7. Matriz de Veredicto

| Situação | Veredicto |
|---|---|
| Todos os ACs aplicáveis verdes + smoke 100% | **PASS** |
| 1-3 ACs com observação não bloqueante (ex: warning lint) + smoke 100% | **CONCERNS** |
| Qualquer AC crítico (DI-1, RES-1, BE-1, BT-1, BT-2, UX-2, UX-4) reprovado | **FAIL** |
| Smoke com regressão funcional | **FAIL** |
| Build ou typecheck quebrado | **FAIL automático** |

ACs **críticos** (qualquer um reprovado = FAIL):
- AC-DI-1 (`ssr: false` ausente em lib browser-only)
- AC-RES-1 (lib pesada sem error boundary)
- AC-BE-1 (query sem LIMIT em tabela que cresce)
- AC-BT-1 (build quebrado)
- AC-BT-2 (typecheck quebrado)
- AC-UX-2 (erro novo de console)
- AC-UX-4 (white screen reproduzível)

---

## 8. Próximos Passos

1. Aguardar relatórios dos agentes (analyst, dev-delta, dev-alpha, dev-beta) com diffs e contexto.
2. Executar este checklist contra cada PR/diff antes de emitir veredicto.
3. Documentar resultado em `docs/smart-memory/agents/qa/results.md` com data, escopo, veredicto, evidências.
4. Notificar lead via SendMessage com o veredicto formal.
5. **Não autorizar push para `origin/main` ou deploy sem confirmação explícita do João.**

---

## 9. Notas

- Este documento se aplica **especificamente** ao Epic de estabilização do servidor. Stories funcionais (AV-3.x, 2.x) seguem o checklist 10-point padrão (ver identidade do Axilun).
- Critérios podem ser ajustados conforme os relatórios dos agentes revelarem causas raiz inesperadas — versão será incrementada e mudança documentada aqui.
- Veredicto formal sempre via SendMessage ao team-lead, nunca implícito.
