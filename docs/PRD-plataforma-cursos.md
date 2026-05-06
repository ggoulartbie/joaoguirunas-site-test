# PRD — Plataforma de Cursos com Turmas como Unidade Central

> Plataforma multi-curso onde a **turma (cohort) é a unidade central de acesso e de venda**. Construída sobre Next.js 15 + Supabase, com área administrativa completa, área do aluno, fórum, pagamentos, recompra com extensão de prazo e extensão cruzada entre turmas.

**Autor:** João Guirunas
**Versão:** 3.0 (final)
**Data:** 5 de maio de 2026

---

## Convenção de idiomas

- **Banco de dados (tabelas, colunas, enums, funções SQL, índices):** inglês, snake_case
- **Código TypeScript (variáveis, tipos, funções):** inglês, camelCase
- **UI, copy, mensagens de erro pro usuário, conteúdo das aulas:** português
- **Comentários de código e ADRs:** português
- **Nomes de slugs no produto (ex.: `/turmas`, `/meus-cursos`):** português

A camada de tradução acontece nas borders: queries retornam `class_members`, frontend exibe "Alunos da turma".

---

## 1. Filosofia da plataforma

### 1.1 Decisão arquitetural central

**A turma (cohort) é a unidade central da plataforma.** Não existe "nível de acesso", não existe "produto que dá acesso a curso". Existe:

- **Course** = catálogo puro de conteúdo (módulos e aulas). Sobe uma vez, é reutilizável.
- **Cohort** (turma) = unidade comercial + unidade de acesso. Define quais cursos/módulos libera, preço, cupons, vagas, datas, alunos, encontros ao vivo.
- **User** (aluno) = pessoa em uma ou mais turmas ativas. Vê a união de tudo que suas turmas liberam.

> **Sobre a tradução cohort/class:** uso `cohort` em todo o banco. Em inglês, `class` é palavra reservada em várias linguagens e gera atrito. `cohort` é o termo padrão da indústria de educação online (Maven, Reforge, Section, etc.) e deixa o código mais limpo.

### 1.2 Por que esse modelo

- Mesma aula em várias turmas (relação N:N), sem duplicar
- Empresa compra pacote pra 50 funcionários → cria cohort "Empresa X" com cursos selecionados
- Mentoria fechada → cohort privada (não vendável publicamente), admin matricula
- Curso online evergreen → cohort vendável com página pública e Stripe Price gerado dinamicamente
- Aluno migra de online pra mentoria → adiciona à cohort da mentoria, sem refazer matrícula
- Recompra estende prazo na mesma cohort (preço de extensão diferente do de entrada)
- Compra de uma cohort pode estender prazo em outra (extensão cruzada — ex.: mentorado paga online e ganha mais 180 dias na mentoria)

---

## 2. Visão e objetivos

### 2.1 Problema

Hoje vendo uma mentoria high-ticket (R$ 8.700, presencial + online) e quero também vender o conteúdo gravado standalone (R$ 499,99 / 6 meses), sem bônus, sem suporte, sem encontros ao vivo. Preciso de plataforma própria que:

1. Hospede múltiplos cursos como catálogo reutilizável
2. Permita criar quantas cohorts quiser combinando cursos e módulos específicos
3. Cada cohort com configuração comercial própria (preço de entrada, preço de extensão, cupons, parcelamento, vendável ou privada)
4. Tenha área administrativa completa pra eu operar sozinho
5. Dê controle total da experiência e da marca (sem Hotmart/Kiwify)
6. Permita recompra na mesma cohort pra estender acesso
7. Permita compra de uma cohort estender prazo em outra (extensão cruzada)
8. Suporte renovação automática opcional (aluno autoriza)

### 2.2 Não-objetivos no MVP

- Assinatura recorrente tradicional (decisão final: pagamento único; recompra estende prazo; renovação automática é opt-in via Stripe Subscription Schedule)
- App mobile nativo (web responsivo basta)
- Live streaming nativo (encontros via Meet/Zoom externo, plataforma só guarda links)
- Editor de vídeo embutido
- Emissão automática de NF (manual via contador)

### 2.3 Métricas de sucesso

- Tempo do checkout até primeiro acesso ao conteúdo: **< 2 minutos**
- Uptime: **> 99,5%**
- Tempo de resposta médio das páginas: **< 800ms**
- Zero vazamento de URL de vídeo a usuário sem matrícula ativa
- Taxa de recompra/extensão dentro de 30 dias após expiração: acompanhar e otimizar

---

## 3. Personas

### 3.1 Aluno (`role = 'STUDENT'`)

Pessoa com uma ou mais matrículas ativas. Vê união do conteúdo das turmas onde está ativo. Pode:
- Assistir vídeos das aulas liberadas
- Ler conteúdo MDX/HTML/Markdown da aula
- Baixar materiais (PDF, ZIP, imagens)
- Comentar nas aulas
- Participar do fórum geral
- Ver conteúdo bloqueado com cadeado e CTA pra comprar a turma que libera
- Recomprar a mesma turma pra estender prazo (preço de extensão)
- Ativar/desativar renovação automática

### 3.2 Admin (`role = 'ADMIN'`)

Operação completa. Cria cursos, módulos, aulas, cohorts, cupons, alunos. Modera fórum. Vê métricas. Gerencia pagamentos.

### 3.3 Mentor / Suporte (`role = 'MENTOR'` / `'SUPPORT'`)

