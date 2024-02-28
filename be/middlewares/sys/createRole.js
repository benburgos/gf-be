const Role = require('../../models/sys/role');
const { v4: uuidv4 } = require('uuid');

async function createRole(brand, permissions) {
  const seedRoles = ['Company Admin', 'Admin', 'Manager', 'Agent'];
  let role = {
    brandId: brand._id,
    permissions: [],
    isActive: true,
  };
  const roles = [];

  for (let i = 0; i < seedRoles.length; i++) {
    switch (seedRoles[i]) {
      case 'Company Admin':
        const companyAdmin = permissions
          .filter((obj) => obj.type === 'rw')
          .map(({ type, ...rest }) => rest);
        role = {
          ...role,
          _id: uuidv4(),
          name: seedRoles[i],
          permissions: companyAdmin,
        };
        roles.push(role);
        break;
      case 'Admin':
        const admin = permissions
          .filter((obj) => obj.type === 'rw')
          .map(({ type, ...rest }) => rest);
        role = {
          ...role,
          _id: uuidv4(),
          name: seedRoles[i],
          permissions: admin,
        };
        roles.push(role);
        break;
      case 'Manager':
        const manager = permissions
          .filter((obj) => obj.type === 'w')
          .map(({ type, ...rest }) => rest);
        role = {
          ...role,
          _id: uuidv4(),
          name: seedRoles[i],
          permissions: manager,
        };
        roles.push(role);
        break;
      case 'Agent':
        const agent = permissions
          .filter((obj) => obj.type === 'r')
          .map(({ type, ...rest }) => rest);
        role = {
          ...role,
          _id: uuidv4(),
          name: seedRoles[i],
          permissions: agent,
        };
        roles.push(role);
        break;
    }
  }

  Role.insertMany(roles);
  console.log(`${roles.length} roles were added to company, ${brand.name}.`);
  return roles[0]._id;
}

module.exports = {
  createRole,
};