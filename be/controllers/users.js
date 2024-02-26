const db = require('../config/db');
const User = require('../models/user');
const Pwh = require('../models/pwh');
const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../middlewares/genHash');
const { checkBrand } = require('../services/checkBrand');

// Create User
async function createUser(req, res) {
  const check = await checkBrand(req.body.brandName);

  if (check) {
    console.log('Brand exists');
    return;
  } else {
    console.log('Brand does not exist');
    return;
  }
  // req.body = {
  //   ...req.body,
  //   _id: uuidv4(),
  //   brandId: uuidv4(),
  //   dateUpdated: Date.now(),
  //   dateCreated: Date.now(),
  // };

  // pw = await hashPassword(req.body.pwh);

  // try {
  //   delete req.body.pwh;
  //   const user = await User.create(req.body);
  //   const hash = await Pwh.create({
  //     ...req.body,
  //     _id: uuidv4(),
  //     userId: user._id,
  //     pwh: pw,
  //   });
  //   res.send(`New user, ${user.firstName}, was created.`);
  // } catch (err) {
  //   res.send(err);
  // }
}

// Get Single User
async function getUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.id });
    // Shows user who accessed page, may think about creating event log.
    console.log(`User ${req.id} has viewed ${user.firstName}'s page.`);
    res.send(user);
  } catch (err) {
    res.send(err);
  }
}

// Get All Users
async function getUsers(req, res) {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createUser,
  getUser,
  getUsers,
};
