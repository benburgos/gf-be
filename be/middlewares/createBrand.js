const Brand = require('../models/brand');
const { v4: uuidv4 } = require('uuid');

// Create Brand
async function createBrand(data) {
  data = {
    _id: uuidv4(),
    name: data.brandName,
    desc: data.brandDesc,
    imgUrl: data.imgUrl,
    userCount: 1,
    dateUpdated: Date.now(),
    dateCreated: Date.now(),
  };
  try {
    const brand = await Brand.create(data);
    console.log(`New brand, ${brand.name}, was successfully created.`);
    return brand;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createBrand,
};
