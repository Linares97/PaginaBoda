#!/usr/bin/env node
// Genera un hash bcrypt para ADMIN_PASSWORD_HASH:  node scripts/hash-password.mjs "miClave"
import bcrypt from 'bcryptjs';
const pwd = process.argv[2];
if (!pwd) { console.error('Uso: node scripts/hash-password.mjs "tuClave"'); process.exit(1); }
console.log(bcrypt.hashSync(pwd, 10));
