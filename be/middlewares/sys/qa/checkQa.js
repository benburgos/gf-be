const qa = require('../../../models/app/qa/qaIndex')

async function checkQa(data){
  let options = await qa.Option.countDocuments({brandId: data})
  let questions = await qa.Question.countDocuments({brandId: data})
  let sections = await qa.Section.countDocuments({brandId: data})
  let scorecards = await qa.Scorecard.countDocuments({brandId: data})

  if (options || questions || sections || scorecards > 0){
    return true
  } else {
    return false
  }
}

module.exports = {
  checkQa
};
