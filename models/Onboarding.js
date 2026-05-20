const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Colaborador = require('./Colaborador');

const Onboarding = sequelize.define('Onboarding', {
    estadoEtapaAtual: {
        type: DataTypes.ENUM,
        values: ['DOCUMENTACAO_RH', 'ALINHAMENTO_GESTOR', 'PREPARACAO_TI', 'EM_ANDAMENTO', 'CONCLUIDO', 'BLOQUEADO'],
        defaultValue: 'DOCUMENTACAO_RH'
    },
    dataUltimaAtualizacao: { type: DataTypes.DATE }
});

Onboarding.belongsTo(Colaborador, { foreignKey: 'colaborador_id' });

module.exports = Onboarding;