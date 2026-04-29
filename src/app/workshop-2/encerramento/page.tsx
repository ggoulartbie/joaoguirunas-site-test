import type { Metadata } from 'next';
import Link from 'next/link';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';

export const metadata: Metadata = {
  title: 'Fase 07 — Encerramento | Workshop 2',
  description: 'Showcase individual, próximos passos e como usar o design system num projeto real.',
  alternates: { canonical: '/workshop-2/encerramento' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const ACCENT = 'var(--color-accent)';
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";

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
        Próximos passos
      </span>
      {children}
    </div>
  );
}

const OUTPUT_FILES = [
  { file: 'docs/brand-brief.md', desc: 'Identidade de marca — nome, área, personalidade, cor, referência' },
  { file: 'docs/smart-memory/project/overview.md', desc: 'Memória do projeto com wikilinks no Obsidian' },
  { file: 'docs/smart-memory/project/brand-tokens.md', desc: 'Tokens de marca em linguagem natural' },
  { file: 'docs/smart-memory/stories/BACKLOG.md', desc: 'Backlog de stories inicial' },
  { file: 'docs/design-system/tokens.md', desc: 'Design tokens completos: cores, tipografia, espaços' },
  { file: 'docs/design-system/design-system.css', desc: 'CSS custom properties prontos para uso' },
  { file: 'docs/design-system/tailwind.tokens.js', desc: 'Extensão do Tailwind com a sua marca' },
];

const EXTERNAL_LINKS = [
  { label: 'AIOX Core', display: 'github.com/SynkraAI/aiox-core', url: 'https://github.com/SynkraAI/aiox-core' },
  { label: 'Skills.sh', display: 'skills.sh', url: 'https://skills.sh' },
  { label: 'Claude Design', display: 'claude.ai/design', url: 'https://claude.ai/design' },
];

export default function EncerramentoPage() {
  return (
    <WorkshopPhaseLayout slug="encerramento">
      <p className="mb-8 text-base leading-relaxed text-white/70">
        Showcase individual e próximos passos. Cada participante compartilha a tela por 2 minutos
        e mostra o que construiu — do brand-brief ao componente no Claude Design.
      </p>

      <div
        className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}
      >
        15 min · Fase 07 de 07
      </div>

      <div
        className="my-8 p-6 text-center"
        style={{ border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.04)' }}
      >
        <p className="text-lg font-bold text-white" style={{ fontFamily: DISPLAY }}>
          Você criou um design system pessoal completo em menos de 1 hora.
        </p>
      </div>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">O que foi produzido</h2>
      <div className="space-y-2">
        {OUTPUT_FILES.map((item) => (
          <div
            key={item.file}
            className="flex gap-3 p-3"
            style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
          >
            <span
              className="flex-shrink-0 mt-0.5 text-xs font-bold"
              style={{ color: ACCENT, fontFamily: MONO }}
            >
              ✓
            </span>
            <div>
              <code className="block text-xs" style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.7)' }}>
                {item.file}
              </code>
              <p className="mt-0.5 text-xs text-white/45">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">Showcase — 2 min cada</h2>
      <p className="mb-4 text-sm text-white/60">Cada participante compartilha a tela e mostra:</p>
      <ol className="space-y-2 text-sm text-white/70">
        {[
          'O brand-brief.md — sua identidade de marca',
          'O grafo do Obsidian com as conexões criadas pelo Arquiteto',
          'Os tokens.md — paleta e tipografia da marca',
          'O componente gerado no Claude Design',
        ].map((item, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center text-[10px] font-bold border"
              style={{ fontFamily: MONO, color: ACCENT, borderColor: 'rgba(255,58,14,0.35)', background: 'rgba(255,58,14,0.06)' }}
            >
              {i + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">Links úteis</h2>
      <div className="space-y-2">
        {EXTERNAL_LINKS.map((item) => (
          <a
            key={item.label}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-baseline justify-between p-4 transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
          >
            <strong className="text-sm text-white">{item.label}</strong>
            <code className="text-xs text-white/40" style={{ fontFamily: MONO }}>
              {item.display}
            </code>
          </a>
        ))}
        <Link
          href="/workshop-1"
          className="flex items-baseline justify-between p-4 transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
        >
          <strong className="text-sm text-white">Workshop 1</strong>
          <code className="text-xs text-white/40" style={{ fontFamily: MONO }}>
            /workshop-1
          </code>
        </Link>
      </div>

      <Callout>
        O próximo passo é usar o design system num projeto real com AIOX. Você já tem os tokens,
        o CSS e o Tailwind — é só importar e construir. O squad de agentes continua disponível
        para evoluir cada peça do sistema.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
