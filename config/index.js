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

module.exports = {
  db: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sehatin-db',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306, // Default MySQL port
    dialect: 'mysql',
  },
  server: {
    port: process.env.PORT || 3000,
  },
};


// ====
// require('dotenv').config(); // Mengambil variabel lingkungan dari file .env

// module.exports = {
//   development: {
//     username: process.env.DB_USER || 'root', // Default ke root jika tidak diatur
//     password: process.env.DB_PASSWORD || '', // Default kosong jika tidak diatur
//     database: process.env.DB_NAME || 'sehatin-db', // Nama database
//     host: process.env.DB_HOST || '127.0.0.1', // Host database
//     port: process.env.DB_PORT || 3307, // Port database
//     dialect: 'mysql', // Dialek untuk database
//   },
//   test: {
//     username: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.TEST_DB_NAME || 'test-db',
//     host: process.env.DB_HOST || '127.0.0.1',
//     port: process.env.DB_PORT || 3307,
//     dialect: 'mysql',
//   },
//   production: {
//     username: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.PROD_DB_NAME || 'prod-db',
//     host: process.env.DB_HOST || '127.0.0.1',
//     port: process.env.DB_PORT || 3307,
//     dialect: 'mysql',
//   },
// };

