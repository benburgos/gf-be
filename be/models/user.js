const mongoose = require('mongoose');

/// Add OrgId - rework team into Org, needs both a team and an org to belong to (e.g. Customer Service is in Operations), org object/model will have a team ID and a group ID

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    brandId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    roleId: { type: String, required: true },
    org: {
      orgId: { type: String, required: true },
      orgName: { type: String, required: true },
      teamId: { type: String, required: true },
      teamName: { type: String, required: true },
    },
    isActive: { type: Boolean, default: true, required: true },
    dateUpdated: { type: Number, required: true },
    dateCreated: { type: Number, required: true },
  },
  { versionKey: false }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
