const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/token');

router.post('/token', tokenController.refreshToken);

module.exports = router;
