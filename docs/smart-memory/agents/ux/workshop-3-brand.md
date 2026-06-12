# Workshop 3 — Brand Spec & Deck UX

> Evento de encerramento Growth Sales A.I. × Trae.ai · 12 jun 2026
> 20 min · 9 slides · Tom empresário pra empresário · SEM push/deploy

---

## 1. Brand Tokens — CSS Variables

Cole no topo do layout CSS. Fonte de verdade: brandbook Growth Sales A.I. (refundação).

```css
:root {
  /* ── Neutros (Bone Scale) ── */
  --gs-void:          #050507;   /* background absoluto */
  --gs-ink:           #0e0e11;   /* cards, surfaces */
  --gs-ink-2:         #16161a;   /* elevação 1 */
  --gs-ink-3:         #1f1f24;   /* hover state */
  --gs-hairline:      rgba(255, 255, 255, 0.07);
  --gs-hairline-strong: rgba(255, 255, 255, 0.16);
  --gs-bone:          #f1f1f3;   /* texto primário */
  --gs-bone-dim:      #c5c5ca;   /* texto secundário */
  --gs-bone-mute:     #84848c;   /* labels, desabilitado */

  /* ── Acento (Ember Scale) ── */
  --gs-ember:         #ff3a0e;   /* acento principal */
  --gs-ember-glow:    #ff5a1f;   /* hover/focus */
  --gs-ember-hot:     #ff7a3d;   /* peak highlight */
  --gs-ember-deep:    #ff1a00;   /* gradient end */
  --gs-signal:        #e8e8ee;   /* cool highlight neutro */

  /* ── Tipografia ── */
  --gs-font-display:  'Fraunces', 'Instrument Serif', Georgia, serif;
  --gs-font-sans:     'Geist', 'Inter Tight', system-ui, -apple-system, sans-serif;
  --gs-font-mono:     'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;

  /* ── Motion ── */
  --gs-ease-cinema:   cubic-bezier(0.7, 0, 0.2, 1);   /* entradas dramáticas, hero reveals */
  --gs-ease-glide:    cubic-bezier(0.25, 1, 0.3, 1);  /* transições padrão, hovers */
  --gs-ease-snap:     cubic-bezier(0.5, 0, 0, 1);     /* click responses */
  --gs-dur-instant:   120ms;
  --gs-dur-short:     300ms;
  --gs-dur-medium:    600ms;
  --gs-dur-long:      1200ms;

  /* ── Spacing deck ── */
  --gs-slide-px:      clamp(24px, 5vw, 80px);
  --gs-slide-py:      clamp(32px, 6vh, 72px);

  /* ── Border radius ── */
  --gs-radius-none:   0;         /* estética do brandbook: sem radius, tudo sharp */
}
```

**Regra de uso do ember:** máximo 8% da viewport em qualquer tela. Mais do que isso vira anúncio.

---

## 2. Logo Strategy

### Assets a copiar (origem → destino)

| Arquivo origem | Destino no projeto | Quando usar |
|---|---|---|
| `/Users/joaoramos/Downloads/growth-sales-a-i-manual-da-marca/project/refundacao/assets/symbol-official.svg` | `/public/brand/growth/symbol-official.svg` | Símbolo isolado — canto de slide, watermark, ícone |
| `/Users/joaoramos/Downloads/growth-sales-a-i-manual-da-marca/project/refundacao/assets/favicon.svg` | `/public/brand/growth/favicon.svg` | Reserva / alternativa de símbolo |
| `/Users/joaoramos/Downloads/growth-sales-a-i-manual-da-marca/project/refundacao/assets/og-image.png` | `/public/brand/growth/og-image.png` | OG meta da rota /workshop-3 |

> **`logo-header.png` REMOVIDO** — era o logo antigo (pirâmide). Não usar em nenhum slide.

### Wordmark tipográfico (construção inline — sem PNG)

O lockup Growth Sales.ai é construído com CSS/JSX puro, conforme `LogoKit.jsx` do brandbook:

```tsx
// Componente <GrowthLogo> — dev-alpha implementa em 4 tamanhos: sm | md | lg | hero
// Lockup horizontal: símbolo SVG + wordmark tipográfico

// Wordmark:
// "growthsales" → Geist weight 300, letter-spacing -0.035em, cor bone (#f1f1f3)
// ".ai"         → Fraunces italic weight 300, letter-spacing -0.04em, cor ember (#FF3A0E)

// Símbolo: symbol-official.svg com gradiente #FF4400 → #FF1A00 (já em public/brand/growth/)

// Tamanhos por contexto:
// hero  → wordmark ~36px  · símbolo ~56px  (slide 01 — logo em destaque)
// lg    → wordmark ~24px  · símbolo ~38px  (slide 09 — encerramento)
// md    → wordmark ~18px  · símbolo ~28px  (headers, rodapés)
// sm    → wordmark ~13px  · símbolo ~20px  (watermark, links)
```

### Quando usar símbolo vs lockup

- **Símbolo isolado** (`symbol-official.svg`): slides de conteúdo (03–08), watermark fundo (opacity 0.04–0.06). Gradiente `#FF4400 → #FF1A00`.
- **Lockup `<GrowthLogo size="hero">`**: slide 01 (quem somos). Máximo uma vez por tela.
- **Lockup `<GrowthLogo size="lg">`**: slide 09 (encerramento/rodapé).
- **Nenhum PNG de logo** — wordmark é sempre tipográfico.

### Nomenclatura canônica (crítico)

- Forma oficial: **Growth Sales.ai**
- Abreviação aceitável a partir da 2ª menção: **Growth**
- Em URL/footer: `growthsales.ai`
- Nunca: GROWTH SALES, GrowthSales, Growth Sales AI

---

## 3. Tom de Voz — Adaptado para Deck

Extraído de `Voice.jsx`. Tom empresário pra empresário — não pitch, não palestra motivacional.

### Princípios ativos no deck

1. **Frase curta. Ponto final.** Cada headline é uma operação completa. Sem "que" encadeado.
2. **Concreto. Sempre.** Número antes de adjetivo. "0 → 150k/mês em 18 meses" não "crescimento acelerado".
3. **Gravidade, não grito.** Sem exclamação. Sem emoji. O som de uma sala silenciosa onde alguém afirma algo verdadeiro.
4. **Sem sujeito. Verbo no presente.** "Construímos sistemas." Nunca "estamos construindo soluções."
5. **Edita até doer.** "Robusto", "inovador", "escalável" — fora.

### Tom específico para apresentação ao vivo

- Registro: **editorial declarativo** — peso de Bloomberg, proximidade de Arc/Browser Co.
- João fala como operador que viveu, não como palestrante que estudou.
- Sem mencionar tecnologia específica pelo nome (conforme briefing).
- Termos canônicos do deck: **sistema**, **operação**, **ritmo**, **comando**, **fogo**, **ofício**.
- Termos proibidos no deck: solução, jornada, transformação, sinergia, alavancar, robusto, escalável, inovação, disrupção.

### Taglines disponíveis para encerramento

- `Service as a System.` — master tagline
- `O sistema serve o negócio.` — curta, fechamento de slide
- `O código se adapta. A empresa não.` — principle, section break

---

## 4. Layout Deck — Workshop3DeckLayout Spec

### Estrutura geral (wireframe textual)

```
┌──────────────────────────────────────────────────────────────────┐
│ [kicker mono 10px]                        [X/9 mono 10px]        │
│ GROWTH SALES.AI · SLIDE TITLE              01/09                 │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│                                                                  │
│   ████████████████████████████████                               │
│   h1 · display serif · weight 300                                │
│   clamp(48px, 7vw, 96px) · lh 0.92                               │
│                                                                  │
│   Kicker / subtítulo ou dado-âncora                              │
│   sans · weight 400 · 20–28px                                    │
│                                                                  │
│   Body copy se necessário                                        │
│   sans · weight 300 · 17px · bone-dim                            │
│                                                                  │
│                           [símbolo GS watermark opacity 0.04]    │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│ ←  Anterior          [● ● ● ● ● ● ● ● ●]          Próximo →     │
│ [slide-title]         progress dots                [slide-title] │
└──────────────────────────────────────────────────────────────────┘
```

### Typography scale no deck

| Role | Font | Size | Weight | Cor |
|---|---|---|---|---|
| Kicker / label | Geist Mono | 10px, tracking 0.22em, uppercase | 500 | `--gs-ember` |
| H1 display | Fraunces | clamp(48px, 7vw, 96px) | 300 | `--gs-bone` |
| H1 accent word | Fraunces italic | mesmo | 300 | `--gs-ember` |
| Subhead | Geist | clamp(20px, 2.5vw, 32px) | 400 | `--gs-bone` |
| Dado âncora (número) | Fraunces | clamp(64px, 10vw, 128px) | 400 | `--gs-bone` |
| Body | Geist | 17px | 300 | `--gs-bone-dim` |
| Caption / meta | Geist Mono | 11px, tracking 0.18em | 500 | `--gs-bone-mute` |
| Número de slide | Geist Mono | 10px | 400 | `rgba(255,255,255,0.3)` |

### Grid e espaçamento

- Container: `max-width: 100vw`, padding `var(--gs-slide-px)` lateral, `var(--gs-slide-py)` topo/base.
- Fullscreen por padrão: `min-height: 100svh`, `display: flex; flex-direction: column; justify-content: space-between`.
- Conteúdo principal: coluna única, `max-width: 900px`, alinhado à esquerda.
- Dados/cards: grid `repeat(auto-fit, minmax(240px, 1fr))` com gap 1px, background `--gs-hairline` (cria efeito de borda hairline entre cells).

### Comportamento mobile (320–768px)

- H1: `clamp(32px, 8vw, 56px)` — reduzir proporcionalmente.
- Progress dots: condensar em linha única, sem labels de slide.
- Nav anterior/próximo: empilhado vertical, gap 16px.
- Body: 15px, lh 1.6.
- Padding: 20px lateral, 28px topo.

### Textura de fundo

O brandbook usa dot-grid + scanlines sutil. No deck: background `--gs-void` puro é suficiente para leitura. Opcional: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)` em 24px grid com opacity 0.4 — apenas para slides de abertura e encerramento.

### Progress dots

Seguir exatamente o padrão `WorkshopPhaseLayout` do workshop-2:
- Dots = segmentos de linha (`flex-1 h-0.5`)
- Atual: `--gs-ember`
- Visitado: `rgba(255,58,14,0.35)`
- Pendente: `rgba(255,255,255,0.1)`
- Contador `X/9` em mono à direita

### Header do slide

```
[KICKER MONO · ember]
h1 display
```

Hairline `border-bottom: 1px solid var(--gs-hairline)` abaixo do header antes do conteúdo principal — exatamente como o workshop-2 faz.

---

## 5. Specs por Slide (9 slides)

### Slide 01 — `quem-somos` (2 min)

**Hierarquia visual:**
```
[GROWTH SALES.AI · APRESENTAÇÃO]          [01/09]

[<GrowthLogo size="hero" />]

Dezoito meses.
Dois produtos.

Claudia + João Guirunas
Growth Sales.ai

[hairline]
Sistema construído por dentro do negócio.
```

**Elementos-chave:**
- `<GrowthLogo size="hero" />` no topo — símbolo SVG + wordmark tipográfico Geist/Fraunces. Sem PNG.
- H1 Fraunces weight 300: "Dezoito meses. / Dois produtos." — ponto final. Dois paragraphs, não uma frase.
- Nome dos dois founders em Geist 20px, bone-dim.
- Kicker mono ember acima: `GROWTH SALES.AI · APRESENTAÇÃO`.
- Símbolo GS SVG como watermark no canto inferior direito, opacity 0.04–0.06.

**Copy sugerida:**
> Kicker: `GROWTH SALES.AI · QUEM SOMOS`
> H1: "Dezoito meses. / Dois produtos."
> Sub: "Claudia + João Guirunas. Growth Sales.ai."
> Body: "IA aplicada por dentro do negócio."

---

### Slide 02 — `pergunta` (2 min)

**Hierarquia visual:**
```
[REFRAME · PONTO DE PARTIDA]              [02/09]

Por onde começa
um negócio com IA?

[hairline ember · 60px wide]

Começa pela dor.
Não pela ferramenta.
```

**Elementos-chave:**
- H1 Fraunces weight 300, grande: "Por onde começa / um negócio com IA?" — em itálico (pergunta).
- Resposta em segunda linha, Geist weight 400, size 28–36px, bone: "Começa pela dor."
- "Não pela ferramenta." em bone-mute, weight 300, um nível abaixo.
- Separador visual: linha horizontal 1px ember, 60px de largura — não hairline full-width.
- Nenhuma imagem. Tipografia pura.

**Copy sugerida:**
> Kicker: `REFRAME · 02`
> H1 italic: "Por onde começa / um negócio com IA?"
> Resposta: "Começa pela dor."
> Sub: "Não pela ferramenta."

---

### Slide 03 — `tese` (2 min)

**Hierarquia visual:**
```
[TESE CENTRAL]                             [03/09]

Negócio se desenvolve
em cima de uma necessidade.
Não o contrário.

[hairline full]

IA acelera a entrega disso.
```

**Elementos-chave:**
- H1 em Fraunces weight 300, clamp 52–88px: frase da tese completa, quebrada em 3 linhas.
- "IA acelera a entrega disso." em Geist weight 500, 24px, bone — aparece ABAIXO da hairline, separado como conclusão.
- Sem imagens. Sem ícones. Tipografia é o design.
- Dot-grid fundo sutil (opacity 0.3) para dar textura ao vazio — permite que a tese respire.

**Copy sugerida:**
> Kicker: `TESE CENTRAL · 03`
> H1: "Negócio se desenvolve / em cima de uma necessidade. / Não o contrário."
> Conclusão: "IA acelera a entrega disso."

---

### Slide 04 — `workos` (2:30 min)

**Hierarquia visual:**
```
[PRODUTO 01 · SYSTEM AS A SERVICE]        [04/09]

WorkOS
PMO operado por agentes

[cards grid 2 colunas]
┌──────────────────┬──────────────────┐
│  A DOR           │  A RESPOSTA      │
│  PMO caro.       │  Time de agentes │
│  Escala mal.     │  como PMO.       │
│  Depende de      │  Roda no negócio.│
│  pessoas.        │  Sem headcount.  │
└──────────────────┴──────────────────┘

