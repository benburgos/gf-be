const { verifyRefreshToken } = require('../middlewares/verifyRefreshToken');
const { genToken } = require('../services/genToken');

// Controller function for refreshing tokens
async function refreshToken(req, res) {
  try {
    // Extract refresh token from request body
    const { refreshToken } = req.body;

    // Verify the refresh token
    const decoded = await verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Generate new access token
    const newAccessToken = genToken({
      id: decoded.id,
      bid: decoded.bid,
      rid: decoded.rid,
      ra: decoded.ra,
    });

    // Send the new access token to the client
    res.json({ accessToken: newAccessToken.token });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  refreshToken,
};
