const Product = require('../../models/sys/product');
const { v4: uuidv4 } = require('uuid');

async function createProduct(data) {
  const productList = ['qa', 'pm', 'eng', 'wfm', 'shop'];
  const products = [];

  for (let i = 0; i < productList.length; i++) {
    const product = {
      _id: uuidv4(),
      brandId: data._id,
      desc: productList[i],
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    };

    products.push(product);
  }

  Product.insertMany(products);
  console.log(
    `${products.length} products were added to company, ${data.name}.`
  );
  return products;
}

module.exports = {
  createProduct,
};
