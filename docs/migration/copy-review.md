# Copy Review — Migração Astro → Next.js

> **Revisor:** Yudhishthira (Copywriter)
> **Data:** 2026-04-04
> **Referências:** `docs/migration/seo-audit.md`, `docs/migration/ux-audit.md`
> **Total de páginas revisadas:** 18
> **Arquivos gerados:** `docs/migration/content/*.json` (18 arquivos)

---

## 1. Resumo Executivo

A copy geral do site é sólida e consistente no tom. O estilo é direto, técnico-persuasivo, alinhado ao público-alvo (devs, gestores, empreendedores). A página de mentoria é a mais rica em copywriting — usa frameworks PAS e BAB com eficácia. As skill pages seguem um template padronizado que garante consistência mas sacrifica personalização.

**Nota geral da copy:** 7.5/10

| Critério | Nota | Observação |
|----------|------|------------|
| Consistência de tom | 8/10 | Tom técnico-autoritativo mantido em todo o site |
| Clareza de CTAs | 6/10 | Mentoria tem CTAs demais; skill pages OK |
| SEO-friendliness | 7/10 | Titles e descriptions bons; h2 redundante nas skills |
| Persuasão (mentoria) | 8/10 | PAS bem executado, urgência e proof social presentes |
| Personalização por página | 5/10 | Skill pages muito genéricas no CTA final |

---

## 2. Inconsistências de Copy Encontradas

### 2.1 Contagem de Vagas Inconsistente (MENTORIA)

| Local | Texto | Problema |
|-------|-------|----------|
| Hero badge | "Restam somente **4** vagas" | Número diferente |
| Após seção Problema | "Apenas **8** vagas disponíveis" | Número diferente |
| Investimento social proof | "Apenas **8** vagas disponíveis" | Número diferente |
| Turmas | "Máx. **12** pessoas" | Referência ao total |

**Veredicto:** Confuso. Precisa definir um número real ou usar sistema dinâmico.
**Recomendação:** Usar "Vagas limitadas" genérico OU tornar dinâmico com API.

### 2.2 Duração/Formato da Mentoria Inconsistente

| Local | Texto |
|-------|-------|
| Hero microcopy | "Máx. 12 pessoas" |
| Homepage CTA | "Turmas exclusivas de **10** alunos · **4 semanas** · **10 encontros**" |
| Mentoria (como funciona) | "**8** Semanas" / "**8** Encontros" |
| Apresentação slide 1 | "**8** Encontros / ~19h / **12** Max Alunos" |

**Veredicto:** Homepage diz 10 alunos/4 semanas/10 encontros. Mentoria diz 12 pessoas/8 semanas/8 encontros. Dados conflitantes.
**Recomendação:** Unificar em uma única fonte de verdade (config/dados).

### 2.3 Descrição do Index vs Página de Skill

| Skill | Descrição no Index | Descrição na Página |
|-------|--------------------|---------------------|
| Vercel Deploy | "Deploy automatizado com preview deployments, domínios custom e edge functions para projetos web." | "Deploy automatizado com Vercel. CI/CD, preview deployments e domínios custom para projetos web." |
| AIOX Monitor | "Dashboard isométrico real-time de agentes autônomos. Visualize performance, tasks e métricas." | "Dashboard isométrico real-time de agentes autônomos. Visualize performance, tasks e métricas de todos os agentes em execução." |

**Veredicto:** Pequenas variações aceitáveis (index é truncado). Mas para SEO, a description da página é a canônica.
**Recomendação:** Usar o campo `description` do JSON como source of truth.

### 2.4 Naming de Claudia Guirunas

| Local | Descrição |
|-------|-----------|
| Diferencial card | "Psicanalista e Sócia da GrowthSales" |
| Facilitadores | "Co-Fundadora GrowthSales.ai" |
| Facilitadores bio | "Especialista em transformação digital e implementação de IA em processos de vendas" |
| Apresentação slide 3 | "Psicanalista e Sócia da GrowthSales" |

**Veredicto:** Role inconsistente — "Psicanalista" vs "Co-Fundadora" vs "Especialista em transformação digital".
**Recomendação:** Definir role oficial e usar consistentemente. Sugestão: "Co-Fundadora GrowthSales.ai · Psicanalista".

---

## 3. Textos Hardcoded que Devem Ser Configuráveis

### 3.1 Prioridade ALTA (mudam com frequência)

