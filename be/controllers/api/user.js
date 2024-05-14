const User = require('../../models/user');
const Pwh = require('../../models/pwh');
const Role = require('../../models/sys/role');
const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../../middlewares/genHash');
const { checkEmail } = require('../../services/checkEmail');
const { checkPermission } = require('../../middlewares/checkPermission');

async function getUser(req, res) {
  
}

module.exports = {
  getUser
};
