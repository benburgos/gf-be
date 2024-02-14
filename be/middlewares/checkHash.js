const bcrypt = require('bcrypt');
const User = require('../models/user');
const Pwh = require('../models/pwh');

async function checkHash(email, password) {
  const user = await User.findOne({ email: email });
  const pw = await Pwh.findOne({ userId: user._id });

  const isMatch = await bcrypt.compare(password, pw.pwh);

  if (isMatch) {
    return {
      id: user._id,
      rid: user.roleId,
    };
  }
}

module.exports = {
  checkHash,
};
