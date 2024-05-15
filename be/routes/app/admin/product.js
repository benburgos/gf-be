const express = require('express');
const router = express.Router();
const adminProductController = require('../../../controllers/app/admin/product');
const { authToken } = require('../../../middlewares/authToken');

router.get('/:id', authToken, adminProductController.adminGetProduct);
router.get('/', authToken, adminProductController.adminGetProducts);
router.put('/:id/edit', authToken, adminProductController.adminEditProduct);

module.exports = router;
