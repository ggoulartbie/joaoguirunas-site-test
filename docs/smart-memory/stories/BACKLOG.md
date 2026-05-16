---
title: Story Backlog
type: backlog
updated: 2026-05-16
tags: [story]
---


# Backlog de Stories

## Epic Fix Aula Aluno UX (2026-05-16)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/1.1-fix-vimeo-aspect-ratio\|FAA-1.1]] | Fix Vimeo aspect ratio — iframe cortado fora do container 16:9 | S | backlog | sites-dev-alpha |
| [[backlog/1.2-comentario-live-update\|FAA-1.2]] | Comentários sem live update — addComment retorna comment + useOptimistic | M | backlog | sites-dev-beta + sites-dev-alpha + sites-dev-gamma |
| [[backlog/1.3-sobre-aula-render-markdown\|FAA-1.3]] | Aba "Sobre a aula" exibe markdown raw — fallback não renderiza | S | backlog | sites-dev-alpha |

3 bugs UX da área do aluno detectados pelo lead. Stories independentes entre si
(podem rodar em paralelo). 1.1 e 1.3 são fixes pequenos (S). 1.2 envolve handoff
server → client (M) — sites-dev-beta ajusta `addComment` para retornar o
comment, sites-dev-alpha integra `useOptimistic` no `CommentsSection`,
sites-dev-gamma valida E2E. Todas validadas com 5-point checklist: GO (5/5).
Numeração FAA-1.x para não colidir com a Epic 1 histórica (Cleanup pós-discovery).

---

## Epic Fix Materiais (2026-05-16)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/2.1-material-download-nova-aba\|FM-2.1]] | Download de material abre em nova aba — `target="_blank"` em todos os kinds | S | active | sites-dev-alpha |
| [[backlog/2.2-admin-gerencia-materiais\|FM-2.2]] | Admin gerencia materiais da aula (listar todos os kinds + excluir + cleanup storage + rollback) | M | active | sites-dev-alpha + sites-dev-beta |

2 bugs de materiais reportados pelo lead. **FM-2.1** é fix UX da área do aluno
(`MaterialsList.tsx` faz o anchor sem `target="_blank"` para arquivos, navegando
a aba atual em PDFs/imagens servidos com `Content-Disposition: inline` pelo
Supabase). **FM-2.2** corrige gap de UX no editor de aula admin: lista existe
mas (a) botão delete não aparece para materiais `LINK` por causa do guard
`mat.storage_path && ...`, (b) optimistic update sem rollback engole erros do
server, (c) action não tolera `storagePath` nulo no `storage.remove`. Hard
delete (tabela sem `deleted_at`), cleanup de storage SIM, sem ownership
(coluna `uploaded_by` não existe). Stories independentes da Epic FAA-1.x.
Ambas validadas com 5-point checklist: GO (5/5). Prefixo FM-2.x para não
colidir com a Epic 2 histórica (Design recommendations P0–P2).

---

## Epic 1 (histórica) — Cleanup pós-discovery

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/1.1-remove-dead-code-hero-pricing-v2\|1.1]] | Remover dead code — HeroSection e PricingCalculatorV2 | S | done | sites-dev-gamma |
| [[backlog/1.2-sitemap-claude-agent-teams\|1.2]] | Adicionar /skills/claude-agent-teams ao sitemap.xml | S | done | sites-dev-gamma |
| [[backlog/1.3-remove-src-features-folder\|1.3]] | Remover src/features/ (pasta inutilizada) | S | done | sites-dev-gamma |
| [[backlog/2.1-pricing-calculator-fixes\|2.1]] | PricingCalculator V1 — fixes squad reset + aria-pressed (P0) | M | done | sites-dev-gamma |
| [[backlog/2.2-revosform-skeleton\|2.2]] | Skeleton loading no RevosForm (P1) | S | done | sites-dev-gamma |
| [[backlog/2.3-a11y-calculator-faq\|2.3]] | A11y — role=checkbox na calculadora + aria-controls no FAQ (P2) | S | done | sites-dev-gamma |

