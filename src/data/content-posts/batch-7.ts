import { ContentPost } from '@/types/content-post'

export const batch7: ContentPost[] = [
  {
    slug: 'ai-cria-canal-de-youtube-inteiro-em-minutos',
    data: '2026-06-27',
    slot: 'A',
    formato: 'Reel',
    titulo: 'AI Cria Canal de YouTube Inteiro em Minutos',
    ferramenta: 'Vidrush AI',
    link: 'https://vidrush.ai',
    keyword_cta: 'VÍDEO',
    pilar: 'Produção de Conteúdo com IA',
    duracao: '42s',

    categoryId: 'apps',
    longDescription: [
      'Vidrush AI é uma plataforma que transforma uma ideia em texto num vídeo longo completo — do tipo documentário de até cerca de uma hora — sem que você precise tocar numa timeline de edição. Você descreve o vídeo que quer e a ferramenta cuida de todas as etapas de produção que antes exigiam uma equipe inteira.',
      'O fluxo é encadeado de ponta a ponta: ela pesquisa o tema na web, escreve o roteiro, busca filmagens reais que combinam com a narrativa, gera motion graphics onde não encontra o clipe certo, adiciona voiceover, legendas, transições e efeitos sonoros, e por fim monta tudo numa timeline pronta para revisão.',
      'O diferencial é o ajuste por conversa: em vez de editar manualmente cada corte, você fala o que quer mudar ("encurta a intro", "troca essa cena", "muda o tom da narração") e a ferramenta refaz o trecho. É voltada para criadores que querem escalar a produção de vídeos longos sem montar uma estrutura de roteirista, editor, designer e narrador.',
    ],
    features: [
      {
        title: 'Roteiro a partir de um prompt',
        description: 'Você descreve a ideia e a AI pesquisa o tema na web e escreve o roteiro completo do vídeo, com estrutura de início, meio e fim.',
        icon: 'copywriting',
      },
      {
        title: 'Filmagens reais + motion graphics',
        description: 'Busca clipes reais que combinam com a narrativa e, onde não encontra, gera motion graphics customizados para preencher o espaço.',
        icon: 'video',
      },
      {
        title: 'Voiceover e legendas automáticos',
        description: 'Adiciona narração, legendas, transições e efeitos sonoros sem você gravar ou sincronizar nada manualmente.',
        icon: 'message',
      },
      {
        title: 'Timeline pronta para revisar',
        description: 'Entrega o vídeo montado numa timeline de edição, em vez de só um arquivo final fechado — você ainda controla o resultado.',
        icon: 'remotion',
      },
      {
        title: 'Edição por conversa',
        description: 'Ajusta timing, texto e sequência conversando com a ferramenta: "encurta essa parte", "troca essa cena" — e ela refaz o trecho.',
        icon: 'automation',
      },
      {
        title: 'Vídeos longos sem equipe',
        description: 'Produz conteúdo de até cerca de uma hora — formato que antes exigia roteirista, editor, designer e narrador.',
        icon: 'community',
      },
    ],
    body: [
      {
        type: 'paragraph',
        text: 'Vidrush AI cobre toda a cadeia de produção de um vídeo longo a partir de uma descrição em texto. O fluxo abaixo é o caminho típico de uma ideia até um documentário publicável.',
      },
      {
        type: 'heading',
        text: '1. Crie a conta e descreva o vídeo',
      },
      {
        type: 'steps',
        items: [
          'Acesse vidrush.ai e crie sua conta.',
          'Inicie um novo projeto e escreva o briefing: tema do vídeo, ângulo, público-alvo e a duração desejada.',
          'Quanto mais específico o prompt (tom, estilo de narração, referências), mais alinhado vem o primeiro corte.',
        ],
      },
      {
        type: 'callout',
        text: 'Trate o prompt como um briefing para um editor humano: diga o que NÃO quer também. "Sem clichês de stock", "narração calma", "foco em dados" economizam rodadas de ajuste.',
      },
      {
        type: 'heading',
        text: '2. Deixe a AI montar o primeiro corte',
      },
      {
        type: 'paragraph',
        text: 'A ferramenta executa as etapas em sequência: pesquisa o tema na web, escreve o roteiro, busca filmagens reais que combinam com a história e gera motion graphics nos trechos sem clipe disponível. Em seguida adiciona voiceover, legendas, transições e efeitos sonoros, e carrega tudo numa timeline.',
      },
      {
        type: 'heading',
        text: '3. Ajuste conversando',
      },
      {
        type: 'paragraph',
        text: 'Em vez de editar manualmente, você dá instruções em linguagem natural e a ferramenta refaz o trecho indicado.',
      },
      {
        type: 'steps',
        items: [
          'Revise o vídeo na timeline e identifique o que quer mudar.',
          'Peça os ajustes em texto: "encurta a intro", "troca essa cena", "muda o tom da narração".',
          'Repita até o corte ficar do jeito que você quer.',
          'Exporte o vídeo final para publicar no YouTube.',
        ],
      },
      {
        type: 'callout',
        text: 'Vídeo longo gerado por AI ainda pede curadoria: confira fatos, datas e fontes do roteiro antes de publicar. A pesquisa automática acelera, mas a responsabilidade editorial continua sua.',
      },
    ],
    primaryLink: 'https://vidrush.ai',
    sourceUrl: 'https://vidrush.ai',
    author: '@joaoguirunas',
  },
  {
    slug: '10-mcps-que-uso-todo-dia-no-claude-code',
    data: '2026-06-27',
    slot: 'B',
    formato: 'Carrossel',
    titulo: '10 MCPs Que Uso Todo Dia no Claude Code',
    ferramenta: 'MCPs (10 recomendados)',
    link: 'https://modelcontextprotocol.io',
    keyword_cta: '(save post)',
    pilar: 'Ferramentas e Produtividade',
    duracao: '10 slides',

    categoryId: 'integracoes',
    longDescription: [
      'MCP (Model Context Protocol) é o padrão aberto que conecta o Claude Code a ferramentas e serviços externos. Cada MCP que você instala dá ao Claude uma nova capacidade — ler arquivos, controlar o browser, gerar mídia, falar com APIs — transformando o assistente de chat num sistema que age no mundo real.',
      'Este é um catálogo dos 10 MCPs que entram no dia a dia de uma operação de conteúdo e desenvolvimento. Não é a lista "completa" do ecossistema, é a seleção prática: os que aparecem com mais frequência no settings de quem usa o Claude Code para pesquisar, produzir, programar e se comunicar.',
      'Cada item abaixo traz o que o MCP faz e por que ele entra no fluxo. Se você ainda não instalou nenhum MCP, comece pelo tutorial de instalação em 5 passos — o processo é o mesmo para todos, muda só o nome do pacote e as credenciais.',
    ],
    features: [
      {
        title: 'Apify — scraping de redes',
        description: 'Coleta dados de Instagram, TikTok, LinkedIn e web em geral. Research de concorrentes e tendências dentro do próprio Claude Code, sem abrir navegador.',
        icon: 'instagram',
      },
      {
        title: 'ElevenLabs — voiceover PT-BR',
        description: 'Gera narração em alta qualidade direto do terminal. O Claude chama a API quando precisa narrar e o áudio cai na pasta do projeto.',
        icon: 'message',
      },
      {
        title: 'Higgsfield — imagens e vídeos',
        description: 'Geração de assets visuais AI via Claude Code: thumbnails, fotos de produto, cenas cinematográficas, dentro do fluxo de produção.',
        icon: 'image',
      },
      {
        title: 'Google Stitch — design para código',
        description: 'Exporta componentes de design do Google Stitch para o Claude Code via MCP. O Claude recebe o design e o transforma em código.',
        icon: 'design',
      },
      {
        title: 'Puppeteer & browser-use — browser',
        description: 'Automação de navegador: abrir sites, preencher formulários, screenshots, extração de dados. browser-use cobre fluxos dinâmicos que o Puppeteer não resolve.',
        icon: 'browser',
      },
      {
        title: 'filesystem, GitHub, Slack, Notion',
        description: 'A base do dia a dia: arquivos locais, dev workflow (commit/PR/review), comunicação de equipe e documentação — tudo dentro do terminal.',
        icon: 'github',
      },
    ],
    body: [
      {
        type: 'paragraph',
        text: 'Todos os MCPs são instalados do mesmo jeito: você registra o servidor no Claude Code e fornece as credenciais que ele precisa. Abaixo, o caminho para montar essa stack de 10 e a referência rápida de cada um.',
      },
      {
        type: 'heading',
        text: 'Como instalar qualquer um deles',
      },
      {
        type: 'steps',
        items: [
          'Escolha o MCP e tenha em mãos a API key ou token do serviço (ElevenLabs, Apify, GitHub etc.).',
          'Adicione o servidor MCP no Claude Code com o comando claude mcp add.',
          'Reinicie a sessão do Claude Code para ele carregar o novo servidor.',
          'Peça uma tarefa que use o MCP e confirme que o Claude consegue chamá-lo.',
        ],
      },
      {
        type: 'code',
        language: 'bash',
        code: `# Exemplo: registrar um MCP no Claude Code
claude mcp add nome-do-servidor -- comando-do-servidor

# Listar os MCPs já conectados
claude mcp list`,
      },
      {
        type: 'callout',
        text: 'Cada MCP pede credenciais próprias. Guarde keys em variáveis de ambiente ou no config do MCP — nunca cole tokens direto no chat ou em arquivos versionados.',
      },
      {
        type: 'heading',
        text: 'Os 10, por função no fluxo',
      },
      {
        type: 'steps',
        items: [
          'Pesquisa: Apify (scraping de Instagram, TikTok, LinkedIn e web).',
          'Áudio: ElevenLabs (voiceover PT-BR de alta qualidade).',
          'Visual: Higgsfield (imagens e vídeos AI) e Google Stitch (design → código).',
          'Browser: Puppeteer (automação básica) e browser-use (fluxos dinâmicos e complexos).',
          'Arquivos: filesystem (ler, escrever e organizar arquivos locais).',
          'Dev: GitHub (commit, push, PR e code review sem sair do terminal).',
          'Time: Slack (mensagens e canais) e Notion (documentação e notas).',
        ],
      },
      {
        type: 'callout',
        text: 'Não instale os 10 de uma vez. Comece pelos 2 ou 3 que resolvem seu gargalo atual — cada MCP carregado consome contexto e adiciona ferramentas que o Claude precisa considerar a cada tarefa.',
      },
    ],
    primaryLink: 'https://modelcontextprotocol.io',
    sourceUrl: 'https://modelcontextprotocol.io',
    author: '@joaoguirunas',
  },
  {
    slug: '5-codigos-secretos-do-claude-que-mudam-tudo',
    data: '2026-06-28',
    slot: 'A',
    formato: 'Reel',
    titulo: '5 Códigos Secretos do Claude que Mudam Tudo',
    ferramenta: 'Claude Code (comandos avançados)',
    link: 'https://claude.ai/code',
    keyword_cta: 'CODE',
    pilar: 'Ferramentas e Produtividade',
    duracao: '38s',

    categoryId: 'skills',
    longDescription: [
      'A maioria das pessoas usa o Claude como um chat melhorado: pergunta, lê a resposta, fecha. Mas o Claude Code tem uma camada de recursos avançados que muda completamente o que ele consegue entregar — e que quase ninguém ativa.',
      'Este tutorial cobre cinco desses recursos: o raciocínio estendido para problemas difíceis, o arquivo de contexto que evita reexplicar tudo, as skills que padronizam o comportamento, a orquestração de múltiplos agentes em paralelo e os MCPs que conectam o Claude ao mundo real.',
      'Cada um, sozinho, já eleva a qualidade do output. Combinados, transformam o Claude de uma janela de chat numa plataforma de operação. O objetivo aqui é mostrar o que cada recurso faz e quando vale a pena ativá-lo.',
    ],
    features: [
      {
        title: 'Raciocínio estendido',
        description: 'Faz o Claude pensar antes de responder em vez de devolver a primeira resposta. Para problemas complexos, a qualidade do output muda radicalmente.',
        icon: 'brain',
      },
      {
        title: 'CLAUDE.md — contexto permanente',
        description: 'Arquivo que o Claude lê automaticamente em todo projeto. Você escreve uma vez quem você é, as regras e o que evitar — e nunca mais reexplica.',
        icon: 'obsidian',
      },
      {
        title: 'Skills personalizadas',
        description: 'Módulos que ensinam o Claude a se comportar de forma específica — design, copywriting, análise. Você define o comportamento, ele repete sempre igual.',
        icon: 'plugin',
      },
      {
        title: 'Orquestração de subagentes',
        description: 'O Claude Code coordena múltiplos agentes em paralelo. Trabalho que levaria dias, dividido entre agentes, fica pronto em horas.',
        icon: 'agents',
      },
      {
        title: 'MCPs — ferramentas externas',
        description: 'Conectam o Claude a serviços como Notion, GitHub, ElevenLabs e Apify. Ele deixa de ser só chat e passa a agir no mundo real.',
        icon: 'automation',
      },
      {
        title: 'Combinados, viram plataforma',
        description: 'Cada recurso isolado já ajuda. Juntos, transformam o Claude Code numa plataforma de operação — não só uma caixa de respostas.',
        icon: 'framework',
      },
    ],
    body: [
      {
        type: 'paragraph',
        text: 'Os cinco recursos abaixo estão em ordem de esforço crescente: comece pelos dois primeiros (raciocínio e CLAUDE.md), que rendem resultado imediato, e avance para os demais conforme seu fluxo amadurece.',
      },
      {
        type: 'heading',
        text: '1. Raciocínio estendido',
      },
      {
        type: 'paragraph',
        text: 'Para tarefas que exigem planejamento — arquitetura, depuração de bug difícil, decisão de design — peça explicitamente que o Claude pense mais antes de responder. Ele gasta mais tempo raciocinando e a qualidade da resposta sobe de forma perceptível em problemas complexos.',
      },
      {
        type: 'callout',
        text: 'Não ligue raciocínio estendido para tudo. Em tarefas simples ele só adiciona latência e custo — reserve para problemas em que a primeira resposta costuma ficar rasa.',
      },
      {
        type: 'heading',
        text: '2. CLAUDE.md — contexto que persiste',
      },
      {
        type: 'paragraph',
        text: 'Crie um arquivo CLAUDE.md na raiz do projeto. O Claude Code o lê automaticamente em cada sessão, então tudo que você escreve nele vira contexto permanente.',
      },
      {
        type: 'steps',
        items: [
          'Crie o arquivo CLAUDE.md na raiz do projeto.',
          'Escreva quem você é, o stack do projeto, as convenções e o que o Claude deve evitar.',
          'Mantenha curto e direto — é contexto carregado em toda sessão, não documentação longa.',
        ],
      },
      {
        type: 'code',
        language: 'markdown',
        code: `# CLAUDE.md

## Projeto
Site em Next.js + TypeScript. Conteúdo em PT-BR.

## Regras
- Componentes em src/shared/components
- Nunca commitar sem rodar lint e typecheck
- Evitar dependências novas sem necessidade`,
      },
      {
        type: 'heading',
        text: '3. Skills personalizadas',
      },
      {
        type: 'paragraph',
        text: 'Skills são módulos que padronizam o comportamento do Claude para uma tarefa recorrente (design, copywriting, análise). Você descreve o comportamento uma vez e ele passa a aplicar sempre da mesma forma, sem você reescrever o prompt.',
      },
      {
        type: 'heading',
        text: '4. Orquestração de subagentes',
      },
      {
        type: 'paragraph',
        text: 'O Claude Code pode delegar partes de um trabalho para múltiplos agentes que rodam em paralelo, cada um com sua própria tarefa. Para projetos grandes que se dividem em frentes independentes, isso reduz drasticamente o tempo total.',
      },
      {
        type: 'callout',
        text: 'Paralelizar só compensa quando as tarefas são realmente independentes. Se uma depende do resultado da outra, a coordenação custa mais do que economiza.',
      },
      {
        type: 'heading',
        text: '5. MCPs — conectar ao mundo real',
      },
      {
        type: 'paragraph',
        text: 'MCPs dão ao Claude acesso a ferramentas externas — Notion, GitHub, ElevenLabs, Apify e dezenas de outras. Com eles, o Claude deixa de só conversar e passa a executar ações em serviços reais. É o passo que transforma o assistente numa operação de verdade.',
      },
      {
        type: 'callout',
        text: 'Os recursos compõem: um CLAUDE.md bem escrito orienta as skills, que por sua vez guiam os subagentes, que usam MCPs para agir. Adote um de cada vez e veja o ganho acumular.',
      },
    ],
    primaryLink: 'https://code.claude.com/docs/en/overview',
    sourceUrl: 'https://code.claude.com/docs/en/overview',
    author: '@joaoguirunas',
  },
]
