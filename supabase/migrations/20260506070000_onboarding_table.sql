-- Tabela para armazenar onboardings de mentorados
-- Operações via service_role (RLS bloqueia acesso público)

CREATE TABLE IF NOT EXISTS public.onboarding (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  nome        text        NOT NULL DEFAULT '',
  profissao   text,
  empresa     text,
  segmento    text,
  cidade      text,
  linkedin    text,
  obj_1       text,
  obj_2       text,
  obj_3       text,
  obj_4       text,
  ctx_1       text,
  ctx_2       text,
  ctx_3       text,
  ctx_4       text,
  proj_nome       text,
  proj_problema   text,
  proj_publico    text,
  proj_tools      text,
  proj_resultado  text,
  planejamento    text,
  status      text NOT NULL DEFAULT 'em_andamento'
              CHECK (status IN ('em_andamento', 'concluido'))
);

CREATE TRIGGER set_onboarding_updated_at
  BEFORE UPDATE ON public.onboarding
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.onboarding ENABLE ROW LEVEL SECURITY;

-- Bloqueia acesso público; service_role bypassa RLS
CREATE POLICY "onboarding_no_public_access"
  ON public.onboarding FOR ALL USING (false);
