const db = require('../config/db');
const User = require('../models/user');
const Pwh = require('../models/pwh');
const bcrypt = require('bcrypt');

async function loginUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    const pw = await Pwh.findOne({ userID: user._id });
    const match = await bcrypt.compare(req.body.password, pw.pwh);

    if (match) {
      res.send('Successful login.');
    } else {
      res.send('Password incorrect');
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  loginUser,
};
