# HTML Manual M3 — por aula

## sort_order=0 | abertura
lesson_id: 9828e194-3939-4c9e-bb45-7aece7630179
content_format: HTML

```html
<h2>Módulo 03 — Manual de Referência</h2>
<h1>Fundamentos do Claude Code</h1>
<p>A base operacional pra você deixar de ser usuário de chat e começar a delegar tarefas reais pro Claude com acesso ao seu computador.</p>
<ul>
  <li><strong>No que você sai:</strong> Operação solo do Claude Code</li>
  <li><strong>Páginas:</strong> 25</li>
  <li><strong>Próximo:</strong> M04 · Centro de Treinamento</li>
</ul>
```

---

## sort_order=1 | parte-0
lesson_id: d75d8c77-2460-4a61-ac67-556bad59f3bf
content_format: HTML

```html
<h2>O que é Claude Code</h2>
<p>A primeira distinção crítica: Claude Code não é claude.ai. É um agente com acesso ao computador, capaz de ler arquivos, criar arquivos, rodar comandos e executar trabalho real — e essa diferença muda completamente o que você consegue fazer com ele.</p>

<h3>Claude Code em uma frase</h3>
<p>Claude Code é o <strong>Claude com acesso ao seu computador</strong>. Não é mais um chat. É um agente.</p>
<p>Você já conhece o claude.ai. É a tela de chat onde você digita uma pergunta e o Claude responde. Tipo um ChatGPT, mas com o Claude. Excelente pra conversar, pensar junto, escrever um e-mail, fazer brainstorm.</p>
<p>Claude Code é uma coisa completamente diferente. No claude.ai você conversa. No Claude Code você delega. Você fala "Claude, lê esses 30 PDFs da pasta e me faz um resumo de cada um" e ele vai lá, abre os arquivos, lê, processa, e entrega.</p>
<blockquote>
  <p><em>"O Claude para de ser um assistente de conversa e vira um operador. Quando ele tem mãos, ele executa."</em></p>
</blockquote>

<h3>O que muda quando o Claude tem mãos</h3>
<p>Quando o Claude tem mãos — que é como gosto de chamar isso — ele para de ser um assistente de conversa e vira um operador. Ele pode:</p>
<ul>
  <li><strong>Ler arquivos</strong> do seu computador: PDFs, planilhas, documentos, código, qualquer coisa.</li>
  <li><strong>Criar arquivos novos</strong>: gerar relatórios, escrever documentos, produzir planilhas, escrever código.</li>
  <li><strong>Rodar comandos</strong>: executar scripts, instalar pacotes, fazer git push, navegar entre pastas.</li>
  <li><strong>Mexer em sistemas</strong>: organizar pastas, mover arquivos, processar lotes de informação.</li>
</ul>
<p>O Claude deixa de "te dar instruções" e passa a "fazer o trabalho". A diferença prática é absurda — em vez de ele te dizer como fazer e você executar, ele faz e você revisa.</p>

<h3>Quando usar um, quando usar o outro</h3>
<p>Regra simples:</p>
<blockquote>
  <p><strong>claude.ai é pra pensar. Claude Code é pra produzir.</strong></p>
</blockquote>
<p>Se você quer pensar em voz alta, conversar, ter uma ideia, escrever um texto que vai copiar e colar em outro lugar — claude.ai. Tela do navegador, rápido, prático.</p>
<p>Se você quer que o Claude faça alguma coisa que envolva os arquivos do seu computador, uma operação repetitiva, ou que precise de contexto sobre o seu negócio que ele consulta toda vez — Claude Code.</p>
```

---

## sort_order=2 | parte-1-terminal-nao-e-coisa-de-hacker
lesson_id: d467883b-09ce-41a7-9d8e-69014f3e2e37
content_format: HTML

