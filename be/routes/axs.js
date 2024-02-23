const express = require('express');
const router = express.Router();
const pms = require('../controllers/axs');

router.post('/', pms.createPms);

module.exports = router;
