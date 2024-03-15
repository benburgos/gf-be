const { Section } = require('../../../models/app/qa/qaIndex');
const { v4: uuidv4 } = require('uuid');
const { checkPermission } = require('../../../middlewares/checkPermission');

async function createSection(req, res){
    const data = {
        prod: 'qa',
        bid: req.bid,
        ra: req.ra,
      };
    
      const type = await checkPermission(data);
    
      if (type === 'rw') {
        let newSection = {
          ...req.body,
          _id: uuidv4(),
          brandId: req.bid,
          isActive: true,
          dateCreated: Date.now(),
          dateUpdated: Date.now(),
        };
    
        try {
          await Section.create(newSection);
          res.send(`New section, ${newSection.name}, was added to the database.`);
        } catch (err) {
          res.send(err);
        }
      } else {
        res.send(`You are not authorized to access this resource.`);
      }
}

async function getSection(req, res){
    const data = {
        prod: 'qa',
        bid: req.bid,
        ra: req.ra,
      };
    
      const type = await checkPermission(data);
    
      if (type === 'rw' || 'w') {
        const findQuestion = await Question.findOne({ _id: req.params.id });
    
        if (findQuestion && findQuestion.brandId === req.bid) {
          res.json(findQuestion);
        } else if (findQuestion && findQuestion.brandId !== req.bid) {
          res.send(`You do not belong to the same organization as this option.`);
        } else {
          res.send(`Question ID does not exist.`);
        }
      } else {
        res.send(`You are not authorized to access this resource.`);
      }
}

async function getAllSections(req, res){

}

async function editSection(req, res){

}

async function deleteSection(req, res){

}


module.exports = {
    createSection,
    getSection,
    getAllSections,
    editSection,
    deleteSection
}