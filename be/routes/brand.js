const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand');
const { authToken } = require('../middlewares/authToken');

router.post('/create', brandController.newBrand);
router.get('/:id', authToken, brandController.getBrand);
router.put('/edit/:id', authToken, brandController.editBrand);
router.put('/edit/:id/user', authToken, brandController.editUser);
router.put('/edit/:id/products/activate', authToken, brandController.addProduct);
router.put('/edit/:id/products/deactivate', authToken, brandController.removeProduct);

module.exports = router;
