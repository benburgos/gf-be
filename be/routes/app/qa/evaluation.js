const express = require('express');
const router = express.Router();
const evaluationController = require('../../../controllers/app/qa/evaluation');
const { authToken } = require('../../../middlewares/authToken');

router.post('/create', authToken, evaluationController.createEvaluation);
router.get('/:id', authToken, evaluationController.getEvaluation);
router.get('/', authToken, evaluationController.getAllEvaluations);
router.put('/edit/:id', authToken, evaluationController.editEvaluation);
router.delete('/delete/:id', authToken, evaluationController.deleteEvaluation);

module.exports = router;
