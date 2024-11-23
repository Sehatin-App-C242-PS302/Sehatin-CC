require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');

const { server } = require('./config');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

// Error Handling Middleware
app.use(errorHandler);

sequelize.sync({ force: false }).then(() => {
  app.listen(server.port, () => console.log(`Server running on port ${server.port}`));
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err.message);
  });

