const express = require('express');
const router = express.Router();
const adminUserController = require('../../../controllers/app/admin/user');
const { authToken } = require('../../../middlewares/authToken');

router.get('/options', authToken, adminUserController.adminCreateUserOptions);
router.post('/create', authToken, adminUserController.adminCreateUser);
router.get('/:id', authToken, adminUserController.adminGetUser);
router.get('/', authToken, adminUserController.adminGetUsers);
router.put('/:id/edit', authToken, adminUserController.adminEditUser);

module.exports = router;
