---
task: SEO Audit
responsavel: "@seo-analyst"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: page_url_or_files
    tipo: string
    origem: User Input or Hanuman
    obrigatorio: true

Saida:
  - campo: seo_report
    tipo: object
    destino: Maestri Notes (seo-checklist) + User
    persistido: true

Checklist:
  - "[ ] Title tags (50-60 chars, keyword, brand)"
  - "[ ] Meta descriptions (150-160 chars, CTA)"
  - "[ ] Heading hierarchy (H1-H6, keywords)"
  - "[ ] Alt tags (descriptive, keywords, accessible)"
  - "[ ] Schema.org markup (JSON-LD)"
  - "[ ] Open Graph + Twitter Cards"
  - "[ ] URL structure"
  - "[ ] Internal linking"
  - "[ ] Core Web Vitals recommendations"
  - "[ ] Mobile-first validation"
  - "[ ] robots.txt + sitemap.xml"
  - "[ ] Canonical tags"
  - "[ ] E-E-A-T signals"
---

# SEO Audit

Full SEO audit covering on-page, technical, semantic web, and modern SEO (2024-2026).

## Audit Sections

1. **On-Page:** titles, metas, headings, alt tags, URLs, internal links
2. **Technical:** Core Web Vitals, mobile, robots, sitemap, canonical
3. **Semantic:** schema.org, Open Graph, Twitter Cards, JSON-LD
4. **Modern SEO:** E-E-A-T, Helpful Content, AI Overview, SGE, featured snippets

## Output Format

Markdown report with findings + fixes organized by priority (CRITICAL → LOW).

---

*Task created by squad-creator for themaestrisites squad*