Roles auxiliares com dashboard limitado. Podem moderar fórum, responder comentários com badge especial, ver progresso dos alunos. Não criam/deletam cursos nem dão refund.

---

## 4. Stack técnica

### 4.1 Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | **Next.js 15** App Router + TypeScript |
| Estilo | **Tailwind CSS** + **shadcn/ui** |
| Banco + Auth + Storage | **Supabase** (Postgres + Auth + Storage) |
| Cliente DB | **Supabase JS client** (sem ORM externo) |
| Validação | **Zod** |
| Formulários | **React Hook Form** |
| Email | **Resend** + **React Email** |
| Pagamento | **Stripe Checkout** (pagamento único + cobrança programada opcional) |
| Vídeo | **Vimeo** (plano Standard com domain-locking) — abstraído via adapter |
| Storage de materiais | **Supabase Storage** (buckets com policies) |
| Editor MDX | **next-mdx-remote** + **Shiki** (syntax highlighting) |
| Editor WYSIWYG | **TipTap** (com extensões de code block, imagem, link) |
| HTML puro | **DOMPurify** (sanitização server-side) |
| PDF (certificados) | **@react-pdf/renderer** |
| Cron | **Vercel Cron** + **Supabase Edge Functions** |
| Hospedagem | **Vercel** |
| Observabilidade | **Sentry** + **Vercel Analytics** |

### 4.2 Supabase — projeto provisionado

- **Project URL:** `https://mksmmpfyqowuzjcchhkl.supabase.co`
- **Project Ref:** `mksmmpfyqowuzjcchhkl`
- **CLI:** já configurada localmente
- **Estado inicial:** projeto vazio, sem migrations aplicadas

### 4.3 Variáveis de ambiente (`.env.local`)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://mksmmpfyqowuzjcchhkl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<painel Supabase → Settings → API → anon public>
SUPABASE_SERVICE_ROLE_KEY=<painel Supabase → Settings → API → service_role; APENAS server-side, NUNCA cliente>

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Vimeo
VIMEO_ACCESS_TOKEN=
VIMEO_DOMAIN_WHITELIST=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Crítico de segurança:** a `SUPABASE_SERVICE_ROLE_KEY` ignora RLS. Só usar em Route Handlers, Server Actions e webhooks. Nunca importar em Client Components. Nunca commitar `.env.local`.

### 4.4 Comandos Supabase iniciais (Fase 1)

```bash
# Vincular projeto local ao remoto
supabase link --project-ref mksmmpfyqowuzjcchhkl

# Confirmar conexão
supabase status

# Criar migration inicial
supabase migration new initial_schema

# Editar o SQL da migration (ver Seção 5)

# Aplicar no remoto
supabase db push

# Após cada alteração, validar diff
supabase db diff
```

### 4.5 Buckets de Storage (criar no painel)

- `avatars` (público com policies)
- `materials` (privado, signed URLs com 5min de expiração)
- `certificates` (privado, signed URLs com 1h)
- `covers` (público) — capas de cursos e cohorts

---

## 5. Modelagem de dados

### 5.1 Princípios

- IDs `uuid` via `gen_random_uuid()`
- Timestamps `created_at` e `updated_at` em todas as tabelas (trigger automático)
- **RLS habilitado em todas as tabelas** com políticas explícitas
- Soft delete (`deleted_at`) em conteúdo arquivável
- Snake_case nas colunas; camelCase no TypeScript
- Foreign keys com `ON DELETE` definido
- Função `has_access(user_id, lesson_id)` é o coração da autorização
- **Tudo em inglês**: tabelas, colunas, enums, funções, índices

### 5.2 Tabelas

#### Identidade

**`profiles`** (espelho de `auth.users`)
```sql
id uuid PK = auth.users.id
name text not null
avatar_url text
bio text
role text not null check (role in ('STUDENT','MENTOR','SUPPORT','ADMIN')) default 'STUDENT'
stripe_customer_id text                 -- preenchido na primeira compra
created_at timestamptz default now()
updated_at timestamptz default now()
```

#### Catálogo (conteúdo puro, sem regra de acesso)

**`courses`**
```sql
id uuid PK
slug text unique not null
title text not null
description text
cover_image_url text
sort_order int default 0
published boolean default false
created_at, updated_at, deleted_at
```

**`modules`**
```sql
id uuid PK
course_id uuid FK → courses(id) ON DELETE CASCADE
slug text not null
title text not null
description text
sort_order int not null
created_at, updated_at, deleted_at

unique (course_id, slug)
```

**`lessons`**
```sql
id uuid PK
module_id uuid FK → modules(id) ON DELETE CASCADE
slug text not null
title text not null
description text
sort_order int not null
kind text not null check (kind in ('VIDEO','LIVE','IN_PERSON','CODE','READING'))
video_provider text check (video_provider in ('VIMEO','YOUTUBE','CLOUDFLARE_STREAM'))
video_id text                           -- ID do vídeo no provedor
duration_seconds int

-- Conteúdo da aula (admin escolhe formato)
content_format text check (content_format in ('MDX','HTML','MARKDOWN'))
content text                            -- corpo da aula no formato escolhido

created_at, updated_at, deleted_at

unique (module_id, slug)
```

**`materials`**
```sql
id uuid PK
lesson_id uuid FK → lessons(id) ON DELETE CASCADE
title text not null
kind text not null check (kind in ('PDF','ZIP','IMAGE','LINK','OTHER'))
storage_path text                       -- path no Supabase Storage
external_url text                       -- pra kind = LINK
size_bytes bigint
sort_order int default 0
created_at timestamptz default now()
```

