# HTML Manual M5 — por aula

UUIDs do banco (2026-05-17):
- sort_order=0 abertura: 0c96c53a-fd68-4651-bcd4-530d6e3f9bd0
- sort_order=1 aula-1-diretor-de-arte: d81feaa7-4d68-4ff4-a44a-3bfda793efc0
- sort_order=2 aula-2-por-que-esse-modulo-importa: 624ca037-21a4-4bea-a4c7-ea97f8184c79
- sort_order=3 aula-3-logica-de-projetos: 10aaf3cd-2033-43f1-aaaa-6ca184159c2a
- sort_order=4 aula-4-design-system: 4082dd83-eaa2-49ad-b33d-ebffc6f98313
- sort_order=5 aula-5-kv-site: 704167d3-3732-42de-b2a6-fe6182bd8b3c
- sort_order=6 aula-6-kv-social: 4f30034a-246e-4fb7-b69f-b8354843bc3c
- sort_order=7 aula-7-kv-trafego: 3c8b5423-bbc5-4c52-8ff9-5a184a06237c
- sort_order=8 aula-8-kv-dev: 21cdf781-311e-4269-9c8b-1261e0b4532d
- sort_order=9 aula-9-handoff-pro-claude-code: da7e8094-4f02-4efb-84ba-26e5f76c950e
- sort_order=10 aula-10-encerramento: 0b153dd0-7a84-4b82-a355-d46630dd16d7

Nota de mapeamento: O PDF tem 12 aulas (Aula 01–12). O banco tem 10 aulas + abertura. Os slugs do banco indicam o conteúdo:
aula-4-design-system → PDF Aula 06; aula-5-kv-site → PDF Aula 07; etc.
PDF Aulas 04 (Como começar) e 05 (Como ajustar) foram incorporadas dentro da aula de Design System (sort_order=4), pois são conteúdo preparatório antes do Design System.

---

## sort_order=0 | abertura
lesson_id: 0c96c53a-fd68-4651-bcd4-530d6e3f9bd0
content_format: HTML

```html
<h2>Módulo 05 — Claude Design</h2>
<p>Seu novo diretor de arte. O módulo onde você economiza R$80k a R$280k em entregas de design — Design System, KVs de Site, Social, Tráfego e App, todos com identidade coerente, em uma manhã.</p>
<ul>
  <li><strong>O que você sai tendo:</strong> Design System + 4 KVs prontos</li>
  <li><strong>Aulas:</strong> 12</li>
  <li><strong>Valor de mercado:</strong> R$80–280k</li>
</ul>
```

---

## sort_order=1 | aula-1-diretor-de-arte
lesson_id: d81feaa7-4d68-4ff4-a44a-3bfda793efc0
content_format: HTML
PDF: Aula 01 — Claude Design é seu novo diretor de arte (pp. 3–6)

```html
<h2>Claude Design é seu novo diretor de arte</h2>
<p>A primeira mudança de mindset é entender que isso não é uma ferramenta — é um cargo. Um diretor de arte sênior que opera 24/7 e cobra R$0/mês. Quando você entende o que esse cargo representa, o resto do módulo flui.</p>

<h3>O que uma agência cobra</h3>
<p>Antes de falar de tecnologia, vamos falar de mercado. Quanto custa fazer design pra uma marca, no Brasil, com agência decente?</p>
<table>
  <thead>
    <tr><th>Entrega</th><th>Valor de mercado</th><th>Prazo</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Design System</strong></td><td>R$ 20–50k</td><td>3–6 semanas</td></tr>
    <tr><td><strong>Site institucional</strong></td><td>R$ 30–80k</td><td>4–8 semanas</td></tr>
    <tr><td><strong>Campanha de Social Media</strong></td><td>R$ 8–20k por ciclo</td><td>1–2 semanas</td></tr>
    <tr><td><strong>Criativos de Tráfego Pago</strong></td><td>R$ 3–10k/mês recorrente</td><td>contínuo</td></tr>
    <tr><td><strong>Design System de App</strong></td><td>R$ 30–80k</td><td>4–8 semanas</td></tr>
    <tr><td><strong>Total potencial anual</strong></td><td>R$ 80–280k</td><td>6+ meses</td></tr>
  </tbody>
</table>
<p>Esse é o universo de custo que a empresa enfrenta quando precisa de identidade visual profissional. Não é absurdo. É o que uma boa agência cobra — e cobra com razão, considerando o time, o tempo, a expertise.</p>

<h3>O time típico</h3>
<p>Quando você contrata uma agência, paga por um time. Tipicamente:</p>
<ul>
  <li><strong>Diretor de arte</strong> — responsável pela visão criativa, decisões estéticas, alinhamento com a marca</li>
  <li><strong>Designer sênior</strong> — execução das peças principais, sistema visual</li>
  <li><strong>Designer pleno</strong> — adaptações, variações, peças secundárias</li>
  <li><strong>UX designer</strong> — quando o projeto envolve interface (site, app)</li>
  <li><strong>Account / Project manager</strong> — coordenação, prazos, alinhamento com você</li>
</ul>
<p>Cinco pessoas. Quatro a oito semanas por projeto. Várias rodadas de aprovação. Cada uma delas com custo, demora, atrito.</p>

<h3>O fluxo tradicional</h3>
<p>O que acontece nesse fluxo, do briefing à entrega:</p>
<ol>
  <li>Briefing inicial — 1 a 2 reuniões</li>
  <li>Conceito visual — 1 semana, 2 propostas</li>
  <li>Aprovação do conceito — 1 a 2 rodadas</li>
  <li>Desenvolvimento das peças — 2 a 4 semanas</li>
  <li>Apresentação parcial — 1 rodada de ajustes</li>
  <li>Refinamento — 1 a 2 semanas</li>
  <li>Aprovação final — 1 rodada</li>
  <li>Entrega dos arquivos — 1 a 2 dias</li>
</ol>
<p>Total: 4 a 8 semanas. Vários pontos de fricção. Cada rodada de ajuste consome tempo da agência e seu — porque você precisa parar, revisar, dar feedback, esperar.</p>

<h3>O que o Claude Design muda</h3>
<blockquote>
  <p><em>"Claude Design não é uma ferramenta de design. É um diretor de arte sênior trabalhando 24/7 na sua estrutura, sem cobrar por hora."</em></p>
</blockquote>
<p>O salto não está em "fazer design mais rápido". Está em <strong>ter um diretor de arte no time</strong>. Alguém que entende a marca, que mantém coerência entre todas as peças, que produz com qualidade técnica, e que está disponível na hora que você precisa.</p>
<p>O que mudou nos últimos 18 meses:</p>
<ul>
  <li>Claude Design lê e respeita design systems existentes</li>
  <li>Trabalha em código real (HTML, CSS, React) — não em mockup que precisa ser "passado pro código"</li>
  <li>Produz nos padrões de plataforma certos (web responsiva, mobile native, ads sizes)</li>
  <li>Mantém consistência absoluta entre peças quando você usa o mesmo base system</li>
  <li>Permite refino conversacional, granular, instantâneo</li>
</ul>

<h3>A diferença real</h3>
<p>O que estava difícil antes — manter consistência entre 50 peças de uma campanha, garantir que o site segue o mesmo sistema visual dos anúncios, traduzir um Design System em variações pra cada formato — agora é trivial.</p>
<p>E isso é o que C-level precisa entender: <strong>não é sobre fazer mais rápido</strong>. É sobre <strong>ter capacidade de execução visual coerente em escala</strong>, sem o custo de uma equipe full-time de design.</p>
<div class="callout">
  <p><strong>A pergunta certa</strong></p>
  <p>Pergunta errada: "Quanto economizo trocando minha agência por Claude Design?"<br>
  Pergunta certa: <strong>"O que eu faço de novo, que antes era inviável, agora que tenho um diretor de arte sênior no time?"</strong></p>
</div>
```

