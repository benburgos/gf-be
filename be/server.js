// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const permissionRouter = require('./routes/permissions')

// Middleware
app.use(express.json());

// Routes
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/permissions', permissionRouter)

// Listener
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}!`)
);
