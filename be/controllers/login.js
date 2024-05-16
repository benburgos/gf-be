const User = require('../models/user');
const Brand = require('../models/sys/brand');
const { checkHash } = require('../middlewares/checkHash');
const { genToken } = require('../services/genToken');
const { genRefreshToken } = require('../services/genRefreshToken');

async function loginUser(req, res) {
  try {
    // Retrieve the user from the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ Message: 'User not found' });
    }

    // Check if the user is the brand admin
    const brand = await Brand.findOne({ adminId: user._id });
    if (!brand) {
      return res.status(401).json({ Message: 'You are not authorized to access this resource. Visit the app login!' });
    }

    // Check if the password matches
    const match = await checkHash(user, req.body.password);
    if (!match) {
      return res.status(401).json({ Message: 'Password is incorrect' });
    }

    // Generate access token
    const accessToken = genToken(match, match.key);

    // Generate refresh token
    const refreshToken = await genRefreshToken(user._id);

    // Send tokens to the client
    return res.json({ accessToken, refreshToken });
} catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ Error: 'Internal server error' });
  }
}

module.exports = {
  loginUser,
};
