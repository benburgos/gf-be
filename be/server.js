// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Middleware
app.use(express.json());

// Route Dependencies
const User = require('./models/user.js');
const pwi = require('./models/pwi.js');

// Database Connection
mongoose.connect(process.env.DATABASE_URL);

// DB Connection Events
const db = mongoose.connection;
db.on('error', (err) => console.log('Error:' + err.message));
db.on('connected', () => console.log('Connected to database.'));
db.on('disconnected', () => console.log('Disconnected from database.'));

// Routes / Controllers
// Create Route
app.post('/users', (req, res) => {
  User.create(req.body, (error, createdUser) => {
    res.json(createdUser)
  })
});

// Get Route (Single)
app.get('/users/:id', (req, res) => {});

// Get Route (All)
app.get('/users', (req, res) => {});

// Listener
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}!`)
);
