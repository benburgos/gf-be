const Team = require('../../models/team');
const { v4: uuidv4 } = require('uuid');

async function createTeam(data) {
  try {
    // Define teams to create
    const teamsToCreate = [
      {
        _id: uuidv4(),
        brandId: data,
        name: 'Unassigned',
        desc: 'Users without a current team assignment.',
        dateUpdated: Date.now(),
        dateCreated: Date.now(),
      },
      {
        _id: uuidv4(),
        brandId: data,
        name: 'Admin',
        desc: 'Company administrator user team.',
        dateUpdated: Date.now(),
        dateCreated: Date.now(),
      }
    ];

    // Insert teams into database
    await Team.insertMany(teamsToCreate);

    // Find and return the Admin team
    const adminTeam = teamsToCreate.find(team => team.name === 'Admin');
    return { _id: adminTeam._id, name: adminTeam.name };
  } catch (error) {
    console.error('Error creating teams:', error);
    throw new Error('Failed to create teams');
  }
}

module.exports = {
  createTeam,
};
