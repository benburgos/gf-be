const { Scorecard } = require('../../../models/app/qa/qaIndex');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function createScorecard(req, res){}
async function getScorecard(req, res){}
async function getAllScorecards(req, res){}
async function editScorecard(req, res){}
async function deleteScorecard(req, res){}

module.exports = {
    createScorecard,
    getScorecard,
    getAllScorecards,
    editScorecard,
    deleteScorecard
}