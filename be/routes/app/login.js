const express = require('express');
const router = express.Router();
const appLoginController = require('../../controllers/app/login');

router.post('/', appLoginController.loginUser);

module.exports = router;
