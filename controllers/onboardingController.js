const Onboarding = require('../models/Onboarding');
const HistoricoOnboarding = require('../models/HistoricoOnboarding');
const onboardingService = require('../services/onboardingService');

exports.listarProcessos = async (req, res) => {
    try {
        const processos = await Onboarding.findAll({ include: 'Colaborador' });
        res.json(processos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.atualizarStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { responsavel } = req.body;
        
        const processoAtualizado = await onboardingService.avançarEtapa(id, responsavel);
        res.json({ mensagem: "Status atualizado e responsáveis notificados com sucesso!", processo: processoAtualizado });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.verHistorico = async (req, res) => {
    try {
        const { id } = req.params;
        const historico = await HistoricoOnboarding.findAll({
            where: { onboardingId: id },
            order: [['dataMudanca', 'DESC']]
        });
        res.json(historico);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};