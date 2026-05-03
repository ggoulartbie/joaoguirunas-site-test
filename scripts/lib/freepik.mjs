/**
 * Freepik API helper — Mystic image generation + polling + download.
 *
 * Reads FREEPIK_API_KEY from process.env (load via dotenv before calling).
 *
 * Usage:
 *   import { generateMystic } from './lib/freepik.mjs';
 *   const url = await generateMystic({ prompt, aspectRatio: 'square_1_1' });
 *   await downloadImage(url, '/path/to/output.png');
 */

import { writeFile } from 'node:fs/promises';

const API_BASE = 'https://api.freepik.com';

function getApiKey() {
  const key = process.env.FREEPIK_API_KEY;
  if (!key) throw new Error('FREEPIK_API_KEY not set. Add it to .env.local');
  return key;
}

async function freepikFetch(path, init = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'x-freepik-api-key': getApiKey(),
      'content-type': 'application/json',
      ...init.headers,
    },
  });
  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = text;
  }
  if (!res.ok) {
    const errMsg = typeof body === 'object' ? JSON.stringify(body) : body;
    throw new Error(`Freepik ${path} HTTP ${res.status}: ${errMsg}`);
  }
  return body;
}

/**
 * POST /v1/ai/mystic — start a Mystic generation. Returns { task_id }.
 * Aspect ratios: square_1_1, portrait_2_3, portrait_3_4, portrait_9_16,
 *                landscape_3_2, landscape_4_3, landscape_16_9, widescreen_21_9
 */
export async function startMysticTask({
  prompt,
  aspectRatio = 'square_1_1',
  model = 'realism',
  resolution = '2k',
}) {
  const body = {
    prompt,
    aspect_ratio: aspectRatio,
    model,
    resolution,
  };
  const res = await freepikFetch('/v1/ai/mystic', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  // API returns either { data: { task_id, status } } or { task_id, status } depending on version
  const taskId = res?.data?.task_id ?? res?.task_id;
  if (!taskId) throw new Error(`Mystic start: no task_id in response — ${JSON.stringify(res)}`);
  return taskId;
}

/**
 * GET /v1/ai/mystic/{task_id} — poll until status === 'COMPLETED' (or FAILED).
 * Returns the first image URL on success.
 */
export async function pollMysticTask(taskId, { intervalMs = 4000, maxAttempts = 90 } = {}) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const res = await freepikFetch(`/v1/ai/mystic/${taskId}`);
    const data = res?.data ?? res;
    const status = data?.status;
    if (status === 'COMPLETED') {
      const url = data?.generated?.[0] ?? data?.images?.[0]?.url ?? data?.image_url;
      if (!url) throw new Error(`Mystic ${taskId} COMPLETED but no URL — ${JSON.stringify(data)}`);
      return url;
    }
    if (status === 'FAILED' || status === 'ERROR') {
      throw new Error(`Mystic ${taskId} FAILED — ${JSON.stringify(data)}`);
    }
    // CREATED / IN_PROGRESS — keep polling
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  throw new Error(`Mystic ${taskId} timed out after ${maxAttempts * intervalMs}ms`);
}

/**
 * High-level: generate a Mystic image and return the result URL.
 */
export async function generateMystic(params) {
  const taskId = await startMysticTask(params);
  return await pollMysticTask(taskId);
}

/**
 * Download a remote image to a local file path.
 */
export async function downloadImage(url, outPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download HTTP ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(outPath, buf);
  return buf.length;
}

/**
 * Sanity check — pings the LoRAs endpoint to verify auth.
 */
export async function ping() {
  const res = await freepikFetch('/v1/ai/loras');
  const count = res?.data?.default?.length ?? 0;
  return { ok: true, defaultLoras: count };
}
