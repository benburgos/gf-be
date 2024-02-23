const db = require('../config/db');
const Brand = require('../models/brand');
const { v4: uuidv4 } = require('uuid');

// Create Brand
async function createBrand(req, res) {
  const existing = await Brand.findOne({ name: req.body.name }).collation({
    locale: 'en',
    strength: 1,
  });

  if (existing) {
    res.send(`Brand already exists.`);
  } else {
    req.body = {
      ...req.body,
      _id: uuidv4(),
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    };
    try {
      const brand = await Brand.create(req.body);
      res.send(brand);
    } catch (err) {
      res.send(err);
    }
  }
}

// Get Brand
async function getBrand(req, res) {}

// Get All Brands
async function getBrands(req, res) {}

module.exports = {
  createBrand,
  getBrand,
  getBrands,
};
