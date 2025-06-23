// createAdmin.js
const bcrypt = require('bcrypt');
const db = require('./src/config/db');

async function crearAdmin() {
  const username = 'admin';
  const password = 'admin123';
  const hash = await bcrypt.hash(password, 10);

  console.log("Hash generado:", hash);

  await db.query('DELETE FROM admins WHERE username = ?', [username]);
  await db.query('INSERT INTO admins (username, password) VALUES (?, ?)', [username, hash]);

  console.log('✅ Admin creado correctamente.');
  process.exit();
}

crearAdmin();

