const Permission = require('../../models/sys/permission');
const { v4: uuidv4 } = require('uuid');

async function createPermissions(brand, product) {
  const permissionList = ['r', 'w', 'rw'];
  const permissions = [];
  const dataArr = [];

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

      const data = {
        productId: permission.productId,
        pId: permission._id,
        type: permission.type,
      };

      permissions.push(permission);
      dataArr.push(data);
    }
  }

  Permission.insertMany(permissions);
  console.log(
    `${permissions.length} permissions were added to company, ${brand.name}.`
  );

  return dataArr;
}

module.exports = {
  createPermissions,
};
