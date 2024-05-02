const bcrypt = require('bcrypt');
const Pwh = require('../models/pwh');
const Role = require('../models/sys/role');

async function checkHash(user, password) {
    const pw = await Pwh.findOne({ userId: user._id });
    const isMatch = await bcrypt.compare(password, pw.pwh);
    if (isMatch) {
      const role = await Role.findOne({ _id: user.roleId });
        return {
          id: user._id,
          bid: user.brandId,
          rid: user.roleId,
          ra: role.permissions,
        };
      } else {
        return 'Incorrect Password.';
      }
    }


module.exports = {
  checkHash,
};
