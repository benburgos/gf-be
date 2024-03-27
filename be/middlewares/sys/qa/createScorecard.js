const { Scorecard } = require('../../../models/app/qa/qaIndex');
const { Team } = require('../../../models/team')
const template = require('../../../middlewares/sys/qa/template/scorecards.json');
const { v4: uuidv4 } = require('uuid');

async function createScorecard(data) {
  let newScorecardArr = [];
  let team = await Team.findOne({brandId: data._id, name: "Unassigned"})

  for (let i = 0; i < template.length; i++) {
    let newScorecard = {
      _id: uuidv4(),
      brandId: data,
      teamId: team._id,
      name: template[i].name,
      desc: template[i].desc,
      type: template[i].type,
      modality: template[i].modality,
      criteria: template[i].criteria,
      maxScore: template[i].maxScore,
      targetScore: template[i].targetScore,
      isActive: template[i].isActive,
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    };

    newScorecardArr.push(newScorecard);
  }

  let createdScorecards = await Scorecard.insertMany(newScorecardArr);
  console.log(
    `${createdScorecards.length} QA scorecards were added to company, ${data.name}.`
  );
}

module.exports = {
  createScorecard,
};