Stories 1.1–1.3 (históricas) resolvem os pontos de atenção 1, 2 (parcial — apenas inclusão da rota ausente) e 4 do [[../project/overview|overview]]. Pontos 3 (zero testes) e 5 (RevosForm externo) ficam fora deste epic.

## Epic 2 — Design recommendations P0–P2

Stories 2.1–2.3: 2.1 aplica fixes pontuais no V1 ativo (squad reset bug + aria). 2.2 e 2.3 são independentes. Decisão de lead: manter V1 (squad tabs, parcelas, trust indicators) — V2 era dead code e foi deletado na Story 1.1.

Ponto 5 do overview (RevosForm externo) é parcialmente mitigado pela Story 2.2 no quesito UX — acessibilidade interna do form Revos permanece fora de escopo (embed de terceiro).

## Epic 3 — SEO (derivado do seo-audit.md)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/3.0-open-source-metadata\|3.0]] | /open-source metadata + server wrapper (P0) | S | done | sites-dev-gamma |
| [[backlog/3.1-titles-descriptions-top10\|3.1]] | Titles e descriptions — top 10 páginas (P1) | L | done | sites-dev-gamma |
| [[backlog/3.2-course-schema-mentoria\|3.2]] | Course schema JSON-LD em /mentoria (P1) | S | done | sites-dev-gamma |
| [[backlog/3.3-h1-duplo-mentoria\|3.3]] | H1 duplo no DOM em /mentoria (P1) | XS | done | sites-dev-gamma |
| [[backlog/3.4-cwv-image-sizes\|3.4]] | CWV — sizes em imagens responsivas (P2) | S | backlog | — |

Source: [[../agents/research/seo-audit]]. Prioridade: 3.0 e 3.3 resolvem lacunas críticas. 3.1 é a maior oportunidade de tráfego (bulk titles/descriptions). 3.2 aumenta elegibilidade de rich results na página de maior valor comercial. 3.4 melhora CWV marginal.

## Epic 4 — KV Growth Sales — Unidade Visual

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/4.1-kv-global-tokens-watermark\|4.1]] | KV Global — tokens de cor, dot-grid texture e watermark diamante | S | done | sites-dev-alpha |
| [[backlog/4.2-kv-typography-display\|4.2]] | KV Tipografia — Fraunces display nos H1 principais | M | done | sites-dev-alpha |
| [[backlog/4.3-kv-mentoria-facilitadores-badges\|4.3]] | KV Mentoria — facilitadores rect style + section badges | M | done | sites-dev-alpha |
| [[backlog/4.4-kv-open-source-header-colors\|4.4]] | KV Open-Source — header editorial + unificação de cores | M | done | sites-dev-alpha |
| [[backlog/4.5-kv-token-cleanup-legacy-ff4400\|4.5]] | KV Token Cleanup — uniformizar #FF4400 legados | S | backlog | — |
| [[backlog/4.6-kv-open-source-dual-h1\|4.6]] | KV Open-Source — corrigir H1 duplo (regressão SEO/a11y) | S | backlog | — |

Source: análise KV Growth Sales (2026-04-26). Epic adapta Home, Mentoria e Open-Source ao KV da Growth Sales sem alterar logos. Foco: simbologia (watermark diamante), tipografia display (Fraunces), refinamento de tokens e section badges. Stories 4.1–4.4 concluídas (QA PASS 2026-04-26). Stories 4.5 e 4.6 são follow-ups de concerns não-bloqueantes do QA.

## Epic 5 — Cleanup pós-KV

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/5.1-remove-orphan-cat-squads-token\|5.1]] | Remover token órfão --color-cat-squads de globals.css | XS | backlog | — |

