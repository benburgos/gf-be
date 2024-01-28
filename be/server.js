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
  req.body.dateUpdated = Date.now();
  req.body.dateCreated = Date.now();
  pwk = {
    udbid: req.body._id,
    pwk: req.body.pwh,
  };

  delete req.body.pwh

  db.collection('users').insertOne(req.body, (err, res) => {
    if (err) throw err;
    console.log('New user created.');
    db.collection('pwk').insertOne(pwk, (error, res) => {
      if (error) throw error;
      console.log('Saved to database.');
    });
  });

  res.send(
    `New user ${req.body.firstName} created at ${new Date(
      req.body.dateCreated
    )}`
  );
});

// Listener
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}!`)
);
