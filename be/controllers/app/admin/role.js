const Role = require('../../../models/sys/role');
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
  } catch (error) {}
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
  } catch (error) {}
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
  } catch (error) {}
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
  } catch (error) {}
}

module.exports = {
  adminCreateRole,
  adminGetRole,
  adminGetRoles,
  adminEditRole,
  adminDeleteRole,
};
