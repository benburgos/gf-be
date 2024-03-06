const mongoose = require('mongoose');

const scorecardSchema = new mongoose.Schema({});

const Scorecard = mongoose.model('Scorecard', scorecardSchema);

module.exports = Scorecard;
