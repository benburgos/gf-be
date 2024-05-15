const express = require('express');
const router = express.Router();
const adminUserController = require('../../../controllers/app/admin/user');
const { authToken } = require('../../../middlewares/authToken');

router.post('/create', adminUserController.adminCreateUser);
router.get('/:id', adminUserController.adminGetUser);
router.get('/', adminUserController.adminGetUsers);
router.put('/:id/edit', adminUserController.adminEditUser);

module.exports = router;
