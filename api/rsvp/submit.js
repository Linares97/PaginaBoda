import { db } from '../lib/db.js';

const VALID = new Set(['ambos', 'ceremonia', 'recepcion', 'ninguno']);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { code, responses, message } = req.body || {};
  if (!code || !Array.isArray(responses)) return res.status(400).json({ error: 'datos incompletos' });

  try {
    const fam = await db().execute({ sql: 'SELECT id FROM families WHERE code = ?', args: [code] });
    if (fam.rows.length === 0) return res.status(404).json({ error: 'no encontrada' });
    const familyId = fam.rows[0].id;

    // miembros válidos de esta familia (evita que se modifiquen invitados de otra)
    const members = await db().execute({ sql: 'SELECT id FROM guests WHERE family_id = ?', args: [familyId] });
    const allowed = new Set(members.rows.map((r) => Number(r.id)));
    const now = new Date().toISOString();

    for (const r of responses) {
      const gid = Number(r.id);
      const att = VALID.has(r.attendance) ? r.attendance : 'ninguno';
      if (!allowed.has(gid)) continue;
      await db().execute({
        sql: 'UPDATE guests SET attendance = ?, responded_at = ? WHERE id = ? AND family_id = ?',
        args: [att, now, gid, familyId],
      });
    }

    await db().execute({ sql: 'UPDATE families SET responded_at = ? WHERE id = ?', args: [now, familyId] });

    const msg = (message || '').trim();
    if (msg) {
      await db().execute({
        sql: 'INSERT INTO messages (family_id, body, created_at) VALUES (?, ?, ?)',
        args: [familyId, msg.slice(0, 1000), now],
      });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: 'error de servidor' });
  }
}