> Materiais ficam vinculados à aula, herdam acesso via `has_access()`.

#### Cohorts (unidade central)

**`cohorts`**
```sql
id uuid PK
slug text unique not null
name text not null                      -- "Mentoria Maio 2026", "Online Padrão"
description text
cover_image_url text

-- Status e datas
status text not null check (status in ('DRAFT','OPEN','IN_PROGRESS','CLOSED','ARCHIVED'))
start_date date
end_date date

-- Vagas
total_seats int                         -- nullable = ilimitado
filled_seats int default 0

-- Acesso
access_duration_days int                -- nullable = vitalício
group_url text                          -- WhatsApp/Discord
has_live_sessions boolean default false
has_support boolean default false

-- Comercial
is_purchasable boolean default false    -- se true, gera Stripe Price
has_public_page boolean default false   -- se true, /turmas/[slug] vira LP
entry_price_cents int                   -- preço pra novo aluno
extension_price_cents int               -- preço pra aluno que já comprou
max_installments_entry int default 1
max_installments_extension int default 1
extension_duration_days int             -- dias adicionados em cada extensão
allows_auto_renewal boolean default false

-- Stripe (preenchidos quando is_purchasable = true)
stripe_price_entry_id text
stripe_price_extension_id text

created_at, updated_at
```

**`cohort_courses`** — quais cursos e módulos a cohort libera
```sql
cohort_id uuid FK → cohorts(id) ON DELETE CASCADE
course_id uuid FK → courses(id) ON DELETE CASCADE
included_module_ids uuid[]              -- vazio = todos os módulos do curso
sort_order int default 0
PK (cohort_id, course_id)
```

**`cohort_cross_extensions`** — comprar cohort A estende cohort B
```sql
id uuid PK
source_cohort_id uuid FK → cohorts(id) ON DELETE CASCADE
target_cohort_id uuid FK → cohorts(id) ON DELETE CASCADE
days_granted int not null               -- quantos dias adicionar em target
is_active boolean default true
description text                        -- "Mentorado que comprar Online ganha 180 dias adicionais"
created_at timestamptz default now()

unique (source_cohort_id, target_cohort_id)
```

**`cohort_members`**
```sql
id uuid PK
cohort_id uuid FK → cohorts(id) ON DELETE CASCADE
user_id uuid FK → profiles(id) ON DELETE CASCADE
member_role text not null check (member_role in ('STUDENT','MONITOR','MENTOR'))
joined_at timestamptz not null default now()
expires_at timestamptz                  -- nullable = vitalício
status text not null check (status in ('ACTIVE','EXPIRED','REMOVED','PAST_DUE'))
auto_renew_enabled boolean default false
next_renewal_at timestamptz             -- preenchido se auto_renew_enabled = true

unique (cohort_id, user_id)
```

**`live_sessions`**
```sql
id uuid PK
cohort_id uuid FK → cohorts(id) ON DELETE CASCADE
title text not null
description text
scheduled_at timestamptz not null
duration_minutes int default 90
meeting_url text                        -- liberado server-side só 30min antes
recording_url text                      -- preenchido depois
lesson_id uuid FK → lessons(id)         -- nullable, se virar aula gravada
created_at timestamptz default now()
```

#### Compra e pagamento

**`payments`**
```sql
id uuid PK
user_id uuid FK → profiles(id)
cohort_id uuid FK → cohorts(id)
purchase_kind text not null check (purchase_kind in ('ENTRY','EXTENSION','AUTO_RENEWAL'))
membership_id uuid FK → cohort_members(id)        -- preenchido após sucesso

stripe_checkout_session_id text unique
stripe_payment_intent_id text
stripe_subscription_id text                       -- apenas se renovação automática

amount_cents int not null
coupon_id uuid FK → coupons(id)
status text not null check (status in ('PENDING','APPROVED','DECLINED','REFUNDED'))
payment_method text                               -- 'card', 'boleto', 'pix'

created_at timestamptz default now()
paid_at timestamptz
```

**`coupons`**
```sql
id uuid PK
cohort_id uuid FK → cohorts(id) ON DELETE CASCADE  -- cupom é por cohort
code text not null
discount_kind text not null check (discount_kind in ('PERCENT','FIXED'))
discount_value int not null                       -- percentual (0-100) ou centavos
applies_to text not null check (applies_to in ('ENTRY','EXTENSION','BOTH'))
valid_from timestamptz
valid_until timestamptz
max_uses int                                      -- nullable = ilimitado
current_uses int default 0
is_active boolean default true
stripe_coupon_id text
created_at timestamptz default now()

unique (cohort_id, code)
```

**`webhook_events`** — idempotência Stripe
```sql
id uuid PK
stripe_event_id text unique not null
event_type text not null
processed_at timestamptz default now()
payload jsonb
success boolean default true
error_message text
```

#### Progresso, comunidade, certificados

**`lesson_progress`**
```sql
id uuid PK
user_id uuid FK → profiles(id) ON DELETE CASCADE
lesson_id uuid FK → lessons(id) ON DELETE CASCADE
seconds_watched int default 0
completed boolean default false
completed_at timestamptz
updated_at timestamptz default now()

unique (user_id, lesson_id)
```

**`certificates`**
```sql
id uuid PK
user_id uuid FK → profiles(id)
course_id uuid FK → courses(id)
cohort_id uuid FK → cohorts(id)
verification_code text unique not null         -- "AIOX-2026-X7K9P2"
issued_at timestamptz default now()
membership_id uuid FK → cohort_members(id)
pdf_storage_path text
```

