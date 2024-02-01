const db = require('../config/db');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');

// Create User
async function createUser(req, res) {
  req.body = {
    ...req.body,
    _id: uuidv4(),
    userID: uuidv4(),
    brandID: uuidv4(),
    dateUpdated: Date.now(),
    dateCreated: Date.now(),
  };
  try {
    const user = await User.create(req.body);
    res.send(`New user, ${user.firstName}, was created.`);
  } catch (err) {
    res.send(err);
  }
}

// Get Single User
async function getUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.id });
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