System as a Service.
```

**Elementos-chave:**
- Kicker mono ember: `PRODUTO 01 · SYSTEM AS A SERVICE` — o conceito **System as a Service** é nome de categoria do produto. Aparece no kicker E no rodapé da tela.
- H1 Fraunces: "WorkOS" — peso, tamanho máximo (72–96px).
- Sub imediata Geist: "PMO operado por agentes" — bone-dim, 22px.
- Grid 2 colunas (`gap: 1px`, `background: --gs-hairline`): card "A DOR" (ink-2) vs card "A RESPOSTA" (ink com leve tinte ember `rgba(255,58,14,0.04)`).
- Tagline final abaixo do grid, Fraunces itálico: "Service as a System."

**Conceito System as a Service (pesquisado no brandbook):**
O brandbook define na tagline master `Service as a System.` — o código se adapta ao negócio, não o contrário. WorkOS aplica isso ao PMO: em vez de contratar um PMO humano (serviço), você tem um sistema de agentes que opera como PMO. **System as a Service** = o sistema substitui o serviço humano recorrente, opera autonomamente, adapta-se à realidade do cliente.

---

### Slide 05 — `orquestrador` (2:30 min)

**Hierarquia visual:**
```
[PRODUTO 02 · SERVICE AS A SYSTEM]        [05/09]

Orquestrador
Comercial
Sistema que orquestra a ponta.

[cards grid 2 colunas]
┌──────────────────┬──────────────────┐
│  A DOR           │  A RESPOSTA      │
│  Lead perdido.   │  Sistema que     │
│  Contexto        │  não dorme.      │
│  quebrado.       │  Contexto vivo.  │
│  Tempo gasto     │  Time fecha.     │
│  em repetição.   │  Sistema serve.  │
└──────────────────┴──────────────────┘

Service as a System.
```

**Elementos-chave:**
- Kicker mono ember: `PRODUTO 02 · SERVICE AS A SYSTEM`.
- H1 Fraunces: "Orquestrador / Comercial" — quebrado em 2 linhas por impacto.
- Sub Geist: "Sistema que orquestra a ponta." — bone-dim.
- Grid 2 colunas com mesma lógica do slide 04.
- "Service as a System." no rodapé, Fraunces itálico.

**Conceito Service as a System (pesquisado no brandbook):**
No boilerplate oficial: "Service as a System: o código se adapta ao negócio — não o contrário." O Orquestrador Comercial é o exemplo arquetípico: o serviço de prospecção/follow-up (que antes dependia de SDRs humanos) vira um sistema de agentes que orquestra toda a ponta comercial. O **serviço** que o cliente precisava contratar vira **sistema** que roda por dentro.

**Diferença WorkOS vs Orquestrador:**
- WorkOS → System as a Service: VOCÊ tem um sistema que age como serviço (PMO).
- Orquestrador → Service as a System: o que era serviço humano vira sistema.
(Distinção do brandbook: são ângulos inversos da mesma filosofia.)

---

### Slide 06 — `numeros` (2 min)

**Hierarquia visual:**
```
[TRAÇÃO · 18 MESES]                       [06/09]

0 → 150k
    /mês

[grid 3 métricas]
┌──────────┬──────────┬──────────┐
│ HOJE     │ DEZ/2026 │ 2027     │
│ 150k/mês │ 500k/mês │ R$ 6M    │
│ Receita  │ Projeção │ Meta     │
└──────────┴──────────┴──────────┘

18 meses. Sem investimento externo.
```

**Elementos-chave:**
- H1 Fraunces weight 400: "0 → 150k" — tamanho máximo do deck (96–128px). Depois "/mês" em ember, menor (48px).
- Kicker: `TRAÇÃO · 18 MESES`.
- Grid 3 colunas (métricas): cada célula tem kicker mono (período), número grande Fraunces, label bone-mute.
- Número atual (150k) em bone. Projeção (500k) em bone-dim. Meta (R$ 6M) em ember.
- Linha final: "18 meses. Sem investimento externo." — Geist weight 300, 17px, bone-dim.
- Usar máscara de entrada (`maskWipe`) no número principal se houver animação de entrada.

---

### Slide 07 — `clientes` (1:30 min)

**Hierarquia visual:**
```
[CLIENTES · OPERAÇÃO REAL]                [07/09]

Quem já opera
com o sistema.

[lista com hairlines]
  Sisprime
  Blue3
  Viva América
  Argoplan
  + outros em operação
```

**Elementos-chave:**
- H1 Fraunces: "Quem já opera / com o sistema." — weight 300, itálico no "com o sistema".
- Lista de clientes: não é grid, é lista vertical. Cada nome em Geist weight 500, 28–36px, bone. Hairline `border-bottom: 1px solid --gs-hairline` entre cada item.
- "+ outros em operação" em bone-mute, Geist weight 300, 20px — último item da lista.
- Sem logos de clientes neste deck (a menos que João tenha aprovação explícita). Só nomes.
- Símbolo GS SVG como watermark (opacity 0.05), canto inferior direito.

---

### Slide 08 — `processo-interno` (2:30 min)

**Hierarquia visual:**
```
[OPERAÇÃO INTERNA · IA EM TODO PROCESSO]  [08/09]

Menos recurso.
Mais entrega.

[grid 2 colunas: antes / depois]
┌──────────────────────┬──────────────────────┐
│  ANTES               │  AGORA               │
│  Time maior.         │  Agentes operam.     │
│  Processo manual.    │  Processo em sistema.│
│  Energia dispersa.   │  Ritmo composto.     │
│  Decisão lenta.      │  Dado limpo.         │
└──────────────────────┴──────────────────────┘

IA nos processos certos, no momento certo.
```

**Elementos-chave:**
- H1 Fraunces: "Menos recurso. / Mais entrega." — duas frases. Ponto final em cada.
- Grid 2 colunas: "ANTES" (ink-2, bone-mute) vs "AGORA" (ink com leve ember tint, bone).
- Rodapé: "IA nos processos certos, no momento certo." — copy do brandbook (João, Foundation).
- Kicker: `OPERAÇÃO INTERNA · 08`.

---

### Slide 09 — `reflexao` (3 min)

**Hierarquia visual:**
```
[ENCERRAMENTO · DOIS RECADOS]             [09/09]

[seção 1 — pra pessoa]
Para qualquer profissão:
eficiência operacional não é tema de TI.

[hairline]

[seção 2 — pra empresário]
Eficiência + repertório direciona.
IA acelera.

[fechamento — destaque máximo]
"IA não cria o caminho.
Ela encurta o caminho
que você já sabia andar."

[rodapé]
[<GrowthLogo size="lg" />]
Service as a System.
growthsales.ai
```

**Elementos-chave:**
- Dois blocos de conteúdo separados por hairline — ritmo visual de "dois recados".
- Bloco 1: Geist 20px, bone, "Para qualquer profissão: eficiência operacional não é tema de TI." Pode citar médico, advogado como exemplos em bone-mute.
- Bloco 2: mesmo tamanho. "Eficiência + repertório direciona. / IA acelera."
- **Frase de encerramento** (hierarquia máxima): Fraunces itálico weight 300, clamp(36px, 5vw, 72px), bone:
  > *"IA não cria o caminho. / Ela encurta o caminho / que você já sabia andar."*
- Rodapé: `<GrowthLogo size="lg" />` + "Service as a System." em Fraunces itálico + "growthsales.ai" mono. Sem PNG.
- Este slide tem o dot-grid fundo ligeiramente mais visível (opacity 0.4) para marcar o encerramento.

---

## 6. Assets a Copiar

| Arquivo origem (absoluto) | Destino no projeto | Comando |
|---|---|---|
| `/Users/joaoramos/Downloads/growth-sales-a-i-manual-da-marca/project/refundacao/assets/symbol-official.svg` | `public/brand/growth/symbol-official.svg` | `cp` |
| `/Users/joaoramos/Downloads/growth-sales-a-i-manual-da-marca/project/refundacao/assets/favicon.svg` | `public/brand/growth/favicon.svg` | `cp` |
| `/Users/joaoramos/Downloads/growth-sales-a-i-manual-da-marca/project/refundacao/assets/og-image.png` | `public/brand/growth/og-image.png` | `cp` |

> **`logo-header.png` REMOVIDO DA LISTA** — logo antigo (pirâmide). Wordmark é construído inline via `<GrowthLogo>`.

**Comando único para copiar tudo:**
```bash
mkdir -p /Users/joaoramos/Desktop/Projetos/joao-guirunas-site/public/brand/growth && \
cp /Users/joaoramos/Downloads/growth-sales-a-i-manual-da-marca/project/refundacao/assets/symbol-official.svg /Users/joaoramos/Desktop/Projetos/joao-guirunas-site/public/brand/growth/ && \
cp /Users/joaoramos/Downloads/growth-sales-a-i-manual-da-marca/project/refundacao/assets/favicon.svg /Users/joaoramos/Desktop/Projetos/joao-guirunas-site/public/brand/growth/ && \
cp /Users/joaoramos/Downloads/growth-sales-a-i-manual-da-marca/project/refundacao/assets/og-image.png /Users/joaoramos/Desktop/Projetos/joao-guirunas-site/public/brand/growth/
```

---

## 7. Padrão de Implementação — Referência workshop-2

### Estrutura de arquivos esperada

```
src/app/workshop-3/
  page.tsx                        ← índice dos 9 slides (igual workshop-2/page.tsx)
  _components/
    Workshop3DeckLayout.tsx       ← layout com progress dots, nav, header
  quem-somos/page.tsx
  pergunta/page.tsx
  tese/page.tsx
  workos/page.tsx
  orquestrador/page.tsx
  numeros/page.tsx
  clientes/page.tsx
  processo-interno/page.tsx
  reflexao/page.tsx
```

### Workshop3DeckLayout — props esperados

```typescript
type DeckSlide = {
  slug: string;
  number: number;
  title: string;
  duration: string;
  href: string;
};

// 9 slides na ordem do briefing
const WORKSHOP_3_SLIDES: DeckSlide[] = [
  { slug: 'quem-somos',         number: 1, title: 'Quem somos',           duration: '2 min',   href: '/workshop-3/quem-somos' },
  { slug: 'pergunta',           number: 2, title: 'Por onde começa',      duration: '2 min',   href: '/workshop-3/pergunta' },
  { slug: 'tese',               number: 3, title: 'A tese',               duration: '2 min',   href: '/workshop-3/tese' },
  { slug: 'workos',             number: 4, title: 'WorkOS',               duration: '2:30 min',href: '/workshop-3/workos' },
  { slug: 'orquestrador',       number: 5, title: 'Orquestrador',         duration: '2:30 min',href: '/workshop-3/orquestrador' },
  { slug: 'numeros',            number: 6, title: 'Números',              duration: '2 min',   href: '/workshop-3/numeros' },
  { slug: 'clientes',           number: 7, title: 'Clientes',             duration: '1:30 min',href: '/workshop-3/clientes' },
  { slug: 'processo-interno',   number: 8, title: 'Processo interno',     duration: '2:30 min',href: '/workshop-3/processo-interno' },
  { slug: 'reflexao',           number: 9, title: 'Reflexão',             duration: '3 min',   href: '/workshop-3/reflexao' },
];
```

### Diferenças do workshop-3 em relação ao workshop-2

| Aspecto | Workshop-2 | Workshop-3 |
|---|---|---|
| Background | `bg-black` (Tailwind) | `background: var(--gs-void)` (#050507) |
| Accent color | `var(--color-accent)` global | `var(--gs-ember)` (#ff3a0e) — inline |
| Font display | Fraunces via `var(--font-display-serif)` | Fraunces — mesmo, já carregado |
| Font sans | Space Grotesk via `var(--font-display)` | Geist via `var(--gs-font-sans)` |
| Layout | `max-w-3xl` col centered | Fullscreen `100svh`, padding lateral generoso |
| Radius | padrão (nenhum especificado) | Sem radius — sharp edges (`border-radius: 0`) |
| Progress | `h-0.5` lines | Mesmo padrão |

### Inline styles vs Tailwind

Usar inline styles para tokens do brand system Growth (evitar conflito com CSS global do site). Tailwind apenas para `min-h-screen`, `flex`, `items-center` — utilidades de layout sem valor de token.

---

## 8. Notas de Apresentação

- **Ordem de slides**: o deck começa com quem somos (credibilidade), vai para o reframe (pergunta), e só então mostra os produtos. Isso respeita o tom empresário pra empresário — você prova antes de vender.
- **Slides 04 e 05** são os mais técnicos. João deve pausar e deixar o visual respirar antes de falar.
- **Slide 06** (números) é o único slide com dado emocional. Deixar silêncio após "0 → 150k/mês".
- **Slide 09** (reflexão): não apressar. A frase final é o take-home. Encerrar com ela na tela.
- Navegação por teclado (← →) é esperada pelo padrão workshop-2.

---

*Spec criada por Velani (UX) · 12 jun 2026 · Fonte de verdade: brandbook Growth Sales A.I. refundação*

---

## REVISÃO V2 — Fotos + Paleta KV

> Round 2 · 12 jun 2026 · Evento HOJE

---

### V2.1 — Auditoria de Paleta KV

**Resultado da auditoria:** o spec v1 e o código implementado estão **livres de marrom**. Nenhuma cor `clay`, `amber` ou tom quente fora do brand system foi encontrada nos 9 slides ou no layout.

**A paleta KV restrita (única autorizada no deck):**

```
FUNDO      #050507  --gs-void      ← background absoluto de todos os slides
SURFACE    #0e0e11  --gs-ink       ← cards, cells internas
SURFACE+   #16161a  --gs-ink-2     ← hover, elevação (usar com parcimônia)
TEXTO      #f1f1f3  --gs-bone      ← todo texto primário
TEXTO DIM  #c5c5ca  --gs-bone-dim  ← body, secundário
MUTE       #84848c  --gs-bone-mute ← labels, kickers, mono
ACENTO     #ff3a0e  --gs-ember     ← único acento — ≤ 8% da viewport
DIVIDER    rgba(255,255,255,0.07)  ← hairlines, bordas
```

**O "marrom" que João viu** tem origem mais provável em dois fatores:
1. **Projetor com calibração quente** — `#FF3A0E` (ember) em projetor aquecido aparece como laranja-marrom. Solução: subir levemente o acento para `#FF5A1F` (ember-glow) especificamente nos slides onde o ember aparece em áreas grandes. Mantém identidade, melhora leitura em projetor.
2. **`Space Grotesk`** sendo renderizada pelo `var(--font-display)` do site — essa fonte tem peso visual diferente de Geist. Em texto grande pode parecer marrom por anti-aliasing. Substituir DISPLAY por Geist/Inter Tight nos slides onde importa (ver seção V2.4).

**Ação no código:** nos slides de cards (04 workos, 05 orquestrador, 08 processo-interno), onde o ember é usado em texto grande no card "A RESPOSTA", usar `--gs-ember-glow` (`#FF5A1F`) ao invés de `--gs-ember` para compensar projetor.

---

### V2.2 — Curadoria Fotográfica por Slide

**Princípio de edição:** fotos são atmosfera, não protagonistas. O texto é sempre legível sobre o fundo. Máximo 5 slides com foto (dos 9 disponíveis — 4 ficam tipográficos puros por escolha editorial).

