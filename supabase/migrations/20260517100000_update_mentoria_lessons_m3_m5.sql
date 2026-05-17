-- Migration: update_mentoria_lessons_m3_m5
-- Objetivo: Popular title e description das aulas ativas dos módulos 3 e 5
--           do curso mentoria-claude-code-aiox a partir dos arquivos .txt locais.
-- Escopo: M3 (3901d7a4-7373-4a22-8fcc-f5f6035d3c91) + M5 (fe6bcf96-96a5-477a-bc40-95188f22b21d)
-- Data: 2026-05-17
-- Anti-recorrência: todos os UPDATEs filtram AND deleted_at IS NULL
-- NÃO altera: video_id, video_provider, summary, transcript
-- NÃO altera M5 video_id (null — aguarda MC-1.3)
-- Idempotente: rodar 2x sobrescreve com o mesmo valor, sem erro

-- ============================================================
-- MÓDULO 3 | FUNDAMENTOS
-- ============================================================

-- M3 | sort_order=0 | arquivo: "Módulo 3 | Abertura.txt"
UPDATE public.lessons
SET title       = 'Módulo 3 | Abertura',
    description = 'Bem-vindo ao Módulo 3 da mentoria de Claude Code.

Nessa abertura, posicionamos este módulo como o chão de tudo que vem pela frente. No módulo anterior você fez o setup — instalou o Claude Code, configurou tudo, está pronto para rodar no terminal. Agora a gente dá um passo atrás antes de dar dois passos à frente.

Tudo que construímos nos próximos módulos — o Centro de Treinamento de Agentes, o Claude Design, os Squads — depende de você dominar o que está por vir.

Se parecer simples demais em algum momento, é pra ser. Mas vale o foco: é nesses fundamentos que tudo se sustenta.',
    updated_at  = now()
WHERE id = '9828e194-3939-4c9e-bb45-7aece7630179'
  AND deleted_at IS NULL;

-- M3 | sort_order=1 | arquivo: "Módulo 3 | Parte 0.txt"
UPDATE public.lessons
SET title       = 'Módulo 3 | Parte 0',
    description = 'A primeira distinção que muda tudo: Claude Code não é o claude.ai.

Nesta aula você entende a diferença fundamental entre o claude.ai (o chat que você já conhece) e o Claude Code — um agente que tem acesso ao seu computador. No claude.ai você conversa. No Claude Code você delega.

Quando o Claude "tem mãos", ele para de ser um assistente de conversa e vira um operador: lê arquivos, cria documentos, roda comandos, processa dados em volume. Ele executa.

A regra de bolso que define quando usar cada um:
→ claude.ai é para pensar
→ Claude Code é para produzir',
    updated_at  = now()
WHERE id = 'd75d8c77-2460-4a61-ac67-556bad59f3bf'
  AND deleted_at IS NULL;

-- M3 | sort_order=2 | arquivo: "Módulo 3 | Parte 1.txt"
UPDATE public.lessons
SET title       = 'Módulo 3 | Parte 1',
    description = 'Terminal não é coisa de hacker. É só uma forma diferente de conversar com o computador.

Nesta aula desmistificamos o terminal para quem nunca usou — e apresentamos os 4 comandos que resolvem 95% do que você vai precisar:

→ pwd — onde você está (o GPS do terminal)
→ ls — o que tem dentro da pasta atual
→ cd — entrar em uma pasta (cd .. para voltar)
→ clear — limpar a tela e começar visualmente do zero

Também explicamos o que é uma CLI (Command Line Interface), como o Claude Code se encaixa nesse conceito, como abrir o Claude Code dentro de uma pasta específica e como sair da sessão (/exit ou Ctrl+C).',
    updated_at  = now()
WHERE id = 'd467883b-09ce-41a7-9d8e-69014f3e2e37'
  AND deleted_at IS NULL;

-- M3 | sort_order=3 | arquivo: "Módulo 3 | Parte 2 | Pastas.txt"
UPDATE public.lessons
SET title       = 'Módulo 3 | Parte 2 | Pastas',
    description = 'Quando você abre o Claude Code dentro de uma pasta, aquela pasta vira o universo dele.

Esse conceito muda a forma como você organiza seu trabalho com IA. Tudo que está dentro da pasta, o Claude enxerga. O que está fora, ele não vê.

