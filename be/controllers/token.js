const { verifyRefreshToken } = require('../middlewares/verifyRefreshToken');
const User = require('../models/user');
const Role = require('../models/sys/role');
const { genToken } = require('../services/genToken');

// Controller function for refreshing tokens
async function refreshToken(req, res) {
  try {
    // Extract refresh token from request body
    const { refreshToken } = req.body;

    // Verify the refresh token
    const decoded = await verifyRefreshToken(refreshToken);
    const user = await User.findOne({ _id: decoded.userId });
    const role = await Role.findOne({ _id: user.role.roleId });

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    // Generate new access token
    const newAccessToken = genToken({
      id: decoded.userId,
      bid: user.brandId,
      rid: user.roleId,
      ra: role.permissions,
    });

    // Send the new access token to the client
    res.json({ token: newAccessToken.token });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  refreshToken,
};
