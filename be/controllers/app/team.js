const Team = require('../../models/team')
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../middlewares/checkPermission');

async function createTeam(req, res){}
async function getTeam(req, res){}
async function getAllTeams(req, res){}
async function editTeam(req, res){}
async function deleteTeam(req, res){}

module.exports = {
    createTeam,
    getTeam,
    getAllTeams,
    editTeam,
    deleteTeam
}