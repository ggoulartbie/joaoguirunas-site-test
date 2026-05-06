-- Idempotência: cron horário seta este campo após enviar lembrete de 1h
alter table public.live_sessions
  add column if not exists reminder_1h_sent_at timestamptz;