Nesta aula você aprende:
→ Por que a organização em pastas é o alicerce da operação
→ A regra de ouro: uma pasta por projeto, por cliente, por operação
→ Por que uma "pastona geral" vira caos e faz a qualidade cair
→ O que é o arquivo .env — quando usar, e o que nunca colocar nele

Exemplo prático: se você tem um cliente clínica, cria uma pasta "clinica-tal", coloca os documentos e instruções desse cliente lá dentro. Cada cliente é um mundo isolado. Essa separação é uma vantagem absurda.',
    updated_at  = now()
WHERE id = 'ce149f3e-3d47-47c2-b0f7-022697857a1d'
  AND deleted_at IS NULL;

-- M3 | sort_order=4 | arquivo: "Módulo 3 | Parte 3 | Claude.txt"
UPDATE public.lessons
SET title       = 'Módulo 3 | Parte 3 | Claude',
    description = 'O CLAUDE.md é a coisa mais importante desta aula.

É um arquivo de texto que você coloca dentro da pasta do projeto. Toda vez que o Claude Code é aberto naquela pasta, ele lê esse arquivo automaticamente — antes de qualquer coisa. É o onboarding do Claude para o seu negócio.

Pensa assim: quando você contrata um funcionário novo, você explica quem é a empresa, como ela opera, qual o tom de comunicação, o que deve e o que não deve fazer. Isso é onboarding. O CLAUDE.md é exatamente isso — só que o Claude lê toda vez que começa a trabalhar.

Nesta aula você aprende os 4 blocos essenciais do CLAUDE.md:
→ Contexto do negócio — quem é a empresa, o que ela faz, quem são os clientes
→ Regras — o que ele deve sempre fazer ou nunca fazer
→ Tom de voz — como a empresa se comunica
→ O que evitar — temas sensíveis, abordagens que não combinam com a marca

Também explicamos a diferença entre CLAUDE.md global (vale para tudo) e CLAUDE.md de projeto (vale para aquele cliente/operação), e como usar o comando /init para gerar um arquivo automaticamente como ponto de partida.',
    updated_at  = now()
WHERE id = 'bf67b516-0f31-4533-b616-10539585b341'
  AND deleted_at IS NULL;

-- M3 | sort_order=5 | arquivo: "Módulo 3 | Parte 4.txt"
UPDATE public.lessons
SET title       = 'Módulo 3 | Parte 4',
    description = 'Com esses 5 comandos você resolve 95% do que vai precisar no Claude Code.

Diferente dos comandos do terminal, esses começam com barra (/) e funcionam dentro da sessão do Claude. Nesta aula você aprende cada um com contexto de quando usar:

→ /model — escolhe o "cérebro" que vai trabalhar para você
  • Opus: o sênior. Raciocínio profundo, estratégia, decisões complexas
  • Sonnet: o equilíbrio. Sólido, rápido, resolve 80% do dia a dia (seu padrão)
  • Haiku: o estagiário eficiente. Tarefas simples e repetitivas em volume

→ /clear — apaga a memória da conversa. Use quando trocar de assunto completamente.

→ /compact — resume o contexto sem apagar. Use quando a conversa está longa e você quer manter o fio sem sobrecarregar o Claude.

→ /init — gera um CLAUDE.md automático baseado no que tem na pasta. Bom ponto de partida.

→ /help — mostra todos os comandos disponíveis. Seu guia quando quiser explorar.

A distinção crítica que costuma confundir:
/clear apaga | /compact resume | sessão nova = contexto zero',
    updated_at  = now()
WHERE id = '5a7f1925-423e-4f35-a4d1-0b0f1e90dbd7'
  AND deleted_at IS NULL;

-- M3 | sort_order=6 | arquivo: "Módulo 3 | Parte 5.txt"
UPDATE public.lessons
SET title       = 'Módulo 3 | Parte 5',
    description = 'Entender como o Claude pensa quando está trabalhando economiza muita frustração.

Quando você pede algo ao Claude Code, ele entra em um loop de quatro fases:
1. Pensa — lê o pedido, o CLAUDE.md, o contexto da pasta e decide o que fazer
2. Age — executa uma ação (ler arquivo, criar documento, rodar um comando)
3. Observa — avalia o resultado: deu certo? apareceu algo novo?
4. Repete — com base no que observou, reinicia o ciclo até a tarefa estar pronta

