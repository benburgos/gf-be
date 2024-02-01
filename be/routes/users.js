const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.post('/', usersController.createUser)
router.get('/:id', usersController.getUser)
router.get('/', usersController.getUsers);

module.exports = router;
