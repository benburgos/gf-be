const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({});

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
