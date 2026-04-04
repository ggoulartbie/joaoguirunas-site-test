---
task: Generate Merge Plan
responsavel: "@chief"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: completed_sections
    tipo: array
    origem: Status board
    obrigatorio: true

Saida:
  - campo: merge_plan
    tipo: string
    destino: Bhima (Dev/DevOps) via Maestri
    persistido: true

Checklist:
  - "[ ] Identify completed sections"
  - "[ ] Determine merge order"
  - "[ ] Check for conflicts"
  - "[ ] Send plan to Bhima"
---

# Generate Merge Plan

Analyzes completed work from UX/Dev agents, determines merge order, and dispatches to Bhima for integration and deploy.

---

*Task created by squad-creator for themaestrisites squad*