## Epic 6 — /agentes Enhancement

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/6.1-upgrade-planet-textures-4k\|6.1]] | Upgrade texturas dos planetas para 4K | S | backlog | sites-dev-gamma |
| [[backlog/6.2-enrich-agentes-json-codenames-abilities\|6.2]] | Enriquecer agentes.json com codenames, abilities e squadRole | M | backlog | sites-dev-gamma |
| [[backlog/6.3-agentcard-race-abilities-upgrade\|6.3]] | AgentCard — exibir raça alienígena + abilities + squadRole | S | backlog | sites-dev-alpha |
| [[backlog/6.4-agent-single-page-rewrite\|6.4]] | Rewrite da single page do agente com conteúdo rico | L | backlog | sites-dev-alpha |

Objetivo: elevar a qualidade visual e informacional da página /agentes. 6.1 melhora os planetas 3D. 6.2 é a base de dados para 6.3 e 6.4. 6.3 enriquece os cards da listagem. 6.4 reescreve as páginas individuais dos agentes com identidade, raça, abilities e squadRole.

---

# Epic Plataforma de Cursos (F1–F8)

Plataforma multi-curso com cohorts como unidade central. Decisões consolidadas em [[../decisions/ADR-001-plataforma-cursos-stack]]. Fonte: [[../../PRD-plataforma-cursos|PRD-plataforma-cursos]] v3.0.

## Fase 1 — Schema Supabase + Storage + Seeds

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F1.1-supabase-link-env-setup\|F1.1]] | Vincular projeto Supabase + variáveis de ambiente | S | backlog | sites-data |
| [[backlog/F1.2-schema-identidade-catalogo\|F1.2]] | Migration — Identidade + Catálogo (profiles, courses, modules, lessons, materials) | M | backlog | sites-data |
| [[backlog/F1.3-schema-cohorts\|F1.3]] | Migration — Cohorts (unidade central) | M | backlog | sites-data |
| [[backlog/F1.4-schema-pagamento-progresso-comunidade\|F1.4]] | Migration — Pagamento + Progresso + Comunidade + Auxiliares | M | backlog | sites-data |
| [[backlog/F1.5-has-access-rls-policies\|F1.5]] | Função has_access() + RLS em todas as tabelas | L | backlog | sites-data |
| [[backlog/F1.6-storage-buckets-policies\|F1.6]] | Buckets de Storage + policies | S | backlog | sites-data |
| [[backlog/F1.7-seed-dados-demo\|F1.7]] | Seed de dados demo | M | backlog | sites-data |
| [[backlog/F1.8-types-typescript-utilitarios\|F1.8]] | Geração de tipos TS + utilitários de banco | S | backlog | sites-data |

## Fase 2 — Auth Supabase + RBAC

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F2.1-auth-supabase-providers\|F2.1]] | Configuração Supabase Auth (email/senha + Google OAuth) | S | backlog | sites-dev-beta |
| [[backlog/F2.2-paginas-auth-ui\|F2.2]] | Páginas auth — login, cadastro, recuperar senha | M | backlog | sites-dev-beta |
| [[backlog/F2.3-middleware-rbac-helpers\|F2.3]] | Middleware Next.js + helpers RBAC | M | backlog | sites-dev-beta |
| [[backlog/F2.4-emails-resend-templates\|F2.4]] | Emails transacionais — Resend + React Email | M | backlog | sites-dev-beta |

## Fase 3 — Player de vídeo + Progresso + Lesson

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F3.1-video-adapter-vimeo\|F3.1]] | Video adapter + Vimeo implementation | M | backlog | sites-dev-alpha |
| [[backlog/F3.2-video-player-progresso\|F3.2]] | VideoPlayer + Server Action saveProgress | M | backlog | sites-dev-alpha |
| [[backlog/F3.3-pagina-aula-has-access-locked\|F3.3]] | Página da aula + has_access + LockedContent | L | backlog | sites-dev-alpha |
| [[backlog/F3.4-renderizacao-mdx-html-markdown\|F3.4]] | Renderização triplo formato (MDX, HTML, Markdown) | M | backlog | sites-dev-alpha |
| [[backlog/F3.5-dashboard-meus-cursos-curso\|F3.5]] | Dashboard + /meus-cursos + /curso/[slug] | M | backlog | sites-dev-alpha |

