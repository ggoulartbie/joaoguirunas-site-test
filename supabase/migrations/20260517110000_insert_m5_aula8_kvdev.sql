-- Migration: insert_m5_aula8_kvdev
-- Objetivo: Inserir aula faltante "Módulo 5 | Aula 8 | KV Dev" no banco e corrigir
--           sort_order das duas aulas deslocadas (Handoff: 8→9, Encerramento: 9→10).
-- Escopo: módulo M5 (fe6bcf96-96a5-477a-bc40-95188f22b21d) apenas
-- Data: 2026-05-17
-- Origem do gap: o INSERT original da aula foi omitido, e o slug "modulo-5-aula-9-handoff"
--   foi inserido com sort_order=8 em vez de 9, causando desalinhamento.
-- Anti-recorrência: INSERT usa ON CONFLICT (id) DO NOTHING — idempotente.
--   UPDATEs de sort_order filtram por ID explícito + deleted_at IS NULL.
-- NÃO altera: video_id, video_provider, summary, transcript
-- NÃO aplicar em prod sem autorização explícita do João.

-- ============================================================
-- PASSO 1: Corrigir sort_order das aulas deslocadas
-- (feito antes do INSERT para liberar sort_order=8)
-- ============================================================

-- Encerramento: sort_order 9 → 10
UPDATE public.lessons
SET sort_order = 10,
    updated_at = now()
WHERE id = '0b153dd0-7a84-4b82-a355-d46630dd16d7'
  AND deleted_at IS NULL;

-- Handoff pro Claude Code: sort_order 8 → 9
UPDATE public.lessons
SET sort_order = 9,
    updated_at = now()
WHERE id = 'da7e8094-4f02-4efb-84ba-26e5f76c950e'
  AND deleted_at IS NULL;

-- ============================================================
-- PASSO 2: INSERT da Aula 8 | KV Dev
-- ============================================================

INSERT INTO public.lessons (
  id,
  module_id,
  slug,
  title,
  description,
  sort_order,
  kind,
  video_provider,
  video_id,
  duration_seconds,
  created_at,
  updated_at,
  deleted_at
)
VALUES (
  gen_random_uuid(),
  'fe6bcf96-96a5-477a-bc40-95188f22b21d',
  'modulo-5-aula-8-kv-dev',
  'Módulo 5 | Aula 8 | KV Dev',
  'Quarto KV: design system de aplicativo. O conjunto de regras mais distinto de todos.

O que é específico de app:
→ A tela é pequena, o dedo é grande — mínimo 44×44px por elemento tocável
→ Navegação por toque — hover não existe. O que existe é pressed e active
→ Dark mode obrigatório — sistema operacional moderno detecta preferência, app precisa responder
→ iOS e Android têm padrões diferentes — back button, tipografia padrão, gestos nativos
→ Microinterações importam mais — cada toque precisa ter feedback visual

O prompt faz 10 perguntas antes de gerar: Design System base, dark mode existente, fontes para tamanhos pequenos, tipo de app, plataformas, 5 funcionalidades-chave, tipo de navegação, área autenticada e onboarding, referências de apps, contexto de uso.

O sistema entregue (modo claro e modo escuro):
→ Todos os componentes mobile: botões, inputs, cards, listas, navegação, modais, loading states
→ 9 telas principais: onboarding, login/signup, home, lista, detalhe, perfil, configurações, formulário, estados especiais
→ Padrões iOS vs Android documentados
→ 24 ícones essenciais no estilo da marca
→ Microinterações especificadas (duração, easing, gestos)

Handoff para squad Dev.

Valor de mercado: R$30k–R$80k entregues em uma sessão.',
  8,
  'VIDEO',
  NULL,
  NULL,
  720,
  now(),
  now(),
  NULL
);

-- ============================================================
-- ROLLBACK (não executar — apenas documentado)
-- ============================================================
-- Para reverter:
-- 1. DELETE a aula inserida (identificar pelo slug):
--    DELETE FROM public.lessons WHERE slug = 'modulo-5-aula-8-kv-dev' AND module_id = 'fe6bcf96-96a5-477a-bc40-95188f22b21d';
-- 2. Restaurar sort_order das aulas deslocadas:
--    UPDATE public.lessons SET sort_order = 8, updated_at = now() WHERE id = 'da7e8094-4f02-4efb-84ba-26e5f76c950e' AND deleted_at IS NULL;
--    UPDATE public.lessons SET sort_order = 9, updated_at = now() WHERE id = '0b153dd0-7a84-4b82-a355-d46630dd16d7' AND deleted_at IS NULL;
