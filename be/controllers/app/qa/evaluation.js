const { Evaluation, Scorecard } = require('../../../models/app/qa/qaIndex');
const User = require('../../../models/user');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../../middlewares/checkPermission');
const { listenerCount } = require('../../../models/pwh');

async function createEvaluation(req, res) {
  const data = {
    prod: 'qa',
    bid: req.bid,
    ra: req.ra,
  };

  const type = await checkPermission(data);

  if (type === 'rw' || 'w') {
    const evaluations = await Evaluation.countDocuments({ brandId: req.bid });

    if (req.query.system === 'native') {
      let pendingEvaluation = {
        _id: uuidv4(),
        brandId: req.bid,
        evalId: evaluations + 1,
        systemId: evaluations + 1,
        modality: 'other',
        userId: 'd20c6ac6-7611-4e69-8ce9-b4d1e69af71a',
        teamId: 'TBD',
        evaluatorId: req.id,
        scorecardId: 'TBD',
        score: 0,
        targetScore: 0,
        maxScore: 0,
        evalType: req.query.type,
        status: 'not_started',
        data: [],
        positiveFeedback: 'TBD',
        improvementFeedback: 'TBD',
        dateUpdated: Date.now(),
        dateCreated: Date.now(),
      };

      await Evaluation.create(pendingEvaluation);
      res.send(pendingEvaluation);
    } else {
      res.send(`Unable to determine evaluation system.`);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function getEvaluation(req, res) {
  const data = {
    prod: 'qa',
    bid: req.bid,
    ra: req.ra,
  };

  const type = await checkPermission(data);

  if (type === 'rw' || 'w') {
    const foundEvaluation = await Evaluation.findOne({ _id: req.params.id });
    const evalUser = await User.findOne(
      { _id: foundEvaluation.userId },
      '-_id firstName lastName'
    );
    const evalScorecard = await Scorecard.findOne(
      { _id: foundEvaluation.scorecardId },
      '-_id name desc'
    );

    res.send({
      eval: foundEvaluation,
      evalUser: evalUser ? evalUser : 'Unassigned',
      evalScorecard: evalScorecard ? evalScorecard : 'Unassigned',
    });
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function getAllEvaluations(req, res) {
  const data = {
    prod: 'qa',
    bid: req.bid,
    ra: req.ra,
  };

  const type = await checkPermission(data);

  if (type === 'rw') {
    let evaluations = await Evaluation.find(
      { brandId: req.bid },
      '_id evalId systemId evaluatorId scorecardId modality userId teamId evalType status'
    );
    let users = await User.find({ brandId: req.bid }, '_id firstName lastName');
    let scorecards = await Scorecard.find({ brandId: req.bid }, '_id name');

    for (i = 0; i < evaluations.length; i++) {
      let foundUser = users.find((obj) => obj._id === evaluations[i].userId);
      let foundEvaluator = users.find(
        (obj) => obj._id === evaluations[i].evaluatorId
      );
      let foundScorecard = scorecards.find(
        (obj) => obj._id === evaluations[i].scorecardId
      );

      foundUser
        ? (evaluations[
            i
          ].userId = `${foundUser.firstName} ${foundUser.lastName}`)
        : 'Unassigned';
      foundEvaluator
        ? (evaluations[
            i
          ].evaluatorId = `${foundEvaluator.firstName} ${foundEvaluator.lastName}`)
        : 'Unassigned';
      foundScorecard
        ? (evaluations[i].scorecardId = `${foundScorecard.name}`)
        : 'Unassigned';
    }
    res.send(evaluations);
  } else if (type === 'w') {
    let evaluations = await Evaluation.find(
      { brandId: req.bid, evaluatorId: req.id },
      '_id evalId systemId evaluatorId scorecardId modality userId teamId evalType status'
    );
    let users = await User.find({ brandId: req.bid }, '_id firstName lastName');
    let scorecards = await Scorecard.find({ brandId: req.bid }, '_id name');

    for (i = 0; i < evaluations.length; i++) {
      let foundUser = users.find((obj) => obj._id === evaluations[i].userId);
      let foundEvaluator = users.find(
        (obj) => obj._id === evaluations[i].evaluatorId
      );
      let foundScorecard = scorecards.find(
        (obj) => obj._id === evaluations[i].scorecardId
      );
      foundUser
        ? (evaluations[
            i
          ].userId = `${foundUser.firstName} ${foundUser.lastName}`)
        : 'Unassigned';
      foundEvaluator
        ? (evaluations[
            i
          ].evaluatorId = `${foundEvaluator.firstName} ${foundEvaluator.lastName}`)
        : 'Unassigned';
      foundScorecard
        ? (evaluations[i].scorecardId = `${foundScorecard.name}`)
        : 'Unassigned';
    }
    res.send(evaluations);
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function editEvaluation(req, res) {
  const data = {
    prod: 'qa',
    bid: req.bid,
    ra: req.ra,
  };

  const type = await checkPermission(data);

  if (type === 'rw' || 'w') {
    req.body.dateUpdated = Date.now();
    const foundEvaluation = await Evaluation.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );

    res.send(`Evaluation, #${foundEvaluation.evalId} has been updated.`);
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function deleteEvaluation(req, res) {
  const data = {
    prod: 'qa',
    bid: req.bid,
    ra: req.ra,
  };

  const type = await checkPermission(data);

  if (type === 'rw') {
    const foundEvaluation = await Evaluation.findOne({ _id: req.params.id });

    if (foundEvaluation && foundEvaluation.brandId === req.bid) {
      await Evaluation.findOneAndDelete({ _id: foundEvaluation._id });
      res.send(
        `Evaluation, ${foundEvaluation.evalId}, has been removed from the database.`
      );
    } else if (foundEvaluation && foundEvaluation.brandId !== req.bid) {
      res.send(`You do not belong to this organization.`);
    } else {
      res.send(`Evaluation ID does not exist.`);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

module.exports = {
  createEvaluation,
  getEvaluation,
  getAllEvaluations,
  editEvaluation,
  deleteEvaluation,
};
