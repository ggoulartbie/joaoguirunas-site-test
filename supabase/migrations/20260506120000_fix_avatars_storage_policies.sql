-- Migration: fix_avatars_storage_policies
-- Remove políticas duplicadas do bucket avatars (criadas por 022229 e 100000)
-- e recria com nomes canônicos + WITH CHECK no UPDATE (F9.x)

-- ============================================================
-- DROP — todas as policies de avatars das duas migrations anteriores
-- ============================================================

-- Da migration 20260506022229_storage_buckets_policies
drop policy if exists "avatars: leitura pública" on storage.objects;
drop policy if exists "avatars: upload pelo próprio usuário" on storage.objects;
drop policy if exists "avatars: update pelo próprio usuário" on storage.objects;
drop policy if exists "avatars: delete pelo próprio usuário" on storage.objects;

-- Da migration 20260506100000_avatars_bucket
drop policy if exists "avatars_select_public" on storage.objects;
drop policy if exists "avatars_insert_own" on storage.objects;
drop policy if exists "avatars_update_own" on storage.objects;
drop policy if exists "avatars_delete_own" on storage.objects;

-- ============================================================
-- RECRIA — policies canônicas com WITH CHECK no UPDATE
-- Path convention: avatars/{user_id}/{filename}
-- ============================================================

-- Qualquer um pode ver avatares (bucket público)
create policy "avatars: leitura pública"
  on storage.objects for select
  to public
  using (bucket_id = 'avatars');

-- Usuário só faz upload no próprio path
create policy "avatars: upload pelo próprio usuário"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- UPDATE com WITH CHECK: valida path de origem E destino (F9.x)
create policy "avatars: update pelo próprio usuário"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  )
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Usuário deleta o próprio avatar
create policy "avatars: delete pelo próprio usuário"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
