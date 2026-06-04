import { db } from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const { code } = req.query;
  try {
    const fam = await db().execute({
      sql: 'SELECT id, code, label, mesa, responded_at FROM families WHERE code = ?',
      args: [code],
    });
    if (fam.rows.length === 0) return res.status(404).json({ error: 'no encontrada' });
    const f = fam.rows[0];

    const guests = await db().execute({
      sql: 'SELECT id, nombre, apellido, rol, attendance FROM guests WHERE family_id = ? ORDER BY id',
      args: [f.id],
    });
    const msg = await db().execute({
      sql: 'SELECT body FROM messages WHERE family_id = ? ORDER BY id DESC LIMIT 1',
      args: [f.id],
    });

    return res.status(200).json({
      label: f.label,
      mesa: f.mesa,
      respondedAt: f.responded_at,
      message: msg.rows[0]?.body || '',
      guests: guests.rows,
    });
  } catch (e) {
    return res.status(500).json({ error: 'error de servidor' });
  }
}
