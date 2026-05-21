const express = require('express');
const router = express.Router();
const OnboardingProcesso = require('../models/OnboardingProcesso');
const Colaborador = require('../models/Colaborador');

router.get('/colaborador/:colaboradorId', async (req, res) => {
    try {
        const processo = await OnboardingProcesso.findOne({
            where: { colaborador_id: req.params.colaboradorId },
            include: [{ model: Colaborador, attributes: ['nome', 'email'] }]
        });

        if (!processo) {
            return res.status(404).json({ error: "Nenhum processo de onboarding iniciado." });
        }

        return res.json({
            id: processo.id,
            colaborador_nome: processo.Colaborador.nome,
            etapa_atual: processo.etapa_atual,
            responsavel_atual: processo.responsavel_atual,
            status_etapa: processo.status_etapa,
            prazo_limite_etapa: processo.prazo_limite_etapa
        });
    } catch (error) {
        return res.status(500).json({ error: "Erro interno no servidor de dados." });
    }
});

module.exports = router;