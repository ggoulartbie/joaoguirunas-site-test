# M4 | Conteúdo HTML por Aula — Manual Centro de Treinamento

**Módulo:** Módulo 4 | Centro de Treinamento  
**module_id:** `11b3be33-4508-487d-b787-dc59d9883f2b`  
**Status banco:** 0 aulas (aguardando INSERT por sites-data-m4)  
**PDF fonte:** `docs/mentoria-claude-code/Curso On-line/Módulo 4 | Centro de Treainamento/manual-m4.pdf`  
**Gerado em:** 2026-05-17

> UUIDs das aulas serão preenchidos após sites-data-m4 inserir as 12 aulas.  
> Conteúdo mapeado do PDF — pronto para UPDATE via `supabase db query --linked`.

---

## Mapeamento por Aula

### A01 | A nova arquitetura mental

| Campo | Valor |
|---|---|
| lesson_uuid | *(aguardando INSERT)* |
| slug | `modulo-4-aula-1-nova-arquitetura-mental` |
| title | A nova arquitetura mental |
| sort_order | 0 |
| kind | VIDEO |

**description** (primeiro parágrafo):
```
Você deixou de ser operador e virou maestro. Neste módulo, a empresa inteira cabe em pastas — cada área com sua equipe especializada, cada equipe com memória persistente, tudo comandado de um centro único.
```

**summary** (texto completo da aula):
```
Você deixou de ser operador e virou maestro. Neste módulo, a empresa inteira cabe em pastas — cada área com sua equipe especializada, cada equipe com memória persistente, tudo comandado de um centro único.

O M03 ensinou a operar com um squad. O M04 escala isso para a empresa inteira. A virada mental é simples: de operador para maestro. Você não executa mais — você dirige.

A metáfora prática é a empresa em pastas. Cada área operacional vira uma pasta no seu computador. Dentro de cada pasta, uma squad instalada com sua própria smart-memory. O centro de comando fica numa pasta separada — o claude-agent-teams — e de lá você instala e atualiza squads nas outras pastas.

Isso muda o que significa "trabalhar". Você para de abrir chats aleatórios e começa a entrar em pastas com contexto completo, equipe pronta, memória carregada.
```

**content** (HTML para campo `content`, format `HTML`):
```html
<h2>A virada de M03 para M04</h2>
<p>O M03 ensinou a operar com um squad. O M04 escala isso para a empresa inteira.</p>
<p>A virada mental é simples: <strong>de operador para maestro</strong>. Você não executa mais — você dirige.</p>

<h2>A empresa em pastas</h2>
<p>Cada área operacional vira uma pasta no seu computador. Dentro de cada pasta, uma squad instalada com sua própria smart-memory.</p>
<p>O centro de comando fica numa pasta separada — o <code>claude-agent-teams</code> — e de lá você instala e atualiza squads nas outras pastas.</p>

<h2>O que muda na prática</h2>
<p>Você para de abrir chats aleatórios e começa a entrar em pastas com contexto completo, equipe pronta, memória carregada.</p>
<p>Isso é o que significa operar com infraestrutura de IA de verdade — não uma ferramenta solta, mas um sistema.</p>
```

---

### A02 | Instalação do centro

| Campo | Valor |
|---|---|
| lesson_uuid | *(aguardando INSERT)* |
| slug | `modulo-4-aula-2-instalacao-do-centro` |
| title | Instalação do centro |
| sort_order | 1 |
| kind | VIDEO |

**description**:
```
Três passos para ter o centro de treinamento funcionando: entrar no CT, clonar o repositório claude-agent-teams, e confirmar que as skills estão disponíveis.
```

**summary**:
```
Três passos para ter o centro de treinamento funcionando: entrar no CT, clonar o repositório claude-agent-teams, e confirmar que as skills estão disponíveis.

Passo 1: entrar no centro de treinamento. É a pasta raiz da sua operação — onde o claude-agent-teams vai viver.

Passo 2: clonar o repositório. O claude-agent-teams é o repositório oficial com todas as squads prontas, skills instaladas, e o sistema de contratos. Um clone e você tem tudo.

Passo 3: confirmar as skills. Dentro do claude-agent-teams, as skills ficam em .claude/skills/. Confirme que team-os e team-os-creator estão lá. Se estiverem, o centro está pronto.

Feito uma vez por máquina. Não precisa repetir para cada projeto.
```

**content** (HTML):
```html
<h2>Os 3 passos</h2>

<h3>Passo 1: entrar no CT</h3>
<p>Navegue até a pasta que vai ser seu centro de comando. Pode ser <code>~/empresa/</code> ou qualquer estrutura que faça sentido para você.</p>

<h3>Passo 2: clonar o repositório</h3>
<pre><code>git clone https://github.com/joaoguirunas/claude-agent-teams</code></pre>
<p>O repositório traz todas as squads prontas, skills instaladas, e o sistema de contratos dos agentes.</p>

<h3>Passo 3: confirmar as skills</h3>
<p>Dentro do <code>claude-agent-teams</code>, verifique <code>.claude/skills/</code>. Confirme que <code>team-os</code> e <code>team-os-creator</code> estão presentes.</p>

<div class="callout">
  <p><strong>Feito uma vez por máquina.</strong> Não precisa repetir para cada projeto ou cliente.</p>
</div>
```

