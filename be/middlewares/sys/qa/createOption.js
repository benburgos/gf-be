const { Option } = require('../../../models/app/qa/qaIndex');
const template = require('../../../middlewares/sys/qa/template/options.json');
const { v4: uuidv4 } = require('uuid');

async function createOption(data) {
  let newOptionArr = [];

  for (let i = 0; i < template.length; i++) {
    let newOption = {
      _id: uuidv4(),
      name: template[i].name,
      desc: template[i].desc,
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
      data: template[i].data,
      brandId: uuidv4(),
      modality: 'all',
    };

    newOptionArr.push(newOption);
  }

  let createdOptions = await Option.insertMany(newOptionArr);
  console.log(
    `${createdOptions.length} QA options were added to company, ${data.name}.`
  );
}

module.exports = {
  createOption,
};
