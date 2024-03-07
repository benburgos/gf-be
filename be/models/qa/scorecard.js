const mongoose = require('mongoose');

const scorecardSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  brandId: { type: String, required: true },
  teamId: { type: String, required: true },
  type: { type: String, required: true },
  criteria: { type: Array, required: true },
  isActive: { type: Boolean, default: false, required: true },
  dateUpdated: { type: Number, required: true },
  dateCreated: { type: Number, required: true },
});

const Scorecard = mongoose.model('Scorecard', scorecardSchema);

module.exports = Scorecard;
