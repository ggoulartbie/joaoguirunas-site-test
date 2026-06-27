export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { RelatedPages } from '@/shared/components/ui/RelatedPages';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Site Profissional com Claude Code + Google Stitch',
  description:
    'Como usar o Google Stitch (gratuito) com Claude Code via MCP para criar sites profissionais sem contratar designer. Do brief ao código de produção em minutos.',
  alternates: { canonical: `${siteConfig.url}/learn/google-stitch` },
  openGraph: {
    title: 'Site Profissional com Claude Code + Google Stitch | João Guirunas',
    description:
      'Como usar o Google Stitch (gratuito) com Claude Code via MCP para criar sites profissionais sem contratar designer. Do brief ao código de produção em minutos.',
    url: `${siteConfig.url}/learn/google-stitch`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Site Profissional com Claude Code + Google Stitch | João Guirunas',
    description:
      'Como usar o Google Stitch (gratuito) com Claude Code via MCP para criar sites profissionais sem contratar designer. Do brief ao código de produção em minutos.',
  },
};

const features = [
  {
    title: 'Descreva em português',
    description:
      'Abre o Stitch e descreve o teu site ou app em português. Joga referências visuais do Pinterest, Instagram ou qualquer lugar — funciona direto.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>',
  },
  {
    title: 'Design completo em segundos',
    description:
      'O Stitch gera o design completo: todas as telas, sistema de cores, tipografia. Não é um template genérico — é gerado a partir do teu brief.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/>',
  },
  {
    title: 'Export via MCP',
    description:
      'Clica em Exportar, escolhe a opção MCP e copia o código de configuração. Essa integração é o que diferencia o Stitch de qualquer outra ferramenta de design.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>',
  },
  {
    title: 'Claude acessa os designs',
    description:
      'Cola o código no terminal do Claude Code. A partir daí, o Claude tem acesso direto a todos os designs — sem exportar PNGs, sem reexplicar a paleta.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"/>',
  },
  {
    title: 'Prompt → código de produção',
    description:
      'Com o prompt certo, Claude transforma o design em código funcionando: animações, transições, telas conectadas. Tudo em produção.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  },
  {
    title: 'Zero custo fixo',
    description:
      'Sem designer. Sem agência. Sem mensalidade. Duas ferramentas gratuitas integradas via MCP substituem R$2.000–5.000 por mês em contratação.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>',
  },
];

const longDescription = [
  'Noventa por cento dos empresários que usam Claude Code travam no mesmo lugar: o código funciona, mas o visual parece amador. Contratar um designer custa entre R$2.000 e R$5.000 por mês — custo fixo alto para quem está validando um produto ou tem uma operação enxuta.',
  'O Google Stitch resolve isso de forma gratuita. Você descreve o site ou app em português, joga referências visuais do Pinterest ou Instagram, e em segundos o Stitch gera o design completo: todas as telas, sistema de cores, tipografia — tudo.',
  'A integração via MCP é o que fecha o ciclo. Ao exportar com a opção MCP, o Claude Code recebe acesso direto a todos os designs — sem exportar imagens, sem explicar paleta, sem reunião de alinhamento. Com o prompt certo, ele transforma o design em código de produção: animações, transições e telas conectadas funcionando.',
];

const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.72rem',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  fontWeight: 500,
};

const steps = [
  {
    number: '01',
    title: 'Criar o design no Stitch',
    description: 'Acesse stitch.withgoogle.com e crie um novo projeto. Descreva o seu site em português — o que é, para quem é, o tom que quer transmitir. Adicione referências visuais: screenshots de sites que te inspiram, paletas do Pinterest, exemplos do Instagram.',
    tip: 'Quanto mais específico o brief, mais alinhado o design. "Site de consultoria de IA para PMEs, tom sério mas acessível, azul marinho e cinza" gera resultado melhor que "site profissional".',
  },
  {
    number: '02',
    title: 'Exportar via MCP',
    description: 'Quando o design estiver pronto, clica em Exportar no canto superior direito. Escolhe a opção MCP (não PNG, não Figma — MCP). O Stitch vai gerar um bloco de configuração JSON. Copia esse código.',
    tip: 'A opção MCP só aparece na versão web do Stitch. Se não estiver visível, certifique-se de que o design tem pelo menos uma tela concluída.',
  },
  {
    number: '03',
    title: 'Conectar ao Claude Code',
    description: 'Abre o terminal e navega até a pasta do teu projeto. Cola o código de configuração MCP no arquivo de settings do Claude Code (ou usa o comando de instalação que o Stitch fornece). O Claude vai confirmar quando a conexão estiver ativa.',
    prompt: `# Cole no terminal após copiar o código MCP do Stitch:
npx @anthropic-ai/claude-code mcp install [código-do-stitch]

# Confirma a instalação:
claude mcp list`,
  },
  {
    number: '04',
    title: 'Gerar o código com o prompt certo',
    description: 'Com o MCP conectado, abra o Claude Code e use o prompt abaixo. O Claude vai acessar os designs do Stitch diretamente e transformá-los em código de produção — componentes React, estilos, animações e navegação.',
    prompt: `Leia os designs conectados via MCP do Stitch.

Com base nas telas disponíveis, implemente o site completo:

1. Estrutura de rotas (uma por tela do Stitch)
2. Componentes React para cada seção — header, hero, cards, footer
3. Sistema de cores e tipografia exatamente como no design
4. Transições entre telas
5. Animações de entrada dos elementos (fade-in, slide-up)
6. Responsivo: mobile-first, breakpoints sm/md/lg

Use Tailwind CSS. Zero valores hardcoded — usa as variáveis CSS dos tokens do design.
Começa pela tela principal e vai descendo na hierarquia.`,
  },
];

