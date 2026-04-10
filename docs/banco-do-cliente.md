# Banco do Cliente — GrowthSales Open Source

> Documento de referência completo para squads trabalhando no projeto. Leia inteiro antes de tocar em qualquer arquivo.

---

## 1. Visão Geral

| Campo | Valor |
|-------|-------|
| **Projeto** | GrowthSales Open Source |
| **URL produção** | `https://opensource.growthsales.ai` |
| **Repositório** | `github.com/joaoguirunas/growthsales-opensource` |
| **Branch principal** | `main` |
| **Deploy** | Vercel — push em `main` dispara build automático |
| **Dono** | João Guirunas (`@joaoguirunas`) |

**Propósito:** Plataforma de showcase e tutoriais de skills, tools e conteúdo educacional em torno de Claude Code, AIOX e ferramentas de IA. Todo conteúdo é open source e serve como portfólio técnico e geração de leads para a mentoria.

---

## 2. Stack Técnico

```
Next.js 16        — App Router, SSG
React 19          — UI
TypeScript 5.7    — tipagem estrita
Tailwind CSS 4.0  — @theme customizado (sem tailwind.config.ts)
Framer Motion     — animações (quando necessário)
Lucide React      — ícones alternativos
```

**Configurações relevantes:**

- `tsconfig.json` → path alias `@/*` aponta para `./src/*`
- `next.config.ts` → `images.formats: ['avif', 'webp']`
- `postcss.config.mjs` → usa `@tailwindcss/postcss`
- Google Analytics → `G-3JD3TYNF7V` (injetado no layout raiz)

---

## 3. Estrutura de Diretórios

```
src/
├── app/                    # App Router — todas as páginas aqui
│   ├── layout.tsx          # Layout raiz: Header, Footer, GA4, JSON-LD
│   ├── page.tsx            # Home — grid de skills com filtro por categoria
│   ├── globals.css         # Design system via @theme Tailwind 4
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── skills/             # Tutoriais de skills (22 páginas)
│   ├── learn/              # Conteúdo educacional (10 páginas)
│   ├── tools/              # Ferramentas (4 páginas)
│   ├── setup/              # Setup Claude Code
│   ├── framework/          # AIOX Framework
│   ├── squads/             # Xquads
│   ├── monitor/            # AIOX Monitor
│   └── mentoria/           # Página de mentoria (client component)
├── config/
│   └── site.ts             # siteConfig — URL, nome, redes sociais
└── shared/
    ├── components/
    │   ├── layout/         # Header.tsx, Footer.tsx
    │   └── ui/
    │       └── SkillPage.tsx  # ← componente principal de todas as páginas
    └── types/
        └── index.ts        # CategoryColor type

public/
└── images/                 # Todas as imagens estáticas
```

---

## 4. siteConfig

**Arquivo:** `src/config/site.ts`

```typescript
export const siteConfig = {
  name: 'GrowthSales Open Source',
  url: 'https://opensource.growthsales.ai',
  description: '...',
  ogImage: '/images/og-default.png',
  locale: 'pt_BR',
  lang: 'pt-BR',
  twitter: { site: '@growthsales_ai', creator: '@growthsales_ai' },
  social: {
    github: 'https://github.com/SynkraAI',
    linkedin: 'https://linkedin.com/company/growthsales-ai',
    twitter: 'https://twitter.com/growthsales_ai',
  },
};
```

**Usar sempre** `${siteConfig.url}/path` para URLs canônicas e OG.

---

## 5. Todas as Rotas de Página

### Públicas na Home Grid

#### Skills (22 páginas)
| Rota | Arquivo |
|------|---------|
| `/skills/ai-image` | `src/app/skills/ai-image/page.tsx` |
| `/skills/ai-video` | `src/app/skills/ai-video/page.tsx` |
| `/skills/remotion` | `src/app/skills/remotion/page.tsx` |
| `/skills/remote-control` | `src/app/skills/remote-control/page.tsx` |
| `/skills/design-system` | `src/app/skills/design-system/page.tsx` |
| `/skills/graphic-designer` | `src/app/skills/graphic-designer/page.tsx` |
| `/skills/crm` | `src/app/skills/crm/page.tsx` |
| `/skills/copywriting` | `src/app/skills/copywriting/page.tsx` |
| `/skills/github` | `src/app/skills/github/page.tsx` |
| `/skills/supabase` | `src/app/skills/supabase/page.tsx` |
| `/skills/carousel` | `src/app/skills/carousel/page.tsx` |
| `/skills/vercel` | `src/app/skills/vercel/page.tsx` |
| `/skills/ads-dashboard` | `src/app/skills/ads-dashboard/page.tsx` |
| `/skills/instagram-dms` | `src/app/skills/instagram-dms/page.tsx` |
| `/skills/website-builder` | `src/app/skills/website-builder/page.tsx` |
| `/skills/notebook-lm` | `src/app/skills/notebook-lm/page.tsx` |
| `/skills/content-dashboard` | `src/app/skills/content-dashboard/page.tsx` |
| `/skills/dev-browser` | `src/app/skills/dev-browser/page.tsx` |
| `/skills/cowork-plugins` | `src/app/skills/cowork-plugins/page.tsx` |
| `/skills/n8n` | `src/app/skills/n8n/page.tsx` |
| `/skills/obsidian` | `src/app/skills/obsidian/page.tsx` |
| `/skills/presentations` | `src/app/skills/presentations/page.tsx` |

