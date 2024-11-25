require('dotenv').config();

const config = {
  db: {
    username: process.env.DB_USER || 'avnadmin',
    password: process.env.DB_PASSWORD || 'AVNS_rN_y8dcYawia_QxZKhP',
    database: process.env.DB_NAME || 'defaultdb',
    host: process.env.DB_HOST || 'mysql-sehatin-sehatin-cc.b.aivencloud.com',
    port: process.env.DB_PORT || 14744,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // Dibutuhkan untuk koneksi aman ke Aiven
      },
    },
  },
  server: {
    port: process.env.PORT || 3000, // Port aplikasi
  },
};

module.exports = config;
