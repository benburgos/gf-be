const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  type: { type: String, enum: ['r', 'w', 'rw'], required: true },
  productId: { type: String, required: true },
  brandId: { type: String, required: true },
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;
