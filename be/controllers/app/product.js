const Brand = require('../../models/sys/brand')
const Product = require('../../models/sys/product');
const { checkPermission } = require('../../middlewares/checkPermission');

async function getAllProducts(req, res) {
    const brandCheck = await Brand.findOne({_id: req.bid}, 'adminId')
    console.log(brandCheck)
    //   if (type === 'rw') {
    //     let products = await Product.find({ brandId: req.bid }, '_id desc isActive');
    //     res.send(products);
    //   } else {
    //     res.send(`You are not authorized to access this resource.`);
    //   }
}

async function editProduct(req, res) {
    const brandCheck = await Brand.findOne({_id: req.bid}, 'adminId')
    console.log(brandCheck)
}

module.exports = {
  getAllProducts,
  editProduct,
};
