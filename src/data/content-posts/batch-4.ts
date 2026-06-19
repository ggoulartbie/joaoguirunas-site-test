import { ContentPost } from '@/types/content-post'

export const batch4: ContentPost[] = [
  {
    slug: 'como-instalar-mcps-no-claude-code-em-5-passos',
    data: '2026-06-22',
    slot: 'B',
    formato: 'Carrossel',
    titulo: 'Como Instalar MCPs no Claude Code em 5 Passos',
    ferramenta: 'Claude Code MCPs (Model Context Protocol)',
    link: 'https://modelcontextprotocol.io',
    roteiro: `## Slide 1 — Capa

**Texto principal:**
COMO INSTALAR MCPs
NO CLAUDE CODE

**Subtítulo:**
5 passos — do zero à ferramenta conectada

---

## Slide 2 — O que é MCP

**Título:** MCP — o que é e por que importa

MCP significa Model Context Protocol.

É o padrão que permite o Claude Code se conectar a ferramentas externas reais — Instagram, Notion, ElevenLabs, GitHub, bancos de dados.

Sem MCP: Claude é uma janela de chat.
Com MCP: Claude é um agente que age no mundo real.

Cada MCP instalado adiciona uma capacidade nova. Você decide quais ferramentas o Claude pode usar.

---

## Slide 3 — Passo 1: Encontrar o MCP certo

**Título:** Passo 1 — Onde achar MCPs

Três fontes principais:
— **mcp.run** — repositório oficial com dezenas de MCPs prontos
— **GitHub** — pesquise "awesome-mcp-servers" para listas da comunidade
— **npm** — muitos MCPs são pacotes Node instaláveis diretamente

Antes de instalar, verifique: tem documentação? Tem atualizações recentes? É mantido por quem?

---

## Slide 4 — Passo 2: Abrir as configurações do Claude Code

**Título:** Passo 2 — Arquivo de configuração

O Claude Code lê os MCPs do arquivo:
\`~/.claude/settings.json\`

Se não existir ainda, crie com:
\`touch ~/.claude/settings.json\`

Abra no seu editor de texto preferido. É aqui que você vai adicionar cada MCP.

---

## Slide 5 — Passo 3: Adicionar o MCP no JSON

**Título:** Passo 3 — Configuração no JSON

Estrutura básica:

\`\`\`json
{
  "mcpServers": {
    "nome-do-mcp": {
      "command": "npx",
      "args": ["-y", "pacote-do-mcp"],
      "env": {
        "API_KEY": "sua-chave-aqui"
      }
    }
  }
}
\`\`\`

Cada MCP tem sua própria documentação com os valores exatos para preencher aqui.

---

## Slide 6 — Passo 4: Testar a conexão

**Título:** Passo 4 — Verificar se está funcionando

Reinicie o Claude Code depois de salvar o JSON.

Rode \`/doctor\` para checar se o MCP foi reconhecido.

Se estiver ativo, vai aparecer na lista de ferramentas disponíveis quando você iniciar uma nova sessão.

Teste com um comando simples da ferramenta conectada.

---

## Slide 7 — Exemplos de MCPs úteis

**Título:** MCPs que vale instalar primeiro

— **Apify** — scraping de Instagram, TikTok, web
— **ElevenLabs** — geração de áudio e voiceover em PT-BR
— **GitHub** — commit, PR e review direto no Claude
— **Notion** — ler e escrever no seu workspace
— **Puppeteer** — automação de browser (preencher formulários, fazer screenshots)
— **filesystem** — Claude lê e edita arquivos do seu computador

---

## Slide 8 — CTA

**Texto:**
Comenta MCP que eu te mando a lista completa com os 10 MCPs que uso todo dia — com configuração pronta.

Salva esse post para instalar no próximo projeto.`,
    legenda: `Comenta MCP que eu te mando a lista completa com os 10 MCPs que uso todo dia — com configuração pronta para colar.

MCP é o que transforma o Claude Code de ferramenta de chat em agente que age no mundo real. Com MCP, o Claude conecta ao Instagram, Notion, GitHub, ElevenLabs, Apify — qualquer ferramenta que você usa no trabalho.

Sem MCP, você usa 20% do que o Claude Code entrega. O passo a passo completo de instalação está no carrossel: do que é MCP, onde encontrar, como configurar o JSON, como testar e quais instalar primeiro. 🤖

5 minutos de setup. Capacidades que transformam o que você consegue fazer com a ferramenta.

Se você usa Claude Code sem MCPs, você ainda não viu o que a ferramenta realmente entrega.

#claudecode #mcp #modelcontextprotocol #ia #inteligenciaartificial #ferramentasIA #automacao #aiagents #produtividade #developer #integracoes #nocodetips`,
    keyword_cta: 'MCP',
    pilar: 'Ferramentas e Produtividade',
    duracao: '8 slides',
  },
  {
    slug: 'cria-sites-completos-so-descrevendo',
    data: '2026-06-23',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Cria Sites Completos Só Descrevendo',
    ferramenta: 'Claude Code + skills de UI (setup completo)',
    link: 'https://claude.ai/code',
    roteiro: `Chega de desperdiçar dinheiro com designer.

Com o setup certo no Claude Code, você descreve o site e ele entrega: layout, animações, seções completas, tipografia, cores — tudo.

A diferença entre um site amador e um site profissional saindo do Claude está em dois passos.

Passo um: adicionar skills de UI de qualidade.
Sem elas, o Claude gera o que aprendeu do dataset — que inclui muito site ruim. Com skills certas, ele passa a entender estrutura, espaçamento, hierarquia visual e padrões reais de UI.

Passo dois: conectar ferramentas reais de design.
Não construir em isolamento. O Claude precisa de contexto sobre animações, componentes modernos e padrões de interface que funcionam em produção.

Com esses dois passos no lugar, o resultado muda completamente.
Em vez de landing page genérica, você tem site que parece produção real — do tipo que cobra R$15.000.

Comenta SETUP que eu te mando o guia de configuração dos dois passos agora.`,
    legenda: `Comenta SETUP que eu te mando o guia completo dos dois passos para configurar agora.

Designer custa caro. Template fica genérico. Com Claude Code no setup certo, você descreve o site e ele entrega layout, animação, seções e tipografia de verdade — sem gastar R$3.000 por mês com profissional.

A diferença entre resultado amador e resultado profissional está em dois ajustes: skills de UI de qualidade (o Claude passa a entender design real) e conexão com ferramentas modernas de componentes (ele constrói com padrões de produção, não templates de 2019). 🏗️

A maioria usa Claude Code sem essas duas configurações. E aí o resultado parece genérico — não porque a AI é ruim, mas porque o setup está incompleto.

Dois passos. Setup feito uma vez. Sites que impressionam para sempre.

#claudecode #webdesign #ia #inteligenciaartificial #site #desenvolvimentoweb #uiux #ferramentasIA #semdesigner #automacao #produtividade #claudeskills`,
    keyword_cta: 'SETUP',
    pilar: 'Produção de Conteúdo com IA',
    duracao: '41s',
  },
  {
    slug: '5-erros-que-estao-sabotando-seus-resultados-com-claude',
    data: '2026-06-23',
    slot: 'B',
    formato: 'Carrossel',
    titulo: '5 Erros que Estão Sabotando Seus Resultados com Claude',
    ferramenta: 'Claude Code (erros comuns)',
    link: 'https://claude.ai/code',
    roteiro: `## Slide 1 — Capa

**Texto principal:**
5 ERROS QUE ESTÃO SABOTANDO
SEUS RESULTADOS COM CLAUDE

**Subtítulo:**
A maioria comete todos os cinco

---

## Slide 2 — Erro 1

**Título:** Erro 1 — Pedir tudo em um único prompt

**O que acontece:**
Você descreve o projeto inteiro numa mensagem. O Claude tenta resolver tudo de uma vez e o resultado fica pela metade.

**Por que acontece:**
O Claude performa melhor com tarefas focadas. Quando o escopo é grande demais, ele toma decisões arbitrárias no que não foi especificado.

**Como corrigir:**
Quebre em etapas. Um prompt por entrega. "Cria só a estrutura de arquivos" antes de "escreve o código completo".

---

## Slide 3 — Erro 2

**Título:** Erro 2 — Não usar CLAUDE.md

**O que acontece:**
Você explica o contexto do projeto do zero em toda sessão nova. O Claude começa sem memória. Você perde tempo e consistência cai.

**Por que acontece:**
Sem CLAUDE.md, o Claude não tem contexto persistente. Cada sessão é uma conversa nova com um estranho.

**Como corrigir:**
Crie um CLAUDE.md com: stack técnica, convenções do projeto, tom de comunicação, o que nunca fazer. O Claude lê automaticamente ao iniciar.

---

## Slide 4 — Erro 3

**Título:** Erro 3 — Aceitar a primeira resposta

**O que acontece:**
O Claude entrega algo. Você usa sem questionar. O resultado é mediano.

**Por que acontece:**
A primeira resposta é a mais provável, não a melhor. O Claude precisa de iteração para refinar.

**Como corrigir:**
Peça alternativas: "Gera mais 3 versões diferentes desta solução." Compare. Escolha a melhor ou combine elementos das três.

---

## Slide 5 — Erro 4

**Título:** Erro 4 — Não usar MCPs

**O que acontece:**
Você usa o Claude só para gerar texto ou código. Copia manualmente para outras ferramentas. Perde horas em tarefas repetitivas.

**Por que acontece:**
Sem MCPs, o Claude não conecta ao mundo real. Ele trabalha em isolamento.

**Como corrigir:**
Instale os MCPs das ferramentas que você usa. Claude conectado ao Notion, GitHub, ElevenLabs muda completamente o que é possível automatizar.

---

## Slide 6 — Erro 5

**Título:** Erro 5 — Usar a versão errada do modelo

**O que acontece:**
Você usa o Claude Haiku ou Sonnet para tarefas complexas de arquitetura ou estratégia. A resposta parece superficial. Você acha que o Claude "não serve".

**Por que acontece:**
Modelos menores são rápidos e baratos — mas para raciocínio profundo, precisam do modelo certo.

**Como corrigir:**
Para tarefas simples e rápidas: Haiku. Para desenvolvimento e criação: Sonnet 4.6. Para decisões estratégicas e problemas complexos: ative Extended Thinking.

---

## Slide 7 — CTA

**Texto:**
Salva esse post — você vai querer revisar esses erros antes do próximo projeto.

Qual desses você estava cometendo? Comenta o número embaixo.`,
    legenda: `Salva esse post — você vai querer revisar esses erros antes do próximo projeto.

"O Claude não entrega o que eu quero." Na maioria dos casos, não é o Claude. É como você está usando.

5 erros que a maioria comete: pedir tudo num único prompt (quebre em etapas), não usar CLAUDE.md (contexto persistente muda tudo), aceitar a primeira resposta sem iterar (a primeira é a mais provável, não a melhor), não ter MCPs instalados (Claude em isolamento entrega metade do que poderia) e usar o modelo errado para o tipo de tarefa. 🤖

Cada um desses tem uma correção simples. Corrige os cinco e o Claude que você tem hoje vira uma ferramenta completamente diferente.

Qual você estava cometendo? Comenta o número.

#claudecode #ia #inteligenciaartificial #produtividade #ferramentasIA #claude #mcp #aitools #automacao #developer #empresario #dicasai`,
    keyword_cta: '(save post)',
    pilar: 'Ferramentas e Produtividade',
    duracao: '7 slides',
  },
]
