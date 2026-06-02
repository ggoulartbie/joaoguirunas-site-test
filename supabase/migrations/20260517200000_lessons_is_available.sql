-- Migration: lesson-availability / LA-1.1
-- Adiciona controle de disponibilidade por aula.
-- Quando FALSE: aula aparece listada mas com badge "Em breve" e sem acesso ao player.
-- DEFAULT TRUE garante zero breaking change em aulas existentes.

ALTER TABLE public.lessons
  ADD COLUMN is_available BOOLEAN NOT NULL DEFAULT TRUE;
