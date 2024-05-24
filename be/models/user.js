const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    brandId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    location: { type: String, required: false },
    role: {
      roleId: { type: String, required: true },
      roleName: { type: String, required: true },
    },
    managerId: { type: String, required: false },
    org: {
      orgId: { type: String, required: true },
      orgName: { type: String, required: true },
      teamId: { type: String, required: true },
      teamName: { type: String, required: true },
    },
    photoUrl: { type: String, required: false },
    isLeader: { type: Boolean, required: true },
    isActive: { type: Boolean, default: true, required: true },
    joinDate: { type: Number, required: false },
    dateUpdated: { type: Number, required: true },
    dateCreated: { type: Number, required: true },
  },
  { versionKey: false }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
