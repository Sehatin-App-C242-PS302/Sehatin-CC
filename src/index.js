require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const healthRoutes = require('./routes/healthRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/health', healthRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
