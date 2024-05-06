const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/token');

async function verifyRefreshToken(refreshToken) {
  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Check if the refresh token exists in the database
    const existingToken = await RefreshToken.findOne({ token: refreshToken });
    if (!existingToken) {
      return null;
    }

    // Check if the refresh token has expired
    const expirationTime = decoded.exp * 1000; // Convert seconds to milliseconds
    const currentTime = Date.now();
    const tokenLifetime = expirationTime - currentTime;
    const maxLifetime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    if (tokenLifetime > maxLifetime) {
      return null; // Token validity exceeds 24 hours
    }

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