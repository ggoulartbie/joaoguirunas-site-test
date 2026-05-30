# Spec — Página `/curso-online` (unificação com `/mentoria`)

**Objetivo:** A página `/curso-online` deve ter a mesma estrutura visual e componentes da `/mentoria`, mas sem as secções que dependem de presença física ou de turmas ao vivo.

**Data:** 2026-05-29

---

## 1. Mapa de secções da `/mentoria` — incluir/excluir

| # | Secção | Componente | Status | Justificativa |
|---|--------|-----------|--------|---------------|
| 1 | Hero | `MentoriaHeroSpline` | ❌ Excluir / Substituir | Contém Spline 3D pesado + cópia "mentoria intensiva e prática em Florianópolis". O `CursoOnlineHero` já existe e está correcto para o contexto assíncrono. |
| 2 | Solução | `SolutionSection` | ✅ Reutilizar directo | Completamente genérico — fala de delegação, escala sem contratar. Zero menção a encontros presenciais. |
| 3 | Diferenciais | `MentorshipFeatures` | ❌ Excluir / Substituir | Card 1 ("Desbloqueio Mental com Claudia") e Card 2 ("Turmas de No Máximo 12 Pessoas") são exclusivos da mentoria presencial. `CursoOnlineDiferenciais` já existe com cards adequados. |
| 4 | Timeline dos Módulos | `CourseModulesTimeline` | ❌ Excluir / Substituir | Contém fases inteiras a remover: Pré-Mentoria (Design Thinking 1:1), itens tipo `Presencial` do Dia Presencial (abertura, desbloqueio, setup físico), todos os `QA` (encontros ao vivo semanais), Bônus Online (código pronto GrowthSales), Encerramento (apresentação presencial). `CursoOnlineTimeline` já existe com apenas módulos `Video`, mas precisa ser auditado (ver secção 3). |
| 5 | Facilitadores | Inline em `page.tsx` | ✅ Reutilizar com adaptação | Conteúdo válido para o curso online. Bio da Claudia já tem versão adaptada no `curso-online/page.tsx`. Manter estrutura visual idêntica à mentoria. |
| 6 | Investimento | `PricingCalculator` | ❌ Excluir / Substituir | Preço hardcoded R$ 8.700. `CursoPricingCalculator` já existe com valor R$ 797. |
| 7 | Inscrição (form) | `RevosForm` (CRM embed) | ❌ Excluir / Substituir | Form de lista de espera da mentoria. No curso-online a CTA leva directo ao checkout — `CheckoutForm` já existe com `cohortSlug`. |
| 8 | FAQ | `FaqAccordion` | ❌ Excluir / Substituir | Perguntas falam de Florianópolis, presencial obrigatório, 8 encontros. `CursoFaqAccordion` já existe com perguntas adaptadas ao assíncrono. |
| 9 | CTA Final | Inline em `page.tsx` | ✅ Reutilizar com adaptação | Estrutura idêntica. Apenas a cópia muda: "Comprar agora" vs "Entrar na lista de espera", e preço exibido. |
| 10 | SectionDots | `SectionDots` | ✅ Reutilizar directo | Componente genérico de navegação lateral. IDs de secção são os mesmos. Já usado no `curso-online/page.tsx`. |

---

## 2. Secções a EXCLUIR (sem equivalente no curso-online)

Estas fases da `CourseModulesTimeline` **não têm equivalente** no curso online e devem ser omitidas da `CursoOnlineTimeline`:

| Fase/Item | Razão |
|-----------|-------|
| **Pré-Mentoria** — Design Thinking 1:1 | Sessão individual presencial com Claudia. Inexistente no assíncrono. |
| **Dia Presencial** — todos os 5 itens (Desbloqueio, O que é possível, Fundamentos, Setup, Centro de Treinamento) | Formato presencial. O conteúdo didáctico equivalente (O que é possível, Fundamentos) já existe como `Video` na `CursoOnlineTimeline`. |
| **Encontros de Dúvidas** (Semanas 1–4, tipo `QA`) | Sessões ao vivo. O curso online não tem suporte ao vivo. |
| **Bônus Online** — Orquestrador Comercial e Gestão de Projetos (código GrowthSales) | Exclusivo da mentoria (ativo comercial da GrowthSales). |
| **Encerramento** — Apresentação de Projetos presencial | Evento físico de turma. Inexistente no assíncrono. |