---

## sort_order=2 | aula-2-por-que-esse-modulo-importa
lesson_id: 624ca037-21a4-4bea-a4c7-ea97f8184c79
content_format: HTML
PDF: Aula 02 — Por que isso importa pra empresa (pp. 7–9)

```html
<h2>Por que isso importa pra empresa</h2>
<p>Recap do M04 e o ponto cego que ele deixou. As squads produzem trabalho técnico ótimo, mas o cliente final só vê o resultado — e se esse resultado não tem identidade visual coerente, todo o trabalho de IA por trás some.</p>

<h3>Recap do Módulo 04</h3>
<p>No módulo anterior, você montou a operação. Centro de comando. Squads instaladas em cada área da empresa. Smart-memory persistente. Governance silenciosa garantindo que cada papel é respeitado.</p>
<p>Você tem hoje uma infraestrutura operacional que escala. Concorrentes que ainda usam IA de forma artesanal — abrindo um chat, perdendo contexto — não conseguem o que você consegue.</p>
<p>Mas tem um ponto cego nessa estrutura.</p>

<h3>O problema do cliente final</h3>
<blockquote>
  <p><em>"O cliente final não vê a squad. Não vê a smart-memory. Não vê os agentes trabalhando. O cliente vê o resultado."</em></p>
</blockquote>
<p>Quem contrata sua empresa pra rodar tráfego pago não tá pensando "uau, eles têm um squad de 10 agentes especializados". Tá pensando "esse criativo do anúncio tá bom?". "Essa landing page converte?". "Esse copy de e-mail vende?".</p>
<p>O cliente vê:</p>
<ul>
  <li>O criativo do anúncio</li>
  <li>O post no Instagram</li>
  <li>A landing page</li>
  <li>O e-mail enviado</li>
  <li>O documento entregue</li>
</ul>
<p>E se esses entregáveis não têm identidade visual coerente, profissional, com cara de marca premium — todo o trabalho técnico por trás fica invisível. Pior: cria a impressão errada sobre a qualidade da operação.</p>

<h3>O risco de operação técnica sem identidade visual</h3>
<p>Imagina a cena. Você tem um squad de tráfego pago fenomenal. O analista é cirúrgico, o estrategista é estratégico, o copywriter escreve copy que converte. Mas os criativos saem com:</p>
<ul>
  <li>Tipografia inconsistente entre peças</li>
  <li>Paleta de cores que muda do nada</li>
  <li>Logo aplicado em tamanhos diferentes em cada anúncio</li>
  <li>Estética genérica de "template pronto"</li>
</ul>
<p>O que o cliente conclui? "Esse pessoal não cuida dos detalhes." Quando, na verdade, eles cuidam de tudo. Só que o trabalho deles morre na etapa visual.</p>

<h3>A solução estrutural</h3>
<p>Claude Design preenche essa lacuna. Ele entra na operação como <strong>diretor de arte transversal</strong> — garantindo que tudo que sai das squads tem cara de marca premium, coerente, profissional.</p>
<p>Vou usar uma imagem que ajuda. No M04, você construiu o motor da operação. No M05, você constrói a carroceria. Sem motor, o carro não anda. Sem carroceria, o carro é só um chassis exposto.</p>
<p>Os dois são necessários. E é por isso que esse módulo vem depois do M04, não antes — só faz sentido cuidar do visual depois que a operação técnica está montada.</p>

<h3>A ordem dos fatores</h3>
<div class="callout">
  <p><strong>Princípio</strong></p>
  <ol>
    <li>Operação montada (M04)</li>
    <li>Identidade visual coerente (M05)</li>
    <li>Cliente final vê trabalho premium em escala</li>
    <li>Operação escala sem perder qualidade percebida</li>
  </ol>
</div>
<p>Quando essa ordem é respeitada, a empresa cresce de forma sustentável. Quando ela é invertida ou pulada, alguma parte trava — ou a execução é boa mas o cliente não percebe, ou o visual é bonito mas não tem capacidade de execução.</p>
```

---

## sort_order=3 | aula-3-logica-de-projetos
lesson_id: 10aaf3cd-2033-43f1-aaaa-6ca184159c2a
content_format: HTML
PDF: Aula 03 — A lógica de projetos: base + adaptações (pp. 10–11)

```html
<h2>A lógica de projetos: base + adaptações</h2>
<p>Não se constrói cinco identidades separadas. Constrói-se uma base — o Design System — e quatro adaptações pra contextos diferentes. Esta lógica é o que garante coerência. Sem ela, cada peça parece de uma marca diferente.</p>

<h3>A imagem da árvore</h3>
<p>A lógica é simples e poderosa: <strong>uma base, várias adaptações</strong>.</p>
<p>Pensa numa árvore. Tem um tronco firme — daí saem os galhos. Cada galho cresce na sua direção, mas todos vêm da mesma origem. Têm o mesmo DNA, a mesma genética.</p>
<p>Identidade visual de empresa funciona igual:</p>
<ul>
  <li><strong>O tronco</strong> é o Design System. A base. Cores, tipografia, componentes-núcleo, espaçamentos, iconografia. Tudo que define o DNA da marca.</li>
  <li><strong>Os galhos</strong> são os KVs — Key Visuals. Adaptações desse DNA pra contextos específicos: site, social media, tráfego pago, app.</li>
</ul>

<h3>Por que essa lógica importa</h3>
<p>Sem essa lógica, cada peça parece feita por uma agência diferente. O site é num estilo, o Instagram é em outro, os anúncios são em um terceiro, o app é completamente diferente. Caos visual.</p>
<p>Com essa lógica, todas as peças têm cara de família. Mesmo DNA, mesma genética. Variações pra cada contexto, mas reconhecíveis como sendo da mesma marca.</p>
<blockquote>
  <p><em>"Um Design System bem feito é o que separa marca de logo bonito."</em></p>
</blockquote>

<h3>Os 5 projetos do módulo</h3>
<p>Você vai construir cinco coisas nesse módulo. Na ordem certa:</p>
<table>
  <thead>
    <tr><th>Projeto</th><th>Função</th><th>Valor de mercado</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Design System</strong></td><td>A base — DNA da marca</td><td>R$ 20–50k</td></tr>
    <tr><td><strong>KV Site</strong></td><td>Adaptação pra web</td><td>R$ 30–80k</td></tr>
    <tr><td><strong>KV Social</strong></td><td>Adaptação pra redes sociais</td><td>R$ 8–20k/ciclo</td></tr>
    <tr><td><strong>KV Tráfego</strong></td><td>Adaptação pra ads pagas</td><td>R$ 3–10k/mês</td></tr>
    <tr><td><strong>KV Dev/App</strong></td><td>Adaptação pra mobile/produto</td><td>R$ 30–80k</td></tr>
  </tbody>
</table>

<h3>A ordem importa</h3>
<p>Você sempre começa pelo Design System. Sem base, os KVs não têm de onde herdar. Você ia ficar redefinindo cores e fontes em cada projeto novo — e elas iam ficar diferentes a cada vez.</p>
<p>Depois do Design System pronto, os KVs podem ser feitos em qualquer ordem, conforme a prioridade da empresa. Mas tipicamente:</p>
<ol>
  <li>Site, se você tá vendendo serviço/produto online — é o cartão de visita</li>
  <li>Social, se a aquisição vem de redes sociais</li>
  <li>Tráfego, se você roda ads pagas</li>
  <li>App, se você tem produto digital</li>
</ol>
<p>Mas é prioridade da empresa, não regra. O importante é a base vir primeiro.</p>
<div class="callout">
  <p><strong>Visualização mental</strong></p>
  <p>Pensa no Claude Design como o estúdio. Cada projeto que você cria nele é uma "pasta" — uma instalação isolada de uma identidade. O primeiro projeto é o Design System. Os outros quatro referenciam o primeiro, herdando o DNA.</p>
</div>
```

