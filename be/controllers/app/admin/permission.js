const Permission = require('../../../models/sys/permission');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function adminGetPermission(req, res) {
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

    // Assign permission ID from request parameters
    const permissionId = req.params.id;

    // Retrieve permission from the database by _id
    const permission = await Permission.findById(permissionId);
    if (!permission) {
      return res.status(404).json({ Error: 'Permission not found' });
    }

    return res.json(permission);
  } catch (error) {
    console.error('Error fetching permission:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

async function adminGetPermissions(req, res) {
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

    // Retrieve all permissions from the database
    const permissions = await Permission.find({ brandId: currentBrandId });
    return res.json(permissions);
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

module.exports = {
  adminGetPermission,
  adminGetPermissions,
};
