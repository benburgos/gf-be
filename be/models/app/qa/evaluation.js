const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    brandId: { type: String, required: true },
    evalId: { type: Number, required: true },
    systemId: { type: Number, required: true },
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
    userId: { type: String, required: true },
    teamId: { type: String, required: true },
    evaluatorId: { type: String, required: true },
    scorecardId: { type: String, required: true },
    score: { type: Number, required: true },
    targetScore: { type: Number, required: true },
    maxScore: { type: Number, required: true },
    evalType: {
      type: String,
      enum: ['evaluation', 'calibration', 'self', 'manager', 'peer'],
      required: true,
    },
    data: [
      {
        _id: false,
        sectionName: { type: String, required: true },
        sectionValue: { type: Number, required: true },
        sectionFeedback: { type: String, required: false },
        questions: [
          {
            _id: false,
            questionName: { type: String, required: true },
            questionDesc: { type: String, required: true },
            questionValue: { type: Number, required: true },
            questionType: { type: String, required: true },
            questionSelection: { type: Number, required: false },
            options: [
              {
                _id: false,
                position: { type: Number, required: true },
                label: { type: String, required: true },
                toolTip: { type: String, required: true },
                value: { type: Number, required: true },
              }
            ],
            questionFeedback: { type: String, required: false }
          },
        ],
      },
    ],
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'complete'],
      required: true,
    },
    positiveFeedback: { type: String, required: true },
    improvementFeedback: { type: String, required: true },
    dateUpdated: { type: Number, required: true },
    dateCreated: { type: Number, required: true },
  },
  { versionKey: false }
);

const Evaluation = mongoose.model('Evaluation', evaluationSchema);

module.exports = Evaluation;
