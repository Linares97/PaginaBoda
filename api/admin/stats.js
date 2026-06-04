import { db } from '../lib/db.js';
import { requireAdmin } from '../lib/auth.js';

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  try {
    const fams = await db().execute('SELECT id, code, label, mesa, responded_at FROM families ORDER BY label COLLATE NOCASE');
    const guests = await db().execute('SELECT id, family_id, nombre, apellido, attendance FROM guests ORDER BY id');
    const msgs = await db().execute('SELECT family_id, body FROM messages ORDER BY id');

    const msgByFam = {};
    for (const m of msgs.rows) msgByFam[m.family_id] = m.body;

    const byFam = {};
    for (const g of guests.rows) (byFam[g.family_id] ||= []).push(g);

    const familias = fams.rows.map((f) => ({
      id: f.id, code: f.code, label: f.label, mesa: f.mesa,
      respondedAt: f.responded_at,
      message: msgByFam[f.id] || '',
      guests: byFam[f.id] || [],
    }));

    const att = (s) => guests.rows.filter((g) => g.attendance === s).length;
    const stats = {
      invitadosTotal: guests.rows.length,
      familiasTotal: fams.rows.length,
      familiasRespondieron: fams.rows.filter((f) => f.responded_at).length,
      confirmadosPersonas: att('ambos') + att('ceremonia') + att('recepcion'),
      asistenCeremonia: att('ambos') + att('ceremonia'),
      asistenRecepcion: att('ambos') + att('recepcion'),
      noAsisten: att('ninguno'),
      pendientes: att('pendiente'),
    };

    // por mesa
    const mesas = {};
    for (const f of familias) {
      const mesa = f.mesa || 'sin mesa';
      mesas[mesa] ||= { mesa, total: 0, confirmados: 0 };
      for (const g of f.guests) {
        mesas[mesa].total++;
        if (['ambos', 'ceremonia', 'recepcion'].includes(g.attendance)) mesas[mesa].confirmados++;
      }
    }
    const porMesa = Object.values(mesas).sort((a, b) => {
      const na = parseInt(a.mesa, 10), nb = parseInt(b.mesa, 10);
      if (isNaN(na) && isNaN(nb)) return 0;
      if (isNaN(na)) return 1;
      if (isNaN(nb)) return -1;
      return na - nb;
    });

    return res.status(200).json({ stats, porMesa, familias });
  } catch (e) {
    return res.status(500).json({ error: 'error de servidor' });
  }
}
