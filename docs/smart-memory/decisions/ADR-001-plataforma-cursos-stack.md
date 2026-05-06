---
title: "ADR-001: Stack e arquitetura da Plataforma de Cursos"
type: adr
status: accepted
date: 2026-05-05
author: sites-architect (Zaelion)
tags: [adr, plataforma-cursos, stack, supabase, stripe, vimeo, nextjs]
related: [[../project/architecture]]
---

# ADR-001: Stack e arquitetura da Plataforma de Cursos

## Status

**Accepted** — 2026-05-05

## Contexto

João Guirunas precisa de uma plataforma própria multi-curso com:

- Mentoria high-ticket presencial (R$ 8.700, 6 meses)
- Curso online evergreen (R$ 499, 6 meses)
- Operação solo (admin precisa ser completo e usável por uma pessoa)
- Sem dependência de Hotmart/Kiwify
- Recompra para extensão de prazo
- Extensão cruzada entre turmas (mentorado paga online, ganha mais 180 dias na mentoria)

Fonte: [[../../PRD-plataforma-cursos.md|PRD-plataforma-cursos]] v3.0.

## Decisões consolidadas

Esta ADR consolida as 18 decisões da **Seção 15 do PRD** como registro histórico autoritativo.

### 1. Modelo de domínio

| # | Decisão | Justificativa |
|---|---|---|
| **D1** | Cohort (turma) é a unidade central, não "nível de acesso" | Mesma aula em N turmas sem duplicar; vendável e privada usam o mesmo modelo |
| **D4** | Acesso via cohorts, não via níveis | `cohort_members` + `cohort_courses` + `has_access()` cobrem todos os casos |
| **D6** | Materiais vinculados à lesson, herdam acesso | Sem regra de acesso própria; simplifica policy |
| **D9** | Cohorts vendáveis ou privadas usam o mesmo modelo | `is_purchasable` e `has_public_page` controlam exposição |

### 2. Comercial

| # | Decisão | Justificativa |
|---|---|---|
| **D3** | Pagamento único; recompra estende prazo | Modelo high-ticket não combina com assinatura; recompra é o motor de retenção |
| **D10** | Preço entry + extension por cohort | Reentrada custa menos que entrada (psicologia + retenção) |
| **D11** | Elegibilidade pra extension é vitalícia | Histórico em `cohort_members` (mesmo EXPIRED/REMOVED) qualifica para preço de extensão |
| **D12** | Recompra antes de expirar soma ao prazo restante | `expires_at = max(expires_at, now()) + extension_duration_days` |
| **D13** | Renovação automática é opt-in via Stripe Subscription Schedule | Aluno autoriza explicitamente; default é off |
| **D14** | Cross extension suportada nativamente | Tabela `cohort_cross_extensions` aplicada no webhook |
| **D15** | Conteúdo bloqueado é visível com cadeado + CTA upsell | Conversão > esconder; aluno vê o que pode comprar |

### 3. Conteúdo

| # | Decisão | Justificativa |
|---|---|---|
| **D5** | Vídeo via Vimeo Standard com domain-locking | Adapter `/lib/video/` permite trocar pra Cloudflare Stream depois sem refactor |
| **D7** | Fórum geral único, sem categorias por cohort | Comunidade unificada; categorias são tópicas (Dúvidas, Geral, Networking) |
| **D8** | 3 formatos de conteúdo de lesson: MDX, HTML, Markdown | MDX para componentes ricos; HTML para conteúdo legado/colado; Markdown para velocidade |
| **D16** | Drip por dias está fora do MVP | Cohort com `start_date` e disponibilidade total já cobre 90% dos casos |

### 4. Stack técnica

