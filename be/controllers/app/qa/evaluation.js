const { Evaluation } = require('../../../models/app/qa/qaIndex');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function createEvaluation(req, res){}
async function getEvaluation(req, res){}
async function getAllEvaluations(req, res){}
async function editEvaluation(req, res){}
async function deleteEvaluation(req, res){}

module.exports = {
    createEvaluation,
    getEvaluation,
    getAllEvaluations,
    editEvaluation,
    deleteEvaluation
}

