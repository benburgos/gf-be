const Product = require('../../models/sys/product');
const { checkPermission } = require('../../middlewares/checkPermission');

async function getProduct(req, res) {}
async function getAllProducts(req, res) {}
async function editProduct(req, res) {}

module.exports = {
  getProduct,
  getAllProducts,
  editProduct,
};