**Inventário das 13 fotos horizontais:**

| Ref | Arquivo (sufixo) | Cena | Tom dominante |
|---|---|---|---|
| H-01 | `_2997803612` | Rooftop noturno, cidade ao fundo, postura relaxada | Dark + luzes da cidade |
| H-02 | `_2997804117` | Dashboard analytics no monitor, olha câmera, plano médio | Dark, amber do monitor |
| H-03 | `_2997804492` | Dashboard analytics + monitor curvo, braços cruzados | Dark frio, detalhe data |
| H-04 | `_2997804893` | Dois monitores flanqueando, postura frontal, setup completo | Dark simétrico |
| H-05 | `_2997807176` | Olhando tela de dados, cityscape azul frio ao fundo | Dark + azul-frio |
| H-06 | `_2997807686` | Corredor de escritório, carregando notebook, reflexo no vidro | Dark, luzes quentes pontuais |
| H-07 | `_2997808515` | Dashboard curvo grande, olha câmera de frente, cruzado | Dark, muito monitor |
| H-08 | `_2997809061` | Escritório escuro/vazio, olha diagonal, sozinho | Escuro total, melancólico |
| H-09 | `_2997809388` | Apresentando fluxograma holográfico para grupo | Dark, amber/orange em tela |
| H-10 | `_2997809698` | No palco com projetor atrás, mãos juntas | Ambiente auditório |
| H-11 | `_2997810024` | Tablet na mão, cityscape noturno azul, concentrado | Dark + azul suave |
| H-12 | `_2997811007` | Sala de reunião, mesa comprida, perspectiva, sozinho | Neutro quente, madeira |
| H-13 | `_2997813616` | Apresentando AI workflow em touch screen, grupo | Amber nas telas, dinâmico |

**H-12 é a culpada do "marrom"** — a mesa de madeira e os pendentes quentes criam um tom warm que não é KV. Não usar H-12 no deck.

---

**Cura por slide:**

#### Slide 01 — `quem-somos` → **H-01 (rooftop noturno)**
- **Por quê:** postura relaxada + cidade ao fundo = empresário que já chegou onde chegou, sem precisar provar nada. Tom de abertura perfeito. Sem tech no frame — foco na pessoa.
- **Tratamento:** background fullscreen. Gradient overlay `linear-gradient(to right, rgba(5,5,7,0.85) 0%, rgba(5,5,7,0.55) 50%, rgba(5,5,7,0.2) 100%)` — texto à esquerda, foto respira à direita.
- **Posicionamento:** `object-position: center center`, `object-fit: cover`.
- **Blend:** nenhum. Foto escura o suficiente por natureza.

#### Slide 02 — `pergunta` → **TIPOGRÁFICO PURO**
- **Por quê:** a pergunta "Por onde começa um negócio com IA?" precisa de silêncio visual. Foto distrairia do reframe.
- **Fundo:** `--gs-void` puro com dot-grid sutil (opacity 0.25).

#### Slide 03 — `tese` → **TIPOGRÁFICO PURO**
- **Por quê:** slide mais denso em copy. A tese precisa de respiro absoluto. Qualquer foto compete.
- **Fundo:** `--gs-void` puro.

#### Slide 04 — `workos` → **H-07 (dashboard curvo, frontal)**
- **Por quê:** João de frente para monitores com dados = PMO operado por agentes. Composição frontal e simétrica reforça a ideia de "sistema no comando".
- **Tratamento:** split layout. Foto ocupa lado direito (60% da largura), texto à esquerda. Gradient vertical `linear-gradient(to right, rgba(5,5,7,1) 0%, rgba(5,5,7,0.7) 40%, rgba(5,5,7,0) 100%)` na borda esquerda da foto.
- **Mobile:** foto some, fundo `--gs-void`.

#### Slide 05 — `orquestrador` → **H-09 (apresentando fluxograma)**
- **Por quê:** João literalmente orquestrando — mão apontando para fluxograma = Orquestrador Comercial. A metáfora é perfeita sem forçar.
- **Tratamento:** background fullscreen com overlay mais denso que H-01. `linear-gradient(to bottom, rgba(5,5,7,0.7) 0%, rgba(5,5,7,0.5) 40%, rgba(5,5,7,0.85) 100%)` — kicker e título no topo, cards na base, foto no meio.
- **Posicionamento:** `object-position: center 30%` para manter rosto visível.

#### Slide 06 — `numeros` → **TIPOGRÁFICO PURO**
- **Por quê:** o número "0 → 150k/mês" é o protagonista absoluto. Foto dilui o impacto emocional do dado.
- **Fundo:** `--gs-void` puro. Opcional: ember radial muito sutil `radial-gradient(ellipse 30% 40% at 15% 50%, rgba(255,58,14,0.06), transparent)` para dar calor sem cor.

#### Slide 07 — `clientes` → **H-12… NÃO. → H-06 (corredor com notebook)**
- **H-12 descartada** por causa da madeira marrom.
- **H-06** (corredor escuro, reflexo no vidro, carregando notebook): evoca movimento, operação em curso, clientes sendo atendidos. Tom escuro e frio compatível com KV.
- **Tratamento:** background fullscreen, overlay `rgba(5,5,7,0.75)` uniforme. Lista de clientes centralizada sobre o fundo.
- **Posicionamento:** `object-position: left center` para deixar João no enquadramento esquerdo e texto no espaço direito.

#### Slide 08 — `processo-interno` → **H-04 (dois monitores, setup completo)**
- **Por quê:** setup duplo de monitores com dados = operação interna com IA. Composição simétrica reforça "sistema rodando".
- **Tratamento:** background fullscreen, overlay `rgba(5,5,7,0.8)` — mais denso porque o slide tem muito texto (grid antes/depois).
- **Posicionamento:** `object-position: center center`.

#### Slide 09 — `reflexao` → **H-05 (olhando para tela, cityscape azul frio)**
- **Por quê:** olhar voltado para longe + cityscape = reflexão, perspectiva, encerramento. O tom azul-frio contrasta com o ember quente dos slides de produto — marca a transição para momento mais humano.
- **Tratamento:** overlay mais leve que o restante: `linear-gradient(to bottom, rgba(5,5,7,0.6) 0%, rgba(5,5,7,0.75) 100%)`. A foto deve respirar mais neste slide.
- **Posicionamento:** `object-position: right center` — João à direita, espaço para texto à esquerda.

---

### V2.3 — Lista de Assets Fotográficos a Copiar

Nomes semânticos para o dev importar sem brigar com filename longo.

```bash
# Copiar os 5 assets usados no deck
FOTO_DIR="/Users/joaoramos/Desktop/Projetos/joao-guirunas-social/docs/Arquivos Base/fotos-joao/novas/Horizontal"
DEST="/Users/joaoramos/Desktop/Projetos/joao-guirunas-site/public/photos/joao"

mkdir -p "$DEST"

cp "$FOTO_DIR/magnific_joaoguirunas-important-ma_2997803612.png" "$DEST/joao-rooftop-night.png"
cp "$FOTO_DIR/magnific_joaoguirunas-important-ma_2997807686.png" "$DEST/joao-corridor-notebook.png"
cp "$FOTO_DIR/magnific_joaoguirunas-important-ma_2997808515.png" "$DEST/joao-dashboard-frontal.png"
cp "$FOTO_DIR/magnific_joaoguirunas-important-ma_2997809388.png" "$DEST/joao-presenting-flowchart.png"
cp "$FOTO_DIR/magnific_joaoguirunas-important-ma_2997804893.png" "$DEST/joao-dual-monitors.png"
cp "$FOTO_DIR/magnific_joaoguirunas-important-ma_2997807176.png" "$DEST/joao-cityscape-reflection.png"
```

**Mapa slide → arquivo semântico:**

| Slide | Arquivo público | Layout |
|---|---|---|
| 01 quem-somos | `/photos/joao/joao-rooftop-night.png` | fullscreen + gradient direita |
| 04 workos | `/photos/joao/joao-dashboard-frontal.png` | split direita 60% |
| 05 orquestrador | `/photos/joao/joao-presenting-flowchart.png` | fullscreen + overlay |
| 07 clientes | `/photos/joao/joao-corridor-notebook.png` | fullscreen + overlay uniforme |
| 08 processo-interno | `/photos/joao/joao-dual-monitors.png` | fullscreen + overlay denso |
| 09 reflexao | `/photos/joao/joao-cityscape-reflection.png` | fullscreen + overlay leve |

---

### V2.4 — Padrão CSS para Background de Foto

Bloco reutilizável. O dev aplica em cada slide que usa foto.

```tsx
// No page.tsx de cada slide com foto:

{/* Background foto — sempre primeiro filho de Workshop3DeckLayout */}
<div
  aria-hidden="true"
  style={{
    position: 'absolute',
    inset: 0,
    zIndex: 0,
  }}
>
  <img
    src="/photos/joao/joao-rooftop-night.png"  // ← trocar por slide
    alt=""
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center center',  // ← ajustar por slide
      display: 'block',
    }}
  />
  {/* Overlay — valores por slide na tabela abaixo */}
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right, rgba(5,5,7,0.85) 0%, rgba(5,5,7,0.55) 50%, rgba(5,5,7,0.2) 100%)',
    }}
  />
</div>

{/* Todo conteúdo do slide precisa de: position: relative; z-index: 1 */}
```

**Garantir que `Workshop3DeckLayout` tenha `position: relative; overflow: hidden`** no article raiz — já deve ter pelo padrão atual.

**Overlays por slide (substituir o gradient acima):**

| Slide | Overlay |
|---|---|
| 01 quem-somos | `linear-gradient(to right, rgba(5,5,7,0.85) 0%, rgba(5,5,7,0.55) 50%, rgba(5,5,7,0.15) 100%)` |
| 04 workos (split) | Foto à direita em `<div style={{position:'absolute', right:0, width:'55%', inset:'0 0 0 auto'}}>` + `linear-gradient(to right, rgba(5,5,7,1) 0%, rgba(5,5,7,0.6) 60%, rgba(5,5,7,0) 100%)` na borda |
| 05 orquestrador | `linear-gradient(to bottom, rgba(5,5,7,0.65) 0%, rgba(5,5,7,0.45) 40%, rgba(5,5,7,0.82) 100%)` |
| 07 clientes | `rgba(5,5,7,0.76)` uniforme (sem gradient — mantém profundidade igual) |
| 08 processo-interno | `rgba(5,5,7,0.82)` uniforme (slide com mais texto, precisa de fundo mais limpo) |
| 09 reflexao | `linear-gradient(to bottom, rgba(5,5,7,0.58) 0%, rgba(5,5,7,0.72) 100%)` — mais leve |

---

### V2.5 — Melhorias Editoriais

#### Slide 06 (números) — hierarquia mais cinemática

O número "0 → 150k" merece tratamento de _mask wipe_ do brandbook. Spec de upgrade:

```
Layout atual:  número em Fraunces grande, estático
Layout v2:     número entra com animação maskWipe (do brandbook Motion.jsx)
               "0" em bone-mute + "→" em ember + "150k" em bone
               "/mês" em bone-mute, 40% do tamanho do número principal
               Abaixo: "18 meses." em Fraunces itálico, bone-dim, 28px
```

CSS do efeito (copiar do brandbook, simplificado):
```css
@keyframes maskReveal {
  0%   { clip-path: inset(0 100% 0 0); }
  100% { clip-path: inset(0 0% 0 0); }
}
.number-reveal {
  animation: maskReveal 1.2s cubic-bezier(0.7, 0, 0.2, 1) forwards;
}
```

Aplicar ao número principal. Dispara no mount do componente (sem IntersectionObserver — é slide, não scroll).

#### Slide 07 (clientes) — lista mais editorial

```
Layout atual:  lista vertical de nomes
Layout v2:     nomes maiores (Fraunces 40–52px, weight 300)
               hairline entre cada nome, mas o nome em si mais espaçado
               padding-y 20px entre nomes (respiro)
               "Sisprime" etc. sem bullet — só o nome, peso fala por si
               "+ outros em operação" em mono bone-mute, menor (13px) — 
               diferencia de cliente confirmado vs. em andamento
               Foto H-06 de fundo dá profundidade sem competir com nomes limpos
```

#### Slide 09 (reflexão) — dois blocos com mais peso visual

```
Layout v2:     Bloco 1 (pra pessoa) e Bloco 2 (pra empresário) em cards distintos
               Não só hairline — cada bloco num container com:
               border: 1px solid rgba(255,255,255,0.08)
               background: rgba(255,255,255,0.025)
               padding: 28px 32px
               Texto de cada bloco em Fraunces itálico 22px (não Geist)
               Isso dá o peso "afirmação vivida" — diferente do restante do deck
               
               Frase final de encerramento FORA dos cards:
               Fraunces itálico, clamp(40px,5vw,68px), bone
               Margin-top 48px, sem borda, sem card — solta no espaço
               Respiração antes de fechar
```

#### Animação de entrada (sutil, não distrai)

Para todos os slides — conteúdo principal entra com `fadeUp` leve:

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.slide-content {
  animation: fadeUp 0.6s cubic-bezier(0.25, 1, 0.3, 1) forwards;
}
```

Aplicar no `<div>` filho direto do `Workshop3DeckLayout` em cada page.tsx. Duração 600ms (--gs-dur-medium), ease-glide. Não usar para header do layout (kicker, número do slide) — só para o conteúdo principal de cada slide.

---

### V2.6 — Nota sobre o Ember em Projetor

Para compensar a tendência de projetores quentes renderizarem `#FF3A0E` como marrom-laranjado:

- Em **texto grande sobre fundo escuro** (kicker mono, labels): manter `#FF3A0E`.
- Em **números grandes** (slide 06, métricas): usar `#FF5A1F` (ember-glow) — sobe um step na escala, aparece mais laranja em projetor.
- Em **bordas e hairlines ember** (decorativas): manter `rgba(255,58,14,0.X)` — transparência já suaviza o tom.
- **Não mudar a cor no brandbook** — é o projetor, não o sistema. Em tela de laptop/desktop aparece correto.

---

*Revisão v2 adicionada por Velani (UX) · 12 jun 2026*

---

## REVISÃO V2.3 — Vídeos + Imagens Cinematográficas (Material Novo)

> Adendo ao round 2 · 12 jun 2026 · Dev-alpha esperando

---

### Inventário completo do material novo

#### Vídeos (5 arquivos)

