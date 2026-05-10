-- Migration: content_fundamentos_claude_code
-- Popula o conteúdo MDX da aula "Fundamentos Claude Code" (Fundamentos, mentoria)
-- Lesson ID: 3accd9b1-4e12-45e2-88d1-c335a23f0218

update public.lessons
set
  content_format = 'MDX',
  content = $mdx$
<Tabs>
  <Tab label="Terminal">

## O que é o Terminal

Imagine que o seu computador tem duas formas de receber ordens.

A primeira você já conhece: clicar em ícones, arrastar janelas, usar o mouse. A segunda é o **terminal** — uma tela preta onde você digita comandos em texto, e o computador executa na hora.

Parece coisa de filme de hacker. Na prática, é a forma mais direta e poderosa de dar ordens a uma máquina.

**Por que isso importa para você?**

Claude Code vive no terminal. Quando você abre o terminal e digita `claude`, está chamando o Claude para trabalhar dentro do seu computador — não num site, não numa aba do navegador. Dentro da sua máquina, com acesso a tudo.

<Callout kind="tip" title="Pense assim">
O terminal é o WhatsApp do seu computador. Em vez de clicar em botões, você manda mensagens de texto — e ele obedece.
</Callout>

  </Tab>

  <Tab label="Claude Code">

## IA que trabalha por você — de verdade

Você provavelmente já usou ChatGPT ou o Claude no navegador. Funciona assim: você pergunta, ele responde em texto, e aí **você** precisa copiar, colar, executar, testar, ajustar.

Claude Code é diferente.

## Ele opera dentro do seu computador

Claude Code não responde — ele **age**. Ele abre pastas, lê arquivos, cria documentos, roda programas, faz alterações. Tudo sozinho, enquanto você define o objetivo.

| | IA no navegador | Claude Code |
|---|---|---|
| Acessa seus arquivos | ❌ | ✅ |
| Executa tarefas reais | ❌ | ✅ |
| Trabalha no seu projeto | ❌ | ✅ |
| Conecta com seus sistemas | ❌ | ✅ |

## A diferença na prática

Com IA no navegador, você pede uma proposta comercial e recebe um texto. Você ainda precisa formatar, ajustar, salvar, enviar.

Com Claude Code, você pede uma proposta comercial e ele cria o arquivo, formata, salva na pasta certa — e pode até enviar por e-mail se você conectar seu e-mail a ele.

<Callout kind="tip" title="A analogia certa">
IA no navegador é um consultor que te dá conselhos. Claude Code é um funcionário que executa.
</Callout>

  </Tab>

  <Tab label="API">

## API: a ponte invisível entre sistemas

Você já fez um Pix? Comprou algo online com cartão? Entrou num site com sua conta do Google?

Em todos esses casos, sistemas diferentes conversaram entre si em frações de segundo — sem você precisar fazer nada. Isso é uma **API** funcionando.

## O que é uma API

API é a ponte que permite que um sistema fale com outro sistema automaticamente.

**Analogia simples:**

Imagine um restaurante. Você não vai à cozinha buscar sua comida. Você faz o pedido ao garçom, ele leva à cozinha, a cozinha prepara, e o garçom traz pra você.

O garçom é a API. Ele é a interface entre você (o cliente) e a cozinha (o sistema).

## Por que isso importa

Claude Code pode se conectar com qualquer sistema que tenha uma API — e hoje praticamente tudo tem.

Isso significa que Claude pode conversar com sua planilha, seu banco de dados, seu sistema de e-mail, sua plataforma de pagamentos, suas redes sociais — e trabalhar nesses sistemas como se fosse um funcionário com acesso a todos eles.

<Callout kind="info" title="APIs são invisíveis mas estão em todo lugar">
Quando você recebe um e-mail automático depois de uma compra, uma API foi acionada. Quando seu aplicativo de banco mostra seu saldo em tempo real, uma API está funcionando. Quando você faz login com o Google em outro site, é uma API.
</Callout>

  </Tab>

  <Tab label="Webhook">

## Webhook: o sistema que te avisa

Com uma API, **você pergunta** e o sistema responde.

Com um Webhook, é o contrário: **o sistema te avisa** quando algo acontece.

## A diferença na prática

Pense na diferença entre dois tipos de notificação bancária:

**Sem Webhook:** você abre o aplicativo do banco toda hora para ver se caiu algum pagamento.

**Com Webhook:** o banco te manda uma notificação no momento exato em que o pagamento entra.

| | API | Webhook |
|---|---|---|
| Quem inicia | Você pergunta | O sistema avisa |
| Quando | Quando você quer saber | Quando o evento acontece |
| Analogia | Ligar pro banco pra ver o saldo | Receber SMS quando tem movimentação |

## Exemplo real

Quando um aluno compra este curso, o Stripe (sistema de pagamentos) dispara um Webhook para nossa plataforma. Nesse momento, automaticamente:

1. A matrícula é criada
2. O acesso é liberado
3. O e-mail de boas-vindas é enviado

Tudo isso sem intervenção humana. O Webhook é o gatilho que coloca tudo em movimento.

<Callout kind="tip" title="Webhooks = seu negócio rodando sozinho">
Toda automação real depende de Webhooks. É o que permite que seu negócio reaja a eventos automaticamente — pagamento confirmado, formulário preenchido, prazo vencido — sem precisar de alguém monitorando.
</Callout>

  </Tab>

  <Tab label="MCP">

