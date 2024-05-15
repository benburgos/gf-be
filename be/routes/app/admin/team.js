const express = require('express');
const router = express.Router();
const adminTeamController = require('../../../controllers/app/admin/team');
const { authToken } = require('../../../middlewares/authToken');

router.post('/create', authToken, adminTeamController.adminCreateTeam);
router.get('/:id', authToken, adminTeamController.adminGetTeam);
router.get('/', authToken, adminTeamController.adminGetTeams);
router.put('/:id/edit', authToken, adminTeamController.adminEditTeam);
router.delete('/:id/delete', authToken, adminTeamController.adminDeleteTeam);

module.exports = router;
