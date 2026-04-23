# UI Components Catalog — joao-guirunas-site

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · lucide-react · shadcn/ui (Button only)

**Design system:** Dark theme, bg `#08080C` / `#0A0A0F`, accent `#FF4400` (orange), mono font `Geist Mono` / `Roboto Mono`, display font `Space Grotesk` / `TASAOrbiter`.

---

## Layout Components

### SiteChrome
| Field | Value |
|---|---|
| Path | `src/shared/components/layout/SiteChrome.tsx` |
| Type | Layout wrapper |
| Props | `children: React.ReactNode` |
| Used in | `src/app/layout.tsx` (root layout body) |

- Conditionally renders `Header` + `Footer` — suppressed on `/` (home page handles its own chrome)
- Injects skip-link `<a href="#main-content">` for keyboard accessibility
- `<main id="main-content" className="pt-16">` provides anchor for skip-link and accounts for fixed header height

**UX notes:** Home page intentionally bypasses the shell so the full-bleed hero can occupy the viewport without the `pt-16` offset.

---

### Header
| Field | Value |
|---|---|
| Path | `src/shared/components/layout/Header.tsx` |
| Type | Layout — fixed top bar |
| Props | None |
| Used in | `SiteChrome` |

- Fixed, `z-50`, `backdrop-blur-xl` glass effect over dark gradient
- Height: `h-14` (mobile) / `h-16` (desktop)
- Logo: profile image (`28×28`, 2px orange ring) + typographic wordmark
- Right slot: `MentoriaHeaderButton`
- `aria-label` on logo link for screen readers

---

### Footer
| Field | Value |
|---|---|
| Path | `src/shared/components/layout/Footer.tsx` |
| Type | Layout — page footer |
| Props | None |
| Used in | `SiteChrome` |

- 4-column grid (collapses to 1 on mobile): brand (col-span-2), Ferramentas nav, Aprender nav
- Social icons: GitHub, LinkedIn, Twitter/X — each with `aria-label`
- Copyright auto-updates via `new Date().getFullYear()`
- Text contrast: `white/60` (compliant AA per inline A11Y fix comments)

---

### MentoriaHeaderButton
| Field | Value |
|---|---|
| Path | `src/shared/components/layout/MentoriaHeaderButton.tsx` |
| Type | UI — context-aware CTA button |
| Props | None (reads `usePathname()` internally) |
| Used in | `Header` |

- On `/mentoria`: label "Fale com um Especialista", href `#inscricao`, smooth-scrolls to form with 80px offset
- Elsewhere: label "Mentoria", href `/mentoria`
- Two renders: desktop (`hidden sm:inline-flex`) and mobile (`sm:hidden`) with truncated label "Inscreva-se"
- `aria-label` describes destination context

---

## UI Primitives

### Button (shadcn/ui)
| Field | Value |
|---|---|
| Path | `src/shared/components/ui/button.tsx` |
| Type | UI primitive |
| Props | `variant: default\|outline\|secondary\|ghost\|link`, `size: default\|sm\|lg\|icon`, `asChild?: boolean` |
| Used in | Available project-wide; currently used sparingly (pages use inline `<a>` / `<Link>` for CTAs) |

- Built with `class-variance-authority` + `@radix-ui/react-slot`
- Focus ring via `focus-visible:ring-2` — keyboard accessible
- Disabled state: `pointer-events-none opacity-50`

---

### Icon
| Field | Value |
|---|---|
| Path | `src/shared/components/ui/Icon.tsx` |
| Type | UI primitive — inline SVG icon |
| Props | `name: IconName`, `size?: '16'\|'24'\|'32'\|'48'` (default `'24'`), `className?: string` |
| Used in | `mentoria/page.tsx`, various skill pages |

- 28 icons available (see `IconName` union type)
- Always `aria-hidden="true"` — must pair with visible text or `aria-label` on parent
- Stroke-only, `fill: none`, `currentColor` — inherits color from parent

---

### SparklesCore
| Field | Value |
|---|---|
| Path | `src/shared/components/ui/sparkles.tsx` |
| Type | UI — animated particle canvas |
| Props | `background?`, `minSize?`, `maxSize?`, `speed?`, `particleColor?`, `particleDensity?`, `id?`, `className?` |
| Used in | `AnimatedHero` |

