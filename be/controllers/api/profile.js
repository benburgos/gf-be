const User = require('../../models/user');
const Role = require('../../models/sys/role');

async function getUserProfile(req, res) {
  try {
    // Grabs userId from the request parameters
    const userId = req.params.id;

    // Retrieve user from the database
    let userData = await User.findById(
      userId,
      '-_id -brandId -role.roleId -org.orgId -org.teamId'
    );

    // Check if user exists
    if (!userData || userData.isActive === false) {
      return res.status(404).json({ Error: 'User not found' });
    }

    // Retrieve manager details, if available
    let managerData = {};
    if (userData.managerId.length > 0) {
      managerData = await User.findById(
        userData.managerId,
        'firstName lastName email phoneNumber location role.roleName photoUrl'
      );
    }

    // Retrieve user's team members
    let teamMembers = await User.find(
      { managerId: managerData._id },
      'firstName lastName role.roleName photoUrl'
    );

    // Transforms Data
    let data = {
      user: {
        ...userData._doc,
      },
      manager: {
        ...managerData._doc,
      },
      teamMembers: teamMembers
      .filter(member => member._doc._id !== req.params.id)
      .map(member => ({ ...member._doc })),
    }
    

    // If user exists, return user data
    return res.json(data);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ Error: 'Internal server error'});
  }
}

module.exports = {
  getUserProfile,
};
