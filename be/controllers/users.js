const User = require('../models/user');
const Pwh = require('../models/pwh');
const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../middlewares/genHash');
const { createBrand } = require('../middlewares/createBrand');
const { createProduct } = require('../middlewares/createProduct');
const { createPermissions } = require('../middlewares/createPermission');
const { createRole } = require('../middlewares/createRole');
const { checkBrand } = require('../services/checkBrand');

// Create User
async function createUser(req, res) {
  const check = await checkBrand(req.body.brandName);

  if (check) {
    res.send(`The company you're attempting to register already exists.`);
    return;
  } else {
    const brand = await createBrand(req.body);
    const product = await createProduct(brand);
    const permissions = await createPermissions(brand, product);
    const role = await createRole(brand, permissions);
      req.body = {
        ...req.body,
        _id: uuidv4(),
        brandId: brand,
        roleId: role,
        dateUpdated: Date.now(),
        dateCreated: Date.now(),
      };
      pw = await hashPassword(req.body.pw);
      try {
        const user = await User.create(req.body);
        const hash = await Pwh.create({
          ...req.body,
          _id: uuidv4(),
          userId: user._id,
          pwh: pw,
        });
        res.send(`New user, ${user.firstName}, was created.`);
      } catch (err) {
        res.send(err);
      }
  }
}

// Get Single User
async function getUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.id });
    // Shows user who accessed page, may think about creating event log.
    console.log(`User ${req.id} has viewed ${user.firstName}'s page.`);
    res.send(user);
  } catch (err) {
    res.send(err);
  }
}

// Get All Users
async function getUsers(req, res) {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createUser,
  getUser,
  getUsers,
};
