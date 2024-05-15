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
app.use('/app/profile', route.apiUserProfile);
app.use('/app/user', route.appUser);
app.use('/app/product', route.appProduct);
app.use('/app/role', route.appRole);
app.use('/app/team', route.appTeam);
app.use('/app/org', route.appOrg);
app.use('/app/qa/option', route.appQaOption);
app.use('/app/qa/question', route.appQaQuestion);
app.use('/app/qa/section', route.appQaSection);
app.use('/app/qa/scorecard', route.appQaScorecard);
app.use('/app/qa/evaluate', route.appQaEvaluation);

// Listener
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}!`)
);
