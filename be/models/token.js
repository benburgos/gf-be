const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    token: { type: String, required: true },
    dateUpdated: { type: Number, required: true },
    dateCreated: { type: Number, required: true },
  },
  { versionKey: false }
);

const RefreshToken = mongoose.model('token', refreshTokenSchema);

module.exports = RefreshToken;
