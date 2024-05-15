// Dependencies
require('dotenv').config();
require('./config/db');
const express = require('express');
const cors = require('cors');
const app = express();
const route = require('./routes/routeIndex');

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Groupeforce' });
});
app.use('/login', route.login);
app.use('/brand', route.brand);
app.use('/token', route.appToken);
app.use('/app/login', route.appLogin);
app.use('/app/profile', route.appUserProfile);
app.use('/app/admin/user', route.appAdminUser);
app.use('/app/admin/role', route.appAdminRole);
app.use('/app/admin/org', route.appAdminOrg);
app.use('/app/admin/team', route.appAdminTeam);

// Listener
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}!`)
);