Você pode ver esse processo acontecendo em tempo real — e interromper a qualquer momento se ele for na direção errada.

Nesta aula também explicamos:
→ O sistema de permissões — o Claude pede autorização antes de agir em certas operações
→ Modo auto-aceitar: o que é e por que não usar no começo
→ Os 3 níveis de risco que definem quanto atenção você precisa dar:
  • Ler → seguro, risco zero
  • Escrever → médio, vale conferir
  • Executar → alto, leia antes de aprovar',
    updated_at  = now()
WHERE id = 'a159c7c2-7d0d-454b-a38e-024dad9da506'
  AND deleted_at IS NULL;

-- M3 | sort_order=7 | arquivo: "Módulo 3 | Parte 6.txt"
UPDATE public.lessons
SET title       = 'Módulo 3 | Parte 6',
    description = 'Três conceitos que aparecem em todo o restante da mentoria — vale conhecer agora para reconhecer quando aparecerem.

Esta aula apresenta o vocabulário interno do sistema Claude Code:

SKILL — o "como"
É um procedimento reutilizável. Pense como um SOP (Standard Operating Procedure) da empresa. Exemplo: você cria uma skill "proposta-comercial" com o padrão de cabeçalho, estrutura de blocos, tom e rodapé. Toda vez que precisar de uma proposta, chama essa skill. Uma vez escrita, usada dezenas de vezes sem perda de qualidade.

AGENT — o "quem"
É um especialista com cargo, responsabilidade e autoridade definidos. Diferente da skill (que é um procedimento), o agent é a pessoa que segue o procedimento. Exemplo: um agente "revisor-de-contratos" com expertise em direito empresarial, que sempre aponta riscos antes de aprovar.

HOOK — o "quando"
É uma regra de compliance que dispara automaticamente em momentos específicos. Silencioso, sempre ativo. Exemplo: um hook que intercepta toda tentativa de envio de email ao cliente e solicita aprovação do gerente antes de liberar.

A síntese para não confundir:
→ Skill = a receita
→ Agent = o padeiro
→ Hook = a regra de não abrir o forno antes dos 30 minutos',
    updated_at  = now()
WHERE id = '373fbd8a-c45c-4775-b925-2aec9070b717'
  AND deleted_at IS NULL;

-- M3 | sort_order=8 | arquivo: "Módulo 3 | Parte 7.txt"
UPDATE public.lessons
SET title       = 'Módulo 3 | Parte 7',
    description = 'O Claude sozinho é poderoso. O Claude conectado às ferramentas que você já usa — CRM, Gmail, Google Drive, Notion, Slack, Stripe — vira o centralizador da operação inteira.

Nesta aula você aprende os três conceitos que tornam isso possível, sem precisar saber programar:

API — você pergunta, a ferramenta responde
É o "cardápio" de uma ferramenta. Você faz um pedido no formato que ela aceita, ela entrega o resultado. Como um garçom que leva seu pedido para a cozinha e traz de volta. Exemplo: o Claude pede ao CRM a lista de leads dos últimos 7 dias. O CRM responde com os dados. O Claude trabalha com eles.

WEBHOOK — a ferramenta avisa, você reage
É a campainha da casa. Você não precisa ficar perguntando se chegou alguém — quando chega, a campainha toca. Exemplo: toda vez que alguém preenche o formulário do site, o webhook notifica o Claude na hora, que já inicia um atendimento personalizado. Automação reativa, sem monitoramento manual.

MCP (Model Context Protocol) — o padrão universal
Criado pela Anthropic em 2024. Antes dele, conectar o Claude a cada ferramenta era um projeto técnico separado. O MCP padronizou tudo — é o "tradutor universal" entre o Claude e qualquer ferramenta. Com ele, você instala o MCP do Google Drive, do Slack, do Notion — e o Claude passa a operar nessas plataformas nativamente.

A diferença prática:
→ API = Claude busca informação (iniciativa do Claude)
→ Webhook = ferramenta avisa o Claude (iniciativa da ferramenta)
→ MCP = protocolo padrão que torna as duas coisas mais simples',
    updated_at  = now()
