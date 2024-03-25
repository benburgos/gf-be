const login = require('./login');
const brand = require('./brand');
const appUser = require('./app/user');
const appRole = require('./app/role');
const appOrg = require('./app/org');
const appTeam = require('./app/team');
const appQaOption = require('./app/qa/option');
const appQaQuestion = require('./app/qa/question');
const appQaSection = require('./app/qa/section');
const appQaScorecard = require('./app/qa/scorecard');
const appQaEvaluation = require('./app/qa/evaluation');

module.exports = {
  login,
  brand,
  appUser,
  appRole,
  appOrg,
  appTeam,
  appQaOption,
  appQaQuestion,
  appQaSection,
  appQaScorecard,
  appQaEvaluation,
};
