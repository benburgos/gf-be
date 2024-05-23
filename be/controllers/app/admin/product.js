const Product = require('../../../models/sys/product');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function adminGetProduct(req, res) {
  try {
    // Access data from authToken middleware
    const { bid: currentBrandId, ra: permissionLevels } = req;

    // Check permission level
    const permissionType = await checkPermission({
      prod: 'admin',
      bid: currentBrandId,
      ra: permissionLevels,
    });
    if (permissionType !== 'rw') {
      return res
        .status(403)
        .json({ error: 'You are not authorized to access this resource.' });
    }

    // Assign product ID from request parameters
    const productId = req.params.id;

    // Retrieve product from the database by _id
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ Error: 'Product not found' });
    }

    return res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

async function adminGetProducts(req, res) {
  try {
    // Access data from authToken middleware
    const { bid: currentBrandId, ra: permissionLevels } = req;

    // Check permission level
    const permissionType = await checkPermission({
      prod: 'admin',
      bid: currentBrandId,
      ra: permissionLevels,
    });
    if (permissionType !== 'rw') {
      return res
        .status(403)
        .json({ Error: 'You are not authorized to access this resource.' });
    }

    // Retrieve all products from the database
    const products = await Product.find({ brandId: currentBrandId });
    return res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ Error: 'Internal server error' });
  }
}

module.exports = {
  adminGetProduct,
  adminGetProducts,
};