---

### A03 | O centro de comando

| Campo | Valor |
|---|---|
| lesson_uuid | *(aguardando INSERT)* |
| slug | `modulo-4-aula-3-centro-de-comando` |
| title | O centro de comando |
| sort_order | 2 |
| kind | VIDEO |

**description**:
```
A pasta claude-agent-teams é o coração de toda a operação. Entenda sua estrutura: as duas skills principais (team-os e team-os-creator), os 4 squads prontos, e a regra de ouro — o centro fica no centro.
```

**summary**:
```
A pasta claude-agent-teams é o coração de toda a operação. Entenda sua estrutura: as duas skills principais (team-os e team-os-creator), os 4 squads prontos, e a regra de ouro — o centro fica no centro.

Componentes principais: team-os (a skill líder — orquestra, detecta estado, dispara agentes), team-os-creator (a fábrica — cria e instala squads em outras pastas), os 4 squads prontos (Dev, Sites, Social, Traffic), e a smart-memory central.

A regra de ouro: o centro de comando nunca vira pasta operacional. Você não trabalha dentro do claude-agent-teams. Você trabalha nas pastas operacionais que ele gerencia. O centro emite squads; as squads executam nos projetos.

Isso garante separação limpa entre infraestrutura e operação.
```

**content** (HTML):
```html
<h2>O que é o claude-agent-teams</h2>
<p>É o repositório central de infraestrutura. Não é onde você trabalha — é de onde você <strong>gerencia</strong>.</p>

<h2>Componentes</h2>
<ul>
  <li><strong>team-os</strong> — a skill líder. Orquestra o time, detecta o estado do projeto, dispara agentes em paralelo.</li>
  <li><strong>team-os-creator</strong> — a fábrica. Cria squads novas do zero ou instala squads prontas em pastas operacionais.</li>
  <li><strong>4 squads prontas</strong> — Dev, Sites, Social, Traffic. Instaláveis em qualquer projeto.</li>
  <li><strong>Smart-memory central</strong> — documenta a infraestrutura em si, não os projetos.</li>
</ul>

<h2>A regra de ouro</h2>
<blockquote>
  <p>O centro fica no centro. Você não opera dentro do claude-agent-teams.</p>
</blockquote>
<p>Entre no centro para instalar squads ou atualizar infraestrutura. Para trabalhar num projeto, entre na pasta do projeto.</p>
```

---

### A04 | Smart-memory

| Campo | Valor |
|---|---|
| lesson_uuid | *(aguardando INSERT)* |
| slug | `modulo-4-aula-4-smart-memory` |
| title | Smart-memory |
| sort_order | 3 |
| kind | VIDEO |

**description**:
```
A smart-memory é o cérebro persistente de cada operação. Vive em docs/smart-memory/, tem estrutura padronizada em Obsidian, e é o que permite que qualquer agente entre numa pasta com contexto completo — sem você precisar explicar nada de novo.
```

**summary**:
```
A smart-memory é o cérebro persistente de cada operação. Vive em docs/smart-memory/, tem estrutura padronizada em Obsidian, e é o que permite que qualquer agente entre numa pasta com contexto completo — sem você precisar explicar nada de novo.

Onde vive: docs/smart-memory/ dentro de cada pasta operacional. Estrutura: project/ (contexto do negócio), stories/ (backlog e histórico), decisions/ (ADRs), agents/ (memória de cada agente), ops/ (logs e operações).

As três vantagens: continuidade (o agente lê e já sabe tudo), coerência (todos os agentes veem o mesmo estado), e auditoria (você pode ver o que foi decidido e por quê).

Padrão Obsidian: frontmatter YAML + wikilinks + tags. Isso permite navegar a memória como um segundo cérebro, com links entre decisões, stories e contexto.
```

**content** (HTML):
```html
<h2>O que é a smart-memory</h2>
<p>É a memória persistente e compartilhada de cada operação. Diferente do contexto de uma conversa — que some quando você fecha — a smart-memory fica.</p>

<h2>Estrutura</h2>
<pre><code>docs/smart-memory/
├── project/       ← contexto do negócio, stack, decisões de arquitetura
├── stories/       ← backlog, histórico de entregas
├── decisions/     ← ADRs, decisões técnicas e de produto
├── agents/        ← memória individual de cada agente
└── ops/           ← logs de operações, times formados</code></pre>

<h2>As 3 vantagens</h2>
<ol>
  <li><strong>Continuidade</strong> — qualquer agente entra na pasta e já tem contexto completo.</li>
  <li><strong>Coerência</strong> — todos os agentes veem o mesmo estado da operação.</li>
  <li><strong>Auditoria</strong> — você pode rastrear o que foi decidido, quando, e por quê.</li>
</ol>

<h2>Padrão Obsidian</h2>
<p>Frontmatter YAML + wikilinks + tags. Isso permite navegar a memória como um segundo cérebro, com links entre decisões, stories e contexto de projeto.</p>
```

