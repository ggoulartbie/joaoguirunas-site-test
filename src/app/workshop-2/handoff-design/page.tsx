import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';

export const metadata: Metadata = {
  title: 'Fase 06 — Claude Design | Workshop 2',
  description: 'Abrir a pasta do projeto no Claude Design, criar o KV visual e refinar os componentes.',
  alternates: { canonical: '/workshop-2/handoff-design' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const ACCENT = 'var(--color-accent)';

function Step({ n, label, children }: { n: number; label?: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 py-5 border-b border-white/[0.06] last:border-0">
      <span className="flex-shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center text-[11px] font-bold border" style={{ fontFamily: MONO, color: ACCENT, borderColor: 'rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.06)' }}>{n}</span>
      <div className="text-sm leading-relaxed text-white/75 flex-1">
        {label && <strong className="block text-white mb-1">{label}</strong>}
        {children}
      </div>
    </div>
  );
}

function Callout({ label = 'Dica', children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="my-8 p-5 text-sm leading-relaxed text-white/80" style={{ borderLeft: `3px solid ${ACCENT}`, background: 'rgba(255,58,14,0.05)' }}>
      <span className="mb-2 block font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, color: ACCENT }}>{label}</span>
      {children}
    </div>
  );
}

const PROMPT_KV = `Tenho os arquivos do meu design system pessoal nesta pasta. Leia com atenção:
- docs/design-system/tokens.md (tokens completos: cores, tipografia, espaços, radius, sombras)
- docs/design-system/design-system.css (CSS custom properties)
- docs/brand-brief.md (personalidade, adjetivos, referência visual, tom de voz)

Com base nesses arquivos, crie um KV (key visual) sofisticado que vai além de um style guide básico.
O objetivo é um sistema visual com caráter — não uma paleta genérica.

═══════════════════════════════
01 — FUNDAÇÃO VISUAL
═══════════════════════════════

PALETA
- Swatches da cor primária em 5 variações de luminosidade (100 → 900)
- Gradiente de assinatura da marca: linear de 135° entre a primária e uma versão mais quente/fria
- Cor de destaque secundária derivada da referência visual do brief
- Neutros completos: preto, superfície, borda, texto muted, branco

TEXTURA DE FUNDO (efeito noise / grain)
- Crie um SVG de ruído sutil (feTurbulence baseFrequency="0.65" numOctaves="3")
- Use como overlay no fundo escuro com opacidade 3-5% — dá profundidade sem peso
- Aplique também em uma variação de card como background-image

TIPOGRAFIA COM CARÁTER
- Fonte primária dos tokens em tamanhos xs → 4xl com preview de texto real
- Fonte de display/heading em peso 800-900 se a personalidade for mais ousada,
  ou 300 light italic se for mais sofisticada — derive dos adjetivos do brief
- Pair tipográfico: mostre heading + body juntos num bloco de texto real
- Letter-spacing variável: tracking tight no heading, normal no body
- Preview de número/stat em tamanho 4xl com a cor primária (ex: "12+", "100%")

═══════════════════════════════
02 — COMPONENTES COM VIDA
═══════════════════════════════

BOTÃO PRIMÁRIO — 3 estados + variações
- Default: background gradiente da assinatura (não cor sólida), border-radius dos tokens
- Hover: shift de 8° no gradiente + translateY(-2px) + shadow elevada
- Disabled: 40% opacidade, cursor not-allowed
- Variação ghost: border 1.5px solid primária, background transparente
- Variação destructive: cor --color-error com mesmo tratamento de gradiente

CARD — sistema de elevação
- Nível 0 (flat): border sutil, sem shadow
- Nível 1 (raised): shadow-sm, hover → shadow-md + translateY(-4px)
- Nível 2 (floating): shadow-lg, efeito de glow com box-shadow duplo (shadow + glow primário)
- Card com accent bar: 3px solid primária no lado esquerdo
- Micro-animação de entrada: fade-in + slide-up (0.3s ease-out)

INPUT DE TEXTO — estados completos
- Default: border var(--color-border), background var(--color-surface)
- Focus: border var(--color-primary) + box-shadow glow (0 0 0 3px rgba(primária, 0.2))
- Error: border var(--color-error) + mensagem de erro abaixo
- Success: border var(--color-success) + ícone checkmark

BADGE — com dot animado
- Default, Success, Warning, Error com cores semânticas
- Variação "live": dot verde pulsante (animation: pulse 2s infinite) para status ao vivo
- Variação com ícone à esquerda

AVATAR / INICIAIS
- Círculo com gradiente da assinatura, iniciais do nome em branco
- Variação com ring de borda na cor primária

═══════════════════════════════
03 — EFEITOS DE IDENTIDADE
═══════════════════════════════

HERO MOCK (bloco de demonstração)
- Simule um recorte de hero: heading grande em peso máximo, subtítulo muted, botão primário
- Aplique o gradiente de assinatura como overlay sutil no fundo
- Mostre como a tipografia, cor e espaçamento funcionam juntos em contexto real

MOTION TOKENS (especificação de animação)
- --ease-out: cubic-bezier(0.16, 1, 0.3, 1) — entrada rápida, saída suave
- --ease-in-out: cubic-bezier(0.45, 0, 0.55, 1) — transições simétricas
- --duration-fast: 150ms | --duration-base: 250ms | --duration-slow: 400ms
- Demonstre cada easing com um elemento se movendo

DARK / LIGHT SURFACE CONTRAST
- Mostre o mesmo card em fundo escuro (var(--color-bg)) e fundo claro (var(--color-surface))
- O sistema deve funcionar nos dois contextos

═══════════════════════════════
04 — REGRAS DO SISTEMA
═══════════════════════════════

SPACING RHYTHM
- Demonstre a grade de espaçamento com blocos visuais (--space-1 até --space-16)
- Mostre combinações válidas (padding interno de card, gap entre elementos)

DO / DON'T
- 2 exemplos de uso correto com ✓ em verde
- 2 exemplos de uso incorreto com ✗ em vermelho
- Foco em: combinação de cores, hierarquia tipográfica

Mantenha consistência total com os adjetivos de personalidade do brief.
O KV deve sentir-se como a marca — não como um template genérico.`;

const PROMPT_REFINE = `Com base nos adjetivos de personalidade do brief (docs/brand-brief.md), refine o sistema visual:

1. TIPOGRAFIA: o heading está com o peso e tracking certos para a personalidade?
   Se a marca é ousada → weight 800+, tracking tight
   Se a marca é sofisticada → weight 300 light italic, tracking wide
   Se a marca é técnica → monospace para labels e badges

2. BOTÃO: o gradiente de assinatura captura a energia da marca?
   Ajuste o ângulo (90°, 135°, 180°) e a segunda cor até sentir certo.

3. CARD: o nível de elevação (sombra, border, glow) está alinhado com a seriedade da marca?
   Marca minimalista → só border, sem glow
   Marca expressiva → glow na cor primária + shadow dupla

4. NOISE TEXTURE: o ruído de fundo está sutil o suficiente (2-4% opacidade)?

5. HERO MOCK: o bloco de demonstração já parece um site real desta pessoa?

Aplique os ajustes e mostre as versões antes/depois dos componentes modificados.`;

const PROMPT_REGISTRO_KV = `O KV no Claude Design está pronto. Registre na smart-memory do projeto:

1. Atualize docs/smart-memory/shared-context.md:
   - KV visual criado no Claude Design: paleta, tipografia, botão, card, input, badge
   - Próxima ação: gerar URL de handoff → Claude Code → [[project/components]]

2. Crie docs/smart-memory/project/kv-design.md:

---
title: KV Design System Visual
tipo: referência
status: aprovado
ferramenta: Claude Design
---

# KV Design System — [nome]

## Componentes criados
- **Paleta:** swatches com hex e nomes semânticos
- **Tipografia:** escala xs → 4xl com preview real
- **Botão primário:** default · hover · disabled
- **Card:** título + descrição + CTA
- **Input:** label + placeholder + estados
- **Badge:** default · success · warning · error

## Decisões de refinamento
[anote aqui os ajustes feitos ao botão/card antes do handoff]

## Próximo passo
Gerar URL de handoff via Share → Handoff to Claude Code.
O Claude Code vai implementar esses componentes automaticamente.

→ Tokens base: [[brand-tokens]] · Implementação: [[components]] · LP V2: [[lp-v2]]`;

export default function HandoffDesignPage() {
  return (
    <WorkshopPhaseLayout slug="handoff-design">
      <FacilitatorNote duration="10 min">
        Este é o Handoff 1 — os arquivos que os agentes criaram no terminal agora alimentam o Claude Design. Abra o Claude Design no projetor ao lado do Obsidian: no Obsidian, a memória estruturada; no Claude Design, o sistema visual com efeitos e animações. A mesma pasta, duas perspectivas. O prompt é ambicioso de propósito — peça o máximo.
      </FacilitatorNote>

      <p className="mb-8 text-base leading-relaxed text-white/70">
        O Claude Design vai abrir a mesma pasta, ler o brand-brief e os tokens, e gerar um KV com caráter — gradiente de assinatura, textura de ruído, tipografia com peso e tracking derivados dos adjetivos da marca, componentes com estados completos e motion tokens. Não um style guide genérico: um sistema que sente a marca.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        10 min · Fase 06 de 10
      </div>

      <div className="mb-8 p-4" style={{ border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.04)' }}>
        <span className="block font-mono text-[10px] tracking-[0.18em] uppercase mb-1" style={{ fontFamily: MONO, color: ACCENT }}>Handoff 1</span>
        <strong className="text-base text-white" style={{ fontFamily: DISPLAY }}>Claude Code → Claude Design</strong>
        <span className="ml-2 text-sm text-white/50">— os arquivos do terminal alimentam a interface visual</span>
      </div>

      <Step n={1} label="Abrir o Claude Design">
        Vá para <InlineCode>claude.ai/design</InlineCode> no browser.
      </Step>

      <Step n={2} label="Abrir a pasta do projeto">
        Clique em <strong className="text-white">Open Folder</strong> e selecione <InlineCode>~/Desktop/meu-design-workshop</InlineCode>.
        <p className="mt-2 text-white/50">O Claude Design lê brand-brief.md, tokens.md e design-system.css — toda a identidade construída pelo Analista e Arquiteto.</p>
      </Step>

      <Step n={3} label="Criar o KV visual">
        <CodeBlock label="prompt — claude design">{PROMPT_KV}</CodeBlock>
        <div className="mt-4 space-y-1.5">
          {[
            'Paleta em 5 luminosidades + gradiente de assinatura',
            'Textura noise SVG como overlay de fundo',
            'Tipografia com peso/tracking derivados dos adjetivos da marca',
            'Botão com gradiente + hover state + variação ghost e destructive',
            'Cards em 3 níveis de elevação com micro-animação de entrada',
            'Input com estados focus/error/success + glow ring',
            'Badges com dot pulsante, avatares com ring',
            'Hero mock + motion tokens + do/don\'t',
          ].map((item) => (
            <div key={item} className="flex gap-2 text-xs text-white/50">
              <span style={{ color: ACCENT }}>→</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Step>

      <Step n={4} label="Refinar pelos adjetivos da marca">
        Após o KV gerado, rode este prompt de refinamento para calibrar ao caráter da marca:
        <CodeBlock label="refinamento">{PROMPT_REFINE}</CodeBlock>
        <p className="mt-2 text-white/50">O refinamento ajusta peso tipográfico, ângulo do gradiente, nível de elevação dos cards e intensidade do noise — derivando tudo dos adjetivos do brief.</p>
      </Step>

      <Step n={5} label="Registrar o KV na smart-memory">
        KV aprovado? Volte ao Claude Code e rode:
        <CodeBlock label="claude code — smart-memory">{PROMPT_REGISTRO_KV}</CodeBlock>
        <p className="mt-2 text-white/50">
          Cria <InlineCode>docs/smart-memory/project/kv-design.md</InlineCode> — um novo nó no grafo do Obsidian conectado aos tokens e aos componentes que vêm a seguir.
        </p>
      </Step>

      <Callout label="Por que o prompt é tão longo">
        Um prompt vago entrega um style guide genérico — swatches, tipografia, um botão. Este prompt especifica o que diferencia uma marca: o gradiente de assinatura (não uma cor sólida), o noise de fundo (profundidade sem peso), os motion tokens (o sistema sabe como se mover), e o hero mock (prova que o sistema funciona em contexto real). Quanto mais específico o pedido, mais distante do template o resultado.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
