const Role = require('../../models/sys/role');
const { v4: uuidv4 } = require('uuid');

async function createRole(brand, permissions) {
  try {
    const seedRoles = ['Company Admin', 'Admin', 'Manager', 'Agent', 'Team Lead', 'Unassigned'];
    const roles = [];

    let companyAdminId;

    for (let i = 0; i < seedRoles.length; i++) {
      let role = {
        brandId: brand,
        permissions: [],
        isActive: true,
        _id: uuidv4(),
        name: seedRoles[i],
        dateUpdated: Date.now(),
        dateCreated: Date.now(),
      };

      switch (seedRoles[i]) {
        case 'Company Admin':
          role.permissions = permissions.filter((obj) => obj.type === 'rw').map(({ type, ...rest }) => rest);
          companyAdminId = role._id; // Save the _id of the 'Company Admin' role
          break;
        case 'Admin':
          role.permissions = permissions.filter((obj) => obj.type === 'rw').map(({ type, ...rest }) => rest);
          break;
        case 'Manager':
          role.permissions = permissions.filter((obj) => obj.type === 'w').map(({ type, ...rest }) => rest);
          break;
        case 'Agent':
          role.permissions = permissions.filter((obj) => obj.type === 'r').map(({ type, ...rest }) => rest);
          break;
        case 'Team Lead':
          role.permissions = permissions.filter((obj) => obj.type === 'w').map(({ type, ...rest }) => rest);
          break;
        case 'Unassigned':
          role.permissions = permissions.filter((obj) => obj.type === 'r').map(({ type, ...rest }) => rest);
          break;
      }

      roles.push(role);
    }

    await Role.insertMany(roles);

    // Find the 'Company Admin' role and return its _id and name
    const companyAdminRole = roles.find(role => role.name === 'Company Admin');
    return { _id: companyAdminRole._id, name: companyAdminRole.name };
  } catch (error) {
    console.error('Error creating roles:', error);
    throw new Error('Failed to create roles');
  }
}

module.exports = {
  createRole,
};