```html
<h2>Terminal e CLI: o mínimo que você precisa</h2>
<p>Pra usar o Claude Code você precisa abrir o terminal. Muita gente trava aqui. Vou desmistificar: terminal é só uma forma diferente de conversar com o computador, e quatro comandos resolvem 95% do que você precisa.</p>

<h3>O que é o terminal</h3>
<p>Pra usar o Claude Code, você precisa abrir o terminal. Sei que muita gente olha pra essa telinha preta e dá um aperto no peito. Vou desmistificar.</p>
<p>Terminal é só uma forma diferente de conversar com o computador. Você está acostumado a clicar em pastas, arrastar arquivos, dar dois cliques pra abrir um programa. Isso é uma forma. O terminal é outra: você digita o que quer que aconteça.</p>
<p>Só isso. Não tem mistério. Não é coisa de hacker, não é coisa de programador. É só uma interface diferente, mais direta.</p>

<h3>O que é uma CLI</h3>
<p>O Claude Code é o que chamamos de <strong>CLI — Command Line Interface</strong>. Significa que ele roda dentro do terminal. Não tem janela, não tem botão, não tem mouse. Você digita, ele responde, você digita de novo. É um chat dentro do terminal.</p>

<h3>Os 4 comandos de terminal que importam</h3>
<p>Antes de abrir o Claude Code propriamente, tem quatro comandos do terminal que vale conhecer. Só quatro. Com esses, você se vira em quase tudo.</p>
<p><strong>PWD — onde estou agora</strong></p>
<p>Digita <code>pwd</code> e o terminal te mostra onde você está. Que pasta do computador. É tipo o GPS do terminal. Vale conferir sempre que tiver em dúvida.</p>
<p><strong>LS — o que tem aqui</strong></p>
<p>Digita <code>ls</code> e o terminal mostra tudo que tem dentro da pasta onde você está. Equivalente a abrir uma pasta no Finder ou no Explorer e ver os arquivos.</p>
<p><strong>CD — entrar em pasta</strong></p>
<p>O comando "entrar numa pasta". Você digita <code>cd</code> espaço o nome da pasta, e o terminal te leva pra dentro daquela pasta. <code>cd ..</code> (com dois pontinhos) te leva pra pasta anterior, pra cima.</p>
<p><strong>CLEAR — limpar a tela</strong></p>
<p>Quando a tela tá uma bagunça e você quer começar visualmente do zero, digita <code>clear</code>. Equivalente a um Ctrl+L em muitos editores.</p>
<blockquote>
  <p><strong>Resumo:</strong> Quatro comandos: <code>pwd</code>, <code>ls</code>, <code>cd</code>, <code>clear</code>. Pronto, você se vira no terminal pra tudo que precisa.</p>
</blockquote>

<h3>Como abrir o Claude Code numa pasta</h3>
<p>Pra abrir o Claude Code dentro de uma pasta, a lógica é simples: você usa <code>cd</code> pra entrar na pasta que quer trabalhar, e aí digita <code>claude</code>. Só isso. <code>claude</code> e enter.</p>
<p>Abre uma interface dentro do terminal, e você começa a conversar com ele.</p>

<h3>Como sair</h3>
<p>Pra sair do Claude Code, duas formas:</p>
<ul>
  <li>Digita <code>/exit</code> — com a barra na frente</li>
  <li>Aperta <code>Ctrl+C</code> duas vezes</li>
</ul>
<p>Pronto, sessão encerrada.</p>
```

---

## sort_order=3 | parte-2-pastas
lesson_id: ce149f3e-3d47-47c2-b0f7-022697857a1d
content_format: HTML

```html
<h2>A pasta é o contexto</h2>
<p>Quando você abre o Claude Code numa pasta, aquela pasta vira o universo dele. Esse conceito sustenta tudo que vem depois — desde CLAUDE.md até a arquitetura multi-squad do Módulo 4. Vale parar e absorver bem.</p>

<h3>Por que a pasta importa tanto</h3>
<p>Esse conceito muda bastante coisa, então vale parar um minuto nele.</p>
<p>Quando você abre o Claude Code dentro de uma pasta, <strong>aquela pasta vira o universo dele</strong>. Tudo que tem dentro daquela pasta, ele consegue ver. Tudo que está fora, ele não enxerga.</p>

<h3>O que o Claude enxerga</h3>
<p>Pensa assim: é como se você tivesse contratado um funcionário e colocado ele numa sala. A sala é a pasta. Ele só consegue mexer no que tá dentro da sala. Se você quiser que ele trabalhe com documentos da empresa, precisa colocar os documentos dentro daquela sala.</p>
<blockquote>
  <p><em>"Uma pasta por projeto, por cliente, por operação."</em></p>
</blockquote>
<p>O instinto inicial pode ser criar uma pastona geral chamada "Claude" e jogar tudo dentro. Desencorajo. Vira um caos rapidamente — o Claude se perde, você se perde, e o resultado cai de qualidade.</p>
<ul>
  <li>Se você tem uma clínica como cliente: cria pasta <code>clinica-tal</code>. Documentos, instruções, tudo dentro.</li>
  <li>Outro cliente: outra pasta.</li>
  <li>Outra operação dentro da sua empresa: outra pasta.</li>
</ul>
<p>Cada pasta é um mundo isolado. Isso é uma vantagem absurda, porque permite manter contextos separados sem misturar tudo.</p>

<h3>.env: o que é, o que NÃO colocar</h3>
<p>Dentro dessas pastas, você vai ouvir falar de arquivos especiais. Um deles é o <code>.env</code>. Esse arquivo, com pontinho na frente e a palavra "env" (de environment), é onde ficam senhas, chaves de API, informações sensíveis que o Claude pode precisar mas que não devem vazar.</p>
<p><strong>O que pode ir no .env:</strong></p>
<ul>
  <li>Chaves de API que o Claude vai consumir (OpenAI, Stripe, Resend, etc).</li>
  <li>Variáveis de configuração específicas do projeto.</li>
  <li>Endereços de banco de dados (sem expor publicamente).</li>
</ul>
<p><strong>O que evitar no .env:</strong></p>
<ul>
  <li>Dados de cartão de crédito completos.</li>
  <li>Senhas pessoais de banco.</li>
  <li>Informações confidenciais de clientes.</li>
  <li>Documentos financeiros sensíveis.</li>
</ul>
<blockquote>
  <p><strong>Importante:</strong> O <code>.env</code> é privado. Se você for mandar a pasta inteira por email pro cliente, tire o <code>.env</code> antes. Idealmente, ele nem deve estar versionado no Git.</p>
</blockquote>

<h3>Regra de ouro: uma pasta por operação</h3>
<p>Reforçando, porque é um princípio que volta muito nos próximos módulos: <strong>uma pasta por projeto, por cliente, por operação</strong>. Esse é o alicerce.</p>
<p>Lá no Módulo 4, você vai entender por que essa regra existia desde o começo — ela é a preparação pra arquitetura multi-squad, onde cada área da sua empresa terá sua pasta própria, sua equipe de IA própria e sua memória própria.</p>
```