WHERE id = '55646f1d-37b3-4b6b-a664-536592af1638'
  AND deleted_at IS NULL;

-- M3 | sort_order=9 | arquivo: "Módulo 3 | Parte 8 | Encerramento.txt"
UPDATE public.lessons
SET title       = 'Módulo 3 | Parte 8 | Encerramento',
    description = 'Chegamos ao fim do Módulo 3. Para fechar, três hábitos práticos que valem incorporar a partir de amanhã:

→ Hábito 1: uma pasta por projeto — cada cliente e cada operação com sua própria pasta e seu próprio CLAUDE.md. Você vai sentir a diferença rápido.

→ Hábito 2: o CLAUDE.md antes do pedido — 15 minutos escrevendo um bom CLAUDE.md economizam horas de retrabalho. O investimento vale.

→ Hábito 3: ler antes de aprovar — quando o Claude pede permissão, pare e leia o que ele está prestes a executar. Não vira reflexo de clicar "aceitar". Isso treina o olhar e evita surpresas.

Os erros mais comuns de quem está começando:
• Abrir o Claude na pasta errada e estranhar que ele não encontra os arquivos — use pwd para conferir onde você está antes de abrir.
• Começar sem CLAUDE.md e frustrar com um Claude que "não entende o negócio" — ele só sabe o que você conta.
• Deixar uma sessão aberta por dias, acumulando contexto até virar bagunça — /clear quando trocar de tarefa resolve.

No próximo módulo: agora que você sabe operar o Claude sozinho, o Módulo 4 ensina ele a ter uma equipe. Vamos construir o Centro de Treinamento de Agentes — onde você cria especialistas dentro do Claude, cada um com papel e foco definidos. É aí que a coisa fica realmente séria.',
    updated_at  = now()
WHERE id = '8609781b-cce1-493e-bf78-5236116b8e54'
  AND deleted_at IS NULL;

-- ============================================================
-- MÓDULO 5 | CLAUDE DESIGN
-- ============================================================

-- M5 | sort_order=0 | arquivo: "Módulo 5 | Abertura.txt"
UPDATE public.lessons
SET title       = 'Módulo 5 | Abertura',
    description = 'Bem-vindo ao Módulo 5 — onde a operação que você montou nos módulos anteriores ganha cara. Ganha identidade visual. Ganha o que o cliente final realmente vê quando o squad termina o trabalho.

Este módulo apresenta Claude Design: como, em uma manhã de trabalho, você entrega o que uma agência cobraria de R$30k a R$60k. Sem exagero — são os preços reais do mercado.',
    updated_at  = now()
WHERE id = '0c96c53a-fd68-4651-bcd4-530d6e3f9bd0'
  AND deleted_at IS NULL;

-- M5 | sort_order=1 | arquivo: "Módulo 5 | Aula 1 | Diretor de Arte.txt"
UPDATE public.lessons
SET title       = 'Módulo 5 | Aula 1 | Diretor de Arte',
    description = 'Antes de falar o que é Claude Design, vamos olhar o que você teria que pagar para ter isso feito numa agência séria.

Os preços de mercado:
→ Design System completo: R$20k–R$50k, 3 a 6 semanas
→ KV de site: R$30k–R$80k, 6 a 12 semanas
→ KV de social media: R$8k–R$20k, 2 a 4 semanas
→ Criativos de tráfego pago: R$3k–R$10k/mês, recorrente
→ Design System de app: R$30k–R$80k, 8 a 16 semanas

Total: entre R$80k e R$280k de investimento único, mais R$3k–R$10k/mês de recorrente.

E o time que entrega isso: 4 ou 5 profissionais por projeto. Mais meses de briefing, moodboard, rodadas de aprovação.

Claude Design muda esse jogo completamente. É um canvas visual dentro do claude.ai (claude.ai/design) lançado em abril de 2026. Chat de um lado, canvas do outro. Você descreve, ele entrega HTML interativo navegável com refinamento ao vivo — e manda o resultado direto pro Claude Code via handoff de um clique.

Em uma manhã: Design System, KV de site, KV de social, KV de tráfego, KV de app. Todos consistentes. Todos prontos pra alimentar as squads do Módulo 4.',
    updated_at  = now()
