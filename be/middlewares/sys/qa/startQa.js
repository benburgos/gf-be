const { createOption } = require('./createOption');
const { createQuestion } = require('./createQuestion');
const { createSection } = require('./createSection');
const { createScorecard } = require('./createScorecard');

async function startQa(data) {
  await createOption(data);
  await createQuestion(data);
  await createSection(data);
  await createScorecard(data);
}

module.exports = {
  startQa,
};
