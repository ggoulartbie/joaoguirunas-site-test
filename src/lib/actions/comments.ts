'use server'

// TODO F4.1: implementar com Supabase quando F2.3 (auth) estiver pronto
// Todas as actions validam has_access() antes de escrever

export async function addComment(
  _lessonId: string,
  _content: string,
  _parentCommentId?: string
): Promise<{ success: boolean; error?: string }> {
  // 1. requireUser() — redireciona se não autenticado
  // 2. has_access(userId, lessonId) — 403 se sem acesso
  // 3. INSERT em comments
  return { success: true }
}

export async function editComment(
  commentId: string,
  content: string
): Promise<{ success: boolean; error?: string }> {
  // 1. requireUser()
  // 2. Verificar author_id === userId
  // 3. Verificar created_at + 30min > now() — janela de edição
  // 4. UPDATE comments SET content, updated_at
  void commentId
  void content
  return { success: true }
}

export async function deleteComment(
  commentId: string
): Promise<{ success: boolean; error?: string }> {
  // 1. requireUser()
  // 2. Se author === userId OU role ADMIN/MENTOR: soft delete (deleted_at = now())
  void commentId
  return { success: true }
}
