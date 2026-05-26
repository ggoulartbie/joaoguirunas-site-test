---
title: "ADR-LP: Landing pages de cursos (5 LPs — captura de lead)"
type: adr
status: proposed
date: 2026-05-26
author: sites-architect (Zaelion)
tags: [adr, landing-pages, cursos, lead-capture, crm, em-breve]
related:
  - "[[../project/architecture]]"
  - "[[../stories/backlog/LP-1.1-server-action-create-lead-only]]"
  - "[[../stories/backlog/LP-1.2-shared-components-cursos]]"
  - "[[../stories/backlog/LP-2.1-curso-ia-agentes]]"
  - "[[../stories/backlog/LP-2.2-curso-design]]"
  - "[[../stories/backlog/LP-2.3-curso-dev]]"
  - "[[../stories/backlog/LP-2.4-curso-social-media]]"
  - "[[../stories/backlog/LP-2.5-curso-bundle]]"
  - "[[../stories/backlog/LP-3.1-qa-gate-landing-pages]]"
---

# ADR-LP: Landing pages de cursos (5 LPs — captura de lead)

## Status

**Proposed** — 2026-05-26 por Zaelion (sites-architect). Aguarda implementação após aprovação do lead (team-os) na branch `feat/landing-pages-cursos`.

## Contexto

O PO solicitou 5 landing pages de venda destinadas a tráfego pago — uma por área de especialidade do curso e uma para o pacote bundle. As 4 áreas espelham a estrutura real do conteúdo já mapeado em `src/app/curso-online/_components/CursoOnlineTimeline.tsx`:

1. **IA & Agentes** (`curso-ia-agentes`) — Claude Code, agentes autônomos, automação. Cobre módulos 1–4 do curso (Fundamentos + Centro de Treinamento de Agentes) + transversais.
2. **Design com IA** (`curso-design`) — Claude Design, design systems com IA. Módulo 5 do curso.
3. **Dev com IA** (`curso-dev`) — sites com Github/Vercel + dev com Supabase. Módulos 6 + 10 do curso.
4. **Social Media & Conteúdo** (`curso-social-media`) — squad de conteúdo (Freepik, Eleven Labs, Heygen, Meta API). Módulo 7 do curso.

A quinta LP (`curso-bundle`) vende o pacote dos 4 juntos — posicionada como a oferta principal (paralelo da "Mentoria"), permitindo upsell em ads que tocam dores transversais.

### Restrições conhecidas

- **Sem InfinityPay/Stripe nesta fase.** O CTA não dispara checkout — apenas captura lead. O botão de compra fica visível, porém marcado **"Em Breve"** e desabilitado.
- **Lead vai pro CRM externo** (`https://crm.joaoguirunas.com/`) via webhook já configurado em `settings.crm_webhook_url` (mesmo destino usado por `fireCrmWebhook` em `src/app/actions/checkoutPublic.ts:41-63`).
- Tráfego pago independente por LP → cada uma precisa funcionar isolada sem dependência de navegação interna.
- Branch ativa: `feat/landing-pages-cursos`. Push somente após GO do QA e aprovação do lead, conforme regra absoluta do projeto.
- Stack do projeto: Next.js 15 (App Router) + Tailwind v4 + Supabase + TypeScript. Identidade visual KV laranja `#FF3A0E` + Fraunces display serif + Roboto Mono.

## Decisões

### D1 — Estrutura de rotas (App Router)

Cada LP vira uma rota top-level em `src/app/<slug>/page.tsx`:

```
src/app/curso-ia-agentes/page.tsx
src/app/curso-design/page.tsx
src/app/curso-dev/page.tsx
src/app/curso-social-media/page.tsx
src/app/curso-bundle/page.tsx
```

**Por quê top-level e não `/cursos/[slug]/`?**
- SEO/tráfego pago: URLs curtas, semânticas, sem segmento desnecessário (`/curso-ia-agentes` > `/cursos/ia-agentes`).
- Cada LP tem conteúdo **estaticamente diferente** (copy, módulos cobertos, depoimentos, FAQ específico) — segmento dinâmico forçaria a centralizar em config + introduzir lookup. Mais código, menos clareza.
- Convenção do projeto: `src/app/curso-online/` já é rota top-level. Mantém paralelismo.

**OUT:** rota dinâmica `/cursos/[slug]` (descartada).

### D2 — Componentes compartilhados em `src/app/cursos/_shared/`

