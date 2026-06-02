'use client';

import { useCallback, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { OnboardingRow } from '@/lib/actions/onboarding';
import { createOnboarding, deleteOnboarding, getOnboardingPdfUrl } from '@/lib/actions/onboarding';
import { buildPrompt } from './[id]/OnboardingFormClient';

const EMBER = '#FF3A0E';
const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.65rem',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  fontWeight: 600,
};

function rowToAnswers(row: OnboardingRow): Record<string, string> {
  return {
    perfil_nome: row.nome || '',
    perfil_profissao: row.profissao || '',
    perfil_empresa: row.empresa || '',
    perfil_segmento: row.segmento || '',
    perfil_cidade: row.cidade || '',
    perfil_linkedin: row.linkedin || '',
    obj_1: row.obj_1 || '',
    obj_2: row.obj_2 || '',
    obj_3: row.obj_3 || '',
    obj_4: row.obj_4 || '',
    ctx_1: row.ctx_1 || '',
    ctx_2: row.ctx_2 || '',
    ctx_3: row.ctx_3 || '',
    ctx_4: row.ctx_4 || '',
    proj_nome: row.proj_nome || '',
    proj_problema: row.proj_problema || '',
    proj_publico: row.proj_publico || '',
    proj_tools: row.proj_tools || '',
    proj_resultado: row.proj_resultado || '',
    planejamento: row.planejamento || '',
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

function StatusBadge({ status }: { status: string }) {
  const concluido = status === 'concluido';
  return (
    <span
      style={{
        ...MONO,
        fontSize: '0.55rem',
        padding: '3px 10px',
        color: concluido ? '#34D399' : 'rgba(255,180,60,0.8)',
        border: `1px solid ${concluido ? 'rgba(52,211,153,0.25)' : 'rgba(255,180,60,0.2)'}`,
        background: concluido ? 'rgba(52,211,153,0.06)' : 'rgba(255,180,60,0.06)',
        whiteSpace: 'nowrap',
      }}
    >
      {concluido ? 'Concluído' : 'Em andamento'}
    </span>
  );
}

function CopyButton({ row }: { row: OnboardingRow }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const prompt = buildPrompt(rowToAnswers(row));
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [row]);

  return (
    <button
      onClick={handleCopy}
      title="Copiar prompt"
      className="transition-opacity hover:opacity-70 active:scale-95"
      style={{
        ...MONO,
        fontSize: '0.55rem',
        padding: '5px 12px',
        color: copied ? '#34D399' : 'rgba(255,255,255,0.45)',
        border: `1px solid ${copied ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.1)'}`,
        background: copied ? 'rgba(52,211,153,0.06)' : 'transparent',
        transition: 'all 0.2s',
      }}
    >
      {copied ? '✓ Copiado' : 'Copiar prompt'}
    </button>
  );
}

function PdfDownloadButton({ pdfPath }: { pdfPath: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    setLoading(true);
    const result = await getOnboardingPdfUrl(pdfPath);
    setLoading(false);
    if ('error' in result) return;
    window.open(result.signedUrl, '_blank');
  }, [pdfPath]);

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      title="Baixar PDF"
      className="transition-opacity hover:opacity-70 disabled:opacity-40"
      style={{
        ...MONO, fontSize: '0.55rem', padding: '5px 12px',
        color: 'rgba(129,140,248,0.8)', border: '1px solid rgba(129,140,248,0.25)', background: 'rgba(129,140,248,0.06)',
      }}
    >
      {loading ? '…' : 'PDF ↗'}
    </button>
  );
}

