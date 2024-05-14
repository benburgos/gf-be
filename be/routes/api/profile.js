const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/api/profile');
const { authToken } = require('../../middlewares/authToken');

// router.post('/create', userController.createUser);
router.get('/:id', profileController.getUserProfile);
// router.get('/', userController.getAllUsers);
// router.put('/edit/:id', userController.editUser);
// router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
