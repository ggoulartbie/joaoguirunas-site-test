-- Migration: storage_buckets_policies
-- Buckets: avatars (público), covers (público), materials (privado 5min), certificates (privado 1h)

-- ============================================================
-- BUCKETS
-- ============================================================

-- avatars: público — exibido em comments, fórum, perfil
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true,
  5242880,  -- 5MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

-- covers: público — capas de courses e cohorts
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'covers',
  'covers',
  true,
  10485760,  -- 10MB
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

-- materials: privado — PDFs, ZIPs, imagens de aulas (signed URL 5min)
insert into storage.buckets (id, name, public, file_size_limit)
values (
  'materials',
  'materials',
  false,
  104857600  -- 100MB
)
on conflict (id) do nothing;

-- certificates: privado — PDFs de certificados (signed URL 1h)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'certificates',
  'certificates',
  false,
  5242880,  -- 5MB
  array['application/pdf']
)
on conflict (id) do nothing;

-- ============================================================
-- POLICIES: avatars
-- Path convention: avatars/{user_id}/avatar.{ext}
-- ============================================================

-- Qualquer um pode ver avatares (bucket público)
create policy "avatars: leitura pública"
  on storage.objects for select
  using (bucket_id = 'avatars');

-- Usuário só faz upload no próprio path
create policy "avatars: upload pelo próprio usuário"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Usuário atualiza o próprio avatar
create policy "avatars: update pelo próprio usuário"
  on storage.objects for update
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Usuário deleta o próprio avatar
create policy "avatars: delete pelo próprio usuário"
  on storage.objects for delete
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================================
-- POLICIES: covers
-- Path convention: covers/{course_id|cohort_id}/{filename}
-- ============================================================

-- Qualquer um pode ver capas (bucket público)
create policy "covers: leitura pública"
  on storage.objects for select
  using (bucket_id = 'covers');

-- Apenas admin faz upload de capas
create policy "covers: upload por admin"
  on storage.objects for insert
  with check (
    bucket_id = 'covers'
    and public.is_admin()
  );

create policy "covers: update por admin"
  on storage.objects for update
  using (
    bucket_id = 'covers'
    and public.is_admin()
  );

create policy "covers: delete por admin"
  on storage.objects for delete
  using (
    bucket_id = 'covers'
    and public.is_admin()
  );

-- ============================================================
-- POLICIES: materials
-- Path convention: materials/{lesson_id}/{material_id}.{ext}
-- Acesso via signed URL com 5 minutos de expiração
-- ============================================================

-- SELECT: usuário com acesso à lesson (has_access via lesson_id extraído do path)
create policy "materials: download se tem acesso à lesson"
  on storage.objects for select
  using (
    bucket_id = 'materials'
    and (
      public.has_access(
        auth.uid(),
        (storage.foldername(name))[1]::uuid  -- lesson_id é a primeira pasta do path
      )
      or public.is_admin()
    )
  );

-- INSERT/UPDATE/DELETE: apenas admin e service_role
create policy "materials: upload por admin"
  on storage.objects for insert
  with check (
    bucket_id = 'materials'
    and public.is_admin()
  );

create policy "materials: update por admin"
  on storage.objects for update
  using (
    bucket_id = 'materials'
    and public.is_admin()
  );

create policy "materials: delete por admin"
  on storage.objects for delete
  using (
    bucket_id = 'materials'
    and public.is_admin()
  );

-- ============================================================
-- POLICIES: certificates
-- Path convention: certificates/{user_id}/{certificate_id}.pdf
-- Acesso via signed URL com 1 hora de expiração
-- ============================================================

-- SELECT: usuário vê apenas os próprios certificados
create policy "certificates: download pelo próprio usuário"
  on storage.objects for select
  using (
    bucket_id = 'certificates'
    and (
      auth.uid()::text = (storage.foldername(name))[1]  -- user_id é a primeira pasta
      or public.is_admin()
    )
  );

-- INSERT: service_role apenas (gerado por Server Action privilegiada ao emitir certificado)
create policy "certificates: upload por admin"
  on storage.objects for insert
  with check (
    bucket_id = 'certificates'
    and public.is_admin()
  );

create policy "certificates: delete por admin"
  on storage.objects for delete
  using (
    bucket_id = 'certificates'
    and public.is_admin()
  );
