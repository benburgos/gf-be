const express = require('express');
const router = express.Router();
const adminPermissionController = require('../../../controllers/app/admin/org');
const { authToken } = require('../../../middlewares/authToken');

router.get('/:id', authToken, adminPermissionController.adminGetPermission);
router.get('/', authToken, adminPermissionController.adminGetPermissions);

module.exports = router;