---

## sort_order=4 | aula-4-design-system
lesson_id: 4082dd83-eaa2-49ad-b33d-ebffc6f98313
content_format: HTML
PDF: Aulas 04, 05 e 06 — Como começar (pp. 12–14) + Como ajustar (pp. 15–17) + Design System: a base (pp. 18–21)

```html
<h2>Design System: a base</h2>
<p>A aula mais importante do módulo. Aqui você cria a base que todos os KVs vão herdar. Diferente dos outros, usa tela nativa de setup do Claude Design — não é prompt corrido. Cinco campos, dois cenários: marca consolidada ou sem identidade ainda.</p>

<h3>Como começar um projeto no Claude Design</h3>
<p>Quando você abre o Claude Design pra criar um projeto novo, ele te oferece quatro caminhos. Cada um serve pra uma situação diferente.</p>

<h4>Modo 1: descrição em texto</h4>
<p>Você descreve verbalmente o que quer. "Quero uma landing page pra vender mentoria, com hero, depoimentos, oferta e FAQ".</p>
<ul>
  <li><strong>Quando usar:</strong> Você está começando do zero, sem referência visual; quer ver o que o Claude Design propõe sem te enviesar</li>
  <li><strong>Quando não usar:</strong> Você já tem mood visual em mente; você precisa que o resultado herde de algo existente</li>
</ul>

<h4>Modo 2: upload de imagens</h4>
<p>Você sobe imagens de referência — sites que admira, designs salvos no Pinterest, screenshots de marcas que gosta. O Claude Design lê essas referências e usa como inspiração visual.</p>
<ul>
  <li><strong>Quando usar:</strong> Você tem mood visual claro mas difícil de descrever em texto; quer combinar elementos de várias referências</li>
  <li><strong>Cuidado:</strong> Não suba referências que infringem direito autoral evidente. Use referências como inspiração, não como template a copiar.</li>
</ul>

<h4>Modo 3: web capture</h4>
<p>Você cola a URL de um site, e o Claude Design captura. Pode capturar o site da concorrência pra fazer evolução, ou capturar o site atual da empresa pra usar como ponto de partida.</p>
<ul>
  <li><strong>Quando usar:</strong> Refazer site existente; estudar concorrência; brand audit visual</li>
</ul>

<h4>Modo 4: codebase</h4>
<p>Você aponta pra uma pasta com código de site ou app existente. O Claude Design analisa o código e extrai o design system implícito — cores, tipografia, componentes, padrões.</p>
<ul>
  <li><strong>Quando usar:</strong> Empresa que já tem produto digital construído; você quer extrair o Design System do que já existe pra documentar</li>
</ul>

<h3>Como ajustar e refinar o resultado</h3>
<p>Quando o Claude Design entrega o primeiro draft, ele dificilmente vai estar 100% pronto. Refino é parte do processo. Existem cinco formas de refinar:</p>

<h4>Modo 1: chat amplo</h4>
<p>Conversa aberta no chat lateral. "Quero que a tipografia tenha mais personalidade." "A paleta tá muito sóbria, deixa um pouco mais vibrante."</p>
<ul>
  <li><strong>Quando usar:</strong> Ajuste de direção geral — mood, personalidade, intenção; você não sabe exatamente o que mudar, mas sabe que algo tá off</li>
</ul>

<h4>Modo 2: comentário inline</h4>
<p>Você clica num elemento específico do canvas e adiciona um comentário ali. "Esse botão tá grande demais." "Esse texto precisa de mais peso."</p>
<ul>
  <li><strong>Quando usar:</strong> Ajuste cirúrgico, num elemento específico; o resto da peça tá ok, só esse ponto tá errado</li>
</ul>

<h4>Modo 3: sliders</h4>
<p>Em algumas peças, o Claude Design oferece sliders pra ajustar parâmetros — espaçamento, peso da fonte, intensidade de cor, raio de borda.</p>
<ul>
  <li><strong>Quando usar:</strong> Ajuste de magnitude — "mais", "menos", "maior", "menor"; calibração visual fina</li>
</ul>

<h4>Modo 4: edição direta</h4>
<p>Você edita o texto ou troca a cor diretamente no canvas, como se estivesse no Figma. O resultado é instantâneo.</p>
<ul>
  <li><strong>Quando usar:</strong> Corrigir copy; trocar cor por uma específica que você tem em mente; mudar texto exato de um botão ou label</li>
</ul>

<h4>Modo 5: "aplica em tudo"</h4>
<p>Você faz um ajuste em uma peça e fala "aplica essa mudança em todas as peças similares". O Claude Design propaga o ajuste pras outras peças do projeto.</p>
<ul>
  <li><strong>Quando usar:</strong> Você acertou uma peça, quer que as outras sigam o mesmo padrão; ajuste sistêmico — mudança que afeta DNA do projeto</li>
</ul>

<div class="callout">
  <p><strong>A ordem importa</strong></p>
  <p>Sempre comece pelo <strong>chat amplo</strong> pra alinhar direção. Depois use <strong>inline + sliders + edição direta</strong> pra refinar cirurgicamente. Termine com <strong>"aplica em tudo"</strong> pra propagar acertos. Quem inverte essa ordem fica preso ajustando peças individuais sem nunca acertar a direção. Direção primeiro, detalhes depois.</p>
</div>

<h3>Por que o Design System é diferente das outras aulas</h3>
<p>Todas as outras aulas — KV Site, Social, Tráfego, App — usam <strong>prompt completo no chat</strong>. Você cola, o Claude Design pergunta, você responde, ele gera.</p>
<p>O Design System é diferente. Ele usa a <strong>tela nativa de setup do Claude Design</strong>. Quando você cria um projeto novo do tipo Design System, aparece uma tela com 5 campos. Você preenche, clica em "Set up", e ele gera o sistema base.</p>
<p>Por que é assim? Porque o Design System é a fonte de verdade. Ele precisa absorver código, Figma, assets, notas estratégicas — coisas que não caberiam num prompt linear.</p>

<h3>Os 5 campos da tela</h3>
<h4>Campo 1 — Company Name and Blurb</h4>
<p>Nome da empresa + descrição densa em 3–5 linhas. Cobrindo: quem é a empresa, o que ela faz, para quem (público-alvo), tom da comunicação.</p>
<pre><code>[Nome da Empresa] — [Posição/cargo se relevante]. [O que a empresa faz em uma frase clara, com diferencial]. Audiência principal: [perfil dos clientes ideais — demografia + comportamento + dor]. Tom: [direto/casual/formal/técnico/acolhedor — escolha 2–3 adjetivos]. Estética: [moderna/clássica/disruptiva/elegante/etc — 2–3 adjetivos visuais].</code></pre>

<h4>Campo 2 — Link Code on GitHub</h4>
<p>Cole link de repositório se sua empresa tem código com identidade visual já implementada. Claude Design vai ler e extrair o design system existente. Se não tem código no GitHub, deixe em branco.</p>

<h4>Campo 3 — Link Code from Your Computer</h4>
<p>Aponte para uma pasta local com o código do site/app existente. Claude Design extrai tokens visuais do código. Se não tem código local, deixe em branco.</p>

<h4>Campo 4 — Upload a .fig File</h4>
<p>Se você já tem arquivo Figma da marca com componentes definidos, suba aqui. É parseado localmente no navegador. Se não tem Figma, deixe em branco.</p>

<h4>Campo 5 — Add Fonts, Logos and Assets</h4>
<p>Suba todos os assets de marca que tiver: logo em SVG, variações de logo, fontes da marca, fotos profissionais, ícones específicos.</p>
<div class="callout">
  <p><strong>Importante:</strong> Se você não tem fonte/logo definidos ainda, deixe em branco. Claude Design vai propor uma direção com base no blurb e nas notas. Você ajusta depois no chat.</p>
</div>

<h3>O Campo 6 — Any other notes (o crítico)</h3>
<p>Esse campo merece tratamento separado porque é onde a coisa muda dependendo de onde você está na jornada de marca.</p>

<h4>Cenário 1: você JÁ TEM identidade visual consolidada</h4>
<p>Se a marca da empresa já existe — tem cores definidas, fontes escolhidas, logo aplicado em vários lugares — você escreve tudo aqui, com especificidade. Cores em hex, fontes pelo nome exato, estilo bem descrito.</p>
<pre><code>Paleta principal: [cor primária com hex] de fundo, [cor secundária com hex] pra texto, [cor de destaque com hex] como única cor de destaque — uso muito pontual. Tipografia: [fonte de display] pra display, [fonte de corpo] pra corpo, [fonte mono se aplicável]. Estética: [hairline borders, sombras sutis, espaço em branco abundante, etc]. Referências visuais que admiro: [2–3 marcas]. NÃO usar: [listar o que evitar]. Tom de voz: [adjetivos].</code></pre>

<h4>Cenário 2: você AINDA NÃO TEM identidade consolidada</h4>
<p>Esse é o cenário da maioria das pessoas que tá começando. A empresa existe mas a marca não tem cores definidas, não tem fontes escolhidas. Aqui é onde você usa uma estratégia diferente: <strong>pede pro Claude Design perguntar antes de gerar</strong>.</p>
<pre><code>Mood: minimalista, sofisticado, contemporâneo. Personalidade: confiável, direto, sem fluff. Referências visuais que admiro: Linear, Stripe, Notion — densidade técnica com execução visual polida. EVITAR: cores saturadas demais, gradientes elaborados, ilustrações infantis, sombras pesadas, qualquer coisa que pareça template genérico. Tom de voz da marca: profissional mas próximo, técnico mas acessível.

⚠ IMPORTANTE: PEÇO QUE O CLAUDE DESIGN ME PERGUNTE sobre paleta de cores e tipografia ANTES de gerar qualquer coisa. Quero validar essas escolhas com base nas referências e no mood, não receber surpresa. Quando você for propor paleta e fonte, me apresenta 2–3 opções pra eu escolher.</code></pre>
<blockquote>
  <p><em>"Em vez de chutar uma cor que pode não combinar com a marca toda, faça uma decisão informada baseada nas referências."</em></p>
</blockquote>

<h3>Submetendo e validando</h3>
<p>Depois de preencher os cinco campos, você clica em "Set up". Claude Design vai processar tudo — ler o código se você apontou, parsear o Figma se subiu, absorver os assets, e usar as notas como diretriz.</p>
<p>Em alguns minutos, ele entrega o Design System completo: paleta documentada, tipografia escalada, componentes funcionais, tela de showcase. Tudo navegável, tudo em HTML interativo.</p>

<h3>Critérios de qualidade</h3>
<p>Quando receber o Design System, valide com esses critérios antes de aprovar:</p>
<ul>
  <li>A marca tem personalidade visível (não parece template genérico)</li>
  <li>Componentes funcionam visualmente juntos (mesma família)</li>
  <li>Consistência absoluta em peso, ritmo e proporção</li>
  <li>Suporta dark mode (mesmo que você só use light)</li>
  <li>Acessibilidade WCAG AA mínima</li>
  <li>Inclui paleta documentada, tipografia escalada, componentes-núcleo, sistema de espaçamento, iconografia básica</li>
</ul>
<p>Se algum critério falhar, peça ajuste específico no chat lateral. Use os 5 modos de refino descritos acima.</p>

<h3>Onde salvar</h3>
<p>Quando o Design System estiver aprovado, salve ele no Claude Design — fica disponível dentro do seu workspace. E também vale exportar pra pasta do Centro de Treinamento, pra que as squads possam consumir depois.</p>
<p>Mantenha uma pasta <code>~/empresa/design-system/</code> com o export desse projeto. Qualquer KV que você criar depois aponta pra essa pasta.</p>

<h3>Valor de mercado dessa entrega</h3>
<p>Você acabou de fazer, em uns 20 minutos, um Design System que uma agência cobraria entre <strong>R$20k e R$50k</strong>. E que demoraria 3 a 6 semanas pra ficar pronto, com várias rodadas de aprovação.</p>
```

