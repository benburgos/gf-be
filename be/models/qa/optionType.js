const mongoose = require('mongoose');

const optionTypeSchema = new mongoose.Schema({});

const OptionType = mongoose.model('OptionType', optionTypeSchema);

module.exports = OptionType;
