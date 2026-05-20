const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Colaborador = sequelize.define('Colaborador', {
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    dataAdmissao: { type: DataTypes.DATEONLY },
    statusGeral: { type: DataTypes.STRING } // "Não iniciado", "Em processo", "Finalizado"
});

module.exports = Colaborador;