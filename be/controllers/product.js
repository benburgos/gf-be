const db = require('../config/db');
const Product = require('../models/product');
const { v4: uuidv4 } = require('uuid');

// Create Product
async function createProduct(req, res) {
  const existing = await Product.findOne({ desc: req.body.desc });
  
  if (existing) {
    res.send('Product already exists.');
  } else {
    req.body = {
      ...req.body,
      _id: uuidv4(),
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    };

    try {
      const product = await Product.create(req.body);
      res.send(
        `The ${product.desc} product was added to BrandId ${product.brandId}.`
      );
    } catch (err) {
      res.send(err);
    }
  }
}

// Get Product
async function getProduct(req, res) {
  try {
    const product = await Product.find({ _id: req.params.id });
    console.log(product);
    res.send(product);
  } catch (err) {
    res.send(err);
  }
}

// Get All Products
async function getProducts(req, res) {
  try {
    const allProducts = await Product.find({});
    res.send(allProducts);
  } catch (err) {
    res.send(err);
  }
}

module.exports = {
  createProduct,
  getProduct,
  getProducts,
};
