const bcrypt = require('bcryptjs');

const hash = '$2b$10$SUzbGMfS4TPJavTQ.tLh2O0pDKxoiuqXvgomgoYcJ/IvmyesjjBlm';
const password = 'Admin@MDN2024';

async function check() {
  const result = await bcrypt.compare(password, hash);
  console.log('Password match:', result);
}
check();