| Texto | Localização | Motivo |
|-------|-------------|--------|
| "Restam somente 4 vagas" | mentoria hero | Muda a cada turma |
| "Apenas 8 vagas disponíveis" | mentoria (3x) | Muda a cada turma |
| "R$ 8.700" | mentoria investimento | Preço pode mudar |
| "12x no cartão" | mentoria investimento | Condições de pagamento |
| Datas dos encontros (Maio 2025) | mentoria (8 cards) | Muda a cada turma |
| "Turmas exclusivas de 10 alunos · 4 semanas · 10 encontros" | homepage CTA | Muda a cada turma |
| URL do formulário Revos | mentoria (8+ ocorrências) | Pode mudar |
| "15" (Recursos) | homepage stats | Muda quando adicionam skills |
| "13" (Cursos Curados) | homepage stats | Muda quando adicionam cursos |
| "2025" (Copyright) | footer | Deve ser dinâmico |

### 3.2 Prioridade MÉDIA (mudam ocasionalmente)

| Texto | Localização | Motivo |
|-------|-------------|--------|
| "Garantia 7 dias" | mentoria (3x) | Política pode mudar |
| "Máx. 12 pessoas" | mentoria hero | Capacidade pode mudar |
| Links LinkedIn dos facilitadores | mentoria facilitadores | URLs podem mudar |
| "US$ 20/mês" (Claude Pro) | mentoria FAQ | Preço externo |
| Nomes dos modelos de IA (FLUX, Veo 3.1, etc.) | ai-image, ai-video | Modelos evoluem rápido |
| "96+ agentes" | xquads | Número cresce |

### 3.3 Prioridade BAIXA (raramente mudam)

| Texto | Localização |
|-------|-------------|
| Social links (GitHub, LinkedIn, Twitter) | footer |
| Site name "GrowthSales Open Source" | global |
| Default OG description | layout |

---

## 4. Análise de CTAs

### 4.1 Homepage — OK (3 CTAs estratégicos)

| CTA | Posição | Ação | Veredicto |
|-----|---------|------|-----------|
| "Explorar Skills" | Hero | Scroll interno | BOM — ação clara |
| "Mentoria" | Hero | Link página | BOM — secondary CTA |
| "Quero escalar" | CTA final | Link mentoria | BOM — urgência + ação |

### 4.2 Mentoria — EXCESSO (9+ CTAs)

| CTA | Posição | Texto |
|-----|---------|-------|
| 1 | Hero | "Fale com um Especialista" |
| 2 | Após problema | "Quero Sair na Frente" |
| 3 | Após como funciona | "Quero Participar" |
| 4 | Após diferenciais | "Quero Começar" |
| 5 | Após para quem | "Garantir Minha Vaga" |
| 6 | Após entregáveis | "Falar com Time" |
| 7 | Investimento | "Garantir Minha Vaga" |
| 8 | Pré-inscrição | "Falar com Especialista" |
| 9 | Inscrição | "Falar com Especialista Agora" |

**Veredicto:** 9 CTAs diferentes, todos apontando para o MESMO link Revos. Copy varia sem necessidade.
**Recomendação:** Reduzir para 3-4 CTAs estratégicos:
- Hero: "Fale com um Especialista"
- Meio (após diferenciais): "Quero Participar"
- Investimento: "Garantir Minha Vaga"
- Final: "Falar com Especialista"

### 4.3 Skill Pages — GENÉRICO (todas iguais)

| CTA | Texto | Problema |
|-----|-------|----------|
| Primary | "Ver no GitHub" (maioria) | OK |
| Final | "Comece agora" (hardcoded no SkillPage) | Genérico demais |
| Subtext | "Explore o repositório, contribua com melhorias ou integre na sua operação." | Idêntico em 15 páginas |

**Recomendação:** Personalizar o CTA final por página. Ex:
- AIOX Framework → "Monte sua primeira squad"
- Cursos Anthropic → "Comece o primeiro curso"
- AI Image → "Gere sua primeira imagem"

---

## 5. Análise SEO da Copy

### 5.1 Titles — BOM

Padrão: `{Título} | GrowthSales Open Source`
- Todos com menos de 60 caracteres
- Keywords relevantes no início
- Brand no final

### 5.2 Descriptions — BOM com ressalvas

- Todas entre 100-160 caracteres
- Keywords primárias presentes
- **Problema:** 17 de 18 páginas usam OG image default. Falta personalização.

### 5.3 Headings — PROBLEMA nas Skills

- **H2 redundante:** Toda skill page tem `h2 = title` na seção "O que é", além do `h1 = title`. Duplicação de heading com mesmo texto.
- **Recomendação:** Mudar o h2 de "O que é" para algo descritivo. Ex: "O que é o AIOX Framework" em vez de repetir "AIOX Framework".

### 5.4 Keywords naturais

A copy usa termos-chave de forma natural:
- "agentes autônomos", "IA", "Claude Code", "squads", "workflows"
- Bom uso de termos técnicos em português (público-alvo pt-BR)
- **Oportunidade:** Faltam keywords long-tail como "como usar agentes IA para marketing" ou "orquestração de agentes de IA enterprise"

