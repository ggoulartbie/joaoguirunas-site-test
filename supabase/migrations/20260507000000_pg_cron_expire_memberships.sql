-- AC1: pg_cron schedule for expire_memberships (SQL-only, no Edge Function needed)
-- Runs daily at 06:00 UTC — same cadence as old Vercel cron

-- Enable pg_cron extension (already enabled in Supabase cloud projects)
create extension if not exists pg_cron;

-- Enable pg_net for HTTP calls from pg_cron (needed for Edge Function triggers)
create extension if not exists pg_net;

-- Schedule 1: Expire memberships via pure SQL (AC1)
select cron.schedule(
  'expire-memberships',     -- job name
  '0 6 * * *',             -- daily at 06:00 UTC
  $$
    update cohort_members
    set status = 'EXPIRED'
    where status = 'ACTIVE'
      and expires_at < now();
  $$
);

-- Schedule 2: Trigger cron-daily Edge Function (AC2 + AC3 + 24h live session reminders)
-- Edge Function handles email tasks that can't run as pure SQL
select cron.schedule(
  'cron-daily-edge',
  '5 6 * * *',             -- 06:05 UTC — runs after expire-memberships settles
  $$
    select net.http_post(
      url := current_setting('app.supabase_functions_url') || '/cron-daily',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.service_role_key')
      ),
      body := '{}'::jsonb
    );
  $$
);

-- Schedule 3: Trigger cron-hourly Edge Function (AC4 — 1h live session reminders)
select cron.schedule(
  'cron-hourly-edge',
  '0 * * * *',             -- every hour
  $$
    select net.http_post(
      url := current_setting('app.supabase_functions_url') || '/cron-hourly',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.service_role_key')
      ),
      body := '{}'::jsonb
    );
  $$
);
