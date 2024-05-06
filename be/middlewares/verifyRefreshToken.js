const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/token');

async function verifyRefreshToken(refreshToken) {
  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Check if the refresh token exists in the database
    const existingToken = await RefreshToken.findOne({ token: refreshToken });
    if (!existingToken) {
      return null; // Token doesn't exist in the database
    }

    // Optionally, you can check if the token has expired or perform additional validation

    // Return the decoded token
    return decoded;
  } catch (error) {
    console.error('Error verifying refresh token:', error);
    return null; // Token verification failed
  }
}

module.exports = {
  verifyRefreshToken,
};