| Ref | Arquivo | Duração | Resolução | Cena | Uso |
|---|---|---|---|---|---|
| V-B | `magnific_fFZg6UfCDY.mp4` | 6.4s | 1920×1080 | Casal olhando dashboard vermelho/amber no monitor, ambiente quente | **USAR — slide números** |
| V-C | `magnific_o-foco-maior-dos-video-de_Vdl0EclMMU.mp4` | 7.7s | 1280×720 | Mulher de perfil, monitor com dados laranja-ember, luz quente lateral | **USAR — slide clientes** |
| V-D | `magnific_quero-movimento-na-tela-m_Uy8mMEtwny.mp4` | 5s | 864×496 | Homem de lado, monitor "Revenue pipeline" em amber | **RESERVA** (baixa res) |
| V-A | `magnific_create-a-video_CHZGU8pEEy.mp4` | 5s | 1440×1440 | Mulher com UI holográfica azul elétrica flutuando | **DESCARTAR** — azul, sci-fi, fora do KV |
| V-E | `magnific_quero-que-tenha-mais-movi_gJBIAD3SXO.mp4` | 5s | 992×432 | Dois devs, monitor com código, lâmpada dourada | **DESCARTAR** — res insuficiente para projetor 1080p |

#### Imagens PNG (4 arquivos)

| Ref | Arquivo | Cena | Uso |
|---|---|---|---|
| P-B | `magnific_kLdDBU416B.png` | Mulher apresentando AI workflow a grupo, ambiente dark tech neutro | **USAR — slide orquestrador** (substitui H-09) |
| P-D | `magnific_xgodoggjfW.png` | Homem apresentando AI workflow touch screen, cards amber, grupo | **USAR — slide workos** (reforço visual) |
| P-C | `magnific_ultra-realistic-portrait-_brpCPQR5Y2.png` | Mulher, monitores azuis, escritório noturno dark | **RESERVA** — tom azul aceito neste caso, fundo muito frio |
| P-A | `magnific_cinematic-editorial-photo_swtBwKWl8e.png` | Mulher escrevendo, mesa de madeira, abajur dourado, muito warm | **DESCARTAR** — **esta é a fonte do "marrom"**. Tom warm/terroso confirma o problema que João identificou. Fora do KV. |

> **P-A é a culpada do marrom.** Luz de abajur dourado + mesa de madeira + tons terra = exatamente o "warm terroso" que sai do KV. Se ela estava sendo considerada ou apareceu em algum teste visual, elimina completamente.

---

### Mapa revisado — todo o material combinado

Decisão final integrando fotos horizontais do João (V2.2) + material novo (V2.3):

| Slide | Tipo | Asset | Overlay | Racional |
|---|---|---|---|---|
| 01 quem-somos | **Foto** | `joao-rooftop-night.png` | gradient direita 85→15% | Abertura humana — João sem tech |
| 02 pergunta | **Tipográfico puro** | — | — | Silêncio visual para o reframe |
| 03 tese | **Tipográfico puro** | — | — | Tese precisa de respiro absoluto |
| 04 workos | **Imagem** | `editorial-ai-workflow-man.png` (P-D) | overlay 80% | Apresentação de sistema — metáfora precisa |
| 05 orquestrador | **Imagem** | `editorial-ai-workflow-woman.png` (P-B) | overlay 75% | Mulher conduzindo equipe em AI workflow |
| 06 números | **Vídeo** | `video-duo-dashboard.mp4` (V-B) | overlay uniforme 72% | Dois lados operando juntos + ember nas telas casa com dado emocional |
| 07 clientes | **Vídeo** | `video-woman-analytics.mp4` (V-C) | overlay uniforme 78% | Operação real em curso — ember orgânico no monitor |
| 08 processo-interno | **Foto** | `joao-dual-monitors.png` | overlay 82% | Setup duplo = operação interna com IA |
| 09 reflexão | **Foto** | `joao-cityscape-reflection.png` | overlay leve 60% | Olhar para longe, encerramento, tom frio |

**Regra de densidade mantida:** 3 tipográficos puros (02, 03, 06 mudou para vídeo — ver nota abaixo), 6 com visual de fundo.

> **Nota sobre slide 06:** v2.2 indicava tipográfico puro. Com V-B disponível (casal + dashboard ember em 1920×1080) a decisão muda: o vídeo em loop sutil de 6s **reforça** o dado emocional ao invés de competir — são dois operadores olhando os números crescendo. Overlay 72% mantém o número "0→150k" totalmente legível.

---

### Lista de assets a copiar — versão final consolidada

Comando bash único para tudo (fotos João + imagens editoriais + vídeos):

```bash
# Fotos do João
FOTO_DIR="/Users/joaoramos/Desktop/Projetos/joao-guirunas-social/docs/Arquivos Base/fotos-joao/novas/Horizontal"
DEST_FOTO="/Users/joaoramos/Desktop/Projetos/joao-guirunas-site/public/photos/joao"
mkdir -p "$DEST_FOTO"

cp "$FOTO_DIR/magnific_joaoguirunas-important-ma_2997803612.png" "$DEST_FOTO/joao-rooftop-night.png"
cp "$FOTO_DIR/magnific_joaoguirunas-important-ma_2997808515.png" "$DEST_FOTO/joao-dashboard-frontal.png"
cp "$FOTO_DIR/magnific_joaoguirunas-important-ma_2997807686.png" "$DEST_FOTO/joao-corridor-notebook.png"
cp "$FOTO_DIR/magnific_joaoguirunas-important-ma_2997804893.png" "$DEST_FOTO/joao-dual-monitors.png"
cp "$FOTO_DIR/magnific_joaoguirunas-important-ma_2997807176.png" "$DEST_FOTO/joao-cityscape-reflection.png"

# Imagens editoriais (Magnific PNG)
DEST_EDIT="/Users/joaoramos/Desktop/Projetos/joao-guirunas-site/public/photos/editorial"
mkdir -p "$DEST_EDIT"

# P-B: mulher apresentando AI workflow (slide 05 orquestrador)
cp "/Users/joaoramos/Downloads/magnific_kLdDBU416B.png" "$DEST_EDIT/editorial-ai-workflow-woman.png"

# P-D: homem apresentando AI workflow (slide 04 workos)
cp "/Users/joaoramos/Downloads/magnific_xgodoggjfW.png" "$DEST_EDIT/editorial-ai-workflow-man.png"

# Vídeos
DEST_VIDEO="/Users/joaoramos/Desktop/Projetos/joao-guirunas-site/public/video/editorial"
mkdir -p "$DEST_VIDEO"

# V-B: casal + dashboard ember 1920x1080 (slide 06 números)
cp "/Users/joaoramos/Downloads/magnific_fFZg6UfCDY.mp4" "$DEST_VIDEO/video-duo-dashboard.mp4"

# V-C: mulher analytics ember 1280x720 (slide 07 clientes)
cp "/Users/joaoramos/Downloads/magnific_o-foco-maior-dos-video-de_Vdl0EclMMU.mp4" "$DEST_VIDEO/video-woman-analytics.mp4"
```

**NÃO copiar:** P-A (`swtBwKWl8e` — warm terroso), V-A (`CHZGU8pEEy` — azul sci-fi), V-E (`gJBIAD3SXO` — res insuficiente).

---

### Padrão de implementação — vídeo como background

```tsx
// Slide com vídeo de fundo (06 e 07)
// Adicionar ANTES do conteúdo, dentro de Workshop3DeckLayout:

<video
  aria-hidden="true"
  playsInline
  muted
  loop
  autoPlay
  poster="/photos/editorial/editorial-ai-workflow-woman.png"  // ← poster = frame 0 do vídeo
  style={{
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center',
    zIndex: 0,
  }}
>
  <source src="/video/editorial/video-duo-dashboard.mp4" type="video/mp4" />
</video>

{/* Overlay sobre o vídeo */}
<div
  aria-hidden="true"
  style={{
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    background: 'rgba(5,5,7,0.72)',  // ← valor por slide, ver tabela
  }}
/>

{/* Conteúdo: z-index: 2 */}
<div style={{ position: 'relative', zIndex: 2 }}>
  {/* ... */}
</div>
```

**Mobile fallback:** o `poster` no `<video>` serve como fallback se o vídeo não carregar. Em conexões lentas, o browser exibe o poster automaticamente. Não precisa de lógica adicional.

**Nota sobre V-C (1280×720):** resolução abaixo do ideal para projetor 1080p, mas como background com overlay 78%, o upscale do browser é aceitável. Se o dev-alpha tiver concern visual ao testar, substituir por joao-corridor-notebook.png no slide 07.

---

### Overlays finais por slide (tabela de referência para dev)

| Slide | Asset | Overlay CSS |
|---|---|---|
| 01 | `joao-rooftop-night.png` | `linear-gradient(to right, rgba(5,5,7,0.88) 0%, rgba(5,5,7,0.6) 45%, rgba(5,5,7,0.18) 100%)` |
| 04 | `editorial-ai-workflow-man.png` | `rgba(5,5,7,0.80)` uniforme |
| 05 | `editorial-ai-workflow-woman.png` | `rgba(5,5,7,0.75)` uniforme |
| 06 | `video-duo-dashboard.mp4` | `rgba(5,5,7,0.72)` uniforme |
| 07 | `video-woman-analytics.mp4` | `rgba(5,5,7,0.78)` uniforme |
| 08 | `joao-dual-monitors.png` | `rgba(5,5,7,0.82)` uniforme |
| 09 | `joao-cityscape-reflection.png` | `linear-gradient(to bottom, rgba(5,5,7,0.58) 0%, rgba(5,5,7,0.72) 100%)` |

> **Regra geral:** overlay uniforme quando o slide tem muito conteúdo (cards, listas). Gradient direcional quando o slide tem pouco conteúdo e a foto pode respirar mais (abertura, encerramento).

---

### Sobre o "marrom" — diagnóstico final

**P-A (`swtBwKWl8e`) é a origem.** Imagem com mesa de madeira + abajur dourado + luz warm confirma visualmente o tom terroso que João identificou. Descartada.

Se o "marrom" persistir após as fotos novas, a segunda causa possível é o **poster frame** de algum vídeo renderizando brevemente antes do autoplay. Garantir que todos os posters usem frames com overlay já aplicado, ou usar um frame escuro do vídeo como poster.

O código em si continua limpo — `#FF3A0E` é o único acento cromático.

---

*Revisão v2.3 adicionada por Velani (UX) · 12 jun 2026*

---

## REVISÃO V2.4 — Slide 06 (números) → Gráfico de linha

> Instrução João · 12 jun 2026

---

### Decisão de biblioteca

Recharts `^3.8.1` **já está no projeto** (`package.json`). Usar `<LineChart>` do Recharts. Zero instalação nova.

---

### Dados do gráfico

```typescript
// Dois arrays separados para controlar linha sólida vs tracejada
// O ponto Jun/26 aparece em ambos para conectar sem gap

const PAST_DATA = [
  { month: 'Jan/25', value: 0 },
  { month: 'Mar/25', value: 8000 },
  { month: 'Jun/25', value: 28000 },
  { month: 'Set/25', value: 62000 },
  { month: 'Dez/25', value: 98000 },
  { month: 'Mar/26', value: 130000 },
  { month: 'Jun/26', value: 150000 },  // ← marco "hoje"
];

const PROJ_DATA = [
  { month: 'Jun/26', value: 150000 },  // ← conecta com PAST
  { month: 'Set/26', value: 280000 },
  { month: 'Dez/26', value: 500000 },  // ← marco "projeção"
  { month: 'Jun/27', value: 700000 },
  { month: 'Dez/27', value: 900000 },  // ← marco "meta 2027 = R$6M/ano"
];
```

> Os valores intermediários são estimativas editoriais para dar forma à curva — apenas os três marcos são exibidos com label. João ajusta se preferir outra forma de curva.

---

### Spec visual Recharts

```tsx
'use client';  // necessário — Recharts é client-only

import {
  ResponsiveContainer, LineChart, Line,
  XAxis, CartesianGrid, ReferenceDot, Label,
} from 'recharts';

const MONO  = "'Geist Mono', 'Roboto Mono', monospace";
const EMBER = '#FF3A0E';
const VOID  = '#050507';
const BONE  = '#f1f1f3';

// Dois LineChart sobrepostos via composição não é possível em Recharts.
// Solução: um único <LineChart> com dados merged + dois <Line> com dataKey diferente.

const ALL_DATA = [
  { month: 'Jan/25', past: 0 },
  { month: 'Mar/25', past: 8000 },
  { month: 'Jun/25', past: 28000 },
  { month: 'Set/25', past: 62000 },
  { month: 'Dez/25', past: 98000 },
  { month: 'Mar/26', past: 130000 },
  { month: 'Jun/26', past: 150000, proj: 150000 },  // ponto de inflexão
  { month: 'Set/26', proj: 280000 },
  { month: 'Dez/26', proj: 500000 },
  { month: 'Jun/27', proj: 700000 },
  { month: 'Dez/27', proj: 900000 },
];

<ResponsiveContainer width="100%" height={320}>
  <LineChart data={ALL_DATA} margin={{ top: 36, right: 56, bottom: 8, left: 0 }}>

    <CartesianGrid
      strokeDasharray="1 8"
      stroke="rgba(255,255,255,0.05)"
      vertical={false}
    />

    <XAxis
      dataKey="month"
      tick={{ fill: 'rgba(255,255,255,0.28)', fontSize: 10, fontFamily: MONO }}
      axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
      tickLine={false}
      interval={1}
    />

    {/* Linha passado — sólida, ember pleno */}
    <Line
      dataKey="past"
      stroke={EMBER}
      strokeWidth={2.5}
      dot={false}
      activeDot={false}
      connectNulls={false}
      isAnimationActive
      animationDuration={1400}
      animationEasing="ease-out"
    />

    {/* Linha projeção — tracejada, ember 55% */}
    <Line
      dataKey="proj"
      stroke={EMBER}
      strokeWidth={2}
      strokeDasharray="6 5"
      strokeOpacity={0.55}
      dot={false}
      activeDot={false}
      connectNulls={false}
      isAnimationActive
      animationDuration={1600}
      animationBegin={1200}
      animationEasing="ease-out"
    />

    {/* Marco 1 — hoje */}
    <ReferenceDot x="Jun/26" y={150000} r={5} fill={EMBER} stroke={VOID} strokeWidth={2}>
      <Label value="150k · hoje" position="top" fill={BONE} fontSize={11} fontFamily={MONO} dy={-10} />
    </ReferenceDot>

    {/* Marco 2 — projeção (opacidade reduzida = incerteza) */}
    <ReferenceDot x="Dez/26" y={500000} r={4} fill={EMBER} stroke={VOID} strokeWidth={2} fillOpacity={0.6}>
      <Label value="500k · dez/2026" position="top" fill="rgba(241,241,243,0.6)" fontSize={11} fontFamily={MONO} dy={-10} />
    </ReferenceDot>

    {/* Marco 3 — meta (mais translúcido) */}
    <ReferenceDot x="Dez/27" y={900000} r={4} fill={EMBER} stroke={VOID} strokeWidth={2} fillOpacity={0.4}>
      <Label value="R$ 6M · meta 2027" position="top" fill="rgba(241,241,243,0.4)" fontSize={11} fontFamily={MONO} dy={-10} />
    </ReferenceDot>

  </LineChart>
</ResponsiveContainer>
```

