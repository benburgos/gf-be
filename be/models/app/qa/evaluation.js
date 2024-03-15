const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    brandId: { type: String, required: true },
    systemId: { type: { String, Number }, required: true },
    modality: { type: String, required: true },
    userId: { type: String, required: true },
    teamId: { type: String, required: true },
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
        sectionId: { type: String, required: true },
        sectionName: { type: String, required: true },
        sectionValue: { type: Number, required: true },
        questions: [
          {
            questionId: { type: String, required: true },
            questionDesc: { type: String, required: true },
            questionValue: { type: Number, required: true },
            optionType: { type: String, required: true },
            optionScore: { type: Number, required: true },
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
