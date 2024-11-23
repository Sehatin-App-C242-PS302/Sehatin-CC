// require('dotenv').config();

// module.exports = {
//   db: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//   },
//   jwtSecret: process.env.JWT_SECRET,
//   server: {
//     port: process.env.PORT || 3307,
//   },
// };

require('dotenv').config();
const mysql2 = require('mysql2'); // ini tambahan juga

module.exports = {
  db: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sehatin-db',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3307,
    dialect: 'mysql',
    dialectModule: 'mysql2', //ini tambahan
  },
  server: {
    port: process.env.PORT || 3000,
  },
};



