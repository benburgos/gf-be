const bcrypt = require('bcrypt');
const User = require('../models/user');
const Pwh = require('../models/pwh');
const Role = require('../models/sys/role');

async function checkHash(email, password) {
  const user = await User.findOne({ email: email });

  if (!user) {
    res.send('Email does not exist.');
  }

  const pw = await Pwh.findOne({ userId: user._id });

  if (!pw) {
    res.send('Password is incorrect.');
  }

  const role = await Role.findOne({ _id: user.roleId });

  const isMatch = await bcrypt.compare(password, pw.pwh);

  if (isMatch) {
    return {
      id: user._id,
      bid: user.brandId,
      rid: user.roleId,
      ra: role.permissions,
    };
  }
}

module.exports = {
  checkHash,
};
