const mongoose = require('mongoose');
const Brand = require('../models/sys/brand');
const Product = require('../models/sys/product');
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { checkBrand } = require('../services/checkBrand');
const { checkEmail } = require('../services/checkEmail');
const sys = require('../middlewares/sys/startupIndex');

async function newBrand(req, res) {
  // Start mongoose session to handle transactions
  const session = await mongoose.startSession();
  session.startTransaction();

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
    const brand = await sys.createBrand(req.body, adminId);

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
        orgId: org.orgId,
        orgName: org.orgName,
        teamId: team.teamId,
        teamName: team.teamName,
      },
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    };

    // Create user and password hash
    await sys.createUser(adminUser, req.body.password);

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    // Responsd with success message
    return res.status(201).json({
      Message: 'Brand created successfully',
      Brand: brand,
      User: adminUser,
    });
  } catch (error) {
    // Rollback transaction
    await session.abortTransaction();
    session.endSession();

    console.error('Error creating brand:', error);
    return res.send('Failed to create brand');
  }
}

async function getBrand(req, res) {
  try {
    // Access data from authToken middleware
    const { id: currentUserId, bid: currentBrandId } = req;

    // Assign brand ID from request parameters
    const brandId = req.params.id;

    // Check if the brandId is valid
    if (brandId !== currentBrandId) {
      return res.status(404).json({ Error: 'Brand not found' });
    }

    // Retrieve brand from the database by _id
    const brand = await Brand.findById(currentBrandId);
    if (!brand) {
      return res.status(404).json({ Error: 'Brand not found' });
    }

    // Check if the currentUserId is the admin of the brand
    if (brand.adminId !== currentUserId) {
      return res
        .status(403)
        .json({ Error: 'You are not authorized to access this resource.' });
    }

    // Retrieve all products from the database by brandId
    const products = await Product.find({ brandId: currentBrandId });
    if (!products) {
      return res.status(404).json({ Error: 'No products found' });
    }

    // Retrieve user details from the database by currentUserId
    const user = await User.findById(currentUserId);

    // Return brand, products, and user details
    return res.json({ Brand: brand, Products: products, User: user });
  } catch (error) {
    console.error('Error retrieving brand:', error);
    return res.send('Failed to retrieve brand');
  }
}

async function editBrand(req, res) {
  try {
    // Access data from authToken middleware
    const { id: currentUserId, bid: currentBrandId } = req;

    // Assign brand ID from request parameters
    const brandId = req.params.id;

    // Check if the brandId is valid
    if (brandId !== currentBrandId) {
      return res.status(404).json({ Error: 'Brand not found' });
    }

    // Retrieve brand from the database by _id
    const brand = await Brand.findById(currentBrandId);
    if (!brand) {
      return res.status(404).json({ Error: 'Brand not found' });
    }

    // Check if the currentUserId is the admin of the brand
    if (brand.adminId !== currentUserId) {
      return res
        .status(403)
        .json({ Error: 'You are not authorized to access this resource.' });
    }

    // Extract updated brand details from request body
    const updatedData = req.body;

    // Check for differences between existing data and updated data
    const newData = {};
    for (const key in updatedData) {
      if (brand[key] !== updatedData[key]) {
        newData[key] = updatedData[key];
      }
    }

    if (Object.keys(newData).length === 0) {
      // No changes detected
      return res.status(200).json({ Message: 'No changes to save.' });
    }

    // Update brand data
    newData.dateUpdated = Date.now();
    await Brand.findByIdAndUpdate(currentBrandId, newData);

    return res.json({
      Message: 'Brand updated successfully',
      Brand: newData,
    });
  } catch (error) {
    console.error('Error updating brand:', error);
    return res.send('Failed to update brand');
  }
}