---

## sort_order=4 | parte-3-claudemd
lesson_id: bf67b516-0f31-4533-b616-10539585b341
content_format: HTML

```html
<h2>CLAUDE.md: o coração da operação</h2>
<p>Na minha opinião, a coisa mais importante deste módulo. Um arquivo de texto na pasta do projeto que faz o onboarding do Claude antes de cada interação. Quem entende isso, multiplica a qualidade do trabalho. Quem ignora, fica frustrado.</p>

<h3>O que é e por que existe</h3>
<p>Agora a gente chega no que é, na minha opinião, <strong>a coisa mais importante desta aula inteira</strong>: o CLAUDE.md.</p>
<p>O CLAUDE.md é um arquivo de texto que você coloca dentro da pasta do projeto. E toda vez que você abre o Claude Code dentro daquela pasta, ele lê esse arquivo automaticamente, antes de qualquer coisa.</p>

<h3>Analogia: onboarding de funcionário</h3>
<p>Pensa comigo. Imagina que você contrata um funcionário novo. No primeiro dia, o que você faz? Explica pra ele: olha, a empresa é assim, atendemos esses clientes, o tom com cliente é esse, evita falar disso, sempre faça aquilo, nosso processo é desse jeito.</p>
<p>Isso é onboarding. Você prepara o sujeito pra trabalhar bem.</p>
<blockquote>
  <p><em>"CLAUDE.md é o onboarding que você faz com o Claude — uma vez, e ele lembra de tudo, toda vez."</em></p>
</blockquote>
<p>Toda vez que ele entra naquela pasta, ele lê esse arquivo e já chega sabendo tudo que precisa saber.</p>

<h3>O que colocar no CLAUDE.md</h3>
<p>Quatro blocos principais:</p>
<p><strong>1. Contexto do negócio</strong></p>
<p>Quem é a empresa, o que ela faz, quem são os clientes, qual o modelo de negócio. Não precisa ser um livro, mas precisa ser suficiente pro Claude entender em que mundo ele tá operando.</p>
<p><strong>2. Regras</strong></p>
<p>Coisas que você quer que ele sempre faça, ou nunca faça. Por exemplo: "sempre que for gerar um documento, salve em formato .docx". Ou: "nunca dê conselhos jurídicos sem antes consultar o Pedro". São as regras da casa.</p>
<p><strong>3. Tom de voz</strong></p>
<p>Como você se comunica com clientes. Se a empresa é mais formal, mais informal, se usa emojis, se não usa. Se prefere texto curto e direto, ou se gosta de explicar detalhadamente. Isso afeta tudo que ele gera.</p>
<p><strong>4. O que evitar</strong></p>
<p>Temas sensíveis, assuntos que não devem aparecer, palavras que vocês não usam, abordagens que não combinam com a marca.</p>

<h3>CLAUDE.md global vs. por projeto</h3>
<p>Existem dois tipos de CLAUDE.md:</p>
<p><strong>Global:</strong> Fica numa pasta do seu usuário, e vale pra tudo que você faz com o Claude Code, em qualquer lugar. Bom pra colocar coisas tipo "eu sou João, CEO da Growth Sales AI, baseado em Florianópolis, prefiro respostas diretas e densas". Coisas sobre você, que valem sempre.</p>
<p><strong>Do projeto:</strong> Fica na pasta específica. Pro contexto daquele cliente, daquela operação, daquele trabalho específico.</p>
<p>O Claude lê os dois. Combina os dois. Você pode ter o seu jeito global de operar, e por cima dele, instruções específicas pra cada projeto.</p>

<h3>Exemplo prático</h3>
<p>Veja um CLAUDE.md simplificado pra um cliente fictício de clínica especializada em TEA:</p>
<pre><code># Contexto

A Clínica X é especializada em atendimento de crianças com TEA,
localizada em Florianópolis. Atende cerca de 200 famílias ativas.
O ticket médio é de R$ 3.500/mês.

# Regras

- Toda comunicação com famílias deve ser revisada antes de enviar.
- Documentos formais sempre em .docx, padrão da clínica.
- Nunca compartilhe nomes reais de pacientes em exemplos.

# Tom de voz

- Acolhedor mas profissional.
- Evita jargão técnico em mensagens para famílias.
- Em documentos internos, pode usar termos clínicos.

# O que evitar

- Promessas de resultado clínico.
- Comparações com outras clínicas.
- Tom comercial agressivo.</code></pre>
<p>Isso é uma versão enxuta. Na vida real, você pode ir muito mais a fundo. Mas isso já é mais do que 90% das pessoas faz, e já transforma completamente a qualidade do que o Claude produz.</p>
<blockquote>
  <p><strong>Dica de produtividade:</strong> Existe um comando chamado <code>/init</code> que gera um CLAUDE.md automaticamente. Ele dá uma olhada na pasta, vê o que tem ali, e cria uma primeira versão do arquivo. Use como ponto de partida e edite o resultado depois com o coração do negócio.</p>
</blockquote>
<p>O Claude entrega muito mais quando você conta o contexto, em vez de deixar ele adivinhar.</p>
```

