const express = require('express');
const router = express.Router();
const sectionController = require('../../../controllers/app/qa/section');
const { authToken } = require('../../../middlewares/authToken');

router.post('/create', authToken, sectionController.createSection);
router.get('/:id', authToken, sectionController.getSection);
router.get('/', authToken, sectionController.getAllSections);
router.put('/edit/:id', authToken, sectionController.editSection);
router.delete('/delete/:id', authToken, sectionController.deleteSection);

module.exports = router;
