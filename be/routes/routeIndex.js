const login = require('./login');
const brand = require('./brand');
const appToken = require('./token');
const appLogin = require('./app/login');
const appUserProfile = require('./app/profile');
const appAdminUser = require('./app/admin/user');

module.exports = {
  login,
  brand,
  appToken,
  appLogin,
  appUserProfile,
  appAdminUser,
};
