const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;
