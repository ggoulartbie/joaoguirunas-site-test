---
title: "Bug hunt + a11y sweep — área do aluno (F9.7)"
type: research
agent: sites-qa
created: 2026-05-09
updated: 2026-05-09
tags: [research, bug-hunt, student, a11y, audit]
related:
  - "[[F9.7-auditar-area-aluno-bug-hunt]]"
  - "[[F9.4-bug-hunt-academy-admin]]"
---

# Bug hunt + a11y sweep — área do aluno

Auditoria estática (read-only) das páginas student e components em `src/components/student/` realizada por sites-qa (Axilun) em 2026-05-09 como parte da Story F9.7. Baseada em leitura de código fonte; não inclui testes em browser.

## Severidade

- **P0** — bug crítico (segurança, perda de dados, fluxo principal quebrado)
- **P1** — bug visível ao aluno (regressão UX, performance significativa, funcionalidade incorreta)
- **P2** — bug observável mas com workaround (UX confusa, link quebrado, edge case)
- **P3** — polishing (a11y nice-to-have, micro-bugs visuais)

## Bugs encontrados

### B-01 — P0 — `changePassword` não revalida a senha atual

- **Página:** `/academy/perfil`
- **Arquivo:** `src/app/actions/profile.ts:21-29` + `src/app/(academy)/academy/(student)/perfil/PerfilClient.tsx:319-345`
- **Descrição:** A UI captura `currentPassword`, `newPassword`, `confirmPassword` e valida que `currentPassword` não está vazio (linha 320-322). **Mas a chamada `changePassword(newPassword)` na linha 334 só envia a nova senha** e a server action `changePassword` chama diretamente `supabase.auth.updateUser({ password: newPassword })` sem reautenticação.
- **Impacto:** vulnerabilidade de segurança — qualquer pessoa com sessão Supabase ativa pode alterar a senha sem conhecer a senha atual. Cenário típico: notebook desbloqueado, atacante muda senha e bloqueia o dono.
- **Fix recomendado:** server action deve receber `currentPassword`, primeiro chamar `supabase.auth.signInWithPassword({ email, password: currentPassword })` para revalidar a senha antiga, e só então chamar `updateUser({ password: newPassword })`. Ou criar uma RPC server-side específica para "change_password" que valida a antiga.
- **Status:** DOCUMENTADO (sites-qa não tem permissão de edit)

### B-02 — P1 — Link de Stripe Dashboard hard-coded para `/test/`

- **Página:** `/academy/perfil` (histórico de pagamentos)
- **Arquivo:** `src/app/(academy)/academy/(student)/perfil/PerfilClient.tsx:658`
- **Descrição:** `<a href="https://dashboard.stripe.com/test/payments">` — em produção, esse link cai num modo `test` que nunca tem o pagamento real do aluno. Aluno clica para ver recibo e não encontra nada.
- **Fix recomendado:** trocar para `https://dashboard.stripe.com/payments` ou (melhor) usar `session.url` do `stripe.checkout.sessions.retrieve()` para gerar receipt URL. Para o aluno, a Stripe gera `receipt_url` automaticamente em payment_intents — buscar e expor esse link.
- **Status:** DOCUMENTADO

### B-03 — P1 — `LockedContent` link aponta para `/turmas/[slug]` (rota inexistente)

- **Página:** `/academy/curso/[slug]/aula/[lesson-slug]` (quando sem acesso)
- **Arquivo:** `src/components/student/LockedContent.tsx:26`
- **Descrição:** `<Link href="/turmas/${cohortSlug}">` — não existe rota `/turmas/*` no root do app. A rota real é `/academy/turmas/[slug]`. Aluno sem acesso clica "Ver detalhes da turma" e cai em 404.
- **Fix recomendado:** trocar `href={`/turmas/${cohortSlug}`}` por `href={`/academy/turmas/${cohortSlug}`}`.
- **Status:** DOCUMENTADO

### B-04 — P1 — Navegação cross-module pode levar para módulo bloqueado