**`comments`**
```sql
id uuid PK
lesson_id uuid FK → lessons(id) ON DELETE CASCADE
author_id uuid FK → profiles(id)
parent_comment_id uuid FK → comments(id)        -- nullable; threads de 1 nível
content text not null
is_pinned boolean default false
deleted_at timestamptz
created_at, updated_at
```

**`forum_categories`**
```sql
id uuid PK
slug text unique
name text not null
description text
sort_order int default 0
color text
is_active boolean default true
```

**`forum_threads`**
```sql
id uuid PK
category_id uuid FK → forum_categories(id)
author_id uuid FK → profiles(id)
title text not null
slug text unique not null
content text not null
is_pinned boolean default false
is_resolved boolean default false
view_count int default 0
deleted_at timestamptz
created_at timestamptz default now()
last_activity_at timestamptz default now()
```

**`forum_replies`**
```sql
id uuid PK
thread_id uuid FK → forum_threads(id) ON DELETE CASCADE
author_id uuid FK → profiles(id)
parent_reply_id uuid FK → forum_replies(id)
content text not null
is_accepted_answer boolean default false
deleted_at timestamptz
created_at, updated_at
```

**`votes`**
```sql
id uuid PK
user_id uuid FK → profiles(id)
thread_id uuid FK → forum_threads(id)
reply_id uuid FK → forum_replies(id)
created_at timestamptz default now()

check (thread_id is not null or reply_id is not null)
unique (user_id, thread_id)
unique (user_id, reply_id)
```

#### Auxiliares

**`notifications`**
```sql
id uuid PK
user_id uuid FK → profiles(id) ON DELETE CASCADE
notification_type text not null
title text not null
message text
action_url text
read_at timestamptz
created_at timestamptz default now()
```

### 5.3 Função-chave: `has_access(user_id, lesson_id)`

Função SQL no Postgres usada em policies RLS e na aplicação. Retorna boolean:

```sql
create or replace function public.has_access(p_user_id uuid, p_lesson_id uuid)
returns boolean
language sql
security definer
stable
as $$
  with lesson_info as (
    select l.module_id, m.course_id
    from lessons l
    join modules m on m.id = l.module_id
    where l.id = p_lesson_id
  )
  select exists (
    select 1
    from cohort_members cm
    join cohort_courses cc on cc.cohort_id = cm.cohort_id
    join lesson_info li on li.course_id = cc.course_id
    where cm.user_id = p_user_id
      and cm.status = 'ACTIVE'
      and (cm.expires_at is null or cm.expires_at > now())
      and (
        cardinality(cc.included_module_ids) = 0
        or li.module_id = any(cc.included_module_ids)
      )
  );
$$;
```

**Toda renderização de conteúdo bloqueado passa por essa função.**

### 5.4 Políticas RLS principais

- **`profiles`**: usuário lê/edita o próprio; admin lê/edita todos
- **`courses`/`modules`/`lessons`**: leitura se `published = true` E `has_access()` retornar true; admin escreve
- **`materials`**: leitura se `has_access(user_id, lesson_id)` da aula relacionada
- **`cohort_members`**: usuário vê só as próprias linhas; admin vê todas; service_role escreve (webhook)
- **`lesson_progress`**: usuário lê/escreve só as próprias linhas; admin lê todas
- **`comments`**: leitura se `has_access()` da aula; escrita autor edita o próprio até X minutos; admin edita qualquer
- **`forum_*`**: leitura por qualquer usuário autenticado com matrícula ativa em qualquer cohort
- **`payments`**: usuário vê só os próprios; admin vê todos
- **`webhook_events`**: apenas service_role lê/escreve

### 5.5 Triggers utilitários

```sql
-- updated_at automático em todas as tabelas que têm essa coluna
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- exemplo de aplicação
create trigger set_updated_at before update on profiles
  for each row execute function public.set_updated_at();

-- Criar profile automaticamente quando user é criado em auth.users
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)), 'STUDENT');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
```

---

## 6. Funcionalidades por área

### 6.1 Área pública

- `/login`, `/cadastro`, `/recuperar-senha`, `/redefinir-senha/[token]`
- `/turmas` — listagem de cohorts com `has_public_page = true` e `is_purchasable = true`
- `/turmas/[slug]` — landing page automática da cohort (descrição, cursos inclusos, preço, CTA de compra)
- `/checkout/[cohortSlug]` — inicia Stripe Checkout (sistema decide entry vs extension automaticamente)
- `/checkout/sucesso` — confirmação pós-pagamento
- `/certificado/v/[code]` — verificação pública

### 6.2 Área do aluno (`/(student)`)

**`/dashboard`**
- Saudação + foto
- Card "Continue de onde parou"
- Próximo encontro ao vivo (se aplicável)
- Cards das cohorts ativas com % de progresso
- Avisos: "Sua matrícula em X expira em N dias — renovar agora"

**`/meus-cursos`**
- Cards dos cursos disponíveis (união das cohorts ativas)
- Indicador de qual cohort libera cada curso
- Cursos parcialmente liberados mostram quais módulos estão acessíveis

**`/curso/[slug]`**
- Lista de módulos com indicador de progresso
- Módulos liberados: navegáveis
- Módulos bloqueados: cadeado e CTA "Disponível na turma X — saiba mais"
- CTA aponta pra `/turmas/[slug]` da cohort que libera

