-- seed.sql — Dados demo para desenvolvimento
-- Roda como service_role (bypassa RLS)
-- IDs fixos para facilitar reset/replay
-- Idempotente via ON CONFLICT DO NOTHING

-- ============================================================
-- AUTH USERS
-- Inserção direta em auth.users (service_role apenas)
-- handle_new_user trigger cria profiles automaticamente
-- Senhas em bcrypt — placeholder para dev (senha: Test1234!)
-- ============================================================

insert into auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  role,
  aud,
  created_at,
  updated_at
)
values
  (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000000',
    'joaoguirunasramos@gmail.com',
    crypt('Test1234!', gen_salt('bf')),
    now(),
    '{"name": "João Guirunas"}'::jsonb,
    'authenticated',
    'authenticated',
    now(),
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000000',
    'student1@test.com',
    crypt('Test1234!', gen_salt('bf')),
    now(),
    '{"name": "Student One"}'::jsonb,
    'authenticated',
    'authenticated',
    now(),
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000000',
    'student2@test.com',
    crypt('Test1234!', gen_salt('bf')),
    now(),
    '{"name": "Student Two"}'::jsonb,
    'authenticated',
    'authenticated',
    now(),
    now()
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000000',
    'mentor@test.com',
    crypt('Test1234!', gen_salt('bf')),
    now(),
    '{"name": "Mentor Demo"}'::jsonb,
    'authenticated',
    'authenticated',
    now(),
    now()
  )
on conflict (id) do nothing;

-- ============================================================
-- PROFILES
-- handle_new_user cria com role='STUDENT' por padrão.
-- Atualizar roles específicos após insert dos auth.users.
-- ON CONFLICT para idempotência (caso trigger já rodou).
-- ============================================================

insert into public.profiles (id, name, role)
values
  ('00000000-0000-0000-0000-000000000001', 'João Guirunas',  'ADMIN'),
  ('00000000-0000-0000-0000-000000000002', 'Student One',    'STUDENT'),
  ('00000000-0000-0000-0000-000000000003', 'Student Two',    'STUDENT'),
  ('00000000-0000-0000-0000-000000000004', 'Mentor Demo',    'MENTOR')
on conflict (id) do update set
  name = excluded.name,
  role = excluded.role;

-- ============================================================
-- COURSE DEMO: fundamentos-de-growth
-- 2 módulos × 2 aulas = 4 lessons
-- ============================================================

insert into public.courses (id, slug, title, description, published, sort_order)
values (
  '10000000-0000-0000-0000-000000000001',
  'fundamentos-de-growth',
  'Fundamentos de Growth',
  'Aprenda os fundamentos de growth hacking e aquisição de usuários com estratégias práticas.',
  true,
  1
)
on conflict (id) do nothing;

-- Módulo 1: Fundamentos
insert into public.modules (id, course_id, slug, title, sort_order)
values (
  '20000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'fundamentos',
  'Fundamentos de Growth',
  1
)
on conflict (id) do nothing;

-- Módulo 2: Experimentos
insert into public.modules (id, course_id, slug, title, sort_order)
values (
  '20000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000001',
  'experimentos',
  'Experimentos e Métricas',
  2
)
on conflict (id) do nothing;

-- Lesson 1.1: Vídeo com MDX
insert into public.lessons (id, module_id, slug, title, sort_order, kind, video_provider, video_id, content_format, content)
values (
  '30000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000001',
  'o-que-e-growth',
  'O que é Growth Hacking?',
  1,
  'VIDEO',
  'VIMEO',
  'placeholder-vimeo-001',
  'MDX',
  '# O que é Growth Hacking?

Growth hacking é a prática de usar **experimentos rápidos e dados** para encontrar os canais de crescimento mais eficientes.

<Callout type="info">
  Não é sobre hackear sistemas — é sobre hackear o crescimento do produto.
</Callout>

## Os 3 pilares

1. **Aquisição** — como novos usuários chegam
2. **Ativação** — primeiro valor entregue
3. **Retenção** — por que voltam
'
)
on conflict (id) do nothing;

