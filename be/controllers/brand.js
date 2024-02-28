const User = require('../models/user');
const Pwh = require('../models/pwh');
const Brand = require('../models/sys/brand');
const Role = require('../models/sys/role');
const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../middlewares/genHash');
const { createBrand } = require('../middlewares/sys/createBrand');
const { createProduct } = require('../middlewares/sys/createProduct');
const { createPermissions } = require('../middlewares/sys/createPermission');
const { createRole } = require('../middlewares/sys/createRole');
const { checkBrand } = require('../services/checkBrand');
const { checkEmail } = require('../services/checkEmail');

// Create User
async function newBrand(req, res) {
  const brandCheck = await checkBrand(req.body.brandName);
  const emailCheck = await checkEmail(req.body.email);

  if (emailCheck) {
    res.send(`The email you're attempting to register already exists.`);
    return;
  } else if (brandCheck) {
    res.send(`The company you're attempting to register already exists.`);
    return;
  } else if (!emailCheck && !brandCheck) {
    const brand = await createBrand(req.body);
    const product = await createProduct(brand);
    const permissions = await createPermissions(brand, product);
    const role = await createRole(brand, permissions);
    req.body = {
      ...req.body,
      _id: uuidv4(),
      brandId: brand._id,
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
      res.send(
        `New company, ${brand.name}, was created under new company admin, ${user.firstName}.`
      );
    } catch (err) {
      res.send(err);
    }
  }
}

// Get Single User
async function getBrand(req, res) {
  const role = await Role.findOne({ _id: req.rid });

  if (role.name === 'Company Admin') {
    try {
      const brand = await Brand.findOne({ _id: req.params.id });
      const user = await User.findOne({ _id: req.id });
      // Shows user who accessed page, may think about creating event log.
      console.log(
        `User ${user.firstName} has viewed the company, ${brand.name}'s page.`
      );
      res.send(brand);
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send(
      `Only your company admin has access to this page, redirecting to your app.`
    );
  }
}

module.exports = {
  newBrand,
  getBrand,
};
