const User = require('../../models/user');
const { checkHash } = require('../../middlewares/checkHash');
const { genToken } = require('../../services/genToken');
const { genRefreshToken } = require('../../services/genRefreshToken'); // Import function to generate refresh token

async function loginUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: 'Email does not exist.' });
    }

    // Check if the password matches
    const match = await checkHash(user, req.body.password);
    if (!match) {
      return res.status(401).json({ error: 'Password is incorrect.' });
    }

    // Generate access token
    const accessToken = genToken({ id: user._id, email: user.email }); // Adjust payload as needed

    // Generate refresh token
    const refreshToken = genRefreshToken(user._id); // Assuming genRefreshToken function generates a refresh token for the user

    // Send tokens to the client
    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  loginUser,
};