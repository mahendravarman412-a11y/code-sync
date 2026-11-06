
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.use('/api/auth', require('./routes/auth'));

// Code execution routes
app.use('/api/execute', require('./routes/execute'));

// Test route
app.get('/', (req, res) => {
  res.send('CodeSync Backend is Running!');
});

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully!');

    const PORT = process.env.PORT || 5001;

    app.listen(PORT, () => {
      console.log(`CodeSync Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB Connection Failed:', error.message);
  });
