const express = require('express');
const router = express.Router();
const onboardingController = require('../controllers/onboardingController');

router.get('/', onboardingController.listarProcessos);
router.patch('/:id/status', onboardingController.atualizarStatus);
router.get('/:id/historico', onboardingController.verHistorico);

module.exports = router;