---

### A05 | Anatomia de um squad

| Campo | Valor |
|---|---|
| lesson_uuid | *(aguardando INSERT)* |
| slug | `modulo-4-aula-5-anatomia-de-um-squad` |
| title | Anatomia de um squad |
| sort_order | 4 |
| kind | VIDEO |

**description**:
```
Todo squad tem papéis definidos com autoridades exclusivas. Analista, arquiteto, UX, executores, hardening, QA, DevOps — cada um com responsabilidades claras e operações que só ele pode fazer.
```

**summary**:
```
Todo squad tem papéis definidos com autoridades exclusivas. Analista, arquiteto, UX, executores, hardening, QA, DevOps — cada um com responsabilidades claras e operações que só ele pode fazer.

Os papéis: analista (descobre e documenta o contexto), arquiteto (define stories e arquitetura), UX (especificação e componentes visuais), executores (implementam o que o arquiteto projetou), hardening (segurança e performance), QA (veredictos formais), DevOps (deploy e infraestrutura).

Autoridades exclusivas: cada papel tem operações que só ele executa. O DevOps é o único que faz git push. O QA é o único que emite veredicto. O arquiteto é o único que aprova stories. Isso é garantido por hooks — tentativas indevidas são bloqueadas.

O fluxo natural: analista → arquiteto → executores → QA → DevOps. Cada etapa entrega para a próxima. Sem pular etapas.
```

**content** (HTML):
```html
<h2>Os papéis</h2>
<ul>
  <li><strong>Analista</strong> — descobre e documenta o contexto da operação.</li>
  <li><strong>Arquiteto</strong> — define stories, arquitetura, e critérios de aceitação.</li>
  <li><strong>UX</strong> — especificação visual e catalogação de componentes.</li>
  <li><strong>Executores</strong> — implementam o que o arquiteto projetou (frontend, backend, data).</li>
  <li><strong>Hardening</strong> — segurança e performance.</li>
  <li><strong>QA</strong> — veredictos formais: PASS, CONCERNS, FAIL ou WAIVED.</li>
  <li><strong>DevOps</strong> — deploy e infraestrutura. Único autorizado a fazer <code>git push</code>.</li>
</ul>

<h2>Autoridades exclusivas</h2>
<p>Cada papel tem operações que <strong>só ele</strong> pode executar. Isso é garantido por hooks que bloqueiam tentativas indevidas.</p>
<ul>
  <li>Só o DevOps faz <code>git push</code></li>
  <li>Só o QA emite veredicto formal</li>
  <li>Só o arquiteto aprova stories para o backlog ativo</li>
</ul>

<h2>O fluxo natural</h2>
<p>Analista → Arquiteto → Executores → QA → DevOps. Cada etapa entrega para a próxima. Sem atalhos.</p>
```

---

### A06 | Os 4 squads prontos

| Campo | Valor |
|---|---|
| lesson_uuid | *(aguardando INSERT)* |
| slug | `modulo-4-aula-6-os-4-squads-prontos` |
| title | Os 4 squads prontos |
| sort_order | 5 |
| kind | VIDEO |

**description**:
```
Squad Dev, Sites, Social e Traffic — quatro times especializados, prontos para instalar em qualquer pasta operacional. Cada um já vem com agentes configurados, skills relevantes, e contratos com o team-os.
```

**summary**:
```
Squad Dev, Sites, Social e Traffic — quatro times especializados, prontos para instalar em qualquer pasta operacional. Cada um já vem com agentes configurados, skills relevantes, e contratos com o team-os.

Squad Dev: para desenvolvimento de software. Cobre backend, frontend, banco de dados, testes, e deploy. Ideal para SaaS, APIs, e produtos digitais.

Squad Sites: para sites e landing pages. Cobre design, desenvolvimento web, SEO, e publicação. Ideal para agências e freelancers web.

Squad Social: para redes sociais. Cobre estratégia, criação de conteúdo, calendário editorial, e análise. Ideal para social media managers e agências de conteúdo.

Squad Traffic: para tráfego pago. Cobre campanhas, criativos, otimização e relatórios. Ideal para gestores de mídia paga.

Você pode instalar a mesma squad em múltiplos projetos. Cada instalação é independente — tem sua própria smart-memory, seu próprio contexto. Você instala quantas vezes quiser.
```

