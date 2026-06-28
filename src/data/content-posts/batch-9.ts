import { ContentPost } from '@/types/content-post'
export const batch9: ContentPost[] = [
  {
    slug: 'app-full-stack-de-um-prompt-no-bolt-new',
    data: '2026-06-30',
    slot: 'A',
    formato: 'Reel',
    titulo: 'App Full-Stack de Um Prompt no Bolt.new',
    ferramenta: 'Bolt.new (StackBlitz)',
    link: 'https://bolt.new',
    categoryId: 'apps',
    longDescription: [
      'Bolt.new é um ambiente de desenvolvimento "agentic" do StackBlitz que roda inteiramente no navegador. Você descreve o app que quer, opcionalmente anexa uma referência visual, e o agente de IA escreve o código, instala dependências, sobe um servidor de preview e mostra o resultado funcionando — tudo sem você configurar máquina, runtime ou servidor local.',
      'A diferença para um gerador no-code tradicional é que o Bolt entrega um projeto real: arquivos, dependências e um stack moderno (geralmente React/Vite ou frameworks Node) que você pode editar, versionar e levar para produção. Não é um wireframe descartável — é código que continua sendo código.',
      'Ele já vem com as conexões que um app full-stack precisa: banco de dados e autenticação via Supabase, importação de design pelo Figma e publicação com domínio próprio via Netlify. E suporta os modelos mais avançados, incluindo o Claude Sonnet 4.6 — o que melhora muito a qualidade de UI e a limpeza do código gerado.',
    ],
    features: [
      {
        title: 'Geração full-stack a partir de um prompt',
        description: 'Descreve o app em linguagem natural e o agente gera frontend, lógica e estrutura de projeto completos, já rodando em preview.',
        icon: 'automation',
      },
      {
        title: 'Referência visual via Figma',
        description: 'Importe um design do Figma como referência para o app sair com o layout e a identidade que você quer, em vez de um template genérico.',
        icon: 'design',
      },
      {
        title: 'Banco e autenticação com Supabase',
        description: 'Conecte um projeto Supabase para ter PostgreSQL, login e storage configurados — sem escrever SQL nem montar backend do zero.',
        icon: 'database',
      },
      {
        title: 'Deploy com domínio próprio (Netlify)',
        description: 'Quando o app estiver pronto, publique direto pelo Bolt via Netlify, com domínio customizado, sem sair do navegador.',
        icon: 'deploy',
      },
      {
        title: 'Suporte ao Claude Sonnet 4.6',
        description: 'Use os modelos mais avançados da Anthropic dentro do Bolt para output mais polido, animações reais e código mais limpo.',
        icon: 'agents',
      },
      {
        title: 'Tudo no navegador, sem setup local',
        description: 'O ambiente StackBlitz roda no browser: sem instalar Node, sem configurar servidor, sem ambiente de dev na sua máquina.',
        icon: 'website',
      },
    ],
    primaryLink: 'https://bolt.new',
    primaryLabel: 'Abrir o Bolt.new',
    isExternal: true,
    sourceUrl: 'https://bolt.new',
    author: '@joaoguirunas',
    authorUrl: 'https://instagram.com/joaoguirunas',
    body: [
      {
        type: 'heading',
        text: 'Por que Bolt.new e não um gerador no-code',
      },
      {
        type: 'paragraph',
        text: 'A maioria das ferramentas "sem código" entrega um layout fechado que você não consegue evoluir. O Bolt entrega um projeto de verdade rodando no StackBlitz: arquivos, dependências e um stack moderno que você edita, conecta a serviços e leva para produção. Você ganha a velocidade do no-code sem abrir mão de continuar como dev.',
      },
      {
        type: 'heading',
        text: 'Passo a passo: do prompt ao app no ar',
      },
      {
        type: 'steps',
        items: [
          'Abra https://bolt.new e faça login (a conta StackBlitz serve).',
          'Escreva um prompt claro do que o app faz: público, telas principais, dados que precisa guardar e a ação central. Quanto mais específico o brief, menos retrabalho.',
          'Opcional: importe uma referência visual do Figma para o app sair com o design que você quer, não com um template padrão.',
          'Escolha o modelo Claude Sonnet 4.6 e mande gerar. O agente cria os arquivos, instala dependências e sobe o preview.',
          'Itere por chat: peça ajustes de UI, novas telas ou regras de negócio. Cada pedido vira uma alteração de código real.',
          'Conecte um projeto Supabase quando precisar de banco e login — o Bolt cuida da configuração de auth e PostgreSQL.',
          'Publique com Netlify direto pelo Bolt para colocar o app no ar com domínio próprio.',
        ],
      },
      {
        type: 'heading',
        text: 'Um prompt inicial que funciona',
      },
      {
        type: 'paragraph',
        text: 'Use uma estrutura que diga o quê, para quem e com quais dados. Exemplo de prompt de partida:',
      },
      {
        type: 'code',
        language: 'text',
        code: `Crie um app de lista de tarefas com login.

Público: profissionais que organizam projetos pessoais.
Telas: login, dashboard com tarefas agrupadas por projeto,
tela de criar/editar tarefa.
Dados a guardar: usuário, projetos, tarefas (título, status,
prazo, projeto).
Ação central: marcar tarefa como concluída e ver o progresso
por projeto.

Visual: limpo, minimalista, com micro-animações nas transições.
Use Supabase para login e banco de dados.`,
      },
      {
        type: 'callout',
        text: 'Conecte o Supabase antes de pedir telas com login. Se você pedir autenticação sem ter o projeto Supabase ligado, o app vai gerar a UI mas não terá onde persistir os usuários.',
      },
      {
        type: 'heading',
        text: 'Boas práticas para um resultado premium',
      },
      {
        type: 'steps',
        items: [
          'Anexe sempre uma referência visual (Figma ou print) — é o que separa um app genérico de um que parece produto.',
          'Peça uma tela por vez nas iterações grandes: é mais fácil revisar e o agente erra menos.',
          'Descreva o modelo de dados explicitamente (entidades e campos) para o Supabase nascer correto.',
          'Antes de publicar, peça ao agente para revisar estados de loading, erro e tela vazia — onde apps gerados costumam falhar.',
        ],
      },
      {
        type: 'paragraph',
        text: 'O segredo não é a ferramenta sozinha: é o brief bem feito mais o modelo certo (Claude Sonnet 4.6) mais uma referência visual. Com essa combinação, o Bolt sai de "protótipo bonito" para "app full-stack pronto para colocar no ar".',
      },
    ],
    keyword_cta: 'APP',
    pilar: 'Produção de Conteúdo com IA',
    duracao: '35s',
  },
  {
    slug: 'as-5-maiores-descobertas-do-mes-com-claude-code',
    data: '2026-06-30',
    slot: 'B',
    formato: 'Carrossel',
    titulo: 'As 5 Maiores Descobertas do Mês com Claude Code',
    ferramenta: '— (recap do mês)',
    link: 'PENDENTE: recap do mês — sem link específico',
    categoryId: 'aprendizado',
    longDescription: [
      'Esta é uma retrospectiva editorial: as cinco descobertas que mais mudaram o que dá para produzir com Claude Code ao longo de um mês de testes intensivos de setups, ferramentas e workflows. Não é tutorial de uma ferramenta única — é um recap de aprendizados que você pode aplicar hoje, cada um com o "porquê" e o "como".',
      'Os cinco eixos: skills mudam o nível do output mais do que o modelo escolhido; MCPs transformam o assistente em agente que age no mundo real; agentes em paralelo são outra categoria (não só velocidade); o brief é a parte mais subestimada do processo; e o CLAUDE.md é a memória persistente que quase ninguém usa.',
      'Use esta página como índice: cada descoberta aponta para o tutorial correspondente neste portal, onde o tema é desenvolvido em profundidade. Leia o recap para o panorama, siga os links para a prática.',
    ],
    features: [
      {
        title: '1. Skills mudam o nível do output',
        description: 'A qualidade depende mais das skills instaladas do que do modelo. Emil Kowalski Design, Impeccable Design e TasteSkill fazem mais pela UI do que trocar de modelo.',
        icon: 'design',
      },
      {
        title: '2. MCPs conectam o Claude ao mundo real',
        description: 'Sem MCP, o Claude é uma janela de chat. Com MCPs (filesystem, ElevenLabs, Apify), ele age sozinho — produz áudio, pesquisa e gera imagem sem sair do terminal.',
        icon: 'plugin',
      },
      {
        title: '3. Agentes em paralelo são outra categoria',
        description: 'Paralelo não é só rapidez: é especialização. Um agente pesquisador acha o que o copywriter não acharia. Produção de 4h passou a levar 1h, com mais qualidade.',
        icon: 'agents',
      },
      {
        title: '4. O brief é a parte mais subestimada',
        description: 'Tempo gasto refinando o brief volta como menos iteração e menos retrabalho. O ganho vem da instrução específica, não de um modelo melhor.',
        icon: 'copywriting',
      },
      {
        title: '5. CLAUDE.md é memória que não se perde',
        description: 'Um CLAUDE.md por projeto elimina o tempo reexplicando contexto. O Claude abre já sabendo objetivo, tom, stack e o que evitar.',
        icon: 'obsidian',
      },
    ],
    primaryLink: '/open-source',
    primaryLabel: 'Ver todos os tutoriais',
    isExternal: false,
    author: '@joaoguirunas',
    authorUrl: 'https://instagram.com/joaoguirunas',
    body: [
      {
        type: 'paragraph',
        text: 'Um mês inteiro testando setups, ferramentas e workflows de Claude Code rendeu cinco aprendizados que mudaram o que dá para produzir. Abaixo, cada descoberta com o que aprendi, o impacto real e como aplicar agora.',
      },
      {
        type: 'heading',
        text: '1. Skills são o diferencial que quase ninguém comenta',
      },
      {
        type: 'paragraph',
        text: 'A qualidade do que o Claude entrega depende mais das skills instaladas do que do modelo usado. Emil Kowalski Design (motion/easing), Impeccable Design (espaçamento e tipografia) e TasteSkill (referências de design) fizeram mais diferença na UI do que trocar de modelo. Sites e apps que pareciam genéricos passaram a parecer produto — sem mudar o processo, só o setup.',
      },
      {
        type: 'callout',
        text: 'Antes de reclamar do resultado, pergunte: "quais skills eu tenho instaladas?". O setup vem antes do prompt.',
      },
      {
        type: 'heading',
        text: '2. MCP transforma assistente em agente',
      },
      {
        type: 'paragraph',
        text: 'Sem MCPs, o Claude é uma janela de chat que depende de copiar e colar para trabalhar com outras ferramentas. Com MCPs, ele age no mundo real de forma autônoma: produção de áudio, pesquisa e geração de imagem passam a acontecer dentro do Claude Code, sem abrir outras plataformas.',
      },
      {
        type: 'steps',
        items: [
          'Comece pelo filesystem — dá ao Claude acesso direto aos seus arquivos.',
          'Adicione ElevenLabs para gerar voiceover dentro do fluxo.',
          'Inclua um MCP de pesquisa (ex.: Apify) para trazer dados reais da web.',
        ],
      },
      {
        type: 'heading',
        text: '3. Paralelo é outra categoria, não só velocidade',
      },
      {
        type: 'paragraph',
        text: 'Agentes em paralelo não são apenas mais rápidos: trazem especialização que não existe em fluxo sequencial. Um agente pesquisador encontra coisas que o copywriter não encontraria, porque o foco é diferente. Uma produção que levava 4 horas passou a levar 1 hora — e com qualidade melhor em cada parte.',
      },
      {
        type: 'callout',
        text: 'Para qualquer tarefa com mais de três entregas distintas, vale considerar paralelo. O custo de configurar se paga já na segunda rodada.',
      },
      {
        type: 'heading',
        text: '4. O Claude é tão bom quanto o brief que você dá',
      },
      {
        type: 'paragraph',
        text: 'Mais tempo refinando briefs significou menos tempo corrigindo outputs: menos iteração, menos retrabalho e mais consistência entre o pedido e a entrega. O tempo de produção caiu quando a instrução ficou mais específica — não quando o modelo melhorou.',
      },
      {
        type: 'steps',
        items: [
          'Quem vai ler ou usar isso?',
          'Qual ação eu quero que essa pessoa tome?',
          'Qual formato específico eu preciso receber?',
        ],
      },
      {
        type: 'heading',
        text: '5. CLAUDE.md é a memória que não se perde',
      },
      {
        type: 'paragraph',
        text: 'Um CLAUDE.md por projeto elimina o tempo perdido reexplicando contexto em cada sessão nova. O Claude abre já sabendo quem é o criador, qual o tom, o que evitar e qual o stack técnico. As sessões começam no ponto certo, sem dez minutos de contexto inicial toda vez.',
      },
      {
        type: 'code',
        language: 'markdown',
        code: `# CLAUDE.md

## Objetivo do projeto
O que estamos construindo e para quem.

## Tom e voz
Como escrever (formal/informal, PT-BR, etc.).

## Stack técnica
Frameworks, libs e convenções do projeto.

## Nunca fazer
Regras e anti-padrões que devem ser evitados.`,
      },
      {
        type: 'paragraph',
        text: 'Junte os cinco: skills definem o teto de qualidade, MCPs dão braços ao agente, o paralelo multiplica a capacidade, o brief reduz o retrabalho e o CLAUDE.md guarda o contexto. É menos sobre o modelo da vez e mais sobre o sistema em volta dele.',
      },
    ],
    keyword_cta: '(save post)',
    pilar: 'Retrospectiva / Comunidade',
    duracao: '7 slides',
  },
]