## Fase 4 — Comments + Materials

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F4.1-comments-aulas\|F4.1]] | Sistema de comments nas aulas | M | backlog | sites-dev-alpha |
| [[backlog/F4.2-materials-storage-signed-url\|F4.2]] | Materials — listagem e download via signed URL | S | backlog | sites-dev-alpha |

## Fase 5 — Forum + Live Sessions + Certificates

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F5.1-forum-categorias-threads\|F5.1]] | Fórum — categorias, threads e replies | L | backlog | sites-dev-alpha |
| [[backlog/F5.2-agenda-live-sessions\|F5.2]] | /agenda + live_sessions | M | backlog | sites-dev-alpha |
| [[backlog/F5.3-certificados-pdf-verificacao\|F5.3]] | Certificates — geração PDF + página pública | M | backlog | sites-dev-alpha |

## Fase 6 — Área Administrativa

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F6.1-admin-dashboard-metricas\|F6.1]] | Admin Dashboard com métricas | M | backlog | sites-dev-delta |
| [[backlog/F6.2-admin-crud-courses-modules-lessons\|F6.2]] | CRUD courses, modules, lessons | XL | backlog | sites-dev-delta |
| [[backlog/F6.3-admin-crud-cohorts\|F6.3]] | CRUD de cohorts (coração comercial) | XL | backlog | sites-dev-delta |
| [[backlog/F6.4-admin-usuarios-pagamentos-moderacao\|F6.4]] | Usuários, pagamentos, moderação, fórum | L | backlog | sites-dev-delta |

## Fase 7 — Stripe e Checkout

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F7.1-payment-adapter-stripe\|F7.1]] | Payment adapter + Stripe implementation | M | backlog | sites-dev-gamma |
| [[backlog/F7.2-sync-cohort-stripe\|F7.2]] | Sincronização Cohort ↔ Stripe | L | backlog | sites-dev-gamma |
| [[backlog/F7.3-checkout-session-entry-extension\|F7.3]] | createCheckoutSession (decide ENTRY vs EXTENSION) | M | backlog | sites-dev-gamma |
| [[backlog/F7.4-webhook-stripe-cross-extensions\|F7.4]] | Webhook Stripe + idempotência + cross extensions | XL | backlog | sites-dev-gamma |
| [[backlog/F7.5-auto-renewal-cron\|F7.5]] | Renovação automática + cron diário | L | backlog | sites-dev-gamma |
| [[backlog/F7.6-emails-pagamento-renovacao\|F7.6]] | Templates de email — pagamento e renovação | S | backlog | sites-dev-gamma |
| [[backlog/F7.7-perfil-historico-matriculas-renovar\|F7.7]] | /perfil — histórico, matrículas, recompra | M | backlog | sites-dev-gamma |
| [[backlog/F7.8-turmas-lp-publicas\|F7.8]] | /turmas listagem + /turmas/[slug] LP automática | M | backlog | sites-dev-gamma |

## Fase 8 — Polimento e Deploy

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F8.1-notifications-onboarding\|F8.1]] | Notifications in-app + onboarding | M | backlog | sites-dev-alpha |
| [[backlog/F8.2-emails-restantes-lembretes\|F8.2]] | Emails restantes (session lembrete, novo material) | S | backlog | sites-dev-alpha |
| [[backlog/F8.3-mobile-acessibilidade\|F8.3]] | Responsividade mobile + acessibilidade WCAG AA | L | backlog | sites-dev-alpha |
| [[backlog/F8.4-observabilidade-sentry-analytics\|F8.4]] | Sentry + Vercel Analytics | S | backlog | sites-devops |
| [[done/F8.5-e2e-playwright-tests\|F8.5]] | Testes E2E com Playwright | L | done | sites-qa |
| [[done/F8.6-deploy-vercel-producao\|F8.6]] | Deploy Vercel + produção | M | done | sites-devops |
| [[done/F8.7-smoke-test-pre-lancamento\|F8.7]] | Smoke test pré-lançamento + go-live checklist | S | done | sites-qa |

