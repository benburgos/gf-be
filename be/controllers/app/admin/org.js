const Org = require('../../../models/org');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function adminCreateOrg(req, res) {
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

    // Create a new org object
    const newOrg = new Org({
      // Generate a unique org_id
      _id: uuidv4(),
      brandId: currentBrandId,
      ...req.body,
      // Set date fields
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    });

    // Save the new org document to the database
    await newOrg.save();

    // Respond with success message
    return res
      .status(201)
      .json({ Message: 'Organization created successfully', Org: newOrg });
  } catch (error) {
    console.error('Error creating organization:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

async function adminGetOrg(req, res) {
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

    // Assign org ID from request parameters
    const orgId = req.params.id;

    // Retrieve org from the database by _id
    const org = await Org.findById(orgId);
    if (!org) {
      return res.status(404).json({ Error: 'Organization not found' });
    }

    return res.json(org);
  } catch (error) {
    console.error('Error fetching organization:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

async function adminGetOrgs(req, res) {
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

    // Retrieve all orgs from the database
    const orgs = await Org.find({ brandId: currentBrandId });
    return res.json(orgs);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

async function adminEditOrg(req, res) {
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
  } catch (error) {}
}

async function adminDeleteOrg(req, res) {
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
  } catch (error) {}
}

module.exports = {
  adminCreateOrg,
  adminGetOrg,
  adminGetOrgs,
  adminEditOrg,
};
