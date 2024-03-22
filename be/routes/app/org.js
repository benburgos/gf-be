const express = require('express');
const router = express.Router();
const orgController = require('../../controllers/app/org');
const { authToken } = require('../../middlewares/authToken');

router.post('/create', authToken, orgController.createOrg);
router.get('/:id', authToken, orgController.getOrg);
router.get('/', authToken, orgController.getAllOrgs);
router.put('/edit/:id', authToken, orgController.editOrg);
router.delete('/delete/:id', authToken, orgController.deleteOrg);

module.exports = router;