---

## sort_order=5 | aula-5-kv-site
lesson_id: 704167d3-3732-42de-b2a6-fe6182bd8b3c
content_format: HTML
PDF: Aula 07 — KV Site (pp. 22–24)

```html
<h2>KV Site (prompt completo)</h2>
<p>A primeira adaptação do Design System. Site é o cartão de visita digital — onde 90% dos potenciais clientes vão chegar primeiro. Prompt completo pra colar no Claude Design, com perguntas embutidas pra garantir herança correta do DS.</p>

<h3>Posicionamento da aula</h3>
<p>O site é a primeira propriedade digital que você adapta da base. Por que? Porque é onde a maioria das pessoas chega primeiro — busca orgânica, link de e-mail, link no Instagram, todos levam pro site. Se ele não tá no padrão da marca, o resto importa menos.</p>
<p>Valor de mercado dessa entrega: <strong>R$30–80k</strong>, dependendo do tipo de site (institucional simples até landing page de conversão).</p>

<h3>Antes de colar o prompt</h3>
<p>O prompt abaixo cola no chat do Claude Design <strong>num projeto novo</strong> (não Design System). Antes de colar, certifique-se que:</p>
<ol>
  <li>O Design System base já existe no seu workspace e está aprovado</li>
  <li>Você criou um projeto novo no Claude Design (tipo: site/web)</li>
  <li>Na primeira mensagem desse projeto, você referencia o Design System base</li>
</ol>

<h3>O prompt completo (cola direto)</h3>
<pre><code>Você é o diretor de arte sênior responsável pelo KV de Site da marca.
Você vai construir esse KV HERDANDO 100% do Design System que já existe
no meu workspace.

ANTES DE COMEÇAR A GERAR

Faça as perguntas abaixo, uma por vez, esperando minha resposta antes
da próxima. Se você considerar que falta alguma informação crítica, me
pergunte. Não invente, não preencha lacunas com suposição.

1. Confirme o Design System que vamos usar como base. Cite o nome dele
   e me confirme que você consegue acessar todos os tokens (cores,
   tipografia, componentes, espaçamentos).

2. Sobre a paleta de cores: você vai usar exatamente as cores do Design
   System base, ou existe alguma adaptação específica pra web (ex:
   variações de hover, estados de foco)? Confirme as cores antes de
   gerar qualquer tela.

3. Sobre tipografia: você vai usar exatamente as fontes do Design
   System base? Existe alguma escala adicional específica pra web
   (ex: tamanhos pra hero, tamanhos pra blog post)?

4. Qual o tipo de site que vamos construir? Institucional, landing page,
   e-commerce, SaaS, portfólio profissional, blog, ou outro?

5. Quais páginas o site precisa ter? Liste todas (ex: Home, Sobre,
   Serviços, Cases, Blog, Contato).

6. Qual o objetivo principal de conversão do site? Captura de lead,
   venda direta, agendamento de reunião, download de material, inscrição
   em curso, ou outro?

7. O site precisa de alguma feature funcional além das páginas? Área
   logada, sistema de blog, e-commerce, integração com plataforma de
   curso ou agendamento?

8. Cite 2 ou 3 sites (de qualquer setor) que você gosta da execução
   visual e quer usar como referência de qualidade técnica.

9. Qual o público que vai navegar nesse site, e em que dispositivo
   principal? Mobile-first, desktop-first, ou paridade total?

⚠ IMPORTANTE: NÃO comece a gerar nada antes de ter todas as respostas.
Se eu tentar te apressar, pergunte tudo primeiro.

CONTEXTO E DIRETRIZES

Depois de coletar as respostas, construa o KV de Site seguindo:

HERANÇA DO DESIGN SYSTEM
- 100% das cores, tipografia, espaçamentos e componentes-núcleo vêm
  do Design System confirmado nas perguntas iniciais.
- Você adiciona apenas o que é específico de web.
- Se precisar de variação que não existe no DS, sinaliza como sugestão
  de adição, não cria sem avisar.

PRINCÍPIOS DE WEB
- Mobile-first sempre. Desenha pro mobile primeiro, adapta pro desktop.
- Performance é estética. Animações sutis (200–300ms).
- Hierarquia de hover clara mas não infantil.
- Acessibilidade WCAG AA mínimo.

BREAKPOINTS
- Mobile: 375px
- Tablet: 768px
- Desktop: 1280px
- Wide: 1440px

ENTREGAS
1. Header / Navigation (desktop + mobile)
2. Footer (versão completa)
3. 5 variações de Hero
4. Seções de conteúdo: grid, lista, comparativo, timeline, tabs,
   accordion, carrossel, logos, estatísticas, pricing
5. 5 tipos de CTA
6. Formulários (contato, cadastro, lead capture, multi-step)
7. Cards (blog, produto, case, pessoa)
8. Páginas completas em alta fidelidade (mobile + desktop):
   Home, Sobre, Serviço/Produto, Contato, Blog list, Blog post
9. Estados: hover, focus, loading, empty, error, success
10. Microinterações documentadas

CRITÉRIOS DE QUALIDADE
O output só está aprovado se:
- O site parece premium em qualquer breakpoint
- A navegação é intuitiva e rápida
- A hierarquia visual conduz o olho corretamente
- Os CTAs estão estrategicamente posicionados
- Mobile e desktop parecem feitos pra cada tela

Vamos começar com a primeira pergunta.</code></pre>

<h3>Como usar o output</h3>
<p>Depois do Claude Design entregar, valide com os critérios do prompt. Use os 5 modos de refino da Aula 05 pra ajustar. Quando estiver aprovado, exporte e faça handoff pro <strong>squad Sites</strong> implementar — assunto da Aula 11.</p>
```