**content** (HTML):
```html
<h2>Os 4 squads</h2>

<h3>Squad Dev</h3>
<p>Para desenvolvimento de software. Cobre backend, frontend, banco de dados, testes, e deploy. Ideal para SaaS, APIs, e produtos digitais.</p>

<h3>Squad Sites</h3>
<p>Para sites e landing pages. Cobre design, desenvolvimento web, SEO, e publicação. Ideal para agências e freelancers web.</p>

<h3>Squad Social</h3>
<p>Para redes sociais. Cobre estratégia, criação de conteúdo, calendário editorial, e análise. Ideal para social media managers e agências de conteúdo.</p>

<h3>Squad Traffic</h3>
<p>Para tráfego pago. Cobre campanhas, criativos, otimização e relatórios. Ideal para gestores de mídia paga.</p>

<h2>Como usar</h2>
<p>Você instala a squad certa em cada pasta operacional via <code>/team-os-creator</code>. Cada instalação é independente — tem sua própria smart-memory e contexto. Você pode instalar a mesma squad em múltiplos projetos sem conflito.</p>
```

---

### A07 | team-os: a skill líder

| Campo | Valor |
|---|---|
| lesson_uuid | *(aguardando INSERT)* |
| slug | `modulo-4-aula-7-team-os-a-skill-lider` |
| title | team-os: a skill líder |
| sort_order | 6 |
| kind | VIDEO |

**description**:
```
O team-os é o ponto de entrada de toda operação. Detecta o estado do projeto automaticamente, forma o time certo, e dispara os agentes em paralelo. Você só precisa saber o que pedir e o que esperar.
```

**summary**:
```
O team-os é o ponto de entrada de toda operação. Detecta o estado do projeto automaticamente, forma o time certo, e dispara os agentes em paralelo. Você só precisa saber o que pedir e o que esperar.

Os 4 estados: NEW (pasta nova sem smart-memory — roda bootstrap automático), NO_DISCOVERY (tem smart-memory mas falta contexto de negócio — propõe discovery), IN_PROGRESS (operação ativa com stories em andamento — vai direto ao ponto), READY (contexto completo, pronto para receber planos).

Os 4 comandos: /team-os (entrada principal — detecta estado e age), *plan "objetivo" (cria um plano de execução para o objetivo), *dispatch (coloca o time pra executar o plano ativo), *status (mostra o andamento de todas as tasks e agentes).

Você não precisa saber como ele detecta o estado. Não precisa saber como ele forma o time. Não precisa entender o mecanismo interno. O que você precisa saber é o que pedir e o que esperar. Isso é trabalho de C-level.
```

**content** (HTML):
```html
<h2>O que é o team-os</h2>
<p>É a skill que orquestra toda operação. O ponto de entrada único. Você digita <code>/team-os</code> e ele assume.</p>

<h2>Os 4 estados</h2>
<ul>
  <li><strong>NEW</strong> — pasta nova sem smart-memory. Roda bootstrap automático: mapeia tudo, popula smart-memory.</li>
  <li><strong>NO_DISCOVERY</strong> — tem smart-memory mas falta contexto de negócio. Propõe discovery direcionado.</li>
  <li><strong>IN_PROGRESS</strong> — operação ativa com stories em andamento. Vai direto ao ponto.</li>
  <li><strong>READY</strong> — contexto completo, pronto para receber planos e executar.</li>
</ul>

<h2>Os 4 comandos</h2>
<ul>
  <li><code>/team-os</code> — entrada principal. Detecta estado e age.</li>
  <li><code>*plan "objetivo"</code> — cria plano de execução para o objetivo.</li>
  <li><code>*dispatch</code> — coloca o time para executar o plano ativo.</li>
  <li><code>*status</code> — mostra andamento de todas as tasks e agentes.</li>
</ul>

<h2>A mentalidade certa</h2>
<p>Você não precisa entender o mecanismo interno. O que você precisa saber é <strong>o que pedir</strong> e <strong>o que esperar</strong>. Isso é trabalho de C-level — dirigir o sistema, não operar o motor.</p>
```

---

### A08 | Bootstrap mágico

| Campo | Valor |
|---|---|
| lesson_uuid | *(aguardando INSERT)* |
| slug | `modulo-4-aula-8-bootstrap-magico` |
| title | Bootstrap mágico |
| sort_order | 7 |
| kind | VIDEO |

**description**:
```
O momento "uau" do módulo. Pasta nova com material dentro, você digita /team-os, e em minutos o sistema aprendeu a operação inteira. O que para uma equipe humana levaria semanas, acontece sozinho.
```

