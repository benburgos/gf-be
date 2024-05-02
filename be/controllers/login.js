const User = require('../models/user');
const Brand = require('../models/sys/brand');
const { checkHash } = require('../middlewares/checkHash');
const { genToken } = require('../services/genToken');

async function loginUser(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.json('Email does not exist.');
  } else if (user) {
    try {
      const match = await checkHash(user, req.body.password);
      if (match) {
        const isAdmin = await Brand.findOne({ adminId: match.id });
        if (isAdmin) {
          res.json(genToken(match, match.key));
        } else {
          res.json('Use the app login page to access the app.');
        }
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = {
  loginUser,
};
