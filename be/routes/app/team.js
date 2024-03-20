const express = require('express');
const router = express.Router();
const teamController = require('../../controllers/app/team');
const { authToken } = require('../../middlewares/authToken');

router.post('/create', authToken, teamController.createTeam);
router.get('/:id', authToken, teamController.getTeam);
router.get('/', authToken, teamController.getAllTeams);
router.put('/edit/:id', authToken, teamController.editTeam);
router.delete('/delete/:id', authToken, teamController.deleteTeam);

module.exports = router;
