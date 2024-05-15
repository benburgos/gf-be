const express = require('express');
const router = express.Router();
const adminRoleController = require('../../../controllers/app/admin/role');
const { authToken } = require('../../../middlewares/authToken');

router.post('/create', authToken, adminRoleController.adminCreateRole);
router.get('/:id', authToken, adminRoleController.adminGetRole);
router.get('/', authToken, adminRoleController.adminGetRoles);
router.put('/:id/edit', authToken, adminRoleController.adminEditRole);
router.delete('/:id/delete', authToken, adminRoleController.adminDeleteRole);

module.exports = router;
