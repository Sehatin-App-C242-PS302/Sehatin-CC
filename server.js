require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const healthRoutes = require('./routes/health');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors'); // Optional: Untuk CORS

const { server } = require('./config');

const app = express();

// Middleware
app.use(express.json()); // Mengganti bodyParser dengan express.json()
app.use(cors()); // Optional: Mengaktifkan CORS

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);

app.get("/", (req, res) => {
  res.json({ data: "Hello"});
});

// Error Handling Middleware
app.use(errorHandler);

// Database Connection & Server Initialization
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    
    // Sync model dengan database
    sequelize.sync({ force: false, alter: true }) // Gunakan force: false atau alter: true untuk menyesuaikan tabel tanpa menghapus data
      .then(() => {
        app.listen(server.port, () => console.log(`Server running on port ${server.port}`));
      })
      .catch((err) => {
        console.error('Error syncing the database:', err.message);
        process.exit(1); // Keluar jika gagal melakukan sinkronisasi
      });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err.message);
    process.exit(1); // Keluar jika tidak bisa terkoneksi dengan database
  });
