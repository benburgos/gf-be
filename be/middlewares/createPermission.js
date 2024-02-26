const Permission = require('../models/permission');
const { v4: uuidv4 } = require('uuid');

async function createPermissions(brand, product) {
  const permissionList = ['r', 'w', 'rw'];
  const permissions = [];

  for (let i = 0; i < product.length; i++) {
    for (let j = 0; j < permissionList.length; j++) {
      const permission = {
        _id: uuidv4(),
        type: permissionList[j],
        brandId: brand._id,
        productId: product[i]._id,
        dateUpdated: Date.now(),
        dateCreated: Date.now(),
      };

      permissions.push(permission);
    }
  }

  Permission.insertMany(permissions);
  console.log(
    `${permissions.length} permissions were added to company, ${brand.name}.`
  );

  return permissions
}

module.exports = {
  createPermissions,
};
