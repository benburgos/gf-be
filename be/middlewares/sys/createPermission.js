const Permission = require('../../models/sys/permission');
const { v4: uuidv4 } = require('uuid');

async function createPermissions(brand, products, session) {
  try {
    // List of permission types
    const permissionList = ['r', 'w', 'rw'];
    const permissions = [];
    const permissionData = [];

    // Loop through each product
    for (let i = 0; i < products.length; i++) {
      // Loop through each permission type
      for (let j = 0; j < permissionList.length; j++) {
        // Create permission object
        const permission = {
          _id: uuidv4(),
          type: permissionList[j],
          brandId: brand,
          productId: products[i]._id,
          dateUpdated: Date.now(),
          dateCreated: Date.now(),
        };

        // Push permission to permissions array
        permissions.push(permission);

        // Create permission data object
        const data = {
          productId: permission.productId,
          pId: permission._id,
          type: permission.type,
        };

        // Push permission data to permissionData array
        permissionData.push(data);
      }
    }

    // Insert permissions into database
    await Permission.insertMany(permissions, { session });

    // Return permission data array
    return permissionData;
  } catch (error) {
    console.error('Error creating permissions:', error);
    throw new Error('Failed to create permissions');
  }
}

module.exports = {
  createPermissions,
};