WHERE id = 'd81feaa7-4d68-4ff4-a44a-3bfda793efc0'
  AND deleted_at IS NULL;

-- M5 | sort_order=2 | arquivo: "Módulo 5 | Aula 2 | Por que Esse Módulo Importa.txt"
UPDATE public.lessons
SET title       = 'Módulo 5 | Aula 2 | Por que Esse Módulo Importa',
    description = 'Recap rápido do Módulo 4: você saiu de lá com a operação inteira da empresa estruturada em squads de IA. Cada área tem sua pasta, equipe especializada e memória própria. Operação técnica montada.

Mas tem um problema: o cliente final não vê o squad. Não vê a smart-memory. Não vê os agentes trabalhando.

O cliente vê o resultado — o post no Instagram, o site publicado, o anúncio no feed. E se esse resultado não tem identidade visual coerente e profissional, todo o aparato técnico que você montou fica invisível.

O cliente julga pela embalagem. Sempre.

É por isso que este módulo existe: dar identidade visual às squads. Insumos prontos e consistentes para cada saída da operação. E o melhor — o que você criar aqui vai direto pro Claude Code via handoff. Sai do design e entra na produção sem fricção, sem reuniões de transferência.

É a ponte entre "como sua operação funciona" e "como ela aparece pro mundo".',
    updated_at  = now()
WHERE id = '624ca037-21a4-4bea-a4c7-ea97f8184c79'
  AND deleted_at IS NULL;

-- M5 | sort_order=3 | arquivo: "Módulo 5 | Aula 3 | Lógica de Projetos.txt"
UPDATE public.lessons
SET title       = 'Módulo 5 | Aula 3 | Lógica de Projetos',
    description = 'A lógica que sustenta todo o módulo: cada saída visual da empresa vira um projeto separado no Claude Design — mas existe um projeto que vem antes de todos os outros.

O Design System é a base. A fonte de verdade visual. Cores, tipografia, espaçamentos, peças principais. Sem isso, cada projeto novo é invenção, cada saída tem cara diferente, a marca fica inconsistente.

A partir do Design System, você cria os 4 KVs (Key Visuals) — a identidade aplicada a cada destino específico:
→ KV Site — como a identidade se materializa em páginas, navegação, hero sections
→ KV Social — como vira capa de Reels, carrossel, story
→ KV Tráfego — como vira criativo de Meta, Google Display, TikTok
→ KV Dev — como vira tela de app, navegação por toque, modo claro e escuro

As 3 regras de ouro do módulo:
→ Sempre comece pelo Design System. Sem exceção
→ Cada KV ganha projeto próprio no Claude Design
→ Cada KV referencia explicitamente o Design System — isso garante consistência entre todos os canais',
    updated_at  = now()
WHERE id = '10aaf3cd-2033-43f1-aaaa-6ca184159c2a'
  AND deleted_at IS NULL;

-- M5 | sort_order=4 | arquivo: "Módulo 5 | Aula 4 | Design System.txt"
UPDATE public.lessons
SET title       = 'Módulo 5 | Aula 4 | Design System',
    description = 'A parte prática começa aqui. O Design System tem tela nativa de setup no Claude Design — não é prompt corrido, é formulário estruturado.

Os 5 campos do setup:

→ Company name and blurb — nome e descrição densa. Inclua: quem você é, o que faz, para quem, e o tom da comunicação. Esses 4 pontos são o mínimo
→ Link de código (GitHub ou pasta local) — se sua empresa tem site ou produto com código, aponte. Claude Design extrai o design system existente
→ Upload de arquivo Figma — se você tem componentes já definidos em .fig, sobe aqui
→ Fontes, logos e assets — logo em SVG, fontes específicas, assets visuais. Garante que Claude Design não inventa logo nem troca fonte
→ Any other notes — o campo mais importante. Varia por cenário:

Cenário 1 — Marca já existe: cores em hex, fontes pelo nome exato, referências reconhecíveis, e o que NÃO fazer. Quanto mais específico, melhor o resultado.

Cenário 2 — Marca ainda não existe: descreva mood, personalidade, referências visuais e o que evitar — mas SEM cores ou fontes específicas. Peça explicitamente para o Claude Design perguntar e propor 2-3 opções antes de gerar. Decisão informada, não chute.

