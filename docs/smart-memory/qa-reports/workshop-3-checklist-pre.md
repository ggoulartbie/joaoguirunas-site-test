---
title: Checklist Pré-Gate Workshop-3
date: 2026-06-12
qa: Axilun
status: standby — aguardando sites-dev-alpha sinalizar deck rodando
event: Encerramento HOJE (apresentação ao vivo, 20 min, projetor)
related:
  - "[[stories/active/WK3-deck]]"
  - "[[agents/ux/workshop-3-brand]]"
tags: [qa, workshop-3, gate, pre-checklist]
---

# Checklist Pré-Gate — Workshop-3

Apresentador: João (CSO Growth Sales). Apresentação ao vivo, projetor, hoje.
Tom: empresário pra empresário. Brand: Growth Sales.

## P0 — Bloqueantes (FAIL se quebrar)

### Roteamento e navegação
- [ ] `pnpm dev` sobe sem erro de build/type
- [ ] `GET /workshop-3` → 200 (índice lista os 9 slides)
- [ ] `GET /workshop-3/quem-somos` → 200
- [ ] `GET /workshop-3/pergunta` → 200
- [ ] `GET /workshop-3/tese` → 200
- [ ] `GET /workshop-3/workos` → 200
- [ ] `GET /workshop-3/orquestrador` → 200
- [ ] `GET /workshop-3/numeros` → 200
- [ ] `GET /workshop-3/clientes` → 200
- [ ] `GET /workshop-3/processo-interno` → 200
- [ ] `GET /workshop-3/reflexao` → 200
- [ ] Botão "Próximo" navega na ordem correta em TODOS os slides
- [ ] Botão "Anterior" navega na ordem inversa em TODOS os slides
- [ ] Primeiro slide: "Anterior" desabilitado ou retorna ao índice (sem quebrar)
- [ ] Último slide: "Próximo" desabilitado ou retorna ao índice (sem quebrar)
- [ ] Atalho `→` (ArrowRight) avança slide
- [ ] Atalho `←` (ArrowLeft) volta slide
- [ ] Atalhos NÃO disparam quando há input focado (se houver inputs)

### Conteúdo crítico (grep obrigatório)
- [ ] Slide 04 (`/workos`) contém visível: **"System as a Service"**
- [ ] Slide 05 (`/orquestrador`) contém visível: **"Service as a System"**
- [ ] Slide 06 (`/numeros`) contém os 3 números: **150k**, **500k**, **6M** (com formatação adequada — R$ ou contexto claro)
- [ ] Slide 07 (`/clientes`) contém os 4 nomes: **Sisprime**, **Blue3**, **Viva América**, **Argoplan**
- [ ] Slide 09 (`/reflexao`) contém **duas colunas** (pessoa + empresário) + **frase de fechamento**

### Copy
- [ ] Nenhum "lorem ipsum" em qualquer slide
- [ ] Nenhum placeholder do tipo "TODO", "FIXME", "TBD", "{placeholder}", "..." vazio
- [ ] Copy aprovada presente (cruzar com story WK3-* e brand spec)

### SEO/Meta
- [ ] `<meta name="robots" content="noindex">` presente no `/workshop-3` e em todos os 9 slugs

### Brand Growth Sales
- [ ] Logo Growth Sales presente em layout consistente (header ou rodapé do deck)
- [ ] Cores conformes ao brand spec (`agents/ux/workshop-3-brand.md`)
- [ ] Tipografia conforme brand spec
- [ ] Estilo consistente entre os 9 slides (não há slide visualmente "fora da família")

### Projetor (resolução crítica)
- [ ] Layout não quebra em 1920x1080
- [ ] Sem barra de scroll horizontal em 1920x1080
- [ ] Texto legível (font-size adequada para projeção a distância)
- [ ] Contraste suficiente para projetor (cuidado com cinzas claros sobre branco)

## P1 — Observações (CONCERNS mas não bloqueia)

- [ ] Mobile responsive (não é caso primário hoje, mas registrar problemas)
- [ ] Acessibilidade básica:
  - [ ] `alt` em todas as imagens/logos
  - [ ] Contraste WCAG AA mínimo no texto principal
  - [ ] Foco visível nos botões Anterior/Próximo (keyboard nav)
- [ ] Tipografia bem balanceada — hierarquia clara (H1 > H2 > body)
- [ ] Sem layout shift perceptível ao navegar entre slides
- [ ] Tempo de transição/render entre slides aceitável (< 200ms percebido)

## WAIVED (consciente, fora do escopo)

- ~~Analytics~~ — evento privado, sem tracking
- ~~CMS~~ — copy hardcoded por design
- ~~Testes automatizados~~ — deck estático, sem regressão futura prevista
- ~~SEO público~~ — noindex intencional
- ~~i18n~~ — single-locale PT-BR

## Sequência de execução (quando sites-dev-alpha sinalizar)

1. Confirmar `pnpm dev` rodando (porta 3000)
2. `for slug in "" quem-somos pergunta tese workos orquestrador numeros clientes processo-interno reflexao; do curl -s -o /dev/null -w "%{http_code} /workshop-3/$slug\n" http://localhost:3000/workshop-3/$slug; done`
3. `grep -r "System as a Service" src/app/workshop-3/workos/` — confirmar string
4. `grep -r "Service as a System" src/app/workshop-3/orquestrador/` — confirmar string
5. `grep -rE "150k|500k|6M|150\.000|500\.000|6\.000\.000" src/app/workshop-3/numeros/` — confirmar números
6. `grep -rE "Sisprime|Blue3|Viva América|Argoplan" src/app/workshop-3/clientes/` — confirmar 4 nomes
7. `grep -r "noindex" src/app/workshop-3/` — confirmar meta tag
8. `grep -rEi "lorem|ipsum|TODO|FIXME|TBD|placeholder" src/app/workshop-3/` — deve vir vazio
9. Ler manualmente os 9 `.tsx` para validar copy aprovada e brand
10. Validar navegação (teclado + botões) no browser

## Output esperado

Relatório final em `docs/smart-memory/qa-reports/workshop-3-gate.md` com veredicto **PASS / CONCERNS / FAIL** e P0/P1 item-a-item. Notificação ao team-lead via SendMessage.

---

✦ Axilun em standby.
