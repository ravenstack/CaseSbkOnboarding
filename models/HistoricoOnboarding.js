const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HistoricoOnboarding = sequelize.define('HistoricoOnboarding', {
    onboardingId: { type: DataTypes.INTEGER, allowNull: false },
    estadoAnterior: { type: DataTypes.STRING },
    estadoNovo: { type: DataTypes.STRING },
    dataMudanca: { type: DataTypes.DATE },
    responsavelId: { type: DataTypes.STRING },
    observacoes: { type: DataTypes.TEXT }
});

module.exports = HistoricoOnboarding;