**summary**:
```
O momento "uau" do módulo. Pasta nova com material dentro, você digita /team-os, e em minutos o sistema aprendeu a operação inteira. O que para uma equipe humana levaria semanas, acontece sozinho.

O cenário: você acabou de criar uma pasta nova para uma operação. Tem material — código, documentos, arquivos — mas não tem nenhuma equipe instalada, não tem smart-memory, não tem nada do sistema rodando. Você entra na pasta, abre o Claude, e digita /team-os.

A sequência de 8 passos: (1) Detecta NEW. (2) Propõe time de descoberta automaticamente. (3) Você fala "sim". (4) Roda Graphify — lê o conteúdo e desenha um mapa de dependências. (5) Identifica os God Nodes — arquivos mais críticos. (6) Convoca agentes em paralelo — arquiteto, analista, UX, data engineer. (7) Eles trabalham todos ao mesmo tempo. (8) Sintetiza um overview com tudo que cada agente descobriu.

O resultado: em alguns minutos, o sistema aprendeu a operação inteira. Sabe qual a arquitetura, o stack, os módulos críticos, as convenções, os pontos sensíveis. Tudo documentado na smart-memory.

O diferencial competitivo: não é "a IA fazendo o trabalho". É a IA fazendo o onboarding.
```

**content** (HTML):
```html
<h2>O cenário</h2>
<p>Pasta nova. Material dentro — código, documentos, arquivos. Sem equipe instalada, sem smart-memory, sem nada rodando. Você entra, abre o Claude, e digita <code>/team-os</code>.</p>

<h2>A sequência</h2>
<ol>
  <li><strong>Detecta NEW.</strong> Não tem smart-memory aqui. Ele percebe imediatamente.</li>
  <li><strong>Propõe time de descoberta automaticamente.</strong> Já chega com plano: "vou montar uma equipe que vai descobrir o que tem nessa pasta, mapear tudo, e popular a smart-memory."</li>
  <li><strong>Você fala "sim".</strong> Ele procede.</li>
  <li><strong>Roda Graphify.</strong> Lê o conteúdo da pasta e desenha um <strong>mapa de dependências</strong>.</li>
  <li><strong>Identifica os God Nodes.</strong> Os arquivos que, se mudados, afetam muita coisa.</li>
  <li><strong>Convoca agentes em paralelo.</strong> Arquiteto, analista, UX, data engineer — todos ao mesmo tempo.</li>
  <li><strong>Eles trabalham todos ao mesmo tempo.</strong> Você vê na tela do Claude — cada um com sua tarefa, cada um reportando quando termina.</li>
  <li><strong>Sintetiza um overview.</strong> Junta tudo que cada agente descobriu num arquivo central.</li>
</ol>

<h2>O resultado</h2>
<p>Em alguns minutos, o sistema <strong>aprendeu a operação inteira</strong>. Sabe qual a arquitetura. Sabe qual o stack. Sabe quais os módulos críticos. Tudo documentado na smart-memory.</p>

<blockquote>
  <p>"O onboarding que levaria 1, 2, 3 semanas para uma equipe humana entender um projeto novo — o sistema faz em minutos. Sozinho."</p>
</blockquote>

<div class="callout callout-dark">
  <p><strong>Diferencial competitivo real:</strong> Não é "a IA fazendo o trabalho". É <strong>a IA fazendo o onboarding</strong>.</p>
</div>
```

---

### A09 | team-os-creator: a fábrica

| Campo | Valor |
|---|---|
| lesson_uuid | *(aguardando INSERT)* |
| slug | `modulo-4-aula-9-team-os-creator` |
| title | team-os-creator: a fábrica |
| sort_order | 8 |
| kind | VIDEO |

**description**:
```
A segunda skill do centro de comando. Tem três funções: criar squad nova do zero, instalar squad em projeto novo, atualizar squads existentes. É como você materializa a arquitetura multi-pasta na empresa.
```

**summary**:
```
A segunda skill do centro de comando. Tem três funções: criar squad nova do zero, instalar squad em projeto novo, atualizar squads existentes. É como você materializa a arquitetura multi-pasta na empresa.

Função 1 — criar squad nova do zero: quando os 4 squads prontos não cobrem a necessidade. Você chama o creator falando o que precisa, ele pergunta os papéis e archetypes, e gera os agentes seguindo todos os padrões do sistema.

Função 2 — instalar squad em projeto novo: você criou uma pasta nova e quer instalar uma das squads prontas. O creator analisa o contexto, propõe a squad certa, você confirma, e ele instala em segundos.

Função 3 — atualizar squads existentes: quando o sistema evolui — novos agentes, padrões melhores — você chama o creator e ele sincroniza todas as pastas operacionais, mantendo as customizações locais que você fez.

Três pontos importantes: (1) o creator só funciona a partir do centro — nunca de dentro de uma pasta operacional. (2) Cada agente criado já vem com o contrato com o team-os. (3) O creator faz validação automática antes de instalar.
```

