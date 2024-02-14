const express = require('express');
const router = express.Router();
const axs = require('../controllers/axs');

router.post('/', axs.createAxs);

module.exports = router;