**`/curso/[slug]/aula/[lesson-slug]`**
- Server Component valida acesso via `has_access()`
- Player de vídeo (Vimeo embed com domain-locking)
- Conteúdo da aula renderizado conforme `content_format`:
  - **MDX**: `next-mdx-remote` + componentes customizados (Callout, Tabs, CodeBlock copiável)
  - **HTML**: sanitizado com DOMPurify server-side
  - **MARKDOWN**: react-markdown + Shiki
- Tabs abaixo: "Sobre a aula" / "Materiais" / "Comentários"
- Navegação anterior/próxima
- Botão manual "Marcar como concluída"
- Salva progresso a cada 10s via Server Action

**`/forum`** — fórum geral único
- Categorias (ex.: Dúvidas Técnicas, Geral, Networking)
- Lista de threads por categoria, ordenação por última atividade
- Página de thread com replies em árvore (1 nível)
- Editor markdown na criação
- Upvote, marcar resposta aceita
- Busca simples

**`/agenda`**
- Sessões futuras e passadas das cohorts do aluno
- Botão exportar `.ics`
- `meeting_url` libera 30min antes (server-side)
- Pós-encontro: `recording_url`

**`/certificados`**
- Lista de cursos concluídos
- Download em PDF
- Link público de verificação

**`/perfil`**
- Editar nome, bio, foto
- Trocar senha
- **Histórico de pagamentos** (lista todos os `payments`)
- **Minhas matrículas**: cohorts ativas, expiradas, com botão "Estender por R$ X"
- **Renovação automática**: toggle on/off por matrícula

### 6.3 Área administrativa (`/(admin)`)

**`/admin`** — Dashboard
- Receita total e do mês (Stripe)
- Alunos ativos (por cohort)
- Conclusão média
- Comentários e threads novos pra moderar
- Pagamentos recusados nas últimas 24h
- Matrículas expirando nos próximos 7 dias

**`/admin/cursos`** — CRUD de courses
- Lista, busca, criar novo
- Página de edição com modules (drag-and-drop pra reordenar)
- Toggle `published` / `draft`

**Modules e Lessons (dentro do curso)**
- CRUD de modules
- CRUD de lessons:
  - `kind` da lesson (VIDEO, LIVE, IN_PERSON, CODE, READING)
  - Upload de vídeo via Vimeo API ou colar `video_id`
  - **Seletor de `content_format`** (MDX / HTML / MARKDOWN)
    - MDX: editor com preview lado a lado
    - HTML: textarea com sanitização preview
    - Markdown: editor com syntax highlight ao vivo
  - Upload de materials (PDF, ZIP, imagens) via drag-and-drop pro Supabase Storage
- Preview da lesson como aluno

**`/admin/turmas`** — Coração do admin
- Lista de cohorts com filtros (status, is_purchasable, ocupação)
- **Página de criação/edição de cohort**:
  1. **Identidade**: name, slug, description, cover_image_url
  2. **Status e datas**: status, start_date / end_date, total_seats
  3. **Acesso**:
     - access_duration_days (ou vitalício)
     - group_url
     - Toggles: has_live_sessions, has_support
  4. **Cursos liberados**: checklist hierárquico
     - Lista de courses com checkbox
     - Pra cada course marcado, expande modules com checkboxes
     - "Selecionar todos" / "Limpar" por course
     - Salva em `cohort_courses.included_module_ids`
  5. **Comercial**:
     - is_purchasable (toggle)
     - has_public_page (toggle)
     - entry_price_cents (input em reais)
     - extension_price_cents
     - max_installments_entry / max_installments_extension
     - extension_duration_days
     - allows_auto_renewal (toggle)
  6. **Extensões cruzadas**: matriz "comprar essa cohort estende prazo em quais cohorts?"
     - CRUD de `cohort_cross_extensions` onde `source_cohort_id = id da cohort atual`
  7. **Membros**: lista de cohort_members, busca, adicionar/remover, ver progresso
  8. **Sessões ao vivo**: agendar live_sessions
  9. **Cupons**: CRUD de coupons da cohort

**`/admin/usuarios`** — Gestão de pessoas
- Tabela com filtros (cohort, status, role)
- Ver perfil completo: memberships, progresso, comments, payments
- Ações: ativar/desativar, alterar role, conceder acesso manual a cohort, estender prazo, refund

**`/admin/pagamentos`**
- Tabela com filtros e busca
- Link pro Stripe Dashboard de cada payment
- Botão de refund (com confirmação dupla)
- Exportar CSV

**`/admin/moderacao`**
- Fila de comments novos
- Fila de threads do fórum
- Ações: aprovar, remover, marcar spam, banir usuário

**`/admin/forum`** — gerenciar forum_categories
- CRUD de categories

---

## 7. Fluxos críticos

### 7.1 Compra de cohort — primeira vez (entry)

1. Visitante acessa `/turmas/online-padrao` (LP automática)
2. Clica em "Quero entrar"
3. Se não logado: cadastro rápido ou login
4. Server Action verifica: usuário **já tem `cohort_members`** (mesmo expirada/removida) nessa cohort?
   - **Não** → preço de entrada, `purchase_kind = ENTRY`
