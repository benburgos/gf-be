const express = require('express');
const router = express.Router();
const scorecardController = require('../../../controllers/app/qa/scorecard');
const { authToken } = require('../../../middlewares/authToken');

router.post('/create', authToken, scorecardController.createScorecard);
router.get('/:id', authToken, scorecardController.getScorecard);
router.get('/', authToken, scorecardController.getAllScorecards);
router.put('/edit/:id', authToken, scorecardController.editScorecard);
router.delete('/delete/:id', authToken, scorecardController.deleteScorecard);

module.exports = router;
