// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Database Connection
mongoose.connect(process.env.DATABASE_URL);

// DB Connection Events
const db = mongoose.connection;
db.on('error', (err) => console.log('Error:' + err.message));
db.on('connected', () => console.log('Connected to database.'));
db.on('disconnected', () => console.log('Disconnected from database.'));

// Create Route
app.post('/user', (req, res) => {
  res.send('Received request.');
});

// Listener
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}!`)
);