- Wraps `@tsparticles/react` + `@tsparticles/slim`
- Lazy-initializes particles engine on mount; fades in via Framer Motion after load
- Renders inside a constrained div — not full-screen; `fullScreen: false`

---

## Section Components

### AnimatedHero
| Field | Value |
|---|---|
| Path | `src/shared/components/ui/animated-hero.tsx` |
| Type | Section — home page hero |
| Props | None |
| Used in | `src/app/page.tsx` (only consumer) |

- Full-viewport black canvas with `SparklesCore` particle field
- Rotating H1 text: cycles "aprendo usando" / "aplico" / "compartilhho" every 2s via `setTimeout` state
  - Invisible spacer text keeps layout stable during transitions (`aria-hidden` on cycling spans)
- Order-swapped on mobile vs desktop via Tailwind `order-*` classes
- CTAs: Mentoria (primary orange), Consultoria (ghost), Open Source (ghost)
- Profile avatar with 2px orange ring

**UX notes:** Mobile layout stacks avatar → sparkles → H1 (with `-mt-36` negative overlap); desktop is avatar → H1 (z-10 overlap) → sparkles. Complex order manipulation — verify on resize edge cases.

---

### HeroSection
| Field | Value |
|---|---|
| Path | `src/shared/components/sections/HeroSection.tsx` |
| Type | Section — alternate hero (mentoria-style) |
| Props | None |
| Used in | Not directly imported in any page currently (may be deprecated or reserved) |

- Static hero with radial orange + blue glows
- `framer-motion` staggered fade-up entrance for all elements
- Focus ring on CTAs (`focus-visible:ring-2 focus-visible:ring-[#E8601C]`)
- Different accent color (`#E8601C`) vs the rest of the site (`#FF4400`) — inconsistency to note

---

## Page Templates

### SkillPage
| Field | Value |
|---|---|
| Path | `src/shared/components/ui/SkillPage.tsx` |
| Type | Page template |
| Props | See `SkillPageProps` interface below |
| Used in | All ~20+ pages under `src/app/skills/*/page.tsx`, some under `src/app/tools/*/` and `src/app/learn/*/` |

**Props:**
| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | Yes | Page / skill name |
| `description` | `string` | Yes | Short description (also used for SEO) |
| `category` | `string` | Yes | Display label for category badge |
| `categoryColor` | `string` | Yes | Key into `categoryColors` map |
| `longDescription` | `string[]` | Yes | Array of paragraphs for "O que é" section |
| `features` | `SkillFeature[]` | Yes | Feature cards for "Como funciona" grid |
| `primaryLink` | `string` | No | CTA URL (GitHub or external) |
| `primaryLabel` | `string` | No | CTA button label (default: "Ver no GitHub") |
| `isExternal` | `boolean` | No | If true: external link icon; if false: GitHub icon |
| `author` | `string` | No | Author display string |
| `authorUrl` | `string` | No | Author link (GitHub profile, etc.) |
| `bgImage` | `string` | No | Hero background image path |
| `bgPosition` | `string` | No | CSS `object-position` (default: "center 30%") |
| `canonicalPath` | `string` | Yes | URL path for JSON-LD structured data |
| `children` | `ReactNode` | No | Extra content injected between features and final CTA |

**Sections rendered:**
1. Hero — breadcrumb, category badge, H1, author badge, description, CTA buttons
2. "O que é" — long description paragraphs
3. "Como funciona" — 3-column feature card grid (`glass-card`)
4. `{children}` slot
5. Final CTA banner

**UX notes:**
- Breadcrumb has `aria-label="Breadcrumb"` with `aria-current="page"` on current item
- Feature icons injected via `dangerouslySetInnerHTML` from SVG path strings — no XSS risk since data is static/internal
- `glass-card` class defined in global CSS (not a component)
- `categoryColors` map covers: squads-aiox, produtividade, marketing, aprendizado, skills, apps, squads, integracoes

---

## Mentoria Page Components

### MentoriaNav
| Field | Value |
|---|---|
| Path | `src/app/mentoria/mentoria-nav.tsx` |
| Type | Section — sticky in-page navigation |
| Props | None |
| Used in | `src/app/mentoria/page.tsx` |