---

### Animação de entrada encadeada

A sequência cria o efeito "drawing line on mount" usando apenas as props nativas do Recharts:

1. Linha passado: `animationDuration=1400ms` — desenha a história de Jan/25 a Jun/26
2. Linha projeção: `animationBegin=1200` + `animationDuration=1600ms` — começa antes da linha passado terminar (overlap sutil), projeta o futuro

Não é necessário CSS extra.

---

### Layout completo do slide 06 revisado

```
[TRAÇÃO · 18 MESES]                           [06/09]

0 → 150k/mês em 18 meses.

  R$ 6M ·····················●  ← meta 2027 (40% opacity)
 500k            ·····●          ← dez/2026 (60% opacity)
 150k      ──────●               ← hoje (100% — ember pleno)
     ──────
────
Jan/25  Jun/25  Dez/25  Jun/26  Dez/26  Jun/27  Dez/27

[hairline]
"Não foi sorte — foi dor real."
```

**Hierarquia do slide:**
1. Kicker mono ember: `TRAÇÃO · 18 MESES`
2. H1 Fraunces: "0 → 150k/mês / em 18 meses." — âncora emocional acima do gráfico
3. Gráfico `height: 320` desktop / `height: 220` mobile (`sm:h-[320px] h-[220px]`)
4. Rodapé: Fraunces itálico bone-dim

**Vídeo V-B de fundo permanece** — overlay `rgba(5,5,7,0.72)` garante legibilidade da linha ember sobre o vídeo.

---

### Princípio estabelecido — dados quantitativos no deck

> Série temporal ou dado com evolução = **gráfico de linha**, linha ember sólida (passado) + tracejada (projeção). Número pontual isolado (ex: "4 clientes") pode ser tipográfico.

---

### Implementação preferida — SVG inline puro (sem dependência)

> O team-lead especificou SVG sem biblioteca. Esta seção sobrepõe o Recharts acima. Dev-alpha escolhe qual implementar — SVG é preferido.

**Princípio da animação draw-line:** `stroke-dasharray` igual ao comprimento total do path + `stroke-dashoffset` igual ao mesmo valor. Transição CSS zera o offset, revelando a linha. Mesma família do `mask-wipe` do brandbook.

```tsx
'use client';
import { useEffect, useRef, useState } from 'react';

// Dados normalizados para SVG viewBox 0 0 800 300
// X: jan/2025(0) → dez/2027(800)   Y: 0(300) → 900k(20) — invertido (SVG y cresce p/ baixo)
const W = 800;
const H = 300;
const PAD = { top: 40, right: 60, bottom: 40, left: 16 };

// Pontos de dados [x_pct, value_R$]
// x_pct: 0..1 mapeado para jan/2025..dez/2027 (36 meses)
const MONTHS_TOTAL = 36; // jan/2025 → dez/2027
function mx(month_offset: number) {
  return PAD.left + (month_offset / MONTHS_TOTAL) * (W - PAD.left - PAD.right);
}
function my(value: number, maxVal = 1000000) {
  return PAD.top + (1 - value / maxVal) * (H - PAD.top - PAD.bottom);
}

const PAST_POINTS = [
  { mo: 0,  v: 0 },       // jan/2025
  { mo: 2,  v: 8000 },    // mar/2025
  { mo: 5,  v: 28000 },   // jun/2025
  { mo: 8,  v: 62000 },   // set/2025
  { mo: 11, v: 98000 },   // dez/2025
  { mo: 14, v: 130000 },  // mar/2026
  { mo: 17, v: 150000 },  // jun/2026 ← hoje
];

const PROJ_POINTS = [
  { mo: 17, v: 150000 },  // jun/2026 ← conecta
  { mo: 20, v: 280000 },  // set/2026
  { mo: 23, v: 500000 },  // dez/2026 ← marco
  { mo: 29, v: 700000 },  // jun/2027
  { mo: 35, v: 900000 },  // dez/2027 ← ~R$6M/ano meta
];

const MILESTONES = [
  { mo: 17, v: 150000, label: '150k · hoje',      anchor: 'start'  },
  { mo: 23, v: 500000, label: '500k · dez/2026',  anchor: 'middle' },
  { mo: 35, v: 900000, label: 'R$ 6M · 2027',     anchor: 'end'    },
];

function toPath(pts: {mo:number,v:number}[]) {
  return pts.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${mx(p.mo).toFixed(1)} ${my(p.v).toFixed(1)}`
  ).join(' ');
}

export function GrowthLineChart() {
  const pastRef = useRef<SVGPathElement>(null);
  const projRef = useRef<SVGPathElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Um frame de delay garante que o browser calculou getPathLength()
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const pastD = toPath(PAST_POINTS);
  const projD = toPath(PROJ_POINTS);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: 'block', overflow: 'visible' }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
        .line-past {
          stroke-dasharray: 2000;
          stroke-dashoffset: ${ready ? '0' : '2000'};
          transition: stroke-dashoffset 1.4s cubic-bezier(0.25, 1, 0.3, 1);
        }
        .line-proj {
          stroke-dasharray: 2000;
          stroke-dashoffset: ${ready ? '0' : '2000'};
          transition: stroke-dashoffset 1.6s cubic-bezier(0.25, 1, 0.3, 1) 1.1s;
        }
      `}</style>

      {/* Grid horizontal sutil — 4 linhas */}
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={PAD.left} x2={W - PAD.right}
          y1={my(t * 1000000)} y2={my(t * 1000000)}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={1}
          strokeDasharray="2 8"
        />
      ))}

      {/* Linha separadora real/projeção (vertical em jun/2026) */}
      <line
        x1={mx(17)} x2={mx(17)}
        y1={PAD.top} y2={H - PAD.bottom}
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={1}
        strokeDasharray="3 5"
      />

      {/* Curva passado — sólida, ember-glow */}
      <path
        ref={pastRef}
        d={pastD}
        fill="none"
        stroke="#FF5A1F"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="line-past"
      />

      {/* Curva projeção — tracejada, ember 55% */}
      <path
        ref={projRef}
        d={projD}
        fill="none"
        stroke="#FF5A1F"
        strokeWidth={2.5}
        strokeOpacity={0.55}
        strokeDasharray="8 5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="line-proj"
      />

      {/* Marcos */}
      {MILESTONES.map((m, i) => {
        const x = mx(m.mo);
        const y = my(m.v);
        const opacity = i === 0 ? 1 : i === 1 ? 0.65 : 0.42;
        return (
          <g key={m.label} opacity={opacity}>
            <circle cx={x} cy={y} r={5} fill="#FF5A1F" stroke="#050507" strokeWidth={2} />
            <text
              x={x}
              y={y - 14}
              textAnchor={m.anchor}
              fill="#f1f1f3"
              fontSize={11}
              fontFamily="'Geist Mono', monospace"
              letterSpacing="0.08em"
            >
              {m.label}
            </text>
          </g>
        );
      })}

      {/* Labels eixo X — seletivos */}
      {[
        { mo: 0,  label: 'Jan/25' },
        { mo: 11, label: 'Dez/25' },
        { mo: 17, label: 'Jun/26' },
        { mo: 23, label: 'Dez/26' },
        { mo: 35, label: '2027' },
      ].map(({ mo, label }) => (
        <text
          key={label}
          x={mx(mo)}
          y={H - 8}
          textAnchor="middle"
          fill="rgba(255,255,255,0.28)"
          fontSize={10}
          fontFamily="'Geist Mono', monospace"
          letterSpacing="0.06em"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}
```

**Legenda curta** (abaixo ou acima do SVG, HTML puro):

```tsx
<div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 16 }}>
  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <svg width={28} height={4}><line x1={0} y1={2} x2={28} y2={2} stroke="#FF5A1F" strokeWidth={3}/></svg>
    <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Real</span>
  </span>
  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <svg width={28} height={4}><line x1={0} y1={2} x2={28} y2={2} stroke="#FF5A1F" strokeWidth={2} strokeDasharray="5 3" strokeOpacity={0.55}/></svg>
    <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>Projeção · Meta 2027</span>
  </span>
</div>
```

**Nota sobre `stroke-dashoffset` em paths com `strokeDasharray` duplo (tracejado):**
A linha de projeção usa `strokeDasharray="8 5"` para o tracejado E `stroke-dashoffset` para a animação de entrada. O browser aplica o dasharray sobre o comprimento total — a animação revela os traços em sequência, criando o efeito de "desenho que avança". Funciona corretamente porque a transição CSS opera no `dashoffset` da path inteira, não nos traços individuais.

---

*Revisão v2.4 complementada (SVG puro) por Velani (UX) · 12 jun 2026*

---

## REVISÃO V2.6 — Slide 01 redesign (logo + fundadores)

> Instrução João · 12 jun 2026

---

### Decisão editorial — bio curta vs expandida

**Usar apenas bio curta.** Slide de apresentação ao vivo dura 2 minutos. Bio expandida compete com a fala do João — a plateia leria em vez de ouvir. Bio curta âncora a credibilidade; a fala expande.

Bio expandida: reservar para material impresso, site, ou versão estática do deck para leitura posterior.

---

### Decisão de layout

Três candidatos avaliados:

**A — Logo hero topo + grid 2 colunas abaixo** (foto 3:4 + nome + cargo + bio)
**B — Split vertical: logo + tagline à esquerda, dois perfis empilhados à direita**
**C — Layout editorial em linha: logo no topo, depois linha horizontal com foto-nome-bio de cada fundador**

**Escolha: Layout A com ajuste.** Logo ocupa a faixa superior como elemento de identidade (não hero de produto), seguido de dois perfis lado a lado. Racional: João está apresentando a empresa, não a si mesmo — o logo entra primeiro como marca, depois os fundadores como rosto da marca. Hierarquia correta para um evento B2B.

---

### Wireframe textual

```
┌───────────────────────────────────────────────────────────────┐
│ [GROWTH SALES.AI · APRESENTAÇÃO]               [01/09]        │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  [<GrowthLogo size="hero" /> — lockup HORIZONTAL]             │
│  símbolo à esquerda + wordmark à direita, alinhados ao centro │
│                                                               │
│  [hairline full · --gs-hairline]                              │
│                                                               │
│  ┌──────────────────────┐  ┌──────────────────────┐           │
│  │  [foto João          │  │  [foto Claudia        │           │
│  │   proporção 3:4      │  │   proporção 3:4       │           │
│  │   max-height: 220px] │  │   max-height: 220px]  │           │
│  │                      │  │                       │           │
│  │  João Guirunas       │  │  Claudia Guirunas     │           │
│  │  CEO · Co-Founder    │  │  Co-CEO · Co-Founder  │           │
│  │                      │  │                       │           │
│  │  "Lidera a frente    │  │  "Transforma dados,   │           │
│  │  de estratégia..."   │  │  comportamento..."    │           │
│  └──────────────────────┘  └──────────────────────┘           │
│                                                               │
│  [hairline full]                                              │
│  18 meses. 2 produtos no mercado.                             │
│                                                               │
├───────────────────────────────────────────────────────────────┤
│  ← índice          [● ○ ○ ○ ○ ○ ○ ○ ○]          Próximo →   │
└───────────────────────────────────────────────────────────────┘
```

**Decisão de lockup — horizontal vs vertical:**

Horizontal (símbolo à esquerda + wordmark à direita) é a escolha correta para este slide. Razão: os dois perfis de fundadores abaixo já criam uma divisão vertical implícita (coluna João / coluna Claudia). Um lockup vertical no topo adicionaria um terceiro eixo vertical que conflita com essa grade — o resultado seria três elementos "em pé" competindo pelo mesmo eixo. O lockup horizontal ocupa a faixa superior como banner de identidade e entrega ritmo horizontal que ancora a grid abaixo. Em slides wide (16:9), horizontal sempre vence sobre o eixo visual dominante.

---

### Tipografia por elemento

| Elemento | Font | Size | Weight | Cor |
|---|---|---|---|---|
| Kicker | Geist Mono | 10px, tracking 0.22em, uppercase | 500 | `#FF3A0E` |
| Logo lockup | `<GrowthLogo size="hero" />` horizontal | wordmark ~36px | ver componente | bone + ember |
| Hairline separador | — | 1px | — | `rgba(255,255,255,0.07)` |
| Nome fundador | Fraunces | clamp(22px, 2.8vw, 32px) | 400 | `#f1f1f3` |
| Cargo | Geist Mono | 10px, tracking 0.18em, uppercase | 500 | `#FF3A0E` |
| Bio curta | Geist | 14px | 300 | `#c5c5ca` (bone-dim) |
| Tagline rodapé | Fraunces italic | 18px | 300 | `rgba(241,241,243,0.5)` |

---

### Spec das fotos

**Proporção:** 3:4 (retrato vertical) — garante que o rosto fique visível e o enquadramento seja editorial, não corporativo.

**Tamanho:** `max-height: 220px` em desktop, `max-height: 160px` em mobile. Não fullscreen — foto serve o perfil, não domina o slide.

**Tratamento:**
- `object-fit: cover`, `object-position: center top` — mantém o rosto visível
- Sem filtro, sem blur, sem overlay — fotos de pessoas pedem clareza
- `border: 1px solid rgba(255,255,255,0.08)` — hairline sutil demarca o frame sem moldura corporate
- `aspect-ratio: 3/4` fixado no CSS — imagem preenche sem distorcer

**Placeholder enquanto fotos não chegam:**
```tsx
// Substituir <img> por este bloco até ter as fotos reais
<div
  style={{
    aspectRatio: '3/4',
    maxHeight: 220,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <span style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.14em' }}>
    FOTO · {name.toUpperCase()}
  </span>
</div>
```

**Quando as fotos chegarem:** copiar para `public/photos/joao/joao-profile.jpg` e `public/photos/claudia/claudia-profile.jpg`. Dev encaixa trocando o placeholder pelo `<img>`.

---

### Copy aprovada — referência para o dev

```typescript
const FOUNDERS = [
  {
    name: 'João Guirunas',
    role: 'CEO · Co-Founder',
    photo: '/photos/joao/joao-profile.jpg',    // placeholder até chegar
    bio: 'Lidera a frente de estratégia e inovação na Growth Sales, transformando inteligência artificial em eficiência real e evolução dos negócios.',
  },
  {
    name: 'Claudia Guirunas',
    role: 'Co-CEO · Co-Founder',
    photo: '/photos/claudia/claudia-profile.jpg',  // placeholder até chegar
    bio: 'Transforma dados, comportamento e experiência em sistemas inteligentes que geram clareza, fluidez e resultados reais.',
  },
];

const SLIDE_TAGLINE = '18 meses. 2 produtos no mercado.';
```