---

## sort_order=5 | parte-4-comandos-base
lesson_id: 5a7f1925-423e-4f35-a4d1-0b0f1e90dbd7
content_format: HTML

```html
<h2>Comandos do dia a dia</h2>
<p>Cinco comandos cobrem 95% do que você vai precisar. Os outros você descobre com /help conforme avança. Aqui estão os essenciais — quando usar, quando evitar, e a distinção crítica entre /clear, /compact e sessão nova.</p>

<h3>Os 5 comandos que você vai usar todo dia</h3>
<p>Existem comandos que começam com barra — esses funcionam dentro da sessão do Claude. Diferente dos comandos do terminal. Vou mostrar os cinco que você vai usar todo dia.</p>

<h3>/model — escolher o cérebro</h3>
<p>Esse comando escolhe o "cérebro" que vai trabalhar pra você.</p>
<p>O Claude tem modelos diferentes. Os três principais que importam: Opus, Sonnet e Haiku.</p>
<table>
  <thead>
    <tr>
      <th>Modelo</th>
      <th>Perfil</th>
      <th>Use para</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Opus</strong></td>
      <td>O cérebro sênior, consultor caro</td>
      <td>Estratégia, análise, decisões importantes, raciocínio profundo</td>
    </tr>
    <tr>
      <td><strong>Sonnet</strong></td>
      <td>O profissional sólido equilibrado</td>
      <td>80% do trabalho do dia a dia — seu padrão</td>
    </tr>
    <tr>
      <td><strong>Haiku</strong></td>
      <td>O rápido, estagiário super eficiente</td>
      <td>Tarefas simples, mecânicas, em volume</td>
    </tr>
  </tbody>
</table>
<p>Regra: comece no Sonnet. Quando o problema é grande, troca pro Opus com <code>/model</code>. Quando a tarefa é simples e em volume, joga no Haiku.</p>

<h3>/clear — começar do zero</h3>
<p>Esse limpa a memória da conversa. É como se você fechasse o Claude e abrisse de novo. Ele esquece tudo que conversaram.</p>
<p>Útil quando terminou um assunto e quer começar outro completamente diferente, sem que o contexto antigo influencie.</p>

<h3>/compact — quando a conversa tá longa</h3>
<p>Esse é diferente. Quando a conversa está muito longa, o Claude começa a ficar sobrecarregado de contexto. O <code>/compact</code> faz ele resumir tudo que conversaram até ali e continuar a partir desse resumo. Ele não esquece — ele compacta. Mantém o essencial e descarta o que não importa mais.</p>

<h3>A distinção crítica</h3>
<p>Distinção que costuma confundir, então vale guardar:</p>
<ul>
  <li><strong>/clear</strong> apaga — tudo vai embora.</li>
  <li><strong>/compact</strong> resume — mantém o essencial, descarta o lixo.</li>
  <li><strong>Abrir sessão nova</strong> — contexto zero, como se fosse a primeira vez.</li>
</ul>
<p>São três coisas diferentes, e cada uma serve pra um momento.</p>

<h3>/init — gerar CLAUDE.md automaticamente</h3>
<p>Esse é o que mencionei antes. Gera um primeiro CLAUDE.md baseado no que tem na pasta. Bom ponto de partida, mas vale uma edição depois pra adicionar o contexto do negócio.</p>

<h3>/help — descobrir o resto sozinho</h3>
<p>Esse mostra todos os comandos disponíveis. Quando você esquecer alguma coisa, ou quiser explorar, digite <code>/help</code> e ele mostra a lista completa.</p>
<blockquote>
  <p><strong>Resumo:</strong> Com cinco comandos — <code>/model</code>, <code>/clear</code>, <code>/compact</code>, <code>/init</code>, <code>/help</code> — você faz 95% do que precisa. Os outros você descobre conforme avança.</p>
</blockquote>
```

