
const express = require('express');
const router = express.Router();
const colaboradorController = require('../controllers/colaboradorController');

router.get('/', colaboradorController.listarTodos);
router.post('/', colaboradorController.criar);

module.exports = router;