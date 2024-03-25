const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand');
const { authToken } = require('../middlewares/authToken');

router.post('/create', brandController.newBrand);
router.get('/:id', authToken, brandController.getBrand);
router.put('/edit/:id', authToken, brandController.editBrand);

module.exports = router;