---

## 3. Módulos a INCLUIR na `CursoOnlineTimeline`

Apenas itens de tipo `Video` sobrevivem, mais os bônus genéricos se existirem. A `CursoOnlineTimeline` existente já segue este padrão (ItemType = `'Video' | 'Bonus'`). Verificar se os seguintes módulos estão mapeados:

| Módulo | Título original (mentoria) | Status na timeline do curso |
|--------|---------------------------|----------------------------|
| 1 | O que é possível | Deve estar |
| 2 | Fundamentos do Claude Code | Deve estar |
| 3 | Setup e Instalação | Deve estar |
| 4 | Centro de Treinamento de Agentes | Deve estar |
| 5 | Claude Design — Design System | Deve estar |
| 6 | Squad de Sites — Github e Vercel | Deve estar |
| 7 | Squad de Social Media | Deve estar |
| 10 | Squad de Dev — Supabase | Deve estar |

**Nota para dev:** Módulos 8 e 9 não aparecem na mentoria — verificar se existem no curso online antes de adicionar.

---

## 4. Ordem final das secções na `/curso-online`

```
1. SectionDots          (reutilizar directo)
2. CursoOnlineHero      (já existe — substitui MentoriaHeroSpline)
3. SolutionSection      (reutilizar directo de /mentoria)
4. CursoOnlineDiferenciais  (já existe — substitui MentorshipFeatures)
5. CursoOnlineTimeline  (já existe — substitui CourseModulesTimeline; auditar módulos)
6. Facilitadores        (reutilizar inline com bio adaptada da Claudia)
7. CursoPricingCalculator   (já existe — substitui PricingCalculator)
8. Inscrição/Checkout   (já existe — substitui RevosForm com CheckoutForm + grade de included/not_included)
9. CursoFaqAccordion    (já existe — substitui FaqAccordion)
10. CTA Final           (cópia adaptada: "Comprar agora — R$ 797")
```

---

## 5. Componentes reutilizáveis directamente vs. que precisam de adaptação

### Reutilizar directo (zero alterações)
| Componente | Path |
|-----------|------|
| `SectionDots` | `src/app/mentoria/section-dots.tsx` |
| `SolutionSection` | `src/app/mentoria/solution-section.tsx` |

### Reutilizar com adaptação de cópia/props
| Componente | Adaptação necessária |
|-----------|----------------------|
| Secção Facilitadores (inline) | Bio da Claudia já adaptada no `curso-online/page.tsx`. Remover botão "Conheça Nossa Cultura" se não relevante, ou manter — decisão de conteúdo. |
| CTA Final (inline) | Texto: "Comprar agora — R$ 797" · Subtítulo: "Acesso imediato às aulas gravadas. Comece hoje, no seu ritmo." · CTA aponta para `#inscricao`. |

### Componentes curso-online já existentes (não reutilizam mentoria)
| Componente | Path | Observação |
|-----------|------|-----------|
| `CursoOnlineHero` | `_components/CursoOnlineHero.tsx` | Hero sem Spline, cópia assíncrona. |
| `CursoOnlineDiferenciais` | `_components/CursoOnlineDiferenciais.tsx` | Cards: Aulas Gravadas / Ritmo Próprio / Comunidade (verificar conteúdo exacto). |
| `CursoOnlineTimeline` | `_components/CursoOnlineTimeline.tsx` | Apenas fases `Video`. Auditar lista de módulos vs. tabela secção 3. |
| `CursoPricingCalculator` | `_components/CursoPricingCalculator.tsx` | R$ 797 · checklist diferente do da mentoria. |
| `CheckoutForm` | `_components/checkout-form.tsx` | Recebe `cohortSlug`. |
| `CursoFaqAccordion` | `_components/CursoFaqAccordion.tsx` | FAQ sem menções a presencial/Florianópolis. |

