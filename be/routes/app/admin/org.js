const express = require('express');
const router = express.Router();
const adminOrgController = require('../../../controllers/app/admin/org');
const { authToken } = require('../../../middlewares/authToken');

router.post('/create', authToken, adminOrgController.adminCreateOrg);
router.get('/:id', authToken, adminOrgController.adminGetOrg);
router.get('/', authToken, adminOrgController.adminGetOrgs);
router.put('/:id/edit', authToken, adminOrgController.adminEditOrg);
router.delete('/:id/delete', authToken, adminOrgController.adminDeleteOrg);

module.exports = router;
