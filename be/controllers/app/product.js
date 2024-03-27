const Brand = require('../../models/sys/brand');
const Product = require('../../models/sys/product');
const { checkQa } = require('../../middlewares/sys/qa/checkQa');
const { startQa } = require('../../middlewares/sys/qa/startQa');

async function getAllProducts(req, res) {
  const brandCheck = await Brand.findOne({ _id: req.bid }, '-_id adminId');

  if (brandCheck.adminId === req.id) {
    let products = await Product.find(
      { brandId: req.bid, desc: { $nin: 'admin' } },
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
    if (req.query.update) {
      let qaCheck = await checkQa(req.bid);

      if (!qaCheck) {
        await startQa(req.bid);
        let updatedProduct = await Product.findOneAndUpdate(
          { _id: req.params.id },
          { isActive: req.query.update, dateUpdated: Date.now() }
        );
        res.send(
          `${updatedProduct.desc.toUpperCase()} has been activated and QA templates have been added.`
        );
      } else {
        let updatedProduct = await Product.findOneAndUpdate(
          { _id: req.params.id },
          { isActive: req.query.update, dateUpdated: Date.now() }
        );

        res.send(
          `${updatedProduct.desc.toUpperCase()} has been activated, no templates were added because QA items were found in the database for your company.`
        );
      }
    } else {
      let updatedProduct = await Product.findOneAndUpdate(
        { _id: req.params.id },
        { isActive: req.query.update, dateUpdated: Date.now() }
      );
      res.send(`${updatedProduct.desc.toUpperCase()} has been deactivated.`);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

module.exports = {
  getAllProducts,
  editProduct,
};