---

## sort_order=6 | aula-6-kv-social
lesson_id: 4f30034a-246e-4fb7-b69f-b8354843bc3c
content_format: HTML
PDF: Aula 08 — KV Social (pp. 25–28)

```html
<h2>KV Social (prompt completo)</h2>
<p>Sistema visual pra redes sociais, com regras específicas que site não tem: zona segura de Reels, hierarquia em thumbnail, sistema de variação pra postar 30 dias sem repetir. Prompt completo embaixo.</p>

<h3>Posicionamento da aula</h3>
<p>Social media tem regras visuais próprias. Decisão em 3 segundos, hierarquia visível em thumbnail de 200px, zona segura em Reels, identidade consistente mas com variação suficiente.</p>
<p>Site funciona em "ler com calma". Social funciona em "decidir no scroll". São lógicas diferentes que pedem sistema visual adaptado.</p>
<p>Valor de mercado: <strong>R$8–20k por campanha</strong>.</p>

<h3>O prompt completo (cola direto)</h3>
<pre><code>Você é o diretor de arte responsável pelo Sistema Visual de Social Media
da marca. Vai construir herdando do Design System existente.

ANTES DE COMEÇAR A GERAR

Faça as perguntas abaixo, uma por vez. Se faltar algo crítico, pergunte.

1. Confirme o Design System que vamos usar como base.

2. Sobre cores: você vai usar exatamente a paleta do Design System base,
   ou existe adaptação específica para social media (ex: cores mais
   saturadas pra chamar atenção no feed, ou cores diferentes pra cada
   tipo de conteúdo)?

3. Sobre tipografia: você vai usar as fontes do Design System base?
   Lembre que pra thumbnail de Reels e capa de carrossel, tipografias
   muito finas podem perder legibilidade. Confirme se as fontes
   funcionam em tamanhos grandes ou se precisamos de variação específica.

4. Quais plataformas vamos cobrir? Instagram, TikTok, LinkedIn, YouTube
   Shorts, Twitter/X, outras?

5. Qual o tema central da próxima campanha ou ciclo de conteúdo? Pode
   ser lançamento, posicionamento, evento, ou conteúdo contínuo
   educacional.

6. Qual o tom desse ciclo? Educacional, vendas, engajamento, awareness,
   autoridade, casual/lifestyle?

7. Quem está sendo impactado? Cliente final, leads frios, base atual,
   ou mix?

8. Tem fotografia, imagem de produto ou recurso visual específico que
   vai aparecer com frequência?

9. Qual a frequência de posts esperada? Diário, 3x na semana, semanal?

10. Tem perfis de Instagram ou TikTok que você admira visualmente e
    quer usar como referência de execução?

⚠ IMPORTANTE: NÃO comece a gerar nada antes de ter todas as respostas.

CONTEXTO E DIRETRIZES

HERANÇA DO DESIGN SYSTEM
- Cores, tipografia, espaçamento e componentes vêm do DS confirmado.
- Adapta pra contexto social: legibilidade em thumbnail, mobile-only.

PRINCÍPIOS DE SOCIAL
- Decisão visual em 3 segundos.
- Hierarquia óbvia: olho sabe pra onde ir antes de ler.
- Mobile only.
- Zona segura preservada.
- Identidade consistente, mas com variação suficiente.

ESPECIFICAÇÕES TÉCNICAS

Capa de Reel (9:16, 1080x1920)
- Zona segura: 220px topo, 480px rodapé

Carrossel Instagram (1:1, 1080x1080)
- Até 10 slides
- Slide 1 (capa): gancho visual forte
- Slide final: CTA claro

Carrossel vertical (4:5, 1080x1350)
- Mesma lógica, mais espaço

Story (9:16, 1080x1920)
- Zona segura: 250px topo, 250px rodapé

Post de Feed (1:1, 1080x1080)
LinkedIn Post (horizontal 1200x627 ou square 1200x1200)

ENTREGAS
1. CAPAS DE REELS (3 estilos × 5 variações)
   Estilo 1: Tipográfico
   Estilo 2: Visual (foto + texto)
   Estilo 3: Conceitual (composição gráfica)

2. CARROSSEL INSTAGRAM (3 templates de 8 slides)
   Template Educacional: "Como fazer X em 5 passos"
   Template Lista: "7 erros que você comete em X"
   Template História/Case

3. STORIES (5 templates)
   - Anúncio
   - Conteúdo / dica do dia
   - Bastidor
   - Prova social / depoimento
   - Interativo (sticker de enquete, quiz)

4. SISTEMA DE VARIAÇÃO
   3 níveis de intensidade visual pra cada formato:
   - Versão clara
   - Versão escura
   - Versão fotográfica

5. POSTS DE FEED (2 templates)
   - Oferta/promoção
   - Citação/insight

6. LINKEDIN (2 templates)
   - Autoridade (artigo, opinião)
   - Case/resultado

CRITÉRIOS DE QUALIDADE
O output só está aprovado se:
- Em thumbnail (200x200px), hierarquia visual continua clara
- A marca é reconhecível em 1 segundo
- Os 3 estilos têm cara de "mesma família"
- Variação suficiente pra postar 30 dias sem parecer repetido
- Templates funcionam com copy curto E longo
- Grid do feed cria identidade visual

Vamos começar com a primeira pergunta.</code></pre>

<h3>Como usar o output</h3>
<p>Depois de aprovado, exporte e faça handoff pro <strong>squad Social</strong>. Lembre da aprovação dupla obrigatória do squad Social: estrategista (VERA) aprova formalmente, e você confirma explicitamente, antes de qualquer publicação.</p>
```

