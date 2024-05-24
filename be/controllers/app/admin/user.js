const User = require('../../../models/user');
const Pwh = require('../../../models/pwh');
const Role = require('../../../models/sys/role');
const Org = require('../../../models/org');
const Team = require('../../../models/team');
const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../../../middlewares/genHash');
const { checkEmail } = require('../../../services/checkEmail');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function adminCreateUserOptions(req, res) {
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

    // Retrieve leaders, roles, orgs, and teams in parallel
    const [leaders, roles, orgs, teams] = await Promise.all([
      User.find({ brandId: currentBrandId, isLeader: true }).catch((error) => {
        console.error('Error fetching leaders:', error);
        return [];
      }),
      Role.find({ brandId: currentBrandId }).catch((error) => {
        console.error('Error fetching roles:', error);
        return [];
      }),
      Org.find({ brandId: currentBrandId }).catch((error) => {
        console.error('Error fetching orgs:', error);
        return [];
      }),
      Team.find({ brandId: currentBrandId }).catch((error) => {
        console.error('Error fetching teams:', error);
        return [];
      }),
    ]);

    return res.json({
      Leaders: leaders,
      Roles: roles,
      Orgs: orgs,
      Teams: teams,
    });
  } catch (error) {
    console.error('Error fetching options:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

async function adminCreateUser(req, res) {
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

    // Extract user data from request body
    const { password, email, ...userData } = req.body;

    // Check if the email already exists
    const emailExists = await checkEmail(email);
    if (emailExists) {
      return res.status(400).json({
        Error: "The email you're attempting to register already exists.",
      });
    }

    // Create a new user document
    const newUser = new User({
      ...userData,
      // Generate a unique user ID
      _id: uuidv4(),
      brandId: currentBrandId,
      // Set date fields
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    });

    // Save the new user document to the database
    await newUser.save();

    // Save password hash in the Pwh model
    const hashedPassword = await hashPassword(password);
    const pwhData = {
      _id: uuidv4(),
      userId: newUser._id,
      pwh: hashedPassword,
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    };
    const newPwh = new Pwh(pwhData);
    await newPwh.save();

    // Respond with success message
    return res
      .status(201)
      .json({ Message: 'User created successfully', User: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

async function adminGetUser(req, res) {
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

    // Assign user ID from request parameters
    const userId = req.params.id;

    // Retrieve user from the database by _id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ Error: 'User not found' });
    }

    // Retrieve roles from the database by brandId
    let roles = [];
    try {
      roles = await Role.find({ brandId: currentBrandId });
    } catch (error) {
      console.error('Error fetching roles:', error);
    }

    // Retrieve orgs from the database by brandId
    let orgs = [];
    try {
      orgs = await Org.find({ brandId: currentBrandId });
    } catch (error) {
      console.error('Error fetching orgs:', error);
    }

    // Retrieve teams from the database by brandId
    let teams = [];
    try {
      teams = await Team.find({ brandId: currentBrandId });
    } catch (error) {
      console.error('Error fetching teams:', error);
    }

    return res.json({
      User: user,
      Roles: roles,
      Orgs: orgs,
      Teams: teams,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

async function adminGetUsers(req, res) {
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

    // Retrieve all users from the database
    const users = await User.find({ brandId: currentBrandId });
    return res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

async function adminEditUser(req, res) {
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

    // Assign user ID from request parameters
    const userId = req.params.id;
    // Extract updated data from request body
    const updatedData = req.body;

    // Retrieve user from the database by _id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ Error: 'User not found' });
    }

    // Check for differences between existing data and updated data
    const newData = {};
    Object.keys(updatedData).forEach((key) => {
      if (user[key] !== updatedData[key]) {
        newData[key] = updatedData[key];
      }
    });

    if (Object.keys(newData).length === 0) {
      // No changes detected
      return res.status(200).json({ Message: 'No changes to save.' });
    }

    // Update user data
    newData.dateUpdated = Date.now();
    await User.findByIdAndUpdate(userId, newData);

    return res.json({ Message: 'User updated successfully', User: newData });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

module.exports = {
  adminCreateUserOptions,
  adminCreateUser,
  adminGetUser,
  adminGetUsers,
  adminEditUser,
};
