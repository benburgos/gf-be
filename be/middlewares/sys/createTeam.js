const Team = require('../../models/team');
const { v4: uuidv4 } = require('uuid');

async function createTeam(data) {
  const teamsToCreate = [
    (unassignedTeam = {
      _id: uuidv4(),
      brandId: data._id,
      name: 'Unassigned',
      desc: 'Users without a current team assignment.',
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    }),
    (adminTeam = {
      _id: uuidv4(),
      brandId: data._id,
      name: 'Admin',
      desc: 'Company administrator user team.',
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    }),
  ];

  await Team.insertMany(teamsToCreate)
  console.log(
    `${teamsToCreate.length} teams were added to company, ${data.name}.`
  );

  return teamsToCreate[1]
}

module.exports = {
  createTeam,
};
