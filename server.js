require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors'); // Optional: Untuk CORS

const { server } = require('./config'); // Konfigurasi server dan database

const app = express();

// Middleware
app.use(express.json()); // Parsing JSON
app.use(cors()); // Optional: Aktifkan CORS jika diperlukan

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
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
    await sequelize.sync({ alter: true }); // Gunakan `alter: true` untuk menghindari penghapusan data

    // Jalankan server
    app.listen(server.port, () => {
      console.log(`Server running on port ${server.port}`);
    });
  } catch (err) {
    console.error('Error during server startup:', err.message);
    process.exit(1); // Keluar jika ada error
  }
};

// Jalankan fungsi startServer
startServer();
