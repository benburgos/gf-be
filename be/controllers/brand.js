const { v4: uuidv4 } = require('uuid');
const { checkBrand } = require('../services/checkBrand');
const { checkEmail } = require('../services/checkEmail');
const sys = require('../middlewares/sys/startupIndex');
const User = require('../models/user');

async function newBrand(req, res) {
  try {
    // Check if email or brand name already exists
    const emailExists = await checkEmail(req.body.email);
    const brandExists = await checkBrand(req.body.brandName);

    if (emailExists) {
      return res.send(
        `The email you're attempting to register already exists.`
      );
    } else if (brandExists) {
      return res.send(
        `The company you're attempting to register already exists.`
      );
    }

    // Generate unique admin ID
    const adminId = uuidv4();

    // Create brand
    const brand = await sys.createBrand(req.body);

    // Create org and team
    const org = await sys.createOrg(brand);
    const team = await sys.createTeam(brand);

    // Create product and permissions
    const product = await sys.createProduct(brand);
    const permissions = await sys.createPermissions(brand, product);

    // Create role
    const role = await sys.createRole(brand, permissions);

    // Create admin user
    const adminUser = {
      _id: adminId,
      brandId: brand,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      location: req.body.location,
      role: {
        roleId: role._id,
        roleName: role.name,
      },
      org: {
        orgId: org._id,
        orgName: org.name,
        teamId: team._id,
        teamName: team.name,
      },
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    };

    // Create user and password hash
    await sys.createUser(adminUser, req.body.password);

    // Responsd with success message
    return res
      .status(201)
      .json({ Message: 'Brand created successfully', Brand: brand, User: adminUser});
  } catch (error) {
    console.error('Error creating brand:', error);
    return res.send('Failed to create brand');
  }
}

async function getBrand(req, res) {}

async function editBrand(req, res) {}

module.exports = {
  newBrand,
  getBrand,
  editBrand,
};
