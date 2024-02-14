const mongoose = require('mongoose');

const axsSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  type: { type: String, enum: ['r', 'w', 'rw'], required: true },
  productId: { type: String, required: true },
  brandId: { type: String, required: true },
});

const Axs = mongoose.model('Axs', axsSchema);

module.exports = Axs;