---

### Foto de fundo do slide 01

**Mantém a decisão da V2.2:** `joao-rooftop-night.png` como background fullscreen com gradient direita.

Com o redesign de fundadores, o overlay precisa ser um pouco mais denso para não brigar com as fotos de perfil — ajustar de `rgba(5,5,7,0.88→0.15)` para `rgba(5,5,7,0.92→0.30)`:

```css
background: linear-gradient(to right, rgba(5,5,7,0.92) 0%, rgba(5,5,7,0.75) 50%, rgba(5,5,7,0.30) 100%);
```

Isso preserva a atmosfera do rooftop à direita enquanto garante que os cards dos fundadores (com suas próprias fotos) fiquem legíveis sobre a esquerda mais escura.

---

### Mobile (320–768px)

Grid 2 colunas colapsa para coluna única. Ordem: João primeiro, Claudia abaixo. Logo permanece no topo. Fotos reduzem para `max-height: 140px`. Bio em 13px.

---

*Revisão v2.6 adicionada por Velani (UX) · 12 jun 2026*

---

## REVISÃO V2.4 — Slide 06: Gráfico de linha (anula vídeo V-B e cards isolados)

*Velani (UX) · 12 jun 2026*

**Princípio:** dado temporal = gráfico de linha. Vídeo V-B descartado do slide 06. Cards de números isolados anulados. O slide 06 entrega uma série histórica + projeção — o formato correto é linha, não número estático.

---

### Dados do gráfico

| Marco | Data | Valor mensal (R$) | Tipo |
|---|---|---|---|
| Início | jan/2025 | 0 | Histórico |
| Presente | jun/2026 | 150.000 | Histórico |
| Projeção curto | dez/2026 | 500.000 | Projetado |
| Meta anual | 2027 | ~500k/mês = R$6M/ano | Projetado |

**Eixo X:** jan/2025 → jun/2026 (sólido) → dez/2026 → dez/2027 (tracejado)
**Eixo Y:** faturamento mensal em R$ — labels abreviados (0 / 150k / 500k / 1M)

---

### Visual e estilo

- **Stroke sólido** (histórico): `#FF5A1F`, 3.5px, `stroke-linecap: round`
- **Stroke dashed** (projeção): `#FF5A1F`, 3px, `stroke-dasharray: 8 5`, opacidade 55%
- **Background:** `--gs-void` (`#050507`) — tipográfico puro, sem foto
- **Grid hairline:** linhas horizontais `rgba(241,241,243,0.06)`, espaçamento proporcional
- **Eixos:** sem borda rígida — apenas labels em Geist Mono 10px, `rgba(241,241,243,0.35)`
- **Pontos-marco:** círculo preenchido `#FF5A1F`, r=5, borda `rgba(255,255,255,0.15)` 1px

**Labels dos marcos** (flutuam acima do ponto):
- Número grande: Fraunces 300 italic, 20px, `#f1f1f3`
- Contexto: Geist Mono 10px uppercase tracking 0.14em, `rgba(241,241,243,0.45)`
- Exemplo: `R$ 150k` grande + `jun/2026 · hoje` pequeno abaixo

**Legenda curta** (canto inferior direito):
```
— Real   - - Projeção
```
Geist Mono 9px, `rgba(241,241,243,0.4)`

---

### Animação draw-line (mount)

```tsx
// Técnica: stroke-dashoffset transition
// 1. Calcular comprimento do path com pathEl.getTotalLength()
// 2. Setar strokeDasharray = strokeDashoffset = totalLength
// 3. Transição CSS: strokeDashoffset de totalLength → 0

// Histórico (sólido): duration 1.4s, ease-out, delay 0.2s
// Projeção (dashed): duration 1.0s, ease-out, delay 1.7s (começa após histórico terminar)
// Pontos-marco: escala 0→1 com transition delay escalonado (0.8s, 1.8s, 2.4s)
```

---

### Estrutura SVG

```tsx
// Dimensões: viewBox="0 0 720 320" — 16:9 proporcional
// Margens internas: mx(valor) e my(valor) — funções de mapeamento de domínio para pixels

// Funções de mapeamento de domínio
// X: jan/2025 (timestamp) → dez/2027 → px [60, 660]
// Y: 0 → 900000 → px [280, 40]  (invertido — Y cresce pra cima)

const X_DOMAIN = [new Date('2025-01-01'), new Date('2027-12-01')];
const Y_DOMAIN = [0, 900_000];
const X_RANGE  = [60, 660];
const Y_RANGE  = [280, 40];

function mx(date: Date) {
  const t = (date.getTime() - X_DOMAIN[0].getTime()) / (X_DOMAIN[1].getTime() - X_DOMAIN[0].getTime());
  return X_RANGE[0] + t * (X_RANGE[1] - X_RANGE[0]);
}
function my(value: number) {
  const t = (value - Y_DOMAIN[0]) / (Y_DOMAIN[1] - Y_DOMAIN[0]);
  return Y_RANGE[0] + t * (Y_RANGE[1] - Y_RANGE[0]);
}

// Pontos históricos (sólido)
const PAST = [
  { date: new Date('2025-01-01'), value: 0 },
  { date: new Date('2025-06-01'), value: 20_000 },
  { date: new Date('2025-10-01'), value: 55_000 },
  { date: new Date('2026-02-01'), value: 90_000 },
  { date: new Date('2026-06-01'), value: 150_000 },
];

// Pontos projetados (dashed) — começa exatamente onde histórico termina
const PROJ = [
  { date: new Date('2026-06-01'), value: 150_000 },  // continuidade visual
  { date: new Date('2026-12-01'), value: 500_000 },
  { date: new Date('2027-06-01'), value: 720_000 },
  { date: new Date('2027-12-01'), value: 900_000 },
];

// Path builder
function toPath(pts: {date:Date,value:number}[]) {
  return pts.map((p,i) => `${i===0?'M':'L'} ${mx(p.date)} ${my(p.value)}`).join(' ');
}

// Marcos com label — só os 3 principais
const MILESTONES = [
  { date: new Date('2025-01-01'), value: 0,       label: 'R$ 0',    ctx: 'jan/2025 · início' },
  { date: new Date('2026-06-01'), value: 150_000,  label: 'R$ 150k', ctx: 'jun/2026 · hoje'   },
  { date: new Date('2026-12-01'), value: 500_000,  label: 'R$ 500k', ctx: 'dez/2026 · meta'   },
];
```

---

### Kicker e headline do slide

```
GROWTH SALES.AI · JUN 2026 — DEZ 2027
```
Geist Mono 10px uppercase tracking 0.22em, `#FF3A0E`

```
Faturamento em crescimento
```
Fraunces 300 italic, clamp(28px, 4vw, 48px), `#f1f1f3`

Subtítulo abaixo do headline:
```
Série histórica + projeção conservadora
```
Geist 300, 14px, `rgba(241,241,243,0.5)`

---

### Nota de implementação

Background `--gs-void` puro — este slide não leva foto nem vídeo. A linha é o elemento visual principal. Qualquer textura competiria com a leitura do dado. Princípio editorial: **dado vira protagonista, tipografia ancora, fundo desaparece**.

---

## REVISÃO V2.6 — Slide 01: Quem Somos (redesign fundadores completo)

*Velani (UX) · 12 jun 2026*

**Nota:** Esta seção substitui e expande o wireframe anterior (que ainda referenciava `logo-header.png`). O componente correto é `<GrowthLogo size="hero" />` — símbolo SVG novo + wordmark tipográfico Geist+Fraunces, sem PNG.

---

### Decisão de layout

**Layout A — Logo hero topo + grid 2 colunas abaixo** (eleito).

Racional: João está apresentando a empresa, não a si mesmo. Logo entra primeiro como marca (identidade institucional), fundadores entram como rosto da marca. Hierarquia correta para B2B. Layout B (split) criaria ambiguidade sobre se é "apresentação de produto" ou "apresentação de pessoas". Layout C (linha editorial) seria denso demais para um slide de abertura.

**Lockup horizontal** (símbolo à esquerda + wordmark à direita): dois perfis abaixo criam eixo vertical implícito (coluna João / coluna Claudia). Lockup vertical no topo adicionaria terceiro eixo em conflito. Horizontal ancora a grid, respeita o formato wide 16:9.

---

### Wireframe textual

```
┌───────────────────────────────────────────────────────────────┐
│ [GROWTH SALES.AI · APRESENTAÇÃO]               [01/09]        │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  [<GrowthLogo size="hero" /> — lockup HORIZONTAL]             │
│  símbolo à esquerda + wordmark à direita, alinhados ao centro │
│                                                               │
│  [hairline full · --gs-hairline]                              │
│                                                               │
│  ┌──────────────────────┐  ┌──────────────────────┐           │
│  │  [foto João          │  │  [placeholder Claudia │           │
│  │   portrait-realistic │  │   proporção 3:4       │           │
│  │   .png · 3:4         │  │   max-height: 220px]  │           │
│  │   max-height: 220px] │  │                       │           │
│  │                      │  │                       │           │
│  │  João Guirunas       │  │  Claudia Guirunas     │           │
│  │  CEO · Co-Founder    │  │  Co-CEO · Co-Founder  │           │
│  │                      │  │                       │           │
│  │  bio curta visível   │  │  bio curta visível    │           │
│  └──────────────────────┘  └──────────────────────┘           │
│                                                               │
│  [hairline full]                                              │
│  18 meses. 2 produtos no mercado.                             │
│                                                               │
├───────────────────────────────────────────────────────────────┤
│  ← índice          [● ○ ○ ○ ○ ○ ○ ○ ○]          Próximo →   │
└───────────────────────────────────────────────────────────────┘
```

---

### Decisão: bio curta visível direto (não hover)

Bio expandida descartada do slide — deck de apresentação ao vivo não suporta interação de hover em projetor. Bio curta fica visível diretamente abaixo do cargo. Expandida vai para material de apoio impresso ou PDF.

**Justificativa UX:** audiência lê o slide em 3–5 segundos enquanto João fala. Bio curta de 1–2 linhas é tudo que cabe cognitivamente. Hover em projetor é zero descobribilidade.

---

### Fotos

**João:** `public/photos/joao/portrait-realistic.png` — candidato confirmado. É retrato vertical, enquadramento editorial, fundo neutro. Aplicar `object-fit: cover`, `object-position: center top`.

**Claudia:** sem foto disponível. Usar placeholder até João enviar fotos oficiais. Placeholder usa `aspectRatio: '3/4'`, fundo `rgba(255,255,255,0.04)`, borda hairline, texto "FOTO · CLAUDIA" em Geist Mono 10px uppercase `rgba(255,255,255,0.2)`.

**Quando fotos chegarem:** copiar para `public/photos/claudia/claudia-profile.jpg`. Dev troca placeholder por `<img>`.

---

### Tipografia por elemento

| Elemento | Font | Size | Weight | Cor |
|---|---|---|---|---|
| Kicker | Geist Mono | 10px, tracking 0.22em, uppercase | 500 | `#FF3A0E` |
| Logo lockup | `<GrowthLogo size="hero" />` horizontal | wordmark ~36px | ver V2.7 | bone + ember |
| Hairline separador | — | 1px | — | `rgba(255,255,255,0.07)` |
| Nome fundador | Fraunces | clamp(22px, 2.8vw, 32px) | 400 | `#f1f1f3` |
| Cargo | Geist Mono | 10px, tracking 0.18em, uppercase | 500 | `#FF3A0E` |
| Bio curta | Geist | 14px | 300 | `#c5c5ca` (bone-dim) |
| Tagline rodapé | Fraunces italic | 18px | 300 | `rgba(241,241,243,0.5)` |

---

### Copy aprovada — referência para o dev

```typescript
const FOUNDERS = [
  {
    name: 'João Guirunas',
    role: 'CEO · Co-Founder',
    photo: '/photos/joao/portrait-realistic.png',
    photoCrop: 'center top',
    bio: 'Lidera a frente de estratégia e inovação na Growth Sales, transformando inteligência artificial em eficiência real e evolução dos negócios.',
    bioExpanded: 'Trajetória une experiência em crescimento e liderança a formação sólida em negócio e tecnologia. Publicitário pela FACHA, Web Developer pelo INFNET, MBAs em Gestão Empresarial, Inteligência Competitiva, Data Science & Big Data, Inteligência Artificial e Neurociência.',
  },
  {
    name: 'Claudia Guirunas',
    role: 'Co-CEO · Co-Founder',
    photo: null,  // placeholder até foto oficial chegar
    photoCrop: 'center top',
    bio: 'Transforma dados, comportamento e experiência em sistemas inteligentes que geram clareza, fluidez e resultados reais.',
    bioExpanded: 'Trajetória que une estratégia corporativa e gestão ao estudo do comportamento humano. Atua na interseção entre experiência do cliente, cultura organizacional e IA aplicada a processos — tornando operações mais leves e experiências mais consistentes.',
  },
];

const SLIDE_TAGLINE = '18 meses. 2 produtos no mercado.';
```

---

### Foto de fundo do slide 01

`joao-rooftop-night.png` como background fullscreen. Com os cards de fundadores sobrepostos, overlay mais denso à esquerda:

```css
background: linear-gradient(to right, rgba(5,5,7,0.92) 0%, rgba(5,5,7,0.75) 50%, rgba(5,5,7,0.30) 100%);
```

---

### Mobile (320–768px)

Grid 2 colunas colapsa para coluna única. Ordem: João primeiro, Claudia abaixo. Logo permanece no topo. Fotos reduzem para `max-height: 140px`. Bio em 13px.

---

## REVISÃO V2.7 — GrowthLogo wordmark spec (componente)

*Velani (UX) · 12 jun 2026*

**Contexto:** Dev-alpha está implementando `<GrowthLogo size="hero|lg|md|sm" />`. Esta spec define as proporções exatas, pesos tipográficos, cores e o lockup horizontal. Baseada no `Logo.jsx` do brandbook (`growthsales` Geist 300 + `.ai` Fraunces italic ember).

---

### Wordmark tipográfico

| Parte | Font | Weight | Letter-spacing | Cor |
|---|---|---|---|---|
| `growthsales` | Geist | 300 | `-0.035em` | `#f1f1f3` (bone) |
| `.ai` | Fraunces italic | 300 | `-0.04em` | `#FF3A0E` (ember) |

**Rationale do kerning negativo:** Geist 300 em tamanhos grandes abre demais o espaço entre caracteres. `-0.035em` fecha o ritmo óptico sem apertar. Fraunces italic no `.ai` tem serifas que naturalmente criam mais tensão — `-0.04em` compensa.

