const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  brandId: { type: String, required: true },
  type: { type: String, required: true },
  modality: { type: String, required: true },
  options: [
    {
      position: { type: Number, required: true },
      name: { type: String, required: true },
      desc: { type: String, required: true },
      value: { type: Number, required: true },
    },
  ],
  dateUpdated: { type: Number, required: true },
  dateCreated: { type: Number, required: true },
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