---

## sort_order=7 | aula-7-kv-trafego
lesson_id: 3c8b5423-bbc5-4c52-8ff9-5a184a06237c
content_format: HTML
PDF: Aula 09 — KV Tráfego (pp. 29–32)

```html
<h2>KV Tráfego (prompt completo)</h2>
<p>Criativos pra ads pagas. Lógica completamente diferente de site e social: 3 segundos pra parar o scroll, CTA explícito, variantes pra A/B test. Prompt completo com sistema de mensagem, plataformas e nomenclatura.</p>

<h3>Posicionamento da aula</h3>
<p>Tráfego pago tem regras próprias. Ads pagas competem com conteúdo orgânico no feed da pessoa — então tem que parar o scroll em 3 segundos, entregar a mensagem completa na primeira tela, e ter CTA explícito.</p>
<p>Diferente de site (que a pessoa escolheu visitar) e social (que ela já tá no contexto), tráfego pago precisa <strong>roubar atenção</strong>. Isso muda a hierarquia visual, o uso de cor, o peso tipográfico.</p>
<p>Valor de mercado: <strong>R$3–10k/mês recorrente</strong> (criação contínua de variantes).</p>

<h3>O prompt completo (cola direto)</h3>
<pre><code>Você é o diretor de arte responsável pelos criativos de anúncios pagos
da marca. Vai construir herdando do Design System existente.

ANTES DE COMEÇAR A GERAR

Faça as perguntas abaixo, uma por vez. Se faltar algo crítico, pergunte.

1. Confirme o Design System que vamos usar como base.

2. Sobre cores: anúncios pagos têm regras específicas. Cores muito
   saturadas chamam atenção mas podem prejudicar a entrega no Meta
   (algoritmo penaliza visual "anúncio demais"). Você prefere manter
   exatamente a paleta do DS base, ou quer adaptações específicas
   por ângulo de campanha?

3. Sobre tipografia: anúncios precisam de hierarquia mais agressiva
   que site/social. Você vai usar exatamente as fontes do DS, ou quer
   uma fonte secundária com peso mais forte pra headlines de anúncio?

4. Qual o produto, serviço ou oferta sendo anunciado? Me dá detalhes
   suficientes pra eu entender o que está sendo vendido e qual o
   diferencial.

5. Qual o objetivo principal da campanha? Conversão direta, geração
   de lead, alcance/awareness, consideração, ou retargeting?

6. Em quais plataformas os criativos vão rodar? Meta (FB + IG), Google
   (Display, YouTube), TikTok, LinkedIn, Pinterest?

7. Qual o público-alvo? Demografia, comportamento, dor principal, nível
   de consciência (problem-aware, solution-aware, product-aware)?

8. Qual o investimento aproximado por mês? Isso ajuda a calibrar o
   volume de variantes.

9. Tem oferta específica, prova social, garantia ou ângulo de copy
   que precisa estar nos criativos?

10. Tem material de referência? Fotos do produto, screenshots, vídeos
    de uso, depoimentos?

⚠ IMPORTANTE: NÃO comece a gerar nada antes de ter todas as respostas.

CONTEXTO E DIRETRIZES

HERANÇA DO DESIGN SYSTEM
- Cores, tipografia, componentes vêm do DS confirmado.
- Adapta pra contexto de anúncio: hook em 3 segundos, CTA explícito.

PRINCÍPIOS DE TRÁFEGO PAGO
- Primeiros 3 segundos visuais decidem o scroll.
- Primeira tela do anúncio entrega o ângulo completo.
- CTA explícito sempre.
- Texto curto. Cada palavra defende seu lugar.
- Variantes pra A/B test são parte do sistema.
- Cada plataforma tem sua linguagem visual.

ESPECIFICAÇÕES TÉCNICAS

Meta Ads:
- Feed quadrado: 1080x1080
- Feed vertical: 1080x1350
- Stories/Reels: 1080x1920

Google Display:
- Landscape: 1200x628
- Square: 1200x1200
- Half page: 300x600
- Skyscraper: 160x600
- Leaderboard: 728x90
- Mobile banner: 300x250

YouTube:
- Companion banner: 300x60
- Thumbnail vídeo: 1280x720

TikTok Ads:
- In-feed vertical: 1080x1920

LinkedIn Ads:
- Single image: 1200x627
- Carousel: 1080x1080

ENTREGAS
1. SISTEMA DE MENSAGEM (3 ângulos)
   Ângulo A: Dor + Solução
   Ângulo B: Prova Social + Resultado
   Ângulo C: Urgência + Oferta

2. META ADS (3 ângulos × 3 formatos = 9 peças)
3. GOOGLE DISPLAY (6 dimensões × 2 variações = 12 peças)
4. TIKTOK ADS (3 ângulos)
5. LINKEDIN ADS (2 ângulos)
6. SISTEMA DE CTA BUTTONS
   - 3 estilos visuais pra A/B test
   - 5 opções de texto de CTA pra rotacionar

7. SISTEMA DE TIPOGRAFIA DE ANÚNCIO
   - Hierarquia diferente do site/social
   - Headlines maiores e mais agressivas

NOMENCLATURA
Padrão pros arquivos:
[Marca]_[Campanha]_[Plataforma]_[Formato]_[Ângulo]_[Versão]
Ex: MARCA_Curso_Meta_FeedSquare_AnguloA_v1

CRITÉRIOS DE QUALIDADE
O output só está aprovado se:
- Cada criativo cumpre a regra dos 3 segundos
- A hierarquia visual para o scroll
- O CTA é impossível de ignorar
- A marca é reconhecível mas não rouba a cena do anúncio
- Variantes são suficientemente diferentes pra A/B test ter valor
- Cada plataforma tem peça otimizada (não copy-paste)

Vamos começar com a primeira pergunta.</code></pre>

<h3>Como usar o output</h3>
<p>Faça handoff pro <strong>squad Traffic</strong>. O QA do squad Traffic vai validar criativos com checklist específico antes de subir, e o BI vai consolidar métricas entre plataformas pra identificar discrepâncias.</p>
```

---

## sort_order=8 | aula-8-kv-dev
lesson_id: 21cdf781-311e-4269-9c8b-1261e0b4532d
content_format: HTML
PDF: Aula 10 — KV Dev/App (pp. 33–36)