**content** (HTML):
```html
<h2>As 3 funções</h2>

<h3>Função 1: criar squad nova do zero</h3>
<p>Para quando os 4 squads prontos não cobrem a necessidade. Você chama o creator, descreve o que precisa, ele pergunta os papéis e archetypes — padrões de agente como "analista", "executor", "validador" — e gera os agentes seguindo todos os padrões do sistema.</p>

<h3>Função 2: instalar squad em projeto novo</h3>
<p>Você criou uma pasta nova para uma operação. Entre no centro, chame o creator indicando a pasta de destino. Ele analisa o contexto, propõe qual squad faz mais sentido, você confirma, e ele instala.</p>

<h3>Função 3: atualizar squads existentes</h3>
<p>Quando o sistema evolui, chame o creator com a função de atualização. Ele sincroniza todas as pastas operacionais — <strong>mantendo as customizações locais</strong> que você fez.</p>

<h2>Três pontos importantes</h2>
<ul>
  <li><strong>O creator só funciona a partir do centro.</strong> Nunca de dentro de uma pasta operacional.</li>
  <li><strong>Cada agente criado já vem com o contrato com o team-os.</strong> Sem contrato, o agente vira agente solto — não funciona bem no squad.</li>
  <li><strong>Validação automática.</strong> O creator verifica frontmatter, contrato, integração com smart-memory, e skills compatíveis antes de instalar.</li>
</ul>

<blockquote>
  <p>"Agente novo, sempre via creator. Sem exceção."</p>
</blockquote>
```

---

### A10 | Operação da empresa do zero

| Campo | Valor |
|---|---|
| lesson_uuid | *(aguardando INSERT)* |
| slug | `modulo-4-aula-10-operacao-da-empresa-do-zero` |
| title | Operação da empresa do zero |
| sort_order | 9 |
| kind | VIDEO |

**description**:
```
O cenário prático completo: você acabou de comprar a mentoria, instalou o centro, e quer estruturar a operação inteira da empresa baseada em squads de IA. Passo a passo, do clone à execução de cada área.
```

**summary**:
```
O cenário prático completo: você acabou de comprar a mentoria, instalou o centro, e quer estruturar a operação inteira da empresa baseada em squads de IA. Passo a passo, do clone à execução de cada área.

Passo 1 — o centro já está clonado: feito na Aula 02. O claude-agent-teams está dentro do CT, pronto para emitir squads. Feito uma vez só por máquina.

Passo 2 — criar pastas das áreas operacionais: identifique as principais áreas da empresa — tráfego pago, social media, sites-clientes, produtos — e crie uma pasta para cada uma. Estrutura típica: ~/empresa/ com claude-agent-teams/, trafego-pago/, social-media/, sites-clientes/, produtos/.

Passo 3 — instalar a squad certa em cada pasta: para cada pasta operacional, entre no centro, abra o Claude, chame /team-os-creator indicando a pasta de destino. Ele analisa e propõe a squad certa. Para trafego-pago → Squad Traffic. Para social-media → Squad Social. Para sites-clientes → Squad Sites. Para produtos → Squad Dev.

Passo 4 — operar cada área: entre na pasta da área, abra o Claude, digite /team-os. Se for a primeira vez, roda o bootstrap. A partir daí, use *plan, *dispatch e *status para trabalhar.

O insight final: você montou uma operação empresarial baseada em squads de IA. Cada área tem sua equipe especializada, memória persistente, e é comandada a partir de um centro único.
```

**content** (HTML):
```html
<h2>Os 4 passos</h2>

<h3>Passo 1: o centro já está clonado</h3>
<p>Feito na Aula 02. O <code>claude-agent-teams</code> está dentro do CT, pronto para emitir squads. Feito uma vez só por máquina.</p>

<h3>Passo 2: criar pastas das áreas operacionais</h3>
<p>Identifique as principais áreas da empresa e crie uma pasta para cada uma:</p>
<pre><code>~/empresa/
├── claude-agent-teams/    ← centro de comando
├── trafego-pago/          ← pasta da área
├── social-media/          ← pasta da área
├── sites-clientes/
│   ├── cliente-a/         ← pasta por cliente
│   └── cliente-b/
└── produtos/
    ├── saas-x/
    └── saas-y/</code></pre>

<h3>Passo 3: instalar a squad certa em cada pasta</h3>
<p>Para cada pasta operacional:</p>
<ol>
  <li>Entre no centro (<code>cd claude-agent-teams</code>).</li>
  <li>Abra o Claude.</li>
  <li>Chame o <code>/team-os-creator</code> indicando a pasta de destino.</li>
  <li>Ele analisa o contexto, propõe a squad certa, e instala.</li>
</ol>

<h3>Passo 4: operar cada área</h3>
<p>Entre na pasta da área, abra o Claude, digite <code>/team-os</code>. Se for a primeira vez, roda o bootstrap automaticamente.</p>
<p>A partir daí, use os comandos do team-os para trabalhar:</p>
<ul>
  <li><code>/team-os *plan "objetivo"</code> — quando tiver algo novo para fazer</li>
  <li><code>/team-os *dispatch</code> — para colocar o time para executar</li>
  <li><code>/team-os *status</code> — para ver como tá o andamento</li>
</ul>

<blockquote>
  <p>"Cada pasta é seu próprio universo. Você transita entre elas conforme o que precisa fazer."</p>
</blockquote>
```

