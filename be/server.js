// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

// Middleware
app.use(express.json());

// Routes
app.use('/users', usersRouter);
app.use('/login', loginRouter);

// Listener
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}!`)
);
