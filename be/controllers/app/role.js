const Role = require('../../models/sys/role');
const User = require('../../models/user');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../middlewares/checkPermission');

async function createRole(req, res) {}
async function getRole(req, res) {}
async function getRoles(req, res) {}
async function editRole(req, res) {}
async function deleteRole(req, res) {}

module.exports = {
  createRole,
  getRole,
  getRoles,
  editRole,
  deleteRole,
};
