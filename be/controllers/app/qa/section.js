const { Section } = require('../../../models/app/qa/qaIndex');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function createSection(req, res){}
async function getSection(req, res){}
async function getAllSections(req, res){}
async function editSection(req, res){}
async function deleteSection(req, res){}

module.exports = {
    createSection,
    getSection,
    getAllSections,
    editSection,
    deleteSection
}