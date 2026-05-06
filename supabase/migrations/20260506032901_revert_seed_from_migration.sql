-- Migration: revert_seed_from_migration
-- Remove dados de teste inseridos pela migration 20260506032056_seed_dados_demo.sql
-- Seed deve existir apenas em supabase/seed.sql (dev local), nunca em migrations

-- Ordem reversa de dependências (FK): membros → cohort_courses/cross_ext → cohorts
-- → lessons → modules → courses → profiles → auth.users → forum_categories

delete from public.cohort_members
where id in (
  '60000000-0000-0000-0000-000000000001',
  '60000000-0000-0000-0000-000000000002',
  '60000000-0000-0000-0000-000000000003'
);

delete from public.cohort_cross_extensions
where id = '50000000-0000-0000-0000-000000000001';

delete from public.cohort_courses
where cohort_id in (
  '40000000-0000-0000-0000-000000000001',
  '40000000-0000-0000-0000-000000000002'
);

delete from public.cohorts
where id in (
  '40000000-0000-0000-0000-000000000001',
  '40000000-0000-0000-0000-000000000002'
);

delete from public.lessons
where id in (
  '30000000-0000-0000-0000-000000000001',
  '30000000-0000-0000-0000-000000000002',
  '30000000-0000-0000-0000-000000000003',
  '30000000-0000-0000-0000-000000000004'
);

delete from public.modules
where id in (
  '20000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000002'
);

delete from public.courses
where id = '10000000-0000-0000-0000-000000000001';

delete from public.forum_categories
where id in (
  '70000000-0000-0000-0000-000000000001',
  '70000000-0000-0000-0000-000000000002',
  '70000000-0000-0000-0000-000000000003'
);

delete from public.profiles
where id in (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000004'
);

delete from auth.users
where id in (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000004'
);
