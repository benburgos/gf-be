const User = require('../../models/user');
// const Pwh = require('../../models/pwh');
const Role = require('../../models/sys/role');
// const { v4: uuidv4 } = require('uuid');
// const { hashPassword } = require('../../middlewares/genHash');
// const { checkEmail } = require('../../services/checkEmail');
// const { checkPermission } = require('../../middlewares/checkPermission');

async function getUser(req, res) {
  try {
    // Assuming userId is passed in the request parameters
    const userId = req.params.id;

    // Retrieve user from the database
    const userData = await User.findById(
      userId,
      '-_id -brandId -org.orgId -org.teamId'
    );
    const roleData = await Role.findById(userData.roleId, 'name -_id');

    // Check if user exists
    if (!userData || userData.isActive === false) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If user exists, return user data
    return res.json({user: userData, role: roleData});
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getUser,
};
