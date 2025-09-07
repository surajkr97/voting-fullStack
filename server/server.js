const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(bodyParser.json());

// Import routers
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

// Use routers
app.use('/api/user', userRoutes);
app.use('/api/candidate', candidateRoutes);

// Serve React frontend (Vite build)
const clientBuildPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));

// Fallback for React Router
app.get('*', (req, res) => {
  res.sendFile(path.resolve(clientBuildPath, 'index.html'));
});

// Start server
const port = process.env.PORT || 10000; // Render automatically provides PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
