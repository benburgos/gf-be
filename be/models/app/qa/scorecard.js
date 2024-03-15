const mongoose = require('mongoose');

const scorecardSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    brandId: { type: String, required: true },
    teamId: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    type: {
      type: String,
      enum: ['native', 'zendesk', 'salesforce'],
      required: true,
    },
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
    criteria: { type: Array, required: true },
    maxScore: { type: Number, required: true },
    targetScore: { type: Number, required: true },
    isActive: { type: Boolean, default: false, required: true },
    dateUpdated: { type: Number, required: true },
    dateCreated: { type: Number, required: true },
  },
  { versionKey: false }
);

const Scorecard = mongoose.model('Scorecard', scorecardSchema);

module.exports = Scorecard;
