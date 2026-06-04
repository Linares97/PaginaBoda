import * as XLSX from 'xlsx';
import { db } from '../lib/db.js';
import { requireAdmin } from '../lib/auth.js';

const LABEL = { ambos: 'Ambos', ceremonia: 'Solo ceremonia', recepcion: 'Solo recepción', ninguno: 'No asiste', pendiente: 'Pendiente' };

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  try {
    const rows = await db().execute(`
      SELECT f.label AS familia, f.mesa, f.code, f.responded_at,
             g.nombre, g.apellido, g.rol, g.attendance,
             (SELECT body FROM messages m WHERE m.family_id = f.id ORDER BY m.id DESC LIMIT 1) AS mensaje
      FROM guests g JOIN families f ON f.id = g.family_id
      ORDER BY f.label COLLATE NOCASE, g.id
    `);

    const data = rows.rows.map((r) => ({
      Invitación: r.familia,
      Mesa: r.mesa || '',
      Nombre: r.nombre,
      Apellido: r.apellido || '',
      Estado: LABEL[r.attendance] || r.attendance,
      Respondió: r.responded_at ? 'Sí' : 'No',
      Mensaje: r.mensaje || '',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    ws['!cols'] = [{ wch: 20 }, { wch: 6 }, { wch: 16 }, { wch: 16 }, { wch: 16 }, { wch: 10 }, { wch: 40 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Confirmaciones');
    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="confirmaciones-boda.xlsx"');
    return res.status(200).send(buf);
  } catch (e) {
    return res.status(500).json({ error: 'error de servidor' });
  }
}
