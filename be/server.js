// Dependencies
require('dotenv').config();
require('./config/db');
const express = require('express');
const cors = require('cors');
const app = express();
const route = require('./routes/routeIndex');

let allowedOrigins = {
  origin: [`${process.env.DEV_APP}`]
}

// Middleware
app.use(express.json());
app.use(cors(allowedOrigins));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Groupeforce' });
});
app.use('/login', cors(allowedOrigins), route.login);
app.use('/brand', route.brand);
app.use('/app/login', route.appLogin);
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

/////// Future Additions ///////////////////////////////
// app.use('/api/user', route.apiUser)
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
