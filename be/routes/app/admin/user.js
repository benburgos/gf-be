const express = require('express');
const router = express.Router();
const adminUserController = require('../../../controllers/app/admin/user');
const { authToken } = require('../../../middlewares/authToken');

router.post('/create', adminUserController.createUser);
router.get('/', adminUserController.getUsers);
router.get('/:id', adminUserController.getUser);
router.put('/:id/edit', adminUserController.getUser);

module.exports = router;
