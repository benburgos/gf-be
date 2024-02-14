// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const axsRouter = require('./routes/axs')

// Middleware
app.use(express.json());

// Routes
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/axs', axsRouter)

// Listener
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}!`)
);
