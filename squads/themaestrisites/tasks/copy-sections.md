---
task: Write LP Sections Copy
responsavel: "@copywriter"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: briefing
    tipo: string
    origem: User Input or Hanuman
    obrigatorio: true
  - campo: keywords
    tipo: array
    origem: Sahadeva (SEO Analyst)
    obrigatorio: false
  - campo: personas
    tipo: object
    origem: Kunti (UX Research)
    obrigatorio: false

Saida:
  - campo: section_copy
    tipo: object
    destino: Arjuna/Nakula (for implementation) + User
    persistido: true

Checklist:
  - "[ ] Hero section (headline + subheadline + CTA)"
  - "[ ] Problem/Solution section"
  - "[ ] Features/Benefits section"
  - "[ ] Social Proof / Testimonials"
  - "[ ] Pricing section (if applicable)"
  - "[ ] FAQ section"
  - "[ ] Final CTA"
---

# Write LP Sections Copy

Writes persuasive copy for all sections of a landing page using frameworks (AIDA, PAS, BAB, 4Ps, StoryBrand).

## Elicitation

1. What is the product/service?
2. Who is the target audience?
3. What is the main benefit/transformation?
4. What are the top 3 objections?
5. What social proof is available?
6. What is the desired action (CTA)?

## Output

Copy organized by page section, ready for implementation by Arjuna/Nakula.

---

*Task created by squad-creator for themaestrisites squad*
