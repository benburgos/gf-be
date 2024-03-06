const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({});

const Evaluation = mongoose.model('Evaluation', evaluationSchema);

module.exports = Evaluation;