#### Learn (10 páginas)
| Rota | Arquivo |
|------|---------|
| `/learn/multi-agent` | `src/app/learn/multi-agent/page.tsx` |
| `/learn/github-repos` | `src/app/learn/github-repos/page.tsx` |
| `/learn/seo-claude-code` | `src/app/learn/seo-claude-code/page.tsx` |
| `/learn/claude-code-skills` | `src/app/learn/claude-code-skills/page.tsx` |
| `/learn/ai-layouts` | `src/app/learn/ai-layouts/page.tsx` |
| `/learn/learn-your-way` | `src/app/learn/learn-your-way/page.tsx` |
| `/learn/meta-ads-ai` | `src/app/learn/meta-ads-ai/page.tsx` |
| `/learn/google-ads-ai` | `src/app/learn/google-ads-ai/page.tsx` |
| `/learn/anthropic-courses` | `src/app/learn/anthropic-courses/page.tsx` |
| `/learn/managed-agents` | `src/app/learn/managed-agents/page.tsx` |

#### Tools (4 páginas)
| Rota | Arquivo |
|------|---------|
| `/tools/pixel-agents` | `src/app/tools/pixel-agents/page.tsx` |
| `/tools/animejs` | `src/app/tools/animejs/page.tsx` |
| `/tools/instagram-cli` | `src/app/tools/instagram-cli/page.tsx` |
| `/tools/maestri` | `src/app/tools/maestri/page.tsx` |

### Páginas Especiais (fora da home grid)
| Rota | Observação |
|------|-----------|
| `/` | Home com grid de 40 recursos |
| `/mentoria` | Client component — página de vendas da mentoria |
| `/mentoria/apresentacao` | Apresentação da mentoria |
| `/setup/claude-code` | Setup guide |
| `/framework/aiox-framework` | Página do framework AIOX |
| `/squads/xquads` | Xquads squads |
| `/monitor/aiox-monitor` | AIOX Monitor |

---

## 6. Componente SkillPage — Padrão Obrigatório

**Arquivo:** `src/shared/components/ui/SkillPage.tsx`

Este é o template de **todas** as páginas de skill, learn e tool. Nunca criar páginas com estrutura diferente.

### Props

```typescript
interface SkillPageProps {
  title: string;               // H1 da página
  description: string;         // Meta description + subtítulo do hero
  category: string;            // Label visível: "Skills" | "Aprendizado" | "Apps" | "Integrações"
  categoryColor: CategoryColor; // Cor do badge (ver seção 7)
  longDescription: string[];   // Array de 3 parágrafos — seção "O que é"
  features: SkillFeature[];    // Array de 6 features — seção "Como funciona"
  primaryLink?: string;        // URL do CTA principal
  primaryLabel?: string;       // Texto do CTA (default: "Ver no GitHub")
  isExternal?: boolean;        // Abre em nova aba (default: true se URL externa)
  author?: string;             // @username ou nome do autor
  authorUrl?: string;          // URL do perfil do autor
  bgImage?: string;            // Imagem de fundo do hero (ver seção 9)
  bgPosition?: string;         // Posição da imagem (default: "center 30%")
  canonicalPath: string;       // Path canônico: "/skills/slug" (sem domínio)
  children?: React.ReactNode;  // Seções extras opcionais após features
}

interface SkillFeature {
  title: string;
  description: string;
  icon: string; // SVG path string (apenas o conteúdo interno do <svg>)
}
```

### Template Completo de Nova Página