---

## sort_order=6 | parte-5-como-claude-trabalha
lesson_id: a159c7c2-7d0d-454b-a38e-024dad9da506
content_format: HTML

```html
<h2>Como o Claude trabalha</h2>
<p>Vale entender o loop que ele executa quando você delega uma tarefa, como funcionam as permissões, e os três níveis de risco — ler, escrever, executar. Saber isso economiza frustração e dá controle consciente.</p>

<h3>O loop: pensa → age → observa → repete</h3>
<p>Quando você pede alguma coisa pro Claude Code, ele entra num loop. Esse loop tem quatro fases:</p>
<ol>
  <li><strong>Pensa.</strong> Ele lê o que você pediu, lê o CLAUDE.md, lê o contexto da pasta, e decide o que fazer.</li>
  <li><strong>Age.</strong> Ele executa uma ação — pode ser ler um arquivo, criar um arquivo, rodar um comando.</li>
  <li><strong>Observa.</strong> Ele olha o resultado da ação. Deu certo? Deu errado? Apareceu alguma informação nova?</li>
  <li><strong>Repete.</strong> Com base no que ele observou, ele pensa de novo, age de novo, observa de novo. Até a tarefa estar pronta.</li>
</ol>
<p>Você pode ver isso acontecendo na tela enquanto ele trabalha. E uma das coisas legais é que pode interromper a qualquer momento se ver que ele tá indo pro caminho errado.</p>

<h3>Permissões: o que ele pede antes</h3>
<p>Ponto crítico: o Claude Code <strong>pede permissão</strong> antes de fazer algumas coisas.</p>
<p>Especificamente, antes de executar comandos no seu computador ou de modificar arquivos importantes, ele te pergunta: "posso fazer isso?" E você fala sim ou não.</p>
<p>Por que isso é importante? Porque você é o responsável. O Claude é poderoso, mas é uma ferramenta. Quem decide é você.</p>

<h3>Modo auto-aceitar vs. controle manual</h3>
<p>Existe um modo chamado <strong>auto-aceitar</strong>, onde ele deixa de pedir permissão e simplesmente executa tudo. Minha recomendação é <strong>não usar esse modo no começo</strong>. Especialmente porque você está aprendendo, e ver o que ele tá prestes a fazer é parte importante do aprendizado.</p>
<p>Deixar ele pedir, ler o que ele tá pedindo, e aí aprovar — isso dá controle, dá consciência do que tá acontecendo, e evita surpresas.</p>

<h3>Três níveis de risco</h3>
<p>Pra fechar essa parte, três níveis de risco que vale ter no radar:</p>
<table>
  <thead>
    <tr>
      <th>Nível</th>
      <th>O que envolve</th>
      <th>Postura</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ler</strong></td>
      <td>Ele abre arquivos pra entender o contexto. Não muda nada.</td>
      <td>Risco zero. Pode deixar fluir.</td>
    </tr>
    <tr>
      <td><strong>Escrever</strong></td>
      <td>Ele cria ou modifica arquivos. Dá pra desfazer, mas dá trabalho.</td>
      <td>Confira o que ele tá escrevendo, onde, e como.</td>
    </tr>
    <tr>
      <td><strong>Executar</strong></td>
      <td>Ele roda um comando no sistema. Apaga arquivo, instala programa, mexe em config.</td>
      <td>Atenção total. Leia com calma antes de aprovar.</td>
    </tr>
  </tbody>
</table>
<p>Não é pra ter medo. É pra ter consciência. É como quando você delega algo pro time — uma coisa é o pessoal ler um relatório, outra é enviar um email pra um cliente. O nível de atenção é diferente, naturalmente.</p>
```

---

## sort_order=7 | parte-5-estrutura-base
lesson_id: 373fbd8a-c45c-4775-b925-2aec9070b717
content_format: HTML

