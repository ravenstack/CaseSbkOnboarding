const Onboarding = require('../models/Onboarding');
const HistoricoOnboarding = require('../models/HistoricoOnboarding');

async function atualizarStatus(onboardingId, novoStatus, responsavel, observacoes) {
    // busca
    const onboarding = await Onboarding.findByPk(onboardingId);
    if (!onboarding) {
        throw new Error(`Onboarding não encontrado para o ID: ${onboardingId}`);
    }

    const estadoAnterior = onboarding.estadoEtapaAtual;

    // atualiza o status
    onboarding.estadoEtapaAtual = novoStatus;
    onboarding.dataUltimaAtualizacao = new Date();
    await onboarding.save();

    // cria registro
    await HistoricoOnboarding.create({
        onboardingId: onboarding.id,
        estadoAnterior: estadoAnterior,
        estadoNovo: novoStatus,
        dataMudanca: new Date(),
        responsavelId: responsavel,
        observacoes: observacoes
    });

    return onboarding;
}

module.exports = { atualizarStatus };