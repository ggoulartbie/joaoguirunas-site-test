import { ContentPost } from '@/types/content-post'

export const batch10: ContentPost[] = [
  {
    slug: 'pdfs-em-dados-estruturados-com-claude-zero-codigo',
    bgImage: '/images/bg-productivity.png',
    data: '2026-07-08',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Jogue um PDF de 200 Páginas no Claude e Tenha a Resposta em 3 Minutos',
    ferramenta: 'Claude Code + MCP Filesystem',
    link: 'https://claude.ai/code',
    categoryId: 'apps',
    keyword_cta: 'PDF',
    pilar: 'Educacional',
    duracao: '40s',
    longDescription: [
      'Abri uma pasta com 100 contratos. Fiz uma pergunta. Recebi uma planilha. Um consultor pode cobrar R$800/hora para fazer isso — você configura uma vez e nunca mais paga. O Claude extrai os dados de 100 documentos em 3 minutos, sem código, sem dev, sem copiar e colar.',
      'Você já tem os PDFs. Qualquer tipo serve: nota fiscal, contrato, relatório de resultado. Você fala uma vez o que quer encontrar — CNPJ, valor, data de vencimento, cláusula de rescisão. O Claude lê cada documento, extrai exatamente esses campos e devolve tudo numa planilha sem você abrir nenhum arquivo.',
      '100 documentos em 3 minutos. Sem abrir arquivo por arquivo. Sem copiar e colar. Sem perder dado no processo. Contabilidade, jurídico e operações: qualquer setor que depende de "ler documento e copiar para planilha" pode eliminar esse trabalho inteiramente com esse fluxo.',
    ],
    features: [
      {
        title: 'Pipeline PDF → planilha sem código',
        description: 'Defina os campos uma vez em linguagem natural. O Claude lê cada documento e entrega os dados extraídos prontos para exportar como CSV ou JSON.',
        icon: 'automation',
      },
      {
        title: 'Casos reais: NFs, contratos, relatórios',
        description: 'Notas fiscais (CNPJ, valor, data), contratos (partes, prazo, cláusulas) e relatórios (KPIs, métricas) — cada tipo com seus campos específicos.',
        icon: 'book',
      },
      {
        title: 'Schema fixo garante consistência',
        description: 'Você define os campos e o tipo de dado esperado. O Claude segue o schema e sinaliza quando um campo não existe — sem inventar informação.',
        icon: 'database',
      },
      {
        title: 'Processamento em lote de 100 docs',
        description: 'Com o MCP de Filesystem, o Claude processa uma pasta inteira de documentos. Cada PDF vira uma linha da planilha final — 100 notas fiscais em 3 minutos.',
        icon: 'framework',
      },
      {
        title: 'MCP Filesystem: acesso direto aos arquivos',
        description: 'O Claude lê seus PDFs locais via MCP — sem upload para servidor externo, sem copiar e colar o conteúdo, sem limitação de tamanho de arquivo.',
        icon: 'plugin',
      },
      {
        title: 'Contabilidade, jurídico e operações',
        description: 'Os três setores que mais ganham com esse fluxo: qualquer processo de "ler documento e copiar para planilha" pode ser automatizado.',
        icon: 'deploy',
      },
    ],
    primaryLink: 'https://claude.ai/code',
    primaryLabel: 'Abrir o Claude Code',
    isExternal: true,
    author: '@joaoguirunas',
    authorUrl: 'https://instagram.com/joaoguirunas',
    body: [
      {
        type: 'heading',
        text: 'Por que extrair dados de PDF manualmente não escala',
      },
      {
        type: 'paragraph',
        text: 'Uma empresa que recebe 200 notas fiscais por mês gasta horas de trabalho manual só para copiar CNPJ, valor e data de cada uma. Multiplique por 12 meses, some os erros de digitação e o custo de oportunidade — e você tem um problema de processo que nenhuma planilha resolve. O Claude não substitui o analista: elimina a tarefa que o analista não deveria estar fazendo.',
      },
      {
        type: 'heading',
        text: 'O pipeline: PDF → Claude → JSON → planilha',
      },
      {
        type: 'steps',
        items: [
          'Instale o MCP de Filesystem no Claude Code para dar acesso à pasta com seus PDFs.',
          'Escreva o prompt de extração com o schema: quais campos quer, qual o tipo de dado e o que fazer quando um campo não existir.',
          'Aponte a pasta ou arraste os arquivos. O Claude processa cada documento e retorna os dados no formato JSON.',
          'Uma linha de terminal converte o JSON em CSV — pronto para abrir no Excel, Google Sheets ou alimentar um sistema.',
        ],
      },
      {
        type: 'heading',
        text: 'Como definir um schema de extração',
      },
      {
        type: 'paragraph',
        text: 'O segredo da consistência é o schema fixo. Em vez de pedir "extraia as informações importantes", você define exatamente o que quer — e o Claude segue.',
      },
      {
        type: 'code',
        language: 'text',
        code: `Extraia os seguintes campos de cada nota fiscal:
- cnpj_emitente: string (somente números, 14 dígitos)
- razao_social: string
- valor_total: number (sem R$, use ponto como separador decimal)
- data_emissao: string (formato YYYY-MM-DD)
- numero_nf: string

Se um campo não existir no documento, retorne null.
Retorne um objeto JSON por nota fiscal.`,
      },
      {
        type: 'callout',
        text: 'Peça o formato YYYY-MM-DD para datas — é o único que o Excel e o Google Sheets reconhecem automaticamente sem conversão manual.',
      },
      {
        type: 'heading',
        text: 'Processamento em lote com MCP Filesystem',
      },
      {
        type: 'paragraph',
        text: 'Com o MCP de Filesystem configurado, você aponta uma pasta e o Claude itera sobre cada arquivo automaticamente. O resultado é uma lista de objetos JSON — um por documento — que você converte em planilha com um único comando. Uma pasta com 100 notas fiscais fica pronta em menos de 3 minutos.',
      },
      {
        type: 'heading',
        text: 'Onde esse fluxo economiza mais tempo',
      },
      {
        type: 'paragraph',
        text: 'Contabilidade: notas fiscais e extratos bancários. Jurídico: contratos e laudos — extraindo partes, prazo e cláusulas críticas. Operações: relatórios de múltiplos fornecedores consolidados numa tabela única. Se o seu processo envolve "abrir documento, ler, copiar para planilha", esse fluxo elimina o trabalho manual inteiramente.',
      },
    ],
  },

  {
    slug: 'print-de-site-claude-reconstroi-para-voce',
    bgImage: '/images/bg-claude-code.png',
    data: '2026-07-09',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Tire um Print de Qualquer Site e o Claude Reconstrói Ele pra Você',
    ferramenta: 'Claude Code (visão multimodal)',
    link: 'https://claude.ai/code',
    categoryId: 'apps',
    keyword_cta: 'CLONE',
    pilar: 'Desenvolvimento',
    duracao: '40s',
    longDescription: [
      'Um dev cobra R$4.000 para recriar o layout de um site que você admira. Antes disso, você precisa descrever o que quer para um designer, esperar o wireframe, aprovar, esperar o código, revisar. Com o Claude, você tira um print e cola diretamente na conversa — o código aparece em minutos.',
      'O Claude é multimodal: lê screenshots como um designer lê uma tela. Não é OCR — é compreensão de layout. Ele identifica grid, espaçamento, tipografia, hierarquia visual e componentes. A partir do print, gera o componente React com a estrutura visual do original, sem copiar o código-fonte e sem inspecionar o DOM.',
      'Referência deixa de ser inspiração e vira insumo. Você não descreve o que quer — você mostra. E ajusta por conversa: "muda a paleta para o meu brand", "adiciona um CTA laranja embaixo do headline". Cada pedido refina sem jogar o trabalho anterior fora.',
    ],
    features: [
      {
        title: 'Claude lê screenshots como designer',
        description: 'Visão multimodal identifica grid, espaçamento, tipografia e hierarquia visual — não é OCR, é compreensão de layout real.',
        icon: 'design',
      },
      {
        title: 'Do print ao componente React',
        description: 'Cole o screenshot e descreva o stack. O Claude gera o componente com a estrutura visual do original — sem copiar código-fonte.',
        icon: 'framework',
      },
      {
        title: 'Ajustes por conversa',
        description: '"Muda a paleta", "tira o vídeo de fundo", "adiciona CTA laranja." Cada pedido refina sem descartar o trabalho anterior.',
        icon: 'message',
      },
      {
        title: 'Sem inspecionar DOM, sem copiar código',
        description: 'O Claude reconstrói a partir da imagem — nenhum acesso ao código-fonte do site original é necessário ou usado.',
        icon: 'automation',
      },
      {
        title: 'Casos reais: hero, cards, depoimentos',
        description: 'Hero section, card de produto, seção de depoimentos — qualquer layout que você nunca conseguiu descrever em palavras vira ponto de partida.',
        icon: 'website',
      },
      {
        title: 'Referência vira insumo, não inspiração',
        description: 'Você não descreve o que quer — você mostra. O Claude traduz o visual em código estruturado, pronto para adaptar ao seu projeto.',
        icon: 'copywriting',
      },
    ],
    primaryLink: 'https://claude.ai/code',
    primaryLabel: 'Abrir o Claude Code',
    isExternal: true,
    author: '@joaoguirunas',
    authorUrl: 'https://instagram.com/joaoguirunas',
    body: [
      {
        type: 'heading',
        text: 'Como o Claude lê um screenshot',
      },
      {
        type: 'paragraph',
        text: 'O Claude não faz OCR — ele compreende o layout como um designer faria. Ao receber um screenshot, identifica o grid (quantas colunas, qual o gap), espaçamento interno dos elementos, hierarquia de tipografia (título, subtítulo, corpo), componentes (card, hero, navbar) e a relação visual entre eles. É esse entendimento que permite gerar código estruturado, não uma cópia superficial.',
      },
      {
        type: 'heading',
        text: 'Do print ao componente — passo a passo',
      },
      {
        type: 'steps',
        items: [
          'Tire um screenshot do layout que você quer recriar — pode ser uma seção específica, não precisa ser a página inteira.',
          'Cole o print diretamente na conversa do Claude Code.',
          'Descreva o stack: "Reconstrói isso em React com Tailwind. Quero um componente reutilizável."',
          'Revise o output no preview. O Claude mantém a estrutura visual mesmo sem ver o código original.',
          'Itere por chat: adapte paleta, tipografia, espaçamento e conteúdo ao seu projeto.',
        ],
      },
      {
        type: 'callout',
        text: 'Dê preferência a screenshots de uma seção por vez — hero, cards, footer. O Claude performa melhor com escopo menor e mais focado.',
      },
      {
        type: 'heading',
        text: 'Refinando por conversa',
      },
      {
        type: 'paragraph',
        text: 'Após a geração inicial, cada ajuste é uma mensagem de texto. Você não precisa reescrever o prompt inteiro nem fornecer o print de novo — o Claude mantém contexto da sessão e aplica cada mudança cirurgicamente no componente existente.',
      },
      {
        type: 'heading',
        text: 'Casos de uso que funcionam bem',
      },
      {
        type: 'paragraph',
        text: 'Hero section de um concorrente que você admira. Card de produto de uma referência internacional. Seção de depoimentos com layout que você nunca conseguiu descrever em palavras. Navbar com mega-menu. Qualquer desses vira ponto de partida — você adapta ao seu brand na conversa.',
      },
    ],
  },

  {
    slug: 'ia-roteiro-video-nao-performou',
    bgImage: '/images/bg-designer.png',
    data: '2026-07-10',
    slot: 'A',
    formato: 'Reel',
    titulo: 'IA Gerou o Roteiro, Eu Gravei — Por Que o Vídeo Não Performou Nada',
    ferramenta: 'Claude',
    link: '/open-source/ia-roteiro-video-nao-performou',
    categoryId: 'skills',
    keyword_cta: 'ROTEIRO',
    pilar: 'Produção de Conteúdo com IA',
    duracao: '60s',
    longDescription: [
      'Eu usei IA pra gerar um roteiro, gravei, publiquei — e o vídeo não performou nada. A estrutura estava tecnicamente certa: hook nos primeiros segundos, CTA no final. O problema estava no que eu não passei pra IA antes de pedir o roteiro.',
      'A IA não sabe como você para. Não sabe a pausa que você faz antes de dizer algo importante. Não sabe as referências que fazem sentido para quem te acompanha há meses. O roteiro ficou certo no papel — mas o seu sotaque de criador ficou de fora. As pessoas pararam de assistir nos primeiros 15 segundos.',
      'A correção é simples: antes de pedir o roteiro, você mostra pra IA quem você é como criador. Três transcrições dos seus vídeos que mais performaram, o seu ritmo de fala, os ganchos que funcionam com a sua audiência. Quando a IA tem esse material, o roteiro que ela gera soa como você — não como um template.',
    ],
    features: [
      {
        title: 'O briefing de criador antes do roteiro',
        description: 'O erro: pedir roteiro sem contexto. A correção: alimentar a IA com transcrições de vídeos seus que performaram antes de pedir qualquer coisa.',
        icon: 'copywriting',
      },
      {
        title: 'Transcrições como material de referência',
        description: 'Três vídeos seus que performaram bem ensinam à IA seu ritmo, suas pausas e as referências que ressoam com a sua audiência.',
        icon: 'book',
      },
      {
        title: 'Estrutura certa ≠ vídeo que performa',
        description: 'Hook, desenvolvimento e CTA no lugar certo não bastam. O sotaque do criador — o jeito que é seu — é o que segura a retenção.',
        icon: 'design',
      },
      {
        title: 'Retenção: o dado que diz a verdade',
        description: 'Queda abrupta nos primeiros 15 segundos revela que a audiência reconheceu o template — e pulou. Retenção acima de 60% é sinal de autenticidade.',
        icon: 'dashboard',
      },
      {
        title: 'Ritmo, pausa e sotaque de criador',
        description: 'A IA aprende o seu estilo com exemplos reais: onde você hesita, onde você acelera, que tipo de gancho prende quem já te conhece.',
        icon: 'agents',
      },
      {
        title: 'Template de briefing para roteiro com IA',
        description: 'O arquivo completo com os campos do briefing de criador — transcrições de referência, ritmo, audiência e restrições — pronto para usar.',
        icon: 'framework',
      },
    ],
    primaryLink: '/open-source/ia-roteiro-video-nao-performou',
    isExternal: false,
    author: '@joaoguirunas',
    authorUrl: 'https://instagram.com/joaoguirunas',
    body: [
      {
        type: 'heading',
        text: 'O que aconteceu com o vídeo',
      },
      {
        type: 'paragraph',
        text: 'A IA entregou um roteiro tecnicamente impecável. Estrutura correta, hook nos primeiros segundos, CTA no final. Eu segui à risca, gravei e publiquei. O vídeo ficou sem graça — robótico. As pessoas pararam de assistir nos primeiros 15 segundos. 18% de retenção com 312 views. O roteiro estava certo. O vídeo estava errado.',
      },
      {
        type: 'heading',
        text: 'Por que aconteceu',
      },
      {
        type: 'paragraph',
        text: 'O problema não estava no roteiro. Estava no que eu não passei pra IA antes de pedir o roteiro. A IA não sabe como você para. Ela não sabe a pausa que você faz antes de dizer algo importante. Ela não sabe que você costuma jogar uma pergunta pro espectador antes de responder. Ela não sabe as referências que fazem sentido pra quem te acompanha. O roteiro ficou certo no papel. Mas o seu sotaque de criador ficou de fora.',
      },
      {
        type: 'heading',
        text: 'A correção: briefing de criador antes do roteiro',
      },
      {
        type: 'steps',
        items: [
          'Selecione 3 vídeos seus que performaram acima da média — retenção ou engajamento acima do normal.',
          'Transcreva os 3 (use qualquer transcritor automático — não precisa ser perfeito).',
          'Cole as transcrições na conversa e peça ao Claude: "Analise meu estilo: ritmo, tipo de hook que uso, como encerro, referências recorrentes."',
          'Adicione ao briefing: ritmo de fala, pausas intencionais, ganchos que funcionam com sua audiência, temas que você nunca aborda.',
          'Só então peça o roteiro — agora com o briefing completo carregado no contexto.',
        ],
      },
      {
        type: 'code',
        language: 'markdown',
        code: `# Briefing de Criador — Template

## Transcrições de referência
[Cola aqui 3 transcrições de vídeos seus que performaram bem]

## Meu estilo de criador
- Ritmo: [ex: começo rápido, pauso antes do ponto principal]
- Hook que funciona com minha audiência: [ex: pergunta retórica / dado surpreendente]
- Referências recorrentes: [ex: ferramentas que uso, analogias comuns]
- O que nunca funciona comigo: [ex: linguagem muito formal, jargão técnico]

## Audiência
- Quem me assiste: [perfil]
- O que já sabe: [nível de conhecimento]
- O que quer resolver: [dor principal]

## Restrições do vídeo
- Duração: [ex: 45-60s]
- Tom: [ex: direto, sem introdução longa]`,
      },
      {
        type: 'callout',
        text: 'Salve o briefing de criador no CLAUDE.md do seu projeto de conteúdo. Toda vez que pedir um roteiro, o Claude vai carregar automaticamente quem você é — sem você colar de novo.',
      },
    ],
  },

  {
    slug: 'skill-que-faz-claude-virar-analista-de-dados',
    bgImage: '/images/bg-monitor.png',
    data: '2026-07-11',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Cole Sua Planilha de Vendas Bagunçada e Receba um Diagnóstico com 3 Recomendações',
    ferramenta: 'Claude Code + Skill de Análise',
    link: '/open-source',
    categoryId: 'skills',
    keyword_cta: 'MARGEM',
    pilar: 'Case / Resultado',
    duracao: '42s',
    longDescription: [
      'Sua planilha tem colunas fora de ordem, nomes errados e linhas duplicadas. Não importa. Em 3 minutos você tem o diagnóstico. Analista pode cobrar R$3.500 pra fazer isso — você configura a skill do Claude uma vez e qualquer planilha bagunçada vira relatório com 3 recomendações.',
      'Você joga a planilha como está e faz a pergunta que importa: "Onde estou perdendo margem?" O Claude não só limpa a bagunça. Procura o que está fora do padrão. Compara os números. Identifica anomalias. E entrega 3 recomendações que dá pra executar hoje — não um resumo descritivo do que está na planilha.',
      'O resultado em 3 minutos: diagnóstico com anomalias identificadas, cruzamento de variáveis e recomendações prontas para agir. Sem saber SQL. Sem configurar Power BI. Sem esperar o analista liberar o relatório da semana.',
    ],
    features: [
      {
        title: 'Analista sênior em vez de estagiário',
        description: 'Com a skill instalada, o Claude não descreve dados — interpreta. Procura anomalias, cruza variáveis e entrega diagnóstico com recomendações.',
        icon: 'agents',
      },
      {
        title: 'Análise exploratória e anomalias',
        description: 'A skill ensina o Claude a procurar o que está fora do padrão: queda atípica, produto com margem decrescente, cliente que sumiu — sem você pedir.',
        icon: 'dashboard',
      },
      {
        title: 'Planilha bagunçada? Tudo bem',
        description: 'Colunas fora de ordem, nomes diferentes em cada aba, linhas duplicadas. O Claude limpa os dados antes de analisar — parte do fluxo, não um bloqueio.',
        icon: 'database',
      },
      {
        title: 'Relatório de performance de conteúdo',
        description: 'Dados do Instagram, YouTube ou Google Analytics. O Claude cruza formato × engajamento × horário × tema e diz qual combinação tem melhor retorno.',
        icon: 'copywriting',
      },
      {
        title: 'Análise financeira simplificada',
        description: 'DRE, fluxo de caixa, comparativo de meses. O Claude lê, identifica onde o dinheiro some e escreve o executive summary para apresentar ao sócio.',
        icon: 'book',
      },
      {
        title: 'Instalação em 2 minutos',
        description: 'Um arquivo .md na pasta de skills do Claude Code. Ativado com /analista-dados em qualquer sessão. Disponível para download no repositório.',
        icon: 'deploy',
      },
    ],
    primaryLink: '/open-source',
    primaryLabel: 'Ver todos os recursos',
    isExternal: false,
    author: '@joaoguirunas',
    authorUrl: 'https://instagram.com/joaoguirunas',
    body: [
      {
        type: 'heading',
        text: 'Claude sem skill vs. Claude com skill de analista',
      },
      {
        type: 'paragraph',
        text: 'Sem contexto, o Claude trata qualquer planilha como texto — descreve o que vê, responde o que você pergunta. Com a skill de analista instalada, ele entra num modo diferente: assume o papel de analista sênior, aplica uma estrutura de análise exploratória e entrega proativamente o que você não pediu, mas precisava saber.',
      },
      {
        type: 'heading',
        text: 'O que a skill ensina ao Claude',
      },
      {
        type: 'steps',
        items: [
          'Estrutura de análise exploratória: primeiro entende a qualidade dos dados, depois analisa o conteúdo.',
          'Checklist de anomalias: valores fora do padrão, crescimento atípico, ausências que deveriam estar presentes.',
          'Framework de storytelling: o diagnóstico vem acompanhado de contexto — "o mês X caiu porque Y", não só "o mês X caiu".',
          'Gatilhos de alerta por tipo de métrica: margem, CAC, engajamento e receita têm thresholds diferentes para acionar atenção.',
        ],
      },
      {
        type: 'heading',
        text: 'Na prática: planilha de vendas em 3 minutos',
      },
      {
        type: 'code',
        language: 'text',
        code: `/analista-dados

Aqui está minha planilha de vendas de janeiro a junho.
Colunas: Data, Produto, Quantidade, Valor, Canal, Região.
Alguns meses têm dados faltando em "Canal".

O que você identifica de relevante?`,
      },
      {
        type: 'callout',
        text: 'Ative a skill com /analista-dados no início da conversa. Sem isso, o Claude responde no modo padrão — sem a estrutura de análise exploratória da skill.',
      },
      {
        type: 'heading',
        text: 'Como instalar a skill',
      },
      {
        type: 'steps',
        items: [
          'Baixe o arquivo skill-analista-dados.md do repositório open source.',
          'Salve em ~/.claude/skills/ para usar em todas as sessões, ou em .claude/skills/ dentro do projeto para escopo local.',
          'Na próxima sessão do Claude Code, digite /analista-dados para ativar.',
          'Jogue qualquer planilha e peça a análise — a skill já está ativa.',
        ],
      },
    ],
  },

  {
    slug: 'claude-code-le-emails-e-prioriza-o-que-importa',
    bgImage: '/images/bg-google.png',
    data: '2026-07-12',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Claude Code Lê Seus Emails e Prioriza o que Importa',
    ferramenta: 'Claude + Gmail MCP',
    link: 'PENDENTE: link do Gmail MCP',
    categoryId: 'integracoes',
    keyword_cta: 'TIME',
    pilar: 'Automação de Processos',
    duracao: '42s',
    longDescription: [
      'Inbox zero não é sobre disciplina — é sobre sistema. Responder email é trabalho importante. Ler email para descobrir se é importante é desperdício de tempo de atenção. Uma assistente de email custa R$4.000 por mês, e ainda deixa coisa passar. O Claude lê, classifica e responde por você. De graça. Enquanto você dorme.',
      'Com o MCP do Gmail, o Claude acessa sua caixa de entrada via API oficial do Google — sem plugin, sem extensão de terceiro, sem dar senha para ninguém. Você define as regras uma vez em linguagem natural: "email de cliente ativo é urgente", "proposta nova responde agradecendo e pede horário de reunião", "newsletter vai direto para leitura semanal." A partir daí, o Claude aplica automaticamente.',
      'O resultado no dia a dia: você acorda com os emails já triados por prioridade e os rascunhos de resposta prontos no seu tom de voz. Todo dia às 8h, um resumo chega via Slack ou WhatsApp — "3 urgentes, 2 aguardam resposta, 1 proposta nova" — e você decide o que abrir antes de abrir qualquer coisa.',
    ],
    features: [
      {
        title: 'Triagem automática por prioridade',
        description: 'O Claude lê cada email, aplica suas regras e classifica por urgência — clientes ativos, propostas, suporte, newsletters — sem você abrir a caixa de entrada.',
        icon: 'automation',
      },
      {
        title: 'Regras em linguagem natural',
        description: 'Você escreve em português: "email de cliente ativo é urgente", "proposta responde pedindo horário". Sem configurar filtros técnicos.',
        icon: 'message',
      },
      {
        title: 'Rascunhos no seu tom de voz',
        description: 'Para emails que precisam de resposta, o Claude lê o histórico da conversa e escreve o rascunho. Você revisa em 10 segundos e envia.',
        icon: 'copywriting',
      },
      {
        title: 'Resumo diário sem abrir o email',
        description: 'Todo dia às 8h: "3 emails urgentes, 2 aguardam resposta, 7 newsletters." Você decide o que abrir antes de abrir qualquer coisa.',
        icon: 'agents',
      },
      {
        title: 'Gmail MCP via OAuth — sem expor senha',
        description: 'Conexão via API oficial do Google com permissão OAuth. Você autoriza e pode revogar a qualquer momento. O Claude não armazena seus emails.',
        icon: 'plugin',
      },
      {
        title: 'Zero email perdido, zero tempo perdido',
        description: 'Nenhum cliente sem resposta, nenhuma proposta esquecida, nenhuma aba de email aberta o dia todo. O sistema cuida enquanto você trabalha no que importa.',
        icon: 'deploy',
      },
    ],
    primaryLink: '/open-source',
    primaryLabel: 'Ver todos os recursos',
    isExternal: false,
    author: '@joaoguirunas',
    authorUrl: 'https://instagram.com/joaoguirunas',
    body: [
      {
        type: 'heading',
        text: 'Inbox zero é um problema de sistema, não de disciplina',
      },
      {
        type: 'paragraph',
        text: 'Você não tem problema de produtividade — você tem um problema de triagem. O email mistura urgente com irrelevante, e o custo de separar os dois é pago em atenção toda vez que você abre a caixa. O Gmail MCP resolve na raiz: o Claude faz a triagem, você só vê o que realmente precisa de você.',
      },
      {
        type: 'heading',
        text: 'Como configurar o Gmail MCP',
      },
      {
        type: 'steps',
        items: [
          'Acesse o Google Cloud Console e crie um projeto para o MCP do Gmail.',
          'Ative a Gmail API e configure as credenciais OAuth com escopo de leitura e modificação.',
          'Instale o servidor MCP do Gmail no Claude Code e autentique com suas credenciais.',
          'Defina as regras de triagem em linguagem natural no CLAUDE.md do projeto.',
          'Execute o agente manualmente ou configure para rodar automaticamente em horários fixos.',
        ],
      },
      {
        type: 'heading',
        text: 'Definindo suas regras de prioridade',
      },
      {
        type: 'code',
        language: 'markdown',
        code: `## Regras de triagem de email

**Urgente (responder hoje):**
- Emails de clientes ativos (lista: nome1, nome2, nome3)
- Qualquer email com "urgente" ou "prazo" no assunto

**Importante (responder em 24h):**
- Propostas comerciais novas
- Parcerias e colaborações

**Normal (responder em 48h):**
- Dúvidas gerais de produto
- Suporte pós-venda

**Baixa prioridade (leitura semanal):**
- Newsletters
- Emails de plataformas (Notion, Loom, etc.)`,
      },
      {
        type: 'callout',
        text: 'Comece com 3-4 categorias simples. Depois de uma semana rodando, você vai identificar os padrões que faltam e refinar as regras — sem reconfigurar tudo.',
      },
      {
        type: 'heading',
        text: 'Privacidade e o que o Claude não armazena',
      },
      {
        type: 'paragraph',
        text: 'O MCP lê via API oficial do Gmail com permissão OAuth — você autoriza escopos específicos (leitura, modificação de labels, criação de rascunhos) e pode revogar a qualquer momento no painel do Google. O Claude processa os emails em sessão e não armazena o conteúdo. Nenhum email é enviado a servidores da Anthropic — o processamento acontece localmente.',
      },
    ],
  },

  {
    slug: 'como-criar-sua-propria-skill-claude-code-do-zero',
    bgImage: '/images/bg-skills.png',
    data: '2026-07-13',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Ensine Uma Habilidade ao Claude Uma Vez — Ele Repete pra Sempre',
    ferramenta: 'Claude Code (skills)',
    link: 'https://claude.ai/code',
    categoryId: 'skills',
    keyword_cta: 'SKILL',
    pilar: 'Ferramentas e Produtividade',
    duracao: '40s',
    longDescription: [
      'Você digita /proposta. O Claude entrega a proposta no seu formato, com o seu tom, sem nenhuma instrução adicional. Uma vez configurado — roda em qualquer projeto, sem explicar de novo. Você tem um jeito de fazer as coisas. O Claude aprende esse jeito uma vez e repete pra sempre.',
      'Você ensina ao Claude os passos, as regras e as exceções do seu processo — proposta comercial, relatório semanal, padrão de resposta ao suporte. A partir daí, você fala o nome do processo em um comando e ele executa tudo no formato certo. Sem você explicar nada de novo. O padrão da sua empresa começa a se multiplicar.',
      'A regra prática: se você repetiu a mesma instrução mais de 3 vezes em sessões diferentes, ela virou candidata a skill. Sem criar documentação. Sem explicar de novo pra cada ferramenta nova. Sem reescrever o padrão do zero cada vez. Você ensina uma vez — o Claude executa em qualquer projeto.',
    ],
    features: [
      {
        title: 'Estrutura simples em markdown',
        description: 'Cabeçalho de identidade, contexto de ativação, regras absolutas, comportamentos esperados e exemplos. Sem formatação especial — markdown simples.',
        icon: 'book',
      },
      {
        title: 'Onde salvar e como o Claude descobre',
        description: 'Em ~/.claude/skills/ para todas as sessões, ou em .claude/skills/ dentro do projeto. O Claude descobre automaticamente pelo nome do arquivo.',
        icon: 'deploy',
      },
      {
        title: 'Exemplo completo: revisão de copy',
        description: 'Uma skill que aplica seus critérios de clareza, ritmo, CTA e tom de voz a qualquer texto. Mostra o antes, o depois e o que avaliou em cada ponto.',
        icon: 'copywriting',
      },
      {
        title: 'Testando e refinando',
        description: 'Teste com 3 inputs diferentes, observe onde o Claude desvia do esperado, refine a instrução. Skill boa é skill iterada — não a primeira versão.',
        icon: 'automation',
      },
      {
        title: 'Skills que vale a pena criar',
        description: 'Brief de cliente, revisão de código no seu padrão, onboarding de projeto, análise de métricas. Se você repetiu a instrução 3 vezes, é candidata a skill.',
        icon: 'obsidian',
      },
      {
        title: 'Do zero à skill funcionando em 20 minutos',
        description: 'Escreve o arquivo, salva na pasta certa, testa com /nome-da-skill. Na primeira sessão já está ativo e funcionando.',
        icon: 'framework',
      },
    ],
    primaryLink: 'https://claude.ai/code',
    primaryLabel: 'Abrir o Claude Code',
    isExternal: true,
    author: '@joaoguirunas',
    authorUrl: 'https://instagram.com/joaoguirunas',
    body: [
      {
        type: 'heading',
        text: 'O que é uma skill e por que criar a sua',
      },
      {
        type: 'paragraph',
        text: 'Uma skill é um arquivo markdown que instrui o Claude sobre como se comportar em contextos específicos. Quando você ativa uma skill, o Claude entra num modo diferente — com identidade, regras e comportamentos definidos por você. Skills prontas cobrem casos genéricos; a sua skill cobre o seu caso. É a diferença entre um assistente treinado para qualquer coisa e um assistente treinado para o seu negócio.',
      },
      {
        type: 'heading',
        text: 'Estrutura de um arquivo de skill',
      },
      {
        type: 'code',
        language: 'markdown',
        code: `---
name: revisao-copy
description: Revisa qualquer texto aplicando os critérios de copy do negócio
---

# Revisão de Copy — [Nome do Negócio]

## Identidade
Você é o revisor de copy do [Nome do Negócio]. Seu papel é revisar
textos aplicando os critérios de qualidade definidos abaixo.

## Quando ativar
Qualquer texto destinado a publicação: legenda de Instagram, email
de vendas, página de produto, roteiro de vídeo.

## Regras absolutas
- Nunca usar jargão técnico sem explicação imediata
- CTA sempre na última linha, sempre com verbo de ação
- Parágrafos com máximo 3 linhas

## Comportamento esperado
1. Leia o texto completo
2. Identifique os 3 pontos mais críticos
3. Entregue versão revisada com comentários inline
4. Explique cada mudança em uma linha

## Exemplo de input/output
Input: [texto original]
Output: [versão revisada] + [comentários das mudanças]`,
      },
      {
        type: 'heading',
        text: 'Onde salvar a skill',
      },
      {
        type: 'paragraph',
        text: 'Para usar em todos os projetos: salve em ~/.claude/skills/revisao-copy.md. Para um projeto específico: salve em .claude/skills/revisao-copy.md dentro da pasta do projeto. O Claude descobre automaticamente pelo nome do arquivo — nenhuma configuração adicional necessária.',
      },
      {
        type: 'callout',
        text: 'Use a pasta do projeto (~/.claude/skills/) para skills de negócio (tom de voz, critérios de copy) e a pasta local (.claude/skills/) para skills técnicas de um projeto específico (padrões de código, arquitetura).',
      },
      {
        type: 'heading',
        text: 'Como testar e refinar',
      },
      {
        type: 'steps',
        items: [
          'Ative com /revisao-copy em uma nova sessão.',
          'Passe 3 inputs diferentes: um texto bom, um mediano e um ruim. A skill deve tratar cada um de forma diferente.',
          'Observe onde o Claude desvia do comportamento esperado — geralmente nas regras mais ambíguas.',
          'Refine a instrução com mais especificidade: "nunca" em vez de "evite", exemplo concreto em vez de descrição abstrata.',
          'Rode os mesmos 3 inputs depois da revisão e compare os outputs.',
        ],
      },
      {
        type: 'heading',
        text: 'Skills que todo criador deveria ter',
      },
      {
        type: 'steps',
        items: [
          'Revisão de copy — aplica seus critérios de tom de voz e CTA a qualquer texto.',
          'Brief de cliente — extrai objetivo, público, entregável e prazo de qualquer briefing informal.',
          'Onboarding de projeto — apresenta contexto, stack e regras para qualquer nova sessão do Claude Code.',
          'Análise de métricas — interpreta dados do seu negócio com os KPIs que importam para você.',
        ],
      },
    ],
  },
]
