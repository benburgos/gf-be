const { Question } = require('../../../models/app/qa/qaIndex');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function createQuestion(req, res) {
  const data = {
    prod: 'qa',
    bid: req.bid,
    ra: req.ra,
  };

  const type = await checkPermission(data);

  if (type === 'rw') {
    let newQuestion = {
      ...req.body,
      _id: uuidv4(),
      brandId: req.bid,
      isActive: true,
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
    };

    try {
      await Question.create(newQuestion);
      res.send(`New question, ${newQuestion.name}, was added to the database.`);
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function getQuestion(req, res) {
  const data = {
    prod: 'qa',
    bid: req.bid,
    ra: req.ra,
  };

  const type = await checkPermission(data);
  
  if (type === 'rw' || 'w') {
    const findQuestion = await Question.findOne({ _id: req.params.id });

    if (findQuestion && findQuestion.brandId === req.bid) {
      res.json(findQuestion);
    } else if (findQuestion && findQuestion.brandId !== req.bid) {
      res.send(`You do not belong to the same organization as this option.`);
    } else {
      res.send(`Question ID does not exist.`);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function getAllQuestions(req, res) {}

async function editQuestion(req, res) {}

async function deleteQuestion(req, res) {}

module.exports = {
  createQuestion,
  getQuestion,
  getAllQuestions,
  editQuestion,
  deleteQuestion,
};
