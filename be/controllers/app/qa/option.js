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
    foundOption.data = await foundOption.data.sort((a, b) => a.position - b.position)

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

async function getAllOptions(req, res) {
  const data = {
    prod: 'qa',
    bid: req.bid,
    ra: req.ra,
  };

  const type = await checkPermission(data);

  if (type === 'rw' || 'w') {
    const options = await Option.find({ brandId: req.bid }, '_id name desc');
    res.send(options);
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function editOption(req, res) {
  const data = {
    prod: 'qa',
    bid: req.bid,
    ra: req.ra,
  };

  const type = await checkPermission(data);

  if (type === 'rw') {
    req.body.dateUpdated = Date.now();
    const foundOption = await Option.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );

    res.send(`Option, ${req.body.name}, has been updated.`);
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

async function deleteOption(req, res) {
  const data = {
    prod: 'qa',
    bid: req.bid,
    ra: req.ra,
  };

  const type = await checkPermission(data);

  if (type === 'rw') {
    const foundOption = await Option.findOne({ _id: req.params.id });

    if (foundOption && foundOption.brandId === req.bid) {
      await Option.findOneAndDelete({ _id: foundOption._id });
      res.send(
        `Option, ${foundOption.name}, has been removed from the database.`
      );
    } else if (foundOption && foundOption.brandId !== req.bid) {
      res.send(`You do not belong to this organization.`);
    } else {
      res.send(`Option ID does not exist.`);
    }
  } else {
    res.send(`You are not authorized to access this resource.`);
  }
}

module.exports = {
  createOption,
  getOption,
  getAllOptions,
  editOption,
  deleteOption,
};
