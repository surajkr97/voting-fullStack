const express = require('express')
const app = express()
const db = require('./db'); 
require('dotenv').config();
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = process.env.PORT || 3001; // Default to port 3001 if not specified


//Import the router files
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

//Use the routers
app.use('/api/user', userRoutes);
app.use('/api/candidate', candidateRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})