async function editUser(req, res) {
  try {
    // Access data from authToken middleware
    const { id: currentUserId, bid: currentBrandId } = req;

    // Assign brand ID from request parameters
    const brandId = req.params.id;

    // Check if the brandId is valid
    if (brandId !== currentBrandId) {
      return res.status(404).json({ Error: 'Brand not found' });
    }

    // Retrieve brand from the database by _id
    const brand = await Brand.findById(currentBrandId);
    if (!brand) {
      return res.status(404).json({ Error: 'Brand not found' });
    }

    // Check if the currentUserId is the admin of the brand
    if (brand.adminId !== currentUserId) {
      return res
        .status(403)
        .json({ Error: 'You are not authorized to access this resource.' });
    }

    // Retrieve database user using currentUserId
    const user = await User.findById(currentUserId);
    if (!user) {
      return res.status(404).json({ Error: 'User not found' });
    }

    // Extract updated user details from request body
    const updatedData = req.body;

    // Check for differences between existing data and updated data
    const newData = {};
    for (const key in updatedData) {
      if (user[key] !== updatedData[key]) {
        newData[key] = updatedData[key];
      }
    }

    if (Object.keys(newData).length === 0) {
      // No changes detected
      return res.status(200).json({ Message: 'No changes to save.' });
    }

    // Update user data
    newData.dateUpdated = Date.now();
    await User.findByIdAndUpdate(currentUserId, newData);

    return res.json({ Message: 'User updated successfully', User: newData });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.send('Failed to update user');
  }
}

async function addProduct(req, res) {
  try {
    // Access data from authToken middleware
    const { id: currentUserId, bid: currentBrandId } = req;

    // Assign brand ID from request parameters
    const brandId = req.params.id;

    // Check if the brandId is valid
    if (brandId !== currentBrandId) {
      return res.status(404).json({ Error: 'Brand not found' });
    }

    // Retrieve brand from the database by _id
    const brand = await Brand.findById(currentBrandId);
    if (!brand) {
      return res.status(404).json({ Error: 'Brand not found' });
    }

    // Check if the currentUserId is the admin of the brand
    if (brand.adminId !== currentUserId) {
      return res
        .status(403)
        .json({ Error: 'You are not authorized to access this resource.' });
    }

    // Retrieve product ID from request body
    const productId = req.body.productId;

    // Retrieve product from the database by _id
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ Error: 'Product not found' });
    }

    // Update product status to active
    await Product.findByIdAndUpdate(productId, {
      isActive: true,
      dateUpdated: Date.now(),
    });

    return res.json({
      Message: 'Product activated successfully',
      Product: product,
    });
  } catch (error) {
    console.error('Error activating product:', error);
    return res.send('Failed to activate product');
  }
}

async function removeProduct(req, res) {
  try {
    // Access data from authToken middleware
    const { id: currentUserId, bid: currentBrandId } = req;

    // Assign brand ID from request parameters
    const brandId = req.params.id;

    // Check if the brandId is valid
    if (brandId !== currentBrandId) {
      return res.status(404).json({ Error: 'Brand not found' });
    }

    // Retrieve brand from the database by _id
    const brand = await Brand.findById(currentBrandId);
    if (!brand) {
      return res.status(404).json({ Error: 'Brand not found' });
    }

    // Check if the currentUserId is the admin of the brand
    if (brand.adminId !== currentUserId) {
      return res
        .status(403)
        .json({ Error: 'You are not authorized to access this resource.' });
    }

    // Retrieve product ID from request body
    const productId = req.body.productId;

    // Retrieve product from the database by _id
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ Error: 'Product not found' });
    }

    // Update product status to inactive
    await Product.findByIdAndUpdate(productId, {
      isActive: false,
      dateUpdated: Date.now(),
    });

    return res.json({
      Message: 'Product deactivated successfully',
      Product: product,
    });
  } catch (error) {
    console.error('Error deactivating product:', error);
    return res.send('Failed to deactivate product');
  }
}

module.exports = {
  newBrand,
  getBrand,
  editBrand,
  editUser,
  addProduct,
  removeProduct,
};
