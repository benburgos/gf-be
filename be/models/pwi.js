const mongoose = require('mongoose');

const pwSchema = new mongoose.Schema({
  udbid: { type: String, required: true },
  pwk: { type: String, required: true },
});

const Pwk = mongoose.model('Pwk', pwSchema);

module.exports = Pwk;
