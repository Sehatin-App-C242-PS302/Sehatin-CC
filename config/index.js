require('dotenv').config();

module.exports = {
  db: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  jwtSecret: process.env.JWT_SECRET,
  server: {
    port: process.env.PORT || 3000,
  },
};
