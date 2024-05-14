const User = require('../../models/user');
const Role = require('../../models/sys/role');

async function getUserProfile(req, res) {
  try {
    // Assuming userId is passed in the request parameters
    const userId = req.params.id;

    // Retrieve user from the database
    let userData = await User.findById(
      userId,
      '-_id -brandId -org.orgId -org.teamId'
    );

    // Check if user exists
    if (!userData || userData.isActive === false) {
      return res.status(404).json({ Error: 'User not found' });
    }

    // Retrieve role name from Role collection
    let { name: roleName } = await Role.findById(userData.roleId, 'name -_id');

    // If user exists, return user data
    return res.json({ user: userData, role: roleName });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

module.exports = {
  getUserProfile,
};
