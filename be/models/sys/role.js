const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    brandId: { type: String, required: true },
    name: { type: String, required: true },
    permissions: [
      {
        _id: false,
        productId: { type: String, required: true },
        pId: { type: String, required: true },
      },
    ],
    userCount: { type: Number, default: 0, required: false },
    isActive: { type: Boolean, required: true },
    dateUpdated: { type: Number, required: true },
    dateCreated: { type: Number, required: true },
  },
  { versionKey: false }
);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
