const User = require('../models/user');
const Brand = require('../models/sys/brand');
const { checkHash } = require('../middlewares/checkHash');
const { genToken } = require('../services/genToken');
const { genRefreshToken } = require('../services/genRefreshToken');

async function loginUser(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.json('Email does not exist.');
  } else if (user) {
    const match = await checkHash(user, req.body.password);
    if (match) {
      const isAdmin = await Brand.findOne({ adminId: match.id });
      if (isAdmin !== null) {
        // Generate access token
        const accessToken = res.json(genToken(match, match.key));

        // Generate refresh token
        const refreshToken = res.json(genRefreshToken(user._id));

        // Send tokens to the client
        res.json({ accessToken, refreshToken });
      } else {
        res.json('Use the app login page to access the app.');
      }
    } else {
      res.json('Password is incorrect.');
    }
  }
}

module.exports = {
  loginUser,
};
