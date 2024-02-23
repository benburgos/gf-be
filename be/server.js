// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const pmsRouter = require('./routes/pms');
const productRouter = require('./routes/product');
const brandRouter = require('./routes/brand');

// Middleware
app.use(express.json());

// Routes
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/axs', pmsRouter);
app.use('/api/product', productRouter);
app.use('/api/brand', brandRouter);

// Listener
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}!`)
);