function DeleteButton({ id, onDeleted }: { id: string; onDeleted: () => void }) {
  const [confirm, setConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (confirm) {
    return (
      <div className="flex items-center gap-1.5">
        <span style={{ ...MONO, fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)' }}>Confirmar?</span>
        <button
          onClick={() => {
            startTransition(async () => {
              await deleteOnboarding(id);
              onDeleted();
            });
          }}
          disabled={isPending}
          style={{
            ...MONO, fontSize: '0.55rem', padding: '5px 10px',
            color: '#f87171', border: '1px solid rgba(248,113,113,0.3)', background: 'rgba(248,113,113,0.06)',
          }}
          className="transition-opacity hover:opacity-70"
        >
          {isPending ? '…' : 'Sim'}
        </button>
        <button
          onClick={() => setConfirm(false)}
          style={{
            ...MONO, fontSize: '0.55rem', padding: '5px 10px',
            color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)',
          }}
          className="transition-opacity hover:opacity-70"
        >
          Não
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirm(true)}
      title="Excluir"
      style={{
        ...MONO, fontSize: '0.55rem', padding: '5px 12px',
        color: 'rgba(255,100,100,0.5)', border: '1px solid rgba(255,100,100,0.12)',
      }}
      className="transition-opacity hover:opacity-70"
    >
      Excluir
    </button>
  );
}

export function OnboardingListClient({ initialRecords }: { initialRecords: OnboardingRow[] }) {
  const router = useRouter();
  const [records, setRecords] = useState(initialRecords);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    setCreating(true);
    setCreateError('');
    const result = await createOnboarding(name);
    if ('error' in result) {
      setCreateError(result.error);
      setCreating(false);
      return;
    }
    router.push(`/mentoria/onboarding/${result.id}`);
  }, [newName, router]);

  const handleDeleted = useCallback((id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#08080C', color: '#fff' }}>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div
        className="px-6 sm:px-10 lg:px-16 py-8 sm:py-10"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <a href="/mentoria" style={{ ...MONO, color: 'rgba(255,255,255,0.25)', fontSize: '0.6rem' }} className="transition-opacity hover:opacity-70">
              ← Mentoria
            </a>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="mb-2" style={{ ...MONO, color: `${EMBER}b0`, fontSize: '0.6rem' }}>Mentoria Claude Code + IA</p>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl text-white"
                style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.03em' }}
              >
                Onboardings
              </h1>
              <p className="mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {records.length} {records.length === 1 ? 'mentorado' : 'mentorados'}
              </p>
            </div>

            <button
              onClick={() => {
                setShowNew(true);
                setTimeout(() => inputRef.current?.focus(), 80);
              }}
              className="inline-flex items-center gap-2 transition-all hover:brightness-110 active:scale-[0.98] flex-shrink-0"
              style={{ background: EMBER, color: '#08080C', padding: '12px 24px', ...MONO, fontSize: '0.7rem' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Novo Onboarding
            </button>
          </div>
        </div>
      </div>

      {/* ── New onboarding form ───────────────────────────────────── */}
      <AnimatePresence>
        {showNew && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}
          >
            <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-6">
              <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <div className="flex-1 p-4" style={{ border: `1px solid ${EMBER}35`, background: `${EMBER}06` }}>
                  <p className="mb-1.5" style={{ ...MONO, color: `${EMBER}99`, fontSize: '0.6rem' }}>Nome do mentorado</p>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Ex: Maria Silva"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full outline-none bg-transparent text-white placeholder:text-white/20"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', caretColor: EMBER }}
                    disabled={creating}
                  />
                </div>
                <div className="flex gap-2 items-stretch">
                  <button
                    type="submit"
                    disabled={creating || !newName.trim()}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-40"
                    style={{ background: EMBER, color: '#08080C', padding: '12px 20px', ...MONO, fontSize: '0.65rem', minWidth: 120 }}
                  >
                    {creating ? 'Criando…' : 'Criar →'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowNew(false); setNewName(''); setCreateError(''); }}
                    style={{ padding: '12px 16px', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }}
                    className="transition-opacity hover:opacity-70"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </form>
              {createError && (
                <p className="mt-2 text-xs" style={{ color: '#f87171', fontFamily: 'var(--font-mono)' }}>{createError}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── List ─────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-8">
        {records.length === 0 ? (
          <div className="py-24 text-center">
            <p style={{ ...MONO, color: 'rgba(255,255,255,0.18)', fontSize: '0.7rem' }}>Nenhum onboarding ainda</p>
            <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Clique em &ldquo;Novo Onboarding&rdquo; para começar
            </p>
          </div>
        ) : (
          <div style={{ border: '1px solid rgba(255,255,255,0.07)', overflowX: 'auto' }}>
            {/* Table header */}
            <div
              className="grid px-6 py-3"
              style={{ gridTemplateColumns: '1fr 140px 110px 70px 1fr', minWidth: 640, ...MONO, fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.02)' }}
            >
              <span>Nome</span>
              <span>Empresa</span>
              <span>Status</span>
              <span>Data</span>
              <span>Ações</span>
            </div>

            {/* Rows */}
            <AnimatePresence initial={false}>
              {records.map((row) => (
                <motion.div
                  key={row.id}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  transition={{ duration: 0.2 }}
                  className="grid px-6 py-3 transition-colors hover:bg-white/[0.015]"
                  style={{ gridTemplateColumns: '1fr 140px 110px 70px 1fr', minWidth: 640, alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {/* Nome */}
                  <div className="flex items-center gap-2 min-w-0">
                    <a
                      href={`/mentoria/onboarding/${row.id}`}
                      className="text-white font-medium hover:text-[#FF3A0E] transition-colors truncate"
                      style={{ fontSize: '0.9rem', letterSpacing: '-0.01em' }}
                    >
                      {row.nome || '(sem nome)'}
                    </a>
                    {row.profissao && (
                      <span style={{ ...MONO, fontSize: '0.5rem', color: 'rgba(255,255,255,0.2)' }} className="truncate hidden lg:block">{row.profissao}</span>
                    )}
                  </div>

                  {/* Empresa */}
                  <span className="truncate" style={{ ...MONO, fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)' }}>
                    {row.empresa || '—'}
                  </span>

                  {/* Status */}
                  <div><StatusBadge status={row.status} /></div>

                  {/* Data */}
                  <span style={{ ...MONO, fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)' }}>
                    {formatDate(row.created_at)}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <a
                      href={`/mentoria/onboarding/${row.id}`}
                      style={{
                        ...MONO, fontSize: '0.55rem', padding: '5px 10px',
                        color: EMBER, border: `1px solid ${EMBER}30`, background: `${EMBER}08`,
                      }}
                      className="transition-opacity hover:opacity-70 whitespace-nowrap"
                    >
                      Editar
                    </a>
                    <CopyButton row={row} />
                    {row.pdf_path && <PdfDownloadButton pdfPath={row.pdf_path} />}
                    <DeleteButton id={row.id} onDeleted={() => handleDeleted(row.id)} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
