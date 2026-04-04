# Coding Standards — themaestrisites

> Extends core AIOX coding standards. Focus: React/Tailwind/Next.js sites.

## Stack

- Next.js (App Router)
- React 18+
- Tailwind CSS
- TypeScript

## Components

- Functional components only
- Props typed with TypeScript interfaces
- Use 21st dev for component creation when possible
- Responsive by default (mobile-first)

## Images

- Use `next/image` for all images
- Always include `alt` text (SEO-friendly, coordinate with Sahadeva)
- Lazy loading by default
- Blur placeholder for hero images

## Naming

- Components: PascalCase (HeroSection, PricingCard)
- Files: kebab-case (hero-section.tsx, pricing-card.tsx)
- CSS: Tailwind utility classes, avoid custom CSS unless necessary

## Git

- Conventional commits: `feat:`, `fix:`, `style:`, `chore:`
- UX/Dev agents: commit freely, NEVER push (Bhima exclusive)
- Bhima: handles all push/PR/deploy operations