- **Página:** `/academy/curso/[slug]/aula/[lesson-slug]`
- **Arquivo:** `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx:91-135`
- **Descrição:** `globalPrev`/`globalNext` são calculados a partir de `allModulesRaw` (todos os módulos do curso) sem filtrar pelos módulos acessíveis (`accessibleModuleIds` do `cohort_courses`). Resultado: o botão "Próxima aula" pode levar o aluno para uma aula em um módulo bloqueado, onde o `has_access` RPC retorna false e ele cai no `LockedContent`. Confunde o aluno e contradiz AC4 da story (navegação cross-module nunca pula módulos — mas tampouco deveria empurrar para conteúdo bloqueado).
- **Fix recomendado:** buscar acesso do aluno (mesmo padrão usado em `meus-cursos/page.tsx:65-71`) e filtrar `allLessons` para incluir só lessons em módulos acessíveis antes de calcular `globalIndex`/`globalPrev`/`globalNext`.
- **Status:** DOCUMENTADO

### B-05 — P1 — N+1 queries em `/academy/forum`

- **Página:** `/academy/forum`
- **Arquivo:** `src/app/(academy)/academy/(student)/forum/page.tsx:48-57` + `83-115`
- **Descrição:** Para cada categoria ativa, faz `count` separado de threads (Promise.all sobre map). Para cada thread retornada (até 20), faz **dois** counts adicionais (`forum_replies` + `votes`). Página com 5 categorias e 20 threads = 5 + 40 = **45 queries por pageview**.
- **Impacto:** TTFB alto em produção, especialmente com Supabase free tier. Provoca cold-start lento e timeouts esporádicos.
- **Fix recomendado:** consolidar em uma view ou RPC que retorna threads com counts agregados; ou usar `select(*, replies:forum_replies(count), votes(count))` da Postgrest se schema permitir.
- **Status:** DOCUMENTADO

### B-06 — P1 — N+1 queries em `/academy/forum/[category]/[slug]`

- **Página:** `/academy/forum/[category]/[slug]`
- **Arquivo:** `src/app/(academy)/academy/(student)/forum/[category]/[slug]/page.tsx:114-136`
- **Descrição:** Para cada reply do tópico, faz `count` em `votes`. Tópico com 30 replies = 30 queries adicionais.
- **Fix recomendado:** mesmo padrão que B-05.
- **Status:** DOCUMENTADO

### B-07 — P2 — `OnboardingWizard` provavelmente nunca aparece em prod

- **Página:** layout student (todas)
- **Arquivo:** `src/app/(academy)/academy/(student)/layout.tsx:48`
- **Descrição:** condição `needsOnboarding = profile !== null && !profile?.name && !profile?.bio`. Mas o trigger `handle_new_user` (`supabase/migrations/20260506021755_initial_schema_identidade_catalogo.sql:48-53`) cria o profile com `name = coalesce(raw_user_meta_data->>'name', split_part(email, '@', 1))` — logo `profile.name` está sempre preenchido (no mínimo o local-part do email). O wizard só apareceria se admin manualmente apagasse o nome.
- **Fix recomendado:** trocar condição para `!profile?.bio` apenas (bio é o único que de fato vem null) — ou adicionar campo `onboarded_at` no profile e usar como flag explícita.
- **Status:** DOCUMENTADO

### B-08 — P2 — Action buttons de comentário invisíveis em touch devices

- **Página:** `/academy/curso/[slug]/aula/[lesson-slug]` (tab Comentários)
- **Arquivo:** `src/components/student/CommentsSection.tsx:148`
- **Descrição:** `className="... opacity-0 transition-opacity group-hover:opacity-100"` — em mobile/tablet sem hover, os botões "Responder", "Editar", "Excluir" são invisíveis. Acessibilidade-fail (WCAG 2.5.3 — Label in Name) e UX quebrada para fração relevante de usuários.
- **Fix recomendado:** mostrar sempre em mobile (`opacity-100` em viewport < `lg`), ou usar `focus-within` para mostrar quando um filho recebe foco.
- **Status:** DOCUMENTADO

### B-09 — P2 — Botão "Em breve" na agenda parece interativo mas é div decorativo

- **Página:** `/academy/agenda`
- **Arquivo:** `src/app/(academy)/academy/(student)/agenda/page.tsx:124-132`
- **Descrição:** `<div className="flex items-center gap-1.5 px-3 h-9 ...">` com ícone Video e horário — visualmente igual ao botão "Entrar" mas é um `<div>` sem comportamento. Aluno tenta clicar achando que é botão.
- **Fix recomendado:** estilizar mais distintamente como label ou tooltip; remover o ícone Video que sugere acionável.
- **Status:** DOCUMENTADO

