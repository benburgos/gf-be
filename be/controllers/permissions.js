const db = require('../config/db');
const Permission = require('../models/permission');
const { v4: uuidv4 } = require('uuid');

async function createPermission(req, res) {
  req.body = {
    ...req.body,
    _id: uuidv4(),
    brandId: uuidv4(),
    productId: uuidv4(),
    dateUpdated: Date.now(),
    dateCreated: Date.now(),
  };

  try {
    const permission = await Permission.create(req.body);
    res.json(permission);
  } catch (err) {
    res.send(err);
  }
}

module.exports = {
  createPermission,
};
