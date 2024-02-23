const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  brandId: { type: String, required: true },
  desc: {
    type: String,
    enum: ['qa', 'pfm', 'eng', 'wfm', 'shop'],
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