---

### A11 | As regras invisíveis

| Campo | Valor |
|---|---|
| lesson_uuid | *(aguardando INSERT)* |
| slug | `modulo-4-aula-11-as-regras-invisiveis` |
| title | As regras invisíveis |
| sort_order | 10 |
| kind | VIDEO |

**description**:
```
Cinco mecanismos de governance que rodam por baixo do sistema. É o que separa um sistema profissional de um amontoado de prompts: autoridades exclusivas, padrões de segurança, checklists formais, memória dupla, e auditoria automática.
```

**summary**:
```
Cinco mecanismos de governance que rodam por baixo do sistema. É o que separa um sistema profissional de um amontoado de prompts: autoridades exclusivas, padrões de segurança, checklists formais, memória dupla, e auditoria automática.

Regra 1 — autoridades exclusivas: cada papel tem operações que só ele pode fazer, garantidas por hooks que bloqueiam tentativas indevidas. Só o DevOps faz git push. Só o QA emite veredicto. Sem invasão de área.

Regra 2 — padrões de segurança: operações sensíveis têm protocolo obrigatório. Data engineer nunca aplica migration sem snapshot, dry-run, apply, smoke-test, e rollback preparado. Publisher de redes sociais nunca posta sem dupla confirmação.

Regra 3 — checklists formais: stories passam por 5-point checklist antes de virar trabalho ativo. Features passam por 8 a 10-point checklist do QA antes de publicar. Veredicto do QA é formal: PASS, CONCERNS, FAIL ou WAIVED.

Regra 4 — memória dupla: cada agente tem agent-memory (privada — padrões aprendidos, decisões históricas dele) e smart-memory (compartilhada — estado da operação, decisões coletivas). As duas trabalham juntas: individual acumula expertise, coletiva mantém coerência.

Regra 5 — auditoria automática: o sistema se audita sozinho via /team-os *audit. Verifica contratos dos agentes, integridade da smart-memory, stories ativas com Dev Agent Record preenchido, e INDEX atualizado. Se algo estiver fora do padrão, avisa e oferece corrigir automaticamente.
```

**content** (HTML):
```html
<h2>Regra 1: autoridades exclusivas</h2>
<p>Cada papel tem operações que <strong>só ele</strong> pode fazer. Garantido por hooks que bloqueiam tentativas indevidas.</p>
<p>Exemplo: no squad Dev, só o DevOps pode rodar <code>git push</code>. Se o desenvolvedor frontend tentar, o hook bloqueia e manda delegar.</p>

<h2>Regra 2: padrões de segurança</h2>
<p>Operações sensíveis têm <strong>protocolo obrigatório</strong>.</p>
<ul>
  <li><strong>Data engineer</strong> nunca aplica migration sem: snapshot → dry-run → apply → smoke-test → rollback preparado.</li>
  <li><strong>Publisher de redes sociais</strong> nunca posta sem dupla confirmação: aprovação do estrategista + confirmação explícita do usuário.</li>
  <li><strong>Automation specialist de tráfego</strong> nunca executa mudança grande de orçamento sem ADR aprovado.</li>
</ul>

<h2>Regra 3: checklists formais</h2>
<p>Stories passam por <strong>5-point checklist</strong> antes de virar trabalho ativo: objetivo claro? Critérios testáveis? Escopo definido? Complexidade estimada? Alinhada com a arquitetura? Se passar em pelo menos 4 dos 5, é GO.</p>
<p>Features passam por <strong>8 a 10-point checklist do QA</strong> antes de publicar. Veredicto formal: PASS, CONCERNS, FAIL ou WAIVED.</p>

<h2>Regra 4: memória dupla</h2>
<table>
  <thead><tr><th>Memória</th><th>Função</th><th>Analogia</th></tr></thead>
  <tbody>
    <tr><td><strong>agent-memory</strong></td><td>Privada — padrões aprendidos, decisões históricas do agente.</td><td>Caderno pessoal</td></tr>
    <tr><td><strong>smart-memory</strong></td><td>Compartilhada — estado da operação, decisões coletivas.</td><td>Confluence do time</td></tr>
  </tbody>
</table>

<h2>Regra 5: auditoria automática</h2>
<p>O sistema <strong>se audita sozinho</strong>. Chame <code>/team-os *audit</code> para verificar:</p>
<ul>
  <li>Os agentes estão seguindo o contrato com o team-os?</li>
  <li>A smart-memory está íntegra, sem links quebrados?</li>
  <li>As stories ativas estão com Dev Agent Record preenchido?</li>
  <li>O INDEX da smart-memory está atualizado?</li>
</ul>
<p>Se algo estiver fora do padrão, o sistema avisa e, na maioria dos casos, oferece corrigir automaticamente.</p>

<blockquote>
  <p>"É isso que separa esse sistema de tudo que você viu antes. Não é a IA. É a engenharia em volta da IA."</p>
</blockquote>
```

