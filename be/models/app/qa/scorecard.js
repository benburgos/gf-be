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
    criteria: [
      {
        _id: false,
        sectionName: { type: String, required: true },
        sectionValue: { type: Number, required: true },
        questions: [
          {
            _id: false,            
            questionName: { type: String, required: true },
            questionDesc: { type: String, required: true },
            questionType: { type: String, required: true },
            questionValue: { type: Number, required: true },
            options: [
              {
                _id: false,
                position: { type: Number, required: true },
                label: { type: String, required: true },
                toolTip: { type: String, required: true },
                value: { type: Number, required: true },
              }
            ]
          },
        ],
      },
    ],
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
