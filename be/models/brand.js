const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: false },
  imgUrl: { type: String, required: false },
  userCount: { type: Number, default: 0, required: true },
  dateUpdated: { type: Date, default: Date.now, required: true },
  dateCreated: { type: Date, default: Date.now, required: true },
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
