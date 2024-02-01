// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const db = require('./config/db.js')

// Middleware
app.use(express.json());

// Route Dependencies
const User = require('./models/user.js');

// Routes / Controllers
// Create Route
app.post('/users', async (req, res) => {
  req.body = {
    ...req.body,
    _id: uuidv4(),
    userID: uuidv4(),
    brandID: uuidv4(),
    dateUpdated: Date.now(),
    dateCreated: Date.now(),
  };
  try {
    const user = await User.create(req.body);
    res.send(`New user, ${user.firstName}, was created.`);
  } catch (err) {
    res.send(err);
  }
});

// Get Route (Single)
app.get('/users/:id', (req, res) => {});

// Get Route (All)
app.get('/users', async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (err) {
    throw err;
  }
});

// Listener
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}!`)
);
