const { Question } = require('../../../models/app/qa/qaIndex');
const template = require('../../../middlewares/sys/qa/template/questions.json');
const { v4: uuidv4 } = require('uuid');

async function createQuestion(brand, options) {
  let newQuestionArr = [];

  for (let i = 0; i < template.length; i++) {
    let newQuestion = {
      _id: uuidv4(),
      brandId: data._id,
      name: template[i].name,
      desc: template[i].desc,
      modality: template[i].modality,
      type: template[i].type,
      value: template[i].value,
      options: template[i].options,
      isActive: template[i].isActive,
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    };

    newQuestionArr.push(newQuestion);
  }

  let createdOptions = await Option.insertMany(newQuestionArr);
  console.log(
    `${createdOptions.length} QA options were added to company, ${data.name}.`
  );

  return newQuestionArr;
}

module.exports = {
  createQuestion,
};
