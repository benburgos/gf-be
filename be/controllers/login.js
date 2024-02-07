const db = require('../config/db');
const User = require('../models/user');
const Pwh = require('../models/pwh');
const { checkHash } = require('../middlewares/checkHash');

async function loginUser(req, res) {
  try {
    const match = await checkHash(req.body.email, req.body.password);
    if (match) {
      res.send('Successful Login.');
    } else {
      res.send('Incorrect Password.');
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  loginUser,
};
