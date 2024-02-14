const db = require('../config/db');
const Axs = require('../models/axs');
const { v4: uuidv4 } = require('uuid');

async function createAxs(req, res) {
  req.body = {
    ...req.body,
    _id: uuidv4(),
    brandId: uuidv4(),
    productId: uuidv4(),
    dateUpdated: Date.now(),
    dateCreated: Date.now(),
  };

  try {
    const axs = await Axs.create(req.body);
    res.json(axs);
  } catch (err) {
    res.send(err);
  }
}

module.exports = {
  createAxs,
};
