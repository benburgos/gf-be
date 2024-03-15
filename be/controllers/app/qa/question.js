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
      value: 0,
      isActive: true,
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
    };

    for (let i = 0; i < newQuestion.options.length; i++) {
      newQuestion.value += req.body.options[i].value
    }

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

async function getAllQuestions(req, res) {
  const data = {
    prod: 'qa',
    bid: req.bid,
    ra: req.ra,
  };

  const type = await checkPermission(data);

  if (type === 'rw' || 'w') {
    const questions = await Question.find(
      { brandId: req.bid },
      'name desc modality value isActive'
    );
    res.send(questions);
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function editQuestion(req, res) {
  const data = {
    prod: 'qa',
    bid: req.bid,
    ra: req.ra,
  };

  const type = await checkPermission(data);

  if (type === 'rw') {
    const foundQuestion = await Question.findOne({ _id: req.params.id });
    req.body.dateUpdated = Date.now();
    await Question.findOneAndUpdate({ _id: foundQuestion._id }, req.body);

    res.send(`Question, ${foundQuestion.name}, has been updated.`);
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function deleteQuestion(req, res) {
  const data = {
    prod: 'qa',
    bid: req.bid,
    ra: req.ra,
  };

  const type = await checkPermission(data);

  if (type === 'rw') {
    const foundQuestion = await Question.findOne({ _id: req.params.id });

    if (foundQuestion && foundQuestion.brandId === req.bid) {
      await Question.findOneAndDelete({ _id: foundQuestion._id });
      res.send(
        `Question, ${foundQuestion.name}, has been removed from the database.`
      );
    } else if (foundQuestion && foundQuestion.brandId !== req.bid) {
      res.send(`You do not belong to this organization.`);
    } else {
      res.send(`Question ID does not exist.`);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

module.exports = {
  createQuestion,
  getQuestion,
  getAllQuestions,
  editQuestion,
  deleteQuestion,
};
