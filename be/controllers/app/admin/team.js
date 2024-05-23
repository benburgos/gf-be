const Team = require('../../../models/team');
const User = require('../../../models/user');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function adminCreateTeam(req, res) {
  try {
    // Access data from authToken middleware
    const { bid: currentBrandId, ra: permissionLevels } = req;

    // Check permission level
    const permissionType = await checkPermission({
      prod: 'admin',
      bid: currentBrandId,
      ra: permissionLevels,
    });
    if (permissionType !== 'rw') {
      return res
        .status(403)
        .json({ Error: 'You are not authorized to access this resource.' });
    }

    // Create a new team object
    const newTeam = new Team({
      // Generate a unique team_id
      _id: uuidv4(),
      brandId: currentBrandId,
      ...req.body,
      // Set date fields
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    });

    // Save the new team document to the database
    await newTeam.save();

    // Respond with success message
    return res
      .status(201)
      .json({ Message: 'Team created successfully', Team: newTeam });
  } catch (error) {
    console.error('Error creating team:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

async function adminGetTeam(req, res) {
  try {
    // Access data from authToken middleware
    const { bid: currentBrandId, ra: permissionLevels } = req;

    // Check permission level
    const permissionType = await checkPermission({
      prod: 'admin',
      bid: currentBrandId,
      ra: permissionLevels,
    });
    if (permissionType !== 'rw') {
      return res
        .status(403)
        .json({ Error: 'You are not authorized to access this resource.' });
    }

    // Access teamId from request params
    const teamId = req.params.id;

    // Retrieve team from the database by _id
    const team = await Team.findOne({ _id: teamId, brandId: currentBrandId });
    if (!team) {
      return res.status(404).json({ Error: 'Team not found' });
    }

    // Count the number of users with the specified role ID and current brand ID
    const userCount = await User.countDocuments({
      brandId: currentBrandId,
      'org.teamId': teamId,
    });

    // Assign the user count to the role object
    team.userCount = userCount;

    return res.json(team);
  } catch (error) {
    console.error('Error getting team:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

async function adminGetTeams(req, res) {
  try {
    // Access data from authToken middleware
    const { bid: currentBrandId, ra: permissionLevels } = req;

    // Check permission level
    const permissionType = await checkPermission({
      prod: 'admin',
      bid: currentBrandId,
      ra: permissionLevels,
    });
    if (permissionType !== 'rw') {
      return res
        .status(403)
        .json({ Error: 'You are not authorized to access this resource.' });
    }

    // Retrieve all teams from the database
    const teams = await Team.find({ brandId: currentBrandId });

    // Iterate through each role to get the user count
    for (let i = 0; i < teams.length; i++) {
      const teamId = teams[i]._id;

      // Count the number of users with the specified role ID and current brand ID
      const userCount = await User.countDocuments({
        brandId: currentBrandId,
        'org.teamId': teamId,
      });

      // Assign the user count to the userCount property of the current role
      teams[i].userCount = userCount;
    }

    return res.json(teams);
  } catch (error) {
    console.error('Error getting teams:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

async function adminEditTeam(req, res) {
  try {
    // Access data from authToken middleware
    const { bid: currentBrandId, ra: permissionLevels } = req;

    // Check permission level
    const permissionType = await checkPermission({
      prod: 'admin',
      bid: currentBrandId,
      ra: permissionLevels,
    });
    if (permissionType !== 'rw') {
      return res
        .status(403)
        .json({ Error: 'You are not authorized to access this resource.' });
    }

    // Access teamId from request params
    const teamId = req.params.id;
    // Extract updated data from request body
    const updatedData = req.body;

    // Retrieve team from the database by _id
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ Error: 'Team not found' });
    }

    // Check for differences between existing data and updated data
    const newData = {};
    Object.keys(updatedData).forEach((key) => {
      if (team[key] !== updatedData[key]) {
        newData[key] = updatedData[key];
      }
    });

    if (Object.keys(newData).length === 0) {
      // No changes detected
      return res.status(200).json({ Message: 'No changes to save.' });
    }

    // Update team document with new data
    newData.dateUpdated = Date.now();
    await Team.findByIdAndUpdate(teamId, newData);

    return res.json({ Message: 'Team updated successfully' });
  } catch (error) {
    console.error('Error updating team:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

async function adminDeleteTeam(req, res) {
  try {
    // Access data from authToken middleware
    const { bid: currentBrandId, ra: permissionLevels } = req;

    // Check permission level
    const permissionType = await checkPermission({
      prod: 'admin',
      bid: currentBrandId,
      ra: permissionLevels,
    });
    if (permissionType !== 'rw') {
      return res
        .status(403)
        .json({ Error: 'You are not authorized to access this resource.' });
    }

    // Access teamId from request params
    const teamId = req.params.id;

    // Retrieve team from the database by _id
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ Error: 'Team not found' });
    }

    // Check if the team being deleted is the Unassigned team
    if (team.name === 'Unassigned') {
      return res.status(403).json({
        Error: 'The Unassigned team cannot be deleted.',
      });
    }

    // Get the ID and name of the Unassigned team
    const unassignedTeam = await Team.findOne({
      brandId: currentBrandId,
      name: 'Unassigned',
    });

    // Get list of users with the team being deleted and matching currentBrandId
    const usersToUpdate = await User.find({
      brandId: currentBrandId,
      'org.teamId': teamId,
    });

    // Update users with Unassigned team ID and name
    await Promise.all(
      usersToUpdate.map(async (user) => {
        user.org.teamId = unassignedTeam._id;
        user.org.teamName = unassignedTeam.name;
        await user.save();
      })
    );

    // Delete the team
    await Team.findByIdAndDelete(teamId);

    return res.json({ Message: 'Team deleted successfully' });
  } catch (error) {
    console.error('Error deleting team:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

module.exports = {
  adminCreateTeam,
  adminGetTeam,
  adminGetTeams,
  adminEditTeam,
  adminDeleteTeam,
};
