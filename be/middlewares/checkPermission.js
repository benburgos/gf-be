const Product = require('../models/sys/product');
const Permission = require('../models/sys/permission');

async function checkPermission(data) {
  const { _id: prod, isActive: status } = await Product.findOne({
    brandId: data.bid,
    desc: data.prod,
  });
  const { pId: permId } = await data.ra.find((obj) => obj.productId === prod);
  const permission = await Permission.findOne({ _id: permId });

  if (status && permission.brandId === data.bid && permission.productId === prod) {
    return permission.type
  } else {
    return false
  }
}

module.exports = {
  checkPermission,
};
