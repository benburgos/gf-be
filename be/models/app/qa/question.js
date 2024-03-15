const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    brandId: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    modality: { type: String, required: true },
    type: {
      type: String,
      enum: ['standard', 'fail_section', 'fail_all'],
      required: true,
    },
    value: { type: Number, required: true },
    options: [
      {
        position: { type: Number, required: true },
        label: { type: String, required: true },
        toolTip: { type: String, required: true },
        value: { type: Number, required: true },
        _id: false,
      },
    ],
    isActive: { type: Boolean, default: false, required: true },
    dateUpdated: { type: Number, required: true },
    dateCreated: { type: Number, required: true },
  },
  { versionKey: false }
);

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
