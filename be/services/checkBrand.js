const db = require('../config/db');
const Brand = require('../models/brand');

async function checkBrand(req, res) {
  const existing = await Brand.findOne({ name: req.body.brandName }).collation({
    locale: 'en',
    strength: 1,
  });

  if (existing) {
    res.send(`Brand already exists.`);
  } else {
    return existing;
  }
}

module.exports = {
  checkBrand,
};
