const Colaborador = require('../models/Colaborador');

exports.listarTodos = async (req, res) => {
    try {
        const colaboradores = await Colaborador.findAll();
        res.json(colaboradores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.criar = async (req, res) => {
    try {
        const novoColaborador = await Colaborador.create(req.body);
        res.status(201).json(novoColaborador);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};