```html
<h2>KV Dev/App (prompt completo)</h2>
<p>Adaptação pra produto digital — app mobile ou SaaS. Mobile-first absoluto, padrões nativos respeitados, dark mode obrigatório, microinterações funcionais. Mais denso porque inclui todos os componentes mobile e estados.</p>

<h3>Posicionamento da aula</h3>
<p>Se a empresa tem produto digital — app mobile, SaaS, plataforma — esse KV é onde o Design System vira sistema de interface funcional.</p>
<p>Diferente dos outros KVs (que produzem peças soltas), o KV Dev/App produz um <strong>design system de produto</strong>. Componentes, estados, microinterações, padrões de navegação. É a base sobre a qual o squad Dev vai construir.</p>
<p>Valor de mercado: <strong>R$30–80k</strong>.</p>

<h3>O prompt completo (cola direto)</h3>
<pre><code>Você é o diretor de arte responsável pelo Design System de Aplicativo
da marca. Vai construir herdando do Design System base existente.

ANTES DE COMEÇAR A GERAR

Faça as perguntas abaixo, uma por vez. Se faltar algo crítico, pergunte.

1. Confirme o Design System base que vamos usar.

2. Sobre cores: em app é fundamental ter as cores em modo claro E modo
   escuro. As cores do Design System base estão definidas pros dois
   modos? Se não, vou precisar propor adaptações pra dark mode antes
   de gerar telas. Confirme.

3. Sobre tipografia: as fontes do DS base têm boa legibilidade em
   tamanhos pequenos (12–14px que aparecem muito em app)? Você quer
   usar as mesmas, ou usar uma fonte secundária pra UI menor?

4. Qual o tipo de app? SaaS, e-commerce, fintech, health, edutech,
   produtividade, social, ou outro?

5. Plataformas: iOS, Android, ou ambas? Vamos seguir padrão de cada
   uma ou unificar visualmente?

6. Cite as 3–5 funcionalidades-chave do app.

7. Qual o tipo de navegação principal? Bottom tab bar (com 4–5 ícones),
   drawer (menu lateral), stack simples?

8. O app vai ter área autenticada (com login)? Vai ter onboarding na
   primeira abertura?

9. Cite 2–3 apps (de qualquer setor) que você admira a execução visual
   e quer usar como referência.

10. Qual o público principal e em que situação ele usa o app? Casa,
    no trabalho, em trânsito, com tempo limitado?

⚠ IMPORTANTE: NÃO comece a gerar nada antes de ter todas as respostas.

CONTEXTO E DIRETRIZES

HERANÇA DO DESIGN SYSTEM
- Cores, tipografia, componentes do DS são a base, confirmados.
- Adapta pra mobile: targets de toque 44x44 mínimo, hierarquia pra
  leitura rápida, navegação acessível com polegar.

PRINCÍPIOS DE APP
- Mobile-first absoluto. Desktop não existe.
- Hierarquia visual pra leitura rápida.
- Dark mode obrigatório.
- Padrões nativos respeitados.
- Microinterações em todo toque.
- Estados de loading não opcional.

COMPONENTES MOBILE
1. Botões: Primário, Secundário, Terciário (ghost), Destrutivo
   - Tamanhos: small (32px), medium (44px), large (56px)
   - Estados: default, disabled, loading
   - Botão flutuante (FAB)

2. Inputs: texto, senha, número, busca, data, picker
   - Estados: default, focus, filled, error, success, disabled
   - Variações: outlined, filled

3. Cards: básico, produto, métrica, notificação

4. Listas: simples, complexo, swipe action

5. Navegação: bottom tab bar, header, tabs horizontais, drawer

6. Modais e Overlays: modal, bottom sheet, action sheet, toast,
   snackbar, alert dialog

7. Loading e Estados: skeleton, spinner, pull to refresh, empty,
   error, success

PADRÕES DE NAVEGAÇÃO

iOS:
- Back button no topo esquerdo
- Tab bar fixa no rodapé
- Modal slide-up
- Swipe back pra voltar

Android:
- Back button do sistema
- Bottom navigation
- Modal full-screen ou bottom sheet
- Back gesture

TELAS PRINCIPAIS (modo claro + modo escuro)
1. Onboarding (3 telas)
2. Login / Signup
3. Home / Dashboard
4. Lista (feed, produtos, mensagens)
5. Tela de detalhe
6. Perfil
7. Configurações
8. Formulário multi-step
9. Estados especiais (empty, error, offline)

MODO CLARO E MODO ESCURO
Toda tela acima, em dark mode:
- Inversão de hierarquia visual
- Contraste mantido
- Cores semânticas adaptadas
- Sombras substituídas por elevation de cor

SISTEMA DE ELEVAÇÃO
5 níveis:
- elevation-0: superfície neutra
- elevation-1: card
- elevation-2: header sticky
- elevation-3: modal
- elevation-4: bottom sheet

ICONOGRAFIA
24 ícones essenciais:
home, busca, perfil, configurações, notificação, mensagem, favorito,
compartilhar, baixar, upload, fechar, menu, voltar, mais, editar,
lixeira, calendário, relógio, localização, câmera, galeria, microfone,
verificado, alerta

CRITÉRIOS DE QUALIDADE
O output só está aprovado se:
- Cada elemento atende aos 44x44px mínimo de toque
- Hierarquia visual permite leitura rápida (3 segundos máx)
- Dark mode é tão bom quanto light mode
- Padrões da plataforma são respeitados
- Microinterações tem propósito (não decorativas)
- Acessibilidade: contraste, tamanhos de fonte, semântica
- Estados de loading e erro estão completos

Vamos começar com a primeira pergunta.</code></pre>

<h3>Como usar o output</h3>
<p>Faça handoff pro <strong>squad Dev</strong>. O UX (Velax) do squad vai consumir os specs de componentes diretamente. O frontend (Lyrak) vai implementar baseado nas telas em alta fidelidade.</p>
```

---

## sort_order=9 | aula-9-handoff-pro-claude-code
lesson_id: da7e8094-4f02-4efb-84ba-26e5f76c950e
content_format: HTML
PDF: Aula 11 — Handoff pro Claude Code (pp. 37–39)

