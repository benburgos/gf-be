const Role = require('../../models/sys/role');
const Permission = require('../../models/sys/permission');
const Product = require('../../models/sys/product');
const User = require('../../models/user');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../middlewares/checkPermission');

async function createRole(req, res) {
  const data = {
    prod: 'admin',
    bid: req.bid,
    ra: req.ra,
  };
  const type = await checkPermission(data);

  if (type === 'rw') {
    req.body = {
      ...req.body,
      _id: uuidv4(),
      name: req.body.name,
      brandId: req.bid,
      permissions: [],
      isActive: true,
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    };

    const products = await Product.find({ brandId: req.bid }, '_id desc');
    const permissions = await Permission.find(
      { brandId: req.bid },
      '_id productId type'
    );

    for (let i = 0; i < req.body.products.length; i++) {
      let currentProduct = products.find(
        (obj) => obj.desc === req.body.products[i].product
      );
      let currentPermission = permissions.find(
        (obj) =>
          obj.productId === currentProduct._id &&
          obj.type === req.body.products[i].permission
      );

      let newPermissionObj = {
        productId: currentProduct._id,
        pId: currentPermission._id,
      };

      req.body.permissions.push(newPermissionObj);
    }

    try {
      const role = await Role.create(req.body);
      res.send(`New role, ${role.name}, was added to the database.`);
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function getRole(req, res) {
  const data = {
    prod: 'admin',
    bid: req.bid,
    ra: req.ra,
  };
  const type = await checkPermission(data);

  if (type === 'w' || 'rw') {
    const foundRole = await Role.findOne({ _id: req.params.id });
    const userCount = await User.countDocuments({
      brandId: req.bid,
      roleId: foundRole._id,
    });
    const foundProducts = await Product.find({ brandId: req.bid }, '_id desc');
    const foundPermissions = await Permission.find(
      { brandId: req.bid },
      '_id productId type'
    );

    foundRole.userCount = userCount;

    for (let i = 0; i < foundRole.permissions.length; i++) {
      let productName = foundProducts.find(
        (obj) => obj._id === foundRole.permissions[i].productId
      );
      let permissionName = foundPermissions.find(
        (obj) =>
          obj.productId === productName._id &&
          obj._id === foundRole.permissions[i].pId
      );

      foundRole.permissions[i] = {
        productId: productName.desc,
        pId: permissionName.type,
      };
    }

    if (foundRole && foundRole.brandId === req.bid) {
      res.json(foundRole);
    } else if (foundRole && foundRole.brandId !== req.bid) {
      res.send(`You do not belong to the same organization as this team.`);
    } else {
      res.send(`Team does not exist.`);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function getRoles(req, res) {
  const data = {
    prod: 'admin',
    bid: req.bid,
    ra: req.ra,
  };
  const type = await checkPermission(data);

  if (type === 'w' || 'rw') {
    let roles = await Role.find({ brandId: req.bid }, '_id name isActive');

    for (let i = 0; i < roles.length; i++) {
      let roleCount = await User.countDocuments({
        brandId: req.bid,
        roleId: roles[i]._id,
      });
      roles[i].userCount = roleCount;
    }
    res.send(roles);
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function editRole(req, res) {
  const data = {
    prod: 'admin',
    bid: req.bid,
    ra: req.ra,
  };
  const type = await checkPermission(data);

  if (type === 'rw') {
    const foundRole = await Role.findOne({ _id: req.params.id });

    if (foundRole && foundRole.brandId === req.bid) {
      const products = await Product.find({ brandId: req.bid }, '_id desc');
      const permissions = await Permission.find(
        { brandId: req.bid },
        '_id productId type'
      );
      const permissionsArr = []

      for (let i = 0; i < req.body.products.length; i++) {
        let currentProduct = products.find(
          (obj) => obj.desc === req.body.products[i].product
        );
        let currentPermission = permissions.find(
          (obj) =>
            obj.productId === currentProduct._id &&
            obj.type === req.body.products[i].permission
        );

        let newPermissionObj = {
          productId: currentProduct._id,
          pId: currentPermission._id,
        };

        permissionsArr.push(newPermissionObj);
      }

      req.body.permissions = permissionsArr;
      req.body.dateUpdated = Date.now();
      let savedRole = await Role.findOneAndUpdate(
        { _id: foundRole._id },
        req.body
      );

      res.send(`Role, ${savedRole.name}, has been updated.`);
    } else if (foundRole && foundRole.brandId !== req.bid) {
      res.send(`You do not belong to this organization.`);
    } else {
      res.send(`Role does not exist.`);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function deleteRole(req, res) {
    const data = {
        prod: 'admin',
        bid: req.bid,
        ra: req.ra,
      };
      const type = await checkPermission(data);
    
      if (type === 'rw') {
        const foundRole = await Role.findOne({ _id: req.params.id });
    
        if (foundRole.name === 'Unassigned') {
          res.send(`You cannot delete the default 'Unassigned' role.`);
        } else {
          if (foundRole && foundRole.brandId === req.bid) {
            const unassignedRole = await Role.findOne({
              brandId: req.bid,
              name: 'Unassigned',
            });
            const impactedUsers = await User.updateMany(
              { brandId: req.bid, roleId: foundRole._id },
              { $set: { roleId: unassignedRole._id } }
            );
            await Role.findOneAndDelete({ _id: foundRole._id });
    
            res.send(`Role, ${foundRole.name}, has been removed from the database. ${(impactedUsers).modifiedCount} have been reassigned to the ${unassignedRole.name} role.`);
          } else if (foundRole && foundRole.brandId !== req.bid) {
            res.send(`You do not belong to the same organization as this user.`);
          } else {
            res.send(`Role does not exist.`);
          }
        }
      } else {
        res.send(`You are not authorized to access this resource.`);
      }
}

module.exports = {
  createRole,
  getRole,
  getRoles,
  editRole,
  deleteRole,
};