Tudo que é genérico entre as 5 LPs vai pra `src/app/cursos/_shared/` (underscore = pasta privada do App Router, não vira rota). Estrutura:

```
src/app/cursos/_shared/
├── LeadForm.tsx              # form de captura (Nome + Email + WhatsApp)
├── ComingSoonCTA.tsx         # botão "Em Breve" estilizado + helper
├── CursoHero.tsx             # hero parametrizado (eyebrow, headline, subhead, badges)
├── CursoBenefits.tsx         # bloco de diferenciais parametrizado
├── CursoCurriculum.tsx       # timeline de módulos parametrizada
├── CursoFacilitadores.tsx    # bloco facilitadores (igual em todas)
├── CursoFaq.tsx              # accordion parametrizado por items
├── CursoFinalCTA.tsx         # CTA final + bloco de inscrição
├── PhoneField.tsx            # reuso (movido de curso-online/_components/)
└── types.ts                  # tipos compartilhados (CursoConfig, FaqItem, Module, etc.)
```

**Critério de extração:** algo vira shared quando 2+ LPs usam a mesma estrutura visual com dados diferentes. Componentes que aparecem em **somente uma** LP (ex.: visualização específica do bundle com grid de 4 cursos) ficam em `src/app/<slug>/_components/`.

**Por que `cursos/` e não `_shared/` na raiz?**
- Namespace claro: todo material das LPs vive sob `src/app/cursos/_shared/`.
- Possibilita evoluir mais tarde para uma rota `/cursos` (listing público) sem conflito.

### D3 — Reuso vs novo: estratégia

Análise de cada componente do `curso-online/_components/`:

| Componente atual | Estratégia | Notas |
|---|---|---|
| `CursoOnlineHero` | **Parametrizar e extrair** para `_shared/CursoHero.tsx` | Hero é o que mais varia entre LPs (eyebrow, headline, número de módulos). Texto/badges via props. |
| `CursoOnlineDiferenciais` | **Parametrizar e extrair** para `_shared/CursoBenefits.tsx` | Recebe array `features` via prop. |
| `CursoOnlineTimeline` | **Parametrizar e extrair** para `_shared/CursoCurriculum.tsx` | Recebe `phases` via prop. Cada LP escolhe os módulos da sua área. |
| `CursoPricingCalculator` | **Não reusar** | Específico do curso online completo; LPs não calculam squad. |
| `CursoSquadSection` / `CursoSquadsSticky` | **Não reusar** | Específico do curso completo. |
| `CursoFaqAccordion` | **Parametrizar e extrair** para `_shared/CursoFaq.tsx` | Recebe `items` via prop. |
| `checkout-form.tsx` | **Substituir por `LeadForm`** (novo) | Form atual chama `createPublicCheckoutSession` (Stripe/InfinitePay) — LPs novas chamam `createLeadOnly`. |
| `PhoneField.tsx` | **Mover para `_shared/PhoneField.tsx`** | Reuso direto sem alteração. Curso-online passa a importar do shared. |
| Facilitadores (inline em `curso-online/page.tsx:153-216`) | **Extrair** para `_shared/CursoFacilitadores.tsx` | Mesma dupla João + Claudia aparece em todas as LPs. |

**Princípio:** não tocar nos componentes existentes se a parametrização não for trivial. Quando o esforço de extrair > duplicar com props, duplica e refatora depois.

### D4 — Server action `createLeadOnly` (separada)

Nova action em `src/app/actions/leadCapture.ts`:

```ts
'use server'

import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase/admin'

const schema = z.object({
  source: z.string().min(1), // slug da LP (ex.: 'curso-ia-agentes')
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().min(8).max(40),
})

export async function createLeadOnly(input: {
  source: string
  name: string
  email: string
  phone: string
}): Promise<{ ok: true } | { error: string }> {
  const parsed = schema.safeParse(input)
  if (!parsed.success) return { error: 'Dados inválidos.' }
  // 1. Disparar webhook CRM (fire-and-forget, igual fireCrmWebhook)
  // 2. Disparar webhook secundário fireLeadWebhook (mesmo destino atual)
  // 3. Não persiste em payments/users (são leads, não compradores)
  // 4. Retorna ok:true → form mostra estado "Recebemos seu contato!"
}
```

**Por que action separada e NÃO adaptar `createPublicCheckoutSession`?**

