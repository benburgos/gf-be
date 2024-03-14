const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  brandId: { type: String, required: true },
  name: { type: String, required: true },
  desc: { type: Array, required: true },
  modality: { type: String, enum:['phone_inbound', 'phone_outbound', 'chat', 'email', 'other', 'all'], required: true },
  data: [
    {
      position: { type: Number, required: true },
      name: { type: String, required: true },
      toolTip: { type: String, required: false },
    },
  ],
  dateUpdated: { type: Number, required: true },
  dateCreated: { type: Number, required: true },
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;