```html
<h2>Handoff pro Claude Code</h2>
<p>A ponte entre design e implementação. O Claude Design gera um bundle, você manda pro Claude Code, e a squad correspondente assume a produção. Este fluxo é o que torna o M05 estrutural, não decorativo.</p>

<h3>O fluxo completo</h3>
<p>Vamos ver o caminho de um projeto, do briefing à entrega ao cliente final, integrando M04 (squads) com M05 (design):</p>
<ol>
  <li><strong>Design System aprovado</strong> no Claude Design (Aula 06)</li>
  <li><strong>KV específico aprovado</strong> (Aulas 07–10, conforme o tipo de projeto)</li>
  <li><strong>Bundle exportado</strong> do Claude Design — pacote com tokens, componentes, telas, código HTML/CSS/JSX</li>
  <li><strong>Squad correspondente</strong> recebe o bundle na pasta operacional</li>
  <li><strong>team-os do squad</strong> orquestra a implementação real</li>
  <li><strong>Entrega final</strong> pro cliente</li>
</ol>

<h3>O bundle exportado</h3>
<p>Quando você clica em "Send to Claude Code" no canvas do Claude Design, ele empacota:</p>
<ul>
  <li>Tokens de design (cores, tipografia, espaçamentos) em formato consumível</li>
  <li>Componentes em código (HTML/CSS ou React, dependendo do projeto)</li>
  <li>Telas em alta fidelidade (mobile + desktop, ou modo claro + escuro)</li>
  <li>Documentação inline (quando usar cada componente, especs técnicas)</li>
  <li>Assets exportados (ícones, logos em SVG)</li>
</ul>
<p>Esse bundle é a fonte de verdade visual. Quem implementa não precisa adivinhar — está tudo lá.</p>

<h3>Para qual squad mandar</h3>
<table>
  <thead>
    <tr><th>KV</th><th>Squad</th><th>Pasta operacional</th></tr>
  </thead>
  <tbody>
    <tr><td>KV Site</td><td>Squad Sites (Luminari)</td><td>sites-clientes/[cliente]/</td></tr>
    <tr><td>KV Social</td><td>Squad Social (Xelvari)</td><td>social-media/</td></tr>
    <tr><td>KV Tráfego</td><td>Squad Traffic (Reptiliana)</td><td>trafego-pago/</td></tr>
    <tr><td>KV Dev/App</td><td>Squad Dev (Arcturiana)</td><td>produtos/[produto]/</td></tr>
  </tbody>
</table>

<h3>O fluxo no squad</h3>
<p>Quando o squad recebe o bundle:</p>
<ol>
  <li>O bundle vai pra uma subpasta da operação — algo tipo <code>design-bundle/</code></li>
  <li>Você entra na pasta da operação, abre o Claude, chama <code>/team-os</code></li>
  <li>O team-os detecta o bundle novo e propõe plano de implementação</li>
  <li>Você confirma o objetivo (ex: "implementar a landing page completa do KV Site")</li>
  <li>O team-os dispara o squad: UX consome specs, executores implementam, hardening fortalece, QA valida, DevOps publica</li>
</ol>
<p>Você não precisa "explicar" o design pro squad. Ele lê do bundle, entende, e executa.</p>

<h3>Por que esse fluxo é diferente</h3>
<blockquote>
  <p><em>"Não é design que vai pra implementação. É bundle que carrega contexto suficiente pra implementação ser conversa, não tradução."</em></p>
</blockquote>
<p>No fluxo tradicional, design e dev são duas linguagens. Designer entrega Figma, dev "traduz" pra código, e nesse processo se perde muita coisa. Cores ficam ligeiramente diferentes. Tipografia muda peso. Espaçamento vira aproximação.</p>
<p>No fluxo Claude Design → Claude Code, o bundle já vem em código. Não tem tradução. Não tem perda. O squad implementa em cima do código que já existe, adaptando pra arquitetura específica do projeto.</p>

<h3>Iteração depois do handoff</h3>
<p>Vai acontecer: durante a implementação, o squad pode descobrir que algum componente precisa de variação que não estava no bundle. Ou o cliente pediu ajuste depois de ver o protótipo. Caminho:</p>
<ol>
  <li>Volte no Claude Design</li>
  <li>Abra o projeto correspondente</li>
  <li>Faça o ajuste usando os 5 modos de refino (Aula 05)</li>
  <li>Exporte novo bundle</li>
  <li>Substitua o anterior na pasta operacional</li>
  <li>Squad re-implementa partes afetadas</li>
</ol>
<p>Versionamento simples: você pode manter <code>design-bundle-v1/</code>, <code>design-bundle-v2/</code> na pasta, e o squad sempre trabalha na versão mais recente.</p>
```

---

## sort_order=10 | aula-10-encerramento
lesson_id: 0b153dd0-7a84-4b82-a355-d46630dd16d7
content_format: HTML
PDF: Aula 12 — Encerramento e próximos passos (pp. 40–42)

```html
<h2>Encerramento e próximos passos</h2>
<p>A conta final: o que você acabou de adquirir. Hábitos pra incorporar, erros pra evitar, e o gancho pro M06. Esta página existe pra você voltar antes de cada projeto novo.</p>

<h3>A conta final</h3>
<p>Vamos fazer a conta do que você acabou de adquirir como capacidade nesse módulo:</p>
<table>
  <thead>
    <tr><th>Entrega</th><th>Valor de mercado</th></tr>
  </thead>
  <tbody>
    <tr><td>Design System</td><td>R$ 20–50k</td></tr>
    <tr><td>KV Site</td><td>R$ 30–80k</td></tr>
    <tr><td>KV Social (por campanha)</td><td>R$ 8–20k</td></tr>
    <tr><td>KV Tráfego (mensal recorrente)</td><td>R$ 3–10k</td></tr>
    <tr><td>KV Dev/App</td><td>R$ 30–80k</td></tr>
    <tr><td><strong>Total potencial</strong></td><td><strong>R$ 80–280k</strong></td></tr>
  </tbody>
</table>
<p>E não é só economia. É <strong>capacidade nova</strong>. Você consegue rodar tudo isso em paralelo, em uma manhã, mantendo coerência absoluta entre as peças. Isso era simplesmente impossível antes — nenhuma agência consegue entregar tudo em uma manhã, nem com time grande.</p>

<h3>Os 3 hábitos pra incorporar</h3>
<h4>Hábito 1: Design System primeiro, sempre</h4>
<p>Não importa o quão urgente seja a peça que você precisa. Se o Design System ainda não existe, comece por ele. Vinte minutos investidos nessa base economizam dezenas de horas de retrabalho depois.</p>

<h4>Hábito 2: deixe o Claude Design perguntar</h4>
<p>Quando preencher o Campo 5 (Any other notes) no Design System, ou quando colar prompts dos KVs, lembre que o Claude Design vai perguntar antes de gerar. <strong>Não force respostas que você não tem</strong>. Se não sabe a cor exata, peça opções. Se não sabe a fonte, peça referências. Decisão informada é melhor que decisão rápida.</p>

<h4>Hábito 3: handoff via bundle, não via screenshot</h4>
<p>Quando o KV estiver pronto, exporte o bundle inteiro e mande pro squad. Não tire screenshots pra mostrar. Não descreva por texto. O bundle carrega tudo o que o squad precisa — código, tokens, especs, telas. Confie nessa estrutura.</p>

<h3>Os 3 erros comuns</h3>
<ul>
  <li>Começar pelos KVs sem ter Design System aprovado. (Resultado: cada KV vira "marca diferente".)</li>
  <li>Preencher o Campo 5 com cores e fontes inventadas quando você não tem identidade definida. (Resultado: marca construída em base fraca.)</li>
  <li>Fazer handoff por screenshot/Figma export quando o bundle existe. (Resultado: perda de fidelidade na implementação.)</li>
</ul>

<h3>Gancho pro Módulo 06</h3>
<p>Agora você tem operação (M04) e identidade visual (M05). A próxima pergunta é: como tudo isso se materializa em sites reais, que rodam, que convertem, que estão no ar?</p>
<p>No <strong>M06: Squad Sites</strong>, vamos mergulhar no squad Sites (Luminari) — o squad especialista em websites e landing pages. Você vai aprender como ele consome o bundle do KV Site, implementa em código real, garante performance e SEO, e publica.</p>
<p>Cada um dos próximos módulos (M06, M07, M08) vai ser deep-dive em um squad específico:</p>
<ul>
  <li>M06 — Squad Sites (Luminari): web e landing pages</li>
  <li>M07 — Squad Social (Xelvari): redes sociais e conteúdo</li>
  <li>M08 — Squad Dev (Arcturiana): produtos digitais e SaaS</li>
</ul>
<p>Mas pra esses módulos funcionarem, o M05 precisa estar dominado. Sem KV pronto, não tem o que implementar. Sem Design System sólido, não tem base que se mantém em escala.</p>
<p>Pratique. Faça um Design System de verdade — da sua empresa, de um cliente, de um projeto pessoal. Faça um KV completo de uma das categorias. Veja o sistema responder à conversa. Quando voltar pro próximo módulo, traga perguntas reais.</p>
```
