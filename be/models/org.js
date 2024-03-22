const mongoose = require('mongoose');

const orgSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    brandId: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    userCount: { type: Number, default: 0, required: false },
    isActive: { type: Boolean, default: true, required: true },
    dateUpdated: { type: Number, required: true },
    dateCreated: { type: Number, required: true },
  },
  { versionKey: false }
);

const Org = mongoose.model('Org', orgSchema);

module.exports = Org;
