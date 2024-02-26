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
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/axs', pmsRouter);
app.use('/product', productRouter);
app.use('/brand', brandRouter);

// Listener
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}!`)
);
