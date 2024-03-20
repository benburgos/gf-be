const Team = require('../../models/team');
const User = require('../../models/user');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../middlewares/checkPermission');

async function createTeam(req, res) {
  const data = {
    prod: 'admin',
    bid: req.bid,
    ra: req.ra,
  };
  const type = await checkPermission(data);

  if (type === 'w' || 'rw') {
    req.body = {
      ...req.body,
      _id: uuidv4(),
      brandId: req.bid,
      isActive: true,
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    };

    try {
      const team = await Team.create(req.body);
      res.send(`New team, ${team.name}, was added to the database.`);
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function getTeam(req, res) {
  const data = {
    prod: 'admin',
    bid: req.bid,
    ra: req.ra,
  };
  const type = await checkPermission(data);

  if (type === 'r' || 'w' || 'rw') {
    const foundTeam = await Team.findOne({ _id: req.params.id });
    const userCount = await User.countDocuments({
      brandId: req.bid,
      teamId: foundTeam._id,
    });

    foundTeam.userCount = userCount;

    if (foundTeam && foundTeam.brandId === req.bid) {
      res.json(foundTeam);
    } else if (foundTeam && foundTeam.brandId !== req.bid) {
      res.send(`You do not belong to the same organization as this team.`);
    } else {
      res.send(`Team does not exist.`);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function getAllTeams(req, res) {
  const data = {
    prod: 'admin',
    bid: req.bid,
    ra: req.ra,
  };
  const type = await checkPermission(data);

  if (type === 'r' || 'w' || 'rw') {
    let teams = await Team.find({ brandId: req.bid }, '_id name desc isActive');

    for (let i = 0; i < teams.length; i++) {
      let teamCount = await User.countDocuments({
        brandId: req.bid,
        teamId: teams[i]._id,
      });
      teams[i].userCount = teamCount;
    }
    res.send(teams);
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function editTeam(req, res) {}

async function deleteTeam(req, res) {}

module.exports = {
  createTeam,
  getTeam,
  getAllTeams,
  editTeam,
  deleteTeam,
};
