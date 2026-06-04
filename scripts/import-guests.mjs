#!/usr/bin/env node
/**
 * Importador de invitados.
 *
 * Lee el Excel exportado del planner, agrupa por la columna "Familia"
 * (los invitados sin familia se vuelven una invitación individual),
 * genera un código único por invitación y siembra la base Turso/libSQL.
 *
 * Uso:
 *   node scripts/import-guests.mjs <ruta-al-excel> [--reset]
 *
 * Variables de entorno (.env):
 *   TURSO_DATABASE_URL   (ej. file:./wedding.db  para local, o libsql://... para Turso)
 *   TURSO_AUTH_TOKEN     (solo para Turso remoto)
 *   SITE_URL             (base para los links, ej. https://boda.linareschacon.com)
 *
 * Salida:
 *   - Tablas families/guests sembradas
 *   - scripts/invitaciones.csv  con: code, etiqueta, integrantes, mesa, link
 */
import { createClient } from '@libsql/client';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx'); // build CJS expone readFile/utils
const __dirname = dirname(fileURLToPath(import.meta.url));

// --- env mínima (sin dependencia de dotenv) ---
try {
  const env = readFileSync(resolve(__dirname, '../.env'), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch { /* sin .env, usamos defaults */ }

const EXCEL_PATH = process.argv[2];
const RESET = process.argv.includes('--reset');
const SITE_URL = (process.env.SITE_URL || 'https://TU-DOMINIO.com').replace(/\/$/, '');
const DB_URL = process.env.TURSO_DATABASE_URL || 'file:./wedding.db';

if (!EXCEL_PATH) {
  console.error('Falta la ruta al Excel.\n  node scripts/import-guests.mjs <archivo.xls> [--reset]');
  process.exit(1);
}

const VALID_ROLES = new Set([
  'groom', 'bride', 'close-friend', 'relative', 'close-relative',
  'best-man', 'maid-of-honor', 'friend', 'partner', 'parent',
]);

function slugify(str) {
  return (str || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')   // quita acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 24) || 'invitacion';
}

function readGuests(path) {
  const wb = XLSX.readFile(path);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, blankrows: false, defval: '' });

  // localizar la fila de encabezado ("Quién")
  let headerIdx = rows.findIndex((r) => String(r[0]).trim() === 'Quién');
  if (headerIdx === -1) headerIdx = 3;
  const data = rows.slice(headerIdx + 1);

  const guests = [];
  for (const r of data) {
    const rol = String(r[0] || '').trim();
    const nombre = String(r[1] || '').trim();
    const apellido = String(r[2] || '').trim();
    const familia = String(r[3] || '').trim();
    const mesa = String(r[4] || '').trim();
    if (!VALID_ROLES.has(rol)) continue;          // descarta filas de resumen / basura
    if (!nombre && !apellido) continue;           // descarta filas sin nombre
    guests.push({ rol, nombre, apellido, familia, mesa });
  }
  return guests;
}

function groupFamilies(guests) {
  const groups = new Map();
  for (const g of guests) {
    const key = g.familia ? `fam:${g.familia}` : `solo:${g.nombre} ${g.apellido}`;
    if (!groups.has(key)) {
      groups.set(key, {
        label: g.familia || `${g.nombre} ${g.apellido}`.trim(),
        mesa: g.mesa,
        members: [],
      });
    }
    groups.get(key).members.push(g);
  }
  // código único y estable por grupo
  const used = new Set();
  for (const [key, grp] of groups) {
    const hash = createHash('sha256').update(key).digest('hex').slice(0, 4);
    let code = `${slugify(grp.label)}-${hash}`;
    while (used.has(code)) code = `${slugify(grp.label)}-${createHash('sha256').update(code).digest('hex').slice(0, 4)}`;
    used.add(code);
    grp.code = code;
    if (!grp.mesa) grp.mesa = grp.members.find((m) => m.mesa)?.mesa || '';
  }
  return [...groups.values()];
}

async function main() {
  const guests = readGuests(EXCEL_PATH);
  const families = groupFamilies(guests);
  const db = createClient({ url: DB_URL, authToken: process.env.TURSO_AUTH_TOKEN });

  // esquema
  const schema = readFileSync(resolve(__dirname, '../db/schema.sql'), 'utf8');
  for (const stmt of schema.split(';').map((s) => s.trim()).filter(Boolean)) {
    await db.execute(stmt);
  }

  if (RESET) {
    await db.execute('DELETE FROM messages');
    await db.execute('DELETE FROM guests');
    await db.execute('DELETE FROM families');
  }

  let famCount = 0, guestCount = 0;
  for (const fam of families) {
    const res = await db.execute({
      sql: 'INSERT INTO families (code, label, mesa) VALUES (?, ?, ?)',
      args: [fam.code, fam.label, fam.mesa || null],
    });
    const familyId = Number(res.lastInsertRowid);
    famCount++;
    for (const m of fam.members) {
      await db.execute({
        sql: 'INSERT INTO guests (family_id, nombre, apellido, rol) VALUES (?, ?, ?, ?)',
        args: [familyId, m.nombre, m.apellido || null, m.rol],
      });
      guestCount++;
    }
  }

  // CSV de links para repartir por WhatsApp
  const csv = [['code', 'etiqueta', 'integrantes', 'mesa', 'link'].join(',')];
  for (const fam of families.sort((a, b) => a.label.localeCompare(b.label, 'es'))) {
    const names = fam.members.map((m) => `${m.nombre} ${m.apellido}`.trim()).join(' / ');
    const row = [
      fam.code,
      `"${fam.label.replace(/"/g, '""')}"`,
      `"${names.replace(/"/g, '""')}"`,
      fam.mesa || '',
      `${SITE_URL}/rsvp/${fam.code}`,
    ];
    csv.push(row.join(','));
  }
  const outPath = resolve(__dirname, 'invitaciones.csv');
  writeFileSync(outPath, csv.join('\n'), 'utf8');

  console.log(`✓ ${famCount} invitaciones / ${guestCount} invitados importados a ${DB_URL}`);
  console.log(`✓ Links escritos en ${outPath}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