### Componentes da mentoria a NÃO importar no curso-online
| Componente | Razão |
|-----------|-------|
| `MentoriaHeroSpline` | Spline pesado + cópia presencial |
| `MentorshipFeatures` | Cards mencionam turmas/Claudia 1:1 |
| `CourseModulesTimeline` | Contém fases presenciais e ao vivo |
| `PricingCalculator` | R$ 8.700 hardcoded |
| `RevosForm` | Lista de espera CRM — mentoria only |
| `FaqAccordion` | Perguntas sobre presencial/Florianópolis |

---

## 6. Delta de props/dados — contexto "curso online" vs "mentoria"

| Dado | Mentoria | Curso Online |
|------|----------|-------------|
| Preço | R$ 8.700 (parcela em 12×) | R$ 797 (parcela em 6×) |
| Vagas | Max. 12 por turma | Ilimitado (acesso digital) |
| Formato | Presencial + Online ao vivo + Vídeo | 100% Vídeo assíncrono |
| Acesso | Durante a turma (~6-8 semanas) | 6 meses |
| CTA primário | "Entrar na lista de espera" → RevosForm | "Comprar agora" → CheckoutForm |
| CTA secundário | "Como Funciona" → `#modulos` | Mesmo padrão |
| Trust strip hero | "Max. 12 pessoas \| Garantia 7 dias \| Próxima turma: {data}" | "Acesso imediato \| Garantia 7 dias \| 6 meses de acesso" |
| Badge hero | "Turma esgotada / Início da turma: {data}" | "Curso Online · Aulas Gravadas" (pulsing dot) |
| Bio Claudia | "Focada em resultados mensuráveis e ROI." | "No curso online você tem acesso ao mesmo conteúdo que usamos na mentoria intensiva." |
| Checklist pricing | Inclui: desbloqueio mental, squad personalizada, grupo vitalício, cert. | Inclui: aulas gravadas, materiais, fórum, certificado |
| Not-included list | (não existe) | Encontros ao vivo, mentoria 1:1, bônus GrowthSales, suporte WhatsApp |

---

## 7. Estado actual da `/curso-online/page.tsx`

A página `/curso-online/page.tsx` **já existe e já implementa a maioria desta spec**. O estado actual é:

- Hero: `CursoOnlineHero` ✅
- Solução: `SolutionSection` ✅
- Diferenciais: `CursoOnlineDiferenciais` ✅
- Timeline: `CursoOnlineTimeline` ✅
- Facilitadores: inline ✅ (com bio adaptada)
- Pricing: `CursoPricingCalculator` ✅
- Inscrição: `CheckoutForm` inline ✅ (com grade included/not-included)
- FAQ: `CursoFaqAccordion` ✅
- CTA Final: inline ✅

**Background adicional:** A página usa `SolarSystemBackground` (de `/agentes`) que a mentoria não usa. Este é um diferencial visual — manter ou alinhar à decisão de design da mentoria.

**Pendência principal identificada:** Verificar se `CursoOnlineTimeline` tem todos os módulos da tabela da secção 3, e se a ordem está correcta.

---

## 8. Riscos / Alertas

1. **`SolarSystemBackground`** — a `/curso-online` usa este background animado que a `/mentoria` não usa. Se a intenção é "idêntica à mentoria", este componente deve ser removido da `/curso-online`. Confirmar com João antes.
2. **Módulos 8 e 9** — a mentoria numera os módulos video como 5, 6, 7, 10 (pulando 8 e 9). Verificar se existem módulos 8 e 9 para o curso online ou se a numeração deve ser corrigida para ser sequencial.
3. **`SectionDots`** importado de `/mentoria` — o `curso-online/page.tsx` já importa `SectionDots` de `@/app/mentoria/section-dots`. Se o componente precisa de IDs diferentes (ex: sem `facilitadores` se a secção for removida), criar versão local.
