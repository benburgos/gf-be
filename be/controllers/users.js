const db = require('../config/db');
const User = require('../models/user');

async function getUsers(req, res) {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getUsers,
};