5. Cria sessão Stripe Checkout com `stripe_price_entry_id`
6. Stripe processa
7. Webhook `checkout.session.completed`:
   - Verifica idempotência via `webhook_events.stripe_event_id`
   - Cria `payment` (status APPROVED)
   - Cria `cohort_members` com `expires_at = now() + access_duration_days`
   - Incrementa `filled_seats`
   - **Aplica extensões cruzadas**: pra cada `cohort_cross_extensions` onde `source_cohort_id` é a cohort comprada, busca `cohort_members` existentes do user em `target_cohort_id` e estende prazo (ou cria nova se não existir)
   - Envia email de boas-vindas
8. Redirect pra `/checkout/sucesso` → `/dashboard`

### 7.2 Recompra (extension) na mesma cohort

1. Aluno em `/perfil` vê membership ativa/expirada e clica "Estender por R$ 499"
2. Server Action verifica: já tem cohort_members nessa cohort? **Sim** → `purchase_kind = EXTENSION`
3. Cria sessão Stripe com `stripe_price_extension_id`
4. Webhook:
   - Cria payment
   - **Soma ao prazo restante**: `expires_at = max(expires_at, now()) + extension_duration_days`
   - Status volta pra ACTIVE
   - Aplica extensões cruzadas se houver

### 7.3 Aluno tenta acessar conteúdo bloqueado

1. Server Component da página da lesson chama `has_access(user_id, lesson_id)`
2. Função retorna `false`
3. Página renderiza `<LockedContent />`:
   - Cadeado + mensagem "Esta aula faz parte da turma X"
   - Descrição breve da cohort
   - CTA "Conhecer turma X" → `/turmas/[slug]`
4. **Nunca** renderiza player nem `video_id` no DOM

### 7.4 Elegibilidade vitalícia para extensão

1. Aluno comprou cohort X em 2024, expirou em 2025
2. Volta em 2026 e quer comprar de novo
3. Sistema busca em `cohort_members` (mesmo com status REMOVED/EXPIRED) — encontra histórico
4. Mostra preço de **extension** (R$ 499), não entry (R$ 8.700)
5. Após pagamento: reativa membership com `expires_at = now() + extension_duration_days`

### 7.5 Renovação automática

1. Aluno ativa toggle no perfil → `auto_renew_enabled = true`
2. Server Action cria Stripe Subscription Schedule programada pra `expires_at - 7 dias`
3. Cron diário verifica `cohort_members` com `next_renewal_at <= now()`
4. Stripe cobra automaticamente
5. Webhook `invoice.paid`:
   - Cria payment com `purchase_kind = AUTO_RENEWAL`
   - Estende prazo
   - Envia email "Sua matrícula foi renovada"
6. Webhook `invoice.payment_failed`:
   - Marca membership como PAST_DUE
   - Stripe tenta novamente em 3 dias (automático)
   - Após 3 falhas, desativa renovação automática e expira membership

### 7.6 Conclusão de curso e certificate

1. Aluno marca última lesson como completed (auto ao chegar no fim do vídeo, ou manual)
2. Server Action verifica: todas as lessons das cohorts que liberam esse course pra esse user estão completed?
3. Se sim, cria `certificates`, gera PDF via `@react-pdf/renderer`, salva em Storage
4. Cria notification "Seu certificado está pronto"
5. Aluno baixa em `/certificados` ou compartilha link público `/certificado/v/[code]`

---

## 8. Faseamento

8 fases sequenciais com critério de aceite explícito.

### Fase 1 — Setup Supabase + Schema completo

**Tarefas:**
- `supabase link --project-ref mksmmpfyqowuzjcchhkl`
- Criar migration `initial_schema.sql` com todas as tabelas da Seção 5
- Triggers de `updated_at` e `handle_new_user`
- Função `has_access()`
- Habilitar RLS e políticas críticas
- Criar buckets de Storage (`avatars`, `materials`, `certificates`, `covers`) via SQL ou painel
- Seed: 1 admin (você), 2 students teste, 1 mentor, 1 course demo (2 modules × 2 lessons), 2 cohorts demo (uma vendável online R$ 499, uma privada mentoria R$ 8.700), cross extension Online → Mentoria com 180 dias, 3 forum_categories

**Aceite:**
- `supabase db push` aplica tudo limpo
- `supabase status` mostra projeto vinculado
- Studio mostra todas as tabelas com seeds populados
- Função `has_access()` retorna corretamente nos casos de teste

### Fase 2 — Auth Supabase + RBAC

**Tarefas:**
- Configurar Supabase Auth (email/senha + Google OAuth)
- Cliente Supabase server-side e client-side em `/lib/supabase/`
- Páginas: `/login`, `/cadastro`, `/recuperar-senha`, `/redefinir-senha/[token]`
- Middleware Next.js validando sessão e role
- Helpers `requireUser()`, `requireRole()`, `requireAdmin()` em `/lib/auth/`
- Templates Resend (boas-vindas, recuperação)
- Trigger `handle_new_user` cria profile automaticamente

**Aceite:**
- Login funciona
- Reset de senha completa o ciclo
- Acessar `/admin` sem ser ADMIN dá 403
- Acessar `/dashboard` sem login redireciona pra `/login`

### Fase 3 — Player de vídeo + Progresso + Conteúdo da lesson

**Tarefas:**
- Adapter de vídeo `/lib/video/` (interface + Vimeo implementation)
- Componente `<VideoPlayer />` (Vimeo embed com domain-locking ativo)
- Server Action `saveProgress(lessonId, seconds)`
- Página da lesson com bloqueio via `has_access()`
- Componente `<LockedContent />` com CTA pra LP da cohort
- **Renderização triplo formato**:
  - MDX via `next-mdx-remote` + componentes (Callout, CodeBlock, Tabs)
  - HTML sanitizado via DOMPurify
  - Markdown via react-markdown + Shiki

