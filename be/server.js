// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const loginRouter = require('./routes/login');
const brandRouter = require('./routes/brand');

// Middleware
app.use(express.json());

// Routes
app.use('/login', loginRouter);
app.use('/brand', brandRouter);

// Listener
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}!`)
);
