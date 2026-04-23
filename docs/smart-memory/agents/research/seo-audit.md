---
title: "Research: SEO Audit Completo — joao-guirunas-site"
type: research
agent: sites-analyst
created: 2026-04-23
updated: 2026-04-23
tags: [research, seo, audit]
related: ["[[project/tech-stack]]", "[[project/conventions]]"]
---

# Research: SEO Audit Completo — joao-guirunas-site

**Decisão que informa:** Backlog de stories SEO para o sites-architect
**Solicitado por:** team-lead

---

## Resumo executivo

O site tem uma base SEO sólida: todas as 45 páginas com rota pública exportam `metadata`, canonicals estão presentes em quase todas, schema.org funciona via SkillPage template, e `/skills/claude-agent-teams` já está no sitemap. Os problemas são sistêmicos e corrigíveis em lote: **35 de 45 páginas têm títulos abaixo de 30 chars** (não aproveitam os 50-60 chars disponíveis), **43 de 45 páginas têm descriptions abaixo de 120 chars** (perdem densidade de keywords), e há 4 páginas com inconsistência de canonical (path relativo vs. URL absoluta). Nenhum H1 duplo foi detectado. Alt texts de imagens estão presentes e adequados. Dois problemas de Core Web Vitals foram confirmados.

---

## 1. Titles e Descriptions

### Estado atual

O template do layout raiz aplica `%s | João Guirunas` automaticamente. Portanto, o título final renderizado é sempre `[title do page] | João Guirunas`.

**Títulos raw (sem sufixo de template):**

| Resultado | Contagem |
|---|---|
| Títulos < 30 chars (insuficiente) | 35 |
| Títulos 30–60 chars (ideal) | 9 |
| Títulos > 60 chars | 1 (`/skills/n8n-killers`: 55 chars) |
| Sem title próprio (usa default do layout) | 1 (`/` — home page via AnimatedHero) |

Com o sufixo `| João Guirunas` (15 chars + espaços = ~17 chars), títulos < 43 chars ficam abaixo do ideal no SERP.

**Casos mais críticos (title raw muito curto):**
- `/skills/github`: `GitHub` (6 chars) → final: `GitHub | João Guirunas` (22 chars)
- `/tools/maestri`: `Maestri` (7 chars) → final: `Maestri | João Guirunas` (23 chars)
- `/skills/supabase`: `Supabase` (8 chars) → final: `Supabase | João Guirunas` (24 chars)
- `/monitor/aiox-monitor`: `AIOX Monitor` (12 chars) → final: `AIOX Monitor | João Guirunas` (29 chars)
- `/skills/vercel`: `Vercel Deploy` (13 chars) → final: `Vercel Deploy | João Guirunas` (29 chars)
- `/framework/aiox-framework`: `AIOX Framework` (14 chars) → final: 30 chars
- `/learn/meta-ads-ai`: `Meta Ads com IA` (15 chars) → final: 31 chars

**Descriptions:**

| Resultado | Contagem |
|---|---|
| Descriptions < 120 chars (insuficiente) | 43 |
| Descriptions 120–160 chars (ideal) | 2 (`/learn/anthropic-courses`, `/learn/managed-agents`) |
| Descriptions > 160 chars | 0 |
| Sem description própria (usa default do layout) | 2 (`/` home, `/open-source` — client component) |

**Caso extremo:** `/workshop-1` tem description de apenas 56 chars (`Claude Code, AIOX, Squad Creator e Obsidian — tudo em 1h`).

**`/open-source/page.tsx` é `'use client'`** — não pode exportar `metadata`. A página (rota `/open-source`) herda o metadata do layout raiz, com title "João Guirunas" e a description genérica do site. Esta é a maior lacuna individual de metadata no site.

### Recomendações

1. **`/open-source`**: Extrair um `page.tsx` Server Component wrapper que exporte `metadata` e delegue rendering ao client component atual (padrão já usado em `/workshop-1`, `/mentoria/apresentacao`). Title sugerido: `Open Source Skills para Claude Code` (36 chars + sufixo = 52). Description: descrever os 41 recursos, categorias e licença MIT (~150 chars).

2. **`/`** home: Adicionar `export const metadata: Metadata` em `src/app/page.tsx` ou verificar se o layout raiz já serve como canônico. O layout usa `siteConfig.name` como default title e `siteConfig.description` como description — tecnicamente OK, mas o description do site (103 chars) está abaixo de 120.

