const User = require('../../models/user');
const { checkHash } = require('../../middlewares/checkHash');
const { genToken } = require('../../services/genToken');
const { genRefreshToken } = require('../../services/genRefreshToken');

async function loginUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ Error: 'Email does not exist.' });
    }

    // Check if the password matches
    const match = await checkHash(user, req.body.password);
    if (!match) {
      return res.status(401).json({ Error: 'Password is incorrect.' });
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