**Aceite:**
- Aluno em cohort A vê lessons dos courses liberados; bloqueado em outros
- Progresso salva e retoma
- Conclusão automática ao chegar no fim do vídeo
- Os três formatos de content renderizam com syntax highlighting

### Fase 4 — Comments + Materials

**Tarefas:**
- Sistema de comments com threads de 1 nível
- Soft delete + moderação básica
- Upload de materials via Supabase Storage com policies
- Download via signed URL com expiração de 5min

**Aceite:**
- Aluno comenta, responde
- Mentor/Admin tem badge especial
- Materials só baixam pra alunos com acesso à lesson

### Fase 5 — Forum + Live Sessions + Certificates

**Tarefas:**
- CRUD de forum_threads, forum_replies, votes, marcar resposta aceita
- forum_categories (ativas/inativas)
- Página `/agenda` com live_sessions (link liberado 30min antes server-side)
- Geração de PDF de certificate
- Página pública `/certificado/v/[code]`

**Aceite:**
- Aluno cria thread, recebe replies, marca aceita
- Agenda mostra sessions e libera link no horário certo
- Certificate emitido com 100% de conclusão e PDF baixável

### Fase 6 — Área administrativa completa

**Tarefas:**
- Dashboard com métricas
- CRUD de courses, modules, lessons (drag-and-drop pra reordenar)
- Upload de vídeo via Vimeo API
- Editor de lesson com seletor de `content_format`
- **CRUD de cohorts com fluxo completo da Seção 6.3**:
  - Configuração comercial
  - Seleção hierárquica de courses e modules
  - **Matriz de cohort_cross_extensions**
  - Adição/remoção de cohort_members
  - Agendamento de live_sessions
  - CRUD de coupons da cohort
- Gestão de usuários
- Moderação

**Aceite:**
- Crio cohort nova ponta a ponta sem mexer no banco
- Configuro cross extension e ela aplica corretamente em compra real
- Adiciono aluno manualmente com prazo customizado

### Fase 7 — Stripe e checkout

**Tarefas:**
- Adapter de pagamento `/lib/payment/` (interface + Stripe implementation)
- Sincronização Cohort ↔ Stripe Product/Price (criar/atualizar/arquivar via API quando cohort é salva como purchasable)
- Sincronização Coupons ↔ Stripe Coupons
- Server Action `createCheckoutSession(cohortSlug)` que decide ENTRY vs EXTENSION automaticamente
- Webhook `/api/webhooks/stripe` com idempotência via `webhook_events`
- Eventos tratados: `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `charge.refunded`
- Aplicação de cohort_cross_extensions após pagamento aprovado
- Renovação automática via Stripe Subscription Schedule (opt-in)
- Cron diário (Vercel Cron):
  - Marca cohort_members com `expires_at < now()` como EXPIRED
  - Envia lembretes 15/7/3 dias antes da expiração
  - Processa renovações automáticas pendentes

**Aceite:**
- Compra real (modo teste) cria membership correto
- Recompra estende prazo somando ao restante
- Cross extension aplicada (mentorado paga online, ganha dias na mentoria)
- Renovação automática funciona end-to-end
- Webhook é idempotente (testar replay com Stripe CLI)

### Fase 8 — Polimento e deploy

**Tarefas:**
- Notifications in-app (sininho)
- Emails: boas-vindas, lembrete de session, novo material, expiração próxima, certificate pronto
- Onboarding wizard no primeiro login
- Responsividade mobile completa
- Acessibilidade básica (WCAG AA)
- Sentry + Vercel Analytics
- Testes E2E mínimos (Playwright):
  - Cadastro → checkout → ver course → assistir lesson → progresso salva
  - Aluno bloqueado em conteúdo da Mentoria
  - Webhook idempotente
- Deploy Vercel + domínio + Stripe modo produção
- Smoke test pré-lançamento

**Aceite:**
- Plataforma em produção
- Compra real funciona
- Métricas chegando no Sentry e Analytics
- Primeiro aluno real consegue completar fluxo ponta-a-ponta

---

## 9. Estrutura de pastas

```
/app
  /(public)
    /turmas
      /[slug]                  → LP automática (UI em PT)
    /checkout
    /login, /cadastro, /recuperar-senha
    /certificado/v/[code]
  /(student)
    /dashboard
    /meus-cursos
    /curso/[slug]
      /aula/[lesson-slug]
    /forum
    /agenda
    /certificados
    /perfil
  /(admin)
    /cursos                    → manages courses
    /turmas                    → manages cohorts
      /[id]/editar
      /[id]/membros
      /[id]/sessoes
      /[id]/cupons
    /usuarios
    /pagamentos
    /moderacao
    /forum
  /api
    /webhooks
      /stripe
    /uploads
/components
  /ui                          → shadcn
  /student
  /admin
  /shared
  /editor                      → MDX, TipTap, HTML editors
/lib
  /supabase
    /server.ts
    /client.ts
    /admin.ts                  → service_role, server-only
  /auth                        → helpers RBAC
  /payment
    /interface.ts
    /stripe.ts
  /video
    /interface.ts
    /vimeo.ts
  /content
    /mdx.ts
    /html.ts                   → sanitização DOMPurify
    /markdown.ts
  /email
    /templates
    /send.ts
  /utils
/supabase
  /migrations                  → SQL versionado
  /seed.sql
  config.toml
