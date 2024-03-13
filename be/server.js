// Dependencies
require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const route = require('./routes/routeIndex');

// Middleware
app.use(express.json());

// Routes
app.use('/login', route.login);
app.use('/brand', route.brand);
app.use('/app/user', route.appUser)
app.use('/app/qa/option', route.appQaOption)
// app.use('/api/user', route.apiUser)
// app.use('/app/qa', route.appQa)
// app.use('/api/qa', route.apiQa)
// app.use('/app/performance', route.appPerformance)
// app.use('/api/performance', route.apiPerformance)
// app.use('/app/engagement', route.appEngagement)
// app.use('/api/engagement', route.apiEngagement)
// app.use('/app/wfm', route.appWfm)
// app.use('/api/wfm', route.apiWfm)
// app.use('/app/shop', route.appShop)
// app.use('/api/shop', route.apiShop)

// Listener
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}!`)
);