Quando o Design System estiver aprovado: valide contra 5 critérios (personalidade, componentes funcionando juntos, consistência, dark mode, acessibilidade WCAG AA).

Valor de mercado: R$20k–R$50k entregues em ~20 minutos.',
    updated_at  = now()
WHERE id = '4082dd83-eaa2-49ad-b33d-ebffc6f98313'
  AND deleted_at IS NULL;

-- M5 | sort_order=5 | arquivo: "Módulo 5 | Aula 5 | KV Site.txt"
UPDATE public.lessons
SET title       = 'Módulo 5 | Aula 5 | KV Site',
    description = 'Primeiro KV: o do site. Projeto novo no Claude Design, referenciando o Design System base.

O que é específico de web (além do Design System):
→ Grid responsivo — como tudo se comporta em desktop, tablet, mobile
→ Navegação — header com menu, footer institucional, breadcrumbs
→ Estados de hover — desktop tem hover, mobile não
→ Páginas-tipo — home, sobre, contato, blog
→ Microinterações — animações ao scroll, transições, loading states
→ Performance visual — above the fold otimizado, hierarquia que carrega bem

O prompt da aula faz 9 perguntas antes de gerar qualquer coisa:
confirmação do Design System → cores e tipografia para web → tipo de site → páginas necessárias → objetivo de conversão → features funcionais → referências de qualidade → público e dispositivo principal

Só depois de todas as respostas, Claude Design entrega: todas as páginas, todos os componentes, todos os estados (hover, focus, loading, error, success) — tudo navegável.

Handoff para squad Sites via "Send to Claude Code".

Valor de mercado: R$30k–R$80k entregues em uma sessão.',
    updated_at  = now()
WHERE id = '704167d3-3732-42de-b2a6-fe6182bd8b3c'
  AND deleted_at IS NULL;

-- M5 | sort_order=6 | arquivo: "Módulo 5 | Aula 6 | KV Social.txt"
UPDATE public.lessons
SET title       = 'Módulo 5 | Aula 6 | KV Social',
    description = 'Segundo KV: social media. Regras próprias que web não tem.

O que é específico de social:
→ Decisão visual em 3 segundos — o scroll do feed é implacável
→ Mobile only — ninguém vê post de Instagram no desktop
→ Zona segura dos Reels — topo (~220px) e rodapé (~480px) bloqueados pela UI do app
→ Variação sem perder identidade — dezenas de posts, sem cansar, mas reconhecível

O prompt faz 10 perguntas antes de gerar: Design System base, adaptações de cor e tipografia para social, plataformas, tema e tom do ciclo, público, frequência de posts, referências de perfis admirados.

O sistema entregue:
→ 3 estilos de capa de Reels × 5 variações
→ 3 templates de carrossel (8 slides cada): educacional, lista, história/case
→ 5 templates de stories (anúncio, conteúdo, bastidor, prova social, interativo)
→ Sistema de variação em 3 intensidades (clara, escura, fotográfica)
→ Posts de feed e LinkedIn
→ Grid de feed: como 9 posts criam ritmo visual no perfil

Handoff para squad Social.

Valor de mercado: R$8k–R$20k entregues em uma sessão.',
    updated_at  = now()
WHERE id = '4f30034a-246e-4fb7-b69f-b8354843bc3c'
  AND deleted_at IS NULL;

-- M5 | sort_order=7 | arquivo: "Módulo 5 | Aula 7 | KV Tráfego.txt"
UPDATE public.lessons
SET title       = 'Módulo 5 | Aula 7 | KV Tráfego',
    description = 'Terceiro KV: criativos de anúncios pagos. As regras mais distintas de todos os canais.

O que é específico de tráfego pago:
→ Os primeiros 3 segundos visuais decidem se o usuário para de rolar — mais cruel que social orgânico, porque o usuário não pediu pra ver
→ CTA explícito e impossível de ignorar — "saiba mais" é fraco, "garanta 30% off agora" é forte
→ Texto curto — cada palavra defende seu lugar
→ Variantes para A/B test são parte do sistema — mínimo 3 ângulos por oferta
→ Cada plataforma tem sua linguagem visual — Meta ≠ Google ≠ TikTok

O prompt faz 10 perguntas antes de gerar: Design System base, adaptações de cor e tipografia para anúncio, produto/oferta, objetivo da campanha, plataformas, público e nível de consciência, investimento mensal, provas sociais/garantias disponíveis.

