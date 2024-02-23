const mongoose = require('mongoose');

const pmsSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  type: { type: String, enum: ['r', 'w', 'rw'], required: true },
  productId: { type: String, required: true },
  brandId: { type: String, required: true },
});

const Pms = mongoose.model('Pms', pmsSchema);

module.exports = Pms;
