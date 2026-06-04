import bcrypt from 'bcryptjs';
import { signAdmin } from '../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { password } = req.body || {};
  if (!password) return res.status(400).json({ error: 'falta contraseña' });

  const hash = process.env.ADMIN_PASSWORD_HASH;
  const plain = process.env.ADMIN_PASSWORD;

  let ok = false;
  if (hash) ok = await bcrypt.compare(password, hash);
  else if (plain) ok = password === plain;

  if (!ok) return res.status(401).json({ error: 'incorrecta' });
  return res.status(200).json({ token: signAdmin() });
}
