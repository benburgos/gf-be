const Org = require('../../models/org');
const { v4: uuidv4 } = require('uuid');

async function createOrg(data) {
  try {
    // Define orgs to create
    const orgsToCreate = [
      {
        _id: uuidv4(),
        brandId: data,
        name: 'Unassigned',
        desc: 'Users without a current org assignment.',
        dateUpdated: Date.now(),
        dateCreated: Date.now(),
      },
      {
        _id: uuidv4(),
        brandId: data,
        name: 'System Admin',
        desc: 'Company administrator user org.',
        dateUpdated: Date.now(),
        dateCreated: Date.now(),
      }
    ];

    // Insert orgs into database
    await Org.insertMany(orgsToCreate);

    console.log(`${orgsToCreate.length} orgs were added to company.`);
    
    // Find the org for 'System Admin' and return the _id and name
    const systemAdminOrg = orgsToCreate.find(org => org.name === 'System Admin');
    return { orgId: systemAdminOrg._id, orgName: systemAdminOrg.name };
  } catch (error) {
    console.error('Error creating orgs:', error);
    throw new Error('Failed to create orgs');
  }
}

module.exports = {
  createOrg,
};
