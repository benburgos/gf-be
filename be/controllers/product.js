const db = require('../config/db');
const Product = require('../models/product');
const { v4: uuidv4 } = require('uuid');

// Create Product
async function createProduct(req, res) {
  const existing = Product.findOne({ desc: req.body.desc });
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
async function getProduct(req, res) {}

// Get All Products
async function getProducts(req, res) {}

module.exports = {
  createProduct,
  getProduct,
  getProducts,
};
