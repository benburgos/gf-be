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

async function getEvaluation(req, res) {}

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
      let foundUser = await users.find(
        (obj) => obj._id === evaluations[i].userId
      );

      if (foundUser) {
        evaluations[i].userId = `${foundUser.firstName} ${foundUser.lastName}`;
      } else {
        evaluations[i].userId = 'Unassigned';
      }

      let foundEvaluator = await users.find(
        (obj) => obj._id === evaluations[i].evaluatorId
      );

      if (foundEvaluator) {
        evaluations[i].evaluatorId = `${foundEvaluator.firstName} ${foundEvaluator.lastName}`;
      } else {
        evaluations[i].evaluatorId = 'Unassigned';
      }

      let foundScorecard = await scorecards.find(
        (obj) => obj._id === evaluations[i].scorecardId
      );

      if (foundScorecard) {
        evaluations[i].scorecardId = `${foundScorecard.name}`;
      } else {
        evaluations[i].scorecardId = 'Unassigned';
      }
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
      let foundUser = await users.find(
        (obj) => obj._id === evaluations[i].userId
      );

      if (foundUser) {
        evaluations[i].userId = `${foundUser.firstName} ${foundUser.lastName}`;
      } else {
        evaluations[i].userId = 'Unassigned';
      }

      let foundEvaluator = await users.find(
        (obj) => obj._id === evaluations[i].evaluatorId
      );

      if (foundEvaluator) {
        evaluations[i].evaluatorId = `${foundEvaluator.firstName} ${foundEvaluator.lastName}`;
      } else {
        evaluations[i].evaluatorId = 'Unassigned';
      }

      let foundScorecard = await scorecards.find(
        (obj) => obj._id === evaluations[i].scorecardId
      );

      if (foundScorecard) {
        evaluations[i].scorecardId = `${foundScorecard.name}`;
      } else {
        evaluations[i].scorecardId = 'Unassigned';
      }
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
