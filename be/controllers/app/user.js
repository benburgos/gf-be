const User = require('../../models/user');
const Pwh = require('../../models/pwh');
const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../../middlewares/genHash');
const { checkBrand } = require('../../services/checkBrand');
const { checkEmail } = require('../../services/checkEmail');

async function createUser(req, res) {
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
}

async function getUser(req, res) {
  const foundUser = await User.findOne({_id: req.params.id})
  
  if (foundUser && foundUser.brandId === req.bid) {
    res.send(foundUser)
  } else if (foundUser && foundUser.brandId !== req.bid) {
    re.send(`You do not belong to the same organization as this user.`)
  } else {
    res.send(`User does not exist.`)
  }
}

async function getAllUsers(req, res) {
  const users = await User.find({brandId: req.bid})
  res.send(users)
}

async function editUser(req, res) {
  const foundUser = await User.findOne({_id: req.params.id})
  const editedUser = {}
  
  if (foundUser && foundUser.brandId === req.bid) {
    
    res.send(editedUser)
  } else if (foundUser && foundUser.brandId !== req.bid) {
    re.send(`You do not belong to the same organization as this user.`)
  } else {
    res.send(`User does not exist.`)
  }
}

async function deleteUser(req, res) {}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  editUser,
  deleteUser,
};
