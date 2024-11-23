'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config').db;

const basename = path.basename(__filename);
const db = {};

// Membuat koneksi Sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port, // Menambahkan port jika diperlukan
    dialect: config.dialect,
    logging: console.log, // Anda dapat menonaktifkan log query dengan `false`
  }
);

// Membaca semua file model di folder models
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && // Mengabaikan file tersembunyi
      file !== basename && // Mengabaikan file ini sendiri
      file.slice(-3) === '.js' // Hanya membaca file dengan ekstensi .js
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // Menambahkan model ke dalam objek db
  });

// Menyambungkan relasi antar model, jika ada
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // Memanggil metode associate jika tersedia
  }
});

// Menambahkan sequelize instance dan library ke objek db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
