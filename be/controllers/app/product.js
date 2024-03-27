const Product = require('../../models/sys/product');
const { checkPermission } = require('../../middlewares/checkPermission');

async function getAllProducts(req, res) {
    const data = {
        prod: 'admin',
        bid: req.bid,
        ra: req.ra,
      };
      const type = await checkPermission(data);
    
      if (type === 'rw') {
        let products = await Product.find({ brandId: req.bid }, '_id desc isActive');
        res.send(products);
      } else {
        res.send(`You are not authorized to access this resource.`);
      }
}

async function editProduct(req, res) {}

module.exports = {
  getAllProducts,
  editProduct,
};