---

## 6. Análise de Tom e Voz

### Tom geral: Técnico-Autoritativo com toques Persuasivos

| Aspecto | Homepage | Skills | Mentoria |
|---------|----------|--------|----------|
| Formalidade | Médio | Médio-alto | Médio-baixo |
| Persuasão | Baixa | Baixa | Alta |
| Urgência | Nenhuma | Nenhuma | Alta (múltiplos badges) |
| Jargão técnico | Alto | Alto | Médio |
| Emocional | Baixo | Baixo | Médio-alto |

**Observação:** A mentoria tem tom significativamente diferente do resto do site. É mais emocional, urgente e persuasivo. Isso é intencional (LP de conversão), mas a transição poderia ser mais suave.

### Voz da marca

- "GrowthSales" fala como autoridade técnica
- Usa segunda pessoa ("você") consistentemente
- Mistura português e termos técnicos em inglês (normal para o público-alvo)
- **Problema menor:** Alguns termos em inglês sem tradução podem alienar o público não-técnico da mentoria (ex: "headcount", "edge functions", "open loops")

---

## 7. Recomendações para a Migração

### 7.1 Criar sistema de content configurável

```typescript
// Exemplo de estrutura sugerida
const siteConfig = {
  mentoria: {
    vagasDisponiveis: 8,
    maxAlunos: 12,
    preco: 8700,
    parcelamento: 12,
    garantiaDias: 7,
    turmaAtual: {
      inicio: "2025-05-02",
      encontros: [...],
    },
    formUrl: "https://revos.growthsales.ai/f/...",
  },
  stats: {
    totalRecursos: 15,
    cursosCurados: 13,
  }
};
```

### 7.2 Unificar CTA text da mentoria

Reduzir de 9 para 4 variações. Manter consistência.

### 7.3 Personalizar CTA final das skill pages

Trocar o genérico "Comece agora" + "Explore o repositório..." por copy específico.

### 7.4 Corrigir h2 redundante nas skills

Mudar de `{title}` para "O que é o {title}" ou equivalente descritivo.

### 7.5 Tornar dados dinâmicos

Mover todas as entradas da seção 3.1 (prioridade ALTA) para um arquivo de configuração ou CMS.

### 7.6 Adicionar schema FAQ na mentoria

A seção FAQ tem 10 perguntas bem escritas. Adicionar JSON-LD FAQPage para rich snippets no Google.

---

## 8. Mapa de Arquivos Gerados

| Arquivo | Página | Template |
|---------|--------|----------|
| `content/index.json` | `/` | Custom (homepage) |
| `content/mentoria.json` | `/mentoria` | Custom (landing page) |
| `content/apresentacao.json` | `/mentoria/apresentacao` | Custom (Reveal.js slides) |
| `content/aiox-framework.json` | `/framework/aiox-framework` | SkillPage |
| `content/aiox-monitor.json` | `/monitor/aiox-monitor` | SkillPage |
| `content/xquads.json` | `/squads/xquads` | SkillPage |
| `content/maestri.json` | `/tools/maestri` | SkillPage |
| `content/claude-code.json` | `/setup/claude-code` | SkillPage |
| `content/anthropic-courses.json` | `/learn/anthropic-courses` | SkillPage |
| `content/meta-ads-ai.json` | `/learn/meta-ads-ai` | SkillPage |
| `content/google-ads-ai.json` | `/learn/google-ads-ai` | SkillPage |
| `content/vercel.json` | `/skills/vercel` | SkillPage |
| `content/github.json` | `/skills/github` | SkillPage |
| `content/supabase.json` | `/skills/supabase` | SkillPage |
| `content/carousel.json` | `/skills/carousel` | SkillPage |
| `content/graphic-designer.json` | `/skills/graphic-designer` | SkillPage |
| `content/ai-image.json` | `/skills/ai-image` | SkillPage |
| `content/ai-video.json` | `/skills/ai-video` | SkillPage |

---

## 9. Checklist para Nakula (Next.js)

- [ ] Importar JSONs de `docs/migration/content/` como source of truth
- [ ] Criar `siteConfig.ts` com dados dinâmicos (vagas, preço, datas)
- [ ] Usar `generateMetadata()` com dados dos JSONs
- [ ] Resolver h2 redundante no componente SkillPage
- [ ] Personalizar CTA final por página
- [ ] Adicionar JSON-LD FAQPage na mentoria
- [ ] Manter URLs idênticas (sem quebrar SEO)
- [ ] Revisar copyright footer (usar ano dinâmico)

---

*A verdade converte. A mentira converte uma vez e depois queima. — Yudhishthira*