**Cor bone:** usar `#f1f1f3` (bone principal do brandbook), não `white` puro. Em fundo void (`#050507`), branco puro (255,255,255) vibra demais — bone mantém o tom quente/editorial da marca.

---

### Símbolo SVG

Arquivo: `public/brand/growth/symbol-official.svg` (já copiado). É o diamante com gradiente ember (`#FF4400` → `#FF1A00`). Não alterar cores, não aplicar filtros.

**Tamanho do símbolo:** segue altura do wordmark. Em `size="hero"` o símbolo tem ~40px de altura; wordmark tem ~36px — símbolo ligeiramente maior para ancoragem visual.

---

### Lockup horizontal — proporções

```
[símbolo] [gap] [wordmark]
```

- **Gap** entre símbolo e wordmark: `símbolo_width × 0.4`
- **Alinhamento vertical:** centro a centro (não baseline do texto — o símbolo é geométrico, não textual)
- **Lockup não quebra linha** em nenhum tamanho — é um elemento inline-flex, não wrappable

---

### Tamanhos

| Size | Símbolo altura | Wordmark font-size | Uso |
|---|---|---|---|
| `hero` | 40px | 36px | Slide 01 topo, hero de landing page |
| `lg` | 28px | 24px | Slide 09 rodapé, header de seção |
| `md` | 20px | 18px | Nav, card header, kicker de slide |
| `sm` | 14px | 13px | Footer, watermark, crédito |

---

### Implementação TSX (referência)

```tsx
const SIZES = {
  hero: { symbol: 40, wordmark: 36 },
  lg:   { symbol: 28, wordmark: 24 },
  md:   { symbol: 20, wordmark: 18 },
  sm:   { symbol: 14, wordmark: 13 },
} as const;

type GrowthLogoSize = keyof typeof SIZES;

export function GrowthLogo({ size = 'md' }: { size?: GrowthLogoSize }) {
  const { symbol, wordmark } = SIZES[size];
  const gap = symbol * 0.4;

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap, flexShrink: 0 }}>
      <img
        src="/brand/growth/symbol-official.svg"
        alt=""
        aria-hidden="true"
        style={{ height: symbol, width: 'auto' }}
      />
      <span style={{ display: 'inline-flex', alignItems: 'baseline', lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-display, 'Geist', sans-serif)",
            fontWeight: 300,
            fontSize: wordmark,
            letterSpacing: '-0.035em',
            color: '#f1f1f3',
          }}
        >
          growthsales
        </span>
        <span
          style={{
            fontFamily: "var(--font-display-serif, 'Fraunces', serif)",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: wordmark,
            letterSpacing: '-0.04em',
            color: '#FF3A0E',
          }}
        >
          .ai
        </span>
      </span>
    </span>
  );
}
```

---

### Acessibilidade

```tsx
// Quando GrowthLogo é o único identificador da marca na página (ex: slide 01 hero):
<span role="img" aria-label="Growth Sales.ai">
  <GrowthLogo size="hero" />
</span>

// Quando é decorativo junto a texto que já nomeia a marca:
// aria-hidden="true" no elemento raiz é suficiente
```

---

### Observação UX sobre a spec do lead

A spec proposta usa `#F5F0E8` para bone. Discordo — esse tom tem temperatura quente demais (amarelado) e em projetor renderiza como bege, não bone editorial. O brandbook usa `#f1f1f3` (tom levemente azul-frio) que mantém aparência de bone neutro tanto em tela quanto projetado. Recomendo manter `#f1f1f3`. Se João preferir o tom mais quente para leitura em ambiente com luz incandescente, `#F5F0E8` pode ser aplicado só no size `hero` — mas não como default.

---

*Revisões V2.4, V2.6 e V2.7 adicionadas por Velani (UX) · 12 jun 2026*

---

## REVISÃO V3 — Refundação baseada no site real

*Velani (UX) · 12 jun 2026 — V3 anula V2 onde divergir*

**Fonte:** bundle `/Users/joaoramos/Downloads/growth-sales-a-i-site/project/` — site real em produção Growth Sales A.I. Lidos: CLAUDE.md, Home.html, Build OS.html, Rev OS.html, Sobre.html, variations/V3-cinematic.html, V4-orbital.html.

---

### 1. Naming oficial dos produtos

| Nome anterior (deck V2) | Nome OFICIAL (site real) | Subtítulo do site |
|---|---|---|
| WorkOS | **Build OS™** | "Construção de sistemas digitais" |
| Orquestrador Comercial | **Rev OS™** | "Operação gerenciada com IA" |

**Regra de escrita:** sempre com espaço e trademark — `Build OS™`, `Rev OS™`. Nunca "BuildOS" ou "RevOS" sem espaço.

**Posicionamento Build OS™:**
- Eyebrow: `Build OS™ · Construção de sistemas digitais`
- H1 site: *"Construção não é encomenda. É arquitetura."*
- Sub: "Build OS™ constrói sistemas digitais sob medida — produto novo, frente nova ou operação reestruturada com IA. No ar em semanas, conduzido por um time sênior, com a IA como co-desenvolvedor."
- Tag de posicionamento: **Service as a System**

**Posicionamento Rev OS™:**
- Eyebrow: `Rev OS™ · Operação gerenciada com IA`
- H1 site: *"O sistema operacional do crescimento."*
- Sub: "A Growth Sales A.I instala e opera junto com você — marketing, vendas, dados e IA num fluxo único, do diagnóstico ao fechamento. Rev OS™ é uma operação de receita inteira rodando dentro da sua empresa, implementada pelo nosso time."
- Tag de posicionamento: **Service as a System**

**Tagline da empresa (Home.html):**
- Title: "Growth Sales A.I — Service as a System. O sistema serve o negócio."
- Meta: "A Growth Sales A.I desenha a arquitetura comercial que faz o time crescer composto. Service as a System — Rev OS™ acelerado e Build OS™ open source."

---

### 2. Paleta real (extraída do CSS)

```css
/* tokens canônicos — idênticos em Home, Build OS, Rev OS, Sobre */
--void:           #050507;  /* bg principal — preto profundo */
--ink:            #0e0e11;  /* bg de card/panel */
--ink-2:          #16161a;  /* bg secundário */
--ink-3:          #1f1f24;  /* bg terciário */
--hairline:       rgba(255,255,255,0.07);   /* borda sutil */
--hairline-strong: rgba(255,255,255,0.16);  /* borda de destaque */
--bone:           #f1f1f3;  /* texto principal */
--bone-dim:       #c5c5ca;  /* texto secundário */
--bone-mute:      #84848c;  /* texto terciário / labels */
--ember:          #ff3a0e;  /* cor de destaque principal */
--ember-glow:     #ff5a1f;  /* ember em hover/glow */
--ember-deep:     #c92c0a;  /* ember profundo (sombra) */
--ok:             #4ad07a;  /* status positivo (Sobre.html) */
```

**Textura de fundo universal:** `radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)` com `background-size: 24px 24px; opacity: 0.4` — grão de pontos sobre void.

**Vinheta ember (Rev OS, V3-cinematic):** `radial-gradient(ellipse 60% 40% at 80% 0%, rgba(255,58,14,0.05) 0%, transparent 55%), radial-gradient(ellipse 50% 35% at 10% 90%, rgba(255,58,14,0.04) 0%, transparent 60%)` — sutileza, não flood.

---

### 3. Tipografia real

| Papel | Font | Peso | Letter-spacing | Line-height | Nota |
|---|---|---|---|---|---|
| Display / Serif | **Fraunces** | 300 (italic ou normal) | -0.028em a -0.035em | 0.93–0.98 | Títulos grandes, subtítulos editoriais |
| Sans (body) | **Inter Tight** | 300/400/500/600 | padrão | 1.5–1.6 | Corpo de texto, parágrafos, navegação |
| Mono (labels/kickers) | **JetBrains Mono** | 400/500/600 | 0.18em uppercase | — | Eyebrows, tags, dados, kickers |

**V2 usava Geist/Space Grotesk/Geist Mono — anulado.** O site real usa Inter Tight + JetBrains Mono + Fraunces. Dev-alpha precisa ajustar imports.

**Import Google Fonts (colar no layout.tsx ou head):**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:opsz,ital,wght@9..144,0,300..700;9..144,1,300..700&display=swap" rel="stylesheet">
```

**Escala tipográfica do display (cascade):**
- Hero/H1 enorme: `clamp(64px, 8.4vw, 140px)` — `font-weight: 300`, `letter-spacing: -0.035em`, `line-height: 0.95`
- Subtítulo editorial: `clamp(20px, 2.1vw, 26px)` — Fraunces italic 300, `line-height: 1.45`
- Eyebrow/kicker: `11px`, JetBrains Mono 500, `letter-spacing: 0.18em`, uppercase
- Body copy: `15.5–16px`, Inter Tight 300–400, `line-height: 1.6`

---

### 4. Backgrounds e texturas

| Tipo | Descrição | Uso no site |
|---|---|---|
| Void puro + grain | `#050507` + pontos 24px grid 0.4 opacity | Slides tipográficos puros |
| Vinheta ember bilateral | radial-gradient ember topo-direita + baixo-esquerda | Rev OS hero, slides com produto |
| Fullbleed img + veil | foto opacity 0.55 + gradient void fade | V3-cinematic: B6-particle-wave.png |
| Split left/right | left void+texto, right foto com overlay | V4-orbital pattern |
| Blueprint brackets | `::before/::after` corners ember 1.5px, 14×14, opacity 0.55 | Build OS — wrap de elementos-chave |
| Scan line | `height: 2px`, gradient ember, animação vertical | V3-cinematic — sinal de dado em tempo real |
| Live dot ember | `8px` círculo, `box-shadow: 0 0 10px ember`, pulse 1.6s | Kickers de status ao vivo |

**Assets de imagem do bundle** (em `assets/imagery/`):
| Arquivo | Conteúdo | Uso sugerido no deck |
|---|---|---|
| `socio-joao-v3.png` | João Guirunas — foto editorial | Slide 01 (quem somos) |
| `socio-claudia-v2.png` | Claudia Guirunas — foto editorial | Slide 01 (quem somos) |
| `hero-advisory.png` | Reunião de advisory — ambiente | Slide 05 ou 09 (closing) |
| `buildos-premissa.png` | Produto/tela — Build OS | Slide 04 (Build OS™) |
| `buildos-closing.png` | Closing visual — Build OS | Slide 04 alt. |
| `B6-particle-wave.png` | Onda de partículas — abstrato sci-fi | Slide 06 (números) alt. |
| `sobre-closing.png` | War room / equipe | Slide 08 (processo) |

**Vídeos disponíveis** (em `assets/imagery/`):
| Arquivo | Descrição |
|---|---|
| `V1-orbit.mp4` | Loop orbital abstrato |
| `V2-create.mp4` | Loop de criação/dados |

---

### 5. Spec por slide — 9 slides com padrões do site real

> **Legenda de variações:** V3c = V3-cinematic (fullbleed foto + massive type), V4o = V4-orbital (split 50/50), Home-cascade = padrão cascade do Home/Rev OS, tipo-puro = void + grain sem foto.

---

### Distribuição de pessoas/imagens por slide

**Princípio:** deck parece dos dois fundadores juntos, não solo do João. Claudia abre, João segue, editoriais alternam. Nunca dois slides seguidos com a mesma pessoa.

| Slide | Pessoa/visual | Asset BG | Status |
|---|---|---|---|
| 01 Quem somos | editorial neutra BG + cards Claudia+João | `editorial-mulher-escrevendo.png` fullbleed | disponível (BG); Claudia pendente (card) |
| 02 Pergunta | nenhuma | void + grain | — |
| 03 Tese | nenhuma | void + grain + vinheta ember | — |
| 04 Build OS™ | editorial neutra | `editorial-04.png` (P-D) opacity 0.45 | disponível |
| 05 Rev OS™ | João (moderado) | `joao-corridor-notebook.png` aspect 4:5 direita | disponível |
| 06 Números | abstrato | `B6-particle-wave.png` opacity 0.35 | a copiar do bundle |
| 07 Clientes | editorial ambiente | `editorial-02.png` (P-B) opacity 0.18 | disponível |
| 08 Processo | nenhuma | void + grain | — |
| 09 Fechamento | equipe (não solo) | `sobre-closing.png` (war room) | a copiar do bundle |

**Princípios de curadoria visual (João):**
- Não descartar fotos só por tom quente — se composição é forte e cinematográfica, mantém. Ember convive com warm tone.
- Reduzir protagonismo de João — ele aparece como CSO, não como face do deck. João aparece em 1 slide (05), editorials neutras nos demais.
- Claudia abre (slide 01), João segue (slide 05), editoriais alternam entre eles.

**Quando foto da Claudia chegar:** trocar placeholder do card no slide 01. Slide 08 pode receber BG accent dela opacity 0.18 se quiser variedade.

---

#### Slide 01 — Quem somos (fundadores)

**Inspiração:** Sobre.html — seção "Os sócios" com cards editoriais alternados + fotos reais.
**Variação:** V4o (split) — mas vertical em vez de horizontal, adaptado para slide.

**BG:** `editorial-mulher-escrevendo.png` (em `public/photos/joao/`) fullbleed + gradient `rgba(5,5,7,0.88) 0% → rgba(5,5,7,0.55) 50% → rgba(5,5,7,0.30) 100%`. Foto de abertura escolhida por João — ambiente editorial industrial, composição forte. Tom quente da foto convive com ember `#ff3a0e` sem ajuste de paleta. Cards dos fundadores ficam sobre o lado mais escuro (esquerda/centro).

**Ordem: Claudia à esquerda (abre), João à direita (segue).** Claudia é Co-CEO, aparece primeiro — deck representa os dois fundadores com peso igual.