3. **Todos os títulos < 30 chars**: Expandir para incluir keyword principal + contexto. Exemplos de padrão: `GitHub com Claude Code — Repositórios e PRs`, `Supabase + Claude Code — Backend e Banco de Dados`, `Maestri — Comunicação entre Agentes Claude Code`.

4. **Todas as descriptions < 120 chars**: Expandir para 140–155 chars incluindo: o que a skill faz, o benefício principal, e uma keyword de cauda longa.

---

## 2. Headings

### Estado atual

**Home page (`/`):** AnimatedHero contém um `<h1>` animado com as palavras rotativas (`aprendo usando` / `aplico` / `compartilho`). H1 presente e único. Não há H2 na home (a page é só o hero). A `/open-source/page.tsx` tem `<h1>Open Source <span>Skills</span></h1>` e `<h2>` nas secoes abaixo — hierarquia correta.

**SkillPage template**: Hierarquia padrao e correta:
- `<h1>` no hero (título da skill)
- `<h2 id="what-is-heading">` na secao "O que é"
- `<h2 id="features-heading">` na secao "Como funciona"
- `<h3>` em cada feature card

Todos os 21 SkillPages herdam esse padrão. Sem H1 duplo detectado no template.

**`/mentoria/page.tsx`:** Tem `<h1>` no hero (mobile e desktop — dois elementos HTML mas apenas um visível por vez via CSS `sm:hidden` / `hidden sm:block`). Tecnicamente são dois H1 no DOM mas semanticamente apenas um é visível. Potencial problema para crawlers.

**`/skills/claude-agent-teams/page.tsx`:** Além do SkillPage (que tem H1+H2), o conteúdo adicional (Tutorial e Squads) usa `<h2>` para as seções e `<h3>` para os steps e sub-items. Hierarquia correta.

**`/workshop-1` e `/mentoria/apresentacao`**: Ambas delegam para Client Components (`WorkshopClient`, `ApresentacaoClient`) — headings não auditáveis via static analysis. Verificação manual recomendada.

### Recomendações

1. **`/mentoria` — H1 duplo no DOM**: Consolidar em um único H1 (ocultar visualmente com CSS sem remover do DOM, ou usar um único elemento com estilos diferentes por breakpoint). Manter apenas um `<h1>` no documento.

2. **Home page**: O H1 animado usa `aria-hidden` em spans internos mas o texto invisível (`invisible` aria-hidden) fornece o texto real para screen readers — pattern correto. OK.

3. **`/open-source` — H2 faltando após H1**: A home do open-source tem H1 e H2 corretos. Confirmar que a seção "Sobre" tem H2 (verificado: tem).

---

## 3. Alt Text em Imagens

### Estado atual

Todas as instâncias de `<Image>` auditadas têm `alt` definido. Qualidade geral é boa:

| Arquivo | `alt` | Avaliação |
|---|---|---|
| `animated-hero.tsx` | `"João Guirunas"` | OK — é a foto de perfil do autor |
| `Header.tsx` | `"João Guirunas"` | OK |
| `Footer.tsx` | `"Logo GrowthSales AI"`, `"Logo Claude AI"`, `"Logo Claude Code"` | OK |
| `mentoria/page.tsx` (hero mobile) | `"João Guirunas - Mentoria Claude Code"` | OK |
| `mentoria/page.tsx` (hero desktop) | `"Equipe GrowthSales AI"` | OK — imagem decorativa de pessoas |
| `mentoria/page.tsx` (bg form) | `""` (empty) | CORRETO — imagem decorativa de fundo |
| `mentoria/page.tsx` (facilitadores) | `"${f.name} - ${f.role}"` (dynamic) | OK |
| `open-source/page.tsx` (hero) | `"Equipe GrowthSales AI trabalhando com agentes autonomos e inteligencia artificial"` | Bom, keyword-rich |
| `open-source/page.tsx` (claude-logo badge) | `"Logo Claude AI"` | OK |
| `open-source/page.tsx` (cta-team) | `"Equipe GrowthSales trabalhando com inteligência artificial"` | OK |
| `SkillPage.tsx` (bgImage) | `""` (empty) | CORRETO — imagem decorativa de fundo |

