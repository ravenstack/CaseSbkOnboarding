const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OnboardingProcesso = sequelize.define('OnboardingProcesso', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    colaborador_id: { type: DataTypes.INTEGER, allowNull: false },
    
    etapa_atual: { 
        type: DataTypes.ENUM('DOCUMENTACAO_RH', 'ACESSOS_TI', 'APRESENTACAO_GESTOR', 'CONCLUIDO'), 
        defaultValue: 'DOCUMENTACAO_RH' 
    },

    responsavel_atual: { type: DataTypes.STRING, defaultValue: 'RH' }, 
    
    status_etapa: { 
        type: DataTypes.ENUM('PENDENTE', 'EM_ANDAMENTO', 'ATRASADO', 'CONCLUIDO'), 
        defaultValue: 'PENDENTE' 
    },
    
    data_entrada_etapa: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    prazo_limite_etapa: { type: DataTypes.DATE, allowNull: false } // Data limite calculada automaticamente
});

module.exports = OnboardingProcesso;