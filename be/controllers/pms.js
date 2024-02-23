const db = require('../config/db');
const Pms = require('../models/pms');
const { v4: uuidv4 } = require('uuid');

async function createPms(req, res) {
  req.body = {
    ...req.body,
    _id: uuidv4(),
    brandId: uuidv4(),
    productId: uuidv4(),
    dateUpdated: Date.now(),
    dateCreated: Date.now(),
  };

  try {
    const pms = await Pms.create(req.body);
    res.json(pms);
  } catch (err) {
    res.send(err);
  }
}

module.exports = {
  createPms,
};