**Problema detectado:** `SkillPage.tsx` usa `<Image src={bgImage} alt="" fill ...>` com alt vazio para todas as imagens de fundo de skills — isso é o comportamento correto para imagens puramente decorativas. Não é um problema.

### Recomendações

- Sem ações críticas. O padrão de `alt=""` para imagens decorativas e `alt` descritivo para imagens de conteúdo está sendo seguido consistentemente.
- Melhoria opcional: o alt `"Equipe GrowthSales AI"` no hero desktop da mentoria poderia ser mais descritivo (`"João e Claudia Guirunas — Fundadores da GrowthSales AI"`).

---

## 4. Rich Snippets / Schema.org

### Estado atual

**Schema presente no layout raiz (todas as páginas):**
- `Person`: João Guirunas, CEO, GrowthSales.ai, com `sameAs` (GitHub, LinkedIn, Twitter) — OK
- `WebSite`: com `name`, `url`, `description`, `inLanguage` — OK

**Schema presente nas SkillPages (21 páginas via `generateSkillJsonLd`):**
- `BreadcrumbList`: Home → Skills → [título da skill] — correto
- `SoftwareApplication`: com `name`, `description`, `applicationCategory: "DeveloperApplication"`, `operatingSystem: "Cross-platform"`, `offers: {price: "0"}` — correto

**Páginas com schema personalizado adicional:**
- `/` (home): nenhum adicional além dos do layout
- `/mentoria`: nenhum schema personalizado — **LACUNA**
- `/open-source`: nenhum schema — client component, sem metadata
- `/workshop-1`: nenhum schema
- `/mentoria/apresentacao`: nenhum schema

### Problemas identificados

1. **`Person` schema incompleto**: `organizationJsonLd` não inclui `alumniOf`, `knowsAbout`, `award` ou `hasCredential` — campos que o Google usa para Knowledge Panel. Não crítico, mas oportunidade.

2. **`WebSite` schema sem `potentialAction`**: SearchAction/EntryPoint melhoraria o rich snippet de sitelinks search box. Opcional.

3. **`/mentoria` sem `Course` ou `Event` schema**: Esta é a página de maior valor comercial. Um schema `Course` (ou `Event` para turmas) com `provider`, `price`, `startDate`, `numberOfCredits` aumentaria elegibilidade para rich results no SERP.

4. **`BreadcrumbList` nas SkillPages aponta para `/#skills` como item 2**: O item 2 (`Skills`) usa `https://joaoguirunas.com/#skills` (anchor na home) em vez de uma URL de página de skills dedicada. Tecnicamente válido mas não ideal — o Google pode não reconhecer anchors como breadcrumb steps distintos.

5. **`SoftwareApplication` com `author.name` stripa o `@`** no `author.replace('@', '')` — result: `joaoguirunas` em vez de `João Guirunas`. Nome sem o `@` é correto para schema.org, mas deveria ser o nome completo.

### Recomendações

1. **`/mentoria`**: Adicionar `Course` schema com `name`, `description`, `provider` (GrowthSales.ai), `offers` (preço, disponibilidade), `inLanguage: "pt-BR"`.
2. **`SoftwareApplication.author.name`**: Mudar de `author.replace('@', '')` para mapeamento de `@handle` → nome real, ou usar `siteConfig.name` para skills de `@joaoguirunas`.
3. **`Person` schema**: Adicionar `knowsAbout: ["IA", "Claude Code", "automação", "growth"]` e `url` para redes sociais individuais.

---

## 5. Open Graph e Twitter Cards

### Estado atual

**Layout raiz**: OG e Twitter Cards definidos globalmente com `type: "website"`, `locale: "pt_BR"`, OG image `/images/og-default.png` (1200×630). Twitter card `summary_large_image`. Ambos têm template de título. **Cobertura: 100% das páginas** via herança.

**Páginas com OG customizado (imagem específica):**
- `/mentoria`: `images: [{ url: '/images/mentoria-og.png', width: 1200, height: 630 }]` — OK
- Todas as SkillPages (43): herdando `og-default.png` — funciona mas não é ideal

**Páginas SEM OG customizado (usando default):**
- `/` home
- `/open-source` (client component — sem metadata)
- `/workshop-1`
- `/mentoria/apresentacao`
- Todos as 43 páginas de skills/learn/tools/framework/etc.

