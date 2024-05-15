const Role = require('../../../models/sys/role');
const User = require('../../../models/user');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function adminCreateRole(req, res) {
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

    // Assign role data from request body
    const roleData = req.body;

    // Create a new role document
    const newRole = new Role({
      ...roleData,
      brandId: currentBrandId,
      // Generate a unique roleId
      roleId: uuidv4(),
      // Set date fields
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    });

    // Save the new role document to the database
    await newRole.save();

    // Respond with success message
    return res
      .status(201)
      .json({ Message: 'Role created successfully', Role: newRole });
  } catch (error) {
    console.error('Error creating role:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

async function adminGetRole(req, res) {
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

    // Assign role ID from request parameters
    const roleId = req.params.id;

    // Retrieve role from the database by _id
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ Error: 'Role not found' });
    }

    return res.json(role);
  } catch (error) {
    console.error('Error fetching role:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

async function adminGetRoles(req, res) {
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

    // Retrieve all roles from the database
    const roles = await Role.find({ brandId: currentBrandId });
    return res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

async function adminEditRole(req, res) {
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

    // Assign role ID from request parameters
    const roleId = req.params.id;
    // Extract updated data from request body
    const updatedData = req.body;

    // Retrieve user from the database by _id
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ Error: 'Role not found' });
    }

    // Check for differences between existing data and updated data
    const newData = {};
    Object.keys(updatedData).forEach((key) => {
      if (role[key] !== updatedData[key]) {
        newData[key] = updatedData[key];
      }
    });

    if (Object.keys(newData).length === 0) {
      // No changes detected
      return res.status(200).json({ Message: 'No changes to save.' });
    }

    // Update role data
    newData.dateUpdated = Date.now();
    await Role.findByIdAndUpdate(roleId, newData);

    return res.json({ Message: 'Role updated successfully', Role: newData });
  } catch (error) {
    console.error('Error updating role:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

async function adminDeleteRole(req, res) {
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

    // Get role ID from request params
    const roleId = req.params.id;

    // Find role by ID and brandId
    const role = await Role.findOne({ _id: roleId, brandId: currentBrandId });
    if (!role) {
      return res.status(404).json({ Error: 'Role not found' });
    }

    // Check if the role being deleted is the 'Unassigned' role
    if (role.name === 'Unassigned') {
      return res
        .status(400)
        .json({ Error: "You cannot delete the default 'Unassigned' role." });
    }

    // Get the ID and name of the 'Unassigned' role
    const unassignedRole = await Role.findOne(
      { brandId: currentBrandId, name: 'Unassigned' },
      '_id name'
    );

    // Get list of users with the role being deleted and matching currentBrandId
    const usersToUpdate = await User.find({
      'role._id': roleId,
      brandId: currentBrandId,
    });

    // Update users with 'Unassigned' role ID and name
    await Promise.all(
      usersToUpdate.map(async (user) => {
        user.role._id = unassignedRole._id;
        user.role.name = unassignedRole.name;
        await user.save();
      })
    );

    // Delete the role
    await Role.findByIdAndDelete(roleId);

    return res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Error deleting role:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

module.exports = {
  adminCreateRole,
  adminGetRole,
  adminGetRoles,
  adminEditRole,
  adminDeleteRole,
};
