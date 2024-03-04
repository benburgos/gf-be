const Product = require('../models/sys/product');
const Permission = require('../models/sys/permission');

async function checkPermission(data) {
  const pId = await Product.findOne({ brandId: data.bid, desc: data.prod });
  const perm = await Permission.findOne({ productId: pId._id , brandId: data.bid});

  return perm.type
}

module.exports = {
  checkPermission,
};
