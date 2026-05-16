-- Migration: soft_delete_aware_slug_uniqueness
-- Substitui constraints UNIQUE rígidas por partial unique indexes
-- que só validam linhas ativas (deleted_at IS NULL).
-- Antes: criar módulo/aula/curso com slug de item soft-deleted falhava com
-- "duplicate key value violates unique constraint" e crashava a página.

-- ============================================================
-- COURSES
-- ============================================================
ALTER TABLE public.courses DROP CONSTRAINT IF EXISTS courses_slug_key;
CREATE UNIQUE INDEX IF NOT EXISTS courses_slug_active_unique
  ON public.courses (slug)
  WHERE deleted_at IS NULL;

-- ============================================================
-- MODULES
-- ============================================================
ALTER TABLE public.modules DROP CONSTRAINT IF EXISTS modules_course_id_slug_key;
CREATE UNIQUE INDEX IF NOT EXISTS modules_course_id_slug_active_unique
  ON public.modules (course_id, slug)
  WHERE deleted_at IS NULL;

-- ============================================================
-- LESSONS
-- ============================================================
ALTER TABLE public.lessons DROP CONSTRAINT IF EXISTS lessons_module_id_slug_key;
CREATE UNIQUE INDEX IF NOT EXISTS lessons_module_id_slug_active_unique
  ON public.lessons (module_id, slug)
  WHERE deleted_at IS NULL;
