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
        const findSection = await Section.findOne({ _id: req.params.id });
    
        if (findSection && findSection.brandId === req.bid) {
          res.json(findSection);
        } else if (findSection && findSection.brandId !== req.bid) {
          res.send(`You do not belong to the same organization as this option.`);
        } else {
          res.send(`Section ID does not exist.`);
        }
      } else {
        res.send(`You are not authorized to access this resource.`);
      }
}

async function getAllSections(req, res){
    const data = {
        prod: 'qa',
        bid: req.bid,
        ra: req.ra,
      };
    
      const type = await checkPermission(data);
    
      if (type === 'rw' || 'w') {
        const sections = await Section.find(
          { brandId: req.bid },
          'name desc modality value isActive'
        );
        res.send(sections);
      } else {
        res.send(`You are not authorized to access this resource.`);
      }
}

async function editSection(req, res){
    const data = {
        prod: 'qa',
        bid: req.bid,
        ra: req.ra,
      };
    
      const type = await checkPermission(data);
    
      if (type === 'rw') {
        const foundSection = await Section.findOne({ _id: req.params.id });
        req.body.dateUpdated = Date.now();
        await Section.findOneAndUpdate({ _id: foundSection._id }, req.body);
    
        res.send(`Section, ${foundSection.name}, has been updated.`);
      } else {
        res.send(`You are not authorized to access this resource.`);
      }
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