```html
<h2>As peças do Claude Code: Skills, Agents e Hooks</h2>
<p>Vocabulário do sistema — três conceitos que vão aparecer várias vezes nos próximos módulos. Skills, Agents e Hooks. Pensa nesta parte como o glossário: só o suficiente pra você reconhecer cada um quando aparecer, sem aprofundar tecnicamente.</p>

<h3>Por que esta parte existe</h3>
<p>A gente passou pela base. Você sabe operar. Agora vou apresentar o <strong>vocabulário do sistema</strong>. São três conceitos que vão aparecer várias vezes nos próximos módulos, e é importante você reconhecer cada um.</p>
<p>Pensa nesta parte como o "glossário do Claude Code". Não vou aprofundar nada técnico. Só o suficiente pra quando ouvir "skill", "agent", "hook" — você saber na hora do que estamos falando.</p>

<h3>Skills</h3>
<p>A primeira peça é a <strong>skill</strong>.</p>
<p>Skill é um <strong>procedimento</strong>. Um manual de "como fazer X". Pensa como um SOP — Standard Operating Procedure — da empresa.</p>
<blockquote>
  <p><strong>Exemplo prático:</strong> Imagina que você quer que o Claude saiba gerar uma proposta comercial padronizada da empresa. Você cria uma skill chamada "proposta-comercial" e escreve: o cabeçalho é assim, os blocos vão nessa ordem, o tom é esse, o rodapé é aquele. Toda vez que precisar de uma proposta, chama essa skill, e o Claude segue o procedimento.</p>
</blockquote>
<p>As skills moram numa pasta chamada <code>.claude/skills/</code> dentro do projeto. Cada skill tem seu próprio arquivo <code>SKILL.md</code> que descreve o procedimento.</p>
<p>A grande sacada das skills é a <strong>reutilização</strong>. Você escreve uma vez, e o Claude pode usar dezenas, centenas de vezes. Sem perder qualidade, sem precisar lembrar de tudo de novo.</p>

<h3>Agents</h3>
<p>A segunda peça é o <strong>agent</strong>.</p>
<p>Agent é uma "pessoa" especializada dentro do Claude. Um funcionário com cargo, com responsabilidade, com autoridade.</p>
<p>A diferença pra skill é importante. Skill é um <strong>procedimento</strong> — um "como fazer". Agent é um <strong>especialista</strong> — um "quem faz".</p>
<blockquote>
  <p><strong>Exemplo prático:</strong> Imagina um escritório de advocacia que quer um agente especializado em revisar contratos. Você cria um agente chamado "revisor-de-contratos" e define: o papel dele é só revisar contratos, ele tem expertise em direito empresarial, o tom dele é técnico mas didático, ele sempre aponta riscos antes de aprovar. Quando precisa de uma revisão, chama esse agente, e ele assume.</p>
</blockquote>
<p>Os agents moram numa pasta <code>.claude/agents/</code> dentro do projeto. Cada agent tem seu arquivo <code>.md</code> que descreve quem ele é, o que faz, como age.</p>
<p>Esse conceito de agent é o que vira a alma do Módulo 4. Lá você vai ver que squads inteiras são formadas por agentes especializados trabalhando juntos.</p>

<h3>Hooks</h3>
<p>A terceira peça é o <strong>hook</strong>.</p>
<p>Hook é uma <strong>regra automática</strong> que dispara em momentos específicos. Pensa como uma regra de compliance da empresa que está sempre ativa, sem precisar de ninguém pra lembrar dela.</p>
<blockquote>
  <p><strong>Exemplo prático:</strong> Sua empresa tem uma regra: antes de enviar qualquer email pro cliente, o gerente precisa aprovar. Numa empresa humana, é processo. Pode falhar. Num sistema com hook, vira automático. Você configura um hook que, toda vez que um agente tenta enviar email, o hook intercepta, manda pro gerente aprovar, e só libera depois da aprovação.</p>
</blockquote>
<p>O hook é silencioso. Tá lá, monitorando, e age quando precisa. O resto do tempo, ninguém lembra dele.</p>
<p>Outro exemplo que vai aparecer no Módulo 4: hook que bloqueia certos agentes de fazerem operações específicas. Por exemplo, só o agente DevOps pode publicar código. Se outro tentar publicar, o hook bloqueia automaticamente.</p>
<p>Os hooks moram em <code>.claude/hooks/</code> dentro do projeto.</p>

<h3>A síntese</h3>
<blockquote>
  <p><em>"Skill é o como, Agent é o quem, Hook é o quando."</em></p>
</blockquote>
<p>Uma forma de pensar: pra fazer pão na padaria, você tem a <strong>receita</strong> (skill), o <strong>padeiro</strong> (agent), e a <strong>regra de não abrir o forno antes dos 30 minutos</strong> (hook). Três coisas, papéis diferentes, todas trabalhando juntas.</p>
<ul>
  <li><strong>Skill</strong> = procedimento, manual.</li>
  <li><strong>Agent</strong> = pessoa especializada que segue o procedimento.</li>
  <li><strong>Hook</strong> = regra automática que dispara em momentos específicos.</li>
</ul>
```

---

## sort_order=8 | parte-7-pontes-com-o-mundo
lesson_id: 55646f1d-37b3-4b6b-a664-536592af1638
content_format: HTML

