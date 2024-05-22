const User = require('../../models/user');

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

    // Initialize managerData as null
    let managerData = null;

    // Retrieve manager details, if available
    if (userData.managerId && userData.managerId.length > 0) {
      managerData = await User.findById(
        userData.managerId,
        'firstName lastName email phoneNumber location role.roleName photoUrl'
      );
    }

    // Initialize teamMembers as null
    let teamMembers = null;

    // Retrieve user's team members, if managerData exists
    if (managerData) {
      const members = await User.find(
        { managerId: managerData._id },
        'firstName lastName role.roleName photoUrl'
      );

      if (members.length > 0) {
        teamMembers = members
          .filter((member) => member._doc._id.toString() !== userId)
          .map((member) => ({ ...member._doc }));
      }
    }

    // Transforms Data
    let data = {
      user: {
        ...userData._doc,
      },
      manager: managerData ? { ...managerData._doc } : null,
      teamMembers: teamMembers,
    };

    // If user exists, return user data
    return res.json(data);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

module.exports = {
  getUserProfile,
};
