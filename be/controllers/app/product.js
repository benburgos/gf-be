const Brand = require('../../models/sys/brand');
const Product = require('../../models/sys/product');
const { checkPermission } = require('../../middlewares/checkPermission');

async function getAllProducts(req, res) {
  const brandCheck = await Brand.findOne({ _id: req.bid }, '-_id adminId');

  if (brandCheck.adminId === req.id) {
    let products = await Product.find(
      { brandId: req.bid },
      '_id desc isActive'
    );
    res.send(products);
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function editProduct(req, res) {
  const brandCheck = await Brand.findOne({ _id: req.bid }, 'adminId');

  if (brandCheck.adminId === req.id) {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id, brandId: req.bid },
      { isActive: req.query.update }
    );
    res.send(
      `${product.desc} product has been ${
        req.query.update === 'true' ? 'activated' : 'deactivated'
      }.`
    );
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

module.exports = {
  getAllProducts,
  editProduct,
};
