---
task: Site Development Cycle
responsavel: "@chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: site_briefing
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: deployed_site
    tipo: string
    destino: Production URL
    persistido: true

Checklist:
  - "[ ] Briefing received and analyzed"
  - "[ ] SEO research completed (Sahadeva)"
  - "[ ] UX research completed (Kunti)"
  - "[ ] Copy written (Yudhishthira)"
  - "[ ] Images created (Draupadi)"
  - "[ ] Components built (Arjuna)"
  - "[ ] Layout assembled (Nakula)"
  - "[ ] Accessibility reviewed (Kunti)"
  - "[ ] Integration completed (Bhima)"
  - "[ ] SEO audit passed (Sahadeva)"
  - "[ ] Deployed (Bhima)"
---

# Site Development Cycle

Complete 11-step workflow for site/LP development, orchestrated by Hanuman (Chief).

## Steps

| Step | Agent | Deliverable |
|------|-------|-------------|
| 1 | Hanuman | Briefing analysis + distribution plan |
| 2 | Sahadeva | Keywords, SEO structure, schema plan |
| 3 | Kunti | Personas, user journey, CRO strategy |
| 4 | Yudhishthira | Section copy (hero, features, CTA, FAQ) |
| 5 | Draupadi | Hero images, backgrounds, visual identity |
| 6 | Arjuna | UI components in React/Tailwind (21st dev) |
| 7 | Nakula | Full page layouts in React/Tailwind |
| 8 | Kunti | Accessibility + CRO review on code |
| 9 | Bhima | Integration, forms, third-party, performance |
| 10 | Sahadeva | Final SEO audit (titles, metas, schema, a11y) |
| 11 | Bhima | Deploy + publish |

---

*Task created by squad-creator for themaestrisites squad*
