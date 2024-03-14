const login = require('./login');
const brand = require('./brand');
const appUser = require('./app/user');
const appQaOption = require('./app/qa/option');
const appQaQuestion = require('./app/qa/question');
const appQaSection = require('./app/qa/section')
const appQaScorecard = require('./app/qa/scorecard')
const appQaEvaluation = require('./app/qa/evaluation')

module.exports = {
  login,
  brand,
  appUser,
  appQaOption,
  appQaQuestion,
  appQaSection,
  appQaScorecard,
  appQaEvaluation
};
