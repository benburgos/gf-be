const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userID: { type: String, required: true },
  brandID: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  pwh: { type: String, required: true },
  isAdmin: { type: Boolean },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