```html
<h2>As pontes com o mundo: API, Webhook e MCP</h2>
<p>Saímos das peças internas e entramos nas três pontes que conectam Claude com o resto das ferramentas que você usa. API, Webhook, MCP. Não precisa dominar tecnicamente — só reconhecer quando aparecer.</p>

<h3>Por que esta parte existe</h3>
<p>Acabamos de ver as peças <strong>internas</strong> do Claude Code. Agora vamos ver as três pontes que conectam o Claude com o mundo lá fora.</p>
<p>Porque o Claude sozinho é poderoso. Mas o Claude conversando com o resto das ferramentas que você usa — CRM, Gmail, Google Drive, Notion, Slack, Stripe, e por aí vai — aí ele vira centralizador da operação inteira.</p>
<p>Pra entender como essas conversas acontecem, você precisa de três conceitos. Não precisa dominar tecnicamente. Só reconhecer.</p>

<h3>API</h3>
<p>O primeiro conceito é <strong>API</strong>.</p>
<p>API significa Application Programming Interface, mas o nome técnico não importa. O que importa é a função.</p>
<p>API é o <strong>"cardápio"</strong> de uma ferramenta. É a lista do que ela aceita fazer, em que formato ela aceita pedido, e que tipo de resposta ela dá.</p>
<blockquote>
  <p><em>"API é o cardápio. Você abre, escolhe, faz o pedido, recebe a resposta."</em></p>
</blockquote>
<p>Analogia do mundo real: pensa num restaurante. Você não vai na cozinha pedir pro chef. Você abre o cardápio, vê o que tem, escolhe, faz o pedido pro garçom. O garçom leva pra cozinha, a cozinha prepara, e ele traz a comida pronta.</p>
<p>API é exatamente isso. O cardápio é a lista do que a ferramenta sabe fazer. Você faz o pedido seguindo o formato dela. Ela responde com o resultado.</p>
<blockquote>
  <p><strong>Exemplo prático:</strong> Você quer que o Claude pegue dados de leads do CRM da empresa. O CRM tem uma API. O Claude faz um pedido pra essa API: "me dá os leads dos últimos 7 dias." A API responde com a lista. O Claude trabalha com essa lista.</p>
</blockquote>
<p>Toda ferramenta moderna tem API. Google, Meta, TikTok, Slack, Notion, Stripe — todos. É a forma padrão das ferramentas conversarem entre si.</p>

<h3>Webhook</h3>
<p>O segundo conceito é <strong>webhook</strong>.</p>
<p>Webhook é o oposto da API em termos de iniciativa.</p>
<p>Na API, é o Claude que vai buscar a informação. Ele faz a pergunta, a ferramenta responde. Iniciativa do Claude.</p>
<p>No webhook, é o contrário. A ferramenta vem avisar o Claude quando algo acontece. Iniciativa da ferramenta.</p>
<blockquote>
  <p><em>"Webhook é a campainha. Quando alguém chega, ela toca."</em></p>
</blockquote>
<p>Analogia: webhook é a campainha da sua casa. Você não fica ligando pro porteiro toda hora perguntando "alguém chegou? alguém chegou? alguém chegou?". Quando alguém chega, a campainha toca. Você é avisado no exato momento.</p>
<p>Webhook funciona assim. Você configura: "ferramenta X, quando acontecer Y, avisa o Claude." E aí, quando Y acontecer, a ferramenta dispara um aviso. O Claude recebe na hora e age.</p>
<blockquote>
  <p><strong>Exemplo prático:</strong> Você tem um formulário de captura no site. Configura um webhook: "toda vez que alguém preencher o formulário, avisa o Claude." Aí, no momento exato, o Claude é notificado, lê os dados, e já dispara um atendimento personalizado. Automação reativa, sem ninguém ficar checando.</p>
</blockquote>

<h3>A diferença prática</h3>
<ul>
  <li><strong>API</strong> = você pergunta, a ferramenta responde (você é o ativo).</li>
  <li><strong>Webhook</strong> = a ferramenta avisa, você reage (a ferramenta é a ativa).</li>
</ul>
<p>Na operação da empresa, você vai usar os dois. API quando precisa buscar dados. Webhook quando precisa reagir a eventos.</p>

<h3>MCP</h3>
<p>O terceiro conceito é <strong>MCP</strong>.</p>
<p>MCP é a sigla pra Model Context Protocol. Esse é um conceito mais novo, criado pela Anthropic — a empresa que faz o Claude. Foi anunciado em 2024.</p>
<p><strong>O problema que ele resolve:</strong> Antes do MCP, conectar o Claude com cada ferramenta diferente era um trabalho técnico. Cada ferramenta tinha seu jeito, sua linguagem, sua peculiaridade. Quem queria conectar Google Drive, Slack, Notion, Gmail no Claude precisava de um desenvolvedor pra cada conexão.</p>
<p>MCP padronizou isso. Virou o <strong>"tradutor universal"</strong> entre Claude e qualquer ferramenta.</p>
<blockquote>
  <p><em>"MCP é o protocolo da ONU pra ferramentas digitais."</em></p>
</blockquote>
<p>Analogia: pensa numa embaixada das Nações Unidas. Cada país tem sua língua, suas regras, suas tradições. Mas quando os representantes se reúnem na ONU, falam um protocolo comum — tradutores, regras de fala, agenda padronizada. Não importa de qual país você vem, a forma de participar é a mesma.</p>
<p>MCP é isso pra ferramentas digitais. Cada ferramenta — Google Drive, Slack, Notion, Stripe — pode criar uma "embaixada MCP" que fala essa língua padronizada. Aí, na hora que o Claude precisa conversar com qualquer uma, ele usa o mesmo padrão.</p>
<blockquote>
  <p><strong>Exemplo prático:</strong> Você quer que o Claude tenha acesso ao Google Drive da empresa. Antes do MCP, era um projeto. Agora, instala o "MCP do Google Drive", autoriza, e o Claude passa a ter acesso. Mesma coisa pra Slack, Notion, Gmail.</p>
</blockquote>
<p>A vantagem pra empresa de vocês: o Claude vira um <strong>hub central</strong> que conversa com tudo. Você não precisa abrir cada ferramenta separadamente. Fala com o Claude, ele opera nas ferramentas, e traz o resultado.</p>

<h3>Resumindo</h3>
<ul>
  <li><strong>API</strong> — Claude pergunta pra ferramenta.</li>
  <li><strong>Webhook</strong> — Ferramenta avisa o Claude.</li>
  <li><strong>MCP</strong> — Padrão universal de conversa entre Claude e qualquer ferramenta.</li>
</ul>
<p>Você não precisa saber configurar nada disso agora. Só precisa reconhecer quando aparecer. E aparece muito — nos próximos módulos, em automações, em integrações que você vai montar pra empresa.</p>
```

