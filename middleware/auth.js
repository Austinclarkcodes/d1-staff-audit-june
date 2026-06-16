const basicAuth = require('express-basic-auth');

const adminAuth = basicAuth({
  users: {
    'austinclark': 'austinclark',
    'heathstegall': 'heathstegall',
    'carlynormandeau': 'carlynormandeau',
  },
  challenge: true,
  realm: 'D1 Staff Audit Admin',
});

module.exports = adminAuth;
