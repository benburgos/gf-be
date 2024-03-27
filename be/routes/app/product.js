const express = require('express');
const router = express.Router();
const productController = require('../../controllers/app/product');
const { authToken } = require('../../middlewares/authToken');

router.get('/', authToken, productController.getAllProducts);
router.put('/edit/:id', authToken, productController.editProduct);

module.exports = router;