-- Lesson 1.2: Reading com Markdown
insert into public.lessons (id, module_id, slug, title, sort_order, kind, content_format, content)
values (
  '30000000-0000-0000-0000-000000000002',
  '20000000-0000-0000-0000-000000000001',
  'metricas-essenciais',
  'Métricas essenciais: CAC, LTV, Churn',
  2,
  'READING',
  'MARKDOWN',
  '## Métricas essenciais

### CAC (Custo de Aquisição de Cliente)
Total gasto em marketing e vendas dividido pelo número de novos clientes no período.

### LTV (Lifetime Value)
Receita total esperada de um cliente durante todo o relacionamento com o produto.

### Churn
Taxa de cancelamento ou abandono. Churn alto é o maior inimigo do crescimento.

> **Regra prática:** LTV deve ser pelo menos 3× o CAC para o negócio ser sustentável.
'
)
on conflict (id) do nothing;

-- Lesson 2.1: Vídeo com HTML
insert into public.lessons (id, module_id, slug, title, sort_order, kind, video_provider, video_id, content_format, content)
values (
  '30000000-0000-0000-0000-000000000003',
  '20000000-0000-0000-0000-000000000002',
  'ciclo-de-experimentos',
  'O ciclo de experimentos',
  1,
  'VIDEO',
  'VIMEO',
  'placeholder-vimeo-002',
  'HTML',
  '<h2>O ciclo de experimentos</h2>
<p>Todo experimento de growth segue o mesmo ciclo: hipótese, teste, medição e aprendizado.</p>
<ol>
  <li><strong>Hipótese:</strong> "Se fizermos X, Y vai aumentar Z%"</li>
  <li><strong>Teste:</strong> A/B test, feature flag ou MVP rápido</li>
  <li><strong>Medição:</strong> coleta de dados por pelo menos 2 semanas</li>
  <li><strong>Aprendizado:</strong> documentar, iterar ou descartar</li>
</ol>
'
)
on conflict (id) do nothing;

-- Lesson 2.2: Reading com Markdown
insert into public.lessons (id, module_id, slug, title, sort_order, kind, content_format, content)
values (
  '30000000-0000-0000-0000-000000000004',
  '20000000-0000-0000-0000-000000000002',
  'ferramentas-de-growth',
  'Ferramentas de growth e analytics',
  2,
  'READING',
  'MARKDOWN',
  '## Ferramentas de growth

### Analytics
- **Mixpanel** — funis de conversão e retenção por coorte
- **PostHog** — open-source, feature flags integrados
- **Google Analytics 4** — volume e tráfego orgânico

### Experimentos
- **VWO / Optimizely** — A/B testing profissional
- **GrowthBook** — open-source, integra com qualquer stack

### Automação
- **Customer.io** — emails comportamentais
- **Braze** — push + in-app + email em escala
'
)
on conflict (id) do nothing;

-- ============================================================
-- COHORT 1: online-padrao (vendável, pública)
-- ============================================================
insert into public.cohorts (
  id, slug, name, description,
  status, access_duration_days,
  is_purchasable, has_public_page,
  entry_price_cents, extension_price_cents,
  max_installments_entry, max_installments_extension,
  extension_duration_days
)
values (
  '40000000-0000-0000-0000-000000000001',
  'online-padrao',
  'Online Padrão',
  'Acesso completo ao curso Fundamentos de Growth por 180 dias. Estude no seu ritmo.',
  'OPEN',
  180,
  true,
  true,
  49999,   -- R$ 499,99
  29999,   -- R$ 299,99 extensão
  12,
  12,
  180
)
on conflict (id) do nothing;

-- Cohort online libera todos os módulos do course
insert into public.cohort_courses (cohort_id, course_id, included_module_ids, sort_order)
values (
  '40000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  '{}',
  1
)
on conflict (cohort_id, course_id) do nothing;