/emails                        → React Email
/types
  /database.ts                 → tipos gerados via supabase gen types
```

> Nomes de pastas no `/app` em português pra match com a URL do produto. Nomes de funções/tipos em inglês.

---

## 10. Geração de tipos TypeScript

```bash
# Após cada migration aplicada, regerar tipos
supabase gen types typescript --project-id mksmmpfyqowuzjcchhkl > types/database.ts
```

Resultado: tipos como `Database['public']['Tables']['cohorts']['Row']`, totalmente em inglês, alinhados com o schema. Importar em todo lugar como:

```ts
import type { Database } from '@/types/database'
type Cohort = Database['public']['Tables']['cohorts']['Row']
```

---

## 11. Riscos e mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| Pirataria de vídeo | Alto pra mentoria | Vimeo domain-locking + watermark dinâmico (overlay com email do aluno) |
| Webhook Stripe falha → aluno paga sem acesso | Alto | Idempotência via `webhook_events` + endpoint manual `/admin/pagamentos/[id]/reprocessar` |
| RLS mal configurado vaza dados | Crítico | Testes automatizados de policies; auditoria pré-deploy |
| HTML inseguro (XSS) | Alto | DOMPurify server-side em todo content do admin |
| Sincronização Stripe ↔ Cohort fora de sync | Médio | Função `syncCohortWithStripe()` idempotente, executada após cada save |
| Vimeo plano insuficiente | Médio | Monitorar uso; preparar migração pra Cloudflare Stream se passar 70% do limite |
| Crescimento → Postgres caro | Baixo no MVP | Plano Pro Supabase ($25/mês) suporta centenas de alunos |
| Aluno aciona refund > 7 dias após acesso | Médio | Política clara na LP; admin avalia caso a caso |

---

## 12. Próximos passos imediatos

1. **Obter chaves**:
   - Supabase: `anon` e `service_role` keys do projeto `mksmmpfyqowuzjcchhkl`
   - Stripe: criar conta (test mode), pegar keys
   - Vimeo: assinar plano Standard, obter access token, configurar domain whitelist
   - Resend: criar conta, verificar domínio
2. **Subir `.env.local`** com todas as keys
3. **Iniciar Fase 1** — schema completo, sem pular pra UI antes do banco estar sólido

---

## 13. Sugestão de orquestração com Squads

| Agente | Responsabilidade | Fases |
|---|---|---|
| **Architect** | Schema SQL, RLS, função `has_access`, ADRs | 1 |
| **Auth Engineer** | Supabase Auth + middleware + RBAC | 2 |
| **Student Frontend** | UI/UX da área do aluno | 3, 4, 5 |
| **Admin Frontend** | UI/UX do painel administrativo | 6 |
| **Payment Engineer** | Stripe + webhooks + cross extensions + auto renewal | 7 |
| **Video Engineer** | Vimeo adapter + player + watermark | 3 (transversal) |
| **Content Engineer** | MDX + TipTap + HTML sanitization | 3, 6 |
| **DevOps** | Deploy + observabilidade + RLS testing | 8 |

Você como **orquestrador**: revisa entregas, decide trade-offs, faz commits, mantém o roadmap.

---

## 14. Glossário Português ↔ Inglês

Tradução das entidades pra você usar consistentemente na UI:

| Banco (EN) | Produto/UI (PT) |
|---|---|
| `course` | curso |
| `module` | módulo |
| `lesson` | aula |
| `cohort` | turma |
| `cohort_member` / `membership` | matrícula |
| `student` | aluno |
| `instructor` / `mentor` | mentor |
| `material` | material |
| `live_session` | encontro ao vivo |
| `payment` | pagamento |
| `coupon` | cupom |
| `certificate` | certificado |
| `forum_thread` | tópico |
| `forum_reply` | resposta |
| `comment` | comentário |
| `entry_price` | preço de entrada |
| `extension_price` | preço de extensão |
| `cross_extension` | extensão cruzada |
| `auto_renewal` | renovação automática |

---

## 15. Decisões consolidadas (registro histórico)

| # | Decisão | Valor |
|---|---|---|
| 1 | Stack | Next.js 15 + TypeScript + Supabase + Stripe + Vimeo |
| 2 | Cliente DB | Supabase JS puro (sem ORM) |
| 3 | Modelo de venda | Pagamento único; recompra estende |
| 4 | Acesso | Via cohorts, não via níveis |
| 5 | Vídeo | Vimeo (com adapter pra trocar depois) |
| 6 | Materiais | Vinculados à lesson, herdam acesso |
| 7 | Fórum | Geral único, sem categorias por cohort |
| 8 | Conteúdo da lesson | 3 formatos: MDX, HTML, Markdown |
| 9 | Cohorts | Vendáveis ou privadas (mesmo modelo) |
| 10 | Preço | Entry + extension por cohort |
| 11 | Elegibilidade pra extension | Vitalícia |
| 12 | Recompra antes de expirar | Soma ao prazo restante |
| 13 | Renovação automática | Opt-in via Stripe Subscription Schedule |
| 14 | Cross extension | Suportada nativamente |
| 15 | Bloqueio de conteúdo | Visível com cadeado + CTA upsell |
| 16 | Drip por dias | Fora do MVP |
| 17 | Supabase | Projeto `mksmmpfyqowuzjcchhkl` já provisionado |
| 18 | **Idiomas** | **Banco em inglês; UI/copy em português** |

---

**Fim do PRD.**
