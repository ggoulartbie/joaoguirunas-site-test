import { ContentPost } from '@/types/content-post'

export const batch8: ContentPost[] = [
  {
    slug: 'dashboard-completo-feito-100-com-claude-code',
    data: '2026-06-28',
    slot: 'B',
    formato: 'Carrossel',
    titulo: 'Dashboard Completo Feito 100% com Claude Code',
    ferramenta: 'Claude Code (projeto dashboard)',
    link: 'https://claude.ai/code',
    keyword_cta: 'DASH',
    pilar: 'Produção de Conteúdo com IA',
    duracao: '8 slides',
    categoryId: 'aprendizado',
    longDescription: [
      'Este é um case prático: como construir um dashboard de métricas completo — com KPIs, gráficos, filtros de período e dark mode — usando 100% Claude Code, sem contratar dev frontend, designer ou recorrer a uma ferramenta de no-code com limitações de plano. Não é a promessa de uma ferramenta específica; é o registro de um processo replicável que você pode seguir para o seu próprio dashboard.',
      'A ideia central é que um dashboard bem feito não nasce de prompts soltos, e sim de um brief claro seguido de etapas de aprovação. Você decide o que visualizar, de onde vêm os dados e quem vai usar; o Claude propõe a arquitetura de componentes e a stack; você aprova antes de qualquer linha de código. A partir daí, conexão de dados, interface e ajustes acontecem em ciclos curtos de conversa.',
      'O resultado: do brief ao dashboard no ar em 2 a 4 horas. O que isso substitui — meses de desenvolvimento, um time frontend e um designer — é exatamente o que torna o método interessante para quem precisa de painéis de métricas sem orçamento de agência.',
    ],
    features: [
      {
        title: 'Brief antes de código',
        description: 'Tudo parte de três perguntas: o que visualizar, de onde vêm os dados e quem usa. Um brief claro economiza horas de retrabalho.',
        icon: 'book',
      },
      {
        title: 'Arquitetura aprovada por você',
        description: 'O Claude propõe componentes (sidebar, header, cards de KPI, área de gráficos) e a stack antes de construir. Você aprova primeiro.',
        icon: 'framework',
      },
      {
        title: 'Dados reais conectados',
        description: 'API (ex.: Instagram Graph), CSV/planilha ou banco local — o Claude escreve a integração completa: auth, tratamento de erro e cache.',
        icon: 'database',
      },
      {
        title: 'UI que apresenta',
        description: 'Cards de KPI com variação percentual, gráficos de linha e barra, tabela de posts e filtros de período — em dark mode e responsivo.',
        icon: 'dashboard',
      },
      {
        title: 'Refino por conversa',
        description: 'Cada ajuste atualiza só o componente alvo ("muda a cor do gráfico", "mostra a taxa, não o número") — sem refazer o dashboard inteiro.',
        icon: 'message',
      },
      {
        title: '2 a 4 horas, custo da assinatura',
        description: 'Do zero ao painel no ar em poucas horas, substituindo semanas de desenvolvimento e um time de frontend + design.',
        icon: 'deploy',
      },
    ],
    body: [
      {
        type: 'paragraph',
        text: 'Este tutorial mostra o processo real de construir um dashboard de métricas com Claude Code, do brief ao deploy. Como exemplo, vamos usar um dashboard de redes sociais (Instagram e YouTube), mas o método vale para qualquer painel: vendas, finanças, operação ou produto.',
      },
      {
        type: 'heading',
        text: 'Passo 1 — Escreva um brief claro',
      },
      {
        type: 'paragraph',
        text: 'Um dashboard precisa responder três perguntas antes de qualquer código: o que você quer visualizar, de onde vêm os dados e quem vai usar. Responda em uma frase cada e junte tudo num parágrafo. Quanto mais concreto, melhor o output.',
      },
      {
        type: 'code',
        language: 'text',
        code: `"Dashboard de métricas de redes sociais. Dados do Instagram e YouTube.
Visualiza: seguidores, alcance e engajamento por post. Filtros por período.
Layout limpo, dark mode, responsivo."`,
      },
      {
        type: 'callout',
        text: 'Resista à vontade de já pedir gráficos específicos no brief. Primeiro alinhe o objetivo e os dados — as visualizações vêm na etapa de UI, quando você já sabe o que tem em mãos.',
      },
      {
        type: 'heading',
        text: 'Passo 2 — Aprove a arquitetura',
      },
      {
        type: 'paragraph',
        text: 'Com o brief, peça ao Claude para propor a estrutura antes de construir. Você revisa e aprova — uma decisão aqui economiza horas depois. Um prompt que funciona bem:',
      },
      {
        type: 'code',
        language: 'text',
        code: `"Com base nesse brief, proponha: (1) a estrutura de componentes,
(2) a stack técnica e (3) a organização de pastas.
Não escreva código ainda — quero aprovar a arquitetura primeiro."`,
      },
      {
        type: 'paragraph',
        text: 'Uma stack típica para esse caso: Next.js para a aplicação, Recharts (ou Chart.js) para os gráficos e Tailwind CSS para o estilo. Confirme se faz sentido para o seu contexto antes de seguir.',
      },
      {
        type: 'heading',
        text: 'Passo 3 — Conecte os dados reais',
      },
      {
        type: 'paragraph',
        text: 'Com a estrutura aprovada, escolha a fonte de dados. O Claude escreve a integração completa — autenticação, tratamento de erro e cache — para a opção que você escolher:',
      },
      {
        type: 'steps',
        items: [
          'API oficial (ex.: Instagram Graph API): métricas reais via requisição autenticada.',
          'CSV ou planilha: você exporta os dados e o Claude lê o arquivo.',
          'Banco local: o Claude cria o schema e popula com dados de exemplo para você testar o layout antes de plugar a fonte real.',
        ],
      },
      {
        type: 'callout',
        text: 'Comece com dados de exemplo se a API ainda não estiver pronta. Você valida a interface inteira e troca a fonte depois — sem travar o progresso esperando credencial.',
      },
      {
        type: 'heading',
        text: 'Passo 4 — Monte a interface',
      },
      {
        type: 'paragraph',
        text: 'Com dados conectados, peça a UI final. Seja específico sobre os componentes que quer ver:',
      },
      {
        type: 'code',
        language: 'text',
        code: `"Monta a interface: cards de KPI com variação percentual, gráfico de linha
para evolução temporal, gráfico de barras para comparar posts, tabela de posts
com métricas e filtro de período funcionando. Dark mode, tipografia com hierarquia."`,
      },
      {
        type: 'heading',
        text: 'Passo 5 — Refine por conversa',
      },
      {
        type: 'paragraph',
        text: 'A interface raramente sai 100% na primeira. A vantagem do Claude Code é que cada pedido atualiza só o componente alvo — você não reconstrói o dashboard inteiro a cada ajuste.',
      },
      {
        type: 'code',
        language: 'text',
        code: `"Adiciona um gráfico de pizza para distribuição por tipo de post."
"Muda as cores dos gráficos para azul e roxo."
"No card de engajamento, mostra a taxa percentual, não o número absoluto."`,
      },
      {
        type: 'heading',
        text: 'O que esse método substitui',
      },
      {
        type: 'paragraph',
        text: 'Sem Claude Code, esse dashboard exigiria um dev frontend, um designer de UI e de duas a três semanas de desenvolvimento, além de reuniões de alinhamento. Com o método acima: uma pessoa com um brief claro, de duas a quatro horas de trabalho e o custo da assinatura do Claude. É o tipo de entrega que antes era exclusiva de quem tinha orçamento e agora cabe em uma tarde.',
      },
    ],
    primaryLink: 'https://claude.ai/code',
    primaryLabel: 'Conhecer o Claude Code',
    isExternal: true,
    author: '@joaoguirunas',
    sourceUrl: 'https://claude.ai/code',
  },
  {
    slug: 'claude-code-vira-seu-estudio-de-motion-design',
    data: '2026-06-29',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Claude Code Vira Seu Estúdio de Motion Design',
    ferramenta: 'Remotion',
    link: 'https://remotion.dev',
    keyword_cta: 'MOTION',
    pilar: 'Produção de Conteúdo com IA',
    duracao: '39s',
    categoryId: 'integracoes',
    longDescription: [
      'Remotion é uma biblioteca open source para criar vídeos de forma programática usando React. Em vez de arrastar clipes numa timeline, você escreve componentes React — texto, formas, imagens, transições — e o Remotion renderiza tudo quadro a quadro num arquivo de vídeo de verdade (MP4, WebM, GIF). Isso é exatamente o que torna a ferramenta perfeita para o Claude Code: o "vídeo" vira código React, e código React o Claude escreve e edita com facilidade.',
      'A integração funciona assim: você descreve a animação em linguagem natural — "um vídeo promo de 10 segundos com o logo aparecendo e o texto deslizando de baixo" — e o Claude gera os componentes Remotion correspondentes. Você visualiza no Remotion Studio (um preview ao vivo no navegador), ajusta por conversa e renderiza o arquivo final. Sem keyframes manuais, sem timeline de After Effects, sem assinatura de software de motion.',
      'Por ser baseado em React e em conceitos de animação determinística (cada frame é uma função do número do frame), o resultado é versionável, reaproveitável e parametrizável: dá para gerar 50 vídeos com o mesmo template trocando só os dados. Requer Node.js. A versão atual da lib é a 4.x.',
    ],
    features: [
      {
        title: 'Vídeo é código React',
        description: 'Componentes React renderizados quadro a quadro viram MP4, WebM ou GIF. O que o Claude faz de melhor — escrever React — vira a sua ferramenta de motion.',
        icon: 'remotion',
      },
      {
        title: 'Descreve, o Claude codifica',
        description: 'Você diz a animação em linguagem natural e o Claude gera os componentes Remotion: textos, transições, layouts animados e timing.',
        icon: 'message',
      },
      {
        title: 'Preview ao vivo no Studio',
        description: 'O Remotion Studio mostra o vídeo em tempo real no navegador enquanto você ajusta — sem exportar e reimportar a cada mudança.',
        icon: 'monitor',
      },
      {
        title: 'Ajuste por conversa',
        description: '"Muda a cor para azul", "ajusta o timing da entrada", "troca o texto do slide 3" — cada pedido atualiza o componente, não o vídeo inteiro.',
        icon: 'automation',
      },
      {
        title: 'Templates parametrizáveis',
        description: 'Animação determinística e props de entrada: gere dezenas de vídeos a partir do mesmo template trocando apenas os dados.',
        icon: 'carousel',
      },
      {
        title: 'Open source, roda no seu Node',
        description: 'Remotion é open source e renderiza local com Node.js. Sem mensalidade de Adobe, sem curva de After Effects, sem contratar animador.',
        icon: 'github',
      },
    ],
    body: [
      {
        type: 'paragraph',
        text: 'O Remotion deixa de ser "mais uma lib" quando combinado com o Claude Code: você descreve o vídeo, o Claude escreve os componentes React e você só revisa e renderiza. Abaixo, o passo a passo para criar seu primeiro projeto de motion design dentro do terminal.',
      },
      {
        type: 'heading',
        text: 'Pré-requisitos',
      },
      {
        type: 'steps',
        items: [
          'Node.js 18 ou superior instalado.',
          'Claude Code rodando na pasta onde você quer o projeto.',
          'Em alguns sistemas Linux, dependências do Chromium para renderização (o Remotion avisa se faltar algo).',
        ],
      },
      {
        type: 'heading',
        text: 'Passo 1 — Criar o projeto Remotion',
      },
      {
        type: 'paragraph',
        text: 'Peça ao Claude para iniciar um projeto Remotion, ou rode o comando oficial você mesmo. O template já vem com o Studio configurado e um vídeo de exemplo.',
      },
      {
        type: 'code',
        language: 'bash',
        code: `npm create video@latest`,
      },
      {
        type: 'callout',
        text: 'O assistente pergunta o nome do projeto e o template. Para começar do mais simples, escolha o template "Hello World" — depois você reescreve a composição descrevendo o que quer ao Claude.',
      },
      {
        type: 'heading',
        text: 'Passo 2 — Abrir o Studio',
      },
      {
        type: 'paragraph',
        text: 'Entre na pasta do projeto e suba o Remotion Studio. Ele abre no navegador com preview ao vivo: toda mudança no código aparece na hora.',
      },
      {
        type: 'code',
        language: 'bash',
        code: `cd meu-video
npm run dev`,
      },
      {
        type: 'heading',
        text: 'Passo 3 — Descrever a animação ao Claude',
      },
      {
        type: 'paragraph',
        text: 'Com o projeto aberto no Claude Code, descreva o vídeo em linguagem natural. O Claude edita os componentes da composição (normalmente em src/) e você acompanha o resultado no Studio.',
      },
      {
        type: 'code',
        language: 'text',
        code: `"Cria um vídeo promo de 10 segundos: fundo escuro, o logo aparece com fade-in
no centro, depois desliza para o topo enquanto o título entra de baixo com mola.
No final, um CTA pulsando. Cores azul e branco, 1080x1080."`,
      },
      {
        type: 'paragraph',
        text: 'O Remotion usa hooks como useCurrentFrame() e helpers como interpolate() e spring() para animar com base no frame atual. Você não precisa decorar a API — o Claude escreve, e você refina pelo resultado.',
      },
      {
        type: 'heading',
        text: 'Passo 4 — Ajustar por conversa',
      },
      {
        type: 'code',
        language: 'text',
        code: `"Deixa a entrada do título mais lenta."
"Troca o azul por um roxo (#7c3aed)."
"O CTA tem que aparecer 1 segundo antes."`,
      },
      {
        type: 'heading',
        text: 'Passo 5 — Renderizar o vídeo final',
      },
      {
        type: 'paragraph',
        text: 'Quando estiver satisfeito, renderize a composição para um arquivo. Troque "MinhaComposicao" pelo id da sua composição (definido no Root do projeto).',
      },
      {
        type: 'code',
        language: 'bash',
        code: `npx remotion render MinhaComposicao out/video.mp4`,
      },
      {
        type: 'callout',
        text: 'Como cada frame é uma função do número do frame, dá para parametrizar a composição com props e gerar dezenas de vídeos (um por cliente, por produto, por idioma) a partir do mesmo template — só trocando os dados de entrada.',
      },
    ],
    primaryLink: 'https://www.remotion.dev',
    primaryLabel: 'Ver no Remotion',
    isExternal: true,
    author: '@joaoguirunas',
    sourceUrl: 'https://github.com/remotion-dev/remotion',
  },
  {
    slug: 'agentes-em-paralelo-com-claude-code-guia-completo',
    data: '2026-06-29',
    slot: 'B',
    formato: 'Carrossel',
    titulo: 'Agentes em Paralelo com Claude Code — Guia Completo',
    ferramenta: 'Claude Code (Agent Teams / multi-agentes)',
    link: 'https://claude.ai/code',
    keyword_cta: 'AGENTES',
    pilar: 'Ferramentas e Produtividade',
    duracao: '9 slides',
    categoryId: 'squads',
    longDescription: [
      'Este é o guia completo de como rodar múltiplos agentes com o Claude Code — desde subagentes (que trabalham em paralelo dentro de uma sessão, cada um no seu próprio contexto) até agent teams (várias sessões que se comunicam entre si). É o tutorial-âncora da categoria Squads: depois dele, você sabe quando vale paralelizar, como configurar e como coordenar o trabalho sem virar caos.',
      'O Claude Code tem suporte nativo a subagentes. Cada subagente roda em uma janela de contexto separada, com seu próprio prompt de sistema e até com ferramentas restritas. Isso traz dois ganhos reais: preservação de contexto (a exploração pesada acontece num contexto isolado e só o resumo volta para a conversa principal) e especialização (cada agente tem um papel definido — pesquisador, revisor, implementador — e entrega melhor do que um agente genérico tentando fazer tudo).',
      'Para tarefas que de fato precisam correr ao mesmo tempo e trocar informação, o Claude Code oferece agent teams: sessões paralelas que se comunicam. O critério de quando usar cada abordagem — e quando NÃO paralelizar — é o que separa quem usa o Claude Code como assistente de quem o opera como uma squad.',
    ],
    features: [
      {
        title: 'Subagentes nativos',
        description: 'Suporte embutido no Claude Code: cada subagente roda em contexto próprio, com system prompt e ferramentas que você define. Sem gambiarra.',
        icon: 'agents',
      },
      {
        title: 'Contexto preservado',
        description: 'A exploração pesada (ler logs, varrer arquivos) acontece no contexto do subagente; só o resumo volta para a conversa principal. Menos ruído, mais foco.',
        icon: 'brain',
      },
      {
        title: 'Especialização por papel',
        description: 'Pesquisador, copywriter, revisor, implementador — cada agente com instruções e contexto próprios. Resultado melhor que um agente genérico.',
        icon: 'community',
      },
      {
        title: 'Delegação automática',
        description: 'O Claude usa a description de cada subagente para decidir quando delegar. Uma boa descrição faz o agente certo ser acionado na hora certa.',
        icon: 'automation',
      },
      {
        title: 'Agent teams (paralelo real)',
        description: 'Para tarefas que precisam rodar juntas e trocar informação, várias sessões se comunicam entre si — paralelismo de verdade, não só contexto isolado.',
        icon: 'framework',
      },
      {
        title: 'Critério de quando paralelizar',
        description: 'Tarefas independentes e volume alto pedem paralelo. Tarefas encadeadas ou volume baixo não justificam o overhead. O guia explica os limites.',
        icon: 'book',
      },
    ],
    body: [
      {
        type: 'paragraph',
        text: 'Existem dois mecanismos diferentes no Claude Code para "vários agentes", e confundi-los gera frustração. Subagentes rodam dentro de uma sessão, cada um no seu contexto isolado, e são ótimos para delegar trabalho especializado. Agent teams são várias sessões que se comunicam — o caminho para paralelismo de verdade. Este guia cobre os dois e quando usar cada um.',
      },
      {
        type: 'heading',
        text: 'Parte 1 — Subagentes: o que são',
      },
      {
        type: 'paragraph',
        text: 'Um subagente é um worker com um prompt de sistema próprio, uma janela de contexto separada e um conjunto de ferramentas que você pode restringir. Quando o Claude encontra uma tarefa que casa com a description de um subagente, ele delega — o subagente trabalha isolado e devolve só o resultado. O Claude Code já vem com subagentes embutidos (Explore, Plan e general-purpose) e você pode criar os seus.',
      },
      {
        type: 'callout',
        text: 'Por que isso importa: a parte pesada do trabalho (varrer arquivos, ler logs longos) consome contexto. Feita num subagente, ela não polui a conversa principal — volta só o resumo. Você mantém a sessão principal enxuta e focada.',
      },
      {
        type: 'heading',
        text: 'Passo 1 — Criar um subagente',
      },
      {
        type: 'paragraph',
        text: 'O jeito mais simples é o comando /agents, que abre uma interface para gerenciar e criar subagentes. Você escolhe o escopo (projeto ou pessoal) e pode pedir ao próprio Claude para gerar a definição.',
      },
      {
        type: 'code',
        language: 'text',
        code: `/agents`,
      },
      {
        type: 'paragraph',
        text: 'O escopo define onde o arquivo é salvo. Subagentes de projeto ficam em .claude/agents/ (entram no controle de versão, ideais para a equipe). Subagentes pessoais ficam em ~/.claude/agents/ e estão disponíveis em todos os seus projetos.',
      },
      {
        type: 'heading',
        text: 'Passo 2 — A anatomia de um subagente',
      },
      {
        type: 'paragraph',
        text: 'Um subagente é um arquivo Markdown com frontmatter. O campo description é o que o Claude usa para decidir quando delegar — escreva-o pensando em "quando esse agente deve ser acionado". O campo tools (opcional) restringe as ferramentas; o corpo do arquivo é o prompt de sistema.',
      },
      {
        type: 'code',
        language: 'markdown',
        code: `---
name: pesquisador
description: Pesquisa tendências e concorrentes. Use quando precisar de
  levantamento de mercado ou referências antes de escrever conteúdo.
tools: WebSearch, Read
---

Você é um pesquisador especializado em redes sociais. Seu objetivo é
levantar tendências e concorrentes e entregar um resumo estruturado em
bullet points, sem opinião — só dados e fontes.`,
      },
      {
        type: 'callout',
        text: 'Omitir o campo tools dá ao subagente acesso às mesmas ferramentas da sessão. Restringir (ex.: só Read e WebSearch) é uma forma de impor limites — um pesquisador não precisa de permissão para escrever arquivos.',
      },
      {
        type: 'heading',
        text: 'Passo 3 — Escrever boas instruções',
      },
      {
        type: 'paragraph',
        text: 'A qualidade da instrução determina o resultado. Uma estrutura que funciona bem, seja no prompt de sistema do subagente ou ao delegar uma tarefa:',
      },
      {
        type: 'steps',
        items: [
          'Papel: "Você é um pesquisador especializado em..."',
          'Tarefa específica: "Seu objetivo é..."',
          'Fontes e ferramentas: "Use as ferramentas X e Y para..."',
          'Formato de entrega: "Entregue o resultado como..."',
          'O que NÃO fazer: "Não inclua opinião / não edite arquivos / não exceda N itens."',
        ],
      },
      {
        type: 'heading',
        text: 'Parte 2 — Agent teams: paralelismo real',
      },
      {
        type: 'paragraph',
        text: 'Subagentes trabalham isolados e devolvem resultado, mas não conversam entre si durante a execução. Quando você precisa de várias sessões rodando ao mesmo tempo e trocando informação — uma squad de verdade —, o recurso é agent teams. Você atribui tarefas a cada membro, eles se comunicam por mensagens e coordenam o trabalho, enquanto você acompanha o progresso de cada um.',
      },
      {
        type: 'callout',
        text: 'Regra prática: precisa só delegar um pedaço de trabalho e receber o resultado? Subagente. Precisa de vários agentes operando juntos e se coordenando ao longo da tarefa? Agent team.',
      },
      {
        type: 'heading',
        text: 'Exemplo: produção de conteúdo em paralelo',
      },
      {
        type: 'paragraph',
        text: 'Tarefa: produzir 5 posts completos com pesquisa, roteiro e legenda. Em sequência, seriam 5 × 45 min ≈ 3h45. Com agentes especializados rodando juntos, cai para perto de uma hora. Uma divisão possível:',
      },
      {
        type: 'steps',
        items: [
          'Agente de pesquisa: levanta tendências e concorrentes (via WebSearch ou um MCP de dados).',
          'Agente de roteiro: escreve os 5 roteiros com base na pesquisa.',
          'Agente de legenda: escreve as legendas com hashtags e CTAs.',
        ],
      },
      {
        type: 'heading',
        text: 'Quando usar — e quando NÃO usar',
      },
      {
        type: 'paragraph',
        text: 'Paralelizar tem overhead. Vale a pena em alguns casos e atrapalha em outros:',
      },
      {
        type: 'steps',
        items: [
          'Use quando: as tarefas são divisíveis em partes independentes.',
          'Use quando: o volume é alto (muitos itens do mesmo tipo).',
          'Use quando: cada parte precisa de contexto ou ferramentas diferentes.',
          'Evite quando: a tarefa 2 depende do resultado exato da tarefa 1 (encadeada).',
          'Evite quando: o volume é pequeno (1-2 itens não pagam o overhead).',
          'Evite quando: você ainda está aprendendo o Claude Code — domine o fluxo de uma sessão primeiro.',
        ],
      },
      {
        type: 'callout',
        text: 'A diferença entre usar o Claude Code como assistente e como plataforma de operação está aqui: assistente faz uma coisa de cada vez; plataforma orquestra agentes e você aprova o resultado.',
      },
    ],
    primaryLink: 'https://code.claude.com/docs/en/sub-agents',
    primaryLabel: 'Ler a documentação',
    isExternal: true,
    author: '@joaoguirunas',
    sourceUrl: 'https://code.claude.com/docs/en/sub-agents',
  },
]
