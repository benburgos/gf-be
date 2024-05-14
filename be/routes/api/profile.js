const express = require('express');
const router = express.Router();
const profileController = require('../../controllers/api/profile');
const { authToken } = require('../../middlewares/authToken');

router.get('/:id', profileController.getUserProfile);
// router.put('/edit/:id', userController.editUser);

module.exports = router;
