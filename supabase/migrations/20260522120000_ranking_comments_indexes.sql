-- Índices para queries de ranking por comentários (RK-2)
-- Cobrem o access pattern: created_at >= since WHERE deleted_at IS NULL
-- sem lesson_id/thread_id/category_id, que os índices existentes requerem.

CREATE INDEX IF NOT EXISTS comments_ranking_idx
  ON public.comments (created_at DESC) WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS forum_threads_ranking_idx
  ON public.forum_threads (created_at DESC) WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS forum_replies_ranking_idx
  ON public.forum_replies (created_at DESC) WHERE deleted_at IS NULL;
