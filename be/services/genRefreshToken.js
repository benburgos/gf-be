const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/token');

async function genRefreshToken(userId) {
  try {
    // Generate refresh token payload
    const payload = {
      userId: userId,
    };

    // Sign the refresh token
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

    // Save the refresh token to the database
    const newRefreshToken = new RefreshToken({
      token: refreshToken,
      userId: userId,
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    });
    await newRefreshToken.save();

    return refreshToken;
  } catch (error) {
    console.error('Error generating refresh token:', error);
    throw new Error('Unable to generate refresh token');
  }
}
