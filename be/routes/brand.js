const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand');
const { authToken } = require('../middlewares/authToken');

router.post('/create', brandController.newBrand);
router.get('/:id', authToken, brandController.getBrand);

module.exports = router;