### B-10 — P3 — `OnboardingWizard` useEffect deps potentially missing

- **Página:** layout student
- **Arquivo:** `src/components/student/OnboardingWizard.tsx:37-39`
- **Descrição:** `document.addEventListener('keydown', handleKey)` dentro de `useEffect([open, step])` — referencia `handleSkip` que muda toda render mas não está nas deps. eslint-react-hooks/exhaustive-deps deve alertar; comportamento ok mas warning poluente.
- **Fix recomendado:** envolver `handleSkip` em `useCallback` ou inline a lógica no handler.
- **Status:** DOCUMENTADO

### B-11 — P3 — `OnboardingWizard` step `<h2 id="onboarding-title">` repetido

- **Arquivo:** `src/components/student/OnboardingWizard.tsx:124, 149, 191`
- **Descrição:** três `<h2>` com mesmo `id` — apenas um renderiza por vez (rendering condicional), então não há colisão DOM, mas viola o princípio "id único". `aria-labelledby` no dialog (linha 61) referencia esse id e funciona apenas se o `<h2>` está no DOM antes do paint — pode haver flash.
- **Fix recomendado:** usar ids distintos por step (`onboarding-title-1`, `-2`, `-3`) e ajustar `aria-labelledby` dinamicamente, ou colocar um único `<h2 id="onboarding-title">` fora do switch e mudar só o conteúdo.
- **Status:** DOCUMENTADO

### B-12 — P3 — Header `formatDate` na agenda usa `toLocaleDateString` SSR-mismatch risk

- **Página:** `/academy/agenda`, `/academy/dashboard` (next live)
- **Arquivo:** `src/app/(academy)/academy/(student)/agenda/page.tsx:11-21`, `dashboard/page.tsx:12-20`
- **Descrição:** `new Date(iso).toLocaleDateString('pt-BR', { ... })` é chamado no SSR (server) e usa o timezone do server. Se Vercel usa UTC e usuário está em America/Sao_Paulo (UTC-3), datas perto da meia-noite podem mostrar "27 mai" no server e "26 mai" no client.
- **Fix recomendado:** explicitar `timeZone: 'America/Sao_Paulo'` no options do `toLocaleDateString`.
- **Status:** DOCUMENTADO

### B-13 — P3 — VideoPlayer YouTube usa `<img>` em vez de `next/image`

- **Arquivo:** `src/components/student/VideoPlayer.tsx:241-248`
- **Descrição:** ESLint `@next/next/no-img-element` warning. Como é URL externa (`img.youtube.com`) e thumbnail decorativo, é aceitável, mas deveria ter `eslint-disable` explícito ou usar `<Image>` com `unoptimized`.
- **Status:** DOCUMENTADO

### B-14 — P2 — `forum_threads` redirect strings com query inutilizada

- **Página:** `/academy/forum`, `/academy/forum/novo`
- **Arquivo:** `forum/page.tsx:39`, `forum/novo/page.tsx:24`
- **Descrição:** `redirect('/academy/meus-cursos?erro=forum-acesso')` — o query param `?erro=forum-acesso` nunca é lido em `meus-cursos/page.tsx`. Aluno sem matrícula é redirecionado mas sem ver mensagem do erro.
- **Fix recomendado:** ler `searchParams.erro` em meus-cursos e renderizar banner explicando "Você precisa de uma matrícula ativa para acessar o fórum".
- **Status:** DOCUMENTADO

## Auditoria de ACs da Story F9.7

### AC1 — Páginas carregam sem 500/hidration error

Análise estática (não simulei carga em browser). Páginas que faltam fallback robusto:

