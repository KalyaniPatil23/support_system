const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', apiRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