| # | Decisão | Valor | Justificativa |
|---|---|---|---|
| **D2.1** | Framework | Next.js 15 + TypeScript App Router | RSC + Server Actions reduzem complexidade de API |
| **D2.2** | Banco + Auth + Storage | Supabase (Postgres + Auth + Storage) | Único provider para 3 camadas; RLS é mecanismo central de autorização |
| **D2.3** | Cliente DB | Supabase JS puro, **sem ORM externo** | RLS vive no banco; ORM adicionaria abstração desnecessária |
| **D2.4** | Estilo | Tailwind + shadcn/ui | Já é padrão do site; reaproveitar tokens KV |
| **D2.5** | Validação | Zod | Schema reutilizável entre Server Action e form |
| **D2.6** | Forms | React Hook Form | Performance e DX |
| **D2.7** | Email | Resend + React Email | Templates como componentes |
| **D2.8** | Pagamento | Stripe Checkout | Hosted page; PCI fora do escopo |
| **D2.9** | Vídeo | Vimeo Standard (com adapter) | Domain-locking básico; trocável |
| **D2.10** | Storage de materiais | Supabase Storage | Buckets com policies; signed URLs com expiração |
| **D2.11** | Editor MDX | next-mdx-remote + Shiki | RSC-friendly; syntax highlighting server-side |
| **D2.12** | Editor WYSIWYG | TipTap | ProseMirror; extensível |
| **D2.13** | HTML puro | DOMPurify server-side | Sanitização ANTES de salvar; nunca renderizar HTML do admin sem passar por aqui |
| **D2.14** | PDF (certificados) | @react-pdf/renderer | React API; gerável em Server Action |
| **D2.15** | Cron | Vercel Cron + Supabase Edge Functions | Vercel para tarefas próximas da app; Edge para tarefas de banco pesadas |
| **D2.16** | Hospedagem | Vercel | Match com Next.js; deploy preview por PR |
| **D2.17** | Observabilidade | Sentry + Vercel Analytics | Erros + Web Vitals |

### 5. Convenções

| # | Decisão | Valor |
|---|---|---|
| **D17** | Supabase project | `mksmmpfyqowuzjcchhkl` (já provisionado) |
| **D18** | Idiomas | Banco em inglês (`cohort`, `class_members`); UI em português (`turma`, `alunos da turma`); ADRs em português; slugs no produto em português (`/turmas`, `/meus-cursos`) |

## Consequências

### Positivas

- **Cohort-centric** elimina ambiguidade entre "produto" e "acesso" — uma única tabela controla quem vê o quê
- **Função `has_access()`** centraliza autorização: usada em RLS, em Server Components e em adapters de Storage/Vimeo. Mudança de regra de acesso é mudança em uma função
- **Adapters** (vídeo, pagamento) isolam fornecedores. Trocar Vimeo por Cloudflare Stream ou Stripe por outro PSP não toca regra de negócio
- **Sem ORM** elimina camada de tradução de tipos; `supabase gen types` produz tipos alinhados com o schema
- **Idiomas separados** (banco EN / UI PT) evita gambiarra de tradução em queries; tradução acontece nas borders

### Negativas e mitigações

| Consequência | Mitigação |
|---|---|
| RLS mal configurado vaza dados | Testes automatizados de policies em F1; auditoria manual antes de cada deploy |
| Webhook Stripe dessincroniza membership | Idempotência via `webhook_events.stripe_event_id`; endpoint `/admin/pagamentos/[id]/reprocessar` |
| Vimeo Standard limita storage | Monitorar 70% do limite; ADR de migração para Cloudflare Stream pré-aprovada |
| HTML do admin permite XSS | DOMPurify **server-side** obrigatório antes do INSERT; nunca confiar no client |
| Sincronização Stripe ↔ Cohort divergente | `syncCohortWithStripe()` idempotente roda após cada save de cohort |
| Operação solo limita banda do admin | Admin tem que ser brutal em UX (drag-drop, atalhos, ações em lote) — investimento alto na Fase 6 |

## Não-objetivos no MVP (registro)

- Assinatura recorrente tradicional → recompra estende
- App mobile nativo → web responsivo
- Live streaming nativo → links externos (Meet/Zoom)
- Editor de vídeo embutido → upload externo
- Emissão automática de NF → manual via contador

## Riscos críticos (sumário do Capítulo 11 do PRD)

| Risco | Severidade | Owner |
|---|---|---|
| Pirataria de vídeo | Alta para mentoria | Video Engineer (watermark + domain-lock) |
| Webhook Stripe falha | Alta | Payment Engineer (idempotência + reprocessar) |
| RLS vaza dados | Crítica | Architect + DevOps (testes + auditoria) |
| HTML XSS | Alta | Content Engineer (DOMPurify server-side) |

## Referências

- [[../../PRD-plataforma-cursos.md|PRD-plataforma-cursos v3.0]]
- [[../project/architecture|architecture.md]] — padrão Next.js App Router atual
- [[../project/tech-stack|tech-stack.md]] — stack do site público
- Supabase project: `mksmmpfyqowuzjcchhkl`

## Revisão

Esta ADR é o contrato. Qualquer desvio (trocar Stripe, mudar modelo de venda, abandonar cohort-centric) requer **nova ADR** que a substitua e atualização da Seção 15 do PRD.
