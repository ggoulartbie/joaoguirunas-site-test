-- Adiciona coluna pdf_path na tabela onboarding
ALTER TABLE public.onboarding ADD COLUMN IF NOT EXISTS pdf_path TEXT;

-- Bucket privado para PDFs dos onboardings
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('onboarding-pdfs', 'onboarding-pdfs', false, 20971520, array['application/pdf'])
ON CONFLICT (id) DO NOTHING;

-- service_role bypassa RLS — bloqueia acesso público direto
CREATE POLICY "onboarding_pdfs_no_public_access"
  ON storage.objects FOR ALL
  USING (bucket_id = 'onboarding-pdfs' AND false);
