const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissions');

router.post('/', permissionController.createPermission);

module.exports = router;
