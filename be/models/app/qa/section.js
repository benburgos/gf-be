const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    brandId: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    modality: {
      type: String,
      enum: [
        'phone_inbound',
        'phone_outbound',
        'chat',
        'email',
        'other',
        'all',
      ],
      required: true,
    },
    isActive: { type: Boolean, default: false, required: true },
    dateUpdated: { type: Number, required: true },
    dateCreated: { type: Number, required: true },
  },
  { versionKey: false }
);

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
