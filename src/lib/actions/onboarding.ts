'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase/admin';

export type OnboardingRow = {
  id: string;
  created_at: string;
  updated_at: string;
  nome: string;
  pdf_path: string | null;
  profissao: string | null;
  empresa: string | null;
  segmento: string | null;
  cidade: string | null;
  linkedin: string | null;
  obj_1: string | null;
  obj_2: string | null;
  obj_3: string | null;
  obj_4: string | null;
  ctx_1: string | null;
  ctx_2: string | null;
  ctx_3: string | null;
  ctx_4: string | null;
  proj_nome: string | null;
  proj_problema: string | null;
  proj_publico: string | null;
  proj_tools: string | null;
  proj_resultado: string | null;
  planejamento: string | null;
  status: 'em_andamento' | 'concluido';
};

export type OnboardingUpdate = Partial<Omit<OnboardingRow, 'id' | 'created_at' | 'updated_at'>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = () => (supabaseAdmin as any).from('onboarding');

export async function createOnboarding(nome: string): Promise<{ id: string } | { error: string }> {
  const { data, error } = await db()
    .insert({ nome: nome.trim() })
    .select('id')
    .single();

  if (error) return { error: error.message };
  revalidatePath('/mentoria/onboarding');
  return { id: data.id as string };
}

export async function updateOnboarding(
  id: string,
  updates: OnboardingUpdate,
): Promise<{ success: true } | { error: string }> {
  const { error } = await db().update(updates).eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}

export async function deleteOnboarding(id: string): Promise<{ error?: string }> {
  const { error } = await db().delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/mentoria/onboarding');
  return {};
}

export async function listOnboardings(): Promise<OnboardingRow[]> {
  const { data, error } = await db()
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data as OnboardingRow[];
}

export async function getOnboarding(id: string): Promise<OnboardingRow | null> {
  const { data, error } = await db().select('*').eq('id', id).single();
  if (error || !data) return null;
  return data as OnboardingRow;
}

export async function uploadOnboardingPdf(
  formData: FormData,
): Promise<{ signedUrl: string } | { error: string }> {
  const file = formData.get('pdf') as File | null;
  const id = formData.get('id') as string | null;
  if (!file || !id) return { error: 'Arquivo ou ID inválido' };

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = `${id}/apresentacao.pdf`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from('onboarding-pdfs')
    .upload(path, buffer, { contentType: 'application/pdf', upsert: true });

  if (uploadError) return { error: uploadError.message };

  await db().update({ pdf_path: path }).eq('id', id);

  const { data: signed } = await supabaseAdmin.storage
    .from('onboarding-pdfs')
    .createSignedUrl(path, 60 * 60 * 24 * 7); // 7 dias

  return { signedUrl: signed?.signedUrl ?? '' };
}

export async function getOnboardingPdfUrl(
  pdfPath: string,
): Promise<{ signedUrl: string } | { error: string }> {
  const { data, error } = await supabaseAdmin.storage
    .from('onboarding-pdfs')
    .createSignedUrl(pdfPath, 60 * 60 * 24); // 24h

  if (error || !data) return { error: error?.message ?? 'Erro ao gerar URL' };
  return { signedUrl: data.signedUrl };
}

export async function getOnboardingPdfUploadUrl(
  id: string,
): Promise<{ uploadUrl: string; path: string } | { error: string }> {
  const path = `${id}/apresentacao.pdf`;
  const { data, error } = await supabaseAdmin.storage
    .from('onboarding-pdfs')
    .createSignedUploadUrl(path);

  if (error || !data) return { error: error?.message ?? 'Erro ao gerar URL de upload' };
  return { uploadUrl: data.signedUrl, path };
}

export async function confirmPdfUpload(id: string): Promise<{ success: true } | { error: string }> {
  const path = `${id}/apresentacao.pdf`;
  const { error } = await db().update({ pdf_path: path }).eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}
