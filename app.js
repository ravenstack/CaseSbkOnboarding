const express = require('express');
const sequelize = require('./config/database');

const colaboradorRoutes = require('./routes/colaboradorRoutes');
const onboardingRoutes = require('./routes/onboardingRoutes');

const app = express();

app.use(express.json());

app.use(express.static('public'));

// Rotas da API
app.use('/api/colaboradores', colaboradorRoutes);
app.use('/api/onboarding', onboardingRoutes);
const PORT = process.env.PORT || 8080;

sequelize.sync({ force: false }) 
    .then(() => {
        console.log('Banco de dados conectado e sincronizado.');
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err));