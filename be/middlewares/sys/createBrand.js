const Brand = require('../../models/sys/brand');
const { v4: uuidv4 } = require('uuid');

async function createBrand(data, id, session) {
  try {
    // Create brand document
    const brand = await Brand.create(
      [
        {
          _id: uuidv4(),
          name: data.brandName,
          desc: data.brandDesc,
          imgUrl: data.imgUrl,
          adminId: id,
          dateUpdated: Date.now(),
          dateCreated: Date.now(),
        },
      ],
      { session }
    );

    // Returns brand id for use in next middleware
    return brand._id;
  } catch (error) {
    console.error('Error creating brand:', error);
    throw new Error('Failed to create brand');
  }
}

module.exports = {
  createBrand,
};