O sistema entregue:
→ 3 ângulos de mensagem: Dor + Solução / Prova Social + Resultado / Urgência + Oferta
→ Meta Ads: 9 peças (3 formatos × 3 ângulos)
→ Google Display: 12 peças (6 dimensões × 2 variações)
→ TikTok e LinkedIn Ads
→ Sistema de nomenclatura de arquivos para A/B test organizado

Handoff para squad Traffic.

Valor de mercado: R$3k–R$10k/mês internalizados.',
    updated_at  = now()
WHERE id = '3c8b5423-bbc5-4c52-8ff9-5a184a06237c'
  AND deleted_at IS NULL;

-- M5 | sort_order=8 (slug: modulo-5-aula-9) | arquivo: "Módulo 5 | Aula 9 | Handoff pro Claude Code.txt"
-- Nota: sort_order=8 no banco corresponde à Aula 9 do conteúdo (a Aula 8 KV Dev está faltante — ver gap report MC-1.1)
UPDATE public.lessons
SET title       = 'Módulo 5 | Aula 9 | Handoff pro Claude Code',
    description = 'A parte que diferencia Claude Design de Figma, Canva ou qualquer outra ferramenta de design. O handoff direto para o Claude Code.

Como funciona — absurdamente simples:
Design aprovado no canvas → clique em "Send to Claude Code" → bundle empacotado → squad correspondente trabalhando. Um clique.

O que vai junto no bundle — não é só "o desenho":
→ O visual completo: HTML interativo de todas as páginas e telas, tokens de design (cores, tipografia, espaçamentos), componentes catalogados
→ A intenção: Claude Design captura o "porquê" das decisões. Por que esse botão é primário. Por que esse espaçamento. A squad não precisa adivinhar
→ As specs técnicas: dimensões exatas, comportamentos esperados, estados de interação — tudo que normalmente seria explicado em reunião de handoff

O mapeamento KV → squad:
→ KV Site → Squad Sites
→ KV Social → Squad Social
→ KV Tráfego → Squad Traffic
→ KV Dev → Squad Dev

O fluxo completo do módulo em uma manhã: Design System → KV Site → KV Social → KV Tráfego → KV Dev → handoff de cada um. Identidade visual consistente em todos os canais, pronta para produção, sem agência, sem briefing, sem semanas de espera.',
    updated_at  = now()
WHERE id = 'da7e8094-4f02-4efb-84ba-26e5f76c950e'
  AND deleted_at IS NULL;

-- M5 | sort_order=9 | arquivo: "Módulo 5 | Aula 10 | Encerramento.txt"
UPDATE public.lessons
SET title       = 'Módulo 5 | Aula 10 | Encerramento',
    description = 'Fechamento do Módulo 5 com a conta final, os hábitos e o gancho para os próximos módulos.

A conta do que foi internalizado nesse módulo:
→ Design System: R$20k–R$50k
→ KV Site: R$30k–R$80k
→ KV Social: R$8k–R$20k
→ KV Tráfego: R$3k–R$10k/mês (recorrente)
→ KV Dev de App: R$30k–R$80k
→ Total único: R$80k–R$280k + R$3k–R$10k/mês
→ Tudo feito em uma manhã

Os 3 hábitos para incorporar:
→ Sempre começar pelo Design System — é o tronco. Sem ele, cada KV vira invenção e a marca fica inconsistente
→ Cada KV ganha projeto próprio — a separação por destino é o que mantém cada peça otimizada para seu canal
→ Aproveitar o handoff — não exportar manual, não baixar pasta, não enviar arquivo por email. "Send to Claude Code" economiza dias de trabalho de transferência

Os 3 erros mais comuns:
→ Pular o Design System achando que vai economizar tempo — garante inconsistência na hora de criar o segundo KV
→ Tentar fazer tudo num projeto só — cada destino tem regras diferentes, o resultado fica genérico
→ Esquecer que o handoff existe — fazer todo o design lindo e transferir manualmente é o erro que desperdiça a feature mais poderosa do produto

Gancho para os próximos módulos: Módulo 6 (Squad Sites em ação), Módulo 7 (Squad Social), Módulo 8 (Squad Dev). Em cada um você vai ver a squad consumindo o KV correspondente criado hoje.',
    updated_at  = now()