---

## sort_order=9 | encerramento
lesson_id: 8609781b-cce1-493e-bf78-5236116b8e54
content_format: HTML

```html
<h2>Encerramento e próximos passos</h2>
<p>Hábitos pra incorporar a partir de amanhã, erros comuns de quem começa, e o gancho pro próximo módulo. Esta página existe pra você voltar e revisar antes de cada sessão de prática.</p>

<h3>Os 3 hábitos mínimos pra começar amanhã</h3>
<p><strong>Hábito 1: Uma pasta por projeto</strong></p>
<p>Evite misturar tudo na mesma pasta. Cada cliente, cada operação, sua própria pasta com seu próprio CLAUDE.md. Você vai sentir a diferença rápido.</p>
<p><strong>Hábito 2: CLAUDE.md antes do pedido</strong></p>
<p>A tentação é entrar no Claude e já mandar a primeira solicitação. Vale o investimento de 15 minutos escrevendo um bom CLAUDE.md primeiro — esses 15 minutos economizam horas de retrabalho depois.</p>
<p><strong>Hábito 3: Ler antes de aprovar</strong></p>
<p>Quando o Claude pede permissão pra fazer algo, vale parar e ler o que ele tá prestes a executar. Não vira reflexo de clicar "aceitar". Isso treina o olhar e evita surpresas.</p>

<h3>Erros comuns de quem começa</h3>
<p><strong>Auto-diagnóstico:</strong></p>
<ul>
  <li>Abrir o Claude na pasta errada e estranhar que ele não acha os arquivos. (Use <code>pwd</code> antes.)</li>
  <li>Começar sem CLAUDE.md e depois ficar frustrado porque o Claude "não entende o negócio". (Ele só sabe o que você conta.)</li>
  <li>Deixar uma sessão aberta por dias, acumulando contexto. (Use <code>/clear</code> quando trocar de tarefa.)</li>
  <li>Confundir <code>/clear</code> com <code>/compact</code>. (Um apaga, outro resume.)</li>
  <li>Ativar auto-aceitar antes de entender o que o Claude faz. (Comece pedindo aprovação a cada ação.)</li>
</ul>

<h3>Gancho pro Módulo 04</h3>
<p>Agora que você sabe operar o Claude sozinho, no <strong>Módulo 04</strong> a gente vai ensinar ele a ter uma equipe. Vamos construir o <strong>Centro de Treinamento de Agentes</strong> — onde você vai criar especialistas dentro do Claude, cada um com seu próprio papel, cada um focado numa coisa específica. É aí que a coisa fica realmente séria.</p>
<p>E os conceitos que você aprendeu nas Partes 06 e 07 — skills, agents, hooks, API, webhook, MCP — vão voltar todos lá. Você vai reconhecer cada um aparecendo no sistema completo.</p>
<p>Mas pra isso funcionar, o que vimos hoje precisa estar dominado. Então vale praticar: abrir uma pasta, montar um CLAUDE.md, conversar com o Claude, errar, ajustar. Quanto mais você experimentar antes do próximo módulo, mais rico ele vai ser. E leve perguntas reais, situações que você viveu na prática.</p>

<h3>Próximo módulo</h3>
<p><strong>Da operação solo ao centro de treinamento de agentes.</strong></p>
<p>Você aprendeu a operar o Claude Code numa pasta. A trabalhar com contexto, comandos e princípios de execução.</p>
<p>No próximo módulo, esse alicerce vira plataforma. Você vai aprender a estruturar uma operação inteira em pastas, criar squads especializadas em cada área, e comandar tudo a partir de um centro único.</p>
<p><strong>Pratique este módulo antes de avançar. O M04 só funciona se a base estiver sólida.</strong></p>
```
