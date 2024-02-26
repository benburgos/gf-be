const db = require('../config/db');
const Brand = require('../models/brand');

async function checkBrand(data) {
  const existing = await Brand.findOne({ name: data.brandName }).collation({
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
