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
      _id: uuidv4(),
      name: req.body.name,
      brandId: req.bid,
      permissions: [],
      isActive: true,
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    };

    const products = await Product.find({ brandId: req.bid });
    const permissions = await Permission.find({ brandId: req.bid });

    for (let i = 0; i < products.length; i++){
        let permissionObj = {}
        
        let product = products.find((obj) => obj.desc === req.body.products[i].product)
        let permission = permissions.find((obj) => obj.type === req.body.products[i].permission && obj.productId === product._id)

        permissionObj.productId = product._id
        permissionObj.pId = permission._id
        req.body.permissions.push(permissionObj)
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
async function getRole(req, res) {}
async function getRoles(req, res) {}
async function editRole(req, res) {}
async function deleteRole(req, res) {}

module.exports = {
  createRole,
  getRole,
  getRoles,
  editRole,
  deleteRole,
};