```typescript
import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Título da Página',
  description: 'Descrição curta e direta. Máximo 160 caracteres.',
  alternates: { canonical: `${siteConfig.url}/skills/slug` },
  openGraph: {
    title: 'Título da Página | GrowthSales Open Source',
    description: 'Descrição curta e direta. Máximo 160 caracteres.',
    url: `${siteConfig.url}/skills/slug`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Título da Página | GrowthSales Open Source',
    description: 'Descrição curta e direta. Máximo 160 caracteres.',
  },
};

const features = [
  {
    title: 'Feature 1',
    description: 'Descrição objetiva em 1-2 frases.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M..."/>',
  },
  // sempre 6 features
];

const longDescription = [
  'Parágrafo 1 — contexto e problema que resolve.',
  'Parágrafo 2 — como funciona na prática.',
  'Parágrafo 3 — quem deve usar e qual o resultado esperado.',
];

export default function NomeDaPaginaPage() {
  return (
    <SkillPage
      title="Título da Página"
      description="Descrição curta e direta."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://link-oficial-pesquisado.com"
      primaryLabel="Label do CTA"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/skills/slug"
    />
  );
}
```

---

## 7. Categorias e Cores

### CategoryColor — valores aceitos

```typescript
type CategoryColor =
  | 'squads-aiox'   // Laranja — #FF4400
  | 'squads'        // Laranja — #FF4400
  | 'skills'        // Verde — #22C55E
  | 'produtividade' // Verde — #22C55E
  | 'apps'          // Roxo — #8B5CF6
  | 'marketing'     // Roxo — #A78BFA
  | 'aprendizado'   // Ciano — #06B6D4
  | 'integracoes'   // Azul — #0EA5E9
```

### Mapeamento categoria → categoryColor

| category (label) | categoryColor | Cor |
|-----------------|---------------|-----|
| `"Skills"` | `"skills"` | Verde |
| `"Aprendizado"` | `"aprendizado"` | Ciano |
| `"Apps"` | `"apps"` | Roxo |
| `"Integrações"` | `"integracoes"` | Azul |
| `"Squads"` | `"squads"` | Laranja |

---

## 8. Home Grid — Como Adicionar Novos Itens

**Arquivo:** `src/app/page.tsx`

Toda nova página precisa ser adicionada ao array `skills` neste arquivo. Após adicionar, atualizar o stat de Recursos.

### Estrutura do item

```typescript
{
  title: 'Título curto',           // max ~30 chars
  description: 'Descrição curta.', // max ~80 chars — aparece no card
  icon: 'ICON_KEY',                // deve existir no objeto skillIcons
  href: '/skills/slug',            // rota da página
  categoryId: 'skills',            // id da categoria (squads|skills|apps|integracoes|aprendizado)
  categoryLabel: 'Skills',         // label visível do badge
  author: '@joaoguirunas',         // exibido no rodapé do card
}
```

### Icons disponíveis (skillIcons)

```
framework, community, monitor, message, setup,
video, image, carousel, design, ads, google, deploy,
github, database, book, remotion, website, plugin,
agents, automation, mobile, brain, obsidian, crm,
seo, copywriting, presentation, dm, dashboard,
pixel, animejs, instagram, browser, notebook, layout
```

Se o ícone necessário não existir, adicionar ao objeto `skillIcons` com um SVG path de heroicons (stroke, não fill).

### Stat de Recursos

```typescript
const stats = [
  { value: '40', label: 'Recursos' }, // ← atualizar sempre que adicionar páginas
  ...
];
```

---

## 9. Imagens Disponíveis

**Diretório:** `public/images/`

### Backgrounds para hero das skills

```
bg-aiox.png         bg-carousel.png     bg-claude-code.png
bg-designer.png     bg-framework.png    bg-github.png
bg-google.png       bg-image.png        bg-learn.png
bg-maestri.png      bg-marketing.png    bg-meta.png
bg-monitor.png      bg-productivity.png bg-skills.png
bg-supabase.png     bg-vercel.png       bg-video.png
bg-xquads.png
```

**Uso:** `bgImage="/images/bg-skills.png"` na prop do SkillPage.
Se não informado, SkillPage usa um fundo padrão.

### Branding

```
hero-ultrawide.png      — hero da home
hero-mobile.png         — hero mobile
claude-logo.png         — logo do Claude (usado em badges)
claude-code-logo.png    — logo do Claude Code
joao-guirunas-profile.jpg
og-default.png          — imagem padrão para OG tags
logo.svg / logo.png     — logo GrowthSales
favicon.ico / .png / .svg
```

---

## 10. Design System

### Cores

```css
/* Fundo */
--color-background: #08080C;          /* fundo principal */
--color-background-secondary: #0A0A0F;
--color-card: #0C0C12;               /* cards */

/* Accent */
--color-accent: #FF4400;             /* laranja principal */
--color-accent-hover: #FF5C10;

/* Texto */
#FFFFFF                              /* primário */
rgba(255,255,255,0.7)                /* secundário */
rgba(255,255,255,0.6)                /* muted */

/* Bordas */
rgba(255,255,255,0.10)

/* Categorias */
skills:       #22C55E  (verde)
aprendizado:  #06B6D4  (ciano)
apps:         #8B5CF6  (roxo)
integracoes:  #0EA5E9  (azul)
squads:       #FF4400  (laranja)
```

