const Org = require('../../models/org');
const User = require('../../models/user');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../middlewares/checkPermission');

async function createOrg(req, res) {
  const data = {
    prod: 'admin',
    bid: req.bid,
    ra: req.ra,
  };
  const type = await checkPermission(data);

  if (type === 'rw') {
    req.body = {
      ...req.body,
      _id: uuidv4(),
      brandId: req.bid,
      isActive: true,
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    };

    try {
      const org = await Org.create(req.body);
      res.send(`New org, ${org.name}, was added to the database.`);
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function getOrg(req, res) {
  const data = {
    prod: 'admin',
    bid: req.bid,
    ra: req.ra,
  };
  const type = await checkPermission(data);

  if (type === 'r' || 'w' || 'rw') {
    const foundOrg = await Org.findOne({ _id: req.params.id });
    const userCount = await User.countDocuments({
      brandId: req.bid,
      teamId: foundTeam._id,
    });

    foundOrg.userCount = userCount;

    if (foundOrg && foundOrg.brandId === req.bid) {
      res.json(foundOrg);
    } else if (foundOrg && foundOrg.brandId !== req.bid) {
      res.send(`You do not belong to the same organization as this team.`);
    } else {
      res.send(`Team does not exist.`);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function getAllOrgs(req, res) {
  const data = {
    prod: 'admin',
    bid: req.bid,
    ra: req.ra,
  };
  const type = await checkPermission(data);

  if (type === 'r' || 'w' || 'rw') {
    let orgs = await Org.find({ brandId: req.bid }, '_id name desc isActive');

    for (let i = 0; i < orgs.length; i++) {
      let orgCount = await User.countDocuments({
        brandId: req.bid,
        orgId: orgs[i]._id,
      });
      orgs[i].userCount = orgCount;
    }
    res.send(orgs);
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function editOrg(req, res) {
  const data = {
    prod: 'admin',
    bid: req.bid,
    ra: req.ra,
  };
  const type = await checkPermission(data);

  if (type === 'w' || 'rw') {
    const foundOrg = await Org.findOne({ _id: req.params.id });

    if (foundOrg && foundOrg.brandId === req.bid) {
      req.body.dateUpdated = Date.now();
      let savedOrg = await Org.findOneAndUpdate(
        { _id: foundOrg._id },
        req.body
      );

      res.send(`Org, ${savedOrg.name}, has been updated.`);
    } else if (foundOrg && foundOrg.brandId !== req.bid) {
      res.send(`You do not belong to this organization.`);
    } else {
      res.send(`Org does not exist.`);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function deleteOrg(req, res) {
  const data = {
    prod: 'admin',
    bid: req.bid,
    ra: req.ra,
  };
  const type = await checkPermission(data);

  if (type === 'rw') {
    const foundOrg = await Org.findOne({ _id: req.params.id });

    if (foundOrg.name === 'Unassigned') {
      res.send(`You cannot delete the default 'Unassigned' team.`);
    } else {
      if (foundOrg && foundOrg.brandId === req.bid) {
        const unassignedOrg = await Org.find({
          brandId: req.bid,
          name: 'Unassigned',
        });
        const impactedUsers = await User.updateMany(
          { brandId: req.bid, orgId: foundOrg._id },
          { $set: { orgId: unassignedOrg._id, orgName: unassignedOrg.name } }
        );
        await Org.findOneAndDelete({ _id: foundOrg._id });

        res.send(`Org, ${foundOrg.name}, has been removed from the database. ${(impactedUsers).modifiedCount}have been reassigned to the ${unassignedOrg.name} org.`);
      } else if (foundOrg && foundOrg.brandId !== req.bid) {
        res.send(`You do not belong to the same organization as this user.`);
      } else {
        res.send(`Org does not exist.`);
      }
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

module.exports = {
  createOrg,
  getOrg,
  getAllOrgs,
  editOrg,
  deleteOrg,
};
