const db = require('../config/db');
const Brand = require('../models/brand');
const { v4: uuidv4 } = require('uuid');

// Create Brand
async function createBrand(req, res) {
  //   const existing = await Brand.find({ name: req.body.name }).collation({
  //     strength: 1,
  //   });
  //   console.log(existing)
  req.body = {
    ...req.body,
    _id: uuidv4(),
  };
  try {
    const brand = await Brand.create(req.body);
    res.send(brand);
  } catch (err) {
    res.send(err);
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