### Tipografia

```css
/* Sans — corpo, títulos, UI */
font-family: 'Inter', system-ui, sans-serif;
/* Pesos: 400, 500, 600, 700, 800 */

/* Mono — badges, labels, código */
font-family: 'Geist Mono', monospace;
/* Pesos: 400, 500, 600, 700 */
```

### Padrões de uso

- Títulos H1 de página: `text-3xl sm:text-4xl md:text-5xl font-bold`
- Badges de categoria: `font-family: Geist Mono, uppercase, letter-spacing: 0.10em`
- Botão primário: `bg-[#FF4400] hover:bg-[#FF5C10]`
- Cards: fundo `#0C0C12` + borda `rgba(255,255,255,0.08)` + hover sutil

---

## 11. Regras para Criação de Novas Páginas

### O que DEVE ser feito

1. **Pesquisar o conteúdo real** antes de escrever — nunca inventar features ou descrições
2. **Pesquisar o link correto** — verificar se o GitHub/site existe antes de colocar como `primaryLink`
3. **Verificar se há skill correspondente no skills.sh** — se sim, preferir o link do skills.sh
4. **Seguir o template exato** do SkillPage (ver seção 6)
5. **Usar 6 features** — nem mais, nem menos
6. **Usar 3 parágrafos** em `longDescription`
7. **Adicionar à home** no array `skills` em `page.tsx`
8. **Atualizar o stat** de Recursos no array `stats`
9. **Commitar via Bhima** (agente DevOps) com mensagem convencional

### O que NÃO deve ser feito

- Criar links de GitHub que não existem
- Inventar URLs sem verificar
- Colocar `primaryLink` apontando para `github.com/anthropics/claude-code` como fallback genérico
- Modificar `SkillPage.tsx` para mudar o layout
- Modificar `layout.tsx`, `globals.css` ou `site.ts` sem aprovação do dono
- Fazer `git push` diretamente — sempre via Bhima

---

## 12. Fluxo de Trabalho

### Para criar uma nova página

```
1. Pesquisar o conteúdo real da ferramenta/tutorial
2. Pesquisar link correto (preferir skills.sh se disponível)
3. Criar src/app/{categoria}/{slug}/page.tsx
4. Adicionar item ao array skills em src/app/page.tsx
5. Atualizar stat de Recursos
6. Bhima: git add + commit + push
```

### Convenção de commits

```
feat(skills):  nova skill page
feat(learn):   nova página de aprendizado
feat(tools):   nova página de ferramenta
feat(home):    atualização do grid home
fix(links):    correção de link quebrado
fix(content):  correção de conteúdo
chore:         manutenção sem impacto visual
```

### Deploy

Push em `main` → Vercel detecta → build automático → live em ~2min.

---

## 13. Variáveis de Ambiente (.env)

```bash
# LLMs
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
DEEPSEEK_API_KEY=
OPENROUTER_API_KEY=

# Search & Docs
EXA_API_KEY=
CONTEXT7_API_KEY=

# Database
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Version Control
GITHUB_TOKEN=

# Automation
N8N_API_KEY=
N8N_WEBHOOK_URL=

# Cloud
VERCEL_TOKEN=
RAILWAY_TOKEN=

# Monitoring
SENTRY_DSN=
```

---

## 14. Páginas Que NÃO estão na home grid

Existem mas não aparecem no filtro da home:

| Rota | Motivo |
|------|--------|
| `/framework/aiox-framework` | Seção de framework, não skill |
| `/squads/xquads` | Seção de squads |
| `/monitor/aiox-monitor` | Ferramenta interna |
| `/setup/claude-code` | Setup guide |
| `/mentoria` | Página comercial |
| `/mentoria/apresentacao` | Apresentação de vendas |

---

## 15. Referências Rápidas

| O que preciso | Onde está |
|--------------|-----------|
| Template de página | `src/shared/components/ui/SkillPage.tsx` |
| Lista de ícones | `src/app/page.tsx` → objeto `skillIcons` |
| Lista de páginas (grid) | `src/app/page.tsx` → array `skills` |
| URL do site | `src/config/site.ts` → `siteConfig.url` |
| Cores do design | `src/app/globals.css` → `@theme` |
| Categorias aceitas | `src/shared/types/index.ts` → `CategoryColor` |
| Imagens disponíveis | `public/images/` |
| Stat de recursos | `src/app/page.tsx` → array `stats[0].value` |
