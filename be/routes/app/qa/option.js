const express = require('express');
const router = express.Router();
const optionController = require('../../../controllers/app/qa/option');
const { authToken } = require('../../../middlewares/authToken');

router.post('/create', authToken, optionController.createOption);
router.get('/:id', authToken, optionController.getOption);
router.get('/', authToken, optionController.getOptions);
router.put('/edit/:id', authToken, optionController.editOption);
router.delete('/delete/:id', authToken, optionController.deleteOption);

module.exports = router;
