#!/usr/bin/env node
/**
 * Parses the 37 Claude Agent Teams .md files into a typed JSON dataset.
 *
 * Source: /Users/joaoramos/Desktop/Projetos/Centro de Treinamento/claude/.claude/agents/
 * Output: src/data/agentes/agentes.json
 *
 * Run: node scripts/parse-agentes.mjs
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE = '/Users/joaoramos/Desktop/Projetos/Centro de Treinamento/claude/.claude/agents';
const OUTPUT = join(__dirname, '..', 'src', 'data', 'agentes', 'agentes.json');

if (!existsSync(SOURCE)) {
  console.error(`Source folder not found: ${SOURCE}`);
  process.exit(1);
}

// ── Minimal YAML frontmatter parser (handles only the shapes we use) ─────────
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return { frontmatter: {}, body: raw };
  const fm = {};
  let key = null;
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const kv = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/);
    if (kv) {
      key = kv[1];
      const val = kv[2].trim();
      if (val === '') {
        fm[key] = [];
      } else {
        fm[key] = val;
      }
    } else if (key && line.startsWith('  ')) {
      // crude nested handling — we don't need it for the fields we read
    }
  }
  return { frontmatter: fm, body: raw.slice(m[0].length) };
}

// ── Extract persona codename + archetype from body ───────────────────────────
// Pattern: after "---" boilerplate, find first "# {Codename} — {Title}"
// then the next "Você é **{Codename}**. Como {Archetype} — {tagline}"
function parsePersona(body) {
  const heading = body.match(/^#\s+([^—\n]+?)\s*[—-]\s*(.+)$/m);
  const codename = heading?.[1]?.trim() ?? null;
  const titleAfterDash = heading?.[2]?.trim() ?? null;

  // Archetype + tagline from "Como {X} — {tagline}" or first persona paragraph
  let archetype = null;
  let tagline = null;
  const archLine = body.match(/Como\s+([^—\n.]+?)\s*[—-]\s*([^\n]+)/);
  if (archLine) {
    archetype = archLine[1].trim().replace(/[".]+$/, '');
    tagline = archLine[2].trim().replace(/^["']|["']$/g, '');
  }

  // Identidade: "## Identidade {race}" — extract the race/civilization name
  let race = null;
  const idHeader = body.match(/##\s+Identidade\s+([A-Za-zÀ-ú]+)/);
  if (idHeader) race = idHeader[1].trim();

  return { codename, titleAfterDash, archetype, tagline, race };
}

// ── Extract exclusive authorities (Autoridades exclusivas: lines/list) ───────
function parseAuthorities(body) {
  const sec = body.match(/\*\*Autoridades exclusivas:\*\*\s*\n([\s\S]*?)(?=\n\n|\n#|\n---)/);
  if (!sec) return [];
  return sec[1]
    .split('\n')
    .map((l) => l.replace(/^[-*]\s+/, '').trim())
    .filter((l) => l.length > 3);
}

// ── Squad metadata (palette + persona-thematic info) ─────────────────────────
const SQUADS = {
  dev: {
    id: 'dev',
    label: 'Dev',
    title: 'Dev Squad',
    description: 'Software de produto. Da arquitetura ao deploy — 10 agentes que cobrem o ciclo completo.',
    accent: '#A78BFA',
    accentName: 'violet',
    heroBg: 'rgba(167, 139, 250, 0.08)',
  },
  sites: {
    id: 'sites',
    label: 'Sites',
    title: 'Sites Squad',
    description: 'Sites e LPs com Next.js. Espelha a Dev squad mas tunada para SEO, CRO e Core Web Vitals.',
    accent: '#FF3A0E',
    accentName: 'ember',
    heroBg: 'rgba(255, 58, 14, 0.08)',
  },
  social: {
    id: 'social',
    label: 'Social',
    title: 'Social Squad',
    description: 'Conteúdo e redes. Da pesquisa de tendência ao publish — Vera valida tudo antes de subir.',
    accent: '#EC4899',
    accentName: 'pink',
    heroBg: 'rgba(236, 72, 153, 0.08)',
  },
  traffic: {
    id: 'traffic',
    label: 'Traffic',
    title: 'Traffic Squad',
    description: 'Mídia paga cross-platform. Google + Meta + TikTok com QA pré-launch e BI oficial.',
    accent: '#06B6D4',
    accentName: 'cyan',
    heroBg: 'rgba(6, 182, 212, 0.08)',
  },
};

// ── Main ─────────────────────────────────────────────────────────────────────
const files = readdirSync(SOURCE).filter((f) => f.endsWith('.md'));
const agentes = [];

for (const file of files) {
  const raw = readFileSync(join(SOURCE, file), 'utf-8');
  const { frontmatter, body } = parseFrontmatter(raw);

  const id = frontmatter.name;
  if (!id) {
    console.warn(`Skipping ${file} — no name in frontmatter`);
    continue;
  }

  const squadId = id.split('-')[0];
  if (!SQUADS[squadId]) {
    console.warn(`Skipping ${file} — unknown squad "${squadId}"`);
    continue;
  }

  const persona = parsePersona(body);
  const authorities = parseAuthorities(body);
  const tools = (frontmatter.tools || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  agentes.push({
    id,
    squad: squadId,
    name: id,
    codename: persona.codename ?? null,
    title: persona.titleAfterDash ?? null,
    description: frontmatter.description ?? '',
    archetype: persona.archetype ?? null,
    tagline: persona.tagline ?? null,
    race: persona.race ?? null,
    model: frontmatter.model ?? 'sonnet',
    color: frontmatter.color ?? null,
    tools,
    authorities,
    slug: id,
  });
}

// Sort: by squad order, then alphabetical within squad
const SQUAD_ORDER = ['dev', 'sites', 'social', 'traffic'];
agentes.sort((a, b) => {
  const sa = SQUAD_ORDER.indexOf(a.squad);
  const sb = SQUAD_ORDER.indexOf(b.squad);
  if (sa !== sb) return sa - sb;
  return a.id.localeCompare(b.id);
});

// Group counts
const counts = {};
for (const a of agentes) counts[a.squad] = (counts[a.squad] || 0) + 1;

const dataset = {
  generatedAt: new Date().toISOString(),
  total: agentes.length,
  squads: SQUAD_ORDER.map((s) => ({ ...SQUADS[s], count: counts[s] || 0 })),
  agentes,
};

writeFileSync(OUTPUT, JSON.stringify(dataset, null, 2), 'utf-8');

console.log(`✓ Parsed ${agentes.length} agentes`);
for (const s of SQUAD_ORDER) {
  console.log(`  ${SQUADS[s].label.padEnd(8)} ${counts[s] || 0}`);
}
console.log(`✓ Output: ${OUTPUT}`);
