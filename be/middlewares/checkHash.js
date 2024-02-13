const bcrypt = require('bcrypt');
const User = require('../models/user');
const Pwh = require('../models/pwh');

async function checkHash(email, password) {
  const user = await User.findOne({ email: email });
  const pw = await Pwh.findOne({ userID: user._id });

  const isMatch = await bcrypt.compare(password, pw.pwh);

  return {
    isMatch,
    user
  };
}

module.exports = {
  checkHash,
};