export default function GoogleStitchPage() {
  return (
    <>
      <SkillPage
        title="Site Profissional com Claude Code + Google Stitch"
        description="Como usar o Google Stitch (gratuito) com Claude Code via MCP para criar sites profissionais sem contratar designer. Do brief ao código de produção em minutos."
        category="Aprendizado"
        categoryColor="#FF3A0E"
        longDescription={longDescription}
        features={features}
        showMentoria
        author="@joaoguirunas"
        bgImage="/images/bg-designer.png"
        bgPosition="center 30%"
        canonicalPath="/learn/google-stitch"
      >
        {/* ── Guia passo a passo ── */}
        <section
          className="py-16 sm:py-24"
          style={{ background: '#050507', borderTop: '1px solid rgba(255,255,255,0.07)' }}
          aria-labelledby="guide-heading"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-[140px]">
            <div className="mb-10 sm:mb-14">
              <p className="mb-3" style={{ ...MONO, color: 'rgba(255,58,14,0.8)' }}>Guia completo</p>
              <h2
                id="guide-heading"
                className="text-2xl sm:text-3xl font-semibold text-white tracking-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                Do zero ao site em 4 passos
              </h2>
            </div>

            <div className="space-y-px" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row gap-6 sm:gap-10 p-6 sm:p-8"
                  style={{
                    background: '#0e0e11',
                    borderBottom: i < steps.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  }}
                >
                  {/* Step number */}
                  <div className="flex-shrink-0">
                    <span
                      className="inline-block"
                      style={{
                        ...MONO,
                        fontSize: '0.65rem',
                        color: '#FF3A0E',
                        border: '1px solid rgba(255,58,14,0.3)',
                        padding: '4px 10px',
                        letterSpacing: '0.16em',
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-base sm:text-lg font-semibold text-white mb-3 tracking-tight"
                      style={{ letterSpacing: '-0.015em' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm sm:text-base leading-relaxed mb-4"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      {step.description}
                    </p>

                    {step.tip && (
                      <div
                        className="flex gap-3 p-4"
                        style={{
                          background: 'rgba(255,58,14,0.04)',
                          border: '1px solid rgba(255,58,14,0.15)',
                        }}
                      >
                        <span style={{ color: '#FF3A0E', flexShrink: 0, ...MONO, fontSize: '0.6rem', paddingTop: 2 }}>
                          DICA
                        </span>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                          {step.tip}
                        </p>
                      </div>
                    )}

                    {step.prompt && (
                      <div
                        className="mt-4 overflow-x-auto"
                        style={{
                          background: '#16161a',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        <div
                          className="flex items-center gap-2 px-4 py-2.5"
                          style={{
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                            background: 'rgba(255,255,255,0.02)',
                          }}
                        >
                          <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
                          </div>
                          <span style={{ ...MONO, fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)' }}>
                            terminal
                          </span>
                        </div>
                        <pre
                          className="p-4 text-xs leading-relaxed overflow-x-auto"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            color: 'rgba(255,255,255,0.72)',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                          }}
                        >
                          {step.prompt}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Resultado esperado ── */}
        <section
          className="py-14 sm:py-20"
          style={{ background: '#0e0e11', borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-[140px]">
            <div className="max-w-2xl">
              <p className="mb-4" style={{ ...MONO, color: 'rgba(255,58,14,0.8)' }}>O que você terá</p>
              <h2
                className="text-2xl sm:text-3xl font-semibold text-white mb-8 tracking-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                Site profissional. Sem designer. Sem agência.
              </h2>
              <ul className="space-y-4">
                {[
                  'Design gerado a partir do teu brief — não um template genérico',
                  'Código React completo com componentes reutilizáveis',
                  'Sistema de cores e tipografia consistente em todas as telas',
                  'Animações e transições funcionando em produção',
                  'Responsivo desde a primeira versão',
                  'Custo: R$ 0 em design + tempo do Claude Code',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ background: '#FF3A0E' }}
                      aria-hidden="true"
                    />
                    <span className="text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <RelatedPages
          pages={[
            {
              href: '/setup/claude-code',
              title: 'Setup Claude Code',
              description: 'Guia completo de configuração do Claude Code — do básico ao expert. Pré-requisito para usar o MCP do Stitch.',
              tag: 'Skills',
            },
            {
              href: '/skills/website-builder',
              title: 'Website Builder',
              description: 'Crie sites completos com Claude Code e componentes do 21st.dev. Outra abordagem para sites profissionais sem experiência prévia.',
              tag: 'Skills',
            },
            {
              href: '/learn/claude-design-brandbook',
              title: 'Brandbook com Claude Design',
              description: 'Fluxo completo para criar identidade visual — brief, design system, KV e app React interativo em um dia.',
              tag: 'Aprendizado',
            },
          ]}
        />
      </SkillPage>
    </>
  );
}
