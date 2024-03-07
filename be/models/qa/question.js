const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  brandId: { type: String, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  modality: { type: String, required: true },
  value: { type: { String, Number }, required: true },
  isActive: { type: Boolean, default: false, required: true },
  dateUpdated: { type: Number, required: true },
  dateCreated: { type: Number, required: true },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
