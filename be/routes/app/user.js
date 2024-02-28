const express = require('express');
const router = express.Router();
const userController = require('../controllers/app/user');
const { authToken } = require('../middlewares/authToken');

router.post('/create', authToken, userController.createUser);
router.get('/:id', authToken, userController.getUser);
router.get('/', authToken, userController.getAllUsers);
router.put('/:id/edit', authToken, userController.editUser);
router.delete('/:id', authToken, userController.deleteUser);

module.exports = router;
