const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  brandId: { type: String, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  isActive: { type: Boolean, default: true, required: true },
  dateUpdated: { type: Number, required: true },
  dateCreated: { type: Number, required: true },
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