- Appears fixed at top after 100px scroll; slides in/out with Framer Motion `AnimatePresence`
- Tracks active section via `IntersectionObserver` on 7 section IDs
- Horizontal scroll on mobile (`overflow-x-auto scrollbar-hide`)
- Active item auto-scrolls into center view on mobile via `scrollIntoView`
- Animated underline with `layoutId="nav-underline"` spring transition

---

### SectionDots
| Field | Value |
|---|---|
| Path | `src/app/mentoria/section-dots.tsx` |
| Type | Section — right-side dot navigation |
| Props | None |
| Used in | `src/app/mentoria/page.tsx` |

- Desktop-only (`hidden md:flex`), fixed right side, vertically centered
- Dots with connector lines; active dot glows orange (`box-shadow`)
- Labels always visible (active: `text-white/70`, inactive: `text-white/20`)
- Each button has `aria-label` and `aria-current`

---

### MentorshipFeatures (FeatureCard)
| Field | Value |
|---|---|
| Path | `src/app/mentoria/mentorship-features.tsx` |
| Type | Section — differentials grid |
| Props | None (data hardcoded) |
| Used in | `src/app/mentoria/page.tsx` |

- 3 cards: "Método Comprovado" (Brain), "Comunidade Exclusiva" (Users), "Resultado Garantido" (Target)
- `useInView` scroll-triggered entrance with staggered delay
- Hover: radial orange glow via absolute overlay + border opacity change
- Min-height `320px` per card

---

### CourseModulesTimeline
| Field | Value |
|---|---|
| Path | `src/app/mentoria/course-modules-timeline.tsx` |
| Type | Section — vertical timeline of course modules |
| Props | None (data hardcoded) |
| Used in | `src/app/mentoria/page.tsx` |

- 8 modules (1 presencial + 7 online)
- `useInView` scroll-triggered per item
- Module type badge: "Presencial" (orange) / "Online" (blue/white)
- Tags rendered as small pills per module

---

### SolutionSection
| Field | Value |
|---|---|
| Path | `src/app/mentoria/solution-section.tsx` |
| Type | Section — 3 solution cards |
| Props | None |
| Used in | `src/app/mentoria/page.tsx` |

- Cards: "Delegação Inteligente" (Bot), "Sua Equipe Completa" (Code), "Escala Sem Contratar" (TrendingUp)
- Staggered entrance via `useInView`
- Display font `TASAOrbiter` / `--font-bb-display`

---

### PricingCalculator
| Field | Value |
|---|---|
| Path | `src/app/mentoria/pricing-calculator.tsx` |
| Type | Section — interactive ROI calculator |
| Props | None |
| Used in | `src/app/mentoria/page.tsx` |

- Multi-squad selector (Engineering, Growth Marketing, Social Media, Branding)
- Checkboxes for individual professionals with annual salary costs
- Animated number display (spring physics via `useSpring` + `useTransform`)
- Compares selected team cost vs mentoria price (hardcoded R$ 8,700)
- Savings displayed as animated counter

---

### PricingCalculatorV2
| Field | Value |
|---|---|
| Path | `src/app/mentoria/pricing-calculator-v2.tsx` |
| Type | Section — alternate ROI calculator |
| Props | None |
| Used in | Not referenced in current `mentoria/page.tsx` (appears unused / in development) |

- Flat list of 8 professionals with checkboxes (no squad grouping)
- Similar spring animation pattern
- Includes "what's included" checklist panel

---

### FaqAccordion
| Field | Value |
|---|---|
| Path | `src/app/mentoria/faq-accordion.tsx` |
| Type | Section — accordion FAQ |
| Props | None (10 Q&A items hardcoded) |
| Used in | `src/app/mentoria/page.tsx` |

- Single-open accordion (only one item expanded at a time)
- Toggle via `aria-expanded` on button — screen reader accessible
- Chevron rotates 180° when open
- `glass-card` wrapper per item

---

### RevosForm
| Field | Value |
|---|---|
| Path | `src/app/mentoria/revos-form.tsx` |
| Type | Section — embedded third-party form |
| Props | None |
| Used in | `src/app/mentoria/page.tsx` |

