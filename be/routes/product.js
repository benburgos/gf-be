const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const { authToken } = require('../middlewares/authToken');

router.post('/', productController.createProduct);
router.get('/:id', productController.getProduct);
router.get('/', productController.getProducts);

module.exports = router;
