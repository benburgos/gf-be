const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/token');

async function genRefreshToken(userId) {
  try {
    // Generate refresh token payload
    const payload = {
      userId: userId,
    };

    // Sign the refresh token with expiration time of 24 hours
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '24h',
    });

    // Check if a refresh token entry already exists for the user ID
    let existingToken = await RefreshToken.findOne({ _id: userId });

    if (existingToken) {
      // Update existing entry with new token and dateUpdated timestamp
      existingToken.token = refreshToken;
      existingToken.dateUpdated = Date.now();
      await existingToken.save();
    } else {
      // Create new entry
      existingToken = new RefreshToken({
        token: refreshToken,
        _id: userId,
        dateUpdated: Date.now(),
        dateCreated: Date.now(),
      });
      await existingToken.save();
    }

    return refreshToken;
  } catch (error) {
    console.error('Error generating refresh token:', error);
    throw new Error('Unable to generate refresh token');
  }
}

module.exports = { genRefreshToken };
