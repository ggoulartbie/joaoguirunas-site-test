import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';

export const metadata: Metadata = {
  title: 'Fase 03 — Arquiteto | Workshop 2',
  description: 'O Arquiteto cria a smart-memory com wikilinks Obsidian — veja o grafo crescer.',
  alternates: { canonical: '/workshop-2/arquiteto' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const ACCENT = 'var(--color-accent)';

function Callout({ label = 'Dica', children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="my-8 p-5 text-sm leading-relaxed text-white/80" style={{ borderLeft: `3px solid ${ACCENT}`, background: 'rgba(255,58,14,0.05)' }}>
      <span className="mb-2 block font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, color: ACCENT }}>{label}</span>
      {children}
    </div>
  );
}

const PROMPT = `/aiox-architect

Leia docs/brand-brief.md.

Crie a estrutura de smart-memory abaixo. Cada arquivo deve ter frontmatter YAML completo e usar wikilinks [[nome-do-arquivo]] para conectar os documentos. Os wikilinks criam as arestas visíveis no grafo do Obsidian.

═══════════════════════════════
ESTRUTURA DE ARQUIVOS A CRIAR:
═══════════════════════════════

docs/smart-memory/
├── INDEX.md
├── shared-context.md
├── project/
│   ├── overview.md
│   └── brand-tokens.md
└── stories/
    └── BACKLOG.md

═══════════════════════════════
CONTEÚDO DE CADA ARQUIVO:
═══════════════════════════════

** docs/smart-memory/INDEX.md **
---
title: Índice do Projeto
tipo: índice
atualizado: [data de hoje]
---

# Índice — [nome da pessoa] Design System

## Projeto
- [[project/overview]] — visão geral e objetivo do projeto
- [[project/brand-tokens]] — tokens de marca em linguagem natural

## Stories
- [[stories/BACKLOG]] — próximas histórias de desenvolvimento

---
*Este vault documenta o design system pessoal de [nome]. Navegue pelo grafo para ver as conexões.*

** docs/smart-memory/shared-context.md **
---
title: Contexto Compartilhado
tipo: contexto
---

# Estado Atual do Projeto

- **Pessoa:** [nome] — [área de atuação]
- **Fase atual:** briefing concluído, estrutura de memória inicializada
- **Próxima ação:** criar tokens de design → [[project/brand-tokens]]
- **Referência visual:** [referência citada no brief]
- **Cor principal:** [hex da marca]

→ Ver [[project/overview]] para contexto completo

** docs/smart-memory/project/overview.md **
---
title: Overview do Projeto
tipo: projeto
tags: [brand, design-system, pessoal]
---

# [nome] — Design System Pessoal

## Objetivo
[2-3 frases: o que está sendo construído e por quê]

## Quem é
[síntese da identidade profissional a partir do brief]

## Personalidade da marca
[os 3 adjetivos do brief com 1 frase expandindo cada um]

## Referências visuais
- [referência citada] — [o que atrai]

## Entregáveis deste projeto
- [ ] tokens.md com paleta, tipografia e espaçamentos
- [ ] design-system.css com CSS custom properties
- [ ] tailwind.tokens.js para integração com Tailwind
- [ ] KV no Claude Design

→ Tokens: [[brand-tokens]] · Stories: [[../stories/BACKLOG]]

** docs/smart-memory/project/brand-tokens.md **
---
title: Brand Tokens
tipo: tokens
tags: [cores, tipografia, marca]
---

# Brand Tokens — [nome]

## Cor principal
- **Hex:** [cor convertida para hex]
- **Nome/referência:** [como a pessoa descreveu]
- **Sensação:** [o que essa cor transmite para esta marca]

## Tipografia sugerida
- **Fonte primária:** [sugestão baseada na personalidade]
- **Por quê:** [justificativa em 1 linha]
- **Pesos:** 400 (regular), 600 (semibold), 700 (bold)

## Tom de voz
[adjetivo 1] · [adjetivo 2] · [adjetivo 3]

## Próximo passo
Estes tokens em linguagem natural serão convertidos em tokens técnicos na fase do Designer.
→ [[../stories/BACKLOG]]

** docs/smart-memory/stories/BACKLOG.md **
---
title: Backlog
tipo: stories
status: em construção
---

# Backlog — [nome] Design System

## Em progresso
- [ ] 1.1 — Criar tokens técnicos completos (cores, tipografia, espaçamentos)
- [ ] 1.2 — Gerar design-system.css com CSS custom properties
- [ ] 1.3 — Gerar tailwind.tokens.js para integração Tailwind

## Próximas
- [ ] 2.1 — Criar componentes no Claude Design (botão, card, input)
- [ ] 2.2 — Aplicar design system num projeto real

→ Contexto: [[../project/overview]] · Tokens: [[../project/brand-tokens]]`;

const FILES = [
  { file: 'docs/smart-memory/INDEX.md', desc: 'Índice do vault com links para todos os documentos' },
  { file: 'docs/smart-memory/shared-context.md', desc: 'Estado atual — o que foi feito e qual é a próxima ação' },
  { file: 'docs/smart-memory/project/overview.md', desc: 'Quem é a pessoa, o que está sendo construído e por quê' },
  { file: 'docs/smart-memory/project/brand-tokens.md', desc: 'Tokens de marca em linguagem natural (cor, tipografia, tom)' },
  { file: 'docs/smart-memory/stories/BACKLOG.md', desc: 'Stories de desenvolvimento com links para os tokens' },
];

export default function ArquitetoPage() {
  return (
    <WorkshopPhaseLayout slug="arquiteto">
      <FacilitatorNote duration="10 min">
        Este é o momento mais visual do workshop — prepare os participantes para abrirem o grafo do Obsidian assim que o comando terminar. Abra o grafo no seu computador ao vivo para mostrar o resultado antes deles verem no próprio. O impacto é maior quando você mostra primeiro e depois eles reproduzem.
      </FacilitatorNote>

      <p className="mb-8 text-base leading-relaxed text-white/70">
        O Arquiteto lê o <InlineCode>brand-brief.md</InlineCode> e cria 5 arquivos interligados com wikilinks <InlineCode>{'[[assim]]'}</InlineCode>. Cada wikilink vira uma aresta no grafo do Obsidian — o projeto ganha memória persistente e visual.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        10 min · Fase 03 de 07
      </div>

      <div className="my-6 p-4" style={{ border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.04)' }}>
        <span className="block font-mono text-[10px] tracking-[0.18em] uppercase mb-1" style={{ fontFamily: MONO, color: ACCENT }}>Agente</span>
        <strong className="text-base text-white">@aiox-architect</strong>
        <span className="ml-2 text-sm text-white/50">— estrutura, memória persistente, wikilinks Obsidian</span>
      </div>

      <h2 className="mb-2 mt-10 text-xl font-bold text-white">Prompt — cole no Claude Code</h2>
      <CodeBlock label="cole no claude code">{PROMPT}</CodeBlock>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">5 arquivos criados</h2>
      <div className="space-y-2">
        {FILES.map((item) => (
          <div key={item.file} className="p-4" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <InlineCode>{item.file}</InlineCode>
            <p className="mt-2 text-sm text-white/55">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-10 text-xl font-bold text-white">Após rodar — abra o grafo</h2>
      <ol className="ml-0 list-none space-y-3 text-sm text-white/70">
        {[
          'No Obsidian, pressione Ctrl/Cmd + G para abrir a visualização de grafo.',
          'Você verá os 5 nós conectados pelas arestas dos wikilinks.',
          'Clique num nó para navegar até o arquivo.',
          'O grafo vai crescer nas próximas fases conforme novos arquivos são criados.',
        ].map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center text-[10px] font-bold border" style={{ fontFamily: MONO, color: ACCENT, borderColor: 'rgba(255,58,14,0.35)', background: 'rgba(255,58,14,0.06)' }}>{i + 1}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>

      <FacilitatorNote>
        Pause aqui e pergunte: <em>&ldquo;Alguém aqui já usava Obsidian antes?&rdquo;</em> — ótima abertura para explicar que o vault funciona offline, é só arquivos de texto, e pode ser sincronizado com Git ou iCloud. O Claude pode ler e escrever nesse vault em qualquer sessão futura.
      </FacilitatorNote>

      <Callout label="Momento WOW">
        Os wikilinks <InlineCode>{'[[assim]]'}</InlineCode> não são só links — são a forma como o Obsidian constrói o grafo. O agente criou uma rede de conhecimento sobre a sua marca. Em qualquer sessão futura, você abre esse vault e o Claude tem contexto completo — sem reexplicar nada.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
