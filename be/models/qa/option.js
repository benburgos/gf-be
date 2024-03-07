const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  desc: { type: Array, required: true },
  dateUpdated: { type: Number, required: true },
  dateCreated: { type: Number, required: true },
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;
