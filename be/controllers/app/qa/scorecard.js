const { Scorecard } = require('../../../models/app/qa/qaIndex');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function createScorecard(req, res){
    let newScorecard = {
        ...req.body,
        _id: uuidv4(),
        brandId: req.bid,
        teamId: "null",
        isActive: true,
        dateUpdated: Date.now(),
        dateCreated: Date.now()
    }

    res.send(newScorecard)
}

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