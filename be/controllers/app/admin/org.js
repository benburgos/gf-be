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

    // Assign org ID from request parameters
    const orgId = req.params.id;
    // Extract updated data from request body
    const updatedData = req.body;

    // Retrieve org from the database by _id
    const org = await Org.findById(orgId);
    if (!org) {
      return res.status(404).json({ Error: 'Organization not found' });
    }

    // Check for differences between existing data and updated data
    const newData = {};
    Object.keys(updatedData).forEach((key) => {
      if (org[key] !== updatedData[key]) {
        newData[key] = updatedData[key];
      }
    });

    if (Object.keys(newData).length === 0) {
      // No changes detected
      return res.status(200).json({ Message: 'No changes to save.' });
    }

    // Update user data
    newData.dateUpdated = Date.now();
    await Org.findByIdAndUpdate(orgId, newData);

    return res.json({ Message: 'Organization updated successfully', Org: newData });
  } catch (error) {
    console.error('Error updating organization:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
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

    // Get org ID from request params
    const orgId = req.params.id;

    // Find org by ID and brandId
    const org = await Org.findOne({ _id: orgId, brandId: currentBrandId });
    if (!org) {
      return res.status(404).json({ Error: 'Organization not found' });
    }

    // Check if the org being deleted is the 'Unassigned' org
    if (org.name === 'Unassigned') {
      return res
        .status(400)
        .json({ Error: "You cannot delete the default 'Unassigned' organization." });
    }

    // Get the ID and name of the 'Unassigned' org
    const unassignedOrg = await Org.findOne(
      { brandId: currentBrandId, name: 'Unassigned' },
      '_id name'
    );

    // Get list of users with the org being deleted and matching currentBrandId
    const usersToUpdate = await User.find({
      'org.orgId': orgId,
      brandId: currentBrandId,
    });

    // Update users with 'Unassigned' org ID and name
    await Promise.all(
      usersToUpdate.map(async (user) => {
        user.org.orgId = unassignedOrg._id;
        user.org.orgName = unassignedOrg.name;
        await user.save();
      })
    );

    // Delete the org
    await Org.findByIdAndDelete(orgId);

    return res.status(200).json({ message: 'Organization deleted successfully' });
  } catch (error) {
    console.error('Error deleting organization:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

module.exports = {
  adminCreateOrg,
  adminGetOrg,
  adminGetOrgs,
  adminEditOrg,
  adminDeleteOrg,
};
