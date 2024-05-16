const Product = require('../../models/sys/product');
const { v4: uuidv4 } = require('uuid');

async function createProduct(brandId, session) {
  try {
    // List of products
    const productList = ['qa', 'pm', 'eng', 'wfm', 'shop', 'admin'];
    const products = [];

    // Loop through each product in the list
    for (let i = 0; i < productList.length; i++) {
      // Create product object
      const product = {
        _id: uuidv4(),
        brandId: brandId,
        desc: productList[i],
        dateUpdated: Date.now(),
        dateCreated: Date.now(),
      };

      // Set isActive to true for admin product as default product
      if (product.desc === 'admin') {
        product.isActive = true;
      }

      // Push product to products array
      products.push(product);
    }

    // Insert products into database
    await Product.insertMany(products, { session });

    // Return the array of created product objects
    return products;
  } catch (error) {
    // Handle errors
    console.error('Error creating products:', error);
    throw new Error('Failed to create products');
  }
}

module.exports = {
  createProduct,
};
