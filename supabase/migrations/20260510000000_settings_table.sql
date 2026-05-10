CREATE TABLE IF NOT EXISTS settings (
  key   text PRIMARY KEY,
  value text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Only service role (supabaseAdmin) can access
CREATE POLICY "service_role_all" ON settings
  FOR ALL TO service_role USING (true);
