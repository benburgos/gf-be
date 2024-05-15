const login = require('./login');
const brand = require('./brand');
const appToken = require('./token');
const appLogin = require('./app/login');
const appUserProfile = require('./app/profile');
const appAdminUser = require('./app/admin/user');
const appAdminRole = require('./app/admin/role');
const appAdminOrg = require('./app/admin/org');
const appAdminTeam = require('./app/admin/team');

module.exports = {
  login,
  brand,
  appToken,
  appLogin,
  appUserProfile,
  appAdminUser,
  appAdminRole,
  appAdminOrg,
  appAdminTeam,
};
