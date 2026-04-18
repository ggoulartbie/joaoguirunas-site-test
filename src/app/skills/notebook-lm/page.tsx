import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Claude Code + NotebookLM',
  description:
    'O maior hack de 2026. Combine Claude Code com NotebookLM como sistema RAG gratuito e potente.',
  alternates: { canonical: `${siteConfig.url}/skills/notebook-lm` },
  openGraph: {
    title: 'Claude Code + NotebookLM | João Guirunas',
    description:
      'O maior hack de 2026. Combine Claude Code com NotebookLM como sistema RAG gratuito e potente.',
    url: `${siteConfig.url}/skills/notebook-lm`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Claude Code + NotebookLM | João Guirunas',
    description:
      'O maior hack de 2026. Combine Claude Code com NotebookLM como sistema RAG gratuito e potente.',
  },
};

const features = [
  {
    title: 'RAG Gratuito do Google',
    description:
      'NotebookLM é um sistema RAG do Google sem custo — sem precisar montar infraestrutura própria.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>',
  },
  {
    title: 'Upload de PDFs, Vídeos e Sites',
    description:
      'Jogue qualquer fonte no NotebookLM — PDFs, vídeos do YouTube, sites, documentos — e ele vira especialista.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>',
  },
  {
    title: 'Skill de Integração via Playwright',
    description:
      'Script Playwright que conecta o Claude Code ao NotebookLM de forma programática — sem API pública necessária.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/>',
  },
  {
    title: 'Agente de Pesquisa Potente',
    description:
      'Claude Code puxa contexto do NotebookLM e executa tarefas — criar copy, montar estratégia, responder com precisão.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>',
  },
  {
    title: 'Podcasts, Slides e Mapas Mentais',
    description:
      'NotebookLM gera podcasts, apresentações e mapas mentais a partir do conteúdo carregado.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/>',
  },
  {
    title: 'Zero Custo Extra de Infraestrutura',
    description:
      'Dois minutos para configurar — sem servidor, sem banco de dados, sem embedding model próprio.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/>',
  },
];

const longDescription = [
  'O NotebookLM é um sistema RAG gratuito do Google — você joga PDFs, vídeos, sites e documentos e ele vira especialista naquele conteúdo, gerando podcasts, mapas mentais e respostas contextuais. O problema: não tem API pública.',
  'A solução é o repositório notebooklm-pi, que roda um script Playwright para usar o NotebookLM de forma programática. Ele inclui uma skill para o Claude Code, ensinando o agente a usar o script diretamente do terminal.',
  'O resultado é um agente de pesquisa absurdamente potente: você passa o contexto no NotebookLM, o Claude Code puxa esse conhecimento e executa tarefas — criar copy, montar estratégia, responder com contexto do projeto. Leva dois minutos para configurar.',
];

export default function NotebookLmPage() {
  return (
    <SkillPage
      title="Claude Code + NotebookLM"
      description="O maior hack de 2026. Combine Claude Code com NotebookLM como sistema RAG gratuito e potente."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://notebooklm.google.com"
      primaryLabel="Acessar NotebookLM"
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/skills/notebook-lm"
    />
  );
}
