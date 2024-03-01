const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  brandId: { type: String, required: true },
  desc: {
    type: String,
    enum: ['qa', 'pm', 'eng', 'wfm', 'shop', 'admin'],
    required: true,
  },
  isActive: { type: Boolean, default: false, required: true },
  dateUpdated: { type: Number, required: true },
  dateCreated: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
