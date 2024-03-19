const { Evaluation } = require('../../../models/app/qa/qaIndex');
const { Scorecard } = require('../../../models/app/qa/qaIndex');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../../middlewares/checkPermission');

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
        modality: 'all',
        userId: 'TBD',
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
    
      if (type === 'rw' || 'w') {
        const evaluations = await Evaluation.find(
          { brandId: req.bid, evaluatorId: req.id },
          '_id name desc type modality targetScore maxScore isActive'
        );
        res.send(evaluations);
      } else {
        res.send(`You are not authorized to access this resource.`);
      }
}

async function editEvaluation(req, res) {}

async function deleteEvaluation(req, res) {}


module.exports = {
  createEvaluation,
  getEvaluation,
  getAllEvaluations,
  editEvaluation,
  deleteEvaluation,
};
