---
task: Sync Notes
responsavel: "@chief"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada: []
Saida:
  - campo: updated_notes
    tipo: object
    destino: Maestri Notes
    persistido: true

Checklist:
  - "[ ] Read current notes"
  - "[ ] Gather fresh data from agents"
  - "[ ] Update status-board, blockers, seo-checklist, style-guide, image-library"
---

# Sync Notes

Synchronizes all shared Maestri notes (status-board, decisions, blockers, seo-checklist, style-guide, image-library).

---

*Task created by squad-creator for themaestrisites squad*
