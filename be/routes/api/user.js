const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/user');
const { authToken } = require('../../middlewares/authToken');

// router.post('/create', userController.createUser);
router.get('/:id', userController.getUser);
// router.get('/', userController.getAllUsers);
// router.put('/edit/:id', userController.editUser);
// router.delete('/delete/:id', userController.deleteUser);

module.exports = router;