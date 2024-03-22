const Org = require('../../models/org');
const { v4: uuidv4 } = require('uuid');

async function createOrg(data) {
  const orgsToCreate = [
    (unassignedOrg = {
      _id: uuidv4(),
      brandId: data._id,
      name: 'Unassigned',
      desc: 'Users without a current org assignment.',
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    }),
    (adminOrg = {
      _id: uuidv4(),
      brandId: data._id,
      name: 'System Admin',
      desc: 'Company administrator user org.',
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    }),
  ]

  await Org.insertMany(orgsToCreate)
  console.log(
    `${products.length} products were added to company, ${data.name}.`
  );

  return orgsToCreate[1]
}

module.exports = {
  createOrg,
};
