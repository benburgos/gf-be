const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand');
const { authToken } = require('../middlewares/authToken');

router.post('/', brandController.createBrand);
router.get('/:id', brandController.getBrand);
router.get('/', brandController.getBrands);

module.exports = router;
