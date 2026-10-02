require('dotenv').config();
const basicAuth = require('express-basic-auth');

// Parsed once at process startup. Format: username:password,username2:password2
function parseAdminUsers(raw) {
  const users = {};
  if (raw == null || String(raw).trim() === '') return users;

  for (const part of String(raw).split(',')) {
    const entry = part.trim();
    if (!entry) continue;
    const sep = entry.indexOf(':');
    if (sep <= 0) continue;
    const username = entry.slice(0, sep).trim();
    const password = entry.slice(sep + 1);
    if (!username || password.length === 0) continue;
    users[username] = password;
  }

  return users;
}

const users = parseAdminUsers(process.env.ADMIN_USERS);

function adminNotConfigured(_req, res) {
  res.status(503).type('text/plain').send('admin not configured');
}

if (Object.keys(users).length === 0) {
  console.warn('ADMIN_USERS is unset or empty; admin routes will return 503');
}

const adminAuth = Object.keys(users).length === 0
  ? adminNotConfigured
  : basicAuth({
      users,
      challenge: true,
      realm: 'D1 Staff Audit Admin',
    });

module.exports = adminAuth;
