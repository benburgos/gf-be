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
// app.use('/app/user')
// app.use('/api/user')
// app.use('/app/qa')
// app.use('/api/qa')
// app.use('/app/performance')
// app.use('/api/performance')
// app.use('/app/engagement')
// app.use('/api/engagement')
// app.use('/app/wfm')
// app.use('/api/wfm')
// app.use('/app/shop')
// app.use('/api/shop')

// Listener
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}!`)
);
