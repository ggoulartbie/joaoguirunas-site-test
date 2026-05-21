CREATE INDEX idx_lesson_progress_completed_at
  ON public.lesson_progress (completed_at)
  WHERE completed = true;
