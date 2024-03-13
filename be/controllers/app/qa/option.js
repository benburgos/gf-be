const { Option } = require('../../../models/app/qa/qaIndex')
const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../../middlewares/genHash');
const { checkPermission } = require('../../middlewares/checkPermission');

async function createOption(req, res) {}
async function getOption(req, res) {}
async function getOptions(req, res) {}
async function editOption(req, res) {}
async function deleteOption(req, res) {}


module.exports = {
    createOption,
    getOption,
    getOptions,
    editOption,
    deleteOption
}