const User = require('../../models/user');
const { checkHash } = require('../../middlewares/checkHash');
const { genToken } = require('../../services/genToken');

async function loginUser(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.json('Email does not exist.');
  } else if (user) {
    const match = await checkHash(user, req.body.password);
    if (match) {
      res.json(genToken(match, match.key));
    } else {
      res.json('Password is incorrect.');
    }
  }
}

module.exports = {
  loginUser,
};
