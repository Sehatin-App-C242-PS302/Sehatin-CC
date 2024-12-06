require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const healthRoutes = require('./routes/health'); // ga kepake
const nutritionsRoutes = require('./routes/nutritions');
const predictionsRoutes = require('./routes/predictions');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors'); // Optional: Untuk CORS

const { server } = require('./config'); // Konfigurasi server dan database

const app = express();

app.use('/favicon.ico', express.static('path/to/favicon.ico')); //ini nyoba solve error yang favicon

// Middleware
app.use(express.json()); // Parsing JSON
app.use(express.urlencoded({ extended: true })); // nambahin agar bisa pake url encoded saat testing api (postman)
app.use(cors()); // Optional: Aktifkan CORS jika diperlukan

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/predict', nutritionsRoutes);
app.use('/api/health', healthRoutes); // ga kepake
app.use('/api/predictions', predictionsRoutes);
app.use('/api/profile', profileRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API! Sehat, sehat, sehatin" });
});

// Error Handling Middleware
app.use(errorHandler);

// Fungsi Asynchronous untuk Inisialisasi
const startServer = async () => {
  try {
    console.log('Connecting to the database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    console.log('Synchronizing database...');
    await sequelize.sync({ force: true }); // Gunakan force: true untuk membuat ulang tabel
    console.log('Database synchronized successfully.');

    // Jalankan server
    app.listen(server.port, () => {
      console.log(`Server running on port ${server.port}`);
    });
  } catch (err) {
    console.error('Error during server startup:', err.message);
    process.exit(1); // Keluar jika ada error
  }
};

// Ekspor app dan startServer untuk digunakan oleh Vercel
module.exports = app;
module.exports.startServer = startServer;