**Problema crítico de `/open-source`:** Como é `'use client'`, o OG desta página é o default do site (`João Guirunas` + description genérica). Ao compartilhar o link da página de open source, o preview não representa o conteúdo.

### Recomendações

1. **`/open-source`**: Resolver via wrapper server component (mesma solução do item 1 de Titles).
2. **SkillPages**: Considerar OG images dinâmicas por skill (geradas via Next.js `opengraph-image.tsx`) para aumentar CTR em compartilhamentos sociais. Escopo maior — story separada.
3. **`/workshop-1`**: Adicionar `openGraph.images` com imagem específica do workshop.

---

## 6. Canonical URLs

### Estado atual

**Inconsistência detectada**: O projeto usa dois formatos de canonical:

**Formato A — URL absoluta** (`${siteConfig.url}/path`):
```
/framework/aiox-framework: canonical: `${siteConfig.url}/framework/aiox-framework`
/learn/*: canonical: `${siteConfig.url}/learn/...`
/skills/* (maioria): canonical: `${siteConfig.url}/skills/...`
```

**Formato B — Path relativo**:
```
/skills/ai-image: canonical: '/skills/ai-image'
/skills/ai-video: canonical: '/skills/ai-video'
/skills/carousel: canonical: '/skills/carousel'
/skills/claude-agent-teams: canonical: '/skills/claude-agent-teams'
/skills/github: canonical: '/skills/github'
/skills/graphic-designer: canonical: '/skills/graphic-designer'
/skills/supabase: canonical: '/skills/supabase'
/skills/vercel: canonical: '/skills/vercel'
/mentoria: canonical: '/mentoria'
/mentoria/apresentacao: canonical: '/mentoria/apresentacao'
/workshop-1: canonical: '/workshop-1'
/layout.tsx (root): canonical: '/'
```

**Impacto**: O Next.js Metadata API aceita paths relativos e os resolve com `metadataBase` (que está definido como `new URL(siteConfig.url)` no layout raiz). Portanto, ambos os formatos produzem a mesma URL final no HTML renderizado — **não é um bug funcional**. Porém, é uma inconsistência no código que pode confundir manutenções futuras.

### Recomendações

1. Normalizar para um único formato. O Formato B (path relativo) é o recomendado pela documentação do Next.js quando `metadataBase` está definido. Migrar os ~34 canonicals no Formato A para Formato B.

---

## 7. Core Web Vitals Signals

### Problemas detectados

**CWV-01 — LCP Image sem `loading="eager"` / `priority` correto:**

- `SkillPage.tsx:123`: A imagem de fundo do hero (`bgImage`) usa `priority` — correto.
- `animated-hero.tsx:38`: A foto de perfil do João no AnimatedHero não usa `priority`. Esta imagem aparece above-the-fold na home e deveria ter `priority` para otimizar LCP.
- `open-source/page.tsx:125`: Hero image usa `priority` — correto.
- `mentoria/page.tsx:77–84`: Hero mobile usa `priority` — correto. Hero desktop usa `priority` — correto.

**CWV-02 — Images sem `sizes` prop:**

- `Header.tsx:25`: `<Image width={28} height={28}` sem `sizes` — imagem pequena fixa, impacto mínimo.
- `Footer.tsx:35,42`: Logo images sem `sizes` — imagens pequenas, impacto mínimo.
- `mentoria/page.tsx:210`: `<Image width={288} height={288}` nos cards de facilitadores sem `sizes` — estas imagens têm tamanho responsivo (44/56/72 classes Tailwind), portanto a ausência de `sizes` pode causar download de imagem maior que necessário em mobile.
- `SkillPage.tsx:123`: `fill` sem `sizes` — imagem fill em section com `min-h-[50vh]`, sem `sizes` o browser assume viewport width, baixando imagem desnecessariamente grande.

**CWV-03 — `scroll-behavior: smooth` sem `prefers-reduced-motion`:**

Verificado em `globals.css` — há uma regra `[FIX A11Y-012]` para `prefers-reduced-motion`. Porém, o `handleSmoothScroll` na `/open-source/page.tsx:113` usa `scrollIntoView({ behavior: 'smooth' })` sem verificar `window.matchMedia('(prefers-reduced-motion: reduce)')`. O CSS `@media (prefers-reduced-motion: reduce)` não cobre JavaScript scroll.

**CWV-04 — GA script no `<head>` sem `afterInteractive` strategy:**

