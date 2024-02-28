const Brand = require('../../models/sys/brand');
const { v4: uuidv4 } = require('uuid');

// Create Brand
async function createBrand(data) {
  data = {
    _id: uuidv4(),
    name: data.brandName,
    desc: data.brandDesc,
    imgUrl: data.imgUrl,
    dateUpdated: Date.now(),
    dateCreated: Date.now(),
  };
  try {
    const brand = await Brand.create(data);
    console.log(`New company, ${brand.name}, was successfully added.`);
    return brand;
  } catch (err) {
    console.log(err);
  }

  return { _id: data._id, name: data.name };
}

module.exports = {
  createBrand,
};
