/**
 * Minimal .env.local loader (no dotenv dependency).
 * Reads KEY=VALUE lines, ignores comments and empty lines.
 */

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export function loadEnvLocal() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const envPath = join(__dirname, '..', '..', '.env.local');
  if (!existsSync(envPath)) {
    console.warn(`⚠ .env.local not found at ${envPath}`);
    return;
  }
  const raw = readFileSync(envPath, 'utf-8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    // Strip optional surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (key && process.env[key] === undefined) process.env[key] = val;
  }
}
