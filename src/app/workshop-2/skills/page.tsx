import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';
import { ExternalLink } from '../_components/ExternalLink';

export const metadata: Metadata = {
  title: 'Fase 02 — Skills | Workshop 2',
  description: 'Instalar o skill do Obsidian para que o Claude conheça todo o padrão de smart-memory: wikilinks, frontmatter, canvas e bases.',
  alternates: { canonical: '/workshop-2/skills' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const ACCENT = 'var(--color-accent)';

function Callout({ label = 'Dica', children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="my-8 p-5 text-sm leading-relaxed text-white/80" style={{ borderLeft: `3px solid ${ACCENT}`, background: 'rgba(255,58,14,0.05)' }}>
      <span className="mb-2 block font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, color: ACCENT }}>{label}</span>
      {children}
    </div>
  );
}

const INSTALL_NPX = `npx skills add git@github.com:kepano/obsidian-skills.git`;

const INSTALL_PLUGIN_1 = `/plugin marketplace add kepano/obsidian-skills`;
const INSTALL_PLUGIN_2 = `/plugin install obsidian@obsidian-skills`;

const VERIFY = `/obsidian-markdown

Crie um arquivo de teste em docs/smart-memory/test.md com:
- Frontmatter YAML completo (title, tags, tipo)
- Um wikilink [[outro-arquivo]]
- Um callout do tipo tip
- Uma propriedade de data

Após criar, delete o arquivo.`;

const SKILLS_LIST = [
  {
    name: 'obsidian-markdown',
    desc: 'Markdown com sintaxe Obsidian: wikilinks [[assim]], embeds ![[assim]], callouts, frontmatter YAML, tags aninhadas, comentários %% %%, LaTeX e Mermaid.',
  },
  {
    name: 'obsidian-bases',
    desc: 'Arquivos .base — banco de dados no Obsidian. Views (tabela, cards, lista, mapa), filtros AND/OR/NOT, fórmulas, agregações e propriedades computadas.',
  },
  {
    name: 'json-canvas',
    desc: 'Arquivos .canvas — canvas visual do Obsidian. Nós (texto, arquivo, link, grupo), arestas, posicionamento e cores. Útil para mapas mentais e fluxogramas.',
  },
  {
    name: 'obsidian-cli',
    desc: 'Interação com instâncias Obsidian em execução via CLI: ler, criar, buscar notas, recarregar plugins, inspecionar DOM e capturar erros.',
  },
  {
    name: 'defuddle',
    desc: 'Extrai markdown limpo de páginas web com `defuddle parse <url> --md` — alternativa ao WebFetch com menos ruído e menos tokens.',
  },
];

export default function SkillsPage() {
  return (
    <WorkshopPhaseLayout slug="skills">
      <FacilitatorNote duration="5 min">
        Esta é a fase mais curta — 2 comandos e o skill está instalado. Explique o conceito antes de rodar: skills são documentos de contexto que o Claude lê antes de executar tarefas. O skill do Obsidian ensina toda a sintaxe de wikilinks, frontmatter e canvas — sem isso, o Arquiteto pode gerar markdown inválido ou wikilinks quebrados.
      </FacilitatorNote>

      <p className="mb-8 text-base leading-relaxed text-white/70">
        Antes de criar a smart-memory, vamos dar ao Claude o contexto completo de como o Obsidian funciona. O skill de Steph Ango (criador do Obsidian) ensina 5 capacidades: markdown, bases, canvas, CLI e extração de conteúdo web. Com o skill instalado, o Arquiteto vai gerar arquivos com sintaxe válida, wikilinks corretos e frontmatter completo.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        5 min · Fase 02 de 09
      </div>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">O que são skills</h2>
      <p className="mb-6 text-sm leading-relaxed text-white/65">
        Skills são documentos de contexto estruturados que o Claude lê antes de executar tarefas específicas. Diferente de um prompt genérico, um skill contém a especificação técnica completa de uma ferramenta — sintaxe, exemplos, casos de uso e regras. O Claude não precisa adivinhar como o Obsidian funciona: ele lê o <InlineCode>SKILL.md</InlineCode> e conhece tudo.
      </p>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">Instalar — escolha uma opção</h2>

      <div className="space-y-4">
        <div className="p-4" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
          <p className="mb-2 font-mono text-[10px] tracking-[0.15em] uppercase text-white/40" style={{ fontFamily: MONO }}>Opção A — via npx (terminal, fora do Claude Code)</p>
          <CodeBlock label="terminal">{INSTALL_NPX}</CodeBlock>
        </div>

        <div className="p-4" style={{ border: '1px solid rgba(255,58,14,0.2)', background: 'rgba(255,58,14,0.03)' }}>
          <p className="mb-2 font-mono text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: MONO, color: ACCENT }}>Opção B — via plugin marketplace (dentro do Claude Code)</p>
          <CodeBlock label="claude code — passo 1">{INSTALL_PLUGIN_1}</CodeBlock>
          <CodeBlock label="claude code — passo 2">{INSTALL_PLUGIN_2}</CodeBlock>
        </div>
      </div>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">Verificar que o skill está ativo</h2>
      <p className="mb-3 text-sm text-white/60">Após instalar, teste o skill com este prompt no Claude Code:</p>
      <CodeBlock label="claude code — verificação">{VERIFY}</CodeBlock>
      <p className="mt-2 text-sm text-white/50">Se o arquivo criado tiver frontmatter válido, wikilink e callout corretos — o skill está funcionando. Delete o arquivo de teste antes de continuar.</p>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">5 skills instalados</h2>
      <div className="space-y-2">
        {SKILLS_LIST.map((s) => (
          <div key={s.name} className="p-4" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <InlineCode>{s.name}</InlineCode>
            <p className="mt-1.5 text-xs leading-relaxed text-white/50">{s.desc}</p>
          </div>
        ))}
      </div>

      <Callout label="Por que instalar antes do Arquiteto">
        O Arquiteto vai criar 5 arquivos interligados com wikilinks, frontmatter YAML e callouts — estruturas específicas do Obsidian. Sem o skill, o Claude usa sintaxe genérica de markdown e pode gerar links quebrados ou frontmatter inválido. Com o skill instalado, ele conhece exatamente o formato que o Obsidian espera — e o grafo vai funcionar na primeira tentativa.
      </Callout>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">Repositório</h2>
      <ExternalLink
        href="https://github.com/kepano/obsidian-skills"
        label="kepano/obsidian-skills"
        display="github.com/kepano/obsidian-skills"
        note="Por Steph Ango, criador do Obsidian · MIT License · 5 skills"
      />
    </WorkshopPhaseLayout>
  );
}
