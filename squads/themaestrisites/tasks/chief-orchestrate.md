---
task: Site Orchestration
responsavel: "@chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: briefing
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "Site/LP briefing with objectives, audience, style"

Saida:
  - campo: distribution_plan
    tipo: object
    destino: Maestri Notes (status-board)
    persistido: true

Checklist:
  - "[ ] Run maestri list"
  - "[ ] Analyze briefing"
  - "[ ] Create distribution plan"
  - "[ ] Dispatch SEO research to Sahadeva"
  - "[ ] Dispatch UX research to Kunti"
  - "[ ] Dispatch copy to Yudhishthira"
  - "[ ] Dispatch images to Draupadi"
  - "[ ] Dispatch components to Arjuna"
  - "[ ] Dispatch layout to Nakula"
  - "[ ] Dispatch integration to Bhima"
  - "[ ] Monitor and coordinate"
---

# Site Orchestration

## Purpose

Main orchestration for site/LP development. Follows the 11-step site development flow.

## Site Development Flow

1. Recebe briefing do site/LP
2. Despacha Sahadeva → keywords e estrutura SEO
3. Despacha Kunti → UX research (personas, jornada, CRO)
4. Despacha Yudhishthira → copy das seções (com keywords + insights)
5. Despacha Draupadi → imagens e identidade visual
6. Despacha Arjuna → criar e IMPLEMENTAR componentes (21st dev → React)
7. Despacha Nakula → montar e IMPLEMENTAR layout completo
8. Kunti → review de acessibilidade e CRO no código
9. Despacha Bhima → integrar + formulários + third-party + performance
10. Sahadeva → auditoria SEO final
11. Bhima → deploy e publica

---

*Task created by squad-creator for themaestrisites squad*
