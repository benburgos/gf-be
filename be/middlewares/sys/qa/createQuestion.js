const { Question } = require('../../../models/app/qa/qaIndex');
const template = require('../../../middlewares/sys/qa/template/questions.json');
const { v4: uuidv4 } = require('uuid');

async function createQuestion(data) {
  let newQuestionArr = [];

  for (let i = 0; i < template.length; i++) {
    let newQuestion = {
      _id: uuidv4(),
      brandId: data,
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

  let createdQuestions = await Question.insertMany(newQuestionArr);
  console.log(
    `${createdQuestions.length} QA questions were added to company, ${data.name}.`
  );
}

module.exports = {
  createQuestion,
};