Análise:
- `createPublicCheckoutSession` (em `src/app/actions/checkoutPublic.ts`) tem **fluxo distinto**: lookup de cohort, validação `is_purchasable`, criação de pagamento PENDING (InfinitePay), criação/lookup de user via `findOrCreateUser`, redirect para checkout do provider. Tudo isso é desnecessário para captura de lead.
- Adaptar criaria branches do tipo `if (mode === 'lead-only')` por toda a função, aumentando complexidade ciclomática e risco de regressão em produção (o curso online vendido hoje passa por essa action).
- **Defesa em profundidade:** action de lead não toca em `payments`, `users`, `cohorts`. Se invasor descobrir o endpoint via brute force, não há blast radius além de leads ruins no CRM.
- `fireCrmWebhook` será extraído para `src/lib/crm/webhook.ts` para reuso entre as duas actions (refactor mínimo).

**OUT:** persistir leads no Supabase (`leads` table). Fonte da verdade é o CRM externo. Não vamos duplicar pipeline.

### D5 — Estratégia "Em Breve" no CTA

O botão de compra **NÃO some** — fica visível, estilizado e desabilitado, com label "Em Breve" e tooltip explicativo. Razão: ads de tráfego pago precisam de um CTA visual forte; remover o botão de "comprar" e ter só "deixe seu email" reduz conversão.

Padrão de UX:
```
[ Em Breve — R$ XXX ]  (desabilitado, opacity 60%, sem cursor pointer)
↓
Cadastre-se e seja o primeiro a saber:
[ Nome ] [ Email ] [ WhatsApp ]
[ Quero ser avisado(a) → ]
```

Componente `<ComingSoonCTA price={797} />` renderiza o botão visual + o form de captura abaixo, e o submit aciona `createLeadOnly` com `source = slug`.

**Anti-recorrência:** o botão "Em Breve" tem `aria-disabled="true"`, `tabIndex={-1}` e não é um `<button type="submit">` — não pode ser confundido com o submit do form de captura logo abaixo, evitando double-fire ou disparo acidental.

### D6 — Conteúdo por LP (mapeamento curso → LP)

Cada LP referencia apenas os módulos da sua área. Mapping autoritativo:

| LP | Slug | Módulos cobertos | Headline angle |
|---|---|---|---|
| IA & Agentes | `curso-ia-agentes` | M1 (O que é possível), M2 (Fundamentos Claude Code), M3 (Setup), M4 (Centro de Treinamento) | "Construa agentes autônomos com Claude Code" |
| Design com IA | `curso-design` | M5 (Claude Design — Design System) | "Design systems profissionais com IA, sem ser designer" |
| Dev com IA | `curso-dev` | M6 (Squad Sites — Github/Vercel), M10 (Squad Dev — Supabase) | "Sites e apps no ar, sem escrever código" |
| Social Media | `curso-social-media` | M7 (Squad Social Media — Freepik/Eleven Labs/Heygen/Meta) | "Produção e publicação de conteúdo no piloto automático" |
| Bundle | `curso-bundle` | Todos (M1–M10) | "O pacote completo: a squad de IA por trás do seu negócio" |

**OUT:** ajustar `CursoOnlineTimeline` para refletir esse mapeamento. Cada LP tem seu próprio array `phases` injetado via prop.

### D7 — SEO e metadata

Cada LP recebe:
- `metadata.title` específica (≤ 60 caracteres) — formato: `Curso de {Área} | Aprenda com IA — João Guirunas`
- `metadata.description` específica (≤ 160 caracteres) com angle de venda da LP
- `alternates.canonical` apontando para si mesma
- `openGraph.images` e `twitter.card` padronizados (`/images/og-default.png`)
- JSON-LD `@type: "Course"` específico com `name`, `description`, `provider` e `offers.availability: "PreOrder"` (não `InStock`, porque está em "Em Breve")
- Sem `noindex` — tráfego orgânico é bem-vindo

### D8 — Tracking de origem (source)

O campo `source` passado para `createLeadOnly` é o slug da LP (ex.: `'curso-ia-agentes'`). O webhook CRM recebe esse campo no payload, permitindo que o CRM segmente leads por canal/LP. Convenção: usar **apenas o slug da rota** (sem prefixo `lp-`) para alinhar com a URL e facilitar attribution.

## Alternativas consideradas

### Alternativa A — Rota dinâmica `/cursos/[slug]/page.tsx` + JSON de config

Centralizar todas as 5 LPs em uma única rota dinâmica lendo um JSON com configuração de cada LP.

