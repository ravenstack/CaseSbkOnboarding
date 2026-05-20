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
        const { novoStatus, responsavel, observacoes } = req.body;
        
        await onboardingService.atualizarStatus(id, novoStatus, responsavel, observacoes);
        res.json({ mensagem: "Status atualizado com sucesso!" });
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