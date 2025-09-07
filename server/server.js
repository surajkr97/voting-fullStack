const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routers
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

// Use routers
app.use('/api/user', userRoutes);
app.use('/api/candidate', candidateRoutes);

// Serve React frontend
const clientBuildPath = path.join(__dirname, 'client/dist');
app.use(express.static(clientBuildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
