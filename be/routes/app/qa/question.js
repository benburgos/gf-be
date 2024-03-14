const express = require('express');
const router = express.Router();
const questionController = require('../../../controllers/app/qa/question');
const { authToken } = require('../../../middlewares/authToken');

router.post('/create', authToken, questionController.createQuestion);
router.get('/:id', authToken, questionController.getQuestion);
router.get('/', authToken, questionController.getAllQuestions);
router.put('/edit/:id', authToken, questionController.editQuestion);
router.delete('/delete/:id', authToken, questionController.deleteQuestion);

module.exports = router;
