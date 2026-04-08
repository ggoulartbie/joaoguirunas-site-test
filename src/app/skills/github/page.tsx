import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui';

export const metadata: Metadata = {
  title: 'GitHub',
  description:
    'Integracao completa com GitHub. Repositorios, PRs, Issues e Actions para workflow de desenvolvimento.',
  openGraph: {
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: '/skills/github',
  },
};

const features = [
  {
    title: 'Repositorios',
    description:
      'Gerenciamento completo de repositorios. Criacao, clonagem, branches e configuracao de settings diretamente do terminal.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/>',
  },
  {
    title: 'Pull Requests',
    description:
      'Criacao e revisao de PRs com templates, labels e assignees. Merge strategies e branch protection rules.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>',
  },
  {
    title: 'Issues',
    description:
      'Tracking de bugs e features com labels, milestones e projetos. Integracao com stories AIOX para rastreabilidade.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>',
  },
  {
    title: 'Actions CI/CD',
    description:
      'Workflows automatizados para build, test e deploy. Pipelines customizaveis com matrix builds e caching.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"/>',
  },
  {
    title: 'Code Review',
    description:
      'Revisao de codigo com comentarios inline, suggestions e aprovacoes. Integracao com CodeRabbit para review automatico.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>',
  },
  {
    title: 'Collaboration',
    description:
      'Trabalho em equipe com teams, permissions e CODEOWNERS. Notificacoes, mentions e discussions integradas.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>',
  },
];

const longDescription = [
  'GitHub e a integracao central do workflow de desenvolvimento AIOX. Repositorios, pull requests, issues e actions formam a espinha dorsal de todo o ciclo de desenvolvimento, desde a criacao de stories ate o deploy em producao.',
  'Com GitHub CLI (gh) integrado ao Claude Code, operacoes como criacao de PRs, revisao de codigo e gerenciamento de issues acontecem diretamente do terminal. O agente @devops tem autoridade exclusiva para push e PR creation, garantindo governanca e qualidade.',
  'GitHub Actions automatizam pipelines de CI/CD com builds, testes e deploys configuraveis. Combinado com CodeRabbit para code review automatizado e branch protection rules, cada mudanca passa por validacao rigorosa antes de chegar a producao.',
];

export default function GitHubPage() {
  return (
    <SkillPage
      title="GitHub"
      description="Integracao completa com GitHub. Repositorios, PRs, Issues e Actions para workflow de desenvolvimento."
      category="Integracoes"
      categoryColor="integracoes"
      longDescription={longDescription}
      features={features}
      primaryLink="https://skills.sh/github/awesome-copilot/gh-cli"
      primaryLabel="Ver Skill no skills.sh"
      author="GitHub"
      authorUrl="https://github.com/github"
      bgImage="/images/bg-github.png"
      canonicalPath="/skills/github"
    >
      <section className="py-20 bg-[#0A0A0F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9] mb-3">
              Tutorial
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-8">
              GitHub CLI no Terminal
            </h2>
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  1. Instalar GitHub CLI
                </h3>
                <pre className="bg-black/50 p-4 text-sm text-green-400 overflow-x-auto">
                  <code>{`# macOS
brew install gh

# Windows
winget install --id GitHub.cli

# Linux (Debian/Ubuntu)
sudo apt install gh`}</code>
                </pre>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  2. Autenticacao
                </h3>
                <pre className="bg-black/50 p-4 text-sm text-green-400 overflow-x-auto">
                  <code>{`# Login interativo
gh auth login

# Verificar status
gh auth status`}</code>
                </pre>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  3. Repositorios
                </h3>
                <pre className="bg-black/50 p-4 text-sm text-green-400 overflow-x-auto">
                  <code>{`# Criar novo repo
gh repo create meu-projeto --public

# Clonar repo
gh repo clone usuario/repo

# Ver info do repo
gh repo view`}</code>
                </pre>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  4. Pull Requests
                </h3>
                <pre className="bg-black/50 p-4 text-sm text-green-400 overflow-x-auto">
                  <code>{`# Criar PR
gh pr create --title "feat: nova feature" --body "Descricao"

# Listar PRs abertas
gh pr list

# Ver PR especifica
gh pr view 123

# Fazer checkout de uma PR
gh pr checkout 123

# Merge PR
gh pr merge 123 --squash`}</code>
                </pre>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">5. Issues</h3>
                <pre className="bg-black/50 p-4 text-sm text-green-400 overflow-x-auto">
                  <code>{`# Criar issue
gh issue create --title "Bug: ..." --label bug

# Listar issues
gh issue list --state open

# Fechar issue
gh issue close 42`}</code>
                </pre>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  6. GitHub Actions
                </h3>
                <pre className="bg-black/50 p-4 text-sm text-green-400 overflow-x-auto">
                  <code>{`# Ver workflows
gh workflow list

# Ver runs recentes
gh run list

# Ver detalhes de uma run
gh run view 12345

# Re-executar workflow
gh run rerun 12345

# Ver logs
gh run view 12345 --log`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SkillPage>
  );
}
