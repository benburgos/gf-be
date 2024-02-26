const Brand = require('../models/brand');

async function checkBrand(data) {
  const existing = await Brand.findOne({ name: data }).collation({
    locale: 'en',
    strength: 1,
  });

  return existing ? true : false;
}

module.exports = {
  checkBrand,
};
