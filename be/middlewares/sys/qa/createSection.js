const { Section } = require('../../../models/app/qa/qaIndex');
const template = require('../../../middlewares/sys/qa/template/sections.json');
const { v4: uuidv4 } = require('uuid');

async function createSection(data) {
  let newSectionArr = [];

  for (let i = 0; i < template.length; i++) {
    let newSection = {
      _id: uuidv4(),
      brandId: data,
      name: template[i].name,
      desc: template[i].desc,
      modality: template[i].modality,
      isActive: template[i].isActive,
      dateUpdated: Date.now(),
      dateCreated: Date.now(),
    };

    newSectionArr.push(newSection);
  }

  let createdSections = await Section.insertMany(newSectionArr);
  console.log(
    `${createdSections.length} QA sections were added to company, ${data.name}.`
  );
}

module.exports = {
  createSection,
};