- `dashboard/page.tsx`: usa `supabaseAdmin` para várias queries — se `cohortIds.length > 0` é false, escapa as queries mas o `lessonsByModule` map fica vazio e a UI mostra estado "Nenhuma aula iniciada ainda". OK para STUDENT sem matrícula. ✅
- `meus-cursos/page.tsx`: tem `EmptyState` em ambos os caminhos (cohort_courses vazio + sem cursos visíveis). ✅
- `curso/[slug]/page.tsx`: `notFound()` se curso não existe. Para STUDENT sem matrícula e tentando acessar slug válido: render só com módulos `LockedModuleCard`. Aceitável. ✅
- `aula/[lesson-slug]/page.tsx`: render condicional baseado em `hasAccess`. ✅ — mas ver B-04.
- `perfil/page.tsx`: profile null possible se `requireUser()` retornar mas `profiles` row faltar (improvável dado o trigger). PerfilClient tolera `profile=null`. ✅
- `agenda/page.tsx`: tolera `cohortIds` vazio. ✅
- `certificados/page.tsx`: tolera array vazio com `EmptyState`. ✅
- `forum/page.tsx` + `novo`: redireciona se sem matrícula (não 500). ✅

### AC2 — Sem vazamentos / sem console.log / sem any / fetch-error UI

- **Vazamentos:** todas as queries server-side filtram por `user.id` retornado de `requireUser()`. Não vi consultas que aceitem user_id de input. ✅
- **`console.log` de dev:** nenhum encontrado nas páginas student.
- **`any`:** PerfilClient e forum usam `as { … }` em vez de `any` puro. Aceitável. ✅
- **Fetch-error UI:** páginas não têm `error.tsx` boundary específico. Erro não tratado vai para a default Next.js (tela "Application error"). **CONCERN** — cada subseção do (student) deveria ter `error.tsx` para UI degradada.

### AC3 — A11y mínima

- **Skip-to-content:** ✅ presente em `(student)/layout.tsx:54-59`.
- **Focusable nav:** ✅ `StudentSidebar` tem `aria-current`, `aria-label`, `focus-visible:ring`.
- **Contraste:** não medi com tooling, mas variáveis CSS `--bone-mute` / `--bone-dim` parecem ter razão de contraste duvidosa em fundo `--ink`. Recomendado teste com axe-core (escopo F9.11 ou novo follow-up).
- **Aria-labels nos botões críticos:**
  - `MarkCompleteButton`: ✅ tem `aria-label`
  - `NotificationBell`: ✅ tem `aria-label`, `aria-expanded`, `aria-haspopup`
  - `VoteButton` (forum): não auditado em profundidade — escopo F9.11
  - `OnboardingWizard`: ✅ `role="dialog"`, `aria-modal`, `aria-labelledby` (mas ver B-11)
- **Action buttons de comentário:** ❌ ver B-08 (invisíveis em touch).

### AC4 — Navegação cross-module funciona em ambas direções e nunca pula módulos

- **Em ambas direções:** ✅ `globalPrev` + `globalNext` cobertos.
- **Nunca pula módulos:** ✅ ordenação por `sort_order` em ambos níveis.
- **Não leva a módulo bloqueado:** ❌ ver B-04.

### AC5 — Documento `student-bug-hunt.md`

✅ Este documento. Formato `B-NN — P{0-3} — {título}` adotado.

### AC6 — Bugs P0/P1 corrigidos dentro da story; P2/P3 documentados

⚠️ **Não atendido neste sweep**: o agente sites-qa tem permissão read-only no código (Write/Edit ausentes intencionalmente). Os bugs P0 (B-01) e P1 (B-02 a B-06) estão **DOCUMENTADOS** mas não corrigidos. **Requer follow-up**:

- **B-01 (P0)** precisa fix imediato (segurança) — escalar para sites-dev
- **B-02 a B-06 (P1)** podem entrar em sprint próximo

## Resumo

| Severidade | Quantidade |
|------------|------------|
| P0 | 1 (B-01) |
| P1 | 5 (B-02, B-03, B-04, B-05, B-06) |
| P2 | 4 (B-07, B-08, B-09, B-14) |
| P3 | 4 (B-10, B-11, B-12, B-13) |
| **Total** | **14** |

## Recomendação ao team-lead

1. **Imediato:** abrir story F9.7-fix dedicada para B-01 (P0 segurança) e atribuir a sites-dev (Rex-S ou Novael).
2. **Próximo sprint:** bundlar B-02 a B-06 numa story de follow-up (links/N+1).
3. **Cleanup oportunístico:** B-07 a B-14 podem ser fixados em PRs avulsos.
4. **F9.11 (a11y deep dive):** confirmar contraste de `--bone-mute` / `--bone-dim` e auditar VoteButton/ReplyCard que não foram auditados aqui.
