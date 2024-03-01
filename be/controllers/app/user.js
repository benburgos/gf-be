const User = require('../../models/user');
const Pwh = require('../../models/pwh');
const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../../middlewares/genHash');
const { checkBrand } = require('../../services/checkBrand');
const { checkEmail } = require('../../services/checkEmail');

async function createUser(req, res) {
  console.log(req.bid)
}
async function getUser(req, res) {}
async function getAllUsers(req, res) {}
async function editUser(req, res) {}
async function deleteUser(req, res) {}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  editUser,
  deleteUser,
};