O Google Analytics em `layout.tsx:81` usa `<script async>` diretamente no `<head>`, não o componente `next/script` com `strategy="afterInteractive"`. Isso não bloqueia render (tem `async`) mas a abordagem com `next/script` é mais otimizada para CWV no contexto Next.js.

### Recomendações

1. **Prioridade alta — `animated-hero.tsx`**: Adicionar `priority` na `<Image>` da foto de perfil (LCP candidate na home).
2. **Prioridade média — `mentoria/page.tsx` facilitadores**: Adicionar `sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, 288px"` na imagem dos cards.
3. **Prioridade média — `SkillPage.tsx` bgImage**: Adicionar `sizes="100vw"` (ou valor mais específico) na imagem fill do hero.
4. **Prioridade baixa — `open-source/page.tsx` scroll**: Verificar `prefers-reduced-motion` antes de `scrollIntoView({ behavior: 'smooth' })`.
5. **Prioridade baixa — GA script**: Migrar para `<Script id="ga" strategy="afterInteractive">` via `next/script`.

---

## 8. Sitemap

### Estado atual

O sitemap (`src/app/sitemap.ts`) é hardcoded com array manual de 61 URLs.

**Cobertura verificada:**

| Página | No Sitemap |
|---|---|
| `/` | Sim (priority 1.0) |
| `/mentoria` | Sim (priority 0.9) |
| `/open-source` | **NÃO** |
| `/workshop-1` | Sim |
| `/mentoria/apresentacao` | Sim |
| `/skills/claude-agent-teams` | Sim (adicionado em Story 1.2) |
| Todos os outros 36 `/skills/*` | Sim |
| Todos os 10 `/learn/*` | Sim |
| `/setup/claude-code` | Sim |
| `/framework/aiox-framework` | Sim |
| `/squads/xquads` | Sim |
| `/monitor/aiox-monitor` | Sim |
| `/tools/maestri` | Sim |
| `/tools/pixel-agents` | Sim |
| `/tools/animejs` | Sim |
| `/tools/instagram-cli` | Sim |

**Lacuna crítica: `/open-source` está ausente do sitemap.** Esta é a segunda página mais importante do site (41 skills indexadas, link de alto tráfego).

### Recomendações

1. **Adicionar `/open-source` ao sitemap** com `priority: 0.9` e `changeFrequency: 'weekly'` — mesma prioridade que `/mentoria`, dado o volume de conteúdo.
2. **Médio prazo**: Automatizar o sitemap via `fs.readdirSync` das rotas do App Router para evitar lacunas futuras ao adicionar páginas.

---

## Comparação de prioridade de correções

| # | Problema | Impacto SEO | Esforço | Prioridade |
|---|---|---|---|---|
| 1 | `/open-source` sem metadata (title, description, OG) | Alto | Baixo | P0 |
| 2 | `/open-source` ausente do sitemap | Alto | Mínimo | P0 |
| 3 | 35 títulos < 30 chars (sem contexto suficiente no SERP) | Alto | Médio | P1 |
| 4 | 43 descriptions < 120 chars | Alto | Médio | P1 |
| 5 | `/mentoria` sem `Course` schema | Médio | Baixo | P1 |
| 6 | `/mentoria` H1 duplo no DOM | Médio | Baixo | P1 |
| 7 | `animated-hero.tsx` LCP image sem `priority` | Médio | Mínimo | P1 |
| 8 | `SkillPage.tsx` bgImage sem `sizes` | Médio | Mínimo | P2 |
| 9 | Canonicals — inconsistência relativo vs. absoluto | Baixo (não funcional) | Médio | P2 |
| 10 | `SoftwareApplication.author.name` stripa `@` mas usa handle em vez de nome | Baixo | Mínimo | P2 |
| 11 | GA via `<script>` em vez de `next/script afterInteractive` | Baixo | Mínimo | P3 |
| 12 | `scrollIntoView smooth` sem verificar `prefers-reduced-motion` | Acessibilidade | Mínimo | P3 |

---

## Fontes

- Análise estática de 47 arquivos `page.tsx`, 3 `layout.tsx`, 5 componentes UI e 2 componentes de layout
- Next.js Metadata API docs (metadataBase + canonical resolution)
- Google Search Central — Title length guidelines (50-60 chars), Description (150-160 chars)
- Schema.org SoftwareApplication, Course, Person specs
