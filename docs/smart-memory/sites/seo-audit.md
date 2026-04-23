---
agent: NEXUS (sites-seo)
date: 2026-04-19
site: joaoguirunas.com
status: complete
---

# SEO Audit — joaoguirunas.com

## Scores
| Categoria | Score |
|-----------|-------|
| Meta Tags / On-page | 5/10 |
| Schema.org | 6/10 |
| Robots.txt / Sitemap | 8/10 |
| Core Web Vitals signals | 7/10 |
| Internal Linking | 4/10 |
| Keyword Optimization | 4/10 |
| Twitter Cards | 3/10 |

## Críticos
1. Title homepage sem keyword — actual: "João Guirunas" (13 chars)
2. OG images 404 — /images/og-default.png e /images/mentoria-og.png
3. Twitter Card /mentoria herda dados da homepage
4. H1 homepage ilegível — animação JS gera string concatenada
5. /mentoria sem FAQPage schema nem Course schema
6. /open-source com title idêntico à homepage

## Importantes
- Imagem hero com loading="lazy" (devia ser eager + fetchpriority=high)
- Sem `<nav>` semântico na homepage
- /workshop-1 sem schema Event/Course
- Internal linking fraco entre páginas de skills
- H1 /workshop-1 = "ClaudeCode" (bug — sem espaço)
- Schema Person sobrepõe-se a schema de produto

## Quick Wins
### Semana 1
- Upload og-default.png e mentoria-og.png para /public/images/
- Corrigir Twitter Card /mentoria (title, description, image específicos)
- Title homepage: "João Guirunas — Mentoria para Founders com IA"
- Title /open-source: "Open Source para Claude Code | João Guirunas"
- Schema FAQPage na /mentoria (10 FAQs já existem no HTML)
- fetchpriority="high" na imagem hero

### Semana 2
- Schema Course + Offer na /mentoria (com preço R$8.700)
- Adicionar `<nav>` semântico
- Corrigir H1 /workshop-1

### Semana 3
- Internal linking clusters entre skills
- Anchor texts descritivos

## Keywords Não Exploradas
| Keyword | Intent | Página |
|---------|--------|--------|
| mentoria agentes de IA | Transactional | /mentoria |
| como usar claude code | Informational | nova /setup/claude-code |
| criar agentes IA sem programar | Informational | nova landing |
| automação IA para empresas | Commercial | homepage |
| claude code brasil | Navigational | homepage |
| n8n alternativa IA | Commercial | /skills/n8n-killers |

## Estado Técnico Confirmado
- robots.txt: OK
- sitemap.xml (46 URLs): OK
- Canonical tags: OK
- lang="pt-BR": OK
- HTTPS: OK
- GA4 (G-3JD3TYNF7V): OK
- OG images: CRÍTICO (2x 404)
- nav semântico: AUSENTE na homepage
