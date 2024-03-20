const mongoose = require('mongoose');

const pwhSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    pwh: { type: String, required: true },
    dateUpdated: { type: Number, required: true },
    dateCreated: { type: Number, required: true },
  },
  { versionKey: false }
);

const Pwh = mongoose.model('Pwh', pwhSchema);

module.exports = Pwh;