## Fase F9 — Curso Online + Admin Hardening

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F9.1-refactor-curso-online-estrutura-mentoria\|F9.1]] | Refactor /curso-online com estrutura visual da /mentoria | M | backlog | sites-dev-alpha |
| [[backlog/F9.2-auditar-checkout-stripe-curso-online\|F9.2]] | Auditar checkout Stripe da /curso-online (cohort, action, redirect, webhook) | M | backlog | sites-dev-beta |
| [[backlog/F9.3-validar-acesso-admin-middleware\|F9.3]] | Validar gate de acesso /academy/admin (middleware + RBAC) | S | backlog | sites-dev-delta |
| [[backlog/F9.4-bug-hunt-academy-admin\|F9.4]] | Bug hunt sweep nas páginas /academy/admin/* | L | backlog | sites-dev-delta |
| [[backlog/F9.5-auditar-apis-admin\|F9.5]] | Auditar APIs em /api/admin/* | S | backlog | sites-dev-beta |
| [[backlog/F9.6-admin-editor-encontros-ao-vivo\|F9.6]] | Editor completo de Encontros ao Vivo no admin de turmas | M | done | Kronilux |
| [[backlog/F9.7-auditar-fluxo-certificados\|F9.7]] | Auditar fluxo de certificados (emissão, download PDF, verificação pública) | M | backlog | sites-dev-alpha |
| [[backlog/F9.8-auditar-videoplayer-progresso\|F9.8]] | Auditar VideoPlayer + flow de progresso (saveProgress, markComplete, edge cases) | M | backlog | sites-dev-alpha |
| [[backlog/F9.9-auditar-has-access-rpc\|F9.9]] | Auditar has_access RPC + gates de acesso a aulas e módulos | M | backlog | sites-data |
| [[backlog/F9.10-auditar-dashboard-meus-cursos-agenda\|F9.10]] | Auditar dashboard + meus-cursos + agenda do aluno (queries cross-cohort, expiração, livestreams) | M | backlog | sites-dev-alpha |
| [[backlog/F9.11-auditar-comments-forum-permissions\|F9.11]] | Auditar comments + fórum (permissions, RLS bypass via supabaseAdmin, moderação) | M | backlog | sites-dev-alpha |
| [[backlog/F9.12-auditar-area-aluno-bug-hunt\|F9.12]] | Auditar área do aluno — bug hunt + a11y sweep | L | validated | sites-qa |
| [[backlog/F9.13-auditar-server-actions-aluno-rls\|F9.13]] | Auditar Server Actions do aluno + integridade RLS | M | validated | sites-dev-beta |
| [[backlog/F9.14-auditar-fluxos-auth\|F9.14]] | Auditar fluxos auth (login, cadastro, recuperar/redefinir senha) | M | validated | sites-dev-beta |
| [[backlog/F9.15-auditar-apis-publicas-jobs\|F9.15]] | Auditar APIs públicas e jobs (webhooks, crons, certificado) | M | validated | sites-dev-beta |
| [[backlog/F9.16-auditar-components-student\|F9.16]] | Auditar components student críticos (VideoPlayer, Materials, Comments) | M | validated | sites-dev-alpha |
| [[backlog/F9.17-payments-unique-stripe-session\|F9.17]] | UNIQUE constraint em payments(stripe_checkout_session_id) + ON CONFLICT no webhook | S | validated | sites-data + sites-dev-beta |
| [[backlog/F9.18-p1-cleanup-area-aluno\|F9.18]] | P1-cleanup F9.12 — bugs B-02 a B-06 (Stripe link, /turmas link, cross-module nav, N+1 fórum) | M | validated | sites-dev-alpha + sites-dev-beta |

Objetivo: refinar a página /curso-online (espelhando /mentoria sem elementos presenciais/ao vivo/bônus) e endurecer a área administrativa antes do lançamento. Stories F9.3–F9.5 podem rodar em paralelo. F9.1 e F9.2 são independentes mas relacionadas (F9.2 garante que o CTA de F9.1 funciona). F9.6 completa o CRUD de live_sessions no admin (faltam UPDATE, description, recording_url, UX).

**Auditoria granular técnica (F9.7–F9.11)**: stories focadas em comportamento e regras de negócio, técnicas e específicas (referenciam linhas exatas de código). F9.7 corrige TODO crítico em `/api/certificado/[code]` (rota retorna mock em produção). F9.8 audita race conditions e edge cases do VideoPlayer (95% threshold, double-tab, swap provider). F9.9 audita o RPC `has_access` e o fallback `hasGlobalAccess` — barreira de autorização cross-cohort. F9.10 valida queries cross-cohort em dashboard/meus-cursos/agenda (incluindo janela de meeting_url). F9.11 audita permissões e moderação em comments + fórum, justificando bypasses via `supabaseAdmin`. Já em curso: sites-qa (F9.7-relacionado) e sites-dev-beta (F9.9/F9.10).

**Auditoria de cobertura ampla (F9.12–F9.16)**: stories complementares cobrindo segurança/funcionalidade transversal. F9.4 cobriu admin pages, F9.5 cobriu APIs admin, F9.2 cobriu checkout. F9.12 estende o bug hunt para o lado student. F9.13 audita Server Actions e RLS. F9.14 audita os 4 fluxos auth. F9.15 audita webhooks/crons/certificado público. F9.16 audita components críticos (XSS, signed URL TTL, video_id leak). Podem rodar em paralelo entre si — sem dependências. Foco: auditoria + fixes P0/P1, sem features novas. Reservadas para o próximo ciclo.

**F9.17 — UNIQUE constraint em payments**: gap identificado por Rex-S durante a auditoria. Migration + ON CONFLICT no webhook. Idempotência ao nível DB.

**F9.18 — P1-cleanup F9.12**: 5 bugs P1 abertos pelo sites-qa durante o bug-hunt da área do aluno (F9.12). B-02 (Stripe `/test/` em prod) e B-03 (link `/turmas/` inexistente) são fixes pequenos de UI. B-04 (cross-module nav sem gate `has_access`) bloqueia AC4 da F9.12. B-05/B-06 (N+1 no fórum) são performance — index e detail. Coordena sites-dev-alpha (UI/nav) e sites-dev-beta (queries).

## Fase F13 — Admin Destructive Actions + InfinitePay Hardening Operacional

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F13.1-excluir-aluno-admin\|F13.1]] | Excluir aluno no admin (auth.admin.deleteUser + confirmação dupla) | M | backlog | sites-dev-delta |
| [[backlog/F13.2-excluir-pagamentos-pendentes-admin\|F13.2]] | Excluir pagamentos pendentes no admin (guard status=PENDING) | S | backlog | sites-dev-delta |
| [[backlog/F13.4-infinitepay-static-url-warning-setup-guide\|F13.4]] | Aviso link estático no CohortForm + guia turma de teste R$1 | S | backlog | sites-dev-alpha |

**Objetivo:** completar o admin com ações destrutivas faltantes (Pipeline A) e endurecer operação InfinitePay (Pipeline B). F13.1 adiciona delete de conta na `UserProfileModal` (complementa o ban/unban). F13.2 adiciona delete de pagamentos PENDING na tabela (complementa o refund de APPROVED). F13.4 alerta admin sobre trade-off do link estático em `CohortForm` (não rastreia pagamento via webhook) e cria guia operacional `docs/smart-memory/ops/infinitepay-setup-guide.md` para criar turma de teste R$1 end-to-end. Stories independentes entre si, podem rodar em paralelo.

**Pipeline A (F13.1/F13.2):** research do analyst-1.
**Pipeline B (F13.4):** research do analyst-2 (decisão do lead 2026-05-11). O GAP 1 reportado ("Bearer Token não implementado") foi descartado — adapter já está correto, autenticando via campo `handle` no body conforme runbook `checkout-infinitepay.md`. A nota incorreta originou de QA results em `docs/smart-memory/agents/qa/results.md` (F12.1).

**Não-objetivos:** soft delete, bulk delete, audit log, cancelamento de sessão Stripe/InfinitePay remota, alterações no adapter `infinitepay.ts` (já correto), criação programática de turma de teste.

## Fase F12 — InfinitePay (segundo provider de pagamento)

| Story | Título | Complexidade | Status | Agente |
|---|---|---|---|---|
| [[backlog/F12.1-infinitepay-adapter-webhook\|F12.1]] | InfinitePayAdapter + webhook handler (createCheckoutLink, payment_check, idempotência via order_nsu) | M | validated | sites-dev-beta |
| [[backlog/F12.2-infinitepay-migration-admin-ui-dual-provider\|F12.2]] | Migration cohorts.payment_provider + admin UI dual-provider (CohortForm) | M | validated | sites-data + sites-dev-alpha |
| [[backlog/F12.3-checkout-router-por-provider\|F12.3]] | Router de checkout por provider (Stripe vs InfinitePay) em checkoutPublic + página de sucesso | S | validated | sites-dev-beta |

**Objetivo:** habilitar InfinitePay como segundo provider de pagamento, configurável por cohort. Default permanece Stripe (backwards-compatible). InfinitePay não tem assinatura HMAC — segurança via `payment_check` server-to-server. Idempotência via `order_nsu` (UUID gerado server-side, igual a `payments.id`).

**Dependências:** F12.1 (adapter + webhook + coluna `infinitepay_order_nsu` em payments) deve completar antes ou em paralelo a F12.3 (router). F12.2 (migration `payment_provider` + UI) precisa estar antes de F12.3 (que lê a coluna). F12.1 e F12.2 podem rodar em paralelo. F12.3 depende das duas.

**Numeração:** epic F12 escolhido por ser o próximo livre (F1–F11 já em uso, F10/F11 em done).

## Notas de orquestração

- **Sequencial estrita**: F1 → F2 → F3 (em paralelo F3 e F4). F5/F6 em paralelo após F3-F4. F7 depende de F2, F3 e F6 (LP usa cohort do admin). F8 fecha tudo
- **Maior risco**: F7.4 (webhook idempotência + cross extensions) — assignar dev mais experiente
- **Story mais detalhada**: F1.5 (RLS) — vazamento de dados é risco crítico do ADR-001
- **Sugestão de squads** (PRD Seção 13):
  - Architect → F1 (sites-data, sites-architect supervisão)
  - Auth Engineer → F2 (sites-dev-beta)
  - Student Frontend → F3, F4, F5 (sites-dev-alpha)
  - Admin Frontend → F6 (sites-dev-delta)
  - Payment Engineer → F7 (sites-dev-gamma)
  - DevOps → F8.4, F8.6 (sites-devops); QA → F8.5 (sites-qa)

## Follow-ups pós-ciclo F9+F12 (2026-05-10)

### F12.4 — Hardening InfinitePay (pre-launch blocker)
- **CONCERN-1:** gate `paid_amount >= amount_cents` em `route.ts:138-139` (✅ já fixado em commit 55e1339)
- **CONCERN-4:** Sentry alert no branch `null user_id + null customer_email` (✅ já fixado em commit 55e1339)
- Status: resolvido no follow-up push

### F12.5 (opcional) — Cleanup tipos InfinitePay
- CONCERN-2: coluna `infinitepay_order_nsu TEXT` → migrar para UUID em próxima migration
- CONCERN-5: regenerar `database.types.ts` para cobrir `increment_filled_seats` RPC e remover `as any`

### F9.x cleanup (baixa prioridade)
- Follow-ups documentação de F9.13 (cobertura de testes), F9.14 (OAuth whitelist no Dashboard), F9.15 (crons Supabase Edge Functions — já migrados em F11.1)