---

### A12 | Encerramento e próximos passos

| Campo | Valor |
|---|---|
| lesson_uuid | *(aguardando INSERT)* |
| slug | `modulo-4-aula-12-encerramento-e-proximos-passos` |
| title | Encerramento e próximos passos |
| sort_order | 11 |
| kind | VIDEO |

**description**:
```
Hábitos para incorporar, erros comuns para evitar, e o gancho para o próximo módulo. Esta aula existe para você voltar e revisar antes de cada sessão de prática.
```

**summary**:
```
Hábitos para incorporar, erros comuns para evitar, e o gancho para o próximo módulo. Esta aula existe para você voltar e revisar antes de cada sessão de prática.

Os 3 hábitos para incorporar: (1) Uma pasta por área operacional, sempre — sem atalhos, sem misturar áreas. (2) Sempre começar pasta nova com o creator — nunca criar agentes manualmente ou copiar arquivos de outra pasta. (3) Confiar na smart-memory de cada pasta — ela é a fonte de verdade; se estiver errada, corrija, mas nunca ignore.

Os 3 erros comuns: misturar várias áreas numa pasta só (cria caos), pular o discovery achando que "já sabe o projeto" (o sistema precisa aprender também), criar agente do zero sem usar o creator (vira agente solto, sem contrato, dá problema).

Gancho para o Módulo 05: agora que a estrutura operacional está montada, falta uma coisa — identidade visual do que as squads produzem. No M05, entra o Claude Design: como dar identidade visual para os entregáveis de cada squad, configurar paleta, tipografia, padrões visuais, para que tudo que sair dos agentes pareça ter saído de um time profissional de design.
```

**content** (HTML):
```html
<h2>Os 3 hábitos para incorporar</h2>

<h3>Hábito 1: uma pasta por área operacional, sempre</h3>
<p>Tráfego é uma pasta. Social é outra. Cada cliente de site é uma pasta. Cada produto digital é uma pasta. Não tem atalho. Pasta separada, sempre.</p>

<h3>Hábito 2: sempre começar pasta nova com o creator</h3>
<p>Quando criar uma pasta nova para uma operação, a primeira coisa é entrar no centro de comando, chamar o <code>/team-os-creator</code>, e instalar a squad certa naquela pasta. Não tente "começar de leve" com agentes soltos.</p>

<h3>Hábito 3: confiar na smart-memory de cada pasta</h3>
<p>Quando entrar numa pasta operacional para trabalhar, deixe o sistema usar a memória dele. Se a smart-memory tiver errada, corrija. Mas não a ignore — ela é o cérebro da operação.</p>

<h2>Os 3 erros comuns</h2>
<ul>
  <li><strong>Misturar várias áreas numa pasta só.</strong> Cria caos. Pasta por área, sempre.</li>
  <li><strong>Pular o discovery achando que "já sabe o projeto".</strong> O sistema precisa aprender também, não só você.</li>
  <li><strong>Criar agente do zero sem usar o creator.</strong> Vira agente solto, sem contrato, dá problema.</li>
</ul>

<h2>Gancho para o Módulo 05</h2>
<p>Agora que você tem a estrutura operacional montada — squads instaladas, smart-memory persistente, governance silenciosa — falta uma coisa importante.</p>
<p>Falta a <strong>identidade visual</strong> do que essas squads produzem.</p>
<p>No M05, entra o Claude Design. Como dar identidade visual para os entregáveis de cada squad. Como configurar paleta, tipografia, padrões visuais, para que tudo que sair das mãos dos agentes pareça ter saído de um time profissional de design.</p>

<div class="callout callout-dark">
  <p><strong>Pratique este módulo antes de avançar.</strong> Sem operação sólida, o design não tem onde encaixar.</p>
</div>
```

---

## Status de Execução

| Aula | Conteúdo mapeado | UUID banco | UPDATE aplicado |
|---|---|---|---|
| A01 | sim | aguardando | - |
| A02 | sim | aguardando | - |
| A03 | sim | aguardando | - |
| A04 | sim | aguardando | - |
| A05 | sim | aguardando | - |
| A06 | sim | aguardando | - |
| A07 | sim | aguardando | - |
| A08 | sim | aguardando | - |
| A09 | sim | aguardando | - |
| A10 | sim | aguardando | - |
| A11 | sim | aguardando | - |
| A12 | sim | aguardando | - |

**Próximo passo:** sites-data-m4 insere as 12 aulas → Bythelion recebe UUIDs → executa 12 UPDATEs de title+description+summary+content via `supabase db query --linked`.