**Logo Growth:** `<GrowthLogo size="hero" />` dominante no topo, centralizado, acima do grid de fundadores. É o elemento de identidade que enquadra os dois.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  [eyebrow mono] GROWTH SALES.AI · QUEM RESPONDE             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│       [<GrowthLogo size="hero" /> — centralizado]           │
│                                                             │
│  [hairline full rgba(255,255,255,0.07)]                     │
│                                                             │
│  ┌──────────────────────┐  ┌──────────────────────┐         │
│  │ [PLACEHOLDER Claudia │  │ [socio-joao-v3.png   │         │
│  │  aspect 4:5          │  │  aspect 4:5           │         │
│  │  max-h 220px]        │  │  max-h 220px]         │         │
│  │                      │  │                       │         │
│  │ Claudia Guirunas     │  │ João Guirunas         │         │
│  │ Co-CEO · Co-Founder  │  │ CEO · Co-Founder      │         │
│  │ @claudia.guirunas    │  │ @joaoguirunas         │         │
│  │ bio curta            │  │ bio curta             │         │
│  └──────────────────────┘  └──────────────────────┘         │
│                                                             │
│  [hairline] 18 meses. 2 produtos no mercado.                │
└─────────────────────────────────────────────────────────────┘
```

**Foto João:** `assets/imagery/socio-joao-v3.png` — copiar para `public/brand/growth/socio-joao-v3.png`. Disponível agora.

**Foto Claudia: PENDENTE.** João vai fornecer. Placeholder até chegar:
```tsx
<div style={{
  aspectRatio: '4/5', maxHeight: 220,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}}>
  <span style={{ fontFamily: MONO, fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.14em' }}>
    FOTO · CLAUDIA
  </span>
</div>
```
Quando chegar: salvar em `public/brand/growth/socio-claudia.png` e trocar placeholder por `<img>`.

**Proporção:** `aspect-ratio: 4/5` (como no site — 4:5 é mais editorial que 3:4).
**object-fit:** cover, `object-position: center top`.

**Dados dos fundadores (ordem Claudia primeiro, bios aprovadas pelo João):**
```typescript
const FOUNDERS = [
  {
    name: 'Claudia Guirunas',
    role: 'Co-CEO · Co-Founder',
    handle: '@claudia.guirunas',
    photo: null,  // PENDENTE — substituir por '/brand/growth/socio-claudia.png'
    bio: 'Transforma dados, comportamento e experiência em sistemas inteligentes que geram clareza, fluidez e resultados reais.',
  },
  {
    name: 'João Guirunas',
    role: 'CEO · Co-Founder',
    handle: '@joaoguirunas',
    photo: '/brand/growth/socio-joao-v3.png',
    bio: 'Lidera a frente de estratégia e inovação na Growth Sales, transformando inteligência artificial em eficiência real e evolução dos negócios.',
  },
];
```

**Tipografia:**
| Elemento | Font | Size | Cor | Racional |
|---|---|---|---|---|
| Eyebrow | JetBrains Mono 500 | 11px, tracking 0.18em | `#ff3a0e` | kicker de seção |
| Nome | Fraunces 300 | clamp(22px,2.8vw,32px) | `#f1f1f3` | hierarquia principal do card |
| Cargo | JetBrains Mono 500 | 10px, tracking 0.18em, uppercase | `#ff3a0e` | segunda leitura, ember |
| Handle Instagram | JetBrains Mono 400 | 10px, tracking 0.14em | `#84848c` (bone-mute) | informação de contato — terceira leitura, não compete com cargo |
| Bio | Inter Tight 300 | 14px, line-height 1.55 | `#c5c5ca` | corpo, recuado visualmente |
| Tagline rodapé | Fraunces italic 300 | 18px | `rgba(241,241,243,0.5)` | fechamento do slide |

**Decisão sobre handle:** bone-mute (`#84848c`) em vez de ember. Cargo já usa ember — dois elementos ember no mesmo card criam competição visual. Handle é dado de contato (terceira leitura), não hierarquia de marca. Projetor lê bem bone-mute em fundo void.

---

#### Slide 02 — Pergunta

**Inspiração:** Home.html — seção manifesto, texto grande centralizado.
**Variação:** tipo-puro.

**BG:** void puro + grain. Slide tipográfico — nenhuma imagem compete com a pergunta.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  [eyebrow] GROWTH SALES.AI · JUN 2026                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Fraunces 300, clamp(48px,6.5vw,80px), max-w 16ch]        │
│  "O que muda quando                                         │
│  a IA entra na                                              │
│  operação comercial?"                                       │
│                                                             │
│  [sub Inter Tight italic 300, clamp(18px,2vw,24px)]         │
│  "Tudo — ou nada. Depende de como você entra."              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Tratamento:** `em` em ember dentro do display, como no site. A palavra-chave fica em italic ember.

---

#### Slide 03 — Tese

**Inspiração:** Home.html — manifesto "SaaS → SaaS" / split ideias.
**Variação:** tipo-puro com contraste split.

**BG:** void + grain + vinheta ember sutil bilateral.

**Layout:** dois blocos lado a lado separados por hairline vertical — esquerda "a maioria" (bone-mute, tachado ou atenuado), direita "a tese" (bone + ember em destaque). Reproduz o padrão `split` do Home.

---

#### Slide 04 — Build OS™

**Inspiração:** Build OS.html — hero cascade + blueprint brackets + terminal.
**Variação:** V4o (split) — esquerda texto, direita visual.

**Distribuição de pessoa:** slide 04 usa editorial neutra (P-D = `editorial-04.png`) — sem foto de pessoa. Reserva João para slide 05 (Rev OS), Claudia para slide 08 quando foto chegar. Mantém paridade e evita "deck do João".

**BG esquerda:** void puro.
**BG direita:** `editorial-04.png` com overlay `rgba(5,5,7,0.45)` — editorial neutra aprovada na V2.3, sem pessoa, linguagem visual de dados/processo que ecoa a linguagem Build OS.

**Blueprint brackets:** aplicar `::before/::after` nos cantos do bloco direito — 14×14px, border ember 1.5px, opacity 0.55.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  [eyebrow] BUILD OS™ · CONSTRUÇÃO DE SISTEMAS               │
│  ──────────────────────────────────────────────             │
│  ┌──────────────────┐  ┌──────────────────────────┐         │
│  │ [Fraunces 300    │  │ [editorial-04.png         │         │
│  │  clamp(40px,5vw, │  │  + blueprint brackets     │         │
│  │  72px)]          │  │  + overlay void 0.45]     │         │
│  │ "Construção      │  │                           │         │
│  │ não é encomenda. │  │  [live dot ember]         │         │
│  │ É arquitetura."  │  │  Em produção              │         │
│  │                  │  │  não é mockup             │         │
│  │ [sub Inter Tight │  └──────────────────────────┘         │
│  │  300, 15px]      │                                       │
│  │ sistemas digitais│                                       │
│  │ sob medida...    │                                       │
│  │                  │                                       │
│  │ [tag] Service as │                                       │
│  │ a System         │                                       │
│  └──────────────────┘                                       │
└─────────────────────────────────────────────────────────────┘
```

**Copy do slide:**
```typescript
const BUILD_OS = {
  eyebrow: 'Build OS™ · Construção de sistemas digitais',
  headline: ['Construção não é encomenda.', 'É arquitetura.'],
  sub: 'Sistemas digitais sob medida — produto novo, frente nova ou operação reestruturada com IA. No ar em semanas.',
  tag: 'Service as a System',
};
```

---

#### Slide 05 — Rev OS™

**Inspiração:** Rev OS.html — hero cascade + vinheta ember + panel com foto advisory.
**Variação:** V4o (split) — esquerda texto, direita foto João.

**Distribuição de pessoa:** João aparece aqui, no segundo produto — sequência natural após Claudia no slide 01. `joao-corridor-notebook.png` é a melhor candidata: notebook aberto, corredor escuro, ambiente de trabalho editorial sem projetar conteúdo de tela.

**BG esquerda:** void puro.
**BG direita:** `joao-corridor-notebook.png` (em `public/photos/joao/`), `aspect-ratio: 4/5`, overlay gradient bottom `rgba(5,5,7,0.05) 0% → rgba(5,5,7,0.92) 100%`.

**Layout:** espelha o Build OS™ — padrão de produto consistente.

**Copy do slide:**
```typescript
const REV_OS = {
  eyebrow: 'Rev OS™ · Operação gerenciada com IA',
  headline: ['O sistema operacional', 'do crescimento.'],
  sub: 'Marketing, vendas, dados e IA num fluxo único. Operação de receita inteira rodando dentro da sua empresa.',
  tag: 'Service as a System',
};
```

---

#### Slide 06 — Números (gráfico de linha)

**Inspiração:** V3-cinematic — fullbleed + scan line + dado em destaque.
**Variação:** V3c adaptado — bg `B6-particle-wave.png` opacity 0.35 + veil void + scan line animado.

**BG:** `B6-particle-wave.png`, `opacity: 0.35`, `filter: contrast(1.1)`, veil `linear-gradient(180deg, rgba(5,5,7,0.65) 0%, rgba(5,5,7,0.35) 35%, rgba(5,5,7,0.85) 75%, var(--void) 100%)`.

**Scan line:** `height: 2px`, gradiente ember horizontal, animação translateY 6.5s — sinal de dado em tempo real.

**Gráfico:** spec SVG inline da V2.4 mantida (stroke-dashoffset, PAST sólido + PROJ dashed). Sobre o BG da V3.

**Eyebrow com live dot:**
```html
<span class="live-dot" /> FATURAMENTO · JAN 2025 → 2027
```

---

#### Slide 07 — Clientes

**Inspiração:** Rev OS.html — seção "Em produção · dentro de" + Home ticker.
**Variação:** tipo-puro com hairline grid.

**Distribuição de pessoa:** editorial P-B (`editorial-02.png`) como fundo sutil ou accent lateral — linguagem de pessoa em reunião/ambiente corporativo, aprovada na V2.3. Não é foto de fundador — é editorial de contexto. Evita terceiro slide seguido tipográfico puro (slides 02 e 03 já são puro void).

**BG:** `editorial-02.png` fullbleed, `opacity: 0.18`, veil `linear-gradient(to right, rgba(5,5,7,0.96) 0%, rgba(5,5,7,0.80) 60%, rgba(5,5,7,0.60) 100%)`. Imagem fica como textura de ambiente, não como protagonista.

**Layout:** grade de logos/nomes de clientes em mono uppercase, separados por hairlines. Nomes em JetBrains Mono bone-mute com `border: 1px solid hairline` em cada cell. Padrão do ticker.

---

#### Slide 08 — Processo interno / Como trabalhamos

**Inspiração:** Build OS.html — seção "4 Atos" com numerais gigantes atrás.
**Variação:** tipo-puro com numerais fantasma.

**Distribuição de pessoa:** reservado para Claudia quando foto chegar — placeholder `editorial-04.png` como fundo sutil até lá. Não usar João aqui: ele apareceu no slide 05, próximo aparecimento dele deve ser no slide 09 via `sobre-closing.png` (contexto equipe, não solo).

**BG:** void + grain (tipográfico puro — numerais fantasma são o elemento visual).

**Numeral fantasma:** número de cada etapa em Fraunces 300, `font-size: clamp(200px, 28vw, 400px)`, `opacity: 0.04`, `color: #f1f1f3`, posicionado `absolute` atrás do texto.

**Etapas:** 4 itens em grade 2×2. Cada item: número mono pequeno + headline Fraunces italic + descrição Inter Tight 300.

---

#### Slide 09 — Reflexão / Fechamento

**Inspiração:** Build OS.html / Sobre.html — seção de fechamento com `sobre-closing.png` (war room).
**Variação:** V3c — fullbleed foto + massive type centralizado.

**BG:** `sobre-closing.png` fullbleed, `opacity: 0.55`, veil `linear-gradient(180deg, rgba(5,5,7,0.65) 0%, rgba(5,5,7,0.35) 35%, rgba(5,5,7,0.85) 100%)`.

**Layout:** texto centralizado no terço superior, logo no rodapé.

**Copy mantida da V2:**
- Headline: "Você é a pessoa — ou a empresa?"
- Sub: "A IA não muda o que você faz. Revela quem você é enquanto faz."
- Rodapé: `<GrowthLogo size="lg" />`

---

### 6. Assets a copiar do bundle para o projeto

```bash
BUNDLE="/Users/joaoramos/Downloads/growth-sales-a-i-site/project/assets/imagery"
DEST="/Users/joaoramos/Desktop/Projetos/joao-guirunas-site/public/brand/growth"

# Fotos dos sócios (slide 01)
cp "$BUNDLE/socio-joao-v3.png"      "$DEST/socio-joao-v3.png"
cp "$BUNDLE/socio-claudia-v2.png"   "$DEST/socio-claudia-v2.png"

# Fotos de produto e contexto
cp "$BUNDLE/buildos-premissa.png"   "$DEST/buildos-premissa.png"
cp "$BUNDLE/hero-advisory.png"      "$DEST/hero-advisory.png"
cp "$BUNDLE/sobre-closing.png"      "$DEST/sobre-closing.png"
cp "$BUNDLE/B6-particle-wave.png"   "$DEST/B6-particle-wave.png"

# Vídeos (se usados nos slides 04/05 ou fundo)
cp "$BUNDLE/V1-orbit.mp4"           "$DEST/V1-orbit.mp4"
cp "$BUNDLE/V2-create.mp4"          "$DEST/V2-create.mp4"
```

**Nota para devops:** João tem `joao-rooftop-night.png` já em `public/photos/joao/`. Os assets do bundle vão para `public/brand/growth/`.

---

### 7. Componentes a criar / atualizar

| Componente | Status | Descrição |
|---|---|---|
| `<GrowthLogo>` | Criar — spec em V2.7 | Símbolo + wordmark Fraunces+Inter Tight |
| `<SlideEyebrow>` | Criar | Live dot ember + linha + label JetBrains Mono 11px |
| `<SocioCard>` | Criar | Foto 4:5 + nome Fraunces + cargo mono + bio Inter Tight |
| `<ProductSplit>` | Criar | Grid 50/50 esquerda-texto direita-foto com blueprint brackets |
| `<GrowthLineChart>` | Criar | SVG inline spec V2.4 |
| `<NumeralFantasma>` | Criar | Numeral absoluto atrás do conteúdo, opacity 0.04 |

**`<GrowthLogo>` atualização de fonte:** V2.7 spec usava Geist — corrigir para **Inter Tight** (sans) e manter **Fraunces** (display/.ai). Wordmark:
- `growthsales` → Inter Tight 300, `letter-spacing: -0.035em`, cor `#f1f1f3`
- `.ai` → Fraunces italic 300, `letter-spacing: -0.04em`, cor `#ff3a0e`

---

### 8. Correções V3 sobre V2

| Item V2 | Correção V3 |
|---|---|
| Font sans: Geist / Space Grotesk | **Inter Tight** |
| Font mono: Geist Mono | **JetBrains Mono** |
| Font display: Space Grotesk | **Fraunces** (já correto em display, mas sans estava errado) |
| Produto "WorkOS" | **Build OS™** |
| Produto "Orquestrador Comercial" | **Rev OS™** |
| Foto João: `portrait-realistic.png` | **`socio-joao-v3.png`** do bundle |
| Foto Claudia: placeholder | **`socio-claudia-v2.png`** do bundle |
| Foto aspect ratio: 3:4 | **4:5** (como no site) |
| Slide 06 BG: void puro | **B6-particle-wave.png** 0.35 opacity + veil (mais cinematográfico) |
| Slide 09 BG: não especificado | **`sobre-closing.png`** war room fullbleed |
| GrowthLogo wordmark sans: Geist | **Inter Tight** |

---

*Revisão V3 adicionada por Velani (UX) · 12 jun 2026*
