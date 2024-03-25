const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/app/role');
const { authToken } = require('../../middlewares/authToken');

router.post('/create', authToken, roleController.createRole);
router.get('/:id', authToken, roleController.getRole);
router.get('/', authToken, roleController.getRoles);
router.put('/edit/:id', authToken, roleController.editRole);
router.delete('/delete/:id', authToken, roleController.deleteRole);

module.exports = router;
