

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Authentication routes
app.use('/api/auth', require('./routes/auth'));

// Code execution routes
app.use('/api/execute', require('./routes/execute'));

// Test route
app.get('/', (req, res) => {
  res.send('CodeSync Backend is Running!');
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'CodeSync server is healthy'
  });
});

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully!');

    const PORT = process.env.PORT || 5001;

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`CodeSync Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB Connection Failed:', error.message);
    process.exit(1);
  });
