-- Migration: aulas_v2_summary_transcript_reactions
-- Epic 3 (Aulas v2): summary, transcript, lesson_reactions, template description

-- ============================================================
-- 1. ALTER lessons: adicionar summary + transcript
-- ============================================================
ALTER TABLE public.lessons
  ADD COLUMN IF NOT EXISTS summary text,
  ADD COLUMN IF NOT EXISTS summary_format text CHECK (summary_format IN ('MDX', 'HTML', 'MARKDOWN')),
  ADD COLUMN IF NOT EXISTS transcript text,
  ADD COLUMN IF NOT EXISTS transcript_format text CHECK (transcript_format IN ('MDX', 'HTML', 'MARKDOWN'));

-- ============================================================
-- 2. CREATE lesson_reactions
-- ============================================================
CREATE TABLE IF NOT EXISTS public.lesson_reactions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id   uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reaction    text NOT NULL CHECK (reaction IN ('LIKE', 'DISLIKE')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (lesson_id, user_id)
);

CREATE INDEX IF NOT EXISTS lesson_reactions_lesson_reaction_idx
  ON public.lesson_reactions (lesson_id, reaction);

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.lesson_reactions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE public.lesson_reactions ENABLE ROW LEVEL SECURITY;

-- SELECT: qualquer um com acesso à aula pode ler (consistente com comments)
-- Usa has_access(user_id, lesson_id) — função existente no projeto
CREATE POLICY "lesson_reactions: leitura se tem acesso à lesson"
  ON public.lesson_reactions FOR SELECT
  USING (
    public.has_access(auth.uid(), lesson_id)
    OR public.is_admin()
  );

-- INSERT/UPDATE/DELETE: só o próprio usuário com acesso à aula
CREATE POLICY "lesson_reactions: usuário gerencia própria reação"
  ON public.lesson_reactions FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (
    user_id = auth.uid()
    AND public.has_access(auth.uid(), lesson_id)
  );

-- ============================================================
-- 3. UPDATE: preencher description vazias com template
-- ============================================================
UPDATE public.lessons
SET description = '### O que você vai aprender

- Conceito principal da aula
- Aprendizado-chave 2
- Aprendizado-chave 3

### Pré-requisitos

Nenhum.

### Próximos passos

Continue com a próxima aula.'
WHERE (description IS NULL OR description = '')
  AND deleted_at IS NULL;
