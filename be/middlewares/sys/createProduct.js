const Product = require('../../models/sys/product');
const { v4: uuidv4 } = require('uuid');

async function createProduct(data) {
  try {
    const productList = ['qa', 'pm', 'eng', 'wfm', 'shop', 'admin'];
    const products = [];

    for (let i = 0; i < productList.length; i++) {
      const product = {
        _id: uuidv4(),
        brandId: data,
        desc: productList[i],
        dateUpdated: Date.now(),
        dateCreated: Date.now(),
      };

      if (product.desc === 'admin') {
        product.isActive = true;
      }

      products.push(product);
    }

    await Product.insertMany(products);
    return products;
  } catch (error) {
    console.error('Error creating products:', error);
    throw new Error('Failed to create products');
  }
}

module.exports = {
  createProduct,
};