WHERE id = '0b153dd0-7a84-4b82-a355-d46630dd16d7'
  AND deleted_at IS NULL;

-- ============================================================
-- ROLLBACK (não executar — apenas documentado)
-- ============================================================
-- Para reverter, restaurar os valores anteriores por módulo:
--
-- Módulo 3 (titles originais curtos, descriptions originais):
-- UPDATE public.lessons SET title = 'Abertura',                         description = 'Módulo 3 - Abertura', updated_at = now() WHERE id = '9828e194-3939-4c9e-bb45-7aece7630179' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = '0 | Claude Code não é o claude.ai', description = <original>, updated_at = now() WHERE id = 'd75d8c77-2460-4a61-ac67-556bad59f3bf' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = '1 | Terminal não é coisa de hacker', description = <original>, updated_at = now() WHERE id = 'd467883b-09ce-41a7-9d8e-69014f3e2e37' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = '2 | Pastas',                         description = <original>, updated_at = now() WHERE id = 'ce149f3e-3d47-47c2-b0f7-022697857a1d' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = '3 | Claude.md',                      description = <original>, updated_at = now() WHERE id = 'bf67b516-0f31-4533-b616-10539585b341' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = '4 | Comandos Base',                  description = <original>, updated_at = now() WHERE id = '5a7f1925-423e-4f35-a4d1-0b0f1e90dbd7' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = '5 | Como Claude Trabalha',           description = <original>, updated_at = now() WHERE id = 'a159c7c2-7d0d-454b-a38e-024dad9da506' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = '6 | Estrutura Base',                 description = <original>, updated_at = now() WHERE id = '373fbd8a-c45c-4775-b925-2aec9070b717' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = '7 | Pontes com o Mundo',             description = <original>, updated_at = now() WHERE id = '55646f1d-37b3-4b6b-a664-536592af1638' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = 'Encerramento',                       description = <original>, updated_at = now() WHERE id = '8609781b-cce1-493e-bf78-5236116b8e54' AND deleted_at IS NULL;
--
-- Módulo 5 (todas as descriptions eram NULL/vazias, title era o atual do banco):
-- UPDATE public.lessons SET title = 'Abertura',                                          description = NULL, updated_at = now() WHERE id = '0c96c53a-fd68-4651-bcd4-530d6e3f9bd0' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = 'Módulo 5 | Aula 1 | Diretor de Arte',               description = NULL, updated_at = now() WHERE id = 'd81feaa7-4d68-4ff4-a44a-3bfda793efc0' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = 'Módulo 5 | Aula 2 | Por que Esse Módulo Importa',   description = NULL, updated_at = now() WHERE id = '624ca037-21a4-4bea-a4c7-ea97f8184c79' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = 'Módulo 5 | Aula 3 | Lógica de Projetos',            description = NULL, updated_at = now() WHERE id = '10aaf3cd-2033-43f1-aaaa-6ca184159c2a' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = 'Módulo 5 | Aula 4 | Design System',                 description = NULL, updated_at = now() WHERE id = '4082dd83-eaa2-49ad-b33d-ebffc6f98313' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = 'Módulo 5 | Aula 5 | KV Site',                       description = NULL, updated_at = now() WHERE id = '704167d3-3732-42de-b2a6-fe6182bd8b3c' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = 'Módulo 5 | Aula 6 | KV Social',                     description = NULL, updated_at = now() WHERE id = '4f30034a-246e-4fb7-b69f-b8354843bc3c' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = 'Módulo 5 | Aula 7 | KV Tráfego',                    description = NULL, updated_at = now() WHERE id = '3c8b5423-bbc5-4c52-8ff9-5a184a06237c' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = 'Módulo 5 | Aula 9 | Handoff pro Claude Code',        description = NULL, updated_at = now() WHERE id = 'da7e8094-4f02-4efb-84ba-26e5f76c950e' AND deleted_at IS NULL;
-- UPDATE public.lessons SET title = 'Módulo 5 | Aula 10 | Encerramento',                  description = NULL, updated_at = now() WHERE id = '0b153dd0-7a84-4b82-a355-d46630dd16d7' AND deleted_at IS NULL;