-- ============================================================
-- COHORT 2: mentoria-maio-2026 (privada, matrícula manual)
-- ============================================================
insert into public.cohorts (
  id, slug, name, description,
  status, access_duration_days,
  is_purchasable, has_public_page,
  entry_price_cents, extension_price_cents,
  max_installments_entry, max_installments_extension,
  extension_duration_days,
  has_live_sessions, has_support,
  start_date, end_date
)
values (
  '40000000-0000-0000-0000-000000000002',
  'mentoria-maio-2026',
  'Mentoria Maio 2026',
  'Mentoria high-ticket presencial + online. Turma fechada com vagas limitadas.',
  'IN_PROGRESS',
  180,
  false,
  false,
  870000,  -- R$ 8.700,00
  199900,  -- R$ 1.999,00 extensão
  1,
  1,
  180,
  true,
  true,
  '2026-05-05',
  '2026-11-05'
)
on conflict (id) do nothing;

insert into public.cohort_courses (cohort_id, course_id, included_module_ids, sort_order)
values (
  '40000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000001',
  '{}',
  1
)
on conflict (cohort_id, course_id) do nothing;

-- ============================================================
-- CROSS EXTENSION: Online → Mentoria (180 dias)
-- ============================================================
insert into public.cohort_cross_extensions (
  id, source_cohort_id, target_cohort_id,
  days_granted, is_active, description
)
values (
  '50000000-0000-0000-0000-000000000001',
  '40000000-0000-0000-0000-000000000001',
  '40000000-0000-0000-0000-000000000002',
  180,
  true,
  'Mentorado que comprar Online ganha 180 dias adicionais na Mentoria'
)
on conflict (source_cohort_id, target_cohort_id) do nothing;

-- ============================================================
-- COHORT MEMBERS
-- student1 ACTIVE em online-padrao → has_access() deve retornar true
-- student2 EXPIRED em online-padrao → has_access() deve retornar false
-- mentor ACTIVE em mentoria-maio-2026
-- ============================================================

-- student1: matrícula ATIVA
insert into public.cohort_members (
  id, cohort_id, user_id, member_role,
  status, expires_at
)
values (
  '60000000-0000-0000-0000-000000000001',
  '40000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  'STUDENT',
  'ACTIVE',
  now() + interval '180 days'
)
on conflict (cohort_id, user_id) do nothing;

-- student2: matrícula EXPIRADA (para testar bloqueio via has_access)
insert into public.cohort_members (
  id, cohort_id, user_id, member_role,
  status, expires_at
)
values (
  '60000000-0000-0000-0000-000000000002',
  '40000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000003',
  'STUDENT',
  'EXPIRED',
  now() - interval '30 days'   -- expirou há 30 dias
)
on conflict (cohort_id, user_id) do nothing;

-- mentor: ACTIVE em mentoria
insert into public.cohort_members (
  id, cohort_id, user_id, member_role,
  status, expires_at
)
values (
  '60000000-0000-0000-0000-000000000003',
  '40000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000004',
  'MENTOR',
  'ACTIVE',
  now() + interval '180 days'
)
on conflict (cohort_id, user_id) do nothing;

-- ============================================================
-- FORUM CATEGORIES
-- ============================================================
insert into public.forum_categories (id, slug, name, description, sort_order, color, is_active)
values
  ('70000000-0000-0000-0000-000000000001', 'duvidas-tecnicas', 'Dúvidas Técnicas', 'Perguntas sobre código, ferramentas e implementação.', 1, '#3B82F6', true),
  ('70000000-0000-0000-0000-000000000002', 'geral',            'Geral',             'Discussões gerais, apresentações e off-topic.',         2, '#10B981', true),
  ('70000000-0000-0000-0000-000000000003', 'networking',       'Networking',        'Conecte-se com outros alunos e mentores.',              3, '#8B5CF6', true)
on conflict (id) do nothing;

-- ============================================================
-- SMOKE TESTS (rodar no Studio após seed)
-- ============================================================
-- Caso 1: student1 ACTIVE → deve retornar TRUE
-- select public.has_access('00000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000001');
--
-- Caso 2: student2 EXPIRED → deve retornar FALSE
-- select public.has_access('00000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000001');
--
-- Caso 3: usuário inexistente → deve retornar FALSE
-- select public.has_access(gen_random_uuid(), '30000000-0000-0000-0000-000000000001');
--
-- Caso 4: admin vê todos os profiles (4 rows)
-- select count(*) from profiles;  -- esperado: 4