## MCP: as chaves de Claude Code

Imagine que você contratou um assistente excepcional. Mas no primeiro dia, ele só pode entrar pela porta da frente — não tem chave do depósito, do arquivo, do servidor.

Quanto mais chaves você dá a ele, mais ele consegue fazer.

**MCP é o conjunto de chaves que você dá ao Claude Code.**

## O que é MCP

MCP significa Model Context Protocol — o padrão que permite ao Claude Code se conectar com sistemas externos e usá-los como ferramentas de trabalho.

Com MCP, Claude não só sabe que um sistema existe — ele consegue **operar dentro dele**.

## O que Claude pode acessar com MCP

| Ferramenta | O que Claude consegue fazer |
|---|---|
| Google Drive | Ler e criar documentos, planilhas |
| Banco de dados | Consultar e atualizar informações |
| E-mail | Ler, redigir e enviar mensagens |
| Calendário | Ver agenda, criar eventos |
| Redes sociais | Publicar conteúdo, ler comentários |
| Sistemas internos | Qualquer sistema que tenha integração MCP |

## A diferença para o seu negócio

Sem MCP, Claude Code é um funcionário muito inteligente mas sem acesso a nenhum sistema da empresa.

Com MCP, ele tem acesso às ferramentas certas — e consegue trabalhar de verdade, não só dar sugestões.

<Callout kind="tip" title="MCP é o que transforma Claude num membro do time">
Um funcionário sem acesso aos sistemas da empresa não consegue trabalhar. MCP é o que dá ao Claude Code acesso real às ferramentas do seu negócio.
</Callout>

  </Tab>

  <Tab label="Estrutura">

## Como o Claude Code é organizado

Claude Code não é um botão que você aperta. É um sistema com estrutura própria — como uma empresa bem organizada tem cargos, processos e ferramentas definidos.

Entender essa estrutura é o que permite usar Claude Code com todo o seu potencial.

---

### CLAUDE.md — O briefing permanente

Toda vez que Claude Code começa a trabalhar, ele lê um arquivo chamado `CLAUDE.md`.

É o briefing que você escreveu uma vez e que ele consulta sempre. Quem você é, o que ele pode e não pode fazer, como o projeto funciona, quais são as regras. É a memória de longo prazo do Claude no seu projeto.

---

### Agentes — Os especialistas do time

Em vez de um Claude genérico que faz tudo, você cria agentes especializados.

Um agente que só cuida do site. Um que só mexe no banco de dados. Um que só valida a qualidade. Cada um sabe exatamente qual é o seu papel — e trabalha com muito mais precisão do que um generalista.

---

### Skills — Capacidades prontas para usar

Skills são comportamentos complexos que você define uma vez e aciona com um comando simples.

Por exemplo: `/criar-proposta` pode ser uma skill que busca os dados do cliente, monta a proposta no formato certo, salva na pasta correta e envia por e-mail. Um comando, vários passos executados automaticamente.

---

### Settings — O que Claude pode ou não fazer

É onde você define as permissões e os limites. O que Claude pode acessar, o que está proibido, quais automações rodam em quais situações.

É o painel de controle — você define as regras, Claude obedece.

<Callout kind="info" title="A estrutura completa">
CLAUDE.md diz quem Claude é. Agentes especializam o time. Skills criam capacidades sob demanda. Settings controlam os limites. E por baixo de tudo, API, Webhook e MCP conectam Claude ao mundo externo.
</Callout>

  </Tab>

  <Tab label="Agent Teams">

## Agent Teams: seu time de IA

Tudo que você aprendeu até agora — terminal, Claude Code, API, Webhook, MCP, agentes — existe para chegar aqui.

**Agent Teams** é o recurso nativo do Claude Code que permite montar um time completo de agentes trabalhando ao mesmo tempo, cada um na sua especialidade, coordenados por um líder.

## Como funciona na prática

Imagine que você quer lançar uma campanha de marketing. Sem Agent Teams, você precisaria fazer tudo em sequência — pesquisar, escrever, criar imagens, agendar, publicar.

Com Agent Teams, você define o objetivo e o time executa em paralelo:

| Agente | O que faz |
|---|---|
| Pesquisador | Levanta dados do mercado e do público |
| Redator | Escreve os textos da campanha |
| Designer | Cria as imagens e peças visuais |
| Distribuidor | Agenda e publica nos canais certos |
| Analista | Monitora os resultados em tempo real |

Tudo ao mesmo tempo. Tudo coordenado. Você só define o objetivo.

## Por que isso muda o jogo

| Antes | Com Agent Teams |
|---|---|
| Um assistente de cada vez | Time inteiro em paralelo |
| Você coordena cada passo | O time se auto-organiza |
| Horas de trabalho manual | Minutos de execução autônoma |
| Resultado dependente de você | Resultado gerado pelo time |

## O que este curso vai te ensinar

Ao longo dos módulos, você vai aprender a montar, treinar e operar times de agentes para os desafios reais do seu negócio — desde criar conteúdo e gerenciar projetos até automatizar operações inteiras.

<Callout kind="tip" title="Esta é a virada">
Não é sobre usar IA como ferramenta. É sobre ter um time de IA que trabalha para você — enquanto você foca no que só você pode fazer: decidir, criar e liderar.
</Callout>

  </Tab>
</Tabs>
$mdx$
where id = '3accd9b1-4e12-45e2-88d1-c335a23f0218';