**Rejeitada porque:**
- O conteúdo de cada LP **não é homogêneo**: módulos cobertos, depoimentos, ângulo de copy, ordem de seções variam entre IA, Design, Dev, Social e Bundle. Forçar tudo num JSON gera schema gigante + ramificações condicionais.
- Build estático perde clareza: difícil saber o que está renderizando em cada slug sem ler o JSON inteiro.
- Manutenção: PO/Markting vai querer ajustar copy de uma LP sem mexer nas outras — código direto facilita.

### Alternativa B — Adaptar `createPublicCheckoutSession` para aceitar `mode: 'lead' | 'checkout'`

Reutilizar a action atual com um modo "lead-only".

**Rejeitada porque:**
- Mistura responsabilidades — action que hoje só processa compra vira hub de qualquer captura.
- Aumenta superfície de risco numa função crítica do checkout (commits recentes 9865837, 4c45721 reforçam padrão de mudanças localizadas).
- `findOrCreateUser` cria conta em `auth.users` — não queremos contas órfãs criadas a partir de leads de LP.

### Alternativa C — Persistir leads em `leads` table no Supabase

Criar tabela `leads` no banco com `source`, `name`, `email`, `phone`, `created_at`.

**Rejeitada (escopo desta ADR) porque:**
- CRM externo já é fonte da verdade; duplicação aumenta drift.
- Reabre discussão de RLS/admin para visualizar leads — fora do escopo MVP.
- Pode virar futuro Epic se PO pedir dashboard interno de leads. Por enquanto, CRM resolve.

## Consequências

### Positivas

- LPs independentes, otimizadas para tráfego pago segmentado.
- Componentes compartilhados acelerarão futuras LPs (ex.: novo curso → criar `src/app/curso-X/page.tsx` + injetar config).
- Action `createLeadOnly` isolada → defesa em profundidade.
- Refactor de `PhoneField` e webhook CRM helper (de `checkoutPublic.ts`) deixa código mais coeso.

### Negativas / trade-offs

- Curso-online atual continua usando seu próprio `checkout-form.tsx` (não migra para `LeadForm`) — convivência temporária de dois forms similares. Aceitável: têm propósitos diferentes (checkout vs lead).
- Sem persistência local de leads — se webhook CRM falhar silenciosamente, lead some. Mitigação: `createLeadOnly` loga `console.error` em caso de webhook retornar status não-2xx; PO pode pedir Sentry alert depois.
- 5 páginas top-level adicionam ao sitemap — atualizar `src/app/sitemap.ts` (incluído no escopo da story LP-2.5).

### Anti-recorrência embutida

- **Não compartilhar checkout com lead-only** (D4): nunca branchear a action de checkout para captura. Inspirado em padrão FM-3.x (módulo separado do material por lesson).
- **`source` obrigatório no payload** (D8): toda chamada de `createLeadOnly` exige slug. Sem `source`, action rejeita. Garante attribution por LP.
- **Botão "Em Breve" não-clicável** (D5): `aria-disabled`, `tabIndex=-1`, sem `<button type="submit">` — evita confusão com o submit do form de captura.
- **Webhook fire-and-forget com catch silencioso** (D4): pattern existente em `fireCrmWebhook` mantido. Não bloqueia UX se CRM cair.

## Plano de execução

Sequência:

1. **LP-1.1** (sites-dev-beta) — server action `createLeadOnly` + extract de helper webhook CRM. **Bloqueia LP-2.x.**
2. **LP-1.2** (sites-dev-alpha) — shared components + move `PhoneField` + tipos. **Bloqueia LP-2.x.**
3. **LP-2.1 → LP-2.5** (sites-dev-alpha) — em paralelo após LP-1.1 e LP-1.2 done. Cada LP é uma `page.tsx` consumindo shared + injetando config própria.
4. **LP-3.1** (sites-qa) — adversarial end-to-end após todas LP-2.x. Veredicto formal. **Bloqueia merge.**

## 5-point checklist

| # | Critério | Status |
|---|---|---|
| 1 | Título claro e objetivo | GO |
| 2 | Acceptance criteria testáveis (em cada story) | GO |
| 3 | Escopo IN/OUT explícito | GO |
| 4 | Complexidade estimada (S/M/L) | GO |
| 5 | Alinhamento com stack e estrutura do site | GO |

**Resultado:** GO 5/5. ADR pronta para sustentar implementação das 8 stories.
