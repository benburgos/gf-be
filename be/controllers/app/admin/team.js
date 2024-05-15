const Team = require('../../../models/team');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function adminCreateTeam(req, res) {
  try {
    // Access data from authToken middleware
    const { bid: currentBrandId, ra: permissionLevels } = req;

    // Check permission level
    const permissionType = checkPermission({
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
    const permissionType = checkPermission({
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
    const permissionType = checkPermission({
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
    const permissionType = checkPermission({
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
    const permissionType = checkPermission({
      prod: 'admin',
      bid: currentBrandId,
      ra: permissionLevels,
    });
    if (permissionType !== 'rw') {
      return res
        .status(403)
        .json({ Error: 'You are not authorized to access this resource.' });
    }
  } catch (error) {}
}

module.exports = {
  adminCreateTeam,
  adminGetTeam,
  adminGetTeams,
  adminEditTeam,
  adminDeleteTeam,
};
