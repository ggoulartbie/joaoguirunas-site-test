import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';

export const metadata: Metadata = {
  title: 'Fase 03 — Arquiteto | Workshop 2',
  description: 'O Arquiteto lê o brief e cria a estrutura de smart-memory no Obsidian.',
  alternates: { canonical: '/workshop-2/arquiteto' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const ACCENT = 'var(--color-accent)';

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      className="my-4 overflow-x-auto p-4 text-sm leading-relaxed"
      style={{
        fontFamily: MONO,
        background: '#1a1a1a',
        borderLeft: `3px solid ${ACCENT}`,
        color: 'rgba(255,255,255,0.85)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      <code>{children}</code>
    </pre>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-8 p-5 text-sm leading-relaxed text-white/80"
      style={{ borderLeft: `3px solid ${ACCENT}`, background: 'rgba(255,58,14,0.05)' }}
    >
      <span
        className="mb-2 block font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{ fontFamily: MONO, color: ACCENT }}
      >
        Momento WOW
      </span>
      {children}
    </div>
  );
}

const PROMPT = `/aiox-architect

Leia docs/brand-brief.md e crie a seguinte estrutura de smart-memory para este projeto de design system pessoal:

docs/smart-memory/
├── project/
│   ├── overview.md        (resumo do projeto + objetivo)
│   └── brand-tokens.md    (tokens de marca: cor, tipografia, tom)
└── stories/
    └── BACKLOG.md         (próximas histórias de desenvolvimento)

Use wikilinks [[assim]] para conectar os arquivos. Inclua frontmatter YAML em cada arquivo.`;

export default function ArquitetoPage() {
  return (
    <WorkshopPhaseLayout slug="arquiteto">
      <p className="mb-8 text-base leading-relaxed text-white/70">
        O agente Arquiteto lê o{' '}
        <code className="rounded bg-white/[0.08] px-1.5 py-0.5 text-xs" style={{ fontFamily: MONO }}>
          brand-brief.md
        </code>{' '}
        gerado pelo Analista e cria a estrutura de smart-memory no Obsidian — com wikilinks,
        frontmatter YAML e um backlog inicial de stories.
      </p>

      <div
        className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}
      >
        10 min · Fase 03 de 07
      </div>

      <div
        className="my-6 p-4"
        style={{ border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.04)' }}
      >
        <span
          className="block font-mono text-[10px] tracking-[0.18em] uppercase"
          style={{ fontFamily: MONO, color: ACCENT }}
        >
          Agente
        </span>
        <strong className="text-base text-white">@aiox-architect</strong>
        <span className="ml-2 text-sm text-white/50">— estrutura, memória, wikilinks</span>
      </div>

      <h2 className="mb-3 mt-10 text-xl font-bold text-white">Prompt — cole no Claude Code</h2>
      <CodeBlock>{PROMPT}</CodeBlock>

      <h2 className="mb-3 mt-10 text-xl font-bold text-white">Estrutura criada</h2>
      <p className="mb-4 text-sm text-white/60">O arquiteto vai gerar estes arquivos no seu vault:</p>

      <div className="space-y-2">
        {[
          { file: 'docs/smart-memory/project/overview.md', desc: 'Resumo do projeto e objetivo central da marca' },
          { file: 'docs/smart-memory/project/brand-tokens.md', desc: 'Tokens de marca: cor, tipografia e tom de voz' },
          { file: 'docs/smart-memory/stories/BACKLOG.md', desc: 'Próximas histórias de desenvolvimento com wikilinks' },
        ].map((item) => (
          <div
            key={item.file}
            className="p-4"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
          >
            <code className="block text-xs" style={{ fontFamily: MONO, color: ACCENT }}>
              {item.file}
            </code>
            <p className="mt-1 text-sm text-white/55">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-10 text-xl font-bold text-white">Após rodar o comando</h2>
      <p className="text-sm text-white/70">
        Vá ao Obsidian, clique no ícone de grafo (canto superior direito) e veja as conexões
        entre os arquivos aparecerem em tempo real.
      </p>

      <Callout>
        Este é o momento WOW — sua memória de projeto ganhou vida visual. Os wikilinks que o
        arquiteto criou aparecem como arestas no grafo do Obsidian. O Claude passou a ter memória
        persistente do seu projeto.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