- Embeds Revos form via dynamically injected `<script>` tag
- Form ID: `a11d7cc4-17b8-400e-94e4-0f27ca47e9a4`
- Script injected to `document.body`, cleaned up on unmount
- Container: `min-h-[400px]` placeholder while script loads

**UX notes:** Third-party embed means styling and accessibility are outside project control. No loading state visible to user during script load.

---

## Special Pages / Clients

### WorkshopClient
| Field | Value |
|---|---|
| Path | `src/app/workshop-1/WorkshopClient.tsx` |
| Type | Page client — canvas dot grid + slide-based layout |
| Props | None |
| Used in | `src/app/workshop-1/page.tsx` |

- `DotGrid`: Canvas-rendered dot pattern (26px grid, `rgba(255,255,255,0.07)`)
- `Corner`: SVG bracket decoration (top-left / bottom-right positions)
- Full-screen slide-style presentation layout

---

### ApresentacaoClient
| Field | Value |
|---|---|
| Path | `src/app/mentoria/apresentacao/ApresentacaoClient.tsx` |
| Type | Page client — Reveal.js presentation |
| Props | None |
| Used in | `src/app/mentoria/apresentacao/page.tsx` |

- Dynamically loads Reveal.js 5.0.4 from CDN
- Lazy CSS injection (reveal.css + black theme)
- `hash: true, controls: true, progress: true, center: true, transition: 'slide'`

---

## Inline / Page-local Components

These components are defined and used within a single page file and not exported:

| Component | Defined in | Purpose |
|---|---|---|
| `CtaButton` | `src/app/mentoria/page.tsx` | Primary/secondary CTA button with `variant` prop |
| `SectionBadge` | `src/app/mentoria/page.tsx` | Orange pill label for section headers |
| `GitHubIcon` | `src/shared/components/ui/SkillPage.tsx` | Inline SVG GitHub mark used in SkillPage |
| `DotGrid` | `src/app/workshop-1/WorkshopClient.tsx` | Canvas dot grid background |
| `Corner` | `src/app/workshop-1/WorkshopClient.tsx` | SVG corner bracket decoration |

---

## External Libraries Used Directly in Pages

| Library | Usage |
|---|---|
| `framer-motion` | Entrance animations (`motion`, `AnimatePresence`, `useInView`, `useSpring`, `useTransform`) across Hero, mentoria sections, and nav |
| `lucide-react` | Icons in HeroSection, SolutionSection, PricingCalculator, CourseModulesTimeline |
| `@tsparticles/react` + `@tsparticles/slim` | Particle field in AnimatedHero |
| `next/image` | All image rendering (profile photo, hero images, logos) |
| `next/link` | Internal navigation |
| `@radix-ui/react-slot` | Used via Button primitive (asChild pattern) |
| `class-variance-authority` | Button variant system |
| Reveal.js (CDN) | Mentoria presentation slide deck |

---

## Global CSS Classes (non-component, used via className)

| Class | Apparent effect |
|---|---|
| `glass-card` | Semi-transparent card with border — used in FAQ, feature grids |
| `btn-primary` | Base primary button style |
| `accent-line` | Short horizontal orange divider line |
| `glow-text` | Text glow effect (used on hero H1s) |
| `skip-link` | Screen-reader skip navigation link |

---

## Accessibility Summary

| Component | Status | Notes |
|---|---|---|
| SiteChrome | Good | Skip link present, main landmark with id |
| Header | Good | `aria-label` on logo link |
| Footer | Good | `<nav aria-label>` per nav group, `aria-label` on social links |
| MentoriaHeaderButton | Good | Context-aware `aria-label` |
| SkillPage | Good | Breadcrumb with `aria-current`, `aria-labelledby` on sections |
| FaqAccordion | Good | `aria-expanded` on toggle buttons |
| MentoriaNav | Good | Buttons with keyboard trigger |
| SectionDots | Good | `aria-label` + `aria-current` per dot |
| Icon | Note | Always `aria-hidden` — requires parent to carry label |
| RevosForm | Unknown | Third-party embed; accessibility not verifiable |
| SparklesCore | Decorative | No text content; acceptable as background decoration |
| HeroSection | Note | `#E8601C` accent differs from project standard `#FF4400` |
