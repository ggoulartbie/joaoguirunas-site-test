import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';
import { CodeBlock } from './_components/CodeBlock';

export const metadata: Metadata = {
  title: 'Como Criar um Brandbook com Claude Design',
  description:
    'Tutorial completo com os prompts exatos — do brief ao app React interativo. Logo, direção visual, tipografia e motion num dia.',
  alternates: { canonical: `${siteConfig.url}/learn/claude-design-brandbook` },
  openGraph: {
    title: 'Como Criar um Brandbook com Claude Design | João Guirunas',
    description:
      'Tutorial completo com os prompts exatos — do brief ao app React interativo. Logo, direção visual, tipografia e motion num dia.',
    url: `${siteConfig.url}/learn/claude-design-brandbook`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Como Criar um Brandbook com Claude Design | João Guirunas',
    description:
      'Tutorial completo com os prompts exatos — do brief ao app React interativo. Logo, direção visual, tipografia e motion num dia.',
  },
};

const features = [
  {
    title: 'Brief estruturado com personalidade',
    description:
      'Um documento de marca com adjetivos, referências visuais e tom de voz — a fundação de tudo. Sem isso, o Claude gera genérico.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>',
  },
  {
    title: 'Logo com sistema completo',
    description:
      'Símbolo, wordmark, variações de cor e regras de uso — não só um arquivo, um sistema construído sobre a personalidade da marca.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/>',
  },
  {
    title: '6 princípios de direção visual',
    description:
      'Regras que guiam cada decisão — cor, motion, contraste, hierarquia. Não decoração: arquitetura. Com demos antes/depois.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>',
  },
  {
    title: 'Tipografia com 3 pares explorados',
    description:
      'Display, body e mono testados ao vivo no browser — não em PDF estático. Com recomendação baseada nos adjetivos da marca.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>',
  },
  {
    title: 'Motion system — gramática, não enfeite',
    description:
      'Curvas de easing, durações e 6 scroll patterns cinematográficos. Cada pixel que se move tem intenção derivada da personalidade.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  },
  {
    title: 'App React interativo — não PDF',
    description:
      'O brandbook vira um app rodando no browser. Tipografia troca ao vivo, animações funcionam, paleta copia o hex com um clique.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>',
  },
];

const longDescription = [
  'Agência cobra até R$ 100 mil por um brandbook completo. Leva 4 meses. Com Claude Design, você faz em 1 dia. Não por atalho — por método. Este tutorial mostra o processo exato, com os prompts que usam, na sequência que funciona.',
  'O fluxo começa com um brief estruturado criado no Claude Code — personalidade, adjetivos, referências visuais, tom de voz. Esse arquivo alimenta o Claude Design, que gera logo, direção visual, tipografia e motion system. O resultado não é um PDF — é um app React interativo rodando no browser.',
  'Usei exatamente esse processo para refundar a identidade visual da GrowthSales.ai: logo redesenhado (diamante gradient #FF4400→#FF1A00, wordmark Geist 300, ".ai" em Fraunces itálico), 6 princípios de direção, 3 pares tipográficos, 6 scroll patterns cinematográficos e 42 ícones próprios. Custo fixo: a assinatura do Claude.',
];

// ── Prompts ──────────────────────────────────────────────────────────────────

const PROMPT_BRIEF = `Crie um arquivo docs/brand-brief.md para [nome da marca].

Preencha com base no que eu descrever abaixo:

EMPRESA
[descreva o que a empresa faz, para quem, e qual é o diferencial real]

PERSONALIDADE
5 adjetivos que definem a marca (ex: ousada, precisa, humana, técnica, premium)

ANTI-PERSONALIDADE
3 adjetivos que a marca NUNCA deve ser (ex: genérica, barulhenta, infantil)

REFERÊNCIAS VISUAIS
2-3 marcas cujo visual você admira e por quê (não precisa ser do mesmo setor)

TOM DE VOZ
Como a marca fala? (ex: direto como engenheiro experiente, não como vendedor)

COR PRIMÁRIA
Se já tem ideia: hex, nome ou descrição. Se não tem, deixar em aberto.

ONDE APARECE
Contextos de uso: site, redes sociais, vídeos, apresentações, etc.

Estruture em markdown com seções claras e comentários explicativos.
Esse arquivo será lido pelo Claude Design para gerar toda a identidade visual —
quanto mais específico, mais distante do template o resultado.`;

const PROMPT_LOGO = `Leia docs/brand-brief.md.

Crie o sistema de logo completo para a marca.

SÍMBOLO
- Geometria derivada dos adjetivos de personalidade — não forme genérica
- Construção sobre grid de 8×8 com linhas auxiliares visíveis
- Variação em cor primária com gradiente de assinatura (não cor sólida)
- Variação monocromática: branco sobre escuro, preto sobre claro

WORDMARK
- Nome da empresa em tipografia derivada da personalidade:
  Marca técnica → Geist ou Inter em peso 300-400, tracking -0.02em
  Marca premium → Fraunces ou Playfair em 300 italic, tracking wide
  Marca ousada → sans-serif em peso 700-900, tracking -0.04em
- Hierarquia de tamanhos: large (header) · medium (cards) · small (rodapé)
- Proporção entre símbolo e wordmark: regra numérica explícita

VARIAÇÕES DE USO
- Versão horizontal: símbolo + wordmark lado a lado
- Versão vertical: símbolo + wordmark empilhados
- Versão ícone: só símbolo (favicon, apps, avatar)
- Versão invertida: fundos escuros

ZONA DE PROTEÇÃO
- Espaço mínimo ao redor do logo nos três contextos
- Fundos proibidos com exemplo visual de erro
- Tamanho mínimo digital em pixels

Entregue como app React com fundo escuro,
mostrando todas as variações em tabs ou seções navegáveis.`;

const PROMPT_DIRECAO = `Leia docs/brand-brief.md.

Crie 6 princípios de direção visual que governam toda a identidade.
Para cada princípio:
- Nome de 2-4 palavras (ex: "Dark-first", "Precision over decoration")
- Uma frase de lei (ex: "O preto é palco, não fundo")
- Exemplo visual: componente antes/depois demonstrando o princípio
- Regra quantitativa quando aplicável (ex: "cor primária < 8% da área")

PRINCÍPIOS OBRIGATÓRIOS — derive de cada um a partir dos adjetivos do brief:

1. SUPERFÍCIE: qual é o fundo padrão da marca? (escuro/claro, textura, profundidade)
2. COR DE DESTAQUE: como e onde a cor primária aparece — quantidade, contexto, restrição
3. TIPOGRAFIA: peso e tracking como expressão de personalidade
4. ESPAÇO: o que o espaço vazio diz sobre a marca — use-o como elemento ativo
5. MOTION: como os elementos se movem — velocidade, easing, intenção narrativa
6. IMAGEM: linguagem fotográfica e estilo de ilustração/ícone

Entregue como guia visual interativo em React:
cada princípio com demo ao vivo do antes/depois, clicável.`;

const PROMPT_TIPOGRAFIA = `Leia docs/brand-brief.md.

Explore 3 pares tipográficos completos para a marca.
Para cada par:

PAR [N] — "[nome do par]"   (ex: "Técnico preciso" · "Sofisticado leve" · "Editorial ousado")

HEADING: [fonte] [peso] [tracking] — títulos H1 e H2
BODY:    [fonte] [peso] [line-height] — textos corridos
MONO:    [fonte] — códigos, labels e dados numéricos (se aplicável à marca)

HIERARQUIA COMPLETA
H1 → H2 → H3 → body → caption
com tamanhos em px e rem reais, não hipotéticos

PREVIEW EM CONTEXTO
- Fundo: cor de superfície da marca
- Headline: frase real derivada da personalidade da empresa
- Subtítulo + corpo: copy fictício consistente com o tom de voz do brief
- CTA: texto de botão no estilo da marca

Mostre os 3 pares em paralelo para comparação direta.
Ao final, recomende 1 como principal com justificativa
derivada de pelo menos 2 adjetivos do brand-brief.md.`;

const PROMPT_MOTION = `Leia docs/brand-brief.md.

Crie o sistema de motion da marca — não efeitos decorativos, mas gramática de movimento.

TOKENS DE MOTION
- 3 curvas de easing com cubic-bezier exato:
    Entrada: elementos aparecem (ease-out pronunciado)
    Saída: elementos somem (ease-in suave)
    Transição: mudança de estado (ease-in-out simétrico)
  Derive cada curva dos adjetivos: marca técnica → easing matemático;
  marca premium → easing quase físico, suave

- Durações: fast 150ms · base 250ms · slow 400ms · extra-slow 600ms
  Justifique cada duração pela personalidade

SCROLL PATTERNS (6 padrões)
Para cada padrão:
- Nome e metáfora visual (ex: "Revelação cinematográfica", "Grid que respira")
- Comportamento ao rolar: o que acontece, quando, com que velocidade
- Caso de uso: em qual seção da página esse padrão funciona
- Demo ao vivo com elemento animado

MICRO-INTERAÇÕES
- Botão: hover com transformação + timing exato
- Card: elevação + parallax sutil no hover
- Link: underline que cresce a partir do centro
- Input: focus ring com glow na cor primária

REGRA ANTI-ABUSO
- Máximo de elementos animados simultâneos
- Movimento proibido para esta marca específica e por quê

Entregue como app React onde cada pattern tem demo clicável ou ativado por scroll.`;

const PROMPT_BRANDBOOK = `Leia docs/brand-brief.md e todos os arquivos em docs/design-system/ (se existirem).

Crie o brandbook completo como app React interativo — não um PDF, um sistema vivo.

ESTRUTURA DO APP (8 seções)
1. HERO: nome da marca + adjetivos em destaque + fundo na cor de superfície da marca
2. LOGO: todas as variações com tabs (horizontal · vertical · ícone · invertido)
3. PALETA: swatches clicáveis que copiam o hex para o clipboard com feedback visual
4. TIPOGRAFIA: escala interativa — botões para trocar entre os 3 pares ao vivo
5. COMPONENTES: botão · card · input · badge com todos os estados em tabs
6. MOTION: demos ao vivo de scroll patterns e micro-interações com botão "replay"
7. DIREÇÃO VISUAL: 6 princípios com toggle antes/depois em cada um
8. DO / DON'T: 4 exemplos do que fazer e não fazer, com explicação de por quê

REQUISITOS TÉCNICOS
- CSS custom properties para todos os tokens (cor, tipografia, espaço, motion)
- React state para troca de tipografia e estados de componente
- IntersectionObserver para animações de entrada nas seções
- onClick copia hex para clipboard (Web Clipboard API)
- Responsivo: mobile-first, funciona em 375px e 1440px

ENTREGÁVEL
HTML/React completo que abre no browser sem build step.
Fontes via Google Fonts CDN.
Salve como docs/brandbook/index.html ou estruture em componentes React.`;

// ── Componentes internos ─────────────────────────────────────────────────────

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const ACCENT = 'var(--color-accent)';
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";

function Step({ n, label, children }: { n: number; label?: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 py-6 border-b border-white/[0.06] last:border-0">
      <span
        className="flex-shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center text-[11px] font-bold border"
        style={{
          fontFamily: MONO,
          color: ACCENT,
          borderColor: 'rgba(255,58,14,0.4)',
          background: 'rgba(255,58,14,0.06)',
        }}
      >
        {n}
      </span>
      <div className="text-sm leading-relaxed text-white/70 flex-1">
        {label && <strong className="block text-white mb-2 text-base">{label}</strong>}
        {children}
      </div>
    </div>
  );
}

function Callout({ label = 'Nota', children }: { label?: string; children: React.ReactNode }) {
  return (
    <div
      className="my-8 p-5 text-sm leading-relaxed text-white/80"
      style={{ borderLeft: `3px solid ${ACCENT}`, background: 'rgba(255,58,14,0.05)' }}
    >
      <span
        className="mb-2 block font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{ fontFamily: MONO, color: ACCENT }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function Deliverable({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 text-xs text-white/50">
      <span style={{ color: ACCENT }}>→</span>
      <span>{children}</span>
    </div>
  );
}

// ── Tutorial Section (children do SkillPage) ─────────────────────────────────

function TutorialSection() {
  return (
    <section
      className="py-20 sm:py-24"
      style={{ background: '#050507', borderTop: '1px solid rgba(255,255,255,0.07)' }}
      aria-labelledby="tutorial-heading"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-[140px]">
        {/* Header */}
        <div className="mb-14">
          <p
            className="mb-3 font-mono text-[11px] tracking-[0.16em] uppercase"
            style={{ fontFamily: MONO, color: 'rgba(255,58,14,0.8)' }}
          >
            Tutorial completo
          </p>
          <h2
            id="tutorial-heading"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-4"
            style={{ letterSpacing: '-0.02em', fontFamily: DISPLAY }}
          >
            Do brief ao app React — 6 prompts, 1 dia
          </h2>
          <p className="max-w-2xl text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Copie os prompts na ordem exata. Substitua os campos entre colchetes pela sua marca.
            Cada prompt pressupõe que o anterior foi executado.
          </p>
        </div>

        {/* Pré-requisitos */}
        <div
          className="mb-10 p-5"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e11' }}
        >
          <p
            className="mb-3 font-mono text-[10px] tracking-[0.16em] uppercase"
            style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.3)' }}
          >
            Pré-requisitos
          </p>
          <div className="space-y-1.5">
            {[
              'Claude Code instalado e configurado',
              'Assinatura Claude Pro ou acesso à API',
              'Claude Design em claude.ai/design (beta — habilite nas configurações)',
              'Uma pasta local para o projeto (ex: ~/Desktop/meu-brandbook)',
            ].map((item) => (
              <Deliverable key={item}>{item}</Deliverable>
            ))}
          </div>
        </div>

        {/* Steps */}
        <Step n={1} label="Crie o brief da marca (Claude Code)">
          <p className="mb-4 text-white/50">
            Abra o terminal na pasta do projeto e rode o Claude Code. O brief é o documento mais
            importante do processo — ele alimenta todos os prompts seguintes. Seja específico nos
            adjetivos e referências.
          </p>
          <CodeBlock label="claude code — brand-brief.md">{PROMPT_BRIEF}</CodeBlock>
          <div className="mt-4 space-y-1.5">
            {[
              'Arquivo docs/brand-brief.md criado',
              'Personalidade e adjetivos definidos',
              'Referências visuais documentadas',
              'Tom de voz especificado',
            ].map((item) => (
              <Deliverable key={item}>{item}</Deliverable>
            ))}
          </div>
        </Step>

        <Step n={2} label="Crie o sistema de logo (Claude Design)">
          <p className="mb-4 text-white/50">
            Abra o Claude Design, clique em <strong className="text-white/80">Open Folder</strong>{' '}
            e selecione a pasta do projeto. O Claude vai ler o brand-brief.md automaticamente.
            Cole o prompt abaixo na conversa.
          </p>
          <CodeBlock label="claude design — logo system">{PROMPT_LOGO}</CodeBlock>
          <div className="mt-4 space-y-1.5">
            {[
              'Símbolo construído sobre grid com linhas auxiliares',
              'Wordmark com tipografia derivada dos adjetivos',
              'Variações: horizontal · vertical · ícone · invertido',
              'Zona de proteção e fundos proibidos documentados',
            ].map((item) => (
              <Deliverable key={item}>{item}</Deliverable>
            ))}
          </div>
        </Step>

        <Step n={3} label="Defina os 6 princípios de direção visual (Claude Design)">
          <p className="mb-4 text-white/50">
            Na mesma conversa do Claude Design, cole o próximo prompt. Os princípios não são
            estética — são decisões arquiteturais que eliminam ambiguidade em todas as peças futuras.
          </p>
          <CodeBlock label="claude design — visual direction">{PROMPT_DIRECAO}</CodeBlock>
          <div className="mt-4 space-y-1.5">
            {[
              '6 princípios com nomes e regras quantitativas',
              'Demos antes/depois interativos para cada princípio',
              'Regras de superfície, cor, tipografia, espaço, motion e imagem',
            ].map((item) => (
              <Deliverable key={item}>{item}</Deliverable>
            ))}
          </div>
          <Callout label="Por que 6 princípios">
            Um princípio por domínio visual elimina "achismo" em cada decisão futura. Quando alguém
            pergunta "pode usar o laranja aqui?", a resposta não é opinião — é o princípio 2.
          </Callout>
        </Step>

        <Step n={4} label="Explore os pares tipográficos (Claude Design)">
          <p className="mb-4 text-white/50">
            Tipografia é personalidade traduzida em pixels. O prompt gera 3 pares completos e
            os mostra ao vivo — você vê no browser como cada combinação sente antes de decidir.
          </p>
          <CodeBlock label="claude design — typography">{PROMPT_TIPOGRAFIA}</CodeBlock>
          <div className="mt-4 space-y-1.5">
            {[
              '3 pares tipográficos completos com hierarquia H1 → caption',
              'Preview em contexto real com copy da marca',
              'Comparação lado a lado com recomendação justificada',
            ].map((item) => (
              <Deliverable key={item}>{item}</Deliverable>
            ))}
          </div>
        </Step>

        <Step n={5} label="Defina a gramática de motion (Claude Design)">
          <p className="mb-4 text-white/50">
            Motion system não é "adicionar animação" — é definir como a marca se move. Uma marca
            técnica tem easing matemático. Uma marca premium tem easing quase físico. Isso é o que
            diferencia motion de decoração.
          </p>
          <CodeBlock label="claude design — motion system">{PROMPT_MOTION}</CodeBlock>
          <div className="mt-4 space-y-1.5">
            {[
              'Tokens de easing com cubic-bezier exato',
              'Durações: fast · base · slow · extra-slow',
              '6 scroll patterns cinematográficos com demos',
              'Micro-interações: botão · card · link · input',
              'Regra anti-abuso: o que esta marca nunca faz',
            ].map((item) => (
              <Deliverable key={item}>{item}</Deliverable>
            ))}
          </div>
        </Step>

        <Step n={6} label="Gere o brandbook completo como app React (Claude Design)">
          <p className="mb-4 text-white/50">
            O prompt final sintetiza tudo num app React interativo. Não um PDF estático — um sistema
            vivo onde a tipografia troca ao vivo, a paleta copia o hex com um clique e as animações
            funcionam de verdade no browser.
          </p>
          <CodeBlock label="claude design — brandbook react app">{PROMPT_BRANDBOOK}</CodeBlock>
          <div className="mt-4 space-y-1.5">
            {[
              'App React completo rodando no browser sem build step',
              'Tipografia interativa: troca entre 3 pares com um clique',
              'Paleta com copy de hex ao clicar nos swatches',
              'Componentes com todos os estados em tabs',
              'Motion demos com replay e scroll animations',
              'Do / Don\'t com 4 exemplos de cada',
            ].map((item) => (
              <Deliverable key={item}>{item}</Deliverable>
            ))}
          </div>
        </Step>

        {/* Callout final */}
        <Callout label="O segredo do método">
          Agência faz isso em 4 meses porque depende de aprovações em camadas, workshops de
          alinhamento e ciclos de revisão. Com Claude Design, o ciclo de feedback é imediato —
          você vê o resultado no browser, ajusta o prompt, vê de novo. O que muda não é a
          qualidade: é a velocidade de iteração. O custo fixo é a assinatura do Claude.
        </Callout>

        {/* Resultado real */}
        <div
          className="mt-8 p-6"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e11' }}
        >
          <p
            className="mb-4 font-mono text-[10px] tracking-[0.16em] uppercase"
            style={{ fontFamily: MONO, color: 'rgba(255,58,14,0.8)' }}
          >
            Resultado real — GrowthSales.ai
          </p>
          <p className="text-sm text-white/60 leading-relaxed mb-4">
            Usando exatamente esse processo, em 1 dia, saíram:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
            {[
              'Logo redesenhado com sistema completo de variações',
              '6 princípios de direção visual documentados',
              'Diamante gradient #FF4400→#FF1A00 como símbolo',
              'Tipografia: Geist 300 + Fraunces itálico como par principal',
              '6 scroll patterns cinematográficos com vídeo integrado',
              '6 roteiros de vídeo com storyboard frame-a-frame',
              'Prompts de fotografia prontos para uso',
              '42 ícones próprios no estilo da marca',
            ].map((item) => (
              <Deliverable key={item}>{item}</Deliverable>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ClaudeDesignBrandbookPage() {
  return (
    <SkillPage
      title="Brandbook com Claude Design"
      description="Tutorial completo com os prompts exatos — do brief ao app React interativo. Logo, direção visual, tipografia e motion num dia."
      category="Aprendizado"
      categoryColor="aprendizado"
      longDescription={longDescription}
      features={features}
      primaryLink="https://claude.ai/design"
      primaryLabel="Abrir Claude Design"
      isExternal
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/learn/claude-design-brandbook"
    >
      <TutorialSection />
    </SkillPage>
  );
}
