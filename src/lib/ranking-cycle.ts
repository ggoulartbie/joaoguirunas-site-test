// Utilitário de ciclos de ranking — sem 'use server' nem 'use client', importável nos dois lados

export type RankingPeriod = 'week' | 'biweek' | 'month'

export const DAYS_BY_PERIOD: Record<RankingPeriod, number> = { week: 7, biweek: 14, month: 30 }

// Âncora do primeiro ciclo: 18/05/2026 às 00:00 BRT = 03:00 UTC
const LAUNCH_UTC_MS = Date.UTC(2026, 4, 18, 3, 0, 0)

/**
 * Retorna o intervalo do ciclo atual para o período dado.
 * O ciclo avança automaticamente a cada N dias a partir do lançamento.
 * startMs = início do ciclo atual; endMs = início do próximo ciclo (fim deste).
 */
export function getCycleRange(period: RankingPeriod): { startMs: number; endMs: number } {
  const nowMs = Date.now()
  const periodMs = DAYS_BY_PERIOD[period] * 24 * 60 * 60 * 1000
  const cycleIndex = Math.max(0, Math.floor((nowMs - LAUNCH_UTC_MS) / periodMs))
  const startMs = LAUNCH_UTC_MS + cycleIndex * periodMs
  const endMs = startMs + periodMs
  return { startMs, endMs }
}
