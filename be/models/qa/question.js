const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
