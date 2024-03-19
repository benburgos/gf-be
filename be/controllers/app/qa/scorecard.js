const { Scorecard } = require('../../../models/app/qa/qaIndex');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function createScorecard(req, res) {
  const data = {
    prod: 'qa',
    bid: req.bid,
    ra: req.ra,
  };

  const type = await checkPermission(data);

  if (type === 'rw') {
    let newScorecard = {
      ...req.body,
      _id: uuidv4(),
      brandId: req.bid,
      teamId: 'null',
      isActive: true,
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    };

    try {
      await Scorecard.create(newScorecard);
      res.send(newScorecard);
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function getScorecard(req, res) {
  const data = {
    prod: 'qa',
    bid: req.bid,
    ra: req.ra,
  };

  const type = await checkPermission(data);

  if (type === 'rw' || 'w') {
    const foundScorecard = await Scorecard.findOne({ _id: req.params.id });

    if (foundScorecard && foundScorecard.brandId === req.bid) {
      res.json(foundScorecard);
    } else if (foundScorecard && foundScorecard.brandId !== req.bid) {
      res.send(`You do not belong to the same organization as this option.`);
    } else {
      res.send(`Scorecard ID does not exist.`);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function getAllScorecards(req, res) {}

async function editScorecard(req, res) {}

async function deleteScorecard(req, res) {}

module.exports = {
  createScorecard,
  getScorecard,
  getAllScorecards,
  editScorecard,
  deleteScorecard,
};
