import { ContentPost } from '@/types/content-post'

export const batch3: ContentPost[] = [
  {
    slug: 'prompts-de-sites-3d-animados-no-claude',
    data: '2026-06-23',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Prompts de Sites 3D Animados no Claude',
    ferramenta: 'MotionSites.Ai',
    link: 'https://motionsites.ai',
    keyword_cta: 'SITE',
    pilar: 'Produção de Conteúdo com IA',
    duracao: '41s',

    // ── Tutorial ──
    categoryId: 'apps',
    author: '@joaoguirunas',
    primaryLink: 'https://motionsites.ai',
    primaryLabel: 'Abrir MotionSites.Ai',
    isExternal: true,
    sourceUrl: 'https://motionsites.ai',
    longDescription: [
      'MotionSites.Ai é uma biblioteca premium de prompts de design para IA — hero sections, fundos animados, gradientes e templates de página prontos para colar direto no seu assistente de código. Em vez de descrever uma landing page do zero, você parte de um bloco já desenhado e só ajusta o conteúdo ao seu projeto.',
      'Cada item da biblioteca traz uma base sólida de layout, hierarquia tipográfica e animação. A ideia é eliminar o ponto onde a maioria dos sites gerados por IA falha: o resultado genérico. Você escolhe um estilo que combina com SaaS, portfólio ou agência, copia o prompt e o Claude Code constrói as seções completas a partir dele.',
      'Não é uma biblioteca de código aberto nem um pacote npm — é um catálogo curado de prompts e templates. O fluxo é copiar, colar no Claude Code, descrever o site e deixar a IA montar a página, pronta para deploy.',
    ],
    features: [
      {
        title: 'Hero sections prontas',
        description: 'Blocos de abertura de alto padrão para SaaS, portfólio, agência e produto digital — com layout e animação já incluídos.',
        icon: 'layout',
      },
      {
        title: 'Fundos animados e gradientes',
        description: 'Backgrounds com movimento e sistemas de cor coerentes que dão profundidade sem você escrever CSS manual.',
        icon: 'design',
      },
      {
        title: 'Prompts copy-paste',
        description: 'Cada template é um prompt pronto: você copia, cola no Claude Code e descreve o site por cima da base.',
        icon: 'copywriting',
      },
      {
        title: 'Animação de scroll',
        description: 'As bases já carregam micro-interações e transições de seção que funcionam — a página deixa de parecer estática.',
        icon: 'animejs',
      },
      {
        title: 'Saída pronta para deploy',
        description: 'O Claude entrega seções completas em código real, prontas para subir no Vercel em segundos.',
        icon: 'deploy',
      },
      {
        title: 'Sem dependência de dev ou designer',
        description: 'O ponto difícil — o design premium — vem do template. Você foca no conteúdo e na descrição do projeto.',
        icon: 'website',
      },
    ],
    body: [
      {
        type: 'paragraph',
        text: 'O objetivo é sair de um template premium do MotionSites.Ai para um site no ar, sem escrever HTML, CSS ou JavaScript na mão. O trabalho pesado de design já está no prompt; o seu papel é descrever o projeto e ajustar o conteúdo.',
      },
      {
        type: 'heading',
        text: '1. Escolha o template no MotionSites.Ai',
      },
      {
        type: 'steps',
        items: [
          'Abra motionsites.ai e navegue pela biblioteca de hero sections, fundos animados e templates.',
          'Filtre pelo tipo de projeto que você quer construir — SaaS, portfólio, agência ou produto.',
          'Selecione o estilo que mais combina com a identidade do seu site e copie o prompt correspondente.',
        ],
      },
      {
        type: 'heading',
        text: '2. Cole o prompt no Claude Code',
      },
      {
        type: 'paragraph',
        text: 'Com um projeto Next.js ou React já aberto no Claude Code, cole o prompt do template e descreva, em PT-BR, o que o site precisa: nome do produto, headline, seções e tom visual.',
      },
      {
        type: 'code',
        language: 'text',
        code: `[cole aqui o prompt copiado do MotionSites.Ai]

Use este estilo como base e construa a landing page de um
SaaS de gestão financeira chamado "Fluxo". Headline focada
em controle de caixa em tempo real. Inclua hero, seção de
recursos, prova social e CTA final. Animações de scroll suaves.`,
      },
      {
        type: 'heading',
        text: '3. Revise e refine',
      },
      {
        type: 'steps',
        items: [
          'Rode o projeto localmente e veja o resultado renderizado no navegador.',
          'Peça ajustes pontuais ao Claude — espaçamento, copy, paleta — em linguagem natural.',
          'Repita até o layout, a tipografia e as animações estarem do jeito que você quer.',
        ],
      },
      {
        type: 'heading',
        text: '4. Faça o deploy no Vercel',
      },
      {
        type: 'steps',
        items: [
          'Suba o repositório para o GitHub.',
          'Importe o projeto no Vercel e conecte o repositório.',
          'Confirme o build e publique — o site fica no ar com URL própria em segundos.',
        ],
      },
      {
        type: 'callout',
        text: 'MotionSites.Ai é um produto premium: a biblioteca de prompts é paga. Verifique os planos atuais no site antes de assinar — o que é gratuito pode mudar com o tempo.',
      },
    ],
  },
  {
    slug: 'antes-e-depois-site-generico-para-premium',
    data: '2026-06-20',
    slot: 'B',
    formato: 'Carrossel',
    titulo: 'Antes e Depois — Site Genérico para Premium',
    ferramenta: 'Claude Code + skills de design (antes/depois)',
    link: 'https://claude.ai/code',
    keyword_cta: 'ANTES',
    pilar: 'Produção de Conteúdo com IA',
    duracao: '7 slides',

    // ── Tutorial (formato case/processo) ──
    categoryId: 'aprendizado',
    author: '@joaoguirunas',
    primaryLink: 'https://claude.ai/code',
    primaryLabel: 'Conhecer o Claude Code',
    isExternal: true,
    sourceUrl: 'https://claude.ai/code',
    longDescription: [
      'Este é um estudo de caso: o mesmo Claude Code, o mesmo modelo, produzindo dois resultados radicalmente diferentes. De um lado, o site genérico — layout de template, animações travadas, tipografia sem hierarquia. De outro, uma interface que passa por produto de mercado. A variável que separa os dois não é talento, é setup.',
      'A diferença vem de três skills de design instaladas no Claude Code. Cada uma ataca um ponto específico onde a IA costuma escorregar: motion, precisão visual e referência de gosto. Juntas, elevam todo projeto gerado a partir delas, sem você precisar revisar pixel a pixel.',
      'O objetivo desta página é mostrar o antes e o depois lado a lado e explicar o que cada skill muda — para você reproduzir o "depois" nos seus próprios projetos.',
    ],
    features: [
      {
        title: 'O antes: o que sai sem setup',
        description: 'Layout de template, animações inexistentes, tipografia sem hierarquia e componentes que parecem Bootstrap antigo. O problema não é o Claude — é o que não foi instalado.',
        icon: 'pixel',
      },
      {
        title: 'Emil Kowalski Design — motion',
        description: 'Animações com easing correto, transições que fluem e micro-interações. A interface para de ser estática e começa a parecer um produto real.',
        icon: 'animejs',
      },
      {
        title: 'Impeccable Design — precisão',
        description: 'Espaçamento consistente, tipografia com hierarquia e grid coerente, corrigidos automaticamente em toda a interface.',
        icon: 'design',
      },
      {
        title: 'TasteSkill — referência',
        description: 'O Claude passa a gerar com base em produtos premium reais como referência, em vez de só repetir o que memorizou — saída no nível de Stripe, Linear, Vercel.',
        icon: 'brain',
      },
      {
        title: 'O depois: o resultado',
        description: 'UI que convence à primeira vista, animações que parecem handmade e layout que ninguém diria ter vindo de IA — pronto para deploy em minutos.',
        icon: 'website',
      },
      {
        title: 'Mesmo modelo, setup diferente',
        description: 'A lição replicável: instaladas uma vez, as skills elevam todos os projetos seguintes. O ganho não é por projeto, é permanente.',
        icon: 'setup',
      },
    ],
    body: [
      {
        type: 'heading',
        text: 'O antes — site genérico',
      },
      {
        type: 'paragraph',
        text: 'Sem configuração de design, o Claude Code entrega o resultado mais provável do dataset: layout de template sem personalidade, animações travadas ou ausentes, tipografia padrão sem hierarquia e cores sem sistema. O código funciona, mas o visual denuncia que foi gerado por IA.',
      },
      {
        type: 'heading',
        text: 'O que muda — três skills, três frentes',
      },
      {
        type: 'paragraph',
        text: 'Cada skill resolve um ponto fraco distinto. Emil Kowalski Design cuida do movimento: easing, transições entre seções e micro-interações. Impeccable Design cuida da precisão estática: espaçamento, hierarquia tipográfica e grid. TasteSkill cuida da referência: faz o Claude gerar tomando produtos premium reais como base de gosto, não só o que memorizou.',
      },
      {
        type: 'callout',
        text: 'A diferença entre um Claude que "aprendeu design" e um que "continua aprendendo design" está em ter uma referência de qualidade na hora de gerar — é o que a terceira skill entrega.',
      },
      {
        type: 'heading',
        text: 'Como reproduzir o depois',
      },
      {
        type: 'steps',
        items: [
          'Instale as três skills de design no seu Claude Code (Emil Kowalski Design, Impeccable Design e TasteSkill).',
          'Comece um novo projeto e descreva o site normalmente, em PT-BR — as skills atuam sobre a saída sem você precisar pedir.',
          'Compare com um projeto antigo gerado sem o setup: a diferença em motion, espaçamento e identidade visual aparece de imediato.',
          'Refine pontualmente em linguagem natural e faça o deploy.',
        ],
      },
      {
        type: 'heading',
        text: 'A lição',
      },
      {
        type: 'paragraph',
        text: 'O mesmo modelo entrega "primeira geração" ou "produto de mercado" dependendo do setup. Configurar as skills uma vez muda todos os projetos seguintes — o investimento é único e o retorno é permanente.',
      },
    ],
  },
  {
    slug: 'o-maior-lancamento-de-ai-dessa-semana-jun-22',
    data: '2026-06-22',
    slot: 'A',
    formato: 'Reel',
    titulo: 'O Maior Lançamento de AI Dessa Semana',
    ferramenta: 'Claude Fable 5 (Anthropic)',
    link: 'https://www.anthropic.com/news/claude-fable-5-mythos-5',
    keyword_cta: '(sem CTA)',
    pilar: 'Notícias e Tendências AI',
    duracao: '26s',
  },
]
