const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { authToken } = require('../middlewares/authToken');

router.post('/create', usersController.createUser);
router.get('/:id', authToken, usersController.getUser);

module.exports = router;
