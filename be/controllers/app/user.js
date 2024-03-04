const User = require('../../models/user');
const Pwh = require('../../models/pwh');
const Role = require('../../models/sys/role');
const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../../middlewares/genHash');
const { checkEmail } = require('../../services/checkEmail');
const { checkPermission } = require('../../middlewares/checkPermission');

async function createUser(req, res) {
  const data = {
    prod: 'admin',
    bid: req.bid,
    ra: req.ra,
  };
  const type = await checkPermission(data);

  if (type === 'w' || 'rw') {
    const emailCheck = await checkEmail(req.body.email);

    if (emailCheck) {
      res.send(`The email you're attempting to register already exists.`);
      return;
    } else {
      req.body = {
        ...req.body,
        _id: uuidv4(),
        brandId: req.bid,
        roleId: req.body.roleId,
        dateUpdated: Date.now(),
        dateCreated: Date.now(),
      };

      pw = await hashPassword(req.body.pw);

      try {
        const user = await User.create(req.body);
        await Pwh.create({
          ...req.body,
          _id: uuidv4(),
          userId: user._id,
          pwh: pw,
        });
        res.send(`New employee, ${user.firstName}, was added to the database.`);
      } catch (err) {
        res.send(err);
      }
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function getUser(req, res) {
  const data = {
    prod: 'admin',
    bid: req.bid,
    ra: req.ra,
  };
  const type = await checkPermission(data);

  if (type === 'r' || 'w' || 'rw') {
    const foundUser = await User.findOne({ _id: req.params.id });
    if (foundUser && foundUser.brandId === req.bid) {
      res.send(foundUser);
    } else if (foundUser && foundUser.brandId !== req.bid) {
      re.send(`You do not belong to the same organization as this user.`);
    } else {
      res.send(`User does not exist.`);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function getAllUsers(req, res) {
  const data = {
    prod: 'admin',
    bid: req.bid,
    ra: req.ra,
  };
  const type = await checkPermission(data);

  if (type === 'r' || 'w' || 'rw') {
    const users = await User.find(
      { brandId: req.bid },
      '_id firstName lastName roleId isActive'
    );
    const roles = await Role.find({ brandId: req.bid }, '-brandId -permissions -isActive -__v');
    
      for (let i = 0; i < users.length; i++) {
        let role = await roles.find(obj => obj._id === users[i].roleId)
        users[i].roleId = role.name
      }

    res.send(users);
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function editUser(req, res) {
  const data = {
    prod: 'admin',
    bid: req.bid,
    ra: req.ra,
  };
  const type = await checkPermission(data);

  if (type === 'w' || 'rw' || req.params.id === req.id) {
    const foundUser = await User.findOne({ _id: req.params.id });

    if (foundUser && foundUser.brandId === req.bid) {
      req.body.dateUpdated = Date.now();
      let savedUser = await User.findOneAndUpdate(
        { _id: foundUser._id },
        req.body
      );

      res.send(`User, ${foundUser.firstName} has been updated.`);
    } else if (foundUser && foundUser.brandId !== req.bid) {
      re.send(`You do not belong to the same organization as this user.`);
    } else {
      res.send(`User does not exist.`);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function deleteUser(req, res) {
  const data = {
    prod: 'admin',
    bid: req.bid,
    ra: req.ra,
  };
  const type = await checkPermission(data);

  if (type === 'rw') {
    const foundUser = await User.findOne({ _id: req.params.id });

    if (foundUser && foundUser.brandId === req.bid) {
      await User.findOneAndDelete({ _id: foundUser._id });
      await Pwh.findOneAndDelete({ userId: foundUser._id });

      res.send(
        `User, ${foundUser.firstName} has been removed from the database.`
      );
    } else if (foundUser && foundUser.brandId !== req.bid) {
      re.send(`You do not belong to the same organization as this user.`);
    } else {
      res.send(`User does not exist.`);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  editUser,
  deleteUser,
};
