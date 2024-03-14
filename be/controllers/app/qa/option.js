const { Option } = require('../../../models/app/qa/qaIndex');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function createOption(req, res) {
  const data = {
    prod: 'qa',
    bid: req.bid,
    ra: req.ra,
  };

  const type = await checkPermission(data);

  if (type === 'rw') {
    let newOption = {
      _id: uuidv4(),
      brandId: req.bid,
      ...req.body,
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
    };

    try {
      await Option.create(newOption);
      res.send(`New option, ${newOption.name}, was added to the database.`);
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function getOption(req, res) {
  const data = {
    prod: 'qa',
    bid: req.bid,
    ra: req.ra,
  };

  const type = await checkPermission(data);
  
  if (type === 'rw' || 'w') {
    const foundOption = await Option.findOne({ _id: req.params.id });

    if (foundOption && foundOption.brandId === req.bid) {
      res.json(foundOption);
    } else if (foundOption && foundOption.brandId !== req.bid) {
      res.send(`You do not belong to the same organization as this option.`);
    } else {
      res.send(`Option ID does not exist.`);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}
async function getAllOptions(req, res) {}
async function editOption(req, res) {}
async function deleteOption(req, res) {}

module.exports = {
  createOption,
  getOption,
  getAllOptions,
  editOption,
  deleteOption,
};
